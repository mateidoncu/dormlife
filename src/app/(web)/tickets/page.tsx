'use client';

import { useSession } from 'next-auth/react';
import CreateTicket from '@/components/CreateTicket/CreateTicket';
import ListTickets from '@/components/ListTickets/ListTickets';
import axios from 'axios';
import useSWR from 'swr';
import toast from 'react-hot-toast';
import { FormEvent, useState } from 'react';
import LoadingSpinner from '../loading';

const fetchUserData = async () => {
  const { data } = await axios.get('/api/users');
  return data;
};

const TicketsPage = () => {
  const [userId, setUserId] = useState<string | null>(null);
  const [ticketTitle, setTicketTitle] = useState('');
  const [ticketText, setTicketText] = useState('');

  const { data: session } = useSession();

  const { data: userData, error: userError, isLoading: loadingUserData } = useSWR('/api/users', fetchUserData, {
    onSuccess: (data) => setUserId(data._id),
  });
  
  const submitHandler = async (e: FormEvent): Promise<void> => {
    e.preventDefault();
    console.log('[Client] Submitting ticket:', { ticketTitle, ticketText, userId });

    if (!ticketText.trim().length || !ticketTitle.trim().length) {
      toast.error('Please provide a message and title');
      return;
    }

    if (!userId) {
      toast.error('Id not provided');
      return;
    }

    try {
      const { data } = await axios.post('/api/users', {
        ticketText,
        ticketTitle,
        userId,
      });
      console.log('[Client] Ticket created successfully:', data);
      toast.success('Ticket Submitted');
    } catch (error) {
      console.error('[Client] Ticket creation failed:', error);
      toast.error('Ticket Failed');
    } finally {
      setTimeout(() => {
        setTicketText('');
        setTicketTitle('');
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
        <ListTickets />
      ) : (
        <CreateTicket
          ticketText={ticketText}
          ticketTitle={ticketTitle}
          setTicketText={setTicketText}
          setTicketTitle={setTicketTitle}
          submitHandler={submitHandler}
        />
      )}
    </div>
  );
};

export default TicketsPage;
