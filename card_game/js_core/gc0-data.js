const GAME_CORE = {};

GAME_CORE.Price = class Price {
    constructor (buy, sell){
        this.buy = buy;
        this.sell = sell;
    }
    getBuyPrice() {return this.buy;}
    getSellPrice() {return this.sell;}
};

GAME_CORE.StatMap = class StatMap extends Map{
    constructor () {
        super();
    }
}

GAME_CORE.BaseStatMap = class BaseStatMap extends StatMap {
    constructor(health=0, damage=0, luck=0, dodge=0) {
        super();
        this.set('health', health);
        this.set('damage', damage);
        this.set('luck', luck);
        this.set('dodge', dodge);
    }

    getHealth() {return this.get('health');}
    getDamage() {return this.get('damage');}
    getLuck() {return this.get('luck');}
    getDodge() {return this.get('dodge');}

    hasStat(statName) {return this.has(statName);}
    getStat(statName) {
        return this.get(statName);
    };
    setStat(statName, value) {return this.set(statName, value)};
}

GAME_CORE.Pack = class Pack {
    constructor(typeArray) {
        this.typeArray = typeArray;
    }
    getByIndex(index) {
        if (index <= this.getMaxIndex() && index >= 0) {
            return this.typeArray[index];
        }
        throw new RangeError('index ' + index + ' out of range');
    }

    getRandomIndex() {return UTIL_CORE.randomGen(this.typeArray.length);}
    getMaxIndex() {return this.typeArray.length - 1;}

    doThisToEveryElement(actionWithArgumentRarityOption) {
        for (let i = 0; i <= this.getMaxIndex(); i++) {
            actionWithArgumentRarityOption(this.typeArray[i]);
        }
    }

    add(type) {this.typeArray.push(type);}
    addToPosition(typeElement, index) {this.typeArray.splice(index,0,typeElement);}
    replaceToPosition(typeElement, index) {this.typeArray[index] = typeElement;}
    deleteByIndex(index) {
        if (index <= this.getMaxIndex() && index >= 0) {
            this.typeArray.splice(index, 1);
            return true;
        }
        return false;
    }
}

GAME_CORE.RarityOption = class RarityOption {
    constructor (name, difficult, viewClass, cardText, coloredAdjective, price, bonus,
                 description =undefined) {
        this.name = name;
        this.difficult = difficult;
        this.viewClass = viewClass;
        this.cardText = cardText;
        this.coloredAdjective = coloredAdjective;
        this.price = price;
        this.statMap = bonus;
        if (description !== undefined) {
            this.description = description;
        } else {
            this.description = this.name + ' ' + 'Health: ' + this.statMap.getHealth() + ' Damage: ' + this.statMap.getDamage() +
                ' Luck: ' + this.statMap.getLuck() + '  Dodge: ' + this.statMap.getDodge() + '  Sell: '
                + this.price.sell + '  Buy: ' + this.price.buy;
        }
    }

    getName() {return this.name;}
    getDifficult() {return this.difficult;}
    getViewClass() {return this.viewClass;}
    getCardText() {return this.cardText;}
    getColoredAdjective() {return this.coloredAdjective;}
    getPrice() {return this.price;}
    getStatMap() {return this.statMap;}
    getDescription() {return this.description;}
};

GAME_CORE.RarityPack = class RarityPack extends GAME_CORE.Pack{
    constructor(rarityArray, randomRange = 100000) {
        super(rarityArray);
        this.randomRange = randomRange;
    }

    getRandomIndexByDifficult() {
        for (let i = 0; i <= this.getMaxIndex(); i++) {
            if (UTIL_CORE.randomGen(this.randomRange) <= this.rarityArray[i].difficult) {
                return Math.max(i-1,0);
            }
        }
    }
}

GAME_CORE.CardType = class CardType {
    constructor(name, viewClass) {
        this.name = name;
        this.viewClass = viewClass;
    }
    getName() {return this.name;}
    getViewClass() {return this.viewClass;}
};

GAME_CORE.CardTypePack = class CardTypePack extends GAME_CORE.Pack{
    constructor(cardTypeArray) {
        super(cardTypeArray)
    }

    getCardTypeIndexByName(name) {
        for (let i= 0; i <= this.getMaxIndex(); i++) {
            if (this.typeArray[i].getName() === name) {return i;}
        }
        return -1;
    }
};

