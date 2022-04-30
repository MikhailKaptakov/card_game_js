GAME_CORE.TextEntity = class TextEntity {
	
	constructor(id, value, viewParent = document.body){
		this.appender = new GAME_CORE.Appender(id, this, viewParent, 'var');
		this.value = value;
		//this.append();
		this.updateView();
		GAME_CORE.LOGGERS.InfoTextEntityLogger.log(this.view.id + ' created in ' + this.viewParent.id + '. Value:' + value);
	}
	
	updateView() {
		this.view.textContent = this.value;
		GAME_CORE.LOGGERS.InfoTextEntityLogger.logMethod(this.view.id + ' is updated', 'updateView');
	}
	updateValue(value) {
		this.value = value;
		GAME_CORE.LOGGERS.InfoTextEntityLogger.logMethod(this.view.id + ' value: ' + value , 'updateValue(value)');
		this.updateView();
	}

	setParrent(parrent) {return this.appender.setViewParent(parrent);}
	remove() {return this.appender.remove();} 
	append() {return this.appender.append();}
};