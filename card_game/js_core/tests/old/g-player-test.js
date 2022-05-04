const b = document.getElementById('gameField');
const c = new GAME_CORE.Player('pl', b, 'name');
const d = document.body;

c.append();
c.money.updateValue('15000');
c.appendAll();
c.setParrent(d);
c.remove();
c.setParrent(d);
c.append();