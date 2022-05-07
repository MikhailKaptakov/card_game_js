//создание карт проводить через фабрику метод create - возвращает билдер,
// в котором проводить необходимую настройку и вызывать метод createCard
GAME_CORE.CardFactory = class CardFactory {
    constructor ({rarityCollection =GAME_CORE.DEFAULT_PROPS.rarityCollection,
                     cardTypeCollection =GAME_CORE.DEFAULT_PROPS.cardTypeCollection,
                     defaultCardState =GAME_CORE.DEFAULT_PROPS.cardState,
                     defaultCardActivity =GAME_CORE.DEFAULT_PROPS.cardActivity}) {
        this.rarityCollection = rarityCollection;
        this.cardTypeCollection = cardTypeCollection;
        this.defaultCardState = defaultCardState;
        this.defaultCardActivity = defaultCardActivity;
    }

    create(id) {return new GAME_CORE._CardBuilder(this, id);}
    createByView(id, viewParent) {return new GAME_CORE._CardBuilder(this, id, viewParent);}

    getRandomRarity() {return this.rarityCollection.getRandomRarity();}
    getRarityByRarityName(name) {return this.rarityCollection.getRarityByRarityName(name);}
    getRarityByIndex(arrayIndex) {return this.rarityCollection.getRarityByIndex(arrayIndex);}
    getRandomType() {return this.cardTypeCollection.getRandomType();}
    getTypeByName(name) {return this.cardTypeCollection.getTypeByName(name)}
    getTypeByArrayIndex(index) {return this.cardTypeCollection.getTypeByArrayIndex(index)}
}

GAME_CORE._CardBuilder = class CardBuilder {
    constructor(factory, id, viewParent= document.body) {
        this.factory = factory;
        this.id = id;
        this.viewParent = viewParent;
        this.rarityOption = this.factory.rarityCollection.getRarityByIndex(0);
        this.cardType = this.factory.cardTypeCollection.getTypeByArrayIndex(0);
        this.cardState = this.factory.defaultCardState;
        this.cardActivity = this.factory.defaultCardActivity;
        this.description = undefined;

    }
    setId(id) {this.id = id; return this;}
    setViewParent(viewParent) {this.viewParent = viewParent; return this;}
    setRarityRandom() {this.rarityOption = this.factory.rarityCollection.getRandomRarity(); return this;}
    setRarityByRarityName(name) {this.rarityOption = this.factory.rarityCollection.getRarityByRarityName(name); return this;}
    setRarityByIndex(arrayIndex) {this.rarityOption = this.factory.rarityCollection.getRarityByIndex(arrayIndex); return this;}
    setCardTypeRandom() {this.cardType = this.factory.cardTypeCollection.getRandomType(); return this;}
    setCardTypeByName(name) {this.cardType = this.factory.cardTypeCollection.getTypeByName(name); return this;}
    setCardTypeByArrayIndex(index) {this.cardType = this.factory.cardTypeCollection.getTypeByArrayIndex(index); return this;}
    setDifferentCardState(cardState) {this.cardState = cardState; return this;}
    setDifferentCardActivity(cardActivity) {this.cardActivity = cardActivity; return this;}
    setDescription(description) {this.description = description; return this;}
    createCard() {return new GAME_CORE.Card(this.id, this.viewParent, this.rarityOption, this.cardType, this.cardState, this.cardActivity, this.description);}
}

