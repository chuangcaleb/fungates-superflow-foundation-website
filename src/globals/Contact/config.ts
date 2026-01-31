import type { Field, GlobalConfig } from 'payload'

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
          name: 'address',
          label: 'Address',
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
        {
          name: 'target',
          label: 'Target',
          type: 'select',
          options: [
            { label: 'Same window', value: '_self' },
            { label: 'New window', value: '_blank' },
          ],
          defaultValue: '_blank',
        },
      ],
    },
  ],
}

export default Contact
