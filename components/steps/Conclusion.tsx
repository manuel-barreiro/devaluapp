type ConclusionUsuario = {
  sueldo?: number;
  fechaUltimoAumento?: Date;
}

function Conclusion({sueldo, fechaUltimoAumento}: ConclusionUsuario) {
  return (
    <>
      <div>{sueldo}</div>
      <div>{fechaUltimoAumento?.toLocaleDateString()}</div>
    </>
  )
}

export default Conclusion