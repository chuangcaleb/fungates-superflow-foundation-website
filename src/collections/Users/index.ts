import type { CollectionConfig } from 'payload'

import { admin } from '@/access/role/admin'
import { getMinRoleLevel } from '@/access/role/getMinRoleLevel'
import { authenticated } from '../../access/authenticated'

export const Users: CollectionConfig = {
  slug: 'users',
  access: {
    admin: authenticated,
    create: admin,
    delete: admin,
    read: authenticated,
    update: admin,
  },
  admin: {
    defaultColumns: ['name', 'email'],
    useAsTitle: 'name',
    hidden: ({ user }) => !getMinRoleLevel(user.role, 'admin'),
  },
  auth: true,
  fields: [
    {
      name: 'name',
      type: 'text',
      required: true,
    },
    {
      name: 'role',
      type: 'select',
      label: 'Role',
      saveToJWT: true,
      defaultValue: 'none',
      required: true,
      options: [
        {
          // can manage admins — only 1
          label: 'Superadmin',
          value: 'superadmin',
        },
        // can CRUD editors/authors/roles
        {
          label: 'Admin',
          value: 'admin',
        },
        // can edit page content
        {
          label: 'Editor',
          value: 'editor',
        },
        // can edit post content
        {
          label: 'Author',
          value: 'author',
        },
        // default
        {
          label: 'None',
          value: 'none',
        },
      ],
    },
  ],
  timestamps: true,
}
