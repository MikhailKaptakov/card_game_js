GAME_CORE.Equipment = class Equipment {
	constructor(id, settedParrent = document.body) {
		this.appender = new GAME_CORE.Appender(id, this, settedParrent);
		this.bonus = GAME_CORE.UNITS_PROP.bonus;
		//this.append();
		this.head = new GAME_CORE.Card(id + 'head', 0, this.view);
		this.arms = new GAME_CORE.Card(id + 'arms', 0, this.view);
		this.body = new GAME_CORE.Card(id + 'body', 0, this.view);
		this.legs = new GAME_CORE.Card(id + 'legs', 0, this.view);
		this.feets = new GAME_CORE.Card(id + 'feets', 0, this.view);	
		GAME_CORE.LOGGERS.InfoEquipmentLogger.log(this.view.id + ' created');
	}		
		
	returnBonus(i) {
		GAME_CORE.LOGGERS.InfoEquipmentLogger.logMethod('run', 'returnBonus('+i+')');
		return (GAME_CORE.EQUPMENT_PROP.head[i]*this.bonus[i][this.head.rarity] + 
				GAME_CORE.EQUPMENT_PROP.arms[i]*this.bonus[i][this.arms.rarity] + 
				GAME_CORE.EQUPMENT_PROP.body[i]*this.bonus[i][this.body.rarity] + 
				GAME_CORE.EQUPMENT_PROP.legs[i]*this.bonus[i][this.legs.rarity] + 
				GAME_CORE.EQUPMENT_PROP.feets[i]*this.bonus[i][this.feets.rarity]);		
	}
		
	returnHealthBonus() {
		GAME_CORE.LOGGERS.InfoEquipmentLogger.logMethod('run', 'returnHealthBonus');
		return this.returnBonus(0);}
		
	returnDamageBonus() {
		GAME_CORE.LOGGERS.InfoEquipmentLogger.logMethod('run', 'returnDamageBonus');
		return this.returnBonus(1);}
		
	returnLuckBonus()   {
		GAME_CORE.LOGGERS.InfoEquipmentLogger.logMethod('run', 'returnLuckBonus');
		return this.returnBonus(2);}
		
	returnDodgeBonus()  {
		GAME_CORE.LOGGERS.InfoEquipmentLogger.logMethod('run', 'returnDodgeBonus');
		return this.returnBonus(3);}
		
	appendCards() {
		GAME_CORE.LOGGERS.InfoEquipmentLogger.logMethod(' run ', 'appendCard');
		this.head.appendCard();
		this.arms.appendCard();
		this.body.appendCard();
		this.legs.appendCard();
		this.feets.appendCard();
	}
	
	openCards() {
		GAME_CORE.LOGGERS.InfoEquipmentLogger.logMethod(this.view.id + ' is open equipment cards ', 'openCards');
		this.head.openCard();
		this.arms.openCard();
		this.body.openCard();
		this.legs.openCard();
		this.feets.openCard();
	}

	closeCards() {
		GAME_CORE.LOGGERS.InfoEquipmentLogger.logMethod(this.view.id + ' is open equipment cards ', 'openCards');
		this.head.closeCard();
		this.arms.closeCard();
		this.body.closeCard();
		this.legs.closeCard();
		this.feets.closeCard();
	}
	
	getEquipByNumber(num) {
		if (num === 0) {
			return this.head;
		}
		if (num === 1) {
			return this.arms;
		}
		if (num === 2) {
			return this.body;
		}
		if (num === 3) {
			return this.legs;
		}
		if (num === 4) {
			return this.feets;
		}
	}	
	
	setParrent(parrent) {return this.appender.setParrent(parrent);}
	remove() {return this.appender.remove();}
	append() {return this.appender.append();}
};