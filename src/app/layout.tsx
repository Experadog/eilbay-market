import './globals.css'

import { inter, marmelad, urbanist } from '@/configs/fonts'
import Footer from '@/layouts/footer'
import { Navbar } from '@/layouts/navbar'
import { Toolbar } from '@/layouts/toolbar'

import { Providers } from './providers'

import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: {
    default: 'Eilbay',
    template: '%s | Eilbay',
  },
  description: 'Online Market Place',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html className={`${inter.variable} ${marmelad.variable} ${urbanist.variable}`}>
      <body>
        <Providers>
          <Navbar />
          <main className="min-h-[50vh] flex justify-center items-center flex-col relative">
            {children}
          </main>
          <Toolbar />
          <Footer />
        </Providers>
      </body>
    </html>
  )
}
