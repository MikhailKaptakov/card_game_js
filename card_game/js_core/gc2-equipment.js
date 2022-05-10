GAME_CORE.Equipment = class Equipment {

	constructor(id, viewParent = document.body,
				equipmentAdditional =GAME_CORE.DEFAULT_PROPS.equipmentAdditional(),
				equipmentMultiple =GAME_CORE.DEFAULT_PROPS.equipmentMultiple(),
				equipmentCards =GAME_CORE.DEFAULT_PROPS.equipmentCardInit(id, viewParent)) {
		this.viewEntity = new UTIL_CORE.ViewEntity(id, viewParent);
		this.equipmentAdditional = equipmentAdditional;
		this.equipmentMultiple = equipmentMultiple;
		this.cards = equipmentCards;
		this._log('created', 'constructor');
	}

	returnBonus() {
		return new GAME_CORE.StatSet(this.getHealthBonus(), this.getDamageBonus(), this.getLuckBonus(), this.getDodgeBonus());
	}
		
	getHealthBonus() {
		this._log();
		let healthBonus = 0;
		for (let i = 0; i < this.cards.length; i++) {
			healthBonus += this.cards[i].getHealthBonus()*this.equipmentMultiple.statSets[i].getHealth(this.cards[i]) +
			this.equipmentAdditional.statSets[i].getHealth(this.cards[i]);
		}
		return healthBonus;
	}
		
	getDamageBonus() {
		this._log();
		let damageBonus = 0;
		for (let i = 0; i < this.cards.length; i++) {
			damageBonus += this.cards[i].getDamageBonus()*this.equipmentMultiple.statSets[i].getDamage(this.cards[i]) +
				this.equipmentAdditional.statSets[i].getDamage(this.cards[i]);
		}
		return damageBonus;
	}
		
	getLuckBonus() {
		this._log();
		let luckBonus = 0;
		for (let i = 0; i < this.cards.length; i++) {
			luckBonus += this.cards[i].getLuckBonus() * this.equipmentMultiple.statSets[i].getLuck(this.cards[i]) +
				this.equipmentAdditional.statSets[i].getLuck(this.cards[i]);
		}
		return luckBonus;
	}
		
	getDodgeBonus()  {
		this._log();
		let dodgeBonus = 0;
		for (let i = 0; i < this.cards.length; i++) {
			dodgeBonus += this.cards[i].getDodgeBonus() * this.equipmentMultiple.statSets[i].getDodge(this.cards[i]) +
				this.equipmentAdditional.statSets[i].getDodge(this.cards[i]);
		}
		return dodgeBonus;
	}
		
	appendCards() {
		this._log();
		for (let i = 0; i<this.cards.length; i++) {
			this.cards[i].append();
		}
	}
	
	openCards() {
		this._log();
		for (let i = 0; i<this.cards.length; i++) {
			this.cards[i].openCard();
		}
	}

	closeCards() {
		this._log();
		for (let i = 0; i<this.cards.length; i++) {
			this.cards[i].closeCard();
		}
	}
	
	getEquipByNumber(i) {return this.cards[i];}
	
	setViewParent(viewParent) {return this.viewEntity.setViewParent(viewParent);}
	remove() {return this.viewEntity.remove();}
	append() {return this.viewEntity.append();}
	getViewId() {return this.viewEntity.view;}

	_log(message ='', methodName=GAME_CORE.LOGGERS.InfoEquipmentLogger._getMethodName()) {
		GAME_CORE.LOGGERS.InfoEquipmentLogger.logMethod(this.getViewId() + ' ' + message, methodName);
	}
};

GAME_CORE.EquipmentMultiple = class EquipmentMultiple {
	constructor(head, arms, body, legs, feet ) {
		this.statSets = [head,arms,body,legs,feet];
	}

	cloneThis() {return new GAME_CORE.EquipmentMultiple(this.statSets[0].cloneThis(), this.statSets[1].cloneThis(),
		this.statSets[2].cloneThis(),this.statSets[3].cloneThis(),this.statSets[4].cloneThis());}
}