import { useState, useEffect, useCallback, useRef } from 'react';
import {
  View, Text, StyleSheet, ScrollView, TouchableOpacity,
  TextInput, Modal, Animated, Platform, useWindowDimensions,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { DailyResetLogo } from '../../components/DailyResetLogo';
import * as Haptics from 'expo-haptics';
import { Ionicons } from '@expo/vector-icons';
import { useRouter, useFocusEffect } from 'expo-router';
import { getItem, setItem, StorageKeys } from '../../hooks/useStorage';
import { clearAllUserData } from '../../utils/resetEmotionalState';
// DEV-only time travel — functions are no-ops in production builds
import {
  advanceDays    as devAdvanceDays,
  simulateStreakBreak as devBreak,
  returnToRealToday   as devReturnToday,
  resetDevTime        as devResetTime,
  grantPremium        as devGrantPremium,
} from '../../utils/devTimeTravel';
import { getAppDateOffset } from '../../utils/appDate';
import { useProgress } from '../../hooks/useProgress';
import { useEmotionalProfile } from '../../hooks/useEmotionalProfile';
import { useLanguage, type Lang } from '../../hooks/useLanguage';
import { Colors, Typography, Spacing, Radii, Shadows } from '../../theme';
import { getStreakPhrase, getIdentityLabel } from '../../utils/streakCopy';
import { getEvolutionStage } from '../../utils/progressionEngine';
import { formatNotifDisplay, cancelNotificationsForLanguageChange } from '../../utils/notifications';
import {
  ALL_PROFILES,
  EmotionalProfile,
  getProfileDescriptionShort,
  getProfileLabel,
  getProfileSubtitle,
} from '../../utils/emotionalProfile';

declare const __DEV__: boolean;

// ─── Terms of Service content ────────────────────────────────────────────────
const TERMS_SECTIONS = [
  {
    title: '1. Acceptance of Terms',
    body: 'By using Daily Reset, you agree to these Terms of Service. If anything here doesn\'t feel right for you, please reach out before continuing. These Terms define how Daily Reset works and what we each agree to.',
  },
  {
    title: '2. Description of Service',
    body: 'Daily Reset is a productivity and mindset application designed to help users build discipline, reduce procrastination, and create meaningful daily habits. The App provides:\n\n• Daily motivational messages, actions, and reflections\n• Habit tracking tools\n• Progress and streak monitoring\n• Focus and digital detox timers\n• A mindset content library\n• Daily notification reminders',
  },
  {
    title: '3. User Accounts & Eligibility',
    body: 'Daily Reset does not require account registration. All user data is stored locally on your device. You must be at least 13 years of age to use this App. By using Daily Reset, you represent and warrant that you meet this age requirement and have the legal capacity to enter into these Terms.',
  },
  {
    title: '4. Free & Premium Plans',
    body: 'Daily Reset offers two access tiers:\n\n• Free Plan: Includes access to the first 7 days of content, basic habit tracking, and limited features.\n\n• Premium Plan: Unlocks the full 365-day program, complete mindset library, advanced progress tracking, focus timers, and all app features.\n\nWe reserve the right to modify the features included in each plan at any time with reasonable notice.',
  },
  {
    title: '5. Subscriptions & Payments',
    body: 'Premium access is available through auto-renewing subscription plans:\n\n• Monthly Plan: Billed monthly\n• Annual Plan: Billed annually\n\nAll payments are processed through the Apple App Store or Google Play Store. Prices are displayed in your local currency at the time of purchase. Subscriptions automatically renew unless cancelled at least 24 hours before the end of the current billing period. You can manage or cancel your subscription at any time through your App Store or Google Play account settings.',
  },
  {
    title: '6. Refund Policy',
    body: 'All purchases are subject to the refund policies of the Apple App Store or Google Play Store. We do not independently process refunds. If you believe you are entitled to a refund, please contact Apple or Google directly through their respective support channels.',
  },
  {
    title: '7. Intellectual Property',
    body: 'Everything within Daily Reset — including text, visuals, audio, and software — is created with care and belongs to Daily Reset. By using the app, you receive the right to use it for your own personal wellbeing.\n\nPlease don\'t copy, reproduce, or share app content outside of personal use without written permission.',
  },
  {
    title: '8. Acceptable Use',
    body: 'Daily Reset is designed as a personal, private space. We simply ask that it\'s used with that spirit in mind:\n\n• Keep your use personal and non-commercial\n• Don\'t attempt to access or modify the app\'s underlying systems\n• Don\'t use the app in ways that could harm others or the app itself\n• Respect the integrity of the experience for yourself and others',
  },
  {
    title: '9. A Note on Reliability',
    body: 'Daily Reset is offered with genuine care and maintained to be as stable and reliable as possible. While we do our best, we cannot guarantee the app will always be available or completely error-free.\n\nThe content in Daily Reset — including reflections, habits, and mindset guidance — is created for personal growth and emotional support. It is not a substitute for professional medical or psychological care. If you\'re navigating a mental health concern, please reach out to a qualified professional.',
  },
  {
    title: '10. Our Responsibility',
    body: 'Daily Reset is a personal growth tool, not a professional service. While we care deeply about your experience, our responsibility is limited to the app itself. We\'re not liable for outcomes related to decisions made based on app content.\n\nIf a valid issue arises from your use of Daily Reset, any remedy will be proportionate to what you\'ve paid for the app.',
  },
  {
    title: '11. Privacy',
    body: 'Your privacy is important to us. Our Privacy Policy, which is incorporated into these Terms by reference, explains how we handle your data. By using Daily Reset, you also agree to our Privacy Policy. You can access the full Privacy Policy from the Profile section of the App.',
  },
  {
    title: '12. Modifications to the App & Terms',
    body: 'We reserve the right to modify, suspend, or discontinue the App or any part of it at any time with or without notice. We may also update these Terms periodically. When we make material changes, we will notify you within the App. Your continued use of Daily Reset after changes are posted constitutes your acceptance of the revised Terms.',
  },
  {
    title: '13. Termination',
    body: 'If use of Daily Reset is found to be harmful to others or to the integrity of the app, access may be suspended. We will always act fairly and proportionately in those situations.',
  },
  {
    title: '14. Governing Law',
    body: 'These Terms are governed by applicable law in your region. Any disputes will be handled fairly and in accordance with local legal rights and protections.',
  },
  {
    title: '15. Contact Us',
    body: 'If you have any questions about these Terms of Service, please contact us at:\n\nEmail: support@dailyreset.app\n\nWe will make every effort to respond to your inquiry within 30 business days.',
  },
];

// ─── Privacy Policy content ───────────────────────────────────────────────────
const PRIVACY_SECTIONS = [
  {
    title: '1. Introduction',
    body: 'Welcome to Daily Reset. Your privacy matters to us. This Privacy Policy explains clearly how your information is handled when you use the Daily Reset app.',
  },
  {
    title: '2. Information We Collect',
    body: 'Daily Reset is designed with your privacy in mind. All data you provide — including your name, selected goals, notification preferences, habit completions, daily progress, and streak records — is stored exclusively on your device using local storage. We do not transmit this data to any external server or third party.',
  },
  {
    title: '3. How We Use Your Information',
    body: 'The information stored locally on your device is used solely to:\n\n• Personalize your Daily Reset experience\n• Track your daily habits and progress\n• Deliver relevant daily resets based on your goals\n• Schedule and send local notifications at your preferred time\n• Maintain your streak and performance statistics',
  },
  {
    title: '4. Data Storage & Security',
    body: 'All personal data is stored locally on your device using AsyncStorage. This data never leaves your device and is not accessible to us or any third party. If you uninstall the app or use "Clear My Data" in Profile Settings, all locally stored data will be permanently deleted.',
  },
  {
    title: '5. Notifications',
    body: 'Daily Reset may request permission to send you local push notifications for your daily reminders. These notifications are generated locally on your device and do not involve transmitting any personal information to external servers. You can manage or disable notifications at any time through your device\'s Settings.',
  },
  {
    title: '6. In-App Purchases',
    body: 'Daily Reset offers optional premium subscription plans processed through the Apple App Store or Google Play Store. All payment transactions are handled entirely by Apple or Google in accordance with their respective privacy policies. We do not collect, store, or process any payment information.',
  },
  {
    title: '7. Third-Party Services',
    body: 'Some essential technical services may process limited information required for app stability and performance. We do not use advertising networks, analytics services, or any other third-party data collection tools. For more information, refer to expo.dev.',
  },
  {
    title: '8. Children\'s Privacy',
    body: 'Daily Reset is not directed to children under the age of 13. We do not knowingly collect personal information from children. If you believe a child has provided personal information through the app, please contact us and we will take appropriate steps to address the situation.',
  },
  {
    title: '9. Your Rights',
    body: 'Since all data is stored locally on your device, you have full control over it at all times. You may:\n\n• View your data within the app\n• Edit or update your information in the Profile section\n• Delete all data permanently using "Clear My Data" in Profile Settings\n• Uninstall the app to remove all associated data\n\nFor users in the European Union, you retain rights under GDPR including the right to access, correct, and delete your personal data.',
  },
  {
    title: '10. Data Retention',
    body: 'Your data is retained on your device for as long as you use the Daily Reset app. You can delete your data at any time by selecting "Clear My Data" in the Profile Settings or by uninstalling the application from your device.',
  },
  {
    title: '11. Changes to This Policy',
    body: 'We may update this Privacy Policy from time to time to reflect changes in the app or applicable laws. We will notify you of any significant changes by updating the policy within the app. Your continued use of Daily Reset after any changes constitutes your acceptance of the updated Privacy Policy.',
  },
  {
    title: '12. Contact Us',
    // TODO (pre-release): Ensure privacy@dailyreset.app is active before App Store submission.
    // Apple reviewers and users may test this address. The domain must exist and the inbox must be monitored.
    body: 'If you have any questions, concerns, or requests regarding this Privacy Policy or the way we handle your data, please contact us at:\n\nEmail: privacy@dailyreset.app\n\nWe are committed to responding to all inquiries within 30 days.',
  },
];

// ─── Terms of Service — Português ────────────────────────────────────────────
const TERMS_SECTIONS_PT = [
  {
    title: '1. Aceitação dos Termos',
    body: 'Ao usar o Daily Reset, você concorda com estes Termos de Uso. Se algo aqui não parecer certo para você, entre em contato antes de continuar. Estes Termos definem como o Daily Reset funciona e o que acordamos mutuamente.',
  },
  {
    title: '2. Descrição do Serviço',
    body: 'O Daily Reset é um aplicativo de produtividade e desenvolvimento pessoal criado para ajudar você a construir disciplina, reduzir a procrastinação e criar hábitos diários significativos. O App oferece:\n\n• Mensagens motivacionais, ações e reflexões diárias\n• Ferramentas de acompanhamento de hábitos\n• Monitoramento de progresso e sequência de dias\n• Temporizadores de foco e detox digital\n• Biblioteca de conteúdo de mentalidade\n• Lembretes diários por notificação',
  },
  {
    title: '3. Contas de Usuário e Elegibilidade',
    body: 'O Daily Reset não exige cadastro de conta. Todos os dados do usuário são armazenados localmente no seu dispositivo. Para utilizar este App, você deve ter pelo menos 13 anos de idade. Ao usar o Daily Reset, você declara que atende a este requisito de idade e possui capacidade legal para aceitar estes Termos.',
  },
  {
    title: '4. Planos Gratuito e Premium',
    body: 'O Daily Reset oferece dois níveis de acesso:\n\n• Plano Gratuito: Inclui acesso aos primeiros 7 dias de conteúdo, acompanhamento básico de hábitos e recursos limitados.\n\n• Plano Premium: Desbloqueia o programa completo de 365 dias, a biblioteca completa de mentalidade, acompanhamento avançado de progresso, temporizadores de foco e todos os recursos do App.\n\nReservamo-nos o direito de modificar os recursos incluídos em cada plano a qualquer momento, com aviso prévio razoável.',
  },
  {
    title: '5. Assinaturas e Pagamentos',
    body: 'O acesso Premium está disponível por meio de planos de assinatura com renovação automática:\n\n• Plano Mensal: Cobrado mensalmente\n• Plano Anual: Cobrado anualmente\n\nTodos os pagamentos são processados pela Apple App Store ou Google Play Store. Os preços são exibidos na moeda local no momento da compra. As assinaturas são renovadas automaticamente, a menos que canceladas com pelo menos 24 horas de antecedência ao fim do período atual. Você pode gerenciar ou cancelar sua assinatura a qualquer momento nas configurações da sua conta na App Store ou Google Play.',
  },
  {
    title: '6. Política de Reembolso',
    body: 'Todas as compras estão sujeitas às políticas de reembolso da Apple App Store ou Google Play Store. Não processamos reembolsos de forma independente. Caso acredite ter direito a um reembolso, entre em contato diretamente com a Apple ou o Google pelos respectivos canais de suporte.',
  },
  {
    title: '7. Propriedade Intelectual',
    body: 'Tudo no Daily Reset — incluindo textos, visuais, áudios e software — é criado com cuidado e pertence ao Daily Reset. Ao usar o App, você recebe o direito de utilizá-lo para o seu próprio bem-estar pessoal.\n\nPor favor, não copie, reproduza ou compartilhe o conteúdo do App fora do uso pessoal sem nossa permissão por escrito.',
  },
  {
    title: '8. Uso Aceitável',
    body: 'O Daily Reset é pensado como um espaço pessoal e privado. Pedimos apenas que seja usado com esse espírito:\n\n• Mantenha o uso pessoal e não comercial\n• Não tente acessar ou modificar os sistemas internos do App\n• Não use o App de formas que possam prejudicar outras pessoas ou o próprio App\n• Respeite a integridade da experiência para você e para os outros',
  },
  {
    title: '9. Uma nota sobre confiabilidade',
    body: 'O Daily Reset é oferecido com cuidado genuíno e mantido para ser o mais estável e confiável possível. Fazemos o nosso melhor, mas não podemos garantir que o App estará sempre disponível ou completamente livre de erros.\n\nO conteúdo do Daily Reset — incluindo reflexões, hábitos e orientações de mentalidade — é criado para crescimento pessoal e apoio emocional. Ele não substitui cuidado médico ou psicológico profissional. Se você estiver enfrentando uma questão de saúde mental, por favor procure um profissional qualificado.',
  },
  {
    title: '10. Nossa Responsabilidade',
    body: 'O Daily Reset é uma ferramenta de crescimento pessoal, não um serviço profissional. Nos importamos profundamente com a sua experiência, mas nossa responsabilidade é limitada ao App em si. Não somos responsáveis por decisões tomadas com base no conteúdo do App.\n\nCaso surja um problema legítimo no seu uso do Daily Reset, qualquer solução será proporcional ao que você pagou pelo App.',
  },
  {
    title: '11. Privacidade',
    body: 'Sua privacidade é importante para nós. Nossa Política de Privacidade, incorporada a estes Termos por referência, explica como tratamos seus dados. Ao usar o Daily Reset, você também concorda com nossa Política de Privacidade. Você pode acessá-la na seção Perfil do App.',
  },
  {
    title: '12. Modificações no App e nos Termos',
    body: 'Reservamo-nos o direito de modificar, suspender ou descontinuar o App ou qualquer parte dele a qualquer momento, com ou sem aviso prévio. Também podemos atualizar estes Termos periodicamente. Quando realizarmos alterações relevantes, notificaremos você dentro do App. O uso contínuo do Daily Reset após a publicação das alterações representa sua aceitação dos Termos revisados.',
  },
  {
    title: '13. Encerramento',
    body: 'Caso o uso do Daily Reset seja prejudicial a outras pessoas ou à integridade do App, o acesso poderá ser suspenso. Agiremos sempre de forma justa e proporcional nessas situações.',
  },
  {
    title: '14. Lei Aplicável',
    body: 'Estes Termos são regidos pela legislação aplicável na sua região. Qualquer conflito será tratado de forma justa e de acordo com os direitos legais locais.',
  },
  {
    title: '15. Fale Conosco',
    body: 'Se você tiver dúvidas sobre estes Termos de Uso, entre em contato conosco pelo e-mail:\n\nEmail: support@dailyreset.app\n\nFaremos todo o possível para responder à sua solicitação em até 30 dias úteis.',
  },
];

// ─── Privacy Policy — Português ───────────────────────────────────────────────
const PRIVACY_SECTIONS_PT = [
  {
    title: '1. Introdução',
    body: 'Bem-vindo ao Daily Reset. Sua privacidade é importante para nós. Esta Política de Privacidade explica de forma clara como suas informações são tratadas ao usar o Daily Reset.',
  },
  {
    title: '2. Informações que Coletamos',
    body: 'O Daily Reset foi desenvolvido com a sua privacidade em mente. Todos os dados que você fornece — incluindo seu nome, objetivos selecionados, preferências de notificação, hábitos concluídos, progresso diário e registros de sequência — são armazenados exclusivamente no seu dispositivo, por meio de armazenamento local. Não transmitimos esses dados a nenhum servidor externo ou terceiro.',
  },
  {
    title: '3. Como Usamos Suas Informações',
    body: 'As informações armazenadas localmente no seu dispositivo são utilizadas exclusivamente para:\n\n• Personalizar sua experiência no Daily Reset\n• Acompanhar seus hábitos e progresso diário\n• Entregar resets diários relevantes com base nos seus objetivos\n• Agendar e enviar notificações locais no horário de sua preferência\n• Manter sua sequência e estatísticas de desempenho',
  },
  {
    title: '4. Armazenamento e Segurança dos Dados',
    body: 'Todos os dados pessoais são armazenados localmente no seu dispositivo por meio do AsyncStorage. Esses dados nunca saem do seu dispositivo e não são acessíveis por nós ou por qualquer terceiro. Se você desinstalar o App ou usar a opção "Apagar meus dados" nas Configurações do Perfil, todos os dados armazenados localmente serão excluídos permanentemente.',
  },
  {
    title: '5. Notificações',
    body: 'O Daily Reset pode solicitar permissão para enviar notificações locais como lembretes diários. Essas notificações são geradas localmente no seu dispositivo e não envolvem o envio de informações pessoais a servidores externos. Você pode gerenciar ou desativar as notificações a qualquer momento nas Configurações do seu dispositivo.',
  },
  {
    title: '6. Compras no Aplicativo',
    body: 'O Daily Reset oferece planos de assinatura premium opcionais, processados pela Apple App Store ou Google Play Store. Todas as transações de pagamento são realizadas integralmente pela Apple ou pelo Google, de acordo com suas respectivas políticas de privacidade. Não coletamos, armazenamos nem processamos nenhuma informação de pagamento.',
  },
  {
    title: '7. Serviços de Terceiros',
    body: 'Alguns serviços técnicos essenciais podem processar informações limitadas necessárias para estabilidade e funcionamento do App. Não utilizamos redes de anúncios, serviços de análise ou qualquer outra ferramenta de coleta de dados de terceiros. Para mais informações, consulte expo.dev.',
  },
  {
    title: '8. Privacidade Infantil',
    body: 'O Daily Reset não é direcionado a crianças menores de 13 anos. Não coletamos intencionalmente informações pessoais de crianças. Se você acreditar que uma criança forneceu informações pessoais pelo App, entre em contato conosco e tomaremos as medidas adequadas para resolver a situação.',
  },
  {
    title: '9. Seus Direitos',
    body: 'Como todos os dados são armazenados localmente no seu dispositivo, você tem controle total sobre eles a qualquer momento. Você pode:\n\n• Visualizar seus dados dentro do App\n• Editar ou atualizar suas informações na seção Perfil\n• Excluir todos os dados usando "Apagar meus dados" nas Configurações do Perfil\n• Desinstalar o App para remover todos os dados associados\n\nPara usuários na União Europeia, você mantém os direitos previstos pelo RGPD, incluindo o direito de acessar, corrigir e excluir seus dados pessoais.',
  },
  {
    title: '10. Retenção de Dados',
    body: 'Seus dados ficam armazenados no seu dispositivo enquanto você utilizar o Daily Reset. Você pode excluir seus dados a qualquer momento selecionando "Apagar meus dados" nas Configurações do Perfil ou desinstalando o aplicativo do seu dispositivo.',
  },
  {
    title: '11. Alterações nesta Política',
    body: 'Podemos atualizar esta Política de Privacidade periodicamente para refletir mudanças no App ou na legislação aplicável. Notificaremos você sobre alterações significativas atualizando a política dentro do App. O uso contínuo do Daily Reset após quaisquer alterações representa sua aceitação da Política de Privacidade atualizada.',
  },
  {
    title: '12. Fale Conosco',
    // TODO (pre-release): Garantir que privacy@dailyreset.app esteja ativo antes do envio à App Store.
    // Revisores da Apple e usuários podem testar este endereço. O domínio deve existir e a caixa de entrada deve ser monitorada.
    body: 'Se você tiver dúvidas, preocupações ou solicitações relacionadas a esta Política de Privacidade ou à forma como tratamos seus dados, entre em contato conosco pelo e-mail:\n\nEmail: privacy@dailyreset.app\n\nEstamos comprometidos em responder a todas as solicitações em até 30 dias.',
  },
];

// ─── Terms of Service — Español ──────────────────────────────────────────────
const TERMS_SECTIONS_ES = [
  {
    title: '1. Aceptación de Términos',
    body: 'Al usar Daily Reset, aceptas estos Términos de Servicio. Si algo aquí no te parece bien, no dudes en contactarnos antes de continuar. Estos Términos definen cómo funciona Daily Reset y lo que acordamos mutuamente.',
  },
  {
    title: '2. Descripción del Servicio',
    body: 'Daily Reset es una aplicación de bienestar emocional diseñada para ayudarte a recuperar tu ritmo, reducir el agotamiento y construir hábitos diarios significativos. La app ofrece:\n\n• Mensajes, acciones y reflexiones diarias\n• Seguimiento de hábitos\n• Seguimiento de progreso y racha\n• Temporizadores de enfoque y detox digital\n• Biblioteca de mentalidad\n• Recordatorios diarios',
  },
  {
    title: '3. Cuentas de Usuario y Elegibilidad',
    body: 'Daily Reset no requiere registro de cuenta. Todos tus datos se almacenan localmente en tu dispositivo. Debes tener al menos 13 años para usar esta app. Al usar Daily Reset, declaras que cumples este requisito de edad.',
  },
  {
    title: '4. Planes Gratuito y Premium',
    body: 'Daily Reset ofrece dos niveles de acceso:\n\n• Plan Gratuito: Incluye acceso a los primeros 7 días de contenido, seguimiento básico de hábitos y funciones limitadas.\n\n• Plan Premium: Desbloquea el programa completo de 365 días, la biblioteca completa de mentalidad, seguimiento avanzado del progreso, temporizadores de enfoque y todas las funciones de la app.\n\nNos reservamos el derecho de modificar las funciones incluidas en cada plan con aviso previo razonable.',
  },
  {
    title: '5. Suscripciones y Pagos',
    body: 'El acceso Premium está disponible mediante planes de suscripción con renovación automática:\n\n• Plan Mensual: Facturado mensualmente\n• Plan Anual: Facturado anualmente\n\nTodos los pagos se procesan a través de la App Store de Apple o Google Play Store. Las suscripciones se renuevan automáticamente a menos que se cancelen al menos 24 horas antes del final del período actual. Puedes gestionar o cancelar tu suscripción en cualquier momento desde los ajustes de tu cuenta en la App Store o Google Play.',
  },
  {
    title: '6. Política de Reembolsos',
    body: 'Todas las compras están sujetas a las políticas de reembolso de la App Store de Apple o Google Play Store. No procesamos reembolsos de forma independiente. Si crees que tienes derecho a un reembolso, contacta directamente a Apple o Google a través de sus canales de soporte.',
  },
  {
    title: '7. Propiedad Intelectual',
    body: 'Todo en Daily Reset — incluidos textos, visuales, audios y software — está creado con cuidado y pertenece a Daily Reset. Al usar la app, tienes el derecho de usarla para tu propio bienestar personal.\n\nPor favor, no copies, reproduzcas ni compartas el contenido de la app fuera del uso personal sin nuestro permiso por escrito.',
  },
  {
    title: '8. Uso Aceptable',
    body: 'Daily Reset está diseñada como un espacio personal y privado. Solo pedimos que se use con ese espíritu:\n\n• Mantén el uso personal y no comercial\n• No intentes acceder ni modificar los sistemas internos de la app\n• No uses la app de maneras que puedan dañar a otros o a la propia app\n• Respeta la integridad de la experiencia para ti y para los demás',
  },
  {
    title: '9. Una nota sobre la confiabilidad',
    body: 'Daily Reset se ofrece con genuino cuidado y se mantiene para ser lo más estable y confiable posible. Hacemos todo lo que podemos, pero no podemos garantizar que la app estará siempre disponible o completamente libre de errores.\n\nEl contenido de Daily Reset — incluyendo reflexiones, hábitos y orientación de mentalidad — está creado para el crecimiento personal y el apoyo emocional. No sustituye la atención médica o psicológica profesional. Si estás atravesando una situación de salud mental, por favor consulta a un profesional cualificado.',
  },
  {
    title: '10. Nuestra Responsabilidad',
    body: 'Daily Reset es una herramienta de crecimiento personal, no un servicio profesional. Nos importa profundamente tu experiencia, pero nuestra responsabilidad se limita a la app en sí. No somos responsables de las decisiones tomadas en base al contenido de la app.\n\nSi surge un problema legítimo con tu uso de Daily Reset, cualquier solución será proporcional a lo que hayas pagado por la app.',
  },
  {
    title: '11. Privacidad',
    body: 'Tu privacidad es importante para nosotros. Nuestra Política de Privacidad explica cómo tratamos tus datos. Al usar Daily Reset, también aceptas nuestra Política de Privacidad. Puedes acceder a ella desde la sección Perfil de la app.',
  },
  {
    title: '12. Modificaciones a la App y los Términos',
    body: 'Nos reservamos el derecho de modificar, suspender o discontinuar la app o cualquier parte de ella en cualquier momento. También podemos actualizar estos Términos periódicamente. Te notificaremos sobre cambios importantes dentro de la app. El uso continuado de Daily Reset después de los cambios constituye tu aceptación de los Términos revisados.',
  },
  {
    title: '13. Cancelación',
    body: 'Si el uso de Daily Reset resulta perjudicial para otros o para la integridad de la app, el acceso podrá suspenderse. Siempre actuaremos de manera justa y proporcional en esas situaciones.',
  },
  {
    title: '14. Ley Aplicable',
    body: 'Estos Términos se rigen por la legislación aplicable en tu región. Cualquier disputa se resolverá de manera justa y de acuerdo con los derechos legales locales.',
  },
  {
    title: '15. Contáctanos',
    body: 'Si tienes preguntas sobre estos Términos de Servicio, contáctanos en:\n\nEmail: support@dailyreset.app\n\nHaremos todo lo posible por responder a tu consulta en un plazo de 30 días hábiles.',
  },
];

// ─── Privacy Policy — Español ─────────────────────────────────────────────────
const PRIVACY_SECTIONS_ES = [
  {
    title: '1. Introducción',
    body: 'Bienvenido a Daily Reset. Tu privacidad nos importa. Esta Política de Privacidad explica claramente cómo se tratan tus datos al usar Daily Reset.',
  },
  {
    title: '2. Información que recopilamos',
    body: 'Daily Reset fue diseñada con tu privacidad en mente. Todos los datos que proporcionas — incluyendo tu nombre, objetivos seleccionados, preferencias de notificación, hábitos completados, progreso diario y registros de racha — se almacenan exclusivamente en tu dispositivo mediante almacenamiento local. No transmitimos estos datos a ningún servidor externo ni a terceros.',
  },
  {
    title: '3. Cómo usamos tu información',
    body: 'La información almacenada localmente en tu dispositivo se usa exclusivamente para:\n\n• Personalizar tu experiencia en Daily Reset\n• Hacer seguimiento de tus hábitos y progreso diario\n• Entregarte resets diarios relevantes basados en tus objetivos\n• Programar y enviar notificaciones locales a la hora que prefieras\n• Mantener tu racha y estadísticas de progreso',
  },
  {
    title: '4. Almacenamiento y seguridad de datos',
    body: 'Todos los datos personales se almacenan localmente en tu dispositivo. Estos datos nunca salen de tu dispositivo y no son accesibles para nosotros ni para terceros. Si desinstales la app o usas la opción "Borrar mis datos" en Ajustes del Perfil, todos los datos almacenados localmente se eliminarán permanentemente.',
  },
  {
    title: '5. Notificaciones',
    body: 'Daily Reset puede solicitar permiso para enviarte notificaciones locales como recordatorios diarios. Estas notificaciones se generan localmente en tu dispositivo y no implican el envío de información personal a servidores externos. Puedes gestionar o desactivar las notificaciones en cualquier momento desde los Ajustes de tu dispositivo.',
  },
  {
    title: '6. Compras dentro de la app',
    body: 'Daily Reset ofrece planes de suscripción premium opcionales, procesados por la App Store de Apple o Google Play Store. Todas las transacciones de pago las realiza íntegramente Apple o Google. No recopilamos, almacenamos ni procesamos ninguna información de pago.',
  },
  {
    title: '7. Servicios de terceros',
    body: 'Algunos servicios técnicos esenciales pueden procesar información limitada necesaria para la estabilidad y el funcionamiento de la app. No usamos redes de publicidad, servicios de análisis ni ninguna otra herramienta de recopilación de datos de terceros. Para más información, consulta expo.dev.',
  },
  {
    title: '8. Privacidad de menores',
    body: 'Daily Reset no está dirigida a menores de 13 años. No recopilamos intencionalmente información personal de menores. Si crees que un menor ha proporcionado información personal a través de la app, contáctanos y tomaremos las medidas adecuadas.',
  },
  {
    title: '9. Tus derechos',
    body: 'Como todos los datos se almacenan localmente en tu dispositivo, tienes control total sobre ellos en todo momento. Puedes:\n\n• Ver tus datos dentro de la app\n• Editar o actualizar tu información en la sección Perfil\n• Eliminar todos los datos usando "Borrar mis datos" en Ajustes del Perfil\n• Desinstalar la app para eliminar todos los datos asociados\n\nPara los usuarios en la Unión Europea, conservas los derechos contemplados por el RGPD, incluido el derecho a acceder, corregir y eliminar tus datos personales.',
  },
  {
    title: '10. Retención de datos',
    body: 'Tus datos se almacenan en tu dispositivo mientras uses Daily Reset. Puedes eliminarlos en cualquier momento seleccionando "Borrar mis datos" en los Ajustes del Perfil o desinstalando la app de tu dispositivo.',
  },
  {
    title: '11. Cambios en esta Política',
    body: 'Podemos actualizar esta Política de Privacidad periódicamente para reflejar cambios en la app o en la legislación aplicable. Te notificaremos sobre cambios significativos actualizando la política dentro de la app. El uso continuado de Daily Reset después de cualquier cambio constituye tu aceptación de la Política de Privacidad actualizada.',
  },
  {
    title: '12. Contáctanos',
    // TODO (pre-release): Ensure privacy@dailyreset.app is active before App Store submission.
    body: 'Si tienes preguntas, inquietudes o solicitudes relacionadas con esta Política de Privacidad o la forma en que tratamos tus datos, contáctanos en:\n\nEmail: privacy@dailyreset.app\n\nNos comprometemos a responder todas las solicitudes en un plazo de 30 días.',
  },
];

// ─── Terms of Service — Français ─────────────────────────────────────────────
const TERMS_SECTIONS_FR = [
  {
    title: '1. Acceptation des conditions',
    body: 'En utilisant Daily Reset, tu acceptes ces Conditions d\'utilisation. Si quelque chose ne te convient pas, n\'hésite pas à nous contacter avant de continuer. Ces Conditions définissent le fonctionnement de Daily Reset et ce que nous convenons mutuellement.',
  },
  {
    title: '2. Description du service',
    body: 'Daily Reset est une application de bien-être émotionnel conçue pour t\'aider à retrouver ton rythme, réduire l\'épuisement et construire des habitudes quotidiennes significatives. L\'app propose :\n\n• Messages, actions et réflexions quotidiens\n• Suivi des habitudes\n• Suivi des progrès et de la régularité\n• Minuteurs de focus et detox numérique\n• Bibliothèque de développement personnel\n• Rappels quotidiens',
  },
  {
    title: '3. Comptes utilisateur et éligibilité',
    body: 'Daily Reset ne requiert pas de création de compte. Toutes tes données sont stockées localement sur ton appareil. Tu dois avoir au moins 13 ans pour utiliser cette app. En utilisant Daily Reset, tu confirmes que tu remplis cette condition d\'âge.',
  },
  {
    title: '4. Plans gratuit et premium',
    body: 'Daily Reset propose deux niveaux d\'accès :\n\n• Plan gratuit : Accès aux 7 premiers jours de contenu, suivi basique des habitudes et fonctionnalités limitées.\n\n• Plan premium : Débloque le programme complet de 365 jours, la bibliothèque complète, le suivi avancé des progrès, les minuteurs de focus et toutes les fonctionnalités de l\'app.\n\nNous nous réservons le droit de modifier les fonctionnalités incluses dans chaque plan avec un préavis raisonnable.',
  },
  {
    title: '5. Abonnements et paiements',
    body: 'L\'accès premium est disponible via des plans d\'abonnement à renouvellement automatique :\n\n• Plan mensuel : Facturé chaque mois\n• Plan annuel : Facturé chaque année\n\nTous les paiements sont traités via l\'App Store d\'Apple ou le Google Play Store. Les abonnements se renouvellent automatiquement sauf annulation au moins 24 heures avant la fin de la période en cours. Tu peux gérer ou annuler ton abonnement à tout moment depuis les paramètres de ton compte.',
  },
  {
    title: '6. Politique de remboursement',
    body: 'Tous les achats sont soumis aux politiques de remboursement de l\'App Store d\'Apple ou du Google Play Store. Nous ne traitons pas les remboursements de manière indépendante. Si tu penses avoir droit à un remboursement, contacte directement Apple ou Google.',
  },
  {
    title: '7. Propriété intellectuelle',
    body: 'Tout ce qui compose Daily Reset — textes, visuels, sons et logiciel — est créé avec soin et appartient à Daily Reset. En utilisant l\'app, tu obtiens le droit de l\'utiliser pour ton bien-être personnel.\n\nMerci de ne pas copier, reproduire ou partager le contenu de l\'app en dehors d\'un usage personnel sans notre autorisation écrite.',
  },
  {
    title: '8. Usage acceptable',
    body: 'Daily Reset est conçue comme un espace personnel et privé. Nous te demandons simplement de l\'utiliser dans cet esprit :\n\n• Garde un usage personnel et non commercial\n• N\'essaie pas d\'accéder aux systèmes internes de l\'app\n• N\'utilise pas l\'app d\'une façon qui pourrait nuire à d\'autres\n• Respecte l\'intégrité de l\'expérience pour toi et pour les autres',
  },
  {
    title: '9. Une note sur la fiabilité',
    body: 'Daily Reset est proposée avec un soin sincère et maintenue pour être aussi stable que possible. Nous faisons de notre mieux, mais nous ne pouvons pas garantir que l\'app sera toujours disponible ou entièrement sans erreur.\n\nLe contenu de Daily Reset est créé pour le développement personnel et le soutien émotionnel. Il ne remplace pas un suivi médical ou psychologique professionnel. Si tu traverses une difficulté de santé mentale, consulte un professionnel qualifié.',
  },
  {
    title: '10. Notre responsabilité',
    body: 'Daily Reset est un outil de croissance personnelle, pas un service professionnel. Nous nous soucions profondément de ton expérience, mais notre responsabilité se limite à l\'app elle-même. Nous ne sommes pas responsables des décisions prises sur la base du contenu de l\'app.\n\nSi un problème légitime survient, toute solution sera proportionnelle à ce que tu as payé.',
  },
  {
    title: '11. Confidentialité',
    body: 'Ta vie privée est importante pour nous. Notre Politique de confidentialité explique comment nous traitons tes données. En utilisant Daily Reset, tu acceptes également notre Politique de confidentialité. Tu peux y accéder depuis la section Profil de l\'app.',
  },
  {
    title: '12. Modifications de l\'app et des conditions',
    body: 'Nous nous réservons le droit de modifier, suspendre ou arrêter l\'app ou une partie de celle-ci à tout moment. Nous pouvons également mettre à jour ces Conditions périodiquement. Pour tout changement important, nous t\'en informerons dans l\'app. L\'utilisation continue de Daily Reset après ces changements vaut acceptation des Conditions révisées.',
  },
  {
    title: '13. Résiliation',
    body: 'Si l\'utilisation de Daily Reset s\'avère préjudiciable à d\'autres ou à l\'intégrité de l\'app, l\'accès pourra être suspendu. Nous agirons toujours de façon juste et proportionnée.',
  },
  {
    title: '14. Droit applicable',
    body: 'Ces Conditions sont régies par la législation applicable dans ta région. Tout litige sera traité équitablement et conformément aux droits légaux locaux.',
  },
  {
    title: '15. Nous contacter',
    body: 'Si tu as des questions sur ces Conditions d\'utilisation, contacte-nous à :\n\nEmail : support@dailyreset.app\n\nNous ferons tout notre possible pour répondre à ta demande dans un délai de 30 jours ouvrables.',
  },
];

// ─── Privacy Policy — Français ────────────────────────────────────────────────
const PRIVACY_SECTIONS_FR = [
  {
    title: '1. Introduction',
    body: 'Bienvenue sur Daily Reset. Ta vie privée nous tient à cœur. Cette Politique de confidentialité explique clairement comment tes informations sont traitées lorsque tu utilises l\'app Daily Reset.',
  },
  {
    title: '2. Informations que nous collectons',
    body: 'Daily Reset a été conçue en tenant compte de ta vie privée. Toutes les données que tu fournis — y compris ton prénom, tes objectifs, tes préférences de notification, tes habitudes complétées, ta progression quotidienne et tes séries — sont stockées exclusivement sur ton appareil. Nous ne transmettons pas ces données à un serveur externe ou à un tiers.',
  },
  {
    title: '3. Comment nous utilisons tes informations',
    body: 'Les informations stockées localement sur ton appareil sont utilisées uniquement pour :\n\n• Personnaliser ton expérience Daily Reset\n• Suivre tes habitudes et ta progression quotidienne\n• Te proposer des resets quotidiens adaptés à tes objectifs\n• Programmer et envoyer des notifications locales à l\'heure que tu choisis\n• Maintenir ta série et tes statistiques',
  },
  {
    title: '4. Stockage et sécurité des données',
    body: 'Toutes les données personnelles sont stockées localement sur ton appareil via AsyncStorage. Ces données ne quittent jamais ton appareil et ne sont accessibles ni par nous ni par un tiers. Si tu désinstalles l\'app ou utilises "Supprimer mes données" dans les paramètres du profil, toutes les données stockées seront définitivement supprimées.',
  },
  {
    title: '5. Notifications',
    body: 'Daily Reset peut demander l\'autorisation de t\'envoyer des notifications locales pour tes rappels quotidiens. Ces notifications sont générées localement sur ton appareil et n\'impliquent pas l\'envoi d\'informations personnelles à des serveurs externes. Tu peux gérer ou désactiver les notifications à tout moment depuis les paramètres de ton appareil.',
  },
  {
    title: '6. Achats intégrés',
    body: 'Daily Reset propose des plans d\'abonnement premium optionnels, traités par l\'App Store d\'Apple ou le Google Play Store. Toutes les transactions de paiement sont entièrement gérées par Apple ou Google. Nous ne collectons, ne stockons ni ne traitons aucune information de paiement.',
  },
  {
    title: '7. Services tiers',
    body: 'Certains services techniques essentiels peuvent traiter des informations limitées nécessaires à la stabilité de l\'app. Nous n\'utilisons pas de réseaux publicitaires, de services d\'analyse ou d\'autres outils de collecte de données tiers. Pour plus d\'informations, consulte expo.dev.',
  },
  {
    title: '8. Protection des mineurs',
    body: 'Daily Reset n\'est pas destinée aux enfants de moins de 13 ans. Nous ne collectons pas sciemment d\'informations personnelles auprès de mineurs. Si tu penses qu\'un enfant a fourni des informations personnelles via l\'app, contacte-nous et nous prendrons les mesures appropriées.',
  },
  {
    title: '9. Tes droits',
    body: 'Toutes les données étant stockées localement sur ton appareil, tu en as le contrôle total à tout moment. Tu peux :\n\n• Consulter tes données dans l\'app\n• Modifier ou mettre à jour tes informations dans la section Profil\n• Supprimer toutes les données via "Supprimer mes données" dans les paramètres du profil\n• Désinstaller l\'app pour supprimer toutes les données associées\n\nPour les utilisateurs de l\'Union européenne, tu conserves les droits prévus par le RGPD, notamment le droit d\'accéder à tes données, de les corriger et de les supprimer.',
  },
  {
    title: '10. Conservation des données',
    body: 'Tes données sont conservées sur ton appareil tant que tu utilises Daily Reset. Tu peux les supprimer à tout moment en sélectionnant "Supprimer mes données" dans les paramètres du profil ou en désinstallant l\'app.',
  },
  {
    title: '11. Modifications de cette politique',
    body: 'Nous pouvons mettre à jour cette Politique de confidentialité de temps à autre pour refléter des changements dans l\'app ou la législation applicable. Nous t\'informerons de tout changement important en mettant à jour la politique dans l\'app. L\'utilisation continue de Daily Reset après ces changements vaut acceptation de la Politique mise à jour.',
  },
  {
    title: '12. Nous contacter',
    body: 'Si tu as des questions, des préoccupations ou des demandes concernant cette Politique de confidentialité ou la façon dont nous traitons tes données, contacte-nous à :\n\nEmail : privacy@dailyreset.app\n\nNous nous engageons à répondre à toutes les demandes dans un délai de 30 jours.',
  },
];

// ─── Terms of Service — Deutsch ──────────────────────────────────────────────
const TERMS_SECTIONS_DE = [
  {
    title: '1. Annahme der Bedingungen',
    body: 'Durch die Nutzung von Daily Reset stimmst du diesen Nutzungsbedingungen zu. Wenn sich etwas für dich nicht richtig anfühlt, nutze die App bitte nicht weiter.',
  },
  {
    title: '2. Beschreibung des Dienstes',
    body: 'Daily Reset ist eine App für tägliche Reflexion, sanfte Routinen und persönliche Rückkehr. Sie soll dich unterstützen, kleine Schritte zu machen, ohne Druck aufzubauen.',
  },
  {
    title: '3. Kein medizinischer Ersatz',
    body: 'Daily Reset ersetzt keine medizinische, psychologische oder therapeutische Behandlung. Wenn du dich in einer akuten Krise befindest oder professionelle Hilfe brauchst, wende dich bitte an qualifizierte Fachpersonen oder lokale Notfalldienste.',
  },
  {
    title: '4. Nutzung der App',
    body: 'Du bist dafür verantwortlich, die App auf eine Weise zu nutzen, die für dich sicher und passend ist. Du kannst jederzeit pausieren.',
  },
  {
    title: '5. Änderungen',
    body: 'Wir können diese Bedingungen gelegentlich aktualisieren. Die aktuelle Version wird in der App angezeigt.',
  },
];

// ─── Privacy Policy — Deutsch ─────────────────────────────────────────────────
const PRIVACY_SECTIONS_DE = [
  {
    title: '1. Einführung',
    body: 'Willkommen bei Daily Reset. Deine Privatsphäre ist uns wichtig. Diese Datenschutzrichtlinie erklärt klar, wie deine Informationen behandelt werden, wenn du die Daily Reset App nutzt.',
  },
  {
    title: '2. Welche Informationen wir speichern',
    body: 'Daily Reset ist so gestaltet, dass deine Privatsphäre geschützt bleibt. Daten, die du eingibst — wie ausgewählte Ziele, Benachrichtigungseinstellungen, tägliche Fortschritte, Reflexionen und Reset-Verläufe — werden lokal auf deinem Gerät gespeichert.',
  },
  {
    title: '3. Wie wir deine Informationen nutzen',
    body: 'Die lokal gespeicherten Informationen werden nur genutzt, um deine Daily Reset Erfahrung persönlicher zu machen, deinen Fortschritt anzuzeigen, passende tägliche Inhalte bereitzustellen und lokale Benachrichtigungen zu planen.',
  },
  {
    title: '4. Weitergabe von Daten',
    body: 'Wir verkaufen deine persönlichen Daten nicht. Wir geben deine privaten Reflexionen nicht an Dritte weiter.',
  },
  {
    title: '5. Deine Kontrolle',
    body: 'Du kannst deine Daten jederzeit in den Einstellungen löschen. Wenn du deine Daten löschst, werden gespeicherte Fortschritte und Reflexionen entfernt.',
  },
];

// ─── Transformation title / subtitle — driven by progression engine ───────────
const MILESTONES = [3, 7, 14, 21, 30, 60, 90, 100, 180, 365];

function getTransformationSubtitleBrokenStreak(total: number, lang: string): string {
  if (lang === 'pt') return `Você completou ${total} reset${total > 1 ? 's' : ''}. Retorne hoje.`;
  if (lang === 'es') return `Completaste ${total} reset${total > 1 ? 's' : ''}. Regresa hoy.`;
  if (lang === 'fr') return `Tu as complété ${total} reset${total > 1 ? 's' : ''}. Reviens aujourd'hui.`;
  if (lang === 'de') return `Du hast ${total} Reset${total > 1 ? 's' : ''} abgeschlossen. Komm heute zurück.`;
  return `You've completed ${total} reset${total > 1 ? 's' : ''}. Begin your streak today.`;
}

// ─── Settings row com fade-in escalonado ──────────────────────────────────────
function SettingsRowAnimated({ index, icon, label, value, isDanger, onPress }: {
  index: number;
  icon: string;
  label: string;
  value?: string;
  isDanger?: boolean;
  onPress?: () => void;
}) {
  const opacity    = useRef(new Animated.Value(0)).current;
  const translateX = useRef(new Animated.Value(-6)).current;

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => {
    Animated.parallel([
      Animated.timing(opacity,    { toValue: 1, duration: 400, delay: index * 60, useNativeDriver: true }),
      Animated.timing(translateX, { toValue: 0, duration: 400, delay: index * 60, useNativeDriver: true }),
    ]).start();
  }, []);

  return (
    <Animated.View style={{ opacity, transform: [{ translateX }] }}>
      <TouchableOpacity
        style={styles.row}
        onPress={onPress}
        activeOpacity={onPress ? 0.75 : 1}
      >
        <View style={[styles.rowIcon, isDanger && styles.rowIconDanger]}>
          <Ionicons
            name={icon as any}
            size={15}
            color={isDanger ? Colors.danger : Colors.textSecondary}
          />
        </View>
        <Text style={[styles.rowLabel, isDanger && styles.rowLabelDanger]}>{label}</Text>
        {value !== undefined && value !== '' && (
          <Text style={styles.rowValue}>{value}</Text>
        )}
        <Ionicons name="chevron-forward" size={13} color={Colors.textMuted} />
      </TouchableOpacity>
    </Animated.View>
  );
}

