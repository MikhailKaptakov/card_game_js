const GAME_SCENARIO =  {}
GAME_SCENARIO.initialization = function ()  {
    GAME_CORE.LOGGERS.loggerInfo.turnOf();
    GAME_SCENARIO.dataInit();
    GAME_SCENARIO.objInit();
    GAME_SCENARIO.viewInit();
    GAME_SCENARIO.listenersInit();
    GAME_SCENARIO.startGame();
}

GAME_SCENARIO.dataInit = function () {
    GAME_SCENARIO.maxOpenChestRounds = 3;
    GAME_SCENARIO.openChestRounds = GAME_SCENARIO.maxOpenChestRounds;
    GAME_SCENARIO.roundsBeforeBattleStart = 1;
    GAME_SCENARIO.timeout = 350;
    GAME_SCENARIO.activePlayer = null;
    GAME_SCENARIO.activeUnit = null;
    GAME_SCENARIO.gameStop = false;
    GAME_SCENARIO.cardListeners = [];
    GAME_SCENARIO.typesArray = ['шлем', 'меч', 'латы', 'штаны', 'ботинки']
    GAME_SCENARIO.setStartRarity(90000);
    GAME_SCENARIO.minRarityArray = GAME_SCENARIO.fillRarityArrayDefault([0, 15000,20000,25000,30000,32500,35000,35000,35000,50000,50000], 50000);
    GAME_SCENARIO.decreaseRarityArray = GAME_SCENARIO.fillRarityArrayDefault([0, 2500,2250,2000,1500,1000,750,500,375,250,100], 100);
}

GAME_SCENARIO.setStartRarity = function (rarity) {
    GAME_SCENARIO.maxRarityIndex = GAME_CORE.DEFAULT_PROPS.rarityPack.getMaxIndex();
    GAME_SCENARIO.currentIndex = 0;
    GAME_CORE.DEFAULT_PROPS.rarityPack.doThisToEveryElement(function (rarityOption) {
        rarityOption.setDifficult(rarity);
    });
    GAME_CORE.DEFAULT_PROPS.rarityPack.getByIndex(0).setDifficult(0);
}

GAME_SCENARIO.fillRarityArrayDefault = function (array, defaultValue) {
    while (array.length < GAME_SCENARIO.maxRarityIndex + 1) {
        array.push(defaultValue);
    }
    return array;
}

GAME_SCENARIO.objInit = function ()  {
    /*** GAME_FIELDS ***/
    GAME_SCENARIO.gameFieldHead = new GAME_CORE.GameField('game-field-head', undefined, 5);
    GAME_SCENARIO.gameFieldArms = new GAME_CORE.GameField('game-field-arms', undefined, 5);
    GAME_SCENARIO.gameFieldBody = new GAME_CORE.GameField('game-field-body', undefined, 5);
    GAME_SCENARIO.gameFieldsLegs = new GAME_CORE.GameField('game-field-legs', undefined, 5);
    GAME_SCENARIO.gameFieldsFeets = new GAME_CORE.GameField('game-field-feet', undefined, 5);
    GAME_SCENARIO.gameFields = [GAME_SCENARIO.gameFieldHead, GAME_SCENARIO.gameFieldArms, GAME_SCENARIO.gameFieldBody,
        GAME_SCENARIO.gameFieldsLegs, GAME_SCENARIO.gameFieldsFeets];
    GAME_SCENARIO.gameFieldsActivity = [false, false, false, false, false];
    /*** GAME_CHAT ***/
    GAME_SCENARIO.gameChat = new GAME_CORE.LogChat('log-field', undefined, 6);
    /*** PLAYERS ***/
    GAME_SCENARIO.player1 = new GAME_CORE.Player('pl1', 'Player1');
    GAME_SCENARIO.player2 = new GAME_CORE.Player('pl2', 'Player2');
    GAME_SCENARIO.player1.color = "rgb(255,165,0,1)";
    GAME_SCENARIO.player2.color = "rgb(0,191,255,1)";
    /*** UNITS ***/
    GAME_SCENARIO.unit1 = new GAME_CORE.Unit('u1', 'Unit1', undefined, GAME_SCENARIO.player1);
    GAME_SCENARIO.unit1.setModification(GAME_SCENARIO.getStandardPunish());
    GAME_SCENARIO.unit2 = new GAME_CORE.Unit('u2', 'Unit2', undefined, GAME_SCENARIO.player2);
    GAME_SCENARIO.unit2.setModification(GAME_SCENARIO.getStandardPunish());
    /*** BATTLE ***/
    GAME_SCENARIO.fighter1 = new GAME_CORE.BATTLE.Fighter(GAME_SCENARIO.unit1,
        undefined, undefined, GAME_SCENARIO.player1.color);
    GAME_SCENARIO.fighter2 = new GAME_CORE.BATTLE.Fighter(GAME_SCENARIO.unit2,
        undefined, undefined, GAME_SCENARIO.player2.color);
    GAME_SCENARIO.fighterPool = new GAME_CORE.BATTLE.DuelFightersPool(GAME_SCENARIO.fighter1, GAME_SCENARIO.fighter2);
    GAME_SCENARIO.attackProcessor = new GAME_CORE.BATTLE.AttackProcessor();
    GAME_SCENARIO.fightActions = new GAME_CORE.BATTLE.DuelFightActions(GAME_SCENARIO.fighterPool,
        GAME_SCENARIO.attackProcessor);
    GAME_SCENARIO.battleView = new GAME_CORE.BATTLE.LogChatViewActions(GAME_SCENARIO.gameChat,
        undefined, undefined, undefined, GAME_SCENARIO.timeout);
    GAME_SCENARIO.battle = new GAME_CORE.BATTLE.Battle(GAME_SCENARIO.fightActions, GAME_SCENARIO.battleView);
    /*** UTILS ***/
    GAME_SCENARIO.presetLetter = new UTIL_CORE.PresetLetter();

}
GAME_SCENARIO.getStandardPunish = function () {
    const pun = GAME_CORE.DEFAULT_PROPS.MODIFICATIONS.basePunish();
    pun.setMaxLevel();
    return pun;
}

