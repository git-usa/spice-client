import React from "react";

export interface TypeForm{
	onEnter : (e : React.KeyboardEvent) => void;
	onClick : (e : React.MouseEvent) => void;
	extra? : any;
}