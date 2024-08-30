import { getDownloadURL, ref, uploadBytes } from 'firebase/storage'
import { nanoid } from 'nanoid'

import { storage } from '~firebase'

async function uploadFile(file: File, path: string) {
  const fileRef = ref(storage, `${path}/${nanoid()}`)

  await uploadBytes(fileRef, file)

  return getDownloadURL(fileRef)
}

export default uploadFile
