import React from "react";
import {TypeProfileMin} from "../../modules/interfaces/TypeAll";
import Blank from "../parents/Blank";

interface TypeRenderList{
	id : string,
	title? : string,
	enable? : boolean;
	required? : boolean;
	addClass? : string;
	list? : TypeProfileMin[],
	onChange? : (listId : string) => void
}

const RenderList = ({id, title, list, onChange, addClass = "la-l2 la-s", required, enable} : TypeRenderList) => {
	if(!list) return <Blank/>;
	
	const renderedList = [
		<option key={`list${id}OptionNoId`} disabled={true} value={undefined}>Select {title}</option>,
		...list.map(item => {
			return <option key={`list${id}${title}${item.id}`} value={item.id}>{item.name}</option>;
		})
	];
	
	return <>
		<div className={addClass}>
			{title ? <h4>{title}</h4> : <></>}
			<select required={required} disabled={!enable} id={id} defaultValue={`Select ${title}`} className={"w3-input w3-khaki la-capital"}
			        onChange={() => onChange && onChange(id)}>{renderedList}</select>
		</div>
	</>;
};

export default RenderList;