// ─── Component ────────────────────────────────────────────────────────────────
export default function ProfileScreen() {
  const router = useRouter();
  const { width: screenWidth } = useWindowDimensions();
  const insets = useSafeAreaInsets();
  const isTablet = screenWidth >= 768;
  const logoW = Math.min(276, screenWidth - 40);
  const logoH = Math.round(logoW * (138 / 276));
  const streakFontSize = screenWidth < 360 ? 42 : isTablet ? 64 : 56;
  const { progress, weeklyScore } = useProgress();
  const { profile, setProfile } = useEmotionalProfile();
  const { lang: contextLang, setLang: contextSetLang } = useLanguage();
  const [name, setName]             = useState('');
  const [notifTime, setNotifTime]   = useState('morning');
  const [notifExact, setNotifExact] = useState<string | null>(null);
  const [goals, setGoals]           = useState<string[]>([]);
  const [editing, setEditing]       = useState(false);
  const [showPrivacy, setShowPrivacy]     = useState(false);
  const [showTerms, setShowTerms]         = useState(false);
  const [showResetModal, setShowResetModal] = useState(false);
  const [lang, setLangState]              = useState<Lang>(contextLang);
  const [showLangPicker, setShowLangPicker] = useState(false);
  const [showProfilePicker, setShowProfilePicker] = useState(false);
  // DEV-only time travel panel state
  const [showDevPanel, setShowDevPanel]   = useState(false);
  const [devBusy, setDevBusy]             = useState(false);
  const [devDone, setDevDone]             = useState<string | null>(null);

  // Per-card scale animations for language picker
  const langScales = useRef<Record<string, Animated.Value>>({
    en: new Animated.Value(1),
    pt: new Animated.Value(1),
    es: new Animated.Value(1),
    fr: new Animated.Value(1),
    de: new Animated.Value(1),
  }).current;

  // Per-card check fade animations (start at 0, set to 1 for active lang after load)
  const langCheckOpacity = useRef<Record<string, Animated.Value>>({
    en: new Animated.Value(0),
    pt: new Animated.Value(0),
    es: new Animated.Value(0),
    fr: new Animated.Value(0),
    de: new Animated.Value(0),
  }).current;

  const loadSettings = useCallback(async () => {
    const [n, t, exact, g, l] = await Promise.all([
      getItem<string>(StorageKeys.USER_NAME, ''),
      getItem<string>(StorageKeys.NOTIFICATION_TIME, 'morning'),
      getItem<string | null>(StorageKeys.NOTIFICATION_EXACT_TIME, null),
      getItem<string[]>(StorageKeys.USER_GOALS, []),
      getItem<Lang>(StorageKeys.LANGUAGE, 'en'),
    ]);
    setName(n); setNotifTime(t); setNotifExact(exact); setGoals(g); setLangState(l);
    // Inicializa check visível para o idioma carregado
    if (langCheckOpacity[l]) langCheckOpacity[l].setValue(1);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => { loadSettings(); }, [loadSettings]);

  // Recarrega ao focar na aba (pega mudanças feitas na tela de settings)
  useFocusEffect(useCallback(() => { loadSettings(); }, [loadSettings]));

  const handleSelectLang = async (selected: Lang) => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);

    // Scale bounce on selected card
    const scaleAnim = langScales[selected];
    if (scaleAnim) {
      Animated.sequence([
        Animated.timing(scaleAnim, { toValue: 0.96, duration: 80, useNativeDriver: true }),
        Animated.spring(scaleAnim, { toValue: 1, friction: 5, tension: 220, useNativeDriver: true }),
      ]).start();
    }

    // Fade out previous check, fade in new check
    const prevCode = lang as string;
    const prevCheckAnim = langCheckOpacity[prevCode];
    const newCheckAnim  = langCheckOpacity[selected];
    if (prevCheckAnim) {
      Animated.timing(prevCheckAnim, { toValue: 0, duration: 120, useNativeDriver: true }).start();
    }
    if (newCheckAnim) {
      Animated.sequence([
        Animated.delay(60),
        Animated.timing(newCheckAnim, { toValue: 1, duration: 220, useNativeDriver: true }),
      ]).start();
    }

    await contextSetLang(selected as Lang);  // updates context → all screens react
    setLangState(selected);                  // keep local state in sync for the picker UI
    cancelNotificationsForLanguageChange();  // clear stale-language notifications; reschedule on next Today focus
    setTimeout(() => setShowLangPicker(false), 280);
  };

  const LANG_LABELS: Record<string, string> = {
    en: 'English', pt: 'Português', es: 'Spanish', fr: 'Français', de: 'Deutsch',
  };

  const saveName = async () => { await setItem(StorageKeys.USER_NAME, name); setEditing(false); };

  const handleReset = () => {
    console.log('RESET MODAL OPENED');
    setShowResetModal(true);
  };

  const handleConfirmReset = async () => {
    console.log('RESET CONFIRMED FROM CUSTOM MODAL');
    setShowResetModal(false);
    await clearAllUserData();
    console.log('CLEAR ALL USER DATA FINISHED');
    if (Platform.OS !== 'web') {
      router.replace('/splash');
    }
  };

  const { t } = useLanguage();

  const rows = [
    {
      icon: 'notifications-outline',
      label: t('profile.row.notification'),
      value: formatNotifDisplay(notifTime, notifExact, contextLang),
      onPress: () => router.push('/notification-settings'),
    },
    { icon: 'language-outline', label: t('profile.row.language'), value: LANG_LABELS[lang] ?? 'English', onPress: () => setShowLangPicker(true) },
    { icon: 'document-text-outline', label: t('profile.row.privacy'),  onPress: () => setShowPrivacy(true) },
    { icon: 'reader-outline',        label: t('profile.row.terms'),    onPress: () => setShowTerms(true) },
    { icon: 'trash-outline',         label: t('profile.row.reset'),    onPress: handleReset, danger: true },
  ];

  const streak = progress.streak;
  const total  = progress.completedDays.length;
  const nextMilestone = MILESTONES.find(m => m > streak) ?? null;
  const lastMilestone = [...MILESTONES].reverse().find(m => m <= streak) ?? null;
  const daysToNext    = nextMilestone ? nextMilestone - streak : null;

  // Member since — derived from currentDay + today's date
  const memberSince = (() => {
    if (total === 0) return t('profile.greet.dayOne');
    const start = new Date();
    start.setDate(start.getDate() - (progress.currentDay - 1));
    const MONTH_KEYS = ['month.jan','month.feb','month.mar','month.apr','month.may','month.jun','month.jul','month.aug','month.sep','month.oct','month.nov','month.dec'] as const;
    return t('profile.greet.memberSince', { month: t(MONTH_KEYS[start.getMonth()]), year: start.getFullYear() });
  })();

  // Rotating emotional footer for the journey card
  const JOURNEY_FOOTERS = [
    t('profile.footer.p1'), t('profile.footer.p2'), t('profile.footer.p3'),
    t('profile.footer.p4'), t('profile.footer.p5'),
  ];
  const journeyFooter = JOURNEY_FOOTERS[progress.currentDay % JOURNEY_FOOTERS.length];

  return (
    <View style={styles.container}>
      <View pointerEvents="none" style={styles.ambientTop} />
      <View pointerEvents="none" style={styles.ambientBottom} />
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={[
          styles.scroll,
          isTablet && { maxWidth: 640, alignSelf: 'center', width: '100%' },
        ]}
        decelerationRate="normal"
        scrollEventThrottle={16}
      >

        {/* ── 1. IDENTITY HERO ─────────────────────────────────── */}
        <View style={[styles.hero, { paddingTop: Math.max(insets.top + 12, 52) }]}>
          <DailyResetLogo width={logoW} height={logoH} variant="light" />

          {/* Name — editable */}
          {editing ? (
            <View style={styles.nameRow}>
              <TextInput
                style={styles.nameInput}
                value={name}
                onChangeText={setName}
                placeholder={t('profile.name.placeholder')}
                placeholderTextColor={Colors.textMuted}
                autoFocus
              />
              <TouchableOpacity onPress={saveName} style={styles.saveBtn}>
                <Ionicons name="checkmark-circle" size={24} color={Colors.charcoal} />
              </TouchableOpacity>
            </View>
          ) : (
            <TouchableOpacity onPress={() => setEditing(true)} style={styles.nameRow}>
              {name ? (
                <Text style={styles.name}>{contextLang === 'fr' ? `Bonjour, ${name}.` : `Hi, ${name}.`}</Text>
              ) : (
                <Text style={styles.nameEmpty}>{t('profile.greet.becoming')}</Text>
              )}
              <Ionicons name="pencil-outline" size={13} color={Colors.textMuted} />
            </TouchableOpacity>
          )}

          {/* Transformation title — the identity statement */}
          <Text style={styles.transformTitle}>
            {streak === 0 ? t('profile.transform.zero.title') : getEvolutionStage(streak).label}
          </Text>
          <Text style={styles.transformSub}>
            {streak === 0 && total === 0
              ? t('profile.transform.zero.sub')
              : streak === 0
              ? getTransformationSubtitleBrokenStreak(total, lang)
              : getEvolutionStage(streak).tagline}
          </Text>

          {/* Access confirmed */}
          <View style={styles.premiumPill}>
            <Ionicons name="checkmark-circle" size={12} color={Colors.charcoal} />
            <Text style={styles.premiumText}>
              {lang === 'pt' ? 'ACESSO LIBERADO' : lang === 'es' ? 'ACCESO ACTIVO' : lang === 'fr' ? 'ACCÈS ACTIF' : lang === 'de' ? 'ZUGANG AKTIV' : 'ACCESS ACTIVE'}
            </Text>
          </View>

          {/* Member since — micro identity line */}
          <Text style={styles.memberSince}>{memberSince}</Text>
        </View>

        {/* ── 2. TRANSFORMATION CARD ───────────────────────────── */}
        {(streak > 0 || total > 0) && (
          <View style={styles.section}>
            <Text style={styles.sectionEyebrow}>{t('profile.section.transformation')}</Text>
            <View style={styles.transformCard}>

              {/* Streak — large identity number */}
              <View style={styles.transformTop}>
                <View>
                  <Text style={[styles.transformStreakBig, { fontSize: streakFontSize, lineHeight: streakFontSize }]}>{streak}</Text>
                  <Text style={styles.transformStreakUnit}>{t('profile.streak.daysInRow')}</Text>
                </View>
                <View style={styles.transformRight}>
                  <View style={styles.identityTierPill}>
                    <Text style={styles.identityTierText}>
                      {getIdentityLabel(streak).replace('.', '').toUpperCase()}
                    </Text>
                  </View>
                  {progress.bestStreak === streak && streak > 0 && (
                    <View style={styles.personalBestBadge}>
                      <Ionicons name="trophy" size={10} color={Colors.gold} />
                      <Text style={styles.personalBestText}>{t('profile.streak.personalBest')}</Text>
                    </View>
                  )}
                </View>
              </View>

              {/* Streak phrase */}
              <Text style={styles.transformPhrase}>
                {getStreakPhrase(streak, progress.currentDay)}
              </Text>

              {/* Mini stats row */}
              <View style={styles.transformStatsRow}>
                <View style={styles.transformStat}>
                  <Text style={styles.transformStatNum}>{total}</Text>
                  <Text style={styles.transformStatLabel}>{t('profile.stat.resetsDone')}</Text>
                </View>
                <View style={styles.transformStatDivider} />
                <View style={styles.transformStat}>
                  <Text style={styles.transformStatNum}>{progress.bestStreak}</Text>
                  <Text style={styles.transformStatLabel}>{t('profile.stat.bestStreak')}</Text>
                </View>
                <View style={styles.transformStatDivider} />
                <View style={styles.transformStat}>
                  <Text style={styles.transformStatNum}>{weeklyScore}/7</Text>
                  <Text style={styles.transformStatLabel}>{t('profile.stat.thisWeek')}</Text>
                </View>
              </View>
            </View>
          </View>
        )}

        {/* ── 3. JOURNEY MILESTONES ────────────────────────────── */}
        <View style={styles.section}>
          <Text style={styles.sectionEyebrow}>{t('profile.section.journey')}</Text>
          <View style={styles.journeyCard}>

            {/* Last milestone */}
            {lastMilestone && lastMilestone > 0 ? (
              <View style={styles.journeyRow}>
                <View style={styles.journeyDotDone}>
                  <Ionicons name="checkmark" size={13} color={Colors.charcoal} />
                </View>
                <View style={styles.journeyTextWrap}>
                  <Text style={styles.journeyDoneLabel}>{t('profile.milestone.dayReached', { n: lastMilestone ?? 0 })}</Text>
                  <Text style={styles.journeyDoneSub}>{t('profile.milestone.unlocked')}</Text>
                </View>
                <View style={styles.journeyDonePill}>
                  <Text style={styles.journeyDonePillText}>✓</Text>
                </View>
              </View>
            ) : (
              <View style={styles.journeyRow}>
                <View style={styles.journeyDotEmpty}>
                  <Text style={styles.journeyDotEmptyText}>1</Text>
                </View>
                <View style={styles.journeyTextWrap}>
                  <Text style={styles.journeyNextLabel}>{t('profile.milestone.firstReset')}</Text>
                  <Text style={styles.journeyNextSub}>{t('profile.milestone.beginToday')}</Text>
                </View>
              </View>
            )}

            {/* Divider line */}
            {nextMilestone && (
              <View style={styles.journeyConnector} />
            )}

            {/* Next milestone */}
            {nextMilestone && daysToNext !== null && (
              <View style={styles.journeyRow}>
                <View style={styles.journeyDotNext}>
                  <Text style={styles.journeyDotNextText}>{nextMilestone}</Text>
                </View>
                <View style={styles.journeyTextWrap}>
                  <Text style={styles.journeyNextLabel}>{t('profile.milestone.dayAhead', { n: nextMilestone ?? 0 })}</Text>
                  <Text style={styles.journeyNextSub}>
                    {daysToNext === 0
                      ? t('profile.milestone.youReThere')
                      : daysToNext === 1
                      ? t('profile.milestone.oneDayAway')
                      : t('profile.milestone.daysAway', { n: daysToNext ?? 0 })}
                  </Text>
                </View>
                <View style={styles.journeyNextPill}>
                  <Text style={styles.journeyNextPillText}>{daysToNext}d</Text>
                </View>
              </View>
            )}

            {/* Rotating emotional footer */}
            <View style={styles.journeyFooterRow}>
              <Text style={styles.journeyFooter}>{journeyFooter}</Text>
            </View>
          </View>
        </View>

        {/* ── 4. MY GOALS ──────────────────────────────────────── */}
        {goals.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionEyebrow}>{t('profile.section.intentions')}</Text>
            <View style={styles.goalsWrap}>
              {goals.map(g => (
                <View key={g} style={styles.goalPill}>
                  <Ionicons name="checkmark-circle" size={13} color={Colors.accent} />
                  <Text style={styles.goalText}>{g.replace(/-/g, ' ')}</Text>
                </View>
              ))}
            </View>
          </View>
        )}

        {/* ── 5. EMOTIONAL JOURNEY ─────────────────────────────── */}
        {/* Always visible — adapts to whether a recovery path has been chosen. */}
        <View style={styles.section}>
          <Text style={styles.sectionEyebrow}>{t('profile.journey.eyebrow')}</Text>
          <TouchableOpacity
            style={styles.profileJourneyCard}
            onPress={() => setShowProfilePicker(true)}
            activeOpacity={0.82}
          >
            <View style={styles.profileJourneyLeft}>
              <View style={styles.profileJourneyIconWrap}>
                <Ionicons
                  name={
                    profile === 'focus'      ? 'flash'           :
                    profile === 'calm'       ? 'leaf'            :
                    profile === 'confidence' ? 'star'            :
                    profile === 'burnout'    ? 'heart'           :
                    'compass-outline'
                  }
                  size={18}
                  color={Colors.gold}
                />
              </View>
              <View style={styles.profileJourneyText}>
                <Text style={styles.profileJourneyLabel}>
                  {profile
                    ? getProfileLabel(profile, contextLang)
                    : t('profile.journey.fallback')}
                </Text>
                <Text style={styles.profileJourneyDesc}>
                  {profile
                    ? getProfileDescriptionShort(profile, progress.currentDay, contextLang)
                    : t('profile.modal.journey.sub')}
                </Text>
              </View>
            </View>
            <Text style={styles.profileJourneyChange}>
              {profile ? t('profile.journey.change') : t('profile.journey.choose')}
            </Text>
          </TouchableOpacity>
        </View>

        {/* ── 6. SETTINGS — staggered fade-in ─────────────────── */}
        <View style={styles.section}>
          <Text style={styles.sectionEyebrow}>{t('profile.settings.title')}</Text>
          {rows.map((row, index) => {
            const isDanger = 'danger' in row && row.danger;
            return (
              <SettingsRowAnimated
                key={row.label}
                index={index}
                icon={row.icon}
                label={row.label}
                value={'value' in row ? row.value : undefined}
                isDanger={isDanger}
                onPress={'onPress' in row ? row.onPress : undefined}
              />
            );
          })}
        </View>

        {__DEV__ ? (
          <TouchableOpacity
            onPress={() => { setDevDone(null); setShowDevPanel(true); }}
            activeOpacity={0.6}
          >
            <Text style={styles.version}>{t('profile.version')}  ⚙ DEV</Text>
          </TouchableOpacity>
        ) : (
          <Text style={styles.version}>{t('profile.version')}</Text>
        )}
      </ScrollView>

      {/* ── Reset Confirmation Modal ────────────────────────────────────── */}
      <Modal
        visible={showResetModal}
        animationType="fade"
        transparent
        onRequestClose={() => setShowResetModal(false)}
      >
        <View style={styles.resetModalOverlay}>
          <View style={styles.resetModalCard}>
            <View style={styles.resetModalIconWrap}>
              <Ionicons name="trash-outline" size={24} color={Colors.danger} />
            </View>
            <Text style={styles.resetModalTitle}>{t('profile.reset.title')}</Text>
            <Text style={styles.resetModalMsg}>{t('profile.reset.msg')}</Text>
            <View style={styles.resetModalActions}>
              <TouchableOpacity
                style={styles.resetModalCancel}
                onPress={() => setShowResetModal(false)}
                activeOpacity={0.75}
              >
                <Text style={styles.resetModalCancelText}>{t('profile.reset.cancel')}</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.resetModalConfirm}
                onPress={handleConfirmReset}
                activeOpacity={0.75}
              >
                <Text style={styles.resetModalConfirmText}>{t('profile.reset.confirm')}</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

      {/* ── Language Picker Modal ───────────────────────────────────────── */}
      <Modal
        visible={showLangPicker}
        animationType="slide"
        transparent
        onRequestClose={() => setShowLangPicker(false)}
      >
        <TouchableOpacity
          style={styles.langOverlay}
          activeOpacity={1}
          onPress={() => setShowLangPicker(false)}
        >
          <View style={styles.langSheet}>
            {/* Drag indicator */}
            <View style={styles.langHandle} />

            {/* Header */}
            <View style={styles.langHeader}>
              <Text style={styles.langEyebrow}>{t('lang.chooseLang')}</Text>
              <Text style={styles.langTitle}>{t('lang.chooseLangTitle')}</Text>
            </View>

            {/* Language cards */}
            {([
              { code: 'en' as Lang, label: 'English',   sub: 'United States',   flag: '🇺🇸' },
              { code: 'pt' as Lang, label: 'Português', sub: 'Brasil',          flag: '🇧🇷' },
              { code: 'es' as Lang, label: 'Spanish',   sub: 'España · México', flag: '🇪🇸' },
              { code: 'fr' as Lang, label: 'Français',  sub: 'France',          flag: '🇫🇷' },
              { code: 'de' as Lang, label: 'Deutsch',   sub: 'Deutschland',     flag: '🇩🇪' },
            ]).map(option => {
              const sel = lang === option.code;
              return (
                <Animated.View
                  key={option.code}
                  style={{ transform: [{ scale: langScales[option.code] ?? 1 }] }}
                >
                  <TouchableOpacity
                    style={[styles.langOption, sel && styles.langOptionActive]}
                    onPress={() => handleSelectLang(option.code)}
                    activeOpacity={1}
                  >
                    {/* Flag container */}
                    <View style={styles.langFlagWrap}>
                      <Text style={styles.langFlag}>{option.flag}</Text>
                    </View>

                    {/* Text */}
                    <View style={styles.langTextWrap}>
                      <Text style={[styles.langLabel, sel && styles.langLabelActive]}>
                        {option.label}
                      </Text>
                    </View>

                    {/* Premium animated check — always rendered, opacity-driven */}
                    <Animated.View
                      style={[styles.langCheck, { opacity: langCheckOpacity[option.code] }]}
                    >
                      <Ionicons name="checkmark" size={10} color={Colors.gold} />
                    </Animated.View>
                  </TouchableOpacity>
                </Animated.View>
              );
            })}
          </View>
        </TouchableOpacity>
      </Modal>

      {/* ── Emotional Profile Picker Modal ──────────────────────────────── */}
      <Modal
        visible={showProfilePicker}
        animationType="slide"
        transparent
        onRequestClose={() => setShowProfilePicker(false)}
      >
        <TouchableOpacity
          style={styles.langOverlay}
          activeOpacity={1}
          onPress={() => setShowProfilePicker(false)}
        >
          <View style={styles.profilePickerSheet}>
            <Text style={styles.profilePickerTitle}>{t('profile.modal.journey.title')}</Text>
            <Text style={styles.profilePickerSub}>{t('profile.modal.journey.sub')}</Text>
            {ALL_PROFILES.map(p => {
              const sel = profile === p.id;
              return (
                <TouchableOpacity
                  key={p.id}
                  style={[styles.profilePickerOption, sel && styles.profilePickerOptionSelected]}
                  onPress={async () => {
                    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
                    await setProfile(p.id as EmotionalProfile);
                    setShowProfilePicker(false);
                  }}
                  activeOpacity={0.82}
                >
                  <View style={styles.profilePickerLeft}>
                    <Text style={[styles.profilePickerLabel, sel && styles.profilePickerLabelSelected]}>
                      {getProfileLabel(p.id as EmotionalProfile, contextLang)}
                    </Text>
                    <Text style={styles.profilePickerDesc}>{getProfileSubtitle(p.id as EmotionalProfile, contextLang)}</Text>
                  </View>
                  {sel && (
                    <View style={styles.profilePickerCheck}>
                      <Ionicons name="checkmark" size={13} color={Colors.charcoal} />
                    </View>
                  )}
                </TouchableOpacity>
              );
            })}
          </View>
        </TouchableOpacity>
      </Modal>

      {/* ── Terms of Service Modal ──────────────────────────────────────── */}
      <Modal
        visible={showTerms}
        animationType="slide"
        presentationStyle="pageSheet"
        onRequestClose={() => setShowTerms(false)}
      >
        <View style={styles.modal}>
          <View style={styles.modalHeader}>
            <View style={styles.modalHeaderLeft}>
              <View style={styles.modalIconWrap}>
                <Ionicons name="reader-outline" size={18} color={Colors.gold} />
              </View>
              <Text style={styles.modalTitle}>{t('profile.modal.terms')}</Text>
            </View>
            <TouchableOpacity onPress={() => setShowTerms(false)} style={styles.modalClose}>
              <View style={styles.modalCloseWrap}>
                <Ionicons name="close" size={18} color={Colors.textPrimary} />
              </View>
            </TouchableOpacity>
          </View>

          <ScrollView
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.modalContent}
          >
            <Text style={styles.modalEyebrow}>DAILY RESET APP</Text>
            <Text style={styles.modalSubtitle}>
              {contextLang === 'pt' ? 'Última atualização: maio de 2026' : contextLang === 'es' ? 'Última actualización: mayo de 2026' : contextLang === 'fr' ? 'Dernière mise à jour : mai 2026' : contextLang === 'de' ? 'Zuletzt aktualisiert: Mai 2026' : 'Last updated: May 2026'}
            </Text>

            {(contextLang === 'pt' ? TERMS_SECTIONS_PT : contextLang === 'es' ? TERMS_SECTIONS_ES : contextLang === 'fr' ? TERMS_SECTIONS_FR : contextLang === 'de' ? TERMS_SECTIONS_DE : TERMS_SECTIONS).map((sec, i) => (
              <View key={i} style={styles.privacySection}>
                <Text style={styles.privacySectionTitle}>{sec.title}</Text>
                <Text style={styles.privacySectionBody}>{sec.body}</Text>
              </View>
            ))}

            <View style={styles.privacyFooter}>
              <Text style={styles.privacyFooterText}>
                {t('profile.modal.terms.footer')}
              </Text>
            </View>
          </ScrollView>
        </View>
      </Modal>

      {/* ── Privacy Policy Modal ─────────────────────────────────────────── */}
      <Modal
        visible={showPrivacy}
        animationType="slide"
        presentationStyle="pageSheet"
        onRequestClose={() => setShowPrivacy(false)}
      >
        <View style={styles.modal}>
          {/* Header */}
          <View style={styles.modalHeader}>
            <View style={styles.modalHeaderLeft}>
              <View style={styles.modalIconWrap}>
                <Ionicons name="document-text-outline" size={18} color={Colors.gold} />
              </View>
              <Text style={styles.modalTitle}>{t('profile.modal.privacy')}</Text>
            </View>
            <TouchableOpacity onPress={() => setShowPrivacy(false)} style={styles.modalClose}>
              <View style={styles.modalCloseWrap}>
                <Ionicons name="close" size={18} color={Colors.textPrimary} />
              </View>
            </TouchableOpacity>
          </View>

          <ScrollView
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.modalContent}
          >
            {/* Intro */}
            <Text style={styles.modalEyebrow}>DAILY RESET APP</Text>
            <Text style={styles.modalSubtitle}>
              {contextLang === 'pt' ? 'Última atualização: maio de 2026' : contextLang === 'es' ? 'Última actualización: mayo de 2026' : contextLang === 'fr' ? 'Dernière mise à jour : mai 2026' : contextLang === 'de' ? 'Zuletzt aktualisiert: Mai 2026' : 'Last updated: May 2026'}
            </Text>

            {/* Sections */}
            {(contextLang === 'pt' ? PRIVACY_SECTIONS_PT : contextLang === 'es' ? PRIVACY_SECTIONS_ES : contextLang === 'fr' ? PRIVACY_SECTIONS_FR : contextLang === 'de' ? PRIVACY_SECTIONS_DE : PRIVACY_SECTIONS).map((sec, i) => (
              <View key={i} style={styles.privacySection}>
                <Text style={styles.privacySectionTitle}>{sec.title}</Text>
                <Text style={styles.privacySectionBody}>{sec.body}</Text>
              </View>
            ))}

            <View style={styles.privacyFooter}>
              <Text style={styles.privacyFooterText}>
                {t('profile.modal.privacy.footer')}
              </Text>
            </View>
          </ScrollView>
        </View>
      </Modal>
      {/* ── DEV Time Travel Modal ───────────────────────────────────── */}
      {__DEV__ && (
        <Modal
          visible={showDevPanel}
          animationType="slide"
          transparent
          onRequestClose={() => setShowDevPanel(false)}
        >
          <View style={styles.devOverlay}>
            <TouchableOpacity
              style={StyleSheet.absoluteFillObject as any}
              activeOpacity={1}
              onPress={() => setShowDevPanel(false)}
            />
            <View style={styles.devSheet}>

              {/* Header */}
              <View style={styles.devHeader}>
                <View>
                  <Text style={styles.devBadge}>DEV ONLY</Text>
                  <Text style={styles.devTitle}>Developer Time Travel</Text>
                </View>
                <TouchableOpacity onPress={() => setShowDevPanel(false)} style={styles.devClose}>
                  <Ionicons name="close" size={22} color="#666" />
                </TouchableOpacity>
              </View>

              {/* Current state */}
              <View style={styles.devStatus}>
                <Text style={styles.devStatusText}>
                  {'Day '}
                  <Text style={styles.devStatusVal}>{progress.currentDay}</Text>
                  {'   Streak '}
                  <Text style={styles.devStatusVal}>{progress.streak}</Text>
                  {'   Resets '}
                  <Text style={styles.devStatusVal}>{progress.completedDays.length}</Text>
                </Text>
                {getAppDateOffset() !== 0 && (
                  <Text style={[styles.devStatusText, { marginTop: 4 }]}>
                    {'Date offset: '}
                    <Text style={[styles.devStatusVal, { color: '#4A90D9' }]}>
                      {`+${getAppDateOffset()} day${getAppDateOffset() !== 1 ? 's' : ''} (simulated)`}
                    </Text>
                  </Text>
                )}
              </View>

              {/* Action buttons */}
              {([
                { label: '→ Advance 1 Day',         icon: 'arrow-forward-circle-outline', color: '#4A90D9', fn: () => devAdvanceDays(1)  },
                { label: '→ Advance 7 Days',         icon: 'arrow-forward-circle-outline', color: '#4A90D9', fn: () => devAdvanceDays(7)  },
                { label: '→ Advance 30 Days',        icon: 'arrow-forward-circle-outline', color: '#4A90D9', fn: () => devAdvanceDays(30) },
                { label: '⚠ Simulate Missed 3 Days', icon: 'flame-outline',                color: '#E8B840', fn: () => devBreak(3)        },
                { label: '↩ Return to Real Today',   icon: 'refresh-circle-outline',       color: '#3DB86A', fn: devReturnToday           },
                { label: '⭐ Grant Premium',          icon: 'star-outline',                 color: '#C9A84C', fn: devGrantPremium          },
                { label: '✕ Reset Dev Time',          icon: 'trash-outline',                color: '#E04040', fn: devResetTime             },
              ] as const).map(({ label, icon, color, fn }) => (
                <TouchableOpacity
                  key={label}
                  style={[styles.devBtn, devBusy && styles.devBtnDisabled]}
                  onPress={async () => {
                    if (devBusy) return;
                    setDevBusy(true);
                    setDevDone(null);
                    await fn();
                    setDevBusy(false);
                    setDevDone(label);
                    // After reset: navigate to '/' (index).
                    // This dismounts the entire tab navigator so ALL hooks
                    // (useWeeklyRecap, useReflections, useProgress, etc.)
                    // reinitialize from the now-empty AsyncStorage.
                    // index.tsx reads ONBOARDING_DONE and redirects correctly.
                    if (label.includes('Reset Dev Time')) {
                      setShowDevPanel(false);
                      router.replace('/');
                    }
                  }}
                  activeOpacity={0.72}
                >
                  <Ionicons name={icon as any} size={16} color={color} />
                  <Text style={[styles.devBtnLabel, { color }]}>{label}</Text>
                  {devDone === label && (
                    <Ionicons name="checkmark-circle" size={16} color="#3DB86A" style={{ marginLeft: 'auto' }} />
                  )}
                </TouchableOpacity>
              ))}

              {/* Footer hint */}
              <Text style={styles.devFooter}>
                {devDone
                  ? '✓ Done — switch to the Today tab to see changes'
                  : 'Tap an action. Then switch to the Today tab.'}
              </Text>

            </View>
          </View>
        </Modal>
      )}

    </View>
  );
}

