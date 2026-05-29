BUG CRÍTICO — Resetar meus dados não apaga dados no Web/Vercel

O botão "Resetar meus dados" continua sem apagar os dados no navegador/Vercel.

Agora investigue especificamente armazenamento WEB.

Corrija o reset para limpar TUDO:

1. localStorage.clear()
2. sessionStorage.clear()
3. AsyncStorage.clear()
4. IndexedDB:
   - listar todos os bancos com indexedDB.databases()
   - deletar todos os bancos relacionados ao app
   - especialmente qualquer banco usado por AsyncStorage, Expo, React Native Web ou Daily Reset

5. Cookies do domínio, se existirem.
6. Qualquer storage customizado usado por:
   - onboarding
   - idioma
   - progresso
   - diário
   - reset do dia
   - mindset
   - streak
   - recovery path
   - notificações
   - rituais

Depois da limpeza:
- chamar window.location.href = "/"
- ou window.location.replace("/")
- ou window.location.reload()
Mas precisa voltar para a primeira tela do app como usuário novo.

Importante:
Não crie apenas uma função nova.
Encontre o botão real "Resetar meus dados" / "Apagar meus dados" na aba Você/Profile e conecte esse botão diretamente à função definitiva.

Adicionar logs no console:
- RESET BUTTON CLICKED
- CLEARING LOCAL STORAGE
- CLEARING SESSION STORAGE
- CLEARING ASYNC STORAGE
- CLEARING INDEXEDDB
- RESET FINISHED

Também revisar se existe algum estado padrão que recria os dados após apagar.

Não alterar layout, design ou fluxo visual.
Apenas corrigir o reset de dados no web.