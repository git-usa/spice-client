import React from "react";
import TeamList from "../Teams/TeamList";
import PeopleList from "../People/PeopleList";
import {WrapComp} from "../../parents/WrapError";
import ProjectsList from "../Projects/ProjectsList";
import ListMessages from "../Messages/ListMessages";
import {HandleComponentJax} from "../../../modules/interfaces/TypeJax";

interface Type{
	of : string;
	list : any;
	cbHandler : HandleComponentJax;
}

const ListSwitch = ({of, list, cbHandler} : Type) => {
	switch(of){
		case "people":
			return (
				<WrapComp msg={"List People"}
				          component={<PeopleList cbComponent={cbHandler} people={list}/>}/>
			);
		case "project":
			return (
				<WrapComp msg={"List Project"}
				          component={<ProjectsList cbComponent={cbHandler} projects={list}/>}/>
			);
		case"team":
			return (
				<WrapComp msg={"List Team"}
				          component={<TeamList cbComponent={cbHandler} teams={list}/>}/>
			);
		case "message":
			return (<WrapComp msg={"List Messages"} component={<ListMessages messages={list}/>}/>);
		/*case "log":
		 return (<WrapComp msg={"List Logs"} component={<ListLogs logs={list} cbComponent={cbHandler}/>}/>);*/
		default:
			throw Error(`No Component to List ${of}`);
	}
};

export default ListSwitch;