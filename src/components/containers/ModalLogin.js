import {useState} from "react";
import ResultBar from "../singles/ResultBar";
import {InpLogin, InpPassword} from "../singles/CliInputs";
import type TypeResult from "../../modules/interfaces/TypeResult";

export const ModalLogin = (props : { cbYes : (setResult : ()=>void)=>void }) => {
	
	const cbYes   = props.cbYes;
	const modalId = "modalLogin";
	
	const initial : TypeResult             = {text : "", type : ""};
	const [result : TypeResult, setResult] = useState(initial);
	
	// const inpClass   = "w3-input la-input";
	const boxClass   = "la-modal-clearfix w3-margin-24";
	const labClass   = "w3-label w3-validate la-bold w3-left w3-padding-hor-12";
	const btnClass   = (addClass) => `la-modal-button w3-btn w3-ripple la-s100 la-l50 ${addClass}`;
	const closeModal = () => {
		setResult({text : ""});
		document.getElementById(modalId).style.display = "none";
	};
	
	const onEnter = (e) => {
		if(!(e.key === "Enter" || e.keyCode === 13)) return;
		cbYes(setResult);
	};
	
	return <div id={modalId} className={"la-modal-block"}>
		<div className={"la-modal-back"}></div>
		<div className="la-modal">
			<span onClick={closeModal} className="la-modal-close" title="Close Modal">&times;</span>
			<div className="la-modal-content la-s90 la-l5">
				<div className="la-modal-container">
					
					<h1 className={"la-modal-head"}>Login Account</h1>
					<p className={"la-modal-text"}>Please enter your login id & password to continue</p>
					
					<div className={boxClass}>
						<InpLogin onEnter={onEnter} id={"login"} required={true}/>
						<label className={labClass}>User Id</label>
					</div>
					
					<div className={boxClass}>
						<InpPassword onEnter={onEnter} id={"password"} required={true}/>
						<label className={labClass}>Password</label>
					</div>
					
					<div className={boxClass}>
						<button id={"btnLoginCancel"} type="button" onClick={closeModal} className={btnClass("w3-gray")}>Cancel</button>
						<button id={"btnLoginYes"} type="button" onClick={() => cbYes(setResult)} className={btnClass("w3-red")}>Login</button>
					</div>
					
					<div className={"la-modal-clearfix"}>
						<ResultBar text={result.text} type={result.type}/>
					</div>
				</div>
			</div>
		</div>
	</div>;
};