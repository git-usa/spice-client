import React from "react";
import ListRender from "./ListRender";
import {_lady} from "../../../modules/scripts/_lady";
import {lat_copyArray, lat_mongoDate} from "../../../modules/scripts/labject";
import {TypeListBrief, TypeListLog} from "../../../modules/interfaces/TypeList";

const ListLogsBrief = ({list, cbComponent, title = "Projects List", id = "projectTab", isBrief = true} : TypeListBrief & {isBrief? : boolean}) => {
	
	const logList = lat_copyArray(list) as unknown as (TypeListLog & {created : string})[];
	
	const includes = `${isBrief ? "creator document" : ""} action path status created`;
	const onShow   = (c : typeof _lady, h : string, v : any, i : TypeListLog, carry : any) => {
		if(!carry) return;
		if(h === "creator"){
			c._replace(i.creator.name);
		}
		
		switch(h){
			case "creator":
				const jax = {of : "people", by : i.creator.id};
				c._classes("w3-text-blue la-bold")
				 ._click(() => cbComponent("profile", jax));
		}
		c._capitalWords();
	};
	
	logList.forEach(item => {
		const date   = lat_mongoDate(item.createdAt.toString(), false);
		item.created = date.dayMonthFormat + ", " + date.time;
	});
	
	return <div className={"w3-padding-hor-24 la-container"}>
		<h4 className={`la-capital la-bold w3-padding la-l la-s w3-khaki`}>{title}</h4>
		<ListRender list={logList} id={id} onShow={onShow} includes={includes} carry={true}/>
	</div>;
	
};

export default ListLogsBrief;