
define(['underscore', 'parser'], function (_, parser) {

    describe('parser', function () {

        it('deals correctly with simple input', function () {

            var testCases = [
                {input: '20', expected: _.range(20, 30)},
                {input: '20/30', expected: [20].concat(_.range(30, 39))},
                {input: '30/20', expected: [20].concat(_.range(30, 39))},
                {input: '20/30/41', expected: [20, 30].concat(_.range(41, 49))},
                {input: '30/20-24', expected: _.range(20, 25).concat(_.range(30, 35))},
                {input: '  30 / 20 -  24', expected: _.range(20, 25).concat(_.range(30, 35))},
                {input: '18+', expected: _.range(18, 38)},
                {input: '20/34+', expected: [20].concat(_.range(34, 53))},
            ];

            testCases.forEach(function (testCase) {
                expect(
                    parser.parse(testCase.input)
                ).toEqual(testCase.expected);
            });
        });


        it('deals correctly with duplicates', function () {

            var testCases = [
                {input: '20/20', expected: _.range(20, 30)},
                {input: '30/20/20', expected: [20].concat(_.range(30, 39))},
                {input: '20/20-20', expected: _.range(20, 30)},
                {input: '20/20/20+', expected: _.range(20, 40)},
            ];

            testCases.forEach(function (testCase) {
                expect(
                    parser.parse(testCase.input)
                ).toEqual(testCase.expected);
            });
        });


        it('deals correctly with extra white characters input', function () {

            var testCases = [
                {input: '   20  ', expected: _.range(20, 30)},
                {input: '  20  /  30/41', expected: [20, 30].concat(_.range(41, 49))},
                {input: '  30 / 20 -  24', expected: _.range(20, 25).concat(_.range(30, 35))},
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
