Aplique os seguintes ajustes na tela "Hoje" após a conclusão do reset.

OBJETIVO

1. Aumentar a curiosidade para o retorno no dia seguinte.
2. Dar mais destaque ao Ritual de Reset, que é uma das funcionalidades centrais do produto.
3. Não alterar a identidade visual, paleta de cores ou estilo do app.
4. Não criar novas telas.

──────────────────────────────

AJUSTE 1 — REPOSICIONAR OS BLOCOS

Após o usuário concluir o reset do dia, reorganizar a ordem dos componentes.

ORDEM ATUAL

1. Card principal
2. Momento para refletir
3. Reset de amanhã
4. Ritual de Reset

NOVA ORDEM

1. Card principal
2. Ritual de Reset
3. Momento para refletir
4. Reset de amanhã

Justificativa:

O Ritual de Reset é uma das experiências mais exclusivas do Daily Reset e deve aparecer antes dos elementos secundários.

A intenção é que o usuário enxergue primeiro a ação prática e emocional do dia, e só depois os elementos complementares.

Não alterar o design do card do Ritual.
Não alterar cores.
Não alterar tamanho.
Somente reposicionar.

──────────────────────────────

AJUSTE 2 — REFORMULAR O CARD "RESET DE AMANHÃ"

O card atual revela conteúdo demais sobre o próximo dia.

Exemplo atual:

"Amanhã começa o Dia 2."
"Você voltou. Isso já é algo real."

Isso reduz curiosidade e transforma o card em um spoiler.

O novo card deve funcionar como um convite para voltar amanhã.

REGRAS

* Não mostrar o título do próximo reset.
* Não mostrar a frase principal do próximo reset.
* Não revelar o conteúdo do próximo dia.
* Não entregar a categoria do próximo reset.
* Não mostrar textos específicos do dia seguinte.

O card deve apenas sugerir continuidade.

──────────────────────────────

NOVO COMPORTAMENTO

Exibir uma mensagem curta, humana e aberta.

Exemplos de referência de tom:

"Amanhã continua."

"Algo pequeno espera você amanhã."

"Nem todo progresso aparece no mesmo dia."

"Há espaço para continuar."

"Você não precisa terminar tudo hoje."

"A próxima etapa chega no seu tempo."

"Amanhã pode ser mais simples do que parece."

"Continue quando estiver pronto."

Esses exemplos servem apenas como referência de tom.

──────────────────────────────

IMPLEMENTAÇÃO

Criar uma coleção de mensagens para o card de amanhã.

* Pelo menos 30 variações.
* Tom humano.
* Calmo.
* Sem linguagem de coach.
* Sem promessas.
* Sem pressão.
* Sem urgência.
* Sem culpa.

As mensagens devem rotacionar naturalmente.

──────────────────────────────

IMPORTANTE

Manter compatibilidade completa com i18n.

Criar versões nativas para:

* Português
* Inglês
* Espanhol
* Francês
* Alemão

Não fazer traduções literais.

Cada idioma deve soar natural para um falante nativo.

──────────────────────────────

VALIDAÇÃO

Após implementar:

* Rodar npx expo export -p web
* Corrigir qualquer erro de build
* Garantir que a nova ordem dos componentes esteja correta
* Garantir que o card "Reset de amanhã" não revele conteúdo do próximo dia
* Garantir funcionamento em todos os idiomas
