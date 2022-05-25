GAME_CORE.Equipment = class Equipment extends UTIL_CORE.ViewEntity{
	//todo create test
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
			healthBonus = cell.getStat(GAME_CORE.DEFAULT_PROPS.STATS.health);
		}
		return healthBonus;
	}

	getDamageBonus() {
		this._log();
		let damageBonus = 0;
		for (const cell of this.equipmentCells) {
			damageBonus = cell.getStat(GAME_CORE.DEFAULT_PROPS.STATS.damage);
		}
		return damageBonus;
	}

	getLuckBonus() {
		this._log();
		let luckBonus = 0;
		for (const cell of this.equipmentCells) {
			luckBonus = cell.getStat(GAME_CORE.DEFAULT_PROPS.STATS.luck);
		}
		return luckBonus;
	}

	getDodgeBonus()  {
		this._log();
		let dodgeBonus = 0;
		for (const cell of this.equipmentCells) {
			dodgeBonus = cell.getStat(GAME_CORE.DEFAULT_PROPS.STATS.dodge);
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

	getCellByName(name) {
		return this.equipmentCells.get(name);
	}

	getCellByIndex(index) {
		if (index < 0 || index >= this.equipmentCells.size) {
			return undefined;
		}
		let i = 0;
		for (const key of this.equipmentCells.keys) {
			if (i === index) {
				return this.equipmentCells.get(key);
			}
			i++;
		}
		throw new Error('проверить условие отсева')
	}

	getCellByRandomIndex() {
		const index = UTIL_CORE.randomGen(this.equipmentCells.size);
		return this.getCardByIndex(index);
	}

	getEquipmentSize() {
		return this.equipmentCells.size;
	}

	getOwner() {return this.owner;}
};
//todo create test
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
		this.setStat(GAME_CORE.DEFAULT_PROPS.STATS.health, health);
		this.setStat(GAME_CORE.DEFAULT_PROPS.STATS.damage, damage);
		this.setStat(GAME_CORE.DEFAULT_PROPS.STATS.luck, luck);
		this.setStat(GAME_CORE.DEFAULT_PROPS.STATS.dodge, dodge);
		this.currentFunc = undefined;
	}

	hasStat(statName) {return this.has(statName);}
	getStat(statName) {
		if(this.hasStat(statName)) {
			this.currentFunc = this.get(statName);
			return this.currentFunc();
		} else {
			return undefined;
		}
	};
	setStat(statName, numberOrFunction) {
		if (this._argTypeCheck(numberOrFunction)) {
			return this._setNumberStat(statName, numberOrFunction);
		} else {
			return this._setFuncStat(statName, numberOrFunction);
		}
	};
	_setFuncStat(statName, functionArg) {
		return this.set(statName, functionArg);
	}
	_setNumberStat(statName, numberArg) {
		return this.set(statName, () => numberArg);
	}
	_argTypeCheck(arg) {
		if (typeof arg === 'function') {
			return false;
		}
		if (typeof arg === 'number') {
			return true;
		}
		throw new Error('Аргумент должен быть числом илм функцией!');
	}
};
