'use client';

import CreateMaintenanceRequest from '@/components/CreateMaintenance/CreateMaintenance';
import MaintenanceRequestsList from '@/components/MaintenanceList/MaintenanceList';
import axios from 'axios';
import { useSession } from 'next-auth/react';
import { FormEvent, useState } from 'react';
import toast from 'react-hot-toast';
import useSWR from 'swr';
import LoadingSpinner from '../loading';

const fetchUserData = async () => {
  const { data } = await axios.get('/api/users');
  return data;
};

const fetchUserRent = async () => {
  const { data } = await axios.get('/api/userrent');
  return data;
}

const fetchMaintenanceRequests = async (url: string) => {
  const { data } = await axios.get(url);
  return data;
};

const MaintenancePage = () => {
  const [userId, setUserId] = useState<string | null>(null);
  const [rentId, setRentId] = useState<string | null>(null);
  const [maintenanceReason, setMaintenanceReason] = useState('');
  const [maintenanceDate, setMaintenanceDate] = useState<Date | null>(null);
  
  const { data: session } = useSession();
  
  const { data: userData, error: userError, isLoading: loadingUserData } = useSWR('/api/users', fetchUserData, {
    onSuccess: (data) => setUserId(data._id) 
  });

  const { data: rentData, error: rentError } = useSWR('/api/userrent', fetchUserRent, {
    onSuccess: (data) => {
      console.log('Fetched rent data:', data);
      if (data.length > 0) {
        setRentId(data[0]._id);
      }
    }
  });

  const { data: maintenanceRequests, error: maintenanceRequestsError } = useSWR(
    userData?.isAdmin ? '/api/maintenance' : null,
    fetchMaintenanceRequests,
    {
      revalidateOnFocus: true, // Ensures data is re-fetched when window is focused
      refreshInterval: 1000, // Automatically refresh data every 5 seconds
    }
  );

  const submitHandler = async (e: FormEvent): Promise<void> => {
    e.preventDefault();
    console.log('[Client] Submitting maintenance request:', { maintenanceReason, maintenanceDate, userId });

    if (!maintenanceReason.trim().length) {
      toast.error('Please provide a reason');
      return;
    }

    if (!userId) {
      toast.error('User Id not provided');
      return;
    }

    if (!rentId) {
      console.log('Rent Data:', rentData);
      toast.error('No room rented by user');
      return;
    }

    try {
      const { data } = await axios.post('/api/maintenance', {
        maintenanceDate,
        maintenanceReason,
        userId,
        rentId
      });
      console.log('[Client] Maintenance request created successfully:', data);
      toast.success('Request Submitted');
    } catch (error) {
      console.error('[Client] Maintenance request creation failed:', error);
      toast.error('Request Failed');
    } finally {
      setTimeout(() => {
        setMaintenanceDate(null);
        setMaintenanceReason('');
      }, 2000);
    }
  };

  if (!session) {
    return (
      <div className="relative isolate px-6 pt-2 lg:px-8">
        <div className="mx-auto max-w-2xl py-32 sm:py-48 lg:py-56">
          <div className="text-center">
            <h1 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">
              Please login to use ticketing functionality
            </h1>
            <div className="mt-10 flex items-center justify-center gap-x-6">
              <a
                href="/login"
                className="rounded-md bg-primary_dark px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-primary_dark focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary_dark"
              >
                Login
              </a>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (loadingUserData) {
    return <LoadingSpinner />;
  }

  if (userError) {
    return <div>Failed to load user data</div>;
  }

  return (
    <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8 py-6">
      {userData?.isAdmin ? (
        <MaintenanceRequestsList
        />
      ) : (
        <CreateMaintenanceRequest
          maintenanceDate={maintenanceDate}
          maintenanceReason={maintenanceReason}
          setMaintenanceDate={setMaintenanceDate}
          setMaintenanceReason={setMaintenanceReason}
          submitHandler={submitHandler}
        />
      )}
    </div>
  )
}

export default MaintenancePage;
