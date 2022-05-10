GAME_CORE.GameField = class GameField extends UTIL_CORE.ViewEntity{
    constructor(id, viewParent = undefined, cardsCount,
                cardOptions = new GAME_CORE.CardOptions()) {
        super(id, viewParent);
        this.setLogger(GAME_CORE.LOGGERS.InfoGameFieldLogger);
        this.cardsCount = cardsCount;
        this.cardOptions = cardOptions;
        this._initCardArray();
        this.emptyState = true;
        this._log('created','constructor');
    }

    isEmpty() {return this.emptyState;}

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

    setActive() {
        for (const card of this.cardArray) {
            card.setActive();
        }
        this._log();
    }

    setInactive() {
        for (const card of this.cardArray) {
            card.setInactive();
        }
        this._log();
    }

    fill() {
        if (!this.isEmpty()) {
            this._log(' not empty ');
            return false;
        }
        this._log();
        for ( const card of this.cardArray) {
            card.append();
            this.emptyState = false;
        }
        return true;
    }

    clear() {
        if (this.isEmpty()) {
            this._log(' is empty ');
            return false;
        }
        this._log();
        for (const card of this.cardArray) {
            card.remove();
            this.emptyState = true;
        }
        return true;
    }

    setRandomRarity() {
        this._log();
        for (const card of this.cardArray) {
            card.closeCard();
            card.setRandomRarity();
        }
    }

    increaseRarity() {
        this._log();
        for (const card of this.cardArray) {
            card.closeCard();
            card.increaseRarity();
        }
    }

    decreaseRarity() {
        this._log();
        for (const card of this.cardArray) {
            card.closeCard();
            card.decreaseRarity();
        }
    }

    setRarityByIndex(index) {
        this._log();
        for (const card of this.cardArray) {
            card.closeCard();
            card.setRarityByIndex(index);
        }
    }

    setZeroRarity() {
        this.setRarityByIndex(0);
    }

    setCardTypeByName(cardTypeName) {
        for (const card of this.cardArray) {
            card.setCardTypeByName(cardTypeName);
        }
        this._log();
    }

    setRandomCardType() {
        for (const card of this.cardArray) {
            card.setRandomCardType();
        }
        this._log();
    }

    setCardTypeByIndex(index) {
        for (const card of this.cardArray) {
            card.setCardTypeByIndex(index);
        }
        this._log();
    }

    resetCardView() {
        if (this.isEmpty()) {
            this._log(' is empty ');
            return false;
        }
        this._log();
        for (const card of this.cardArray) {
            card.resetView();
        }
        return true;
    }

    addListeners(type, action) {
        for (const card of this.cardArray) {
            const wrap = function() {
                action(card);
            }
            card.setEventListener(type, wrap);
        }
        this._log();
    }

    removeListeners() {
        for (const card of this.cardArray) {
            card.removeEventListener();
        }
        this._log();
    }

    _initCardArray() {
        this.cardArray = [];
        for (let i = 0; i < this.cardsCount; i++) {
            this.cardArray.push(this.cardOptions.getCard(this.getViewId() + 'c' + i, this.getView()));
        }
    }
};