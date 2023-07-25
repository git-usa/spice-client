import {useEffect, useState} from "react";
import lady from "../../../modules/scripts/_lady";
import type {HandleComponentJax} from "../../../modules/interfaces/TypeJax";
import type {TypeProfileTeam} from "../../../modules/interfaces/TypeProfile";
import {lat_cloneObject} from "../../../modules/scripts/labject";

const ProfileTeam = (props : { team : TypeProfileTeam, cbHandler : HandleComponentJax }) => {
	
	const team      = lat_cloneObject(props.team);
	const cbHandler = props.cbHandler;
	
	const [refresh, setRefresh] = useState();
	
	useEffect(() => {
		if(!team) return;
		
		const onShow = (c, h, v, i : TypeProfileTeam, carry) => {
			if(!carry) return;
			c._capitalWords();
			
			switch(h){
				case "creator":
				case "manager":
				case "project":
					c._classes("w3-text-blue la-underline-hover la-bold");
					break;
			}
			
			switch(h){
				case "creator":
					c._click(() => cbHandler("profile", {of : "people", by : i.creatorId}));
					break;
				case "manager":
					c._click(() => cbHandler("profile", {of : "people", by : i.managerId}));
					break;
				case "project":
					c._click(() => cbHandler("profile", {of : "project", by : i.projectId}));
					break;
			}
		};
		
		const schema = {
			createdAt : {input : "date"}
		};
		lady(profileTabId)
			._replace()
			._showObject(team, null, "name category manager project creator createdAt brief", onShow, null, schema, true, true)
			._classes("w3-table w3-table-all");
	}, [team, refresh]);
	
	if(!team) return <></>;
	
	team.creatorId = team.creator._id;
	team.managerId = team.manager._id;
	team.projectId = team.project._id;
	team.creator   = team.creator.name;
	team.manager   = team.manager.name;
	team.project   = team.project.name;
	
	const profileTabId = "profileTab";
	const profileTab   = <>
		<div className={"w3-padding-hor-24 la-container"}>
			<h4 className={"l-capital la-bold w3-blue w3-padding la-l la-s"}>Team Profile</h4>
			<div id={profileTabId} className={"w3-responsive la-l la-s"}></div>
		</div>
	</>;
	
	return <>
		<div>
			{profileTab}
		</div>
	</>;
};

export default ProfileTeam;