const b = document.getElementById('gameField');
const c = new GAME_CORE.LogChat('log', b, '10'); //(id, parrent, maxMessage)
const d = document.body;


const run = async function(){
	c.append();
	for (let i = 0; i < 25; i++) {
		await c.writeMessage('TestMessage #' + i , 200 + i*25);
	}
	c.setParrent(d);
	c.remove();
	c.setParrent(d);
	c.append();
	c.remove();
	c.setParrent(b);
	c.append();
	await c.writeMessage('LastTestMessage');
	await c.writeMessage('');
	c.clear();
}

run();
