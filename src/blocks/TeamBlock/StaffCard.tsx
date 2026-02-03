import { Media } from '@/components/Media'
import Image from 'next/image'
// import RichText from '@/components/RichText'
import { Staff } from '@/payload-types'
import React from 'react'

const StaffCard = ({ staff }: { staff: Staff }) => {
  return (
    <div className="not-prose flex flex-col items-center gap-4 text-center">
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
      <div>
        <h4 className="text-xl font-semibold">{staff.name}</h4>
        <p className="text-muted-foreground">{staff.title}</p>
      </div>
    </div>
  )
}

export default StaffCard
