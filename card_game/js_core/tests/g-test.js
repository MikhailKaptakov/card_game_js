GAME_CORE.TEST = {};
GAME_CORE.TEST.runAll = async function (){
    GAME_CORE.TEST.Price.run();
    GAME_CORE.TEST.BaseStatMap.run();
    GAME_CORE.TEST.Pack.run();
    GAME_CORE.TEST.RarityOption.run();
    GAME_CORE.TEST.CardType.run();
    GAME_CORE.TEST.CardTypePack.run();
    GAME_CORE.TEST.ActivityState.run();
    GAME_CORE.TEST.Card.run();
    GAME_CORE.TEST.CardOptions.run();
    GAME_CORE.TEST.GameField.run();
    await GAME_CORE.TEST.LogChat.run();
    GAME_CORE.TEST.TextEntity.run();
    GAME_CORE.TEST.ModStatMap.run();
    GAME_CORE.TEST.EquipmentCell.run();
    GAME_CORE.TEST.Equipment.run();
    GAME_CORE.TEST.Player.run();
    GAME_CORE.TEST.ReplicsSet.run();
    GAME_CORE.TEST.Modification.run();
    GAME_CORE.TEST.ModificationMap.run();
    GAME_CORE.TEST.ModificationMaps.run();
    GAME_CORE.TEST.Unit.run();
    GAME_CORE.TEST.Fighter.run();
    GAME_CORE.TEST.FightingFighters.run();
    GAME_CORE.TEST.DuelFightersPool.run();
    GAME_CORE.TEST.AttackResult.run();
    GAME_CORE.TEST.AttackProcessor.run();
    GAME_CORE.TEST.BattleResult.run();
    GAME_CORE.TEST.DuelFightActions.run();
    await GAME_CORE.TEST.Battle.run();
};
GAME_CORE.TEST.Price = {};
GAME_CORE.TEST.Price.run = function () {
    console.log('Price');
    console.log('constructor error');
    UTIL_CORE.TEST.assertError(()=>{return new GAME_CORE.Price(-1, -10);}, true);
    UTIL_CORE.TEST.assertError(()=>{return new GAME_CORE.Price(10, 100);}, true);
    UTIL_CORE.TEST.assertError(()=>{return new GAME_CORE.Price(0, -10);}, true);
    UTIL_CORE.TEST.assertError(()=>{return new GAME_CORE.Price(150,100);}, false);
    const price = new GAME_CORE.Price(150,100);
    console.log('getBuyPrice');
    UTIL_CORE.TEST.assert(price.getBuyPrice(), 150);
    console.log('getSellPrice');
    UTIL_CORE.TEST.assert(price.getSellPrice(), 100);
};
GAME_CORE.TEST.BaseStatMap = {};
GAME_CORE.TEST.BaseStatMap.run = function () {
    console.log('BaseStatMap');
    const statMap = GAME_CORE.TEST.BaseStatMap.create();
    console.log('hasStat');
    UTIL_CORE.TEST.assert(statMap.hasStat(GAME_CORE.DEFAULT_PROPS.STATS.health), true);
    UTIL_CORE.TEST.assert(statMap.hasStat('new'), false);
    console.log('getHealth');
    UTIL_CORE.TEST.assert(statMap.getHealth(), 100);
    console.log('getDamage');
    UTIL_CORE.TEST.assert(statMap.getDamage(), 120);
    console.log('getLuck');
    UTIL_CORE.TEST.assert(statMap.getLuck(), 130);
    console.log('getDodge');
    UTIL_CORE.TEST.assert(statMap.getDodge(), 150);
    console.log('getStat');
    UTIL_CORE.TEST.assert(statMap.getStat('newStat'), 10);
};
GAME_CORE.TEST.BaseStatMap.create = function () {
    const res = new GAME_CORE.BaseStatMap(100,120,130,150);
    res.setStat('newStat', 10);
    return res;
};
GAME_CORE.TEST.Pack = {};
GAME_CORE.TEST.Pack.obj = {i : 10};
GAME_CORE.TEST.Pack.getPack = function () {return new GAME_CORE.Pack([0,1,2,3,4,5,6,7,8,9, GAME_CORE.TEST.Pack.obj])};
GAME_CORE.TEST.Pack.run = function () {
    console.log('Pack');
    let summ = 0;
    let pack = GAME_CORE.TEST.Pack.getPack();
    console.log('getByIndex');
    UTIL_CORE.TEST.assertError(()=>{pack.getByIndex(12);}, true);
    UTIL_CORE.TEST.assert(pack.getByIndex(2), 2);
    console.log('getMaxIndex');
    UTIL_CORE.TEST.assert(pack.getMaxIndex(), pack.typeArray.length - 1);
    console.log('doThisToEveryElement');
    pack.doThisToEveryElement((arg)=> {if (typeof arg === 'number') {summ+=arg}});
    UTIL_CORE.TEST.assert(summ, 45);
    console.log('isElement');
    UTIL_CORE.TEST.assert(pack.isElement(5),true);
    UTIL_CORE.TEST.assert(pack.isElement(GAME_CORE.TEST.Pack.obj),true);
    UTIL_CORE.TEST.assert(pack.isElement({i : 10}),false);
    UTIL_CORE.TEST.assert(pack.isElement(20),false);
    console.log('getElementIndex');
    UTIL_CORE.TEST.assert(pack.getElementIndex(0),0);
    UTIL_CORE.TEST.assert(pack.getElementIndex(1),1);
    UTIL_CORE.TEST.assertError(()=>{pack.getElementIndex(100)},true);
    console.log('compareElements');
    UTIL_CORE.TEST.assert(pack.compareElements(2, 0),2);
    console.log('add');
    pack.add(10);
    UTIL_CORE.TEST.assert(pack.getByIndex(11), 10);
    UTIL_CORE.TEST.assert(pack.isElement(10),true);
    console.log('addToPosition');
    pack.addToPosition(11, 1)
    UTIL_CORE.TEST.assert(pack.getByIndex(1), 11);
    UTIL_CORE.TEST.assert(pack.isElement(11),true);
    console.log('replaceToPosition');
    pack.replaceToPosition(12, 2);
    UTIL_CORE.TEST.assert(pack.getByIndex(2), 12);
    UTIL_CORE.TEST.assert(pack.isElement(12),true);
    console.log('deleteByIndex');
    pack = GAME_CORE.TEST.Pack.getPack();
    UTIL_CORE.TEST.assert(pack.getByIndex(2),2);
    UTIL_CORE.TEST.assert(pack.deleteByIndex(2),true);
    UTIL_CORE.TEST.assert(pack.deleteByIndex(50),false);
    UTIL_CORE.TEST.assert(pack.getByIndex(2),3);
    UTIL_CORE.TEST.assertError(()=>{pack.getByIndex(50)},true);
    console.log('deleteElement');
    UTIL_CORE.TEST.assert(pack.getByIndex(9),GAME_CORE.TEST.Pack.obj);
    UTIL_CORE.TEST.assert(pack.deleteElement(GAME_CORE.TEST.Pack.obj),true);
    UTIL_CORE.TEST.assertError(()=>{pack.getByIndex(9)},true);
    UTIL_CORE.TEST.assert(pack.deleteElement({i : 10}),false);
};

