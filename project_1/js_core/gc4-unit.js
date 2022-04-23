GAME_CORE.Unit = class Unit {
	//this id - base to ids of entry entities
	constructor(id, name, settedParrent = document.body) {
		this.appender = new GAME_CORE.Appender(id, this, settedParrent);
		this.dodgeReplic = GAME_CORE.UNITS_PROP.dodgeReplics;
		this.atackReplic = GAME_CORE.UNITS_PROP.atackReplics;
		this.dieReplic = GAME_CORE.UNITS_PROP.dieReplics;
		this.punish = GAME_CORE.UNITS_PROP.punish;
		//base_params//
		this.baseHealth = GAME_CORE.UNITS_PROP.baseHealth;
		this.baseDamage = GAME_CORE.UNITS_PROP.baseDamage;
		this.baseLuck = GAME_CORE.UNITS_PROP.baseLuck;
		this.baseDodge = GAME_CORE.UNITS_PROP.baseDodge;
		//views
		this.name = new GAME_CORE.TextEntity(id + 'NAME', name, this.view);
		this.maxHealth = new GAME_CORE.TextEntity(id + 'MAXHP', this.baseHealth, this.view);	
		this.currentHealth =  new GAME_CORE.TextEntity(id + 'HP', this.baseHealth, this.view);
		this.damage = new GAME_CORE.TextEntity(id + 'DMG', this.baseDamage, this.view);
		this.luck = new GAME_CORE.TextEntity(id + 'LUCK', this.baseLuck, this.view);
		this.dodge = new GAME_CORE.TextEntity(id + 'DODGE', this.baseDodge, this.view);
		this.wins = new GAME_CORE.TextEntity(id + 'WINS',0, this.view);
		this.equipment = new GAME_CORE.Equipment(id + 'SET', this.view);
		this.replics = new GAME_CORE.TextEntity(id + 'SAY', '', this.view);
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
		this.maxHealth.updateValue(Math.round(this.baseHealth + this.equipment.returnHealthBonus()));
		GAME_CORE.LOGGERS.InfoUnitLogger.logMethod(this.view.id + ' value: ' + this.maxHealth.value, 'updateMaxHealth');
	}
	
	updateDamage() {
		this.damage.updateValue(Math.round(this.baseDamage + this.equipment.returnDamageBonus()));
		GAME_CORE.LOGGERS.InfoUnitLogger.logMethod(this.view.id + ' value: ' + this.damage.value, 'updateDamage');
	}
	
	updateLuck() {
	this.luck.updateValue(Math.round(this.baseLuck + this.equipment.returnLuckBonus()));
		GAME_CORE.LOGGERS.InfoUnitLogger.logMethod(this.view.id + ' value: ' + this.luck.value, 'updateLuck');
	}
	
	updateDodge() {
		this.dodge.updateValue(Math.round(this.baseDodge + this.equipment.returnDodgeBonus()));
		GAME_CORE.LOGGERS.InfoUnitLogger.logMethod(this.view.id + ' value: ' + this.dodge.value, 'updateDodge');
	}
	
	beAllHealed() {
		this.currentHealth.updateValue(this.maxHealth.value);
		GAME_CORE.LOGGERS.InfoUnitLogger.logMethod(this.view.id + ' value: ' + this.currentHealth.value, 'beAllHealed');
	}
	
	beHealed(value) {
		let val = this.currentHealth.value + value;
		if (val > this.maxHealth.value) {val = this.maxHealth.value;}
		if (val <= 0) {val = 1;}
		this.currentHealth.updateValue(val);
		GAME_CORE.LOGGERS.InfoUnitLogger.logMethod(this.view.id + ' value: ' + this.currentHealth.value, 'beHealed');
	}
		
	/*********PRIVATE*********/
		dealDamage() {
			const dmg = GAME_CORE.UNITS_PROP.damageDeal(this.damage.value);
			GAME_CORE.LOGGERS.InfoUnitLogger.logMethod(this.view.id + ' damage is ' + dmg, 'dealDamage');
			return dmg;
		}
		
		// шанс увернуться от идущей на this атаки
		dodgeAtack() {
			const cond = (GAME_CORE.UNITS_PROP.randomGen() <= Math.floor(this.dodge.value*GAME_CORE.UNITS_PROP.randomRange/100));
			if (cond) { this.say(this.dodgeReplic[UTIL_CORE.randomGen(this.dodgeReplic.length) - 1]);}
			GAME_CORE.LOGGERS.InfoUnitLogger.logMethod(this.view.id, 'dodgeAtack');
			return cond;
		}
		
		//аргумент - убийца
		die(unit) {
			GAME_CORE.LOGGERS.InfoUnitLogger.logMethod(this.view.id, 'die');
			this.say(this.dieReplic[UTIL_CORE.randomGen(this.dieReplic.length) - 1]);
			this.punish();
			this.wins.updateValue(0);
			unit.wins.updateValue(unit.wins.value++);
		}
	/*************************/
		
		// исходящая атака return -1 - увернулся; 0 - не смертельный урон; 1 - убил;
	atack(unit) {
		if (unit.dodgeAtack()) { 
			GAME_CORE.LOGGERS.InfoUnitLogger.logMethod(unit.view.id + ' dodge is success', 'atack(unit)');
			return {type : -1, dmg : 0};
		}
		const damage = this.dealDamage();
		unit.currentHealth.updateValue(unit.currentHealth.value - damage);
		this.say(this.atackReplic[UTIL_CORE.randomGen(this.atackReplic.length) - 1]);
		if (unit.currentHealth.value <= 0) {
			unit.die(this);
			GAME_CORE.LOGGERS.InfoUnitLogger.logMethod(this.view.id + ' enemy ' + unit.view.id + ' is die', 'atack(unit)');
			return {type : 1, dmg : damage};
		} else {
			GAME_CORE.LOGGERS.InfoUnitLogger.logMethod(this.view.id + ' enemy ' + unit.view.id + ' get damage', 'atack(unit)');
			return {type : 0, dmg : damage};
		}
	}
	
	say(message) {
		GAME_CORE.LOGGERS.InfoUnitLogger.logMethod(this.view.id, 'say');
		this.replics.updateValue(message);
	}
		
	
		
	getInitiative() {
		const ini = UTIL_CORE.randomGen((this.luck.value + 50)*GAME_CORE.UNITS_PROP.randomRange);
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
	
	setParrent(parrent) {return this.appender.setParrent(parrent);}
	remove() {return this.appender.remove();}
	append() {return this.appender.append();}
};