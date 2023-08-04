import React from "react";
import {useEffect} from "react";
import _l, {_lady} from "../../../modules/scripts/_lady.js";
import type {HandleResultData} from "../../../modules/interfaces/TypeResult";
import type {HandleComponentJax} from "../../../modules/interfaces/TypeJax";
import type {TypeListPeople} from "../../../modules/interfaces/TypeList";

const tableId = "peopleTable";

interface Type{
	people : TypeListPeople[];
	cbResult : HandleResultData;
	cbComponent : HandleComponentJax;
}

const ListPeople = (props : Type) => {
	console.count("LIST PEOPLE RENDERED");
	
	const people      = props.people;
	const cbResult    = props.cbResult;
	const cbComponent = props.cbComponent;
	
	useEffect(() => {
		if(!people || people.length === 0){
			cbResult({text : "No People Received", type : "error"});
			return;
		}
		
		const onShow = (c : typeof _lady, h : string, v : any, i : any) => {
			if(!i) return;
			switch(h){
				case "name":
					c._replace(null)._tag("a", v)._attributes({href : "#"})
					 ._click(() => cbComponent("profile", {of : "people", by : i._id}))
					 ._capitalWords();
					break;
				case "role":
					c._capitalWords();
					break;
			}
		};
		
		const table    = _l(tableId)._replace(null)._classes("w3-table-all");
		const includes = "name role login projects teams createdAt";
		table._showData(people, null, includes, onShow, null, true, {createdAt : {input : "date"}});
		
	}, []);
	
	return <><div id={tableId}></div></>;
};

export default ListPeople;