GAME_CORE.TEST.RarityOption = {}
GAME_CORE.TEST.RarityOption.getRarityOptionWithParameters = function() {
    const options = ['name', 10000, 'emptyCard','text', 'обычный', 'grey', new GAME_CORE.Price(100,25), new GAME_CORE.BaseStatMap(50,5,5,2)];
    const description = options[0] + ' ' + 'Health: ' + options[7].getHealth() + ' Damage: ' + options[7].getDamage() +
        ' Luck: ' + options[7].getLuck() + '  Dodge: ' + options[7].getDodge() + '  Sell: '
        + options[6].sell + '  Buy: ' + options[6].buy;
    const rarityOption = new GAME_CORE.RarityOption(options[0], options[1], options[2], options[3], options[4], options[5], options[6], options[7]);
    return {optionArray : options, rarity : rarityOption, descript : description};
};
GAME_CORE.TEST.RarityOption.run = function () {
    console.log('RarityOption');
    GAME_CORE.TEST.RarityOption.getName();
    GAME_CORE.TEST.RarityOption.getDifficult();
    GAME_CORE.TEST.RarityOption.getViewClass();
    GAME_CORE.TEST.RarityOption.getCardText();
    GAME_CORE.TEST.RarityOption.getColoredAdjective();
    GAME_CORE.TEST.RarityOption.getPrice();
    GAME_CORE.TEST.RarityOption.getStatMap();
    GAME_CORE.TEST.RarityOption.getDescription();
};
GAME_CORE.TEST.RarityOption.getName = function () {
    console.log('getName');
    const rarityWithParameters = GAME_CORE.TEST.RarityOption.getRarityOptionWithParameters();
    UTIL_CORE.TEST.assert(rarityWithParameters.rarity.getName(), rarityWithParameters.optionArray[0]);
};
GAME_CORE.TEST.RarityOption.getDifficult = function () {
    console.log('getDifficult');
    const rarityWithParameters = GAME_CORE.TEST.RarityOption.getRarityOptionWithParameters();
    UTIL_CORE.TEST.assert(rarityWithParameters.rarity.getDifficult(), rarityWithParameters.optionArray[1]);
};
GAME_CORE.TEST.RarityOption.getViewClass = function () {
    console.log('getViewClass');
    const rarityWithParameters = GAME_CORE.TEST.RarityOption.getRarityOptionWithParameters();
    UTIL_CORE.TEST.assert(rarityWithParameters.rarity.getViewClass(), rarityWithParameters.optionArray[2]);
};
GAME_CORE.TEST.RarityOption.getCardText = function () {
    console.log('getCardText');
    const rarityWithParameters = GAME_CORE.TEST.RarityOption.getRarityOptionWithParameters();
    UTIL_CORE.TEST.assert(rarityWithParameters.rarity.getCardText(), rarityWithParameters.optionArray[3]);
};
GAME_CORE.TEST.RarityOption.getColoredAdjective = function () {
    console.log('getColoredAdjective');
    const rarityWithParameters = GAME_CORE.TEST.RarityOption.getRarityOptionWithParameters();
    UTIL_CORE.TEST.assert(rarityWithParameters.rarity.getColoredAdjective().getText(), rarityWithParameters.optionArray[4]);
};
GAME_CORE.TEST.RarityOption.getPrice = function () {
    console.log('getPrice');
    const rarityWithParameters = GAME_CORE.TEST.RarityOption.getRarityOptionWithParameters();
    UTIL_CORE.TEST.assert(rarityWithParameters.rarity.getPrice(), rarityWithParameters.optionArray[6]);
};
GAME_CORE.TEST.RarityOption.getStatMap = function () {
    console.log('getStatMap');
    const rarityWithParameters = GAME_CORE.TEST.RarityOption.getRarityOptionWithParameters();
    UTIL_CORE.TEST.assert(rarityWithParameters.rarity.getStatMap(), rarityWithParameters.optionArray[7]);
};
GAME_CORE.TEST.RarityOption.getDescription = function () {
    console.log('getDescription');
    const rarityWithParameters = GAME_CORE.TEST.RarityOption.getRarityOptionWithParameters();
    UTIL_CORE.TEST.assert(rarityWithParameters.rarity.getDescription(), rarityWithParameters.descript);
};

GAME_CORE.TEST.CardType = {};
GAME_CORE.TEST.CardType.createWithParams = function () {
    const params = ['name0', 'viewClass1'];
    const cardType = new GAME_CORE.CardType(params[0],params[1]);
    return {params : params, cardType : cardType};
};
GAME_CORE.TEST.CardType.run = function () {
    console.log('CardType');
    GAME_CORE.TEST.CardType.getName();
    GAME_CORE.TEST.CardType.getViewClass();
};
GAME_CORE.TEST.CardType.getName = function () {
    console.log('getName');
    const withParams = GAME_CORE.TEST.CardType.createWithParams();
    UTIL_CORE.TEST.assert(withParams.cardType.getName(), withParams.params[0]);
};

GAME_CORE.TEST.CardType.getViewClass = function () {
    console.log('getViewClass');
    const withParams = GAME_CORE.TEST.CardType.createWithParams();
    UTIL_CORE.TEST.assert(withParams.cardType.getViewClass(), withParams.params[1]);
};

GAME_CORE.TEST.CardTypePack = {};
GAME_CORE.TEST.CardTypePack.createCardTypePack = function() {
    return new GAME_CORE.CardTypePack([new GAME_CORE.CardType('name1', 'view1'), new GAME_CORE.CardType('name2', 'view2')])
};
GAME_CORE.TEST.CardTypePack.run = function () {
    console.log('CardTypePack');
    const pack = GAME_CORE.TEST.CardTypePack.createCardTypePack();
    console.log('getCardTypeIndexByName');
    UTIL_CORE.TEST.assert(pack.getCardTypeIndexByName('name1'), 0);
    UTIL_CORE.TEST.assert(pack.getCardTypeIndexByName('name3'), -1);
};

GAME_CORE.TEST.ActivityState = {};
GAME_CORE.TEST.ActivityState.createActivityState = function() {
    return new GAME_CORE.ActivityState('active', 'inactive');
};
GAME_CORE.TEST.ActivityState.run = function () {
    console.log('ActivityState');
    GAME_CORE.TEST.ActivityState.getActiveViewClass();
    GAME_CORE.TEST.ActivityState.getInactiveViewClass();
    GAME_CORE.TEST.ActivityState.getActivity();
};
GAME_CORE.TEST.ActivityState.getActiveViewClass = function () {
    console.log('getActiveViewClass');
    const state = GAME_CORE.TEST.ActivityState.createActivityState();
    UTIL_CORE.TEST.assert(state.getActiveViewClass(),'active');
};
GAME_CORE.TEST.ActivityState.getInactiveViewClass = function () {
    console.log('getInactiveViewClass');
    const state = GAME_CORE.TEST.ActivityState.createActivityState();
    UTIL_CORE.TEST.assert(state.getInactiveViewClass(),'inactive');
};
GAME_CORE.TEST.ActivityState.getActivity = function () {
    console.log('getActivity');
    const state = GAME_CORE.TEST.ActivityState.createActivityState();
    UTIL_CORE.TEST.assert(state.getActivity(true),'active');
    UTIL_CORE.TEST.assert(state.getActivity(false),'inactive');
};

GAME_CORE.TEST.Card = {};
GAME_CORE.TEST.Card.create = function() {
    return new GAME_CORE.Card('new');
};
GAME_CORE.TEST.Card.run = function () {
    console.log('Card');
    GAME_CORE.TEST.Card.getters();
    GAME_CORE.TEST.Card.rarityAndCardType();
    GAME_CORE.TEST.Card.view();
};
GAME_CORE.TEST.Card.getters = function () {
    const card = GAME_CORE.TEST.Card.create();
    console.log('getRarityName');
    UTIL_CORE.TEST.assert(card.getRarityName(), 'empty');
    console.log('getCardTypeName');
    UTIL_CORE.TEST.assert(card.getCardTypeName(), 'head');
    console.log('getColoredAdjective');
    UTIL_CORE.TEST.assert(card.getColoredAdjective(), GAME_CORE.DEFAULT_PROPS.rarityPack.getByIndex(0).getColoredAdjective());
    console.log('getBuyPrice');
    UTIL_CORE.TEST.assert(card.getBuyPrice(), GAME_CORE.DEFAULT_PROPS.rarityPack.getByIndex(0).getPrice().getBuyPrice());
    console.log('getSellPrice');
    UTIL_CORE.TEST.assert(card.getSellPrice(), GAME_CORE.DEFAULT_PROPS.rarityPack.getByIndex(0).getPrice().getSellPrice());
    console.log('getStatMap');
    UTIL_CORE.TEST.assert(card.getStatMap(), GAME_CORE.DEFAULT_PROPS.rarityPack.getByIndex(0).getStatMap());
    console.log('getHealthBonus');
    UTIL_CORE.TEST.assert(card.getHealthBonus(), GAME_CORE.DEFAULT_PROPS.rarityPack.getByIndex(0).getStatMap().getHealth());
    console.log('getDamageBonus');
    UTIL_CORE.TEST.assert(card.getDamageBonus(), GAME_CORE.DEFAULT_PROPS.rarityPack.getByIndex(0).getStatMap().getDamage());
    console.log('getLuckBonus');
    UTIL_CORE.TEST.assert(card.getLuckBonus(), GAME_CORE.DEFAULT_PROPS.rarityPack.getByIndex(0).getStatMap().getLuck());
    console.log('getDodgeBonus');
    UTIL_CORE.TEST.assert(card.getDodgeBonus(), GAME_CORE.DEFAULT_PROPS.rarityPack.getByIndex(0).getStatMap().getDodge());
    console.log('getDescription');
    UTIL_CORE.TEST.assert(card.getDescription(), GAME_CORE.DEFAULT_PROPS.rarityPack.getByIndex(0).getDescription());
    console.log('getRarityPack');
    UTIL_CORE.TEST.assert(card.getRarityPack(), GAME_CORE.DEFAULT_PROPS.rarityPack);
    console.log('getCardTypePack');
    UTIL_CORE.TEST.assert(card.getCardTypePack(), GAME_CORE.DEFAULT_PROPS.cardTypePack);
    console.log('getCardState');
    UTIL_CORE.TEST.assert(card.getCardState(), GAME_CORE.DEFAULT_PROPS.cardState);
    console.log('getCardActivity');
    UTIL_CORE.TEST.assert(card.getCardActivity(), GAME_CORE.DEFAULT_PROPS.cardActivity);
};

GAME_CORE.TEST.Card.rarityAndCardType = function () {
    const card = GAME_CORE.TEST.Card.create();
    console.log('setCardTypeByName');
    card.setCardTypeByName('body')
    UTIL_CORE.TEST.assert(card.getCardTypeName(), 'body');
    console.log('incrementRarity');
    card.incrementRarity();
    UTIL_CORE.TEST.assert(card.getRarityName(),'common');
    console.log('decrementRarity');
    card.decrementRarity();
    UTIL_CORE.TEST.assert(card.getRarityName(),'empty');
    console.log('setRarityByIndex');
    card.setRarityByIndex(3);
    UTIL_CORE.TEST.assert(card.getRarityName(),'rare');
    card.setRarityByIndex(-5);
    UTIL_CORE.TEST.assert(card.getRarityName(),'empty');
    card.setRarityByIndex(GAME_CORE.DEFAULT_PROPS.rarityOptions.length);
    UTIL_CORE.TEST.assert(card.getRarityName(),'empty');
};

