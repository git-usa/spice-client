import React from "react";
import ListRender from "./ListRender";
import {_lady} from "../../../modules/scripts/_lady";
import {TypeListBrief, TypeListPeople} from "../../../modules/interfaces/TypeList";

const ListPeopleBrief = ({list, cbComponent, title = "People List", id = "peopleTab", isBrief = true} : TypeListBrief & {isBrief? : boolean}) => {
	
	const includes = `name role login status createdAt ${isBrief ? "projects teams member" : ""}`;
	
	const onShow = (c : typeof _lady, i : TypeListPeople, carry : any, h : string, v : any) => {
		if(!h) return;
		if(h === "name"){
			c._replace(`<a href="#">${v}</a>`)
			 ._classes("w3-text-blue la-bold")
			 ._click(() => cbComponent("profile", {of : "people", by : i.id}));
		}
		c._capitalWords();
	};
	
	return <div className={"w3-padding-hor-24 la-container"}>
		<h4 className={`la-capital la-bold w3-padding la-l la-s w3-khaki`}>{title + (isBrief ? " With Brief" : "")}</h4>
		<ListRender list={list} id={id} onShow={onShow} includes={includes} carry={true}/>
	</div>;
	
};

export default ListPeopleBrief;