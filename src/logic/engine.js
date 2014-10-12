
define(['underscore', 'primes'], function (_, primes) {
    var exports = {};


    var Engine = function (primes, maxCacheSize) {
        this.cache = primes || [2, 3];
        this.maxCacheSize = maxCacheSize || 1.0;
    };


    /**
     * Initializes cache with the sequence of prime numbers up to largest
     * index passed in the indices array.
     */
    Engine.prototype.initialize = function (indices) {
        var maxIndex = _.max(indices),
            candidate = _.last(this.cache) + 2;

        while (this.cache.length < maxIndex + 1) {
            if (this.isPrime(candidate)) {
                this.cache.push(candidate);
            }

            candidate += 2;
        }

        return _.map(indices, function (index) {
            return this.cache[index];
        }, this);
    };


    /**
     * Tests whether number provided is prime.
     *
     * This method assumes that all necessary divisor (up to square root of the
     * number being tested) are already present in the cache. In other words
     * that's not generic primacy tester method but rather method customized
     * for sequence generator.
     */
    Engine.prototype.isPrime = function (number) {
        var i, len, divisor;

        for (i = 0, len = this.cache.length; i < len; i++) {
            divisor = this.cache[i];
            if (divisor <= Math.sqrt(number) && number % divisor == 0) {
                return false;
            }
        }

        return true;
    };


    /**
     * Returns next consecutive prime number.
     *
     * It starts with the largest prime stored in cache and iterates through
     * all of the candidates till the right value is found. If the value is
     * already in cache it's returned immediately.
     */
    Engine.prototype.nextPrime = function (leftPrimeIndex) {
        if (this.cache[leftPrimeIndex + 1] !== undefined) {
            return this.cache[leftPrimeIndex + 1];
        }

        var candidate = this.cache[leftPrimeIndex] + 2;

        while (!this.isPrime(candidate)) { candidate += 2; }

        this.cache.push(candidate);
        return candidate;
    };


    /**
     * Returns prime number that's on the right of prime
     * (indexed by rightPrimeIndex) passed to the method.
     *
     * Since this method slides backwards on numerical axis it uses
     * only the cache and it's purely retrieval based, therefore it's
     * computational complexity is negligible.
     */
    Engine.prototype.previousPrime = function (rightPrimeIndex) {
        return this.cache[rightPrimeIndex - 1];
    };


    /**
     * States whether the current cache size is too big
     */
    Engine.prototype.isCacheTooBig = function () {
        return (8 * this.cache.length / Math.pow(1024, 2)) > this.maxCacheSize;
    };


    return {Engine: Engine};
});
