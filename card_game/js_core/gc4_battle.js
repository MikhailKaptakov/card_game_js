GAME_CORE.BATTLE = {}

GAME_CORE.Battle = class Battle {
    constructor(logChat) {
        this.logChat = logChat;
    }

    duel(unit1, unit2) {
        //todo сделать метод дуэли
    }

    _whoAttack(unit1, unit2) {
        const initiative = unit1.getInitiative() - unit2.getInitiative();
        if ( initiative > 0) {
            return unit1;
        } else if ( initiative < 0) {
            return unit2
        }
        return undefined;
    }
}


/*rareBattle.battle = async function() {
    let rez = false
    do{
        const ans = rareBattle.whoDealDamage();
        const atacker = ans.atacker;
        const defender = ans.defender;
        if (atacker === null && defender === null) {
            await rareBattle.gameLog.writeColoredMessage([{letter : rareBattle.unit1.name.value, color : rareBattle.player1.color},
                {letter : " и "}, {letter : rareBattle.unit2.name.value, color : rareBattle.player2.color},
                {letter : " трижды скинулись в камень ножницы бумага, но каждый раз была ничья!"}], rareBattle.timeout);
        } else {
            const defColoredName = {letter : defender.name.value, color : defender.color };
            const atColoredName = {letter : atacker.name.value, color : atacker.color};
            const res = atacker.atack(defender);
            if (res.type === -1) {
                await rareBattle.gameLog.writeColoredMessage([defColoredName, {letter : " ловко уходит от атаки противника "},
                    atColoredName, {letter : " крайне недоволен"}], rareBattle.timeout);
            } else if (res.type === 0) {
                await rareBattle.gameLog.writeColoredMessage([atColoredName, {letter : " атакует противника и наносит "},
                    {letter : res.dmg, color : rareBattle.damageColor}, {letter : " урона. У "}, defColoredName,
                    {letter : " остаётся "}, {letter : defender.currentHealth.value, color : rareBattle.HPColor},
                    {letter : " здоровья "}], rareBattle.timeout);
            } else if (res.type === 1) {
                await rareBattle.gameLog.writeColoredMessage([atColoredName, {letter : " атакует противника уроном "},
                    {letter : res.dmg, color : rareBattle.damageColor}, {letter : " и повергает его!"}], rareBattle.timeout);
                atacker.owner.score.updateValue(atacker.owner.score.value + 1);
                await rareBattle.gameLog.writeColoredMessage([{letter : " В битве побеждает "}, atColoredName, {letter : "!"}], 2000)
                rareBattle.unit1.beFullHealed();
                atacker.wins.updateValue(atacker.wins.value + 1);
                defender.wins.updateValue(0);
                rareBattle.unit2.beFullHealed();
                rez = true;
            }
        }
    } while(!rez)
}*/




/*


attack(targetUnit) {
    if (targetUnit.dodgeAttack(this)) {
        this._log(targetUnit.getId() +  ' dodge is success')
        return {type : -1, dmg : 0};
    }
    const damage = this.dealDamage(targetUnit);
    this.sayAttackReplic();
    if (targetUnit.getHealth() <= 0) {
        this.defeat(targetUnit);
        this._log(' enemy ' + targetUnit.getId() + ' _defeat');
        return {type : 1, dmg : damage};
    } else {
        this._log(' enemy ' + targetUnit.getId() + ' get damage');
        return {type : 0, dmg : damage};
    }
}*/
