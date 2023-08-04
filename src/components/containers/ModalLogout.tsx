import React, {useState} from "react";
import ResultBar from "../singles/ResultBar";
import type TypeResult from "../../modules/interfaces/TypeResult";

export const ModalLogout = (props : {cbYes : (setResult : (result : TypeResult) => void) => void}) => {
	
	const cbYes   = props.cbYes;
	const modalId = "modalLogout";
	
	const initial : TypeResult = {text : ""};
	const [result, setResult]  = useState<TypeResult>(initial);
	
	const btnClass = (addClass : string) => `la-modal-button w3-btn w3-ripple la-s100 la-l50 ${addClass}`;
	
	const closeModal = () => {
		setResult({text : ""});
		const modal = document.getElementById(modalId);
		if(modal)
			modal.style.display = "none";
	};
	
	return <div id={modalId} className={"la-modal-block"}>
		<div className={"la-modal-back"}></div>
		<div className="la-modal">
			<span onClick={closeModal} className="la-modal-close" title="Close Modal">&times;</span>
			<div className="la-modal-content la-s90 la-l5">
				<div className="la-modal-container">
					<h1 className={"la-modal-head"}>Logout Account</h1>
					<p className={"la-modal-text"}>Are you sure you want to Logout your account?</p>
					<div className="la-modal-clearfix">
						<button id={"btnLogoutCancel"} type="button" onClick={closeModal} className={btnClass("w3-gray")}>Cancel</button>
						<button id={"btnLogoutYes"} type="button" onClick={() => cbYes(setResult)} className={btnClass("w3-red")}>Yes</button>
					</div>
					<div className={"la-modal-clearfix"}>
						<ResultBar text={result.text} type={result.type}/>
					</div>
				</div>
			</div>
		</div>
	</div>;
};