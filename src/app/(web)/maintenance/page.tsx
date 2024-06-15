'use client';

import CreateMaintenanceRequest from '@/components/CreateMaintenance/CreateMaintenance';
import ViewMaintenanceRequests from '@/components/ViewMaintenance/ViewMaintenance';
import axios from 'axios';
import { useSession } from 'next-auth/react';
import { useState } from 'react';
import useSWR from 'swr';

const fetchUserData = async () => {
  const { data } = await axios.get('/api/users');
  return data;
};


const Maintenance = () => {
  
  const [userId, setUserId] = useState<string | null>(null);

  const { data: userData, error: userError } = useSWR('/api/users', fetchUserData, { onSuccess: (data) => setUserId(data._id) });
  
  const { data: session } = useSession();

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

  return (
    <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8 py-6">
      {userData?.isAdmin ? (
        <ViewMaintenanceRequests 
        />
      ) : (
        <CreateMaintenanceRequest
        />
      )}

    </div>
  )
}

export default Maintenance;

