(window.webpackJsonp = window.webpackJsonp || []).push([
    [0],
    {
        './.docz/app/db.json': function(e) {
            e.exports = {
                config: {
                    title: 'Vivid Design Patterns',
                    description: 'My awesome app using docz',
                    menu: [],
                    ordering: 'descending',
                    version: '0.0.3',
                    repository: null,
                    native: !1,
                    codeSandbox: !0,
                    themeConfig: {
                        logo: { src: '//a.vsstatic.com/common/favicon/apple-touch-icon.png', width: 180 },
                        styles: { body: { fontFamily: "'Roboto', 'Arial', 'Helvetica', 'sans-serif" } }
                    },
                    port: 3636,
                    plugins: [{}],
                    base: './',
                    dest: 'server/static/'
                },
                entries: {
                    'docs/Intro.mdx': {
                        name: 'Intro',
                        route: '/',
                        id: '42d4703eaae8999746a5f63ed710b402',
                        filepath: 'docs/Intro.mdx',
                        link: null,
                        slug: 'docs-intro',
                        order: 0,
                        menu: null,
                        headings: []
                    },
                    'docs/Button/Button.mdx': {
                        name: 'Button',
                        id: 'b2ddc7640af882bf6de85bd6a34d7f58',
                        filepath: 'docs/Button/Button.mdx',
                        link: null,
                        slug: 'docs-button-button',
                        route: '/docs-button-button',
                        order: 0,
                        menu: null,
                        headings: [
                            { depth: 2, slug: 'basic-usage', value: 'Basic Usage' },
                            { depth: 2, slug: 'props', value: 'Props' },
                            { depth: 2, slug: 'attributes', value: 'Attributes' },
                            { depth: 3, slug: 'links', value: 'Links' },
                            { depth: 3, slug: 'sizing', value: 'Sizing' },
                            { depth: 3, slug: 'importance', value: 'Importance' },
                            { depth: 3, slug: 'grouped', value: 'Grouped' },
                            { depth: 3, slug: 'miscellaneous', value: 'Miscellaneous' }
                        ]
                    }
                }
            };
        },
        './.docz/app/index.jsx': function(e, o, n) {
            'use strict';
            n.r(o);
            var t = n('./node_modules/react/index.js'),
                d = n.n(t),
                s = n('./node_modules/react-dom/index.js'),
                i = n.n(s),
                u = n('./.docz/app/root.jsx'),
                a = [],
                l = [],
                r = function() {
                    return l.forEach(function(e) {
                        return e && e();
                    });
                },
                c = document.querySelector('#root');
            !(function() {
                var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : u.a;
                a.forEach(function(e) {
                    return e && e();
                }),
                    i.a.render(d.a.createElement(e, null), c, r);
            })(u.a);
        },
        './.docz/app/root.jsx': function(e, o, n) {
            'use strict';
            (function(e) {
                var t = n('./node_modules/react/index.js'),
                    d = n.n(t),
                    s = n('./node_modules/react-hot-loader/index.js'),
                    i = n('./node_modules/docz-theme-default/dist/index.m.js'),
                    u = function() {
                        return d.a.createElement(i.a, null);
                    };
                (o.a = Object(s.hot)(e)(u)), (u.__docgenInfo = { description: '', methods: [], displayName: 'Root' });
            }.call(this, n('./node_modules/webpack/buildin/harmony-module.js')(e)));
        },
        0: function(e, o, n) {
            n('./node_modules/docz/node_modules/react-dev-utils/webpackHotDevClient.js'),
                n('./node_modules/@babel/polyfill/lib/index.js'),
                (e.exports = n('./.docz/app/index.jsx'));
        }
    },
    [[0, 3, 4]]
]);
//# sourceMappingURL=app.9b9dadcf5c99487385be.js.map
