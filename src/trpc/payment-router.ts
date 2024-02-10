import { z } from 'zod';
import { privateProcedure, publicProcedure, router } from './trpc';
import { TRPCError } from '@trpc/server';
import { getPayloadClient } from '../get-payload';
import { stripe } from '../lib/stripe';
import type Stype from 'stripe'
import { Product } from '@/payload-types';

export const paymentRouter = router({
  createSession: privateProcedure
    .input(z.object({
      productsData: z.array(z.object({
        product: z.string(),
        colorId: z.string(),
        size: z.string(),
        quantity: z.number(),
      }))
    }))
    .mutation(async ({ ctx, input }) => {
      const { user } = ctx
      let { productsData } = input

      if (productsData.length === 0) {
        throw new TRPCError({ code: 'BAD_REQUEST' })
      }

      const productsIds = productsData.map(
        ({ product }) => product
      )

      const payload = await getPayloadClient()

      const { docs: products } = await payload.find({
        collection: 'products',
        where: {
          id: {
            in: productsIds
          }
        }
      })

      const filteredProductsWithPriceId = products.filter(product => Boolean(product.priceId))

      const filteredProducts = productsData.map(productData => {
        const matchingProduct = filteredProductsWithPriceId.find(
          filteredProduct => filteredProduct.id === productData.product
        );
        return { ...productData, product: matchingProduct as Product };
      });

      const filteredProducts2 = productsData.map(productData => {
        const matchingProduct = filteredProductsWithPriceId.find(
          filteredProduct => filteredProduct.id === productData.product
        );
        return { ...productData };
      });

      // console.log(filteredProducts);

      const order = await payload.create({
        collection: 'orders',
        data: {
          _isPaid: false,
          productsCart: filteredProducts2,
          user: user.id,
        }
      })

      const line_items: Stype.Checkout.SessionCreateParams.LineItem[] = []

      filteredProducts.forEach((productItem) => {
        line_items.push({
          price: productItem.product.priceId!,
          quantity: productItem.quantity,
        })
      })

      line_items.push({
        price: 'price_1OgdFlDIw78rFBI1yOimYfQD',
        quantity: 1,
        adjustable_quantity: {
          enabled: false
        }
      })

      try {
        const stripeSession = await stripe.checkout.sessions.create({
          // success_url: `${process.env.NEXT_PUBLIC_SERVER_URL}/`,
          success_url: `${process.env.NEXT_PUBLIC_SERVER_URL}/thank-you?orderId=${order.id}`,
          // if something went wrong, if the user cancel
          cancel_url: `${process.env.NEXT_PUBLIC_SERVER_URL}/cart`,
          payment_method_types: ['card'],
          mode: 'payment',
          metadata: {
            userId: user.id,
            orderId: order.id,
          },
          line_items,
        })

        return {
          url: stripeSession.url
        }
      } catch (error) {
        console.log(error);
        return {
          url: null
        }
      }
    }),
  pollOrderStatus: publicProcedure.input(z.object({ orderId: z.string() })).query(async ({ input }) => {
    const { orderId } = input
    const payload = await getPayloadClient()
    const { docs: orders } = await payload.find({
      collection: 'orders',
      where: {
        id: {
          equals: orderId
        }
      }
    })

    if (!orders.length) {
      throw new TRPCError({ code: 'NOT_FOUND' })
    }

    const [order] = orders

    return { isPaid: order._isPaid }

  }),
})