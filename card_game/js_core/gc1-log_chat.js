GAME_CORE.LogChat = class LogChat {
	constructor(id, maxMessage, viewParent = document.body) {
		this.viewEntity = new UTIL_CORE.ViewEntity(id, viewParent);
		this.maxMessage = maxMessage;
		this.messageCount = 0;
		this._log('created', 'constructor');
	}
		
	async writeText(innerText, sleepTime = 200) {
		const st = Math.floor(sleepTime/2);
		await UTIL_CORE.sleep(st);
		this._clearIfNecessary();
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
		this._clearIfNecessary()
		message.appendClone(this.viewEntity.view);
		this.messageCount++;
		await UTIL_CORE.sleep(sleepTime - st);
		this._log();
	}
	
	async writeLetters(letterArray, sleepTime = 200) {
		await this.writeMessage(new UTIL_CORE.Message(letterArray), sleepTime);
	}

	_clearIfNecessary() {
		if (this.messageCount >= this.maxMessage) {
			this.clear();
		}
	}
		
	clear() {
		this._log();
		this.view.innerHTML = "";
		this.messageCount = 0;
	}
		
	setViewParent(viewParent) {return this.viewEntity.setViewParent(viewParent);}
	remove() {return this.viewEntity.remove();}
	append() {return this.viewEntity.append();}
	getViewId() {return this.viewEntity.getId();}

	_log(message ='', methodName=GAME_CORE.LOGGERS.InfoLogChatLogger._getMethodName()) {
		GAME_CORE.LOGGERS.InfoLogChatLogger.logMethod(this.getViewId() + ' ' + message, methodName);
	}
};

