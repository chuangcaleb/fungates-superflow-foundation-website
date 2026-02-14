'use client'
import { Team } from '@/payload-types'
import { RowLabelProps, useRowLabel } from '@payloadcms/ui'

export const RowLabel: React.FC<RowLabelProps> = () => {
  const {
    data: { label },
  } = useRowLabel<Team['groups'][number]>()
  return label
}
