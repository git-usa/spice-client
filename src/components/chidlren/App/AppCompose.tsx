import React, {useEffect, useRef, useState} from "react";
import {RefMessage, RefSubject} from "../../singles/CliInputs";
import {_ladEleById} from "../../../modules/scripts/_lady";
import ResultBar, {showResultBar} from "../../singles/ResultBar";
import {HandleResult, TypeResult} from "../../../modules/interfaces/TypeResult";

interface CbCompose{
	(setResult : HandleResult, subject ? : string, message ? : string, carry ? : any) : any;
}

const modalId     = "modalCompose";
const btnYesId    = "btnComposeYes";
const resultBarId = "setComposeResult";
const btnCancelId = "btnComposeCancel";

export const ModalCompose = (props : {cbYes : CbCompose, subject? : string, carry? : any}) => {
	
	const carry                = props.carry;
	const cbYes                = props.cbYes;
	const initial : TypeResult = {text : ""};
	const [result, setResult]  = useState(initial);
	
	const boxClass = "la-modal-clearfix w3-margin-24";
	const labClass = "w3-label w3-validate la-bold w3-left w3-padding-hor-12";
	const btnClass = (addClass : string) => `la-modal-button w3-btn w3-ripple la-s100 la-l50 ${addClass}`;
	
	const subject = useRef<HTMLInputElement>(null);
	const message = useRef<HTMLTextAreaElement>(null);
	
	useEffect(() => {
		if(subject.current) subject.current.value = props.subject || "";
	}, [props.subject]);
	
	return <div id={modalId} className={"la-modal-block"}>
		<div id={"modCompBack"} className={"la-modal-back"}></div>
		<div id="modComp" className="la-modal">
			<span onClick={closeModalCompose} className="la-modal-close" title="Close Modal">&times;</span>
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
						<button id={btnCancelId} type="button" onClick={closeModalCompose} className={btnClass("w3-gray")}>Cancel</button>
						<button id={btnYesId}
						        type="button"
						        className={btnClass("w3-red")}
						        onClick={
							        () => cbYes(
								        setResult,
								        subject.current?.value,
								        message.current?.value,
								        carry
							        )
						        }>Compose
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

export const showModalCompose = () => {
	const modal : HTMLElement = _ladEleById(modalId);
	modal && (modal.style.display = "block");
};

const closeModalCompose = () => {
	showResult({text : ""});
	const modal = document.getElementById(modalId);
	if(modal) modal.style.display = "none";
	toggleButtons();
};

const showResult = (result : TypeResult) => showResultBar(resultBarId, result);

const toggleButtons = (enable = true) => {
	_ladEleById<HTMLButtonElement>(btnYesId).disabled    = !enable;
	_ladEleById<HTMLButtonElement>(btnCancelId).disabled = !enable;
};

const doCompose = () => {};