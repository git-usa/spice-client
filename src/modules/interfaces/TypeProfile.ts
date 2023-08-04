import type {TypeProject} from "./TypeProject";
import type {TypeTeam, TypeTeamProject} from "./TypeTeam";
import type {TypeProfileMin} from "./TypeAll";
import {TypeLog} from "./TypeLog";

export interface TypeProfile{
	id : string;
	name : string;
	status : string;
	createdAt : Date;
	creator : TypeProfileMin;
	creatorId? : string;
}

export interface TypeProfilePeople extends TypeProfile{
	logs : TypeLog[];
	projects : TypeProject[];
	teams : TypeTeamProject[];
}

export interface TypeProfileProject extends TypeProfile{
	manager : TypeProfileMin;
	managerId? : string;
	
	teams : TypeTeam[];
}

export interface TypeProfileTeam extends TypeProfile{
	project : TypeProfileMin;
	manager : TypeProfileMin;
	projectId? : string;
	managerId? : string;
}

export interface TypeProfileAny{
	data : any;
	type : any;
}