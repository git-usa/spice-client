import React from "react";
import {_lady} from "../../../modules/scripts/_lady";

export interface TypeActionNode{
	text : string;
	onClick : () => void;
}

interface TypeAction{
	node : typeof _lady;
	actions : TypeActionNode[];
	
}

const AddActions = ({node, actions} : TypeAction) => {
	const bar = node._div();
	
	actions.forEach(action => {
		bar._createTag("button", action.text)
		   ._capitalWords()
		   ._click(action.onClick)
		   ._classes("w3-button w3-khaki la-btn w3-ripple");
	});
};

export default AddActions;