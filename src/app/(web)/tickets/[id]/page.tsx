"use client";

import useSWR from 'swr';
import axios from 'axios';
import { useSession } from 'next-auth/react';
import { useState, useEffect } from 'react';
import { Ticket } from '@/models/ticket';
import LoadingSpinner from '../../loading';
import toast from 'react-hot-toast';
import { User } from '@/models/user';

const fetchTicketById = async (ticketId: string) => {
  const { data } = await axios.get<Ticket>(`/api/tickets/${ticketId}`);
  console.log('Fetched ticket data:', data);
  return data;
};

const fetchUserData = async () => {
  const { data } = await axios.get<User>('/api/users');
  console.log('Fetched user data:', data);
  return data;
};

const TicketPage = (props: { params: { id: string } }) => {
  const {
    params: { id: ticketId },
  } = props;

  const { data: session } = useSession();
  console.log('Session data:', session);

  const { data: ticket, error: errorGettingTicket, isLoading: loadingTicket, mutate } = useSWR<Ticket>(
    `/api/tickets/${ticketId}`,
    () => fetchTicketById(ticketId)
  );

  const { data: userData, error: errorGettingUserData, isLoading: loadingUserData } = useSWR('/api/users', fetchUserData);

  const [message, setMessage] = useState('');
  const [status, setStatus] = useState('');

  useEffect(() => {
    if (ticket) {
      setMessage(ticket.message);
      setStatus(ticket.status);
    }
  }, [ticket]);

  if (loadingUserData || loadingTicket) return <LoadingSpinner />;
  if (errorGettingTicket) return <div>Failed to load ticket: {errorGettingTicket.message}</div>;
  if (errorGettingUserData) return <div>Failed to load user data: {errorGettingUserData.message}</div>;

  const handleUpdate = async () => {
    try {
      if (userData?.isAdmin) {
        await axios.put(`/api/tickets/${ticketId}`, { status });
      } else {
        await axios.put(`/api/tickets/${ticketId}`, { message });
      }
      toast.success('Ticket updated');
      mutate(); // Revalidate data
    } catch (err) {
      toast.error('Failed to update ticket');
    }
  };

  if (!ticket) return <div>Ticket not found</div>;

  const statusOptions = ['open', 'in-progress', 'closed'];

  return (
    <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8 py-6">
      <h1 className="text-2xl font-bold">Ticket title: {ticket.title}</h1>
      <p className="text-sm text-gray-600">Status: {ticket.status}</p>
      <p className="mt-4 text-lg">Message: {ticket.message}</p>
      {(session?.user?.name === ticket.user?.name || userData?.isAdmin) && (
        <div className="mt-2 sm:max-w-md">
          {!userData?.isAdmin && (
            <textarea
              className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primary_dark sm:text-sm sm:leading-6"
              rows={4}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            />
          )}
          {userData?.isAdmin && (
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
          )}
          <button className="mt-4 rounded-md bg-primary_dark px-5 py-2.5 text-bg font-semibold text-white shadow-sm hover:bg-primary focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary_dark" onClick={handleUpdate}>
            Save changes
          </button>
        </div>
      )}
    </div>
  );
};

export default TicketPage;
