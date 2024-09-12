import { type PropsWithChildren, useCallback, useState } from 'react'
import * as z from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { Check, Crown, X } from 'lucide-react'
import { Link } from 'react-router-dom'

import { SubdomainValidity } from '~types'

import { deleteSubdomain, setCustomDomain } from '~firebase'

import usePortfolio from '~hooks/portfolio/usePortfolio'
import useSubdomainValidity from '~hooks/portfolio/useSubdomainValidity'
import useTheme from '~hooks/ui/useTheme'
import useUser from '~hooks/user/useUser'

import wait from '~utils/common/wait'

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
import { Switch } from '~components/ui/Switch'
import PortfolioSettingsPremiumSection from '~components/portfolio/PortfolioSettingsPremiumSection'

const subdomainFormSchema = z.object({
  subdomain: z
    .string()
    .trim()
    .regex(/^[a-z0-9-]+$/, { message: 'The subdomain must only contain lowercase letters, numbers, and hyphens' })
    .min(1, { message: 'You must input a subdomain' })
    .max(64, { message: 'The subdomain must be 64 characters or less' }),
})

const customDomainFormSchema = z.object({
  customDomain: z
    .string()
    .trim()
    .regex(/^[a-z0-9-_.]+$/, { message: 'You must input a valid domain name' })
    .min(1, { message: 'You must input a subdomain' }),
})

function PortfolioSettings({ children }: PropsWithChildren) {
  const { user } = useUser()
  const { portfolio, setPortfolio } = usePortfolio()
  const { setTheme } = useTheme()

  const subdomainForm = useForm<z.infer<typeof subdomainFormSchema>>({
    resolver: zodResolver(subdomainFormSchema),
    values: {
      subdomain: portfolio.subdomain,
    },
  })

  const customDomainForm = useForm<z.infer<typeof customDomainFormSchema>>({
    resolver: zodResolver(customDomainFormSchema),
    values: {
      customDomain: portfolio.customDomain,
    },
  })

  const [open, setOpen] = useState(false)
  const [subdomainLoading, setSubdomainLoading] = useState(false)
  const [subdomainError, setSubdomainError] = useState(false)
  const [subdomainSuccess, setSubdomainSuccess] = useState(false)
  const subdomain = subdomainForm.watch('subdomain')
  const subdomainValidity = useSubdomainValidity(subdomain, portfolio.subdomain)

  const [customDomainLoading, setCustomDomainLoading] = useState(false)
  const [customDomainError, setCustomDomainError] = useState(false)
  const [customDomainSuccess, setCustomDomainSuccess] = useState(false)

  const handleSubdomainSubmit = useCallback(async (values: z.infer<typeof subdomainFormSchema>) => {
    if (subdomainLoading) return
    if (subdomainValidity !== SubdomainValidity.Valid) return

    setSubdomainLoading(true)
    setSubdomainError(false)
    setSubdomainSuccess(false)

    try {
      await deleteSubdomain({ subdomain: portfolio.subdomain })

      setPortfolio(x => ({
        ...x,
        subdomain: values.subdomain,
        deployedAt: '',
      }))

      setSubdomainSuccess(true)
    }
    catch {
      setSubdomainError(true)
    }

    setSubdomainLoading(false)
  }, [
    portfolio.subdomain,
    subdomainLoading,
    subdomainValidity,
    setPortfolio,
  ])

  const handleCustomDomainSubmit = useCallback(async (values: z.infer<typeof customDomainFormSchema>) => {
    if (customDomainLoading) return

    setCustomDomainLoading(true)
    setCustomDomainError(false)
    setCustomDomainSuccess(false)

    setPortfolio(x => ({
      ...x,
      customDomain: values.customDomain,
    }))

    await wait(1000)

    try {
      await setCustomDomain()

      setCustomDomainSuccess(true)
    }
    catch {
      setCustomDomainError(true)
    }

    setCustomDomainLoading(false)
  }, [
    customDomainLoading,
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
        <div className="space-y-6">
          <section>
            <Label>
              Portfolio subdomain
            </Label>
            <Form {...subdomainForm}>
              <form
                onSubmit={subdomainForm.handleSubmit(handleSubdomainSubmit)}
                className="mt-2"
              >
                <FormField
                  control={subdomainForm.control}
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
                {subdomainError && (
                  <div className="mt-3 text-red-500 text-sm">
                    An error occurred. Please contact support.
                  </div>
                )}
                {subdomainSuccess && (
                  <div className="mt-3 text-green-500 text-sm">
                    Subdomain changed successfully
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
          {!user?.isPremium && (
            <div>
              <hr />
              <div className="mt-3 flex items-center gap-2 text-sm">
                <Crown className="h-4 w-4 text-amber-400" />
                Premium features
              </div>
            </div>
          )}
          <PortfolioSettingsPremiumSection>
            <Label>
              Portfolio custom domain
            </Label>
            <Form {...customDomainForm}>
              <form
                onSubmit={customDomainForm.handleSubmit(handleCustomDomainSubmit)}
                className="mt-2"
              >
                <FormField
                  control={customDomainForm.control}
                  name="customDomain"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input
                          {...field}
                          autoComplete="off"
                          placeholder="example.com"
                          disabled={!user?.isPremium}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button
                  type="submit"
                  className="mt-2"
                  disabled={!user?.isPremium}
                  loading={customDomainLoading}
                >
                  Request custom domain
                </Button>
                {customDomainError && (
                  <div className="mt-3 text-red-500 text-sm">
                    An error occurred. Please contact support.
                  </div>
                )}
                {customDomainSuccess && (
                  <div className="mt-2 text-sm">
                    To get a custom domain, please contact
                    {' '}
                    <Link
                      to="/support"
                      className="text-blue hover:underline"
                    >
                      support
                    </Link>
                    .
                    <br />
                    This process is not automated yet, but we will watch out for your request and apply the custom domain in less than a day.
                  </div>
                )}
              </form>
            </Form>
          </PortfolioSettingsPremiumSection>
          <PortfolioSettingsPremiumSection>
            <Label>
              Dark mode
            </Label>
            <div className="mt-2 flex items-center gap-2 text-sm">
              <Switch
                checked={portfolio.theme === 'dark'}
                onCheckedChange={checked => {
                  setPortfolio(x => ({ ...x, theme: checked ? 'dark' : 'light' }))
                  setTheme(checked ? 'dark' : 'light')
                }}
                disabled={!user?.isPremium}
              />
              Dark mode
              {' '}
              {portfolio.theme === 'dark' ? 'on' : 'off'}
            </div>
          </PortfolioSettingsPremiumSection>
          <PortfolioSettingsPremiumSection>
            <Label>
              Download portfolio files
            </Label>
            <Button
              disabled={!user?.isPremium}
              className="mt-2"
            >
              Download files
            </Button>
          </PortfolioSettingsPremiumSection>
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
