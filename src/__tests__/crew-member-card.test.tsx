import {render} from "@testing-library/react";
import {CrewMemberCardComponent} from "../components/crew-member-card/crew-member-card.component";
import React from "react";
import {CrewMemberMock} from "../mock/crew-member/crew-member.mock";
import {act} from "react-dom/test-utils";

describe("Test of the crew member card", () => {
    /*    let container: any = null;

        beforeEach(() => {
            // met en place un élément DOM comme cible de rendu
            container = document.createElement("div");
            document.body.appendChild(container);
        });

        afterEach(() => {
            // nettoie en sortie de test
            unmountComponentAtNode(container);
            container.remove();
            container = null;
        });*/

    test('Should display a crew member card', () => {
        act(() => {
            render(<CrewMemberCardComponent crewMember={CrewMemberMock[0]}/>);
        });
    });
})
