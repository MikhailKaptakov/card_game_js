GAME_CORE.Player = class Player {
	constructor(id, name, viewParent = document.body) {
		this.viewEntity = new UTIL_CORE.ViewEntity(id, viewParent);
		this.name = new GAME_CORE.TextEntity(id + 'name', name, this.getView());
		this.score = new GAME_CORE.TextEntity(id + 'score', 0, this.getView());
		this.money = new GAME_CORE.TextEntity(id + 'money', 0, this.getView());
		this._log('created', 'constructor')
	}
	
	appendAll() {
		this._log();
		this.name.append();
		this.score.append();
		this.money.append();
	}

	setViewParent(viewParent) {return this.viewEntity.setViewParent(viewParent);}
	remove() {return this.viewEntity.remove();}
	append() {return this.viewEntity.append();}
	getView() {return this.viewEntity.view;}
	getViewId() {return this.getView().id;}

	_log(message ='', methodName=GAME_CORE.LOGGERS.InfoPlayerLogger._getMethodName()) {
		GAME_CORE.LOGGERS.InfoPlayerLogger.logMethod(this.getViewId() + ' ' + message, methodName);
	}
};