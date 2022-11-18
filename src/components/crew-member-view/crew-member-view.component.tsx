import {CrewMemberMock} from "../../mock/crew-member/crew-member.mock";
import {CrewMember} from "../../models/crew-member.model";
import {CrewMemberCardComponent} from "../crew-member-card/crew-member-card.component";
import React, {useState} from "react";
import './crew-member-view.component.scss';
import AddCardComponent from "../add-card/add-card.component";
import CreateCrewMemberDialog from "../../dialogs/create-crew-member-dialog/create-crew-member.dialog";
import {useLoader} from "../../contexts/loader.context";
import {NotificationService} from "../../services/toastr.service";

export const CrewMemberViewComponent = () => {
    const [data, setData] = useState<CrewMember[]>(CrewMemberMock);
    const [addMemberDialogOpen, setAddMemberDialogOpen] = useState<boolean>(false);
    const loader = useLoader();

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

    const handleAddCrewMember = (crewMember: CrewMember): void => {
        // TODO: Call API to add a new crewMember

        loader.show();
        setTimeout(() => {
            loader.hide();
            setData([...data, crewMember]);
            setAddMemberDialogOpen(false);
            NotificationService.notify("New crew member created !", "success");
        }, 1000);
    }

    return (
        <div className="crew-member-view-container">
            <CreateCrewMemberDialog isOpen={addMemberDialogOpen}
                                    onCreate={(value: CrewMember) => handleAddCrewMember(value)}
                                    onClose={() => setAddMemberDialogOpen(false)}/>

            <AddCardComponent label="Add crew member" onClick={() => setAddMemberDialogOpen(true)}/>

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
