Ajustar a transição emocional da aba Mindset após o usuário selecionar um estado emocional.

Contexto:
Na aba Mindset, existe uma seção com cards de estado emocional como:
- Pressure
- Foggy
- Overwhelm
- Low energy
- Inner noise

Hoje, ao clicar em um card, a transição está seca: os cards somem de repente, a frase aparece abruptamente e depois os mindsets específicos aparecem sem suavidade.

Objetivo:
Transformar essa sequência em uma microexperiência suave, premium e emocional, alinhada ao Daily Reset.

Fluxo desejado:

1. Estado inicial:
Mostrar normalmente os 5 cards emocionais.

2. Ao usuário selecionar um estado:
Exemplo: Pressure.

3. Feedback imediato:
O card selecionado deve permanecer visível por um curto instante, com leve destaque visual.
Os outros cards devem desaparecer suavemente com fade out.

4. Pausa curta:
Manter o card selecionado visível por aproximadamente 300–500ms para dar sensação de que o app reconheceu a escolha.

5. Saída do card selecionado:
Depois da pausa, o card selecionado também deve desaparecer suavemente com fade out.

6. Frase intermediária:
A frase emocional intermediária deve aparecer com fade in suave.
Ela deve permanecer visível por aproximadamente 900–1300ms.
Depois deve desaparecer com fade out suave.

7. Entrada dos mindsets:
Os mindsets específicos daquele estado emocional devem aparecer com fade in suave.
Se possível, adicionar leve movimento vertical sutil, como translateY pequeno, sem exagero.

Direção de animação:
- Suave
- Calma
- Premium
- Silenciosa
- Sem bounce exagerado
- Sem zoom forte
- Sem cortes secos
- Sem tela piscando
- Sem tela completamente vazia por muito tempo

Timing sugerido:
- Fade out dos cards não selecionados: 250–350ms
- Pausa com card selecionado: 300–500ms
- Fade out do card selecionado: 250–350ms
- Fade in da frase: 400–600ms
- Tempo da frase visível: 900–1300ms
- Fade out da frase: 400–600ms
- Fade in dos mindsets: 400–600ms

Requisitos técnicos:
- Localizar o componente exato da aba Mindset responsável por renderizar os cards emocionais e os mindsets pós-seleção.
- Implementar a transição usando Animated/Reanimated ou a solução já usada no projeto, sem adicionar biblioteca nova desnecessária.
- Preservar o conteúdo atual, categorias, traduções e lógica de seleção.
- Não alterar layout geral da aba Mindset.
- Não alterar navbar.
- Não alterar outras abas.
- Não recriar a tela inteira.
- Apenas melhorar a transição entre:
  emotional state cards → phrase → personalized mindset cards.

Importante:
A experiência final deve parecer intencional, como se o app estivesse acolhendo a escolha do usuário, e não como uma troca brusca de tela.

Depois de implementar:
- Testar no web/PWA.
- Testar no Expo Go se possível.
- Garantir que não haja flicker/piscada.
- Garantir que a frase não apareça seca.
- Garantir que os mindsets finais entrem suavemente.
- Garantir que múltiplos cliques rápidos não quebrem a animação.
- Se o usuário clicar em outro estado antes da transição terminar, cancelar a animação anterior e iniciar a nova de forma limpa.

Ao final, informar:
- quais arquivos foram alterados;
- qual componente controlava a transição;
- qual sequência de animação foi implementada.