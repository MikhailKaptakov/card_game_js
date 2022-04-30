GAME_CORE.Player = class Player {
	constructor(id, name, viewParent = document.body) {
		this.appender = new GAME_CORE.Appender(id, this, viewParent);
		this.name = new GAME_CORE.TextEntity(id + 'name', name, this.view);
		this.score = new GAME_CORE.TextEntity(id + 'score', 0, this.view);
		this.money = new GAME_CORE.TextEntity(id + 'money', 0, this.view);
		GAME_CORE.LOGGERS.InfoPlayerLogger.log(this.view.id + ' named ' + this.name.value + ' created in ' + this.viewParent.id);
	}
	
	appendAll() {
		GAME_CORE.LOGGERS.InfoPlayerLogger.logMethod(this.view.id, 'appendAll');
		this.name.append();
		this.score.append();
		this.money.append();
	}
	
	setParrent(parrent) {return this.appender.setViewParent(parrent);}
	remove() {return this.appender.remove();}
	append() {return this.appender.append();}
	
};