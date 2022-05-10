const rareBattle = {};
GAME_CORE.LOGGERS.loggerInfo.turnOf();
rareBattle.maxLootRounds = 3;
rareBattle.timeout = 350;
rareBattle.lootRounds = rareBattle.maxLootRounds;
rareBattle.roundsBeforeWar = 1;
rareBattle.activePlayer = null;
rareBattle.activeUnit = null;
rareBattle.isStoped = false;
GAME_CORE.CARDS_PROP.rarityTable = [90000,90000,90000,90000,90000,90000,90000,90000,90000,90000];
GAME_CORE.CARDS_PROP.rarityDecrease = [1000,1000,1000,500,500,500,250,250,125,125];
GAME_CORE.CARDS_PROP.rarityMin = [15000,20000,25000,30000,32500,35000,35000,35000,50000,50000];
GAME_CORE.UNITS_PROP.punish = function(){
		const num = UTIL_CORE.randomGenPLusOne(5) - 1;
		const card = this.equipment.getEquipByNumber(num);
		const rar = (card.rarity - 1)>=0?card.rarity - 1:0;
		card.setRarity(rar);
		card.updateCard();
		this.updateAllParam();
		GAME_CORE.LOGGERS.InfoUnitLogger.logMethod(this.view.id + 'is run', 'punish');
	}


GAME_CORE.Unit.prototype.updateLuck = function(){
	this.luck.updateValue(Math.round((this.baseLuck + this.equipment.returnLuckBonus() + 50)*GAME_CORE.UNITS_PROP.randomRange));
	GAME_CORE.LOGGERS.InfoUnitLogger.logMethod(this.view.id + ' value: ' + this.luck.value, 'updateLuck');
}
GAME_CORE.Unit.prototype.getInitiative = function(){
	const ini = UTIL_CORE.randomGenPLusOne(this.luck.value);
	GAME_CORE.LOGGERS.InfoUnitLogger.logMethod(this.view.id + 'initiative =' + ini, 'getInitiative');
	return  ini;
}
rareBattle.gameFieldHead = new GAME_CORE.GameField('game-field-head', 5);
rareBattle.gameFieldArms = new GAME_CORE.GameField('game-field-arms', 5);
rareBattle.gameFieldBody = new GAME_CORE.GameField('game-field-body', 5);
rareBattle.gameFieldsLegs = new GAME_CORE.GameField('game-field-legs',5);
rareBattle.gameFieldsFeets = new GAME_CORE.GameField('game-field-feets', 5);	
rareBattle.gameFields = [rareBattle.gameFieldHead, rareBattle.gameFieldArms, rareBattle.gameFieldBody, rareBattle.gameFieldsLegs, rareBattle.gameFieldsFeets];
rareBattle.gameFieldsActivity = [false,false,false,false,false];
rareBattle.gameLog = new GAME_CORE.LogChat('log-field', 6);
rareBattle.player1 = new GAME_CORE.Player('pl1','Player1');
rareBattle.player2 = new GAME_CORE.Player('pl2','Player2');
rareBattle.player1.color = "rgb(255,165,0,1)";
rareBattle.player2.color = "rgb(0,191,255,1)";
rareBattle.damageColor = 'FireBrick';
rareBattle.infoColor = "yellow";
rareBattle.HPColor = 'tomato';
rareBattle.unit1 = new GAME_CORE.Unit('u1','Unit1');
rareBattle.unit2 = new GAME_CORE.Unit('u2','Unit2');
rareBattle.unit1.color = rareBattle.player1.color;
rareBattle.unit2.color = rareBattle.player2.color;
rareBattle.listener = [];
rareBattle.equipNames = ['шлем', 'меч', 'латы', 'штаны', 'ботинки'];
rareBattle.price = [0,25,50,125,250,375,500,1000,2000,3000,4000];
rareBattle.rarityNames = ['ничего', 'обычный','необычный','редкий','эпический','легендарный','мифический','божественный', 'древний', 'адский', 'звездный'];
rareBattle.rarityColor = [undefined,'grey','blue','yellow','blueviolet','orange','pink', 'aqua', 'rgb(255,191,0,1)', 'rgb(255,0,0,1)', 'rgb(255,255,0,1)'];

