import type {TypeProfileMin} from "./TypeAll";
import {TypePeople} from "./TypePeople";

export interface TypeProjectCreate{
	name : string;
	category : string;
	manager : string | TypeProfileMin | TypePeople;
	brief : string;
}

export interface TypeProject extends TypeProjectCreate{
	id : string;
	createdAt : Date;
	status : string;
	manager : TypeProfileMin | TypePeople;
	creator : TypeProfileMin | TypePeople;
}