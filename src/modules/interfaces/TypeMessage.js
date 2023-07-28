interface TypeMessage{
	id : string;
	subject : string;
	message : string;
	path : string;
	receiver : string;
	sender : string;
	status : string;
	createdAt : Date;
}

export interface TypeMessageExt extends TypeMessage{
	sender : {
		id : string;
		name : string;
	};
	receiver : {
		id : string;
		name : string;
		message : string;
		subject : string;
		createdAt : Date;
	};
}

export interface TypeMessageList{
	received : TypeMessageExt[];
	sent : TypeMessageExt[];
}

export default TypeMessage;