rareBattle.pageInit = function(){
	for (let i = 0; i<5; i++) {
		rareBattle.gameFields[i].fill();
	}
	rareBattle.unit1.owner = rareBattle.player1;
	rareBattle.unit2.owner = rareBattle.player2;
	rareBattle.unit1.equipment.appendCards();
	rareBattle.unit1.equipment.openCards();
	rareBattle.unit2.equipment.appendCards();
	rareBattle.unit2.equipment.openCards();
	rareBattle.listenerInit();
	rareBattle.setActivePlayerUnit();
	rareBattle.player1.name.view.addEventListener('click', renameA = function() {
		const newName = prompt("Введите ваше имя", rareBattle.player1.name.value);
		rareBattle.player1.name.updateValue(newName);
	});
	rareBattle.player2.name.view.addEventListener('click', renameA = function() {
		const newName = prompt("Введите ваше имя", rareBattle.player2.name.value);
		rareBattle.player2.name.updateValue(newName);
	});
	rareBattle.unit1.name.view.addEventListener('click', renameA = function() {
		const newName = prompt("Введите имя вашего бойца", rareBattle.unit1.name.value);
		rareBattle.unit1.name.updateValue(newName);
	});
	rareBattle.unit2.name.view.addEventListener('click', renameA = function() {
		const newName = prompt("Введите имя вашего бойца", rareBattle.unit2.name.value);
		rareBattle.unit2.name.updateValue(newName);
	});
}

rareBattle.setActivePlayerUnit = function() {
	if (rareBattle.activePlayer === null) {
		rareBattle.activePlayer = rareBattle.player1;
		rareBattle.activeUnit = rareBattle.unit1;
	} else if (rareBattle.activePlayer === rareBattle.player1) {
		rareBattle.activePlayer = rareBattle.player2;
		rareBattle.activeUnit = rareBattle.unit2;
	} else if (rareBattle.activePlayer === rareBattle.player2) {
		rareBattle.activePlayer = rareBattle.player1;
		rareBattle.activeUnit = rareBattle.unit1;
	}	
}

rareBattle.startGame = async function(){
	while (!rareBattle.isStoped) {
		for (let j = 0; j < GAME_CORE.CARDS_PROP.rarityTable.length; j++) {
			if (GAME_CORE.CARDS_PROP.rarityTable[j] > GAME_CORE.CARDS_PROP.rarityMin[j] + GAME_CORE.CARDS_PROP.rarityDecrease[j] ) {
				GAME_CORE.CARDS_PROP.rarityTable[j] -= GAME_CORE.CARDS_PROP.rarityDecrease[j];
			}
		}
		for (let i = 0; i < rareBattle.maxLootRounds*2*rareBattle.roundsBeforeWar; i++) {
			await rareBattle.lootChestBundles();
		}
		rareBattle.gameLog.clear();
		await rareBattle.battle();
	}
}

rareBattle.lootChestBundles = async function() {
	if (rareBattle.lootRounds <= 0 ) {
		rareBattle.setActivePlayerUnit();
		rareBattle.lootRounds = rareBattle.maxLootRounds;
	}
	if (rareBattle.lootRounds === rareBattle.maxLootRounds) {
		rareBattle.gameLog.writeColoredMessage([{letter : rareBattle.activePlayer.name.value, color : rareBattle.activePlayer.color}, 
		{letter : " обнаружил "}, {letter : rareBattle.maxLootRounds, color : rareBattle.infoColor}, {letter : " сундука."}]);
	}
	rareBattle.gameLog.writeColoredMessage([{letter : rareBattle.activePlayer.name.value, color : rareBattle.activePlayer.color},
	{letter : " открывает  "}, {letter : rareBattle.lootRounds, color : rareBattle.infoColor}, {letter : " сундук:"}])
	rareBattle.lootAction(); //setTheFields setRarity addListener
	while(true) {
		if (!rareBattle.gameFieldsActivity[0] &&
			!rareBattle.gameFieldsActivity[1] &&
			!rareBattle.gameFieldsActivity[2] &&
			!rareBattle.gameFieldsActivity[3] &&
			!rareBattle.gameFieldsActivity[4]) 
		{break;}
		await UTIL_CORE.sleep(500);
	}
	await UTIL_CORE.sleep(200);
	rareBattle.lootRounds--;
}

