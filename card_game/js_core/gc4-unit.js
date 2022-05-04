GAME_CORE.Unit = class Unit {
	//this id - base to ids of entry entities
	constructor(id, name, viewParent = document.body,
				baseCharacteristics =GAME_CORE.DEFAULT_PROPS.baseCharacteristic(),
				replicsSet =GAME_CORE.DEFAULT_PROPS.replicsSet(),
				equipmentMultiple =GAME_CORE.DEFAULT_PROPS.equipmentMultiple(),
				equipmentAdditional = GAME_CORE.DEFAULT_PROPS.equipmentAdditional(),
				equipmentCardInit =GAME_CORE.DEFAULT_PROPS.equipmentCardInit) {
		this.appender = new GAME_CORE.Appender(id, this, viewParent);
		this.replicsSet = replicsSet;

		this.baseCharacteristics = baseCharacteristics;
		this.equipmentMultiple = equipmentMultiple;
		this.equipmentAdditional = equipmentAdditional;
		//views
		this.name = new GAME_CORE.TextEntity(id + 'NAME', name, this.view);
		this.maxHealth = new GAME_CORE.TextEntity(id + 'MAXHP', this.baseHealth, this.view);	
		this.currentHealth =  new GAME_CORE.TextEntity(id + 'HP', this.baseHealth, this.view);
		this.damage = new GAME_CORE.TextEntity(id + 'DMG', this.baseDamage, this.view);
		this.luck = new GAME_CORE.TextEntity(id + 'LUCK', this.baseLuck, this.view);
		this.dodge = new GAME_CORE.TextEntity(id + 'DODGE', this.baseDodge, this.view);
		this.wins = new GAME_CORE.TextEntity(id + 'WINS',0, this.view);
		this.replics = new GAME_CORE.TextEntity(id + 'SAY', '', this.view);

		this.equipment = new GAME_CORE.Equipment(id + 'SET', this.view, this.equipmentAdditional, this.equipmentMultiple, equipmentCardInit);
		this.equipment.owner = this;
		this.updateAllParam();
		GAME_CORE.LOGGERS.InfoUnitLogger.log(this.view.id + ' created');
	}

	updateAllParam() {
		this.updateMaxHealth();
		this.updateDamage();
		this.updateLuck();
		this.updateDodge();
		GAME_CORE.LOGGERS.InfoUnitLogger.logMethod(this.view.id, 'updateAllParam');
	}
	
	updateMaxHealth() {
		this.maxHealth.updateValue(Math.round(this.baseCharacteristics.getHealth() + this.equipment.getHealthBonus()));
		GAME_CORE.LOGGERS.InfoUnitLogger.logMethod(this.view.id + ' value: ' + this.maxHealth.value, 'updateMaxHealth');
	}
	
	updateDamage() {
		this.damage.updateValue(Math.round(this.baseCharacteristics.getDamage() + this.equipment.getDamageBonus()));
		GAME_CORE.LOGGERS.InfoUnitLogger.logMethod(this.view.id + ' value: ' + this.damage.value, 'updateDamage');
	}
	
	updateLuck() {
		this.luck.updateValue(Math.round(this.baseCharacteristics.getLuck() + this.equipment.getLuckBonus()));
		GAME_CORE.LOGGERS.InfoUnitLogger.logMethod(this.view.id + ' value: ' + this.luck.value, 'updateLuck');
	}

	updateDodge() {
		this.dodge.updateValue(Math.round(this.baseCharacteristics.getDodge() + this.equipment.getDodgeBonus()));
		GAME_CORE.LOGGERS.InfoUnitLogger.logMethod(this.view.id + ' value: ' + this.dodge.value, 'updateDodge');
	}
	
	beFullHealed() {
		this.currentHealth.updateValue(this.maxHealth.value);
		GAME_CORE.LOGGERS.InfoUnitLogger.logMethod(this.view.id + ' value: ' + this.currentHealth.value, 'beFullHealed');
	}
	
	beHealed(value) {
		this.currentHealth.updateValue(Math.min(Math.max(this.currentHealth.value + value, 1), this.maxHealth.value));
		GAME_CORE.LOGGERS.InfoUnitLogger.logMethod(this.view.id + ' value: ' + this.currentHealth.value, 'beHealed');
	}

	_addingDamageModification(){
		return Math.floor(this.damage.value*(0.5 - Math.random())/5);
	}
	_multipleDamageModification(){return 1;}
	dealDamage() {
		const dmg = this.damage.value*this._multipleDamageModification() + this._addingDamageModification();
		GAME_CORE.LOGGERS.InfoUnitLogger.logMethod(this.view.id + ' damage is ' + dmg, 'dealDamage');
		return dmg;
	}
		
		// шанс увернуться от идущей на this атаки
	_modeOrCondition() {
		return false;
	}

	_modeAndCondition() {
		return true;
	}

	_isDodge(){
		return Math.floor(Math.random()*100) <= this.dodge.value;
	}
	dodgeAtack() {
		const cond = (this._isDodge()&&this._modeAndCondition() || this._modeOrCondition());
		if (cond) {
			this.say(this.dodgeReplic[UTIL_CORE.randomGen(this.dodgeReplic.length) - 1]);
		}
		GAME_CORE.LOGGERS.InfoUnitLogger.logMethod(this.view.id, 'dodgeAtack');
		return cond;
	}

	defeatPunish() {
		const num = Math.floor(Math.random()*5);
		const card = this.equipment.getEquipByNumber(num);
		const rar = Math.max(card.rarityOption.collectionIndex - 1, 0);
		card.changeRarityOption(card.rarityOption.rarityCollection[rar]);
		this.updateAllParam();
		GAME_CORE.LOGGERS.InfoUnitLogger.logMethod(this.view.id + 'is run', 'defeatPunish');
	}
		
		//аргумент - убийца
	die(unit) {
		GAME_CORE.LOGGERS.InfoUnitLogger.logMethod(this.view.id, 'die');
		this.say(this.dieReplic[Math.floor(Math.random()*this.replicsSet.defeatArray.length)]);
		this.defeatPunish();
		this.wins.updateValue(0);
		unit.wins.updateValue(unit.wins.value++);
	}
		
		// исходящая атака return -1 - увернулся; 0 - не смертельный урон; 1 - убил;
	attack(unit) {
		if (unit.dodgeAtack()) {
			GAME_CORE.LOGGERS.InfoUnitLogger.logMethod(unit.view.id + ' dodge is success', 'attack(unit)');
			return {type : -1, dmg : 0};
		}
		const damage = this.dealDamage();
		unit.currentHealth.updateValue(unit.currentHealth.value - damage);
		this.say(this.replicsSet.attackArray[Math.floor(Math.random()*this.replicsSet.attackArray.length)]);
		if (unit.currentHealth.value <= 0) {
			unit.die(this);
			GAME_CORE.LOGGERS.InfoUnitLogger.logMethod(this.view.id + ' enemy ' + unit.view.id + ' is die', 'attack(unit)');
			return {type : 1, dmg : damage};
		} else {
			GAME_CORE.LOGGERS.InfoUnitLogger.logMethod(this.view.id + ' enemy ' + unit.view.id + ' get damage', 'attack(unit)');
			return {type : 0, dmg : damage};
		}
	}
	
	say(message) {
		GAME_CORE.LOGGERS.InfoUnitLogger.logMethod(this.view.id, 'say');
		this.replics.updateValue(message);
	}

	_getInitiativeBonus() {return 0}
	_getRandomInitiativeBonus(){return 0;}

	getInitiative() {
		const ini = Math.floor(Math.random()*(this.luck.value + 100
			+ this._getRandomInitiativeBonus())*100) + this._getInitiativeBonus();
		GAME_CORE.LOGGERS.InfoUnitLogger.logMethod(this.view.id + 'initiative =' + ini, 'getInitiative');
		return  ini;
	}
		
	//append all inner elements to their parrents
	appendAll() {
		GAME_CORE.LOGGERS.InfoUnitLogger.logMethod(this.view.id + ' is run', 'appendAll');
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
		GAME_CORE.LOGGERS.InfoUnitLogger.logMethod(this.view.id + 'is run', 'removeAll');
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
	
	setParrent(parrent) {return this.appender.setViewParent(parrent);}
	remove() {return this.appender.remove();}
	append() {return this.appender.append();}
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

GAME_CORE.Modificator = class Modificator {
	//method execute(unitOwner, unitTarget)
	constructor(name, type, state, executeMethod) {
		this.name = name;
		this.type = type;
		this.state = state;
		this.execute = executeMethod;
	}
}

GAME_CORE.ModificatorCollection = class ModificatorCollection {
	constructor() {
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