// ─── Styles ───────────────────────────────────────────────────────────────────
const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.background },
  scroll: { paddingBottom: 80 },
  ambientTop: { position: 'absolute', top: 0, left: 0, right: 0, height: 280, backgroundColor: 'rgba(201,151,58,0.022)', zIndex: 0 },
  ambientBottom: { position: 'absolute', bottom: 0, left: 0, right: 0, height: 180, backgroundColor: 'rgba(201,151,58,0.016)', zIndex: 0 },

  hero: {
    alignItems: 'center',
    paddingTop: 52,
    paddingBottom: Spacing.xl,
    paddingHorizontal: Spacing.xl,
    gap: 8,
    backgroundColor: 'rgba(201,151,58,0.018)',
  },

  nameRow: { flexDirection: 'row', alignItems: 'center', gap: Spacing.xs },
  name: { fontSize: Typography.sizes.xl, fontWeight: Typography.weights.bold, color: Colors.textPrimary, letterSpacing: -0.3 },
  nameEmpty: {
    fontSize: Typography.sizes.base,
    color: Colors.textMuted,
    fontStyle: 'italic',
    letterSpacing: 0.1,
  },
  memberSince: {
    fontSize: 11,
    color: Colors.textMuted,
    letterSpacing: 0.3,
    marginTop: 2,
  },
  nameInput: {
    fontSize: Typography.sizes.xl, color: Colors.textPrimary,
    borderBottomWidth: 2, borderBottomColor: Colors.accent,
    minWidth: 180, paddingVertical: 4,
  },
  saveBtn: { padding: Spacing.sm },

  premiumPill: {
    flexDirection: 'row', alignItems: 'center', gap: 5,
    backgroundColor: Colors.accent, paddingHorizontal: Spacing.md,
    paddingVertical: 7, borderRadius: Radii.full, ...Shadows.accent,
  },
  premiumText: { fontSize: Typography.sizes.xs, fontWeight: Typography.weights.heavy, color: Colors.charcoal, letterSpacing: 1 },

  upgradeBtn: { borderRadius: Radii.full, backgroundColor: Colors.charcoal, ...Shadows.charcoal },
  upgradeBtnInner: {
    flexDirection: 'row', alignItems: 'center',
    paddingVertical: 12, paddingHorizontal: Spacing.xl, gap: Spacing.sm,
  },
  upgradeText: { fontSize: Typography.sizes.sm, fontWeight: Typography.weights.bold, color: Colors.white },

  section: { paddingHorizontal: Spacing.xl, marginTop: 28 },
  sectionTitle: { fontSize: Typography.sizes.xs, fontWeight: Typography.weights.bold, color: Colors.gold, letterSpacing: 1.8, marginBottom: 14, opacity: 0.85 },
  sectionEyebrow: { fontSize: Typography.sizes.xs, fontWeight: Typography.weights.bold, color: Colors.gold, letterSpacing: 1.8, marginBottom: 14, opacity: 0.85 },

  // Transformation title in hero
  transformTitle: {
    fontSize: Typography.sizes.xl,
    fontWeight: Typography.weights.black,
    color: Colors.textPrimary,
    letterSpacing: -0.3,
    textAlign: 'center',
  },
  transformSub: {
    fontSize: Typography.sizes.sm,
    color: Colors.textSecondary,
    textAlign: 'center',
    fontStyle: 'italic',
    lineHeight: 20,
    paddingHorizontal: Spacing.lg,
  },

  // Transformation card
  transformCard: {
    backgroundColor: '#FEFCF8',
    borderRadius: Radii.xl,
    padding: Spacing.lg,
    borderWidth: 1,
    borderColor: 'rgba(239,201,76,0.40)',
    gap: Spacing.md,
    shadowColor: Colors.accent,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.09,
    shadowRadius: 18,
    elevation: 4,
  },
  transformTop: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start' },
  transformStreakBig: { fontSize: 56, fontWeight: Typography.weights.black, color: Colors.textPrimary, letterSpacing: -2, lineHeight: 56 },
  transformStreakUnit: { fontSize: Typography.sizes.xs, color: Colors.textSecondary, marginTop: 2 },
  transformRight: { alignItems: 'flex-end', gap: Spacing.sm },
  identityTierPill: {
    backgroundColor: Colors.accentDim, borderRadius: Radii.full,
    paddingHorizontal: Spacing.md, paddingVertical: 5,
    borderWidth: 1, borderColor: Colors.accent,
  },
  identityTierText: { fontSize: 9, fontWeight: Typography.weights.heavy, color: Colors.gold, letterSpacing: 1.5 },
  personalBestBadge: { flexDirection: 'row', alignItems: 'center', gap: 4 },
  personalBestText: { fontSize: Typography.sizes.xs, color: Colors.gold, fontWeight: Typography.weights.semibold },
  transformPhrase: { fontSize: Typography.sizes.sm, color: Colors.textSecondary, fontStyle: 'italic', lineHeight: 20 },
  transformStatsRow: {
    flexDirection: 'row', alignItems: 'center',
    backgroundColor: Colors.backgroundSecondary,
    borderRadius: Radii.lg, padding: Spacing.md,
  },
  transformStat: { flex: 1, alignItems: 'center', gap: 2 },
  transformStatNum: { fontSize: Typography.sizes.lg, fontWeight: Typography.weights.black, color: Colors.textPrimary, letterSpacing: -0.3 },
  transformStatLabel: { fontSize: 9, color: Colors.textMuted, textAlign: 'center', textTransform: 'uppercase', letterSpacing: 0.5 },
  transformStatDivider: { width: 1, height: 28, backgroundColor: Colors.border },

  // Journey milestones
  journeyCard: {
    backgroundColor: '#FEFCF8',
    borderRadius: Radii.xl,
    padding: Spacing.lg,
    borderWidth: 1,
    borderColor: 'rgba(201,151,58,0.08)',
    ...Shadows.card,
  },
  journeyFooterRow: {
    marginTop: Spacing.md,
    paddingTop: Spacing.sm,
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: 'rgba(201,151,58,0.12)',
  },
  journeyFooter: {
    fontSize: 11,
    color: Colors.textMuted,
    fontStyle: 'italic',
    textAlign: 'center',
    letterSpacing: 0.2,
  },
  journeyRow: { flexDirection: 'row', alignItems: 'center', gap: Spacing.md },
  journeyConnector: { width: 1, height: 20, backgroundColor: Colors.border, marginLeft: 15, marginVertical: 4 },
  journeyDotDone: {
    width: 32, height: 32, borderRadius: 16,
    backgroundColor: Colors.accent, alignItems: 'center', justifyContent: 'center', flexShrink: 0,
  },
  journeyDotEmpty: {
    width: 32, height: 32, borderRadius: 16,
    backgroundColor: Colors.backgroundSecondary,
    borderWidth: 1.5, borderColor: Colors.border,
    alignItems: 'center', justifyContent: 'center', flexShrink: 0,
  },
  journeyDotEmptyText: { fontSize: Typography.sizes.xs, fontWeight: Typography.weights.bold, color: Colors.textMuted },
  journeyDotNext: {
    width: 32, height: 32, borderRadius: 16,
    backgroundColor: Colors.accentDim,
    borderWidth: 1.5, borderColor: Colors.accent,
    alignItems: 'center', justifyContent: 'center', flexShrink: 0,
  },
  journeyDotNextText: { fontSize: 9, fontWeight: Typography.weights.bold, color: Colors.gold },
  journeyTextWrap: { flex: 1, gap: 2 },
  journeyDoneLabel: { fontSize: Typography.sizes.sm, fontWeight: Typography.weights.bold, color: Colors.textPrimary },
  journeyDoneSub: { fontSize: Typography.sizes.xs, color: Colors.textSecondary },
  journeyNextLabel: { fontSize: Typography.sizes.sm, fontWeight: Typography.weights.semibold, color: Colors.textMuted },
  journeyNextSub: { fontSize: Typography.sizes.xs, color: Colors.textMuted },
  journeyDonePill: { backgroundColor: Colors.success, borderRadius: Radii.full, width: 24, height: 24, alignItems: 'center', justifyContent: 'center' },
  journeyDonePillText: { fontSize: Typography.sizes.xs, color: Colors.white, fontWeight: Typography.weights.bold },
  journeyNextPill: { backgroundColor: Colors.accentDim, borderRadius: Radii.full, paddingHorizontal: Spacing.sm, paddingVertical: 3, borderWidth: 1, borderColor: Colors.accent },
  journeyNextPillText: { fontSize: Typography.sizes.xs, color: Colors.gold, fontWeight: Typography.weights.bold },

  goalsWrap: { flexDirection: 'row', flexWrap: 'wrap', gap: Spacing.sm },
  goalPill: {
    flexDirection: 'row', alignItems: 'center', gap: 6,
    backgroundColor: '#FEFCF8', borderRadius: Radii.full,
    paddingHorizontal: Spacing.md, paddingVertical: 7,
    borderWidth: 1, borderColor: 'rgba(201,168,76,0.30)',
  },
  goalText: { fontSize: Typography.sizes.xs, color: Colors.charcoal, fontWeight: Typography.weights.semibold, textTransform: 'capitalize' },

  row: {
    flexDirection: 'row', alignItems: 'center',
    backgroundColor: '#FEFCF8', borderRadius: Radii.lg,
    paddingVertical: 14, paddingHorizontal: Spacing.md, marginBottom: Spacing.sm, gap: Spacing.md,
    borderWidth: 1, borderColor: 'rgba(201,168,76,0.08)', ...Shadows.card,
  },
  rowIcon: {
    width: 32, height: 32, borderRadius: 16,
    backgroundColor: '#F5F0E8',
    alignItems: 'center', justifyContent: 'center',
  },
  rowIconDanger: { backgroundColor: 'rgba(224,64,64,0.1)' },
  rowLabel: { flex: 1, fontSize: Typography.sizes.sm, fontWeight: Typography.weights.medium, color: Colors.textPrimary },
  rowLabelDanger: { color: Colors.danger },
  rowValue: { fontSize: Typography.sizes.sm, color: Colors.textMuted },
  version: { textAlign: 'center', fontSize: Typography.sizes.xs, color: Colors.textMuted, marginTop: Spacing.xxl },

  // ── Reset Confirmation Modal ──────────────────────────────────────────────
  resetModalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(20,16,8,0.6)',
    alignItems: 'center',
    justifyContent: 'center',
    padding: Spacing.xl,
  },
  resetModalCard: {
    backgroundColor: Colors.card,
    borderRadius: Radii.xxl,
    padding: Spacing.xl,
    alignItems: 'center',
    width: '100%',
    maxWidth: 360,
    ...Shadows.cardStrong,
  },
  resetModalIconWrap: {
    width: 52, height: 52, borderRadius: 26,
    backgroundColor: 'rgba(224,64,64,0.1)',
    alignItems: 'center', justifyContent: 'center',
    marginBottom: Spacing.md,
  },
  resetModalTitle: {
    fontSize: Typography.sizes.lg,
    fontWeight: Typography.weights.bold,
    color: Colors.textPrimary,
    textAlign: 'center',
    marginBottom: Spacing.sm,
  },
  resetModalMsg: {
    fontSize: Typography.sizes.sm,
    color: Colors.textSecondary,
    textAlign: 'center',
    lineHeight: 20,
    marginBottom: Spacing.xl,
  },
  resetModalActions: {
    flexDirection: 'row',
    gap: Spacing.sm,
    width: '100%',
  },
  resetModalCancel: {
    flex: 1,
    paddingVertical: Spacing.md,
    borderRadius: Radii.lg,
    backgroundColor: Colors.backgroundSecondary,
    alignItems: 'center',
  },
  resetModalCancelText: {
    fontSize: Typography.sizes.sm,
    fontWeight: Typography.weights.semibold,
    color: Colors.textPrimary,
  },
  resetModalConfirm: {
    flex: 1,
    paddingVertical: Spacing.md,
    borderRadius: Radii.lg,
    backgroundColor: Colors.danger,
    alignItems: 'center',
  },
  resetModalConfirmText: {
    fontSize: Typography.sizes.sm,
    fontWeight: Typography.weights.semibold,
    color: '#FFFFFF',
  },

  // ── Language Picker ───────────────────────────────────────────────────────
  langOverlay: {
    flex: 1,
    backgroundColor: 'rgba(20,16,8,0.45)',
    justifyContent: 'flex-end',
  },
  langSheet: {
    backgroundColor: Colors.card,
    borderTopLeftRadius: 28,
    borderTopRightRadius: 28,
    paddingHorizontal: Spacing.xl,
    paddingTop: Spacing.md,
    paddingBottom: 52,
    gap: 8,                          // tighter rhythm between cards
    shadowColor: '#1C1C1C',
    shadowOffset: { width: 0, height: -8 },
    shadowOpacity: 0.12,
    shadowRadius: 28,
    elevation: 16,
  },
  langHandle: {
    width: 36, height: 4,
    borderRadius: 2,
    backgroundColor: 'rgba(28,28,28,0.14)',
    alignSelf: 'center',
    marginBottom: Spacing.sm,        // tighter top breathing
  },
  langHeader: {
    alignItems: 'center',
    paddingBottom: Spacing.sm,       // less padding below header
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: 'rgba(28,28,28,0.07)',
    marginBottom: 4,
  },
  langEyebrow: {
    fontSize: Typography.sizes.xs,
    fontWeight: Typography.weights.bold,
    color: Colors.gold,
    letterSpacing: 2,
    marginBottom: 3,
  },
  langTitle: {
    fontSize: Typography.sizes.sm,   // reduced from base → sm, more refined
    fontWeight: Typography.weights.heavy,
    color: Colors.textPrimary,
    letterSpacing: -0.1,
  },
  langOption: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.md,
    backgroundColor: Colors.background,
    borderRadius: Radii.lg,          // slightly tighter corners
    paddingVertical: 9,              // compact: was 11
    paddingHorizontal: Spacing.md,   // was base (16) → md (12), tighter
    borderWidth: 1,
    borderColor: 'rgba(28,28,28,0.07)',
  },
  langOptionActive: {
    borderColor: Colors.accent,
    borderWidth: 1.5,
    backgroundColor: Colors.accentDim,
    shadowColor: Colors.accent,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.12,
    shadowRadius: 8,
    elevation: 3,
  },
  langFlagWrap: {
    width: 34, height: 34,           // reduced from 38 → 34, less dominant
    borderRadius: Radii.sm,          // tighter radius for smaller size
    backgroundColor: Colors.backgroundSecondary,
    alignItems: 'center', justifyContent: 'center',
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: 'rgba(28,28,28,0.06)',
  },
  langFlag: { fontSize: 17 },        // reduced from 20 → 17
  langTextWrap: { flex: 1, justifyContent: 'center' },
  langLabel: {
    fontSize: Typography.sizes.sm,
    fontWeight: Typography.weights.bold,  // stronger: was semibold → bold
    color: '#7A7A7A',                     // slightly darker for better contrast
    letterSpacing: 0.1,
  },
  langLabelActive: { color: Colors.textPrimary },
  langSub: {
    fontSize: 10,
    color: '#B0B0B0',
    letterSpacing: 0.1,
    lineHeight: 13,
  },
  // Thin gold-outlined circle — premium, Apple Health-like
  langCheck: {
    width: 18, height: 18,
    borderRadius: 9,
    borderWidth: 1.5,
    borderColor: Colors.gold,          // thin gold ring, no fill
    backgroundColor: 'transparent',
    alignItems: 'center', justifyContent: 'center',
  },

  // ── Modal ──────────────────────────────────────────────────────────────────
  modal: { flex: 1, backgroundColor: Colors.background },

  modalHeader: {
    flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between',
    paddingHorizontal: Spacing.xl, paddingTop: Spacing.xl, paddingBottom: Spacing.base,
    borderBottomWidth: 1, borderBottomColor: Colors.borderLight,
    backgroundColor: Colors.card,
  },
  modalHeaderLeft: { flexDirection: 'row', alignItems: 'center', gap: Spacing.md },
  modalIconWrap: {
    width: 36, height: 36, borderRadius: 18,
    backgroundColor: Colors.accentDim,
    alignItems: 'center', justifyContent: 'center',
  },
  modalTitle: { fontSize: Typography.sizes.lg, fontWeight: Typography.weights.bold, color: Colors.textPrimary },
  modalClose: { padding: Spacing.xs },
  modalCloseWrap: {
    width: 32, height: 32, borderRadius: 16,
    backgroundColor: Colors.backgroundSecondary,
    alignItems: 'center', justifyContent: 'center',
  },

  modalContent: { paddingHorizontal: Spacing.xl, paddingTop: Spacing.xl, paddingBottom: 60 },

  modalEyebrow: {
    fontSize: Typography.sizes.xs, fontWeight: Typography.weights.bold,
    color: Colors.gold, letterSpacing: 2, marginBottom: Spacing.xs,
  },
  modalSubtitle: { fontSize: Typography.sizes.sm, color: Colors.textMuted, marginBottom: Spacing.xl },

  privacySection: {
    marginBottom: Spacing.xl,
    backgroundColor: Colors.card,
    borderRadius: Radii.lg,
    padding: Spacing.base,
    borderWidth: 1,
    borderColor: Colors.borderLight,
    ...Shadows.card,
  },
  privacySectionTitle: {
    fontSize: Typography.sizes.sm,
    fontWeight: Typography.weights.bold,
    color: Colors.textPrimary,
    marginBottom: Spacing.sm,
    letterSpacing: -0.1,
  },
  privacySectionBody: {
    fontSize: Typography.sizes.sm,
    color: Colors.textSecondary,
    lineHeight: 22,
  },

  privacyFooter: {
    marginTop: Spacing.md,
    paddingTop: Spacing.lg,
    borderTopWidth: 1,
    borderTopColor: Colors.borderLight,
    alignItems: 'center',
  },
  privacyFooterText: {
    fontSize: Typography.sizes.xs,
    color: Colors.textMuted,
    textAlign: 'center',
    lineHeight: 18,
  },

  // ── Emotional Journey section ────────────────────────────────────────────────
  profileJourneyCard: {
    backgroundColor: '#FEFCF8',
    borderRadius: Radii.xl,
    padding: Spacing.base,
    borderWidth: 1,
    borderColor: 'rgba(201,168,76,0.09)',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    ...Shadows.card,
  },
  profileJourneyLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.md,
    flex: 1,
  },
  profileJourneyIconWrap: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: Colors.accentDim,
    alignItems: 'center',
    justifyContent: 'center',
  },
  profileJourneyText: {
    flex: 1,
    gap: 2,
  },
  profileJourneyLabel: {
    fontSize: Typography.sizes.sm,
    fontWeight: Typography.weights.semibold,
    color: Colors.textPrimary,
  },
  profileJourneyDesc: {
    fontSize: Typography.sizes.xs,
    color: Colors.textMuted,
    fontStyle: 'italic',
  },
  profileJourneyChange: {
    fontSize: Typography.sizes.xs,
    color: Colors.gold,
    fontWeight: Typography.weights.semibold,
  },

  // ── Profile picker modal ──────────────────────────────────────────────────────
  profilePickerSheet: {
    backgroundColor: Colors.card,
    borderRadius: Radii.xxl,
    padding: Spacing.xl,
    margin: Spacing.xl,
    gap: Spacing.md,
    ...Shadows.cardStrong,
  },
  profilePickerTitle: {
    fontSize: Typography.sizes.base,
    fontWeight: Typography.weights.black,
    color: Colors.textPrimary,
    letterSpacing: -0.3,
  },
  profilePickerSub: {
    fontSize: Typography.sizes.xs,
    color: Colors.textMuted,
    fontStyle: 'italic',
    lineHeight: 18,
    marginBottom: Spacing.sm,
  },
  profilePickerOption: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: Colors.backgroundSecondary,
    borderRadius: Radii.lg,
    padding: Spacing.base,
    borderWidth: 1.5,
    borderColor: Colors.borderLight,
  },
  profilePickerOptionSelected: {
    backgroundColor: Colors.accentDim,
    borderColor: Colors.accent,
  },
  profilePickerLeft: { flex: 1, gap: 2 },
  profilePickerLabel: {
    fontSize: Typography.sizes.sm,
    fontWeight: Typography.weights.semibold,
    color: Colors.textSecondary,
  },
  profilePickerLabelSelected: {
    color: Colors.textPrimary,
  },
  profilePickerDesc: {
    fontSize: Typography.sizes.xs,
    color: Colors.textMuted,
  },
  profilePickerCheck: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: Colors.accent,
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
  },

  // ── DEV Time Travel ───────────────────────────────────────────────────────────
  devOverlay: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0,0,0,0.55)',
  },
  devSheet: {
    backgroundColor: '#111',
    borderTopLeftRadius: 22,
    borderTopRightRadius: 22,
    paddingTop: 18,
    paddingHorizontal: 20,
    paddingBottom: 44,
    gap: 9,
  },
  devHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 4,
  },
  devBadge: {
    fontSize: 10,
    fontWeight: '700',
    color: '#E8B840',
    letterSpacing: 2,
    marginBottom: 2,
  },
  devTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#FFFFFF',
    letterSpacing: -0.3,
  },
  devClose: { padding: 4 },
  devStatus: {
    backgroundColor: '#1C1C1E',
    borderRadius: 11,
    padding: 12,
  },
  devStatusText: { fontSize: 13, color: '#888' },
  devStatusVal: { color: '#E8B840', fontWeight: '700' },
  devBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    backgroundColor: '#1C1C1E',
    borderRadius: 12,
    paddingVertical: 13,
    paddingHorizontal: 14,
  },
  devBtnDisabled: { opacity: 0.35 },
  devBtnLabel: { fontSize: 14, fontWeight: '600', flex: 1 },
  devFooter: {
    textAlign: 'center',
    fontSize: 12,
    color: '#555',
    fontStyle: 'italic',
    paddingTop: 4,
  },
});
