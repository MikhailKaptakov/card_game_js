const SCENARIO =  {}
SCENARIO.initialization = function ()  {
    GAME_CORE.LOGGERS.loggerInfo.turnOf();
    SCENARIO.dataInit();
    SCENARIO.objInit();
    SCENARIO.viewInit();
    SCENARIO.listenersInit();
    SCENARIO.startGame();
}

SCENARIO.dataInit = function () {
    SCENARIO.maxOpenChestRounds = 3;
    SCENARIO.openChestRounds = SCENARIO.maxOpenChestRounds;
    SCENARIO.roundsBeforeBattleStart = 1;
    SCENARIO.timeout = 350;
    SCENARIO.activePlayer = null;
    SCENARIO.activeUnit = null;
    SCENARIO.gameStop = false;
    SCENARIO.cardListeners = [];
    SCENARIO.typesArray = ['шлем', 'меч', 'латы', 'штаны', 'ботинки']
    SCENARIO.setStartRarity(90000);
    SCENARIO.minRarityArray = SCENARIO.fillRarityArrayDefault([0, 15000,20000,25000,30000,32500,35000,35000,35000,50000,50000], 50000);
    SCENARIO.decreaseRarityArray = SCENARIO.fillRarityArrayDefault([0, 2500,2250,2000,1500,1000,750,500,375,250,100], 100);
}

SCENARIO.setStartRarity = function (rarity) {
    SCENARIO.maxRarityIndex = GAME_CORE.DEFAULT_PROPS.rarityPack.getMaxIndex();
    SCENARIO.currentIndex = 0;
    GAME_CORE.DEFAULT_PROPS.rarityPack.doThisToEveryElement(function (rarityOption) {
        rarityOption.setDifficult(rarity);
    });
    GAME_CORE.DEFAULT_PROPS.rarityPack.getByIndex(0).setDifficult(0);
}

SCENARIO.fillRarityArrayDefault = function (array, defaultValue) {
    while (array.length < SCENARIO.maxRarityIndex + 1) {
        array.push(defaultValue);
    }
    return array;
}

SCENARIO.objInit = function ()  {
    /*** GAME_FIELDS ***/
    SCENARIO.gameFieldHead = new GAME_CORE.GameField('game-field-head', undefined, 5);
    SCENARIO.gameFieldArms = new GAME_CORE.GameField('game-field-arms', undefined, 5);
    SCENARIO.gameFieldBody = new GAME_CORE.GameField('game-field-body', undefined, 5);
    SCENARIO.gameFieldsLegs = new GAME_CORE.GameField('game-field-legs', undefined, 5);
    SCENARIO.gameFieldsFeets = new GAME_CORE.GameField('game-field-feet', undefined, 5);
    SCENARIO.gameFields = [SCENARIO.gameFieldHead, SCENARIO.gameFieldArms, SCENARIO.gameFieldBody,
        SCENARIO.gameFieldsLegs, SCENARIO.gameFieldsFeets];
    SCENARIO.gameFieldsActivity = [false, false, false, false, false];
    /*** GAME_CHAT ***/
    SCENARIO.gameChat = new GAME_CORE.LogChat('log-field', undefined, 9);
    SCENARIO.infoColor = "yellow";
    /*** PLAYERS ***/
    SCENARIO.player1 = new GAME_CORE.Player('pl1', 'Player1');
    SCENARIO.player2 = new GAME_CORE.Player('pl2', 'Player2');
    SCENARIO.player1.color = "rgb(255,165,0,1)";
    SCENARIO.player2.color = "rgb(0,191,255,1)";
    /*** UNITS ***/
    SCENARIO.unit1 = new GAME_CORE.Unit('u1', 'Unit1', undefined, SCENARIO.player1);
    SCENARIO.unit1.setModification(SCENARIO.getStandardPunish());
    SCENARIO.unit1.setModification(SCENARIO.getStandardScatter());
    SCENARIO.unit2 = new GAME_CORE.Unit('u2', 'Unit2', undefined, SCENARIO.player2);
    SCENARIO.unit2.setModification(SCENARIO.getStandardPunish());
    SCENARIO.unit1.setModification(SCENARIO.getStandardScatter());
    /*** BATTLE ***/
    SCENARIO.fighter1 = new GAME_CORE.BATTLE.Fighter(SCENARIO.unit1,
        undefined, undefined, SCENARIO.player1.color);
    SCENARIO.fighter2 = new GAME_CORE.BATTLE.Fighter(SCENARIO.unit2,
        undefined, undefined, SCENARIO.player2.color);
    SCENARIO.fighterPool = new GAME_CORE.BATTLE.DuelFightersPool(SCENARIO.fighter1, SCENARIO.fighter2);
    SCENARIO.attackProcessor = new GAME_CORE.BATTLE.AttackProcessor();
    SCENARIO.fightActions = new GAME_CORE.BATTLE.DuelFightActions(SCENARIO.fighterPool,
        SCENARIO.attackProcessor);
    SCENARIO.battleView = new GAME_CORE.BATTLE.LogChatViewActions(SCENARIO.gameChat,
        undefined, undefined, undefined, SCENARIO.timeout);
    SCENARIO.battle = new GAME_CORE.BATTLE.Battle(SCENARIO.fightActions, SCENARIO.battleView);
    /*** UTILS ***/
    SCENARIO.presetLetter = new UTIL_CORE.PresetLetter();

}
SCENARIO.getStandardPunish = function () {
    const pun = GAME_CORE.DEFAULT_PROPS.MODIFICATIONS.basePunish();
    pun.setMaxLevel();
    return pun;
}

