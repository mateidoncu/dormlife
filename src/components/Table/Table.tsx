'use client';

import { Dispatch, FC, SetStateAction } from 'react';
import { useRouter } from 'next/navigation';
import { Rent } from '@/models/rent';

type Props = {
  rentDetails: Rent[];
  setRoomId: Dispatch<SetStateAction<string | null>>;
};

const Table: FC<Props> = ({ rentDetails, setRoomId }) => {
  const router = useRouter();

  // Define calcNoOfDays function
  const calcNoOfDays = (contractStartDate: string, contractEndDate: string) => {
    const startDate = new Date(contractStartDate);
    const endDate = new Date(contractEndDate);
    const timeDiff = endDate.getTime() - startDate.getTime();
    const noOfDays = Math.ceil(timeDiff / (24 * 60 * 60 * 1000));
    return noOfDays;
  };

  return (
    <div className='overflow-x-auto max-w-[340px] rounded-lg mx-auto md:max-w-full shadow-md sm:rounded-lg'>
      <table className='w-full text-sm text-left text-gray-500'>
        <thead className='text-xs text-gray-700 uppercase bg-gray-50'>
          <tr>
            <th className='px-6 py-3'>Room name</th>
            <th className='px-6 py-3'>Price</th>
            <th className='px-6 py-3'>No. Months Rented</th>
            <th className='px-6 py-3'>Days Left</th>
            <th className='px-6 py-3'></th>
          </tr>
        </thead>
        <tbody>
          {rentDetails.map(rent => (
            <tr
              key={rent._id}
              className='bg-white border-b hover:bg-gray-50'
            >
              <th
                onClick={() =>
                  router.push(`/rooms/${rent.dormRoom.slug.current}`)
                }
                className='px-6 underline text-primary_dark cursor-pointer py-4 font-medium whitespace-nowrap'
              >
                {rent.dormRoom.name}
              </th>
              <td className='px-6 py-4'>{rent.price}</td>
              <td className='px-6 py-4'>{rent.numberOfMonths}</td>
              <td className='px-6 py-4'>
                {calcNoOfDays(rent.contractStartDate, rent.contractEndDate)}
              </td>
              <td className='px-6 py-4'>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
