GAME_CORE.LogChat = class LogChat extends UTIL_CORE.ViewEntity{
	constructor(id,  viewParent = undefined,maxMessage) {
		super(id, viewParent);
		this.setLogger(GAME_CORE.LOGGERS.InfoLogChatLogger);
		this.maxMessage = maxMessage;
		this.messageCount = 0;
		this._log('created', 'constructor');
	}
		
	async writeText(innerText, sleepTime = 200) {
		const st = Math.floor(sleepTime/2);
		await UTIL_CORE.sleep(st);
		this._clearFromNecessary();
		const p = document.createElement('p');
		p.textContent = innerText;
		this.viewEntity.view.appendChild(p);
		this.messageCount++;	
		await UTIL_CORE.sleep(sleepTime - st);
		this._log();
	}

	async writeMessage(message, sleepTime = 200) {
		const st = Math.floor(sleepTime/2);
		await UTIL_CORE.sleep(st);
		this._clearFromNecessary()
		message.appendClone(this.viewEntity.view);
		this.messageCount++;
		await UTIL_CORE.sleep(sleepTime - st);
		this._log();
	}
	
	async writeLetters(letterArray, sleepTime = 200) {
		await this.writeMessage(new UTIL_CORE.Message(letterArray), sleepTime);
	}

	_clearFromNecessary() {
		if (this.messageCount >= this.maxMessage) {
			this.clear();
		}
	}
		
	clear() {
		this._log();
		this.view.innerHTML = "";
		this.messageCount = 0;
	}
};

