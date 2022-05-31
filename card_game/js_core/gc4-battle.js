GAME_CORE.BATTLE = {}
//todo create test
GAME_CORE.BATTLE.Battle = class Battle {
    constructor(fightActions,viewActions) {
        this.fightActions = fightActions;
        this.viewActions = viewActions;
    }

    async fight() {
        do {
            const attackResult = this.fightActions.fight();
            await this.viewActions.runViewActions(attackResult);
        } while (this.fightActions.isEnd());
        const result = this.fightActions.getBattleResult();
        this.fightActions.resetBattle();
        return result;
    }
};

GAME_CORE.BATTLE.AbstractFightersPool = class AbstractFightersPool {
    constructor() {
    }
    getIncludedCount() {throw Error('not override abstract method');}
    getFightingFighters() {throw Error('not override abstract method');}
    getAllFightersArray() {throw Error('not override abstract method');}
}

GAME_CORE.BATTLE.AbstractViewActions = class AbstractViewActions {
    constructor() {
    }
    async runViewActions(attackResult) {throw Error('not override abstract method');}
}

GAME_CORE.BATTLE.AbstractFightActions = class AbstractFightActions {
    constructor(fightersPool, attackProcessor) {
        this.fightersPool = fightersPool;
        this.attackProcessor = attackProcessor;
    }
    fight() {throw Error('not override abstract method');}
    isEnd() {throw Error('not override abstract method');}
    getBattleResult() {throw Error('not override abstract method');}
    resetBattle() {throw Error('not override abstract method');}
}
//todo create test
GAME_CORE.BATTLE.LogChatViewActions = class LogChatViewActions extends  GAME_CORE.BATTLE.AbstractViewActions{
    constructor(logChat, attackerColor="orange", defenderColor="blue", chatColor ='red', sleepTime =500) {
        super();
        this.logChat = logChat;
        this.defenderPresetLetter = new UTIL_CORE.PresetLetter(defenderColor);
        this.attackerPresetLetter = new UTIL_CORE.PresetLetter(attackerColor);
        this.chatPresetLetter = new UTIL_CORE.PresetLetter(chatColor);
        this.sleepTime = sleepTime;
    }

    async runViewActions(attackResult) {
        const attackerName = this.attackerPresetLetter.getLetter(attackResult.getAttacker().getUnit().getName());
        const defenderName = this.defenderPresetLetter.getLetter(attackResult.getDefender().getUnit().getName());
        if (attackResult.getType() === GAME_CORE.DEFAULT_PROPS.BATTLE.ATTACK_RESULT.failAttack) {
            await this.logChat.writeLetters([attackerName,
                this.chatPresetLetter.getNoColoredLetter(' так и не решился на атаку')], this.sleepTime );
        }
        if (attackResult.getType() === GAME_CORE.DEFAULT_PROPS.BATTLE.ATTACK_RESULT.dodge) {
            await this.logChat.writeLetters([defenderName,
                this.chatPresetLetter.getNoColoredLetter(' увернулся от атаки')], this.sleepTime);
        }
        if (attackResult.getType() === GAME_CORE.DEFAULT_PROPS.BATTLE.ATTACK_RESULT.damaged) {
            await this.logChat.writeLetters([attackerName,
                this.chatPresetLetter.getNoColoredLetter(' нанёс противнику '),
                this.chatPresetLetter.getLetter(attackResult.getDamage()),
                this.chatPresetLetter.getNoColoredLetter(' единиц урона ')], this.sleepTime );
        }
        if (attackResult.getType() === GAME_CORE.DEFAULT_PROPS.BATTLE.ATTACK_RESULT.defeated) {
            await this.logChat.writeLetters([attackerName,
                this.chatPresetLetter.getNoColoredLetter(' повергает '),
                defenderName,
                this.chatPresetLetter.getNoColoredLetter(' нанеся '),
                this.chatPresetLetter.getLetter(attackResult.getDamage()),
                this.chatPresetLetter.getNoColoredLetter(' единиц урона ')], this.sleepTime );
        }
    }

    setAttackerColor(color) {
        this.attackerPresetLetter.setColor(color);
    }
    setDefenderColor(color) {
        this.defenderPresetLetter.setColor(color);
    }
}
//todo create test
GAME_CORE.BATTLE.DuelFightActions = class DuelFightActions extends GAME_CORE.BATTLE.AbstractFightActions {
    constructor(fighterPool, attackProcessor, battleType =undefined) {
        super(fighterPool, attackProcessor);
        this.attackResult = undefined;
        this.attackCounter = 0;
        this.winner = undefined;
        this.isDefeat = false;
        if (battleType === undefined) {
            this.battleType = this.constructor.name;
        } else {
            this.battleType = battleType;
        }
    }

    fight() {
        if (!this.isEnd()) {
            this._incrementAttackCounter();
            this.attackResult = this.attackProcessor.attack(this.fightersPool.getFightingFighters());
            return this.attackResult;
        } else {
            throw Error('Битва уже закончилась');
        }
    }

    isEnd() {
        if (this.attackResult !== undefined) {
            this.isDefeat  = this.attackResult.getType() === GAME_CORE.DEFAULT_PROPS.BATTLE.ATTACK_RESULT.defeated;
            this.winner = this.attackResult.getAttacker();
            return this.isDefeat;
        }
        return false;
    }

    getBattleResult() {
        if (this.isDefeat) {
            return new GAME_CORE.BATTLE.BattleResult(this.winner, this.attackCounter, this.battleType);
        } else {
            return new GAME_CORE.BATTLE.BattleResult(undefined, this.attackCounter,
                GAME_CORE.DEFAULT_PROPS.BATTLE.earlyBattleResultBattleType);
        }
    }

    resetBattle() {
        this.attackCounter = 0;
        this.winner = undefined;
        this.isDefeat = false;
        this.attackResult = undefined;
    }

    setFightersPool(fighterPool) {
        this.fightersPool = fighterPool;
    }

    setAttackProcessor(attackProcessor) {
        this.attackProcessor = attackProcessor;
    }

    _incrementAttackCounter() {
        this.attackCounter++;
    }
};

