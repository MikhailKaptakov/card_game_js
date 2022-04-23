const GAME_CORE = {};


GAME_CORE.CARDS_PROP = {};
	GAME_CORE.CARDS_PROP.rarityTable = [35000,40000,45000,47500,50000,52500,55000,80000,80000,80000];
	GAME_CORE.CARDS_PROP.cardClasses = ['emptyCard','commonCard','uncommonCard','rareCard','epicCard','legendaryCard','mythicalCard','divineCard','ancientCard','hellCard', '.starCard'];
	GAME_CORE.CARDS_PROP.cardText = [' ','comm.','uncom.','rare','epic','legend.','mythic.', 'divine', 'ancient','hell', 'StaR'];
	GAME_CORE.CARDS_PROP.closedCardClass = 'closed-card';
	GAME_CORE.CARDS_PROP.openedCardClass = 'opened-card';
	GAME_CORE.CARDS_PROP.inactiveCardClass = 'card-inactive';
	GAME_CORE.CARDS_PROP.randomRange = 100000;
	GAME_CORE.CARDS_PROP.randomGen = function(){return UTIL_CORE.randomGen(GAME_CORE.CARDS_PROP.randomRange );};

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

GAME_CORE.UNITS_PROP = {};	
	GAME_CORE.UNITS_PROP.baseHealth = 300;
	GAME_CORE.UNITS_PROP.baseDamage = 25;
	GAME_CORE.UNITS_PROP.baseLuck = 0;
	GAME_CORE.UNITS_PROP.baseDodge = 5;
	GAME_CORE.UNITS_PROP.randomRange = 100;
	GAME_CORE.UNITS_PROP.healthBonus = [0,50,100,150,200,250,300,350,400,500,600];
	GAME_CORE.UNITS_PROP.damageBonus = [0,5,10,15,20,25,30,35,40,50,60];
	GAME_CORE.UNITS_PROP.luckBonus = [0,5,10,15,20,30,40,50,60,80,120];
	GAME_CORE.UNITS_PROP.dodgeBonus = [0,2,4,6,8,10,12,14,16,20,24];
	GAME_CORE.UNITS_PROP.bonus = [GAME_CORE.UNITS_PROP.healthBonus,GAME_CORE.UNITS_PROP.damageBonus,GAME_CORE.UNITS_PROP.luckBonus,GAME_CORE.UNITS_PROP.dodgeBonus];
		
	GAME_CORE.UNITS_PROP.dodgeReplics = ['Попробуй поймай', 'Ха - ха, А я уже тут', 'Мимо!'];
	GAME_CORE.UNITS_PROP.atackReplics = ['Получи', 'Так тебе', 'Больно?!'];
	GAME_CORE.UNITS_PROP.dieReplics = ['Я ещё вернусь', 'Ну как так??!', 'Неверю!!!', 'Это только начало!', 'Это что! КРОВЬ?!' ,'Как??? Как такое могло произойти???!'];
	
	GAME_CORE.UNITS_PROP.randomGen = function(){return UTIL_CORE.randomGen(GAME_CORE.UNITS_PROP.randomRange)};
	GAME_CORE.UNITS_PROP.damageDeal = function(damage) {return damage+Math.floor(damage*((GAME_CORE.UNITS_PROP.randomRange/2) - GAME_CORE.UNITS_PROP.randomGen())/(5*GAME_CORE.UNITS_PROP.randomRange));};
	GAME_CORE.UNITS_PROP.punish = function(){
		const num = UTIL_CORE.randomGen(5) - 1;
		const card = this.equipment.getEquipByNumber(num);
		card.setRarity(0);
		card.updateCard();
		this.updateAllParam();
		GAME_CORE.LOGGERS.InfoUnitLogger.logMethod(this.view.id + 'is run', 'punish');
	}
	
GAME_CORE.EQUPMENT_PROP = {};
	//[0] HPbonus, [1] DMGbonus, [2] LuckBonus, [3] DodgeBonus
	GAME_CORE.EQUPMENT_PROP.head = [0, 0, 1, 0]; 
	GAME_CORE.EQUPMENT_PROP.arms = [0, 1, 0, 0];
	GAME_CORE.EQUPMENT_PROP.body = [1, 0, 0, 0];
	GAME_CORE.EQUPMENT_PROP.legs = [0.5, 0, 0, 0.5];
	GAME_CORE.EQUPMENT_PROP.feets =[0, 0.5, 0, 0.5];