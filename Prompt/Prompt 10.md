Corrija a exibição do card "Resumo da Semana" na aba Progresso.

Problema:
Após o reset do Dia 1, o card "Resumo da Semana" desapareceu da aba Progresso.
Isso não é ideal.

Comportamento desejado:
O card "Resumo da Semana" deve aparecer desde o Dia 1 na aba Progresso, dentro da seção "Sua História".

Antes de completar 7 resets:
- Mostrar o card em estado "em andamento".
- Mostrar progresso correto: 1/7, 2/7, 3/7 etc.
- Não abrir o resumo completo ainda.
- Não gerar interpretação semanal completa.
- Não mostrar textos como se a semana já tivesse sido concluída.

Ao tocar no card antes de 7/7:
- Abrir a tela de Resumos Semanais em modo "semana em andamento".
- Mostrar quantos retornos existem até agora.
- Mostrar mensagem explicando que o primeiro resumo completo chega após 7 dias.
- Não mostrar análise semanal completa antes de haver dados suficientes.

Quando completar 7 resets:
- O card deve mostrar 7/7.
- O resumo semanal completo deve ser desbloqueado.
- A tela de Resumos Semanais deve permitir abrir a Semana 1.
- A contagem deve ser consistente com Hoje, Diário e Progresso.

Importante:
- Não esconder o card antes do Dia 7.
- Não remover "Reflexões Silenciosas".
- Não alterar layout geral da aba Progresso.
- Apenas restaurar o card "Resumo da Semana" em estado progressivo.
- Manter i18n em português, inglês, espanhol, francês e alemão.
- Não gerar análise semanal completa antes de 7 resets concluídos.