import { groq } from "next-sanity";

export const getRoomsQuery = groq`*[_type == "dormRoom"] {
    _id,
    coverImage,
    description,
    dimension,
    isOccupied,
    name,
    price,
    slug,
    type
}`;

export const getRoom = groq`*[_type == "dormRoom" && slug.current == $slug][0] {
    _id,
    coverImage,
    description,
    dimension,
    isOccupied,
    images,
    numberOfBeds,
    offeredAmenities,
    name,
    price,
    slug,
    type
}`;

export const getUserRentsQuery = groq`*[_type == 'rent' && user._ref == $userId] {
    _id,
    dormRoom -> {
        _id,
        name,
        slug,
        price
    },
    contractStartDate,
    contractEndDate,
    numberOfMonths,
    people,
    price
}`;

export const getUserDataQuery = groq`*[_type == 'user' && _id == $userId][0] {
    _id,
    name,
    email,
    isAdmin,
    about,
    _createdAt,
    faculty,
    yearOfStudy,
}`;

export const getTicket = groq`*[_type == "ticket" && _id == $ticketId][0] {
    _createdAt,
    _id,
    title,
    message,
    status,
    updatedAt,
    user -> {
      name
    },
}`;

export const getTicketsQuery = groq`*[_type == "ticket"] {
    _createdAt,
    _id,
    title,
    message,
    status,
    updatedAt,
    user -> {
      name
    },
}`;

export const getUserTicketsQuery = groq`*[_type == "ticket" && user._ref == $userId] {
    _createdAt,
    _id,
    title,
    message,
    status,
    updatedAt,
    user -> {
      name
    },
}`;

export const getMaintenanceRequestQuery = groq`*[_type == "maintenance" && user._ref == $userId && rent._ref == $rentId] {
    _createdAt,
    _id,
    reason,
    scheduledDate,
    status,
    updatedAt,
    user -> {
      name
    },
    rent -> {
      _id,
    },
}`;

export const getMaintenanceRequestsQuery = groq`*[_type == "maintenance"] {
    _createdAt,
    _id,
    reason,
    scheduledDate,
    status,
    updatedAt,
    user -> {
      name
    },
    rent -> {
      _id,
    },
}`;

export const getUserMaintenanceRequestsQuery = groq`*[_type == "maintenance" && user._ref == $userId] {
    _createdAt,
    _id,
    reason,
    scheduledDate,
    status,
    updatedAt,
    user -> {
      name
    },
    rent -> {
      _id,
    },
}`;

export const getMaintenanceRequestByIdQuery = groq`*[_type == "maintenance" && _id == $maintenanceId][0] {
  _createdAt,
  _id,
  reason,
  scheduledDate,
  status,
  updatedAt,
  user -> {
    name
  },
  rent -> {
    _id,
  },
}`;
