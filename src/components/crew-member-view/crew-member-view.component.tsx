import {CrewMemberMock} from "../../mock/crew-member/crew-member.mock";
import {CrewMember} from "../../models/crew-member.model";
import {CrewMemberCardComponent} from "../crew-member-card/crew-member-card.component";
import React, {useState} from "react";
import './crew-member-view.component.scss';

export const CrewMemberViewComponent = () => {
    const [data, setData] = useState<CrewMember[]>(CrewMemberMock);

    const handleDelete = (crewMember: CrewMember): void => {
        // TODO: Call API to delete this crewMember

        const dataFiltered = data.filter(x => x.uniqueId !== crewMember.uniqueId);
        setData(dataFiltered);
    }

    const handleEdit = (crewMember: CrewMember): void => {
        // TODO: Call API to update this crewMember

        const dataFiltered = data.filter(x => x.uniqueId !== crewMember.uniqueId);
        dataFiltered.push(crewMember);
        setData(dataFiltered);
    }

    return (
        <div className="crew-member-view-container">
            {
                data.map((crewMember: CrewMember) => {
                    return (
                        <CrewMemberCardComponent key={crewMember.uniqueId}
                                                 crewMember={crewMember}
                                                 onDelete={() => handleDelete(crewMember)}
                                                 onEdit={() => handleEdit(crewMember)}
                        />
                    );
                })
            }
        </div>
    );
}
