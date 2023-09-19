'use client'

import { Calendar } from "@/components/ui/calendar"
import { useState } from 'react'
import { format,  addDays } from 'date-fns';
import { es } from "date-fns/locale";

type FechaUsuario = {
  fechaUltimoAumento?: Date;
}
type UserProps = FechaUsuario & {
  updateFields: (fields: FechaUsuario) => void
}

function FechaUltimoAumento({ fechaUltimoAumento, updateFields }: UserProps) {

  const [date, setDate] = useState<Date | undefined>()

  const disabledDays = [
    { from: new Date(0, 1, 1), to: new Date(2021, 11, 31) }, 
    { from: addDays(new Date(), 1), to: new Date(3000, 11, 31) }
  ];

  let footer = <p></p>;
  if (date) {
    footer = <p className="text-xs text-center p-2 text-slate-300 font-light">Elegiste {format(date, 'PP')}.</p>;
  }

  return (
    <div className='flex flex-col justify-center items-center gap-4'>
      <h1>Ingresá la fecha de tu último aumento de sueldo.</h1>
      <Calendar
        mode="single"
        selected={date}
        onSelect={setDate}
        footer={footer}
        locale={es}
        required
        disabled={disabledDays}
        className="rounded-md border flex justify-center items-center w-64 h-auto hover:border-primary/50 ease-in-out duration-300 text-xs"
      />
    </div>
  )
}

export default FechaUltimoAumento