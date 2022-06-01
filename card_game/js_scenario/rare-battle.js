const RARE_BATTLE = {};
RARE_BATTLE.fullInit = function () {
	GAME_CORE.LOGGERS.loggerInfo.turnOf();
	RARE_BATTLE._initRarity();
	RARE_BATTLE._dataInit();
	RARE_BATTLE._viewObjectInit();
}
RARE_BATTLE._initRarity = function () {
	RARE_BATTLE.maxRarityIndex = GAME_CORE.DEFAULT_PROPS.rarityPack.getMaxIndex();
	RARE_BATTLE.currentIndex = 0;
	GAME_CORE.DEFAULT_PROPS.rarityPack.doThisToEveryElement(RARE_BATTLE._rarityPackInit);
	RARE_BATTLE.rarityMin = RARE_BATTLE._setRarityMinArray();

};
RARE_BATTLE._rarityPackInit = function (rarityOption) {
	rarityOption.setDifficult(90000);
};
RARE_BATTLE._setRarityMinArray = function () {
	const minArray = [0, 15000,20000,25000,30000,32500,35000,35000,35000,50000,50000];
	for (let i = 0; i<1;) {
		if (minArray.length < RARE_BATTLE.maxRarityIndex + 1) {
			minArray.push(50000);
		} else {
			i++;
		}
	}
	return minArray;
};

RARE_BATTLE._dataInit = function () {
	RARE_BATTLE.maxLootRounds = 3;
	RARE_BATTLE.timeout = 350;
	RARE_BATTLE.lootRounds = RARE_BATTLE.maxLootRounds;
	RARE_BATTLE.roundsBeforeWar = 1;
	RARE_BATTLE.activePlayer = null;
	RARE_BATTLE.activeUnit = null;
	RARE_BATTLE.isStoped = false;
	RARE_BATTLE.gameFieldHead = new GAME_CORE.GameField('game-field-head', undefined, 5);
	RARE_BATTLE.gameFieldArms = new GAME_CORE.GameField('game-field-arms', undefined, 5);
	RARE_BATTLE.gameFieldBody = new GAME_CORE.GameField('game-field-body', undefined, 5);
	RARE_BATTLE.gameFieldsLegs = new GAME_CORE.GameField('game-field-legs', undefined, 5);
	RARE_BATTLE.gameFieldsFeets = new GAME_CORE.GameField('game-field-feet', undefined, 5);
	RARE_BATTLE.gameFields = [RARE_BATTLE.gameFieldHead, RARE_BATTLE.gameFieldArms, RARE_BATTLE.gameFieldBody,
		RARE_BATTLE.gameFieldsLegs, RARE_BATTLE.gameFieldsFeets];
	RARE_BATTLE.gameFieldsActivity = [false, false, false, false, false];
	RARE_BATTLE.gameChat = new GAME_CORE.LogChat('log-field', undefined, 6);
	RARE_BATTLE.player1 = new GAME_CORE.Player('pl1', 'Player1');
	RARE_BATTLE.player2 = new GAME_CORE.Player('pl2', 'Player2');
	RARE_BATTLE.player1.color = "rgb(255,165,0,1)";
	RARE_BATTLE.player2.color = "rgb(0,191,255,1)";
	RARE_BATTLE.damageColor = 'FireBrick';
	RARE_BATTLE.infoColor = "yellow";
	RARE_BATTLE.HPColor = 'tomato';
	RARE_BATTLE.unit1 = new GAME_CORE.Unit('u1', 'Unit1');
	RARE_BATTLE.unit2 = new GAME_CORE.Unit('u2', 'Unit2');
	RARE_BATTLE.unit1.color = RARE_BATTLE.player1.color;
	RARE_BATTLE.unit2.color = RARE_BATTLE.player2.color;
	RARE_BATTLE.listeners = [];
	GAME_CORE.DEFAULT_PROPS.EquipTypes.head = 'шлем';
	GAME_CORE.DEFAULT_PROPS.EquipTypes.arms = 'меч';
	GAME_CORE.DEFAULT_PROPS.EquipTypes.body = 'латы';
	GAME_CORE.DEFAULT_PROPS.EquipTypes.legs = 'штаны';
	GAME_CORE.DEFAULT_PROPS.EquipTypes.feet = 'ботинки';
}
RARE_BATTLE._viewObjectInit = function(){
	for (let i = 0; i<5; i++) {
		RARE_BATTLE.gameFields[i].fill();
	}
	RARE_BATTLE.unit1.owner = RARE_BATTLE.player1;
	RARE_BATTLE.unit2.owner = RARE_BATTLE.player2;
	RARE_BATTLE.unit1.equipment.appendCards();
	RARE_BATTLE.unit1.equipment.openCards();
	RARE_BATTLE.unit2.equipment.appendCards();
	RARE_BATTLE.unit2.equipment.openCards();
	RARE_BATTLE._listenerInit();
	RARE_BATTLE._setActivePlayerUnit();

};
RARE_BATTLE._listenerInit = function() {
	RARE_BATTLE._renameListenerInit();
	//todo переписать в соответствии с новыми правилами
	//todo предварительно протестировать слушатели
	RARE_BATTLE._initGameFieldCardsListeners();
	RARE_BATTLE.listeners[0] = function(obj){
		RARE_BATTLE._supportListen(obj, 0);
	};
	RARE_BATTLE.listeners[1] = function(obj){
		RARE_BATTLE._supportListen(obj, 1);
		RARE_BATTLE.gameFields[0].removeListeners('click', RARE_BATTLE.listeners[1]);
	};
	RARE_BATTLE.listeners[2] = function(obj){
		RARE_BATTLE._supportListen(obj, 2);
		RARE_BATTLE.gameFields[0].removeListeners('click', RARE_BATTLE.listeners[2]);
	};
	RARE_BATTLE.listeners[3] = function(obj){
		RARE_BATTLE._supportListen(obj, 3);
		RARE_BATTLE.gameFields[0].removeListeners('click', RARE_BATTLE.listeners[3]);
	};
	RARE_BATTLE.listeners[4] = function(obj){
		RARE_BATTLE._supportListen(obj, 4);
		RARE_BATTLE.gameFields[0].removeListeners('click', RARE_BATTLE.listeners[4]);
	};
};

