import {useEffect} from "react";
import ResultBar from "../../singles/ResultBar";
import lady from "../../../modules/scripts/_lady";
import {lat_cloneObject, lat_isValidArray, lat_mapToArray} from "../../../modules/scripts/labject";
import type {TypeProject} from "../../../modules/interfaces/TypeProject";
import type {TypeTeamProject} from "../../../modules/interfaces/TypeTeam";
import type {HandleComponentJax} from "../../../modules/interfaces/TypeJax";
import type {TypeProfilePeople} from "../../../modules/interfaces/TypeProfile";

const showProfile = (tabId : string, profile : TypeProfilePeople) => {
	const onShow = (c, h, v, i, carry) => {
		if(!carry) return;
		c._capitalWords();
	};
	
	const schema = {
		createdAt : {input : "date"}
	};
	
	profile.teams    = profile.teams.length;
	profile.projects = profile.projects.length;
	
	lady(tabId)
		._replace()
		._showObject(profile, null, "name role status projects teams super creator createdAt", onShow, null, schema, false, true)
		._classes("w3-table w3-table-all");
};

const showData = (tabId : string, data : TypeProject[] | TypeTeamProject[], cbHandler : HandleComponentJax, dataType) => {
	const tab = lady(tabId)._replace();
	if(!lat_isValidArray(data)){
		tab._error(`No ${dataType} Found`);
		return;
	}
	
	const type = (() => {
		switch(dataType){
			case "team":
				return {
					includes : "name category status brief createdAt project"
				};
			case "project":
				return {
					includes : "name category status brief createdAt"
				};
			case "people":
				return {
					includes : "name role status totalProjects totalTeams super creator createdAt"
				};
			default:
				return null;
		}
	})();
	
	const onShow = (c, h, v, i : TypeProject | TypeTeamProject, carry) => {
		if(!carry) return;
		c._capitalWords();
		(h === "name" || h === "project")
		&& c._classes("w3-text-blue la-underline-hover la-bold")
		&& c._click(() => {
			cbHandler("profile",
			          {
				          of : h === "project" ? "project" : dataType,
				          by : h === "project" ? i.projectid : i._id
			          }
			);
		});
	};
	
	tab._showData(data, null, type.includes, onShow, null, dataType !== "people", {createdAt : {input : "date"}}, false, true)
	   ._classes("w3-table w3-table-all");
};

const ProfilePeople = (props : { profile : TypeProfilePeople, cbHandler : HandleComponentJax }) => {
	const profile = props.profile;
	
	useEffect(() => {
		if(!profile) return;
		showProfile(tabs.profile.id, lat_cloneObject(profile));
		showData(tabs.team.id, teams, cbHandler, "team");
		showData(tabs.project.id, projects, cbHandler, "project");
	}, [profile]);
	
	if(!profile) return <ResultBar text={"No Profile Found to Show"} type={"error"}/>;
	
	const cbHandler = props.cbHandler;
	const projects  = profile.projects;
	const teams     = profile.teams.map(team => ({...team, project : team.project.name, projectid : team.project._id}));
	
	console.info(teams);
	
	const tabs = {
		profile : {
			id      : "profileTab",
			classes : "w3-blue",
			text    : "Personal Profile"
		},
		project : {
			id      : "projectTab",
			classes : "w3-khaki",
			text    : "Projects Managing"
		},
		team    : {
			id      : "teamTab",
			classes : "w3-blue-gray",
			text    : "Teams Managing"
		}
	};
	
	return <>
		{
			lat_mapToArray(tabs, (k, o) => {
				return <div className={"w3-padding-hor-24 la-container"}>
					<h4 className={`la-capital la-bold w3-padding la-l la-s ${o.classes}`}>{o.text}</h4>
					<div className={"w3-responsive la-l la-s"} id={o.id}></div>
				</div>;
			})
		}
	</>;
};

export default ProfilePeople;