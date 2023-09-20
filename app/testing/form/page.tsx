"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"

import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { toast } from "@/components/ui/use-toast"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { useEffect, useState } from "react"
import { CardContent } from "@/components/ui/card"
import { ArrowLeftIcon, ArrowRightIcon, ArrowTopRightIcon, CalendarIcon } from "@radix-ui/react-icons"
import { addDays, format } from "date-fns"
import { cn } from "@/lib/utils"
import { es } from "date-fns/locale"

const formSchema = z.object({
  sueldo: z.coerce.number({
    required_error: "Ingresá un valor.",
    invalid_type_error: "Ingresá un valor.",
  })
  .int({message: 'Ingresá un número entero.'})
  .positive({	message: 'El valor ingresado debe ser > 0' })
  .gte(5000, {	message: '¿Posta cobrás eso?' })
  .lte(99999999999999, {	message: 'Si te garparan eso no estarías acá.' }),

  fechaUltimoAumento: z.date({
    required_error: "Ingrese la fecha.",
  }),
})

export default function ProfileForm() {
  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    mode: "onChange",
  })

  // console.log(form.watch("sueldo"))

  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      const res = await fetch('/api/calculoDevaluacion', {
        method: 'POST', 
        body: JSON.stringify(values)
      })
      const data = await res.json()
    } catch (error: any) {
        throw new Error(error.message)
    }

  }


  // Calendar functionality
  const disabledDays = [
    { from: new Date(0, 1, 1), to: new Date(2021, 11, 31) }, 
    { from: addDays(new Date(), 1), to: new Date(3000, 11, 31) }
  ];

  // Multi-step form functionality
  const [formStep, setFormStep] = useState(0)
  console.log(formStep)

  // states
  const [sueldoIngresado, setSueldoIngresado] = useState(0)
  const [fechaIngresada, setFechaIngresada] = useState(new Date())

  useEffect(() => {
    console.log("Sueldo ingresado:", sueldoIngresado);
    console.log("Fecha ingresado:", fechaIngresada);  
  }, [sueldoIngresado, fechaIngresada])

  return (
    <CardContent className="flex justify-center items-center">

      {/* Botón Comenzar */}
      {formStep === 0 && 
        <Button onClick={() => {setFormStep(1)}}
            className="flex justify-between items-center gap-2 text-xl font-bold p-6 hover:border border-primary/50 ease-in-out duration-300" 
            variant={'secondary'}>
            <ArrowTopRightIcon className="h-6 w-6" />
            Comenzar
        </Button>
      }

      {/* Formulario */}
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} noValidate className="space-y-8">

          {/* Input Sueldo */}
          <div className={cn({hidden: formStep !== 1})}>
            <FormField
              control={form.control}
              name="sueldo"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Ingresá tu sueldo en pesos.</FormLabel>
                  <FormControl>
                    <Input type="number" {...field} value={field.value || ''} className="bg-primary/20 border border-primary/60 p-6 text-2xl text-center font-bold rounded-md"/>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          
          {/* Input Fecha Ultimo Aumento */}
          <div className={cn({hidden: formStep !== 2})}>
            <FormField
            control={form.control}
            name="fechaUltimoAumento"
            render={({ field }) => (
              <FormItem className="flex flex-col">
                <FormLabel className="text-xs sm:text-sm">Desde cuándo cobrás ese monto?</FormLabel>
                <Popover>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button
                        variant={"outline"}
                        className="bg-primary/20 border border-primary/60 p-6 text-sm sm:text-lg text-center font-bold rounded-md"
                      >
                        {field.value ? (
                          format(field.value, "PPP", { locale: es })
                        ) : (
                          <span>Elegí una fecha</span>
                        )}
                        <CalendarIcon className="ml-3 h-4 w-4 opacity-50" />
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={field.value}
                    onSelect={field.onChange}
                    locale={es}
                    required
                    disabled={disabledDays}
                    className="rounded-md border flex justify-center items-center w-64 h-auto hover:border-primary/50 ease-in-out duration-300 text-xs"
                  />
                  </PopoverContent>
                </Popover>
                <FormMessage />
              </FormItem>
            )}
            />
          </div>
          
          {/* Resumen */}
          <div className={cn('flex flex-col justify-between gap-2',{hidden: formStep !== 3})}>
              <p className="text-2xl font-bold">Confirmá tus datos</p>
              <span>Sueldo:</span>
              <p className="text-2xl sm:text-3xl font-extrabold text-green-600">
                {`$ ${new Intl.NumberFormat('es-sp', { style: 'currency', currency: 'ARS' }).format(sueldoIngresado)}`}
              </p>
              <span className="">Cobrás ese monto desde:</span>
              <p className="text-2xl sm:text-3xl font-extrabold text-green-600">{format(fechaIngresada, "PPP", { locale: es })}</p>
          </div>

          {/* Botones Volver/Siguiente/Submit */}
          <div className="flex justify-between items-center">
                {/* Botón Volver */}
                <Button
                  type="button"
                  variant={"ghost"}
                  onClick={() => {
                    setFormStep(prev => prev - 1);
                  }}
                  className={cn({
                    hidden: formStep == 0,
                  })}
                >
                  <ArrowLeftIcon className="w-4 h-4 mr-2" />
                  Volver
                </Button>
                
                {/* Botón Siguiente */}
                <Button
                  type="button"
                  variant={"ghost"}
                  className={cn({
                    hidden: formStep == 0 || formStep == 3 ,
                  })}
                  onClick={() => {
                    // validation
                    if (formStep == 1) {
                      const sueldoInputState = form.getFieldState("sueldo");
                      if (!sueldoInputState.isDirty || sueldoInputState.invalid) {
                        return;
                        } else {
                          setSueldoIngresado(Number(form.getValues("sueldo")))
                          setFormStep(2);
                          }
                    } else if (formStep == 2) { 
                      const fechaInputState = form.getFieldState("fechaUltimoAumento");
                      if (!fechaInputState.isDirty || fechaInputState.invalid) {
                        return;
                        } else {
                          setFechaIngresada(form.getValues("fechaUltimoAumento"))
                          setFormStep(3);
                          }
                    }

                    }}
                >
                  Siguiente
                  <ArrowRightIcon className="w-4 h-4 ml-2" />
                </Button>

                {/* Botón Submit */}
                <Button
                  type="submit"
                  className={cn({
                    hidden: formStep !== 3,
                  })}
                >
                  Calculá
                </Button>
                
              </div>

        </form>
      </Form>
    </CardContent>
  )
}
