import {useEffect} from "react";
import {BtnRegister} from "../../singles/CliButtons";
import {InpLogin, InpName, InpPassword, InpRePassword, InpRole} from "../../singles/CliInputs";

const rowClass = "la-s100 la-l100 la-container flex-center-vertical w3-padding-hor-16";

const FromCreatePeople = (props : { onEnter : (e : KeyboardEvent)=>void, onClick : (e : MouseEvent)=>void }) => {
	
	const components = {
		name     : <InpName onEnter={props.onEnter} id={"name"} required={true}/>,
		role     : <InpRole onEnter={props.onEnter} id={"role"} required={true}/>,
		login    : <InpLogin onEnter={props.onEnter} id={"login"} required={true}/>,
		password : <InpPassword onEnter={props.onEnter} id={"password"} required={true}/>,
		repass   : <InpRePassword onEnter={props.onEnter} id={"repass"} required={true}/>
	};
	
	useEffect(() => {
		document.getElementById("name").focus();
	}, []);
	
	const render = Object.keys(components).map(key => {
		const component = components[key];
		return <div key={`FormCreatePeople${key}`} className={rowClass}>
			<label id={key + "label"} className={"la-s100 la-l010 la-capital la-bold w3-label w3-validate"}>{key}</label>
			<div className={"la-s100 la-l25"}>
				{component}
			</div>
		
		</div>;
	});
	
	return <>
		{render}
		<div className={rowClass}>
			<div className={"la-s100 la-l010 la-capital la-bold w3-text-deep-purple"}>Actions</div>
			<div className={"la-s100 la-l25"}>
				<div className={"w3-bar"}>
					<BtnRegister onclick={props.onClick} colorClass={"w3-khaki w3-right w3-bar-item"}/>
				</div>
			</div>
		</div>
	</>;
};

export default FromCreatePeople;