GAME_CORE.Card = class Card {
    constructor(id, viewParent, rarityOption, cardType, cardState, cardActivity, description =undefined) {
        this.cardViewOption = new GAME_CORE._cardViewOption(this, id, viewParent,cardType, cardState, cardActivity, description);
        this.rarityOption = rarityOption;
        this._log('Created card ', 'constructor' )
    }

    isOpen() {return this.cardViewOption.state;}
    isActive() {return this.cardViewOption.activity;}
    rarityName() {return this.rarityOption.name;}
    getColoredAjective(){return this.rarityOption.coloredAdjective;}
    getBuyPrice() {return this.rarityOption.price.buy;}
    getSellPrice() {return this.rarityOption.price.sell;}
    getBonus() {return this.rarityOption.bonus;}
    getHealthBonus() {return this.getBonus().getHealth();}
    getDamageBonus() {return this.getBonus().getDamage();}
    getLuckBonus() {return this.getBonus().getLuck();}
    getDodgeBonus() {return this.getBonus().getDodge();}
    getCardTypeName() {return this.cardType.name;}

    getViewId() {return this.cardViewOption.getId();}
    setViewParent(viewParent) {return this.cardViewOption.viewEntity.setViewParent(viewParent);}
    remove(){this.cardViewOption.viewEntity.remove();}
    append(){this.cardViewOption.append();}
    replace(newViewParent) {return this.cardViewOption.viewEntity.replace(newViewParent);}
    resetView() {this.cardViewOption.resetView();}

    changeRarityOption(rarityOption) {
        this.rarityOption = rarityOption;
        this.cardViewOption.updateViewOptions();
    }
    changeTypeOption(cardType) {
        this.cardType = cardType;
        this.cardViewOption.updateViewOptions();
    }

    updateView() {this.cardViewOption.updateViewOptions();}
    openCard() {this.cardViewOption.open();}
    closeCard() {this.cardViewOption.close();}
    setActive() {this.cardViewOption.setActive();}
    setInactive (){this.cardViewOption.setInactive();}

    setEventListener(eventType, action) {
        this.cardViewOption.setEventListener(eventType,action);
    }

    removeEventListener(eventType) {
        this.cardViewOption.removeEventListener(eventType);
    }

    _log(message ='', methodName=GAME_CORE.LOGGERS.InfoGameFieldLogger._getMethodName()) {
        GAME_CORE.LOGGERS.InfoCardLogger.logMethod(this.getViewId() + ' ' + message, methodName);
    }
}

