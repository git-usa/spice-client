import React from "react";
import ResultBar from "../../singles/ResultBar";
import {WrapComp} from "../../parents/WrapError";
import ProfileProject from "../Profiles/ProfileProject";
import type {HandleComponentJax} from "../../../modules/interfaces/TypeJax";
import type {TypeProfileProject} from "../../../modules/interfaces/TypeProfile";

const resultBarId    = "setProfileProjectResult";
const ProjectProfile = (props : {profile : TypeProfileProject, cbHandler : HandleComponentJax}) => {
	const profile = props.profile;
	if(!profile) return <ResultBar text={"No Profile Found to Show"} type={"error"}/>;
	const cbHandler = props.cbHandler;
	return <>
		<div id={resultBarId}></div>
		{
			<WrapComp component={<ProfileProject profile={profile} cbHandler={cbHandler}/>} msg={"Profile Project:"}/>
		}
	</>;
};

export default ProjectProfile;