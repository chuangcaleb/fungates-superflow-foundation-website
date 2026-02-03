import type { CollectionConfig } from 'payload'

import {
  FixedToolbarFeature,
  InlineToolbarFeature,
  lexicalEditor,
} from '@payloadcms/richtext-lexical'

import { anyone } from '@/cms/access/anyone'
import { editor } from '@/cms/access/role/editor'
import { getMinRoleLevel } from '@/cms/access/role/getMinRoleLevel'

export const Staff: CollectionConfig = {
  slug: 'staff',
  admin: {
    useAsTitle: 'name',
    defaultColumns: ['name', 'title', 'group', 'image'],
    hidden: ({ user }) => !getMinRoleLevel(user?.role, 'editor'),
    description:
      'Staff members to display on the "Teams" page. Not used for admin/user log-in. Must belong to a Staff Group in order to be displayed.',
  },
  access: {
    create: editor,
    delete: editor,
    read: anyone,
    update: editor,
  },
  fields: [
    {
      type: 'row',
      fields: [
        {
          name: 'name',
          type: 'text',
          label: 'Full Name',
          required: true,
          admin: { width: '50%' },
        },
        {
          name: 'title',
          type: 'text',
          label: 'Title',
          required: true,
          admin: { width: '50%' },
        },
      ],
    },

    {
      name: 'group',
      type: 'relationship',
      relationTo: 'staff-groups',
      required: true,
      label: 'Staff Group',
      admin: {
        description:
          'Select the Staff Group this staff belongs to. Each staff MUST belong to exactly one group.',
      },
    },
    {
      name: 'message',
      type: 'richText',
      label: 'Custom Message',
      required: false,
      editor: lexicalEditor({
        features: ({ rootFeatures }) => {
          return [...rootFeatures, FixedToolbarFeature(), InlineToolbarFeature()]
        },
      }),
    },
    {
      type: 'row',
      fields: [
        {
          name: 'image',
          type: 'relationship',
          relationTo: 'media',
          required: false,
          label: 'Profile Image',
          admin: {
            width: '50%',
            description:
              'If empty and `user` is linked, the User image will be used. Prefer 1:1 square-ratio images.',
          },
        },
        {
          name: 'user',
          type: 'relationship',
          relationTo: 'users',
          required: false,
          label: 'Linked User',
          unique: true,
          admin: {
            width: '50%',
            description:
              'Optional: link this staff entry to a `users` account (to re-use the profile image). Leave empty for staff without a user login account.',
          },
        },
      ],
    },
  ],
  hooks: {
    // Too complex — if user deletes their image, it doesn't update Staff validation anyways
    // beforeValidate: [
    //   async ({ data, req }) => {
    //     if (!data) return data

    //     // Check if staff has a direct image
    //     if (data.image) return data

    //     // If no direct image, check if linked user has an image
    //     if (data.user) {
    //       try {
    //         const user = await req.payload.findByID({
    //           collection: 'users',
    //           id: String(data.user),
    //           depth: 0,
    //         })

    //         if (user?.image) return data
    //       } catch (e) {
    //         // ignore lookup errors
    //       }
    //     }

    //     // Neither direct image nor user image available
    //     throw new ValidationError({
    //       errors: [
    //         {
    //           path: 'image',
    //           message:
    //             'Staff must either have a Profile Image, or be linked to a User with a profile image.',
    //         },
    //       ],
    //       req,
    //     })
    //   },
    // ],
    afterRead: [
      async ({ doc, req }) => {
        if (!doc) return doc

        // If staff has its own image, keep it
        if (doc.image) return doc

        // If linked to a user, attempt to resolve the user's image
        if (doc.user?.id) {
          try {
            const user = await req.payload.findByID({
              collection: 'users',
              id: doc.user.id,
              depth: 1,
            })

            if (user?.image) {
              doc.image = user.image
            }
          } catch (e) {
            // ignore lookup errors
            console.error(e)
          }
        }

        return doc
      },
    ],
  },
  timestamps: true,
}