GAME_SCENARIO.viewInit = function () {
    for (let i = 0; i<5; i++) {
        GAME_SCENARIO.gameFields[i].fill();
    }
    GAME_SCENARIO.unit1.equipment.appendCards();
    GAME_SCENARIO.unit1.equipment.openCards();
    GAME_SCENARIO.unit2.equipment.appendCards();
    GAME_SCENARIO.unit2.equipment.openCards();
}

GAME_SCENARIO.listenersInit  = function () {
    GAME_SCENARIO.setStopGameListener();
    GAME_SCENARIO.setRenamerListeners();
    GAME_SCENARIO.initCardListeners();
}

GAME_SCENARIO.setStopGameListener = function ()  {
    document.addEventListener('keyup', function (e) {
        if (e.code === "KeyQ")
            GAME_SCENARIO.gameStop = true;
    });
}

GAME_SCENARIO.setRenamerListeners = function () {
    const rename = function (playerOrUnit) {
        const newName = prompt("Введите ваше имя", playerOrUnit.getName());
        playerOrUnit.setName(newName);
    }
    GAME_SCENARIO.player1.name.getView().addEventListener('click', function() {
        rename(GAME_SCENARIO.player1);
    });
    GAME_SCENARIO.player2.name.getView().addEventListener('click', function() {
        rename(GAME_SCENARIO.player2);
    });
    GAME_SCENARIO.unit1.name.getView().addEventListener('click', function() {
        rename(GAME_SCENARIO.unit1);
    });
    GAME_SCENARIO.unit2.name.getView().addEventListener('click', function() {
        rename(GAME_SCENARIO.unit2);
    });
}


GAME_SCENARIO.startGame = async function () {
    GAME_SCENARIO.setActivePlayerUnit();
    while (!GAME_SCENARIO.gameStop) {
        for (let i = 0; i < GAME_SCENARIO.maxOpenChestRounds*2*GAME_SCENARIO.roundsBeforeBattleStart; i++) {
            await GAME_SCENARIO.openChest();
        }
        GAME_SCENARIO.rarityPackDecrease();
        GAME_SCENARIO.gameChat.clear();
        await GAME_SCENARIO.battle.fight();
    }
};

GAME_SCENARIO.openChest = async function () {
    if (GAME_SCENARIO.openChestRounds <= 0 ) {
        GAME_SCENARIO.setActivePlayerUnit();
        GAME_SCENARIO.openChestRounds = GAME_SCENARIO.maxOpenChestRounds;
    }
    if (GAME_SCENARIO.openChestRounds === GAME_SCENARIO.maxOpenChestRounds) {
        await GAME_SCENARIO.gameChat.writeLetters([GAME_SCENARIO.getActivePlayerNameLetter(),
            GAME_SCENARIO.presetLetter.getNoColoredLetter(" получил "),
            GAME_SCENARIO.presetLetter.getColoredLetter(GAME_SCENARIO.maxOpenChestRounds , GAME_SCENARIO.infoColor),
            GAME_SCENARIO.presetLetter.getNoColoredLetter(" сундука.")], 0);
    }
    await GAME_SCENARIO.gameChat.writeLetters([GAME_SCENARIO.getActivePlayerNameLetter(),
        GAME_SCENARIO.presetLetter.getNoColoredLetter(" открывает  "),
        GAME_SCENARIO.presetLetter.getColoredLetter(GAME_SCENARIO.openChestRounds , GAME_SCENARIO.infoColor),
        GAME_SCENARIO.presetLetter.getNoColoredLetter(" сундук:")], 0);
    await GAME_SCENARIO.lootAction();
    while(!GAME_SCENARIO.gameStop) {
        if (!GAME_SCENARIO.gameFieldsActivity[0] &&
            !GAME_SCENARIO.gameFieldsActivity[1] &&
            !GAME_SCENARIO.gameFieldsActivity[2] &&
            !GAME_SCENARIO.gameFieldsActivity[3] &&
            !GAME_SCENARIO.gameFieldsActivity[4])
        {break;}
        await UTIL_CORE.sleep(500);
    }
    await UTIL_CORE.sleep(GAME_SCENARIO.timeout);
    GAME_SCENARIO.openChestRounds--;
}

