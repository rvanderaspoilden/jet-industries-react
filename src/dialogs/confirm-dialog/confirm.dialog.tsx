import {SlButton, SlDialog} from "@shoelace-style/shoelace/dist/react";
import React from "react";

export type ConfirmDialogProps = {
    isOpen: boolean,
    label: string,
    message: string | JSX.Element,
    deleteButtonLabel?: string,
    onClose?: VoidFunction,
    onDelete?: VoidFunction,
}

const ConfirmDialog = (props: ConfirmDialogProps) => {
    const handleRequestClose = (event: any) => {
        if (event.detail.source === 'overlay') {
            event.preventDefault();
        } else {
            props.onClose();
        }
    }

    return (
        <SlDialog label="Dialog" open={props.isOpen}
                  onSlRequestClose={handleRequestClose}
                  className="create-new-member-dialog">
            <label slot="label">{props.label}</label>
            <span className="message">{props.message}</span>
            <SlButton slot="footer" variant="danger" onClick={props.onDelete} outline>{props.deleteButtonLabel || 'Delete'}</SlButton>
        </SlDialog>
    );
}

export default ConfirmDialog;
