import type {TypeMessageList} from "../../../modules/interfaces/TypeMessage";
import {useState} from "react";
import Blank from "../../parents/Blank";

const ListMessages = (props : { messages : TypeMessageList[] }) => {
	const messages = props.messages;
	console.info(messages);
	
	const [mainComp, setMainComp] = useState(<Blank/>);
	
	const loadMessage = (message) => {
		setMainComp(<div className={"w3-padding-ver-24"}>
			<h4 className={"la-noMargin la-bold"}>{message.subject || "Missing Subject"}</h4>
			<p>{message.message}</p>
			<p>By {message.sender.name}</p>
		</div>);
	};
	
	const list = messages.map(message => {
		const sender = message.sender;
		return <>
			<div className={"w3-btn w3-ripple w3-left-align w3-border"} style={{display : "block"}} onClick={() => loadMessage(message)}>
				<div className={"la-bold"}>{message.subject || "Missing Subject"}</div>
				<div>From: {sender.name}</div>
			</div>
		</>;
	});
	
	return <>
		<div className={"la-container w3-padding-hor-24"}>
			<div className={"la-l3"}>{list}</div>
			<div className={"la-l7"}>{mainComp}</div>
		</div>
	</>;
};

export default ListMessages;
;