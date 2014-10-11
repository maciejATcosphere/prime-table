
define([], function () {

    var FADE_TIME = 500,
        OFFSET = 50;

    var ArrowView = function ($originEl) {
        this.$originEl = $originEl;

        this.$up = $('#app-up-arrow');
        this.$down = $('#app-down-arrow');
        this.$right = $('#app-right-arrow');
        this.$left = $('#app-left-arrow');
    };


    var toggleFade = function ($el, coordinates) {
        $el.stop()
           .fadeIn(FADE_TIME)
           .fadeOut(FADE_TIME)
           .css(coordinates);
    };


    var stop = function ($el) {
        $el.stop().hide();
    };


    ArrowView.prototype.show = function (direction) {
        var coordinates = this.$originEl.offset(),
            originTop = coordinates.top,
            originLeft = coordinates.left;

        if (direction === 'top-left') {
            stop(this.$down);
            stop(this.$right);
            toggleFade(this.$up, {top: originTop - OFFSET, left: originLeft});
            toggleFade(this.$left, {top: originTop, left: originLeft - OFFSET});
        } else if (direction === 'bottom-right') {
            stop(this.$up);
            stop(this.$left);
            toggleFade(this.$down, {top: originTop - OFFSET, left: originLeft});
            toggleFade(this.$right, {top: originTop, left: originLeft - OFFSET});
        }
    };


    return {ArrowView: ArrowView};
});