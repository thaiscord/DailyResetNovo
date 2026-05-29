BUG CRÍTICO — Resetar meus dados ainda não funciona no Web/Vercel

A correção anterior não resolveu. Agora preciso de investigação real, não tentativa genérica.

TAREFA:
1. Encontrar exatamente o botão visível “Resetar meus dados” / “Apagar meus dados” na aba Você/Profile.
2. Confirmar qual função está conectada ao onPress/onClick desse botão.
3. Adicionar um console.log diretamente dentro do onPress/onClick do botão:

console.log("DELETE DATA BUTTON CLICKED - REAL BUTTON");

4. Se esse log não aparecer no navegador, significa que o botão certo não está conectado.

5. Criar uma função definitiva resetWebAppData() e chamar diretamente no botão real.

A função deve:
- limpar localStorage
- limpar sessionStorage
- limpar AsyncStorage
- limpar Zustand persist stores, usando os nomes reais das stores
- limpar IndexedDB
- desregistrar service workers
- limpar caches do navegador via caches.keys()
- depois redirecionar com window.location.replace("/")

Adicionar logs para cada etapa:
console.log("Before reset localStorage", Object.keys(localStorage));
console.log("Clearing localStorage");
console.log("Clearing sessionStorage");
console.log("Clearing AsyncStorage");
console.log("Clearing IndexedDB");
console.log("Clearing caches");
console.log("Unregistering service workers");
console.log("RESET FINISHED - RELOADING");

IMPORTANTE:
Não criar função solta sem uso.
Conectar diretamente ao botão real visível na interface.

Também procurar por:
- persist()
- createJSONStorage
- zustand
- AsyncStorage
- MMKV
- storage keys
- onboardingCompleted
- hasCompletedOnboarding
- dailyReset
- progress
- journal
- mindset
- recoveryPath

Depois do reset, o app precisa voltar para a primeira tela como usuário novo.

Não alterar design.
Apenas corrigir o reset real.