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
import { Label } from "@/components/ui/label"
import { FormEvent, useState } from "react"
import { CardContent } from "@/components/ui/card"
import { ArrowLeftIcon, ArrowRightIcon, ArrowTopRightIcon, CalendarIcon } from "@radix-ui/react-icons"
import { addDays, format } from "date-fns"
import { cn } from "@/lib/utils"
import { es } from "date-fns/locale"

const formSchema = z.object({
  sueldo: z.coerce.number({
    required_error: "Ingresá tu sueldo",
    invalid_type_error: "Ingresá tu sueldo",
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
  })

  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      const res = await fetch('/api/calculoDevaluacion', {
        method: 'POST', 
        body: JSON.stringify(values)
      })
    } catch (error) {
      
    }
    alert(JSON.stringify(values, null, 2))
    console.log(JSON.stringify(values))
  }


  // Calendar functionality
  const [date, setDate] = useState<Date | undefined>()
  const disabledDays = [
    { from: new Date(0, 1, 1), to: new Date(2021, 11, 31) }, 
    { from: addDays(new Date(), 1), to: new Date(3000, 11, 31) }
  ];

  // Multi-step form functionality
  const [formStep, setFormStep] = useState(0)

  return (
    <CardContent className="flex justify-center items-center">

      {formStep === 0 && 
        <Button onClick={() => {setFormStep(1)}}
            className="flex justify-between items-center gap-2 text-xl font-bold p-6 hover:border border-primary/50 ease-in-out duration-300" 
            variant={'secondary'}>
            <ArrowTopRightIcon className="h-6 w-6" />
            Comenzar
        </Button>
      }

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          
          <div className={cn({hidden: formStep !== 1})}>
            <FormField
              control={form.control}
              name="sueldo"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Ingresá tu sueldo en pesos.</FormLabel>
                  <FormControl>
                    <Input type="number" {...field} className="bg-primary/20 border border-primary/60 p-6 text-2xl text-center font-bold rounded-md"/>
                  </FormControl>
                  <FormDescription>
                  <FormMessage />
                  </FormDescription>
                  
                </FormItem>
              )}
            />
          </div>
          
          <div className={cn({hidden: formStep !== 2})}>
            <FormField
            control={form.control}
            name="fechaUltimoAumento"
            render={({ field }) => (
              <FormItem className="flex flex-col">
                <FormLabel className="text-xs sm:text-sm">¿Cuándo te aumentaron por última vez?</FormLabel>
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
                <FormDescription>
                  <FormMessage />
                </FormDescription>
              </FormItem>
            )}
            />
          </div>

          <div className="flex justify-between items-center">
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
                <Button
                  type="button"
                  variant={"ghost"}
                  className={cn({
                    hidden: formStep !== 1 ,
                  })}
                  onClick={() => {
                    // validation
                    form.trigger(["sueldo"]);
                    const sueldoState = form.getFieldState("sueldo");
                    if (!sueldoState.isDirty || sueldoState.invalid) return;

                    setFormStep(2);
                  }}
                >
                  Siguiente
                  <ArrowRightIcon className="w-4 h-4 ml-2" />
                </Button>
                <Button
                  type="submit"
                  className={cn({
                    hidden: formStep !== 2,
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
