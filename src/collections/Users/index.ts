import { ValidationError, type CollectionConfig } from 'payload'

import { admin } from '@/cms/access/role/admin'
import { getMinRoleLevel } from '@/cms/access/role/getMinRoleLevel'
import { authenticated } from '../../cms/access/authenticated'

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
    defaultColumns: ['name', 'email', 'role', 'image'],
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
      name: 'image',
      type: 'relationship',
      relationTo: 'media',
      required: false,
      label: 'Profile Image (Optional)',
      admin: {
        description:
          'Profile image for login users — `Staff` entries can fallback to this image when linked. Prefer 1:1 square-ratio images.',
      },
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

        // no need to validate if there is no change in role
        if (oldRole === newRole) return data

        // 0. check that acting user is not target user
        if (originalDoc.id === actingUser.id) {
          throw new ValidationError({
            errors: [
              {
                path: 'role',
                message: 'You are not allowed to change your own role.',
              },
            ],
            req,
          })
        }

        // --- 1. superadmin can do anything ---
        if (actingUser.role === 'superadmin') {
          return data
        }

        // --- 2. prevent changing admin roles ---
        if (actingUser.role === 'admin') {
          // Get the target user's current roles
          const targetIsAdminOrSuperadmin = getMinRoleLevel(oldRole, 'admin')

          if (targetIsAdminOrSuperadmin) {
            throw new ValidationError({
              errors: [
                {
                  path: 'role',
                  message: 'Admins cannot change the roles of other admins or superadmins.',
                },
              ],
              req,
            })
          }

          // Allowed roles to assign
          const allowedRoles: string[] = ['editor', 'author', 'none']

          if (!allowedRoles.includes(newRole)) {
            throw new ValidationError({
              errors: [
                {
                  path: 'role',
                  message: 'Admins can only assign roles: editor, author, none.',
                },
              ],
              req,
            })
          }

          return data
        }

        // --- 3. any other roles cannot change roles ---
        // But should be handled by UPDATE perms
        throw new ValidationError({
          errors: [
            {
              path: 'role',
              message: 'You do not have permission to change roles',
            },
          ],
          req,
        })
      },
    ],
  },
  timestamps: true,
}
