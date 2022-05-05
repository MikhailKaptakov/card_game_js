GAME_CORE.GameField = class GameField {
    constructor(id, cardsCount, viewParent = document.body, cardFactory = GAME_CORE.DEFAULT_PROPS.cardFactory, initCard = true ) {
        this.appender = new GAME_CORE.Appender(id, this, viewParent);
        this.cardsCount = cardsCount;
        this.cardFactory = cardFactory;
        this.cardBuilder = this.cardFactory.createByView(id, this.view);
        if (initCard) {
            this.initCardArray();
        }
        this.isEmpty = true;
        GAME_CORE.LOGGERS.InfoGameFieldLogger.log(this.view.id + ' created in ' + this.viewParent.id);
    }
    //you can change initMethod, but don't delete this string this.cardArray = [];
    initCardArray() {
        this.cardArray = [];
        for (let i = 0; i < this.cardsCount; i++) {
            this.cardArray.push(this.cardBuilder.setId(this.view.id + 'c' + i).createCard());
        }
    }

    doIt(cardAction) {
        for (const card of this.cardArray) {
            card.cardAction = cardAction;
            card.cardAction();
        }
        GAME_CORE.LOGGERS.InfoGameFieldLogger.logMethod(this.view.id + 'do it to all cards', 'doIt(action)');
    }

    openCards() {
        for (const card of this.cardArray) {
            card.openCard();
        }
        GAME_CORE.LOGGERS.InfoGameFieldLogger.logMethod(this.view.id, 'openCards');
    }

    closeCards() {
        for (const card of this.cardArray) {
            card.closeCard();
        }
        GAME_CORE.LOGGERS.InfoGameFieldLogger.logMethod(this.view.id, 'closeCards');
    }

    fill() {
        if (!this.isEmpty) {
            GAME_CORE.LOGGERS.InfoGameFieldLogger.logMethod(this.view.id + ' not empty ', 'fill');
            return false;
        }
        GAME_CORE.LOGGERS.InfoGameFieldLogger.logMethod(this.view.id + ' append cards: ', 'fill');
        for ( const card of this.cardArray) {
            card.append();
            this.isEmpty = false;
        }
        return true;
    }

    clear() {
        if (this.isEmpty) {
            GAME_CORE.LOGGERS.InfoGameFieldLogger.logMethod(this.view.id + ' is empty ', 'clear');
            return false;
        }
        GAME_CORE.LOGGERS.InfoGameFieldLogger.logMethod(this.view.id + ' remove cards: ', 'clear');
        for (const card of this.cardArray) {
            card.remove();
            this.isEmpty = true;
        }
        return true;
    }

    setRandomRarity() {
        GAME_CORE.LOGGERS.InfoGameFieldLogger.logMethod(this.view.id + ' seted random rarity ', 'setRandomRarity');
        for (const card of this.cardArray) {
            card.closeCard();
            card.changeRarityOption(this.cardFactory.getRandomRarity());
        }
    }

    setCardType(cardType) {
        for (const card of this.cardArray) {
            card.changeTypeOption(cardType);
        }
        GAME_CORE.LOGGERS.InfoGameFieldLogger.logMethod(this.view.id + 'set type' + cardType.name, 'setCardType(cardType) ');
    }

    setRandomCardType() {
        for (const card of this.cardArray) {
            card.changeTypeOption(this.cardFactory.getRandomType());
        }
        GAME_CORE.LOGGERS.InfoGameFieldLogger.logMethod(this.view.id + 'set random type', 'setCardType(cardType) ');
    }

    addListeners(type, action) {
        for (let i = 0; i < this.cardArray.length ; i++ ) {
            const card = this.cardArray[i];
            const wrap = function() {
                action(card);
            }
            card.setEventListener(type, wrap);
        }
        GAME_CORE.LOGGERS.InfoGameFieldLogger.logMethod(this.view.id + ' added listners', 'addListeners');
    }

    removeListeners(type, action) {
        for (let i = 0; i < this.cardArray.length ; i++ ) {
            const card = this.cardArray[i];
            const wrap = function() {
                action(card);
            }
            card.removeEventListener(type, wrap);
        }
        GAME_CORE.LOGGERS.InfoGameFieldLogger.logMethod(this.view.id + ' removed listners', 'addListeners');
    }

    //setParrent(parrent) {return this.viewEntity.setViewParent(parrent);}
    setViewParent(viewParent) {return this.appender.setViewParent(viewParent);}
    remove() {return this.appender.remove();}
    append() {return this.appender.append();}
};