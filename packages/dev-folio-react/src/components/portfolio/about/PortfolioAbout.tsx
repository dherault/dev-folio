import { Link } from 'lucide-react'

import usePortfolio from '~hooks/portfolio/usePortfolio'

import GithubIcon from '~components/icons/GithubIcon'
import LinkedinIcon from '~components/icons/LinkedinIcon'
import XIcon from '~components/icons/XIcon'
import YoutubeIcon from '~components/icons/YoutubeIcon'
import TiktokIcon from '~components/icons/TiktokIcon'
import TextPlaceholder from '~components/portfolio/placeholders/TextPlaceholder'
import ImagePlaceholder from '~components/portfolio/placeholders/ImagePlaceholder'
import SocialButton from '~components/portfolio/about/SocialButton'

function PortfolioAbout() {
  const { portfolio, isDev } = usePortfolio()

  if (!portfolio.sections.includes('about')) return null

  return (
    <section className="dfr-container dfr-min-h-screen dfr-flex dfr-flex-col md:dfr-flex-row md:dfr-items-center md:dfr-justify-center dfr-gap-8 md:dfr-gap-16">
      <div className="dfr-mt-8 md:dfr-mt-0 md:dfr-w-1/2 dfr-text-2xl md:dfr-text-3xl lg:dfr-text-4xl dfr-font-semibold md:dfr-tracking-tight">
        <h1>
          {portfolio.heroEmoji ? <span className="dfr-mr-3">{portfolio.heroEmoji}</span> : ''}
          Hi, I'm
          {' '}
          {portfolio.name || (isDev && (
            <TextPlaceholder
              editSection="about"
              label="Name"
            />
          ))}
        </h1>
        <div className="dfr-mt-4 dfr-whitespace-pre-line">
          {portfolio.heroDescription || (isDev && (
            <TextPlaceholder
              editSection="about"
              label="Description"
            />
          ))}
        </div>
        <div className="dfr-mt-4 dfr-flex dfr-gap-4">
          {!!portfolio.socialMediaUrls.github && (
            <SocialButton url={portfolio.socialMediaUrls.github}>
              <GithubIcon className="dfr-w-4" />
            </SocialButton>
          )}
          {!!portfolio.socialMediaUrls.x && (
            <SocialButton url={portfolio.socialMediaUrls.x}>
              <XIcon className="dfr-w-4" />
            </SocialButton>
          )}
          {!!portfolio.socialMediaUrls.linkedin && (
            <SocialButton url={portfolio.socialMediaUrls.linkedin}>
              <LinkedinIcon className="dfr-w-4" />
            </SocialButton>
          )}
          {!!portfolio.socialMediaUrls.youtube && (
            <SocialButton url={portfolio.socialMediaUrls.youtube}>
              <YoutubeIcon className="dfr-w-4" />
            </SocialButton>
          )}
          {!!portfolio.socialMediaUrls.tiktok && (
            <SocialButton url={portfolio.socialMediaUrls.tiktok}>
              <TiktokIcon className="dfr-w-4" />
            </SocialButton>
          )}
          {!!portfolio.socialMediaUrls.website && (
            <SocialButton url={portfolio.socialMediaUrls.website}>
              <Link className="dfr-w-4" />
            </SocialButton>
          )}
        </div>
      </div>
      <div className="dfr-mx-auto lg:dfr-mx-0 dfr-w-2/3 md:dfr-w-1/2">
        {!!portfolio.heroImageUrl && (
          <img
            src={portfolio.heroImageUrl}
            className="dfr-aspect-[3/4] dfr-object-cover"
          />
        )}
        {!portfolio.heroImageUrl && isDev && (
          <ImagePlaceholder />
        )}
      </div>
    </section>
  )
}

export default PortfolioAbout
