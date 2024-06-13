'use client';

import { getRoom } from "@/libs/api";
import useSWR from "swr";
import LoadingSpinner from "../../loading";
import RoomGallery from "@/components/RoomGallery/RoomGallery";
import { GiSmokeBomb } from "react-icons/gi";
import { AiOutlineMedicineBox } from "react-icons/ai";
import { LiaFireExtinguisherSolid } from "react-icons/lia";
import { MdOutlineCleaningServices } from "react-icons/md";
import toast from "react-hot-toast";
import { useState } from "react";
import RentRoom from "@/components/RentRoom/RentRoom";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { getStripe } from "@/libs/stripe";

const RoomPage = (props: {params: {slug: string} }) => {

    const { data: session } = useSession();
    const router = useRouter();

    const {
        params: {slug},
    } = props;

    const [contractStartDate, setContractStartDate] = useState<Date | null>(null);
    const [contractEndDate, setContractEndDate] = useState<Date | null>(null);
    const [people, setPeople] = useState(1);

    const fetchRoom = async () => getRoom(slug);

    const {data: room, error, isLoading} =  useSWR("/api/room", fetchRoom);

    if(error) throw new Error("Can't fetch data");
    if(typeof room === "undefined" && !isLoading)
        throw new Error("Can't fetch data");

    if (!room) return <LoadingSpinner />;

    const calcMinRentDate = () => {
        if (contractStartDate) {
          const nextDay = new Date(contractStartDate);
          nextDay.setDate(nextDay.getDate() + 1);
          return nextDay;
        }
        return null;
    };
    
    const handleRentClick = async () => {
        if (!contractStartDate || !contractEndDate)
          return toast.error('Please provide contract start / end date');
    
        if (contractStartDate > contractEndDate)
          return toast.error('Please choose a valid contract period');
    
        const numberOfMonths = calcNumMonths();
    
        const dormRoomSlug = room.slug.current;

        const stripe = await getStripe();

        try {
            const { data: stripeSession } = await axios.post('/api/stripe', {
                contractStartDate,
                contractEndDate,
                people,
                numberOfMonths,
                dormRoomSlug,
            });

            if (stripe) {
                const result = await stripe.redirectToCheckout({
                sessionId: stripeSession.id,
                });

                if (result.error) {
                toast.error('Payment Failed');
                }
            }
        } catch (error) {
            console.log('Error: ', error);
            toast.error('An error occured');
        }
    };

    const handleRentClickNotLoggedIn = async () => {
        if (!session) {
            toast.error("Please login firstly");
            setTimeout(() => router.push('/login'), 2000);
            return;
        }
    };

    const calcNumMonths = () => {
        if (!contractStartDate || !contractEndDate) return;
    
        const startDate = new Date(contractStartDate);
        const endDate = new Date(contractEndDate);
    
        let numberOfMonths = (endDate.getFullYear() - startDate.getFullYear()) * 12;
        numberOfMonths -= startDate.getMonth();
        numberOfMonths += endDate.getMonth();
    
        // Adjust the calculation if the day of the end date is earlier than the day of the start date
        if (endDate.getDate() < startDate.getDate()) {
            numberOfMonths--;
        }
    
        return numberOfMonths;    
    };

    return (
        <div>
            <RoomGallery photos={room.images} />
        
            <div className='container mx-auto mt-20'>
                <div className='md:grid md:grid-cols-12 gap-10 px-3'>
                    <div className='md:col-span-8 md:w-full'>
                        <div>
                        <h2 className='font-bold text-left text-lg md:text-2xl'>
                            {room.name} ({room.dimension})
                        </h2>
                        <div className='flex my-11'>
                            {room.offeredAmenities.map(amenity => (
                            <div
                                key={amenity._key}
                                className='md:w-44 w-fit text-center px-2 md:px-0 h-20 md:h-40 mr-3 bg-[#eff0f2] dark:bg-gray-800 rounded-lg grid place-content-center'
                            >
                                <i className={`fa-solid ${amenity.icon} md:text-2xl`}></i>
                                <p className='text-xs md:text-base pt-3'>
                                {amenity.amenity}
                                </p>
                            </div>
                            ))}
                        </div>
                        <div className='mb-11'>
                            <h2 className='font-bold text-3xl mb-2'>Description</h2>
                            <p>{room.description}</p>
                        </div>
                        <div className='mb-11'>
                            <h2 className='font-bold text-3xl mb-2'>Offered Amenities</h2>
                            <div className='grid grid-cols-2'>
                            {room.offeredAmenities.map(amenity => (
                                <div
                                key={amenity._key}
                                className='flex items-center md:my-0 my-1'
                                >
                                <i className={`fa-solid ${amenity.icon}`}></i>
                                <p className='text-xs md:text-base ml-2'>
                                    {amenity.amenity}
                                </p>
                                </div>
                            ))}
                            </div>
                        </div>
                        <div className='mb-11'>
                            <h2 className='font-bold text-3xl mb-2'>Safety And Hygiene</h2>
                            <div className='grid grid-cols-2'>
                            <div className='flex items-center my-1 md:my-0'>
                                <MdOutlineCleaningServices />
                                <p className='ml-2 md:text-base text-xs'>Daily Cleaning</p>
                            </div>
                            <div className='flex items-center my-1 md:my-0'>
                                <LiaFireExtinguisherSolid />
                                <p className='ml-2 md:text-base text-xs'>
                                Fire Extinguishers
                                </p>
                            </div>
                            <div className='flex items-center my-1 md:my-0'>
                                <AiOutlineMedicineBox />
                                <p className='ml-2 md:text-base text-xs'>
                                Disinfections and Sterilizations
                                </p>
                            </div>
                            <div className='flex items-center my-1 md:my-0'>
                                <GiSmokeBomb />
                                <p className='ml-2 md:text-base text-xs'>Smoke Detectors</p>
                            </div>
                            </div>
                        </div>
            
                        </div>
                    </div>
            
                    <div className='md:col-span-4 rounded-xl shadow-lg dark:shadow dark:shadow-white sticky top-10 h-fit overflow-auto'>
                        <RentRoom
                        price={room.price}
                        contractStartDate={contractStartDate}
                        setContractStartDate={setContractStartDate}
                        contractEndDate={contractEndDate}
                        setContractEndDate={setContractEndDate}
                        calcMinRentDate={calcMinRentDate}
                        people={people}
                        setPeople={setPeople}
                        isOccupied={room.isOccupied}
                        handleRentClick={handleRentClick}
                        handleRentClickNotLoggedIn={handleRentClickNotLoggedIn}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default RoomPage;