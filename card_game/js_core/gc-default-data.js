GAME_CORE.DEFAULT_PROPS = {};
GAME_CORE.DEFAULT_PROPS.STATS = {};
GAME_CORE.DEFAULT_PROPS.STATS.health = 'health';
GAME_CORE.DEFAULT_PROPS.STATS.damage = 'damage';
GAME_CORE.DEFAULT_PROPS.STATS.luck = 'luck';
GAME_CORE.DEFAULT_PROPS.STATS.dodge = 'dodge';
GAME_CORE.DEFAULT_PROPS.EquipTypes = {};
GAME_CORE.DEFAULT_PROPS.EquipTypes.head = 'head';
GAME_CORE.DEFAULT_PROPS.EquipTypes.arms = 'arms';
GAME_CORE.DEFAULT_PROPS.EquipTypes.body = 'body';
GAME_CORE.DEFAULT_PROPS.EquipTypes.legs = 'legs';
GAME_CORE.DEFAULT_PROPS.EquipTypes.feet = 'feet';

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
    new GAME_CORE.CardType(GAME_CORE.DEFAULT_PROPS.EquipTypes.head,'headType'),
    new GAME_CORE.CardType(GAME_CORE.DEFAULT_PROPS.EquipTypes.arms,'armsType'),
    new GAME_CORE.CardType(GAME_CORE.DEFAULT_PROPS.EquipTypes.body,'bodyType'),
    new GAME_CORE.CardType(GAME_CORE.DEFAULT_PROPS.EquipTypes.legs,'legsType'),
    new GAME_CORE.CardType(GAME_CORE.DEFAULT_PROPS.EquipTypes.feet,'feetType')
];

GAME_CORE.DEFAULT_PROPS.cardTypePack = new GAME_CORE.CardTypePack(GAME_CORE.DEFAULT_PROPS.cardTypes);
GAME_CORE.DEFAULT_PROPS.rarityPack = new GAME_CORE.RarityPack(GAME_CORE.DEFAULT_PROPS.rarityOptions);
GAME_CORE.DEFAULT_PROPS.cardState = new GAME_CORE.OpenCloseState('opened-card','closed-card');
GAME_CORE.DEFAULT_PROPS.cardActivity = new GAME_CORE.ActivityState('','card-inactive');
GAME_CORE.DEFAULT_PROPS.cardOptions = new GAME_CORE.CardOptions();

GAME_CORE.DEFAULT_PROPS.BaseCharacteristic = [300,25,0,5];
GAME_CORE.DEFAULT_PROPS.getBaseCharacteristic = function() {
    return new GAME_CORE.BaseStatMap(
    GAME_CORE.DEFAULT_PROPS.BaseCharacteristic[0],
    GAME_CORE.DEFAULT_PROPS.BaseCharacteristic[1],
    GAME_CORE.DEFAULT_PROPS.BaseCharacteristic[2],
    GAME_CORE.DEFAULT_PROPS.BaseCharacteristic[3]);
};

GAME_CORE.DEFAULT_PROPS.getEquipmentCells = function (id, viewParent, owner) {
    const cells = new Map();
    const createCell = (typeName, health, damage, luck, dodge) => {
        const card = new GAME_CORE.Card(id + typeName, viewParent);
        card.setCardTypeByName(typeName);
        const multiple = new GAME_CORE.ModStatMap(health, damage, luck, dodge);
        const additional = new GAME_CORE.ModStatMap(0,0,0,0);
        cells.set(typeName, new GAME_CORE.EquipmentCell(owner, typeName, card, multiple, additional));
    }
    createCell(GAME_CORE.DEFAULT_PROPS.EquipTypes.head, 0, 0, 1, 0);
    createCell(GAME_CORE.DEFAULT_PROPS.EquipTypes.arms, 0, 1, 0, 0);
    createCell(GAME_CORE.DEFAULT_PROPS.EquipTypes.body, 1, 0, 0, 0);
    createCell(GAME_CORE.DEFAULT_PROPS.EquipTypes.legs, 0.5, 0, 0, 0.5);
    createCell(GAME_CORE.DEFAULT_PROPS.EquipTypes.feet, 0, 0.5, 0, 0.5);
    return cells;
}

GAME_CORE.DEFAULT_PROPS.getEquipment = function (id, viewParent) {return new GAME_CORE.Equipment(id, viewParent);};

