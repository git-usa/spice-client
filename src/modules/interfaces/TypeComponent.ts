import type {TypePeople} from "./TypePeople";

export interface TypeComponent{
	name : string;  // Name of Component
	data : any;     // Data to be sent/transferred to Component
}

export interface HandlerTypeComponent extends TypeComponent{
	(name : string, data : any) : any;
}

export interface TypePeopleComponent{
	cbHandler : TypeComponent;
	user : TypePeople;
}