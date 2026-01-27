import type { CollectionConfig } from 'payload'

import { author } from '@/access/role/author'
import { getMinRoleLevel } from '@/access/role/getMinRoleLevel'
import { slugField } from 'payload'
import { anyone } from '../access/anyone'

export const Categories: CollectionConfig = {
  slug: 'categories',
  access: {
    create: author,
    delete: author,
    read: anyone,
    update: author,
  },
  admin: {
    useAsTitle: 'title',
    hidden: ({ user }) => !getMinRoleLevel(user.role, 'author'),
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
    },
    slugField({
      position: undefined,
    }),
  ],
}
