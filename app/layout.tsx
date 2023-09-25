import './globals.css'
import type { Metadata } from 'next'
import { ThemeProvider } from "@/components/theme-provider"
import { Inter } from 'next/font/google'
import Image from 'next/image'


const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'DevaluApp',
  description: 'Calculá cuanto se devalúa tu sueldo en Argentina',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning={true}>
      <body className={inter.className}>
        <ThemeProvider
            attribute="class"
            defaultTheme="dark"
            enableSystem
            disableTransitionOnChange
          >
            <main className="min-h-screen flex flex-col justify-center items-center">
              {children}
              <div className='flex items-center'>
                <p className="flex items-center gap-2 mt-5 font-bold text-xs bg-gradient-to-b from-gray-900 to-gray-600 
                    dark:bg-gradient-to-r dark:from-slate-300 dark:to-slate-500 bg-clip-text text-transparent">
                  Developed by <a href="https://manuel-barreiro.com/" target="_blank"><Image src={'/logo.svg'} width={40} height={40} alt="logo" /></a> |
                </p>

                <p className="ml-2 flex items-center gap-2 mt-5 font-bold text-xs bg-gradient-to-b from-gray-900 to-gray-600 
                    dark:bg-gradient-to-r dark:from-slate-300 dark:to-slate-500 bg-clip-text text-transparent">
                  Data API <a href="https://bluelytics.com.ar/" target="_blank"><Image src={'/bluelytics.png'} width={30} height={30} alt="logo" /></a>
                </p>
              </div>
            </main>
        </ThemeProvider>
      </body>
    </html>
  )
}
