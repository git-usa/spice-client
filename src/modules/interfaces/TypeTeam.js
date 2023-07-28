import type {TypeProfileMin} from "./TypeAll";

export interface TypeTeamCreate{
	name : string;
	category : string;
	brief : string;
	project : string;
	manager : string;
	creator : string;
}

export interface TypeTeam extends TypeTeamCreate{
	_id : string;
	createdAt : Date;
	updatedAt : Date;
}

export interface TypeTeamProject extends TypeTeam{
	project : TypeProfileMin;
}
