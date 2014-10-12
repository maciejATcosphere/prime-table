
define(['underscore', 'engine', 'primes'], function(_, e, primes) {

    describe('engine', function() {

        it('correctly judges if the number is prime', function () {
            var testCases = [
                {primes: [2, 3], number: 5, expected: true},
                {primes: [2, 3], number: 6, expected: false},
                {primes: [2, 3, 5, 7, 9], number: 11, expected: true},
                {primes: [2, 3, 5, 7, 9], number: 12, expected: false},
                {primes: [2, 3, 5, 7, 9, 11], number: 13, expected: true},
                {primes: [2, 3, 5, 7, 9, 11, 13], number: 15, expected: false},
                {primes: [2, 3, 5, 7, 9, 11, 13, 17], number: 25, expected: false},
            ]

            testCases.forEach(function (testCase) {
                var engine = new e.Engine(testCase.primes);

                expect(
                    engine.isPrime(testCase.number)
                ).toEqual(testCase.expected);
            });

        });


        it('correctly calculates initial set of primes when tested with ' +
            'randomized data', function() {

            var testCases = [
                {
                    indices: [465, 471, 479, 719, 788],
                    expected: [3313, 3347, 3413, 5443, 6047],
                },
                {
                    indices: [35, 112, 343, 518, 638],
                    expected: [151, 617, 2311, 3719, 4733],
                },
                {
                    indices: [94, 358, 571, 984, 990],
                    expected: [499, 2417, 4157, 7759, 7841],
                },
                {
                    indices: [210, 363, 567, 797, 848],
                    expected: [1297, 2459, 4129, 6121, 6569],
                },
                {
                    indices: [543, 571, 622, 649, 946],
                    expected: [3923, 4157, 4603, 4831, 7481],
                },
            ]


            testCases.forEach(function (testCase) {
                var engine = new e.Engine();

                expect(
                    engine.initialize(testCase.indices)
                ).toEqual(testCase.expected);
            });
        });


        it('correctly calculates initial set of primes using precomputed ' +
            'cache when tested with randomized data', function() {

            var testCases = [
                {
                    indices: [5, 175, 257, 812, 851],
                    expected: [13, 1049, 1627, 6257, 6581],
                },
                {
                    indices: [435, 587, 640, 672, 858],
                    expected: [3041, 4283, 4759, 5021, 6661],
                },
                {
                    indices: [284, 301, 359, 565, 896],
                    expected: [1867, 1997, 2423, 4111, 6977],
                },
                {
                    indices: [239, 243, 607, 634, 983],
                    expected: [1511, 1549, 4481, 4703, 7757],
                },
                {
                    indices: [362, 363, 449, 626, 862],
                    expected: [2447, 2459, 3181, 4643, 6691],
                },
            ]


            testCases.forEach(function (testCase) {
                var engine = new e.Engine(primes);

                // verify that all values come from cache
                spyOn(engine, 'isPrime');

                expect(
                    engine.initialize(testCase.indices)
                ).toEqual(testCase.expected);

                expect(engine.isPrime).not.toHaveBeenCalled();
            });
        });


        it('correctly returns 1000th - 2000th primes directly from the cache',
                function() {

            primes.slice(1000, 2000).forEach(function (prime, i) {
                var engine = new e.Engine(primes);

                // verify that all values come from cache
                spyOn(engine, 'isPrime');

                expect(
                    engine.nextPrime(i + 999)
                ).toEqual(prime);

                expect(engine.isPrime).not.toHaveBeenCalled();
            });
        });


        it('correctly calculates 1000th - 2000th primes', function() {
            var engine = new e.Engine(primes.slice(0, 1000));

            primes.slice(1000, 2000).forEach(function (prime, i) {
                expect(
                    engine.nextPrime(i + 999)
                ).toEqual(prime);
            });
        });


        it('correctly returns previous prime number', function() {

            var testCases = [
                {rightPrimeIndex: 2, expected: 3},
                {rightPrimeIndex: 5, expected: 11},
                {rightPrimeIndex: 1159, expected: 9371},
                {rightPrimeIndex: 4733, expected: 45673},
                {rightPrimeIndex: 5937, expected: 58687},
                {rightPrimeIndex: 8219, expected: 84317},
                {rightPrimeIndex: 8246, expected: 84629},
            ]

            var engine = new e.Engine(primes);

            testCases.forEach(function (testCase) {
                expect(
                    engine.previousPrime(testCase.rightPrimeIndex)
                ).toEqual(testCase.expected);
            });
        });


        it('says if cache is too big', function () {
            var testCases = [
                {cache: [], expected: false},
                {
                    cache: [1],
                    maxCacheSize: 7 / Math.pow(1024, 2),
                    expected: true,
                },
                {
                    cache: [1],
                    maxCacheSize: 8 / Math.pow(1024, 2),
                    expected: false,
                },
                {
                    cache: new Array(10),
                    maxCacheSize: 80 / Math.pow(1024, 2),
                    expected: false,
                },
                {
                    cache: new Array(10),
                    maxCacheSize: 79 / Math.pow(1024, 2),
                    expected: true,
                },
            ]

            testCases.forEach(function (testCase) {
                var engine = new e.Engine(
                    testCase.cache, testCase.maxCacheSize);
                expect(
                    engine.isCacheTooBig()
                ).toEqual(testCase.expected);
            });
        });
    });

});