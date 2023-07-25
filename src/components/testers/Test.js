import {useEffect, useState} from "react";
import useTestComponent from "./useTestComponent";

const components = [];
const Test       = () => {
	
	const [value, setValue]             = useState({link : "first", data : null});
	const [componentId, setComponentId] = useState("first");
	
	console.info("RENDERED");
	
	const [mainComp, setMainComp] = useState(useTestComponent(componentId, value));
	
	let changeComponent = (id) => {
		if(id === "back" && components.length > 0){
			console.info(`POPPING COMPONENT OUT FOR ${id}`);
			setMainComp(components.pop());
			return;
		}
		console.info(`SETTING COMPONENT FOR ${id}`);
		setValue({link : id, data : `Value for ${id}`});
	};
	
	useEffect(() => {
	
	}, []);
	
	return <>
		<div className={"w3-white w3-padding"}>
			{useTestComponent(value.link, value.data)}
			<p>
				<button onClick={() => changeComponent("sample1")}>Sample 1</button>
				<button onClick={() => changeComponent("sample2")}>Sample 2</button>
				<button onClick={() => changeComponent("sample3")}>Sample 3</button>
				<button onClick={() => changeComponent("back")}>Back</button>
			</p>
		</div>
	</>;
	
};

export default Test;