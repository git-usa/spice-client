import Blank from "../../parents/Blank";
import {useEffect, useState} from "react";
import WrapError from "../../parents/WrapError";
import LoadMessage from "../../containers/LoadMessage";
import LoadMessageList from "../../containers/LoadMessageList";
import {lat_mapToArray} from "../../../modules/scripts/labject";
import type {TypeMessageExt, TypeMessageList} from "../../../modules/interfaces/TypeMessage";

const ToggleList = (id) => {
	lat_mapToArray(document.getElementsByClassName("msgList"), (k, obj) => obj)
		.forEach(ele => {
			ele.style.display = ele.id === id ? "block" : "none";
		});
	
	lat_mapToArray(document.getElementsByClassName("btnToggle"), (k, obj) => obj)
		.forEach(ele => {
			ele.disabled = ele.id === `${id}Btn`;
		});
};

const WrapLoadMessage = (props : { message : TypeMessageExt }) => {
	return <WrapError fallback="Some Error in Load Message."
	                  component={<LoadMessage message={props.message}/>}/>;
};

const WrapMessageList = (props : { messages : TypeMessageExt[], cbLoadMessage : (message : TypeMessageExt)=>void, isSent : boolean }) => {
	const msg = `Some error in List ${props.isSent ? "Sent" : "Received"} Messages. Check Console`;
	return <WrapError fallback={msg}
	                  component={<LoadMessageList messages={props.messages} cbLoadMessage={props.cbLoadMessage} isSent={props.isSent}/>}/>;
};

const ListMessages = (props : { messages : TypeMessageList }) => {
	// console.count("LIST MESSAGES RENDERED");
	const messages                = props.messages;
	const [mainComp, setMainComp] = useState(<Blank/>);
	
	// console.info(messages);
	
	const sent : TypeMessageExt[]     = messages.sent;
	const received : TypeMessageExt[] = messages.received;
	
	useEffect(() => {
		ToggleList("receivedList");
	}, [messages]);
	
	/**
	 * Show Message Block
	 * @param message
	 * @constructor
	 */
	
	const btnToggle = "la-l5 la-s5 w3-button w3-khaki w3-ripple";
	
	const cbLoadMessage = (message : TypeMessageExt) => setMainComp(<WrapLoadMessage message={message}/>);
	
	return <>
		<div className={"la-container w3-padding-hor-24"}>
			<div className={"la-l3"}>
				<div className={"la-container la-l la-s w3-padding-hor-12"}>
					<button id={"receivedListBtn"} className={`w3-border-right ${btnToggle} btnToggle`} onClick={() => ToggleList("receivedList")}>Received</button>
					<button id={"sentListBtn"} className={`w3-border-left ${btnToggle} btnToggle`} onClick={() => ToggleList("sentList")}>Sent</button>
				</div>
				<div id={"sentList"} className={"msgList"}>
					<WrapMessageList cbLoadMessage={cbLoadMessage} messages={sent} isSent={true}/>
				
				</div>
				<div id={"receivedList"} className={"msgList"}>
					<WrapMessageList cbLoadMessage={cbLoadMessage} messages={received} isSent={false}/>
				</div>
			</div>
			<div className={"la-l7 w3-padding-ver-24"}>{mainComp}</div>
		</div>
	</>;
};

export default ListMessages;