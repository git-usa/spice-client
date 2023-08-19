import React from "react";
import {WrapComp} from "../../parents/WrapError";
import MemberCreate from "../Members/MemberCreate";

interface Type{
	of : string;
}

const CreateSwitch = ({of} : Type) => {
	switch(of){
		case "member":
			return (<WrapComp msg={"List People"} component={<MemberCreate/>}/>);
		default:
			throw Error(`Invalid Create Component Request ${of}`);
	}
};

export default CreateSwitch;