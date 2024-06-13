import { getTickets } from '@/libs/api';
import { NextResponse } from 'next/server';

export async function GET(
  req: Request,
  { params }: { params: { id: string } }
) {
  const userId = params.id;

  try {
    const userTickets = await getTickets(userId);

    return NextResponse.json(userTickets, {
      status: 200,
      statusText: 'Successful',
    });
  } catch (error) {
    console.log('Getting Ticket Failed', error);
    return new NextResponse('Unable to fetch', { status: 400 });
  }
}