GAME_CORE.BATTLE.BattleResult = class BattleResult {
    constructor(winnerFighter, attackRoundCounter, battleType) {
        //todo добавить проверку параметров, первый тип файтер второй - положительное число, третий - строка
        this.winnerFighter = winnerFighter;
        this.attackRoundCounter = attackRoundCounter;
        this.battleType = battleType;
    }

    getWinner() {
        return this.winnerFighter;
    }

    getAttackRoundCounter() {
        return this.attackRoundCounter;
    }

    getBattleType() {
        return this.battleType;
    }
};

GAME_CORE.BATTLE.AttackProcessor = class AttackProcessor {
    constructor() {
        this.attackerUnit = undefined;
        this.defenderUnit = undefined;
    }

    attack(fightingFighters) {
        this._setUnits(fightingFighters);
        if (!this._isAlive()) {
            throw Error('один из бойцов мёртв!');
        }
        if (!this._isSuccessAttack()) {
            return new GAME_CORE.BATTLE.AttackResult(fightingFighters, GAME_CORE.DEFAULT_PROPS.BATTLE.ATTACK_RESULT.failAttack);
        }
        if (this._isDodge()) {
            return  new GAME_CORE.BATTLE.AttackResult(fightingFighters, GAME_CORE.DEFAULT_PROPS.BATTLE.ATTACK_RESULT.dodge);
        }
        const damage = this._dealDamage();
        if (this._isDie()) {
            this._defeat();
            return new GAME_CORE.BATTLE.AttackResult(fightingFighters, GAME_CORE.DEFAULT_PROPS.BATTLE.ATTACK_RESULT.defeated, damage);
        }
        return  new GAME_CORE.BATTLE.AttackResult(fightingFighters, GAME_CORE.DEFAULT_PROPS.BATTLE.ATTACK_RESULT.damaged, damage);
    }

    _isAlive() {
        return this.attackerUnit.getHealth() > 0 && this.defenderUnit.getHealth() > 0;
    }
    _setUnits(fightingFighters) {
        this.attackerUnit = fightingFighters.getAttacker().getUnit();
        this.defenderUnit = fightingFighters.getDefender().getUnit();
    }

    _isSuccessAttack() {
        return (this._getInitiative(this.attackerUnit, this.defenderUnit)
            - this._getInitiative(this.defenderUnit, this.attackerUnit) >= 0);
    }

    _getInitiative(thisUnit, targetUnit) {
        return Math.floor(Math.max(this._getBaseInitiative(thisUnit) + this._getModInitiative(thisUnit, targetUnit), 0));
    }

    _getModInitiative(thisUnit, targetUnit) {
        let sum = 0;
        for (const addInitiative of
            thisUnit.getInitiativeModificationMap().execute(thisUnit, targetUnit)) {
            sum += addInitiative;
        }
        return sum;
    }

    _getBaseInitiative(thisUnit) {return UTIL_CORE.randomGen(thisUnit.getLuck() + 100);}

    _isDodge() {
        const cond = (this._baseDodge() || this._modeDodgeCondition());
        if (cond) {
            this.defenderUnit.sayDodgeReplic();
        }
        return cond;
    }

    _baseDodge() {return Math.floor(Math.random()*100) <= this.defenderUnit.getDodge();}

    _modeDodgeCondition() {
        let sumResult = false;
        for (const cond of this.defenderUnit.getDodgeModificationMap().execute(this.defenderUnit, this.attackerUnit)) {
            sumResult = sumResult || cond;
            if (sumResult) {return sumResult;}
        }
        return sumResult;
    }

    _dealDamage() {
        const dmg = Math.max(Math.floor(this.attackerUnit.getDamage() + this._modeDamage()), 0);
        this.attackerUnit.sayAttackReplic();
        return this.defenderUnit.getHealth() - this.defenderUnit.beDamaged(dmg);
    }

    _modeDamage() {
        let sum = 0;
        for (const dmg of
            this.attackerUnit.getAttackModificationMap().execute(this.attackerUnit, this.defenderUnit)) {
            sum += dmg;
        }
        return sum;
    }

    _isDie() {return this.defenderUnit.getHealth() <= 0;}

    _defeat() {
        this._doPunish();
        this.defenderUnit.sayDefeatReplic();
        this.attackerUnit.updateAllParam();
        this.defenderUnit.updateAllParam();
        this.defenderUnit.setZeroWins();
        this.attackerUnit.incrementWins();
        this.attackerUnit.beFullHealed();
        this.defenderUnit.beFullHealed();
    }

    _doPunish() {
        this.attackerUnit.getPunishModificationMap().execute(this.attackerUnit, this.defenderUnit);
    }
};

