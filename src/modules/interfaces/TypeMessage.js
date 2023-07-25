interface TypeMessage{
	subject : string;
	message : string;
	path : string;
	documentid : string;
	peopleid : string;
	status : string;
}

export interface TypeMessageList extends TypeMessage{
	sender : { _id : string, name : string };
}

export default TypeMessage;