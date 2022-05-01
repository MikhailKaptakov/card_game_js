GAME_CORE.LogChat = class LogChat {
	constructor(id, maxMessage, viewParent = document.body) {
		this.appender = new GAME_CORE.Appender(id, this, viewParent);
		this.maxMessage = maxMessage;
		this.messageCount = 0;
		
		GAME_CORE.LOGGERS.InfoLogChatLogger.log(this.view.id + ' created in ' + this.viewParent.id);
	}
		
	async writeText(innerText, sleepTime = 200) {
		const st = Math.floor(sleepTime/2);
		await UTIL_CORE.sleep(st);
		this._clearIfNecessary();
		GAME_CORE.LOGGERS.InfoLogChatLogger.logMethod(this.view.id, 'writeMessage');
		const p = document.createElement('p');
		p.textContent = innerText;
		this.view.appendChild(p);
		this.messageCount++;	
		await UTIL_CORE.sleep(sleepTime - st);		
	}

	async writeMessage(message, sleepTime = 200) {
		const st = Math.floor(sleepTime/2);
		await UTIL_CORE.sleep(st);
		this._clearIfNecessary()
		GAME_CORE.LOGGERS.InfoLogChatLogger.logMethod(this.view.id, 'writeMessage');
		this.view.appendChild(message.view.cloneNode(true));
		this.messageCount++;
		await UTIL_CORE.sleep(sleepTime - st);
	}
	
	async writeLetters(letterArray, sleepTime = 200) {
		await this.writeMessage(new GAME_CORE.Message(letterArray), sleepTime);
	}

	_clearIfNecessary() {
		if (this.messageCount >= this.maxMessage) {
			this.clear();
		}
	}
		
	clear() {
		GAME_CORE.LOGGERS.InfoLogChatLogger.logMethod(this.view.id, 'clear');
		this.view.innerHTML = "";
		this.messageCount = 0;
	}
		
	setParrent(parrent) {return this.appender.setViewParent(parrent);}
	remove() {return this.appender.remove();}
	append() {return this.appender.append();}
};

