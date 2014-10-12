
define([
    'jquery',
    'underscore',
    'parser',
    'engine',
    'primes',
    'table',
    'arrow',
    'error',
    'keyboard',
    'exception',
], function (
    $, _, parser, engine, primes, table, arrow, error, kb, exception) {

    var App = function ($inputEl, $outputEl, errorView) {
        this.$inputEl = $inputEl;
        this.$outputEl = $outputEl;
        this.errorView = errorView;

        var that = this;
        this.errorView.observe(function () {
            that.arrowView = new arrow.ArrowView($outputEl);
            that.primeEngine = new engine.Engine(primes);

            that.visiblePrimesIndx = parser.parse($inputEl.val()) || [];
            that.visiblePrimes = that.primeEngine.initialize(
                that.visiblePrimesIndx) || [];

            that.tableView = new table.TableView(
                that.visiblePrimes, $outputEl);
        });
    };


    App.prototype.initialize = function () {
        var that = this;
        this.$inputEl.on('keydown', function (event) {
            var $this = $(this),
                keyCode = event.which;

            that.errorView.observe(function () {
                if (kb.isEnter(keyCode)) {

                    event.stopPropagation();
                    that.visiblePrimesIndx = parser.parse($this.val());
                    that.visiblePrimes = that.primeEngine.initialize(
                        that.visiblePrimesIndx) || [];
                    that.tableView = new table.TableView(
                        that.visiblePrimes, that.$outputEl);
                }
            });
        });


        $(document).on('keydown', function (event) {
            var keyCode = event.which;

            that.errorView.observe(function () {
                if (event.ctrlKey &&
                    (kb.isLeft(keyCode) || kb.isUp(keyCode))) {

                    var firstIdx = _.first(that.visiblePrimesIndx);

                    if (firstIdx <= 1) {
                        throw new exception.LowerBoundReachedException();
                    }

                    that.arrowView.show('top-left');

                    that.visiblePrimes.pop();
                    that.visiblePrimes.unshift(
                        that.primeEngine.previousPrime(firstIdx));

                    that.visiblePrimesIndx.pop();
                    that.visiblePrimesIndx.unshift(firstIdx - 1);

                } else if (event.ctrlKey &&
                    (kb.isDown(keyCode) || kb.isRight(keyCode))) {

                    var lastIdx = _.last(that.visiblePrimesIndx);

                    if (that.primeEngine.isCacheTooBig() &&
                        lastIdx + 1 >= that.primeEngine.cache.length) {
                        throw new exception.CacheTooBigException(
                            that.primeEngine.maxCacheSize);
                    }

                    that.arrowView.show('bottom-right');

                    that.visiblePrimes.shift();
                    that.visiblePrimes.push(
                        that.primeEngine.nextPrime(lastIdx));

                    that.visiblePrimesIndx.shift();
                    that.visiblePrimesIndx.push(lastIdx + 1);
               }

                that.tableView.update(that.visiblePrimes);

            });
        });
    };

    // quick help manager
    $('#app-help-button').on('click', function () {
        var $this = $(this),
            $el = $('#app-help'),
            SLIDE_TIME = 1000;

        if ($this.data('shown')) {
            $el.slideUp(SLIDE_TIME);
            $this.text('show help');
            $this.data('shown', false);
        } else {
            $el.slideDown(SLIDE_TIME);
            $this.text('hide help');
            $this.data('shown', true);
        }

    });

    var errorView = new error.ErrorView($('#app-monitor-display'));
    var app = new App($('#app-input'), $('#app-output'), errorView);
    app.initialize();
});
