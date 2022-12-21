import React, {FormEvent, useEffect, useRef, useState} from "react";
import './edit-crew-member.dialog.scss';
import {SlButton, SlDialog, SlIcon, SlInput, SlMenuItem, SlSelect} from "@shoelace-style/shoelace/dist/react";
import {CrewMember} from "../../models/crew-member.model";
import {Job} from "../../models/job.model";
import {JobMock} from "../../mock/job/job.mock";

type EditCrewMemberDialogProps = {
    isOpen: boolean,
    crewMember: CrewMember,
    jobs: Job[],
    onClose: VoidFunction,
    onEdit: (crewMember: CrewMember) => void
}

type EditCrewMemberForm = {
    firstname: string,
    lastname: string,
    picture: string,
    jobId: string
}

const DEFAULT_FORM_VALUES: EditCrewMemberForm = {
    firstname: '',
    lastname: '',
    picture: '',
    jobId: '',
};

const EditCrewMemberDialog = (props: EditCrewMemberDialogProps) => {
    const [form, setForm] = useState<EditCrewMemberForm>(DEFAULT_FORM_VALUES);
    const dialogRef = useRef(null);

    useEffect(() => {
        if (props.isOpen) {
            setForm({
                firstname: props.crewMember.firstName,
                lastname: props.crewMember.lastName,
                jobId: props.crewMember.job.jobId,
                picture: props.crewMember.picture
            });
        }
    }, [props.isOpen, props.crewMember])

    const jobList = props.jobs.map((job: Job) => {
        return (<SlMenuItem key={job.jobId} value={job.jobId}>{job.label}</SlMenuItem>);
    });

    const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        props.onEdit({
            ...props.crewMember,
            picture: form.picture,
            job: props.jobs.find(x => x.jobId === form.jobId)
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
                <SlInput name="picture"
                         value={form.picture}
                         onSlChange={(event: any) => handleValueChange(event)} placeholder="Picture (base64)"
                         clearable/>
                <SlSelect name="jobId"
                          value={form.jobId}
                          onSlChange={(event: any) => handleValueChange(event)} placeholder="Job*" required>
                    <SlIcon name="mortarboard" slot="prefix"></SlIcon>
                    {jobList}
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
