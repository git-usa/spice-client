import React from "react";
import LoginNavBar from "../containers/LoginNavBar";
import type TypeResult from "../../modules/interfaces/TypeResult";
import ResultBar from "../singles/ResultBar";
import {ModalLogin} from "../containers/ModalLogin";

import {_l, _ladEleById} from "../../modules/scripts/_lady.js";
import DoLogin from "../../modules/ajaxCalls/DoLogin";
import type {TypeProfileMin} from "../../modules/interfaces/TypeAll";

const AppLogin = (props : {result : TypeResult, cbAfterIn : (user : TypeProfileMin) => void}) => {
	const cbLinkHandler = (link : string) => {
		switch(link){
			case"login":
				const modal : HTMLElement = _ladEleById("modalLogin");
				if(modal)
					modal.style.display = "block";
				break;
			default:
				console.error("Invalid Link");
		}
	};
	
	const cbLoginYes = (setResult : (result : TypeResult) => void) => {
		const modal = _l("modalLogin");
		if(!modal){
			console.error("Unable to Get Login Modal");
			return;
		}
		
		const inputs = modal._getInputs("input,textarea,select");
		if(typeof inputs === "string"){
			setResult({text : inputs, type : "error"});
			return;
		}
		
		setResult({text : "Waiting for Server Authorisation...", type : "info"});
		
		const btnYes : HTMLButtonElement    = _ladEleById("btnLoginYes");
		const btnCancel : HTMLButtonElement = _ladEleById("btnLoginCancel");
		
		btnYes.disabled    = true;
		btnCancel.disabled = true;
		
		DoLogin((result, data) => {
			if(!data){
				setResult(result);
				btnYes.disabled    = false;
				btnCancel.disabled = false;
			} else{
				// window.location.href = "/app";
				props.cbAfterIn(data);
			}
		}, inputs);
		
	};
	
	return <>
		<LoginNavBar cbLinkHandler={cbLinkHandler}/>
		<ModalLogin cbYes={cbLoginYes}/>
		<div className={"w3-white la-container flex-center w3-padding-hor-16"} style={{marginTop : "75px"}}>
			<h3 className={"la-s10 la-l10 w3-center"}>App Login is Necessary</h3>
			<div className={"w3-center la-s10 la-l10"}>
				<ResultBar text={props.result.text} type={props.result.type}/>
			</div>
		</div>
	</>;
};

export default AppLogin;