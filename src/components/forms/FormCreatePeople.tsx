import React from "react";
import {useEffect} from "react";
import {BtnRegister} from "../singles/CliButtons";
import {InpLogin, InpName, InpPassword, InpRePassword, InpRole} from "../singles/CliInputs";
import type {TypeForm} from "../../modules/interfaces/TypeForm";

const rowClass = "la-s100 la-l100 la-container flex-center-vertical w3-padding-hor-16";

const FormCreatePeople = (props : TypeForm) => {
	
	const components : any = {
		name     : <InpName onEnter={props.onEnter} id={"name"} required={true}/>,
		role     : <InpRole onEnter={props.onEnter} id={"role"} required={true}/>,
		login    : <InpLogin onEnter={props.onEnter} id={"login"} required={true}/>,
		password : <InpPassword onEnter={props.onEnter} id={"password"} required={true}/>,
		repass   : <InpRePassword onEnter={props.onEnter} id={"repass"} required={true}/>
	};
	
	useEffect(() => {
		const inpName = document.getElementById("name");
		if(inpName)
			inpName.focus();
	}, []);
	
	const labels = "la-s100 la-l010 la-capital la-bold";
	
	const render = Object.keys(components).map((key : string) => {
		const component = components[key];
		return <div key={`FormCreatePeople${key}`} className={rowClass}>
			<label id={key + "label"} className={`w3-label w3-validate ${labels}`}>{key}</label>
			<div className={"la-s100 la-l25"}>
				{component}
			</div>
		
		</div>;
	});
	
	return <>
		{render}
		<div className={rowClass}>
			<div className={`w3-text-deep-purple ${labels}`}>Actions</div>
			<div className={"la-s100 la-l25"}>
				<div className={"w3-bar"}>
					<BtnRegister onclick={props.onClick} colorClass={"w3-khaki w3-right w3-bar-item"}/>
				</div>
			</div>
		</div>
	</>;
};

export default FormCreatePeople;