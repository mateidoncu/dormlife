import { FC } from 'react';
import { Ticket } from '@/models/ticket';

type ListTicketsProps = {
  tickets: Ticket[];
  error: any;
};

const ListTickets: FC<ListTicketsProps> = ({ tickets, error }) => {
  if (error) return <div>Failed to load tickets</div>;

  return (
    <ul role="list" className="divide-y divide-gray-100">
      {tickets &&
        tickets.map(ticket => (
          <li key={ticket._id} className="flex justify-between gap-x-6 py-5">
            <div className="flex min-w-0 gap-x-4">
              <div className="min-w-0 flex-auto">
                <p className="text-sm font-semibold leading-6 text-gray-900">{ticket.title}</p>
                <p className="mt-1 truncate text-xs leading-5 text-gray-500">{ticket.user.name}</p>
              </div>
            </div>
            <div className="hidden shrink-0 sm:flex sm:flex-col sm:items-end">
              <p className="text-sm leading-6 text-gray-900">{ticket.status}</p>
              <p className="mt-1 text-xs leading-5 text-gray-500">{new Date(ticket.updatedAt).toLocaleDateString()}</p>
            </div>
          </li>
        ))}
    </ul>
  );
};

export default ListTickets;