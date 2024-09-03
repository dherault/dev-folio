import { useCallback, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Check, X } from 'lucide-react'
import * as z from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'

import { checkSubdomain } from '~firebase'

import useUser from '~hooks/user/useUser'
import useThrottledEffect from '~hooks/common/useThrottledEffect'

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from '~components/ui/Form'
import { Button } from '~components/ui/Button'
import { Input } from '~components/ui/Input'
import Spinner from '~components/common/Spinner'

const formSchema = z.object({
  subdomain: z
    .string()
    .trim()
    .regex(/^[a-z0-9-]+$/, { message: 'The subdomain must only contain lowercase letters, numbers, and hyphens' })
    .min(1, { message: 'You must input a subdomain' })
    .max(64, { message: 'The subdomain must be 64 characters or less' }),
})

function Onboarding() {
  const { updateUser } = useUser()
  const navigate = useNavigate()

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    values: {
      subdomain: '',
    },
  })

  const [isSubdomainValid, setIsSubdomainValid] = useState(false)
  const [loadingIsSubdomainValid, setLoadingIsSubdomainValid] = useState(false)
  const [loading, setLoading] = useState(false)
  const subdomain = form.watch('subdomain')

  const handleCheckSubdomain = useCallback(async () => {
    if (!subdomain) return

    setLoadingIsSubdomainValid(true)

    try {
      const { data: { exists } } = await checkSubdomain({ subdomain })

      setIsSubdomainValid(!exists)
    }
    catch {
      //
    }

    setLoadingIsSubdomainValid(false)
  }, [
    subdomain,
  ])

  const handleSubmit = useCallback(async (values: z.infer<typeof formSchema>) => {
    setLoading(true)

    await updateUser({
      'portfolio.subdomain': values.subdomain,
    })

    setLoading(false)
    navigate('/~')
  }, [
    updateUser,
    navigate,
  ])

  useThrottledEffect(() => {
    handleCheckSubdomain()
  }, 300, [
    handleCheckSubdomain,
  ])

  useEffect(() => {
    setLoadingIsSubdomainValid(true)
  }, [
    subdomain,
  ])

  return (
    <div className="-mt-8 mx-auto min-h-screen flex flex-col justify-center w-max">
      <h1 className="text-2xl font-semibold text-center">
        Welcome!
      </h1>
      <div className="mt-2 text-center">
        Please choose a subdomain for your portfolio:
      </div>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(handleSubmit)}
          className="mt-4 flex flex-col"
        >
          <FormField
            control={form.control}
            name="subdomain"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <div className="flex items-center gap-2">
                    <Input
                      {...field}
                      autoComplete="off"
                      className="text-right"
                    />
                    <div className="ml-1 text-neutral-500 text-nowrap">
                      .dev-folio.com
                    </div>
                    {!!subdomain && isSubdomainValid && !loadingIsSubdomainValid && (
                      <Check className="h-4 w-4 text-green-500 shrink-0" />
                    )}
                    {!!subdomain && isSubdomainValid && loadingIsSubdomainValid && (
                      <Spinner className="h-4 w-4 shrink-0" />
                    )}
                    {(!subdomain || !isSubdomainValid) && (
                      <div className="w-4 shrink-0" />
                    )}
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          {!!subdomain && !isSubdomainValid && !loadingIsSubdomainValid && (
            <div className="mt-4 flex items-center gap-2">
              <X className="h-4 w-4 text-red-500 shrink-0" />
              <div className="text-red-500 text-sm">
                This subdomain is already taken
              </div>
            </div>
          )}
          <Button
            type="submit"
            className="mt-4"
            loading={loading}
            disabled={!(subdomain && isSubdomainValid)}
          >
            Continue
          </Button>
        </form>
      </Form>
    </div>
  )
}

export default Onboarding
