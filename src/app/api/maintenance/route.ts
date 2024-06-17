import { getServerSession } from 'next-auth';
import { NextResponse } from 'next/server';
import { authOptions } from '@/libs/auth';
import {
  checkMaintenanceExists,
  createMaintenanceRequest,
  updateMaintenanceRequest,
} from '@/libs/api';

export async function POST(req: Request) {
  const session = await getServerSession(authOptions);

  if (!session) {
    console.error('[API] Authentication required');
    return new NextResponse('Authentication Required', { status: 500 });
  }

  try {
    const { maintenanceDate, maintenanceReason, userId, rentId, maintenanceStatus } = await req.json();
    console.log('[API] Received maintenance request data:', { maintenanceDate, maintenanceReason, userId, rentId, maintenanceStatus });

    if (!maintenanceDate || !maintenanceReason || !userId || !rentId) {
      console.error('[API] Missing fields for maintenance request creation:', { maintenanceDate, maintenanceReason, userId, rentId });
      return new NextResponse('Missing fields for maintenance request creation', { status: 400 });
    }

    const alreadyExistsMaintenance = await checkMaintenanceExists(userId);
    console.log('[API] Maintenance request exists:', alreadyExistsMaintenance);

    let data;

    if (alreadyExistsMaintenance) {
      data = await updateMaintenanceRequest({
        maintenanceId: alreadyExistsMaintenance._id,
        maintenanceStatus,
      });
    } else {
      data = await createMaintenanceRequest({
        maintenanceReason,
        maintenanceDate,
        userId,
        rentId,
      });
    }

    console.log('[API] Maintenance request operation successful:', data);
    return NextResponse.json(data, { status: 200, statusText: 'Successful' });
  } catch (error) {
    console.error('[API] Unable to create maintenance request:', error);
    return new NextResponse('Unable to create maintenance request', { status: 400 });
  }
}
