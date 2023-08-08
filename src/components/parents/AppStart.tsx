import AppUi from "./AppUi";
import Blank from "./Blank";
import AppLogin from "./AppLogin";
import LoadPage from "./LoadPage";
import {WrapComp} from "./WrapError";
import React, {JSX, useEffect, useState} from "react";
import JaxSession from "../../modules/ajaxCalls/JaxSession";
import TypeResult from "../../modules/interfaces/TypeResult";
import {TypePeopleSession} from "../../modules/interfaces/TypePeople";

type Type = TypePeopleSession | null;

const LoadWait  = <LoadPage message="Checking Login Status, Please wait...." addClass={"w3-text-white w3-xxxlarge la-lightBold"}/>;
const LoadAppUi = (user : TypePeopleSession, setComp : (comp : JSX.Element) => void, setUser : (user : Type) => void) => {
	console.clear();
	setComp(<WrapComp component={<AppUi user={user} cbAfterOut={() => setUser(null)}/>} msg={"App UI."}/>);
};

const LoadLogin = (result : TypeResult, setUser : (user : Type) => void, setRetry : () => void) => <>
	<AppLogin result={result} cbAfterIn={user => setUser(user)} setRetry={setRetry}/>
</>;

const CheckSession = (setComp : (comp : JSX.Element) => void, setUser : (user : Type) => void, setRetry : () => void) => {
	setComp(LoadWait);
	JaxSession((result : TypeResult, data : TypePeopleSession) => {
		if(result.type === "error") setComp(LoadLogin(result, setUser, setRetry));
		else if(data) setUser(data);
	});
};

const AppStart = () => {
	console.count("APP START RENDER");
	const [comp, setComp]   = useState(<Blank/>); // State to Manage Main Component to Show
	const [user, setUser]   = useState<Type>(null);   // State to Manage Session/Logged User
	const [retry, setRetry] = useState<boolean>(false); // State to Manage Activation of Checking of User Session
	
	
	useEffect(() => {
		// IF USER FOUND LOAD APP UI ELSE CHECK SESSION
		user ? LoadAppUi(user as TypePeopleSession, setComp, setUser)
		     : CheckSession(setComp, setUser, () => setRetry(!retry));
	}, [user, retry]);
	
	return <>
		{comp}
	</>;
};

export default AppStart;