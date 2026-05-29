O botão “Resetar meus dados” ainda NÃO funciona no web app/Vercel.

Investigue o código real antes de alterar qualquer coisa.

Objetivo:
Quando o usuário clicar em “Resetar meus dados” e confirmar, o app precisa voltar para o estado inicial absoluto, como se fosse a primeira vez abrindo o app.

Corrija de forma definitiva.

Tarefas obrigatórias:

1. Encontrar exatamente onde está o botão “Resetar meus dados” na aba Você/Profile.

2. Encontrar qual função está sendo chamada no clique desse botão.

3. Corrigir essa função para apagar TODOS os dados persistidos usados pelo app.

No web, precisa limpar:
- localStorage
- sessionStorage
- AsyncStorage
- qualquer chave usada pelo app
- qualquer estado persistido de onboarding, idioma, reset, progresso, diário, mindset, notificações, recuperação, streak, ritual e usuário

4. Depois de limpar os dados, forçar reinicialização real do app no navegador:
- usar window.location.replace("/")
ou
- window.location.reload()
mas garantindo que o app volte para a tela inicial/onboarding/seleção de idioma.

5. Não basta limpar os dados. O estado React também precisa ser resetado ou a página precisa recarregar.

6. Adicionar logs temporários no console para confirmar:
- “RESET STARTED”
- listar as chaves antes de apagar
- “RESET COMPLETED”
- listar as chaves depois de apagar

7. Testar no ambiente web:
- abrir o app
- completar onboarding
- fazer um reset
- ir em Você
- clicar em Resetar meus dados
- confirmar
- verificar que voltou para o começo
- atualizar o navegador
- confirmar que os dados antigos NÃO voltaram

8. Não alterar layout, design, cores ou estrutura visual.

9. Se existir mais de uma função de reset no app, remover duplicação e fazer todas chamarem uma única função central:
clearAllUserData()

10. Atenção:
O bug atual é que no Vercel o botão parece clicar, mas os dados continuam. Então a correção precisa atingir o botão real usado na interface atual, não apenas criar uma função nova sem conectar ao botão.