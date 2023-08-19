import type {TypeProject} from "./TypeProject";
import type {TypeTeam, TypeTeamProject} from "./TypeTeam";
import type {TypeProfileMin} from "./TypeAll";
import {TypeLog} from "./TypeLog";

export interface TypeProfile{
	id : string;
	name : string;
	status : string;
	createdAt : Date;
	creator? : TypeProfileMin;
}

export interface TypeProfilePeople{
	profile : TypeProfile & {role : string};
	creator : TypeProfileMin;
	logs : TypeLog[];
	projects : TypeProject[];
	teams : TypeTeamProject[];
}

export interface TypeProfileProject extends TypeProfile{
	profile : TypeProfile & {brief : string};
	creator : TypeProfileMin;
	manager : TypeProfileMin;
	teams : TypeTeam[];
}

export interface TypeProfileTeam extends TypeProfile{
	profile : TypeProfile & {brief? : string, members ?: number};
	creator : TypeProfileMin;
	project : TypeProfileMin;
	manager : TypeProfileMin;
	members? : TypeProfileMin[];
}

export interface TypeProfileAny{
	data : any;
	type : any;
}