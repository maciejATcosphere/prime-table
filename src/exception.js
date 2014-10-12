
define([], function () {

    var InvalidInputException = function (message) {
        this.name = "InvalidInputException";
        this.message = message || (
            "provided input contains forbidden characters");
    }
    InvalidInputException.prototype = new Error();
    InvalidInputException.prototype.constructor = InvalidInputException;


    var LowerBoundReachedException = function (message) {
        this.name = "LowerBoundReachedException";
        this.message = message || (
            "provided input contains forbidden characters");
    }
    LowerBoundReachedException.prototype = new Error();
    LowerBoundReachedException.prototype.constructor = LowerBoundReachedException;


    var SlowUpdateException = function (message) {
        this.name = "SlowUpdateException";
        this.message = message || (
            "slow calcluation detected");
    }
    SlowUpdateException.prototype = new Error();
    SlowUpdateException.prototype.constructor = SlowUpdateException


    return {
        InvalidInputException: InvalidInputException,
        LowerBoundReachedException: LowerBoundReachedException,
        SlowUpdateException: SlowUpdateException,
    }
});