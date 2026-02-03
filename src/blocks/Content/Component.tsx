import RichText from '@/components/RichText'
import { isEmptyRichText } from '@/components/RichText/utils'
import { cn } from '@/utilities/ui'
import React from 'react'

import type { ContentBlock as ContentBlockProps } from '@/payload-types'

import { Media } from '@/components/Media'
import { Card } from '@/components/ui/card'
import { isObject } from '@/utilities/deepMerge'
import { CMSLink } from '../../components/Link'

const colsSpanClasses = {
  full: '12',
  oneHalfNarrow: '6',
  oneHalfWide: '6',
  oneThird: '4',
  twoThirds: '8',
}

type TColumn = NonNullable<ContentBlockProps['columns']>[number]
const Column = ({ col }: { col: TColumn }) => {
  const { enableLink, link, richText, size, media, variant } = col
  const hasMedia = !!media && isObject(media)
  const columnClassName = cn(`space-y-6 col-span-4 lg:col-span-${colsSpanClasses[size!]} h-full`, {
    'md:col-span-2': size !== 'full',
    'md:col-span-4': size === 'oneHalfWide',
  })
  const isEmpty = isEmptyRichText(richText)

  if (variant === 'card') {
    return (
      <div className={columnClassName}>
        <Card className={cn('flex h-full flex-col justify-between gap-8', !hasMedia && 'p-6')}>
          <div className={cn('space-y-4', hasMedia && 'p-6 pb-0')}>
            {richText && !isEmpty && <RichText data={richText} enableGutter={false} />}
            {enableLink && <CMSLink {...link} />}
          </div>
          {hasMedia && <Media imgClassName="rounded-b-xl" resource={media} />}
        </Card>
      </div>
    )
  }

  return (
    <div
      className={cn(columnClassName, variant && 'grid place-items-start', {
        'place-content-start': variant === 'align-start',
        'place-content-center': variant === 'align-center',
      })}
    >
      {richText && !isEmpty && <RichText data={richText} enableGutter={false} />}
      {isEmpty && hasMedia && <Media imgClassName="rounded-xl" resource={media} />}
      {enableLink && <CMSLink {...link} />}
    </div>
  )
}

export const ContentBlock: React.FC<ContentBlockProps> = (props) => {
  const { columns } = props

  return (
    <div className="container my-28">
      <div className="grid grid-cols-4 gap-x-8 gap-y-8 lg:grid-cols-12">
        {columns && columns.map((col) => !!col.id && <Column col={col} key={col.id} />)}
      </div>
    </div>
  )
}
