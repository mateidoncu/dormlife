import { getMaintenanceRequests } from '@/libs/api';
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
    const userMaintenanceRequests = await getMaintenanceRequests(userId);
    
    return NextResponse.json(userMaintenanceRequests, {
      status: 200,
      statusText: 'Successful',
    });
  } catch (error) {
    console.log('Getting Maintenance request Failed', error);
    return new NextResponse('Unable to fetch', { status: 400 });
  }
}
