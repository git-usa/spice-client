import ListRender from "./ListRender";
import React from "react";
import {_lady} from "../../../modules/scripts/_lady";
import {TypeJax} from "../../../modules/interfaces/TypeJax";
import {TypeListBrief, TypeListTeam} from "../../../modules/interfaces/TypeList";

const ListTeamsBrief = ({list, cbComponent, title = "Teams List", id = "teamTab"} : TypeListBrief) => {
	const includes = "name category status manager project createdAt brief";
	const onShow   = (c : typeof _lady, h : string, v : any, i : TypeListTeam, carry : any) => {
		if(!carry) return;
		
		let jax = {} as TypeJax;
		
		switch(h){
			case "manager":
				c._replace(i.manager.name);
				jax = {of : "people", by : i.manager.id};
				break;
			case "project":
				jax = {of : "project", by : i.project.id};
				c._replace(i.project.name);
				break;
			default:
				jax = {of : "team", by : i.id};
		}
		
		switch(h){
			case "name":
			case "manager":
			case "project":
				c._classes("w3-text-blue la-bold")
				 ._click(() => cbComponent("profile", jax));
		}
		c._capitalWords();
	};
	return <div className={"w3-padding-hor-24 la-container"}>
		<h4 className={`la-capital la-bold w3-padding la-l la-s w3-khaki`}>{title}</h4>
		<ListRender list={list} id={id} onShow={onShow} includes={includes} carry={true}/>
	</div>;
	
};

export default ListTeamsBrief;