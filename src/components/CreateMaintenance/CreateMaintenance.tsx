'use client';

import { FC, useState } from 'react';
import { useRouter } from 'next/navigation';
import { createMaintenanceRequest, sendNotification } from '@/libs/api';
import { useSession } from 'next-auth/react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const CreateMaintenanceRequest: FC = () => {
  const [description, setDescription] = useState('');
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const router = useRouter();
  const { data: session } = useSession();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!session?.user || !selectedDate) return;

    const newRequest = await createMaintenanceRequest({
      roomId: 'room-id',
      description,
      status: 'pending',
      user: session.user.id,
      selectedDate: selectedDate.toISOString()
    });
    await sendNotification('admin-id', `New maintenance request created for ${selectedDate}`);
    router.push('/maintenance');
  };

  return (
    <form onSubmit={handleSubmit}>
      <DatePicker selected={selectedDate} onChange={date => setSelectedDate(date)} />
      <textarea value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Description" required />
      <button type="submit">Create Maintenance Request</button>
    </form>
  );
};

export default CreateMaintenanceRequest;
