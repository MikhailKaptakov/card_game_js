GAME_CORE.Unit = class Unit extends UTIL_CORE.ViewEntity {
	//todo create test
	constructor(id,
				name,
				viewParent = document.body,
				owner =undefined,
				baseCharacteristics =GAME_CORE.DEFAULT_PROPS.baseCharacteristic(),
				replicsSet =GAME_CORE.DEFAULT_PROPS.replicsSet(),
				equipment =undefined) {
		super(id, viewParent);
		this.setLogger(GAME_CORE.LOGGERS.InfoUnitLogger);
		this.owner = owner;
		this.replicsSet = replicsSet;
		this.baseCharacteristics = baseCharacteristics;
		this._initViewObj();
		this.modificationMaps = new GAME_CORE.ModificationMaps();
		if (equipment !== undefined) {
			this.equipment = equipment;
		} else {
			this.equipment = GAME_CORE.DEFAULT_PROPS.getEquipment(this.getId() + 'SET',  this.getView(), this);
		}
		this.updateAllParam();
		this._log('created', 'constructor');
	}

	getName() {return this.name.getValue();}
	getMaxHealth() { return this.maxHealth.getValue();}
	getHealth() {return this.currentHealth.getValue();}
	getDamage() {return this.damage.getValue();}
	getOwner() {return this.owner;}
	getLuck() {return this.luck.getValue();}
	getDodge() {return this.dodge.getValue();}
	getWins() {return this.wins.getValue();}
	incrementWins() {return this.wins.updateValue(this.getWins());}
	setZeroWins() {return this.wins.updateValue(0);}

	updateAllParam() {
		this.updateMaxHealth();
		this.updateDamage();
		this.updateLuck();
		this.updateDodge();
		this._log();
	}

	updateMaxHealth() {
		this.maxHealth.updateValue(Math.round(this.baseCharacteristics.getHealth() + this.equipment.getHealthBonus()));
		this._log(this.maxHealth.value);
	}

	updateDamage() {
		this.damage.updateValue(Math.round(this.baseCharacteristics.getDamage() + this.equipment.getDamageBonus()));
		this._log(this.damage.value);
	}

	updateLuck() {
		this.luck.updateValue(Math.round(this.baseCharacteristics.getLuck() + this.equipment.getLuckBonus()));
		this._log(this.luck.value);
	}

	updateDodge() {
		this.dodge.updateValue(Math.round(this.baseCharacteristics.getDodge() + this.equipment.getDodgeBonus()));
		this._log(this.dodge.value);
	}

	beFullHealed() {
		this.currentHealth.updateValue(this.getMaxHealth());
		this._log(this.getHealth());
	}

	beHealed(value) {
		if (value < 0) {
			throw new Error('Отрицательное значение лечения');
		}
		this.currentHealth.updateValue(Math.floor(Math.min(this.currentHealth.value + value, this.maxHealth.value)));
		this._log(this.getHealth());
		return this.getHealth();
	}

	decreaseHealth(value) {
		if (value < 0) {
			throw new Error('Отрицательное значение лечения');
		}
		this.currentHealth.updateValue(Math.floor(Math.max(this.currentHealth.value - value, 1)));
		this._log(this.getHealth());
		return this.getHealth();
	}

	beDamaged(damage) {
		if (damage < 0) {
			throw new Error('Отрицательное значение урона');
		}
		this.currentHealth.updateValue(Math.floor(Math.max(this.currentHealth.value - damage, 0)));
		this._log(this.getHealth());
		return this.getHealth();
	}

	sayDefeatReplic() {
		this.say(this.replicsSet.getRandomDefeatReplic());
	}

	sayDodgeReplic() {
		this.say(this.replicsSet.getRandomDodgeReplic());
	}

	sayAttackReplic() {
		this.say(this.replicsSet.getRandomAttackReplic());
	}

	say(message) {
		this._log();
		this.replics.updateValue(message);

	}

	sayToGameView(message) {}
	setSayToGameView(arrowFunctionMessageArg) {
		this.sayToGameView = arrowFunctionMessageArg;
	}


	appendAll() {
		this._log();
		this.maxHealth.append();
		this.currentHealth.append();
		this.damage.append();
		this.luck.append();
		this.dodge.append();
		this.wins.append();
		this.equipment.append();
		this.replics.append();
	}

	removeAll() {
		this._log();
		this.remove();
		this.maxHealth.remove();
		this.currentHealth.remove();
		this.damage.remove();
		this.luck.remove();
		this.dodge.remove();
		this.wins.remove();
		this.equipment.remove();
		this.replics.remove();
	}

	setModification(modification) {
		this.modificationMaps.getModificationMap(modification.getType()).setModification(modification);
	}

	deleteModification(modification) {
		this.modificationMaps.getModificationMap(modification.getType()).deleteModification(modification);
	}

	getInitiativeModificationMap() {
		return this.modificationMaps.getModificationMap(GAME_CORE.DEFAULT_PROPS.MODIFICATIONS.TYPES.initiative);
	}
	getDodgeModificationMap() {
		return this.modificationMaps.getModificationMap(GAME_CORE.DEFAULT_PROPS.MODIFICATIONS.TYPES.dodge);
	}
	getAttackModificationMap() {
		return this.modificationMaps.getModificationMap(GAME_CORE.DEFAULT_PROPS.MODIFICATIONS.TYPES.attack);
	}
	getPunishModificationMap() {
		return this.modificationMaps.getModificationMap(GAME_CORE.DEFAULT_PROPS.MODIFICATIONS.TYPES.punish);
	}

	_initViewObj() {
		this.name = new GAME_CORE.TextEntity(id + 'NAME', name, this.getView());
		this.maxHealth = new GAME_CORE.TextEntity(id + 'MAXHP', this.baseCharacteristics.getHealth(), this.getView());
		this.currentHealth =  new GAME_CORE.TextEntity(id + 'HP', this.baseCharacteristics.getHealth(), this.getView());
		this.damage = new GAME_CORE.TextEntity(id + 'DMG', this.baseCharacteristics.getDamage(), this.getView());
		this.luck = new GAME_CORE.TextEntity(id + 'LUCK', this.baseCharacteristics.getLuck(), this.getView());
		this.dodge = new GAME_CORE.TextEntity(id + 'DODGE', this.baseCharacteristics.getDodge(), this.getView());
		this.wins = new GAME_CORE.TextEntity(id + 'WINS',0, this.getView());
		this.replics = new GAME_CORE.TextEntity(id + 'SAY', '', this.getView());
	}
};
//todo create test
GAME_CORE.ReplicsSet = class ReplicsSet {
	constructor(dodgeArray, attackArray, defeatArray) {
		this.dodgeArray = dodgeArray;
		this.attackArray = attackArray;
		this.defeatArray = defeatArray;
	}

	getRandomDodgeReplic() {
		return this.dodgeArray[UTIL_CORE.randomGen(this.dodgeArray.length)];
	}

	getRandomAttackReplic() {
		return this.attackArray[UTIL_CORE.randomGen(this.attackArray.length)];
	}

	getRandomDefeatReplic() {
		return this.defeatArray[UTIL_CORE.randomGen(this.defeatArray.length)];
	}

	cloneThis() {
		return new GAME_CORE.ReplicsSet([...this.dodgeArray], [...this.attackArray], [...this.defeatArray]);
	}
};

