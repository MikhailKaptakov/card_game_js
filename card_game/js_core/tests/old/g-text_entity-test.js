let a = new GAME_CORE.TextEntity('txent', document.getElementById('gameField'), 'value');
run();

function run() {
	a.append();
	a.remove();
	a.append();
	a.updateValue('new Value');
	a.remove();
	a.setParrent(document.getElementById('p1c9'));
	a.append();
	a.value = 'new new value';
	a.updateView();
	a.setParrent(document.getElementById('gameField'));
	a.remove();
	a.setParrent(document.getElementById('gameField'));
	a.append();
}

