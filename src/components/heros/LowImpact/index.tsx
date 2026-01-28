import React from 'react'

import type { Page } from '@/payload-types'

import RichText from '@/components/RichText'

export const LowImpactHero: React.FC<Page['hero']> = ({ richText, justify }) => {
  return (
    <div className="container mt-16">
      <div className="max-w-[48rem]">
        {richText && <RichText justify={justify} data={richText} enableGutter={false} />}
      </div>
    </div>
  )
}
