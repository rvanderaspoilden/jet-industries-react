import {SlCard, SlIcon} from "@shoelace-style/shoelace/dist/react";
import React from "react";
import './add-card.component.scss';

type AddCardComponentProps = {
    label: string,
    onClick?: VoidFunction
}

const AddCardComponent = ({label, onClick}: AddCardComponentProps) => {
    return (
        <SlCard className="add-card-container" onClick={onClick}>
            <div className="content">
                <SlIcon name="plus"/>
                {label}
            </div>
        </SlCard>
    );
}

export default AddCardComponent;
