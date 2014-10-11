var tests = [];

for (var file in window.__karma__.files) {
    if (window.__karma__.files.hasOwnProperty(file)) {
        if (/spec\.js$/.test(file)) {
            tests.push(file);
        }
    }
}


requirejs.config({
    baseUrl: '/base/src',

    paths: {
        'jquery': '../lib/jquery.min',
        'underscore': '../lib/underscore.min',

        'engine': 'logic/engine',
        'parser': 'logic/parser',
        'primes': 'logic/primes',
        'layout': 'layout',
        'table': 'views/table',
        'arrow': 'src/views/arrow',
        'keyboard': 'utils/keyboard',
    },

    shim: {
        'underscore': {
            exports: '_'
        },
    },

    deps: tests,

    // start test run, once Require.js is done
    callback: window.__karma__.start
});