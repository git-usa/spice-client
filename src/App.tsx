import React from "react";
import Home from "./components/parents/Home";
import Invalid from "./components/parents/Invalid";
import AppStart from "./components/parents/AppStart";
import {BrowserRouter as Router, Routes, Route} from "react-router-dom";

function App(){
	console.count("APP RENDER");
	return <Router>
		<Routes>
			<Route path={"/"} element={<Home/>}/>;
			<Route path={"/home"} element={<Home/>}/>;
			<Route path={"/app"} element={<AppStart/>}/>;
			<Route path="*" element={<Invalid result={{text : "Page Not Found", type : "error"}}/>}/>;
		</Routes>
	</Router>;
}

export default App;
