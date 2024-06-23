import { getTicket, updateTicketMessage } from '@/libs/api';
import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/libs/auth';

export async function GET(req: Request, { params }: { params: { id: string } }) {
  const session = await getServerSession(authOptions);

  if (!session) {
    console.error('[API] Authentication required');
    return new NextResponse('Authentication Required', { status: 401 });
  }

  const userId = session.user.id;
  const { id: ticketId } = params;

  try {
    const userTickets = await getTicket(userId, ticketId);
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

export async function PUT(req: Request, { params }: { params: { id: string } }) {
  const session = await getServerSession(authOptions);

  if (!session) {
    console.error('[API] Authentication required');
    return new NextResponse('Authentication Required', { status: 401 });
  }

  const { id: ticketId } = params;

try {
    const { message, status } = await req.json();
    const updatedTicket = await updateTicketMessage(ticketId, { message, status });
    return NextResponse.json(updatedTicket);
  } catch (error) {
    console.error('Failed to update ticket', error);
    return new NextResponse('Failed to update ticket', { status: 500 });
  }}
