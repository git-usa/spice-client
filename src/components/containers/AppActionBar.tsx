import React from "react";
import {lat_mapToArray} from "../../modules/scripts/labject.js";
import {ActionGroups, TypeAction, TypeActionOption} from "../../modules/interfaces/TypeAction";
import type {HandleComponentJax} from "../../modules/interfaces/TypeJax";

const ShowHead = (props : {head : string}) => <>
	<button className={"w3-button la-capital"}>{props.head}
		<i className={"la-caret-down-after"} style={{fontSize : "12px"}}></i>
	</button>
</>;

const ShowItem = (props : {action : string, group : string, text : string, cbComponent : HandleComponentJax}) => <>
	<a href={"#"}
	   key={`appActionBarLink${props.action}`}
	   onClick={() => props.cbComponent(props.action, {of : props.group, by : null})}
	   className={"w3-bar-item w3-button la-capital"}>{props.text}</a>
</>;

const ToBar = (props : {group : string, actions : TypeAction | undefined, isSuper : boolean, cbComponent : HandleComponentJax}) => {
	return <div key={`appActionBarGroup${props.group}`} className={"w3-dropdown-hover"}>
		{/* Show Caret/Some Sign Next to group as List Title */}
		{<ShowHead head={props.group}/>}
		
		{/* Dropdown List of Actions for Each Group */}
		<div className={"w3-dropdown-content w3-bar-block w3-card-4"}>
			{
				/**
				 * Process Each Item of Actions and return array of Components to show in Dropdown List
				 */
				lat_mapToArray(props.actions, (action : string, obj : TypeActionOption) => {
					if(obj.super && !props.isSuper) return;
					return <ShowItem key={`${props.group + action}item`} action={action} group={props.group} text={obj.text} cbComponent={props.cbComponent}/>;
				})
			}
		</div>
	</div>;
};

/**
 * Component to Show App Action Bar After Login
 * @returns {JSX.Element}
 * @constructor
 * @param props
 */
const AppActionBar = (props : {cbComponent : HandleComponentJax, isSuper? : boolean}) => {
	
	const isSuper     = props.isSuper || false;
	const cbComponent = props.cbComponent;
	
	/**
	 *
	 * @param {string} group
	 * @param {TypeAction | undefined} actions
	 * @return {JSX.Element}
	 */
	const toBar = (group : string, actions : TypeAction | undefined) =>
		<ToBar key={`${group}BarItem`} group={group} actions={actions} isSuper={isSuper} cbComponent={cbComponent}/>;
	
	/**
	 * Process Each Item of Nav Groups and return array of Components to show on Action Bar
	 * @return {JSX.Element[]}
	 */
	const bar = lat_mapToArray(ActionGroups, toBar);
	
	/* Action Bar */
	return <>
		<div className={"w3-bar w3-light-gray"}>{bar}</div>
	</>;
	
};

export default AppActionBar;