import Spinner from '~components/common/Spinner'

function SpinnerCentered() {
  return (
    <div
      role="status"
      className="dfr-grow dfr-h-full dfr-flex dfr-items-center dfr-justify-center"
    >
      <Spinner className="dfr-w-8 dfr-h-8" />
    </div>
  )
}

export default SpinnerCentered
