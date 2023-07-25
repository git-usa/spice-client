import {lat_mapToArray} from "../../modules/scripts/labject";
import type {HandleComponentJax} from "../../modules/interfaces/TypeJax";

export const navGroups = {
	people  : {
		create : {text : "create", super : true},
		// edit   : {text : "edit", super : true},
		list : {text : "my people"}
	},
	project : {
		create : {text : "create", super : true},
		// edit   : {text : "edit", super : true},
		list : {text : "my projects"}
	},
	team    : {
		create : {text : "create"},
		// edit   : {text : "edit"},
		list : {text : "my teams"}
	},
	message : {
		list : {text : "my messages"}
	}
};

/**
 * Component to Show App Action Bar After Login
 * @returns {JSX.Element}
 * @constructor
 * @param props
 */
const AppActionBar = (props : { cbComponent : HandleComponentJax, isSuper : boolean }) => {
	
	const isSuper     = props.isSuper;
	const cbComponent = props.cbComponent;
	
	/**
	 * Process Each Item of Nav Groups and return array of Components to show on Action Bar
	 * @type {[]}
	 */
	const bar = lat_mapToArray(navGroups, (group, actions) => {
		return <div key={`appActionBarGroup${group}`} className={"w3-dropdown-hover"}>
			{/* Show Caret/Some Sign Next to group as List Title */}
			<button className={"w3-button la-capital"}>{group}
				<i className={"la-caret-down-after"} style={{fontSize : "12px"}}></i>
			</button>
			
			{/* Dropdown List of Actions for Each Group */}
			<div className={"w3-dropdown-content w3-bar-block w3-card-4"}>
				{
					/**
					 * Process Each Item of Actions and return array of Components to show in Dropdown List
					 */
					lat_mapToArray(actions, (action, obj) => {
						if(obj.super && !isSuper) return;
						return <a href={"#"}
						          key={`appActionBarLink${action}`}
						          onClick={() => cbComponent(action, {of : group})}
						          className={"w3-bar-item w3-button la-capital"}>{obj.text}</a>;
					})
				}
			</div>
		</div>;
	});
	
	/* Action Bar */
	return <>
		<div className={"w3-bar w3-light-gray"}>{bar}</div>
	</>;
	
};

export default AppActionBar;