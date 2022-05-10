GAME_CORE.Unit = class Unit {
	//this id - base to ids of entry entities
	constructor(id,
				name,
				viewParent = document.body,
				baseCharacteristics =GAME_CORE.DEFAULT_PROPS.baseCharacteristic(),
				replicsSet =GAME_CORE.DEFAULT_PROPS.replicsSet(),
				equipment =undefined) {
		this.viewEntity = new UTIL_CORE.ViewEntity(id, viewParent);
		this.replicsSet = replicsSet;

		this.baseCharacteristics = baseCharacteristics;
		this._initViewObj();
		this._initModificatorsCollections();
		if (equipment !== undefined) {
			this.equipment = equipment;
		} else {
			this.equipment = GAME_CORE.DEFAULT_PROPS.getEquipment(this.getViewId() + 'SET',  this.getView());
		}
		this.equipment.owner = this;
		this.updateAllParam();
		this._log('created', 'constructor');
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

	_initModificatorsCollections() {
		this.addingDamageModifications = new GAME_CORE.ModificationCollection([]);
		this.multipleDamageModifications = new GAME_CORE.ModificationCollection([]);
		this.orDodgeModifications = new GAME_CORE.ModificationCollection([]);
		this.andDodgeModifications = new GAME_CORE.ModificationCollection([]);
		this.initiativeModifications = new GAME_CORE.ModificationCollection([]);
		this.randomInitiativeModifications = new GAME_CORE.ModificationCollection([]);
		this.punishModifications = new GAME_CORE.ModificationCollection([]);
		//todo добавить остальные
		//todo вызовы методов взаимодействия принимают два аргумента thisUnit, targetUnit
	}

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
		this.currentHealth.updateValue(this.maxHealth.value);
		this._log(this.currentHealth.value);
	}
	
	beHealed(value) {
		this.currentHealth.updateValue(Math.min(Math.max(this.currentHealth.value + value, 1), this.maxHealth.value));
		this._log(this.currentHealth.value);
	}

	_addingDamageModification(){
		return Math.floor(this.damage.value*(0.5 - Math.random())/5);
	}
	_multipleDamageModification(){return 1;}
	dealDamage() {
		const dmg = this.damage.value*this._multipleDamageModification() + this._addingDamageModification();
		this._log();
		return dmg;
	}
		
		// шанс увернуться от идущей на this атаки
	_modeOrDodgeCondition() {
		return false;
	}

	_modeAndDodgeCondition() {
		return true;
	}

	_isDodge(){
		return Math.floor(Math.random()*100) <= this.dodge.value;
	}
	dodgeAttack() {
		const cond = (this._isDodge()&&this._modeAndDodgeCondition() || this._modeOrDodgeCondition());
		if (cond) {
			this.say(this.replicsSet.dodgeArray[UTIL_CORE.randomGen(this.replicsSet.length)]);
		}
		this._log();
		return cond;
	}

	defeatPunish() {
		const num = UTIL_CORE.randomGen(5);
		const card = this.equipment.getEquipByNumber(num);
		const rar = Math.max(card.settingsCollections.rarityCollection.getRarityIndexByName(card.rarityOption.name) - 1, 0);
		card.changeRarityOption(card.settingsCollections.rarityCollection[rar]);
		this.updateAllParam();
		this._log();
	}
		
		//аргумент - убийца
	defeat(unit) {
		this._log();
		this.say(this.replicsSet.defeatArray[UTIL_CORE.randomGen(this.replicsSet.defeatArray.length)]);
		this.defeatPunish();
		this.wins.updateValue(0);
		unit.wins.updateValue(unit.wins.value++);
	}
		
		// исходящая атака return -1 - увернулся; 0 - не смертельный урон; 1 - убил;
	attack(unit) {
		if (unit.dodgeAttack()) {
			this._log(unit.getViewId() +  ' dodge is success')
			return {type : -1, dmg : 0};
		}
		const damage = this.dealDamage();
		unit.currentHealth.updateValue(unit.currentHealth.value - damage);
		this.say(this.replicsSet.attackArray[UTIL_CORE.randomGen(this.replicsSet.attackArray.length)]);
		if (unit.currentHealth.value <= 0) {
			unit.defeat(this);
			this._log(' enemy ' + unit.getViewId() + ' defeat')
			return {type : 1, dmg : damage};
		} else {
			this._log(' enemy ' + unit.getViewId() + ' get damage');
			return {type : 0, dmg : damage};
		}
	}
	
	say(message) {
		this._log();
		this.replics.updateValue(message);
	}

	_getInitiativeModification() {return 0}
	_getRandomInitiativeModification(){return 0;}

	getInitiative() {
		const ini = UTIL_CORE.randomGen(this.luck.value + 100
			+ this._getRandomInitiativeModification()) + this._getInitiativeModification();
		this._log(ini);
		return  ini;
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
	
	setViewParent(viewParent) {return this.viewEntity.setViewParent(viewParent);}
	remove() {return this.viewEntity.remove();}
	append() {return this.viewEntity.append();}
	getView() {return this.viewEntity.view;}
	getViewId() {return this.getView().id;}

	_log(message ='', methodName=GAME_CORE.LOGGERS.InfoUnitLogger._getMethodName()) {
		GAME_CORE.LOGGERS.InfoUnitLogger.logMethod(this.getViewId() + ' ' + message, methodName);
	}
};

GAME_CORE.ReplicsSet = class ReplicsSet {
	constructor(dodgeArray, attackArray, defeatArray) {
		this.dodgeArray = dodgeArray;
		this.attackArray = attackArray;
		this.defeatArray = defeatArray;
	}

	cloneThis() {
		return new GAME_CORE.ReplicsSet([...this.dodgeArray], [...this.attackArray], [...this.defeatArray]);
	}
}

GAME_CORE.Modification = class Modification {
	//method execute(thisUnit, targetUnit)
	constructor(name, type, executeMethod) {
		this.name = name;
		this.type = type;
		this.executeMethod = executeMethod;
	}

	execute(thisUnit, targetUnit) {this.executeMethod(thisUnit, targetUnit);}
}
GAME_CORE.ModificationCollection = class ModificationCollection {
	constructor(modificationArray) {
		this.modifications = modificationArray;
	}

	add(modification) {
		if (!(modification instanceof GAME_CORE.Modification)) {
			return;
		}
		const index = this.getIndexByName(modification.name);
		if (index < 0) {
			this.modifications.push(modification);
		} else {
			this.modifications[index] = modification;
		}
	}

	getByIndex(index) {return this.modifications[index];}
	getByName(name) {
		const index = this.getIndexByName(name);
		if (index < 0) {
			return false;
		}
		return  this.modifications[index];
	}

	getIndexByName(name) {
		for (let i = 0; i < this.modifications.length; i++) {
			if (this.modifications[i].name === name) {
				return i;
			}
		}
		return  -1;
	}

	deleteByIndex(index) {
		this.modifications.splice(index,1);
	}

	deleteByName(name) {
		this.getByName(name).s
	}

	execute(thisUnit, targetUnit) {
		for (let i = 0; i < this.modifications.length; i++) {
			this.modifications[i].execute(thisUnit, targetUnit);
		}
	}
/*	todo коллекция модификаторов - имя коллекцииб массив со списком модификаторов, удалить модификатор по имени и индексу,
	модификатору добавляемому в
	коллекцию присвоить поле индекс.
	поля коллекций модификаторов в юните: - для каждого места где есть методы выполнения модификаторов
	в коллекции сделать метод выполнить все - выполняет все исполняемые методы активных модификаторов
	*/
}



/*todo
	для мультипликаторов и добавочных бонус к снаряжению зависящик от карты в ячейке снаряжения
	equipmentMultiple и equipmentAdditional, эти бафы разовые - класс модификаторыСнаряжения
	в этом классе методы прикрепить, открепить, метод исполнения - он заменяет соответсвующие значения в статсетах и/или
	методы вернуть здоровье и прочее
	один из таких бафов - полностью очищает мультипликаторы до начального состояния
	метод открепления желательно должен иметь возможность откатить все изменения модификатора
	добавить для кажждого поля equipmentMultiple и equipmentAdditional - состояния - доступна модификация или нет, если не доступна - не изменять

 */