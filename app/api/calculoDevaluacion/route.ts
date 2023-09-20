import { NextResponse } from "next/server";

export async function POST(request: Request) {
    const { sueldo, fechaUltimoAumento } = await request.json();
    console.log( sueldo, fechaUltimoAumento );
    return NextResponse.json({ sueldo: sueldo, fechaUltimoAumento: fechaUltimoAumento}, {status: 200});
}