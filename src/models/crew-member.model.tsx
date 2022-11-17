export interface CrewMember {
    uniqueId: string;
    firstName: string;
    lastName: string;
    picture: string; // base64
    job: string,
    status: CrewMemberStatus
}

export enum CrewMemberStatus {
    AVAILABLE = "Available",
    ASSIGNED = "Assigned",
    INVALID = "Invalid"
}
