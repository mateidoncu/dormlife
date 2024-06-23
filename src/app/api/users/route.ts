import { getServerSession } from 'next-auth';
import { NextResponse } from 'next/server';
import { authOptions } from '@/libs/auth';
import {
  checkTicketExists,
  createTicket,
  getUserData,
  updateTicket,
} from '@/libs/api';

export async function GET(req: Request) {
  const session = await getServerSession(authOptions);

  if (!session) {
    console.error('[API] Authentication required');
    return new NextResponse('Authentication Required', { status: 500 });
  }

  const userId = session.user.id;

  try {
    const data = await getUserData(userId);
    // console.log('[API] User data fetched successfully:', data);
    return NextResponse.json(data, { status: 200, statusText: 'Successful' });
  } catch (error) {
    // console.error('[API] Unable to fetch user data:', error);
    return new NextResponse('Unable to fetch', { status: 400 });
  }
}

export async function POST(req: Request) {
  const session = await getServerSession(authOptions);

  if (!session) {
    console.error('[API] Authentication required');
    return new NextResponse('Authentication Required', { status: 500 });
  }

  try {
    const { ticketTitle, ticketText, userId } = await req.json();
    console.log('[API] Received data:', { ticketTitle, ticketText, userId });

    if (!ticketTitle || !ticketText || !userId) {
      console.error('[API] Missing fields:', { ticketTitle, ticketText, userId });
      return new NextResponse('All fields are required', { status: 400 });
    }

    const alreadyExists = await checkTicketExists(userId);
    console.log('[API] Open ticket exists:', alreadyExists);

    let data;

    if (alreadyExists) {
      data = await updateTicket({
        ticketId: alreadyExists._id,
        ticketMessage: ticketText,
      });
    } else {
      data = await createTicket({
        ticketMessage: ticketText,
        ticketTitle,
        userId,
      });
    }

    console.log('[API] Ticket operation successful:', data);
    return NextResponse.json(data, { status: 200, statusText: 'Successful' });
  } catch (error) {
    console.error('[API] Unable to create ticket:', error);
    return new NextResponse('Unable to create ticket', { status: 400 });
  }
}
