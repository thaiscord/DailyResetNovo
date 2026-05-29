CORREÇÃO DEFINITIVA — Resetar meus dados no Web/Vercel

O problema foi identificado:

O botão “Resetar meus dados” está em:
app/(tabs)/profile.tsx

O onPress chama:
handleReset

E o handleReset usa:
Alert.alert()

No Web/Vercel, Alert.alert vira window.confirm(), e isso pode impedir que a função de confirmação execute corretamente.

Corrija assim:

1. Remover o uso de Alert.alert para o reset de dados.

2. Criar um modal JSX próprio dentro de profile.tsx para confirmar a exclusão dos dados.

3. Quando clicar em “Resetar meus dados”, abrir esse modal customizado.

4. O botão de confirmação real do modal deve chamar diretamente:

await clearAllUserData();

5. Depois chamar:
window.location.replace("/?reset=" + Date.now())

quando Platform.OS === "web".

6. No Expo/native, manter compatível e usar router.replace("/splash") depois de limpar.

7. Adicionar logs:
console.log("RESET MODAL OPENED");
console.log("RESET CONFIRMED FROM CUSTOM MODAL");
console.log("CLEAR ALL USER DATA FINISHED");

8. Não mudar layout geral do app.
9. Não alterar cores principais.
10. O modal precisa seguir o estilo premium atual do app.
11. O reset precisa funcionar no Vercel.
12. Não usar Alert.alert para esse fluxo no web.

Critério de sucesso:
Ao clicar em “Resetar meus dados”, aparece um modal dentro do app.
Ao confirmar, os dados são apagados e o app volta para o início como usuário novo.