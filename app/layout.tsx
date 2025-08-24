import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import Providers from './providers'
import Header from '@/components/organisms/Header'
import Footer from '@/components/organisms/Footer'
import CartSidebar from '@/components/organisms/CartSidebar'
import NotificationToast from '@/components/molecules/NotificationToast'

const inter = Inter({ 
  subsets: ['latin'],
  variable: '--font-inter',
})

export const metadata: Metadata = {
  title: 'Golden Drops - Premium Edible Oils | Cotanak',
  description: 'Discover our premium selection of natural and healthy edible oils. From sunflower to specialty oils, Golden Drops brings you the finest quality products.',
  keywords: 'edible oils, sunflower oil, safflower oil, hazelnut oil, walnut oil, healthy cooking, premium oils, Cotanak',
  authors: [{ name: 'Cotanak' }],
  openGraph: {
    title: 'Golden Drops - Premium Edible Oils',
    description: 'Premium quality edible oils for healthy cooking',
    type: 'website',
    locale: 'en_US',
    siteName: 'Golden Drops',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Golden Drops - Premium Edible Oils',
    description: 'Premium quality edible oils for healthy cooking',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={inter.variable}>
      <body className="min-h-screen bg-white text-gray-900 antialiased">
        <Providers>
          <div className="flex flex-col min-h-screen">
            <Header />
            <main className="flex-grow">
              {children}
            </main>
            <Footer />
          </div>
          <CartSidebar />
          <NotificationToast />
        </Providers>
      </body>
    </html>
  )
}