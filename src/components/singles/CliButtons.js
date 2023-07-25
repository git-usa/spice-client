const classes = (colorClass? : string) => `w3-button w3-ripple ${colorClass || "w3-khaki"}`;

export const BtnRegister
	             = (props : { onclick : (e : MouseEvent) => void, colorClass? : string }) => <div onClick={props.onclick}
	                                                                                              className={classes(props.colorClass || "w3-green")}>Register</div>;
