import prisma from '@/lib/db';

export async function POST(request: Request) {
  const data = await request.json();
  //TODO: verify the webhook came from stripe

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
