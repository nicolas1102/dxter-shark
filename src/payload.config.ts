import { buildConfig } from 'payload/config';
import { mongooseAdapter } from '@payloadcms/db-mongodb';
import { slateEditor } from '@payloadcms/richtext-slate';
import { webpackBundler } from '@payloadcms/bundler-webpack';
import path from 'path';

export default buildConfig({
  serverURL: process.env.NEXT_PUBLIC_SERVER_URL || '',
  collections: [],
  routes: {
    admin: '/sell'
  },
  admin: {
    // use by the admin dashboard. just for the backend
    bundler: webpackBundler(),
    meta: {
      titleSuffix: '- DigitalHippo',
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