SCENARIO.getStandardScatter = function () {
    return GAME_CORE.DEFAULT_PROPS.MODIFICATIONS.scatter();
}

SCENARIO.viewInit = function () {
    for (let i = 0; i<5; i++) {
        SCENARIO.gameFields[i].fill();
        SCENARIO.gameFields[i].doIt(function() {this.setCardTypeByIndex(i);});
    }
    SCENARIO.unit1.equipment.appendCards();
    SCENARIO.unit1.equipment.openCards();
    SCENARIO.unit2.equipment.appendCards();
    SCENARIO.unit2.equipment.openCards();
}

SCENARIO.listenersInit  = function () {
    SCENARIO.setStopGameListener();
    SCENARIO.setRenamerListeners();
    SCENARIO.initCardListeners();
}

SCENARIO.setStopGameListener = function ()  {
    document.addEventListener('keyup', function (e) {
        if (e.code === "KeyQ")
            SCENARIO.gameStop = true;
    });
}

SCENARIO.setRenamerListeners = function () {
    const rename = function (playerOrUnit) {
        const newName = prompt("Введите ваше имя", playerOrUnit.getName());
        playerOrUnit.setName(newName);
    }
    SCENARIO.player1.name.getView().addEventListener('click', function() {
        rename(SCENARIO.player1);
    });
    SCENARIO.player2.name.getView().addEventListener('click', function() {
        rename(SCENARIO.player2);
    });
    SCENARIO.unit1.name.getView().addEventListener('click', function() {
        rename(SCENARIO.unit1);
    });
    SCENARIO.unit2.name.getView().addEventListener('click', function() {
        rename(SCENARIO.unit2);
    });
}


SCENARIO.startGame = async function () {
    SCENARIO.setActivePlayerUnit();
    while (!SCENARIO.gameStop) {
        for (let i = 0; i < SCENARIO.maxOpenChestRounds*2*SCENARIO.roundsBeforeBattleStart; i++) {
            await SCENARIO.openChest();
        }
        SCENARIO.rarityPackDecrease();
        SCENARIO.gameChat.clear();
        const result = await SCENARIO.battle.fight();
        await SCENARIO.battleResultAction(result);
        //todo добавить в действия при победе проверку на победу, переменную проверки на победу включить в проверку цикла,
        // за пределами цикла добавить финальные победные действия и полный рестарт игры
    }
};

SCENARIO.openChest = async function () {
    if (SCENARIO.openChestRounds <= 0 ) {
        SCENARIO.setActivePlayerUnit();
        SCENARIO.openChestRounds = SCENARIO.maxOpenChestRounds;
    }
    if (SCENARIO.openChestRounds === SCENARIO.maxOpenChestRounds) {
        await SCENARIO.gameChat.writeLetters([SCENARIO.getActivePlayerNameLetter(),
            SCENARIO.presetLetter.getNoColoredLetter(" получил "),
            SCENARIO.presetLetter.getColoredLetter(SCENARIO.maxOpenChestRounds , SCENARIO.infoColor),
            SCENARIO.presetLetter.getNoColoredLetter(" сундука.")], 0);
    }
    await SCENARIO.gameChat.writeLetters([SCENARIO.getActivePlayerNameLetter(),
        SCENARIO.presetLetter.getNoColoredLetter(" открывает  "),
        SCENARIO.presetLetter.getColoredLetter(SCENARIO.openChestRounds , SCENARIO.infoColor),
        SCENARIO.presetLetter.getNoColoredLetter(" сундук:")], 0);
    await SCENARIO.lootAction();
    while(true) {
        if (!SCENARIO.gameFieldsActivity[0] &&
            !SCENARIO.gameFieldsActivity[1] &&
            !SCENARIO.gameFieldsActivity[2] &&
            !SCENARIO.gameFieldsActivity[3] &&
            !SCENARIO.gameFieldsActivity[4])
        {break;}
        await UTIL_CORE.sleep(500);
    }
    await UTIL_CORE.sleep(SCENARIO.timeout);
    SCENARIO.openChestRounds--;
}

