import React from "react";
import {ModalCompose} from "./ModalCompose";
import JaxUpdate from "../../modules/ajaxCalls/JaxUpdate";
import {lat_mongoDate} from "../../modules/scripts/labject.js";
import type TypeJax from "../../modules/interfaces/TypeJax";
import type {HandleResult} from "../../modules/interfaces/TypeResult";
import type {TypeMessageExt} from "../../modules/interfaces/TypeMessage";
import JaxCompose from "../../modules/ajaxCalls/JaxCompose";
import WrapError from "../parents/WrapError";

const LoadMessage = (props : {message : TypeMessageExt}) => {
	// console.count("LOAD MESSAGE RENDERED");
	const message     = props.message;
	const date        = lat_mongoDate(message.createdAt.toString(), false);
	const showCompose = () => {
		const modal = document.getElementById("modalCompose");
		if(modal)
			modal.style.display = "block";
	};
	
	const compose = (setResult : HandleResult, subject ? : string, text ? : string) => {
		subject = subject && subject.trim();
		text    = text && text.trim();
		
		if(!subject || subject.length === 0){
			setResult({text : "Missing Subject", type : "error"});
			return;
		}
		
		if(!text || text.length === 0){
			setResult({text : "Missing Message", type : "error"});
			return;
		}
		
		const jax : TypeJax = {
			of : "message",
			by : {
				id               : message.id,
				subject, message : text
			}
		};
		
		setResult({text : "Composing Message...", type : "info"});
		JaxCompose(jax, (result, data) => {
			setResult(result);
			console.info(data);
		});
	};
	
	if(message.status === "active"){
		JaxUpdate({of : "message", by : {id : message.id, field : "status", to : "read"}}, (result, data) => {
			if(result.type === "error")
				console.error(result);
			else
				console.info(result);
			
			if(!data || !data.status) return <></>;
			
			message.status = "read";
			const status   = document.getElementById("msgStatus");
			if(status)
				status.innerText = "read";
		});
	}
	
	if(message.path === "message"){
		if(!message.original) return <></>;
		const original  = message.original;
		const createdAt = lat_mongoDate(original.createdAt.toString(), false);
		message.replied = <pre className={"la-pre"}>
			{
				`This message is a reply to following message:`
				+ `\nSubject: ${original.subject}`
				+ `\n\n${original.message}`
				+ `\n\n${createdAt.dayMonthFormat + ", " + createdAt.time}`
			}
		</pre>;
	}
	
	console.info(message);
	
	const comp = <div>
		<h4 className={"la-noMargin la-lightBold"}>Sub: {message.subject || "Missing Subject"}</h4>
		<div style={{lineHeight : "30px"}} className={"la-container"}>
			<div className={"la-l1 la-s2"}>On :</div>
			<div className={"la-l9 la-s8"}>
				<span className={"w3-text-blue"}>{date.monthFormat}, {date.time}</span> <span id={"msgStatus"}>{message.status}</span>
			</div>
			<div className={"la-l1 la-s2"}>From :</div>
			<div className={"la-l9 la-s8"}>
				<span className={"w3-text-blue"}>{message.sender.name}</span>
			</div>
		</div>
		
		<p style={{margin : "20px 0"}}>
			<pre className={"la-pre"}>
				{message.message}
			</pre>
		</p>
		<div>{message.replied}</div>
		
		{/* ACTIONS */}
		<p>
			{/* SEND REPLY */}
			<button className={"w3-button w3-khaki w3-ripple"} onClick={showCompose}>Reply</button>
		</p>
	</div>;
	
	// SHOW MESSAGE COMPONENT
	return <>
		<WrapError component={<ModalCompose cbYes={compose} subject={`Ref: ${message.subject}`}/>} fallback={"Modal Compose :"}/>
		<WrapError fallback="Error in Load Message Box." component={comp}/>
	</>;
};

export default LoadMessage;