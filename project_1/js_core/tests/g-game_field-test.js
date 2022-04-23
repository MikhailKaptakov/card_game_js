const b = document.getElementById('gameField');
let a = new GAME_CORE.GameField('txent', document.getElementById('gameField'), '10');
const d = document.body;
const openF = function(){this.openCard();};
const closeF = function(obj){obj.closeCard();};
const sleep = UTIL_CORE.sleep;
run();


async function run() {
	a.append();
	await sleep(200);
	a.append();
	await sleep(200);
	a.fill();
	await sleep(200);
	a.setRandomRarity();
	await sleep(200);
	a.clear()
	await sleep(200);
	a.fill();
	await sleep(200);
	a.doIt(openF);
	await sleep(200);
	a.addListeners('click', closeF);
	await sleep(2000);
	a.removeListeners('click', closeF);
	a.setParrent(d);
	a.remove();
	a.setParrent(d);
	a.append();
}

