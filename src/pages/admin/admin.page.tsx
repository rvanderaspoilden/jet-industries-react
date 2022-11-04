import React from 'react';
import {SlTab, SlTabGroup, SlTabPanel} from "@shoelace-style/shoelace/dist/react";
import {HeaderComponent} from "../../components/header/header.component";

export class AdminPage extends React.Component {
    render() {
        return (
            <>
                <HeaderComponent title="JetIndustries"/>
                <SlTabGroup>
                    <SlTab slot="nav" panel="spaceship">
                        Spaceship
                    </SlTab>

                    <SlTab slot="nav" panel="crewMember">
                        Crew Member
                    </SlTab>

                    <SlTabPanel name="spaceship">
                        This is the spaceship panel
                    </SlTabPanel>

                    <SlTabPanel name="crewMember">
                        This is the crew member panel
                    </SlTabPanel>
                </SlTabGroup>
            </>
        );
    }
}
