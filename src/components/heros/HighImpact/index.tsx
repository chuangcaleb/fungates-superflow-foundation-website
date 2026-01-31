'use client'
import { useHeaderTheme } from '@/providers/HeaderTheme'
import React, { useEffect } from 'react'

import type { Page } from '@/payload-types'

import { CMSLink } from '@/components/Link'
import { Media } from '@/components/Media'
import RichText from '@/components/RichText'
import { cn } from '@/utilities/ui'

export const HighImpactHero: React.FC<Page['hero']> = ({ links, media, richText, justify }) => {
  const { setHeaderTheme } = useHeaderTheme()

  useEffect(() => {
    setHeaderTheme('dark')
  })

  return (
    <div
      className="relative -mt-[var(--header-height)] flex items-center pt-[calc(var(--header-height)*2/3)] text-foreground [--header-height:6.2rem]"
      data-theme="dark"
    >
      <div
        className={cn('container relative z-10 my-8 flex flex-1 items-center', {
          'justify-start': justify === 'start',
          'justify-center': justify === 'center',
          'justify-end': justify === 'end',
        })}
      >
        <div className="max-w-[36.5rem]">
          {richText && (
            <RichText className="mb-6" data={richText} justify={justify} enableGutter={false} />
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
      </div>
      <div className="min-h-[75vh] select-none">
        {media && typeof media === 'object' && (
          <>
            <Media fill imgClassName="-z-10 object-cover" priority resource={media} />
            {media?.caption && (
              <div className="sr-only">
                <RichText data={media.caption} enableGutter={false} />
              </div>
            )}
          </>
        )}
      </div>
    </div>
  )
}