GAME_CORE.TEST.Card.view = function () {
    const card = GAME_CORE.TEST.Card.create();
    card.append();
    console.log('isOpen');
    UTIL_CORE.TEST.assert(card.isOpen(), false);
    console.log('isActive');
    UTIL_CORE.TEST.assert(card.isActive(), true);
    console.log('open active');
    card.openCard();
    UTIL_CORE.TEST.assert(card.isOpen(), true);
    UTIL_CORE.TEST.assert(card.isActive(), true);
    UTIL_CORE.TEST.assert(card.getView().class, ' opened-card emptyCard headType');
    console.log('open inactive');
    card.setInactive();
    UTIL_CORE.TEST.assert(card.isOpen(), true);
    UTIL_CORE.TEST.assert(card.isActive(), false);
    UTIL_CORE.TEST.assert(card.getView().class, 'card-inactive opened-card emptyCard headType');
    console.log('close inactive');
    card.closeCard();
    UTIL_CORE.TEST.assert(card.isOpen(), false);
    UTIL_CORE.TEST.assert(card.isActive(), false);
    UTIL_CORE.TEST.assert(card.getView().class, 'card-inactive closed-card  ');
    console.log('close active');
    card.setActive();
    UTIL_CORE.TEST.assert(card.isOpen(), false);
    UTIL_CORE.TEST.assert(card.isActive(), true);
    UTIL_CORE.TEST.assert(card.getView().class, ' closed-card  ');
    console.log('setDescription');
    card.setDescription('new');
    UTIL_CORE.TEST.assert(card.getDescription(), 'new');
    UTIL_CORE.TEST.assert(card.getTitle(), '');
    card.openCard();
    UTIL_CORE.TEST.assert(card.getTitle(), 'new');
};

GAME_CORE.TEST.CardOptions = {};
GAME_CORE.TEST.CardOptions.create = function() {
    return new GAME_CORE.CardOptions();
};
GAME_CORE.TEST.CardOptions.run = function () {
    console.log('CardOptions');
    GAME_CORE.TEST.CardOptions.tests();
};

GAME_CORE.TEST.CardOptions.tests = function () {
    const cardOption = GAME_CORE.TEST.CardOptions.create();
    console.log('getRarityPack');
    UTIL_CORE.TEST.assert(cardOption.getRarityPack(),GAME_CORE.DEFAULT_PROPS.rarityPack);
    console.log('getCardTypePack');
    UTIL_CORE.TEST.assert(cardOption.getCardTypePack(),GAME_CORE.DEFAULT_PROPS.cardTypePack);
    console.log('getCardState');
    UTIL_CORE.TEST.assert(cardOption.getCardState(),GAME_CORE.DEFAULT_PROPS.cardState);
    console.log('getCardActivity');
    UTIL_CORE.TEST.assert(cardOption.getCardActivity(),GAME_CORE.DEFAULT_PROPS.cardActivity);
    console.log('getCard');
    const card = cardOption.getCard('new', undefined);
    UTIL_CORE.TEST.assert(card.getId(), 'new');
    UTIL_CORE.TEST.assert(card.getViewParent(), document.body);
    UTIL_CORE.TEST.assert(card.getRarityPack(), GAME_CORE.DEFAULT_PROPS.rarityPack);
    UTIL_CORE.TEST.assert(card.getCardTypePack(), GAME_CORE.DEFAULT_PROPS.cardTypePack);
    UTIL_CORE.TEST.assert(card.getCardState(), GAME_CORE.DEFAULT_PROPS.cardState);
    UTIL_CORE.TEST.assert(card.getCardActivity(), GAME_CORE.DEFAULT_PROPS.cardActivity);
};

GAME_CORE.TEST.GameField = {};
GAME_CORE.TEST.GameField.create = function() {
    return new GAME_CORE.GameField('test', undefined, 5);
};
GAME_CORE.TEST.GameField.run = function () {
    console.log('GameField');
    GAME_CORE.TEST.GameField.cardManipulationTests();
};
GAME_CORE.TEST.GameField.cardManipulationTests = function () {
    const gameField = GAME_CORE.TEST.GameField.create();
    console.log('isEmpty clear  fill');
    UTIL_CORE.TEST.assert(gameField.isEmpty(), true);
    UTIL_CORE.TEST.assert(gameField.clear(), false);
    UTIL_CORE.TEST.assert(gameField.fill(), true);
    UTIL_CORE.TEST.assert(gameField.fill(), false);
    UTIL_CORE.TEST.assert(gameField.isEmpty(), false);
    UTIL_CORE.TEST.assert(gameField.clear(), true);
    gameField.fill();
    console.log('getCardsCount');
    UTIL_CORE.TEST.assert(gameField.getCardsCount(), 5);
    console.log('getCardByIndex');
    UTIL_CORE.TEST.assertClassName(gameField.getCardByIndex(1), 'Card');
    UTIL_CORE.TEST.assertErrorWithArgs((arg)=>{gameField.getCardByIndex(arg[0]);},true, 5);
    console.log('openCards');
    gameField.openCards();
    let  res = true;
    for (let i = 0; i < 5; i++) {
        res = res && gameField.getCardByIndex(i).isOpen();
    }
    UTIL_CORE.TEST.assert(res, true);
    console.log('closeCards');
    gameField.closeCards();
    res = false;
    for (let i = 0; i < 5; i++) {
        res = res || gameField.getCardByIndex(i).isOpen();
    }
    UTIL_CORE.TEST.assert(res, false);
    console.log('setInactive');
    gameField.setInactive();
    res = false;
    for (let i = 0; i < 5; i++) {
        res = res || gameField.getCardByIndex(i).isActive();
    }
    UTIL_CORE.TEST.assert(res, false);
    console.log('setActive');
    gameField.setActive();
    res = true;
    for (let i = 0; i < 5; i++) {
        res = res && gameField.getCardByIndex(i).isActive();
    }
    UTIL_CORE.TEST.assert(res, true);
    console.log('doIt');
    gameField.doIt(function() {this.setInactive();});
    res = false;
    for (let i = 0; i < 5; i++) {
        res = res || gameField.getCardByIndex(i).isActive();
    }
    UTIL_CORE.TEST.assert(res, false);
    console.log('increaseRarity');
    gameField.increaseRarity();
    res = true;
    for (let i = 0; i < 5; i++) {
        res = res && gameField.getCardByIndex(i).getRarityName() === 'common';
    }
    UTIL_CORE.TEST.assert(res, true);
    console.log('decreaseRarity');
    gameField.decreaseRarity();
    res = true;
    for (let i = 0; i < 5; i++) {
        res = res && gameField.getCardByIndex(i).getRarityName() === 'empty';
    }
    UTIL_CORE.TEST.assert(res, true);
    console.log('setRarityByIndex');
    gameField.setRarityByIndex(1);
    res = true;
    for (let i = 0; i < 5; i++) {
        res = res && gameField.getCardByIndex(i).getRarityName() === 'common';
    }
    UTIL_CORE.TEST.assert(res, true);
    console.log('setZeroRarity');
    gameField.setZeroRarity();
    res = true;
    for (let i = 0; i < 5; i++) {
        res = res && gameField.getCardByIndex(i).getRarityName() === 'empty';
    }
    UTIL_CORE.TEST.assert(res, true);
    console.log('setCardTypeByName');
    gameField.setCardTypeByName('arms');
    res = true;
    for (let i = 0; i < 5; i++) {
        res = res && gameField.getCardByIndex(i).getCardTypeName() === 'arms';
    }
    UTIL_CORE.TEST.assert(res, true);
    console.log('setCardTypeByIndex');
    gameField.setCardTypeByIndex(2);
    res = true;
    for (let i = 0; i < 5; i++) {
        res = res && gameField.getCardByIndex(i).getCardTypeName() === 'body';
    }
    UTIL_CORE.TEST.assert(res, true);
};
//todo добавить разделение тестов в отдельные методы, более частое разделение, чтобы уменьшить количество зависимостей
//todo добавить тесты на граничные условия (для всех классов пересмотреть все имеющиеся тесты)
GAME_CORE.TEST.LogChat = {};
GAME_CORE.TEST.LogChat.create = function() {
    return new GAME_CORE.LogChat('test', undefined, 3);
};
GAME_CORE.TEST.LogChat.createLetter = function(text) {
    return new UTIL_CORE.Letter(text);
};
GAME_CORE.TEST.LogChat.createLetters = function() {
    const array = [];
    for (let i = 0; i<3; i++) {
        array.push(GAME_CORE.TEST.LogChat.createLetter('test'  + i));
    }
    return array;
};
GAME_CORE.TEST.LogChat.createMessage = function() {
    return new UTIL_CORE.Message(GAME_CORE.TEST.LogChat.createLetters());
};

