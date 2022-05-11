GAME_CORE.Equipment = class Equipment extends UTIL_CORE.ViewEntity{

	constructor(id, viewParent = document.body,
				equipmentAdditional =GAME_CORE.DEFAULT_PROPS.equipmentAdditional(),
				equipmentMultiple =GAME_CORE.DEFAULT_PROPS.equipmentMultiple(),
				equipmentCards =GAME_CORE.DEFAULT_PROPS.equipmentCardInit(id, viewParent)) {
		super(id, viewParent);
		this.setLogger(GAME_CORE.LOGGERS.InfoEquipmentLogger);
		this.equipmentAdditional = equipmentAdditional;
		this.equipmentMultiple = equipmentMultiple;
		this.cards = equipmentCards;
		this._log('created', 'constructor');
	}

	/******Card_Bonus******/
	returnBonus() {
		return new GAME_CORE.StatSet(this.getHealthBonus(), this.getDamageBonus(),
			this.getLuckBonus(), this.getDodgeBonus());
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

	/******Cards_manipulation******/
		
	appendCards() {
		this._log();
		for (const card of this.cards) {
			card.append();
		}
	}
	
	openCards() {
		this._log();
		for (const card of this.cards) {
			card.openCard();
		}
	}

	closeCards() {
		this._log();
		for (const card of this.cards) {
			card.closeCard();
		}
	}

	getCardByIndex(index) {
		if (index < 0 || index >= this.cards.length) {
			throw new RangeError('index ' + index + ' out of range');
		}
		return this.cards[index];
	}

	getCardByName(name) {
		const index = this.getIndexCardByName(name);
		if (index < 0) {
			return undefined;
		}
		return this.cards[index];
	}

	getIndexCardByName(name) {
		for (let i = 0; i < this.cards.length; i++) {
			if (this.cards[i].getName() === name) {
				return i
			}
		}
		return -1;
	}
};

GAME_CORE.EquipmentModificator = class EquipmentMultiple {
	constructor(head, arms, body, legs, feet ) {
		this.statSets = [head,arms,body,legs,feet];
	}

	cloneThis() {return new GAME_CORE.EquipmentModificator(this.statSets[0].cloneThis(), this.statSets[1].cloneThis(),
		this.statSets[2].cloneThis(),this.statSets[3].cloneThis(),this.statSets[4].cloneThis());}
}