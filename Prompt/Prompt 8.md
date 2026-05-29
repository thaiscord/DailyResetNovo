Audit the web/PWA configuration for Daily Reset.

Goal:
When users add the app to their home screen on iPhone or Android, it must use the official Daily Reset logo and app name.

Tasks:

1. Check if a valid web manifest exists.

2. Verify that the manifest contains:

   * name: Daily Reset
   * short_name: Daily Reset
   * theme_color
   * background_color
   * icons (192x192 and 512x512)

3. Verify Apple-specific tags:

   * apple-touch-icon
   * apple-mobile-web-app-capable
   * apple-mobile-web-app-status-bar-style

4. Verify Expo web configuration and app.json/app.config.

5. Verify that the official Daily Reset logo is being exported as the PWA icon.

6. If missing, implement full PWA support.

7. Ensure Add to Home Screen installs with:

   * correct icon
   * correct app name
   * standalone mode
   * proper splash screen

After implementation, tell me exactly which files were modified.
