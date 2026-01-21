'use client'
import { useHeaderTheme } from '@/providers/HeaderTheme'
import React, { useEffect } from 'react'

import type { Page } from '@/payload-types'

import { CMSLink } from '@/components/Link'
import { Media } from '@/components/Media'
import RichText from '@/components/RichText'
import { cn } from '@/utilities/ui'

export const HighImpactHero: React.FC<Page['hero']> = ({ links, media, richText, align }) => {
  const { setHeaderTheme } = useHeaderTheme()

  useEffect(() => {
    setHeaderTheme('dark')
  })

  return (
    <div
      className="relative -mt-[10.4rem] flex items-center justify-center text-white"
      data-theme="dark"
    >
      <div
        className={cn('container my-8 z-10 relative flex items-center', {
          'justify-start': align === 'start',
          'justify-center': align === 'center',
          'justify-end': align === 'end',
        })}
      >
        <div className={'max-w-[36.5rem]'}>
          {richText && (
            <RichText className="mb-6" data={richText} align={align} enableGutter={false} />
          )}
          {Array.isArray(links) && links.length > 0 && (
            <ul
              className={cn('flex gap-4', {
                'md:justify-start': align === 'start',
                'md:justify-center': align === 'center',
                'md:justify-end': align === 'end',
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
      <div className="min-h-[80vh] select-none">
        {media && typeof media === 'object' && (
          <Media fill imgClassName="-z-10 object-cover" priority resource={media} />
        )}
      </div>
    </div>
  )
}
