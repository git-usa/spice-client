import type TypeResult from "../../modules/interfaces/TypeResult";

const colorClass = (type) => {
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

const ResultBar = (props : TypeResult) => {
	// console.info("RESULT BAR RENDERED");
	// console.count("RESULT BAR RENDERED");
	
	return <div id={props.id} className={`la-shrink ${colorClass(props.type)}`}>{props.text}</div>;
};

export const staticResultBar = (text, type) => {
	return `<div class="la-shrink ${colorClass(type)}">${text}</div>`;
};

export default ResultBar;