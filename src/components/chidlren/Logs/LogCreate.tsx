import React from "react";
import FormLog from "../../forms/FormLog";

const LogCreate = () => {
	
	const onEnter = () => {
		console.info("ENTERED");
	};
	const onClick = () => {};
	
	return <>
		<div className={"w3-border w3-padding"}>
			<FormLog onEnter={onEnter} onClick={onClick}/>
		</div>
	</>;
};

export default LogCreate;