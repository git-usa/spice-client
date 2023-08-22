import React, {useEffect, useState} from "react";
import {TypeProfileMin} from "../../modules/interfaces/TypeAll";
import {CloseModal, ModalAfterCreate, ModalBeforeCreate, ModalBlock, ModalBoxInput, ModalGetLabels, ModalJaxCreate, ShowModal, ToggleModalButtons} from "./ModalParts";

const modalId     = "modalAddTask";
const btnYesId    = "btnAddTaskYes";
const resultBarId = "setAddTaskResult";
const btnCancelId = "btnAddTaskCancel";

const taskTitle    = "title";
const taskBrief    = "brief";
const taskCategory = "category";

interface Type{
	team : TypeProfileMin,
	member : TypeProfileMin,
	project : TypeProfileMin,
}

let setContextState : ((obj : Type) => void) | undefined;

export const ModalAddTask = () => {
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
		<ModalBlock modalId={modalId}
		            head={"Add Task"}
		            sub={"Please enter task details"}
		            resultBarId={resultBarId}
		            closeModal={closeModal} onYes={() => doAddTask(context)}
		            labels={labels}
		            btnYes={{id : btnYesId, enable : enable}}
		            btnCancel={{id : btnCancelId, enable : enable}}
		            component={
			            <>
				            <ModalBoxInput id={taskTitle} enable={enable} placeholder={"Task Title"} required={true}/>
				            <ModalBoxInput id={taskCategory} enable={enable} placeholder={"Task Category"} required={true}/>
				            <ModalBoxInput id={taskBrief} enable={enable} placeholder={"Task Brief"} required={false}/>
			            </>
		            }/>
	</>;
};

const closeModal = () => CloseModal(modalId, resultBarId, toggleButtons);

const toggleButtons = (enable = true) => ToggleModalButtons(`${btnYesId} ${btnCancelId}`, enable);

const doAddTask = (Context : Type | undefined) => {
	ModalBeforeCreate(Context, resultBarId, modalId, (inputs) => {
		inputs.team    = Context?.team.id;
		inputs.member  = Context?.member.id;
		inputs.project = Context?.project.id;
		
		ModalJaxCreate(inputs, "task", toggleButtons, (result, data) => {
			ModalAfterCreate(result, data, resultBarId, toggleButtons);
		});
	});
};

export const showModalAddTask = ({project, team, member} : Type) => ShowModal(modalId, {project, team, member}, resultBarId, setContextState);