GAME_CORE.TEST.LogChat.run = async function () {
    console.log('LogChat');
    await GAME_CORE.TEST.LogChat.writeText();
    await GAME_CORE.TEST.LogChat.writeMessage();
    await GAME_CORE.TEST.LogChat.writeLetters();
    await GAME_CORE.TEST.LogChat.clear();
};
GAME_CORE.TEST.LogChat.writeText = async function () {
    console.log('writeText');
    //todo переименовать константы созданных объектов в подобных тестах по названию класса
    const logChat = GAME_CORE.TEST.LogChat.create();
    await logChat.writeText('innerText');
    UTIL_CORE.TEST.assert(logChat.getView().firstChild.textContent, 'innerText');
};
GAME_CORE.TEST.LogChat.writeMessage = async function () {
    console.log('writeMessage');
    const logChat = GAME_CORE.TEST.LogChat.create();
    await logChat.writeMessage(GAME_CORE.TEST.LogChat.createMessage());
    const children = logChat.getView().firstChild.children;
    for (let i = 0; i<children.length; i++) {
        UTIL_CORE.TEST.assert(children[i].textContent, 'test'  + i);
    }
};
GAME_CORE.TEST.LogChat.writeLetters = async function () {
    console.log('writeLetters');
    const logChat = GAME_CORE.TEST.LogChat.create();
    await logChat.writeLetters(GAME_CORE.TEST.LogChat.createLetters());
    const children = logChat.getView().firstChild.children;
    for (let i = 0; i<children.length; i++) {
        UTIL_CORE.TEST.assert(children[i].textContent, 'test' + i);
    }
};
GAME_CORE.TEST.LogChat.clear = async function () {
    console.log('message count');
    const logChat = GAME_CORE.TEST.LogChat.create();
    await logChat.writeText('text');
    await logChat.writeText('text');
    UTIL_CORE.TEST.assert(logChat.getView().children.length, 2);
    await logChat.writeText('text');
    UTIL_CORE.TEST.assert(logChat.getView().children.length, 3);
    await logChat.writeText('text');
    UTIL_CORE.TEST.assert(logChat.getView().children.length, 1);
    console.log('clear');
    logChat.clear();
    UTIL_CORE.TEST.assert(logChat.getView().children.length, 0);
};
GAME_CORE.TEST.TextEntity = {};
GAME_CORE.TEST.TextEntity.create = function() {
    return new GAME_CORE.TextEntity('test', undefined, 'test');
};
GAME_CORE.TEST.TextEntity.run = function () {
    console.log('TextEntity');
    GAME_CORE.TEST.TextEntity.tests();
};
GAME_CORE.TEST.TextEntity.tests = function () {
    const textEntity = GAME_CORE.TEST.TextEntity.create();
    console.log('getValue');
    UTIL_CORE.TEST.assert(textEntity.getValue(), 'test');
    console.log('updateValue');
    textEntity.updateValue('new');
    UTIL_CORE.TEST.assert(textEntity.getValue(), 'new');
    console.log('updateView');
    textEntity.value = 'update';
    textEntity.updateView();
    UTIL_CORE.TEST.assert(textEntity.getView().textContent, 'update');
};

GAME_CORE.TEST.ModStatMap = {};
GAME_CORE.TEST.ModStatMap.create = function() {
    return new GAME_CORE.ModStatMap(0,1,2.5,3);
};
GAME_CORE.TEST.ModStatMap.createDefault = function() {
    return new GAME_CORE.ModStatMap();
};
GAME_CORE.TEST.ModStatMap.createWithFunctionDodge = function() {
    return new GAME_CORE.ModStatMap(10, 0, 0, function (){return this.getStat(GAME_CORE.DEFAULT_PROPS.STATS.health);});
};
GAME_CORE.TEST.ModStatMap.run = function () {
    console.log('ModStatMap');
    GAME_CORE.TEST.ModStatMap.illegalCreate();
    GAME_CORE.TEST.ModStatMap.tests();
};
GAME_CORE.TEST.ModStatMap.illegalCreate = function () {
    console.log('illegalCreate');
    UTIL_CORE.TEST.assertError(()=>{return new GAME_CORE.ModStatMap('dsad', 0, 0 ,0);}, true);
};
GAME_CORE.TEST.ModStatMap.tests = function () {
    const modStatMap = GAME_CORE.TEST.ModStatMap.create();
    const modStatMapDefault = GAME_CORE.TEST.ModStatMap.createDefault();
    const modStatMapWithFunc = GAME_CORE.TEST.ModStatMap.createWithFunctionDodge();
    console.log('hasStat');
    const hasStatCheck = function (modStat, message) {
        console.log(message);
        UTIL_CORE.TEST.assert(modStat.hasStat(GAME_CORE.DEFAULT_PROPS.STATS.health), true);
        UTIL_CORE.TEST.assert(modStat.hasStat(GAME_CORE.DEFAULT_PROPS.STATS.damage), true);
        UTIL_CORE.TEST.assert(modStat.hasStat(GAME_CORE.DEFAULT_PROPS.STATS.luck), true);
        UTIL_CORE.TEST.assert(modStat.hasStat(GAME_CORE.DEFAULT_PROPS.STATS.dodge), true);
        UTIL_CORE.TEST.assert(modStat.hasStat('stat'), false);
    }
    hasStatCheck(modStatMap, 'modStatMap');
    hasStatCheck(modStatMapDefault, 'modStatMapDefault');
    hasStatCheck(modStatMapWithFunc, 'modStatMapWithFunc');
    console.log('getStat');
    console.log('   modStatMap');
    UTIL_CORE.TEST.assert(modStatMap.getStat(GAME_CORE.DEFAULT_PROPS.STATS.health), 0);
    UTIL_CORE.TEST.assert(modStatMap.getStat(GAME_CORE.DEFAULT_PROPS.STATS.damage), 1);
    UTIL_CORE.TEST.assert(modStatMap.getStat(GAME_CORE.DEFAULT_PROPS.STATS.luck), 2.5);
    UTIL_CORE.TEST.assert(modStatMap.getStat(GAME_CORE.DEFAULT_PROPS.STATS.dodge), 3);
    UTIL_CORE.TEST.assert(modStatMap.getStat('stat'), undefined);
    console.log('   modStatMapDefault');
    UTIL_CORE.TEST.assert(modStatMapDefault.getStat(GAME_CORE.DEFAULT_PROPS.STATS.health), 0);
    UTIL_CORE.TEST.assert(modStatMapDefault.getStat(GAME_CORE.DEFAULT_PROPS.STATS.damage), 0);
    UTIL_CORE.TEST.assert(modStatMapDefault.getStat(GAME_CORE.DEFAULT_PROPS.STATS.luck), 0);
    UTIL_CORE.TEST.assert(modStatMapDefault.getStat(GAME_CORE.DEFAULT_PROPS.STATS.dodge), 0);
    console.log('   modStatMapWithFunc');
    UTIL_CORE.TEST.assert(modStatMapWithFunc.getStat(GAME_CORE.DEFAULT_PROPS.STATS.dodge), 10);
    console.log('setStat');
    modStatMap.setStat('stat', 10);
    UTIL_CORE.TEST.assert(modStatMap.getStat('stat'), 10);
    modStatMap.setStat('stat2', function (){return this.getStat(GAME_CORE.DEFAULT_PROPS.STATS.damage);});
    UTIL_CORE.TEST.assert(modStatMap.getStat('stat2'), 1);
    UTIL_CORE.TEST.assertError(()=>{modStatMap.setStat('stat3', 'ss');}, true);
};

