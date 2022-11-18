export interface CrewMember {
    uniqueId: string;
    firstName: string;
    lastName: string;
    job: Job,
    status: CrewMemberStatus
    picture?: string; // base64
}

export enum CrewMemberStatus {
    AVAILABLE = "Available",
    ASSIGNED = "Assigned",
    INVALID = "Invalid"
}

export enum Job {
    COOK = "Cook",
    PILOT = "Pilot",
    SOLDIER = "Soldier",
    DOCTOR = "Doctor"
}
