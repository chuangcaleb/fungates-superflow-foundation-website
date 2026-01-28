import type { GlobalConfig } from 'payload'

import { anyone } from '@/access/anyone'
import { editor } from '@/access/role/editor'
import { getMinRoleLevel } from '@/access/role/getMinRoleLevel'
import { link } from '@/fields/link'
import { revalidateHeader } from './hooks/revalidateHeader'

export const Header: GlobalConfig = {
  slug: 'header',
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
          RowLabel: '@/globals/Header/RowLabel#RowLabel',
        },
      },
    },
  ],
  hooks: {
    afterChange: [revalidateHeader],
  },
}