GAME_CORE.DEFAULT_PROPS.dodgeReplics = ['Попробуй поймай', 'Ха - ха, А я уже тут', 'Мимо!'];
GAME_CORE.DEFAULT_PROPS.attackReplics = ['Получи', 'Так тебе', 'Больно?!'];
GAME_CORE.DEFAULT_PROPS.defeatReplics = ['Я ещё вернусь', 'Ну как так??!', 'Неверю!!!', 'Это только начало!', 'Это что! КРОВЬ?!' ,'Как??? Как такое могло произойти???!'];
GAME_CORE.DEFAULT_PROPS.getDodgeReplics = function (){return [...GAME_CORE.DEFAULT_PROPS.dodgeReplics]};
GAME_CORE.DEFAULT_PROPS.getAttackReplics = function (){return [...GAME_CORE.DEFAULT_PROPS.attackReplics]};
GAME_CORE.DEFAULT_PROPS.getDefeatReplics = function (){return [...GAME_CORE.DEFAULT_PROPS.defeatReplics]};

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




GAME_CORE.DEFAULT_PROPS.MODIFICATIONS = {};
GAME_CORE.DEFAULT_PROPS.MODIFICATIONS.TYPES = {};
GAME_CORE.DEFAULT_PROPS.MODIFICATIONS.TYPES.attack = 'ATTACK';
GAME_CORE.DEFAULT_PROPS.MODIFICATIONS.TYPES.dodge = 'DODGE';
GAME_CORE.DEFAULT_PROPS.MODIFICATIONS.TYPES.initiative = 'INITIATIVE';
GAME_CORE.DEFAULT_PROPS.MODIFICATIONS.TYPES.punish = 'PUNISH';
GAME_CORE.DEFAULT_PROPS.MODIFICATIONS.scatter = function() {
    return new GAME_CORE.Modification('scatter',
        GAME_CORE.DEFAULT_PROPS.MODIFICATIONS.TYPES.attack, 'Положительный разброс',
        'задаёт разброс значения урона в 20%, смещает разброс в большую сторону с каждым уровнем на 2%',
        function (thisUnit, targetUnit) {
            return thisUnit.getDamage() * ((0.5 + this.getLevel() * 0.1 - Math.random()) / 5);
        }, 5);
};
GAME_CORE.DEFAULT_PROPS.MODIFICATIONS.scatter2 = function() {
    return new GAME_CORE.Modification('scatter',
        GAME_CORE.DEFAULT_PROPS.MODIFICATIONS.TYPES.attack, 'Как повезёт!',
        'начальный разброс 20%, с повышением уровня разброс вырастает до 50%',
        function (thisUnit, targetUnit) {
            return thisUnit.getDamage() * (0.5 - Math.random()) / (5 - this.getLevel());
        }, 3);
};
GAME_CORE.DEFAULT_PROPS.MODIFICATIONS.scatter3 = function() {
    return new GAME_CORE.Modification('scatter',
        GAME_CORE.DEFAULT_PROPS.MODIFICATIONS.TYPES.attack, 'Базовый разброс урона',
        'разброс урона в 20%',
        function (thisUnit, targetUnit) {
            return thisUnit.getDamage() * (0.5 - Math.random()) / 5;
        }, 1);
};
GAME_CORE.DEFAULT_PROPS.MODIFICATIONS.criticalDamage = function() {
    return new GAME_CORE.Modification('criticalDamage',
        GAME_CORE.DEFAULT_PROPS.MODIFICATIONS.TYPES.attack, 'Сильный удар',
        'с шансом в 5% добавляет 10*уровень процентов урона',
        function (thisUnit, targetUnit) {
            return thisUnit.getDamage() * (Math.random() <= 0.05 ? 0.1 * this.getLevel() : 0);
        }, 5);
};
GAME_CORE.DEFAULT_PROPS.MODIFICATIONS.criticalDamage2 = function() {
    return new GAME_CORE.Modification('criticalDamage',
        GAME_CORE.DEFAULT_PROPS.MODIFICATIONS.TYPES.attack, 'Уязвимое место',
        'добавляет 25 процентов урона c шансом в 2*уровень%',
        function (thisUnit, targetUnit) {
            return thisUnit.getDamage() * (Math.random() <= 0.02 * this.getLevel() ? 0.25 : 0);
        }, 5);
};
GAME_CORE.DEFAULT_PROPS.MODIFICATIONS.criticalDamage3 = function() {
    return new GAME_CORE.Modification('criticalDamage',
        GAME_CORE.DEFAULT_PROPS.MODIFICATIONS.TYPES.attack, 'Возмездие',
        'каждый 50, 45, 40, 35, 30, 25 (в зависимости от уровня удар) наносит двойной урон ' +
        ' (счётчик ударов не сбрасывается после битвы)',
        function (thisUnit, targetUnit) {
            this.counter++;
            if (this.counter >= 50 - 5 * (this.getLevel() - 1)) {
                this.counter = 0;
                return thisUnit.getDamage();
            }
            return 0;
        }, 6);
};
GAME_CORE.DEFAULT_PROPS.MODIFICATIONS.criticalDamage4 = function() {
    return new GAME_CORE.Modification('criticalDamage',
        GAME_CORE.DEFAULT_PROPS.MODIFICATIONS.TYPES.attack, 'Накопление силы',
        'каждый 10  наносит дополнительно 10% урона за уровень' +
        ' (счётчик ударов не сбрасывается после битвы)',
        function(thisUnit, targetUnit) {
            this.counter++;
            if (this.counter >= 10) {
                this.counter = 0;
                return thisUnit.getDamage() * 0.1 * this.getLevel();
            }
            return 0;
        }, 5);
};
GAME_CORE.DEFAULT_PROPS.MODIFICATIONS.criticalDamage5 = function() {
    return new GAME_CORE.Modification('criticalDamage',
        GAME_CORE.DEFAULT_PROPS.MODIFICATIONS.TYPES.attack, 'Удачный удар',
        'даёт бонусный урон 100 с шансом в 5% за уровень',
        function(thisUnit, targetUnit) {
            return Math.random() <= this.level * 0.05 ? 100 : 0;
        }, 5);
};
GAME_CORE.DEFAULT_PROPS.MODIFICATIONS.increase = function() {
    return new GAME_CORE.Modification('increase',
        GAME_CORE.DEFAULT_PROPS.MODIFICATIONS.TYPES.attack, 'Сильная рука',
        'увеличивает урон на 5% за уровень',
        function(thisUnit, targetUnit) {
            return thisUnit.getDamage() * 0.05 * this.level;
        }, 5);
};
GAME_CORE.DEFAULT_PROPS.MODIFICATIONS.increase2 = function() {
    return new GAME_CORE.Modification('increase',
        GAME_CORE.DEFAULT_PROPS.MODIFICATIONS.TYPES.attack, 'Могучий',
        'даёт бонусный урон 2, 8, 18, 32, 50 в зависимости от уровня',
        function(thisUnit, targetUnit) {
            return 2 * this.getLevel() * this.getLevel();
        }, 5);
};
GAME_CORE.DEFAULT_PROPS.MODIFICATIONS.increase3 = function() {
    return new GAME_CORE.Modification('increase',
        GAME_CORE.DEFAULT_PROPS.MODIFICATIONS.TYPES.attack, 'Стероиды',
        'боевые стероиды повышают урон, но при этом сильно дают по печени. ' +
        'Дают бонусный урон в 50%, но  при этом снижают запас здоровья на 25% от максимального,' +
        ' с каждым уровнем снижение здоровья уменьшается на 5% (нельзя умереть от этой способности).',
        function(thisUnit, targetUnit) {
            thisUnit.decreaseHealth(thisUnit.getMaxHealth()*(0.25 - 0.05*this.getLevel()));
            return 0.5*thisUnit.getDamage();
        }, 3);
};
GAME_CORE.DEFAULT_PROPS.MODIFICATIONS.regeneration = function() {
    return new GAME_CORE.Modification('regeneration',
        GAME_CORE.DEFAULT_PROPS.MODIFICATIONS.TYPES.attack, 'Вампиризм',
        'вампиризм от базового значения урона - 5% за уровень',
        function(thisUnit, targetUnit) {
            thisUnit.beHealed(Math.floor(this.level * thisUnit.getDamage() * 0.05));
            return 0;
        }, 3);
};
GAME_CORE.DEFAULT_PROPS.MODIFICATIONS.regeneration2 = function() {
    return new GAME_CORE.Modification('regeneration',
        GAME_CORE.DEFAULT_PROPS.MODIFICATIONS.TYPES.attack, 'Восстановление',
        'регенерирует за ход 5, 10, 15, 20, 25 здоровья в зависимости от уровня.',
        function(thisUnit, targetUnit) {
            thisUnit.beHealed(5 * this.getLevel());
            return 0;
        }, 5);
};

