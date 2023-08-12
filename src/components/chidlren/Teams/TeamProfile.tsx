import React from "react";
import ResultBar from "../../singles/ResultBar";
import {WrapComp} from "../../parents/WrapError";
import ProfileTeam from "../Profiles/ProfileTeam";
import type {HandleComponentJax} from "../../../modules/interfaces/TypeJax";
import type {TypeProfileTeam} from "../../../modules/interfaces/TypeProfile";

const resultBarId = "setProfileTeamResult";
const TeamProfile = (props : {profile : TypeProfileTeam, cbHandler : HandleComponentJax}) => {
	
	const profile = props.profile;
	if(!profile) return <ResultBar text={"No Profile Found to Show"} type={"error"}/>;
	const cbHandler = props.cbHandler;
	return <>
		<div id={resultBarId}></div>
		{
			<WrapComp component={<ProfileTeam profile={profile} cbHandler={cbHandler}/>} msg={"Profile Team:"}/>
		}
	</>;
};

export default TeamProfile;