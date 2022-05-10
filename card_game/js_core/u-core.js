const UTIL_CORE = {};
UTIL_CORE.randomGen = function(num){return Math.floor(Math.random()*num);};
UTIL_CORE.randomGenPLusOne = function(num){return UTIL_CORE.randomGen(num) + 1;};
UTIL_CORE.sleep = async function(milliseconds) {
	const start = Date.now();
	do {
		const sleepper = function(milliseconds) {
			return new Promise(resolve => setTimeout(resolve, milliseconds));
		};
		await sleepper(50);
		current = Date.now();
	} while(current - start < milliseconds);
}

UTIL_CORE.Logger = class Logger {
	constructor(title){
		this.title = title;
		this.turn = true;
		this.childs = [];
		this.isChild = false;
		this.parrent = '';	
	}
		
	setTitle(title) {
		this.title = title;
	}
	
	getDateTime(){
		const date = new Date();
		return date.getFullYear() + '-' + (date.getMonth()+1) + '-' + date.getDate() 
		+ ' ' + date.getHours() + ':' + date.getMinutes() + ':' + date.getSeconds();
	}
		
	log(message) {
		if (this.turn) {
			const str =  this.title.toUpperCase() + ": " + this.getDateTime() + ": " + message;
			console.log(str);
		}
	}

	//https://stackoverflow.com/questions/29572466/how-do-you-find-out-the-caller-function-in-javascript-when-use-strict-is-enabled
	_getMethodName = function() {
		try {
			throw new Error();
		}
		catch (e) {
			try {
				return e.stack.split('at ')[3].split(' ')[0];
			} catch (e) {
				return '';
			}
		}
	}
		
	logMethod(message ='', methodName =this._getMethodName()) {
		if (this.turn) {
			let str =  this.title.toUpperCase() + ": " + this.getDateTime() + " " + methodName;
			if (message.length !== 0) {
				str+= " : " + message;
			}
			console.log(str);
		}
	}
	
	turnOf() {
		if(this.turn === true) {
			this.turn = false;
			if (this.childs.length>0){
				for (const logger of this.childs) {
					logger.turnOf();
				}
			}
			return true
		}
		return false;
	}
	
	turnOn() {
		if(this.turn === false) {
			this.turn = true;
			if (this.childs.length>0){
				for (const logger of this.childs) {
					logger.turnOn();
				}
			}
			return true;
		}
		return false;
	}	
		
	removeParrentLogger() {
		if (this.parrent === '') {
			return;
		}
		if(this.parrent.childs.length<0) {
			return;
		}
		for (let i = 0; i<this.parrent.childs.length; i++)  {
			if (this.parrent.childs[i] === this) {
				this.parrent.childs.splice(i);
				this.title = this.title.substring(this.title.indexOf('(')+1,this.title.lastIndexOf(')')); 
				this.isChild = false;
				this.parrent = '';
				break;
			}
		}
	}
		
	addChildLogger(childLogger) {
		childLogger.title = this.title + "(" + childLogger.title + ")"; 
		this.childs.push(childLogger);
		childLogger.isChild = true;
		childLogger.parrent = this;
	}
}
UTIL_CORE.ViewEntity = class ViewEntity {
	constructor(id, viewParent = document.body, elemType = 'div') {
		const elem = document.getElementById(id);
		if (elem == null) {
			this.view = document.createElement(elemType);
			this.view.id = id;
			this.viewParent = viewParent;
			this.appendState = false;
		} else {
			this.view = elem;
			this.viewParent = this.view.parentElement;
			this.appendState = true;
		}
	}

	setViewParent(viewParent) {
		this._log();
		if (this.appendState) {return false;}
		this.viewParent = viewParent;
		return true;
	}

	remove() {
		this._log();
		if (!this.appendState) {return false;}
		this.viewParent.removeChild(this.view);
		this.appendState = false;
		return true;
	}

	append() {
		this._log();
		if(this.appendState) {return false;}
		this.viewParent.appendChild(this.view);
		this.appendState = true;
		return true;
	}

	replace(newViewParent) {
		this._log();
		this.remove();
		this.setViewParent(newViewParent);
		this.append();
	}

	resetView() {
		const newView = document.createElement(this.view.tagName);
		newView.id = this.getId();
		const isRemove = this.remove();
		this.view = newView;
		if (isRemove) {
			this.append();
		}
	}
	isAppended() {return this.appendState;}
	getViewParent() {return this.viewParent;}
	getView() {return this.view;}
	getClass() {return this.view.class;}
	getTextContent() {return this.view.textContent;}
	getTitle() {return this.view.title;}
	getId() {return this.view.id;}

	setClass(viewClassName) {this.view.class = viewClassName;}
	setTextContent(viewTextContent) {this.view.textContent = viewTextContent;}
	setTitle(viewTitle) {this.view.title = viewTitle;}
	setLogger(logger) {
		if(logger instanceof UTIL_CORE.Logger) {
			this._log = function (message ='', methodName=this.logger._getMethodName()) {
				logger.logMethod(this.getId() + ' ' + message, methodName);
			};
		}
	}

	_log(message =undefined, methodName=undefined) {}
}

UTIL_CORE.Letter = class Letter {
	constructor(letter, color=undefined, backgroundColor =undefined) {
		this.view = document.createElement('var');
		this.view.textContent = letter;
		if (color !== undefined) {this.view.style.color = color;}
		if (backgroundColor !== undefined) {this.view.style.backgroundColor = backgroundColor;}
	}
	append(viewParent) { viewParent.append(this.view);}
	appendClone(viewParent) {viewParent.append(this.view.cloneNode(true));}
	getText(){return this.view.textContent;}
}

UTIL_CORE.Message = class Message {
	constructor(letterArray) {
		this.view = document.createElement('p');
		for (let i = 0; i<letterArray.length; i++) {
			this.view.appendChild(letterArray[i].view);
		}
	}
	append(viewParent) { viewParent.append(this.view);}
	appendClone(viewParent) {viewParent.append(this.view.cloneNode(true));}
}
