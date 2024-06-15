import { FC, useEffect, useState } from 'react';
import { MaintenanceRequest } from '@/models/maintenance';
import { getMaintenanceRequests, respondToMaintenanceRequest } from '@/libs/api';
import { useSession } from 'next-auth/react';

const ViewMaintenanceRequests: FC = () => {
  const [requests, setRequests] = useState<MaintenanceRequest[]>([]);
  const [response, setResponse] = useState<string>('');
  const { data: session } = useSession();

  useEffect(() => {
    const fetchRequests = async () => {
      const fetchedRequests = await getMaintenanceRequests();
      setRequests(fetchedRequests);
    };
    fetchRequests();
  }, []);

  const handleResponse = async (requestId: string, response: string) => {
    await respondToMaintenanceRequest(requestId, response);
    const updatedRequests = requests.map(request => request._id === requestId ? { ...request, response } : request);
    setRequests(updatedRequests);
  };

  return (
    <div>
      <h1>All Maintenance Requests</h1>
      <ul>
        {requests.map(request => (
          <li key={request._id}>
            <h2>{request.reason}</h2>
            <p>Status: {request.status}</p>
            <textarea onChange={(e) => setResponse(e.target.value)} />
            <button onClick={() => handleResponse(request._id, response)}>Respond</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ViewMaintenanceRequests;