GAME_CORE.TEST.EquipmentCell = {};
GAME_CORE.TEST.EquipmentCell.create = function() {
    GAME_CORE.TEST.EquipmentCell.currentCard =  new GAME_CORE.Card('test' +
        GAME_CORE.DEFAULT_PROPS.EquipTypes.head, undefined);
    return new GAME_CORE.EquipmentCell(undefined, GAME_CORE.DEFAULT_PROPS.EquipTypes.head,
        GAME_CORE.TEST.EquipmentCell.currentCard ,
        new GAME_CORE.ModStatMap(1, 0.5, 1, 0),
        new GAME_CORE.ModStatMap(0, 0, 10, 100));
};
GAME_CORE.TEST.EquipmentCell.currentCard = undefined;
GAME_CORE.TEST.EquipmentCell.run = function () {
    console.log('EquipmentCell');
    GAME_CORE.TEST.EquipmentCell.tests();
};
GAME_CORE.TEST.EquipmentCell.tests = function () {
    const cell = GAME_CORE.TEST.EquipmentCell.create();
    console.log('getName');
    UTIL_CORE.TEST.assert(cell.getName(), GAME_CORE.DEFAULT_PROPS.EquipTypes.head);
    console.log('getOwner');
    UTIL_CORE.TEST.assert(cell.getOwner(), undefined);
    console.log('getCard');
    UTIL_CORE.TEST.assert(cell.getCard(), GAME_CORE.TEST.EquipmentCell.currentCard);
    console.log('getCard');
    UTIL_CORE.TEST.assert(cell.getCard(), GAME_CORE.TEST.EquipmentCell.currentCard);
    console.log('getStat');
    cell.getCard().setRarityByIndex(2);
    UTIL_CORE.TEST.assert(cell.getStat(GAME_CORE.DEFAULT_PROPS.STATS.health), 100);
    UTIL_CORE.TEST.assert(cell.getStat(GAME_CORE.DEFAULT_PROPS.STATS.damage), 5);
    UTIL_CORE.TEST.assert(cell.getStat(GAME_CORE.DEFAULT_PROPS.STATS.luck), 20);
    UTIL_CORE.TEST.assert(cell.getStat(GAME_CORE.DEFAULT_PROPS.STATS.dodge), 100);
    console.log('setNewCard');
    cell.setNewCard('test', undefined);
    UTIL_CORE.TEST.assert(cell.getCard() === GAME_CORE.TEST.EquipmentCell.currentCard, false);
    console.log('appendCard');
    cell.appendCard();
    UTIL_CORE.TEST.assert(cell.getCard().isAppended(), true);
    console.log('removeCard');
    cell.removeCard();
    UTIL_CORE.TEST.assert(cell.getCard().isAppended(), false);
};
GAME_CORE.TEST.Equipment = {};
GAME_CORE.TEST.Equipment.create = function() {
    return new GAME_CORE.Equipment('test');
};
GAME_CORE.TEST.Equipment.run = function () {
    console.log('Equipment');
    GAME_CORE.TEST.Equipment.cardManipulation();
    GAME_CORE.TEST.Equipment.cardBonus();
};
GAME_CORE.TEST.Equipment.cardManipulation = function () {
    const equipment = GAME_CORE.TEST.Equipment.create();
    console.log('getCellByName');
    UTIL_CORE.TEST.assert(equipment.getCellByName(GAME_CORE.DEFAULT_PROPS.EquipTypes.head).getName(),
        GAME_CORE.DEFAULT_PROPS.EquipTypes.head);
    UTIL_CORE.TEST.assert(equipment.getCellByName(GAME_CORE.DEFAULT_PROPS.EquipTypes.arms).getName(),
        GAME_CORE.DEFAULT_PROPS.EquipTypes.arms);
    UTIL_CORE.TEST.assert(equipment.getCellByName(GAME_CORE.DEFAULT_PROPS.EquipTypes.body).getName(),
        GAME_CORE.DEFAULT_PROPS.EquipTypes.body);
    UTIL_CORE.TEST.assert(equipment.getCellByName(GAME_CORE.DEFAULT_PROPS.EquipTypes.legs).getName(),
        GAME_CORE.DEFAULT_PROPS.EquipTypes.legs);
    UTIL_CORE.TEST.assert(equipment.getCellByName(GAME_CORE.DEFAULT_PROPS.EquipTypes.feet).getName(),
        GAME_CORE.DEFAULT_PROPS.EquipTypes.feet);
    UTIL_CORE.TEST.assert(equipment.getCellByName('test'), undefined);
    console.log('getCellByIndex');
    UTIL_CORE.TEST.assert(equipment.getCellByIndex(0).getName(),
        GAME_CORE.DEFAULT_PROPS.EquipTypes.head);
    UTIL_CORE.TEST.assert(equipment.getCellByIndex(1).getName(),
        GAME_CORE.DEFAULT_PROPS.EquipTypes.arms);
    UTIL_CORE.TEST.assert(equipment.getCellByIndex(2).getName(),
        GAME_CORE.DEFAULT_PROPS.EquipTypes.body);
    UTIL_CORE.TEST.assert(equipment.getCellByIndex(3).getName(),
        GAME_CORE.DEFAULT_PROPS.EquipTypes.legs);
    UTIL_CORE.TEST.assert(equipment.getCellByIndex(4).getName(),
        GAME_CORE.DEFAULT_PROPS.EquipTypes.feet);
    UTIL_CORE.TEST.assert(equipment.getCellByIndex(-1), undefined);
    UTIL_CORE.TEST.assert(equipment.getCellByIndex(5), undefined);
    UTIL_CORE.TEST.assertError(()=>{equipment.getCellByIndex('str');}, true);
    console.log('appendCards');
    equipment.appendCards();
    let res = true;
    for (let i = 0; i < equipment.getEquipmentSize(); i++) {
        res = res && equipment.getCellByIndex(i).getCard().isAppended();
    }
    UTIL_CORE.TEST.assert(res, true);
    console.log('openCards');
    equipment.openCards();
    res = true;
    for (let i = 0; i < equipment.getEquipmentSize(); i++) {
        res = res && equipment.getCellByIndex(i).getCard().isOpen();
    }
    UTIL_CORE.TEST.assert(res, true);
    console.log('closeCards');
    equipment.closeCards();
    res = false;
    for (let i = 0; i < equipment.getEquipmentSize(); i++) {
        res = res || equipment.getCellByIndex(i).getCard().isOpen();
    }
    UTIL_CORE.TEST.assert(res, false);
};
GAME_CORE.TEST.Equipment.cardBonus = function () {
    const equipment = GAME_CORE.TEST.Equipment.create();
    for (let i = 0; i < 5; i++) {
        equipment.getCellByIndex(i).getCard().setRarityByIndex(i+1);
    };
    console.log('getStatBonus');
    UTIL_CORE.TEST.assert(equipment.getStatBonus(GAME_CORE.DEFAULT_PROPS.STATS.health), 250);
    UTIL_CORE.TEST.assert(equipment.getStatBonus('test'), 0);
    console.log('getHealthBonus');
    UTIL_CORE.TEST.assert(equipment.getHealthBonus(), 250);
    console.log('getDamageBonus');
    UTIL_CORE.TEST.assert(equipment.getDamageBonus(), 22.5);
    console.log('getLuckBonus');
    UTIL_CORE.TEST.assert(equipment.getLuckBonus(), 5);
    console.log('getDodgeBonus');
    UTIL_CORE.TEST.assert(equipment.getDodgeBonus(), 9);
    console.log('returnBonus');
    const bonus = equipment.returnBonus();
    UTIL_CORE.TEST.assert(bonus.getHealth(), 250);
    UTIL_CORE.TEST.assert(bonus.getDamage(), 22.5);
    UTIL_CORE.TEST.assert(bonus.getLuck(), 5);
    UTIL_CORE.TEST.assert(bonus.getDodge(), 9);
    console.log('getOwner');
    UTIL_CORE.TEST.assert(equipment.getOwner(), undefined);
};

GAME_CORE.TEST.Player = {};
GAME_CORE.TEST.Player.create = function() {
    return new GAME_CORE.Player('test','testName');
};
GAME_CORE.TEST.Player.run = function () {
    console.log('Player');
    GAME_CORE.TEST.Player.tests();
};
GAME_CORE.TEST.Player.tests = function () {
    const player = GAME_CORE.TEST.Player.create();
    console.log('getName');
    UTIL_CORE.TEST.assert(player.getName(), 'testName');
    console.log('setName');
    UTIL_CORE.TEST.assert(player.setName(12), false);
    UTIL_CORE.TEST.assert(player.setName('more ten char'), false);
    UTIL_CORE.TEST.assert(player.setName('tenCharact'), true);
    UTIL_CORE.TEST.assert(player.getName(), 'tenCharact');
    console.log('getScore');
    UTIL_CORE.TEST.assert(player.getScore(), 0);
    console.log('setScore');
    UTIL_CORE.TEST.assertError(()=>{player.setScore('test');}, true);
    UTIL_CORE.TEST.assert(player.setScore(-1), false);
    UTIL_CORE.TEST.assert(player.setScore(100), true);
    UTIL_CORE.TEST.assert(player.getScore(), 100);
    player.setScore(50.4);
    UTIL_CORE.TEST.assert(player.getScore(), 50);
    player.setScore(50.8);
    UTIL_CORE.TEST.assert(player.getScore(), 50);
    console.log('increaseScore');
    UTIL_CORE.TEST.assertError(()=>{player.increaseScore('test');}, true);
    UTIL_CORE.TEST.assert(player.increaseScore(-1), false);
    UTIL_CORE.TEST.assert(player.increaseScore(5), true);
    UTIL_CORE.TEST.assert(player.getScore(), 55);
    console.log('decreaseScore');
    UTIL_CORE.TEST.assertError(()=>{player.decreaseScore('test');}, true);
    UTIL_CORE.TEST.assert(player.decreaseScore(-1), false);
    UTIL_CORE.TEST.assert(player.decreaseScore(5), true);
    UTIL_CORE.TEST.assert(player.getScore(), 50);
    UTIL_CORE.TEST.assert(player.decreaseScore(55), true);
    UTIL_CORE.TEST.assert(player.getScore(), 0);
    console.log('getMoney');
    UTIL_CORE.TEST.assert(player.getMoney(), 0);
    console.log('setMoney');
    UTIL_CORE.TEST.assertError(()=>{player.setMoney('test');}, true);
    UTIL_CORE.TEST.assert(player.setMoney(-1), false);
    UTIL_CORE.TEST.assert(player.setMoney(50), true);
    UTIL_CORE.TEST.assert(player.getMoney(), 50);
    console.log('addMoney');
    UTIL_CORE.TEST.assertError(()=>{player.addMoney('test');}, true);
    UTIL_CORE.TEST.assert(player.addMoney(-1), false);
    UTIL_CORE.TEST.assert(player.addMoney(5), true);
    UTIL_CORE.TEST.assert(player.getMoney(), 55);
    console.log('takeMoney');
    UTIL_CORE.TEST.assertError(()=>{player.takeMoney('test');}, true);
    UTIL_CORE.TEST.assert(player.takeMoney(-1), false);
    UTIL_CORE.TEST.assert(player.takeMoney(5), true);
    UTIL_CORE.TEST.assert(player.getMoney(), 50);
    UTIL_CORE.TEST.assert(player.takeMoney(55), true);
    UTIL_CORE.TEST.assert(player.getMoney(), 0);
    console.log('buy');
    const price = new GAME_CORE.Price(100, 10);
    UTIL_CORE.TEST.assertError(()=>{player.buy(10);}, true);
    UTIL_CORE.TEST.assert(player.buy(price), false);
    player.setMoney(200);
    UTIL_CORE.TEST.assert(player.buy(price), true);
    UTIL_CORE.TEST.assert(player.getMoney(), 100);
    console.log('sell');
    UTIL_CORE.TEST.assertError(()=>{player.sell(10);}, true);
    UTIL_CORE.TEST.assert(player.sell(price), true);
    UTIL_CORE.TEST.assert(player.getMoney(), 110);
    console.log('appendAll');
    player.appendAll();
    UTIL_CORE.TEST.assert(player.name.isAppended(), true);
    UTIL_CORE.TEST.assert(player.score.isAppended(), true);
    UTIL_CORE.TEST.assert(player.money.isAppended(), true);
};

