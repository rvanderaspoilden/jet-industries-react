import React, {FormEvent, useEffect, useRef, useState} from "react";
import './create-crew-member.dialog.scss';
import {SlButton, SlDialog, SlIcon, SlInput, SlMenuItem, SlSelect} from "@shoelace-style/shoelace/dist/react";
import {CrewMember, CrewMemberStatus} from "../../models/crew-member.model";
import {Job} from "../../models/job.model";

type CreateCrewMemberDialogProps = {
    isOpen: boolean,
    jobs: Job[],
    onClose: VoidFunction,
    onCreate: (crewMember: CrewMember) => void
}

type CreateCrewMemberForm = {
    firstname: string,
    lastname: string,
    jobId: string
    picture: string,
}

const DEFAULT_FORM_VALUES: CreateCrewMemberForm = {
    jobId: '',
    lastname: '',
    firstname: '',
    picture: ''
}

const CreateCrewMemberDialog = (props: CreateCrewMemberDialogProps) => {
    const [form, setForm] = useState<CreateCrewMemberForm>(DEFAULT_FORM_VALUES);
    const dialogRef = useRef(null);

    useEffect(() => {
        if (props.isOpen) {
            if(form !== DEFAULT_FORM_VALUES) {
                setForm(DEFAULT_FORM_VALUES);
            }
        }
    }, [props.isOpen])

    const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        props.onCreate({
            firstName: form.firstname,
            lastName: form.lastname,
            status: CrewMemberStatus.AVAILABLE,
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

    const jobList = props.jobs.map((job: Job) => {
        return (<SlMenuItem key={job.jobId} value={job.jobId}>{job.label}</SlMenuItem>);
    });

    return (
        <SlDialog ref={dialogRef} label="Create Crew Member Dialog" open={props.isOpen}
                  onSlRequestClose={handleRequestClose} className="create-new-member-dialog">
            <label slot="label">Create a crew member</label>

            <form onSubmit={(event) => handleSubmit(event)}>
                <SlInput name="firstname"
                         value={form.firstname}
                         onSlChange={(event: any) => handleValueChange(event)}
                         placeholder="First name*"
                         clearable required/>
                <SlInput name="lastname"
                         value={form.lastname}
                         onSlChange={(event: any) => handleValueChange(event)} placeholder="Last name*"
                         clearable required/>
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
                        Create
                    </SlButton>
                </div>
            </form>

        </SlDialog>
    );
}

export default CreateCrewMemberDialog;
