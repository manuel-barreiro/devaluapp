import { format } from "date-fns"
import { es } from "date-fns/locale"
import { Skeleton } from "@/components/ui/skeleton";
import { Suspense } from "react";
import { fetchTodayValue, fetchValue, formatDate } from "@/lib/utils/functions";

export default function Result({resultado, sueldoIngresado, fechaIngresada}: {resultado: Object ,sueldoIngresado: number, fechaIngresada: Date}) {

  const {valorHoy, valorFecha, dolaresHoy, dolaresFecha, porcentajeDevaluación} =  resultado
  
  return (
    <>
        <p className="text-2xl font-bold">Resultado</p>
        <span>El {format(fechaIngresada, "PPP", { locale: es })} podías comprar: </span>
        <p className="text-2xl sm:text-3xl font-extrabold text-green-600">
          {resultado.dolaresFecha} dólares
        </p>
        <span className="">Hoy comprás:</span>
        <p className="text-2xl sm:text-3xl font-extrabold text-red-600">
          {resultado.dolaresHoy} dólares
        </p>
    </>
  )
}