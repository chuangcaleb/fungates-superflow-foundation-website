'use client'
import { Nav } from '@/payload-types'
import { RowLabelProps, useRowLabel } from '@payloadcms/ui'

export const RowLabel: React.FC<RowLabelProps> = () => {
  const {
    data: { item },
  } = useRowLabel<NonNullable<Nav['items']>[number]>()
  return item?.isSingleLink ? item?.link?.label : item?.label
}
export const NestedRowLabel: React.FC<RowLabelProps> = () => {
  const { data } = useRowLabel<NonNullable<NonNullable<Nav['items']>[number]['item']>>()
  return data?.link?.label
}