RARE_BATTLE._supportListen = function(obj, num) {
	let answer = [];
	if (obj.rarity !== 0) {
		answer.push({letter : RARE_BATTLE.rarityNames[obj.rarity], color: RARE_BATTLE.rarityColor[obj.rarity]});
		answer.push({letter : " "});
		answer.push({letter : RARE_BATTLE.equipNames[num], color: RARE_BATTLE.rarityColor[obj.rarity]});
		if (obj.rarity > RARE_BATTLE.activeUnit.equipment.getEquipByNumber(num).rarity) {
			RARE_BATTLE.activePlayer.money.updateValue(RARE_BATTLE.activePlayer.money.value +
				RARE_BATTLE.price[RARE_BATTLE.activeUnit.equipment.getEquipByNumber(num).rarity]);
			answer.push({letter : ' - то что нужно! А старую продам.'});
			RARE_BATTLE.activeUnit.equipment.getEquipByNumber(num).setRarity(obj.rarity);
			RARE_BATTLE.activeUnit.equipment.getEquipByNumber(num).updateCard();
			RARE_BATTLE.activeUnit.updateAllParam();
			RARE_BATTLE.activeUnit.beAllHealed();
		} else {
			answer.push({letter : ' - продам на барахолке за '})
			answer.push({letter : RARE_BATTLE.price[obj.rarity], color : RARE_BATTLE.infoColor})
			answer.push({letter : ' монет'});
			RARE_BATTLE.activePlayer.money.updateValue(RARE_BATTLE.activePlayer.money.value + RARE_BATTLE.price[obj.rarity]);
		}
	} else {
		answer.push({letter : 'Эх!,' + RARE_BATTLE.rarityNames[0]});
	}
	RARE_BATTLE.gameChat.writeColoredMessage(answer);
	obj.openCard();
	const f = function() {
		if (!this.state) {
			this.setInactive();
		}
		this.resetView();
	};
	RARE_BATTLE.gameFields[num].doIt(f);
	RARE_BATTLE.gameFieldsActivity[num] = false;
};

