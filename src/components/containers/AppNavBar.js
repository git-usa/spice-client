import {useEffect, useState} from "react";
import type {TypePeople} from "../../modules/interfaces/TypePeople";
import type {HandleComponentJax} from "../../modules/interfaces/TypeJax";

const navLinks = {
	profile : "#profile",
	logout  : "#logout"
};

interface Type{
	user : TypePeople;
	cbHandler : HandleComponentJax;
}

const ShowLinks = ({classes} : { classes : string }) => {
	
	const user      = global.props.user;
	const cbHandler = global.props.cbHandler;
	
	return Object.keys(navLinks)
	             .map(v => <a href={navLinks[v]}
	                          className={classes}
	                          key={`loginNavBarLink${v}`}
	                          onClick={() => cbHandler(v, {of : "people", by : user._id})}>{v}</a>);
};

const MobileNavMenu = ({leftPos} : { leftPos : string }) => <>
	<div className={"mobile-nav-menu la-container w3-hide-large"} style={{left : leftPos}}>
		<div className={"la-s65 w3-black nav-links w3-large"}>
			<ShowLinks classes={"mobile-nav-link"}/>
		</div>
		
		{/* MAKE REMAINING BLANK SPACE/SCREEN TRANSPARENT/OPAQUE  */}
		<div className={"la-s35 w3-black nav-blank"}></div>
	</div>
</>;

const ShowMobileNav = () => {
	const [showNav, setShowNav] = useState(false);
	
	const show = (toggleId) => {
		document.getElementById(toggleId).classList.toggle("menu-toggle");
		setShowNav(!showNav);
	};
	
	return <>
		<MobileNavMenu leftPos={showNav ? "0" : "-100%"}/>
		<div id={"menuX"} onClick={() => show("menuX")} className={"mobile-nav-btn w3-hide-large"}>
			<div className={"menu-bar1 w3-white"}></div>
			<div className={"menu-bar2 w3-yellow"}></div>
			<div className={"menu-bar3 w3-orange"}></div>
		</div>
	</>;
	
};

const ShowDesktopNav = () =>
	<div className={"la-s100 la-l50 w3-center w3-xlarge w3-hide-small"}>
		<ShowLinks classes={"nav-links"}/>
	</div>;

const BarIcons = () => {
	return <>
		<div className={"la-container flex-center-vertical headBar front w3-text-white"}>
			<h1 className={"la-s100 la-l50 w3-center la-bold"}>Infotropy</h1>
			<ShowDesktopNav/>
		</div>
		{<ShowMobileNav/>}
	</>;
};

/**
 * Component to Show App Navigation Bar After Login
 * @returns {JSX.Element}
 * @constructor
 * @param props
 */

const AppNavBar = (props : Type) => {
	useEffect(() => {
		window.onscroll = () => {
			const rest = document.getElementById("headBarBack");
			if(!rest) return;
			rest.style.opacity = window.scrollY > 10 ? 0.8 : 0;
		};
	}, []);
	
	global.props = props;
	
	return <>
		<div className={"headBar"}>
			<div id={"headBarBack"} className={"headBar w3-black back"}></div>
			<BarIcons cbHandler={props.cbHandler} user={props.user}/>
		</div>
	</>;
};

export default AppNavBar;