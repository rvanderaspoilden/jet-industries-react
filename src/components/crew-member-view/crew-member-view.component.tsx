import {CrewMemberMock} from "../../mock/crew-member/crew-member.mock";
import {CrewMember} from "../../models/crew-member.model";
import {CrewMemberCardComponent} from "../crew-member-card/crew-member-card.component";
import React, {useState} from "react";
import './crew-member-view.component.scss';
import AddCardComponent from "../add-card/add-card.component";
import CreateCrewMemberDialog from "../../dialogs/create-crew-member-dialog/create-crew-member.dialog";
import {useLoader} from "../../contexts/loader.context";
import {NotificationService} from "../../services/toastr.service";
import ConfirmDialog, {ConfirmDialogProps} from "../../dialogs/confirm-dialog/confirm.dialog";
import {CrewMemberService} from "../../services/crew-member.service";
import EditCrewMemberDialog from "../../dialogs/edit-crew-member-dialog/edit-crew-member.dialog";

type DeleteDialogData = ConfirmDialogProps & {
    crewMember?: CrewMember
}

type EditDialogData = {
    isOpen: boolean,
    crewMember?: CrewMember
}

export const CrewMemberViewComponent = () => {
    const [data, setData] = useState<CrewMember[]>(CrewMemberMock);
    const [addMemberDialogOpen, setAddMemberDialogOpen] = useState<boolean>(false);

    const [editMemberDialog, setEditMemberDialog] = useState<EditDialogData>({
        isOpen: false,
    });

    const [confirmDialog, setConfirmDialog] = useState<DeleteDialogData>({
        message: "Are you sure to delete this crew member ?",
        label: "Delete a crew member",
        isOpen: false
    });

    const loader = useLoader();

    const handleOpenDeleteConfirmDialog = (crewMember: CrewMember): void => {
        setConfirmDialog({
            ...confirmDialog,
            message: (<>Are you sure to delete <b>{CrewMemberService.DisplayFullName(crewMember)}</b> ?</>),
            deleteButtonLabel: "Yes, I am.",
            isOpen: true,
            crewMember
        });
    }

    const handleOpenEditDialog = (crewMember: CrewMember): void => {
        setEditMemberDialog({
            isOpen: true,
            crewMember
        });
    }

    const handleEdit = (crewMember: CrewMember): void => {
        // TODO: Call API to update this crewMember

        loader.show();
        setTimeout(() => {
            loader.hide();
            const dataFiltered = data.filter(x => x.uniqueId !== crewMember.uniqueId);
            dataFiltered.push(crewMember);
            setData(dataFiltered);
            setEditMemberDialog({
                isOpen: false,
                crewMember: null
            });
            NotificationService.notify("Crew member updated !", "success");
        }, 1000);
    }

    const handleAddCrewMember = (crewMember: CrewMember): void => {
        // TODO: Call API to add a new crewMember
        fetch('http://localhost:8080/crew-members', {
            method: "POST",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(crewMember)
        })
            .then(res => res.json())
            .then((crewMember: CrewMember) => {
                console.log("New crewmember : ", crewMember);
            });

        /*loader.show();
        setTimeout(() => {
            loader.hide();
            setData([...data, crewMember]);
            setAddMemberDialogOpen(false);
            NotificationService.notify("New crew member created !", "success");
        }, 1000);*/
    }

    const handleDeleteCrewMember = (crewMember: CrewMember): void => {
        // TODO: Call API to remove this crewMember

        const dataFiltered = data.filter(x => x.crewMemberId !== crewMember.crewMemberId);
        setData(dataFiltered);

        handleCloseConfirmDialog();
    }

    const handleCloseConfirmDialog = (): void => {
        setConfirmDialog({
            ...confirmDialog,
            isOpen: false,
            crewMember: null
        });
    }

    return (
        <div className="crew-member-view-container">
            <ConfirmDialog onClose={() => handleCloseConfirmDialog()}
                           onDelete={() => handleDeleteCrewMember(confirmDialog.crewMember)}
                           deleteButtonLabel={confirmDialog.deleteButtonLabel}
                           isOpen={confirmDialog.isOpen}
                           label={confirmDialog.label}
                           message={confirmDialog.message}/>

            <CreateCrewMemberDialog isOpen={addMemberDialogOpen}
                                    onCreate={(value: CrewMember) => handleAddCrewMember(value)}
                                    onClose={() => setAddMemberDialogOpen(false)}/>

            <EditCrewMemberDialog isOpen={editMemberDialog.isOpen}
                                  crewMember={editMemberDialog.crewMember}
                                  onEdit={(value: CrewMember) => handleEdit(value)}
                                  onClose={() => setEditMemberDialog({isOpen: false})}/>

            <AddCardComponent label="Add crew member" onClick={() => setAddMemberDialogOpen(true)}/>

            {
                data.map((crewMember: CrewMember) => {
                    return (
                        <CrewMemberCardComponent key={crewMember.crewMemberId}
                                                 crewMember={crewMember}
                                                 onDelete={() => handleOpenDeleteConfirmDialog(crewMember)}
                                                 onEdit={() => handleOpenEditDialog(crewMember)}
                        />
                    );
                })
            }
        </div>
    );
}
