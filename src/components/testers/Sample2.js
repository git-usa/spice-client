import {useEffect, useState} from "react";
import ResultBar from "../singles/ResultBar";
import type TypeResult from "../../modules/interfaces/TypeResult";

const Sample2 = (props : { value : any }) => {
	const [result : TypeResult, setResult] = useState({text : "Hello", type : "info"});
	useEffect(() => {
		console.info("Rendered Sample2");
		setResult({text : "Rendered Sample2", type : "pass"});
	}, []);
	
	const resultBar = <ResultBar text={result.text} type={result.type}/>;
	
	return <>
		<div className={"w3-white"}>
			<h3>
				This is sample2 for {props.value}
			</h3>
			<div>
				{resultBar}
			</div>
		</div>
	</>;
};

export default Sample2;