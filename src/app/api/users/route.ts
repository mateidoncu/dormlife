import { getServerSession } from 'next-auth';
import { NextResponse } from 'next/server';

import { authOptions } from '@/libs/auth';
import {
  checkTicketExists,
  createTicket,
  getUserData,
  updateTicket,
} from '@/libs/api';

export async function GET(req: Request, res: Response) {
  const session = await getServerSession(authOptions);

  if (!session) {
    return new NextResponse('Authentication Required', { status: 500 });
  }

  const userId = session.user.id;

  try {
    const data = await getUserData(userId);
    return NextResponse.json(data, { status: 200, statusText: 'Successful' });
  } catch (error) {
    return new NextResponse('Unable to fetch', { status: 400 });
  }
}

export async function POST(req: Request) {
  const session = await getServerSession(authOptions);

  if (!session) {
    return new NextResponse('Authentication Required', { status: 500 });
  }

  const { ticketTitle, ticketText } = await req.json();

  if (!ticketTitle || !ticketText) {
    return new NextResponse('All fields are required', { status: 400 });
  }

  const userId = session.user.id;

  try {
    const alreadyExists = await checkTicketExists(userId);

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

    return NextResponse.json(data, { status: 200, statusText: 'Successful' });
  } catch (error) {
    return new NextResponse('Unable to create ticket', { status: 400 });
  }
}
