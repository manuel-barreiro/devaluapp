export async function fetchTodayValue(): Promise<number> {
    try {
      const res = await fetch('https://api.bluelytics.com.ar/v2/latest')
      const data = await res.json()
      console.log('fetchTodayValue', data.blue.value_avg)
      return data.blue.value_avg

    } catch (error: any) {
      console.log('fetchTodayValue', error.message)
      console.log(error.message)
      return error.message
    }
  }

export function formatDate(date: Date | undefined): string {
    if (date instanceof Date) {
      console.log("formatDate Fecha válida:", date);
      return `${date.toLocaleDateString("default", { year: "numeric" })}-${date.toLocaleDateString("default", { month: "2-digit" })}-${date.toLocaleDateString("default", { day: "2-digit" })}`;
    } else {
      console.log("formatDate Fecha no válida:", date);
      return "Fecha no válida";
    }
  }

export async function fetchValue(date: Date | undefined): Promise<number> {
    try {
      const formattedDate = formatDate(date)
      console.log('fetchValue fecha', formattedDate)
      const res = await fetch(`https://api.bluelytics.com.ar/v2/historical?day=${formattedDate}`)
      const data = await res.json()
      console.log('fetchValue', data.blue.value_avg)
      return data.blue.value_avg


    } catch (error: any) {
        console.log('fetchValue', error.message)
        return error.message
    }
    
  }



