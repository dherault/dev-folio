import { type PropsWithChildren, useCallback, useState } from 'react'
import * as z from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { Check, X } from 'lucide-react'

import { SubdomainValidity } from '~types'

import { deleteSubdomain } from '~firebase'

import usePortfolio from '~hooks/portfolio/usePortfolio'
import useSubdomainValidity from '~hooks/portfolio/useSubdomainValidity'

import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTrigger,
} from '~components/ui/Dialog'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from '~components/ui/Form'
import { Button } from '~components/ui/Button'
import { Input } from '~components/ui/Input'
import { Label } from '~components/ui/Label'
import Spinner from '~components/common/Spinner'

const subdomainFormSchema = z.object({
  subdomain: z
    .string()
    .trim()
    .regex(/^[a-z0-9-]+$/, { message: 'The subdomain must only contain lowercase letters, numbers, and hyphens' })
    .min(1, { message: 'You must input a subdomain' })
    .max(64, { message: 'The subdomain must be 64 characters or less' }),
})

function PortfolioSettings({ children }: PropsWithChildren) {
  const { portfolio, setPortfolio } = usePortfolio()

  const form = useForm<z.infer<typeof subdomainFormSchema>>({
    resolver: zodResolver(subdomainFormSchema),
    values: {
      subdomain: portfolio.subdomain,
    },
  })

  const [open, setOpen] = useState(false)
  const [subdomainLoading, setSubdomainLoading] = useState(false)
  const subdomain = form.watch('subdomain')
  const subdomainValidity = useSubdomainValidity(subdomain, portfolio.subdomain)

  const handleSubdomainSubmit = useCallback(async (values: z.infer<typeof subdomainFormSchema>) => {
    if (subdomainLoading) return
    if (subdomainValidity !== SubdomainValidity.Valid) return

    setSubdomainLoading(true)

    await deleteSubdomain({ subdomain: portfolio.subdomain })

    setPortfolio(x => ({
      ...x,
      subdomain: values.subdomain,
      deployedAt: '',
    }))

    setSubdomainLoading(false)
  }, [
    portfolio.subdomain,
    subdomainLoading,
    subdomainValidity,
    setPortfolio,
  ])

  return (
    <Dialog
      open={open}
      onOpenChange={setOpen}
    >
      <DialogTrigger asChild>
        {children}
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          Portfolio settings
        </DialogHeader>
        <div className="space-y-4">
          <section>
            <Label>
              Portfolio subdomain
            </Label>
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(handleSubdomainSubmit)}
                className="mt-2"
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
                          {!!subdomain && subdomainValidity === SubdomainValidity.Valid && (
                            <Check className="h-4 w-4 text-green-500 shrink-0" />
                          )}
                          {!!subdomain && subdomainValidity === SubdomainValidity.Loading && (
                            <Spinner className="h-4 w-4 shrink-0" />
                          )}
                          {(!subdomain || subdomainValidity === SubdomainValidity.Unset || subdomainValidity === SubdomainValidity.Invalid) && (
                            <div className="w-4 shrink-0" />
                          )}
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                {!!subdomain && subdomainValidity === SubdomainValidity.Invalid && (
                  <div className="mt-3 flex items-center gap-2">
                    <X className="h-4 w-4 text-red-500 shrink-0" />
                    <div className="text-red-500 text-sm">
                      This subdomain is already taken
                    </div>
                  </div>
                )}
                <Button
                  type="submit"
                  className="mt-2"
                  loading={subdomainLoading}
                  disabled={!(subdomain && subdomainValidity === SubdomainValidity.Valid)}
                >
                  Change subdomain
                </Button>
              </form>
            </Form>
          </section>
        </div>
        <DialogFooter>
          <Button
            variant="ghost"
            onClick={() => setOpen(false)}
          >
            Close
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

export default PortfolioSettings
