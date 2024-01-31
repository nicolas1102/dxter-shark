import { Label } from '@radix-ui/react-dropdown-menu';
import { User } from '../payload-types';
import { Access, CollectionConfig } from 'payload/types';

const isAdminOrHasAccessToReviews = (): Access => async ({ req }) => {
  const user = req.user as User | null
  if (!user) return false
  if (user.role === 'admin') return true // admins can see everything
  return {
    user: {
      equals: req.user.id
    }
  }
}

export const Reviews: CollectionConfig = {
  slug: 'reviews',
  hooks: {
    beforeDelete: [

    ]
  },
  access: {
    read: () => true,
    create: ({ req }) => isAdminOrHasAccessToReviews()({ req }),
    update: ({ req }) => isAdminOrHasAccessToReviews()({ req }),
    delete: ({ req }) => isAdminOrHasAccessToReviews()({ req }),
  },
  fields: [
    {
      name: 'user',
      type: 'relationship',
      relationTo: 'users',
      required: true,
      hasMany: false,
      admin: {
        condition: () => false
      }
    },
    {
      name: 'review',
      label: 'Review',
      type: 'textarea',
      required: false,
    },
    {
      name: 'rating',
      label: 'Rating',
      type: 'radio',
      required: true,
      options: [
        {
          value: "0",
          label: "0.0"
        },
        {
          value: "0.5",
          label: "0.5"
        },
        {
          value: "1",
          label: "1.0"
        },
        {
          value: "1.5",
          label: "1.5"
        },
        {
          value: "2",
          label: "2.0"
        },
        {
          value: "2.5",
          label: "2.5"
        },
        {
          value: "3",
          label: "3.0"
        },
        {
          value: "3.5",
          label: "3.5"
        },
        {
          value: "4",
          label: "4.0"
        },
        {
          value: "4.5",
          label: "4.5"
        },
        {
          value: "5",
          label: "5.0"
        }
      ]
    },
  ]
}