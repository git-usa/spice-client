import Blank from "./Blank";
import AppLogin from "./AppLogin";
import LoadPage from "./LoadPage";
import React, {useEffect, useState} from "react";
import CheckSession from "../../modules/ajaxCalls/CheckSession";
import type {TypePeople} from "../../modules/interfaces/TypePeople";
import AppUi from "./AppUi";

const AppStart = () => {
	const [mainComp, setMainComp]      = useState(<Blank/>);
	const [user : TypePeople, setUser] = useState(null);
	
	useEffect(() => {
		// IF USER FOUND, LOAD APP UI COMPONENT
		if(user){
			console.info("LOGIN SESSION FOUND");
			setMainComp(<AppUi user={user} cbAfterOut={() => setUser(null)}/>);
		} else{
			// CHECK FOR USER LOGGED IN SESSION TO SERVER
			setMainComp(<LoadPage message="Checking Login Status, Please wait...."
			                      addClass={"w3-text-white w3-xxxlarge la-lightBold"}/>);
			CheckSession((result, data) => {
				if(result.type === "error"){
					console.info("LOGIN SESSION NOT FOUND");
					setMainComp(<AppLogin result={result} cbAfterIn={user => setUser(user)}/>);
				} else if(result.type === "pass")
					setUser(data);
			});
		}
	}, [user]);
	
	return <>{mainComp}</>;
};

export default AppStart;