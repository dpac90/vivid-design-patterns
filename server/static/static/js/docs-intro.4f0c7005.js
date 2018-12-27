(window.webpackJsonp = window.webpackJsonp || []).push([
    [2],
    {
        './docs/Intro.mdx': function(e, o, t) {
            'use strict';
            t.r(o),
                t.d(o, 'default', function() {
                    return f;
                });
            t('./node_modules/core-js/modules/es7.symbol.async-iterator.js'),
                t('./node_modules/core-js/modules/es6.symbol.js'),
                t('./node_modules/core-js/modules/web.dom.iterable.js'),
                t('./node_modules/core-js/modules/es6.array.iterator.js'),
                t('./node_modules/core-js/modules/es6.object.keys.js'),
                t('./node_modules/core-js/modules/es6.object.set-prototype-of.js');
            var n = t('./node_modules/react/index.js'),
                r = t.n(n),
                s = t('./node_modules/@mdx-js/tag/dist/index.js');
            function c(e) {
                return (c =
                    'function' === typeof Symbol && 'symbol' === typeof Symbol.iterator
                        ? function(e) {
                              return typeof e;
                          }
                        : function(e) {
                              return e && 'function' === typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype
                                  ? 'symbol'
                                  : typeof e;
                          })(e);
            }
            function u(e, o) {
                if (null == e) return {};
                var t,
                    n,
                    r = (function(e, o) {
                        if (null == e) return {};
                        var t,
                            n,
                            r = {},
                            s = Object.keys(e);
                        for (n = 0; n < s.length; n++) (t = s[n]), o.indexOf(t) >= 0 || (r[t] = e[t]);
                        return r;
                    })(e, o);
                if (Object.getOwnPropertySymbols) {
                    var s = Object.getOwnPropertySymbols(e);
                    for (n = 0; n < s.length; n++)
                        (t = s[n]), o.indexOf(t) >= 0 || (Object.prototype.propertyIsEnumerable.call(e, t) && (r[t] = e[t]));
                }
                return r;
            }
            function i(e, o) {
                for (var t = 0; t < o.length; t++) {
                    var n = o[t];
                    (n.enumerable = n.enumerable || !1),
                        (n.configurable = !0),
                        'value' in n && (n.writable = !0),
                        Object.defineProperty(e, n.key, n);
                }
            }
            function a(e, o) {
                return !o || ('object' !== c(o) && 'function' !== typeof o)
                    ? (function(e) {
                          if (void 0 === e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
                          return e;
                      })(e)
                    : o;
            }
            function l(e) {
                return (l = Object.setPrototypeOf
                    ? Object.getPrototypeOf
                    : function(e) {
                          return e.__proto__ || Object.getPrototypeOf(e);
                      })(e);
            }
            function p(e, o) {
                return (p =
                    Object.setPrototypeOf ||
                    function(e, o) {
                        return (e.__proto__ = o), e;
                    })(e, o);
            }
            var f = (function(e) {
                function o(e) {
                    var t;
                    return (
                        (function(e, o) {
                            if (!(e instanceof o)) throw new TypeError('Cannot call a class as a function');
                        })(this, o),
                        ((t = a(this, l(o).call(this, e))).layout = null),
                        t
                    );
                }
                var t, n, c;
                return (
                    (function(e, o) {
                        if ('function' !== typeof o && null !== o)
                            throw new TypeError('Super expression must either be null or a function');
                        (e.prototype = Object.create(o && o.prototype, { constructor: { value: e, writable: !0, configurable: !0 } })),
                            o && p(e, o);
                    })(o, r.a.Component),
                    (t = o),
                    (n = [
                        {
                            key: 'render',
                            value: function() {
                                var e = this.props,
                                    o = e.components;
                                u(e, ['components']);
                                return r.a.createElement(
                                    s.MDXTag,
                                    { name: 'wrapper', components: o },
                                    r.a.createElement(s.MDXTag, { name: 'p', components: o }, 'Welcome to Vivid Design Patterns'),
                                    r.a.createElement(
                                        s.MDXTag,
                                        { name: 'p', components: o },
                                        'Here is a collection of components used across Vivid Seats Applications.'
                                    )
                                );
                            }
                        }
                    ]) && i(t.prototype, n),
                    c && i(t, c),
                    o
                );
            })();
            f.__docgenInfo = { description: '', methods: [], displayName: 'MDXContent' };
        }
    }
]);
//# sourceMappingURL=docs-intro.9b9dadcf5c99487385be.js.map
