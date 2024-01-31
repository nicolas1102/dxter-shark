import { Access, CollectionConfig } from 'payload/types';

const yourOwn: Access = ({ req: { user } }) => {
  if (user.role === 'admin') return true

  // you only can read your own orders
  return {
    user: {
      equals: user.id
    }
  }

}

export const Orders: CollectionConfig = {
  slug: 'orders',
  admin: {
    useAsTitle: 'Your Orders',
    description: 'Asummary of all your order on DigitalHoppo.'
  },
  access: {
    read: yourOwn,
    create: ({ req }) => req.user.role === 'admin',
    update: ({ req }) => req.user.role === 'admin',
    delete: ({ req }) => req.user.role === 'admin',
  },
  fields: [
    {
      name: '_isPaid',
      type: 'checkbox',
      // we don't want the seller set the order as paid, whis could be bad. This just can be set when the buyer paid (with help of stripe)
      access: {
        read: ({ req }) => req.user.role === 'admin',
        create: () => false,
        update: () => false,
      },
      admin: {
        hidden: true,
      },
      required: true,
    },
    {
      name: 'user',
      type: 'relationship',
      relationTo: 'users',
      admin: {
        hidden: true
      },
      required: true
    },
    {
      name: 'products',
      type: 'relationship',
      relationTo: 'products',
      hasMany: true,
      required: true,
    }
  ]
} 