GAME_CORE._cardViewOption = class CardViewOption {
    constructor(owner, id, viewParent,cardType, cardState, cardActivity, description=undefined) {
        this.owner = owner;
        this.viewEntity = new UTIL_CORE.ViewEntity(id, viewParent);
        this.cardType = cardType;
        this.cardState = cardState;
        this.cardActivity = cardActivity;
        this.isOpen = false;
        this.activity = true;
        this.description = description;
        this.action = undefined;
        this._initViewClassName();
        this.viewText = '';
        this.setViewOptions();
    }

    open() {
        if (this.isOpen) {
            this._log(' Is already open!');
            return;
        }
        this.isOpen = true;
        this._setOpenViewClassName();
        this._showCardText();
        this.setViewOptions();
        this._log();
    }

    close() {
        if (!this.isOpen) {
            this._log(' Is already close!');
            return;
        }
        this.isOpen = false;
        this._setCloseViewClassName();
        this._hideCardText();
        this.setViewOptions();
        this._log();
    }

    setInactive() {
        if (this.activity) {
            this.activity = false;
            this._setActiveClassName();
            this.setViewOptions();
            this._log();
        }
        this._log('Is already inactive');
    }

    setActive() {
        if (!this.activity) {
            this.activity = true;
            this._setInactiveClassName();
            this.setViewOptions();
            this._log();
        }
        this._log('Is already active');
    }

    updateViewOptions() {
        if (this.isOpen) {
            this.close();
            this.open();
        } else {
            this.open();
            this.close();
        }
        if (this.activity) {
            this.setInactive();
            this.setActive();
        } else {
            this.setActive();
            this.setInactive();
        }
    }

    setViewOptions() {
        this.viewEntity.setClass(this.viewClass);
        this.viewEntity.setTextContent(this.viewText);
        this._setDescriptionView();
    }

    setEventListener(eventType, action) {
        if (this.action === undefined) {
            this._getView().addEventListener(eventType, action);
            this.action = action;
            this._log(eventType);
            return;
        }
        this._log("Can't set second listener");
    }

    removeEventListener(eventType) {
        if (this.action !== undefined) {
            this._getView().removeEventListener(eventType, this.action);
            this._log();
            this.action = undefined;
            return;
        }
        this._log('Listener is not set');
    }

    append() {
        const ans = this.viewEntity.append();
        this._log(ans);
        return ans;
    }
    remove() {
        const ans = this.viewEntity.remove();
        this._log(ans);
        return ans;
    }

    resetView() {
        this.viewEntity.resetView();
        this.updateViewOptions();
    }

    getId() {return this._getView().id;}

    _setDescriptionView() {
        if (this.isOpen && this.activity) {
            this.viewEntity.setTitle((this.description === undefined)?
                this.owner.rarityOption.description
                : this.description);
        }
        else {
            this.viewEntity.setTitle('');
        }
    }

    _hideCardText() {
        this.viewText = '';
    }
    _showCardText() {
        this.viewText = this.owner.rarityOption.cardText;
    }

    _initViewClassName() {
        this._setViewClassName(this.cardActivity.viewClassActive, this.cardState.viewClassClosed,
            '', '');
    }

    _setOpenViewClassName() {
        this._setViewClassName(undefined, this.cardState.viewClassOpened,
            this.owner.rarityOption.viewClass, this.cardType.viewClass);
    }
    _setCloseViewClassName() {
        this._setViewClassName(undefined, this.cardState.viewClassClosed,
            '','');
    }

    _setActiveClassName() {
        this._setViewClassName(this.cardActivity.viewClassInactive);
    }

    _setInactiveClassName() {
        this._setViewClassName(this.cardActivity.viewClassActive);
    }

    _setViewClassName (activityViewClass =undefined, stateViewClass =undefined,
                       rarityOptionViewClass =undefined, cardTypeViewClass =undefined) {
        if (activityViewClass !== undefined) {
            this.activityViewClass = activityViewClass;
        }
        if (stateViewClass !== undefined) {
            this.stateViewClass = stateViewClass;
        }
        if (rarityOptionViewClass !== undefined) {
            this.rarityOptionViewClass = rarityOptionViewClass;
        }
        if (cardTypeViewClass !== undefined) {
            this.cardTypeViewClass = cardTypeViewClass;
        }
        this.viewClass = this.activityViewClass + ' ' +  this.stateViewClass +
            ' ' +  this.rarityOptionViewClass + ' ' + this.cardTypeViewClass;
    }

    _getView() {return this.viewEntity.view;}
    _log(message ='',methodName =GAME_CORE.LOGGERS.InfoGameFieldLogger._getMethodName()) {
        GAME_CORE.LOGGERS.InfoCardLogger.logMethod(this.getId() + ' ' + message, methodName);
    }
};

GAME_CORE.RarityOption = class RarityOption {
    constructor (name, difficult, viewClass, cardText, coloredAdjective, price, bonus,
                 description =undefined) {
        this.name = name;
        this.difficult = difficult;
        this.viewClass = viewClass;
        this.cardText = cardText;
        this.coloredAdjective = coloredAdjective;
        this.price = price;
        this.bonus = bonus;
        if (this.description !== undefined) {
            this.description = description;
        } else {
            this.description = this.name + ' ' + 'Health: ' + this.bonus.health + ' Damage: ' + this.bonus.damage +
                ' Luck: ' + this.bonus.luck + '  Dodge: ' + this.bonus.dodge + '  Sell: '
                + this.price.sell + '  Buy: ' + this.price.buy;
        }
        //todo при изменении карт цену карты формировать из стоимости рарной карты + добавочная стоимость переданным параметром
    }
}

GAME_CORE.RarityCollection = class RarityCollection {
    constructor(rarityArray, randomRange = 100000) {
        this.rarityArray = rarityArray;
        this.randomRange = randomRange;
        this._initRarityCollection();
    }

    doThisToEveryElement(actionWithArgumentRarityOption) {
        for (let i = 0; i < this.rarityArray.length; i++) {
            actionWithArgumentRarityOption(this.rarityArray[i]);
        }
    }

    _initRarityCollection() {
        for (let i = 0; i < this.rarityArray.length; i++) {
            this.rarityArray[i].rarityCollection = this;
            this.rarityArray[i].collectionIndex = i;
        }
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
