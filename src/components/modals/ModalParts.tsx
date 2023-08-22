import React from "react";
import RenderList from "../singles/RenderList";
import {showResultBar} from "../singles/ResultBar";
import JaxList from "../../modules/ajaxCalls/JaxList";
import JaxCreate from "../../modules/ajaxCalls/JaxCreate";
import {_l, _ladEleById} from "../../modules/scripts/_lady";
import {lat_isValidArray} from "../../modules/scripts/labject";
import {TypeProfileMin} from "../../modules/interfaces/TypeAll";
import TypeResult, {HandleResultData} from "../../modules/interfaces/TypeResult";

export const ModalStyles = {
	boxClass : "la-modal-clearfix w3-margin-24",
	labClass : "w3-label w3-validate la-bold w3-left w3-padding-hor-12",
	btnClass : (addClass : string) => `la-modal-button w3-btn w3-ripple la-s100 la-l50 ${addClass}`
};

export const ShowModalResult = (resultBarId : string, result : TypeResult) => showResultBar(resultBarId, result);

export const ShowModal = (modalId : string, obj : any, resultBarId : string, setContextState ? : (obj : any) => void) => {
	const modal = document.getElementById(modalId);
	modal && (modal.style.display = "block");
	if(!setContextState){
		ShowModalResult(resultBarId, {type : "error", text : "Unable to Set Modal Context State. Modal will not work as suggested."});
		return;
	}
	setContextState(obj);
};

export const CloseModal = (modalId : string, resultBarId : string, next : () => void) => {
	ShowModalResult(resultBarId, {text : ""});
	const modal = document.getElementById(modalId);
	if(modal) modal.style.display = "none";
	next();
};

export const ToggleModalButtons = (buttonIds : string, enable = true) => {
	buttonIds.split(" ").forEach(buttonId => {
		_ladEleById<HTMLButtonElement>(buttonId).disabled = !enable;
	});
};

export const ModalBeforeCreate = (Context : any | undefined, resultBarId : string, modalId : string, next : (inputs : any) => void) => {
	if(!Context){
		ShowModalResult(resultBarId, {text : "Missing Context Details", type : "error"});
		return;
	}
	
	const inputs = _l(modalId)._getInputs("input,select");
	
	if(!inputs){
		ShowModalResult(resultBarId, {text : "No Form Input Found", type : "error"});
		return;
	}
	
	if(typeof inputs === "string"){
		ShowModalResult(resultBarId, {text : inputs, type : "error"});
		return;
	}
	
	next(inputs);
};

export const ModalJaxCreate = (inputs : any, of : string, toggleButtons : (enable : boolean) => void, next : HandleResultData) => {
	console.info(inputs);
	toggleButtons(false);
	JaxCreate({of : of, by : inputs}, next);
};

export const ModalAfterCreate = (result : TypeResult, data : any, resultBarId : string, toggleButtons : (enable : boolean) => void) => {
	ShowModalResult(resultBarId, result);
	if(!data && data !== false){
		return;
	}
	toggleButtons(true);
	if(data){
		console.info(data);
	}
};

export const ModalInput = (props : TypeModalInput) => {
	return <>
		<input id={props.id}
		       list={props.list}
		       disabled={!props.enable}
		       required={props.required}
		       placeholder={props.placeholder}
		       className={`w3-input la-input ${props.addClass || ""}`}/>
	</>;
};

export const ModalBoxLabel = (props : TypeModalLabel) => {
	return <>
		<div className={ModalStyles.boxClass}>
			<h5 className={"la-container w3-left-align"}>
				<div className={"la-l2 la-bold la-capital"}>{props.head}</div>
				<div className={"la-l1 la-bold"}>:</div>
				<div className={"la-l7"}>{props.value}</div>
			</h5>
		</div>
	</>;
};

export const ModalBoxInput = (props : TypeModalInput) => {
	return <>
		<div className={ModalStyles.boxClass}>
			<ModalInput id={props.id} list={props.list} enable={props.enable} placeholder={props.placeholder} required={props.required} addClass={props.addClass}/>
			<label className={ModalStyles.labClass}>{props.placeholder}</label>
		</div>
	</>;
};

export const ModalBoxSelect = (props : TypeModalSelect) => {
	return <>
		<div className={ModalStyles.boxClass}>
			<RenderList id={props.id} list={props.list} addClass={"la-l la-s"} enable={props.enable} required={props.required}/>
			<label className={ModalStyles.labClass}>Manager</label>
		</div>
	</>;
};

export const ModalBlock = (props : TypeModalBlock) => {
	return <>
		<div id={props.modalId} className={"la-modal-block"}>
			<div id={"modCompBack"} className={"la-modal-back"}></div>
			<div id="modComp" className="la-modal">
				<span onClick={props.closeModal} className="la-modal-close" title="Close Modal">&times;</span>
				<div className="la-modal-content la-s90 la-l5">
					<div id={"composeForm"} className="la-modal-container">
						
						<h1 className={"la-modal-head"}>{props.head}</h1>
						<p className={"la-modal-text"}>{props.sub}</p>
						
						{
							props.labels.map(label => <ModalBoxLabel key={`keyForAddTeamInfo${label.head}`} head={label.head} value={label.value}/>)
						}
						
						{props.component}
						
						<div className={ModalStyles.boxClass}>
							<button disabled={!props.btnCancel.enable}
							        id={props.btnCancel.id} type="button"
							        onClick={props.closeModal}
							        className={ModalStyles.btnClass("w3-gray")}>Cancel
							</button>
							<button disabled={!props.btnYes.enable}
							        id={props.btnYes.id}
							        onClick={props.onYes}
							        className={ModalStyles.btnClass("w3-red")}>Add
							</button>
						</div>
						
						<div id={props.resultBarId} className={"la-modal-clearfix"}></div>
					</div>
				</div>
			</div>
		</div>
	</>;
};

export const ModalFetchList = (setEnable : (enable : boolean) => void, resultBarId : string, setList : (list : TypeProfileMin[]) => void, people ? : TypeProfileMin[],
                               of = "people") => {
	if(people) return;
	setEnable(false);
	ShowModalResult(resultBarId, {text : `Fetching ${of} list...`, type : "info"});
	JaxList({of, by : null}, (result, data) => {
		ShowModalResult(resultBarId, result);
		if(lat_isValidArray(data)){
			setEnable(true);
			setList(data);
			ShowModalResult(resultBarId, {text : `${of} List Fetched`, type : "info"});
		}
	}, false);
};

export const ModalGetLabels = (context : any) : TypeModalLabel[] | [] => {
	let labels : TypeModalLabel[] = [];
	if(context){
		for(const key in context){
			if(!context.hasOwnProperty(key)) continue;
			labels.push({head : key, value : context[key].name || context[key]});
		}
	}
	
	return labels;
};