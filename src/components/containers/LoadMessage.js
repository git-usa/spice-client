import {ModalCompose} from "./ModalCompose";
import JaxUpdate from "../../modules/ajaxCalls/JaxUpdate";
import {lat_mongoDate} from "../../modules/scripts/labject";
import type TypeJax from "../../modules/interfaces/TypeJax";
import type {HandlerResult} from "../../modules/interfaces/TypeResult";
import type {TypeMessageExt} from "../../modules/interfaces/TypeMessage";
import JaxCompose from "../../modules/ajaxCalls/JaxCompose";
import WrapError from "../parents/WrapError";
import ResultBar from "../singles/ResultBar";

const LoadMessage = (props : { message : TypeMessageExt }) => {
	// console.count("LOAD MESSAGE RENDERED");
	const message     = props.message;
	const date        = lat_mongoDate(message.createdAt, false);
	const showCompose = () => document.getElementById("modalCompose").style.display = "block";
	
	const compose = (subject : string, text : string, setResult : HandlerResult) => {
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
			
			if(!data || !data.status) return;
			
			message.status = "read";
			
			document.getElementById("msgStatus").innerText = "read";
		});
	}
	
	if(message.path === "message"){
		const createdAt = lat_mongoDate(message.receiver.createdAt, false);
		message.replied = `\nThis message is a reply to following message:\n`
		                  + `\nSubject: ${message.receiver.subject}`
		                  + `\n\n${message.receiver.message}`
		                  + `\n\n${createdAt.dayMonthFormat + ", " + createdAt.time}`;
	}
	
	const comp = <div>
		<h4 className={"la-noMargin la-bold"}>{message.subject || "Missing Subject"}</h4>
		<p>{date.monthFormat}, {date.time}, <span id={"msgStatus"}>{message.status}</span></p>
		<pre className={"la-pre"}>{message.message}</pre>
		<p>By {message.sender.name}</p>
		<pre>{message.replied}</pre>
		
		{/* ACTIONS */}
		<p>
			{/* SEND REPLY */}
			<button className={"w3-button w3-khaki w3-ripple"} onClick={showCompose}>Reply</button>
		</p>
	</div>;
	
	// SHOW MESSAGE COMPONENT
	return <>
		<ModalCompose cbYes={compose} subject={`Ref: ${message.subject}`}/>
		<WrapError component={comp}
		           fallback={<ResultBar text={"Error in Load Message Box. Check Console"} type={"error"}/>}/>;
	</>;
};

export default LoadMessage;