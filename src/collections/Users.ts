// this collection is important. Is our authentication collection
// this type of collections are for show in the admin dashboard. Here we configure all the collections

import { CollectionConfig } from 'payload/types';

export const Users: CollectionConfig = {
  slug: 'users',
  // verification
  auth: {
    // we configure the email verification
    verify: {
      generateEmailHTML: ({ token }) => {
        return `<a href='${process.env.NEXT_PUBLIC_SERVER_URL}/verify-email?token=${token}'>Verify Account</a>`
      }
    }
  },
  // we specify with type of people can see this collection in the dashboard, and what they can do with it
  access: {
    read: () => true,
    create: () => true,
  },
  admin: {
    hidden: ({ user }) => user.role !== 'admin',
    defaultColumns: ['id'],
  },
  // every entry in the database row
  fields: [
    {
      // we have difrents roles (admins, Regular users, users can bie sellers or buyers)
      name: 'role',
      defaultValue: 'user',
      required: true,
      // we configure who can see this field
      admin: {
        // example: we force just the admin can see this field and change it
        // condition: ({ req }) => req.user.role === 'admin'
        // condition: () => false,
      },
      type: 'select',
      options: [
        { label: 'Admin', value: 'admin' },
        { label: 'User', value: 'user' }
      ]
    }
  ]
}