GAME_SCENARIO.setActivePlayerUnit = function() {
    if (GAME_SCENARIO.activePlayer === null) {
        GAME_SCENARIO.activePlayer = GAME_SCENARIO.player1;
        GAME_SCENARIO.activeUnit = GAME_SCENARIO.unit1;
    } else if (GAME_SCENARIO.activePlayer === GAME_SCENARIO.player1) {
        GAME_SCENARIO.activePlayer = GAME_SCENARIO.player2;
        GAME_SCENARIO.activeUnit = GAME_SCENARIO.unit2;
    } else if (GAME_SCENARIO.activePlayer === GAME_SCENARIO.player2) {
        GAME_SCENARIO.activePlayer = GAME_SCENARIO.player1;
        GAME_SCENARIO.activeUnit = GAME_SCENARIO.unit1;
    }
}

GAME_SCENARIO.lootAction = function() {
    for (let i = 0; i<5; i++) {
        const eqCard = GAME_SCENARIO.activeUnit.getEquipment().getCardByIndex(i);
        let condition = false;
        if (!eqCard.isMaxRarityIndex()) {
            GAME_SCENARIO.gameFields[i].setRandomRarity();
            for (let j = 0; j<GAME_SCENARIO.gameFields[i].getCardsCount(); j++) {
                condition = condition || GAME_SCENARIO.isMoreRare(GAME_SCENARIO.gameFields[i].getCardByIndex(j), eqCard);
            }
        }
        if (condition) {
            GAME_SCENARIO.gameFieldsActivity[i] = true;
            GAME_SCENARIO.setGameFieldCardListeners(i);
            GAME_SCENARIO.gameFields[i].setActive();
        } else {
            GAME_SCENARIO.gameFields[i].setInactive();
            GAME_SCENARIO.gameFieldsActivity[i] = false;
        }
    }
}

GAME_SCENARIO.isMoreRare = function (card, eqCard) {
    return card.getRarityIndex() > eqCard.getRarityIndex();
}

GAME_SCENARIO.setGameFieldCardListeners  =  function (gameFieldIndex)  {
    GAME_SCENARIO.gameFields[gameFieldIndex].addListeners('click', GAME_SCENARIO.cardListeners[gameFieldIndex]);
}

GAME_SCENARIO.initCardListeners  = function () {
    GAME_SCENARIO.cardListeners[0] =  function (card) {
        GAME_SCENARIO.gameFieldAction(0);
        GAME_SCENARIO.cardListener(card, 0);
    }
    GAME_SCENARIO.cardListeners[1] = function (card) {
        GAME_SCENARIO.gameFieldAction(1);
        GAME_SCENARIO.cardListener(card, 1);
    }
    GAME_SCENARIO.cardListeners[2] = function (card) {
        GAME_SCENARIO.gameFieldAction(2);
        GAME_SCENARIO.cardListener(card, 2);
    }
    GAME_SCENARIO.cardListeners[3] = function (card) {
        GAME_SCENARIO.gameFieldAction(3);
        GAME_SCENARIO.cardListener(card, 3);
    }
    GAME_SCENARIO.cardListeners[4] = function (card) {
        GAME_SCENARIO.gameFieldAction(4);
        GAME_SCENARIO.cardListener(card, 4);
    }
}

