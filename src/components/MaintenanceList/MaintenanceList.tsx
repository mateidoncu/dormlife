import { useRouter } from 'next/navigation';
import useSWR from 'swr';
import { getMaintenanceRequests } from '@/libs/api';
import { MaintenanceRequest } from '@/models/maintenance';

const MaintenanceList = () => {
  
  const router = useRouter();

  async function fetchMaintenanceRequests() {
    return getMaintenanceRequests();
  }

  const { data: maintenanceRequests, error, isLoading } = useSWR('/api/maintenance', fetchMaintenanceRequests);
  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Failed to load maintenance requests</div>;

  const formatDate = (date: Date) => {
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');

    return `${day}-${month}-${year}@${hours}:${minutes}`;
  };

  return (
    <ul role="list" className="divide-y divide-gray-100">
      {maintenanceRequests &&
        maintenanceRequests.map(maintenanceRequest => (
          <li key={maintenanceRequest._id} className="flex justify-between gap-x-6 py-5">
            <div className="flex min-w-0 gap-x-4">
              <div className="min-w-0 flex-auto">
                <p className="text-sm font-semibold leading-6 text-primary_dark hover:underline cursor-pointer" onClick={() => router.push(`/maintenance/${maintenanceRequest._id}`)}>Maintenance request</p>
                <p className="mt-1 truncate text-xs leading-5 text-gray-500">{maintenanceRequest.user?.name || 'Unknown User'}</p>
              </div>
            </div>
            <div className="hidden shrink-0 sm:flex sm:flex-col sm:items-end">
              <p className="text-sm leading-6 text-gray-900">{maintenanceRequest.status}</p>
              <p className="mt-1 text-xs leading-5 text-gray-500">Schedule: {formatDate(new Date(maintenanceRequest.scheduledDate))}</p>
            </div>
          </li>
        ))}
    </ul>
  );
};

export default MaintenanceList;
