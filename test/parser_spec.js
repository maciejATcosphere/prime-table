
define(['underscore', 'parser'], function (_, parser) {

    describe('parser', function () {

        it('deals correctly with simple input', function () {

            var testCases = [
                {input: '20', expected: _.range(19, 29)},
                {input: '20/30', expected: [19].concat(_.range(29, 38))},
                {input: '30/20', expected: [19].concat(_.range(29, 38))},
                {
                    input: '20/30/41',
                    expected: [19, 29].concat(_.range(40, 48))
                },
                {
                    input: '30/20-24',
                    expected: _.range(19, 24).concat(_.range(29, 34))
                },
                {input: '18+', expected: _.range(17, 37)},
                {input: '20/34+', expected: [19].concat(_.range(33, 52))},
            ];

            testCases.forEach(function (testCase) {
                expect(
                    parser.parse(testCase.input)
                ).toEqual(testCase.expected);
            });
        });


        it('deals correctly with duplicates', function () {

            var testCases = [
                {input: '20/20', expected: _.range(19, 29)},
                {input: '30/20/20', expected: [19].concat(_.range(29, 38))},
                {input: '20/20-20', expected: _.range(19, 29)},
                {input: '20/20/20+', expected: _.range(19, 39)},
            ];

            testCases.forEach(function (testCase) {
                expect(
                    parser.parse(testCase.input)
                ).toEqual(testCase.expected);
            });
        });


        it('deals correctly with extra white characters input', function () {

            var testCases = [
                {input: '   20  ', expected: _.range(19, 29)},
                {
                        input: '  20  /  30/41',
                        expected: [19, 29].concat(_.range(40, 48))
                },
                {
                    input: '  30 / 20 -  24',
                    expected: _.range(19, 24).concat(_.range(29, 34))
                },
            ];

            testCases.forEach(function (testCase) {
                expect(
                    parser.parse(testCase.input)
                ).toEqual(testCase.expected);
            });
        });


        it('validates input and throws exception on unparsable input',
                function () {

            var testCases = [
                {
                    input: '20/30/aa',
                    expected: {
                        exception: parser.InvalidInputException,
                        msg: "provided input contain forbidden characters",
                    },
                },
            ];

            testCases.forEach(function (testCase) {
                expect(function() {
                    parser.parse(testCase.input);
                }).toThrow(
                    new testCase.expected.exception(testCase.expected.msg));

            });

        });

    });
});