GAME_SCENARIO.cardListener  =  function (card, gameFieldIndex) {
    card.openCard();
    card.setActive();
    const cardRarity = card.getRarityIndex();
    if (cardRarity === 0) {
        GAME_SCENARIO.cardIsEmptyMessage();
        return;
    }
    GAME_SCENARIO.openCardMessage(card, gameFieldIndex);
    const equipCard = GAME_SCENARIO.activeUnit.getEquipment().getCardByIndex(gameFieldIndex);
    const compareResult = cardRarity - equipCard.getRarityIndex();
    if (compareResult > 0) {
        GAME_SCENARIO.activeUnit.beFullHealed();
        GAME_SCENARIO.successUpgradeEquipMessage();
        GAME_SCENARIO.sellCard(equipCard);
        equipCard.setRarityByIndex(cardRarity);
        return;
    }
    if  (compareResult === 0) {
        GAME_SCENARIO.equalEquipMessage();
    } else {
        GAME_SCENARIO.lowerEquipMessage();
    }
    GAME_SCENARIO.sellCard(card);
}

GAME_SCENARIO.gameFieldAction  = function (gameFieldIndex) {
    GAME_SCENARIO.gameFields[gameFieldIndex].resetCardView();
    GAME_SCENARIO.gameFields[gameFieldIndex].setInactive();
    GAME_SCENARIO.gameFieldsActivity[gameFieldIndex] = false;
}

GAME_SCENARIO.cardIsEmptyMessage = function () {
    const letters = [];
    letters.push(GAME_SCENARIO.presetLetter.getNoColoredLetter("Пусто!"));
    GAME_SCENARIO.gameChat.writeLetters(letters, 0);
};
GAME_SCENARIO.openCardMessage = function (card, i) {
    const letters = [];
    letters.push(card.getColoredAdjective());
    letters.push(GAME_SCENARIO.presetLetter.getNoColoredLetter(" "));
    letters.push(GAME_SCENARIO.presetLetter.getColoredLetter(GAME_SCENARIO.typesArray[i], card.getRarityColor()));
    GAME_SCENARIO.gameChat.writeLetters(letters, 0);
};

GAME_SCENARIO.successUpgradeEquipMessage = function() {
    const letters = [];
    letters.push(GAME_SCENARIO.getActivePlayerNameLetter());
    letters.push(GAME_SCENARIO.presetLetter.getNoColoredLetter(' обновил своё  снаряжение'));
    GAME_SCENARIO.gameChat.writeLetters(letters, 0);
};

GAME_SCENARIO.equalEquipMessage = function() {
    const letters = [];
    letters.push(GAME_SCENARIO.getActivePlayerNameLetter());
    letters.push(GAME_SCENARIO.presetLetter.getNoColoredLetter(' получил равное своему снаряжение'));
    GAME_SCENARIO.gameChat.writeLetters(letters, 0);
};

GAME_SCENARIO.lowerEquipMessage = function() {
    const letters = [];
    letters.push(GAME_SCENARIO.getActivePlayerNameLetter());
    letters.push(GAME_SCENARIO.presetLetter.getNoColoredLetter(' не повезло, эта вещь явно хуже'));
    GAME_SCENARIO.gameChat.writeLetters(letters, 0);
};

GAME_SCENARIO.sellCard = function (card){
    const letters = [];
    GAME_SCENARIO.activePlayer.sell(card.getPrice());
    letters.push(GAME_SCENARIO.getActivePlayerNameLetter());
    letters.push(GAME_SCENARIO.presetLetter.getNoColoredLetter("  выручил - " + card.getSellPrice() + ' монет'));
    GAME_SCENARIO.gameChat.writeLetters(letters, 0);
};

GAME_SCENARIO.getActivePlayerNameLetter = function() {
    return GAME_SCENARIO.presetLetter.getColoredLetter(GAME_SCENARIO.activePlayer.getName(),
        GAME_SCENARIO.activePlayer.color);
}

GAME_SCENARIO.rarityPackDecrease = function () {
    GAME_CORE.DEFAULT_PROPS.rarityPack.doThisToEveryElement(GAME_SCENARIO.difficultDecreaseFunction);
}
GAME_SCENARIO.difficultDecreaseFunction = function (rarityOption) {
    if (rarityOption.getDifficult() > GAME_SCENARIO.minRarityArray[GAME_SCENARIO.currentIndex]) {
        rarityOption.setDifficult(Math.max(rarityOption.getDifficult() - GAME_SCENARIO.difficultDecreaseValue(), 0));
    }
    GAME_SCENARIO.increaseCurrentIndex();
};
GAME_SCENARIO.difficultDecreaseValue = function () {
    return GAME_SCENARIO.decreaseRarityArray[GAME_SCENARIO.currentIndex];
};
GAME_SCENARIO.increaseCurrentIndex = function () {
    if (GAME_SCENARIO.currentIndex < GAME_SCENARIO.maxRarityIndex) {
        GAME_SCENARIO.currentIndex++;
    } else {
        GAME_SCENARIO.currentIndex = 0;
    }
};

GAME_SCENARIO.initialization();

