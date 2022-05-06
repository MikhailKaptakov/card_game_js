let a = new GAME_CORE.Card(0, 'c1', document.getElementById('gameField'));
eventF = function(obj){
	obj.closeCard();
	obj.setRandomRarity();
	obj.openCard();
}
const f = function(){eventF(a)}

run();

async function run() {
	const sleep = UTIL_CORE.sleep;
	a.appendCard();
	a.setRarity(5);
	a.openCard();
	await sleep(1000);
	a.setRandomRarity();
	await sleep(1000);
	a.updateCard();
	await sleep(1000);
	a.closeCard();
	await sleep(1000);
	a.setRandomRarity();
	a.updateCard();
	await sleep(1000);
	a.closeCard();
	console.log('run test action')
	a.setEventListener('click', f, false);
	await sleep(10000);
	a.removeEventListener('click', f);
}