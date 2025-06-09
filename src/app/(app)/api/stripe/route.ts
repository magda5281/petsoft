import prisma from '@/lib/db';
import { updateUserAccess } from '@/lib/server-utils';
import stripe from '@/lib/stripe';

export async function POST(request: Request) {
  const body = await request.text();

  const signature = request.headers.get('stripe-signature');
  if (!signature) {
    console.log('Missing Stripe signature header');
    return Response.json(
      { error: 'Missing Stripe signature header' },
      { status: 400 }
    );
  }

  if (!process.env.STRIPE_WEBHOOK_SECRET) {
    throw new Error('Missing env var STRIPE_WEBHOOK_SECRET');
  }
  //verify the webhook came from stripe
  let event;
  try {
    event = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET
    );
  } catch (error) {
    console.log('Error verifying Stripe webhook:', error);
    return Response.json(null, { status: 400 });
  }

  //fulfill the order - stripe sends the event with the type 'checkout.session.completed'

  switch (event.type) {
    case 'checkout.session.completed':
      await updateUserAccess(event.data.object.customer_email as string, true);

      break;
    default:
      console.log(`Unhandled event type ${event.type}`);
  }

  //return response so stripe knows it was received
  return Response.json(null, { status: 200 });
}
