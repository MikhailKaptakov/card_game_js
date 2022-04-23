GAME_CORE.Player = class Player {
	constructor(id, name, settedParrent = document.body) {
		this.appender = new GAME_CORE.Appender(id, this, settedParrent);
		this.name = new GAME_CORE.TextEntity(id + 'name', name, this.view);
		this.score = new GAME_CORE.TextEntity(id + 'score', 0, this.view);
		this.money = new GAME_CORE.TextEntity(id + 'money', 0, this.view);
		GAME_CORE.LOGGERS.InfoPlayerLogger.log(this.view.id + ' named ' + this.name.value + ' created in ' + this.parrent.id);
	}
	
	appendAll() {
		GAME_CORE.LOGGERS.InfoPlayerLogger.logMethod(this.view.id, 'appendAll');
		this.name.append();
		this.score.append();
		this.money.append();
	}
	
	setParrent(parrent) {return this.appender.setParrent(parrent);}
	remove() {return this.appender.remove();}
	append() {return this.appender.append();}
	
};