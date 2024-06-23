import { getServerSession } from 'next-auth';
import { NextResponse } from 'next/server';
import { authOptions } from '@/libs/auth';
import { getMaintenanceRequestById, updateMaintenanceRequest } from '@/libs/api';

export async function GET(req: Request, { params }: { params: { id: string } }) {
  const session = await getServerSession(authOptions);

  if (!session) {
    console.error('[API] Authentication required');
    return new NextResponse('Authentication Required', { status: 401 });
  }

  const { id: maintenanceId } = params;

  try {
    const maintenanceRequest = await getMaintenanceRequestById(maintenanceId);
    console.log('[API] Maintenance request fetched successfully:', maintenanceRequest);
    return NextResponse.json(maintenanceRequest, {
      status: 200,
      statusText: 'Successful',
    });
  } catch (error) {
    console.log('Getting Maintenance Request Failed', error);
    return new NextResponse('Unable to fetch', { status: 400 });
  }
}

export async function PUT(req: Request, { params }: { params: { id: string } }) {
  const session = await getServerSession(authOptions);

  if (!session) {
    console.error('[API] Authentication required');
    return new NextResponse('Authentication Required', { status: 401 });
  }

  const { id: maintenanceId } = params;

  try {
    const { status } = await req.json();
    const updatedMaintenanceRequest = await updateMaintenanceRequest({ maintenanceId, maintenanceStatus: status });
    return NextResponse.json(updatedMaintenanceRequest);
  } catch (error) {
    console.error('Failed to update maintenance request', error);
    return new NextResponse('Failed to update maintenance request', { status: 500 });
  }
}