GAME_CORE.DEFAULT_PROPS.MODIFICATIONS.dodgeAction = function() {
    return new GAME_CORE.Modification('dodgeAction',
        GAME_CORE.DEFAULT_PROPS.MODIFICATIONS.TYPES.dodge, 'Перекус',
        'При успешном уклонении вы перекусываете походным пайком и восстанавливаете ' +
        '10 здоровья за каждый уровень способности.',
        function(thisUnit, targetUnit) {
            thisUnit.beHealed(10 * this.getLevel());
            return false;
        }, 5);
};

GAME_CORE.DEFAULT_PROPS.MODIFICATIONS.dodgeAction = function() {
    return new GAME_CORE.Modification('dodgeAction',
        GAME_CORE.DEFAULT_PROPS.MODIFICATIONS.TYPES.dodge, 'Контратака',
        'При успешном уклонении вы с шансом 10%*уровень контратакуете противника ' +
        'нанося базовый урон оружием (нельзя убить этой способностью). ',
        function(thisUnit, targetUnit) {
            if (UTIL_CORE.randomGen() <= 0.1*this.getLevel()) {
                targetUnit.decreaseHealth(thisUnit.getDamage());
            }
            return false;
        }, 5);
};

GAME_CORE.DEFAULT_PROPS.MODIFICATIONS.alternateDodge = function() {
    return new GAME_CORE.Modification('alternateDodge',
        GAME_CORE.DEFAULT_PROPS.MODIFICATIONS.TYPES.dodge, 'Мелкий но ловкий',
        'Если ваше максимальное здоровье меньше здоровья противника на 50% (снижается на 10% за уровень),' +
        ' то у вас есть 10% шанс увернуться от его атаки',
        function(thisUnit, targetUnit) {
            if(thisUnit.getMaxHealth() > targetUnit.getMaxHealth()*(0.6 - 0.1*this.getLevel())) {
                return false;
            }
            return UTIL_CORE.randomGen() <= 0.1;
        }, 5);
};

