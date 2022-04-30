GAME_CORE.GameField = class GameField {
	constructor(id, cardsCount, viewParent = document.body) {
		this.appender = new GAME_CORE.Appender(id, this, viewParent);
		this.cardsCount = cardsCount;
		this.cardArray = [];	
		for (let i = 0; i < this.cardsCount; i++) {
			const card = new GAME_CORE.Card(id + 'c' + i, 0, this.view)
			this.cardArray.push(card);
		}
		this.isEmpty = true;		
		
		GAME_CORE.LOGGERS.InfoGameFieldLogger.log(this.view.id + ' created in ' + this.viewParent.id);
	}
				
	doIt(cardAction) {
		for (const card of this.cardArray) {
			card.cardAction = cardAction;
			card.cardAction();
		}
		GAME_CORE.LOGGERS.InfoGameFieldLogger.logMethod(this.view.id + 'do it to all cards', 'doIt(action)');
	}
	
	openCards() {
		for (const card of this.cardArray) {
			card.openCard();
		}
		GAME_CORE.LOGGERS.InfoGameFieldLogger.logMethod(this.view.id, 'openCards');
	}
	
	closeCards() {
		for (const card of this.cardArray) {
			card.closeCard();
		}
		GAME_CORE.LOGGERS.InfoGameFieldLogger.logMethod(this.view.id, 'closeCards');
	}
	
	fill() {
		if (!this.isEmpty) {
			GAME_CORE.LOGGERS.InfoGameFieldLogger.logMethod(this.view.id + ' not empty ', 'fill');
			return false;
		}	
		GAME_CORE.LOGGERS.InfoGameFieldLogger.logMethod(this.view.id + ' append cards: ', 'fill');
		for ( const card of this.cardArray) {
			card.appendCard();
			this.isEmpty = false;
		}
		return true;	
	}
		
	clear() {
		if (this.isEmpty) {
			GAME_CORE.LOGGERS.InfoGameFieldLogger.logMethod(this.view.id + ' is empty ', 'clear');
			return false;
		}	
		GAME_CORE.LOGGERS.InfoGameFieldLogger.logMethod(this.view.id + ' remove cards: ', 'clear');
		for (const card of this.cardArray) {
			card.deleteCard();
			this.isEmpty = true;
		}		
		return true;
	}
		
	setRandomRarity() {
		GAME_CORE.LOGGERS.InfoGameFieldLogger.logMethod(this.view.id + ' seted random rarity ', 'setRandomRarity');
		for (const card of this.cardArray) {
			card.closeCard();
			card.setRandomRarity();
		}
	}
		
	addListeners(type, action) {
		for (let i = 0; i < this.cardArray.length ; i++ ) {
			const card = this.cardArray[i];
			const wrap = function() {
				action(card);
			}
			card.setEventListener(type, wrap);
		}
		GAME_CORE.LOGGERS.InfoGameFieldLogger.logMethod(this.view.id + ' added listners', 'addListeners');
	}
		
	removeListeners(type, action) {
		for (let i = 0; i < this.cardArray.length ; i++ ) {
			const card = this.cardArray[i];
			const wrap = function() {
				action(card);
			}
			card.removeEventListener(type, wrap);
		}
		GAME_CORE.LOGGERS.InfoGameFieldLogger.logMethod(this.view.id + ' removed listners', 'addListeners');
	}
	
	setParrent(parrent) {return this.appender.setViewParent(parrent);}
	remove() {return this.appender.remove();}
	append() {return this.appender.append();}
};