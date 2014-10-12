
define([], function () {

    /**
     * Generator function which returns KeyCode discrimination function.
     */
    var isKeyCodeFun = function (targetKeyCode) {
        return function (keyCode) {
            return parseInt(keyCode) === targetKeyCode;
        }
    };

    return {
        isEnter: isKeyCodeFun(13),
        isRight: isKeyCodeFun(39),
        isLeft: isKeyCodeFun(37),
        isUp: isKeyCodeFun(38),
        isDown: isKeyCodeFun(40),
    };
});
