GAME_CORE.BATTLE = {}

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

GAME_CORE.BATTLE.AbstractFightersPool = class FightersPool {
    constructor() {
    }
    getIncludedCount();
    getFightingFighters();
    getAllFightersArray();
}

GAME_CORE.BATTLE.AbstractViewActions = class AbstractViewActions {
    constructor() {
    }
    async runViewActions(attackResult);
}

GAME_CORE.BATTLE.AbstractFightActions = class AbstractFightActions {
    constructor(fightersPool, attackProcessor) {
        this.fightersPool = fightersPool;
        this.attackProcessor = attackProcessor;
    }
    fight();
    isEnd();
    getBattleResult();
    resetBattle();
}

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
        const attackerName = this.attackerPresetLetter.getLetter(attackResult.getAttacker().getUnit.getName());
        const defenderName = this.defenderPresetLetter.getLetter(attackResult.getDefender().getUnit.getName());
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

GAME_CORE.BATTLE.DuelFightActions = class DuelFightActions extends GAME_CORE.BATTLE.AbstractFightActions {
    constructor(fighterPool, attackProcessor) {
        super(fighterPool, attackProcessor);
        this.attackResult = undefined;
        this.attackCounter = 0;
    }

    fight() {
        this._incrementAttackCounter();
        this.attackResult = this.attackProcessor.attack(this.fightersPool.getFightingFighters());
        return this.attackResult;
    }

    isEnd() {
        if (this.attackResult !== undefined) {
            return this.attackResult.getType() === GAME_CORE.DEFAULT_PROPS.BATTLE.ATTACK_RESULT.defeated;
        }
    }

    getBattleResult() {
        return this.attackCounter;
    }

    resetBattle() {
        this._resetAttackCounter();
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
    _resetAttackCounter() {
        this.attackCounter = 0;
    }
}

GAME_CORE.BATTLE.DuelFightersPool = class DuelFightersPool extends GAME_CORE.BATTLE.AbstractFightersPool {
    constructor(unit1, unit2) {
        super();
        this._initFighters(unit1, unit2);
        this.fighter1Attacker = true;
    }

    getIncludedCount() {
        return this._isIncludeInt(this.fighter1) + this._isIncludeInt(this.fighter2);
    }
    _isIncludeInt(fighter) { return fighter.isIncluded()?1:0; }
    getFightingFighters() {
        if (!this._fightersIsDefined()) {
            throw Error('one or more fighters is undefined');
        }
        if (this.fighter1Attacker) {
            this._flipAttackerCondition();
            return new FightingFighters(this.fighter1, this.fighter2);
        } else {
            this._flipAttackerCondition();
            return new FightingFighters(this.fighter2, this.fighter1);
        }
    }
    _flipAttackerCondition() {
        this.fighter1Attacker = !this.fighter1Attacker;
    }

    getAllFightersArray() {
        return [this.fighter1, this.fighter2];
    }

    clear() {
        this.fighter1 = undefined;
        this.fighter2 = undefined;
    }

    addFighters(fightersArray) {
        if (fightersArray.length > 0) {
            this._initFighters(fightersArray[0], fightersArray[1]);
        }
    }

    _fightersIsDefined() {
        return this.fighter1 !== undefined && this.fighter2 !== undefined;
    }

    _initFighters(unit1, unit2) {
        this.fighter1 = new GAME_CORE.BATTLE.Fighter(unit1);
        this.fighter2 = new GAME_CORE.BATTLE.Fighter(unit2);
    }
}

GAME_CORE.BATTLE.Fighter = class Fighter {
    constructor(unit, command=GAME_CORE.DEFAULT_PROPS.BATTLE.NO_COMMAND, participant = true) {
        this.unit = unit;
        this.command = command;
        this.state = participant;
    }

    isExcluded() {
        return !this.state;
    }

    isIncluded() {
        return this.state;
    }

    exclude() {
        this.state = false;
    }

    include() {
        this.state = true;
    }

    getCommand() {
        return this.command;
    }

    setCommand(commandName) {
        if (typeof commandName === 'string') {
            this.command = commandName;
        }
    }

    getUnit() {
        return this.unit;
    }

    setUnit(unit) {
        this.unit = unit;
    }
}

GAME_CORE.BATTLE.FightingFighters = class FightingFighters {
    constructor(attackerFighter, defenderFighter) {
        this.attacker = attackerFighter;
        this.defender = defenderFighter;
    }
    getAttacker() {
        return this.attacker;
    }
    getDefender() {
        return this.defender;
    }
}

GAME_CORE.BATTLE.AttackResult = class AttackResult {
    constructor(fighters, type, dealingDamage =0) {
        this.fightingFighters = fighters;
        this.type = type;
        this.damage = dealingDamage;
    }
    getType() {
        return this.type;
    }
    getDamage() {
        return this.damage;
    }

    getAttacker() {
        return this.fightingFighters.getAttacker();
    }

    getDefender() {
        return this.fightingFighters.getDefender;
    }
}
GAME_CORE.BATTLE.AttackProcessor = class AttackProcessor {
    constructor() {
        this.attackerUnit = undefined;
        this.defenderUnit = undefined;
    }

    attack(fightingFighters) {
        this._setUnits(fightingFighters);
        if (!this.isSuccessAttack()) {
            return new GAME_CORE.BATTLE.AttackResult(fightingFighters, GAME_CORE.DEFAULT_PROPS.BATTLE.ATTACK_RESULT.failAttack);
        }
        if (this.isDodge()) {
            return  new GAME_CORE.BATTLE.AttackResult(fightingFighters, GAME_CORE.DEFAULT_PROPS.BATTLE.ATTACK_RESULT.dodge);
        }
        const damage = this.dealDamage();
        if (this.isDie()) {
            this.defeat();
            return new GAME_CORE.BATTLE.AttackResult(fightingFighters, GAME_CORE.DEFAULT_PROPS.BATTLE.ATTACK_RESULT.defeated, damage);
        }
        return  new GAME_CORE.BATTLE.AttackResult(fightingFighters, GAME_CORE.DEFAULT_PROPS.BATTLE.ATTACK_RESULT.damaged, damage);
    }

    _setUnits(fightingFighters) {
        this.attackerUnit = fightingFighters.getAttacker().getUnit();
        this.defenderUnit = fightingFighters.getDefender().getUnit();
    }

    isSuccessAttack() {
        return (this._getAttackerInitiative() - this._getDefenderInitiative() >= 0);
    }

    _getAttackerInitiative() {
        return Math.floor(Math.MAX(this._getBaseInitiative(this.attackerUnit) + this._getAttackerModInitiative(), 0));
    }

    _getAttackerModInitiative() {
        let sum = 0;
        for (const addInitiative of
            this.attackerUnit.getInitiativeModificationMap().execute(this.attackerUnit, this.defenderUnit)) {
            sum += addInitiative;
        }
        return sum;
    }

    _getDefenderInitiative() {
        return Math.floor(this._getBaseInitiative(this.defenderUnit));
    }

    _getBaseInitiative(unit) {
        return UTIL_CORE.randomGen(unit.getLuck() + 100);
    }

    isDodge() {
        const cond = (this._baseDodge() || this._modeDodgeCondition());
        if (cond) {
            this.defenderUnit.sayDodgeReplic();
        }
        return cond;
    }

    _baseDodge() {
        return Math.floor(Math.random()*100) <= this.defenderUnit.getDodge();
    }

    _modeDodgeCondition() {
        let sumResult = false;
        for (const cond of this.defenderUnit.getDodgeModificationMap().execute(this.defenderUnit, this.attackerUnit)) {
            sumResult = sumResult || cond;
            if (sumResult) {return sumResult;}
        }
        return sumResult;
    }

    dealDamage() {
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

    isDie() {
        return this.defenderUnit.getHealth() <= 0;
    }

    defeat() {
        this._doPunish();
        this.defenderUnit.sayDefeatReplic();
        this.attackerUnit.updateAllParam();
        this.defenderUnit.updateAllParam();
        this.defenderUnit.setZeroWins();
        this.attackerUnit.wins.incrementWins();
    }

    _doPunish() {
        this.attackerUnit.getPunishModificationMap().execute(this.attackerUnit, this.defenderUnit);
    }
}