GAME_CORE.TEST.ReplicsSet = {};
GAME_CORE.TEST.ReplicsSet.run = function () {
    console.log('ReplicsSet');
    console.log('constructor');
    const set = new GAME_CORE.ReplicsSet();
    UTIL_CORE.TEST.assert(set.dodgeReplics.toString(), GAME_CORE.DEFAULT_PROPS.dodgeReplics.toString());
    UTIL_CORE.TEST.assert(set.attackReplics.toString(), GAME_CORE.DEFAULT_PROPS.attackReplics.toString());
    UTIL_CORE.TEST.assert(set.defeatReplics.toString(), GAME_CORE.DEFAULT_PROPS.defeatReplics.toString());
};

GAME_CORE.TEST.Modification = {};
GAME_CORE.TEST.Modification.create = function() {
    return new GAME_CORE.Modification('test',
        GAME_CORE.DEFAULT_PROPS.MODIFICATIONS.TYPES.attack, 'testName',
        'test description',
        function (thisUnit, targetUnit) {
            return this.getLevel();
        }, 2);
};
GAME_CORE.TEST.Modification.run = function () {
    console.log('Modification');
    GAME_CORE.TEST.Modification.tests();
};
GAME_CORE.TEST.Modification.tests = function () {
    const mod = GAME_CORE.TEST.Modification.create();
    console.log('getGroupName');
    UTIL_CORE.TEST.assert(mod.getGroupName(), 'test');
    console.log('getType');
    UTIL_CORE.TEST.assert(mod.getType(), GAME_CORE.DEFAULT_PROPS.MODIFICATIONS.TYPES.attack);
    console.log('getName');
    UTIL_CORE.TEST.assert(mod.getName(), 'testName');
    console.log('getDescription');
    UTIL_CORE.TEST.assert(mod.getDescription(), 'test description');
    console.log('getLevel');
    UTIL_CORE.TEST.assert(mod.getLevel(), 1);
    console.log('getMaxLevel');
    UTIL_CORE.TEST.assert(mod.getMaxLevel(), 2);
    console.log('levelUp');
    mod.levelUp();
    UTIL_CORE.TEST.assert(mod.getLevel(), 2);
    mod.levelUp();
    UTIL_CORE.TEST.assert(mod.getLevel(), 2);
    console.log('decreaseLevel');
    mod.decreaseLevel();
    UTIL_CORE.TEST.assert(mod.getLevel(), 1);
    mod.decreaseLevel();
    UTIL_CORE.TEST.assert(mod.getLevel(), 1);
    console.log('execute');
    UTIL_CORE.TEST.assert(mod.execute(), 1);
    mod.levelUp();
    UTIL_CORE.TEST.assert(mod.execute(), 2);
};
GAME_CORE.TEST.ModificationMap = {};
GAME_CORE.TEST.ModificationMap.create = function() {
    return new GAME_CORE.ModificationMap(GAME_CORE.DEFAULT_PROPS.MODIFICATIONS.TYPES.attack);
};
GAME_CORE.TEST.ModificationMap.createMod = function(groupName,
                                                     type =GAME_CORE.DEFAULT_PROPS.MODIFICATIONS.TYPES.attack,
                                                    name ='testName') {
    return new GAME_CORE.Modification(groupName,
        type, name,
        'test description',
        function (thisUnit, targetUnit) {
            return this.getLevel();
        }, 2);
};
GAME_CORE.TEST.ModificationMap.run = function () {
    console.log('ModificationMap');
    GAME_CORE.TEST.ModificationMap.tests();
};
GAME_CORE.TEST.ModificationMap.tests = function () {
    const modMap = GAME_CORE.TEST.ModificationMap.create();
    console.log('getTypeName');
    UTIL_CORE.TEST.assert(modMap.getTypeName(), GAME_CORE.DEFAULT_PROPS.MODIFICATIONS.TYPES.attack);
    console.log('hasModification');
    UTIL_CORE.TEST.assert(modMap.hasModification(), false);
    console.log('setModification');
    UTIL_CORE.TEST.assert(modMap.setModification(GAME_CORE.TEST.ModificationMap.createMod('test1',
        GAME_CORE.DEFAULT_PROPS.MODIFICATIONS.TYPES.dodge )), false);
    UTIL_CORE.TEST.assert(modMap.setModification(GAME_CORE.TEST.ModificationMap.createMod('test1')), true);
    console.log('getModification');
    UTIL_CORE.TEST.assert(modMap.getModification('test1').getName(), 'testName');
    UTIL_CORE.TEST.assert(modMap.getModification('test2'), undefined);
    modMap.setModification(GAME_CORE.TEST.ModificationMap.createMod('test1', undefined, 'anotherName'));
    UTIL_CORE.TEST.assert(modMap.getModification('test1').getName(), 'anotherName');
    modMap.setModification(GAME_CORE.TEST.ModificationMap.createMod('test2'));
    UTIL_CORE.TEST.assert(modMap.getModification('test2').getName(), 'testName');
    console.log('execute');
    UTIL_CORE.TEST.assert(modMap.execute().toString(), [1,1].toString());
    console.log('deleteByName');
    UTIL_CORE.TEST.assert(modMap.deleteByName('test3'), false);
    UTIL_CORE.TEST.assert(modMap.deleteByName('test2'), true);
    UTIL_CORE.TEST.assert(modMap.getModification('test2'), undefined);
    UTIL_CORE.TEST.assert(modMap.deleteByName('test2'), false);
    console.log('deleteModification');
    UTIL_CORE.TEST.assert(modMap.deleteModification(GAME_CORE.TEST.ModificationMap.createMod('test2')), false);
    UTIL_CORE.TEST.assert(modMap.deleteModification(GAME_CORE.TEST.ModificationMap.createMod('test1',
        GAME_CORE.DEFAULT_PROPS.MODIFICATIONS.TYPES.dodge)), false);
    UTIL_CORE.TEST.assert(modMap.deleteModification(GAME_CORE.TEST.ModificationMap.createMod('test1')), true);
};

GAME_CORE.TEST.ModificationMaps = {};
GAME_CORE.TEST.ModificationMaps.create = function() {
    return new GAME_CORE.ModificationMaps();
};
GAME_CORE.TEST.ModificationMaps.run = function () {
    console.log('ModificationMap');
    const maps = GAME_CORE.TEST.ModificationMaps.create();
    console.log('getModificationMap');
    UTIL_CORE.TEST.assert(maps.getModificationMap(GAME_CORE.DEFAULT_PROPS.MODIFICATIONS.TYPES.attack).getTypeName(),
        GAME_CORE.DEFAULT_PROPS.MODIFICATIONS.TYPES.attack);
    UTIL_CORE.TEST.assert(maps.getModificationMap(GAME_CORE.DEFAULT_PROPS.MODIFICATIONS.TYPES.dodge).getTypeName(),
        GAME_CORE.DEFAULT_PROPS.MODIFICATIONS.TYPES.dodge);
    UTIL_CORE.TEST.assert(maps.getModificationMap(GAME_CORE.DEFAULT_PROPS.MODIFICATIONS.TYPES.initiative).getTypeName(),
        GAME_CORE.DEFAULT_PROPS.MODIFICATIONS.TYPES.initiative);
    UTIL_CORE.TEST.assert(maps.getModificationMap(GAME_CORE.DEFAULT_PROPS.MODIFICATIONS.TYPES.punish).getTypeName(),
        GAME_CORE.DEFAULT_PROPS.MODIFICATIONS.TYPES.punish);
    UTIL_CORE.TEST.assert(maps.getModificationMap('notExist'),
        undefined);
};
//todo create tests to all default modifications после написание тестов всех классов

