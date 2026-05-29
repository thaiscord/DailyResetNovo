O piscar entre abas continua exatamente igual no PWA/Web.

A correção anterior NÃO resolveu. Portanto, o problema provavelmente NÃO é animation: fade.

Agora investigue remount global e estado raiz.

Tarefas:

1. Verificar se as telas estão desmontando/remontando ao trocar abas.
Adicionar logs temporários em:
- app/(tabs)/today.tsx
- app/(tabs)/journal.tsx
- app/(tabs)/progress.tsx
- app/(tabs)/mindset.tsx
- app/(tabs)/profile.tsx

Logs:
console.log("MOUNT TODAY");
console.log("MOUNT JOURNAL");
console.log("MOUNT PROGRESS");
console.log("MOUNT MINDSET");
console.log("MOUNT PROFILE");

2. Se esses logs aparecem toda vez que troca de aba, encontrar o motivo do remount.

Procurar por:
- key={pathname}
- key={language}
- key={selectedLanguage}
- key={Date.now()}
- key={Math.random()}
- usePathname()
- useSegments()
- router.replace()
- router.push()
- conditional rendering no root layout
- return null
- splash screen
- loading state global
- isHydrated
- isReady
- onboarding check
- language check

3. Verificar app/_layout.tsx e app/(tabs)/_layout.tsx.
O layout raiz NÃO pode remontar a navegação inteira a cada troca de aba.

4. Se houver algum Provider envolvendo as tabs com key dinâmica, remover.

5. Se houver verificação de onboarding/idioma/progresso que roda a cada mudança de rota e renderiza tela vazia, alterar para manter a UI atual visível até terminar.

6. Garantir que a tab bar e as telas não tenham animação de opacity/fade no web.

7. Garantir que nenhum componente de fundo branco/loader apareça entre telas.

8. Não alterar design, cores, textos ou estrutura visual.

9. Depois da investigação, me diga exatamente:
- se as telas remontam ao trocar abas;
- qual arquivo causa isso;
- qual linha causa isso;
- qual foi a correção aplicada.

Objetivo:
Trocar abas no PWA/Web sem nenhum piscar, sem tela branca, sem dupla renderização e sem remount perceptível.