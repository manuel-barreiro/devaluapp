import { format } from "date-fns"
import { es } from "date-fns/locale"
import { Skeleton } from "@/components/ui/skeleton";
import { Suspense } from "react";
import { fetchTodayValue, fetchValue, formatDate } from "@/lib/utils/functions";

type Resultado = {
  valorHoy: number,
  valorFecha: number,
  dolaresHoy: number,
  dolaresFecha: number,
  porcentajeDevaluación: number
}

export default function Result({resultado, sueldoIngresado, fechaIngresada}: {resultado: Resultado ,sueldoIngresado: number, fechaIngresada: Date}) {

  const {valorHoy, valorFecha, dolaresHoy, dolaresFecha, porcentajeDevaluación} =  resultado
  
  return (
    <>
        <p className="text-2xl font-bold">Resultado</p>
        <span>El {format(fechaIngresada, "PPP", { locale: es })} podías comprar: </span>
        <p className="text-2xl sm:text-3xl font-extrabold text-green-600">
          {dolaresFecha} dólares
        </p>
        <span className="">Hoy comprás:</span>
        <p className="text-2xl sm:text-3xl font-extrabold text-red-600">
          {dolaresHoy} dólares
        </p>
        <span className="">Te devaluaste un:</span>
        <p className="text-2xl sm:text-3xl font-extrabold text-red-600">
          {porcentajeDevaluación} %
        </p>
        
    </>
  )

}