import {useEffect, useState} from "react";

const navLinks = {
	home      : "home",
	solutions : "#solutions",
	contact   : "#contact",
	demo      : "demo",
	app       : "app"
};

const showLinks = (classes) => Object.keys(navLinks)
                                     .map(v => <a key={`navBarLink${v}`} href={navLinks[v]} className={classes}>{v}</a>);

const MobileNavMenu = (props : { leftPos : string }) =>
	<>
		<div className={"mobile-nav-menu la-container w3-hide-large"} style={{left : props.leftPos}}>
			<div className={"la-s65 w3-black nav-links w3-large"}>
				{showLinks("mobile-nav-link")}
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

const ShowDesktopNav = () => {
	return <div className={"la-s100 la-l50 w3-center w3-xlarge w3-hide-small"}>
		{showLinks("nav-links")}
	</div>;
};

const BarIcons = () => {
	return <>
		<div className={"la-container flex-center-vertical headBar front w3-text-white"}>
			<h1 className={"la-s100 la-l50 w3-center la-bold"}>Infotropy</h1>
			<ShowDesktopNav/>
		</div>
		{<ShowMobileNav/>}
	</>;
};

const NavBar = () => {
	useEffect(() => {
		window.onscroll = () => {
			const rest = document.getElementById("headBarBack");
			if(!rest) return;
			rest.style.opacity = window.scrollY > 10 ? 0.8 : 0;
		};
	}, []);
	
	return <>
		<div className={"headBar"}>
			<div id={"headBarBack"} className={"headBar w3-black back"}></div>
			<BarIcons/>
		</div>
	</>;
};

export default NavBar;