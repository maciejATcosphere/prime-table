
requirejs.config({
    baseUrl: '',

    paths: {
        'jquery': 'lib/jquery.min',
        'underscore': 'lib/underscore.min',

        'engine': 'src/logic/engine',
        'parser': 'src/logic/parser',
        'primes': 'src/logic/primes',
        'keyboard': 'src/utils/keyboard',
        'table': 'src/views/table',
        'arrow': 'src/views/arrow',
        'error': 'src/views/error',
        'exception': 'src/exception',
        'app': 'src/app',
    },

    shim: {
        'underscore': {
            exports: '_'
        },
        'jquery-hotkeys': {
            exports: '$',
            deps: ['jquery'],
        },
    },

    deps: ['app'],
});