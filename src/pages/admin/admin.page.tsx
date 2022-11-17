import React from 'react';
import {SlTab, SlTabGroup, SlTabPanel} from "@shoelace-style/shoelace/dist/react";
import {HeaderComponent} from "../../components/header/header.component";
import {CrewMemberViewComponent} from "../../components/crew-member-view/crew-member-view.component";

class AdminPage extends React.Component {
    render() {
        return (
            <>
                <HeaderComponent title="JetIndustries"/>
                <SlTabGroup>
                    <SlTab slot="nav" panel="spaceship">
                        Spaceship
                    </SlTab>

                    <SlTab slot="nav" panel="crewMember" active>
                        Crew Member
                    </SlTab>

                    <SlTabPanel name="spaceship">
                        This is the spaceship panel
                    </SlTabPanel>

                    <SlTabPanel name="crewMember">
                        <CrewMemberViewComponent/>
                    </SlTabPanel>
                </SlTabGroup>
            </>
        );
    }
}

export default AdminPage;
