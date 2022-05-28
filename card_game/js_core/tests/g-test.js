GAME_CORE.TEST = {};
GAME_CORE.TEST.runAll = function (){
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
    GAME_CORE.TEST.LogChat.run();
    GAME_CORE.TEST.TextEntity.run();
    GAME_CORE.TEST.ModStatMap.run();
    GAME_CORE.TEST.EquipmentCell.run();
    GAME_CORE.TEST.Equipment.run();
    GAME_CORE.TEST.Player.run();
    GAME_CORE.TEST.ReplicsSet.run();
    GAME_CORE.TEST.Modification.run();
    GAME_CORE.TEST.ModificationMap.run();
    GAME_CORE.TEST.ModificationMaps.run();
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
GAME_CORE.TEST.Pack = {}
GAME_CORE.TEST.Pack.getPack = function () {return new GAME_CORE.Pack([0,1,2,3,4,5,6,7,8,9])}
GAME_CORE.TEST.Pack.run = function () {
    console.log('Pack');
    let summ = 0;
    let pack = GAME_CORE.TEST.Pack.getPack();
    console.log('getByIndex');
    UTIL_CORE.TEST.assertError(pack.getByIndex(12), true);
    UTIL_CORE.TEST.assert(pack.getByIndex(2), 2);
    console.log('getMaxIndex');
    UTIL_CORE.TEST.assert(pack.getMaxIndex(), pack.typeArray.length - 1);
    console.log('doThisToEveryElement');
    pack.doThisToEveryElement((arg)=> (summ+=arg))
    UTIL_CORE.TEST.assert(summ, 45);
    console.log('add');
    pack.add(10)
    UTIL_CORE.TEST.assert(pack.getByIndex(10), 10);
    console.log('addToPosition');
    pack.addToPosition(11, 1)
    UTIL_CORE.TEST.assert(pack.getByIndex(1), 11);
    console.log('replaceToPosition');
    pack.replaceToPosition(12, 2);
    UTIL_CORE.TEST.assert(pack.getByIndex(2), 12);
    console.log('deleteByIndex');
    pack = GAME_CORE.TEST.Pack.getPack();
    pack.deleteByIndex(2)
    UTIL_CORE.TEST.assert(pack.getByIndex(2),3);
};

GAME_CORE.TEST.RarityOption = {}
GAME_CORE.TEST.RarityOption.getRarityOptionWithParameters = function() {
    const options = ['name', 10000, 'emptyCard','text', new UTIL_CORE.Letter('обычный', 'grey'), new GAME_CORE.Price(100,25), new GAME_CORE.BaseStatMap(50,5,5,2)];
    const description = options[0] + ' ' + 'Health: ' + options[6].getHealth() + ' Damage: ' + options[6].getDamage() +
        ' Luck: ' + options[6].getLuck() + '  Dodge: ' + options[6].getDodge() + '  Sell: '
        + options[5].sell + '  Buy: ' + options[5].buy;
    const rarityOption = new GAME_CORE.RarityOption(options[0], options[1], options[2], options[3], options[4], options[5], options[6]);
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
    UTIL_CORE.TEST.assert(rarityWithParameters.rarity.getColoredAdjective(), rarityWithParameters.optionArray[4]);
};
GAME_CORE.TEST.RarityOption.getPrice = function () {
    console.log('getPrice');
    const rarityWithParameters = GAME_CORE.TEST.RarityOption.getRarityOptionWithParameters();
    UTIL_CORE.TEST.assert(rarityWithParameters.rarity.getPrice(), rarityWithParameters.optionArray[5]);
};
GAME_CORE.TEST.RarityOption.getStatMap = function () {
    console.log('getStatMap');
    const rarityWithParameters = GAME_CORE.TEST.RarityOption.getRarityOptionWithParameters();
    UTIL_CORE.TEST.assert(rarityWithParameters.rarity.getStatMap(), rarityWithParameters.optionArray[6]);
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
    UTIL_CORE.TEST.assert(card.getCardTypePack(), GAME_CORE.DEFAULT_PROPS.rarityPack);
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
    UTIL_CORE.TEST.assertErrorWithArgs(gameField.getCardByIndex,5, true);
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