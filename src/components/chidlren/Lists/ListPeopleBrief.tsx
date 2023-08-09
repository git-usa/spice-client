import React, {useEffect} from "react";
import _l, {_lady} from "../../../modules/scripts/_lady";
import {TypeProject} from "../../../modules/interfaces/TypeProject";
import {TypeListPeople} from "../../../modules/interfaces/TypeList";
import {HandleComponentJax} from "../../../modules/interfaces/TypeJax";

interface Type{
	id? : string;
	title? : string;
	list : TypeListPeople[];
	cbComponent : HandleComponentJax;
	
}

const ListPeopleBrief = ({list, cbComponent, title = "People List", id = "peopleTab"} : Type) => {
	
	const includes = "name role login status createdAt projects teams";
	
	const onShow = (c : typeof _lady, h : string, v : any, i : TypeProject, carry : any) => {
		if(!carry) return;
		c._capitalWords();
		if(h === "name"){
			c._replace(`<a href="#">${v}</a>`)
			 ._capitalWords()
			 ._classes("w3-text-blue la-bold")
			 ._click(() => cbComponent("profile", {of : "people", by : i.id}));
		}
	};
	
	useEffect(() => {
		const tab = _l(id)._replace("");
		if(!list || list.length === 0){
			tab._error("No People Received")._classes("la-shrink");
			return;
		}
		
		tab._showData(
			list, null, includes, onShow, null, true,
			{createdAt : {input : "date"}}, false, true
		)._classes("w3-table-all");
		
	}, []);
	
	return <div className={"w3-padding-hor-24 la-container"}>
		<h4 className={`la-capital la-bold w3-padding la-l la-s w3-khaki`}>{title}</h4>
		<div className={"w3-responsive la-l la-s"} id={id}></div>
	</div>;
	
};

export default ListPeopleBrief;