import React from "react";
import type TypeResult from "../../modules/interfaces/TypeResult";

const colorClass = (type : string | undefined) => {
	switch(type && type.toLowerCase()){
		case "error":
			return "la-error";
		case "info":
			return "la-info";
		case "pass":
			return "la-pass";
		default:
			return "w3-white";
	}
};

const ResultBar = (props : TypeResult) =>
	<div id={props.id} className={`la-shrink ${colorClass(props.type)}`}>{props.text}</div>;

export const staticResultBar = ({text, type} : TypeResult) => {
	return `<div class="la-shrink ${colorClass(type)}">${text}</div>`;
};

export const showResultBar = (barId : string, {text, type} : TypeResult) => {
	const ele = document.getElementById(barId);
	if(ele) ele.innerHTML = staticResultBar({text, type});
};

export default ResultBar;