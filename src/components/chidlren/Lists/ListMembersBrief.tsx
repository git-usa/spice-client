import React from "react";
import ListRender from "./ListRender";
import {_lady} from "../../../modules/scripts/_lady";
import AddActions, {TypeActionNode} from "./ListActions";
import {TypeProfileMin} from "../../../modules/interfaces/TypeAll";
import {ModalAddTask, showModalAddTask} from "../../modals/ModalAddTask";
import {TypeListBrief, TypeListMember} from "../../../modules/interfaces/TypeList";

const addAction = (r : typeof _lady, i : TypeListMember & {team : TypeProfileMin}) => {
	const actions : TypeActionNode[] = [
		{
			text    : "add task",
			onClick : () => {
				showModalAddTask({team : i.team, project : i.project, member : i.member});
			}
		}
	];
	AddActions({node : r._createTag("td"), actions});
};

const ListMembersBrief = ({list, cbComponent, title = "Members List", id = "memberTab", isBrief = true} : TypeListBrief & {isBrief? : boolean}) => {
	
	const includes = `member ${isBrief ? "team project" : ""} role status createdAt`;
	
	const onShow = (cell : typeof _lady, item : TypeListMember, carry : any, head : string) => {
		if(!head){
			isBrief && item && addAction(cell, item);
			return;
		}
		
		switch(head){
			case "team":
			case "member":
			case "project":
				if(!item[head] || !item[head].id) return;
				const jax = {of : head, by : item[head].id};
				cell._replace(item[head].name)
				    ._classes("w3-text-blue la-bold")
				    ._click(() => cbComponent("profile", jax));
				break;
		}
		cell._capitalWords();
	};
	
	return <>
		<ModalAddTask/>
		<div className={"w3-padding-hor-24 la-container"}>
			<h4 className={`la-capital la-bold w3-padding la-l la-s w3-khaki`}>{title}</h4>
			<ListRender list={list} id={id} onShow={onShow} includes={includes} carry={true}/>
		</div>
	</>;
	
};

export default ListMembersBrief;