GAME_CORE.TEST.Unit = {};
GAME_CORE.TEST.Unit.create = function() {
    return new GAME_CORE.Unit('test','testName');
};
GAME_CORE.TEST.Unit.run = function () {
    console.log('Unit');
    GAME_CORE.TEST.Unit.tests();
};
GAME_CORE.TEST.Unit.tests = function () {
    const unit = GAME_CORE.TEST.Unit.create();
    console.log('getName');
    UTIL_CORE.TEST.assert(unit.getName(),'testName');
    console.log('getMaxHealth');
    UTIL_CORE.TEST.assert(unit.getMaxHealth(),300);
    console.log('getHealth');
    UTIL_CORE.TEST.assert(unit.getHealth(),300);
    console.log('getDamage');
    UTIL_CORE.TEST.assert(unit.getDamage(),25);
    console.log('getLuck');
    UTIL_CORE.TEST.assert(unit.getLuck(),0);
    console.log('getDodge');
    UTIL_CORE.TEST.assert(unit.getDodge(),5);
    console.log('getOwner');
    UTIL_CORE.TEST.assert(unit.getOwner(),undefined);
    console.log('getWins');
    UTIL_CORE.TEST.assert(unit.getWins(),0);
    console.log('getEquipment');
    UTIL_CORE.TEST.assert(unit.getEquipment().getId(),'testSET');
    console.log('incrementWins');
    unit.incrementWins();
    UTIL_CORE.TEST.assert(unit.getWins(),1);
    console.log('setZeroWins');
    unit.setZeroWins();
    UTIL_CORE.TEST.assert(unit.getWins(),0);
    const equip = unit.getEquipment();
    equip.getCellByName(GAME_CORE.DEFAULT_PROPS.EquipTypes.head).getCard().setRarityByIndex(3);
    equip.getCellByName(GAME_CORE.DEFAULT_PROPS.EquipTypes.arms).getCard().setRarityByIndex(3);
    equip.getCellByName(GAME_CORE.DEFAULT_PROPS.EquipTypes.body).getCard().setRarityByIndex(3);
    equip.getCellByName(GAME_CORE.DEFAULT_PROPS.EquipTypes.legs).getCard().setRarityByIndex(3);
    equip.getCellByName(GAME_CORE.DEFAULT_PROPS.EquipTypes.feet).getCard().setRarityByIndex(3);
    //todo новые методы обновления редкости карты напрямую из юнита, с параллельным обновлением всех параметров;
    console.log('updateMaxHealth');
    unit.updateMaxHealth();
    UTIL_CORE.TEST.assert(unit.getMaxHealth(),525);
    console.log('updateDamage');
    unit.updateDamage();
    UTIL_CORE.TEST.assert(unit.getDamage(),47);
    console.log('updateLuck');
    unit.updateLuck();
    UTIL_CORE.TEST.assert(unit.getLuck(),15);
    console.log('updateDodge');
    unit.updateDodge();
    UTIL_CORE.TEST.assert(unit.getDodge(),11);
    equip.getCellByName(GAME_CORE.DEFAULT_PROPS.EquipTypes.head).getCard().setRarityByIndex(0);
    equip.getCellByName(GAME_CORE.DEFAULT_PROPS.EquipTypes.arms).getCard().setRarityByIndex(0);
    equip.getCellByName(GAME_CORE.DEFAULT_PROPS.EquipTypes.body).getCard().setRarityByIndex(0);
    equip.getCellByName(GAME_CORE.DEFAULT_PROPS.EquipTypes.legs).getCard().setRarityByIndex(0);
    equip.getCellByName(GAME_CORE.DEFAULT_PROPS.EquipTypes.feet).getCard().setRarityByIndex(0);
    console.log('updateAllParam');
    unit.updateAllParam();
    UTIL_CORE.TEST.assert(unit.getMaxHealth(),300);
    UTIL_CORE.TEST.assert(unit.getDamage(),25);
    UTIL_CORE.TEST.assert(unit.getLuck(),0);
    UTIL_CORE.TEST.assert(unit.getDodge(),5);
    equip.getCellByName(GAME_CORE.DEFAULT_PROPS.EquipTypes.body).getCard().setRarityByIndex(5);
    unit.updateMaxHealth();
    console.log('beHealed');
    unit.beHealed(100);
    UTIL_CORE.TEST.assert(unit.getHealth(),400);
    console.log('beFullHealed');
    unit.beFullHealed(100);
    UTIL_CORE.TEST.assert(unit.getHealth(),550);
    console.log('decreaseHealth');
    unit.decreaseHealth(200);
    UTIL_CORE.TEST.assert(unit.getHealth(),350);
    unit.decreaseHealth(350);
    UTIL_CORE.TEST.assert(unit.getHealth(),1);
    console.log('beDamaged');
    unit.beDamaged(200);
    UTIL_CORE.TEST.assert(unit.getHealth(),0);
    console.log('say');
    unit.say('test');
    UTIL_CORE.TEST.assert(unit.replics.getValue(),'test');
    console.log('appendAll');
    unit.appendAll();
    UTIL_CORE.TEST.assert(unit.maxHealth.isAppended(),true);
    UTIL_CORE.TEST.assert(unit.currentHealth.isAppended(),true);
    UTIL_CORE.TEST.assert(unit.damage.isAppended(),true);
    UTIL_CORE.TEST.assert(unit.luck.isAppended(),true);
    UTIL_CORE.TEST.assert(unit.dodge.isAppended(),true);
    UTIL_CORE.TEST.assert(unit.wins.isAppended(),true);
    UTIL_CORE.TEST.assert(unit.equipment.isAppended(),true);
    UTIL_CORE.TEST.assert(unit.replics.isAppended(),true);
    console.log('removeAll');
    unit.removeAll();
    UTIL_CORE.TEST.assert(unit.maxHealth.isAppended(),false);
    UTIL_CORE.TEST.assert(unit.currentHealth.isAppended(),false);
    UTIL_CORE.TEST.assert(unit.damage.isAppended(),false);
    UTIL_CORE.TEST.assert(unit.luck.isAppended(),false);
    UTIL_CORE.TEST.assert(unit.dodge.isAppended(),false);
    UTIL_CORE.TEST.assert(unit.wins.isAppended(),false);
    UTIL_CORE.TEST.assert(unit.equipment.isAppended(),false);
    UTIL_CORE.TEST.assert(unit.replics.isAppended(),false);
};

GAME_CORE.TEST.Fighter = {};
GAME_CORE.TEST.Fighter.create = function() {
    return new GAME_CORE.BATTLE.Fighter(new GAME_CORE.Unit('test','testName'));
};

GAME_CORE.TEST.Fighter.run = function () {
    console.log('Fighter');
    GAME_CORE.TEST.Fighter.tests();
};

GAME_CORE.TEST.Fighter.tests = function () {
    const fighter = GAME_CORE.TEST.Fighter.create();
    console.log('isExcluded');
    UTIL_CORE.TEST.assert(fighter.isExcluded(),false);
    console.log('isIncluded');
    UTIL_CORE.TEST.assert(fighter.isIncluded(),true);
    console.log('exclude');
    fighter.exclude();
    UTIL_CORE.TEST.assert(fighter.isExcluded(),true);
    UTIL_CORE.TEST.assert(fighter.isIncluded(),false);
    console.log('include');
    fighter.include();
    UTIL_CORE.TEST.assert(fighter.isExcluded(),false);
    UTIL_CORE.TEST.assert(fighter.isIncluded(),true);
    console.log('getCommand');
    UTIL_CORE.TEST.assert(fighter.getCommand(),GAME_CORE.DEFAULT_PROPS.BATTLE.no_command);
    console.log('setCommand');
    fighter.setCommand('new')
    UTIL_CORE.TEST.assert(fighter.getCommand(),'new');
    console.log('getUnit');
    UTIL_CORE.TEST.assert(fighter.getUnit().getName(),'testName');
    console.log('setUnit');
    fighter.setUnit(new GAME_CORE.Unit('test2', 'testName2'))
    UTIL_CORE.TEST.assert(fighter.getUnit().getName(),'testName2');
    UTIL_CORE.TEST.assertError(()=>{fighter.setUnit('sss');},true);
};

GAME_CORE.TEST.FightingFighters = {};
GAME_CORE.TEST.FightingFighters.create = function() {
    return new GAME_CORE.BATTLE.FightingFighters(new GAME_CORE.BATTLE.Fighter(new GAME_CORE.Unit('test1','testName1')),
        new GAME_CORE.BATTLE.Fighter(new GAME_CORE.Unit('test2','testName2')));
};

GAME_CORE.TEST.FightingFighters.run = function () {
    console.log('FightingFighters');
    const fighters = GAME_CORE.TEST.FightingFighters.create();
    console.log('getAttacker');
    UTIL_CORE.TEST.assert(fighters.getAttacker().getUnit().getName(),'testName1');
    console.log('getDefender');
    UTIL_CORE.TEST.assert(fighters.getDefender().getUnit().getName(),'testName2');
};

