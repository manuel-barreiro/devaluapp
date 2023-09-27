'use client'
 
import { Button } from "@/components/ui/button"
import { ArrowLeftIcon } from "@radix-ui/react-icons"
import Link from "next/link"

export default function GlobalError({
  error,
  reset,
}: {
  error: Error
  reset: () => void
}) {
  return (
    <div className="flex flex-col items-center justify-center gap-3 w-full h-full">
            <p className="font-black text-6xl bg-gradient-to-b from-gray-900 to-gray-600 
          dark:bg-gradient-to-r dark:from-slate-300 dark:to-slate-500 bg-clip-text text-transparent ">Error 404</p>
            <p className="font-black text-2xl bg-gradient-to-b from-gray-900 to-gray-600 
          dark:bg-gradient-to-r dark:from-slate-300 dark:to-slate-500 bg-clip-text text-transparent">Página no encontrada</p>
            <Link href={'/'}>
                <Button
                    className="flex justify-between items-center mx-auto gap-2 text-xl font-bold p-6 hover:border border-primary/50 ease-in-out duration-300" 
                    variant={'secondary'}>
                    <ArrowLeftIcon className="h-6 w-6" />
                    Volver
                </Button>
            </Link>
    </div>
  )
}