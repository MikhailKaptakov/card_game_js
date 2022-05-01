GAME_CORE.Card = class Card {
	constructor(id, rarity, viewParent = document.body) {
		this.rarity = rarity; //integer number of rarity 
		this.state = false; //true - open; false - close;
		 //true - card is removed from viewParent;
		this.appender = new GAME_CORE.Appender(id, this, viewParent);
		this.view.className = GAME_CORE.CARDS_PROP.closedCardClass;
		this.view.textContent = "";
		GAME_CORE.LOGGERS.InfoCardLogger.log('Created card ' + this.view.id + ' rarity: ' + rarity + ' (' 
			+ GAME_CORE.CARDS_PROP.cardClasses[rarity] + ')');
	}
	
	resetView() {
		const newView = document.createElement('div');
		newView.id = this.view.id;
		newView.className = this.view.className;
		newView.textContent = this.view.textContent;
		this.viewParent.removeChild(this.view);
		this.view = newView;
		this.viewParent.appendChild(this.view);
	}
	
	setRarity(rarityNum) {
		this.rarity = rarityNum;
		GAME_CORE.LOGGERS.InfoCardLogger.logMethod('Changed id ' + this.view.id + ' rarity to: ' + rarityNum, 'setRarity');
	}	
	
	setRandomRarity() {
		const max = GAME_CORE.CARDS_PROP.rarityTable.length;
		for (let i = 0; i < max; i++) {
			if (GAME_CORE.CARDS_PROP.randomGen() <= GAME_CORE.CARDS_PROP.rarityTable[i]) {
				GAME_CORE.LOGGERS.InfoCardLogger.logMethod('Random number:' + i, 'setRandomRarity');
				this.setRarity(i);
				return;
			}
		}
		GAME_CORE.LOGGERS.InfoCardLogger.logMethod('Random number:' + max, 'setRandomRarity');
		this.setRarity(max);
	}
	
	updateCard() {
		if (this.state) {
			this.view.className = GAME_CORE.CARDS_PROP.openedCardClass + ' ' + GAME_CORE.CARDS_PROP.cardClasses[this.rarity]; 
			this.view.textContent = GAME_CORE.CARDS_PROP.cardText[this.rarity];
			GAME_CORE.LOGGERS.InfoCardLogger.logMethod(this.view.id + ' is apply', 'updateCard');
		} else {	 
			GAME_CORE.LOGGERS.InfoCardLogger.logMethod(this.view.id + ' Card is closed', 'updateCard');
		}
	}
	
	openCard() {
		if (!this.state) {
			this.state = true;
			this.updateCard();
			GAME_CORE.LOGGERS.InfoCardLogger.logMethod(this.view.id + ' is apply', 'openCard');
			return true;
		} else {
			GAME_CORE.LOGGERS.InfoCardLogger.logMethod(this.view.id + ' is already oppened!', 'openCard');
			return false;
		}
	}
	
	closeCard() {
		if (this.state) {
			this.view.className = GAME_CORE.CARDS_PROP.closedCardClass;
			this.view.textContent = "";
			this.state = false;
			GAME_CORE.LOGGERS.InfoCardLogger.logMethod(this.view.id + ' Card is closed', 'closeCard');
			return true;
		} else {
			GAME_CORE.LOGGERS.InfoCardLogger.logMethod('NOT CLOSE ' + this.view.id + ' is already closed!', 'closeCard');
			return false;
		}
	}
	
	setInactive() {
		this.view.className += " " + GAME_CORE.CARDS_PROP.inactiveCardClass;
	}
	
	setActive() {
		this.view.className = this.view.className.replace(" "
			+ GAME_CORE.CARDS_PROP.inactiveCardClass ,"");
	}
	
	setParrent(parrent) {return this.appender.setViewParent(parrent);}
	deleteCard() {return this.appender.remove();}
	appendCard() {return this.appender.append();}
		
	setEventListener(eventType, action) {
		this.view.addEventListener(eventType, action);
		GAME_CORE.LOGGERS.InfoCardLogger.logMethod(this.view.id + ' setted ' + eventType,'setEventListener');
	}
		
	removeEventListener(eventType, action) {
		this.view.removeEventListener(eventType, action);
		GAME_CORE.LOGGERS.InfoCardLogger.logMethod(this.view.id + ' removed ' + eventType , 'removeEventListener');
	}
};