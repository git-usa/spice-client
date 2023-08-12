import ListRender from "./ListRender";
import React from "react";
import {_lady} from "../../../modules/scripts/_lady";
import {TypeListBrief, TypeListProject} from "../../../modules/interfaces/TypeList";

const ListProjectsBrief = ({list, cbComponent, title = "Projects List", id = "projectTab"} : TypeListBrief) => {
	
	const includes = "name category status manager teams createdAt brief";
	
	const onShow = (c : typeof _lady, h : string, v : any, i : TypeListProject, carry : any) => {
		if(!carry) return;
		if(h === "manager"){
			c._replace(i.manager.name);
		}
		
		switch(h){
			case "name":
			case "manager":
				const jax = h === "name" ? {of : "project", by : i.id} : {of : "people", by : i.manager.id};
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

export default ListProjectsBrief;