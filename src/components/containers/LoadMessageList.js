import type {TypeMessageExt} from "../../modules/interfaces/TypeMessage";
import {lat_isValidArray} from "../../modules/scripts/labject";
import ResultBar from "../singles/ResultBar";

const LoadMessageList = (props : { messages : TypeMessageExt[], cbLoadMessage : (message : TypeMessageExt)=>void, isSent : boolean }) => {
	// console.count("LOAD MESSAGE LIST RENDERED");
	const isSent        = props.isSent;
	const messages      = props.messages;
	const cbLoadMessage = props.cbLoadMessage;
	
	console.info(messages);
	
	return (lat_isValidArray(messages) && messages.map((message : TypeMessageExt) => {
		const status   = message.status;
		const sender   = `From : ${message.sender.name}`;
		const receiver = `To : ${message.receiver.name}`;
		
		return <div key={`listMessage-${message.id}`} className={`${status === "active" ? "w3-gray" : "w3-white"}`} onClick={() => cbLoadMessage(message)}>
			<div className={"w3-btn w3-ripple w3-left-align w3-border"} style={{display : "block"}}>
				<div className={"la-bold"}>{message.subject || "Missing Subject"}</div>
				<div className={"la-capital"}>{isSent ? receiver : sender}</div>
			</div>
		</div>;
	})) || <ResultBar text={"No Message Found"} type={"error"}/>;
};

export default LoadMessageList;