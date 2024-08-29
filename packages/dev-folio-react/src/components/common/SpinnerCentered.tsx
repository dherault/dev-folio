import Spinner from '~components/common/Spinner'

function SpinnerCentered() {
  return (
    <div
      role="status"
      className="tw-grow tw-h-full tw-flex tw-items-center tw-justify-center"
    >
      <Spinner className="tw-w-8 tw-h-8" />
    </div>
  )
}

export default SpinnerCentered
