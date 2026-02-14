import React from 'react'

import type { Team } from '@/payload-types'
import { getCachedGlobal } from '@/utilities/getGlobals'
import { MemberCard } from './MemberCard'

export const TeamBlock: React.FC<{}> = async () => {
  // @ts-ignore
  const team: Team = await getCachedGlobal('team', 1)()

  if (!team || team.groups.length === 0) {
    return (
      <div className="container prose">
        <h2 className="sr-only">Our Team</h2>
        <p>No team members to display.</p>
      </div>
    )
  }

  return (
    <div className="container prose space-y-20">
      <h2 className="sr-only">Our Team</h2>
      {team.groups.map((group) => (
        <div key={group.id} className="space-y-8">
          <h3 className="text-2xl font-semibold">{group.label}</h3>
          <div className="grid grid-cols-2 gap-8 sm:grid-cols-3 sm:gap-10 md:gap-12 lg:grid-cols-4 lg:gap-14 xl:grid-cols-5 xl:gap-16">
            {group.members.length > 0 ? (
              group.members.map(({ id, member }) => <MemberCard key={id} member={member} />)
            ) : (
              <p className="col-span-full text-muted-foreground">No staff members in this group.</p>
            )}
          </div>
        </div>
      ))}
    </div>
  )
}

export default TeamBlock
