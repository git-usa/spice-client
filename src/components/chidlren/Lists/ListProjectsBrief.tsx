import React from "react";
import ListRender from "./ListRender";
import {_lady} from "../../../modules/scripts/_lady";
import {TypeListBrief, TypeListProject} from "../../../modules/interfaces/TypeList";
import {ModalAddTeam, showModalAddTeam} from "../../modals/ModalAddTeam";
import AddActions, {TypeActionNode} from "./ListActions";

const addAction = (row : typeof _lady, item : TypeListProject) => {
	const actions : TypeActionNode[] = [
		{
			text    : "add team",
			onClick : () => {
				showModalAddTeam({project : {id : item.id, name : item.name}});
			}
		}
	];
	AddActions({node : row._createTag("td"), actions});
};

const ListProjectsBrief = ({list, cbComponent, title = "Projects List", id = "projectTab", isBrief = true} : TypeListBrief & {isBrief? : boolean}) => {
	
	const includes = `name category status ${isBrief ? "manager teams" : ""} createdAt brief`;
	
	const onShow = (cell : typeof _lady, item : TypeListProject, carry : any, head : string) => {
		if(!head){
			isBrief && item && addAction(cell, item);
			return;
		}
		
		if(head === "manager"){
			cell._replace(item.manager.name);
		}
		
		switch(head){
			case "name":
			case "manager":
				const jax = head === "name" ? {of : "project", by : item.id} : {of : "people", by : item.manager.id};
				cell._classes("w3-text-blue la-bold")
				    ._click(() => cbComponent("profile", jax));
		}
		cell._capitalWords();
	};
	
	return <>
		<ModalAddTeam/>
		<div className={"w3-padding-hor-24 la-container"}>
			<h4 className={`la-capital la-bold w3-padding la-l la-s w3-khaki`}>{title}</h4>
			<ListRender list={list} id={id} onShow={onShow} includes={includes} carry={true}/>
		</div>
	</>;
	
};

export default ListProjectsBrief;