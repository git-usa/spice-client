import type TypeJax from "../../modules/interfaces/TypeJax";
import CreatePeople from "../chidlren/People/CreatePeople";
import ResultBar from "../singles/ResultBar";
import CreateProject from "../chidlren/Projects/CreateProject";
import CreateTeam from "../chidlren/Teams/CreateTeam";

const Create = (jax : TypeJax) => {
	
	const getComponent = () => {
		switch(jax.of){
			case"people":
				return <CreatePeople/>;
			case"project":
				return <CreateProject/>;
			case"team":
				return <CreateTeam/>;
			default:
				return <ResultBar text={"Invalid Create Component Request"} type={"error"}/>;
		}
	};
	
	return <>
		{getComponent()}
	</>;
};
export default Create;