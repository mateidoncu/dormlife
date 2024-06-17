import { getServerSession } from 'next-auth';
import { NextResponse } from 'next/server';
import { authOptions } from '@/libs/auth';
import { getUserRents } from '@/libs/api';

export async function GET(req: Request) {
  const session = await getServerSession(authOptions);

  if (!session) {
    console.error('[API] Authentication required');
    return new NextResponse('Authentication Required', { status: 500 });
  }

  const userId = session.user.id;

  try {
    const data = await getUserRents(userId);
    console.log('[API] User rent data fetched successfully:', data);
    return NextResponse.json(data, { status: 200, statusText: 'Successful' });
  } catch (error) {
    console.error('[API] Unable to fetch user rent data:', error);
    return new NextResponse('Unable to fetch', { status: 400 });
  }
}
