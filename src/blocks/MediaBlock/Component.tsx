import type { StaticImageData } from 'next/image'

import RichText from '@/components/RichText'
import { cn } from '@/utilities/ui'
import React from 'react'

import type { MediaBlock as MediaBlockProps } from '@/payload-types'

import { Media } from '../../components/Media'

type Props = MediaBlockProps & {
  // breakout?: boolean // from initial template — does this even do anything??
  showCaption?: boolean
  className?: string
  enableGutter?: boolean
  imgClassName?: string
  staticImage?: StaticImageData
}

export const MediaBlock: React.FC<Props> = (props) => {
  const {
    showCaption = true,
    className,
    enableGutter = true,
    imgClassName,
    media,
    staticImage,
  } = props

  let caption
  if (media && typeof media === 'object') caption = media.caption

  return (
    <div className={cn('', { container: enableGutter }, className)}>
      {(media || staticImage) && (
        <Media
          imgClassName={cn('border border-border rounded-xl', imgClassName)}
          resource={media}
          src={staticImage}
        />
      )}
      {showCaption && caption && (
        <div className="mt-4 text-slate-700">
          <RichText data={caption} enableGutter={false} />
        </div>
      )}
    </div>
  )
}
