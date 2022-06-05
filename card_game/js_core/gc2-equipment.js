GAME_CORE.Equipment = class Equipment extends UTIL_CORE.ViewEntity{
	constructor (id, viewParent = document.body, owner,
				 equipmentCells =undefined) {
		super(id,viewParent);
		this.setLogger(GAME_CORE.LOGGERS.InfoEquipmentLogger);
		this.owner = owner;
		if (equipmentCells === undefined) {
			this.equipmentCells = GAME_CORE.DEFAULT_PROPS.getEquipmentCells(this.getId(), this.viewParent, this);
		} else {
			this.equipmentCells = equipmentCells;
		}
		this._log('created', 'constructor');
	}

	getOwner() {return this.owner;}

	/******Card_Bonus******/
	returnBonus() {
		return new GAME_CORE.BaseStatMap(this.getHealthBonus(), this.getDamageBonus(),
			this.getLuckBonus(), this.getDodgeBonus());
	}
f
	getStatBonus(statName) {
		this._log();
		let statValue = 0;
		for (const entry of this.equipmentCells) {
			const stat = entry[1].getStat(statName);
			if (stat !== undefined && typeof stat === 'number') {
				statValue += stat;
			}
		}
		return statValue;
	}

	getHealthBonus() {
		this._log();
		return this.getStatBonus(GAME_CORE.DEFAULT_PROPS.STATS.health);
	}

	getDamageBonus() {
		return this.getStatBonus(GAME_CORE.DEFAULT_PROPS.STATS.damage);
	}

	getLuckBonus() {
		return this.getStatBonus(GAME_CORE.DEFAULT_PROPS.STATS.luck);
	}

	getDodgeBonus()  {
		return this.getStatBonus(GAME_CORE.DEFAULT_PROPS.STATS.dodge);
	}

	/******Cards_manipulation******/

	getCellByName(name) {
		return this.equipmentCells.get(name);
	}

	getCellByIndex(index) {
		if (typeof index !== 'number') {
			throw new Error('Index is not a number');
		}
		if (index < 0 || index >= this.equipmentCells.size) {
			return undefined;
		}
		let i = 0;
		for (const key of this.equipmentCells.keys()) {
			if (i === index) {
				return this.equipmentCells.get(key);
			}
			i++;
		}
		throw new Error('ошибка в методе getCellByIndex');
	}
	getCardByIndex(index) {
		return this.getCellByIndex(index).getCard();
	}

	getCellByRandomIndex() {
		const index = UTIL_CORE.randomGen(this.getEquipmentSize());
		return this.getCellByIndex(index);
	}

	getEquipmentSize() {
		return this.equipmentCells.size;
	}

	appendCards() {
		this._log();
		for (const entry of this.equipmentCells) {
			entry[1].appendCard();
		}
	}

	openCards() {
		this._log();
		for (const entry of this.equipmentCells) {
			entry[1].getCard().openCard();
		}
	}

	closeCards() {
		this._log();
		for (const entry of this.equipmentCells) {
			entry[1].getCard().closeCard();
		}
	}

	append() {
		super.append();
		this.appendCards();
	}
};

GAME_CORE.EquipmentCell = class EquipmentCell {
	constructor(owner, cellName, card, multipleMod, additionalMod) {
		this.owner = owner
		this.name = cellName;
		this.card = card;
		this.multipleMod = multipleMod;
		this.additionalMod = additionalMod;
	}
	//todo добавить методы изменения рарности карты ячейки, и всех основных допустимых манипуляций открытие и прочее,
	// не давать прямого доступа к карте, убрать метод getCard.
	// Методы изменения рарности должны изменять описание карты в соответствии с мультипл и аддитионал модами

	getStat(statName) {
		const cardStat = this.card.getStatMap().getStat(statName);
		if (cardStat === undefined) {
			return 0;
		}
		const multiple = this.multipleMod.hasStat(statName) !== undefined? this.multipleMod.getStat(statName) : 1;
		const addition = this.additionalMod.hasStat(statName) !== undefined? this.additionalMod.getStat(statName) : 0;
		return cardStat*multiple + addition;
	}

	getCard() {return this.card;}
	getName() {return this.name;}
	getOwner() {return this.owner;}
	setNewCard(id, viewParent) {
		if (this.card === undefined) {
			this._createCard(id, viewParent);
		} else {
			const appendState = this.card.isAppended();
			this.removeCard();
			this._createCard(id, viewParent);
			if (appendState) {
				this.appendCard();
			}
		}
	}
	appendCard() {
		this.card.append();
	}
	removeCard() {
		this.card.remove();
	}
	_createCard(id, viewParent) {
		this.card = new GAME_CORE.Card(id + this.name, viewParent);
	}

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
		return this.set(statName, function () {return numberArg});
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