rareBattle.lootAction = function() {
	for (let i = 0; i<5; i++) {
		rareBattle.gameFields[i].openCards();
		rareBattle.gameFields[i].closeCards();
		let condition = false;
		if (rareBattle.activeUnit.equipment.getEquipByNumber(i).rarity < GAME_CORE.CARDS_PROP.cardClasses.length - 1) {
			rareBattle.gameFields[i].setRandomRarity();
			for (let j = 0; j<rareBattle.gameFields[i].cardArray.length; j++) {
				condition = condition || (rareBattle.gameFields[i].cardArray[j].rarity > rareBattle.activeUnit.equipment.getEquipByNumber(i).rarity);
			}
		}
		if (condition) {
			rareBattle.gameFieldsActivity[i] = true;
			rareBattle.gameFields[i].addListeners('click', rareBattle.listener[i]);
		} else {
			const f = function() {this.setInactive();}
			rareBattle.gameFields[i].doIt(f);
			//rareBattle.gameLog.writeMessage('Но в секции где должен был быть ' + rareBattle.equipNames[i] + ' лишь всякий мусор.')
		}
	}
}

rareBattle.listenerInit = function() {
	rareBattle.listener[0] = function(obj){
		rareBattle.supportListen(obj, 0);
	};
	rareBattle.listener[1] = function(obj){
		rareBattle.supportListen(obj, 1);
		rareBattle.gameFields[0].removeListeners('click', rareBattle.listener[1]);
	};
	rareBattle.listener[2] = function(obj){
		rareBattle.supportListen(obj, 2);
		rareBattle.gameFields[0].removeListeners('click', rareBattle.listener[2]);
	};	
	rareBattle.listener[3] = function(obj){
		rareBattle.supportListen(obj, 3);
		rareBattle.gameFields[0].removeListeners('click', rareBattle.listener[3]);
	};
	rareBattle.listener[4] = function(obj){
		rareBattle.supportListen(obj, 4);
		rareBattle.gameFields[0].removeListeners('click', rareBattle.listener[4]);
	};	
};

rareBattle.supportListen = function(obj, num) {
	let answer = [];
	if (obj.rarity !== 0) {
		answer.push({letter : rareBattle.rarityNames[obj.rarity], color: rareBattle.rarityColor[obj.rarity]});
		answer.push({letter : " "});
		answer.push({letter : rareBattle.equipNames[num], color: rareBattle.rarityColor[obj.rarity]});
		if (obj.rarity > rareBattle.activeUnit.equipment.getEquipByNumber(num).rarity) {
			rareBattle.activePlayer.money.updateValue(rareBattle.activePlayer.money.value + 
					rareBattle.price[rareBattle.activeUnit.equipment.getEquipByNumber(num).rarity]);
			answer.push({letter : ' - то что нужно! А старую продам.'});
			rareBattle.activeUnit.equipment.getEquipByNumber(num).setRarity(obj.rarity);
			rareBattle.activeUnit.equipment.getEquipByNumber(num).updateCard();
			rareBattle.activeUnit.updateAllParam();
			rareBattle.activeUnit.beAllHealed();
		} else {
			answer.push({letter : ' - продам на барахолке за '}) 
			answer.push({letter : rareBattle.price[obj.rarity], color : rareBattle.infoColor})
			answer.push({letter : ' монет'});
			rareBattle.activePlayer.money.updateValue(rareBattle.activePlayer.money.value + rareBattle.price[obj.rarity]);
		}
	} else {
		answer.push({letter : 'Эх!,' + rareBattle.rarityNames[0]});
	}
	rareBattle.gameLog.writeColoredMessage(answer);
	obj.openCard();
	const f = function() {
		if (!this.state) {
			this.setInactive();
		}
		this.resetView();
	};
	rareBattle.gameFields[num].doIt(f);
	rareBattle.gameFieldsActivity[num] = false;
}

rareBattle.battle = async function() {
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
}

rareBattle.whoDealDamage = function(){
	const check = rareBattle.unit1.getInitiative() - rareBattle.unit1.getInitiative();
	const ans = {};
	if (check > 0) {
		ans.atacker = rareBattle.unit1;
		ans.defender = rareBattle.unit2;
	} else if (check < 0) {
		ans.atacker = rareBattle.unit2;
		ans.defender = rareBattle.unit1;
	} else {
		ans.atacker = null;
		ans.defender = null;
	}
	return ans;
}

rareBattle.pageInit();
rareBattle.startGame();