GAME_CORE.TEST.DuelFightersPool = {};
GAME_CORE.TEST.DuelFightersPool.create = function() {
    return new GAME_CORE.BATTLE.DuelFightersPool(new GAME_CORE.Unit('test1','testName1'),
        new GAME_CORE.Unit('test2','testName2'));
};

GAME_CORE.TEST.DuelFightersPool.run = function () {
    console.log('DuelFightersPool');
    const pool = GAME_CORE.TEST.DuelFightersPool.create();
    console.log('getIncludedCount');
    UTIL_CORE.TEST.assert(pool.getIncludedCount(),2);
    console.log('getAllFightersArray');
    let fighters = pool.getAllFightersArray();
    UTIL_CORE.TEST.assert(fighters.length,2);
    UTIL_CORE.TEST.assert(fighters[0].getUnit().getName(),'testName1');
    UTIL_CORE.TEST.assert(fighters[1].getUnit().getName(),'testName2');
    console.log('getFightingFighters');
    fighters = pool.getFightingFighters();
    UTIL_CORE.TEST.assert(fighters.getAttacker().getUnit().getName(),'testName1');
    UTIL_CORE.TEST.assert(fighters.getDefender().getUnit().getName(),'testName2');
    fighters = pool.getFightingFighters();
    UTIL_CORE.TEST.assert(fighters.getAttacker().getUnit().getName(),'testName2');
    UTIL_CORE.TEST.assert(fighters.getDefender().getUnit().getName(),'testName1');
    fighters = pool.getFightingFighters();
    UTIL_CORE.TEST.assert(fighters.getAttacker().getUnit().getName(),'testName1');
    UTIL_CORE.TEST.assert(fighters.getDefender().getUnit().getName(),'testName2');
    console.log('changeFighters');
    pool.changeFighters(new GAME_CORE.Unit('test3','testName3'),
        new GAME_CORE.BATTLE.Fighter(new GAME_CORE.Unit('test4','testName4')));
    fighters = pool.getFightingFighters();
    UTIL_CORE.TEST.assert(fighters.getAttacker().getUnit().getName(),'testName3');
    UTIL_CORE.TEST.assert(fighters.getDefender().getUnit().getName(),'testName4');
    UTIL_CORE.TEST.assertError(()=>{pool.changeFighters('ssad', 'sd');},true);
};

GAME_CORE.TEST.AttackResult = {};
GAME_CORE.TEST.AttackResult.createFightingFighters = function() {
    return new GAME_CORE.BATTLE.FightingFighters(new GAME_CORE.BATTLE.Fighter(new GAME_CORE.Unit('test1','testName1')),
        new GAME_CORE.BATTLE.Fighter(new GAME_CORE.Unit('test2','testName2')));
};

GAME_CORE.TEST.AttackResult.run = function () {
    console.log('AttackResult');
    const fighters = GAME_CORE.TEST.AttackResult.createFightingFighters();
    let result = new GAME_CORE.BATTLE.AttackResult(fighters, GAME_CORE.DEFAULT_PROPS.BATTLE.ATTACK_RESULT.failAttack);
    console.log('getType');
    UTIL_CORE.TEST.assert(result.getType(),GAME_CORE.DEFAULT_PROPS.BATTLE.ATTACK_RESULT.failAttack);
    console.log('getDamage');
    UTIL_CORE.TEST.assert(result.getDamage(),0);
    console.log('getAttacker');
    UTIL_CORE.TEST.assert(result.getAttacker().getUnit().getName(),'testName1');
    console.log('getDefender');
    UTIL_CORE.TEST.assert(result.getDefender().getUnit().getName(),'testName2');
};

GAME_CORE.TEST.AttackProcessor = {};
GAME_CORE.TEST.AttackProcessor.create = function() {
    return new GAME_CORE.BATTLE.AttackProcessor();
};
GAME_CORE.TEST.AttackProcessor.createFightingFighters = function() {
    return new GAME_CORE.BATTLE.FightingFighters(new GAME_CORE.BATTLE.Fighter(new GAME_CORE.Unit('test1','testName1')),
        new GAME_CORE.BATTLE.Fighter(new GAME_CORE.Unit('test2','testName2')));
};
GAME_CORE.TEST.AttackProcessor.run = function () {
    console.log('AttackProcessor');
    const attackProcess = GAME_CORE.TEST.AttackProcessor.create();
    const fighters = GAME_CORE.TEST.AttackProcessor.createFightingFighters();
    console.log('attack');
    let result = {};
    do {
        const res = UTIL_CORE.TEST.assertErrorWithArgs(
            (arg)=> {arg[0].value = attackProcess.attack(fighters);}, false, result);
        if (res === false) {
            return;
        }
    } while (result.value.getType() !== GAME_CORE.DEFAULT_PROPS.BATTLE.ATTACK_RESULT.defeated)
};

GAME_CORE.TEST.AttackProcessor.debug = function () {
    const attackProcess = GAME_CORE.TEST.AttackProcessor.create();
    const fighters = GAME_CORE.TEST.AttackResult.createFightingFighters();
    console.log('attack');
    for (let i = 0; i < 100; i++) {
        attackProcess.attack(fighters);
    }
};

GAME_CORE.TEST.BattleResult = {};
GAME_CORE.TEST.BattleResult.create = function() {
    return new GAME_CORE.BATTLE.BattleResult(new GAME_CORE.BATTLE.Fighter(new GAME_CORE.Unit('test1','testName1')), 10, 'DuelFightActions');
};
GAME_CORE.TEST.BattleResult.run = function () {
    console.log('BattleResult');
    const battleResult = GAME_CORE.TEST.BattleResult.create();
    console.log('getWinner');
    UTIL_CORE.TEST.assert(battleResult.getWinner().getUnit().getName(),'testName1');
    console.log('getAttackRoundCounter');
    UTIL_CORE.TEST.assert(battleResult.getAttackRoundCounter(),10);
    console.log('getBattleType');
    UTIL_CORE.TEST.assert(battleResult.getBattleType(),'DuelFightActions');
};


GAME_CORE.TEST.DuelFightActions = {};
GAME_CORE.TEST.DuelFightActions.createFighterPool = function() {
    return new GAME_CORE.BATTLE.DuelFightersPool(new GAME_CORE.Unit('test1','testName1'),
        new GAME_CORE.Unit('test2','testName2'));
};
GAME_CORE.TEST.DuelFightActions.createAttackProcessor = function() {
    return new GAME_CORE.BATTLE.AttackProcessor();
};
GAME_CORE.TEST.DuelFightActions.create = function() {
    return new GAME_CORE.BATTLE.DuelFightActions(GAME_CORE.TEST.DuelFightActions.createFighterPool(),
        GAME_CORE.TEST.DuelFightActions.createAttackProcessor());
};
GAME_CORE.TEST.DuelFightActions.run = function () {
    console.log('DuelFightActions');
    const fightActions = GAME_CORE.TEST.DuelFightActions.create();
    console.log('fight');
    UTIL_CORE.TEST.assertError(()=>{fightActions.fight();},false);
    fightActions.isDefeat = false;
    console.log('isEnd');
    UTIL_CORE.TEST.assert(fightActions.isEnd(),
        false);
    console.log('getBattleResult');
    UTIL_CORE.TEST.assert(fightActions.getBattleResult().getBattleType(),
        GAME_CORE.DEFAULT_PROPS.BATTLE.earlyBattleResultBattleType );
    console.log('resetBattle');
    fightActions.resetBattle();
    UTIL_CORE.TEST.assert(fightActions.attackResult, undefined);
    UTIL_CORE.TEST.assert(fightActions.attackCounter, 0);
    UTIL_CORE.TEST.assert(fightActions.winner, undefined);
    UTIL_CORE.TEST.assert(fightActions.isDefeat, false);
};

GAME_CORE.TEST.Battle = {};
GAME_CORE.TEST.Battle.createFighterPool = function() {
    return new GAME_CORE.BATTLE.DuelFightersPool(new GAME_CORE.Unit('test1','testName1'),
        new GAME_CORE.Unit('test2','testName2'));
};
GAME_CORE.TEST.Battle.createAttackProcessor = function() {
    return new GAME_CORE.BATTLE.AttackProcessor();
};
GAME_CORE.TEST.Battle.createFightActions = function() {
    return new GAME_CORE.BATTLE.DuelFightActions(GAME_CORE.TEST.DuelFightActions.createFighterPool(),
        GAME_CORE.TEST.DuelFightActions.createAttackProcessor());
};
GAME_CORE.TEST.Battle.createLogChat = function() {
    return new GAME_CORE.LogChat('test',  undefined, 5);
};
GAME_CORE.TEST.Battle.createViewActions = function() {
    return new GAME_CORE.BATTLE.LogChatViewActions(GAME_CORE.TEST.Battle.createLogChat());
};

GAME_CORE.TEST.Battle.run = async function () {
    console.log('Battle');
    const battle = new GAME_CORE.BATTLE.Battle(GAME_CORE.TEST.Battle.createFightActions(),
        GAME_CORE.TEST.Battle.createViewActions());
    UTIL_CORE.TEST.assertError(async () => {
        await battle.fight();
    }, false);
};

