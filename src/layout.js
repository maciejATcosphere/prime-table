
define([
    'jquery',
    'underscore',
    'parser',
    'primes'
], function ($, _, parser, primes) {

    var visiblePrimes = [], visiblePrimesIndx = [];

    // FIXME should go to keyboard module!!!
    var isEnter = function (keyCode) { return parseInt(keyCode) === 13; };
    var isRight = function (keyCode) { return parseInt(keyCode) === 39; };
    var isLeft = function (keyCode) { return parseInt(keyCode) === 37; };
    var isUp = function (keyCode) { return parseInt(keyCode) === 38; };
    var isDown = function (keyCode) { return parseInt(keyCode) === 40; };

    // FIXME move to parseVIew
    var $input = $('#app-input');
    $input.on('keydown', function (event) {
        event.stopPropagation();

        var $this = $(this),
            keyCode = event.which;

        if (isEnter(keyCode)) {
            visiblePrimesIndx = parser.parse($this.val());

            visiblePrimes = _.map(visiblePrimesIndx, function (idx) {
                return primes[idx];
            });

            tableView.update(visiblePrimes.slice(0, 10));
        }
    });

    // FIXME moev to tableView
    $('body').on('keydown', function (event) {
        var rowIdx = tableView.activeCell.rowIdx,
            colIdx = tableView.activeCell.colIdx,
            keyCode = event.which;

        if (isLeft(keyCode) || isUp(keyCode)) {
            visiblePrimesIndx.pop();
            visiblePrimesIndx.unshift(_.first(visiblePrimesIndx) - 1);
        } else if (isDown(keyCode) || isRight(keyCode)) {
            visiblePrimesIndx.shift();
            visiblePrimesIndx.push(_.last(visiblePrimesIndx) + 1);
        }

        visiblePrimes = _.map(visiblePrimesIndx, function (idx) {
            return primes[idx];
        });

// console.log('indices', visiblePrimesIndx, 'primes', visiblePrimes.slice(0, 10));
        tableView.update(visiblePrimes.slice(0, 10));
        // tableView.updateSelection(rowIdx, colIdx);
    });

    var activeCol, activeRow;
    $('body').on('click', '.app-cell', function (event) {
        var $this = $(this);

        actRowIdx = $this.data('rowIdx');
        actColIdx = $this.data('colIdx');

        tableView.updateSelection(actRowIdx, actColIdx);
    });

    // FIXME make class out of it
    var TableView = function (values) {
        this.$el = $('#app-output'),
        this.$el.html('');

        this.activeCell = {
            rowIdx: Math.round(values.length / 2),
            colIdx: Math.round(values.length / 2),
        };
        this.domCache = this.initilize(values);

        // thia.updateSelection(actRowIdx, actColIdx);
    };


    TableView.prototype.initilize = function (values) {
        var cache = {table: {}, cols: [], rows: []},
            $row, $col, $cell, i, j, len = values.length;

        $colGroup = $('<colgroup></colgroup>');
        this.$el.append($colGroup);

        for (i = 0; i < len; i++) {
            cache.table[i] = {};
            $row = $('<tr></tr>');

            cache.rows.push($row);

            for (j = 0; j < len; j++) {
                if (j == 0) {
                    $col = $('<col>');
                    cache.cols.push($col);
                    $colGroup.append($col);
                }
                $cell = $('<td></td>')
                    .addClass('app-cell')
                    .data('rowIdx', i)
                    .data('colIdx', j);

                cache.table[i][j] = $cell;

                $cell.html(values[i] * values[j]);

                $row.append($cell);
            }

            this.$el.append($row);
        }

        return cache;
    };


    TableView.prototype.updateSelection = function (actRowIdx, actColIdx) {
        this.domCache.rows[this.activeCell.rowIdx].removeClass('active');
        this.domCache.cols[this.activeCell.colIdx].removeClass('active');
        this.domCache.table[this.activeCell.rowIdx][this.activeCell.colIdx].removeClass(
            'active-cell');

        this.activeCell.rowIdx = actRowIdx;
        this.activeCell.colIdx = actColIdx;

        this.domCache.rows[this.activeCell.rowIdx].addClass('active');
        this.domCache.cols[this.activeCell.colIdx].addClass('active');
        this.domCache.table[this.activeCell.rowIdx][this.activeCell.colIdx].addClass('active-cell');
    };


    TableView.prototype.update = function (values) {
        var i, j, len = values.length;

        for (i = 0; i < len; i++) {
            for (j = 0; j < len; j++) {
                this.domCache.table[i][j].html(values[i] * values[j]);
            }
        }
    };

    var tableView = new TableView(primes.slice(0, 10));

    // setTimeout(function () {
    //     tableView.update(primes.slice(10, 20));
    // }, 1000);

    // setTimeout(function () {
    //     tableView.update(primes.slice(20, 30));
    // }, 2000);
});
