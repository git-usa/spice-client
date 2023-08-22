export const ladyDate : {
	date : string,
	weekday : string,
	monthName : string,
	day : string,
	month : string,
	year : string,
	hour : string,
	minute : string,
	second : string,
	merid : string,
	HOUR : string,
	timeZone : string,
	htmlInput : string,
	yearFormat : string,
	dayFormat : string,
	monthFormat : string,
	dayMonthFormat : string,
	time : string,
	time24 : string
};
export const _lady : {
	_nodes : any;
	_ERROR : any;
	_ladyTagsSet : string;
	_mergeLady : (node : any, showNotes? : boolean) => typeof _lady;
	_randomId : () => string;
	_getNode : (nodeId : string, getLadyNode? : boolean) => typeof _lady;
	_getTags : (tagName : string, toArray? : boolean) => any;
	_getTagsByClass : (className : string, toArray? : boolean) => any;
	_getParent : (node? : any) => any;
	_getChild : (match : string, node? : any) => NodeListOf<Element>;
	_createTag : (name : string, content? : string | null, id? : string | null, mergeLady? : boolean, node? : any) => typeof _lady;
	_tag : (name? : string | null, content? : string | null, id? : string | null, mergeLady? : boolean, node? : any) => typeof _lady;
	_attribute : (name : string, value? : any, node? : any) => typeof _lady;
	_attributes : (attributeSet? : {[key : string] : any}, node? : any) => typeof _lady;
	_css : (name : string, value? : string | null, important? : boolean, nodeS? : any) => typeof _lady;
	_style : (styles? : {[key : string] : any}, nodeS? : any) => typeof _lady;
	_classes : (classes : string | string[], add? : boolean, nodeS? : any) => typeof _lady;
	_addClasses : (classes : string | string[], nodeS? : any) => typeof _lady;
	_removeClasses : (classes : string | string[], nodeS? : any) => typeof _lady
	_formatTag : (styles? : {[key : string] : any}, attributes? : {[key : string] : any}, classes? : string[], nodeS? : any) => typeof _lady;
	_font : (family? : string, size? : number, type? : string, unit? : string, node? : any) => typeof _lady;
	_fontSize : (size? : number, unit? : string, node? : any) => typeof _lady;
	_fontFamily : (family? : string, node? : any) => typeof _lady;
	_fontWeight : (weight? : string, node? : any) => typeof _lady;
	_bold : (bold? : boolean, node? : any) => typeof _lady;
	_italics : (italics? : boolean, node? : any) => typeof _lady;
	_color : (color : string, node? : any) => typeof _lady;
	_backColor : (color : string, node? : any) => typeof _lady;
	_text : (node? : any) => string
	_addText : (text : string, node? : any) => typeof _lady;
	_addHtml : (html : string, node? : any) => typeof _lady;
	_replace : (content ? : any, node? : any) => typeof _lady;
	_space : (count : number, node? : any) => typeof _lady;
	_line : (count : number, node? : any) => typeof _lady;
	_capital : (node? : any) => typeof _lady;
	_capitalLines : (node? : any) => typeof _lady;
	_capitalWords : (node? : any) => typeof _lady;
	_copyNode : (id? : string | null, appendTo? : HTMLElement | null, node? : HTMLElement) => HTMLElement | null
	_deleteNode : (nodeId : string, node? : HTMLElement) => HTMLElement | null
	_moveNode : (moveNode : any, beforeNode : any, node? : HTMLElement) => HTMLElement | null
	_div : (content ?: string | null, id ?: string | null, node? : HTMLElement) => typeof _lady;
	_process : (text : string, id : string | null, node? : HTMLElement) => typeof _lady;
	_info : (text : string, id : string | null, node? : HTMLElement) => typeof _lady;
	_error : (text : string, id ? : string | null, node? : HTMLElement) => typeof _lady;
	_pass : (text : string, id : string | null, node? : HTMLElement) => typeof _lady;
	_textToJson(text : string, checkKeys : any[]) : string | object | undefined
	_ladyDate(dateValue : any, toUtc : boolean) : typeof ladyDate | null
	_showVerticalData(data : any[], table : any, heads : any[], schema : any, onShow : any, onClick : any, carry : any) : typeof _lady;
	_showRegularData(data : any[], table : any, heads : any[], schema : any, onShow : any, onClick : any, doSerial : boolean, carry : any) : typeof _lady;
	_showData(data : any[], id ? : string | null, includes ? : string | string[], onShow ? : any, onClick ? : any, doSerial ? : boolean, schema ? : any, vertical? : boolean,
	          carry? : any,
	          node? : any) : typeof _lady;
	_showObject(object : any, id ? : string | null, includes ? : string, onShow ? : any, onClick ? : any, schema ? : any, vertical ? : boolean, carry ? : any,
	            node? : HTMLElement | typeof _lady) : typeof _lady;
	_showRecord(record : any, id ? : string | null, includes ? : string, onShow? : any, schema ? : any, vertical? : boolean, carry? : any,
	            node? : HTMLElement | typeof _lady) : typeof _lady;
	_repeat(tagName : string, times : number, dataItems : any, next : any, repeatData : any, tagIds : string[], styles : {[key : string] : any},
	        attributes : {[key : string] : any}, classes : string[], node? : any) : typeof _lady;
	_count(selector : string, node? : any) : number
	_select(selector : string, node? : any) : NodeListOf<Element>
	_getWidth(node? : any) : number
	_getHeight(node? : any) : number
	_enable(node? : any) : any
	_disable(node? : any) : any
	_click(next : Function, target? : HTMLElement | null, extra? : any, cursor? : boolean, node? : HTMLElement | null) : typeof _lady;
	_enter(next : Function, target? : HTMLElement | null, extra? : any, node? : HTMLElement | null) : typeof _lady;
	_hoverCss(newStyleSet : {[key : string] : any}, oldStyleSet : {[key : string] : any} | null, targetNode : HTMLElement | null, node? : HTMLElement | null) : typeof _lady;
	_goTo(url : string, newTab : boolean, cursor : boolean, node? : HTMLElement | null) : typeof _lady;
	_showForm(schema : any, inputClass : string | null, id : string | null, next : Function | undefined, submitId : string | null, method : string,
	          node? : HTMLElement | null) : typeof _lady;
	_getInputs<T>(selector ? : string, all ? : boolean, mustRequired ? : boolean, getArray ? : boolean, trim ? : boolean,
	              node? : HTMLElement | null) : T | {[key : string] : string} | string[] | string | null
	_clearInputs(selector : string, node? : HTMLElement | null) : NodeListOf<Element> | null
	_next(next : Function | undefined, node? : HTMLElement | null) : typeof _lady;
};

export const _l : (id : string, tagName? : string | null, content? : string | null, node? : any) => typeof _lady;

export const _ladEleById : <T>(id : string) => T;

export default _l;