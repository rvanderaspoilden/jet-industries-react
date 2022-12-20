import {CrewMember} from "../models/crew-member.model";
import {CrudService} from "./crud.service";

export class CrewMemberService extends CrudService<CrewMember> {
    constructor() {
        super("/crew-members");
    }

    static displayFullName(crewMember: CrewMember): string {
        return `${crewMember.firstName} ${crewMember.lastName}`;
    }
}