//todo create test
GAME_CORE.BATTLE.AttackResult = class AttackResult {
    constructor(fightingFighters, type, dealingDamage =0) {
        //todo добавить проверку на совпадение класса
        this.fightingFighters = fightingFighters;
        this.type = type;
        this.damage = dealingDamage;
    }
    getType() {return this.type;}
    getDamage() {return this.damage;}
    getAttacker() {return this.fightingFighters.getAttacker();}
    getDefender() {return this.fightingFighters.getDefender();}
}

GAME_CORE.BATTLE.DuelFightersPool = class DuelFightersPool extends GAME_CORE.BATTLE.AbstractFightersPool {
    constructor(unitOrFighter1, unitOrFighter2) {
        super();
        this._initFighters(unitOrFighter1, unitOrFighter2);
        this.fighter1AttackCondition = true;
    }
    getIncludedCount() {
        if (this._fightersIsDefined()) {
            return 2;
        } else {
            return 0;
        }
    }
    getAllFightersArray() {return [this.fighter1, this.fighter2];}
    getFightingFighters() {
        if (!this._fightersIsDefined()) {
            throw Error('one or more fighters is undefined');
        }
        if (this.fighter1AttackCondition) {
            this._changeAttackerCondition();
            return new GAME_CORE.BATTLE.FightingFighters(this.fighter1, this.fighter2);
        } else {
            this._changeAttackerCondition();
            return new GAME_CORE.BATTLE.FightingFighters(this.fighter2, this.fighter1);
        }
    }
    changeFighters(unitOrFighter1, unitOrFighter2) {
        this.fighter1AttackCondition = true;
        this._initFighters(unitOrFighter1, unitOrFighter2);
    }
    _isIncludeInt(fighter) { return fighter.isIncluded()?1:0; }
    _changeAttackerCondition() {this.fighter1AttackCondition = !this.fighter1AttackCondition;}
    _fightersIsDefined() {return this.fighter1 !== undefined && this.fighter2 !== undefined;}
    _initFighters(unitOrFighter1, unitOrFighter2) {
        this.fighter1 = this._returnFighter(unitOrFighter1);
        this.fighter2 = this._returnFighter(unitOrFighter2);
    }
    _returnFighter(unitOrFighter) {
        if (UTIL_CORE.isObjExtendsClass(unitOrFighter, 'Unit')) {
            return new GAME_CORE.BATTLE.Fighter(unitOrFighter);
        }
        if (UTIL_CORE.isObjExtendsClass(unitOrFighter, 'Fighter')) {
            return unitOrFighter;
        }
        throw Error('не подходящий тип объекта');
    }
};

GAME_CORE.BATTLE.FightingFighters = class FightingFighters {
    constructor(attackerFighter, defenderFighter) {
        this.attacker = attackerFighter;
        this.defender = defenderFighter;
    }
    getAttacker() {return this.attacker;}
    getDefender() {return this.defender;}
};

GAME_CORE.BATTLE.Fighter = class Fighter {
    constructor(unit, command=GAME_CORE.DEFAULT_PROPS.BATTLE.no_command, active = true) {
        this.unit = unit;
        this.command = command;
        this.state = active;
    }
    isExcluded() {return !this.state;}
    isIncluded() {return this.state;}
    exclude() {this.state = false;}
    include() {this.state = true;}
    getCommand() {return this.command;}
    setCommand(commandName) {
        if (typeof commandName === 'string') {
            this.command = commandName;
        }
    }
    getUnit() {return this.unit;}
    setUnit(unit) {
        UTIL_CORE.checkObjClassName(unit,'Unit');
        this.unit = unit;
    }
};