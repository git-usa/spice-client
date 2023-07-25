import {useEffect, useState} from "react";
import ResultBar from "../singles/ResultBar";
import type TypeResult from "../../modules/interfaces/TypeResult";

const Sample3 = (props : { value : any }) => {
	const [result : TypeResult, setResult] = useState({text : "Hello", type : "info"});
	useEffect(() => {
		console.info("Rendered Sample3");
		setResult({text : "Rendered Sample3", type : "pass"});
	}, []);
	
	const resultBar = <ResultBar text={result.text} type={result.type}/>;
	
	return <>
		<div className={"w3-white"}>
			<h3>
				This is sample3 for {props.value}
			</h3>
			<div>
				{resultBar}
			</div>
		</div>
	</>;
};

export default Sample3;