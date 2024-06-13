import Stripe from 'stripe';

import { authOptions } from '@/libs/auth';
import { getServerSession } from 'next-auth';
import { NextResponse } from 'next/server';
import { getRoom } from '@/libs/api';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
  apiVersion: '2024-04-10',
});

type RequestData = {
  contractStartDate: string;
  contractEndDate: string;
  people: number;
  numberOfMonths: number;
  dormRoomSlug: string;
};

export async function POST(req: Request, res: Response) {
  const {
    contractStartDate,
    people,
    contractEndDate,
    dormRoomSlug,
    numberOfMonths,
  }: RequestData = await req.json();

  if (
    !contractStartDate ||
    !contractEndDate ||
    !people ||
    !dormRoomSlug ||
    !numberOfMonths
  ) {
    return new NextResponse('Please fill all required fields', { status: 400 });
  }

  const origin = req.headers.get('origin');

  const session = await getServerSession(authOptions);

  if (!session) {
    return new NextResponse('Authentication required', { status: 400 });
  }

  const userId = session.user.id;
  const formattedContractEndDate = contractEndDate.split('T')[0];
  const formattedContractStartDate = contractStartDate.split('T')[0];

  try {
    const room = await getRoom(dormRoomSlug);
    const price = room.price;

    // Create a stripe payment
    const stripeSession = await stripe.checkout.sessions.create({
      mode: 'payment',
      line_items: [
        {
          quantity: 1,
          price_data: {
            currency: 'ron',
            product_data: {
              name: room.name,
              images: room.images.map(image => image.url),
            },
            unit_amount: parseInt((price * 100).toString()),
          },
        },
      ],
      payment_method_types: ['card'],
      success_url: `${origin}/users/${userId}`,
      metadata: {
        people,
        contractStartDate: formattedContractStartDate,
        contractEndDate: formattedContractEndDate,
        dormRoom: room._id,
        numberOfMonths,
        user: userId,
        price
      },
    });

    return NextResponse.json(stripeSession, {
      status: 200,
      statusText: 'Payment session created',
    });
  } catch (error: any) {
    console.log('Payment falied', error);
    return new NextResponse(error, { status: 500 });
  }
}