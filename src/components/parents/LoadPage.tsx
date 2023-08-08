import React from "react";
import {useEffect} from "react";
import {_ladEleById} from "../../modules/scripts/_lady";

const LoadPage = (props : {message : string, addClass? : string}) => {
	const message = props.message;
	useEffect(() => {
		          const root : HTMLElement = _ladEleById("root");
		          if(root) root.style.height = "100%";
	          },
	          [message]
	);
	
	return <div style={{height : "100%", width : "100%", position : "absolute"}}
	            className={`la-container flex-center ${props.addClass || ""}`}>
		{message}
	</div>;
};

export default LoadPage;