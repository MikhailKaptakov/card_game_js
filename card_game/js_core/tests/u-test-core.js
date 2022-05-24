UTIL_CORE.TEST = {};
UTIL_CORE.TEST.assert = function(actual, expected) {
    const result = (actual === expected);
    console.log(result);
    return result;
};
UTIL_CORE.TEST.assertError = function (action, expected =true) {
    try {
        action();
    } catch (e) {
        console.log(true === expected);
        return;
    }
    console.log(false === expected);
};
UTIL_CORE.TEST.assertErrorWithArgs = function (action, actionArgs , expected =true) {
    try {
        action(...actionArgs);
    } catch (e) {
        console.log(true === expected);
        return;
    }
    console.log(false === expected);
};
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
};
UTIL_CORE.TEST.assertClassName = function(object, className) {
    const result = object.constructor.name === className;
    console.log(result);
    return result;
};

UTIL_CORE.TEST.assertArrayElementMethodsResult = function(objectsArray, arrowFuncToObjArg, expected) {
    let  res = true;
    for (const obj of objectsArray) {
        res = res && (arrowFuncToObjArg(obj) === expected);
    }
    UTIL_CORE.TEST.assert(res, true);
};
//todo написать класс для тестов
//todo написать тесты для классов и функций UTIL_CORE





