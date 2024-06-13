'use client';

import { getRooms } from "@/libs/api";
import { Room } from "@/models/room";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import useSWR from "swr";
import Search from "@/components/Search/Search";
import RoomCard from "@/components/RoomCard/RoomCard";

const Rooms = () => {

    const [roomTypeFilter, setRoomTypeFilter] = useState('');
    const [searchQuery, setSearchQuery] = useState('');
    const searchParams = useSearchParams();
    
    useEffect(() => {
        const searchQuery = searchParams.get('searchQuery');
        const roomType = searchParams.get('roomType');

        if (roomType) setRoomTypeFilter(roomType);
        if (searchQuery) setSearchQuery(searchQuery);
    }, []);

    async function fetchData() {
        return getRooms();
    }
    const {data, error, isLoading} = useSWR("get/dormRooms", fetchData);

    if(error) throw new Error("Can't fetch data");
    if(typeof data === "undefined" && !isLoading)
        throw new Error("Can't fetch data");

    const filterRooms = (rooms: Room[]) => {
        return rooms.filter(room => {
            //apply room type filter
            if(roomTypeFilter && roomTypeFilter.toLowerCase() !== "all" && room.type.toLowerCase() !== roomTypeFilter.toLowerCase()){
                return false;
            }

            //apply search query filter
            if(searchQuery && !room.name.toLowerCase().includes(searchQuery.toLowerCase())) {
                return false;
            }

            return true;
        });
    };

    const filteredRooms = filterRooms(data || []);

    return (
        <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8 pt-10">
            <Search 
                roomTypeFilter={roomTypeFilter}
                searchQuery={searchQuery}
                setRoomTypeFilter={setRoomTypeFilter}
                setSearchQuery={setSearchQuery}
            />

            <div className="flex mt-20 justify-between flex-wrap">
                {filteredRooms.map(room => (
                    <RoomCard key={room._id} room={room}/>
                ))}
            </div>
        </div>
    )
}

export default Rooms;