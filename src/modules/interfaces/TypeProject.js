export interface TypeProjectCreate{
	name : string;
	category : string;
	manager : string;
	brief : string;
}

export interface TypeProject extends TypeProjectCreate{
	_id : string;
	createdAt : Date;
	updatedAt : Date;
	status : string;
}