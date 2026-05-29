import { ScrollViewStyleReset } from 'expo-router/html';

// Web-only. Runs in Node.js at static-render time — no DOM / browser APIs.
export default function Root({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, shrink-to-fit=no"
        />

        {/* ── PWA manifest & theme ───────────────────────────────────────── */}
        <meta name="application-name" content="Daily Reset" />
        <meta name="description" content="Reset daily. Stay grounded." />
        <meta name="theme-color" content="#C9A84C" />
        <link rel="manifest" href="/manifest.json" />

        {/* ── Apple PWA ─────────────────────────────────────────────────── */}
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="apple-mobile-web-app-title" content="Daily Reset" />
        {/* favicon.png is always placed at the web root by Expo's static export */}
        <link rel="apple-touch-icon" href="/favicon.png" />

        {/* Prevents body from scrolling — ScrollViews behave like native */}
        <ScrollViewStyleReset />
      </head>
      <body>{children}</body>
    </html>
  );
}
