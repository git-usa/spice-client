import {useEffect} from "react";

const LoadPage = (props : { message : string, addClass? : string }) => {
	console.count("LOAD PAGE RENDER")
	const message = props.message;
	useEffect(() => {
		          document.getElementById("root").style.height = "100%";
	          },
	          [message]
	);
	
	return <div style={{height : "100%", width : "100%", position : "absolute"}}
	            className={`la-container flex-center ${props.addClass || ""}`}>
		{message}
	</div>;
};

export default LoadPage;