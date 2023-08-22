interface TypeModalLabel{
	head : string;
	value : string;
}

interface TypeModalInput{
	id : string;
	list? : string;
	enable? : boolean;
	addClass? : string;
	required? : boolean;
	placeholder? : string;
}

interface TypeModalSelect{
	id : string;
	list? : any[];
	enable? : boolean;
	addClass? : string;
	required? : boolean;
}

interface TypeModalBlock{
	modalId : string,
	head : string,
	sub : string,
	resultBarId : string,
	closeModal : () => void
	onYes : () => void,
	labels : {head : string, value : string} [],
	btnYes : {
		id : string;
		enable? : boolean;
	},
	btnCancel : {
		id : string;
		enable? : boolean;
	}
	component : JSX.Element;
}