export interface AddVehicleRequest {
    workspaceId: string;
    brandAndType: string;
    initialCost: number;
    mileageCovered: string;
    roadWorthyRenewalDate: string;
    insuranceRenewalDate: string;
}

export interface UpdateVehicleExpenditureRequest {
    vehicleId: string;
    cost: number;
    expenditureType: VehicleExpenditureType;
}

export enum VehicleExpenditureType {
    FuelConsumption = 'FuelConsumption',
    Maintenance = 'Maintenance',
    AccidentRepair = 'AccidentRepair'
}

export interface GetVehiclesRequest {
    workspaceId: string;
    keyword: string;
    page: number;
    pageSize: number;
}