import React, {useEffect, useRef, useState} from "react";

import RenderList from "../../singles/RenderList";
import {showResultBar} from "../../singles/ResultBar";
import LoadList from "../../../modules/dynamic/LoadList";
import {lat_onEnter} from "../../../modules/scripts/labject";
import JaxCreate from "../../../modules/ajaxCalls/JaxCreate";
import TypeResult from "../../../modules/interfaces/TypeResult";
import {_ladEleById as getEle} from "../../../modules/scripts/_lady";

const formId      = "formCreateMember";
const teamId      = "selTeamForMember";
const peopleId    = "selPeopleForMember";
const projectId   = "selProjectForMember";
const resultBarId = "setCreateMemberResult";

const ListValue = (listId : string) => getEle<HTMLSelectElement>(listId).value;

const cbResult = (result : TypeResult) => {showResultBar(resultBarId, result);};

const MemberCreate = () => {
	const role                  = useRef<HTMLInputElement>(null);
	const [team, setTeam]       = useState<string | undefined>(undefined);
	const [member, setMember]   = useState<string | undefined>(undefined);
	// const [project, setProject] = useState<string | undefined>(undefined);
	
	const [listTeams, setTeams]       = useState(undefined);
	const [listPeople, setPeople]     = useState(undefined);
	const [listProjects, setProjects] = useState(undefined);
	
	const [enable, setEnable] = useState<boolean>(false);
	
	/**
	 * LOAD LISTS
	 */
	
	const loadProjects = (forceLoad = false) => {
		if(!listProjects || forceLoad){
			setEnable(false);
			
			setTeam(undefined);
			setMember(undefined);
			// setProject(undefined);
			
			setTeams(undefined);
			setPeople(undefined);
			setProjects(undefined);
			
			LoadList("project", "Project", cbResult, (list) => setProjects(list));
		}
	};
	
	const loadTeams = (project : string) => {
		setTeams(undefined);
		LoadList("team", "Team", cbResult, (list) => {
			setTeams(list);
		}, {project});
	};
	
	const loadPeople = (team : string) => {
		setPeople(undefined);
		LoadList("people", "People", cbResult, (list) => {
			setPeople(list);
		}, {team});
	};
	
	// LOAD PROJECTS
	useEffect(loadProjects, []);
	
	const onChange = (listId : string) => {
		
		const value = ListValue(listId);
		
		switch(listId){
			case projectId:
				setEnable(false);
				loadTeams(value);
				break;
			case teamId:
				setTeam(value);
				loadPeople(value);
				break;
			case peopleId:
				setEnable(true);
				setMember(value);
				cbResult({text : "Input Role & Click Submit", type : "info"});
				break;
		}
	};
	
	const submit = () => {
		if(!role || !role.current) return;
		const params = {team, member, role : role.current.value};
		
		console.info(params);
		
		setEnable(false);
		JaxCreate({of : "member", by : params}, (result, data) => {
			cbResult(result);
			if(!data && data !== false){
				return;
			}
			setEnable(true);
			if(data){
				console.info(data);
			}
		});
	};
	
	const onReload = () => {
		loadProjects(true);
	};
	
	return <div className={"w3-padding-hor-32"}>
		<div>
			<h3 className={"la-noMargin"}>Create Team Member</h3>
		</div>
		<div id={formId} className={"w3-padding-hor-12 la-container flex-center-vertical"}>
			{<RenderList id={projectId} title={"Project"} list={listProjects} onChange={onChange}/>}
			{<RenderList id={teamId} title={"Team"} list={listTeams} onChange={onChange}/>}
			{<RenderList id={peopleId} title={"People"} list={listPeople} onChange={onChange}/>}
			<div className="la-2 la-s">
				<h4>Role</h4>
				<input ref={role}
				       type="text"
				       id={"role"}
				       disabled={!enable}
				       className="w3-input la-input"
				       onKeyDown={(event => lat_onEnter(event, submit))}/>
			</div>
			<div className="la-l2 la-s">
				<h4>&nbsp;</h4>
				<button className={"w3-button w3-khaki w3-ripple"} disabled={!enable} onClick={submit}>Submit</button>
				<button className={"w3-button w3-khaki w3-ripple"} onClick={onReload}>Reload</button>
			</div>
		</div>
		<div id={resultBarId}></div>
	</div>;
};

export default MemberCreate;