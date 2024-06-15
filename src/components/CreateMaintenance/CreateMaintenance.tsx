'use client';

import { FC, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import { createMaintenanceRequest } from '@/libs/api';

type TileProperties = {
  date: Date;
  view: 'month' | 'year' | 'decade' | 'century';
};

const CreateMaintenanceRequest: FC = () => {
  const [reason, setReason] = useState('');
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const router = useRouter();
  const { data: session } = useSession();

  const disablePastDates = ({ date, view }: TileProperties): boolean => {
    if (view === 'month') {
      return date.getTime() < new Date().setHours(0, 0, 0, 0);
    }
    return false;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!session?.user || !selectedDate) return;

    try {
      await createMaintenanceRequest({
        reason,
        rentId: 'rent-id', // Replace with actual rent id
        userId: session.user.id,
      });
      router.push('/maintenance');
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="space-y-6">
        <div className="pb-6">
          <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-4 sm:grid-cols-6">
            <div className="sm:col-span-4">
              <label className="block text-sm font-medium leading-6 text-gray-900 mb-1">
                Pick a date
              </label>
              <Calendar 
                locale="en-RO"
                value={selectedDate} 
                onChange={date => setSelectedDate(date as Date)}
                tileDisabled={disablePastDates} 
              />
              <label className="block text-sm font-medium leading-6 text-gray-900 mt-10">
                Reason for maintenance request
              </label>
              <div className="mt-2 sm:max-w-md">
                <textarea
                  id="reason"
                  name="reason"
                  rows={5}
                  value={reason}
                  onChange={e => setReason(e.target.value)}
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primary_dark sm:text-sm sm:leading-6"
                  defaultValue={''}
                  required
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="mt-6 flex items-center justify-start gap-x-6">
        <button
          type="submit"
          className="rounded-md bg-primary_dark px-5 py-2.5 text-bg font-semibold text-white shadow-sm hover:bg-primary focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary_dark"
        >
          Submit
        </button>
      </div>
    </form>
  );
};

export default CreateMaintenanceRequest;
