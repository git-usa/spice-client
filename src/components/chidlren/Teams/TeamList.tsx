import React from "react";
import {WrapComp} from "../../parents/WrapError";
import ListTeamsBrief from "../Lists/ListTeamsBrief";
import {TypeListTeam} from "../../../modules/interfaces/TypeList";
import type {HandleComponentJax} from "../../../modules/interfaces/TypeJax";

interface Type{
	teams : TypeListTeam[];
	cbComponent : HandleComponentJax;
}

const TeamList = ({teams, cbComponent} : Type) => {
	console.info("LIST PROJECTS RENDERED");
	return <>
		{<WrapComp component={<ListTeamsBrief list={teams} cbComponent={cbComponent}/>} msg={"List Teams Brief:"}/>}
	</>;
};

export default TeamList;