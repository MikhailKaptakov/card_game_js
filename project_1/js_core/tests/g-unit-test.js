const b = document.getElementById('gameField');
const d = document.body;
let a = new GAME_CORE.Unit('b', b, 'BigU');
let c = new GAME_CORE.Unit('d', d, 'SMALLu');

const openF = function(){this.openCard();};
const closeF = function(obj){obj.closeCard();};
const sleep = UTIL_CORE.sleep;
run();


async function run() {
	a.append();
	a.appendAll();
	await sleep(200);
	c.appendAll();
	c.append();
	await sleep(200);
	c.remove();
	c.setParrent(d);
	c.append()
	await sleep(200);
	
	for (let i = 0; i < 20; i++) {
		await UTIL_CORE.sleep(400);
		const aini = a.getInitiative();
		const cini = c.getInitiative()
		if (aini < cini) {
			c.atack(a);
		} else if (aini > cini){
			a.atack(c);
		} else {
			a.say('Так и будем кружиться?');
			await UTIL_CORE.sleep(400);
			c.say('Ну может начнём?');
		}
		if (a.currentHealth.value < 0) {
			a.beHealed(300);
			a.updateAll();
		}
		if (c.currentHealth.value < 0) {
			a.beAllHealed();
		}
		await UTIL_CORE.sleep(400);
	}
	a.removeAll();
}

