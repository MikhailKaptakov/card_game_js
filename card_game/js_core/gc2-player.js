GAME_CORE.Player = class Player extends UTIL_CORE.ViewEntity{
	constructor(id, name, viewParent = document.body) {
		super(id, viewParent);
		this.setLogger(GAME_CORE.LOGGERS.InfoPlayerLogger);
		this.name = new GAME_CORE.TextEntity(id + 'name', this.getView(), name);
		this.score = new GAME_CORE.TextEntity(id + 'score', this.getView(), 0);
		this.money = new GAME_CORE.TextEntity(id + 'money', this.getView(), 0);

		this.maxNameLength = 10;

		this._log('created', 'constructor')
	}

	getName() {return this.name.getValue();}
	setName(name) {
		if (typeof name !== 'string') {
			return false;
		}
		if (name.length > this.maxNameLength) {
			return false;
		}
		this.name.updateValue(name);
		return true;
	}

	getScore() {
		return this.score.getValue();
	}

	setScore(score) {
		if (this._isPositiveNumber(score)) {
			this._setScore(score);
			return true;
		}
		return false;
	}

	increaseScore(score) {
		if (this._isPositiveNumber(score)) {
			const newVal = this.getScore() + score;
			this._setScore(newVal);
			return true;
		}
		return false;
	}
	decreaseScore(score) {
		if (this._isPositiveNumber(score)) {
			const newVal = this.getScore() - score;
			this._setScore(Math.max(newVal, 0));
			return true;
		}
		return false;
	}

	getMoney() {
		return this.money.getValue();
	}

	setMoney(money) {
		if (this._isPositiveNumber(money)) {
			this._setMoney(money);
			return true;
		}
		return false;
	}

	addMoney(money) {
		if (this._isPositiveNumber(money)) {
			const newVal = this.getMoney() + money;
			this._setMoney(newVal);
			return true;
		}
		return false;
	}

	takeMoney(money) {
		if (this._isPositiveNumber(money)) {
			const newVal = this.getMoney() - money;
			this._setMoney(Math.max(newVal, 0));
			return true;
		}
		return false;
	}

	buy(price) {
		this._isPrice(price);
		const newVal = this.money.getValue() - price.getBuyPrice();
		if (newVal < 0) {
			return false;
		}
		this._setMoney(newVal);
		return true;
	}

	sell(price) {
		this._isPrice(price);
		const newVal = this.money.getValue() + price.getSellPrice();
		this._setMoney(newVal);
		return true;
	}

	appendAll() {
		this._log();
		this.name.append();
		this.score.append();
		this.money.append();
	}

	_isPositiveNumber(value) {
		return UTIL_CORE.isPositiveNumber(value);
	}
	_isPrice(price) {
		UTIL_CORE.checkObjClassName(price, 'Price');
		//todo проверка типов согласно todo из util-core
	}
 	_setScore(score) {this.score.updateValue(Math.floor(score));}
	_setMoney(money) {this.money.updateValue(Math.floor(money));}
};