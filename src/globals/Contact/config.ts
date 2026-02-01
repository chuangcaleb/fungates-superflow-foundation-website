import type { Field, GlobalConfig } from 'payload'
import { revalidateContact } from './hooks/revalidateContact'

const contacts: Field = {
  name: 'contacts',
  label: 'Contacts',
  type: 'array',
  minRows: 0,
  fields: [
    {
      name: 'label',
      label: 'Label',
      type: 'text',
      required: true,
    },
    {
      name: 'type',
      label: 'Type',
      type: 'select',
      options: [
        { label: 'Phone', value: 'phone' },
        { label: 'Email', value: 'email' },
      ],
      required: true,
    },
    {
      name: 'value',
      label: 'Value',
      type: 'text',
      required: true,
    },
  ],
}

export const Contact: GlobalConfig = {
  slug: 'contact',
  admin: {
    description: 'Site contact information and social links',
  },
  fields: [
    { ...contacts, label: 'Contacts (Shared)' },

    {
      name: 'locations',
      label: 'Locations',
      type: 'array',
      minRows: 0,
      fields: [
        {
          name: 'title',
          type: 'text',
          admin: { width: '50%' },
          required: true,
        },
        {
          name: 'address',
          type: 'textarea',
          admin: { width: '50%' },
        },
        contacts,
      ],
    },
    {
      name: 'bottomText',
      label: 'Bottom Text',
      type: 'richText',
    },

    {
      name: 'socialLinks',
      label: 'Social Links',
      type: 'array',
      minRows: 0,
      fields: [
        {
          name: 'label',
          label: 'Label',
          type: 'text',
          required: true,
        },
        {
          name: 'url',
          label: 'URL',
          type: 'text',
          required: true,
        },
        {
          name: 'icon',
          label: 'Icon',
          type: 'text',
          admin: {
            description:
              'Select a Phosphor icon name from https://phosphoricons.com/?q=logo. Use the Phosphor icon export name (e.g. TwitterLogo, GithubLogo).',
          },
          required: true,
        },
      ],
    },
  ],
  hooks: {
    afterChange: [revalidateContact],
  },
}

export default Contact
