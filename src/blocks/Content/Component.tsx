import RichText from '@/components/RichText'
import { cn } from '@/utilities/ui'
import React from 'react'

import type { ContentBlock as ContentBlockProps } from '@/payload-types'

import { Media } from '@/components/Media'
import { isObject } from '@/utilities/deepMerge'
import { CMSLink } from '../../components/Link'

export const ContentBlock: React.FC<ContentBlockProps> = (props) => {
  const { columns } = props

  const colsSpanClasses = {
    full: '12',
    oneHalfNarrow: '6',
    oneHalfWide: '6',
    oneThird: '4',
    twoThirds: '8',
  }

  return (
    <div className="container my-28">
      <div className="grid grid-cols-4 lg:grid-cols-12 gap-y-8 gap-x-16">
        {columns &&
          columns.length > 0 &&
          columns.map((col, index) => {
            const { enableLink, link, richText, size, media, align } = col
            const richTextContent = richText?.root.children
            const isEmptyRichText =
              !!richTextContent &&
              richTextContent.length === 1 &&
              'children' in richTextContent[0] &&
              Array.isArray(richTextContent[0].children) &&
              richTextContent[0].children.length === 0

            return (
              <div
                className={cn(
                  `space-y-6 col-span-4 lg:col-span-${colsSpanClasses[size!]} h-full`,
                  {
                    'md:col-span-2': size !== 'full',
                    'md:col-span-4': size === 'oneHalfWide',
                  },
                  align && 'grid place-items-start',
                  {
                    'place-content-start': align === 'start',
                    'place-content-center': align === 'center',
                    'place-content-end': align === 'end',
                  },
                )}
                key={index}
              >
                {richText && !isEmptyRichText && <RichText data={richText} enableGutter={false} />}
                {isEmptyRichText && isObject(media) && <Media resource={media} />}
                {enableLink && <CMSLink {...link} />}
              </div>
            )
          })}
      </div>
    </div>
  )
}
