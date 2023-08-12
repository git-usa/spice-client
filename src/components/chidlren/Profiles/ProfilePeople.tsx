import {TypeProfile, TypeProfilePeople} from "../../../modules/interfaces/TypeProfile";
import {HandleComponentJax} from "../../../modules/interfaces/TypeJax";
import React from "react";
import ProfileRender from "./ProfileRender";
import {_lady} from "../../../modules/scripts/_lady";
import {lat_isValidObject} from "../../../modules/scripts/labject";
import ListRender from "../Lists/ListRender";
import {TypeProject} from "../../../modules/interfaces/TypeProject";
import {TypeTeam} from "../../../modules/interfaces/TypeTeam";

interface Type{
	profile : TypeProfilePeople;
	cbHandler : HandleComponentJax;
}

const ProfilePeople = ({profile, cbHandler} : Type) => {
	console.info(profile);
	const onShow = (cell : typeof _lady, head : string, value : any, item : TypeProfile | TypeProject, carry : any) => {
		if(!carry) return;
		
		let profileId : string | undefined = undefined;
		
		switch(head){
			case "projects":
				cell._replace(profile.projects.length);
				break;
			case "teams":
				cell._replace(profile.teams.length);
				break;
			case "logs":
				cell._replace(profile.logs.length);
				break;
			case "creator":
				if(!lat_isValidObject(profile.creator)) break;
				carry     = "people";
				profileId = profile.creator.id;
				cell._replace(profile.creator.name);
				break;
			case "name":
				switch(carry){
					case "projects":
					case "teams":
						profileId = (item as TypeProject | TypeTeam).id;
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
			<ProfileRender onShow={onShow} profile={profile.profile} includes={"name status role super projects teams creator createdAt"} carry={"people"}/>
		</div>
		<div className={"w3-padding-hor-12"}>
			<h3 className={"w3-khaki w3-border w3-padding la-noMargin la-noBorder"}>Projects Managing</h3>
			<ListRender id={"projectListTab"} list={profile.projects} includes={"name status createdAt brief"} onShow={onShow} carry={"projects"}/>
		</div>
		<div className={"w3-padding-hor-12"}>
			<h3 className={"w3-blue w3-border w3-padding la-noMargin la-noBorder"}>Teams Managing</h3>
			<ListRender id={"teamListTab"} list={profile.teams} includes={"name status createdAt brief"} onShow={onShow} carry={"teams"}/>
		</div>
	</>;
};

export default ProfilePeople;