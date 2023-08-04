export interface TypeList{
	_id : string,
	name : string,
	status : string,
	createdAt : Date,
	creator : { id : string, name : string },
	creatorId? : string;
}

export interface TypeListGroup extends TypeList{
	category : string,
	brief : string,
	manager : { id : string, name : string },
	managerId? : string;
}

export interface TypeListTeam extends TypeListGroup{
	project : { id : string, name : string },
	projectId? : string;
}

export interface TypeListProject extends TypeListGroup{
	teams : number,
}

export interface TypeListPeople extends TypeList{
	projects : number;
	teams : number;
}