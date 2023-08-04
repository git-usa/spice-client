import {TypeProfileMin} from "./TypeAll";

interface TypeMessage{
	id : string;
	subject : string;
	message : string;
	path : string;
	receiver : string | TypeProfileMin;
	sender : string | TypeProfileMin;
	status : string;
	createdAt : Date;
}

export interface TypeMessageExt extends TypeMessage{
	sender : TypeProfileMin;
	receiver : TypeProfileMin;
	original? : {
		id : string;
		message : string;
		subject : string;
		createdAt : Date;
	};
	replied? : any;
}

export interface TypeMessageList{
	received : TypeMessageExt[];
	sent : TypeMessageExt[];
}

export default TypeMessage;