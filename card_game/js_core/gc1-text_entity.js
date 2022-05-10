GAME_CORE.TextEntity = class TextEntity extends UTIL_CORE.ViewEntity{
	constructor(id,  viewParent = undefined,value){
		super(id, viewParent, 'var');
		this.setLogger(GAME_CORE.LOGGERS.InfoTextEntityLogger);
		this.value = value;
		this.updateView();
		this._log('created', 'constructor')
	}

	getValue() {return this.value;}

	updateView() {
		this.view.textContent = this.value;
		this._log();
	}
	updateValue(value) {
		this.value = value;
		this._log();
		this.updateView();
	}
};

//todo внимание во многих классах изменен порядок аргументов viewParent на второй аргумент