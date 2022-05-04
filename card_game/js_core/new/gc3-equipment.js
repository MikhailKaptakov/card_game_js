GAME_CORE.Equipment = class Equipment {

	constructor(id, viewParent = document.body,
				equipmentAdditional =GAME_CORE.DEFAULT_PROPS.equipmentAdditional(),
				equipmentMultiple =GAME_CORE.DEFAULT_PROPS.equipmentMultiple(),
				equipmentCardInit =GAME_CORE.DEFAULT_PROPS.equipmentCardInit) {
		this.appender = new GAME_CORE.Appender(id, this, viewParent);
		this.equipmentAdditional = equipmentAdditional;
		this.equipmentMultiple = equipmentMultiple;
		equipmentCardInit.initEquipmentCards(this);
		GAME_CORE.LOGGERS.InfoEquipmentLogger.log(this.view.id + ' created');
	}

	returnBonus() {
		return new GAME_CORE.StatSet(this.getHealthBonus(), this.getDamageBonus(), this.getLuckBonus(), this.getDodgeBonus());
	}
		
	getHealthBonus() {
		GAME_CORE.LOGGERS.InfoEquipmentLogger.logMethod('run', 'returnHealthBonus');
		let healthBonus = 0;
		for (let i = 0; i < this.cards.length; i++) {
			healthBonus += this.cards[i].getHealthBonus()*this.equipmentMultiple.statSets[i].getHealth(this.cards[i]) +
			this.equipmentAdditional.statSets[i].getHealth(this.cards[i]);
		}
		return healthBonus;
	}
		
	getDamageBonus() {
		GAME_CORE.LOGGERS.InfoEquipmentLogger.logMethod('run', 'returnDamageBonus');
		let damageBonus = 0;
		for (let i = 0; i < this.cards.length; i++) {
			damageBonus += this.cards[i].getDamageBonus()*this.equipmentMultiple.statSets[i].getDamage(this.cards[i]) +
				this.equipmentAdditional.statSets[i].getDamage(this.cards[i]);
		}
		return damageBonus;
	}
		
	getLuckBonus() {
		GAME_CORE.LOGGERS.InfoEquipmentLogger.logMethod('run', 'returnLuckBonus');
		let luckBonus = 0;
		for (let i = 0; i < this.cards.length; i++) {
			luckBonus += this.cards[i].getLuckBonus() * this.equipmentMultiple.statSets[i].getLuck(this.cards[i]) +
				this.equipmentAdditional.statSets[i].getLuck(this.cards[i]);
		}
		return luckBonus;
	}
		
	getDodgeBonus()  {
		GAME_CORE.LOGGERS.InfoEquipmentLogger.logMethod('run', 'returnDodgeBonus');
		let dodgeBonus = 0;
		for (let i = 0; i < this.cards.length; i++) {
			dodgeBonus += this.cards[i].getDodgeBonus() * this.equipmentMultiple.statSets[i].getDodge(this.cards[i]) +
				this.equipmentAdditional.statSets[i].getDodge(this.cards[i]);
		}
		return dodgeBonus;
	}
		
	appendCards() {
		GAME_CORE.LOGGERS.InfoEquipmentLogger.logMethod(' run ', 'appendCard');
		for (let i = 0; i<this.cards.length; i++) {
			this.cards[i].append();
		}
	}
	
	openCards() {
		GAME_CORE.LOGGERS.InfoEquipmentLogger.logMethod(this.view.id + ' is open equipment cards ', 'openCards');
		for (let i = 0; i<this.cards.length; i++) {
			this.cards[i].openCard();
		}
	}

	closeCards() {
		GAME_CORE.LOGGERS.InfoEquipmentLogger.logMethod(this.view.id + ' is open equipment cards ', 'closeCards');
		for (let i = 0; i<this.cards.length; i++) {
			this.cards[i].closeCard();
		}
	}
	
	getEquipByNumber(i) {return this.cards[i];}
	
	setViewParent(viewParent) {return this.appender.setViewParent(viewParent);}
	remove() {return this.appender.remove();}
	append() {return this.appender.append();}
};

GAME_CORE.EquipmentCardInit = class EquipmentCardInit {
	constructor(cardFactory =GAME_CORE.DEFAULT_PROPS.cardFactory) {
		this.cardFactory = cardFactory;
	}

	initEquipmentCards(owner) {
		owner.cards = [
			this.cardFactory
				.createByView(owner.view.id + 'head', owner.view)
				.setCardTypeByName('head')
				.createCard(),
			this.cardFactory
				.createByView(owner.view.id + 'arms', owner.view)
				.setCardTypeByName('arms')
				.createCard(),
			this.cardFactory
				.createByView(owner.view.id + 'body', owner.view)
				.setCardTypeByName('body')
				.createCard(),
			this.cardFactory
				.createByView(owner.view.id + 'legs', owner.view)
				.setCardTypeByName('legs')
				.createCard(),
			this.cardFactory
				.createByView(owner.view.id + 'feet', owner.view)
				.setCardTypeByName('feet')
				.createCard()
		]
	}
}

GAME_CORE.EquipmentMultiple = class EquipmentMultiple {
	constructor(head, arms, body, legs, feet ) {
		this.statSets = [head,arms,body,legs,feet];
	}

	cloneThis() {return new GAME_CORE.EquipmentMultiple(this.statSets[0].cloneThis(), this.statSets[1].cloneThis(),
		this.statSets[2].cloneThis(),this.statSets[3].cloneThis(),this.statSets[4].cloneThis());}
}