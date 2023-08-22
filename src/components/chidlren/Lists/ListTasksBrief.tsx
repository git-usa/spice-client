import React from "react";
import ListRender from "./ListRender";
import {_lady} from "../../../modules/scripts/_lady";
import AddActions, {TypeActionNode} from "./ListActions";
import {TypeProfileMin} from "../../../modules/interfaces/TypeAll";
import {ModalAddLog, showModalAddLog} from "../../modals/modalAddLog";
import {TypeListBrief, TypeListTaskBrief} from "../../../modules/interfaces/TypeList";

const addAction = (r : typeof _lady, i : TypeListTaskBrief & {team : TypeProfileMin}) => {
	const actions : TypeActionNode[] = [
		{
			text    : "add log",
			onClick : () => {
				showModalAddLog({document : {name : i.title, id : i.id}, path : "tasks", brief : i.brief});
			}
		}
	];
	AddActions({node : r._createTag("td"), actions});
};

const ListTasksBrief = ({list, cbComponent, title = "Tasks List", id = "taskTab", isBrief = true} : TypeListBrief & {isBrief? : boolean}) => {
	
	const includes = `title category ${isBrief ? "member team project" : ""} status createdAt brief`;
	
	const onShow = (cell : typeof _lady, item : TypeListTaskBrief, carry : any, head : string) => {
		if(!head){
			isBrief && item && addAction(cell, item);
			return;
		}
		
		cell._style({verticalAlign : "middle"});
		
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
			case "title":
				cell._classes("w3-text-red la-bold");
				break;
			case "brief":
				cell._classes("");
				break;
		}
		cell._capitalWords();
	};
	
	return <>
		<ModalAddLog/>
		<div className={"w3-padding-hor-24 la-container"}>
			<h4 className={`la-capital la-bold w3-padding la-l la-s w3-khaki`}>{title}</h4>
			<ListRender list={list} id={id} onShow={onShow} includes={includes} carry={true}/>
		</div>
	</>;
	
};

export default ListTasksBrief;