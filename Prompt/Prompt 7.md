BUG FIX — Remove notification screen after daily reset

The screen “Stay connected to this” must NOT appear after completing the Daily Reset.

This notification permission screen should only appear during the initial onboarding flow, if needed.

Current bug:
After the user completes the daily reset on the web/Vercel app, the app redirects to the notification permission screen.

Fix requirements:
1. Find where the app navigates to the notification permission screen after completing the Daily Reset.
2. Remove that navigation completely from the post-reset flow.
3. After completing the Daily Reset, the user should go only to the correct post-reset/completion experience or back to Today, depending on the current app flow.
4. Do not show any notification permission screen after:
   - completing a reset
   - completing a ritual
   - opening the app again
   - navigating between tabs
5. Notification permission should only be requested during onboarding.
6. Also translate/remove any hardcoded English text if this screen still exists inside onboarding.
7. Do not change layout, colors, or app structure.
8. Keep the existing onboarding notification step if it already exists there.

Important:
Search for routes or files like:
- notification-permission
- notification-setup
- notification-settings
- Stay connected to this
- Yes, remind me
- I'll remember on my own

Make sure none of these are called after completing the daily reset.