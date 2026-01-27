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
      admin: {
        description:
          '(1) You cannot change your own role. (2) Admins can only manage the "Editor", "Author" and "None" roles.',
        // TODO: low priority, custom component to restrict options
      },
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
  hooks: {
    beforeChange: [
      async ({ data, req, originalDoc }) => {
        const actingUser = req.user

        if (!actingUser) throw new Error('Unauthorized')

        const oldRole = originalDoc?.role || 'none'
        const newRole = data?.role || oldRole

        // 0. check that acting user is not target user
        if (originalDoc.id === actingUser.id)
          throw new Error('You are not allowed to change your own role')

        // --- 1. superadmin can do anything ---
        if (actingUser.role === 'superadmin') {
          return data
        }

        // --- 2. prevent changing admin roles ---
        if (actingUser.role === 'admin') {
          // Get the target user's current roles
          const targetIsAdminOrSuperadmin = getMinRoleLevel(oldRole, 'admin')

          if (targetIsAdminOrSuperadmin) {
            throw new Error('Admins cannot change the roles of other admins or superadmins')
          }

          // Allowed roles to assign
          const allowedRoles: string[] = ['editor', 'author', 'none']

          if (!allowedRoles.includes(newRole)) {
            throw new Error(`Admins can only assign roles: editor, author, none`)
          }

          return data
        }

        // --- 3. any other roles cannot change roles ---
        // But should be handled by UPDATE perms
        throw new Error('You do not have permission to change roles')
      },
    ],
  },
  timestamps: true,
}
