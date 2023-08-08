export interface TypePeopleLogin{
	login : string;
	password : string;
}

export interface TypePeopleSession{
	id : string;
	name : String;
	super : boolean;
}

export interface TypePeopleInfo{
	id : string;
	name : string;
	role : string;
	status? : boolean;
	super? : boolean;
}

export interface TypePeopleCreate extends TypePeopleLogin{
	name : string;
	role : string;
	status? : boolean;
	super? : boolean;
}

export interface TypePeople extends TypePeopleCreate{
	id : string;
	createdAt : Date;
	updatedAt : Date;
}