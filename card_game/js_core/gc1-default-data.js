GAME_CORE.DEFAULT_PROPS = {};

GAME_CORE.DEFAULT_PROPS.rarityOptions = [
    // args: index, difficult, viewClassName, cardText, coloredAdjective (letter, color), price (buy,sell), bonus (health,damage,luck,dodge)
    new GAME_CORE.RarityOption(0, 0, 'emptyCard', ' ',
        new GAME_CORE.ColoredText('ничего'),
        new GAME_CORE.Price(0,0), new GAME_CORE.StatSet()),
    new GAME_CORE.RarityOption(1, 35000, 'commonCard', 'comm.',
        new GAME_CORE.ColoredText('обычный', 'grey'),
        new GAME_CORE.Price(100,25), new GAME_CORE.StatSet(50,5,5,2)),
    new GAME_CORE.RarityOption(2, 40000, 'uncommonCard', 'uncom.',
        new GAME_CORE.ColoredText('необычный', 'blue'),
        new GAME_CORE.Price(200,50), new GAME_CORE.StatSet(100,10,10,4)),
    new GAME_CORE.RarityOption(3, 45000, 'rareCard', 'rare.',
        new GAME_CORE.ColoredText('редкий', 'yellow'),
        new GAME_CORE.Price(500,125), new GAME_CORE.StatSet(150,15,15,6)),
    new GAME_CORE.RarityOption(4, 47500, 'epicCard', 'epic',
        new GAME_CORE.ColoredText('эпический', 'blueviolet'),
        new GAME_CORE.Price(1000,250), new GAME_CORE.StatSet(200,20,20,8)),
    new GAME_CORE.RarityOption(5, 50000, 'legendaryCard', 'legend.',
        new GAME_CORE.ColoredText('легендарный', 'orange'),
        new GAME_CORE.Price(1500,375), new GAME_CORE.StatSet(250,25,30,10)),
    new GAME_CORE.RarityOption(6, 52500, 'mythicalCard', 'mythic.',
        new GAME_CORE.ColoredText('мифический', 'pink'),
        new GAME_CORE.Price(2000,500), new GAME_CORE.StatSet(300,30,40,12)),
    new GAME_CORE.RarityOption(7, 55000, 'divineCard', 'divine',
        new GAME_CORE.ColoredText('божественный', 'aqua'),
        new GAME_CORE.Price(4000,1000), new GAME_CORE.StatSet(350,35,50,14)),
    new GAME_CORE.RarityOption(8, 80000, 'ancientCard', 'ancient',
        new GAME_CORE.ColoredText('древний', 'rgb(100,191,100,1)'),
        new GAME_CORE.Price(8000,2000), new GAME_CORE.StatSet(400,40,60,16)),
    new GAME_CORE.RarityOption(9, 80000, 'hellCard', 'hell',
        new GAME_CORE.ColoredText('адский', 'rgb(255,0,0,1)'),
        new GAME_CORE.Price(12000,3000), new GAME_CORE.StatSet(500,50,80,20)),
    new GAME_CORE.RarityOption(10, 80000, 'starCard', 'StaR',
        new GAME_CORE.ColoredText('звездный', 'rgb(255,255,0,1)'),
        new GAME_CORE.Price(16000,4000), new GAME_CORE.StatSet(600,60,120,24))
];

GAME_CORE.DEFAULT_PROPS.cardTypes = [
    new GAME_CORE.CardType('head','headType'),
    new GAME_CORE.CardType('arms','armsType'),
    new GAME_CORE.CardType('body','bodyType'),
    new GAME_CORE.CardType('legs','legsType'),
    new GAME_CORE.CardType('feet','feetType')
];
GAME_CORE.DEFAULT_PROPS.rarityCollection = new GAME_CORE.RarityCollection(GAME_CORE.DEFAULT_PROPS.rarityOptions);
GAME_CORE.DEFAULT_PROPS.cardState = new GAME_CORE.CardState('opened-card','closed-card');
GAME_CORE.DEFAULT_PROPS.cardActivity = new GAME_CORE.CardActivity('','card-inactive');

