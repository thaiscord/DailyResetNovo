Adjust Mindset tab category behavior.

Current problem:
When the user selects an emotional state in the Today tab, such as Racing mind, Tired, Overwhelmed, Unfocused or Low energy, the Mindset tab automatically switches to a related category such as Rest, Calm, Focus, etc.

This should not happen.

Desired behavior:
The Mindset tab must always open and remain on the "Today" category by default, regardless of what emotional state the user selected in the Today tab.

Requirements:
- Selecting an emotional state on the Today tab must NOT change the selected visual category/filter in the Mindset tab.
- The Mindset category pill selected at the top should remain "Today" unless the user manually taps another category inside the Mindset tab.
- The Today mood/emotional state may still be saved and used internally if needed.
- Do not remove mood tracking.
- Do not break personalization.
- Do not change Today tab behavior.
- Do not change navbar.
- Do not alter translations unless necessary.
- Only decouple Today tab emotional state selection from the Mindset tab selected category.

Expected final behavior:
1. User selects "Tired" in Today.
2. User opens Mindset tab.
3. The selected category pill is still "Today".
4. The Today mindset card remains visible.
5. The app does not auto-jump to Rest, Calm, Focus, Courage, Clarity or any other category.
6. If the user manually taps "Rest", then Rest opens normally.
7. If the user leaves and returns to Mindset, it should not be forcibly changed by the Today emotional selection.

Investigate the state/shared hook/storage that connects Today mood selection to Mindset category selection.
Fix the source of the automatic category switch.

After implementing, report:
- which file caused the auto-switch;
- which state variable or hook was responsible;
- what change was made to keep Mindset defaulted to Today.