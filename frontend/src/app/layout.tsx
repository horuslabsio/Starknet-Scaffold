import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { StarknetProvider } from './components/StarknetProvider'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Starknet Scaffold',
  description: 'Created with love',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className='dark'>
      <body className={`${inter.className} dark:bg-black bg-gray-300`} >
        <StarknetProvider>
          {children}
        </StarknetProvider>
      </body>
    </html>
  )
}
