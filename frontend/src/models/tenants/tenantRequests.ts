export interface AddUserToTenantRequest {
    userId: string;
}

export interface CreateATenantRequest {
    userId: string;
    subscription: TenantSubscription;
}

export interface UpdateTenantSubscription {
    subscription: TenantSubscription;
}

export enum TenantSubscription {
    Free = 'Free',
    Payed = 'Standard',
}