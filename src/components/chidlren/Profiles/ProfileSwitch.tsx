import React from "react";
import TeamProfile from "../Teams/TeamProfile";
import {WrapComp} from "../../parents/WrapError";
import PeopleProfile from "../People/PeopleProfile";
import ProjectProfile from "../Projects/ProjectProfile";
import {HandleComponentJax} from "../../../modules/interfaces/TypeJax";

interface Type{
	of : string;
	profile : any;
	cbHandler : HandleComponentJax;
}

const ProfileSwitch = ({of, profile, cbHandler} : Type) => {
	switch(of){
		case "people":
			return (<WrapComp msg={"Error in Profile People"}
			                  component={<PeopleProfile cbHandler={cbHandler} profile={profile}/>}/>);
		case "project":
		case "projects":
			return (<WrapComp msg={"Error in Profile Project"}
			                  component={<ProjectProfile cbHandler={cbHandler} profile={profile}/>}/>);
		case "team":
		case "teams":
			return (<WrapComp msg={"Error in Profile Team"}
			                  component={<TeamProfile cbHandler={cbHandler} profile={profile}/>}/>);
		default:
			throw Error(`Invalid Profile Component - ${of}`);
		
	}
};

export default ProfileSwitch;