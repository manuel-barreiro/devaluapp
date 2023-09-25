"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import JSConfetti from 'js-confetti'
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import Image from "next/image"
import {
  TwitterShareButton,
  WhatsappShareButton,
} from 'next-share'
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
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"
import { useEffect, useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowLeftIcon, ArrowRightIcon, ArrowTopRightIcon, CalendarIcon, PaperPlaneIcon, UploadIcon } from "@radix-ui/react-icons"
import { addDays, format, set } from "date-fns"
import { cn } from "@/lib/utils"
import { es } from "date-fns/locale"

import Result from "@/components/Result"
import { Progress } from "@/components/ui/progress"
import ThemeToggler from "@/components/ThemeToggler"


const formSchema = z.object({
  sueldo: z.coerce.number({
    required_error: "Ingresá un valor.",
    invalid_type_error: "Ingresá un valor.",
  })
  .int({message: 'Ingresá un número entero.'})
  .positive({	message: 'El valor ingresado debe ser > 0' })
  // .gte(5000, {	message: '¿Posta cobrás eso?' })
  .lte(999999999, {	message: 'Si te garparan eso no estarías acá.' }),

  fechaUltimoAumento: z.date({
    required_error: "Ingrese la fecha.",
  }),
})

export default function DevaluApp() {
  // REACT-HOOK-FORM INITIALIZATION
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    mode: "onChange",
  })


  // Calendar functionality
  const disabledDays = [
    { from: new Date(0, 1, 1), to: new Date(2021, 11, 31) }, 
    { from: addDays(new Date(), 1), to: new Date(3000, 11, 31) }
  ];

  // Multi-step form functionality
  const [formStep, setFormStep] = useState(0)

  type Resultado = {
    valorHoy: number,
    valorFecha: number,
    dolaresHoy: number,
    dolaresFecha: number,
    porcentajeDevaluación: number
  }

  // States de las variables sueldo y fechaUltimoAumento
  const [sueldoIngresado, setSueldoIngresado] = useState(0)
  const [fechaIngresada, setFechaIngresada] = useState(new Date())
  const [resultado, setResultado] = useState({} as Resultado)

  //  Loading state para el result
  const [isLoading, setLoading] = useState(true)

  // useEffect para monitorear los cambios en las variables sueldo y fechaUltimoAumento y resultado
  useEffect(() => {
    console.log("Sueldo ingresado:", sueldoIngresado);
    console.log("Fecha ingresado:", fechaIngresada);
    console.log("Resultado ingresado:", resultado);
    console.log("PASO:", formStep)   
  }, [sueldoIngresado, fechaIngresada, resultado, formStep])

    // FORM SUBMIT HANDLER
    async function onSubmit(values: z.infer<typeof formSchema>) {
      setFormStep(4)
      try {
        const res = await fetch('/api/calculoDevaluacion', {
          method: 'POST', 
          body: JSON.stringify(values)
        })
        const data = await res.json()
        console.log(data)
        setResultado(data)
        setLoading(false)
        const jsConfetti = new JSConfetti()
        jsConfetti.addConfetti({
          emojis: ['💵'],
          emojiSize: 60,
          confettiNumber: 200,
          // confettiColors: [
          //   '#22c55e',
          // ],
        })
      } catch (error: any) {
          throw new Error(error.message)
      }
    }
  

  return (

      <Card className="w-10/12 md:w-6/12 h-auto border-t-4 rounded-t-sm border-primary relative">
        <Progress value={(formStep/4)*100} />
        <span className="absolute top-6 right-4">
          <ThemeToggler />
        </span>

        <CardHeader>
          <CardTitle className="font-black text-4xl bg-gradient-to-b from-gray-900 to-gray-600 
          dark:bg-gradient-to-r dark:from-slate-300 dark:to-slate-500 bg-clip-text text-transparent">
            Devalu<span className="bg-gradient-to-r from-emerald-500 to-lime-600 bg-clip-text text-transparent">App</span> 
          </CardTitle>
          <CardDescription className="text-lg">¿Qué tan devaluado estás?</CardDescription>
        </CardHeader>


        <CardContent>

          {/* Botón Comenzar */}
          {formStep === 0 && 
            <Button onClick={() => {setFormStep(1)}}
                className="flex justify-between items-center mx-auto gap-2 text-xl font-bold p-6 hover:border border-primary/50 ease-in-out duration-300" 
                variant={'secondary'}>
                <ArrowTopRightIcon className="h-6 w-6" />
                Comenzar
            </Button>
          }

          {/* Formulario */}
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} noValidate className="flex flex-col gap-8">

              {/* Input Sueldo */}
              <div className={cn('self-center',{hidden: formStep !== 1})}>
                <FormField
                  control={form.control}
                  name="sueldo"
                  render={({ field }) => (
                    <FormItem className="flex flex-col">
                      <FormLabel className="text-md sm:text-lg">Ingresá tu sueldo en pesos.</FormLabel>
                      <FormControl>
                        <Input type="number" {...field} value={field.value || ''} className="bg-primary/20 border border-primary/60 p-6 text-2xl text-center font-bold rounded-md max-w-[600px]"/>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              
              {/* Input Fecha Ultimo Aumento */}
              <div className={cn('self-center', {hidden: formStep !== 2})}>
                <FormField
                control={form.control}
                name="fechaUltimoAumento"
                render={({ field }) => (
                  <FormItem className="flex flex-col">
                    <FormLabel className="text-md sm:text-lg">¿Desde cuándo cobrás ese monto?</FormLabel>
                    <AlertDialog>
                      <AlertDialogTrigger asChild>
                        <FormControl>
                          <Button
                            variant={"outline"}
                            className="bg-primary/20 border border-primary/60 p-6 text-sm md:text-2xl text-center font-bold rounded-md max-w-[600px]"
                          >
                            {field.value ? (
                              format(field.value, "PPP", { locale: es })
                            ) : (
                              <span>Elegí una fecha</span>
                            )}
                            <CalendarIcon className="ml-3 h-4 w-4 opacity-50" />
                          </Button>
                        </FormControl>
                      </AlertDialogTrigger>
                      <AlertDialogContent className="flex flex-col items-center gap-10">
                      <AlertDialogHeader>
                        <AlertDialogTitle>Seleccioná la fecha de tu último aumento.</AlertDialogTitle>
                        </AlertDialogHeader>
                          <Calendar
                            mode="single"
                            selected={field.value}
                            onSelect={field.onChange}
                            locale={es}
                            required
                            disabled={disabledDays}
                            className="rounded-md border flex justify-center items-center w-64 h-auto hover:border-primary/50 ease-in-out duration-300"
                          />
                        <div className="flex flex-nowrap items-center gap-3">
                          <AlertDialogCancel>Cancelar</AlertDialogCancel>
                          <AlertDialogAction>Seleccionar</AlertDialogAction>
                        </div>
                      </AlertDialogContent>
                    </AlertDialog>
                    <FormMessage />
                  </FormItem>
                )}
                />
              </div>
              
              {/* Confirmación */}
              <div className={cn('self-center flex flex-col justify-between gap-3',{hidden: formStep !== 3})}>
                  <p className="font-black text-2xl bg-gradient-to-b from-gray-900 to-gray-600 
                    dark:bg-gradient-to-r dark:from-slate-300 dark:to-slate-500 bg-clip-text text-transparent">
                    Confirmá tus datos
                  </p>
                  <span className="font-extrabold text-md bg-gradient-to-b from-gray-900 to-gray-600 
                    dark:bg-gradient-to-r dark:from-slate-300 dark:to-slate-500 bg-clip-text text-transparent">
                      Sueldo:
                  </span>
                  <p className="text-2xl sm:text-4xl font-black bg-gradient-to-r from-emerald-500 to-lime-600 bg-clip-text text-transparent">
                    {`$ ${new Intl.NumberFormat('es-sp', { style: 'currency', currency: 'ARS' }).format(sueldoIngresado)}`}
                  </p>
                  <span className="font-black text-md bg-gradient-to-b from-gray-900 to-gray-600 
                    dark:bg-gradient-to-r dark:from-slate-300 dark:to-slate-500 bg-clip-text text-transparent">
                      Cobrás ese monto desde:
                  </span>
                  <p className="text-2xl sm:text-4xl font-black bg-gradient-to-r from-emerald-500 to-lime-600 bg-clip-text text-transparent">
                    {format(fechaIngresada, "PPP", { locale: es })}
                  </p>

                  {/* Botón Submit */}
                  <Button
                      type="submit"
                      className={cn("mt-4 bg-gradient-to-r from-emerald-500 to-lime-600 font-bold",{
                        hidden: formStep !== 3,
                      })}
                    >
                      <ArrowTopRightIcon className="h-4 w-4 mr-1" />
                      Calculá
                  </Button>
              </div>

            </form>
          </Form>

          {/* Resultado */}
          <div className={cn('flex flex-col justify-between gap-2', {hidden: formStep !== 4 && formStep !== 5 })}>
                
            <Result formStep={formStep} isLoading={isLoading} resultado={resultado} sueldoIngresado={sueldoIngresado} fechaIngresada={fechaIngresada} />

          </div>
          
        </CardContent>
        
        {/* Botones Volver/Siguiente y Compartir */}
        <div className="flex justify-between items-center pb-3 px-3 mt-5">
                    {/* Botón Volver */}
                    <Button
                      type="button"
                      variant={"ghost"}
                      onClick={() => {
                        if (formStep == 4) {
                          setLoading(true)
                        }
                        setFormStep(prev => prev - 1);
                      }}
                      className={cn({
                        hidden: formStep == 0,
                      })}
                    >
                      <ArrowLeftIcon className="w-4 h-4 mr-2" />
                      Volver
                    </Button>
                    
                    {/* Compartir */}
                    <DropdownMenu>
                      <DropdownMenuTrigger className={cn(
                        "border border-input bg-transparent shadow-sm hover:bg-accent hover:text-accent-foreground inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 p-2 px-4",{
                            hidden: formStep !== 4 && formStep !== 5,
                          })}>
                          <UploadIcon className="h-4 w-4 mr-2" />
                          Compartir
                      </DropdownMenuTrigger>
                      <DropdownMenuContent>
                        <DropdownMenuItem>
                        <TwitterShareButton
                          url={'https://devaluapp.ar/'}
                          title={`Me devalué un ${resultado.porcentajeDevaluación?.toString().replace('.', ',')}%. Calculá cuanto te devaluaste con DevaluApp.`}
                          blankTarget={true}
                        >
                          <span className="flex gap-2 items-center">
                            <svg className="fill-black dark:fill-white w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M389.2 48h70.6L305.6 224.2 487 464H345L233.7 318.6 106.5 464H35.8L200.7 275.5 26.8 48H172.4L272.9 180.9 389.2 48zM364.4 421.8h39.1L151.1 88h-42L364.4 421.8z"/></svg>
                            Twitter
                          </span>
                        </TwitterShareButton>
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem>
                          <WhatsappShareButton
                            url={'https://devaluapp.ar/'}
                            title={`Me devalué un ${resultado.porcentajeDevaluación?.toString().replace('.', ',')}%. Calculá cuanto te devaluaste con DevaluApp.`}
                          >
                            <span className="flex gap-2 items-center">
                              <svg className="fill-black dark:fill-white w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path d="M380.9 97.1C339 55.1 283.2 32 223.9 32c-122.4 0-222 99.6-222 222 0 39.1 10.2 77.3 29.6 111L0 480l117.7-30.9c32.4 17.7 68.9 27 106.1 27h.1c122.3 0 224.1-99.6 224.1-222 0-59.3-25.2-115-67.1-157zm-157 341.6c-33.2 0-65.7-8.9-94-25.7l-6.7-4-69.8 18.3L72 359.2l-4.4-7c-18.5-29.4-28.2-63.3-28.2-98.2 0-101.7 82.8-184.5 184.6-184.5 49.3 0 95.6 19.2 130.4 54.1 34.8 34.9 56.2 81.2 56.1 130.5 0 101.8-84.9 184.6-186.6 184.6zm101.2-138.2c-5.5-2.8-32.8-16.2-37.9-18-5.1-1.9-8.8-2.8-12.5 2.8-3.7 5.6-14.3 18-17.6 21.8-3.2 3.7-6.5 4.2-12 1.4-32.6-16.3-54-29.1-75.5-66-5.7-9.8 5.7-9.1 16.3-30.3 1.8-3.7.9-6.9-.5-9.7-1.4-2.8-12.5-30.1-17.1-41.2-4.5-10.8-9.1-9.3-12.5-9.5-3.2-.2-6.9-.2-10.6-.2-3.7 0-9.7 1.4-14.8 6.9-5.1 5.6-19.4 19-19.4 46.3 0 27.3 19.9 53.7 22.6 57.4 2.8 3.7 39.1 59.7 94.8 83.8 35.2 15.2 49 16.5 66.6 13.9 10.7-1.6 32.8-13.4 37.4-26.4 4.6-13 4.6-24.1 3.2-26.4-1.3-2.5-5-3.9-10.5-6.6z"/></svg>
                              Whatsapp
                            </span>
                          </WhatsappShareButton>
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                          <DropdownMenuItem className="flex gap-2 items-center cursor-pointer" 
                          onClick={() => {
                            navigator.clipboard.writeText(`Me devalué un ${resultado.porcentajeDevaluación?.toString().replace('.', ',')}%. Calculá cuanto te devaluaste con DevaluApp. https://devaluapp.ar/`);
                            }}>
                            <svg className="fill-black dark:fill-white w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path d="M208 0H332.1c12.7 0 24.9 5.1 33.9 14.1l67.9 67.9c9 9 14.1 21.2 14.1 33.9V336c0 26.5-21.5 48-48 48H208c-26.5 0-48-21.5-48-48V48c0-26.5 21.5-48 48-48zM48 128h80v64H64V448H256V416h64v48c0 26.5-21.5 48-48 48H48c-26.5 0-48-21.5-48-48V176c0-26.5 21.5-48 48-48z"/></svg>
                            Copiar enlace
                          </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>


                    {/* Compartir */}
                    {/* <Button
                      type="button"
                      variant={"secondary"}
                      className={cn({
                        hidden: formStep !== 4 && formStep !== 5,
                      })}
                    >
                      <UploadIcon className="h-4 w-4 mr-2" />
                      Compartir
                  </Button> */}
                    
                    {/* Botón Siguiente */}
                    <Button
                      type="button"
                      variant={"ghost"}
                      className={cn({
                        hidden: formStep == 0 || formStep == 3 || formStep == 5 ,
                      })}
                      onClick={() => {
                        // validation
                        if (formStep == 1) {
                          form.trigger("sueldo");
                          const sueldoInputState = form.getFieldState("sueldo");
                          if (!sueldoInputState.isDirty || sueldoInputState.invalid) {
                            return;
                            } else {
                              setSueldoIngresado(Number(form.getValues("sueldo")))
                              setFormStep(2);
                              }
                        } else if (formStep == 2) { 
                          form.trigger("fechaUltimoAumento");
                          const fechaInputState = form.getFieldState("fechaUltimoAumento");
                          if (!fechaInputState.isDirty || fechaInputState.invalid) {
                            return;
                            } else {
                              setFechaIngresada(form.getValues("fechaUltimoAumento"))
                              setFormStep(3);
                              }
                        } else if (formStep == 4) {
                          setFormStep(5)
                        }}}
                    >
                      { formStep > 3 ? "Más" : "Siguiente" }
                      <ArrowRightIcon className="w-4 h-4 ml-2" />
                    </Button>

                    
        </div>

      </Card>

    
  )
}
