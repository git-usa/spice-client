import type {TypeProfileMin} from "./TypeAll";

export interface TypeTeamCreate{
	name : string;
	category : string;
	brief : string;
	projectid : string;
	peopleid : string;
	createdby : string;
}

export interface TypeTeam extends TypeTeamCreate{
	_id : string;
	createdAt : Date;
	updatedAt : Date;
}

export interface TypeTeamProfile extends TypeTeamCreate{
	creator : string;
	manager : string;
	project : string;
}

export interface TypeTeamProject extends TypeTeam{
	project : TypeProfileMin;
}
