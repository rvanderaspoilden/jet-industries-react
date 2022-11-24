import React, {FormEvent, useEffect, useRef, useState} from "react";
import './edit-crew-member.dialog.scss';
import {SlButton, SlDialog, SlIcon, SlInput, SlMenuItem, SlSelect} from "@shoelace-style/shoelace/dist/react";
import {CrewMember, Job} from "../../models/crew-member.model";

type EditCrewMemberDialogProps = {
    isOpen: boolean,
    crewMember: CrewMember,
    onClose: VoidFunction,
    onEdit: (crewMember: CrewMember) => void
}

type EditCrewMemberForm = {
    firstname: string,
    lastname: string,
    job: Job
}

const DEFAULT_FORM_VALUES: EditCrewMemberForm = {
    firstname: '',
    lastname: '',
    job: null,
};

const EditCrewMemberDialog = (props: EditCrewMemberDialogProps) => {
    const [form, setForm] = useState<EditCrewMemberForm>(DEFAULT_FORM_VALUES);
    const dialogRef = useRef(null);

    useEffect(() => {
        if (props.isOpen) {
            setForm({
                firstname: props.crewMember.firstName,
                lastname: props.crewMember.lastName,
                job: props.crewMember.job,
            });
        }
    }, [props.isOpen, props.crewMember])

    const jobs = Object.keys(Job).map((key: string) => {
        const value: Job = Job[key as keyof typeof Job];
        return (<SlMenuItem key={key} value={value}>{value}</SlMenuItem>);
    });

    const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        props.onEdit({
            ...props.crewMember,
            job: form.job
        } as CrewMember);
    }

    const handleValueChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setForm((prevState) => {
            return {
                ...prevState,
                [event.target.name]: event.target.value
            };
        });
    }

    const handleRequestClose = (event: any) => {
        if (event.detail.source === 'overlay') {
            event.preventDefault();
        } else {
            props.onClose();
        }
    }

    return (
        <SlDialog ref={dialogRef} label="Edit Crew Member Dialog" open={props.isOpen}
                  onSlRequestClose={handleRequestClose} className="edit-new-member-dialog">
            <label slot="label">Edit a crew member</label>

            <form onSubmit={(event) => handleSubmit(event)}>
                <SlInput name="firstname"
                         value={form.firstname}
                         onSlChange={(event: any) => handleValueChange(event)} disabled/>
                <SlInput name="lastname"
                         value={form.lastname}
                         onSlChange={(event: any) => handleValueChange(event)} disabled/>
                <SlSelect name="job"
                          value={form.job}
                          onSlChange={(event: any) => handleValueChange(event)} placeholder="Job*" required>
                    <SlIcon name="mortarboard" slot="prefix"></SlIcon>
                    {jobs}
                </SlSelect>

                <div className="buttons">
                    <SlButton variant="neutral" outline onClick={props.onClose}>
                        Cancel
                    </SlButton>
                    <SlButton type="submit" variant="primary">
                        Edit
                    </SlButton>
                </div>
            </form>

        </SlDialog>
    );
}

export default EditCrewMemberDialog;
