import {_lady} from "../scripts/_lady";

export interface TypeProfileMin{
	id : string;
	name : string;
	
	super? : boolean;
}

export interface TypeRender{
	id? : string;
	includes? : string;
	carry? : any;
	onShow ?: (cell : typeof _lady, head : string, value : any, item : any, carry : any) => void;
}