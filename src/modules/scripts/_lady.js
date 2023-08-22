export const _lady = {
	_nodes       : {},
	_ERROR       : null,
	_ladyTagsSet : "LADY TAGS SET",
	
	_mergeLady : function(node, showNotes = false){
		// If Node already has _lady Properties, Return Node
		if(node.hasOwnProperty("_ladyTagsSet") && node._ladyTagsSet === "LADY TAGS SET"){
			if(showNotes) console.info("Already Merged");
			return node;
		}
		
		// Merge All _lady Properties with DOM Node
		for(let item in this){
			if(this.hasOwnProperty(item)) node[item] = this[item];
		}
		
		// Return _lady Node
		return node;
	},
	
	// RANDOM NUMBER GENERATOR FOR TAG IDS
	_randomId : function(){
		return Math.floor((1 + Math.random()) * 0x10000).toString(16) + "_" + Date.now() + "_"
		       + document.getElementsByTagName("*").length;
	},
	
	/**
	 *--------------------------------------------------------------------
	 * DOM FUNCTIONS
	 *-------------------------------------------------------------------
	 **/
	
	// GET DOM HTML NODE / TAG BY ID
	_getNode : function(nodeId, getLadyNode = true){
		const node = document.getElementById(nodeId);
		if(!node) return null;
		return getLadyNode ? this._mergeLady(node) : node;
	},
	
	// GET DOM HTML NODES / TAGS BY NAME
	_getTags : function(tagName, toArray = false){
		const tags = document.getElementsByTagName(tagName);
		if(!tags) return null;
		return toArray ? Array.from(tags) : tags;
	},
	
	// GET DOM HTML NODES / TAGS BY CLASS NAME
	_getTagsByClass : function(className, toArray = false){
		const tags = document.getElementsByClassName(className);
		if(!tags) return null;
		return toArray ? Array.from(tags) : tags;
	},
	
	// GET THE DOM PARENT OF DOM Object
	_getParent : function(node = this){
		return node.parentElement;
	},
	
	_getChild : function(match, node = this){
		return node.querySelectorAll(match);
	},
	
	/**
	 *--------------------------------------------------------------------
	 * HTML TAG CREATIVE FUNCTIONS
	 *-------------------------------------------------------------------
	 **/
	
	/**
	 * CREATE DOM TAG
	 * @param name
	 * @param content
	 * @param id
	 * @param mergeLady
	 * @param node
	 */
	_createTag : function(name, content = null, id = null, mergeLady = true, node = this){
		id = id ? id : this._randomId();
		
		if(this._nodes[id]){
			console.error("_createTag: Tag ID Exists => " + id);
			return null;
		}
		
		if(document.getElementById(id)){
			console.error("_createTag: Tag ID Exists in DOM => " + id);
			return null;
		}
		
		const tag = mergeLady ? this._mergeLady(document.createElement(name)) : document.createElement(name);
		// Set Tag ID
		tag.id    = id;
		
		// SET Content
		tag.innerHTML = content;
		
		// Append TAG to DOM | NODE
		node.appendChild(tag);
		/*if(node._nodes)
		 node._nodes[id] = tag;*/
		
		return tag;
	},
	
	_tag : function(name = null, content = null, id = null, mergeLady = true, node = this){
		return id && !name ? this._getNode(id, mergeLady) : this._createTag(name, content, id, mergeLady, node);
	},
	
	/**
	 *--------------------------------------------------------------------
	 * HTML TAG FORMATIVE FUNCTIONS
	 *-------------------------------------------------------------------
	 **/
	
	// SET SINGLE ATTRIBUTE IF VALUE IS DEFINED
	// GET SINGLE ATTRIBUTE IF NO VALUE IS DEFINED
	_attribute : function(name, value = undefined, node = this){
		if(!value) return node.getAttribute(name);
		node.setAttribute(name, value);
		return node;
	},
	
	// SET MULTIPLE ATTRIBUTES
	_attributes : function(attributeSet = {}, node = this){
		try{
			let attribute;
			for(attribute in attributeSet){
				if(!attributeSet.hasOwnProperty(attribute)) continue;
				node.setAttribute(attribute, attributeSet[attribute]);
			}
		} catch(e){
			console.error(e);
		}
		
		return node;
	},
	
	// GET/SET SINGLE CSS PROPERTY ON SINGLE/MULTIPLE NODES(S)
	_css : function(name, value = null, important = true, nodeS = this){
		if(!value) return getComputedStyle(nodeS)[name];
		
		const change = node => {
			node.style.setProperty(name, value, important ? "important" : null);
			return node;
		};
		
		// node.style[name] = value + (important === true ? ' !important' : '');
		name = name.split(/(?=[A-Z])/);
		name = name.join("-");
		if(nodeS){
			if(Array.isArray(nodeS)){
				if(nodeS.length > 0) nodeS.forEach(node => change(node));
			} else{
				change(nodeS);
			}
		}
		return nodeS;
	},
	
	// SET MULTIPLE CSS PROPERTIES ON SINGLE/MULTIPLE NODES(S)
	_style : function(styles = {}, nodeS = this){
		let styleName;
		
		for(styleName in styles){
			if(!styles.hasOwnProperty(styleName)) continue;
			this._css(styleName, styles[styleName], false, nodeS);
		}
		
		return nodeS;
	},
	
	// ADD/REMOVE CLASSES TO/FROM SINGLE/MULTIPLE NODE(S)
	_classes : function(classes, add = true, nodeS = this){
		classes = (classes instanceof String || typeof classes == "string") ? classes.trim().split(" ") : classes;
		
		const change = (node) => {
			if(node && classes && Array.isArray(classes)){
				classes.forEach(value => {
					value = value.trim();
					if(value.length === 0) return;
					add ? node.classList.add(value) : node.classList.remove(value);
				});
			}
			return node;
		};
		
		if(Array.isArray(nodeS) && nodeS.length > 0) nodeS.forEach(node => change(node)); else change(nodeS);
		
		return nodeS;
	},
	
	// ADD CLASSES TO SINGLE/MULTIPLE NODE(S)
	_addClasses : function(classes, nodeS = this){
		return this._classes(classes, true, nodeS);
	},
	
	// REMOVE CLASSES FROM SINGLE/MULTIPLE NODE(S)
	_removeClasses : function(classes, nodeS = this){
		return this._classes(classes, false, nodeS);
	},
	
	/**
	 * FORMAT SINGLE/MULTIPLE TAG(S)
	 * @param {Object}          styles
	 * @param {Object}          attributes
	 * @param {Array|String}    classes
	 * @param {Array[_lady]|_lady}     nodeS
	 */
	_formatTag : function(styles = {}, attributes = {}, classes = [], nodeS = this){
		this._style(styles, nodeS);
		this._attributes(attributes, nodeS);
		this._classes(classes, true, nodeS);
		return nodeS;
	},
	
	// ADD FONT PROPERTIES
	_font : function(family = "arial", size = 14, type = "normal", unit = "px", node = this){
		return this._css("font", `${type} ${size + unit} ${family}`, true, node);
	},
	
	// CHANGE FONT SIZE
	_fontSize : function(size = 14, unit = "px", node = this){
		return this._css("fontSize", `${size + unit}`, true, node);
	},
	
	// CHANGE FONT FAMILY
	_fontFamily : function(family = "arial", node = this){
		return this._css("fontFamily", family, true, node);
	},
	
	// CHANGE FONT WEIGHT
	_fontWeight : function(weight = "bold", node = this){
		return this._css("fontWeight", weight, true, node);
	},
	
	// SET FONT TO BOLD
	_bold : function(bold = true, node = this){
		return this._fontWeight(bold ? "bold" : "normal", node);
	},
	
	// SET FONT TO ITALICS
	_italics : function(italics = true, node = this){
		return this._css("fontStyle", italics ? "italic" : "normal", true, node);
	},
	
	// ADD FOREGROUND COLOR
	_color : function(color, node = this){
		return this._css("color", color, true, node);
	},
	
	// ADD BACKGROUND COLOR
	_backColor : function(color, node = this){
		return this._css("background", color, true, node);
	},
	
	/**
	 *--------------------------------------------------------------------
	 * HTML TAG CONTENT MANAGEMENT FUNCTIONS
	 *-------------------------------------------------------------------
	 **/
	
	// GET TEXT
	
	_text : function(node = this){
		return node.innerText;
	},
	
	// APPEND TEXT TO TAG
	_addText : function(text, node = this){
		node.appendChild(document.createTextNode(text));
		return node;
	},
	
	// APPEND HTML CONTENT TO TAG
	_addHtml : function(html, node = this){
		const e = () => {
			node.innerHTML += html;
			return node;
		};
		return html === null || !html ? node : e();
	},
	
	// REPLACE ALL CONTENT(HTML) FROM TAG
	_replace : function(content = null, node = this){
		node.innerHTML = content;
		node._nodes    = {};
		return node;
	},
	
	// APPEND SPACE(S) TO TAG
	_space : function(count = 1, node = this){
		while(count > 0){
			this._addText("\u00A0", node);
			--count;
		}
		return node;
	},
	
	// APPEND LINE(S) TO TAG
	_line : function(count = 1, node = this){
		while(count > 0){
			node.appendChild(document.createElement("br"));
			--count;
		}
		return node;
	},
	
	_capital : function(node = this){
		let text = node.textContent;
		if(!text || text.length === 0) return node;
		
		text = text.charAt(0).toUpperCase() + (text.length > 1 ? text.substr(1) : "");
		this._replace(text, node);
		return node;
	},
	
	_capitalLines : function(node = this){
		let text = node.textContent;
		if(!text || text.length === 0) return node;
		
		const lines = text.split(".");
		lines.forEach((line, index) => {
			line         = line.trim();
			lines[index] = line.charAt(0).toUpperCase() + (line.length > 1 ? line.substr(1) : "");
		});
		
		text = lines.join(". ") + ".";
		node._replace(text);
		return node;
	},
	
	_capitalWords : function(node = this){
		let text = node.textContent;
		if(!text || text.length === 0) return node;
		
		// console.info(text);
		
		const words = text.split(" ");
		words.forEach((word, index) => {
			words[index] = word.charAt(0).toUpperCase() + (word.length > 1 ? word.substr(1) : "");
		});
		
		text = words.join(" ");
		node._replace(text);
		return node;
	},
	
	/**
	 *--------------------------------------------------------------------
	 * HTML TAG MANAGEMENT FUNCTIONS
	 *-------------------------------------------------------------------
	 **/
	
	// CREATE A COPY OF AN EXISTING NODE
	// OPTIONAL : APPEND TO ANOTHER DOM NODE
	_copyNode : function(id = null, appendTo = null, node = this){
		id = id ? id : this._randomId();
		
		if(node.hasOwnProperty(id) || document.getElementById(id)){
			console.error("_copyNode: Tag ID Exists => " + id);
			return this._getNode(id);
		}
		
		const newNode = node.cloneNode(true);
		for(let key in node){
			if(node.hasOwnProperty(key)) newNode[key] = node[key];
		}
		
		newNode.id     = id;
		newNode._nodes = {};
		
		if(appendTo) appendTo.appendChild(newNode);
		
		return newNode;
	},
	
	// DELETE NODE | TAG
	_deleteNode : function(nodeId, node = this){
		if(node.hasOwnProperty(nodeId)){
			delete node[nodeId];
		}
		
		const ele = document.getElementById(nodeId);
		if(ele) ele.parentNode.removeChild(ele);
		
		return node;
	},
	
	_moveNode : function(moveNode, beforeNode, node = this){
		node.insertBefore(moveNode, beforeNode);
		return node;
	},
	
	/**
	 *--------------------------------------------------------------------
	 * HTML TAG TEMPLATE FUNCTIONS
	 *-------------------------------------------------------------------
	 **/
	
	// CREATE A DIV TAG
	_div : function(content = null, id = null, node = this){
		return this._tag("div", content, id, true, node);
	},
	
	// SHOW INFO/PROCESSING  MESSAGES
	_process : function(text, id = null, node = this){
		const tag = this._createTag("div", text, id, true, node);
		return tag._style(
			{padding : "6px 9px", backgroundColor : "#b4f1ff", color : "#000", border : "1px solid #0088ff"});
	},
	
	// SHOW INFO/PROCESSING  MESSAGES
	_info : function(text, id = null, node = this){
		return this._process(text, id, node);
		
	},
	
	// SHOW ERROR MESSAGES
	_error : function(text, id = null, node = this){
		const tag = this._createTag("div", text, id, true, node);
		return tag._style(
			{padding : "6px 9px", backgroundColor : "#ffc3c3", color : "#000", border : "1px solid #ff0000"});
	},
	
	// SHOW PASS MESSAGES
	_pass : function(text, id = null, node = this){
		const tag = this._createTag("div", text, id, true, node);
		return tag._style(
			{padding : "6px 9px", backgroundColor : "#c3ffc3", color : "#000", border : "1px solid #00ff00"});
	},
	
	/**
	 *--------------------------------------------------------------------
	 * UTILITY FUNCTIONS
	 *-------------------------------------------------------------------
	 **/
	
	// CONVERT TEXT TO JSON
	_textToJson : function(text, checkKeys = []){
		try{
			const result = JSON.parse(text);
			if(checkKeys && Array.isArray(checkKeys) && checkKeys.length > 0){
				let missingKey = undefined;
				checkKeys.forEach(key => {
					if(!result.hasOwnProperty(key))
						missingKey = key;
				});
				if(missingKey) return `Missing ${missingKey} from Object`;
			}
			return result;
		} catch(e){
			console.error(text);
			return `${e.message} => Check Console for details`;
		}
	},
	
	// LADY DATE FUNCTIONS
	_ladyDate : function(dateValue, toUtc = true){
		if(isNaN(Date.parse(dateValue))) return null;
		const date       = new Date(!toUtc ? dateValue : dateValue.replace(/-/g, "\/").replace(/T.+/, ""));
		const dateFormat = {
			date      : date.toLocaleString("en-us"),
			weekday   : date.toLocaleString("en-us", {weekday : "long"}),
			monthName : date.toLocaleString("en-us", {month : "long"}),
			//
			day   : date.toLocaleString("en-us", {day : "numeric"}),
			month : date.toLocaleString("en-us", {month : "numeric"}),
			year  : date.toLocaleString("en-us", {year : "numeric"}),
			//
			hour   : date.toLocaleString("en-us", {hour : "numeric"}).split(" ")[0].trim(),
			minute : date.toLocaleString("en-us", {minute : "numeric"}),
			second : date.toLocaleString("en-us", {second : "numeric"}),
			merid  : date.toLocaleString("en-us", {hour : "numeric"}).split(" ")[1].trim(),
			//
			HOUR : date.toLocaleString("en-us", {hour12 : false}).split(",")[1].split(":")[0].trim(),
			//
			timeZone       : date.toLocaleString("en-us", {timeZoneName : "short"}),
			htmlInput      : "",
			dayFormat      : "",
			yearFormat     : "",
			monthFormat    : "",
			dayMonthFormat : "",
			time           : "",
			time24         : ""
		};
		
		dateFormat.htmlInput
			= dateFormat.yearFormat
			= dateFormat.year
			  + "-" + (dateFormat.month < 10 ? "0" + dateFormat.month : dateFormat.month)
			  + "-" + (dateFormat.day < 10 ? "0" + dateFormat.day : dateFormat.day);
		
		dateFormat.dayFormat = (dateFormat.day < 10 ? "0" + dateFormat.day : dateFormat.day)
		                       + "-" + (dateFormat.month < 10 ? "0" + dateFormat.month : dateFormat.month)
		                       + "-" + dateFormat.year;
		
		dateFormat.dayMonthFormat = (dateFormat.day < 10 ? "0" + dateFormat.day : dateFormat.day)
		                            + "-" + (dateFormat.monthName)
		                            + "-" + dateFormat.year;
		
		dateFormat.monthFormat = dateFormat.monthName + " " + (dateFormat.day < 10 ? "0" + dateFormat.day : dateFormat.day) + ", " + dateFormat.year;
		
		dateFormat.time   = dateFormat.hour + ":" + dateFormat.minute + ":" + dateFormat.second + " " + dateFormat.merid;
		dateFormat.time24 = dateFormat.HOUR + ":" + dateFormat.minute + ":" + dateFormat.second;
		
		return dateFormat;
	},
	
	_showVerticalData : function(data, table, heads, schema, onShow, onClick, carry){
		heads.forEach(head => {
			const headRow = table._tag("tr");
			headRow._createTag("th", head)._capitalWords()._bold();
			data.forEach(item => {
				const type     = schema && schema[head] && schema[head].input;
				const value    = item[head];
				const isDate   = type && type.toLowerCase() === "date" && this._ladyDate(value);
				const dataCell = headRow._createTag("td", isDate ? `${isDate.dayMonthFormat}` : value);
				
				if(onShow) onShow(dataCell, head, value, item, carry);
				if(onClick) dataCell._click(onClick, dataCell, item, true);
			});
		});
		return table;
	},
	
	_showRegularData : function(data, table, heads, schema, onShow, onClick, doSerial, carry){
		const headRow = table._tag("tr");
		if(doSerial) heads.unshift("#");
		
		heads.forEach(head => headRow._createTag("td", head)._capitalWords()._bold());
		
		/* doSerial && table._tag("tr")
		 ._createTag("td", `Total Records : ${data.length}`)
		 ._attributes({colSpan : ++heads.length})
		 ._bold(); */
		
		let count = 0;
		data.forEach(item => {
			++count;
			const dataRow = table._tag("tr");
			heads.forEach(
				head => {
					const type   = schema && schema[head] && schema[head].input;
					const value  = head.toLowerCase() === "#" ? count : item[head];
					const isDate = type && type.toLowerCase() === "date" && this._ladyDate(value);
					const cell   = dataRow._tag("td", isDate ? `${isDate.dayMonthFormat}` : value);
					if(onShow) onShow(cell, item, carry, head, value);
				}
			);
			
			if(onShow) onShow(dataRow, item, carry);
			
			if(onClick) dataRow._click(onClick, dataRow, item, carry);
		});
		
		doSerial && table._tag("tr")._createTag("td", `Total Records : ${data.length}`)._attributes({colSpan : ++heads.length})._bold();
	},
	
	/**
	 * SHOW JSON DATA FROM ARRAY OF OBJECTS IN TABULAR MODEL
	 * @param data			Array of JSON Objects
	 * @param id			ID of Node, OPTIONAL, null for automate
	 * @param includes		OPTIONAL Array or String, Only show selective fields
	 * @param onShow		OPTIONAL Function, for each row shown
	 * @param onClick		OPTIONAL Function, when a row is clicked
	 * @param doSerial		OPTIONAL Boolean, for Numbering/Serialization of rows
	 * @param schema		OPTIONAL JSON, Schema of the fields shown in table
	 * @param vertical		OPTIONAL Boolean, to show only one head per row
	 * @param carry
	 * @param node			DEFAULT this, DOM Element/Node to show data
	 * @return {*}
	 */
	
	_showData : function(data, id, includes, onShow, onClick, doSerial, schema, vertical = false, carry = null, node = this){
		// if(!data || !data.length) return null;
		const keys = Object.keys(data[0]);
		
		const exclude = includes && includes.trim() && includes.length > 0 && includes.charAt(0) === "!";
		includes      = includes && includes.length > 0 && includes.trim().substring(exclude ? 1 : 0).split(" ");
		
		const heads = !includes ? keys
		                        : (!exclude
		                           ? includes
		                           : keys.filter(value => !includes.includes(value.toLowerCase())));
		
		const table = this._tag("table", null, id, true, node);
		
		vertical ? this._showVerticalData(data, table, heads, schema, onShow, onClick, carry)
		         : this._showRegularData(data, table, heads, schema, onShow, onClick, doSerial, carry);
		
		return table;
	},
	
	_showObject : function(object, id, includes, onShow, onClick, schema, vertical = false, carry = null, node = this){
		return this._showData([object], id, includes, onShow, onClick, false, schema, vertical, carry, node);
	},
	
	/**
	 *--------------------------------------------------------------------
	 * HTML TAG UTILITY FUNCTIONS
	 *-------------------------------------------------------------------
	 **/
	
	/**
	 *
	 * @param tagName	Name of Tag
	 * @param times	Number of Times to Repeat
	 * @param dataItems
	 * @param repeatData
	 * @param tagIds
	 * @param styles
	 * @param attributes
	 * @param classes
	 * @param next
	 * @param node
	 * @return {{_lady}|[_lady]}
	 */
	_repeat    : function(tagName, times = 2, dataItems, next, repeatData, tagIds, styles, attributes, classes, node = this){
		for(let index = 0; index < times; index++){
			const value = (dataItems && dataItems[index]) || repeatData;
			const tag   = this._tag(tagName, value, (tagIds && tagIds[index]) || null, true, node)._style(styles)._attributes(attributes)._classes(classes);
			if(next) next(tag, value, index);
		}
		
		return node;
	},
	_count     : function(selector, node = this){return node.querySelectorAll(selector).length;},
	_select    : function(selector, node = this){return node.querySelectorAll(selector);},
	_getWidth  : function(node = this){return node.offsetWidth;},
	_getHeight : function(node = this){return node.offsetHeight;},
	_enable    : function(node = this){
		node.disabled = false;
		return node;
	},
	_disable   : function(node = this){
		node.disabled = true;
		return node;
	},
	
	/**
	 *--------------------------------------------------------------------
	 * DOM EVENT MANAGEMENT
	 *--------------------------------------------------------------------
	 **/
	
	_click : function(next, target = this, extra = null, cursor = true, node = this){
		node.onclick = event => next(event, target, extra);
		if(cursor) this._css("cursor", "pointer", true, node);
		return node;
	},
	
	_enter : function(next, target = this, extra = null, node = this){
		node.onkeyup = event => {
			if((next && event.which || event.charCode || event.keyCode) === 13){
				next(event, target, extra);
				return false;
			} else return true;
		};
		
		return node;
	},
	
	_hoverCss : function(newStyleSet, oldStyleSet = null, targetNode = this, node = this){
		// Get Current CSS of Target Node if OLD Css is missing
		const computedCss = !oldStyleSet ? window.getComputedStyle(targetNode) : oldStyleSet;
		
		// Save Old Values of New Styles of Target Node
		let oldCss = {};
		for(let newCss in newStyleSet){
			if(!newStyleSet.hasOwnProperty(newCss))
				continue;
			
			oldCss[newCss] = !oldStyleSet ? computedCss.getPropertyValue(newCss) : computedCss[newCss];
		}
		
		node.onmouseover  = () => this._style(newStyleSet, targetNode);
		node.onmouseleave = () => this._style(oldCss, targetNode);
		
		return node;
	},
	_goTo     : function(url, newTab = false, cursor = true, node = this){
		node.onclick = (event) => {
			event.stopPropagation();
			event.cancelBubble = true;
			newTab ? window.open(url, "_blank") : window.location = url;
		};
		if(cursor) this._style({cursor : "pointer"}, node);
		return node;
	},
	
	/**
	 *--------------------------------------------------------------------
	 * FORM MANAGEMENT
	 *--------------------------------------------------------------------
	 */
	
	_showForm : function(schema, inputClass = null, id = null, next = null, submitId = null, method = "post", node = this){
		const form = this._tag("form", null, id, true, node);
		form._attributes({method});
		schema && Array.isArray(schema) && schema.forEach(field => {
			const name  = field.name;
			const type  = field.type;
			const hint  = field.hint;
			const value = field.value;
			
			let tag : null;
			
			switch(type){
				case "button":
					tag = form._tag("button", hint, name)._formatTag({}, {type : "button"}, inputClass);
					break;
				case "area":
				case "textarea":
					tag = form._tag("textarea", hint, name)._formatTag({}, {rows : 9}, inputClass);
					break;
				case "text":
				default:
					tag = form._tag("input", null, name)._formatTag({}, {type, name, placeholder : hint, value : value || ""}, inputClass);
			}
			next && next(tag, form);
		});
		
		if(submitId) form._tag("button", "Submit", submitId)._attributes({type : "Submit", name : submitId});
		
		return form;
	},
	
	_getInputs : function(selector = "input,textarea", all = true, mustRequired = true, getArray = false, trim = true, node = this){
		const values = getArray ? [] : {};
		const inputs = node.querySelectorAll(selector);
		if(inputs.length === 0) return null;
		
		for(let key in inputs){
			if(!inputs.hasOwnProperty(key)) continue;
			
			const input    = inputs[key];
			const name     = input.name || input.id || key;
			const value    = trim ? input.value.trim() : input.value;
			const required = input.required;
			if((all || (required && mustRequired)) && (!value || value.length === 0)){
				input.focus();
				return (`Missing input ${name}`);
			} else if(!all && (!value || value.length === 0)) continue;
			Array.isArray(values) ? values.push(value) : values[name] = value;
		}
		
		return values;
	},
	
	_clearInputs : function(selector = "input,textarea", node = this){
		const inputs = node.querySelectorAll(selector);
		if(inputs && inputs.length > 0){
			for(let key in inputs){
				if(!inputs.hasOwnProperty(key)) continue;
				inputs[key].value = "";
			}
		}
		return inputs;
	},
	
	_showRecord : function(record, includes, id = null, vertical = true, onShow = null, carry = null, node = this){
		const table = this._tag("table", null, id, true, node);
		const keys  = includes ? includes.split(" ") : Object.keys(record);
		
		if(vertical){
			keys.forEach(key => {
				const row = table._tag("tr");
				row._tag("th", key)._capitalWords();
				row._tag("td", record[key]);
				if(onShow){
				}
			});
		} else{
			const headRow  = table._tag("tr");
			const valueRow = table._tag("tr");
			
			keys.forEach(key => {
				headRow._tag("th", key)._capitalWords();
				valueRow._tag("td", record[key]);
			});
		}
		
		return table;
	},
	
	/**
	 *-------------------------------------------------------------------------
	 * AJAX HTTP HANDLERS
	 *-------------------------------------------------------------------------
	 */
	
	/**
	 *--------------------------------------------------------------------
	 * EXTRA
	 *--------------------------------------------------------------------
	 **/
	
	_next : function(next, node = this){
		if(next) next(node);
		return node;
	}
};

/*
 const [_, _l] : _lady = (id, tagName, content, node) =>
 id && !tagName ? _lady._getNode(id) : _lady._tag(tagName, content, id, true, node);*/

export const _l = (id : string, tagName = null, content = null, node = null) =>
	id && !tagName ? _lady._getNode(id) : _lady._tag(tagName, content, id, true, node);

export const _ladEleById = (id : string) => document.getElementById(id);

export default _l;