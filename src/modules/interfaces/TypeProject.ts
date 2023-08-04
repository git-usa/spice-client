import type {TypeProfileMin} from "./TypeAll";

export interface TypeProjectCreate{
	name : string;
	category : string;
	manager : string | TypeProfileMin;
	brief : string;
}

export interface TypeProject extends TypeProjectCreate{
	id : string;
	createdAt : Date;
	status : string;
	manager : TypeProfileMin;
	creator : TypeProfileMin;
}