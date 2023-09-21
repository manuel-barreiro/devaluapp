import { NextResponse } from "next/server";
import { fetchTodayValue, fetchValue, formatDate } from "@/lib/utils/functions";

export async function POST(request: Request) {
    const { sueldo, fechaUltimoAumento } = await request.json();
    // La fecha viene como string, la parseo a Date
    const fechaUltimoAumentoDate = new Date(fechaUltimoAumento);

    // Obtengo el valor del dolar hoy y el valor del dolar en la fecha del último aumento
    const valorDolarHoy = await fetchTodayValue();
    const valorDolarFecha = await fetchValue(fechaUltimoAumentoDate);


    return NextResponse.json({ 
        sueldo: sueldo, 
        fechaUltimoAumento: fechaUltimoAumentoDate, 
        valorHoy: valorDolarHoy,
        valorFecha: valorDolarFecha
    }
        , {status: 200});
}