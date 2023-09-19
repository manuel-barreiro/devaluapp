import { Input } from "../ui/input"

type SueldoUsuario = {
  sueldo?: number;
}

type UserProps = SueldoUsuario & {
  updateFields: (fields: SueldoUsuario) => void
}

const f = new Intl.NumberFormat('es-AR', {
  currency: 'ARS',
  style: 'currency',
})

function SueldoEnPesos({ sueldo, updateFields }: UserProps) {
  return (
    <div className='flex flex-col gap-4'>
      <h1>Ingresá tu sueldo en pesos</h1>
      <Input 
        type="number"
        required={true}
        value={sueldo}
        onChange={e => {
          const inputValue = e.target.value;
          if (inputValue === '' || inputValue === '0') {
            updateFields({ sueldo: undefined }); // Establece sueldo como undefined si el valor es vacío o '0'
            console.log(sueldo)
          } else {
            updateFields({ sueldo: Number(inputValue) });
            console.log(f.format(Number(inputValue)))
          }
        }}    
        className="bg-primary/20 border border-primary/60 p-6 text-2xl text-center font-bold rounded-md"
      />
    </div>
  )
}

export default SueldoEnPesos