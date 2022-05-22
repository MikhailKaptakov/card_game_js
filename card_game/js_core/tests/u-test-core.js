UTIL_CORE.TEST = {};
UTIL_CORE.TEST.assert = function(actual, expected) {
    const result = (actual === expected);
    console.log(result);
    return result;
}
UTIL_CORE.TEST.assertError = function (action, expected =true) {
    try {
        action();
    } catch (e) {
        console.log(true === expected);
        return;
    }
    console.log(false === expected);
}
UTIL_CORE.TEST.assertArray = function (actualArray, expectedArray) {
    if (actualArray.length !== expectedArray.length) {
        throw Error('не совпадают размеры ожидаемого и актуального массива значений');
    }
    let result = true;
    for (let i = 0; i < actualArray.length; i++) {
        const currResult = GAME_CORE.TEST.assert(actualArray[i], expectedArray[i]);
        result = result && currResult;
    }
    return result;
}





