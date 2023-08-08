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
	_mergeLady : (node : any, showNotes? : boolean) => any;
	_randomId : () => string;
	_getNode : (nodeId : string, getLadyNode? : boolean) => any;
	_getTags : (tagName : string, toArray? : boolean) => any;
	_getTagsByClass : (className : string, toArray? : boolean) => any;
	_getParent : (node? : any) => any;
	_getChild : (match : string, node? : any) => NodeListOf<Element>;
	_createTag : (name : string, content? : string | null, id? : string | null, mergeLady? : boolean, node? : any) => any;
	_tag : (name? : string | null, content? : string | null, id? : string | null, mergeLady? : boolean, node? : any) => any;
	_attribute : (name : string, value? : any, node? : any) => any;
	_attributes : (attributeSet? : {[key : string] : any}, node? : any) => any;
	_css : (name : string, value? : string | null, important? : boolean, nodeS? : any) => any;
	_style : (styles? : {[key : string] : any}, nodeS? : any) => any;
	_classes : (classes : string | string[], add? : boolean, nodeS? : any) => any;
	_addClasses : (classes : string | string[], nodeS? : any) => any;
	_removeClasses : (classes : string | string[], nodeS? : any) => any;
	_formatTag : (styles? : {[key : string] : any}, attributes? : {[key : string] : any}, classes? : string[], nodeS? : any) => any;
	_font : (family? : string, size? : number, type? : string, unit? : string, node? : any) => any;
	_fontSize : (size? : number, unit? : string, node? : any) => any;
	_fontFamily : (family? : string, node? : any) => any;
	_fontWeight : (weight? : string, node? : any) => any;
	_bold : (bold? : boolean, node? : any) => any;
	_italics : (italics? : boolean, node? : any) => any;
	_color : (color : string, node? : any) => any;
	_backColor : (color : string, node? : any) => any
	_text : (node? : any) => string
	_addText : (text : string, node? : any) => any
	_addHtml : (html : string, node? : any) => any
	_replace : (content : string | null, node? : any) => any
	_space : (count : number, node? : any) => any
	_line : (count : number, node? : any) => any
	_capital : (node? : any) => any
	_capitalLines : (node? : any) => any
	_capitalWords : (node? : any) => any
	_copyNode : (id? : string | null, appendTo? : HTMLElement | null, node? : HTMLElement) => HTMLElement | null
	_deleteNode : (nodeId : string, node? : HTMLElement) => HTMLElement | null
	_moveNode : (moveNode : any, beforeNode : any, node? : HTMLElement) => HTMLElement | null
	_div : (content : string | null, id : string | null, node? : HTMLElement) => HTMLElement | null
	_process : (text : string, id : string | null, node? : HTMLElement) => HTMLElement | null
	_info : (text : string, id : string | null, node? : HTMLElement) => HTMLElement | null
	_error : (text : string, id : string | null, node? : HTMLElement) => HTMLElement | null
	_pass : (text : string, id : string | null, node? : HTMLElement) => HTMLElement | null
	_textToJson(text : string, checkKeys : any[]) : string | object | undefined
	_ladyDate(dateValue : any, toUtc : boolean) : typeof ladyDate | null
	_showVerticalData(data : any[], table : any, heads : any[], schema : any, onShow : any, onClick : any, carry : any) : any
	_showRegularData(data : any[], table : any, heads : any[], schema : any, onShow : any, onClick : any, doSerial : boolean, carry : any) : void
	_showData(data : any[], id : string | null, includes : string | string[], onShow : any, onClick : any, doSerial : boolean, schema : any, vertical? : boolean, carry? : any,
	          node? : any) : any
	_showObject(object : any, id : string | null, includes : string | string[], onShow : any, onClick : any, schema : any, vertical : boolean, carry : any, node? : any) : any
	_repeat(tagName : string, times : number, dataItems : any, next : any, repeatData : any, tagIds : string[], styles : {[key : string] : any},
	        attributes : {[key : string] : any}, classes : string[], node? : any) : any
	_count(selector : string, node? : any) : number
	_select(selector : string, node? : any) : NodeListOf<Element>
	_getWidth(node? : any) : number
	_getHeight(node? : any) : number
	_enable(node? : any) : any
	_disable(node? : any) : any
	_click(next : Function, target? : HTMLElement | null, extra? : any, cursor? : boolean, node? : HTMLElement | null) : HTMLElement | null
	_enter(next : Function, target? : HTMLElement | null, extra? : any, node? : HTMLElement | null) : HTMLElement | null
	_hoverCss(newStyleSet : {[key : string] : any}, oldStyleSet : {[key : string] : any} | null, targetNode : HTMLElement | null, node? : HTMLElement | null) : HTMLElement | null
	_goTo(url : string, newTab : boolean, cursor : boolean, node? : HTMLElement | null) : HTMLElement | null
	_showForm(schema : any, inputClass : string | null, id : string | null, next : Function | undefined, submitId : string | null, method : string,
	          node? : HTMLElement | null) : HTMLElement | null
	_getInputs<T>(selector : string, all ? : boolean, mustRequired ? : boolean, getArray ? : boolean, trim ? : boolean,
	              node? : HTMLElement | null) : T | {[key : string] : string} | string[] | string | null
	_clearInputs(selector : string, node? : HTMLElement | null) : NodeListOf<Element> | null
	_showRecord(record : any, id : string | null, node? : HTMLElement | null) : HTMLElement | null
	_next(next : Function | undefined, node? : HTMLElement | null) : HTMLElement | null
};

export const _l : (id : string, tagName? : string | null, content? : string | null, node? : any) => typeof _lady;

export const _ladEleById : <T>(id : string) => T;

export default _l;