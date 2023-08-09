import React from "react";
import {WrapComp} from "../../parents/WrapError";
import ListPeopleBrief from "../Lists/ListPeopleBrief";
import type {TypeListPeople} from "../../../modules/interfaces/TypeList";
import type {HandleComponentJax} from "../../../modules/interfaces/TypeJax";

interface Type{
	people : TypeListPeople[];
	cbComponent : HandleComponentJax;
}

const ListPeople = (props : Type) => {
	console.count("LIST PEOPLE RENDERED");
	
	const people : TypeListPeople[]        = props.people;
	const cbComponent : HandleComponentJax = props.cbComponent;
	
	return <>
		{<WrapComp component={<ListPeopleBrief list={people} cbComponent={cbComponent}/>} msg={"List People Brief:"}/>}
	</>;
};

export default ListPeople;