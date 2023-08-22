import React from "react";
import {HandleComponentJax} from "../../../modules/interfaces/TypeJax";
import {TypeProfile, TypeProfileSelf} from "../../../modules/interfaces/TypeProfile";
import ProfileRender from "./ProfileRender";
import ListRender from "../Lists/ListRender";
import {TypeProfileMin} from "../../../modules/interfaces/TypeAll";
import {TypeListMember, TypeListTask} from "../../../modules/interfaces/TypeList";

const ShowProfile = ({profile} : {profile : TypeProfile & {role : string, super : boolean}}) => {
	return <>
		<div className={"w3-padding-hor-12"}>
			<h5 className={"w3-green w3-border w3-padding la-noMargin la-noBorder"}>Profile</h5>
			<ProfileRender profile={profile} includes={"name role status super createdAt"}
			               onShow={(cell, item, carry, head) => {
				               if(!head) return;
				               cell._capitalWords();
			               }}/>
		</div>
	</>;
};

const ShowProjects = ({projects, cbHandle} : {projects : TypeProfileMin[], cbHandle : HandleComponentJax}) => {
	return <>
		<div className={"w3-padding-hor-12"}>
			<h5 className={"w3-khaki w3-border w3-padding la-noMargin la-noBorder"}>Projects Managing</h5>
			<ListRender id={"projectListTab"} list={projects} includes={"name status createdAt brief"}
			            onShow={(cell, item : TypeProfileMin, carry, head) => {
				            if(!head) return;
				            cell._capitalWords();
				            switch(head){
					            case "name":
						            console.info(item);
						            cell._classes("w3-text-blue la-bold")
						                ._click(() => {
							                cbHandle("profile", {of : "project", by : item.id});
						                });
						            break;
				            }
			            }}/>
		</div>
	</>;
};

const ShowTeams = ({teams, cbHandle} : {teams : TypeProfileMin[], cbHandle : HandleComponentJax}) => {
	return <>
		<div className={"w3-padding-hor-12"}>
			<h5 className={"w3-blue w3-border w3-padding la-noMargin la-noBorder"}>Teams Managing</h5>
			<ListRender id={"teamListTab"} list={teams} includes={"name status createdAt brief"}
			            onShow={(cell, item : TypeProfileMin, carry, head) => {
				            if(!head) return;
				            cell._capitalWords();
				            switch(head){
					            case "name":
						            console.info(item);
						            cell._classes("w3-text-blue la-bold")
						                ._click(() => {
							                cbHandle("profile", {of : "team", by : item.id});
						                });
						            break;
				            }
			            }}/>
		</div>
	</>;
};

const ShowMembers = ({members, cbHandle} : {members : TypeListMember[], cbHandle : HandleComponentJax}) => {
	return <>
		<div className={"w3-padding-hor-12"}>
			<h5 className={"w3-blue w3-border w3-padding la-noMargin la-noBorder"}>Member in Teams</h5>
			<ListRender id={"teamMemberTab"} list={members} includes={"role team status createdAt"}
			            onShow={(cell, item : TypeListMember, carry, head) => {
				            if(!head) return;
				            cell._capitalWords();
				            switch(head){
					            case "team":
						            console.info(item);
						            cell._classes("w3-text-blue la-bold")
						                ._click(() => {
							                cbHandle("profile", {of : "team", by : item.team.id});
						                });
						            break;
				            }
			            }}/>
		</div>
	</>;
};

const ShowTasks = ({tasks, cbHandle} : {tasks : TypeListTask[], cbHandle : HandleComponentJax}) => {
	return <>
		<div className={"w3-padding-hor-12"}>
			<h5 className={"w3-deep-purple w3-border w3-padding la-noMargin la-noBorder"}>Tasks Assigned</h5>
			<ListRender id={"taskListTab"} list={tasks} includes={"title category status createdAt brief"}
			            onShow={(cell, item : TypeListMember, carry, head) => {
				            if(!head) return;
				            cell._capitalWords();
				            switch(head){
					            case "team":
						            console.info(item);
						            cell._classes("w3-text-blue la-bold")
						                ._click(() => {
							                cbHandle("profile", {of : "team", by : item.team.id});
						                });
						            break;
				            }
			            }}/>
		</div>
	</>;
};

const ProfileSelf = (props : {profile : TypeProfileSelf, cbHandler : HandleComponentJax}) => {
	
	return <>
		<ShowProfile profile={props.profile.profile}/>
		<br/>
		<p>
			<ShowTasks tasks={props.profile.tasks} cbHandle={props.cbHandler}/>
		</p>
		<br/>
		<p>
			<ShowProjects projects={props.profile.projects} cbHandle={props.cbHandler}/>
		</p>
		<br/>
		<p>
			<ShowTeams teams={props.profile.teams} cbHandle={props.cbHandler}/>
		</p>
		<br/>
		<p>
			<ShowMembers members={props.profile.members} cbHandle={props.cbHandler}/>
		</p>
	</>;
};

export default ProfileSelf;
;
;