import React, {useEffect, useState} from "react";
import {TypeProfileMin} from "../../modules/interfaces/TypeAll";
import {
	CloseModal, ModalAfterCreate, ModalBeforeCreate, ModalBlock, ModalBoxInput, ModalBoxSelect, ModalFetchList, ModalGetLabels, ModalJaxCreate, ShowModal, ToggleModalButtons
} from "./ModalParts";

const modalId     = "modalAddTeam";
const btnYesId    = "btnAddTeamYes";
const resultBarId = "setAddTeamResult";
const btnCancelId = "btnAddTeamCancel";

const teamName     = "name";
const teamBrief    = "brief";
const teamCategory = "category";
const teamManager  = "manager";

interface Type{
	project : TypeProfileMin,
}

let setContextState : ((obj : Type) => void) | undefined;

export const ModalAddTeam = () => {
	const [context, setContext] = useState<Type>();
	const [enable, setEnable]   = useState<boolean>(false);
	const [people, setPeople]   = useState<TypeProfileMin[] | undefined>(undefined);
	
	useEffect(() => {
		setContextState = setContext;
		ModalFetchList(setEnable, resultBarId, setPeople, people);
		return () => {
			setContextState = undefined;
		};
	}, []);
	
	const labels : TypeModalLabel[] = ModalGetLabels(context);
	
	return <>
		<ModalBlock modalId={modalId}
		            head={"Add Team"}
		            sub={"Please enter team details"}
		            resultBarId={resultBarId}
		            closeModal={closeModal} onYes={() => doAddTeam(context)}
		            labels={labels}
		            btnYes={{id : btnYesId, enable : enable}}
		            btnCancel={{id : btnCancelId, enable : enable}}
		            component={
			            <>
				            <ModalBoxInput id={teamName} enable={enable} placeholder={"Team Name"} required={true}/>
				            <ModalBoxInput id={teamCategory} enable={enable} placeholder={"Team Category"} required={true}/>
				            <ModalBoxInput id={teamBrief} enable={enable} placeholder={"Team Brief"} required={true}/>
				            <ModalBoxSelect id={teamManager} enable={enable} required={true} list={people}/>
			            </>
		            }/>
	</>;
};

const closeModal = () => CloseModal(modalId, resultBarId, toggleButtons);

const toggleButtons = (enable = true) => ToggleModalButtons(`${btnYesId} ${btnCancelId}`, enable);

const doAddTeam = (Context : Type | undefined) => {
	ModalBeforeCreate(Context, resultBarId, modalId, (inputs) => {
		inputs.project = Context?.project.id;
		
		ModalJaxCreate(inputs, "team", toggleButtons, (result, data) => {
			ModalAfterCreate(result, data, resultBarId, toggleButtons);
		});
	});
};

export const showModalAddTeam = ({project} : Type) => ShowModal(modalId, {project}, resultBarId, setContextState);