import {useEffect, useRef, useState} from "react";
import ResultBar from "../singles/ResultBar";
import {RefMessage, RefSubject} from "../singles/CliInputs";
import type TypeResult, {HandlerResult} from "../../modules/interfaces/TypeResult";

export const ModalCompose = (props : { cbYes : (setResult : HandlerResult)=>void, subject? : string, carry? : any }) => {
	
	const carry   = props.carry;
	const cbYes   = props.cbYes;
	const modalId = "modalCompose";
	
	const initial : TypeResult             = {text : "", type : ""};
	const [result : TypeResult, setResult] = useState(initial);
	
	const boxClass   = "la-modal-clearfix w3-margin-24";
	const labClass   = "w3-label w3-validate la-bold w3-left w3-padding-hor-12";
	const btnClass   = (addClass) => `la-modal-button w3-btn w3-ripple la-s100 la-l50 ${addClass}`;
	const closeModal = () => {
		setResult({text : ""});
		document.getElementById(modalId).style.display = "none";
	};
	
	const subject = useRef("");
	const message = useRef("");
	
	useEffect(() => {
		if(subject.current) subject.current.value = props.subject;
	}, [props.subject]);
	
	return <div id={modalId} className={"la-modal-block"}>
		<div id={"modCompBack"} className={"la-modal-back"}></div>
		<div id="modComp" className="la-modal">
			<span onClick={closeModal} className="la-modal-close" title="Close Modal">&times;</span>
			<div className="la-modal-content la-s90 la-l5">
				<div id={"composeForm"} className="la-modal-container">
					
					<h1 className={"la-modal-head"}>Compose Message</h1>
					<p className={"la-modal-text"}>Please enter your message to continue</p>
					
					<div className={boxClass}>
						<RefSubject required={true} ref={subject} value={props.subject}/>
						<label className={labClass}>Subject</label>
					</div>
					
					<div className={boxClass}>
						<RefMessage required={true} ref={message} value={""}/>
						<label className={labClass}>Message</label>
					</div>
					
					<div className={boxClass}>
						<button id={"btnCompCancel"} type="button" onClick={closeModal} className={btnClass("w3-gray")}>Cancel</button>
						<button id={"btnCompYes"}
						        type="button"
						        className={btnClass("w3-red")}
						        onClick={() => cbYes(subject.current.value, message.current.value, setResult, carry)}>Compose
						</button>
					</div>
					
					<div className={"la-modal-clearfix"}>
						<ResultBar text={result.text} type={result.type}/>
					</div>
				</div>
			</div>
		</div>
	</div>;
};