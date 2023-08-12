import ListRender from "./ListRender";
import React from "react";
import {_lady} from "../../../modules/scripts/_lady";
import {TypeListBrief, TypeListPeople} from "../../../modules/interfaces/TypeList";

const ListPeopleBrief = ({list, cbComponent, title = "People List", id = "peopleTab"} : TypeListBrief) => {
	
	const includes = "name role login status createdAt projects teams";
	
	const onShow = (c : typeof _lady, h : string, v : any, i : TypeListPeople, carry : any) => {
		if(!carry) return;
		if(h === "name"){
			c._replace(`<a href="#">${v}</a>`)
			 ._classes("w3-text-blue la-bold")
			 ._click(() => cbComponent("profile", {of : "people", by : i.id}));
		}
		c._capitalWords();
	};
	
	return <div className={"w3-padding-hor-24 la-container"}>
		<h4 className={`la-capital la-bold w3-padding la-l la-s w3-khaki`}>{title}</h4>
		<ListRender list={list} id={id} onShow={onShow} includes={includes} carry={true}/>
	</div>;
	
};

export default ListPeopleBrief;