SCENARIO.setActivePlayerUnit = function() {
    if (SCENARIO.activePlayer === null) {
        SCENARIO.activePlayer = SCENARIO.player1;
        SCENARIO.activeUnit = SCENARIO.unit1;
    } else if (SCENARIO.activePlayer === SCENARIO.player1) {
        SCENARIO.activePlayer = SCENARIO.player2;
        SCENARIO.activeUnit = SCENARIO.unit2;
    } else if (SCENARIO.activePlayer === SCENARIO.player2) {
        SCENARIO.activePlayer = SCENARIO.player1;
        SCENARIO.activeUnit = SCENARIO.unit1;
    }
}

SCENARIO.lootAction = function() {
    for (let i = 0; i<5; i++) {
        const eqCard = SCENARIO.activeUnit.getEquipment().getCardByIndex(i);
        let condition = false;

        if (!eqCard.isMaxRarityIndex()) {
            SCENARIO.gameFields[i].setRandomRarity();
            for (let j = 0; j<SCENARIO.gameFields[i].getCardsCount(); j++) {
                condition = condition || SCENARIO.isMoreRare(SCENARIO.gameFields[i].getCardByIndex(j), eqCard);
            }
        } else {
            SCENARIO.gameFields[i].closeCards();
        }
        if (condition) {
            SCENARIO.gameFieldsActivity[i] = true;
            SCENARIO.setGameFieldCardListeners(i);
            SCENARIO.gameFields[i].setActive();
        } else {
            SCENARIO.gameFields[i].setInactive();
            SCENARIO.gameFieldsActivity[i] = false;
        }
    }
}

SCENARIO.isMoreRare = function (card, eqCard) {
    return card.getRarityIndex() > eqCard.getRarityIndex();
}

SCENARIO.setGameFieldCardListeners  =  function (gameFieldIndex)  {
    SCENARIO.gameFields[gameFieldIndex].addListeners('click', SCENARIO.cardListeners[gameFieldIndex]);
}

SCENARIO.initCardListeners  = function () {
    SCENARIO.cardListeners[0] =  function (card) {
        SCENARIO.gameFieldAction(0);
        SCENARIO.cardListener(card, 0);
    }
    SCENARIO.cardListeners[1] = function (card) {
        SCENARIO.gameFieldAction(1);
        SCENARIO.cardListener(card, 1);
    }
    SCENARIO.cardListeners[2] = function (card) {
        SCENARIO.gameFieldAction(2);
        SCENARIO.cardListener(card, 2);
    }
    SCENARIO.cardListeners[3] = function (card) {
        SCENARIO.gameFieldAction(3);
        SCENARIO.cardListener(card, 3);
    }
    SCENARIO.cardListeners[4] = function (card) {
        SCENARIO.gameFieldAction(4);
        SCENARIO.cardListener(card, 4);
    }
}

SCENARIO.cardListener  =  function (card, gameFieldIndex) {
    card.openCard();
    card.setActive();
    const cardRarity = card.getRarityIndex();
    if (cardRarity === 0) {
        SCENARIO.cardIsEmptyMessage();
        return;
    }
    SCENARIO.openCardMessage(card, gameFieldIndex);
    const equipCard = SCENARIO.activeUnit.getEquipment().getCardByIndex(gameFieldIndex);
    const compareResult = cardRarity - equipCard.getRarityIndex();
    if (compareResult > 0) {
        SCENARIO.successUpgradeEquipMessage();
        SCENARIO.sellCard(equipCard);
        equipCard.setRarityByIndex(cardRarity);
        SCENARIO.activeUnit.updateAllParam();
        SCENARIO.activeUnit.beFullHealed();
        return;
    }
    if  (compareResult === 0) {
        SCENARIO.equalEquipMessage();
    } else {
        SCENARIO.lowerEquipMessage();
    }
    SCENARIO.sellCard(card);
}

