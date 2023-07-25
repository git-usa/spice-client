import {useEffect} from "react";
import lady from "../../../modules/scripts/_lady";
import type {HandleComponentJax} from "../../../modules/interfaces/TypeJax";
import type {TypeProfileProject, TypeProfileTeam} from "../../../modules/interfaces/TypeProfile";
import {lat_cloneObject, lat_isValidArray} from "../../../modules/scripts/labject";

const showProfile = (tabId : string, project : TypeProfileProject, cbHandler : HandleComponentJax) => {
	const onShow = (c, h, v, i : TypeProfileProject, carry) => {
		if(!carry) return;
		c._capitalWords();
		
		switch(h){
			case "creator":
			case "manager":
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
		}
	};
	
	const schema = {
		createdAt : {input : "date"}
	};
	lady(tabId)
		._replace()
		._showObject(project, null, "name category manager creator createdAt brief", onShow, null, schema, true, true)
		._classes("w3-table w3-table-all");
};

const showTeams = (tabId : string, teams : TypeProfileTeam[], cbHandler : HandleComponentJax) => {
	const tab = lady(tabId)._replace();
	
	if(!lat_isValidArray(teams)){
		tab._error("No Team Found");
		return;
	}
	
	const mod = () => teams.map(team => {
		const t     = lat_cloneObject(team);
		t.managerId = t.manager._id;
		t.manager   = t.manager.name;
		return t;
	});
	
	tab._showData(mod(), null, "name category manager status brief createdAt", (c, h, v, i : TypeProfileTeam, carry) => {
		if(!carry) return;
		c._capitalWords();
		
		switch(h){
			case "name":
			case "creator":
			case "manager":
				c._classes("w3-text-blue la-underline-hover la-bold");
				break;
		}
		
		switch(h){
			case "name":
				c._click(() => cbHandler("profile", {of : "team", by : i._id}));
				break;
			case "creator":
				c._click(() => cbHandler("profile", {of : "people", by : i.creatorId}));
				break;
			case "manager":
				c._click(() => cbHandler("profile", {of : "people", by : i.managerId}));
				break;
		}
		
	}, null, true, {createdAt : {input : "date"}}, false, true)._classes("w3-table w3-table-all");
	
};

const ProfileProject = (props : { project : TypeProfileProject, cbHandler : HandleComponentJax }) => {
	
	const cbHandler = props.cbHandler;
	const project   = lat_cloneObject(props.project);
	
	useEffect(() => {
		if(!project) return;
		showTeams(teamTabId, teams, cbHandler);
		showProfile(profileTabId, project, cbHandler);
	}, [project]);
	
	if(!project) return <></>;
	
	project.creatorId = project.creator._id;
	project.managerId = project.manager._id;
	project.creator   = project.creator.name;
	project.manager   = project.manager.name;
	
	const teams = project.teams;
	
	const profileTabId = "profileTab";
	const profileTab   = <>
		<div className={"w3-padding-hor-24 la-container"}>
			<h4 className={"l-capital la-bold w3-blue w3-padding la-l la-s"}>Project Profile</h4>
			<div id={profileTabId} className={"w3-responsive la-l la-s"}></div>
		</div>
	</>;
	
	const teamTabId = "teamTab";
	const teamTab   = <>
		<div className={"w3-padding-hor-24 la-container"}>
			<h4 className={"l-capital la-bold w3-green w3-padding la-l la-s"}>Teams Working</h4>
			<div id={teamTabId} className={"w3-responsive la-l la-s"}></div>
		</div>
	</>;
	
	return <>
		{profileTab}
		{teamTab}
	</>;
};

export default ProfileProject;