RARE_BATTLE._initGameFieldCardsListeners = function () {
	for (let i = 0; i < 5; i++) {
		RARE_BATTLE.listeners[i] = function (card) {
			RARE_BATTLE._gameFieldCardListenerActions(card, i);
			RARE_BATTLE._setGameFieldActions(i);
		};
	}
};
RARE_BATTLE._setGameFieldActions = function (gameFieldIndex) {
	RARE_BATTLE.gameFields[gameFieldIndex].removeListeners('click', RARE_BATTLE.listeners[gameFieldIndex]);
	RARE_BATTLE.gameFields[gameFieldIndex].setInactive();
};

RARE_BATTLE._gameFieldCardListenerActions = function (card, i) {
		card.openCard();
	//todo продолжить здесь	if ()
};

RARE_BATTLE._setActivePlayerUnit = function() {
	if (RARE_BATTLE.activePlayer === null) {
		RARE_BATTLE.activePlayer = RARE_BATTLE.player1;
		RARE_BATTLE.activeUnit = RARE_BATTLE.unit1;
	} else if (RARE_BATTLE.activePlayer === RARE_BATTLE.player1) {
		RARE_BATTLE.activePlayer = RARE_BATTLE.player2;
		RARE_BATTLE.activeUnit = RARE_BATTLE.unit2;
	} else if (RARE_BATTLE.activePlayer === RARE_BATTLE.player2) {
		RARE_BATTLE.activePlayer = RARE_BATTLE.player1;
		RARE_BATTLE.activeUnit = RARE_BATTLE.unit1;
	}
};

RARE_BATTLE._renameListenerInit = function () {
	RARE_BATTLE._rename = function (playerOrUnit) {
		const newName = prompt("Введите ваше имя", playerOrUnit.getName());
		playerOrUnit.setName(newName);
	}
	RARE_BATTLE.player1.name.view.addEventListener('click', function() {
		RARE_BATTLE._rename(RARE_BATTLE.player1);
	});
	RARE_BATTLE.player2.name.view.addEventListener('click', function() {
		RARE_BATTLE._rename(RARE_BATTLE.player2);
	});
	RARE_BATTLE.unit1.name.view.addEventListener('click', function() {
		RARE_BATTLE._rename(RARE_BATTLE.unit1);
	});
	RARE_BATTLE.unit2.name.view.addEventListener('click', function() {
		RARE_BATTLE._rename(RARE_BATTLE.unit2);
	});
}

RARE_BATTLE.rarityPackDecrease = function () {
	GAME_CORE.DEFAULT_PROPS.rarityPack.doThisToEveryElement(RARE_BATTLE._difficultDecreaseFunction);
}
RARE_BATTLE._difficultDecreaseFunction = function (rarityOption) {
	if (rarityOption.getDifficult() > RARE_BATTLE.rarityMin[RARE_BATTLE.currentIndex]) {
		rarityOption.setDifficult(Math.max(90000 - RARE_BATTLE._difficultDecreaseValue(), 0));
	}
	RARE_BATTLE._increaseCurrentIndex();
};
RARE_BATTLE._difficultDecreaseValue = function () {
	return 100*(RARE_BATTLE.maxRarityIndex + 1 - RARE_BATTLE.currentIndex);
};
RARE_BATTLE._increaseCurrentIndex = function () {
	if (RARE_BATTLE.currentIndex < RARE_BATTLE.maxRarityIndex) {
		RARE_BATTLE.currentIndex++;
	} else {
		RARE_BATTLE.currentIndex = 0;
	}
};



