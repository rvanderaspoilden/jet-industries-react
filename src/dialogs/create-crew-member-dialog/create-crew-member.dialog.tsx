import React, {FormEvent, useEffect, useRef, useState} from "react";
import './create-crew-member.dialog.scss';
import {SlButton, SlDialog, SlIcon, SlInput, SlMenuItem, SlSelect} from "@shoelace-style/shoelace/dist/react";
import {CrewMember, CrewMemberStatus, Job} from "../../models/crew-member.model";

type CreateCrewMemberDialogProps = {
    isOpen: boolean,
    onClose: VoidFunction,
    onCreate: (crewMember: CrewMember) => void
}

type CreateCrewMemberForm = {
    firstname: string,
    lastname: string,
    job: Job
}

const DEFAULT_FORM_VALUES: CreateCrewMemberForm = {
    job: null,
    lastname: '',
    firstname: ''
}

const CreateCrewMemberDialog = (props: CreateCrewMemberDialogProps) => {
    const [form, setForm] = useState<CreateCrewMemberForm>(DEFAULT_FORM_VALUES);
    const dialogRef = useRef(null);

    useEffect(() => {
        if (props.isOpen && form !== DEFAULT_FORM_VALUES) {
            setForm(DEFAULT_FORM_VALUES);
        }
    }, [props.isOpen])

    const jobs = Object.keys(Job).map((key: string) => {
        const value: Job = Job[key as keyof typeof Job];
        return (<SlMenuItem key={key} value={value}>{value}</SlMenuItem>);
    });

    const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        props.onCreate({
            firstName: form.firstname,
            lastName: form.lastname,
            status: CrewMemberStatus.AVAILABLE,
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
        <SlDialog ref={dialogRef} label="Dialog" open={props.isOpen}
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
                        Create
                    </SlButton>
                </div>
            </form>

        </SlDialog>
    );
}

export default CreateCrewMemberDialog;
