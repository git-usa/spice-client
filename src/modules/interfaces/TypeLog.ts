import {TypeProfileMin} from "./TypeAll";

export interface TypeLog{
	creator? : TypeProfileMin;
	action : string;
	path : string;
	status? : string;
	brief : string;
	document : string;
	createdAt? : Date;
}