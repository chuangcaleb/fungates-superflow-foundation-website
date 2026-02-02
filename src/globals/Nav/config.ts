import type { Condition, Field, GlobalConfig } from 'payload'

import { anyone } from '@/access/anyone'
import { editor } from '@/access/role/editor'
import { getMinRoleLevel } from '@/access/role/getMinRoleLevel'
import { link } from '@/fields/link'
import { revalidateNav } from './hooks/revalidateNav'

const isSingleLink: Condition<any, any> = (_data, siblingData) => Boolean(siblingData?.isSingleLink)
const isNotSingleLink: Condition<any, any> = (_data, siblingData) =>
  !Boolean(siblingData?.isSingleLink)

const cleanupNavItems = (items: any[]): any[] => {
  return (
    items?.map((item: any) => {
      const cleanupItem = (obj: any) => {
        if (!obj?.isSingleLink) {
          delete obj.link
        } else {
          delete obj.label
          delete obj.items
          delete obj.links
        }
        return obj
      }

      cleanupItem(item.item)
      if (item.item?.items) {
        item.item.items = item.item.items.map((n: any) => {
          cleanupItem(n.item)
          return n
        })
      }
      return item
    }) ?? []
  )
}

const NestedNavItems: Field = {
  type: 'group',
  name: 'item',
  label: 'Nested Nav Item',
  fields: [
    {
      name: 'isSingleLink',
      type: 'checkbox',
      defaultValue: false,
    },
    link({
      appearances: false,
      overrides: {
        admin: { condition: isSingleLink },
      },
    }),
    {
      name: 'label',
      type: 'text',
      required: true,
      label: 'Group Label',
      admin: { condition: isNotSingleLink },
    },
    {
      name: 'links',
      type: 'array',
      fields: [link({ appearances: false })],
      admin: {
        condition: isNotSingleLink,
        components: { RowLabel: '@/globals/Nav/RowLabel#NestedRowLabel' },
      },
    },
  ],
}

export const Nav: GlobalConfig = {
  slug: 'nav',
  access: {
    read: anyone,
    update: editor,
  },
  admin: {
    hidden: ({ user }) => !user || !getMinRoleLevel(user.role, 'editor'),
  },
  fields: [
    {
      name: 'items',
      label: 'Root Nav Items',
      type: 'array',
      fields: [
        {
          name: 'item',
          label: 'Root Nav Item',
          type: 'group',
          fields: [
            {
              name: 'isSingleLink',
              type: 'checkbox',
              defaultValue: false,
            },
            link({
              appearances: false,
              overrides: {
                admin: { condition: isSingleLink },
              },
            }),
            {
              name: 'label',
              type: 'text',
              required: true,
              label: 'Group Label',
              admin: { condition: isNotSingleLink },
            },
            {
              name: 'items',
              label: 'Nested Nav Items',
              type: 'array',
              fields: [NestedNavItems],
              admin: {
                condition: isNotSingleLink,
                components: { RowLabel: '@/globals/Nav/RowLabel#RowLabel' },
              },
            },
          ],
        },
      ],
      maxRows: 6,
      admin: {
        components: { RowLabel: '@/globals/Nav/RowLabel#RowLabel' },
        initCollapsed: false,
      },
    },
  ],
  hooks: {
    beforeChange: [({ data }) => ({ ...data, items: cleanupNavItems(data.items) })],
    afterRead: [({ doc }) => ({ ...doc, items: cleanupNavItems(doc.items) })],
    afterChange: [revalidateNav],
  },
}
