import { getTickets } from '@/libs/api';
import { authOptions } from '@/libs/auth';
import { getServerSession } from 'next-auth';
import { NextResponse } from 'next/server';

export async function GET(req: Request) {
  const session = await getServerSession(authOptions);

  if (!session) {
    console.error('[API] Authentication required');
    return new NextResponse('Authentication Required', { status: 500 });
  }

  const userId = session.user.id;

  try {
    const userTickets = await getTickets();
    console.log('[API] User tickets fetched successfully:', userTickets);
    return NextResponse.json(userTickets, {
      status: 200,
      statusText: 'Successful',
    });
  } catch (error) {
    console.log('Getting Ticket Failed', error);
    return new NextResponse('Unable to fetch', { status: 400 });
  }
}
