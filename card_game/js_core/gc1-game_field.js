GAME_CORE.GameField = class GameField {
    constructor(id, cardsCount, viewParent = document.body, cardBuilder = GAME_CORE.DEFAULT_PROPS.getCardBuilder(), initCard = true ) {
        this.viewEntity = new UTIL_CORE.ViewEntity(id, viewParent);
        this.cardsCount = cardsCount;
        this.cardBuilder = cardBuilder;
        if (initCard) {
            this.initCardArray();
        }
        this.isEmpty = true;
        this._log('created','constructor');
    }
    //you can change initMethod, but don't delete this string this.cardArray = [];
    initCardArray() {
        this.cardArray = [];
        for (let i = 0; i < this.cardsCount; i++) {
            this.cardArray.push(this.cardBuilder.setId(this.getViewId() + 'c' + i)
                .setViewParent(this.getView())
                .createCard());
        }
    }

    doIt(cardAction) {
        for (const card of this.cardArray) {
            card.cardAction = cardAction;
            card.cardAction();
        }
        this._log();
    }

    openCards() {
        for (const card of this.cardArray) {
            card.openCard();
        }
        this._log();
    }

    closeCards() {
        for (const card of this.cardArray) {
            card.closeCard();
        }
        this._log();
    }

    fill() {
        if (!this.isEmpty) {
            this._log(' not empty ');
            return false;
        }
        this._log();
        for ( const card of this.cardArray) {
            card.append();
            this.isEmpty = false;
        }
        return true;
    }

    clear() {
        if (this.isEmpty) {
            this._log(' is empty ');
            return false;
        }
        this._log();
        for (const card of this.cardArray) {
            card.remove();
            this.isEmpty = true;
        }
        return true;
    }

    setRandomRarity() {
        this._log();
        for (const card of this.cardArray) {
            card.closeCard();
            card.changeRarityOption(this.cardBuilder.getRandomRarity());
        }
    }

    setCardType(cardType) {
        for (const card of this.cardArray) {
            card.changeTypeOption(cardType);
        }
        this._log();
    }

    setRandomCardType() {
        for (const card of this.cardArray) {
            card.changeTypeOption(this.cardBuilder.getRandomType());
        }
        this._log();
    }

    addListeners(type, action) {
        for (let i = 0; i < this.cardArray.length ; i++ ) {
            const card = this.cardArray[i];
            const wrap = function() {
                action(card);
            }
            card.setEventListener(type, wrap);
        }
        this._log();
    }

    removeListeners(type, action) {
        for (let i = 0; i < this.cardArray.length ; i++ ) {
            const card = this.cardArray[i];
            const wrap = function() {
                action(card);
            }
            card.removeEventListener(type, wrap);
        }
        this._log();
    }

    //setParrent(parrent) {return this.viewEntity.setViewParent(parrent);}
    setViewParent(viewParent) {return this.viewEntity.setViewParent(viewParent);}
    remove() {return this.viewEntity.remove();}
    append() {
        const isAppend = this.viewEntity.append();
        this._log(isAppend);
    }


    _log(message ='', methodName=GAME_CORE.LOGGERS.InfoGameFieldLogger._getMethodName()) {
        GAME_CORE.LOGGERS.InfoGameFieldLogger.logMethod(this.getViewId() + ' ' + message, methodName);
    }
    getViewId() {return this.viewEntity.getId();}
    getView() {return this.viewEntity.view;}
};