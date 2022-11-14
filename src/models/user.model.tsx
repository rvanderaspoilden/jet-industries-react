export interface User {
    uniqueId: string,
    firstName: string,
    lastName: string,
    email: string,
    password: string,
    role: UserRole;
}

export enum UserRole {
    ADMIN = "ADMIN",
    CAPTAIN = "CAPTAIN",
    FLEET_MANAGER = "FLEET_MANAGER",
    CREW_MEMBER = "CREW_MEMBER",
}