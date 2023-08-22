import React, {useEffect, useState} from "react";
import {TypeProfileMin} from "../../modules/interfaces/TypeAll";
import {
	CloseModal, ModalAfterCreate, ModalBeforeCreate, ModalBlock, ModalBoxInput, ModalBoxSelect, ModalFetchList, ModalGetLabels, ModalJaxCreate, ShowModal, ToggleModalButtons
} from "./ModalParts";

const modalId     = "modalAddMember";
const btnYesId    = "btnAddMemberYes";
const resultBarId = "setAddMemberResult";
const btnCancelId = "btnAddMemberCancel";

const memberId   = "member";
const memberRole = "role";

interface Type{
	team : TypeProfileMin,
	project : TypeProfileMin,
}

let setContextState : ((obj : Type) => void) | undefined;

export const ModalAddMember = () => {
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
		            head={"Add Member"}
		            sub={"Please enter member details"}
		            resultBarId={resultBarId}
		            closeModal={closeModal} onYes={() => doAddMember(context)}
		            labels={labels}
		            btnYes={{id : btnYesId, enable : enable}}
		            btnCancel={{id : btnCancelId, enable : enable}}
		            component={
			            <>
				            <ModalBoxSelect id={memberId} enable={enable} required={true} list={people}/>
				            <ModalBoxInput id={memberRole} enable={enable} placeholder={"Member Role"} required={true}/>
			            </>
		            }/>
	</>;
};

const closeModal    = () => CloseModal(modalId, resultBarId, toggleButtons);
const toggleButtons = (enable = true) => ToggleModalButtons(`${btnYesId} ${btnCancelId}`, enable);
const doAddMember   = (Context : Type | undefined) => {
	ModalBeforeCreate(Context, resultBarId, modalId, (inputs) => {
		inputs.team    = Context?.team.id;
		inputs.project = Context?.project.id;
		
		ModalJaxCreate(inputs, "member", toggleButtons, (result, data) => {
			ModalAfterCreate(result, data, resultBarId, toggleButtons);
		});
	});
};

export const showModalAddMember = ({project, team} : Type) => ShowModal(modalId, {project, team}, resultBarId, setContextState);