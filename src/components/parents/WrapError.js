import {Component} from "react";

class ErrorBoundary extends Component{
	constructor(props){
		super(props);
		this.state = {hasError : false};
	}
	
	static getDerivedStateFromError(error){
		// Update state so the next render will show the fallback UI.
		console.info("ERROR CAUGHT");
		console.error(error);
		return {hasError : true};
	}
	
	componentDidCatch(error : Error, errorInfo : React.ErrorInfo){
		console.info("LOGGING ERROR");
		console.info(error);
		console.info(errorInfo);
	}
	
	render(){
		if(this.state.hasError){
			// You can render any custom fallback UI
			return this.props.fallback;
		}
		return this.props.children;
	}
}

export const WrapError = ({component, fallback}) => {
	return <ErrorBoundary fallback={fallback}>
		{component}
	</ErrorBoundary>;
};

export default WrapError;