GAME_CORE.Unit = class Unit extends UTIL_CORE.ViewEntity {
	constructor(id,
				name,
				viewParent = document.body,
				owner =undefined,
				baseCharacteristics =GAME_CORE.DEFAULT_PROPS.getBaseCharacteristic(),
				replicsSet =new GAME_CORE.ReplicsSet(),
				equipment =undefined) {
		super(id, viewParent);
		this.setLogger(GAME_CORE.LOGGERS.InfoUnitLogger);
		this.owner = owner;
		this.replicsSet = replicsSet;
		this.baseCharacteristics = baseCharacteristics;
		this._initViewObj(name);
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
	getLuck() {return this.luck.getValue();}
	getDodge() {return this.dodge.getValue();}
	getOwner() {return this.owner;}
	getWins() {return this.wins.getValue();}
	getEquipment() {return this.equipment;}
	incrementWins() {return this.wins.updateValue(this.getWins()+1);}
	setZeroWins() {return this.wins.updateValue(0);}

	updateAllParam() {
		this.updateMaxHealth();
		this.updateDamage();
		this.updateLuck();
		this.updateDodge();
		this._log();
	}

	updateMaxHealth() {
		this.maxHealth.updateValue(Math.floor(this.baseCharacteristics.getHealth() + this.equipment.getHealthBonus()));
		this._log(this.maxHealth.value);
	}

	updateDamage() {
		this.damage.updateValue(Math.floor(this.baseCharacteristics.getDamage() + this.equipment.getDamageBonus()));
		this._log(this.damage.value);
	}

	updateLuck() {
		this.luck.updateValue(Math.floor(this.baseCharacteristics.getLuck() + this.equipment.getLuckBonus()));
		this._log(this.luck.value);
	}

	updateDodge() {
		this.dodge.updateValue(Math.floor(this.baseCharacteristics.getDodge() + this.equipment.getDodgeBonus()));
		this._log(this.dodge.value);
	}

	beFullHealed() {
		this.currentHealth.updateValue(this.getMaxHealth());
		this._log(this.getHealth());
	}
//todo реорганизовать проверки
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

	sayToGameView(message) {
		console.log('not set functionMessageArg, use setSayToGameView(functionMessageArg)')
	}
	setSayToGameView(functionMessageArg) {
		this.sayToGameView = functionMessageArg;
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
		return this.modificationMaps.getModificationMap(modification.getType())
			.setModification(modification);
	}

	deleteModification(modification) {
		return this.modificationMaps.getModificationMap(modification.getType()).deleteModification(modification);
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

	_initViewObj(name) {
		this.name = new GAME_CORE.TextEntity(this.getId() + 'NAME', this.getView(), name);
		this.maxHealth = new GAME_CORE.TextEntity(this.getId() + 'MAXHP', this.getView(), this.baseCharacteristics.getHealth());
		this.currentHealth =  new GAME_CORE.TextEntity(this.getId() + 'HP', this.getView(), this.baseCharacteristics.getHealth());
		this.damage = new GAME_CORE.TextEntity(this.getId() + 'DMG', this.getView(), this.baseCharacteristics.getDamage());
		this.luck = new GAME_CORE.TextEntity(this.getId() + 'LUCK', this.getView(), this.baseCharacteristics.getLuck());
		this.dodge = new GAME_CORE.TextEntity(this.getId() + 'DODGE', this.getView(), this.baseCharacteristics.getDodge());
		this.wins = new GAME_CORE.TextEntity(this.getId() + 'WINS', this.getView(),0);
		this.replics = new GAME_CORE.TextEntity(this.getId() + 'SAY', this.getView(), '');
	}
};

GAME_CORE.ReplicsSet = class ReplicsSet {
	constructor(dodgeArray =GAME_CORE.DEFAULT_PROPS.getDodgeReplics(),
				attackArray =GAME_CORE.DEFAULT_PROPS.getAttackReplics(),
				defeatArray =GAME_CORE.DEFAULT_PROPS.getDefeatReplics()) {
		this.dodgeReplics = dodgeArray;
		this.attackReplics = attackArray;
		this.defeatReplics = defeatArray;
	}

	getRandomDodgeReplic() {
		return this.dodgeReplics[UTIL_CORE.randomGen(this.dodgeReplics.length)];
	}

	getRandomAttackReplic() {
		return this.attackReplics[UTIL_CORE.randomGen(this.attackReplics.length)];
	}

	getRandomDefeatReplic() {
		return this.defeatReplics[UTIL_CORE.randomGen(this.defeatReplics.length)];
	}
};

GAME_CORE.ModificationMaps = class ModificationMaps {
	constructor() {
		this.modificationMaps = new Map();
		this.modificationMaps.set(GAME_CORE.DEFAULT_PROPS.MODIFICATIONS.TYPES.attack,
			new GAME_CORE.ModificationMap(GAME_CORE.DEFAULT_PROPS.MODIFICATIONS.TYPES.attack));
		this.modificationMaps.set(GAME_CORE.DEFAULT_PROPS.MODIFICATIONS.TYPES.dodge,
			new GAME_CORE.ModificationMap(GAME_CORE.DEFAULT_PROPS.MODIFICATIONS.TYPES.dodge));
		this.modificationMaps.set(GAME_CORE.DEFAULT_PROPS.MODIFICATIONS.TYPES.initiative,
			new GAME_CORE.ModificationMap(GAME_CORE.DEFAULT_PROPS.MODIFICATIONS.TYPES.initiative));
		this.modificationMaps.set(GAME_CORE.DEFAULT_PROPS.MODIFICATIONS.TYPES.punish,
			new GAME_CORE.ModificationMap(GAME_CORE.DEFAULT_PROPS.MODIFICATIONS.TYPES.punish))
	}

	getModificationMap(type) {
		return this.modificationMaps.get(type);
	}
};

GAME_CORE.ModificationMap = class ModificationMap {
	constructor(typeName) {
		this.modificationMap = new Map();
		this.typeName = typeName;
	}
	getTypeName() {return this.typeName;}
	hasModification(groupName) {return this.modificationMap.has(groupName);}
	getModification(groupName) {
		return this.modificationMap.get(groupName);
	};

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
	setModification(mod) {
		if (mod.getType() === this.typeName) {
			this.modificationMap.set(mod.getGroupName(), mod)
			return true;
		}
		return false;
	};

	deleteByName(groupName) {
		return this.modificationMap.delete(groupName);
	}

	deleteModification(modification) {
		if (modification.getType() === this.typeName) {
			return this.deleteByName(modification.getGroupName());
		}
		return false;
	}

	execute(thisUnit, targetUnit) {
		const answer = [];
		for (const key of this.modificationMap.keys()) {
			answer.push(this.modificationMap.get(key).execute(thisUnit, targetUnit));
		}
		return answer;
	}
};

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
	getLevel() {return this.level; }
	getMaxLevel() {return this.maxLevel}
	levelUp() {
		this.level = Math.min(this.level +1, this.getMaxLevel());
	}
	decreaseLevel() {
		this.level = Math.max(this.level - 1, 1);
	}
	execute(thisUnit, targetUnit) {return this.executeMethod(thisUnit, targetUnit); }
};

