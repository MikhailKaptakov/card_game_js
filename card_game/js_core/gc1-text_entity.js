GAME_CORE.TextEntity = class TextEntity {
	
	constructor(id, value, viewParent = document.body){
		this.viewEntity = new UTIL_CORE.ViewEntity(id, viewParent, 'var');
		this.value = value;
		this.updateView();
		this._log('created', 'constructor')
	}
	
	updateView() {
		this.viewEntity.view.textContent = this.value;
		this._log();
	}
	updateValue(value) {
		this.value = value;
		this._log();
		this.updateView();
	}

	setViewParent(viewParent) {return this.viewEntity.setViewParent(viewParent);}
	remove() {return this.viewEntity.remove();}
	append() {return this.viewEntity.append();}
	getViewId() {return this.viewEntity.getId();}

	_log(message ='', methodName=GAME_CORE.LOGGERS.InfoTextEntityLogger._getMethodName()) {
		GAME_CORE.LOGGERS.InfoTextEntityLogger.logMethod(this.getViewId() + ' ' + message, methodName);
	}
};