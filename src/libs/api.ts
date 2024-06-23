import { CreateRentDTO, Room } from "@/models/room";
import { Rent } from '@/models/rent';
import sanityClient from "./sanity";
import * as queries from "./sanityQueries";
import axios from 'axios';
import { CreateTicketDTO, Ticket, UpdateTicketDTO } from "@/models/ticket";
import { MaintenanceRequest, CreateMaintenanceRequestDTO, UpdateMaintenanceRequestDTO } from '@/models/maintenance';

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

export async function checkTicketExists(userId: string): Promise<null | { _id: string }> {
  console.log('[API] Checking if open ticket exists for user:', userId);
  const query = `*[_type == 'ticket' && user._ref == $userId && status == 'open'][0] {
    _id
  }`;

  const params = {
    userId,
  };

  const result = await sanityClient.fetch(query, params);
  console.log('[API] Check open ticket exists result:', result);
  return null; // Always return null to force the creation of a new ticket
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

  console.log('[API] Updating ticket with mutation:', JSON.stringify(mutation, null, 2));
  try {
    const { data } = await axios.post(
      `https://${process.env.NEXT_PUBLIC_SANITY_PROJECT_ID}.api.sanity.io/v2021-10-21/data/mutate/${process.env.NEXT_PUBLIC_SANITY_DATASET}`,
      mutation,
      { headers: { Authorization: `Bearer ${process.env.SANITY_TOKEN}` } }
    );
    console.log('[API] Ticket updated:', data);
    return data;
  } catch (error: any) {
    console.error('[API] Error updating ticket:', error.response?.data || error.message);
    throw error;
  }
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

  console.log('[API] Creating ticket with mutation:', JSON.stringify(mutation, null, 2));
  try {
    const { data } = await axios.post(
      `https://${process.env.NEXT_PUBLIC_SANITY_PROJECT_ID}.api.sanity.io/v2021-10-21/data/mutate/${process.env.NEXT_PUBLIC_SANITY_DATASET}`,
      mutation,
      { headers: { Authorization: `Bearer ${process.env.SANITY_TOKEN}` } }
    );
    console.log('[API] Ticket created:', data);
    return data;
  } catch (error: any) {
    console.error('[API] Error creating ticket:', error.response?.data || error.message);
    throw error;
  }
};

export async function getTickets() {
  const result = await sanityClient.fetch<Ticket[]>(
    queries.getTicketsQuery, 
    {}, 
    { cache: 'no-cache' }
  );
  console.log('API fetched tickets:', JSON.stringify(result, null, 2));
  return result;
}

export async function getTicket(userId: string, ticketId: string) {
  const result = await sanityClient.fetch<Ticket>(
    queries.getTicket, 
    { userId, ticketId },
    { cache: 'no-cache' }
  );
  return result;
}

export async function getUserTickets(userId: string) {
  const result = await sanityClient.fetch<Ticket[]>(
    queries.getUserTicketsQuery,
    {
      userId,
    },
    { cache: 'no-cache' }
  );

  return result;
}


export const updateTicketMessage = async (ticketId: string, { message, status }: { message: string, status: string }) => {
  const mutation = {
    mutations: [
      {
        patch: {
          id: ticketId,
          set: {
            message,
            status,
            updatedAt: new Date().toISOString(),
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

export async function checkMaintenanceExists(
  userId: string,
): Promise<null | { _id: string }> {
  console.log('[API] Checking if maintenance request exists for user:', userId);
  const query = `*[_type == 'maintenance' && user._ref == $userId][0] {
    _id
  }`;

  const params = {
    userId,
  };

  const result = await sanityClient.fetch(query, params);
  console.log('[API] Check maintenance request exists result:', result);
  return null;
}

export const updateMaintenanceRequest = async ({
  maintenanceId,
  maintenanceStatus,
}: UpdateMaintenanceRequestDTO) => {
  const mutation = {
    mutations: [
      {
        patch: {
          id: maintenanceId,
          set: {
            status: maintenanceStatus,
            updatedAt: new Date().toISOString(),
          },
        },
      },
    ],
  };
  
  console.log('[API] Updating maintenance request with mutation:', JSON.stringify(mutation, null, 2));
  try {
    const { data } = await axios.post(
      `https://${process.env.NEXT_PUBLIC_SANITY_PROJECT_ID}.api.sanity.io/v2021-10-21/data/mutate/${process.env.NEXT_PUBLIC_SANITY_DATASET}`,
      mutation,
      { headers: { Authorization: `Bearer ${process.env.SANITY_TOKEN}` } }
    );
    console.log('[API] Maintenance request updated:', data);
    return data;
  } catch (error: any) {
    console.error('[API] Error updating maintenance request:', error.response?.data || error.message);
    throw error;
  }
};

export const createMaintenanceRequest = async ({
  maintenanceDate,
  maintenanceReason,
  userId,
  rentId,
}: CreateMaintenanceRequestDTO) => {
  const mutation = {
    mutations: [
      {
        create: {
          _type: 'maintenance',
          scheduledDate: maintenanceDate,
          user: {
            _type: 'reference',
            _ref: userId,
          },
          rent: {
            _type: 'reference',
            _ref: rentId,
          },
          reason: maintenanceReason,
          status: 'open',
          updatedAt: new Date().toISOString(),
        },
      },
    ],
  };

  console.log('[API] Creating maintenance request with mutation:', JSON.stringify(mutation, null, 2));
  try {
    const { data } = await axios.post(
      `https://${process.env.NEXT_PUBLIC_SANITY_PROJECT_ID}.api.sanity.io/v2021-10-21/data/mutate/${process.env.NEXT_PUBLIC_SANITY_DATASET}`,
      mutation,
      { headers: { Authorization: `Bearer ${process.env.SANITY_TOKEN}` } }
    );
    console.log('[API] Maintenance request created:', data);
    return data;
  } catch (error: any) {
    console.error('[API] Error creating maintenance request:', error.response?.data || error.message);
    throw error;
  }
};

export async function getMaintenanceRequest(userId: string) {
  const result = await sanityClient.fetch<MaintenanceRequest>(
    queries.getMaintenanceRequestQuery,
    {
      userId,
    },
    { cache: 'no-cache' }
  );

  return result;
};

export async function getMaintenanceRequests() {
  const result = await sanityClient.fetch<MaintenanceRequest[]>(
    queries.getMaintenanceRequestsQuery,
    {},
    { cache: 'no-cache' }
  );

  return result;
};

export async function getUserMaintenanceRequests(userId: string) {
  const result = await sanityClient.fetch<MaintenanceRequest[]>(
    queries.getUserMaintenanceRequestsQuery,
    {
      userId,
    },
    { cache: 'no-cache' }
  );

  return result;
};

export async function getMaintenanceRequestById(maintenanceId: string) {
  const result = await sanityClient.fetch<MaintenanceRequest[]>(
    queries.getMaintenanceRequestByIdQuery,
    {
      maintenanceId,
    },
    { cache: 'no-cache' }
  );

  return result;
};


