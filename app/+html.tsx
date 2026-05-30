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
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="apple-mobile-web-app-title" content="Daily Reset" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png?v=2" />

        <ScrollViewStyleReset />

        {/* Keep the page background matching the app cream so any brief rendering
            gap never shows a white flash — this is the single most reliable
            anti-flicker measure on web. */}
        <style>{`
          html, body { background-color: #FEF9EC; margin: 0; padding: 0; }
        `}</style>
      </head>
      <body>{children}</body>
    </html>
  );
}