//todo create test
GAME_CORE.Modification = class Modification {
	//method execute(thisUnit, targetUnit)
	constructor(groupName,  type, name, description, executeMethod, maxLevel = 3) {
		this.groupName = groupName;
		this.type = type;
		this.name = name;
		this.description = description;
		this.executeMethod = executeMethod;
		this.level = 1;
		this.maxLevel = maxLevel;
		this.counter = 0;
	}

	getGroupName() {return this.groupName;}
	getType() {return this.type;}
	getName() {return this.name;}
	getDescription() {return this.description;}
	getLevel() { return this.level; }
	levelUp() {
		this.level = Math.min(this.level +1, this.maxLevel);
	}
	decreaseLevel() {
		Math.max(this.level - 1, 1);
	}
	execute(thisUnit, targetUnit) { this.executeMethod(thisUnit, targetUnit); }
};
//todo create test
GAME_CORE.ModificationMap = class ModificationMap {
	constructor() {
		this.modificationMap = new Map();
	}

	getRandomModification() {
		const index = UTIL_CORE.randomGen(this.modificationMap.size);
		let i = 0;
		for (const mod of this.modificationMap.keys()) {
			if (i === index) {
				return mod;
			}
			i++;
		}
	}

	hasModification(groupName) {return this.modificationMap.has(groupName);}
	getModification(groupName) {
		return this.modificationMap.get(groupName);
	};
	setModification(mod) {return this.modificationMap.set(mod.getGroupName(), mod)};

	deleteByName(groupName) {
		return this.modificationMap.delete(groupName);
	}

	deleteModification(modification) {
		return this.deleteByName(modification.getGroupName());
	}

	execute(thisUnit, targetUnit) {
		const answer = [];
		for (const key of this.modificationMap.keys()) {
			answer.push(this.modificationMap.get(key).execute(thisUnit, targetUnit));
		}
		return answer;
	}
};
//todo create test
GAME_CORE.ModificationMaps = class ModificationMaps {
	constructor() {
		this.modificationMaps = new Map();
		this.modificationMaps.set(GAME_CORE.DEFAULT_PROPS.MODIFICATIONS.TYPES.attack,
			new GAME_CORE.ModificationMap());
		this.modificationMaps.set(GAME_CORE.DEFAULT_PROPS.MODIFICATIONS.TYPES.dodge,
			new GAME_CORE.ModificationMap());
		this.modificationMaps.set(GAME_CORE.DEFAULT_PROPS.MODIFICATIONS.TYPES.initiative,
			new GAME_CORE.ModificationMap());
		this.modificationMaps.set(GAME_CORE.DEFAULT_PROPS.MODIFICATIONS.TYPES.punish,
			new GAME_CORE.ModificationMap())
	}

	getModificationMap(type) {
		return this.modificationMaps.get(type);
	}
};

