import prisma from '@/lib/db';
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
  //TODO: verify the webhook came from stripe
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

  //you can use stripe's library to verify the signature
  // const signature = request.headers.get('stripe-signature');
  // const event = stripe.webhooks.constructEvent(body, signature, process.env.STRIPE_WEBHOOK_SECRET);

  //fulfill the order

  await prisma.user.update({
    where: {
      email: data.data.object.customer_email,
    },
    data: {
      hasAccess: true, // Update the user to have access
    },
  });

  //return response so stripe knows it was received
  return Response.json(null, { status: 200 });
}
