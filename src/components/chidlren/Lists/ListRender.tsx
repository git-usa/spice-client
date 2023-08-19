import React, {useEffect} from "react";
import _l from "../../../modules/scripts/_lady";
import {TypeRender} from "../../../modules/interfaces/TypeAll";

interface Type extends TypeRender{
	list ?: any[];
}

const ListRender = ({id = "listTab", list, includes, onShow, carry = true} : Type) => {
	useEffect(() => {
		const tab = _l(id)._replace("");
		if(!list || list.length === 0){
			tab._error("No Record Found")._classes("la-shrink");
			return;
		}
		tab._showData(list, null, includes, onShow, null, true,
		              {createdAt : {input : "date"}}, false, carry
		)._classes("w3-table-all");
	}, [list, id, includes, onShow, carry]);
	
	return <>
		<div className={"w3-responsive la-l la-s"} id={id}></div>
	</>;
};

export default ListRender;