GAME_CORE.Card = class Card extends UTIL_CORE.ViewEntity {
    constructor(id, viewParent =undefined,
                rarityPack =GAME_CORE.DEFAULT_PROPS.rarityPack,
                cardTypePack =GAME_CORE.DEFAULT_PROPS.cardTypePack,
                cardState =GAME_CORE.DEFAULT_PROPS.cardState,
                cardActivity =GAME_CORE.DEFAULT_PROPS.cardActivity,) {
        super(id, viewParent);
        this.setLogger(GAME_CORE.LOGGERS.InfoCardLogger);
        this.rarityPack = rarityPack;
        this.cardTypePack = cardTypePack;
        this.cardState = cardState;
        this.cardActivity = cardActivity;
        this.action = undefined;
        this.eventType = undefined;
        this._initRarityOptions();
        this._initCardTypeOptions();
        this._initViewOptions();
        this._log('Created card ', 'constructor' )
    }
    getRarityName() {return this.rarityOption.getName();}
    getCardTypeName() {return this.cardType.getName();}
    getColoredAdjective(){return this.rarityOption.getColoredAdjective();}
    getBuyPrice() {return this.rarityOption.getPrice().getBuyPrice();}
    getSellPrice() {return this.rarityOption.getPrice().getSellPrice();}
    getStatMap() {return this.rarityOption.getStatMap();}
    getHealthBonus() {return this.getStatMap().getHealth();}
    getDamageBonus() {return this.getStatMap().getDamage();}
    getLuckBonus() {return this.getStatMap().getLuck();}
    getDodgeBonus() {return this.getStatMap().getDodge();}
    getDescription() {return this.description;}
    getCardTypePack() {return this.cardTypePack;}
    getRarityPack() {return this.rarityPack;}
    getCardState() {return this.cardState;}
    getCardActivity() {return this.cardActivity;}

    /******CardType_Options******/
    setRandomCardType() {this.setRarityByIndex(this.rarityPack.getRandomIndexByDifficult());}
    setCardTypeByName(name) {
        this._setCardTypeIndex(this.getCardTypePack().getCardTypeIndexByName(name));
    }
    setCardTypeByIndex(index) {
        if (index >= this.cardTypeMaxIndex || index < 0) {return;}
        this._setCardTypeIndex(index);
        this._log('set cardType: ' + this.cardType.getName());
    }
    _initCardTypeOptions() {
        this.currentCardTypeIndex = 0;
        this.cardTypeMaxIndex = this.cardTypePack.getMaxIndex();
        this.cardType = this.cardTypePack.getByIndex(this.currentCardTypeIndex);
    }
    _setCardTypeIndex(index) {
        this.currentCardTypeIndex = index;
        this.cardType = this.cardTypePack.getByIndex(index);
        this.updateView();
    }


    /******Rarity_Options******/
    setRandomRarity() {this.setRarityByIndex(this.rarityPack.getRandomIndexByDifficult());}
    incrementRarity() {this.setRarityByIndex(this.currentRarityIndex + 1);}
    decrementRarity() {this.setRarityByIndex(this.currentRarityIndex - 1);}
    setRarityByIndex(index) {
        if (index >= this.rarityMaxIndex) {return;}
        if (index < 0) {this._setRarityIndex(0); return;}
        this._setRarityIndex(index);
        this._log('set rarity ' + this.rarityOption.getName());
    }

    _initRarityOptions() {
        this.currentRarityIndex = 0;
        this.rarityMaxIndex = this.rarityPack.getMaxIndex();
        this.rarityOption = this.rarityPack.getByIndex(this.currentRarityIndex);
    }

    _setRarityIndex(index) {
        this.currentRarityIndex = index;
        this.rarityOption = this.rarityPack.getByIndex(index);
        this.updateView();
    }


    /******Listener******/
    setEventListener(eventType, action) {
        if (this.action === undefined) {
            this.getView().addEventListener(eventType, action);
            this.action = action;
            this.eventType = eventType;
            this._log(eventType);
            return;
        }
        this._log("Can't set second listener");
    }

    removeEventListener(eventType) {
        if (this.action !== undefined) {
            this.getView().removeEventListener(eventType, this.action);
            this._log();
            this.action = undefined;
            this.eventType = undefined;
            return;
        }
        this._log('Listener is not set');
    }


    /******View******/
    isOpen() {return this.openState;}
    isActive() {return this.activityState;}

    resetView() {
        super.resetView();
        this.updateView();
    }

    openCard() {
        if (this.isOpen()) {
            this._log(' Is already open!');
            return;
        }
        this.openState = true;
        this._setOpenViewClassName();
        this._showCardText();
        this._setViewOptions();
        this._log();
    }

    closeCard() {
        if (!this.isOpen()) {
            this._log(' Is already close!');
            return;
        }
        this.openState = false;
        this._setCloseViewClassName();
        this._hideCardText();
        this._setViewOptions();
        this._log();
    }

    setInactive() {
        if (this.isActive()) {
            this.activityState = false;
            this._setInactiveClassName();
            this._setViewOptions();
            this._log();
        } else {
            this._log('Is already inactive');
        }
    }

    setActive() {
        if (!this.isActive()) {
            this.activityState = true;
            this._setActiveClassName();
            this._setViewOptions();
            this._log();
        } else {
            this._log('Is already active');
        }
    }

    updateView() {
        if (this.isOpen()) {
            this.closeCard();
            this.openCard();
        } else {
            this.openCard();
            this.closeCard();
        }
        if (this.isActive()) {
            this.setInactive();
            this.setActive();
        } else {
            this.setActive();
            this.setInactive();
        }
    }

    setDescription(description) {
        this.description = description;
        this._setDescription();
    }

    _initViewOptions() {
        this.openState = false;
        this.activityState = true;
        this._initViewClassName();
        this.viewText = '';
        this.setClass(this.viewClass);
        this.setTextContent(this.viewText);
        this._initDescription();
    }

    _setViewOptions() {
        this.setClass(this.viewClass);
        this.setTextContent(this.viewText);
        this._setDescription();
    }

    _initViewClassName() {
        this._setViewClassName(this.cardActivity.getActiveViewClass(), this.cardState.getCloseViewClass(),
            '', '');
    }
    _initDescription() {
        this.description = this.rarityOption.getDescription();
        if (this.isOpen() && this.isActive()) {
            this.setTitle(this.description);
        }
        else {this.setTitle('');}
    }

    _setDescription() {
        if (this.isOpen() && this.isActive()) {
            this.setTitle(this.description);
        } else {this.setTitle('');}
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

    _setOpenViewClassName() {
        this._setViewClassName(undefined, this.cardState.getOpenViewClass(),
            this.rarityOption.getViewClass(), this.cardType.getViewClass());
    }
    _setCloseViewClassName() {this._setViewClassName(undefined, this.cardState.getCloseViewClass(),
        '','');}
    _setActiveClassName() {this._setViewClassName(this.cardActivity.getActiveViewClass());}
    _setInactiveClassName() {this._setViewClassName(this.cardActivity.getInactiveViewClass());}
    _hideCardText() {this.viewText = '';}
    _showCardText() {this.viewText = this.rarityOption.getCardText();}
}

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





