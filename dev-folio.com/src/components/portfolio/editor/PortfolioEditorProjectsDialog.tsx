import { useCallback, useState } from 'react'
import * as z from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import type { Project } from 'dev-folio-types'
import { nanoid } from 'nanoid'
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage'

import { getOpenGraphImage, storage } from '~firebase'

import useThrottledEffect from '~hooks/common/useThrottledEffect'
import usePortfolio from '~hooks/portfolio/usePortfolio'

import isUrl from '~utils/string/isUrl'

import {
  Dialog,
  DialogContent,
  DialogHeader,
} from '~components/ui/Dialog'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '~components/ui/Form'
import ImageDropzone from '~components/common/ImageDropzone'
import { Input } from '~components/ui/Input'
import TextareaAutosize from '~components/common/TextareaAutosize'
import { Button } from '~components/ui/Button'
import { Label } from '~components/ui/Label'
import Spinner from '~components/common/Spinner'

type Props = {
  open: boolean
  setOpen: (open: boolean) => void
  project: Project | null
}

const formSchema = z.object({
  name: z
    .string()
    .trim()
    .min(1, { message: 'You must input a name' })
    .max(128, { message: 'The name must be 128 characters or less' }),
  description: z
    .string()
    .trim()
    .max(1024, { message: 'The description must be 256 characters or less' }),
  url: z.union([
    z.literal(''),
    z.string().trim().url({ message: 'You must input a valid URL' }),
  ]),
})

function PortfolioEditorProjectsDialog({ project, open, setOpen }: Props) {
  const { setPortfolio } = usePortfolio()

  const [loading, setLoading] = useState(false)
  const [imageLoading, setImageLoading] = useState(false)
  const [openGraphImageUrl, setOpenGraphImageUrl] = useState('')
  const [imageFile, setImageFile] = useState<File | null>(null)
  const [isOpenGraphImage, setIsOpenGraphImage] = useState(false)

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    values: {
      name: project?.name ?? '',
      description: project?.description ?? '',
      url: project?.url ?? '',
    },
  })

  const handleClose = useCallback(() => {
    setOpen(false)

    setTimeout(() => {
      form.reset()
      setOpenGraphImageUrl('')
      setImageFile(null)
      setIsOpenGraphImage(false)
    }, 300)
  }, [
    form,
    setOpen,
  ])

  const handleUrlChange = useCallback(async (url: string) => {
    if (!isUrl(url)) return

    setImageLoading(true)

    try {
      const { data } = await getOpenGraphImage({ url })

      setOpenGraphImageUrl(data.url)
      setIsOpenGraphImage(true)
    }
    catch {
      //
    }

    setImageLoading(false)
  }, [])

  const handleSubmit = useCallback(async (values: z.infer<typeof formSchema>) => {
    if (loading) return

    setLoading(true)

    const id = project?.id ?? nanoid()
    let imageUrl = isOpenGraphImage ? (openGraphImageUrl ?? '') : ''

    if (!isOpenGraphImage && imageFile) {
      const snapshot = await uploadBytes(ref(storage, `projects/${id}`), imageFile)

      imageUrl = await getDownloadURL(snapshot.ref)
    }

    const nextProject: Project = {
      id,
      name: values.name,
      description: values.description,
      url: values.url,
      imageUrl,
    }

    setPortfolio(x => ({
      ...x,
      projects: project
        ? x.projects.map(p => p.id === id ? nextProject : p)
        : [...x.projects, nextProject],
    }))

    setLoading(false)
    handleClose()
  }, [
    project,
    loading,
    isOpenGraphImage,
    openGraphImageUrl,
    imageFile,
    handleClose,
    setPortfolio,
  ])

  useThrottledEffect(() => {
    handleUrlChange(form.getValues().url)
  }, 300, [
    form.getValues().url,
  ])

  return (
    <Dialog
      open={open}
      onOpenChange={open => {
        setOpen(open)

        if (!open) handleClose()
      }}
    >
      <DialogContent onOpenAutoFocus={event => project && event.preventDefault()}>
        <DialogHeader>
          {project ? 'Edit project' : 'Add a new project'}
        </DialogHeader>
        <div>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(handleSubmit)}
              className="space-y-4"
              id="project-form"
            >
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      Project name
                    </FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      Project description
                    </FormLabel>
                    <FormControl>
                      <TextareaAutosize
                        minRows={3}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="url"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      Project URL
                    </FormLabel>
                    <FormControl>
                      <Input
                        placeholder="https://example.com"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              {imageLoading && (
                <div>
                  <Spinner className="h-4 w-4" />
                </div>
              )}
              {!imageLoading && !imageFile && !isOpenGraphImage && (
                <div>
                  <Label className="mb-2">
                    Project image
                  </Label>
                  <ImageDropzone onSelect={setImageFile} />
                  <div className="mt-1 flex justify-end">
                    <div
                      className="text-xs text-blue hover:underline cursor-pointer"
                      onClick={() => setIsOpenGraphImage(true)}
                    >
                      Use Open Graph image
                    </div>
                  </div>
                </div>
              )}
              {!imageLoading && !!imageFile && !isOpenGraphImage && (
                <div>
                  <img
                    src={URL.createObjectURL(imageFile)}
                    alt="Open Graph"
                    className="w-full border"
                  />
                  <div className="mt-1 flex justify-end">
                    <div
                      className="text-xs text-blue hover:underline cursor-pointer"
                      onClick={() => setIsOpenGraphImage(true)}
                    >
                      Use Open Graph image
                    </div>
                  </div>
                </div>
              )}
              {!imageLoading && !!openGraphImageUrl && isOpenGraphImage && (
                <div>
                  <img
                    src={openGraphImageUrl}
                    alt="Open Graph"
                    className="w-full border"
                  />
                  <div className="mt-1 flex justify-end">
                    <div
                      className="text-xs text-blue hover:underline cursor-pointer"
                      onClick={() => setIsOpenGraphImage(false)}
                    >
                      Use custom image
                    </div>
                  </div>
                </div>
              )}
            </form>
          </Form>
          <div className="mt-4 flex justify-end gap-2">
            <Button
              variant="ghost"
              type="reset"
              form="project-form"
              onClick={handleClose}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              form="project-form"
              loading={loading}
            >
              Add project
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}

export default PortfolioEditorProjectsDialog