GAME_CORE.OpenCloseState = class OpenCloseState {
    constructor(viewClassOpened, viewClassClosed) {
        this.viewClassOpened = viewClassOpened;
        this.viewClassClosed = viewClassClosed;
    }

    getState(bool) {
        if (bool) {
            return this.viewClassOpened;
        }
        return this.viewClassClosed;
    }
    getCloseViewClass() {return this.viewClassClosed;}
    getOpenViewClass() {return this.viewClassOpened;}
};

GAME_CORE.ActivityState = class ActivityState {
    constructor(viewClassActive, viewClassInactive) {
        this.viewClassActive = viewClassActive;
        this.viewClassInactive = viewClassInactive;
    }
    getActiveViewClass() {return this.viewClassActive;}
    getInactiveViewClass() {return this.viewClassInactive;}
    getActivity(bool) {
        if (bool) {
            return this.viewClassActive;
        }
        return this.viewClassInactive;
    }
};

GAME_CORE.CardOptions = class CardOptions {
    constructor(rarityPack =GAME_CORE.DEFAULT_PROPS.rarityPack,
                cardTypePack =GAME_CORE.DEFAULT_PROPS.cardTypePack,
                cardState =GAME_CORE.DEFAULT_PROPS.cardState,
                cardActivity =GAME_CORE.DEFAULT_PROPS.cardActivity) {
        this.rarityPack = rarityPack;
        this.cardTypePack = cardTypePack;
        this.cardState = cardState;
        this.cardActivity = cardActivity;
    }

    getRarityPack() {return this.rarityPack;}
    getCardTypePack() {return this.cardTypePack;}
    getCardState() {return this.cardState;}
    getCardActivity() {return this.cardActivity;}

    getCard(id, viewParent) {
        return new GAME_CORE.Card(id, viewParent, this.rarityPack, this.cardTypePack, this.cardState, this.cardActivity);
    }
};

GAME_CORE.Modification = class Modification {
    //method execute(thisUnit, targetUnit)
    constructor(groupName,  type, name, description, executeMethod, maxLevel = 3) {
        this.groupName = groupName;
        this.type = type;
        this.name = name;
        this.description = description;
        this.executeMethod = executeMethod;
        this.level = 1;
        this.maxLevel = maxLevel;
        this.counter = 0;
    }

    getGroupName() {return this.groupName;}
    getType() {return this.type;}
    getName() {return this.name;}
    getDescription() {return this.description;}
    getLevel() { return this.level; }
    levelUp() {
        this.level = Math.min(this.level +1, this.maxLevel);
    }
    decreaseLevel() {
        Math.max(this.level - 1, 1);
    }
    execute(thisUnit, targetUnit) { this.executeMethod(thisUnit, targetUnit); }
};

GAME_CORE.ModificationMap = class ModificationMap {
    constructor() {
        this.modificationMap = new Map();
    }

    //todo переработать в Map - работа только с name! без индексов
    getRandomModification() {
        const index = UTIL_CORE.randomGen(this.modificationMap.size);
        let i = 0;
        for (const mod of this.modificationMap.keys()) {
            if (i === index) {
                return mod;
            }
            i++;
        }
    }

    hasModification(groupName) {return this.modificationMap.has(groupName);}
    getModification(groupName) {
        return this.modificationMap.get(groupName);
    };
    setModification(mod) {return this.modificationMap.set(mod.getGroupName(), mod)};

    deleteByName(groupName) {
        return this.modificationMap.delete(groupName);
    }

    deleteModification(modification) {
        return this.deleteByName(modification.getGroupName());
    }

    execute(thisUnit, targetUnit) {
        const answer = [];
        for (const mod of this.typeArray) {
            answer.push(mod.execute(thisUnit, targetUnit));
        }
        return answer;
    }
};

GAME_CORE.ModificationMaps = class ModificationMaps {
    constructor() {
        this.modificationMaps = new Map();
        this.modificationMaps.set(GAME_CORE.DEFAULT_PROPS.MODIFICATIONS.TYPES.attack,
            new GAME_CORE.ModificationMap());
        this.modificationMaps.set(GAME_CORE.DEFAULT_PROPS.MODIFICATIONS.TYPES.dodge,
            new GAME_CORE.ModificationMap());
        this.modificationMaps.set(GAME_CORE.DEFAULT_PROPS.MODIFICATIONS.TYPES.initiative,
            new GAME_CORE.ModificationMap());
        this.modificationMaps.set(GAME_CORE.DEFAULT_PROPS.MODIFICATIONS.TYPES.punish,
            new GAME_CORE.ModificationMap())
    }

    getModificationMap(type) {
        return this.modificationMaps.get(type);
    }
};