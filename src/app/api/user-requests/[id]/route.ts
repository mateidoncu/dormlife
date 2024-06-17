import { getMaintenanceRequests } from '@/libs/api';
import { NextResponse } from 'next/server';

export async function GET(
  req: Request,
  { params }: { params: { id: string } }
) {
  const userId = params.id;

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
