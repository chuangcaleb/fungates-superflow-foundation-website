import { anyone } from '@/cms/access/anyone'
import { editor } from '@/cms/access/role/editor'
import { getMinRoleLevel } from '@/cms/access/role/getMinRoleLevel'
import {
  FixedToolbarFeature,
  InlineToolbarFeature,
  lexicalEditor,
} from '@payloadcms/richtext-lexical'
import { Field, GlobalConfig } from 'payload'

const Member: Field = {
  name: 'member',
  type: 'group',
  required: true,
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
          admin: { width: '50%' },
        },
      ],
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
          name: 'isCustomPhoto',
          type: 'checkbox',
          required: true,
          admin: {
            width: '50%',
            description:
              'Prefer to leave unchecked, and link to an existing `users` account (to re-use the profile image).',
          },
        },
        {
          name: 'customPhoto',
          type: 'relationship',
          relationTo: 'media',
          required: true,
          label: 'Custom Photo',
          admin: {
            width: '50%',
            condition: (_, { isCustomPhoto } = {}) => !!isCustomPhoto,
            description: 'Prefer 1:1 square-ratio images.',
          },
        },
        {
          name: 'user',
          type: 'relationship',
          relationTo: 'users',
          required: true,
          label: 'Linked User',
          unique: true,
          admin: {
            width: '50%',
            condition: (_, { isCustomPhoto } = {}) => !isCustomPhoto,
          },
        },
      ],
    },
  ],
}

export const Team: GlobalConfig = {
  slug: 'team',
  admin: {
    hidden: ({ user }) => !!user && !getMinRoleLevel(user.role, 'editor'),
    description: 'Team members to display on the "Teams" page. Not used for admin/user log-in.',
  },
  access: {
    read: anyone,
    update: editor,
  },
  fields: [
    {
      name: 'groups',
      type: 'array',
      required: true,
      label: 'Groups',
      admin: {
        // components: { RowLabel: '@/globals/Team/RowLabel#RowLabel' },
      },
      fields: [
        {
          name: 'label',
          type: 'text',
          label: 'Group Label',
          required: true,
        },
        {
          name: 'members',
          type: 'array',
          required: true,
          fields: [Member],
        },
      ],
    },
  ],
}

export default Team
