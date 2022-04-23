GAME_CORE.LogChat = class LogChat {
	constructor(id, maxMessage, settedParrent = document.body) {
		this.appender = new GAME_CORE.Appender(id, this, settedParrent);
		this.maxMessage = maxMessage;
		this.messageCount = 0;
		
		GAME_CORE.LOGGERS.InfoLogChatLogger.log(this.view.id + ' created in ' + this.parrent.id);
	}
		
	async writeMessage(innerText, sleepTime = 200) {
		const st = Math.floor(sleepTime/2);
		await UTIL_CORE.sleep(st);
		if (this.messageCount >= this.maxMessage) {
			this.clear();
		};
		GAME_CORE.LOGGERS.InfoLogChatLogger.logMethod(this.view.id, 'writeMessage');
		const p = document.createElement('p');
		p.textContent = innerText;
		this.view.appendChild(p);
		//this.view.appendChild(document.createElement('br'));
		this.messageCount++;	
		await UTIL_CORE.sleep(sleepTime - st);		
	}
	
	async writeColoredMessage(innerText, sleepTime = 200) {
		const st = Math.floor(sleepTime/2);
		await UTIL_CORE.sleep(st);
		if (this.messageCount >= this.maxMessage) {
			this.clear();
		};
		GAME_CORE.LOGGERS.InfoLogChatLogger.logMethod(this.view.id, 'writeColoredMessage');
		const p = document.createElement('p');
		for (let i = 0; i<innerText.length; i++) {
			const d = document.createElement('var')
			if (innerText[i].color != undefined) {
				d.style.color = innerText[i].color;
			}
			d.textContent = innerText[i].letter;
			p.appendChild(d);
		}
		this.view.appendChild(p);
		//this.view.appendChild(document.createElement('br'));
		this.messageCount++;	
		await UTIL_CORE.sleep(sleepTime - st);		
	}
		
	clear() {
		GAME_CORE.LOGGERS.InfoLogChatLogger.logMethod(this.view.id, 'clear');
		this.view.innerHTML = "";
		this.messageCount = 0;
	}
		
	setParrent(parrent) {return this.appender.setParrent(parrent);}
	remove() {return this.appender.remove();}
	append() {return this.appender.append();}
};