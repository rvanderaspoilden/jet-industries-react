import {SlAvatar, SlBadge, SlButton, SlCard, SlIcon} from "@shoelace-style/shoelace/dist/react";
import React from "react";
import {CrewMember, CrewMemberStatus} from "../../models/crew-member.model";
import './crew-member-card.component.scss';
import {CrewMemberService} from "../../services/crew-member.service";

type PropsType = {
    crewMember: CrewMember,
    onDelete?: VoidFunction,
    onEdit?: VoidFunction
}

export const CrewMemberCardComponent = ({crewMember, onDelete, onEdit}: PropsType) => {
    const crewMemberService = new CrewMemberService();

    const convertStatusToVariant = (status: CrewMemberStatus) => {
        switch (status) {
            case CrewMemberStatus.ASSIGNED:
                return 'primary';

            case CrewMemberStatus.AVAILABLE:
                return 'success';

            case CrewMemberStatus.INVALID:
            default:
                return 'danger';
        }
    }

    const picture = crewMember.picture ?
        (<img src={crewMember.picture} alt="Picture of the crew member"/>) :
        (<SlAvatar shape="rounded" label="No picture"/>);

    return (
        <SlCard className="crew-member-card-container">
            <div slot="image" className="image-container">
                {picture}
            </div>

            <div slot="header" className="header">
                <span className="full_name">{crewMemberService.displayFullName(crewMember)}</span>
                <SlBadge variant={convertStatusToVariant(crewMember.status)}>{crewMember.status || 'undefined'}</SlBadge>
            </div>

            <div className="skill"><SlIcon name="mortarboard"/> {crewMember.job?.label}</div>

            <div slot="footer" className="footer">
                <SlButton variant="danger" outline onClick={onDelete}>
                    <SlIcon name="trash3"/>
                    Delete
                </SlButton>
                <SlButton variant="neutral" outline onClick={onEdit}>
                    <SlIcon name="pencil-square"/>
                    Edit
                </SlButton>
            </div>
        </SlCard>
    );
}
