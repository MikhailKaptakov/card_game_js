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