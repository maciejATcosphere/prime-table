
console.log('test');

requirejs.config({
    baseUrl: '',

    paths: {
        'jquery': '../lib/jquery.min',
        'underscore': '../lib/underscore.min',

        'engine': 'src/engine',
        'parser': 'src/parser',
        'layout': 'src/layout',
        'primes': 'src/primes',
    },

    shim: {
        'underscore': {
            exports: '_'
        },
    },

    deps: ['engine', 'layout'],
});