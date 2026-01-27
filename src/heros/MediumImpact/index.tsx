import React from 'react'

import type { Page } from '@/payload-types'

import { CMSLink } from '@/components/Link'
import { Media } from '@/components/Media'
import RichText from '@/components/RichText'
import { cn } from '@/utilities/ui'

export const MediumImpactHero: React.FC<Page['hero']> = ({ links, media, richText, justify }) => {
  return (
    <div className="">
      <div className="container mb-8">
        {richText && (
          <RichText
            className={cn('mb-6', {
              'text-start': justify === 'start',
              'text-center': justify === 'center',
              'text-end': justify === 'end',
            })}
            data={richText}
            justify={justify}
            enableGutter={false}
          />
        )}

        {Array.isArray(links) && links.length > 0 && (
          <ul
            className={cn('flex gap-4', {
              'md:justify-start': justify === 'start',
              'md:justify-center': justify === 'center',
              'md:justify-end': justify === 'end',
            })}
          >
            {links.map(({ link }, i) => {
              return (
                <li key={i}>
                  <CMSLink {...link} />
                </li>
              )
            })}
          </ul>
        )}
      </div>
      <div className="container">
        {media && typeof media === 'object' && (
          <div>
            <Media
              className="-mx-4 md:-mx-8 2xl:-mx-16"
              imgClassName=""
              priority
              resource={media}
            />
            {media?.caption && (
              <div className="mt-3">
                <RichText data={media.caption} enableGutter={false} />
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  )
}
