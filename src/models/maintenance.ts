export type MaintenanceRequest = {
    _id: string;
    rent: { _id: string };
    scheduledDate: Date;
    reason: string;
    _createdAt: Date;
    updatedAt: Date;
    status: string;
    user: { name: string };
  };
  
  export type CreateMaintenanceRequestDTO = {
    maintenanceReason: string;
    rentId: string;
    userId: string;
    maintenanceDate: Date;
  };
  
  export type UpdateMaintenanceRequestDTO = {
    maintenanceStatus: string;
    maintenanceId: string;
  };
  