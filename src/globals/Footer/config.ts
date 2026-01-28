import type { GlobalConfig } from 'payload'

import { anyone } from '@/access/anyone'
import { editor } from '@/access/role/editor'
import { getMinRoleLevel } from '@/access/role/getMinRoleLevel'
import { link } from '@/fields/link'
import { revalidateFooter } from './hooks/revalidateFooter'

export const Footer: GlobalConfig = {
  slug: 'footer',
  access: {
    read: anyone,
    update: editor,
  },
  admin: {
    hidden: ({ user }) => !user || !getMinRoleLevel(user.role, 'editor'),
  },
  fields: [
    {
      name: 'navItems',
      type: 'array',
      fields: [
        link({
          appearances: false,
        }),
      ],
      maxRows: 6,
      admin: {
        initCollapsed: true,
        components: {
          RowLabel: '@/globals/Footer/RowLabel#RowLabel',
        },
      },
    },
  ],
  hooks: {
    afterChange: [revalidateFooter],
  },
}
