import type { CollectionConfig } from 'payload'

import { author } from '@/cms/access/role/author'
import { getMinRoleLevel } from '@/cms/access/role/getMinRoleLevel'
import { slugField } from 'payload'
import { anyone } from '../cms/access/anyone'

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
