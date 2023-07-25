import type TypeResult from "../../modules/interfaces/TypeResult";

const ResultBar = (props: TypeResult) => {
	// console.info("RESULT BAR RENDERED");
	
	const colorClass = (() => {
		switch (props.type && props.type.toLowerCase()) {
			case "error":
				return "la-error";
			case "info":
				return "la-info";
			case "pass":
				return "la-pass";
			default:
				return "w3-white";
		}
	})();
	
	return <div id={props.id} className={`la-shrink ${colorClass}`}>{props.text}</div>;
};

export default ResultBar;