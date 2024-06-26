import { Room } from "@/models/room";
import { FC } from "react"
import Image from "next/image";
import Link from "next/link";

type Props = {
    room: Room;
}

const RoomCard: FC<Props> = props => {
    const {
        room: {coverImage, name, type, price, description, slug, isOccupied},
    } = props;
    
    return (
        <div className="rounded-xl w-72 mb-10 mx-auto md:mx-0 overflow-hidden text-black">
            <div className="h-60 relative overflow-hidden">
                <Image 
                    src={coverImage.url} 
                    alt={name} 
                    layout="fill" 
                    objectFit="cover"
                    className="hover:scale-125 transition duration-500 cursor-pointer rounded-xl" 
                />
            </div>
            
            <div className="p-3 bg-white">
                <div className="flex justify-between text-xl font-semibold">
                    <p>{name}</p>
                    <p>{price} RON</p>
                </div>

                <p className="pt-2 text-xs">{type} Size</p>
                <p className="pt-3 pb-6">{description.slice(0, 100)}...</p>

                <Link href={`/rooms/${slug.current}`} className="bg-primary_dark inline-block text-center w-full py-4 rounded-xl text-white text-xl font-bold hover:-translate-y-2 hover:shadow-lg transition-all duration-500">
                    {isOccupied ? 'Occupied' : 'Available for rent'}
                </Link>
            </div>
        </div>
    );
};

export default RoomCard;
