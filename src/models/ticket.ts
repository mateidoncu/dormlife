export type UpdateTicketDTO = {
    ticketId: string;
    ticketMessage: string;
  };
  
  export type CreateTicketDTO = {
    ticketMessage: string;
    ticketTitle: string;
    userId: string;
  };
  
  export type Ticket = {
    status: string;
    updatedAt: Date;
    message: string;
    title: string;
    user: { name: string };
    _createdAt: Date;
    _id: string;
  };