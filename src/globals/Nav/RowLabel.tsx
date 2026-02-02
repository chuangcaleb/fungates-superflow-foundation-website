'use client'
import { Nav } from '@/payload-types'
import { RowLabelProps, useRowLabel } from '@payloadcms/ui'

export const RowLabel: React.FC<RowLabelProps> = () => {
  const {
    data: { item },
  } = useRowLabel<NonNullable<Nav['items']>[number]>()
  return item?.label ?? item.link?.label
}
export const MultiRowLabel: React.FC<RowLabelProps> = () => {
  const { data } =
    useRowLabel<
      NonNullable<NonNullable<NonNullable<Nav['items']>[number]['item']>['links']>[number]
    >()

  return data?.link.label
}

export const GroupRowLabel: React.FC<RowLabelProps> = () => {
  const {
    data: { group },
  } =
    useRowLabel<
      NonNullable<NonNullable<NonNullable<Nav['items']>[number]['item']>['groups']>[number]
    >()
  return group?.label
}
