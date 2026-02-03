import config from '@payload-config'
import { getPayload } from 'payload'
import React from 'react'

import type { Staff, StaffGroup } from '@/payload-types'
import StaffCard from './StaffCard'

export const TeamBlock: React.FC<{}> = async ({}) => {
  const payload = await getPayload({ config })

  const { docs: staffGroups } = await payload.find({
    collection: 'staff-groups',
    where: { showOnTeam: { equals: true } },
    depth: 0,
  })

  if (!staffGroups || staffGroups.length === 0) {
    return (
      <div className="container prose">
        <h2 className="sr-only">Our Team</h2>
        <p>No team members to display.</p>
      </div>
    )
  }

  // Fetch staff for each group
  const groupsWithStaff = await Promise.all(
    staffGroups.map(async (group: StaffGroup) => {
      const { docs: staff } = await payload.find({
        collection: 'staff',
        where: { group: { equals: group.id } },
        depth: 2,
      })
      return { ...group, staff }
    }),
  )

  return (
    <div className="container prose space-y-12">
      <h2 className="sr-only">Our Team</h2>
      {groupsWithStaff.map((group) => (
        <div key={group.id} className="space-y-8">
          <h3 className="text-2xl font-semibold">{group.label}</h3>
          <div className="xs:grid-cols-2 grid justify-center gap-16 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
            {group.staff.length > 0 ? (
              group.staff.map((staff: Staff) => <StaffCard key={staff.id} staff={staff} />)
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
