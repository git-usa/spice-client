import React from "react";
import ProfileRender from "./ProfileRender";
import ListRender from "../Lists/ListRender";
import {_lady} from "../../../modules/scripts/_lady";
import {TypeTeam} from "../../../modules/interfaces/TypeTeam";
import {lat_isValidObject} from "../../../modules/scripts/labject";
import {HandleComponentJax} from "../../../modules/interfaces/TypeJax";
import {TypeProfile, TypeProfileProject} from "../../../modules/interfaces/TypeProfile";

interface Type{
	profile : TypeProfileProject;
	cbHandler : HandleComponentJax;
}

const ProfileProject = ({profile, cbHandler} : Type) => {
	const onShow = (cell : typeof _lady, head : string, value : any, item : TypeProfile | TypeTeam, carry : any) => {
		if(!carry) return;
		
		let profileId : string | undefined = undefined;
		
		switch(head){
			case "teams":
				cell._replace(profile.teams.length);
				break;
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
			case "name":
				switch(carry){
					case "teams":
						profileId = (item as TypeTeam).id;
						break;
				}
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
			<ProfileRender onShow={onShow} profile={profile.profile} includes={"name status teams creator manager createdAt brief"} carry={"project"}/>
		</div>
		<div className={"w3-padding-hor-12"}>
			<h3 className={"w3-khaki w3-border w3-padding la-noMargin la-noBorder"}>Teams Working</h3>
			<ListRender id={"projectListTab"} list={profile.teams} includes={"name status createdAt brief"} onShow={onShow} carry={"teams"}/>
		</div>
	</>;
};

export default ProfileProject;