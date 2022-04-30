GAME_CORE.Appender = class Appender {
	constructor (id, owner, viewParent = document.body, elemType = 'div') {
		this.owner = owner;
		const elem = document.getElementById(id);
		if (elem == null) {
			this.owner.view = document.createElement(elemType);
			this.owner.view.id = id;
			this.owner.viewParent = viewParent;
			this.isDelete = true;
		} else {
			this.owner.view = elem;
			this.owner.viewParent = this.owner.view.parentElement;
			this.isDelete = false;
		}
	}
	
	setViewParent(viewParent) {
		if (this.isDelete) {
			this.owner.viewParent = viewParent;
			GAME_CORE.LOGGERS.InfoAppenderLogger.logMethod(this.owner.view.id + ' change viewParent to ' + parent, 'setViewParent(viewParent)');
			return true;
		} 
		GAME_CORE.LOGGERS.InfoCardLogger.logMethod('Change failed: ' + this.owner.view.id, 'setViewParent(viewParent)');
		return false;
	}
	
	remove() {
		if (!this.isDelete) {
			this.owner.viewParent.removeChild(this.owner.view);
			this.isDelete = true;
			GAME_CORE.LOGGERS.InfoAppenderLogger.logMethod(this.owner.view.id + 'is removed in viewParent', 'remove');
			return true;
		} else {
			GAME_CORE.LOGGERS.InfoAppenderLogger.logMethod('NOT REMOVED ' + this.owner.view.id + ' is already removed!', 'remove');
			return false;
		}
	}

	append() {
		if(this.isDelete) {
			this.owner.viewParent.appendChild(this.owner.view);
			this.isDelete = false;
			GAME_CORE.LOGGERS.InfoAppenderLogger.logMethod(this.owner.view.id + ' is appended to viewParent ', 'append');
			return true;
		} else {
			GAME_CORE.LOGGERS.InfoAppenderLogger.logMethod('NOT APPEND ' + this.owner.view.id + ' is already appended!', 'append');
			return false;
		}
	}
};



