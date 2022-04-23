GAME_CORE.Appender = class Appender {
	constructor (id, owner, setParent = document.body, elemType = 'div') {
		this.owner = owner;
		const elem = document.getElementById(id);
		if (elem == null) {
			this.owner.view = document.createElement(elemType);
			this.owner.view.id = id;
			this.owner.parrent = setParent;
			this.isDelete = true;
		} else {
			this.owner.view = elem;
			this.owner.parrent = this.owner.view.parentElement;
			this.isDelete = false;
		}
	}
	
	setParrent(parent) {
		if (this.isDelete) {
			this.owner.parrent = parent;
			GAME_CORE.LOGGERS.InfoAppenderLogger.logMethod(this.owner.view.id + ' change parrent to ' + parent, 'setParrent(parrent)');
			return true;
		} 
		GAME_CORE.LOGGERS.InfoCardLogger.logMethod('Change failed: ' + this.owner.view.id, 'setParrent(parrent)');
		return false;
	}
	
	remove() {
		if (!this.isDelete) {
			this.owner.parrent.removeChild(this.owner.view);
			this.isDelete = true;
			GAME_CORE.LOGGERS.InfoAppenderLogger.logMethod(this.owner.view.id + 'is removed in parrent', 'remove');
			return true;
		} else {
			GAME_CORE.LOGGERS.InfoAppenderLogger.logMethod('NOT REMOVED ' + this.owner.view.id + ' is already removed!', 'remove');
			return false;
		}
	}

	append() {
		if(this.isDelete) {
			this.owner.parrent.appendChild(this.owner.view);
			this.isDelete = false;
			GAME_CORE.LOGGERS.InfoAppenderLogger.logMethod(this.owner.view.id + ' is appended to parrent ', 'append');
			return true;
		} else {
			GAME_CORE.LOGGERS.InfoAppenderLogger.logMethod('NOT APPEND ' + this.owner.view.id + ' is already appended!', 'append');
			return false;
		}
	}
};

GAME_CORE.ColoredText = class ColoredText {
	constructor (letter, color=undefined){
		this.letter = letter;
		this.color = color;
	}
};

GAME_CORE.Bonus =  class Bonus  {
	constructor (healthBonus=0, damageBonus=0, luckBonus=0, dodgeBonus=0) {
		this.healthBonus = healthBonus;
		this.damageBonus = damageBonus;
		this.luckBonus = luckBonus;
		this.dodgeBonus = dodgeBonus;
	}
};
