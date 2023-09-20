'use client';

// Custom Hook Import 
import { useMultistepForm } from "@/lib/utils/useMultistepForm"
// Import Steps
import SueldoEnPesos from "@/components/steps/SueldoEnPesos"
import FechaUltimoAumento from "@/components/steps/FechaUltimoAumento"
import Conclusion from "@/components/steps/Conclusion"
 
// UI Components
import { Button } from "@/components/ui/button"
import ThemeToggler from '@/components/ThemeToggler'
import { ArrowTopRightIcon, ArrowLeftIcon, ArrowRightIcon } from "@radix-ui/react-icons"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { useState } from "react";

type Inputs = {
  sueldo?: number;
  fechaUltimoAumento?: Date;
}

const initialValues: Inputs = {}
 
export default function Home() {

  const [data, setData] = useState(initialValues)

  function updateFields(fields: Partial<Inputs>) {
    setData(prev => {
      return { ...prev, ...fields }
    })
  }

  const { steps, currentStepIndex, setCurrentStepIndex, step, isFirstStep, isLastStep, back, next } =
    useMultistepForm([
      <SueldoEnPesos {...data} updateFields={updateFields} />,
      <FechaUltimoAumento {...data} updateFields={updateFields} />,
      <Conclusion {...data} />,
    ])


  return (
        <>
          <CardContent className="flex justify-center items-center">
            {currentStepIndex === 0 && 
              <Button onClick={() => {setCurrentStepIndex(1)}}
                  className="flex justify-between items-center gap-2 text-xl font-bold p-6 hover:border border-primary/50 ease-in-out duration-300" 
                  variant={'secondary'}>
                  <ArrowTopRightIcon className="h-6 w-6" />
                  Comenzar
              </Button>
            }

            {step}
          </CardContent>
          <CardFooter className="flex justify-between">
            {!isFirstStep && (
                <Button variant={'outline'} onClick={back}>
                  <ArrowLeftIcon className="h-6 w-6" />
                </Button>
              )}
            {!isLastStep && !(currentStepIndex === 0) &&  (
                <Button variant={'outline'} onClick={next}>
                  <ArrowRightIcon className="h-6 w-6" />
                </Button>
              )}
          </CardFooter>
        </>
  )
}