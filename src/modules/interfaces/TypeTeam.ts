import type {TypeProfileMin} from "./TypeAll";
import type {TypeProject} from "./TypeProject";
import type {TypePeople} from "./TypePeople";

export interface TypeTeamCreate{
	name : string;
	category : string;
	brief : string;
	project : string | TypeProfileMin;
	manager : string | TypeProfileMin;
	creator : string;
}

export interface TypeTeam extends TypeTeamCreate{
	id : string;
	createdAt : Date;
	updatedAt : Date;
}

export interface TypeTeamProject extends TypeTeam{
	project : TypeProfileMin;
}

export interface TypeTeamCreate{
	people : TypePeople[];
	projects : TypeProject[];
}

export interface TypeTeamBrief extends TypeTeam{
	manager : TypeProfileMin;
	project : TypeProfileMin;
}
