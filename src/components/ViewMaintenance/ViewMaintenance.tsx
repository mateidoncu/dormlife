import { FC, useEffect, useState } from 'react';
import { MaintenanceRequest } from '@/models/maintenance';

type ViewMaintenanceRequestsProps = {
  maintenanceRequests: MaintenanceRequest[];
  error: any;
};


const ViewMaintenanceRequests: FC<ViewMaintenanceRequestsProps> = ({ maintenanceRequests, error }) => {
  if (error) return <div>Failed to load maintenance requests</div>;

  return (
    <div>
      <h1>All Maintenance Requests</h1>
      <ul>
        {maintenanceRequests.map(maintenanceRequest => (
          <li key={maintenanceRequest._id}>
            <h2>{maintenanceRequest.reason}</h2>
            <p>Status: {maintenanceRequest.status}</p>
            {/* <textarea onChange={(e) => setResponse(e.target.value)} />
            <button onClick={() => handleResponse(request._id, response)}>Respond</button> */}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ViewMaintenanceRequests;
