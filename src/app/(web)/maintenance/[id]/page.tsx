"use client";

import { useRouter, useSearchParams } from 'next/navigation';
import useSWR from 'swr';
import axios from 'axios';
import { useSession } from 'next-auth/react';
import { useState, useEffect } from 'react';
import { MaintenanceRequest } from '@/models/maintenance';
import LoadingSpinner from '../../loading';
import toast from 'react-hot-toast';

const fetchMaintenanceRequest = async (id: string) => {
  const { data } = await axios.get(`/api/maintenance/${id}`);
  console.log('Fetched maintenance request data:', data);
  return data;
};

const fetchUserData = async () => {
  const { data } = await axios.get('/api/users');
  console.log('Fetched user data:', data);
  return data;
};  

const MaintenanceRequestPage = (props: { params: { id: string } }) => {
  const {
    params: { id: maintenanceId },
  } = props;

  const { data: session } = useSession();
  const { data: maintenanceRequest, error, mutate } = useSWR<MaintenanceRequest>(maintenanceId ? `/api/maintenance/${maintenanceId}` : null, () => fetchMaintenanceRequest(maintenanceId));
  const { data: userData, error: userError } = useSWR('/api/users', fetchUserData);

  const [status, setStatus] = useState('');

  useEffect(() => {
    if (maintenanceRequest) {
      setStatus(maintenanceRequest.status);
    }
  }, [maintenanceRequest]);

  if (error) return <div>Failed to load maintenance request</div>;
  if (!maintenanceRequest) return <LoadingSpinner />;
  if (userError) return <div>Failed to load user data</div>;

  const handleUpdate = async () => {
    try {
      await axios.put(`/api/maintenance/${maintenanceId}`, { status });
      toast.success('Maintenance request updated');
      mutate(); // Revalidate data
    } catch (err) {
      toast.error('Failed to update maintenance request');
    }
  };

  const statusOptions = ['open', 'in-progress', 'closed'];

  return (
    <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8 py-6">
      <h1 className="text-2xl font-bold">Student rent id: {maintenanceRequest.rent._id}</h1>
      <p className="text-sm text-gray-600">Status: {maintenanceRequest.status}</p>
      <p className="mt-4 text-lg">Reason: {maintenanceRequest.reason}</p>
      {userData?.isAdmin && (
        <div className="mt-2 sm:max-w-md">
          <select
            className="w-full p-2 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primary_dark sm:text-sm sm:leading-6 mt-4"
            value={status}
            onChange={(e) => setStatus(e.target.value)}
          >
            {statusOptions.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
          <button className="mt-4 rounded-md bg-primary_dark px-5 py-2.5 text-bg font-semibold text-white shadow-sm hover:bg-primary focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary_dark" onClick={handleUpdate}>
            Save changes
          </button>
        </div>
      )}
    </div>
  );
};

export default MaintenanceRequestPage;
