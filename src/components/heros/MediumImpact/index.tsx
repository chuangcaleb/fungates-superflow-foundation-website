import React from 'react'

import type { Page } from '@/payload-types'

import { CMSLink } from '@/components/Link'
import { Media } from '@/components/Media'
import RichText from '@/components/RichText'
import { cn } from '@/utilities/ui'

export const MediumImpactHero: React.FC<Page['hero']> = ({ links, media, richText, justify }) => {
  return (
    <div className="container">
      <div
        className={cn(
          'relative -mx-[var(--gutter-custom)] flex h-full items-end px-[var(--gutter-custom)] text-foreground [--gutter-custom:calc(var(--gutter)/2)]',
          {
            'justify-start': justify === 'start',
            'justify-center': justify === 'center',
            'justify-end': justify === 'end',
          },
        )}
        data-theme="dark"
      >
        <div className="my-8 max-w-[36.5rem]">
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
        <div className="min-h-[min(70vh,800px)] select-none">
          {media && typeof media === 'object' && (
            <div>
              <Media
                className="-mx-4 md:-mx-8 2xl:-mx-16"
                imgClassName="-z-10 object-cover rounded-xl"
                fill
                priority
                resource={media}
              />
              {media?.caption && (
                <div className="sr-only">
                  <RichText data={media.caption} enableGutter={false} />
                </div>
              )}
            </div>
          )}
          {/* <div className="absolute pointer-events-none left-0 bottom-0 w-full h-1/2 bg-gradient-to-t from-black to-transparent" /> */}
        </div>
      </div>
    </div>
  )
}
