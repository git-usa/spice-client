import type {TypeProject} from "./TypeProject";
import type {TypeTeam, TypeTeamProject} from "./TypeTeam";
import type {TypeProfileMin} from "./TypeAll";

export interface TypeProfile{
	_id : string;
	name : string;
	status : string;
	createdAt : Date;
	creator : TypeProfileMin;
	creatorId? : string;
}

export interface TypeProfilePeople extends TypeProfile{
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