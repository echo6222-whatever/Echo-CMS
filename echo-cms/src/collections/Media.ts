import type { CollectionConfig } from 'payload'

export const Media: CollectionConfig = {
  slug: 'media',
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'alt',
      type: 'text',
      required: true,
    },
  ],
  upload: {
    adminThumbnail: 'thumbnail',
    imageSizes: [
      {
        name: 'thumbnail',
        width: 300,
        height: 300,
        position: 'centre',
        fit: 'inside',
      },
      {
        name: 'mobile',
        width: 640,
        height: 640,
        position: 'centre',
        fit: 'inside',
      },
      {
        name: 'tablet',
        width: 1080,
        height: 1080,
        position: 'centre',
        fit: 'inside',
      },
      {
        name: 'desktop',
        width: 1920,
        height: 1920,
        position: 'centre',
        fit: 'inside',
      },
    ],
  },
}
