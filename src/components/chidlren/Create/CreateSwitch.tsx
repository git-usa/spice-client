import React from "react";
import {WrapComp} from "../../parents/WrapError";
import MemberCreate from "../Members/MemberCreate";
import TaskCreate from "../Tasks/TaskCreate";

interface Type{
	of : string;
}

const CreateSwitch = ({of} : Type) => {
	switch(of){
		case "member":
			return (<WrapComp msg={"Member Create"} component={<MemberCreate/>}/>);
		case "task":
			return (<WrapComp msg={"Task Create"} component={<TaskCreate/>}/>);
		default:
			throw Error(`Invalid Create Component Request ${of}`);
	}
};

export default CreateSwitch;