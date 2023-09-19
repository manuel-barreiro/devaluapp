'use client'

import React from 'react'
import Image from 'next/image'
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { useState, useEffect } from 'react'
import ThemeToggler from '@/components/ThemeToggler'

export default function Home() {

  const [value, setvalue] = useState('$')
  const [todayValue, setTodayValue] = useState('$')
  const [date, setDate] = useState<Date | undefined>(new Date())

  function formatDate(date: Date | undefined): string {
    return `${date?.toLocaleDateString("default", { year: "numeric" })}-${date?.toLocaleDateString("default", { month: "2-digit" })}-${date?.toLocaleDateString("default", { day: "2-digit" })}`
  }

  // function todayDate(): string {
  //   const today = new Date()
  //   return `${today.toLocaleDateString("default", { year: "numeric" })}-${today.toLocaleDateString("default", { month: "2-digit" })}-${today.toLocaleDateString("default", { day: "2-digit" })}`
  // }

  async function fetchTodayValue(): Promise<void> {
    try {
      const res = await fetch('https://api.bluelytics.com.ar/v2/latest')
      const data = await res.json()
      console.log(data.blue.value_avg)
      setTodayValue(`$ ${data.blue.value_avg}`)
      
    } catch (error: any) {
      console.log(error.message)
    }
  }

  useEffect(() => {fetchTodayValue()}, [])

  async function fetchValue(date: Date | undefined): Promise<void> {
    try {
      const formattedDate = formatDate(date)
      const res = await fetch(`https://api.bluelytics.com.ar/v2/historical?day=${formattedDate}`)
      const data = await res.json()
      setvalue(`$ ${data.blue.value_avg}`)

    } catch (error: any) {
      setvalue(error.message)
    }
    
  }

  return (
    <main className='flex flex-col justify-evenly items-center min-h-screen'>
      <ThemeToggler />
      <Calendar
        mode="single"
        selected={date}
        onSelect={setDate}
        className="rounded-md border"
      />
      <Button onClick={() => fetchValue(date)}>Calcular</Button>
      <div className='text-3xl text-red-600 font-extrabold'>{`Valor Dolar Blue Hoy : ${todayValue}`}</div>
      <div className='text-3xl text-green-600 font-extrabold'>{`${formatDate(date)} : ${value}`}</div>
    </main>
  )
}
    