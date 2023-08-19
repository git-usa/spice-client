export interface TypeActionOption{
	text : string,
	super? : boolean
}

export interface TypeAction{
	create? : TypeActionOption;
	list? : TypeActionOption;
	listBrief? : TypeActionOption;
}

export interface TypeGroups{
	people? : TypeAction;
	project? : TypeAction;
	team? : TypeAction;
	member? : TypeAction;
	task? : TypeAction;
	message? : TypeAction;
	log? : TypeAction;
}

export const ActionGroups : TypeGroups = {
	people  : {
		create    : {text : "create", super : true},
		list      : {text : "list"},
		listBrief : {text : "people brief", super : true}
	},
	project : {
		create    : {text : "create", super : true},
		list      : {text : "list"},
		listBrief : {text : "projects brief", super : true}
	},
	team    : {
		create    : {text : "create", super : true},
		list      : {text : "list"},
		listBrief : {text : "teams  brief", super : true}
	},
	member  : {
		create : {text : "create", super : true},
		list   : {text : "list"}
	},
	task    : {
		create : {text : "create", super : true}
	},
	message : {
		listBrief : {text : "my messages"}
	},
	log     : {
		create : {text : "create"},
		list   : {text : "logs"}
	}
};