import './globals.css'
import type { Metadata } from 'next'
import { ThemeProvider } from "@/components/theme-provider"
import { Inter } from 'next/font/google'
import { Toaster } from "@/components/ui/toaster"
import Image from 'next/image'
import React from "react";
import Script from "next/script";


const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'DevaluApp',
  description: 'Calculá cuanto se devaluó tu sueldo en Argentina',
  metadataBase: new URL("https://devaluapp.ar/"),
  keywords: [ 'Devaluacion', 'Inflacion','Calculadora', 'Dolares', 'Argentina', 'Sueldo'],
  alternates: {
    canonical: "https://devaluapp.ar/"
  },
  themeColor: 'black',
  openGraph: {
    title: 'DevaluApp',
    description: 'Calculá cuanto se devaluó tu sueldo en Argentina',
    url: 'https://devaluapp.ar/',
    type: 'website',
  }
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (

    <html lang="es" suppressHydrationWarning={true}>
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
                  Developed by <a href="https://mbarreiro.dev/" target="_blank"><Image priority={true} src={'/logo.svg'} width={40} height={40} alt="logo" /></a> |
                </p>

                <p className="ml-2 flex items-center gap-2 mt-5 font-bold text-xs bg-gradient-to-b from-gray-900 to-gray-600 
                    dark:bg-gradient-to-r dark:from-slate-300 dark:to-slate-500 bg-clip-text text-transparent">
                  Data API <a href="https://bluelytics.com.ar/" target="_blank"><Image priority={true} src={'/bluelytics.png'} width={30} height={30} alt="logo" /></a>
                </p>
              </div>
            </main>
            <Toaster  />
        </ThemeProvider>
      </body>
    </html>
  )
}
