import React from "react";
import {useEffect} from "react";
import WrapError from "../../parents/WrapError";
import lady, {_ladEleById, _lady} from "../../../modules/scripts/_lady.js";
import ResultBar, {staticResultBar} from "../../singles/ResultBar";
import type TypeResult from "../../../modules/interfaces/TypeResult";
import type {TypeProject} from "../../../modules/interfaces/TypeProject";
import type {TypeTeam, TypeTeamProject} from "../../../modules/interfaces/TypeTeam";
import type {HandleComponentJax} from "../../../modules/interfaces/TypeJax";
import type {TypeProfilePeople} from "../../../modules/interfaces/TypeProfile";
import {lat_cloneObject, lat_isValidArray, lat_mapToArray} from "../../../modules/scripts/labject.js";
import ShowProfilePeople from "./ShowProfilePeople";
import {TypeLog} from "../../../modules/interfaces/TypeLog";

const resultBarId = "setProfilePeopleResult";

const WrapComp = ({component, fallback} : TypeFallback) => {
	return <WrapError fallback={fallback} component={component}/>;
};

const showResult = ({text, type} : TypeResult) => {
	_ladEleById<HTMLInputElement>(resultBarId).innerHTML = staticResultBar({text, type});
};

const showData = (tabId : string, data : TypeLog[] | TypeProject[] | TypeTeam[], cbHandler : HandleComponentJax, dataType : string) => {
	const tab = lady(tabId)._replace(null);
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
					includes : "name role status totalProjects totalTeams super createdAt"
				};
			case "log":
				return {
					includes : "action path status createdAt"
				};
			default:
				throw Error(`"Invalid Data Type ${dataType} for Tab"`);
		}
	})();
	
	const onShow = (c : typeof _lady, h : string, v : any, i : TypeLog | TypeProject | TypeTeamProject, carry : any) => {
		if(!carry) return;
		c._capitalWords();
		
		const o : any = lat_cloneObject(i);
		
		(h === "name" || h === "project")
		&& c._classes("w3-text-blue la-underline-hover la-bold")
		&& c._click(() => {
			cbHandler("profile",
			          {
				          of : h === "project" ? "project" : dataType,
				          by : h === "project" ? o.projectid : o.id
			          }
			);
		});
	};
	
	tab._showData(data, null, type.includes, onShow, null, dataType !== "people", {createdAt : {input : "date"}}, false, true)
	   ._classes("w3-table w3-table-all");
};

const ProfilePeople = (props : {profile : TypeProfilePeople, cbHandler : HandleComponentJax}) => {
	const profile = props.profile;
	
	console.info(profile);
	
	useEffect(() => {
		if(!profile) return;
		// ShowProfilePeople({tabId : tabs.profile.id, profile : lat_cloneObject(profile)});
		// showData(tabs.log.id, logs, cbHandler, "log");
		// showData(tabs.team.id, teams, cbHandler, "team");
		// showData(tabs.project.id, projects, cbHandler, "project");
	}, [profile]);
	
	if(!profile) return <ResultBar text={"No Profile Found to Show"} type={"error"}/>;
	
	const cbHandler                = props.cbHandler;
	const logs : TypeLog[]         = profile.logs;
	const projects : TypeProject[] = profile.projects;
	const teams : TypeTeam[]       = profile.teams.map(team => ({...team, project : team.project.name, projectid : team.project.id}));
	
	const tabs = {
		log     : {
			id      : "logTab",
			classes : "w3-green",
			text    : "Profile Logs"
		},
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
		<div id={resultBarId}></div>
		{
			/*lat_mapToArray(tabs, (k, o) => {
				return <div key={`profilePeople_${k}`} className={"w3-padding-hor-24 la-container"}>
					<h4 className={`la-capital la-bold w3-padding la-l la-s ${o.classes}`}>{o.text}</h4>
					<div className={"w3-responsive la-l la-s"} id={o.id}></div>
				</div>;
			})*/
		}
	</>;
};

export default ProfilePeople;