GAME_CORE.DEFAULT_PROPS.unitStats = new GAME_CORE.StatSet(300,25,0,5);
GAME_CORE.DEFAULT_PROPS.headMultiple = new GAME_CORE.StatSet(0, 0, 1, 0);
GAME_CORE.DEFAULT_PROPS.armsMultiple = new GAME_CORE.StatSet(0, 1, 0, 0);
GAME_CORE.DEFAULT_PROPS.bodyMultiple = new GAME_CORE.StatSet(1, 0, 0, 0);
GAME_CORE.DEFAULT_PROPS.legsMultiple = new GAME_CORE.StatSet(0.5, 0, 0, 0.5);
GAME_CORE.DEFAULT_PROPS.feetsMultiple = new GAME_CORE.StatSet(0, 0.5, 0, 0.5);
GAME_CORE.DEFAULT_PROPS.equipmentMultiple = new GAME_CORE.EquipmentMultiple(
    GAME_CORE.DEFAULT_PROPS.headMultiple,
    GAME_CORE.DEFAULT_PROPS.armsMultiple,
    GAME_CORE.DEFAULT_PROPS.bodyMultiple,
    GAME_CORE.DEFAULT_PROPS.legsMultiple,
    GAME_CORE.DEFAULT_PROPS.feetsMultiple);

GAME_CORE.DEFAULT_PROPS.dodgeReplics = ['Попробуй поймай', 'Ха - ха, А я уже тут', 'Мимо!'];
GAME_CORE.DEFAULT_PROPS.atackReplics = ['Получи', 'Так тебе', 'Больно?!'];
GAME_CORE.DEFAULT_PROPS.dieReplics = ['Я ещё вернусь', 'Ну как так??!', 'Неверю!!!', 'Это только начало!', 'Это что! КРОВЬ?!' ,'Как??? Как такое могло произойти???!'];

/*
функции как набор параметров юнита
GAME_CORE.UNITS_PROP.randomGen = function(){return UTIL_CORE.randomGen(GAME_CORE.UNITS_PROP.randomRange)}; зашить в юнита и переработать так как расчет идет от инициативы
GAME_CORE.UNITS_PROP.damageDeal = function(damage) {return damage+Math.floor(damage*((GAME_CORE.UNITS_PROP.randomRange/2) - GAME_CORE.UNITS_PROP.randomGen())/(5*GAME_CORE.UNITS_PROP.randomRange));};
GAME_CORE.UNITS_PROP.punish = function(){
    const num = UTIL_CORE.randomGen(5) - 1;
    const card = this.equipment.getEquipByNumber(num);
    card.setRarity(0);
    card.updateCard();
    this.updateAllParam();
    GAME_CORE.LOGGERS.InfoUnitLogger.logMethod(this.view.id + 'is run', 'punish');
}
*/

GAME_CORE.LOGGERS = {};
GAME_CORE.LOGGERS.loggerInfo = new UTIL_CORE.Logger('info');
GAME_CORE.LOGGERS.loggerWarn = new UTIL_CORE.Logger('warn');
GAME_CORE.LOGGERS.loggerDebug = new UTIL_CORE.Logger('debug');
GAME_CORE.LOGGERS.loggerError = new UTIL_CORE.Logger('error');
GAME_CORE.LOGGERS.InfoCardLogger = new UTIL_CORE.Logger('card');
GAME_CORE.LOGGERS.InfoEquipmentLogger = new UTIL_CORE.Logger('equip');
GAME_CORE.LOGGERS.InfoUnitLogger = new UTIL_CORE.Logger('unit');
GAME_CORE.LOGGERS.InfoTextEntityLogger = new UTIL_CORE.Logger('text entity');
GAME_CORE.LOGGERS.InfoPlayerLogger = new UTIL_CORE.Logger('player');
GAME_CORE.LOGGERS.InfoGameFieldLogger = new UTIL_CORE.Logger('game field');
GAME_CORE.LOGGERS.InfoLogChatLogger = new UTIL_CORE.Logger('Chat');
GAME_CORE.LOGGERS.loggerGameMain = new UTIL_CORE.Logger('main');
GAME_CORE.LOGGERS.InfoAppenderLogger = new UTIL_CORE.Logger('append');

GAME_CORE.LOGGERS.loggerInfo.addChildLogger(GAME_CORE.LOGGERS.InfoCardLogger);
GAME_CORE.LOGGERS.loggerInfo.addChildLogger(GAME_CORE.LOGGERS.InfoEquipmentLogger);
GAME_CORE.LOGGERS.loggerInfo.addChildLogger(GAME_CORE.LOGGERS.InfoUnitLogger);
GAME_CORE.LOGGERS.loggerInfo.addChildLogger(GAME_CORE.LOGGERS.InfoTextEntityLogger);
GAME_CORE.LOGGERS.loggerInfo.addChildLogger(GAME_CORE.LOGGERS.InfoPlayerLogger);
GAME_CORE.LOGGERS.loggerInfo.addChildLogger(GAME_CORE.LOGGERS.InfoGameFieldLogger);
GAME_CORE.LOGGERS.loggerInfo.addChildLogger(GAME_CORE.LOGGERS.InfoLogChatLogger);
GAME_CORE.LOGGERS.loggerInfo.addChildLogger(GAME_CORE.LOGGERS.InfoAppenderLogger);

