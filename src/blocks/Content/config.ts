import type { Block, Field } from 'payload'

import {
  FixedToolbarFeature,
  HeadingFeature,
  InlineToolbarFeature,
  lexicalEditor,
} from '@payloadcms/richtext-lexical'

import { link } from '@/fields/link'

const columnFields: Field[] = [
  {
    type: 'row',
    fields: [
      {
        name: 'size',
        type: 'select',
        defaultValue: 'full',
        options: [
          {
            label: 'Full',
            value: 'full',
          },
          {
            label: 'One-Half (Wide)',
            value: 'oneHalfWide',
          },
          {
            label: 'One-Third',
            value: 'oneThird',
          },
          {
            label: 'Two-Thirds',
            value: 'twoThirds',
          },
          {
            label: 'One-Half (Narrow)',
            value: 'oneHalfNarrow',
          },
        ],
        admin: {
          width: '50%',
        },
      },
      {
        name: 'align',
        type: 'select',
        defaultValue: 'start',
        options: [
          {
            label: 'Start',
            value: 'start',
          },
          {
            label: 'Center',
            value: 'center',
          },
          {
            label: 'End',
            value: 'end',
          },
        ],
        admin: {
          width: '50%',
        },
      },
    ],
  },
  {
    name: 'richText',
    type: 'richText',
    editor: lexicalEditor({
      features: ({ rootFeatures }) => {
        return [
          ...rootFeatures,
          HeadingFeature({ enabledHeadingSizes: ['h2', 'h3', 'h4'] }),
          FixedToolbarFeature(),
          InlineToolbarFeature(),
        ]
      },
    }),
    label: false,
  },
  {
    name: 'media',
    type: 'upload',
    label: 'Optional image',
    relationTo: 'media',
  },
  {
    name: 'enableLink',
    type: 'checkbox',
  },
  link({
    overrides: {
      admin: {
        condition: (_data, siblingData) => {
          return Boolean(siblingData?.enableLink)
        },
      },
    },
  }),
]

export const Content: Block = {
  slug: 'content',
  interfaceName: 'ContentBlock',
  fields: [
    {
      name: 'columns',
      type: 'array',
      admin: {
        initCollapsed: true,
      },
      fields: columnFields,
    },
  ],
}
