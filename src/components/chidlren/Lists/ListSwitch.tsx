import React from "react";
import ListTeamsBrief from "./ListTeamsBrief";
import ListPeopleBrief from "./ListPeopleBrief";
import {WrapComp} from "../../parents/WrapError";
import ListMessages from "../Messages/ListMessages";
import ListProjectsBrief from "./ListProjectsBrief";
import {HandleComponentJax} from "../../../modules/interfaces/TypeJax";
import ListLogsBrief from "./ListLogsBrief";

interface Type{
	of : string;
	list : any;
	cbHandler : HandleComponentJax;
	isBrief? : boolean;
}

const ListSwitch = ({of, list, cbHandler, isBrief = true} : Type) => {
	switch(of){
		case "people":
			return (<WrapComp msg={"List People"}
			                  component={<ListPeopleBrief list={list} cbComponent={cbHandler} isBrief={isBrief}/>}/>);
		case "project":
			return (<WrapComp msg={"List Project"}
			                  component={<ListProjectsBrief list={list} cbComponent={cbHandler} isBrief={isBrief}/>}/>);
		case"team":
			return (<WrapComp msg={"List Team"}
			                  component={<ListTeamsBrief list={list} cbComponent={cbHandler} isBrief={isBrief}/>}/>);
		case "message":
			return (<WrapComp msg={"List Messages"} component={<ListMessages messages={list}/>}/>);
		
		case "log":
			return (<WrapComp msg={"List Logs"} component={<ListLogsBrief list={list} cbComponent={cbHandler} isBrief={isBrief} />}/>);
		/*case "log":
		 return (<WrapComp msg={"List Logs"} component={<ListLogs logs={list} cbComponent={cbHandler}/>}/>);*/
		default:
			throw Error(`No Component to List ${of}`);
	}
};

export default ListSwitch;