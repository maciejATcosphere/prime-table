
define(['exception'], function (exception) {

    var ErrorView = function ($el) {
        this.$el = $el;
    };


    /**
     * ...
     */
    ErrorView.prototype.observe = function (func) {
        var hasError = false;

        // func();
        try {
            func();
        } catch (e) {
            hasError = true;
            if (e instanceof exception.InvalidInputException) {
                this.$el.html(
                    '<i class="fi-alert alert-icon"></i> ' + e.message);
            } else if (
                (e instanceof exception.LowerBoundReachedException) ||
                (e instanceof exception.SlowUpdateException)
            ) {
                this.$el.html(
                    '<i class="fi-eye warning-icon"></i> ' + e.message);
            } else {
                console.log(e);
            }
        } finally {
            if (!hasError) {
                this.$el.html(
                    '<i class="fi-like normal-icon"></i> ' +
                    'Everything works nicely:-)');
            }
        }
    };


    return {ErrorView: ErrorView};
});