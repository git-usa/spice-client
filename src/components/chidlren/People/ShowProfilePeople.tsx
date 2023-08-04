import lady, {_lady} from "../../../modules/scripts/_lady.js";
import type {TypeProfilePeople} from "../../../modules/interfaces/TypeProfile";
import {lat_cloneObject} from "../../../modules/scripts/labject";

const ShowProfilePeople = (props : {tabId : string, profile : TypeProfilePeople}) => {
	
	const tabId : string = props.tabId;
	const profile : any  = lat_cloneObject(props.profile);
	if(!profile) throw Error("No People Profile Received");
	
	profile.teams    = props.profile.teams.length;
	profile.projects = props.profile.projects.length;
	
	const onShow = (c : typeof _lady, h : string, v : any, i : any, carry : any) => {
		if(!carry) return;
		c._capitalWords();
	};
	
	const schema = {
		createdAt : {input : "date"}
	};
	
	lady(tabId)
		._replace(null)
		._showObject(profile, null, "name role status projects teams super creator createdAt", onShow, null, schema, false, true)
		._classes("w3-table w3-table-all");
};

export default ShowProfilePeople;