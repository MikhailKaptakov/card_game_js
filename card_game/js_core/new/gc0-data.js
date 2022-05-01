const GAME_CORE = {};

GAME_CORE.Letter = class Letter {
    constructor(letter, color=undefined, backgroundColor =undefined) {
        this.view = document.createElement('var');
        this.view.textContent = letter;
        if (color !== undefined) {this.view.style.color = color;}
        if (backgroundColor !== undefined) {this.view.style.backgroundColor = backgroundColor;}
    }
    getText(){return this.view.textContent;}
    //todo добавить больше полей к настройке letter
}

GAME_CORE.Message = class Message {
    constructor(letterArray) {
        this.view = document.createElement('p');
        for (let i = 0; i<letterArray.length; i++) {
            this.view.appendChild(letterArray[i].view);
        }
    }
}

GAME_CORE.Price = class Price {
    constructor (buy, sell){
        this.buy = buy;
        this.sell = sell;
    }
};

GAME_CORE.StatSet =  class StatSet  {
    constructor (health=0, damage=0, luck=0, dodge=0) {
        this.health = health;
        this.damage = damage;
        this.luck = luck;
        this.dodge = dodge;
    }
};

GAME_CORE.RarityOption = class RarityOption {
    constructor (name, difficult, viewClass, cardText, coloredAdjective, price, bonus) {
        this.name = name;
        this.difficult = difficult;
        this.viewClass = viewClass;
        this.cardText = cardText;
        this.coloredAdjective = coloredAdjective;
        this.price = price;
        this.bonus = bonus;
        //todo при изменении карт цену карты формировать из стоимости рарной карты + добавочная стоимость переданным параметром
    }
}

GAME_CORE.RarityCollection = class RarityCollection {
    constructor(rarityArray, randomRange = 100000) {
        this.rarityArray = rarityArray;
        this.randomRange = randomRange;
    }

    _randomGen() {return Math.floor(Math.random()*this.randomRange);};

    getRandomRarity() {
        for (let i = 0; i < this.rarityArray.length; i++) {
            if (this._randomGen() <= this.rarityArray[i].difficult) {
                return this.rarityArray[Math.max(i-1,0)];
            }
        }
    }

    getRarityByRarityName(name){
        for (let i = 0; i< this.rarityArray.length; i++) {
            if (this.rarityArray[i].name === name) {
                return this.rarityArray[i];
            }
        }
        return this.rarityArray[0];
    }

    getRarityByIndex(arrayIndex) {
        if (arrayIndex < this.rarityArray.length && arrayIndex >= 0) {
            return this.rarityArray[arrayIndex];
        }
        return this.rarityArray[0];
    }
}
GAME_CORE.CardType = class CardType {
    constructor(name, viewClass) {
        this.name = name;
        this.viewClass = viewClass;
    }
}

GAME_CORE.CardTypeCollection = class CardTypeCollection {
    constructor(cardTypeArray) {
        this.cardTypeArray = cardTypeArray;
    }

    getTypeByName(name) {
        for (let i = 0; i< this.cardTypeArray.length; i++) {
            if (this.cardTypeArray[i].name === name) {
                return this.cardTypeArray[i];
            }
        }
        return this.cardTypeArray[0];
    }

    getTypeByArrayIndex(index) {
        if (index < this.cardTypeArray.length && index >= 0) {
            return this.cardTypeArray[index];
        }
        return this.cardTypeArray[0];
    }

    getRandomType() {
        return this.cardTypeArray[Math.floor(Math.random()*this.cardTypeArray.length)];
    }
}

GAME_CORE.CardState = class CardState {
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
}

GAME_CORE.CardActivity = class CardActivity {
    constructor(viewClassActive, viewClassInactive) {
        this.viewClassActive = viewClassActive;
        this.viewClassInactive = viewClassInactive;
    }

    getActivity(bool) {
        if (bool) {
            return this.viewClassActive;
        }
        return this.viewClassInactive;
    }
}

GAME_CORE.EquipmentMultiple = class EquipmentMultiple {
    constructor(head, arms, body, legs, feet ) {
        this.head = head;
        this.arms = arms;
        this.body = body;
        this.legs = legs;
        this.feet = feet;
    }
}
