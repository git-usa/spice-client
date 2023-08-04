import React, {Component} from "react";
import ResultBar from "../singles/ResultBar";

interface Type{
	component : any;
	msg : string;
}

interface TypeFallback{
	component : any;
	fallback : any;
}

class ErrorBoundary extends Component<any, any>{
	constructor(props : any){
		super(props);
		this.state = {hasError : false};
	}
	
	static getDerivedStateFromError(error : any){
		// Update state so the next render will show the fallback UI.
		// console.info("ERROR CAUGHT");
		// console.error(error);
		return {hasError : error};
	}
	
	componentDidCatch(error : Error, errorInfo : React.ErrorInfo){
		console.info("LOGGING ERROR");
		console.info(error);
		console.info(errorInfo);
	}
	
	render(){
		if(this.state.hasError){
			// You can render any custom fallback UI
			const error : Error = this.state.hasError;
			console.info("ERROR CAUGHT");
			const msg = `${this.props.fallback} ${error.name} -> ${error.message}. Check Console for more info`;
			return <ResultBar text={msg} type={"error"}/>;
		}
		return this.props.children;
	}
}

export const WrapError = ({component, fallback} : TypeFallback) => {
	return <ErrorBoundary fallback={fallback}>
		{component}
	</ErrorBoundary>;
};

export const WrapComp = ({component, msg} : Type) => <WrapError fallback={msg} component={component}/>;

export default WrapError;