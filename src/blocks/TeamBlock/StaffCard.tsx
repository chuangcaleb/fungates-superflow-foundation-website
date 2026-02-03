import { Media } from '@/components/Media'
import RichText from '@/components/RichText'
import Image from 'next/image'
import { Staff } from '@/payload-types'
import React from 'react'
import { isEmptyRichText } from '@/components/RichText/utils'

export const StaffCard = ({ staff }: { staff: Staff }) => {
  if (!!staff.message && !isEmptyRichText(staff.message)) {
    return (
      <div className="not-prose col-span-full flex-row flex-wrap gap-6 space-y-8 lg:flex lg:gap-16 lg:space-y-0">
        <div className="max-w-80">
          {staff.image ? (
            <Media
              imgClassName="rounded-full aspect-square w-full object-cover"
              resource={staff.image}
            />
          ) : (
            <Image
              src="/not-found.png"
              alt="No profile image"
              width={224}
              height={224}
              className="aspect-square w-full rounded-lg object-cover"
            />
          )}
        </div>

        {/* Content */}
        <div className="space-y-4">
          <div className="">
            <h4 className="text-xl font-semibold">{staff.name}</h4>
            <p className="leading-tight text-muted-foreground">{staff.title}</p>
          </div>
          <div className="prose">
            <RichText data={staff.message} enableGutter={false} />
          </div>
        </div>
      </div>
    )
  }

  // Default centered card without message
  return (
    <div className="not-prose flex flex-col gap-4 text-center">
      {staff.image ? (
        <Media
          imgClassName="rounded-full aspect-square w-full object-cover"
          resource={staff.image}
        />
      ) : (
        <Image
          src="/not-found.png"
          alt="No profile image"
          width={224}
          height={224}
          className="aspect-square w-full rounded-full object-cover"
        />
      )}
      <div className="flex h-full flex-col justify-center space-y-1 hyphens-auto break-words">
        <h4 className="text-xl font-semibold">{staff.name}</h4>
        <p className="leading-tight text-muted-foreground">{staff.title}</p>
      </div>
    </div>
  )
}

export default StaffCard
