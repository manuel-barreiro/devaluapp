"use client";

import { format } from "date-fns"
import { es } from "date-fns/locale"
import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { cn } from "@/lib/utils";

type Resultado = {
  valorHoy: number,
  valorFecha: number,
  dolaresHoy: number,
  dolaresFecha: number,
  porcentajeDevaluación: number
}

export default function Result({
  formStep,
  isLoading, 
  resultado, 
  sueldoIngresado, 
  fechaIngresada}: {
    formStep: number,
    isLoading: boolean,
    resultado: Resultado,
    sueldoIngresado: number, 
    fechaIngresada: Date}) {

  const sueldoHoy = (100+resultado.porcentajeDevaluación)/100 * sueldoIngresado
  
  return (
    <>
      {/* PORCENTAJE DEVALUACIÓN */}

      <div className={cn("self-center flex flex-col items-start gap-4 min-w-[60%] w-auto h-auto mx-auto", {hidden: formStep !== 4} )}>
        {isLoading && (<Skeleton className="w-52 h-10" />)}
            {!isLoading && resultado.porcentajeDevaluación > 0 && (
              <p className="font-black text-2xl sm:text-3xl bg-gradient-to-b from-gray-900 to-gray-600 
              dark:bg-gradient-to-r dark:from-slate-300 dark:to-slate-500 bg-clip-text text-transparent">
                Te devaluaste un:
              </p> 
        )}

        {!isLoading && resultado.porcentajeDevaluación < 0 && (
              <p className="font-black text-xl bg-gradient-to-b from-gray-900 to-gray-600 
              dark:bg-gradient-to-r dark:from-slate-300 dark:to-slate-500 bg-clip-text text-transparent text-center">
                ¡Venciste la inflación!
              </p> 
        )}

        {isLoading ? (
              <Skeleton className="w-full h-24" />
            ) : (
              <p className={cn("text-6xl sm:text-9xl font-black",
                resultado.porcentajeDevaluación > 0 ? "bg-gradient-to-r from-red-500 to-red-800 bg-clip-text text-transparent" : "bg-gradient-to-r from-green-500 to-green-800 bg-clip-text text-transparent"
              )}>
                {resultado.porcentajeDevaluación.toString().replace('.', ',')} %
              </p>
            )} 
      </div>
      
      {/* Dolares Fecha vs Dolares Hoy */}
      <div className={cn("self-center h-auto flex flex-col gap-3", {hidden: formStep !== 5} )}>

        <span className="font-black text-sm sm:text-2xl bg-gradient-to-b from-gray-900 to-gray-600 
            dark:bg-gradient-to-r dark:from-slate-300 dark:to-slate-500 bg-clip-text text-transparent">
              El {format(fechaIngresada, "PPP", { locale: es })} podías comprar: 
        </span>
        
        {isLoading ? (
            <Skeleton className="w-full h-8" />
          ) : (
            <p className={cn("text-4xl sm:text-6xl font-black",
              resultado.porcentajeDevaluación > 0 ? "bg-gradient-to-r from-green-500 to-green-800 bg-clip-text text-transparent" : "bg-gradient-to-r from-red-500 to-red-800 bg-clip-text text-transparent"
            )}>
              {new Intl.NumberFormat('es-sp', { style: 'currency', currency: 'USD' }).format(resultado.dolaresFecha)}
            </p>
          )} 

        
        <span className="font-black text-sm sm:text-2xl bg-gradient-to-b from-gray-900 to-gray-600 
        dark:bg-gradient-to-r dark:from-slate-300 dark:to-slate-500 bg-clip-text text-transparent">
          Hoy comprás:
        </span>

        {isLoading ? (
            <Skeleton className="w-full h-8" />
          ) : (
            <p className={cn("text-4xl sm:text-6xl font-black",
              resultado.porcentajeDevaluación > 0 ? "bg-gradient-to-r from-red-500 to-red-800 bg-clip-text text-transparent" : "bg-gradient-to-r from-green-500 to-green-800 bg-clip-text text-transparent"
            )}>
              {new Intl.NumberFormat('es-sp', { style: 'currency', currency: 'USD' }).format(resultado.dolaresHoy)}
            </p>
          )} 

      </div>     

      {/* Dolares Fecha vs Dolares Hoy */}
      <div className={cn("self-center h-auto flex flex-col gap-3", {hidden: formStep !== 6} )}>

        <span className="font-black text-sm sm:text-2xl bg-gradient-to-b from-gray-900 to-gray-600 
            dark:bg-gradient-to-r dark:from-slate-300 dark:to-slate-500 bg-clip-text text-transparent">
              Deberías cobrar: 
        </span>

        {isLoading ? (
            <Skeleton className="w-full h-8" />
          ) : (
            <p className={cn("text-3xl sm:text-6xl font-black",
              resultado.porcentajeDevaluación > 0 ? "bg-gradient-to-r from-red-500 to-red-800 bg-clip-text text-transparent" : "bg-gradient-to-r from-green-500 to-green-800 bg-clip-text text-transparent"
            )}>
              {`${new Intl.NumberFormat('es-sp', { style: 'currency', currency: 'ARS'}).format(sueldoHoy)}`}
            </p>
          )} 

        <span className="font-black text-sm sm:text-2xl bg-gradient-to-b from-gray-900 to-gray-600 
            dark:bg-gradient-to-r dark:from-slate-300 dark:to-slate-500 bg-clip-text text-transparent">
              para mantener tu poder adquisitivo.
        </span>

      </div>  
        
  
        
    </>
  )

}