import React from "react";
import ResultBar from "../singles/ResultBar";
import LoginNavBar from "../containers/LoginNavBar";
import type TypeResult from "../../modules/interfaces/TypeResult";
import {ModalLogin, showModalLogin} from "../modals/ModalLogin";
import {TypePeopleSession} from "../../modules/interfaces/TypePeople";

const AppLogin = (props : {result : TypeResult, setRetry : () => void, cbAfterIn : (user : TypePeopleSession) => void}) => {
	      return <>
		      <LoginNavBar/>
		      <ModalLogin cbAfterLogin={props.cbAfterIn}/>
		      <div className={"w3-white la-container flex-center w3-padding-hor-16"} style={{marginTop : "75px"}}>
			      <h3 className={"la-s10 la-l10 w3-center"}>App Login is Necessary</h3>
			      <div className={"w3-center la-s10 la-l10"}>
				      <ResultBar text={props.result.text} type={props.result.type}/>
			      </div>
			      <div className={"w3-white w3-padding w3-center"}>
				      <button className={"w3-khaki w3-button la-btn w3-ripple"} onClick={props.setRetry}>Retry</button>
				      <button className={"w3-khaki w3-button la-btn w3-ripple"} onClick={showModalLogin}>Login</button>
			      </div>
		      </div>
	      </>;
      }
;

export default AppLogin;