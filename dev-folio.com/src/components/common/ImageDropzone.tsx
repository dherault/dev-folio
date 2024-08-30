import { useCallback } from 'react'
import { useDropzone } from 'react-dropzone'
import { CloudUpload } from 'lucide-react'
import _ from 'clsx'

type Props = {
  onSelect: (file: File) => void
}

function ImageDropzone({ onSelect }: Props) {
  const onDrop = useCallback((acceptedFiles: File[]) => {
    onSelect(acceptedFiles[0])
  }, [
    onSelect,
  ])

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    multiple: false,
    accept: {
      'image/*': ['.jpg', '.jpeg', '.png', '.gif', '.webp', '.svg'],
    },
  })

  return (
    <div
      {...getRootProps()}
      className={_('p-4 border border-dashed text-xs flex flex-col items-center cursor-pointer', {
        'text-green-500 border-green-500': isDragActive,
        'text-neutral-500': !isDragActive,
      })}
    >
      <input {...getInputProps()} />
      <CloudUpload className="mb-2 w-8" />
      {
        isDragActive ?
          <p>Drop the files here ...</p> :
          <p>Drag 'n' drop some files here, or click to select files</p>
      }
    </div>
  )
}

export default ImageDropzone
