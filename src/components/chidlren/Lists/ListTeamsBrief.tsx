import React from "react";
import ListRender from "./ListRender";
import {_lady} from "../../../modules/scripts/_lady";
import {TypeJax} from "../../../modules/interfaces/TypeJax";
import {TypeListBrief, TypeListTeam} from "../../../modules/interfaces/TypeList";
import {ModalAddMember, showModalAddMember} from "../../modals/ModalAddMember";
import {TypeProfileMin} from "../../../modules/interfaces/TypeAll";
import AddActions, {TypeActionNode} from "./ListActions";


const addAction = (r : typeof _lady, i : TypeListTeam & {team : TypeProfileMin}) => {
	const actions : TypeActionNode[] = [
		{
			text    : "add member",
			onClick : () => {
				showModalAddMember({team : i.team, project : i.project});
			}
		}
	];
	AddActions({node : r._createTag("td"), actions});
};

const ListTeamsBrief = ({list, cbComponent, title = "Teams List", id = "teamTab", isBrief = true} : TypeListBrief & {isBrief? : boolean}) => {
	const includes = `name category status ${isBrief ? "members manager project" : ""} createdAt brief`;
	
	const onShow = (cell : typeof _lady, item : TypeListTeam, carry : any, head : string) => {
		if(!head){
			isBrief && item && addAction(cell, {...item, team : {id : item.id, name : item.name}});
			return;
		}
		
		let jax = {} as TypeJax;
		
		switch(head){
			case "manager":
				cell._replace(item.manager.name);
				jax = {of : "people", by : item.manager.id};
				break;
			case "project":
				jax = {of : "project", by : item.project.id};
				cell._replace(item.project.name);
				break;
			default:
				jax = {of : "team", by : item.id};
		}
		
		switch(head){
			case "name":
			case "manager":
			case "project":
				cell._classes("w3-text-blue la-bold")
				    ._click(() => cbComponent("profile", jax));
		}
		cell._capitalWords();
	};
	return <>
		<ModalAddMember/>
		<div className={"w3-padding-hor-24 la-container"}>
			<h4 className={`la-capital la-bold w3-padding la-l la-s w3-khaki`}>{title}</h4>
			<ListRender list={list} id={id} onShow={onShow} includes={includes} carry={true}/>
		</div>
	</>;
	
};

export default ListTeamsBrief;