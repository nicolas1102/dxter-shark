import { buildConfig } from 'payload/config'
import { mongooseAdapter } from '@payloadcms/db-mongodb'
import { slateEditor } from '@payloadcms/richtext-slate'
import { webpackBundler } from '@payloadcms/bundler-webpack'
import { Users } from './collections/Users'
import path from 'path'
import dotenv from 'dotenv'
import { Reviews } from './collections/Reviews'
import { Media } from './collections/Media'
import { Products } from './collections/Products'
import { Orders } from './collections/Orders'

dotenv.config({
  // dirname get the current directory
  path: path.resolve(__dirname, '../.env')
})

export default buildConfig({
  serverURL: process.env.NEXT_PUBLIC_SERVER_URL || '',
  collections: [Users, Reviews, Products, Media, Orders],
  routes: {
    admin: '/sell'
  },
  admin: {
    // principal collection
    user: 'users',
    // use by the admin dashboard. just for the backend
    bundler: webpackBundler(),
    meta: {
      titleSuffix: '- Dxter Shark',
      favicon: '/favicon.ico'
    }
  },
  rateLimit: {
    max: 2000,
  },
  editor: slateEditor({}),
  db: mongooseAdapter({
    // '!' we tell thissi a value that definitely exist
    url: process.env.MONGODB_URL!,
  }),
  typescript: {
    // put all the types generated from our collections like the users and products in the next file
    outputFile: path.resolve(__dirname, 'payload-types.ts')
  }
})
