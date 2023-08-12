import React from "react";
import {WrapComp} from "../../parents/WrapError";
import ListProjectsBrief from "../Lists/ListProjectsBrief";
import type {TypeListProject} from "../../../modules/interfaces/TypeList";
import type {HandleComponentJax} from "../../../modules/interfaces/TypeJax";

interface Type{
	projects : TypeListProject[];
	cbComponent : HandleComponentJax;
}

const ProjectsList = ({projects, cbComponent} : Type) => {
	console.info("LIST PROJECTS RENDERED");
	return <>
		{/*<div id={"listTable"}></div>*/}
		{<WrapComp component={<ListProjectsBrief list={projects} cbComponent={cbComponent}/>} msg={"List Projects Brief:"}/>}
	</>;
};

export default ProjectsList;