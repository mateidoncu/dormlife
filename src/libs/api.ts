import { CreateRentDTO, Room } from "@/models/room";
import { Rent } from '@/models/rent';
import sanityClient from "./sanity";
import * as queries from "./sanityQueries";
import axios from 'axios';
import { CreateTicketDTO, Ticket, UpdateTicketDTO } from "@/models/ticket";

export async function getRooms() {
    const result = await sanityClient.fetch<Room[]>(
        queries.getRoomsQuery,
        {},
        { cache: 'no-cache' }
    );
    return result;
}

export async function getRoom(slug: string){
    const result = await sanityClient.fetch<Room>(
        queries.getRoom, 
        {slug},
        { cache: 'no-cache' }
    );
    return result;
}

export const createRentContract = async ({
    people,
    contractStartDate,
    contractEndDate,
    dormRoom,
    numberOfMonths,
    price,
    user,
}: CreateRentDTO) => {
    const mutation = {
        mutations: [
            { 
                create: { 
                    _type: "rent", 
                    user: { _type: "reference", _ref: user }, 
                    dormRoom: { _type: "reference", _ref: dormRoom },
                    contractStartDate,
                    contractEndDate,
                    numberOfMonths,
                    people,
                    price,
                }, 
            },
        ],
    }

    const { data } = await axios.post(`https://${process.env.NEXT_PUBLIC_SANITY_PROJECT_ID}.api.sanity.io/v2021-10-21/data/mutate/${process.env.NEXT_PUBLIC_SANITY_DATASET}`, 
        mutation,
        { headers: {Authorization: `Bearer ${process.env.SANITY_TOKEN}` } } 
    );

    return data;
};

export const updateDormRoom = async (dormRoomId: string) => {
  const mutation = {
    mutations: [
      {
        patch: {
          id: dormRoomId,
          set: {
            isOccupied: true,
          },
        },
      },
    ],
  };

  const { data } = await axios.post(
    `https://${process.env.NEXT_PUBLIC_SANITY_PROJECT_ID}.api.sanity.io/v2021-10-21/data/mutate/${process.env.NEXT_PUBLIC_SANITY_DATASET}`,
    mutation,
    { headers: { Authorization: `Bearer ${process.env.SANITY_TOKEN}` } }
  );

  return data;
};

export async function getUserRents(userId: string) {
  const result = await sanityClient.fetch<Rent[]>(
    queries.getUserRentsQuery,
    {
      userId,
    },
    { cache: 'no-cache' }
  );

  return result;
}

export async function getUserData(userId: string) {
  const result = await sanityClient.fetch(
    queries.getUserDataQuery,
    { userId },
    { cache: 'no-cache' }
  );

  return result;
}

export async function checkTicketExists(
  userId: string,
): Promise<null | { _id: string }> {
  const query = `*[_type == 'ticket' && user._ref == $userId][0] {
    _id
  }`;

  const params = {
    userId,
  };

  const result = await sanityClient.fetch(query, params);

  return result ? result : null;
}

export const updateTicket = async ({
  ticketId,
  ticketMessage,
}: UpdateTicketDTO) => {
  const mutation = {
    mutations: [
      {
        patch: {
          id: ticketId,
          set: {
            message: ticketMessage,
            status: 'in-progress',
            updatedAt: new Date().toISOString(),
          },
        },
      },
    ],
  };

  const { data } = await axios.post(
    `https://${process.env.NEXT_PUBLIC_SANITY_PROJECT_ID}.api.sanity.io/v2021-10-21/data/mutate/${process.env.NEXT_PUBLIC_SANITY_DATASET}`,
    mutation,
    { headers: { Authorization: `Bearer ${process.env.NEXT_PUBLIC_SANITY_TOKEN}` } }
  );

  return data;
};

export const createTicket = async ({
  ticketMessage,
  ticketTitle,
  userId,
}: CreateTicketDTO) => {
  const mutation = {
    mutations: [
      {
        create: {
          _type: 'ticket',
          title: ticketTitle,
          user: {
            _type: 'reference',
            _ref: userId,
          },
          message: ticketMessage,
          status: 'open',
          updatedAt: new Date().toISOString(),
        },
      },
    ],
  };

  const { data } = await axios.post(
    `https://${process.env.NEXT_PUBLIC_SANITY_PROJECT_ID}.api.sanity.io/v2021-10-21/data/mutate/${process.env.NEXT_PUBLIC_SANITY_DATASET}`,
    mutation,
    { headers: { Authorization: `Bearer ${process.env.NEXT_PUBLIC_SANITY_TOKEN}` } }
  );

  return data;
};

export async function getTickets(userId: string) {
  const result = await sanityClient.fetch<Ticket[]>(
    queries.getTicketsQuery,
    {
      userId,
    },
    { cache: 'no-cache' }
  );

  return result;
}