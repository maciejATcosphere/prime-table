
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

    // FIXME move to parseVIew
    var $input = $('#app-input'),
        arrowView = new arrow.ArrowView($('#app-output'));

    $input.on('keydown', function (event) {

        var $this = $(this),
            keyCode = event.which;

        if (kb.isEnter(keyCode)) {
            event.stopPropagation();
            visiblePrimesIndx = parser.parse($this.val());

            visiblePrimes = _.map(visiblePrimesIndx, function (idx) {
                return primes[idx];
            });

            tableView.update(visiblePrimes.slice(0, 10));
        }
    });

    var visiblePrimes = [], visiblePrimesIndx = [];

    // FIXME moev to tableView
    $('body').on('keydown', function (event) {
        // FIXME use jquery hotkeys or something else to make CTRL + operations

        var keyCode = event.which;


        if (kb.isLeft(keyCode) || kb.isUp(keyCode)) {
            // FIXME: get rid of duplicates
            event.preventDefault();

            arrowView.show('top-left');
            visiblePrimesIndx.pop();
            visiblePrimesIndx.unshift(_.first(visiblePrimesIndx) - 1);
        } else if (kb.isDown(keyCode) || kb.isRight(keyCode)) {

            arrowView.show('bottom-right');
            visiblePrimesIndx.shift();
            visiblePrimesIndx.push(_.last(visiblePrimesIndx) + 1);
            event.preventDefault();
        }

        visiblePrimes = _.map(visiblePrimesIndx, function (idx) {
            return primes[idx];
        });

console.log('tableView', tableView);
console.log('indices', visiblePrimesIndx, 'primes', visiblePrimes.slice(0, 10));
        tableView.update(visiblePrimes.slice(0, 10));
    });

    // main
    visiblePrimesIndx = parser.parse($input.val());
    var primeEngine = new engine.Engine(primes);
    var tableView = new table.TableView(
        primeEngine.initialize(visiblePrimesIndx), $('#app-output'));
});
