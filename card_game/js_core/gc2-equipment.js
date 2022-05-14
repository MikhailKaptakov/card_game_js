GAME_CORE.Equipment = class Equipment extends UTIL_CORE.ViewEntity{
	constructor (id, viewParent = document.body, owner,
				 equipmentCells =undefined) {
		super(id,viewParent);
		this.setLogger(GAME_CORE.LOGGERS.InfoEquipmentLogger);
		this.owner = owner;
		if (equipmentCells === undefined) {
			this.equipmentCells = GAME_CORE.DEFAULT_PROPS.equipmentCells(this.id, this.viewParent, this);
		} else {
			this.equipmentCells = equipmentCells;
		}
		this._log('created', 'constructor');
	}

	/******Card_Bonus******/
	returnBonus() {
		return new GAME_CORE.BaseStatMap(this.getHealthBonus(), this.getDamageBonus(),
			this.getLuckBonus(), this.getDodgeBonus());
	}

	getHealthBonus() {
		this._log();
		let healthBonus = 0;
		for (const cell of this.equipmentCells) {
			healthBonus = cell.getStat('health');
		}
		return healthBonus;
	}

	getDamageBonus() {
		this._log();
		let damageBonus = 0;
		for (const cell of this.equipmentCells) {
			damageBonus = cell.getStat('damage');
		}
		return damageBonus;
	}

	getLuckBonus() {
		this._log();
		let luckBonus = 0;
		for (const cell of this.equipmentCells) {
			luckBonus = cell.getStat('luck');
		}
		return luckBonus;
	}

	getDodgeBonus()  {
		this._log();
		let dodgeBonus = 0;
		for (const cell of this.equipmentCells) {
			dodgeBonus = cell.getStat('dodge');
		}
		return dodgeBonus;
	}

	getStatBonus(statName) {
		this._log();
		let stat = 0;
		for (const cell of this.equipmentCells) {
			stat = cell.getStat(statName);
		}
		return stat;
	}

	/******Cards_manipulation******/

	appendCards() {
		this._log();
		for (const cell of this.equipmentCells) {
			cell.getCard().append();
		}
	}

	openCards() {
		this._log();
		for (const cell of this.equipmentCells) {
			cell.getCard().openCard();
		}
	}

	closeCards() {
		this._log();
		for (const cell of this.equipmentCells) {
			cell.getCard().closeCard();
		}
	}

	getCardByName(name) {
		return this.equipmentCells.get(name);
	}

	getOwner() {return this.owner;}
};

GAME_CORE.EquipmentCell = class EquipmentCell {
	constructor(owner, cellName, card, multipleMod, additionalMod) {
		this.owner = owner
		this.name = cellName;
		this.card = card;
		this.multipleMod = multipleMod;
		this.additionalMod = additionalMod;
	}

	getStat(statName) {
		const cardStat = this.card.getStatMap().getStat(statName);
		if (cardStat === undefined) {
			return 0;
		}
		const multiple = this.multipleMod.hasStat(statName) !== undefined? this.multipleMod.getStat(statName) : () => 1;
		const addition = this.additionalMod.hasStat(statName) !== undefined? this.additionalMod.getStat(statName) : () => 0;
		return cardStat*multiple() + addition();
	}

	getCard() {return this.card;}
	getName() {return this.name;}
	getOwner() {return this.owner;}
};

GAME_CORE.ModStatMap = class ModStatMap extends Map{
	constructor(health=0, damage=0, luck=0, dodge=0) {
		super();
		this.setStat('health', () => health);
		this.setStat('damage', () => damage);
		this.setStat('luck', () => luck);
		this.setStat('dodge', () => dodge);
	}

	hasStat(statName) {return this.has(statName);}
	getStat(statName) {
		return this.get(statName);
	};
	setStat(statName, functionArg) {return this.set(statName, functionArg)};
};
