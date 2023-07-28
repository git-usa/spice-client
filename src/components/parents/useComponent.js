import List from "./List";
import Blank from "./Blank";
import Create from "./Create";
import Profile from "./Profile";
import ResultBar from "../singles/ResultBar";
import AppHome from "../chidlren/AppChildren/AppHome";
import type {HandleComponentJax, TypeJax, CbComponentJax} from "../../modules/interfaces/TypeJax";

const useComponent : CbComponentJax = (name : string, jax : TypeJax, cbComponentJax : HandleComponentJax) => {
	console.clear();
	console.info(`Using Component : ${name}`);
	
	switch(name){
		case "blank":
			return <Blank/>;
		case "home":
			return <AppHome/>;
		
		case "info":
		case "pass":
		case "error":
			return <ResultBar text={jax} type={name}/>;
		
		case "create":
			return <Create of={jax.of} by={jax.by}/>;
		case"list":
			return <List by={jax.by} of={jax.of} cbHandler={cbComponentJax}/>;
		case "profile":
			return <Profile by={jax.by} of={jax.of} cbHandler={cbComponentJax}/>;
		
		default:
			return <ResultBar text={`Invalid Component Reference Received : ${name}`} type={"error"}/>;
	}
};

export default useComponent;