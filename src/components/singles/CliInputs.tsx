import React from "react";
import {forwardRef} from "react";
import {TypeInput} from "../../modules/interfaces/TypeInput";

export const CliInput = (props : TypeInput) =>
	<input id={props.id}
	       name={props.id}
	       onKeyDown={props.onEnter}
	       required={props.required || false}
	       type={props.type || "text"}
	       placeholder={props.placeholder || ""}
	       className={`w3-input la-input ${props.classes}`}/>;

export const CliText = (props : TypeInput) =>
	<textarea id={props.id}
	          name={props.id}
	          onKeyDown={props.onEnter}
	          required={props.required}
	          placeholder={props.placeholder || ""}
	          className={`w3-input la-input ${props.classes}`}></textarea>;

export const InpName       = (props : TypeInput) => CliInput({...props, placeholder : "Name"});
export const InpRole       = (props : TypeInput) => CliInput({...props, placeholder : "Role"});
export const InpBrief      = (props : TypeInput) => CliInput({...props, placeholder : "Brief"});
export const InpLogin      = (props : TypeInput) => CliInput({...props, placeholder : "Login"});
export const InpCategory   = (props : TypeInput) => CliInput({...props, placeholder : "Category"});
export const InpPassword   = (props : TypeInput) => CliInput({...props, placeholder : "Password", type : "password"});
export const InpRePassword = (props : TypeInput) => CliInput({...props, placeholder : "Retype Password", type : "password"});
export const InpMessage    = (props : TypeInput) => CliText({...props, placeholder : "Enter Message"});

export const RefSubject =
	             forwardRef<HTMLInputElement, TypeInput>((props, ref) => {
		             return <input ref={ref}
		                           id={props.id}
		                           defaultValue={props.value || ""}
		                           name={props.id}
		                           onKeyDown={props.onEnter}
		                           required={props.required}
		                           placeholder={props.placeholder || "Subject"}
		                           className={`w3-input la-input ${props.classes}`}/>;
	             });
export const RefMessage =
	             forwardRef<HTMLTextAreaElement, TypeInput>
	             ((props, ref) =>
		              <textarea ref={ref}
		                        id={props.id}
		                        name={props.id}
		                        onKeyDown={props.onEnter}
		                        required={props.required}
		                        defaultValue={props.value}
		                        placeholder={props.placeholder || "Message"}
		                        className={`w3-input la-input ${props.classes}`}></textarea>);