
define([], function () {

    return {
        isEnter: function (keyCode) { return parseInt(keyCode) === 13; },
        isRight: function (keyCode) { return parseInt(keyCode) === 39; },
        isLeft: function (keyCode) { return parseInt(keyCode) === 37; },
        isUp: function (keyCode) { return parseInt(keyCode) === 38; },
        isDown: function (keyCode) { return parseInt(keyCode) === 40; },
    };
});
