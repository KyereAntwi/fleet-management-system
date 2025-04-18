export interface AddVehicleRequest {
    workspaceId: string;
    brandAndType: string;
    initialCost: number;
    mileageCovered: string;
    roadWorthyRenewalDate: string;
    insuranceRenewalDate: string;
}

export interface UpdateVehicleRequest {
    vehicleId: string;
    workspaceId: string;
    brandAndType: string;
    initialCost: number;
    mileageCovered: string;
    roadWorthyRenewalDate: string;
    insuranceRenewalDate: string;
}

export interface UploadVehicleRequest {
    workspaceId: string;
    file: File;
}

export interface UpdateVehicleExpenditureRequest {
    vehicleId: string;
    cost: number;
    expenditureType: VehicleExpenditureType;
}

export enum VehicleExpenditureType {
    FuelConsumption = 'FuelConsumption',
    Maintenance = 'Maintenance',
    AccidentRepair = 'AccidentRepair',
    HirePayment = 'HirePayment',
}

export interface GetVehiclesRequest {
    workspaceId: string;
    keyword: string;
    initialCostFrom: number;
    initialCostTo: number;
    annualDepreciationFrom: number;
    annualDepreciationTo: number;
    mileageCovered: string;
    roadWorthyRenewalDateFrom: string;
    roadWorthyRenewalDateTo: string;
    insuranceRenewalDateFrom: string;
    insuranceRenewalDateTo: string;
    page: number;
    pageSize: number;
}