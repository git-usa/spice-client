import Sample1 from "./Sample1";
import Sample2 from "./Sample2";
import Sample3 from "./Sample3";
import Blank from "./Blank";

const useTestComponent = (link, data) => {
	switch(link){
		case "first":
			return <><h3>First Component Stage</h3></>;
		case"sample1":
			return <Sample1 value={data}/>;
		case"sample2":
			return <Sample2 value={data}/>;
		case"sample3":
			return <Sample3 value={data}/>;
		default:
			return <Blank/>;
	}
};

export default useTestComponent;