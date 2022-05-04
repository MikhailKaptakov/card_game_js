let a = new GAME_CORE.Equipment('txent', document.getElementById('gameField'));
run();

async function run() {
	console.log('HP ' + a.returnHealthBonus());
	console.log('DMG ' + a.returnDamageBonus());
	console.log('LCK ' + a.returnLuckBonus());
	console.log('DDG ' + a.returnDodgeBonus());
	a.append();
	a.appendCards();
	a.openCards();
	await UTIL_CORE.sleep(1000);
	a.closeCards();
	for (let i = 0; i < 4; i++) {
		a.getEguipByNumber(i).setRandomRarity();
		console.log('i ' + a.returnBonus(i));
	}
	await UTIL_CORE.sleep(1000);
	a.openCards();
	console.log('HP ' + a.returnHealthBonus());
	console.log('DMG ' + a.returnDamageBonus());
	console.log('LCK ' + a.returnLuckBonus());
	console.log('DDG ' + a.returnDodgeBonus());
	await UTIL_CORE.sleep(3000);
	a.setParrent(document.getElementById('pl2'));
	a.remove();
	a.setParrent(document.getElementById('pl2'));
	a.append();
}






