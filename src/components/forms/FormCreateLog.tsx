import React from "react";
import {CliInput} from "../singles/CliInputs";
import type {TypeForm} from "../../modules/interfaces/TypeForm";
import {lat_mapToArray} from "../../modules/scripts/labject.js";

const FormCreateLog = (props : TypeForm) => {
	const onClick = props.onClick;
	const onEnter = props.onEnter;
	
	const components = lat_mapToArray(
		{
			action : <CliInput id={"action"} classes={"la-l la-s"} type={"text"} placeholder={"Action"} onEnter={onEnter}/>,
			brief  : <CliInput id={"brief"} classes={"la-l la-s"} type={"text"} placeholder={"Brief"} onEnter={onEnter}/>
		},
		(key, obj) => {
			return <div key={`compFormCreateLog_${key}`} className={"la-l2 la-s w3-padding-right"}>
				<label className={"la-l la-s"}><h5 className={"la-bold la-capital"}>{key}</h5></label>
				{obj}
			</div>;
		}
	);
	
	return <>
		<div className={"la-container flex-center-vertical"}>
			{components}
			<div className={"la-l1 la-"}>
				<div className={"la-l la-s"}><h5>&nbsp;</h5></div>
				<div className={"la-l la-s"}>
					<button onClick={onClick} className={"w3-button w3-ripple w3-khaki la-btn"}>Create</button>
				</div>
			</div>
		</div>
	</>;
};

export default FormCreateLog;