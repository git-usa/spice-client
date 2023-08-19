import React from "react";
import {WrapComp} from "../../parents/WrapError";
import ListPeopleBrief from "../Lists/ListPeopleBrief";
import type {TypeListPeople} from "../../../modules/interfaces/TypeList";
import type {HandleComponentJax} from "../../../modules/interfaces/TypeJax";

interface Type{
	people : TypeListPeople[];
	cbComponent : HandleComponentJax;
	isBrief? : boolean;
}

const PeopleListBrief = ({people, cbComponent, isBrief = true} : Type) => {
	console.count("LIST PEOPLE BRIEF RENDERED");
	return <>
		{<WrapComp component={<ListPeopleBrief list={people} cbComponent={cbComponent} isBrief={isBrief}/>} msg={"List People Brief:"}/>}
	</>;
};

export default PeopleListBrief;