GAME_CORE.DEFAULT_PROPS.MODIFICATIONS.alternateDodge2 = function() {
    return new GAME_CORE.Modification('alternateDodge',
        GAME_CORE.DEFAULT_PROPS.MODIFICATIONS.TYPES.dodge, 'Бежать!',
        'Чем сильнее вы ранены, тем больше нас увернуться от атаки, на каждые 10% потерянного здоровья ' +
        '- 1, 2, 3% (в зависимости от уровня) шанса увернуться.',
        function(thisUnit, targetUnit) {
            return UTIL_CORE.randomGen() <= 0.1*this.getLevel()*(1 - thisUnit.getHealth()/thisUnit.getMaxHealth());
        }, 3);
};

GAME_CORE.DEFAULT_PROPS.MODIFICATIONS.bonusInitiative = function() {
    return new GAME_CORE.Modification('bonusInitiative',
        GAME_CORE.DEFAULT_PROPS.MODIFICATIONS.TYPES.initiative, 'Рвение',
        'С шансом в 5% (с уровнем повышается на 5) вы ощущаете прилив ярости, инициатива повышается на 200 единиц',
        function(thisUnit, targetUnit) {
            if (UTIL_CORE.randomGen() <= 0.05*this.getLevel()) {
                return 200;
            }
            return 0;
        }, 3);
};

GAME_CORE.DEFAULT_PROPS.MODIFICATIONS.bonusInitiative2 = function() {
    return new GAME_CORE.Modification('bonusInitiative',
        GAME_CORE.DEFAULT_PROPS.MODIFICATIONS.TYPES.initiative, 'Благословение',
        'Повышает инициативу на 20 за каждый уровень способности',
        function(thisUnit, targetUnit) {
            return 20*this.getLevel();
        }, 5);
};


GAME_CORE.DEFAULT_PROPS.MODIFICATIONS.basePunish = function() {
    return new GAME_CORE.Modification('basePunish',
        GAME_CORE.DEFAULT_PROPS.MODIFICATIONS.TYPES.punish, 'Осквернитель снаряжения',
        'Снижает редкость случайной вещи противника на 1 единицу, если она уже не минимальна с шансом успешного осквернения ' +
        ' 30% за уровень',
        function(thisUnit, targetUnit) {
            if(UTIL_CORE.randomGen() <= 0.3*this.getLevel()) {
                const cell = targetUnit.equipment.getCellByRandomIndex();
                cell.getCard().decrementRarity();
            }
            return 0;
        }, 3);
};