SCENARIO.gameFieldAction  = function (gameFieldIndex) {
    SCENARIO.gameFields[gameFieldIndex].resetCardView();
    SCENARIO.gameFields[gameFieldIndex].setInactive();
    SCENARIO.gameFields[gameFieldIndex].openCards();
    SCENARIO.gameFieldsActivity[gameFieldIndex] = false;
}

SCENARIO.cardIsEmptyMessage = function () {
    const letters = [];
    letters.push(SCENARIO.presetLetter.getNoColoredLetter("Пусто!"));
    SCENARIO.gameChat.writeLetters(letters, 0);
};
SCENARIO.openCardMessage = function (card, i) {
    const letters = [];
    letters.push(card.getColoredAdjective());
    letters.push(SCENARIO.presetLetter.getNoColoredLetter(" "));
    letters.push(SCENARIO.presetLetter.getColoredLetter(SCENARIO.typesArray[i], card.getRarityColor()));
    SCENARIO.gameChat.writeLetters(letters, 0);
};

SCENARIO.successUpgradeEquipMessage = function() {
    const letters = [];
    letters.push(SCENARIO.getActivePlayerNameLetter());
    letters.push(SCENARIO.presetLetter.getNoColoredLetter(' обновил своё  снаряжение'));
    SCENARIO.gameChat.writeLetters(letters, 0);
};

SCENARIO.equalEquipMessage = function() {
    const letters = [];
    letters.push(SCENARIO.getActivePlayerNameLetter());
    letters.push(SCENARIO.presetLetter.getNoColoredLetter(' получил равное своему снаряжение'));
    SCENARIO.gameChat.writeLetters(letters, 0);
};

SCENARIO.lowerEquipMessage = function() {
    const letters = [];
    letters.push(SCENARIO.getActivePlayerNameLetter());
    letters.push(SCENARIO.presetLetter.getNoColoredLetter(' не повезло, эта вещь явно хуже'));
    SCENARIO.gameChat.writeLetters(letters, 0);
};

SCENARIO.sellCard = function (card){
    const letters = [];
    SCENARIO.activePlayer.sell(card.getPrice());
    letters.push(SCENARIO.getActivePlayerNameLetter());
    letters.push(SCENARIO.presetLetter.getNoColoredLetter("  выручил - " + card.getSellPrice() + ' монет'));
    SCENARIO.gameChat.writeLetters(letters, 0);
};

SCENARIO.getActivePlayerNameLetter = function() {
    return SCENARIO.presetLetter.getColoredLetter(SCENARIO.activePlayer.getName(),
        SCENARIO.activePlayer.color);
}

SCENARIO.rarityPackDecrease = function () {
    GAME_CORE.DEFAULT_PROPS.rarityPack.doThisToEveryElement(SCENARIO.difficultDecreaseFunction);
}
SCENARIO.difficultDecreaseFunction = function (rarityOption) {
    if (rarityOption.getDifficult() > SCENARIO.minRarityArray[SCENARIO.currentIndex]) {
        rarityOption.setDifficult(Math.max(rarityOption.getDifficult() - SCENARIO.difficultDecreaseValue(), 0));
    }
    SCENARIO.increaseCurrentIndex();
};
SCENARIO.difficultDecreaseValue = function () {
    return SCENARIO.decreaseRarityArray[SCENARIO.currentIndex];
};
SCENARIO.increaseCurrentIndex = function () {
    if (SCENARIO.currentIndex < SCENARIO.maxRarityIndex) {
        SCENARIO.currentIndex++;
    } else {
        SCENARIO.currentIndex = 0;
    }
};

SCENARIO.battleResultAction = async function (battleResult) {
    const fighter = battleResult.getWinner();
    const unit =  fighter.getUnit();
    const player = unit.getOwner();
    await SCENARIO.gameChat.writeLetters([
        SCENARIO.presetLetter.getLetter(unit.getName(), fighter.color),
        SCENARIO.presetLetter.getNoColoredLetter(' победил!')
    ], SCENARIO.timeout);
    if (player !== undefined) {
        const score = unit.getWins()*10;
        player.increaseScore(score);
        await SCENARIO.gameChat.writeLetters([
            SCENARIO.presetLetter.getNoColoredLetter('Игрок получает '),
            SCENARIO.presetLetter.getLetter(player.getName(), fighter.color),
            SCENARIO.presetLetter.getNoColoredLetter(' получает '),
            SCENARIO.presetLetter.getLetter(score, SCENARIO.infoColor),
            SCENARIO.presetLetter.getNoColoredLetter('  победных очков!'),
        ], SCENARIO.timeout);
    }
    await UTIL_CORE.sleep(1000);
}
SCENARIO.initialization();

