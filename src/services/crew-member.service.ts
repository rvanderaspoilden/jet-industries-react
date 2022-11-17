import {CrewMember} from "../models/crew-member.model";

export class CrewMemberService {
    static DisplayFullName(crewMember: CrewMember): string {
        return `${crewMember.firstName} ${crewMember.lastName}`;
    }
}
