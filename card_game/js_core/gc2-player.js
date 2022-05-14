GAME_CORE.Player = class Player extends UTIL_CORE.ViewEntity{
	constructor(id, name, viewParent = document.body) {
		super(id, viewParent);
		this.setLogger(GAME_CORE.LOGGERS.InfoPlayerLogger);
		this.name = new GAME_CORE.TextEntity(id + 'name', name, this.getView());
		this.score = new GAME_CORE.TextEntity(id + 'score', 0, this.getView());
		this.money = new GAME_CORE.TextEntity(id + 'money', 0, this.getView());

		this.maxNameLength = 10;

		this._log('created', 'constructor')
	}

	setName(name) {
		if (typeof name !== 'string') {
			return false;
		}
		if (name.length > this.maxNameLength) {
			return false;
		}
		this.name.updateValue(name);
	}

	getName() {return this.name.getValue();}

	setScore(score) {
		if (typeof score !== 'number') {
			return false;
		}
		if (score < 0) {
			return false;
		}
		this.score.updateValue(score);
		return true;
	}

	addScore(score) {
		if (typeof score !== 'number') {
			return false;
		}
		const newVal = this.score.getValue() + score;
		if (newVal < 0) {
			return false;
		}
		this.score.updateValue(newVal);
		return true;
	}

	getScore() {
		return this.score.getValue();
	}

	setMoney(value) {
		if (typeof value !== 'number') {
			return false;
		}
		if (value < 0) {
			return false;
		}
		this.money.updateValue(value);
		return true;
	}

	addMoney(value) {
		if (typeof value !== 'number') {
			return false;
		}
		const newVal = this.money.getValue() + value;
		if (newVal < 0) {
			return false;
		}
		this.money.updateValue(newVal);
		return true;
	}

	getMoney() {
		return this.money.getValue();
	}
	
	appendAll() {
		this._log();
		this.name.append();
		this.score.append();
		this.money.append();
	}
};