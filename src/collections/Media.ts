import { User } from '../payload-types';
import { Access, CollectionConfig } from 'payload/types';

const isAdminOrHasAccessToImages = (): Access => async ({ req }) => {
  const user = req.user as User | null
  if (!user) return false
  if (user.role === 'admin') return true // admins can see everything
  return {
    user: {
      equals: req.user.id
    }
  }
}

export const Media: CollectionConfig = {
  slug: 'media',
  // para no mostrar una coleccion aparte de media solo, porque no necesitamos crear medias aparte, solo queremos usarla al crear productos
  admin: {
    useAsTitle: 'description',
    hidden: ({ user }) => user.role !== 'admin'
  },
  // here we defined events and fuctions for each event
  hooks: {
    beforeChange: [
      // we want to do: each product image should also be associated with a user, 'cause we don't want anyone to be able to access all the media files, from the other people. So, an user logged in, should be able to see the ones that you own
      ({ req, data }) => {
        // we associate the image with the user
        return { ...data, user: req.user.id }
      },
    ]
  },
  access: {
    // solo se puede leer desde el front y en el back solo si es el usuario que lo creo o el admin
    read: async ({ req }) => {
      const referer = req.headers.referer
      if (!req.user || !referer?.includes('sell')) {
        return true
      }
      return await isAdminOrHasAccessToImages()({ req })
    },
    update: ({ req }) => isAdminOrHasAccessToImages()({ req }),
    delete: ({ req }) => isAdminOrHasAccessToImages()({ req }),
    // delete: isAdminOrHasAccessToImages(), // much cleaner way
    create: ({ req }) => isAdminOrHasAccessToImages()({ req }),
  },
  upload: {
    staticURL: '/drive/media',
    staticDir: 'drive/media',
    // optimaze the images
    imageSizes: [
      {
        name: 'thumbnail',
        width: 400,
        height: 300,
        position: 'centre'
      },
      {
        name: 'card',
        width: 768,
        height: 1024,
        position: 'centre'
      },
      {
        name: 'tablet',
        width: 1024,
        height: undefined,
        position: 'centre'
      },
    ],
    // just can upload images
    mimeTypes: ['image/*'],
  },
  fields: [
    {
      name: 'filename',
      type: 'text',
      required: true,
      hasMany: false,
    },
    {
      name: 'user',
      type: 'relationship',
      relationTo: 'users',
      required: true,
      hasMany: false,
      admin: {
        condition: () => false,
      }
    },
  ],
}