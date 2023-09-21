import { format } from "date-fns"
import { es } from "date-fns/locale"
import { Skeleton } from "@/components/ui/skeleton";
import { Suspense } from "react";
import { fetchTodayValue, fetchValue, formatDate } from "@/lib/utils/functions";

export default function Result({sueldoIngresado, fechaIngresada}: {sueldoIngresado: number, fechaIngresada: Date}) {
  return (
    <>
        <p className="text-2xl font-bold">Resultado</p>
        <span>El {format(fechaIngresada, "PPP", { locale: es })} podías comprar: </span>
        <p className="text-2xl sm:text-3xl font-extrabold text-green-600">
        500
        </p>
        <span className="">Hoy comprás:</span>
        <p className="text-2xl sm:text-3xl font-extrabold text-red-600">
        100
        </p>
    </>
  )
}



