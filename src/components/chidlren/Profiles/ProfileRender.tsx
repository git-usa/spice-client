import React, {useEffect} from "react";
import _l from "../../../modules/scripts/_lady";
import {TypeRender} from "../../../modules/interfaces/TypeAll";

interface Type extends TypeRender{
	profile : any;
}

const ProfileRender = ({profile, id = "profileTab", includes = "name status createdAt", onShow, carry = true} : Type) => {
	useEffect(() => {
		console.info("RENDERING PROFILE");
		_l(id)._replace()
		      ._showObject(profile, null, includes, onShow, null, {createdAt : {input : "date"}}, false, carry)
		      ._classes("w3-table-all");
	}, [profile, id, includes, onShow]);
	
	return <>
		<div id={id}></div>
	</>;
};

export default ProfileRender;