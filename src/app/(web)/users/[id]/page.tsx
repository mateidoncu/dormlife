"use client";
import useSWR from 'swr';
import axios from 'axios';
import { getUserMaintenanceRequests, getUserRents, getUserTickets } from '@/libs/api';
import { User } from '@/models/user';
import LoadingSpinner from '../../loading';
import { SetStateAction, useState } from 'react';
import { BsJournalBookmarkFill } from 'react-icons/bs';
import { MdOutlineReportProblem } from "react-icons/md";
import { GiMoneyStack } from 'react-icons/gi';
import Table from '@/components/Table/Table';
import Chart from '@/components/Chart/Chart';
import RequestTable from '@/components/RequestTable/RequestTable'; // Import the RequestTable component
import { Ticket } from '@/models/ticket';
import { MaintenanceRequest } from '@/models/maintenance';

const UserDetails = (props: { params: { id: string } }) => {
  const {
    params: { id: userId },
  } = props;

  const [currentNav, setCurrentNav] = useState<'rents' | 'amount' | 'requests'>('rents'); // Added 'requests'
  const [roomId, setRoomId] = useState<string | null>(null);

  const fetchUserRent = async () => getUserRents(userId);

  const fetchUserData = async () => {
    const { data } = await axios.get<User>('/api/users');
    return data;
  };

  const fetchUserTickets = async () => getUserTickets(userId);

  const fetchUserMaintenanceRequests = async () => getUserMaintenanceRequests(userId);


  const {
    data: userRents,
    error,
    isLoading,
  } = useSWR('/api/userrent', fetchUserRent);

  const {
    data: userData,
    isLoading: loadingUserData,
    error: errorGettingUserData,
  } = useSWR('/api/users', fetchUserData);


  const {
    data: userTickets = [],
    isLoading: loadingUserTickets,
    error: errorGettingUserTickets,
  } = useSWR<Ticket[]>(`get/tickets`, fetchUserTickets);

  const {
    data: userMaintenanceRequests = [],
    isLoading: loadingUserMaintenanceRequests,
    error: errorGettingUserMaintenanceRequests,
  } = useSWR<MaintenanceRequest[]>(`get/maintenance`, fetchUserMaintenanceRequests);


  if (error || errorGettingUserData) throw new Error('Cannot fetch data');
  if (typeof userRents === 'undefined' && !isLoading)
    throw new Error('Cannot fetch data');
  if (typeof userData === 'undefined' && !loadingUserData)
    throw new Error('Cannot fetch data');

  if (loadingUserData) return <LoadingSpinner />;
  if (!userData) throw new Error('Cannot fetch data');

  return (
    <div className='container mx-auto px-2 md:px-4 py-10'>
      <div className='grid gap-10'>
        <div className='col-span-full'>
          <div className='flex items-center'>
            <h5 className='text-2xl font-bold mr-3'>Hello, {userData.name}</h5>
          </div>
          {userData.isAdmin ? (
            <div>
              <p className='block w-fit md:hidden text-sm py-2'>
                {userData.about ?? ''}
              </p>

              <p className='text-xs py-2 font-medium'>
                Joined In {userData._createdAt.split('T')[0]}
              </p>

              <div className="inline-block relative rounded-full px-3 py-1 text-sm leading-6 text-gray-600 ring-1 ring-gray-900/10 hover:ring-gray-900/20">
                <a href="/studio" className="font-semibold text-primary_dark">
                  <span className="absolute inset-0" aria-hidden="true" />
                  Admin page
                </a>
              </div>

              <div className="pt-3">
                <div className="inline-block relative rounded-full px-3 py-1 text-sm leading-6 text-gray-600 ring-1 ring-gray-900/10 hover:ring-gray-900/20">
                  <a href="https://dashboard.stripe.com/test/payments" className="font-semibold text-primary_dark">
                    <span className="absolute inset-0" aria-hidden="true" />
                    Payments dashboard
                  </a>
                </div>   
              </div>
            </div>
          ) : (
            <div>
              <p className='block w-fit md:hidden text-sm py-2'>
                About me {userData.about ?? ''}
              </p>

              <p className='block w-fit md:hidden text-sm py-2'>
                Faculty {userData.faculty ?? ''}
              </p>

              <p className='block w-fit md:hidden text-sm py-2'>
                Enrolled academic year {userData.yearOfStudy ?? ''}
              </p>

              <p className='text-xs py-2 font-medium'>
                Joined In {userData._createdAt.split('T')[0]}
              </p>
            </div>
          )}

          <nav className='sticky top-0 px-2 w-full md:px-5 py-3 mb-8 text-gray-700 border border-gray-200 rounded-lg bg-gray-50 mt-7'>
            <ol
              className={`${
                currentNav === 'rents' ? 'text-primary_dark' : 'text-gray-700'
              } inline-flex mr-1 md:mr-5 items-center space-x-1 md:space-x-3`}
            >
              <li
                onClick={() => setCurrentNav('rents')}
                className='inline-flex items-center cursor-pointer'
              >
                <BsJournalBookmarkFill />
                <a className='inline-flex items-center mx-1 md:mx-3 text-xs md:text-sm font-medium'>
                  Current rented rooms
                </a>
              </li>
            </ol>
            <ol
              className={`${
                currentNav === 'amount' ? 'text-primary_dark' : 'text-gray-700'
              } inline-flex mr-1 md:mr-5 items-center space-x-1 md:space-x-3`}
            >
              <li
                onClick={() => setCurrentNav('amount')}
                className='inline-flex items-center cursor-pointer'
              >
                <GiMoneyStack />
                <a className='inline-flex items-center mx-1 md:mx-3 text-xs md:text-sm font-medium'>
                  Amount Spent
                </a>
              </li>
            </ol>
            <ol
              className={`${
                currentNav === 'requests' ? 'text-primary_dark' : 'text-gray-700'
              } inline-flex mr-1 md:mr-5 items-center space-x-1 md:space-x-3`}
            >
              <li
                onClick={() => setCurrentNav('requests')}
                className='inline-flex items-center cursor-pointer'
              >
                <MdOutlineReportProblem />
                <a className='inline-flex items-center mx-1 md:mx-3 text-xs md:text-sm font-medium'>
                  Issues
                </a>
              </li>
            </ol>
          </nav>

          {currentNav === 'rents' ? (
            userRents && (
              <Table
                rentDetails={userRents}
                setRoomId={setRoomId}
              />
            )
          ) : currentNav === 'amount' ? (
            userRents && <Chart userRents={userRents} />
          ) : currentNav === 'requests' ? (
            <RequestTable maintenanceDetails={userMaintenanceRequests} setMaintenanceRequestId={function (value: SetStateAction<string | null>): void {
                  throw new Error('Function not implemented.');
                } } ticketDetails={userTickets} setTicketId={function (value: SetStateAction<string | null>): void {
                  throw new Error('Function not implemented.');
                } } /> 
          ) : (
            <></>
          )}
        </div>
      </div>
    </div>
  );
};

export default UserDetails;
