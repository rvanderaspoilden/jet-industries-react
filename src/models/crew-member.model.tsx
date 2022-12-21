import {Job} from "./job.model";

export interface CrewMember {
    crewMemberId: string;
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