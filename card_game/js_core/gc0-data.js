const GAME_CORE = {};

GAME_CORE.Price = class Price {
    constructor (buyPrice =0, sellPrice =0){
        if (buyPrice < 0) {
            throw new Error('Отрицательное значение цены');
        }
        if (sellPrice < 0) {
            throw new Error('Отрицательное значение цены');
        }
        if (buyPrice<sellPrice) {
            throw new Error('Цена продажи не может быть больше цены покупки');
        }
        this.buyPrice = buyPrice;
        this.sellPrice = sellPrice;
    }
    getBuyPrice() {return this.buyPrice;}
    getSellPrice() {return this.sellPrice;}
};

GAME_CORE.StatMap = class StatMap extends Map{
    constructor () {
        super();
    }
}

GAME_CORE.BaseStatMap = class BaseStatMap extends GAME_CORE.StatMap {
    constructor(health=0, damage=0, luck=0, dodge=0) {
        super();
        this.set(GAME_CORE.DEFAULT_PROPS.STATS.health, health);
        this.set(GAME_CORE.DEFAULT_PROPS.STATS.damage, damage);
        this.set(GAME_CORE.DEFAULT_PROPS.STATS.luck, luck);
        this.set(GAME_CORE.DEFAULT_PROPS.STATS.dodge, dodge);
    }

    getHealth() {return this.get(GAME_CORE.DEFAULT_PROPS.STATS.health);}
    getDamage() {return this.get(GAME_CORE.DEFAULT_PROPS.STATS.damage);}
    getLuck() {return this.get(GAME_CORE.DEFAULT_PROPS.STATS.luck);}
    getDodge() {return this.get(GAME_CORE.DEFAULT_PROPS.STATS.dodge);}

    hasStat(statName) {return this.has(statName);}
    getStat(statName) {
        return this.get(statName);
    };
    setStat(statName, value) {return this.set(statName, value)};
}

GAME_CORE.Pack = class Pack {
    constructor(typeArray) {
        this.typeArray = typeArray;
    };
    getByIndex(index) {
        if (index <= this.getMaxIndex() && index >= 0) {
            return this.typeArray[index];
        }
        throw new Error('index ' + index + ' out of range');
    };

    getRandomIndex() {return UTIL_CORE.randomGen(this.typeArray.length);};
    getMaxIndex() {return this.typeArray.length - 1;};

    doThisToEveryElement(actionWithArgumentElement) {
        for (let i = 0; i <= this.getMaxIndex(); i++) {
            actionWithArgumentElement(this.typeArray[i]);
        }
    };

    isElement(typeElement) {
        for (let i = 0; i <= this.getMaxIndex(); i++) {
            if (typeElement === this.typeArray[i]) {
                return true;
            }
        }
        return false;
    };
    compareElements(typeElement1, typeElement2) {
        return this.getElementIndex(typeElement1) - this.getElementIndex(typeElement2);
    };
    getElementIndex(typeElement) {
        for (let i = 0; i <= this.getMaxIndex(); i++) {
            if (typeElement === this.typeArray[i]) {
                return i;
            }
        }
        throw Error( typeElement + " element not included to this pack");
    };

    add(typeElement) {
        if (!this.isElement(typeElement)) {
            this.typeArray.push(typeElement);
            return true;
        }
        return false;
    }
    addToPosition(typeElement, index) {
        if (!this.isElement(typeElement)) {
            this.typeArray.splice(index, 0, typeElement);
            return true;
        }
        return false;
    }
    replaceToPosition(typeElement, index) {
        if (!this.isElement(typeElement)) {
            this.typeArray[index] = typeElement;
            return true;
        }
        return false;
    }
    deleteByIndex(index) {
        if (index <= this.getMaxIndex() && index >= 0) {
            this.typeArray.splice(index, 1);
            return true;
        }
        return false;
    };

    deleteElement(typeElement) {
        if (this.isElement(typeElement)) {
            this.typeArray.splice(this.getElementIndex(typeElement), 1);
            return true;
        }
        return false;
    };
};

GAME_CORE.RarityOption = class RarityOption {
    constructor (name, difficult, viewClass, cardText, adjective, color, price, statMap,
                 description =undefined) {
        this.name = name;
        this.difficult = difficult;
        this.viewClass = viewClass;
        this.cardText = cardText;
        this.adjective = adjective;
        this.color = color;
        this.price = price;
        this.statMap = statMap;
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
    getColoredAdjective() {return new UTIL_CORE.Letter(this.adjective, this.color);}
    getColor() {return this.color;}
    getPrice() {return this.price;}
    getStatMap() {return this.statMap;}
    getDescription() {return this.description;}
    setDifficult(difficult) {
        UTIL_CORE.isPositiveNumber(difficult);
        this.difficult = difficult;
    }
};

GAME_CORE.RarityPack = class RarityPack extends GAME_CORE.Pack{
    constructor(rarityArray, randomRange = 100000) {
        super(rarityArray);
        this.randomRange = randomRange;
    }

    getRandomIndexByDifficult() {
        for (let i = 0; i <= this.getMaxIndex(); i++) {
            if (UTIL_CORE.randomGen(this.randomRange) <= this.typeArray[i].getDifficult()) {
                return Math.max(i-1,0);
            }
        }
        return this.getMaxIndex();
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
