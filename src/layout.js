
define([
    'jquery',
    'underscore',
    'parser',
    'engine',
    'primes',
    'table',
    'arrow',
    'keyboard'
], function ($, _, parser, engine, primes, table, arrow, kb) {

    var App = function ($inputEl, $outputEl) {
        this.arrowView = new arrow.ArrowView($('#app-output'));
        this.primeEngine = new engine.Engine(primes);

        // main + initialize
        this.visiblePrimesIndx = parser.parse($inputEl.val()) || [];
        this.visiblePrimes = this.primeEngine.initialize(
            this.visiblePrimesIndx) || [];

        this.tableView = new table.TableView(this.visiblePrimes, $outputEl);

        // events
        var that = this;
        $inputEl.on('keydown', function (event) {

            var $this = $(this),
                keyCode = event.which;

            if (kb.isEnter(keyCode)) {
                event.stopPropagation();
                that.visiblePrimesIndx = parser.parse($this.val());

                that.visiblePrimes = _.map(that.visiblePrimesIndx, function (idx) {
                    return primes[idx];
                });

console.log(that.visiblePrimes);

                that.tableView = new table.TableView(that.visiblePrimes, $outputEl);
                // that.tableView.update(that.visiblePrimes);
            }
        });


        $('body').on('keydown', function (event) {
            // FIXME use jquery hotkeys or something else to make CTRL + operations

            var keyCode = event.which;

            if (kb.isLeft(keyCode) || kb.isUp(keyCode)) {
                // FIXME: get rid of duplicates
                that.arrowView.show('top-left');
                that.visiblePrimesIndx.pop();
                that.visiblePrimesIndx.unshift(
                    _.first(that.visiblePrimesIndx) - 1);
                event.preventDefault();
            } else if (kb.isDown(keyCode) || kb.isRight(keyCode)) {

                that.arrowView.show('bottom-right');
                that.visiblePrimesIndx.shift();
                that.visiblePrimesIndx.push(
                    _.last(that.visiblePrimesIndx) + 1);
                event.preventDefault();
            }

            that.visiblePrimes = _.map(that.visiblePrimesIndx, function (idx) {
                return primes[idx];
            });

            that.tableView.update(that.visiblePrimes);
        });
    };

    new App($('#app-input'), $('#app-output'));
});
