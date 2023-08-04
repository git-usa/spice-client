import AppUi from "./AppUi";
import Blank from "./Blank";
import AppLogin from "./AppLogin";
import LoadPage from "./LoadPage";
import {WrapComp} from "./WrapError";
import React, {useEffect, useState} from "react";
import CheckSession from "../../modules/ajaxCalls/CheckSession";
import {TypeProfileMin} from "../../modules/interfaces/TypeAll";

const AppStart = () => {
	
	console.count("APP START RENDER");
	
	const [mainComp, setMainComp] = useState(<Blank/>);
	const [user, setUser]         = useState<TypeProfileMin | null>(null);
	
	useEffect(() => {
		// IF USER FOUND, LOAD APP UI COMPONENT
		if(user){
			console.clear();
			setMainComp(<WrapComp component={<AppUi user={user}
			                                        cbAfterOut={() => setUser(null)}/>} msg={"App UI."}/>);
		} else{
			setMainComp(<LoadPage message="Checking Login Status, Please wait...."
			                      addClass={"w3-text-white w3-xxxlarge la-lightBold"}/>);
			// CHECK FOR USER LOGGED IN SESSION TO SERVER
			CheckSession((result, data : TypeProfileMin) => {
				if(result.type === "error"){
					console.error("LOGIN SESSION NOT FOUND");
					setMainComp(<AppLogin result={result} cbAfterIn={user => setUser(user)}/>);
				} else if(result.type === "pass")
					setUser(data);
			});
		}
	}, [user]);
	
	return <>{mainComp}</>;
};

export default AppStart;