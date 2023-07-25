import {useEffect} from "react";
import _l from "../../../modules/scripts/_lady";
import type {TypeResultCb} from "../../../modules/interfaces/TypeResult";
import type {HandleComponentJax} from "../../../modules/interfaces/TypeJax";
import type {TypeListPeople} from "../../../modules/interfaces/TypeList";

const tableId = "peopleTable";

interface Type{
	people : TypeListPeople[];
	cbResult : TypeResultCb;
	cbComponent : HandleComponentJax;
}

const ListPeople = (props : Type) => {
	console.info("SHOW PEOPLE LIST RENDERED");
	
	const people      = props.people;
	const cbResult    = props.cbResult;
	const cbComponent = props.cbComponent;
	
	useEffect(() => {
		if(!people || people.length === 0){
			cbResult({text : "No People Received", type : "error"});
			return;
		}
		
		const onShow = (c, h, v, i) => {
			if(!i) return;
			switch(h){
				case "name":
					c._replace()._tag("a", v)._attributes({href : "#"})
					 ._click(() => cbComponent("profile", {of : "people", by : i._id}))
					 ._capitalWords();
					break;
				case "role":
					c._capitalWords();
					break;
			}
		};
		
		const table = _l(tableId)._replace()._classes("w3-table-all");
		table._showData(people, null, "name role login projects teams createdAt", onShow, null, true, {createdAt : {input : "date"}});
		
	}, []);
	
	return <><div id={tableId}></div></>;
};

export default ListPeople;