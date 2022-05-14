GAME_CORE.DEFAULT_PROPS = {};

GAME_CORE.DEFAULT_PROPS.rarityOptions = [
    // args: index, difficult, viewClassName, cardText, coloredAdjective (letter, color), price (buy,sell), statMap (health,damage,luck,dodge)
    new GAME_CORE.RarityOption('empty', 0, 'emptyCard', ' ',
        new UTIL_CORE.Letter('ничего'),
        new GAME_CORE.Price(0,0), new GAME_CORE.BaseStatMap()),
    new GAME_CORE.RarityOption('common', 35000, 'commonCard', 'comm.',
        new UTIL_CORE.Letter('обычный', 'grey'),
        new GAME_CORE.Price(100,25), new GAME_CORE.BaseStatMap(50,5,5,2)),
    new GAME_CORE.RarityOption('uncommon', 40000, 'uncommonCard', 'uncom.',
        new UTIL_CORE.Letter('необычный', 'blue'),
        new GAME_CORE.Price(200,50), new GAME_CORE.BaseStatMap(100,10,10,4)),
    new GAME_CORE.RarityOption('rare', 45000, 'rareCard', 'rare.',
        new UTIL_CORE.Letter('редкий', 'yellow'),
        new GAME_CORE.Price(500,125), new GAME_CORE.BaseStatMap(150,15,15,6)),
    new GAME_CORE.RarityOption('epic', 47500, 'epicCard', 'epic',
        new UTIL_CORE.Letter('эпический', 'blueviolet'),
        new GAME_CORE.Price(1000,250), new GAME_CORE.BaseStatMap(200,20,20,8)),
    new GAME_CORE.RarityOption('legendary', 50000, 'legendaryCard', 'legend.',
        new UTIL_CORE.Letter('легендарный', 'orange'),
        new GAME_CORE.Price(1500,375), new GAME_CORE.BaseStatMap(250,25,30,10)),
    new GAME_CORE.RarityOption('mythical', 52500, 'mythicalCard', 'mythic.',
        new UTIL_CORE.Letter('мифический', 'pink'),
        new GAME_CORE.Price(2000,500), new GAME_CORE.BaseStatMap(300,30,40,12)),
    new GAME_CORE.RarityOption('divine', 55000, 'divineCard', 'divine',
        new UTIL_CORE.Letter('божественный', 'aqua'),
        new GAME_CORE.Price(4000,1000), new GAME_CORE.BaseStatMap(350,35,50,14)),
    new GAME_CORE.RarityOption('ancient', 80000, 'ancientCard', 'ancient',
        new UTIL_CORE.Letter('древний', 'rgb(100,191,100,1)'),
        new GAME_CORE.Price(8000,2000), new GAME_CORE.BaseStatMap(400,40,60,16)),
    new GAME_CORE.RarityOption('hell', 80000, 'hellCard', 'hell',
        new UTIL_CORE.Letter('адский', 'rgb(255,0,0,1)'),
        new GAME_CORE.Price(12000,3000), new GAME_CORE.BaseStatMap(500,50,80,20)),
    new GAME_CORE.RarityOption('star', 80000, 'starCard', 'StaR',
        new UTIL_CORE.Letter('звездный', 'rgb(255,255,0,1)'),
        new GAME_CORE.Price(16000,4000), new GAME_CORE.BaseStatMap(600,60,120,24))
];

GAME_CORE.DEFAULT_PROPS.cardTypes = [
    new GAME_CORE.CardType('head','headType'),-
    new GAME_CORE.CardType('arms','armsType'),
    new GAME_CORE.CardType('body','bodyType'),
    new GAME_CORE.CardType('legs','legsType'),
    new GAME_CORE.CardType('feet','feetType')
];

GAME_CORE.DEFAULT_PROPS.cardTypePack = new GAME_CORE.CardTypePack(GAME_CORE.DEFAULT_PROPS.cardTypes);
GAME_CORE.DEFAULT_PROPS.rarityPack = new GAME_CORE.RarityPack(GAME_CORE.DEFAULT_PROPS.rarityOptions);
GAME_CORE.DEFAULT_PROPS.cardState = new GAME_CORE.OpenCloseState('opened-card','closed-card');
GAME_CORE.DEFAULT_PROPS.cardActivity = new GAME_CORE.ActivityState('','card-inactive');
GAME_CORE.DEFAULT_PROPS.cardOptions = new GAME_CORE.CardOptions();

GAME_CORE.DEFAULT_PROPS.baseCharacteristic = function() {return new GAME_CORE.BaseStatMap(300,25,0,5);};

GAME_CORE.DEFAULT_PROPS.equipmentCells = function (id, viewParent, owner) {
    const cells = new Map();
    const createCell = (typeName, health, damage, luck, dodge) => {
        const card = new GAME_CORE.Card(id + typeName, viewParent);
        card.setCardTypeByName(typeName);
        const multiple = new GAME_CORE.ModStatMap(health, damage, luck, dodge);
        const additional = new GAME_CORE.ModStatMap(0,0,0,0);
        cells.set(typeName, new GAME_CORE.EquipmentCell(owner, typeName, card, multiple, additional));
    }
    createCell('head', 0, 0, 1, 0);
    createCell('arms', 0, 1, 0, 0);
    createCell('body', 1, 0, 0, 0);
    createCell('legs', 0.5, 0, 0, 0.5);
    createCell('feet', 0, 0.5, 0, 0.5);
    return cells;
}

GAME_CORE.DEFAULT_PROPS.getEquipment = function (id, viewParent) {return new GAME_CORE.Equipment(id, viewParent);};

GAME_CORE.DEFAULT_PROPS.dodgeReplics = ['Попробуй поймай', 'Ха - ха, А я уже тут', 'Мимо!'];
GAME_CORE.DEFAULT_PROPS.attackReplics = ['Получи', 'Так тебе', 'Больно?!'];
GAME_CORE.DEFAULT_PROPS.defeatReplics = ['Я ещё вернусь', 'Ну как так??!', 'Неверю!!!', 'Это только начало!', 'Это что! КРОВЬ?!' ,'Как??? Как такое могло произойти???!'];
GAME_CORE.DEFAULT_PROPS.replicsSet = function() {return new GAME_CORE.ReplicsSet([...GAME_CORE.DEFAULT_PROPS.dodgeReplics],
    [...GAME_CORE.DEFAULT_PROPS.attackReplics], [...GAME_CORE.DEFAULT_PROPS.defeatReplics])};

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



