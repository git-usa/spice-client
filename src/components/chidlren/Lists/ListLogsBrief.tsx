import React from "react";
import ListRender from "./ListRender";
import {_lady} from "../../../modules/scripts/_lady";
import {lat_copyArray, lat_mongoDate} from "../../../modules/scripts/labject";
import {TypeListBrief, TypeListLogBrief} from "../../../modules/interfaces/TypeList";

const ListLogsBrief = ({list, cbComponent, title = "Logs List", id = "logTab", isBrief = true} : TypeListBrief & {isBrief? : boolean}) => {
	
	const logList = lat_copyArray(list) as unknown as (TypeListLogBrief & {created : string})[];
	
	const includes = `${isBrief ? "creator document" : ""} action path status created brief`;
	const onShow   = (c : typeof _lady, i : TypeListLogBrief, carry : any, h : string) => {
		if(!h) return;
		
		switch(h){
			case "creator":
				const jax = {of : "people", by : i.creator.id};
				c._replace(i.creator.name);
				c._classes("w3-text-blue la-bold")
				 ._click(() => cbComponent("profile", jax));
				break;
			case "document":
				c._replace(i.document.name || i.document.title);
				break;
		}
		c._capitalWords();
	};
	
	logList.forEach(item => {
		const date   = lat_mongoDate(item.createdAt.toString(), false);
		item.created = date.dayMonthFormat + ", " + date.time;
	});
	
	return <div className={"w3-padding-hor-24 la-container"}>
		<h4 className={`la-capital la-bold w3-padding la-l la-s w3-khaki`}>{title}</h4>
		<div className={"la-container"}>
			<div>
				<h3>Filters : </h3>
			</div>
		</div>
		<ListRender list={logList} id={id} onShow={onShow} includes={includes} carry={true}/>
	</div>;
	
};

export default ListLogsBrief;