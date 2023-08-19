import React from "react";
import {TypeForm} from "../../modules/interfaces/TypeForm";

const FormLog = (props : TypeForm) => {
	
	const onClick = props.onClick;
	const onEnter = (e : React.KeyboardEvent<HTMLInputElement>) => {
		if(e.key === "Enter" || e.keyCode === 13)
			props.onEnter(e);
	};
	
	return <>
		<datalist id={"actions"}>
			{"logged, authenticated, uploaded, updated, created".split(",").map(item => <option>{item.trim()}</option>)}
		</datalist>
		<div className={"la-container"}>
			<div className={"la-l2 la-s w3-padding-right"}>
				<input type={"text"} className={"w3-input la-input"} placeholder={"Action"} id={"action"} onKeyDown={onEnter} list={"actions"}/>
			</div>
			<div className={"la-l2 la-s w3-padding-right"}>
				<input type={"text"} className={"w3-input la-input"} placeholder={"Brief"} id={"brief"} onKeyDown={onEnter}/>
			</div>
		</div>
	</>;
};

export default FormLog;