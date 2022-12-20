import {CrewMember} from "../../models/crew-member.model";
import {CrewMemberCardComponent} from "../crew-member-card/crew-member-card.component";
import React, {useEffect, useState} from "react";
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
    const crewMemberService = new CrewMemberService();

    const [data, setData] = useState<CrewMember[]>([]);

    useEffect(() => {
        crewMemberService.retrieveAll().then((crewMembers: CrewMember[]) => setData(crewMembers));
    }, []);

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
            message: (<>Are you sure to delete <b>{CrewMemberService.displayFullName(crewMember)}</b> ?</>),
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
        loader.show();

        crewMemberService.update(crewMember).then((result: CrewMember) => {
            loader.hide();
            const dataFiltered = data.filter(x => x.crewMemberId !== crewMember.crewMemberId);
            dataFiltered.push(result);
            setData(dataFiltered);
            setEditMemberDialog({
                isOpen: false,
                crewMember: null
            });
            NotificationService.notify("Crew member updated !", "success");
        }).catch(() => NotificationService.notify("An occured during crew member updating...", "danger"))
    }

    const handleAddCrewMember = (crewMember: CrewMember): void => {
        loader.show();

        crewMemberService.create(crewMember)
            .then((result: CrewMember) => {
                setData([...data, result]);
                setAddMemberDialogOpen(false);
                NotificationService.notify("New crew member created !", "success");
                loader.hide();
            })
            .catch(() => {
                NotificationService.notify("An error occurred during creation...", "danger");
                loader.hide()
            });
    }

    const handleDeleteCrewMember = (crewMember: CrewMember): void => {
        crewMemberService.delete(crewMember.crewMemberId).then(() => {
            const dataFiltered = data.filter(x => x.crewMemberId !== crewMember.crewMemberId);
            setData(dataFiltered);
            handleCloseConfirmDialog();
        });
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
