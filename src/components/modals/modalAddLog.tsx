import React, {useEffect, useState} from "react";
import {TypeProfileMin} from "../../modules/interfaces/TypeAll";
import {CloseModal, ModalAfterCreate, ModalBeforeCreate, ModalBlock, ModalBoxInput, ModalGetLabels, ModalJaxCreate, ShowModal, ToggleModalButtons} from "./ModalParts";

const modalId     = "modalAddLog";
const btnYesId    = "btnAddTaskYes";
const resultBarId = "setAddLogResult";
const btnCancelId = "btnAddTaskCancel";

const logAction = "action";
const logBrief  = "brief";

interface Type{
	path : string,
	brief? : string,
	document : TypeProfileMin,
}

let setContextState : ((obj : Type) => void) | undefined;

export const ModalAddLog = () => {
	const [context, setContext] = useState<Type>();
	const [enable, setEnable]   = useState<boolean>(false);
	
	useEffect(() => {
		setContextState = setContext;
		setEnable(true);
		return () => {
			setContextState = undefined;
		};
	}, []);
	
	const labels : TypeModalLabel[] = ModalGetLabels(context);
	
	return <>
		<datalist id={"actionsList"}>
			{
				["logged", "authenticated", "uploaded", "updated", "created", "completed", "tested"].map(action => <option key={`logAction${action}`}>{action}</option>)
			}
		</datalist>
		<ModalBlock modalId={modalId}
		            head={"Add Log"}
		            sub={""}
		            resultBarId={resultBarId}
		            closeModal={closeModal} onYes={() => doAddLog(context)}
		            labels={labels}
		            btnYes={{id : btnYesId, enable : enable}}
		            btnCancel={{id : btnCancelId, enable : enable}}
		            component={
			            <>
				            <ModalBoxInput id={logAction} list={"actionsList"} enable={enable} placeholder={"Log Action"} required={true}/>
				            <ModalBoxInput id={logBrief} enable={enable} placeholder={"Log Brief"} required={true}/>
			            </>
		            }/>
	</>;
};

const closeModal = () => CloseModal(modalId, resultBarId, toggleButtons);

const toggleButtons = (enable = true) => ToggleModalButtons(`${btnYesId} ${btnCancelId}`, enable);

const doAddLog = (Context : Type | undefined) => {
	ModalBeforeCreate(Context, resultBarId, modalId, (inputs) => {
		inputs.path     = Context?.path;
		inputs.document = Context?.document.id;
		
		ModalJaxCreate(inputs, "log", toggleButtons, (result, data) => {
			ModalAfterCreate(result, data, resultBarId, toggleButtons);
		});
	});
};

export const showModalAddLog = ({document, path, brief} : Type) => ShowModal(modalId, {document, path, brief}, resultBarId, setContextState);