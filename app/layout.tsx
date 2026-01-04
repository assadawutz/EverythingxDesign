
import React from 'react';
import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Everything x Design',
  description: 'The ultimate AI-powered design engineering platform. Transform concepts into production-ready reality.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Kanit:wght@200;300;400;500;600;700&family=JetBrains+Mono:wght@300;400;500;700&display=swap" rel="stylesheet" />
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css" />
        {/* Fallback for environments where PostCSS build step isn't available immediately */}
        <script src="https://cdn.tailwindcss.com"></script>
        <script dangerouslySetInnerHTML={{__html: `
          tailwind.config = {
            theme: {
              extend: {
                colors: {
                   'okmd-cyan': '#16A7CB',
                   'okmd-secondary': '#74CEE2',
                   'okmd-dark': '#1B1D20',
                },
                fontFamily: {
                   sans: ['Kanit', 'sans-serif'],
                   mono: ['JetBrains Mono', 'monospace'],
                }
              }
            }
          }
        `}} />
      </head>
      <body className="antialiased selection:bg-[#16A7CB]/30 min-h-screen">
        {children}
      </body>
    </html>
  );
}
