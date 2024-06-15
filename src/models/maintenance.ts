// models/maintenance.ts
export type MaintenanceRequest = {
    _id: string;
    rent: { _id: string };
    reason: string;
    createdAt: string;
    updatedAt: string;
    status: 'pending' | 'in-progress' | 'completed';
    user: { name: string };
  };
  
  export type CreateMaintenanceRequestDTO = {
    reason: string;
    rentId: string;
    userId: string;
  };
  
  export type UpdateMaintenanceRequestDTO = {
    requestId: string;
    reason: string;
  };
  