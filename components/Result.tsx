"use client";

import { format } from "date-fns"
import { es } from "date-fns/locale"
import { Skeleton } from "@/components/ui/skeleton";

type Resultado = {
  valorHoy: number,
  valorFecha: number,
  dolaresHoy: number,
  dolaresFecha: number,
  porcentajeDevaluación: number
}

export default function Result({
  isLoading, 
  resultado, 
  sueldoIngresado, 
  fechaIngresada}: {
    isLoading: boolean,
    resultado: Resultado,
    sueldoIngresado: number, 
    fechaIngresada: Date}) {
  
  return (
    <>
        <p className="text-2xl font-bold">Resultado</p>
        <span>El {format(fechaIngresada, "PPP", { locale: es })} podías comprar: </span>
        
        {isLoading ? (
            <Skeleton className="w-full h-8" />
          ) : (
            <p className="text-2xl sm:text-3xl font-extrabold text-green-600">
              {resultado.dolaresFecha} dólares
            </p>
          )} 

        
        <span className="">Hoy comprás:</span>
        {isLoading ? (
            <Skeleton className="w-full h-8" />
          ) : (
            <p className="text-2xl sm:text-3xl font-extrabold text-red-600">
              {resultado.dolaresHoy} dólares
            </p>
          )} 
        <span className="">Te devaluaste un:</span>
        {isLoading ? (
            <Skeleton className="w-full h-8" />
          ) : (
            <p className="text-2xl sm:text-3xl font-extrabold text-red-600">
              {resultado.porcentajeDevaluación} %
            </p>
          )} 
        
    </>
  )

}