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
    fuelConsumptions?: FuelConsumed[];
    maintenanceCosts?: MaintenanceCost[];
    AccidentRepairCosts?: AccidentRepairCost[];
}

export interface FuelConsumed {
    fuelConsumedValue: number;
    createdAt: string;
}

export interface MaintenanceCost {
    cost: number;
    createdAt: string;
}

export interface AccidentRepairCost {
    cost: number;
    createdAt: string;
}