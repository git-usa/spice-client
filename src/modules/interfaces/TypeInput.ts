import React from "react";

export interface TypeInput{
	id? : string;
	type? : string;
	value? : any;
	classes? : string;
	placeholder? : string;
	required? : boolean;
	// onEnter? : (e : KeyboardEvent)=>void;
	onEnter? : (e : React.KeyboardEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
}