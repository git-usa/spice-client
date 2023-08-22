import React from "react";
import {showResultBar} from "../singles/ResultBar";
import {CliInput, CliText} from "../singles/CliInputs";
import TypeJax from "../../modules/interfaces/TypeJax";
import JaxCompose from "../../modules/ajaxCalls/JaxCompose";
import {_l, _ladEleById} from "../../modules/scripts/_lady";
import type {TypeResult} from "../../modules/interfaces/TypeResult";

const modalId     = "modalCompose";
const btnYesId    = "btnComposeYes";
const resultBarId = "setComposeResult";
const btnCancelId = "btnComposeCancel";

interface Type{
	of : string,
	id : string,
	cbAfterCompose : (data : any) => void
}

/*const useSharedData = () => {
 const [compose, setCompose] = useState<Type | null>(null);
 return {compose, setCompose};
 };*/

let Compose : Type;

export const ModalCompose = () => {
	const boxClass = "la-modal-clearfix w3-margin-24";
	const labClass = "w3-label w3-validate la-bold w3-left w3-padding-hor-12";
	const btnClass = (addClass : string) => `la-modal-button w3-btn w3-ripple la-s100 la-l50 ${addClass}`;
	
	return <div id={modalId} className={"la-modal-block"}>
		<div id={"modCompBack"} className={"la-modal-back"}></div>
		<div id="modComp" className="la-modal">
			<span onClick={closeModalCompose} className="la-modal-close" title="Close Modal">&times;</span>
			<div className="la-modal-content la-s90 la-l5">
				<div id={"composeForm"} className="la-modal-container">
					
					<h1 className={"la-modal-head"}>Compose Message</h1>
					<p className={"la-modal-text"}>Please enter your message to continue</p>
					
					<div className={boxClass}>
						<CliInput id={"subject"} required={true}/>
						<label className={labClass}>Subject</label>
					</div>
					
					<div className={boxClass}>
						<CliText id={"message"} required={true}/>
						<label className={labClass}>Message</label>
					</div>
					
					<div className={boxClass}>
						<button id={btnCancelId} type="button" onClick={closeModalCompose} className={btnClass("w3-gray")}>Cancel</button>
						<button id={btnYesId} type="button" onClick={doCompose} className={btnClass("w3-red")}>Compose</button>
					</div>
					
					<div id={resultBarId} className={"la-modal-clearfix"}></div>
				</div>
			</div>
		</div>
	</div>;
};

export const showModalCompose = ({of, id, cbAfterCompose} : Type) => {
	const modal : HTMLElement = _ladEleById(modalId);
	modal && (modal.style.display = "block");
	Compose = {of, id, cbAfterCompose};
	console.info(Compose);
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

const doCompose = () => {
	const inputs = _l(modalId)._getInputs() as {subject : string, message : string} | string;
	if(typeof inputs === "string"){
		showResult({text : inputs, type : "error"});
		return;
	}
	
	if(!Compose || !Compose.id){
		showResult({text : "Missing Profile Info to Compose", type : "error"});
		return;
	}
	
	const jax : TypeJax = {of : Compose.of, by : {subject : inputs.subject, message : inputs.message, id : Compose.id}};
	
	showResult({text : "", type : "info"});
	
	JaxCompose(jax, (result, data) => {
		showResult(result);
		if(!data) return;
		Compose.cbAfterCompose(data);
	});
};