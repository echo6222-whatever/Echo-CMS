import type { CollectionConfig } from 'payload'

export const Projects: CollectionConfig = {
  slug: 'projects',
  admin: {
    useAsTitle: 'title',
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
    },
    {
      name: 'date',
      type: 'date',
      required: true,
    },
    {
      name: 'tags',
      label: 'Tags',
      type: 'relationship',
      relationTo: 'tags',
      hasMany: true,
    },
    {
      name: 'blurb',
      type: 'textarea',
      required: true,
    },
    {
      name: 'description',
      type: 'textarea',
      required: true,
    },
    {
      name: 'exhibitionsAndAwards',
      type: 'textarea',
      required: false,
    },
    {
      name: 'media',
      type: 'array',
      label: 'Visual Block',
      fields: [
        {
          name: 'mediaType',
          type: 'select',
          required: true,
          options: [
            { label: 'Image', value: 'image' },
            { label: 'Video', value: 'video' },
          ],
        },
        {
          name: 'image',
          type: 'upload',
          relationTo: 'media',
          required: false,
          admin: {
            condition: (_, siblingData) => siblingData?.mediaType === 'image',
          },
        },
        {
          name: 'video',
          type: 'upload',
          relationTo: 'media',
          required: false,
          admin: {
            condition: (_, siblingData) => siblingData?.mediaType === 'video',
          },
        },
      ],
    },
  ],
}