//todo ниже полная переработка
RARE_BATTLE.startGame = async function(){
	while (!RARE_BATTLE.isStoped) {
		for (let j = 0; j < GAME_CORE.CARDS_PROP.rarityTable.length; j++) {
			if (GAME_CORE.CARDS_PROP.rarityTable[j] > GAME_CORE.CARDS_PROP.rarityMin[j] + GAME_CORE.CARDS_PROP.rarityDecrease[j] ) {
				GAME_CORE.CARDS_PROP.rarityTable[j] -= GAME_CORE.CARDS_PROP.rarityDecrease[j];
			}
		}
		for (let i = 0; i < RARE_BATTLE.maxLootRounds*2*RARE_BATTLE.roundsBeforeWar; i++) {
			await RARE_BATTLE.lootChestBundles();
		}
		RARE_BATTLE.gameChat.clear();
		await RARE_BATTLE.battle();
	}
}

RARE_BATTLE.lootChestBundles = async function() {
	if (RARE_BATTLE.lootRounds <= 0 ) {
		RARE_BATTLE.setActivePlayerUnit();
		RARE_BATTLE.lootRounds = RARE_BATTLE.maxLootRounds;
	}
	if (RARE_BATTLE.lootRounds === RARE_BATTLE.maxLootRounds) {
		RARE_BATTLE.gameChat.writeColoredMessage([{letter : RARE_BATTLE.activePlayer.name.value, color : RARE_BATTLE.activePlayer.color},
		{letter : " обнаружил "}, {letter : RARE_BATTLE.maxLootRounds, color : RARE_BATTLE.infoColor}, {letter : " сундука."}]);
	}
	RARE_BATTLE.gameChat.writeColoredMessage([{letter : RARE_BATTLE.activePlayer.name.value, color : RARE_BATTLE.activePlayer.color},
	{letter : " открывает  "}, {letter : RARE_BATTLE.lootRounds, color : RARE_BATTLE.infoColor}, {letter : " сундук:"}])
	RARE_BATTLE.lootAction(); //setTheFields setRarity addListener
	while(true) {
		if (!RARE_BATTLE.gameFieldsActivity[0] &&
			!RARE_BATTLE.gameFieldsActivity[1] &&
			!RARE_BATTLE.gameFieldsActivity[2] &&
			!RARE_BATTLE.gameFieldsActivity[3] &&
			!RARE_BATTLE.gameFieldsActivity[4])
		{break;}
		await UTIL_CORE.sleep(500);
	}
	await UTIL_CORE.sleep(200);
	RARE_BATTLE.lootRounds--;
}

RARE_BATTLE.lootAction = function() {
	for (let i = 0; i<5; i++) {
		RARE_BATTLE.gameFields[i].openCards();
		RARE_BATTLE.gameFields[i].closeCards();
		let condition = false;
		if (RARE_BATTLE.activeUnit.equipment.getEquipByNumber(i).rarity < GAME_CORE.CARDS_PROP.cardClasses.length - 1) {
			RARE_BATTLE.gameFields[i].setRandomRarity();
			for (let j = 0; j<RARE_BATTLE.gameFields[i].cardArray.length; j++) {
				condition = condition || (RARE_BATTLE.gameFields[i].cardArray[j].rarity > RARE_BATTLE.activeUnit.equipment.getEquipByNumber(i).rarity);
			}
		}
		if (condition) {
			RARE_BATTLE.gameFieldsActivity[i] = true;
			RARE_BATTLE.gameFields[i].addListeners('click', RARE_BATTLE.listeners[i]);
		} else {
			const f = function() {this.setInactive();}
			RARE_BATTLE.gameFields[i].doIt(f);
			//RARE_BATTLE.gameChat.writeMessage('Но в секции где должен был быть ' + RARE_BATTLE.equipNames[i] + ' лишь всякий мусор.')
		}
	}
}





RARE_BATTLE.fullInit();
await RARE_BATTLE.startGame();


