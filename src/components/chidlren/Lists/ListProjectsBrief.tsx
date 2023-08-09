import React, {useEffect} from "react";
import _l, {_lady} from "../../../modules/scripts/_lady";
import {TypeProject} from "../../../modules/interfaces/TypeProject";

interface Type{
	list : TypeProject[];
	title : string;
	id : string;
}

const ListProjectsBrief = (list : TypeProject[], title = "Projects Managing", id = "projectTab") => {
	
	const onShow = (c : typeof _lady, h : string, v : any, i : TypeProject, carry : any) => {
	
	};
	
	useEffect(() => {
		const tab = _l(id);
		
		tab._showData(list, null, "name category status brief createdAt", onShow, null, true, {createdAt : {input : "date"}});
		
	}, [list, id, title]);
	
	return <div className={"w3-padding-hor-24 la-container"}>
		<h4 className={`la-capital la-bold w3-padding la-l la-s w3-khaki`}>{title}</h4>
		<div className={"w3-responsive la-l la-s"} id={id}></div>
	</div>;
	
};

export default ListProjectsBrief;