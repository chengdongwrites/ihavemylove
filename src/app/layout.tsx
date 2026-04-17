import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: '我有所爱，且为所爱',
  description: '洛城东的文学世界——长篇小说与散文集',
  metadataBase: new URL('https://www.ihavemylove.life'),
  openGraph: {
    title: '我有所爱，且为所爱',
    description: '洛城东的文学世界——长篇小说与散文集',
    siteName: '我有所爱',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="zh-CN" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Noto+Serif+SC:wght@300;400;500;600;700&family=Noto+Sans+SC:wght@300;400;500&display=swap"
          rel="stylesheet"
        />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  var theme = localStorage.getItem('theme');
                  if (theme === 'dark' || (!theme && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
                    document.documentElement.classList.add('dark');
                  }
                } catch(e) {}
              })();
            `,
          }}
        />
      </head>
      <body className="font-serif bg-paper dark:bg-gray-950 text-ink dark:text-gray-100 transition-colors duration-300 min-h-screen">
        {children}
      </body>
    </html>
  )
}
