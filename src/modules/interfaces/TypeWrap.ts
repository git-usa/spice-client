import React from "react";

interface TypeWrap{
	component : React.JSX.Element;
	msg : string;
}

export interface TypeFallback{
	component : React.JSX.Element;
	fallback : any;
}

export default TypeWrap;