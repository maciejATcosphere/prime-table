
define(['underscore', 'exception'], function (_, exception) {

    var parse = function (rawInput) {
        var DEFAULT_LENGTH = 10,
            MAX_LENGTH = 20,
            rangePattern = new RegExp(/^(\d+)-(\d+)$/),
            expandPattern = new RegExp(/^(\d+)\+$/),
            inputPattern = new RegExp(/^\d+[\/\d\-]*(\d+|\+)$/),
            input = removeSpace(rawInput),
            len,
            start, stop,
            parsed = [];

        // validation
        if (!inputPattern.test(input)) {
            throw new exception.InvalidInputException();
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
                            parseInt(match[1]) - 1,
                            parseInt(match[1]) + MAX_LENGTH - 1);
                    }
                }

                // range pattern
                match = rangePattern.exec(token);
                if (match) {
                    start = parseInt(match[1]);
                    stop = parseInt(match[2]);
                    if (start > stop) {
                        throw new exception.InvalidInputException(
                            'provided input contains invalid rule ' + token);
                    }
                    return _.range(start - 1, stop);
                }

                return parseInt(token) - 1;
            })
        ).sort();

        // get rid of duplicates
        parsed = _.uniq(parsed);

        len = parsed.length;
        if (len < DEFAULT_LENGTH) {
            var min = parsed[len - 1] + 1,
                max = parsed[len - 1] + DEFAULT_LENGTH - len + 1

            return parsed.concat(_.range(min, max));
        }

        return parsed.slice(0, MAX_LENGTH);
    };


    var removeSpace = function (token) {
        return token.replace(/\s+/g, '');
    };

    return {parse: parse};
});
