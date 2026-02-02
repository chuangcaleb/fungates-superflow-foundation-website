import type { Condition, Field, GlobalConfig } from 'payload'

import { anyone } from '@/access/anyone'
import { editor } from '@/access/role/editor'
import { getMinRoleLevel } from '@/access/role/getMinRoleLevel'
import { link } from '@/fields/link'
import { revalidateNav } from './hooks/revalidateNav'

const variants = ['single', 'multi', 'group'] as const
type Variant = (typeof variants)[number]

const variantCondition: (variant: Variant | 'not--single') => Condition =
  (variant) => (_data, siblingData) => {
    if (variant === 'not--single') return siblingData.variant !== 'single'
    return siblingData.variant === variant
  }

// thanks ai
const cleanupNavItems = (items: any[] = []): any[] => {
  return items.map((row) => {
    const item = row.item

    if (!item) return row

    switch (item.variant) {
      case 'single': {
        // single → only `link` is valid
        delete item.label
        delete item.links
        delete item.groups
        break
      }

      case 'multi': {
        // multi → label + links
        delete item.link
        delete item.groups
        break
      }

      case 'group': {
        // group → label + groups
        delete item.link
        delete item.links

        if (Array.isArray(item.groups)) {
          item.groups = item.groups.map((g: any) => {
            if (!g?.item) return g

            // group items: label + links
            delete g.item.link
            delete g.item.items
            delete g.item.groups

            return g
          })
        }

        break
      }
    }

    return row
  })
}

const NavGroupItems: Field = {
  type: 'group',
  name: 'group',
  fields: [
    {
      name: 'label',
      label: 'Label (Group)',
      type: 'text',
      required: true,
    },
    {
      name: 'links',
      type: 'array',
      fields: [link({ appearances: false })],
      admin: {
        components: { RowLabel: '@/globals/Nav/RowLabel#MultiRowLabel' },
      },
      minRows: 1,
    },
  ],
  label: 'Group',
  required: true,
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
      type: 'array',
      fields: [
        {
          name: 'item',
          label: 'Root Nav Item',
          type: 'group',
          fields: [
            {
              type: 'row',
              fields: [
                {
                  name: 'variant',
                  type: 'select',
                  defaultValue: 'single',
                  options: [
                    { label: 'Single', value: 'single' },
                    { label: 'Multi', value: 'multi' },
                    { label: 'Group', value: 'group' },
                  ],
                  admin: { width: '50%' },
                },
                {
                  name: 'label',
                  type: 'text',
                  required: true,
                  label: 'Label (Root)',
                  admin: {
                    condition: variantCondition('not--single'),
                    width: '50%',
                  },
                },
              ],
            },
            link({
              appearances: false,
              overrides: {
                admin: { condition: variantCondition('single') },
              },
            }),
            {
              name: 'links',
              type: 'array',
              fields: [link({ appearances: false })],
              admin: {
                condition: variantCondition('multi'),
                components: { RowLabel: '@/globals/Nav/RowLabel#MultiRowLabel' },
                initCollapsed: true,
              },
              minRows: 1,
              required: true,
            },
            {
              name: 'groups',
              type: 'array',
              fields: [NavGroupItems],
              admin: {
                condition: variantCondition('group'),
                components: { RowLabel: '@/globals/Nav/RowLabel#GroupRowLabel' },
                initCollapsed: true,
              },
              minRows: 1,
              required: true,
            },
          ],
          required: true,
        },
      ],
      maxRows: 6,
      minRows: 1,
      admin: {
        components: { RowLabel: '@/globals/Nav/RowLabel#RowLabel' },
        initCollapsed: false,
      },
      labels: {
        plural: 'Root Nav Items',
        singular: 'Root Nav Item',
      },
    },
  ],
  hooks: {
    beforeChange: [({ data }) => ({ ...data, items: cleanupNavItems(data.items) })],
    afterRead: [({ doc }) => ({ ...doc, items: cleanupNavItems(doc.items) })],
    afterChange: [revalidateNav],
  },
  // versions: {
  //   max: 10,
  //   drafts: { schedulePublish: true },
  // },
}
