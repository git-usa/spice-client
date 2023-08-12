import React from "react";
import {WrapComp} from "../../parents/WrapError";
import ResultBar from "../../singles/ResultBar";
import ProfilePeople from "../Profiles/ProfilePeople";
import type {HandleComponentJax} from "../../../modules/interfaces/TypeJax";
import type {TypeProfilePeople} from "../../../modules/interfaces/TypeProfile";

const resultBarId = "setProfilePeopleResult";

const PeopleProfile = (props : {profile : TypeProfilePeople, cbHandler : HandleComponentJax}) => {
	const profile = props.profile;
	if(!profile) return <ResultBar text={"No Profile Found to Show"} type={"error"}/>;
	const cbHandler = props.cbHandler;
	return <>
		<div id={resultBarId}></div>
		{
			<WrapComp component={<ProfilePeople profile={profile} cbHandler={cbHandler}/>} msg={"Profile People:"}/>
		}
	</>;
};

export default PeopleProfile;