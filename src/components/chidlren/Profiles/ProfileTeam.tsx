import React from "react";
import ProfileRender from "./ProfileRender";
import {_lady} from "../../../modules/scripts/_lady";
import {lat_isValidObject} from "../../../modules/scripts/labject";
import {HandleComponentJax} from "../../../modules/interfaces/TypeJax";
import {TypeProfile, TypeProfileTeam} from "../../../modules/interfaces/TypeProfile";
import ListRender from "../Lists/ListRender";

interface Type{
	profile : TypeProfileTeam;
	cbHandler : HandleComponentJax;
}

const ProfileTeam = ({profile, cbHandler} : Type) => {
	const onShow = (cell : typeof _lady, item : TypeProfile, carry : any, h : string, v : any) => {
		if(!h) return;
		
		let profileId : string | undefined = undefined;
		
		const process = (value : any, item : string, id : string, replace : string) => {
			if(!lat_isValidObject(value)) return false;
			carry     = item;
			profileId = id;
			cell._replace(replace);
			return true;
		};
		
		switch(h){
			case "name":
				if(carry !== "member") break;
				process(item, "people", item.id, item.name);
				break;
			case "creator":
				process(profile.creator, "people", profile.creator?.id, profile.creator?.name);
				break;
			case "manager":
				process(profile.manager, "people", profile?.manager.id, profile.manager?.name);
				break;
			case "project":
				process(profile.project, "project", profile?.project.id, profile.project?.name);
				break;
			case "members":
				cell._replace(v);
				break;
		}
		
		if(profileId){
			cell._classes("w3-text-blue la-bold")
			    ._click(() => cbHandler("profile", {of : carry, by : profileId}));
		}
		
		cell._capitalWords();
	};
	
	profile.profile.members = (profile.members && profile.members.length) || 0;
	
	return <>
		<div className={"w3-padding-hor-12"}>
			<h3 className={"w3-green w3-border w3-padding la-noMargin la-noBorder"}>Profile</h3>
			<ProfileRender onShow={onShow} profile={profile.profile} includes={"name status manager members project createdAt brief"} carry={"project"}/>
		</div>
		<div className={"w3-padding-hor-12"}>
			<h3 className={"w3-khaki w3-border w3-padding la-noMargin la-noBorder"}>Team Members</h3>
			<ListRender id={"teamMembersTab"} list={profile.members} includes={"name role status createdAt"} onShow={onShow} carry={"member"}/>
		</div>
	</>;
};

export default ProfileTeam;