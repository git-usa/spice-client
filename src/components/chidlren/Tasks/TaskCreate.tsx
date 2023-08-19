import Blank from "../../parents/Blank";
import React, {useEffect, useState} from "react";

const TaskCreate = () => {
	
	const [comp, setComp]     = useState(<Blank/>);
	const [reload, setReload] = useState(false);
	
	useEffect(() => {
		console.count("Reload Form");
	}, [reload]);
	
	const doReload = () => setReload(!reload);
	
	return <>
		<div><h3>Task Create</h3></div>
		<div className={"la-right"}>
			<button className={"w3-button w3-khaki w3-ripple la-btn"} onClick={doReload}>Reload Form</button>
		</div>
		{comp}
	</>;
	
};

export default TaskCreate;