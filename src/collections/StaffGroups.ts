import type { CollectionConfig } from 'payload'

import { anyone } from '@/cms/access/anyone'
import { editor } from '@/cms/access/role/editor'
import { getMinRoleLevel } from '@/cms/access/role/getMinRoleLevel'

export const StaffGroups: CollectionConfig = {
  slug: 'staff-groups',
  admin: {
    useAsTitle: 'label',
    defaultColumns: ['label', 'showOnTeam'],
    hidden: ({ user }) => !getMinRoleLevel(user?.role, 'editor'),
  },
  access: {
    create: editor,
    delete: editor,
    read: anyone,
    update: editor,
  },
  fields: [
    {
      name: 'label',
      type: 'text',
      label: 'Group Label',
      required: true,
    },
    {
      name: 'showOnTeam',
      type: 'checkbox',
      label: 'Show on Team page',
      defaultValue: true,
      admin: {
        description: 'When unchecked, the group will be hidden from the public Team page',
      },
    },
  ],
  timestamps: true,
}
