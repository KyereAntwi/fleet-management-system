export interface Vehicle {
    vehicleId: string;
    workspaceId: string;
    brandAndType: string;
    initialCost: number;
    mileageCovered: string;
    roadWorthyRenewalDate: string;
    insuranceRenewalDate: string;
    createdAt?: string;
    updatedAt?: string;
    createdBy?: string;
    updatedBy?: string;
}

export interface VehicleDetails {
    vehicle: Vehicle;
    fuelConsumed?: FuelConsumed[];
    maintenanceCosts?: MaintenanceCost[];
    accidentRepairCosts?: AccidentRepairCost[];
}

export interface FuelConsumed {
    fuelConsumedValue: number;
    createdAt: string;
    id: string;
}

export interface MaintenanceCost {
    cost: number;
    createdAt: string;
    id: string;
}

export interface AccidentRepairCost {
    cost: number;
    createdAt: string;
    id: string;
}