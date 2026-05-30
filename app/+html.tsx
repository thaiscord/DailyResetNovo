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
          /*
           * Safe-area top fix for iOS PWA.
           *
           * How it works:
           *  - viewport-fit=cover  → viewport extends behind the status bar.
           *  - black-translucent   → status bar is fully transparent.
           *  - html / body / #root each carry background-color: #FEF9EC so
           *    every ancestor div in the render tree shows cream behind the
           *    transparent status bar for light screens.
           *  - For dark screens (welcome-back, reset-ritual) the screen's own
           *    View fills flex:1 all the way to the top, covering these cream
           *    ancestors with the correct dark background.
           *  - env(safe-area-inset-top) is the CSS value that equals the
           *    status bar height; the background fills that region without
           *    adding any extra padding to the content.
           */
          html, body { background-color: #FEF9EC; margin: 0; padding: 0; min-height: 100%; }
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
