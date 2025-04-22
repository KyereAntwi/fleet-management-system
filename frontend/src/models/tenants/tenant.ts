export interface Tenant {
    id: string;
    connectionString: string;
    subscriptionType: string; // "standard" | "free"
    createdAt: string;
}