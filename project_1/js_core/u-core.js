const UTIL_CORE = {};
UTIL_CORE.randomGen = function(num){return Math.floor(Math.random()*num) + 1;};
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
		
	logMethod(message, methodName) {
		if (this.turn) {
			const str =  this.title.toUpperCase() + ": " + this.getDateTime() + " " + methodName +" : " + message;
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
			}
			break;
		}
	}
		
	addChildLogger(childLogger) {
		childLogger.title = this.title + "(" + childLogger.title + ")"; 
		this.childs.push(childLogger);
		childLogger.isChild = true;
		childLogger.parrent = this;
	}
}
