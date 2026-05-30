import { ScrollViewStyleReset } from 'expo-router/html';

// Web-only. Runs in Node.js at static-render time — no DOM / browser APIs.
export default function Root({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no, viewport-fit=cover" />

        <meta name="application-name" content="Daily Reset" />
        <meta name="description" content="Reset daily. Stay grounded." />
        <meta name="theme-color" content="#C9A84C" />
        <link rel="manifest" href="/manifest.json" />

        <meta name="apple-mobile-web-app-capable" content="yes" />
        {/* black-translucent → transparent status bar; page background fills behind it on iOS PWA */}
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
        <meta name="apple-mobile-web-app-title" content="Daily Reset" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png?v=2" />

        <ScrollViewStyleReset />

        {/* Keep the page background matching the app cream so any brief rendering
            gap never shows a white flash — this is the single most reliable
            anti-flicker measure on web. */}
        <style>{`
          html, body { background-color: #FEF9EC; margin: 0; padding: 0; min-height: 100%; }

          /*
           * #root is the React Native Web mount point. Giving it the same
           * background ensures no ancestor div leaks a white or wrong-color
           * strip behind the iOS PWA status bar (which is transparent with
           * black-translucent + viewport-fit=cover).
           */
          #root { background-color: #FEF9EC; min-height: 100vh; }

          /*
           * Prevent iOS Safari / PWA from auto-zooming when the user taps a text
           * input whose font-size is below 16px. iOS triggers this zoom whenever
           * an input's computed font-size is < 16px. Setting 16px here overrides
           * any React Native Web inline styles that are smaller (13px, 14px).
           * This rule only runs in the browser build — no effect on native.
           */
          input, textarea, [contenteditable="true"] {
            font-size: 16px !important;
          }
        `}</style>
      </head>
      <body>{children}</body>
    </html>
  );
}
