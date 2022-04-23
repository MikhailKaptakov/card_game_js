GAME_CORE.CardType = class CardType {
	constructor (chance, viewClass, viewText, buyPrice, sellPrice, adjective, bonuses) {
		this.chance = chance; // шанс дропа на указанной ступени
		this.viewClass = viewClass; //имя css class -а
		this.viewText = viewText;  //текст на карте
		this.buyPrice = buyPrice; 
		this.sellPrice = sellPrice; 
		this.adjective = adjective; // объект класса ColoredText содержащие прилагательное 
		//обозначающее рарность и его цвет для отображения в чате
		this.bonuses = bonuses; //список бонусов от предмета класса Bonus
	}
};

GAME_CORE.CardTypes = {};
GAME_CORE.CardTypes.emptyCard = new GAME_CORE.CardType(0, 'emptyCard', ' ', 0, 0, new GAME_CORE.ColoredText('ничего'), new GAME_CORE.bonuses());
GAME_CORE.CardTypes.commonCard = new GAME_CORE.CardType(35000, 'commonCard', 'comm.', 250, 25, new GAME_CORE.ColoredText('обычный','grey'), new GAME_CORE.bonuses(50,5,5,2));
GAME_CORE.CardTypes.uncommonCard = new GAME_CORE.CardType(40000, 'uncommonCard', 'uncom.', 500, 50, new GAME_CORE.ColoredText('необычный','blue'), new GAME_CORE.bonuses(100,10,10,4));
GAME_CORE.CardTypes.rareCard = new GAME_CORE.CardType(45000, 'rareCard', 'rare',1250, 125, new GAME_CORE.ColoredText('редкий','yellow'), new GAME_CORE.bonuses(150,15,15,6));
GAME_CORE.CardTypes.epicCard = new GAME_CORE.CardType(47500, 'epicCard', 'epic', 2500, 250, new GAME_CORE.ColoredText('эпический','blueviolet'), new GAME_CORE.bonuses(200,20,20,8));
GAME_CORE.CardTypes.legendaryCard = new GAME_CORE.CardType(50000, 'legendaryCard', 'legend.', 3750, 375, new GAME_CORE.ColoredText('легендарный','orange'), new GAME_CORE.bonuses(250,25,30,10));
GAME_CORE.CardTypes.mythicalCard = new GAME_CORE.CardType(52500, 'mythicalCard', 'mythic.', 5000, 500, new GAME_CORE.ColoredText('мифический','pink'), new GAME_CORE.bonuses(300,30,40,12));
GAME_CORE.CardTypes.divineCard = new GAME_CORE.CardType(55000, 'divineCard', 'divine', 10000, 1000, new GAME_CORE.ColoredText('божественный','aqua'), new GAME_CORE.bonuses(350,35,50,14));
GAME_CORE.CardTypes.ancientCard = new GAME_CORE.CardType(80000, 'ancientCard', 'ancient', 20000, 2000, new GAME_CORE.ColoredText('древний','rgb(255,191,0,1)'), new GAME_CORE.bonuses(400,40,60,16));
GAME_CORE.CardTypes.hellCard = new GAME_CORE.CardType(80000, 'hellCard', 'hell', 30000, 3000, new GAME_CORE.ColoredText('адский','rgb(255,0,0,1)'), new GAME_CORE.bonuses(500,50,80,20));
GAME_CORE.CardTypes.starCard = new GAME_CORE.CardType(80000, 'starCard', 'StaR', 40000, 4000, new GAME_CORE.ColoredText('звездный','rgb(255,255,0,1)'), new GAME_CORE.bonuses(600,60,120,24));

GAME_CORE.CardTypes.rarityArray = [GAME_CORE.CardTypes.emptyCard, GAME_CORE.CardTypes.commonCard,
GAME_CORE.CardTypes.uncommonCard,GAME_CORE.CardTypes.rareCard, GAME_CORE.CardTypes.epicCard, 
GAME_CORE.CardTypes.legendaryCard, GAME_CORE.CardTypes.mythicalCard , GAME_CORE.CardTypes.divineCard, 
GAME_CORE.CardTypes.ancientCard, GAME_CORE.CardTypes.hellCard, GAME_CORE.CardTypes.starCard]
	
	