import React from "react";
import {lat_getCookie} from "../../../modules/scripts/labject";

const AppHome = () => {
	// console.info(document.cookie);
	console.info("SHOWING DOCUMENT COOKIE");
	console.info(document.cookie);
	console.info(lat_getCookie("jwt_info_user"));
	console.info(lat_getCookie("jwt_info_out"));
	
	return <div className={"w3-center"}>
		<h4>Welcome To App Home</h4>
	</div>;
};

export default AppHome;