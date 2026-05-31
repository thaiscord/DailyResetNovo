Corrija a inconsistência de contagem no Resumo da Semana.

Problema:
A aba Progresso mostra 7 retornos percebidos e 7 presenças, mas o card "Resumo da Semana" mostra "Seis dias" e a tela de resumos semanais mostra 6/7.

Isso está errado.

O Weekly Recap deve usar a mesma fonte de verdade dos resets concluídos usada pelos outros cards de progresso.

Regras:
- Se existem 7 resets concluídos na semana atual, o card deve mostrar 7/7.
- O texto do card deve dizer "Sete dias" ou equivalente, não "Seis dias".
- A tela "Resumos Semanais" deve mostrar 7 retornos até agora, não 6.
- Não contar apenas dias anteriores.
- Não excluir o dia atual se o reset de hoje já foi finalizado.
- Não usar índice começando em zero.
- Não usar "quiet days" ou "dias quietos" como substituto de resets concluídos.
- A contagem deve ser baseada em completed resets únicos por data dentro da semana atual.

Verificar e corrigir:
- app/(tabs)/progress.tsx
- app/weekly-recap.tsx
- utils/weeklyInsights.ts
- qualquer função auxiliar responsável por calcular weekly recap/current week progress.

Depois testar os cenários:
1. Dia 1 concluído → 1/7
2. Dia 6 concluído → 6/7
3. Dia 7 concluído → 7/7
4. Antes do primeiro reset da semana → não contar como concluído
5. Após finalizar o reset do dia atual → incluir o dia atual imediatamente

Não alterar layout, design, cores ou textos fora do necessário para corrigir a contagem.
Manter i18n funcionando.