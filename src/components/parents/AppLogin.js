import LoginNavBar from "../containers/LoginNavBar";
import type TypeResult from "../../modules/interfaces/TypeResult";
import ResultBar from "../singles/ResultBar";
import {ModalLogin} from "../containers/ModalLogin";

import {_l} from "../../modules/scripts/_lady";
import DoLogin from "../../modules/ajaxCalls/DoLogin";
import type {TypePeople} from "../../modules/interfaces/TypePeople";

const AppLogin = (props : { result : TypeResult, cbAfterIn : (user : TypePeople)=>void }) => {
	const cbLinkHandler = (link) => {
		switch(link){
			case"login":
				document.getElementById("modalLogin").style.display = "block";
				break;
			default:
				console.error("Invalid Link");
		}
	};
	
	const cbLoginYes = (setResult : (result : TypeResult)=>void) => {
		const modal = _l("modalLogin");
		if(!modal){
			console.error("Unable to Get Login Modal");
			return;
		}
		
		const inputs = modal._getInputs();
		console.info(inputs);
		
		if(typeof inputs === "string"){
			setResult({text : inputs, type : "error"});
			return;
		}
		
		setResult({text : "Waiting for Server Authorisation...", type : "info"});
		document.getElementById("btnLoginYes").disabled    = true;
		document.getElementById("btnLoginCancel").disabled = true;
		
		DoLogin((result, data) => {
			if(!data){
				setResult(result);
				document.getElementById("btnLoginYes").disabled    = false;
				document.getElementById("btnLoginCancel").disabled = false;
			} else{
				console.info("Login Done");
				console.info(data);
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