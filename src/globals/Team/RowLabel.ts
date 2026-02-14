'use client'
import { Team } from '@/payload-types'
import { RowLabelProps, useRowLabel } from '@payloadcms/ui'

export const GroupRowLabel: React.FC<RowLabelProps> = () => {
  const {
    data: { label },
  } = useRowLabel<Team['groups'][number]>()
  return label
}

export const MemberRowLabel: React.FC<RowLabelProps> = () => {
  const {
    data: { member },
  } = useRowLabel<Team['groups'][number]['members'][number]>()
  return member.name
}
