
define(['underscore'], function (_) {
    var exports = {},
        DEFAULT_LENGTH = 10,
        MAX_LENGTH = 20,
        rangePattern = new RegExp(/^(\d+)-(\d+)$/),
        expandPattern = new RegExp(/^(\d+)\+$/),
        inputPattern = new RegExp(/^\d+[\/\d\-]*(\d+|\+)$/);


    exports.parse = function (rawInput) {

        var input = removeSpace(rawInput),
            len,
            parsed = [];

        if (!inputPattern.test(input)) {
            throw new InvalidInputException();
        }

        input = input.split('/');
        len = input.length;

        parsed =  _.flatten(
            _.map(input, function (token, i) {
                var match;

                // expand pattern
                if (i === len - 1) {
                    match = expandPattern.exec(token);

                    if (match) {
                        return _.range(
                            parseInt(match[1]),
                            parseInt(match[1]) + MAX_LENGTH);
                    }
                }

                // range pattern
                match = rangePattern.exec(token);
                if (match) {
                    return _.range(
                        parseInt(match[1]),
                        parseInt(match[2]) + 1);
                }

                return parseInt(token);
            })
        ).sort();


        // get rid of duplicates
        parsed = _.uniq(parsed);

        // FIXME move to seperate function -> regres to default
        len = parsed.length;

        if (len < DEFAULT_LENGTH) {
            var min = parsed[len - 1] + 1,
                max = parsed[len - 1] + DEFAULT_LENGTH - len + 1

            return parsed.concat(_.range(min, max));
        }

        return parsed.slice(0, MAX_LENGTH);
    };


    // FIXME clean up exceptions
    var InvalidInputException = function (message) {
        this.name = "InvalidInputException";
        this.message = message || (
            "provided input contain forbidden characters");
    }

    InvalidInputException.prototype = new Error();
    InvalidInputException.prototype.constructor = InvalidInputException;
    exports.InvalidInputException = InvalidInputException;


    var removeSpace = function (token) {
        return token.replace(/\s+/g, '');
    };


    return exports
});
