import NavBar from "../containers/NavBar";
import type TypeResult from "../../modules/interfaces/TypeResult";
import ResultBar from "../singles/ResultBar";

const Invalid = (props : { result : TypeResult }) => {
	return <>
		<NavBar/>
		<div className={"w3-center"} style={{marginTop : "120px"}}>
			<ResultBar text={props.result.text} type={props.result.type}/>
		</div>
	</>;
};

export default Invalid;