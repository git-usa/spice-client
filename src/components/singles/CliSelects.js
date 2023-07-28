import type {TypePeople} from "../../modules/interfaces/TypePeople";
import type {TypeProject} from "../../modules/interfaces/TypeProject";

export const SelPeople = (props : { peopleList : TypePeople[] }) => {
	
	const optionList = props.peopleList.map(v => {
		return <option value={v._id} className={"la-capital"}>{`${v.name} | ${v.role}`}</option>;
	});
	
	return <select id={"peopleid"}>{optionList}</select>;
};

export const SelProject = (props : { projectList : TypeProject[] }) => {
	
	const optionList = props.projectList.map(v => {
		return <option key={`selProject${v._id}`} value={v._id} className={"la-capital"}>{`${v.name} | ${v.category}`}</option>;
	});
	
	return <select id={"project"}>{optionList}</select>;
};