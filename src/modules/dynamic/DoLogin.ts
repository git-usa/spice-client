import JaxLogin from "../ajaxCalls/JaxLogin";
import {HandleResultData} from "../interfaces/TypeResult";

const DoLogin = (login : string, password : string, setResult : HandleResultData) => {
	setResult({text : "Doing Login...", type : "info"});
	JaxLogin(setResult, {of : login, by : password});
};

export default DoLogin;