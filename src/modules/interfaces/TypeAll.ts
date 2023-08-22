import {_lady} from "../scripts/_lady";

export interface TypeProfileMin{
	id : string;
	name : string;
	
	super? : boolean;
	status? : string;
	createdAt? : Date;
}

export interface TypeRender{
	id? : string;
	includes? : string;
	carry? : any;
	onShow? : (cell : typeof _lady, item : any, carry : any, head : string, value : any) => void;
}