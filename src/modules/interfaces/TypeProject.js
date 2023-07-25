export interface TypeProjectCreate{
	name : string;
	category : string;
	peopleid : string;
	brief : string;
}

export interface TypeProject extends TypeProjectCreate{
	_id : string;
	createdAt : Date;
	updatedAt : Date;
	status : string;
}