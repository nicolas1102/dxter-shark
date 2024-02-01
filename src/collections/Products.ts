import { PRODUCT_CATEGORIES } from '../config/const';
import { CollectionConfig } from 'payload/types';

export const Products: CollectionConfig = {
  slug: 'products',
  hooks: {
    beforeChange: [
      ({ req, data }) => {
        // we associate the image with the user
        return { ...data, user: req.user.id }
      },
    ],
  },
  admin: {
    useAsTitle: 'name'
  },
  // defines who can access which parts of which product. Not everybody can download the product
  access: {
    read: () => true,
    update: () => true,
    delete: () => true,
    create: () => true,
  },
  fields: [
    {
      name: 'name',
      label: 'Name',
      type: 'text',
      required: true
    },
    {
      name: 'price',
      label: 'Price in USD',
      type: 'number',
      min: 0,
      max: 1000000,
      required: true
    },
    {
      name: 'genre',
      label: 'Genre',
      type: 'select',
      options: PRODUCT_CATEGORIES.map(category => ({
        label: category.title,
        value: category.value,
      })),
      required: true
    },
    {
      name: 'category',
      label: 'Categories',
      type: 'select',
      options: Array.from(
        new Set(
          PRODUCT_CATEGORIES.flatMap(category =>
            category.featured.map(featuredItem => featuredItem.title)
          )
        )
      ).map(label => ({ label: label, value: label })),
      required: true,
    },
    {
      name: 'description',
      label: 'Product Details',
      type: 'textarea',
      required: true
    },
    {
      name: 'material',
      label: 'Material',
      type: 'text',
      required: false
    },
    {
      name: 'fit',
      label: 'Fit',
      type: 'text',
      required: false
    },
    {
      name: 'model',
      label: 'Model',
      type: 'text',
      required: false
    },
    {
      name: 'product_item',
      label: 'Product Item',
      type: 'array',
      minRows: 1,
      maxRows: 20,
      required: true,
      labels: {
        singular: 'Product Item',
        plural: 'Product Items',
      },
      fields: [
        {
          name: 'color_name',
          label: 'Color Name',
          type: 'text',
          required: true,
        },
        // TODO: Make color picker
        {
          name: 'color_hex',
          label: 'Color Hexadecimal',
          type: 'text',
          required: true,
        },
        {
          name: 'xs_quantity',
          label: 'XS - Quantity',
          type: 'number',
          defaultValue: 0,
          required: true,
          min: 0,
          max: 1000,
        },
        {
          name: 's_quantity',
          label: 'S - Quantity',
          type: 'number',
          defaultValue: 0,
          required: true,
          min: 0,
          max: 1000,
        },
        {
          name: 'm_quantity',
          label: 'M - Quantity',
          type: 'number',
          defaultValue: 0,
          required: true,
          min: 0,
          max: 1000,
        },
        {
          name: 'l_quantity',
          label: 'L - Quantity',
          type: 'number',
          defaultValue: 0,
          required: true,
          min: 0,
          max: 1000,
        },
        {
          name: 'xl_quantity',
          label: 'XL - Quantity',
          type: 'number',
          defaultValue: 0,
          required: true,
          min: 0,
          max: 1000,
        },
        {
          name: 'xxl_quantity',
          label: 'XXL - Quantity',
          type: 'number',
          defaultValue: 0,
          required: true,
          min: 0,
          max: 1000,
        },
        {
          name: 'images',
          label: 'Product Images',
          type: 'array',
          minRows: 1,
          maxRows: 20,
          required: true,
          labels: {
            singular: 'Image',
            plural: 'Images',
          },
          fields: [{
            name: 'image',
            type: 'upload',
            relationTo: 'media',
            required: true,
          }]
        },
      ],
    },
    {
      name: 'rating',
      label: 'Rating',
      type: 'number',
      defaultValue: 0,
      min: 0,
      max: 5,
      admin: {
        condition: () => false,
      }
    },
    {
      name: 'number_reviews',
      label: 'Number of Reviews',
      type: 'number',
      defaultValue: 0,
      min: 0,
      admin: {
        condition: () => false,
      }
    },
    {
      name: 'reviews',
      type: 'relationship',
      relationTo: 'reviews',
      required: false,
      hasMany: true,
      admin: {
        condition: () => false,
      }
    },
    // stripe product associated. So me can handle the checkout data for payments
    {
      name: 'priceId',
      access: {
        // just us can change this on the backend at auth-router.ts file
        create: () => false,
        read: () => false,
        update: () => false,
      },
      type: 'text',
      admin: {
        hidden: true
      },
    },
    {
      name: 'stripeId',
      access: {
        // just us can change this on the backend at auth-router.ts file
        create: () => false,
        read: () => false,
        update: () => false,
      },
      type: 'text',
      admin: {
        hidden: true
      },
    },
    // everybody can create a product on our store, which doesn't mean it's good, so...
    {
      // admins are the only ones that can change this. users cannot
      name: 'approvedForSale',
      label: 'Product Status',
      defaultValue: 'pending',
      access: {
        create: ({ req }) => req.user.role === 'admin',
        read: ({ req }) => req.user.role === 'admin',
        update: ({ req }) => req.user.role === 'admin',
      },
      type: 'select',
      options: [
        {
          label: 'Pending verification',
          value: 'pending',
        },
        {
          label: 'Approved',
          value: 'approved',
        },
        {
          label: 'Denied',
          value: 'denied',
        },
      ],
    },
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
  ],
}