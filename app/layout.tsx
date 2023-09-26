import './globals.css'
import type { Metadata } from 'next'
import { ThemeProvider } from "@/components/theme-provider"
import { Inter } from 'next/font/google'
import Image from 'next/image'


const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'DevaluApp',
  description: 'Calculá cuanto se devaluó tu sueldo en Argentina',
  metadataBase: new URL("https://devaluapp.ar/"),
  keywords: ['Calculadora', 'Devaluacion', 'Inflacion', 'Dolares', 'Argentina', 'Sueldo'],
  alternates: {
    canonical: "https://devaluapp.ar/"
  },
  themeColor: 'black',
  openGraph: {
    title: 'DevaluApp',
    description: 'Calculá cuanto se devaluó tu sueldo en Argentina',
    url: 'https://devaluapp.ar/',
    type: 'website',
    images: [{
      url: 'https://www.devaluapp.ar/twitter-image.png',
      width: 1200,
      height: 630,
    }],
  }
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning={true}>
      <head>
        <meta name="twitter:card" content="summary" />
        <meta name="twitter:title" content="DevaluApp" />
        <meta name="twitter:description" content="Calculá cuanto se devaluó tu sueldo en Argentina" />
        <meta name="twitter:image" content="https://www.devaluapp.ar/twitter-image.png" />
      </head>
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
                  Developed by <a href="https://manuel-barreiro.com/" target="_blank"><Image priority={true} src={'/logo.svg'} width={40} height={40} alt="logo" /></a> |
                </p>

                <p className="ml-2 flex items-center gap-2 mt-5 font-bold text-xs bg-gradient-to-b from-gray-900 to-gray-600 
                    dark:bg-gradient-to-r dark:from-slate-300 dark:to-slate-500 bg-clip-text text-transparent">
                  Data API <a href="https://bluelytics.com.ar/" target="_blank"><Image priority={true} src={'/bluelytics.png'} width={30} height={30} alt="logo" /></a>
                </p>
              </div>
            </main>
        </ThemeProvider>
      </body>
    </html>
  )
}
