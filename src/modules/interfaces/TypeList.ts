import {HandleComponentJax} from "./TypeJax";
import {TypeProfileMin} from "./TypeAll";

export interface TypeList{
	id : string,
	name : string,
	status : string,
	createdAt : Date,
}

export interface TypeListGroup extends TypeList{
	category : string,
	brief : string,
	manager : TypeProfileMin,
}

export interface TypeListTeam extends TypeListGroup{
	project : TypeProfileMin,
}

export interface TypeListProject extends TypeListGroup{
	teams : number,
}

export interface TypeListPeople extends TypeList{
	role : string;
	projects : number;
	teams : number;
}

export interface TypeListMember{
	id : string;
	role : string;
	status : string;
	createdAt : Date;
	team : TypeProfileMin;
	member : TypeProfileMin;
	project : TypeProfileMin;
}

export interface TypeListTask{
	id : string;
	member : string | TypeProfileMin;
	team : string | TypeProfileMin;
	project : string | TypeProfileMin;
	creator? : string;
	title : string;
	category : string;
	brief? : string;
	status : string;
}

export interface TypeListTaskBrief extends TypeListTask{
	member : TypeProfileMin;
	team : TypeProfileMin;
	project : TypeProfileMin;
}

export interface TypeListLog{
	creator : string | TypeProfileMin,
	action : string,
	path : string,
	document : string | TypeProfileMin & {title : string},
	status : string,
	brief : string,
	createdAt : Date
}

export interface TypeListLogBrief extends TypeListLog{
	creator : TypeProfileMin,
	document : TypeProfileMin & {title : string},
}

export interface TypeListBrief{
	id? : string;
	title? : string;
	list : (TypeListPeople | TypeListProject | TypeListTeam | TypeListMember | TypeListLogBrief | TypeListTaskBrief)[];
	cbComponent : HandleComponentJax;
}