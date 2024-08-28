import Logo from '~components/common/logos/Logo'

function Logotype() {
  return (
    <div className="flex items-center gap-2 text-blue">
      <Logo className="h-8" />
      <div className="font-semibold text-xl select-none">
        Dev Folio
      </div>
    </div>
  )
}

export default Logotype
