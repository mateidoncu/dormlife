"use client";

import { useSession } from 'next-auth/react';
import { Dispatch, FC, SetStateAction } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

type Props = {
    contractStartDate: Date | null;
    setContractStartDate: Dispatch<SetStateAction<Date | null>>;
    contractEndDate: Date | null;
    setContractEndDate: Dispatch<SetStateAction<Date | null>>;
    setPeople: Dispatch<SetStateAction<number>>;
    calcMinRentDate: () => Date | null;
    price: number;
    people: number;
    isOccupied: boolean;
    handleRentClick: () => void;
    handleRentClickNotLoggedIn: () => void;
};

const RentRoom: FC<Props> = props => {

    const { data: session } = useSession();

    const {
        price, 
        contractStartDate, 
        setContractStartDate, 
        contractEndDate, 
        setContractEndDate, 
        calcMinRentDate, 
        setPeople, 
        people, 
        isOccupied, 
        handleRentClick,
        handleRentClickNotLoggedIn,
    } = props;

    const calcNoOfDays = () => {
        if (!contractStartDate || !contractEndDate) return 0;
        const timeDiff = contractEndDate.getTime() - contractStartDate.getTime();
        const noOfDays = Math.ceil(timeDiff / (24 * 60 * 60 * 1000));
        return noOfDays;
    };

    return (
        <div className='px-7 py-6'>
        <h3>
          <span
            className={`font-bold text-xl`}
          >
            {price} RON
          </span>
        </h3>
  
        <div className='w-full border-b-2 border-b-primary_dark my-2' />

        <h4 className='mt-8 mb-2 font-bold'>Dormitory rules and regulations</h4>
        <ul className='mb-8'>
            <li>Quiet Hours: 10 PM-8 AM weekdays, 12 AM-10 AM weekends</li>
            <li>No guests allowed</li>
            <li>Keep personal and common areas clean</li>
            <li>Alcohol and drugs are strictly banned</li>
            <li>Smoking inside dorm rooms is prohibited</li>
            <li>Inform management promptly for any damage</li>
        </ul>
    
        <div className='flex'>
          <div className='w-1/2 pr-2'>
            <label
              htmlFor='contract-start-date'
              className='block text-sm font-medium text-gray-900 dark:text-gray-400'
            >
              Contract Start Date
            </label>
            <DatePicker
              selected={contractStartDate}
              onChange={date => setContractStartDate(date)}
              dateFormat='dd/MM/yyyy'
              minDate={new Date()}
              id='contract-start-date'
              className='w-full border text-black border-gray-300 rounded-lg p-2.5 focus:ring-primary_dark focus:border-primary_dark'
            />
          </div>
          <div className='w-1/2 pl-2'>
            <label
              htmlFor='contract-end-date'
              className='block text-sm font-medium text-gray-900 dark:text-gray-400'
            >
              Contract End Date
            </label>
            <DatePicker
              selected={contractEndDate}
              onChange={date => setContractEndDate(date)}
              dateFormat='dd/MM/yyyy'
              disabled={!contractStartDate}
              minDate={calcMinRentDate()}
              id='contract-end-date'
              className='w-full border text-black border-gray-300 rounded-lg p-2.5 focus:ring-primary_dark focus:border-primary_dark'
            />
          </div>
        </div>
  
        <div className='flex mt-4'>
          <div className='w-1/2 pr-2'>
            <label
              htmlFor='people'
              className='block text-sm font-medium text-gray-900 dark:text-gray-400'
            >
              People
            </label>
            <input
              type='number'
              id='people'
              value={people}
              onChange={e => setPeople(+e.target.value)}
              min={1}
              max={4}
              className='w-full border border-gray-300 rounded-lg p-2.5 focus:ring-primary_dark focus:border-primary_dark'
            />
          </div>
          <div className="w-1/2 pl-2">
            {session?.user ? (
                <button
                disabled={isOccupied}
                onClick={handleRentClick}
                className='bg-primary_dark inline-block text-center w-full mt-4 p-2.5 rounded-xl text-white text-xl font-bold duration-500 hover:bg-primary disabled:bg-gray-500 disabled:cursor-not-allowed'
                >
                {isOccupied ? 'Occupied' : 'Available for rent'}
                </button>
            ):(
                <button
                disabled={isOccupied}
                onClick={handleRentClickNotLoggedIn}
                className='bg-primary_dark inline-block text-center w-full mt-4 p-2.5 rounded-xl text-white text-xl font-bold duration-500 hover:bg-primary disabled:bg-gray-500 disabled:cursor-not-allowed'
                >
                {isOccupied ? 'Occupied' : 'Available for rent'}
                </button>    
            )}
          </div>
        </div>
  
        {calcNoOfDays() > 0 ? (
          <p className='mt-3'>Price: {price} RON</p>
        ) : (
          <></>
        )}
  
      </div>
    );
};

export default RentRoom;