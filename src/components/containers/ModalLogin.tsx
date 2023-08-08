import React from "react";
import _l, {_ladEleById} from "../../modules/scripts/_lady";
import {CliInput} from "../singles/CliInputs";
import {showResultBar} from "../singles/ResultBar";
import DoLogin from "../../modules/dynamic/DoLogin";
import type TypeResult from "../../modules/interfaces/TypeResult";
import {TypePeopleLogin, TypePeopleSession} from "../../modules/interfaces/TypePeople";

const modalId     = "modalLogin";
const resultBarId = "setLoginResult";
const btnYesId    = "btnLoginYes";
const btnCancelId = "btnLoginCancel";

export const ModalLogin = (props : {cbAfterLogin : (user : TypePeopleSession) => void}) => {
	
	const cbAtl    = props.cbAfterLogin;
	const boxClass = "la-modal-clearfix w3-margin-24";
	const labClass = "w3-label w3-validate la-bold w3-left w3-padding-hor-12 la-capital";
	const btnClass = (addClass : string) => `la-modal-button w3-btn w3-ripple la-s100 la-l50 ${addClass}`;
	
	const onEnter = (e : React.KeyboardEvent) => {
		if(!(e.key === "Enter" || e.keyCode === 13)) return;
		doLogin(cbAtl);
	};
	
	return <div id={modalId} className={"la-modal-block"}>
		<div className={"la-modal-back"}></div>
		<div className="la-modal">
			<span onClick={closeModalLogin} className="la-modal-close" title="Close Modal">&times;</span>
			<div className="la-modal-content la-s90 la-l5">
				<div className="la-modal-container">
					
					<h1 className={"la-modal-head"}>Login Account</h1>
					<p className={"la-modal-text"}>Please enter your login id & password to continue</p>
					
					{
						["login", "password"].map(type => {
							return <div key={`loginModal${type}`} className={boxClass}>
								<CliInput id={type} required={true} onEnter={onEnter} placeholder={type} type={type === "login" ? "text" : "password"}/>
								<label className={labClass}>{type}</label>
							</div>;
						})
					}
					
					<div className={boxClass}>
						<button id={btnCancelId} type="button" onClick={closeModalLogin} className={btnClass("w3-gray")}>Cancel</button>
						<button id={btnYesId} type="button" onClick={() => doLogin(cbAtl)} className={btnClass("w3-red")}>Login</button>
					</div>
					
					<div className={"la-modal-clearfix"} id={resultBarId}></div>
				</div>
			</div>
		</div>
	</div>;
};

export const showModalLogin = () => {
	const modal : HTMLElement = _ladEleById(modalId);
	if(modal)
		modal.style.display = "block";
};

const closeModalLogin = () => {
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

const doLogin = (cbAfterLogin : (user : TypePeopleSession) => void) => {
	const inputs = _l(modalId)._getInputs("input") as TypePeopleLogin | string | null;
	if(!inputs) showResult({text : "No Input Found", type : "error"});
	else if(typeof inputs === "string") showResult({text : inputs, type : "error"});
	else{
		toggleButtons(false);
		DoLogin(inputs.login, inputs.password, (result : TypeResult, user : TypePeopleSession) => {
			showResult(result);
			if(result.type === "info") return;
			toggleButtons();
			if(!user) return;
			cbAfterLogin(user);
		});
	}
};