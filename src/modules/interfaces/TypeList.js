export interface TypeList{
	_id : string,
	name : string,
	status : string,
	createdAt : Date,
	creator : { _id : string, name : string },
	creatorId? : string;
}

export interface TypeListGroup extends TypeList{
	category : string,
	brief : string,
	manager : { _id : string, name : string },
	managerId? : string;
}

export interface TypeListTeam extends TypeListGroup{
	project : { _id : string, name : string },
	projectId? : string;
}

export interface TypeListProject extends TypeListGroup{
	teams : number,
}

export interface TypeListPeople extends TypeList{
	projects : number;
	teams : number;
}