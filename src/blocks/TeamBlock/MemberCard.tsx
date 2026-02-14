import { Media } from '@/components/Media'
import RichText from '@/components/RichText'
import { isEmptyRichText } from '@/components/RichText/utils'
import { Team } from '@/payload-types'
import Image from 'next/image'

export const MemberCard = ({
  member,
}: {
  member: Team['groups'][number]['members'][number]['member']
}) => {
  if (!!member.message && !isEmptyRichText(member.message)) {
    return (
      <div className="not-prose col-span-full flex-row flex-wrap gap-6 space-y-8 lg:flex lg:gap-16 lg:space-y-0">
        <div className="max-w-96 flex-1">
          {member.isCustomPhoto ? (
            <Media
              imgClassName="rounded-full aspect-square w-full object-cover"
              resource={member.customPhoto}
            />
          ) : (
            <Image
              src="/not-found.png"
              alt="No profile image"
              width={512}
              height={512}
              className="aspect-square w-full rounded-lg object-cover"
            />
          )}
        </div>

        {/* Content */}
        <div className="space-y-4">
          <div className="">
            <h4 className="text-xl font-semibold">{member.name}</h4>
            <p className="leading-tight text-muted-foreground">{member.title}</p>
          </div>
          <div className="prose">
            <RichText data={member.message} enableGutter={false} />
          </div>
        </div>
      </div>
    )
  }

  // Default centered card without message
  return (
    <div className="not-prose flex flex-col gap-4 text-center">
      {member.isCustomPhoto ? (
        <Media
          imgClassName="rounded-full aspect-square w-full object-cover"
          resource={member.customPhoto}
        />
      ) : (
        <Image
          src="/not-found.png"
          alt="No profile image"
          width={512}
          height={512}
          className="aspect-square w-full rounded-lg object-cover"
        />
      )}
      <div className="flex h-full flex-col justify-center space-y-1 hyphens-auto break-words">
        <h4 className="text-xl font-semibold">{member.name}</h4>
        <p className="leading-tight text-muted-foreground">{member.title}</p>
      </div>
    </div>
  )
}
