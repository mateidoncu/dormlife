import { NextResponse } from 'next/server';
import Stripe from 'stripe';

import { createRentContract, updateDormRoom } from '@/libs/api';

const checkout_session_completed = 'checkout.session.completed';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
  apiVersion: '2024-04-10',
});

export async function POST(req: Request, res: Response) {
  const reqBody = await req.text();
  const sig = req.headers.get('stripe-signature');
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;

  let event: Stripe.Event;

  try {
    if (!sig || !webhookSecret) return;
    event = stripe.webhooks.constructEvent(reqBody, sig, webhookSecret);
  } catch (error: any) {
    return new NextResponse(`Webhook Error: ${error.message}`, { status: 500 });
  }

  // load our event
  switch (event.type) {
    case checkout_session_completed:
      const session = event.data.object;

      const {
        // @ts-ignore
        metadata: {
          people,
          contractStartDate,
          contractEndDate,
          dormRoom,
          numberOfMonths,
          user,
          price,
        },
      } = session;

      await createRentContract({
        people: Number(people),
        contractStartDate,
        contractEndDate,
        dormRoom,
        numberOfMonths: Number(numberOfMonths),
        price: Number(price),
        user,
      });

      // Update dorm Room
      await updateDormRoom(dormRoom);

      return NextResponse.json('Rent successful', {
        status: 200,
        statusText: 'Rent Successful',
      });

    default:
      console.log(`Unhandled event type ${event.type}`);
  }

  return NextResponse.json('Event Received', {
    status: 200,
    statusText: 'Event Received',
  });
}