const GAME_CORE = {};
//todo - выделить класс коллекции и унаследовать от него RarityCollection, CardTypeCollection, ModificatorCollection


//todo - заменить GAME_CORE.Appender на UTIL_CORE.EntityView

GAME_CORE.Price = class Price {
    constructor (buy, sell){
        this.buy = buy;
        this.sell = sell;
    }
};

GAME_CORE.StatSet =  class StatSet  {
    constructor (health=0, damage=0, luck=0, dodge=0) {
        this.health = health;
        this.damage = damage;
        this.luck = luck;
        this.dodge = dodge;
    }

    cloneThis() {return new GAME_CORE.StatSet(this.health,this.damage,this.luck,this.dodge);}

    // по умолчанию возвращают значение, но могут быть изменены
    getHealth(args =undefined) {return this.health}
    getDamage(args =undefined) {return this.damage}
    getLuck(args =undefined) {return this.luck}
    getDodge(args =undefined) {return this.dodge}
};


