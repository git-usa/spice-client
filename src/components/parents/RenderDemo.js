import ResultBar from "../singles/ResultBar";
import {useEffect, useState} from "react";
import type TypeResult from "../../modules/interfaces/TypeResult";

const ChangeAgain = (cb : (result : TypeResult)=>void) => {
	cb({text : "Message Changed Again", type : "info"});
};
const RenderDemo  = () => {
	
	console.info("RENDER DEMO");
	
	const initial : TypeResult = {text : "Initial Message", type : "info"};
	const [result, setResult]  = useState(initial);
	
	useEffect(() => {
		console.info("RENDER USE EFFECT");
		setResult({text : "Message Changed", type : "info"});
	}, []);
	
	return <>
		<div style={{marginTop : "75px"}}>
			<ResultBar text={result.text} type={result.type}/>
			<button className={"w3-button w3-ripple w3-khaki"} onClick={() => ChangeAgain(setResult)}>Change Message</button>
		</div>
	</>;
};

export default RenderDemo;