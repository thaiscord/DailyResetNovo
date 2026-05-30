Adjust Today tab emotional state behavior after daily reset completion.

Current problem:
After the user completes today's reset, the "How does your mind feel?" options become unavailable or disappear/stop being useful. The selected mental state becomes locked for the rest of the day.

This is not the desired behavior.

Desired behavior:
Completing the daily reset should NOT lock the user's emotional/mental state selection.

The user should still be able to change the "How does your mind feel?" selection at any time during the day, even after finishing today's reset.

This selected state should continue to update:
- the "Your word today" value;
- the emotional tag/category shown in Today;
- the Reset Ritual recommendation/content;
- any state-dependent Today personalization.

Important distinction:
- The daily reset completion state should remain completed.
- The mental/emotional state should remain editable.

So:
- Do NOT undo the completed reset.
- Do NOT reset the streak.
- Do NOT reopen the completed reset as incomplete.
- Only allow the mental state chips to stay visible and selectable after completion.

Expected behavior:
1. User opens Today.
2. User selects "Tired".
3. The app shows the corresponding word and reset ritual.
4. User completes today's reset.
5. The completed state remains visible.
6. The "How does your mind feel?" section should still be visible or accessible.
7. User can tap "Racing mind", "Overwhelmed", "Unfocused" or "Low energy".
8. The word and ritual update according to the new selection.
9. The completed reset remains completed.
10. Tomorrow's reset / preview may update if it currently depends on the selected state, but today's completion must not be undone.

Technical requirements:
- Locate the Today tab component and the state logic controlling whether mood/mental-state chips are rendered or disabled after completion.
- Decouple "daily reset completed" from "mental state editable".
- Preserve all existing storage behavior for completed reset.
- Preserve all existing storage behavior for selected emotional state.
- If needed, store the latest selected mental state separately from the completed reset record.
- Do not change navbar.
- Do not change other tabs.
- Do not change translations unless absolutely necessary.
- Do not remove the completion card.
- Do not remove the reset completed state.
- Do not break streak logic.

UX direction:
The Today screen should feel like:
"I completed my reset, but I can still check in with myself again."

Not:
"I completed the reset, so my emotional state is locked for the day."

After implementing, report:
- which file controlled the locked state;
- which variable/hook caused the chips to disappear or become disabled;
- what was changed so the emotional state remains editable after completion;
- whether the selected state still updates the word and reset ritual correctly.