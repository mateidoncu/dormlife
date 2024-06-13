'use client';

import { useRouter } from 'next/navigation';
import { ChangeEvent, FC } from 'react';

type Props = {
  roomTypeFilter: string;
  searchQuery: string;
  setRoomTypeFilter: (value: string) => void;
  setSearchQuery: (value: string) => void;
};

const Search: FC<Props> = ({
  roomTypeFilter,
  searchQuery,
  setRoomTypeFilter,
  setSearchQuery,
}) => {
  const router = useRouter();

  const handleRoomTypeChange = (event: ChangeEvent<HTMLSelectElement>) => {
    setRoomTypeFilter(event.target.value);
  };

  const handleSearchQueryChange = (event: ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
  };

  const handleFilterClick = () => {
    router.push(`/rooms?roomType=${roomTypeFilter}&searchQuery=${searchQuery}`);
  };

  return (
    <section className="w-full px-4 py-6 sm:px-6 lg:px-8 bg-primary rounded-lg">
      <div className="container mx-auto flex gap-4 flex-wrap justify-between items-center">
        <div className="w-full md:1/3 lg:w-auto mb-4 md:mb-0">
          <label className='block text-sm font-medium leading-6 text-gray-900'>
              Room Type
            </label>
            <div className='relative'>
              <select
                value={roomTypeFilter}
                onChange={handleRoomTypeChange}
                className='relative w-full cursor-default rounded-md bg-white py-1.5 pl-3 pr-10 text-left text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:outline-none focus:ring-2 focus:ring-primary_dark sm:text-sm sm:leading-6'
              >
                <option value='All'>All</option>
                <option value='Small'>Small</option>
                <option value='Medium'>Medium</option>
                <option value='Large'>Large</option>
              </select>
            </div>
          </div>

        <div className="classname w-full md:1/3 lg:w-auto mb-4 md:mb-0">
          <label className="block text-sm font-medium leading-6 text-gray-900">Search</label>
          <input 
            type="search" 
            id="search" 
            placeholder="Search..."
            className="w-full rounded-md py-1.5 pl-3 pr-10 text-left text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:outline-none focus:ring-2 focus:ring-primary_dark sm:text-sm sm:leading-6"
            value={searchQuery}
            onChange={handleSearchQueryChange}
          />
        </div>

        <div className="classname w-full md:1/3 lg:w-auto mb-4 md:mb-0">
          <button 
            className="w-full rounded-md py-1.5 pl-3 pr-10 bg-primary_dark text-sm font-semibold leading-6 text-white shadow-sm hover:bg-primary_light hover:text-black focus-visible:outline-primary text-center"
            type="button"
            onClick={handleFilterClick}
          >
          Search
          </button>
        </div>
      </div>
    </section>
  )
}

export default Search