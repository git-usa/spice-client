import React from "react";
import ProfileRender from "./ProfileRender";
import {_lady} from "../../../modules/scripts/_lady";
import {lat_isValidObject} from "../../../modules/scripts/labject";
import {HandleComponentJax} from "../../../modules/interfaces/TypeJax";
import {TypeProfile, TypeProfileTeam} from "../../../modules/interfaces/TypeProfile";

interface Type{
	profile : TypeProfileTeam;
	cbHandler : HandleComponentJax;
}

const ProfileTeam = ({profile, cbHandler} : Type) => {
	const onShow = (cell : typeof _lady, head : string, value : any, item : TypeProfile, carry : any) => {
		if(!carry) return;
		
		let profileId : string | undefined = undefined;
		
		switch(head){
			case "creator":
				if(!lat_isValidObject(profile.creator)) break;
				carry     = "people";
				profileId = profile.creator.id;
				cell._replace(profile.creator.name);
				break;
			case "manager":
				if(!lat_isValidObject(profile.manager)) break;
				carry     = "people";
				profileId = profile.manager.id;
				cell._replace(profile.manager.name);
				break;
			case "project":
				if(!lat_isValidObject(profile.project)) break;
				carry     = "project";
				profileId = profile.project.id;
				cell._replace(profile.project.name);
				break;
		}
		
		if(profileId){
			cell._classes("w3-text-blue la-bold")
			    ._click(() => cbHandler("profile", {of : carry, by : profileId}));
		}
		
		cell._capitalWords();
	};
	
	return <>
		<div className={"w3-padding-hor-12"}>
			<h3 className={"w3-green w3-border w3-padding la-noMargin la-noBorder"}>Profile</h3>
			<ProfileRender onShow={onShow} profile={profile.profile} includes={"name status creator manager project createdAt brief"} carry={"project"}/>
		</div>
	</>;
};

export default ProfileTeam;