GAME_CORE.DEFAULT_PROPS.MODIFICATIONS.basePunish2 = function() {
    return new GAME_CORE.Modification('basePunish',
        GAME_CORE.DEFAULT_PROPS.MODIFICATIONS.TYPES.punish, 'Подкрутить настройки',
        'Либо снижает редкость случайной вещи противника на 2 уровня, либо повышает её на 1 с шансом 60%' +
        ' (шанс повышения падает на 10% за уровень)',
        function(thisUnit, targetUnit) {
            if (UTIL_CORE.randomGen() <= 0.6 - 0.1*this.getLevel()) {
                const cell = targetUnit.equipment.getCellByRandomIndex();
                cell.getCard().incrementRarity();
            } else {
                const cell = targetUnit.equipment.getCellByRandomIndex();
                cell.getCard().decrementRarity();
                cell.getCard().decrementRarity();
            }
            return 0;
        }, 3);
};

GAME_CORE.DEFAULT_PROPS.MODIFICATIONS.addingPunish = function() {
    return new GAME_CORE.Modification('addingPunish',
        GAME_CORE.DEFAULT_PROPS.MODIFICATIONS.TYPES.punish, 'Продать в рабство',
        'Противник теряет 10, 40, 90, 160, 250 монет (зависит от уровня) за выкуп своего бойца' +
        ' (минимальное количество денег что у него останется - 0)',
        function(thisUnit, targetUnit) {
            const owner = targetUnit.getOwner();
            if (owner === undefined) {
                return 0;
            }
            owner.takeMoney(10*this.getLevel()*this.getLevel());
            return 0;
        }, 5);
};

GAME_CORE.DEFAULT_PROPS.MODIFICATIONS.addingPunish2 = function() {
    return new GAME_CORE.Modification('addingPunish',
        GAME_CORE.DEFAULT_PROPS.MODIFICATIONS.TYPES.punish, 'Награда за победу',
        'За победу над противником игрок владелец получает 10, 40, 90, 160, 250 монет (зависит от уровня) монет',
        function(thisUnit, targetUnit) {
            const owner = thisUnit.getOwner();
            if (owner === undefined) {
                return 0;
            }
            owner.getMoney(10*this.getLevel()*this.getLevel());
            return 0;
        }, 5);
};

GAME_CORE.DEFAULT_PROPS.MODIFICATIONS.addingPunish3 = function() {
    return new GAME_CORE.Modification('addingPunish',
        GAME_CORE.DEFAULT_PROPS.MODIFICATIONS.TYPES.punish, 'Обчистить карманы',
        'Забирает у поверженного 5, 20, 45, 80, 125 монет (зависит от уровня) монет',
        function(thisUnit, targetUnit) {
            const thisOwner = thisUnit.getOwner();
            const targetOwner = targetUnit.getOwner();
            if (thisOwner !== undefined) {
                thisOwner.getMoney(5*this.getLevel()*this.getLevel());
            }
            if (thisOwner !== undefined) {
                targetOwner.takeMoney(5*this.getLevel()*this.getLevel());
            }
            return 0;
        }, 5);
};

GAME_CORE.DEFAULT_PROPS.BATTLE = {};
GAME_CORE.DEFAULT_PROPS.BATTLE.earlyBattleResultBattleType = "IS_NOT_THE_END"
GAME_CORE.DEFAULT_PROPS.BATTLE.ATTACK_RESULT = {};
GAME_CORE.DEFAULT_PROPS.BATTLE.ATTACK_RESULT.failAttack = "FAIL_ATTACK";
GAME_CORE.DEFAULT_PROPS.BATTLE.ATTACK_RESULT.dodge = "DODGE";
GAME_CORE.DEFAULT_PROPS.BATTLE.ATTACK_RESULT.damaged = "DAMAGED";
GAME_CORE.DEFAULT_PROPS.BATTLE.ATTACK_RESULT.defeated = "DEFEATED";

GAME_CORE.DEFAULT_PROPS.BATTLE.no_command = "none";
GAME_CORE.DEFAULT_PROPS.BATTLE.getBattle = function (unit1, unit2, logChat) {
    const fightActions = new GAME_CORE.BATTLE.DuelFightActions(new GAME_CORE.BATTLE.DuelFightersPool(unit1, unit2),
        new GAME_CORE.BATTLE.AttackProcessor());
    const viewActions = new GAME_CORE.BATTLE.LogChatViewActions(logChat);
    return new GAME_CORE.BATTLE.Battle(fightActions, viewActions);
}
