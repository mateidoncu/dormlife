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

const Table: FC<Props> = ({ maintenanceDetails, setMaintenanceRequestId, ticketDetails, setTicketId }) => {
  const router = useRouter();

  return (
    <div className='overflow-x-auto max-w-[340px] rounded-lg mx-auto md:max-w-full shadow-md sm:rounded-lg'>
      <table className='w-full text-sm text-left text-gray-500'>
        <thead className='text-xs text-gray-700 uppercase bg-gray-50'>
          <tr>
          <th className='px-6 py-3'>Ticket Title</th>
            <th className='px-6 py-3'>Ticket Status</th>
            <th className='px-6 py-3'>Maintenance Request</th>
            <th className='px-6 py-3'>Maintenance Status</th>
            <th className='px-6 py-3'>Maintenance Scheduled Date</th>
          </tr>
        </thead>
        <tbody>
          {/* {ticketDetails.map(ticket => ( */}
            <tr
            //   key={ticket._id}
              className='bg-white border-b hover:bg-gray-50'
            >
              <th
                // onClick={() =>
                //   router.push(`/rooms/${maintenance.dormRoom.slug.current}`)
                // }
                className='px-6 underline text-primary_dark cursor-pointer py-4 font-medium whitespace-nowrap'
              >
                {/* {ticket.title} */}
                title
              </th>
              <td className='px-6 py-4'>in-progress</td>
              <td className='px-6 py-4'>yes/no</td>
              <td className='px-6 py-4'>
                open
              </td>
              <td className='px-6 py-4'>
                date
              </td>
            </tr>
          {/* ))} */}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
