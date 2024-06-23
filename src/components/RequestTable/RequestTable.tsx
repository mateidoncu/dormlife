'use client';

import { Dispatch, FC, SetStateAction } from 'react';
import { useRouter } from 'next/navigation';
import { MaintenanceRequest } from '@/models/maintenance';
import { Ticket } from '@/models/ticket';

type Props = {
  maintenanceDetails: MaintenanceRequest[];
  setMaintenanceRequestId: Dispatch<SetStateAction<string | null>>;
  ticketDetails: Ticket[];
  setTicketId: Dispatch<SetStateAction<string | null>>;
};

const RequestTable: FC<Props> = ({ maintenanceDetails, setMaintenanceRequestId, ticketDetails, setTicketId }) => {
  const router = useRouter();

  const formatDate = (date: Date) => {
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');

    return `${day}-${month}-${year}@${hours}:${minutes}`;
  };


  return (
    <div className='flex flex-col md:flex-row justify-center gap-4 w-full'>
      {/* First Table */}
      <div className='w-full md:w-1/3 rounded-lg shadow-md'>
        <div className='overflow-x-auto'>
          <table className='w-full text-sm text-left text-gray-500'>
            <thead className='text-xs text-gray-700 uppercase bg-gray-50'>
              <tr>
                <th className='px-6 py-3'>Ticket Title</th>
                <th className='px-6 py-3'>Ticket Status</th>
              </tr>
            </thead>
            <tbody>
              {ticketDetails.map(ticket => (
                <tr
                  key={ticket._id}
                  className='bg-white border-b hover:bg-gray-50'
                >
                  <th className='px-6 underline text-primary_dark cursor-pointer py-4 font-medium whitespace-nowrap' onClick={() => router.push(`/tickets/${ticket._id}`)}>
                    {ticket.title}
                  </th>
                  <td className='px-6 py-4'>{ticket.status}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className='w-full md:w-2/3 rounded-lg shadow-md'>
        <div className='overflow-x-auto'>
          <table className='w-full text-sm text-left text-gray-500'>
            <thead className='text-xs text-gray-700 uppercase bg-gray-50'>
              <tr>
                <th className='px-6 py-3'>Maintenance Request Rent ID</th>
                <th className='px-6 py-3'>Maintenance Status</th>
                <th className='px-6 py-3'>Maintenance Scheduled Date</th>
              </tr>
            </thead>
            <tbody>
              {maintenanceDetails.map(maintenanceRequest => (
                <tr
                  key={maintenanceRequest._id}
                  className='bg-white border-b hover:bg-gray-50'
                >
                  <td className='px-6 py-4'>{maintenanceRequest.rent._id}</td>
                  <td className='px-6 py-4'>{maintenanceRequest.status}</td>
                  <td className='px-6 py-4'>{formatDate(new Date(maintenanceRequest.scheduledDate))}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default RequestTable;
