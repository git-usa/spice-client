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

export interface TypeListLog{
	creator : TypeProfileMin,
	action : string,
	path : string,
	document : string,
	status : string,
	brief : string,
	createdAt : Date
}

export interface TypeListBrief{
	id? : string;
	title? : string;
	list : (TypeListPeople | TypeListProject | TypeListTeam | TypeListLog)[];
	cbComponent : HandleComponentJax;
}