/*!
 * https://github.com/es-shims/es5-shim
 * @license es5-shim Copyright 2009-2015 by contributors, MIT License
 * see https://github.com/es-shims/es5-shim/blob/master/LICENSE
 */
function isArray(t) {
    return Boolean(t && "undefined" != typeof t.length)
}

function noop() {}

function bind(t, e) {
    return function() {
        t.apply(e, arguments)
    }
}

function Promise(t) {
    if (!(this instanceof Promise)) throw new TypeError("Promises must be constructed via new");
    if ("function" != typeof t) throw new TypeError("not a function");
    this._state = 0, this._handled = !1, this._value = void 0, this._deferreds = [], doResolve(t, this)
}

function handle(t, e) {
    for (; 3 === t._state;) t = t._value;
    return 0 === t._state ? void t._deferreds.push(e) : (t._handled = !0, void Promise._immediateFn(function() {
        var n = 1 === t._state ? e.onFulfilled : e.onRejected;
        if (null === n) return void(1 === t._state ? resolve : reject)(e.promise, t._value);
        var r;
        try {
            r = n(t._value)
        } catch (o) {
            return void reject(e.promise, o)
        }
        resolve(e.promise, r)
    }))
}

function resolve(t, e) {
    try {
        if (e === t) throw new TypeError("A promise cannot be resolved with itself.");
        if (e && ("object" == typeof e || "function" == typeof e)) {
            var n = e.then;
            if (e instanceof Promise) return t._state = 3, t._value = e, void finale(t);
            if ("function" == typeof n) return void doResolve(bind(n, e), t)
        }
        t._state = 1, t._value = e, finale(t)
    } catch (r) {
        reject(t, r)
    }
}

function reject(t, e) {
    t._state = 2, t._value = e, finale(t)
}

function finale(t) {
    2 === t._state && 0 === t._deferreds.length && Promise._immediateFn(function() {
        t._handled || Promise._unhandledRejectionFn(t._value)
    });
    for (var e = 0, n = t._deferreds.length; e < n; e++) handle(t, t._deferreds[e]);
    t._deferreds = null
}

function Handler(t, e, n) {
    this.onFulfilled = "function" == typeof t ? t : null, this.onRejected = "function" == typeof e ? e : null, this.promise = n
}

function doResolve(t, e) {
    var n = !1;
    try {
        t(function(t) {
            n || (n = !0, resolve(e, t))
        }, function(t) {
            n || (n = !0, reject(e, t))
        })
    } catch (r) {
        if (n) return;
        n = !0, reject(e, r)
    }
}! function(t, e) {
    "use strict";
    "function" == typeof define && define.amd ? define(e) : "object" == typeof exports ? module.exports = e() : t.returnExports = e()
}(this, function() {
    var t, e, n = Array,
        r = n.prototype,
        o = Object,
        i = o.prototype,
        a = Function,
        s = a.prototype,
        u = String,
        l = u.prototype,
        c = Number,
        f = c.prototype,
        p = r.slice,
        h = r.splice,
        d = r.push,
        y = r.unshift,
        v = r.concat,
        g = r.join,
        m = s.call,
        b = s.apply,
        _ = Math.max,
        w = Math.min,
        T = i.toString,
        E = "function" == typeof Symbol && "symbol" == typeof Symbol.toStringTag,
        x = Function.prototype.toString,
        C = /^\s*class /,
        k = function(t) {
            try {
                var e = x.call(t),
                    n = e.replace(/\/\/.*\n/g, ""),
                    r = n.replace(/\/\*[.\s\S]*\*\//g, ""),
                    o = r.replace(/\n/gm, " ").replace(/ {2}/g, " ");
                return C.test(o)
            } catch (i) {
                return !1
            }
        },
        S = function(t) {
            try {
                return !k(t) && (x.call(t), !0)
            } catch (e) {
                return !1
            }
        },
        j = "[object Function]",
        O = "[object GeneratorFunction]",
        t = function(t) {
            if (!t) return !1;
            if ("function" != typeof t && "object" != typeof t) return !1;
            if (E) return S(t);
            if (k(t)) return !1;
            var e = T.call(t);
            return e === j || e === O
        },
        P = RegExp.prototype.exec,
        M = function(t) {
            try {
                return P.call(t), !0
            } catch (e) {
                return !1
            }
        },
        A = "[object RegExp]";
    e = function(t) {
        return "object" == typeof t && (E ? M(t) : T.call(t) === A)
    };
    var N, D = String.prototype.valueOf,
        L = function(t) {
            try {
                return D.call(t), !0
            } catch (e) {
                return !1
            }
        },
        I = "[object String]";
    N = function(t) {
        return "string" == typeof t || "object" == typeof t && (E ? L(t) : T.call(t) === I)
    };
    var R = o.defineProperty && function() {
            try {
                var t = {};
                o.defineProperty(t, "x", {
                    enumerable: !1,
                    value: t
                });
                for (var e in t) return !1;
                return t.x === t
            } catch (n) {
                return !1
            }
        }(),
        F = function(t) {
            var e;
            return e = R ? function(t, e, n, r) {
                    !r && e in t || o.defineProperty(t, e, {
                        configurable: !0,
                        enumerable: !1,
                        writable: !0,
                        value: n
                    })
                } : function(t, e, n, r) {
                    !r && e in t || (t[e] = n)
                },
                function(n, r, o) {
                    for (var i in r) t.call(r, i) && e(n, i, r[i], o)
                }
        }(i.hasOwnProperty),
        H = function(t) {
            var e = typeof t;
            return null === t || "object" !== e && "function" !== e
        },
        B = c.isNaN || function(t) {
            return t !== t
        },
        z = {
            ToInteger: function(t) {
                var e = +t;
                return B(e) ? e = 0 : 0 !== e && e !== 1 / 0 && e !== -(1 / 0) && (e = (e > 0 || -1) * Math.floor(Math.abs(e))), e
            },
            ToPrimitive: function(e) {
                var n, r, o;
                if (H(e)) return e;
                if (r = e.valueOf, t(r) && (n = r.call(e), H(n))) return n;
                if (o = e.toString, t(o) && (n = o.call(e), H(n))) return n;
                throw new TypeError
            },
            ToObject: function(t) {
                if (null == t) throw new TypeError("can't convert " + t + " to object");
                return o(t)
            },
            ToUint32: function(t) {
                return t >>> 0
            }
        },
        U = function() {};
    F(s, {
        bind: function(e) {
            var n = this;
            if (!t(n)) throw new TypeError("Function.prototype.bind called on incompatible " + n);
            for (var r, i = p.call(arguments, 1), s = function() {
                    if (this instanceof r) {
                        var t = b.call(n, this, v.call(i, p.call(arguments)));
                        return o(t) === t ? t : this
                    }
                    return b.call(n, e, v.call(i, p.call(arguments)))
                }, u = _(0, n.length - i.length), l = [], c = 0; c < u; c++) d.call(l, "$" + c);
            return r = a("binder", "return function (" + g.call(l, ",") + "){ return binder.apply(this, arguments); }")(s), n.prototype && (U.prototype = n.prototype, r.prototype = new U, U.prototype = null), r
        }
    });
    var V = m.bind(i.hasOwnProperty),
        q = m.bind(i.toString),
        W = m.bind(p),
        $ = b.bind(p),
        X = m.bind(l.slice),
        G = m.bind(l.split),
        Y = m.bind(l.indexOf),
        Q = m.bind(d),
        K = m.bind(i.propertyIsEnumerable),
        J = m.bind(r.sort),
        Z = n.isArray || function(t) {
            return "[object Array]" === q(t)
        },
        tt = 1 !== [].unshift(0);
    F(r, {
        unshift: function() {
            return y.apply(this, arguments), this.length
        }
    }, tt), F(n, {
        isArray: Z
    });
    var et = o("a"),
        nt = "a" !== et[0] || !(0 in et),
        rt = function(t) {
            var e = !0,
                n = !0,
                r = !1;
            if (t) try {
                t.call("foo", function(t, n, r) {
                    "object" != typeof r && (e = !1)
                }), t.call([1], function() {
                    "use strict";
                    n = "string" == typeof this
                }, "x")
            } catch (o) {
                r = !0
            }
            return !!t && !r && e && n
        };
    F(r, {
        forEach: function(e) {
            var n, r = z.ToObject(this),
                o = nt && N(this) ? G(this, "") : r,
                i = -1,
                a = z.ToUint32(o.length);
            if (arguments.length > 1 && (n = arguments[1]), !t(e)) throw new TypeError("Array.prototype.forEach callback must be a function");
            for (; ++i < a;) i in o && ("undefined" == typeof n ? e(o[i], i, r) : e.call(n, o[i], i, r))
        }
    }, !rt(r.forEach)), F(r, {
        map: function(e) {
            var r, o = z.ToObject(this),
                i = nt && N(this) ? G(this, "") : o,
                a = z.ToUint32(i.length),
                s = n(a);
            if (arguments.length > 1 && (r = arguments[1]), !t(e)) throw new TypeError("Array.prototype.map callback must be a function");
            for (var u = 0; u < a; u++) u in i && ("undefined" == typeof r ? s[u] = e(i[u], u, o) : s[u] = e.call(r, i[u], u, o));
            return s
        }
    }, !rt(r.map)), F(r, {
        filter: function(e) {
            var n, r, o = z.ToObject(this),
                i = nt && N(this) ? G(this, "") : o,
                a = z.ToUint32(i.length),
                s = [];
            if (arguments.length > 1 && (r = arguments[1]), !t(e)) throw new TypeError("Array.prototype.filter callback must be a function");
            for (var u = 0; u < a; u++) u in i && (n = i[u], ("undefined" == typeof r ? e(n, u, o) : e.call(r, n, u, o)) && Q(s, n));
            return s
        }
    }, !rt(r.filter)), F(r, {
        every: function(e) {
            var n, r = z.ToObject(this),
                o = nt && N(this) ? G(this, "") : r,
                i = z.ToUint32(o.length);
            if (arguments.length > 1 && (n = arguments[1]), !t(e)) throw new TypeError("Array.prototype.every callback must be a function");
            for (var a = 0; a < i; a++)
                if (a in o && !("undefined" == typeof n ? e(o[a], a, r) : e.call(n, o[a], a, r))) return !1;
            return !0
        }
    }, !rt(r.every)), F(r, {
        some: function(e) {
            var n, r = z.ToObject(this),
                o = nt && N(this) ? G(this, "") : r,
                i = z.ToUint32(o.length);
            if (arguments.length > 1 && (n = arguments[1]), !t(e)) throw new TypeError("Array.prototype.some callback must be a function");
            for (var a = 0; a < i; a++)
                if (a in o && ("undefined" == typeof n ? e(o[a], a, r) : e.call(n, o[a], a, r))) return !0;
            return !1
        }
    }, !rt(r.some));
    var ot = !1;
    r.reduce && (ot = "object" == typeof r.reduce.call("es5", function(t, e, n, r) {
        return r
    })), F(r, {
        reduce: function(e) {
            var n = z.ToObject(this),
                r = nt && N(this) ? G(this, "") : n,
                o = z.ToUint32(r.length);
            if (!t(e)) throw new TypeError("Array.prototype.reduce callback must be a function");
            if (0 === o && 1 === arguments.length) throw new TypeError("reduce of empty array with no initial value");
            var i, a = 0;
            if (arguments.length >= 2) i = arguments[1];
            else
                for (;;) {
                    if (a in r) {
                        i = r[a++];
                        break
                    }
                    if (++a >= o) throw new TypeError("reduce of empty array with no initial value")
                }
            for (; a < o; a++) a in r && (i = e(i, r[a], a, n));
            return i
        }
    }, !ot);
    var it = !1;
    r.reduceRight && (it = "object" == typeof r.reduceRight.call("es5", function(t, e, n, r) {
        return r
    })), F(r, {
        reduceRight: function(e) {
            var n = z.ToObject(this),
                r = nt && N(this) ? G(this, "") : n,
                o = z.ToUint32(r.length);
            if (!t(e)) throw new TypeError("Array.prototype.reduceRight callback must be a function");
            if (0 === o && 1 === arguments.length) throw new TypeError("reduceRight of empty array with no initial value");
            var i, a = o - 1;
            if (arguments.length >= 2) i = arguments[1];
            else
                for (;;) {
                    if (a in r) {
                        i = r[a--];
                        break
                    }
                    if (--a < 0) throw new TypeError("reduceRight of empty array with no initial value")
                }
            if (a < 0) return i;
            do a in r && (i = e(i, r[a], a, n)); while (a--);
            return i
        }
    }, !it);
    var at = r.indexOf && [0, 1].indexOf(1, 2) !== -1;
    F(r, {
        indexOf: function(t) {
            var e = nt && N(this) ? G(this, "") : z.ToObject(this),
                n = z.ToUint32(e.length);
            if (0 === n) return -1;
            var r = 0;
            for (arguments.length > 1 && (r = z.ToInteger(arguments[1])), r = r >= 0 ? r : _(0, n + r); r < n; r++)
                if (r in e && e[r] === t) return r;
            return -1
        }
    }, at);
    var st = r.lastIndexOf && [0, 1].lastIndexOf(0, -3) !== -1;
    F(r, {
        lastIndexOf: function(t) {
            var e = nt && N(this) ? G(this, "") : z.ToObject(this),
                n = z.ToUint32(e.length);
            if (0 === n) return -1;
            var r = n - 1;
            for (arguments.length > 1 && (r = w(r, z.ToInteger(arguments[1]))), r = r >= 0 ? r : n - Math.abs(r); r >= 0; r--)
                if (r in e && t === e[r]) return r;
            return -1
        }
    }, st);
    var ut = function() {
        var t = [1, 2],
            e = t.splice();
        return 2 === t.length && Z(e) && 0 === e.length
    }();
    F(r, {
        splice: function(t, e) {
            return 0 === arguments.length ? [] : h.apply(this, arguments)
        }
    }, !ut);
    var lt = function() {
        var t = {};
        return r.splice.call(t, 0, 0, 1), 1 === t.length
    }();
    F(r, {
        splice: function(t, e) {
            if (0 === arguments.length) return [];
            var n = arguments;
            return this.length = _(z.ToInteger(this.length), 0), arguments.length > 0 && "number" != typeof e && (n = W(arguments), n.length < 2 ? Q(n, this.length - t) : n[1] = z.ToInteger(e)), h.apply(this, n)
        }
    }, !lt);
    var ct = function() {
            var t = new n(1e5);
            return t[8] = "x", t.splice(1, 1), 7 === t.indexOf("x")
        }(),
        ft = function() {
            var t = 256,
                e = [];
            return e[t] = "a", e.splice(t + 1, 0, "b"), "a" === e[t]
        }();
    F(r, {
        splice: function(t, e) {
            for (var n, r = z.ToObject(this), o = [], i = z.ToUint32(r.length), a = z.ToInteger(t), s = a < 0 ? _(i + a, 0) : w(a, i), l = w(_(z.ToInteger(e), 0), i - s), c = 0; c < l;) n = u(s + c), V(r, n) && (o[c] = r[n]), c += 1;
            var f, p = W(arguments, 2),
                h = p.length;
            if (h < l) {
                c = s;
                for (var d = i - l; c < d;) n = u(c + l), f = u(c + h), V(r, n) ? r[f] = r[n] : delete r[f], c += 1;
                c = i;
                for (var y = i - l + h; c > y;) delete r[c - 1], c -= 1
            } else if (h > l)
                for (c = i - l; c > s;) n = u(c + l - 1), f = u(c + h - 1), V(r, n) ? r[f] = r[n] : delete r[f], c -= 1;
            c = s;
            for (var v = 0; v < p.length; ++v) r[c] = p[v], c += 1;
            return r.length = i - l + h, o
        }
    }, !ct || !ft);
    var pt, ht = r.join;
    try {
        pt = "1,2,3" !== Array.prototype.join.call("123", ",")
    } catch (dt) {
        pt = !0
    }
    pt && F(r, {
        join: function(t) {
            var e = "undefined" == typeof t ? "," : t;
            return ht.call(N(this) ? G(this, "") : this, e)
        }
    }, pt);
    var yt = "1,2" !== [1, 2].join(void 0);
    yt && F(r, {
        join: function(t) {
            var e = "undefined" == typeof t ? "," : t;
            return ht.call(this, e)
        }
    }, yt);
    var vt = function(t) {
            for (var e = z.ToObject(this), n = z.ToUint32(e.length), r = 0; r < arguments.length;) e[n + r] = arguments[r], r += 1;
            return e.length = n + r, n + r
        },
        gt = function() {
            var t = {},
                e = Array.prototype.push.call(t, void 0);
            return 1 !== e || 1 !== t.length || "undefined" != typeof t[0] || !V(t, 0)
        }();
    F(r, {
        push: function(t) {
            return Z(this) ? d.apply(this, arguments) : vt.apply(this, arguments)
        }
    }, gt);
    var mt = function() {
        var t = [],
            e = t.push(void 0);
        return 1 !== e || 1 !== t.length || "undefined" != typeof t[0] || !V(t, 0)
    }();
    F(r, {
        push: vt
    }, mt), F(r, {
        slice: function(t, e) {
            var n = N(this) ? G(this, "") : this;
            return $(n, arguments)
        }
    }, nt);
    var bt = function() {
            try {
                return [1, 2].sort(null), [1, 2].sort({}), !0
            } catch (t) {}
            return !1
        }(),
        _t = function() {
            try {
                return [1, 2].sort(/a/), !1
            } catch (t) {}
            return !0
        }(),
        wt = function() {
            try {
                return [1, 2].sort(void 0), !0
            } catch (t) {}
            return !1
        }();
    F(r, {
        sort: function(e) {
            if ("undefined" == typeof e) return J(this);
            if (!t(e)) throw new TypeError("Array.prototype.sort callback must be a function");
            return J(this, e)
        }
    }, bt || !wt || !_t);
    var Tt = !K({
            toString: null
        }, "toString"),
        Et = K(function() {}, "prototype"),
        xt = !V("x", "0"),
        Ct = function(t) {
            var e = t.constructor;
            return e && e.prototype === t
        },
        kt = {
            $window: !0,
            $console: !0,
            $parent: !0,
            $self: !0,
            $frame: !0,
            $frames: !0,
            $frameElement: !0,
            $webkitIndexedDB: !0,
            $webkitStorageInfo: !0,
            $external: !0
        },
        St = function() {
            if ("undefined" == typeof window) return !1;
            for (var t in window) try {
                !kt["$" + t] && V(window, t) && null !== window[t] && "object" == typeof window[t] && Ct(window[t])
            } catch (e) {
                return !0
            }
            return !1
        }(),
        jt = function(t) {
            if ("undefined" == typeof window || !St) return Ct(t);
            try {
                return Ct(t)
            } catch (e) {
                return !1
            }
        },
        Ot = ["toString", "toLocaleString", "valueOf", "hasOwnProperty", "isPrototypeOf", "propertyIsEnumerable", "constructor"],
        Pt = Ot.length,
        Mt = function(t) {
            return "[object Arguments]" === q(t)
        },
        At = function(e) {
            return null !== e && "object" == typeof e && "number" == typeof e.length && e.length >= 0 && !Z(e) && t(e.callee)
        },
        Nt = Mt(arguments) ? Mt : At;
    F(o, {
        keys: function(e) {
            var n = t(e),
                r = Nt(e),
                o = null !== e && "object" == typeof e,
                i = o && N(e);
            if (!o && !n && !r) throw new TypeError("Object.keys called on a non-object");
            var a = [],
                s = Et && n;
            if (i && xt || r)
                for (var l = 0; l < e.length; ++l) Q(a, u(l));
            if (!r)
                for (var c in e) s && "prototype" === c || !V(e, c) || Q(a, u(c));
            if (Tt)
                for (var f = jt(e), p = 0; p < Pt; p++) {
                    var h = Ot[p];
                    f && "constructor" === h || !V(e, h) || Q(a, h)
                }
            return a
        }
    });
    var Dt = o.keys && function() {
            return 2 === o.keys(arguments).length
        }(1, 2),
        Lt = o.keys && function() {
            var t = o.keys(arguments);
            return 1 !== arguments.length || 1 !== t.length || 1 !== t[0]
        }(1),
        It = o.keys;
    F(o, {
        keys: function(t) {
            return It(Nt(t) ? W(t) : t)
        }
    }, !Dt || Lt);
    var Rt, Ft, Ht = 0 !== new Date((-0xc782b5b342b24)).getUTCMonth(),
        Bt = new Date((-0x55d318d56a724)),
        zt = new Date(14496624e5),
        Ut = "Mon, 01 Jan -45875 11:59:59 GMT" !== Bt.toUTCString(),
        Vt = Bt.getTimezoneOffset();
    Vt < -720 ? (Rt = "Tue Jan 02 -45875" !== Bt.toDateString(), Ft = !/^Thu Dec 10 2015 \d\d:\d\d:\d\d GMT[-\+]\d\d\d\d(?: |$)/.test(zt.toString())) : (Rt = "Mon Jan 01 -45875" !== Bt.toDateString(), Ft = !/^Wed Dec 09 2015 \d\d:\d\d:\d\d GMT[-\+]\d\d\d\d(?: |$)/.test(zt.toString()));
    var qt = m.bind(Date.prototype.getFullYear),
        Wt = m.bind(Date.prototype.getMonth),
        $t = m.bind(Date.prototype.getDate),
        Xt = m.bind(Date.prototype.getUTCFullYear),
        Gt = m.bind(Date.prototype.getUTCMonth),
        Yt = m.bind(Date.prototype.getUTCDate),
        Qt = m.bind(Date.prototype.getUTCDay),
        Kt = m.bind(Date.prototype.getUTCHours),
        Jt = m.bind(Date.prototype.getUTCMinutes),
        Zt = m.bind(Date.prototype.getUTCSeconds),
        te = m.bind(Date.prototype.getUTCMilliseconds),
        ee = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
        ne = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
        re = function(t, e) {
            return $t(new Date(e, t, 0))
        };
    F(Date.prototype, {
        getFullYear: function() {
            if (!(this && this instanceof Date)) throw new TypeError("this is not a Date object.");
            var t = qt(this);
            return t < 0 && Wt(this) > 11 ? t + 1 : t
        },
        getMonth: function() {
            if (!(this && this instanceof Date)) throw new TypeError("this is not a Date object.");
            var t = qt(this),
                e = Wt(this);
            return t < 0 && e > 11 ? 0 : e
        },
        getDate: function() {
            if (!(this && this instanceof Date)) throw new TypeError("this is not a Date object.");
            var t = qt(this),
                e = Wt(this),
                n = $t(this);
            if (t < 0 && e > 11) {
                if (12 === e) return n;
                var r = re(0, t + 1);
                return r - n + 1
            }
            return n
        },
        getUTCFullYear: function() {
            if (!(this && this instanceof Date)) throw new TypeError("this is not a Date object.");
            var t = Xt(this);
            return t < 0 && Gt(this) > 11 ? t + 1 : t
        },
        getUTCMonth: function() {
            if (!(this && this instanceof Date)) throw new TypeError("this is not a Date object.");
            var t = Xt(this),
                e = Gt(this);
            return t < 0 && e > 11 ? 0 : e
        },
        getUTCDate: function() {
            if (!(this && this instanceof Date)) throw new TypeError("this is not a Date object.");
            var t = Xt(this),
                e = Gt(this),
                n = Yt(this);
            if (t < 0 && e > 11) {
                if (12 === e) return n;
                var r = re(0, t + 1);
                return r - n + 1
            }
            return n
        }
    }, Ht), F(Date.prototype, {
        toUTCString: function() {
            if (!(this && this instanceof Date)) throw new TypeError("this is not a Date object.");
            var t = Qt(this),
                e = Yt(this),
                n = Gt(this),
                r = Xt(this),
                o = Kt(this),
                i = Jt(this),
                a = Zt(this);
            return ee[t] + ", " + (e < 10 ? "0" + e : e) + " " + ne[n] + " " + r + " " + (o < 10 ? "0" + o : o) + ":" + (i < 10 ? "0" + i : i) + ":" + (a < 10 ? "0" + a : a) + " GMT"
        }
    }, Ht || Ut), F(Date.prototype, {
        toDateString: function() {
            if (!(this && this instanceof Date)) throw new TypeError("this is not a Date object.");
            var t = this.getDay(),
                e = this.getDate(),
                n = this.getMonth(),
                r = this.getFullYear();
            return ee[t] + " " + ne[n] + " " + (e < 10 ? "0" + e : e) + " " + r
        }
    }, Ht || Rt), (Ht || Ft) && (Date.prototype.toString = function() {
        if (!(this && this instanceof Date)) throw new TypeError("this is not a Date object.");
        var t = this.getDay(),
            e = this.getDate(),
            n = this.getMonth(),
            r = this.getFullYear(),
            o = this.getHours(),
            i = this.getMinutes(),
            a = this.getSeconds(),
            s = this.getTimezoneOffset(),
            u = Math.floor(Math.abs(s) / 60),
            l = Math.floor(Math.abs(s) % 60);
        return ee[t] + " " + ne[n] + " " + (e < 10 ? "0" + e : e) + " " + r + " " + (o < 10 ? "0" + o : o) + ":" + (i < 10 ? "0" + i : i) + ":" + (a < 10 ? "0" + a : a) + " GMT" + (s > 0 ? "-" : "+") + (u < 10 ? "0" + u : u) + (l < 10 ? "0" + l : l)
    }, R && o.defineProperty(Date.prototype, "toString", {
        configurable: !0,
        enumerable: !1,
        writable: !0
    }));
    var oe = -621987552e5,
        ie = "-000001",
        ae = Date.prototype.toISOString && new Date(oe).toISOString().indexOf(ie) === -1,
        se = Date.prototype.toISOString && "1969-12-31T23:59:59.999Z" !== new Date((-1)).toISOString(),
        ue = m.bind(Date.prototype.getTime);
    F(Date.prototype, {
        toISOString: function() {
            if (!isFinite(this) || !isFinite(ue(this))) throw new RangeError("Date.prototype.toISOString called on non-finite value.");
            var t = Xt(this),
                e = Gt(this);
            t += Math.floor(e / 12), e = (e % 12 + 12) % 12;
            var n = [e + 1, Yt(this), Kt(this), Jt(this), Zt(this)];
            t = (t < 0 ? "-" : t > 9999 ? "+" : "") + X("00000" + Math.abs(t), 0 <= t && t <= 9999 ? -4 : -6);
            for (var r = 0; r < n.length; ++r) n[r] = X("00" + n[r], -2);
            return t + "-" + W(n, 0, 2).join("-") + "T" + W(n, 2).join(":") + "." + X("000" + te(this), -3) + "Z"
        }
    }, ae || se);
    var le = function() {
        try {
            return Date.prototype.toJSON && null === new Date(NaN).toJSON() && new Date(oe).toJSON().indexOf(ie) !== -1 && Date.prototype.toJSON.call({
                toISOString: function() {
                    return !0
                }
            })
        } catch (t) {
            return !1
        }
    }();
    le || (Date.prototype.toJSON = function(e) {
        var n = o(this),
            r = z.ToPrimitive(n);
        if ("number" == typeof r && !isFinite(r)) return null;
        var i = n.toISOString;
        if (!t(i)) throw new TypeError("toISOString property is not callable");
        return i.call(n)
    });
    var ce = 1e15 === Date.parse("+033658-09-27T01:46:40.000Z"),
        fe = !isNaN(Date.parse("2012-04-04T24:00:00.500Z")) || !isNaN(Date.parse("2012-11-31T23:59:59.000Z")) || !isNaN(Date.parse("2012-12-31T23:59:60.000Z")),
        pe = isNaN(Date.parse("2000-01-01T00:00:00.000Z"));
    if (pe || fe || !ce) {
        var he = Math.pow(2, 31) - 1,
            de = B(new Date(1970, 0, 1, 0, 0, 0, he + 1).getTime());
        Date = function(t) {
            var e = function(n, r, o, i, a, s, l) {
                    var c, f = arguments.length;
                    if (this instanceof t) {
                        var p = s,
                            h = l;
                        if (de && f >= 7 && l > he) {
                            var d = Math.floor(l / he) * he,
                                y = Math.floor(d / 1e3);
                            p += y, h -= 1e3 * y
                        }
                        c = 1 === f && u(n) === n ? new t(e.parse(n)) : f >= 7 ? new t(n, r, o, i, a, p, h) : f >= 6 ? new t(n, r, o, i, a, p) : f >= 5 ? new t(n, r, o, i, a) : f >= 4 ? new t(n, r, o, i) : f >= 3 ? new t(n, r, o) : f >= 2 ? new t(n, r) : f >= 1 ? new t(n instanceof t ? +n : n) : new t
                    } else c = t.apply(this, arguments);
                    return H(c) || F(c, {
                        constructor: e
                    }, !0), c
                },
                n = new RegExp("^(\\d{4}|[+-]\\d{6})(?:-(\\d{2})(?:-(\\d{2})(?:T(\\d{2}):(\\d{2})(?::(\\d{2})(?:(\\.\\d{1,}))?)?(Z|(?:([-+])(\\d{2}):(\\d{2})))?)?)?)?$"),
                r = [0, 31, 59, 90, 120, 151, 181, 212, 243, 273, 304, 334, 365],
                o = function(t, e) {
                    var n = e > 1 ? 1 : 0;
                    return r[e] + Math.floor((t - 1969 + n) / 4) - Math.floor((t - 1901 + n) / 100) + Math.floor((t - 1601 + n) / 400) + 365 * (t - 1970)
                },
                i = function(e) {
                    var n = 0,
                        r = e;
                    if (de && r > he) {
                        var o = Math.floor(r / he) * he,
                            i = Math.floor(o / 1e3);
                        n += i, r -= 1e3 * i
                    }
                    return c(new t(1970, 0, 1, 0, 0, n, r))
                };
            for (var a in t) V(t, a) && (e[a] = t[a]);
            F(e, {
                now: t.now,
                UTC: t.UTC
            }, !0), e.prototype = t.prototype, F(e.prototype, {
                constructor: e
            }, !0);
            var s = function(e) {
                var r = n.exec(e);
                if (r) {
                    var a, s = c(r[1]),
                        u = c(r[2] || 1) - 1,
                        l = c(r[3] || 1) - 1,
                        f = c(r[4] || 0),
                        p = c(r[5] || 0),
                        h = c(r[6] || 0),
                        d = Math.floor(1e3 * c(r[7] || 0)),
                        y = Boolean(r[4] && !r[8]),
                        v = "-" === r[9] ? 1 : -1,
                        g = c(r[10] || 0),
                        m = c(r[11] || 0),
                        b = p > 0 || h > 0 || d > 0;
                    return f < (b ? 24 : 25) && p < 60 && h < 60 && d < 1e3 && u > -1 && u < 12 && g < 24 && m < 60 && l > -1 && l < o(s, u + 1) - o(s, u) && (a = 60 * (24 * (o(s, u) + l) + f + g * v), a = 1e3 * (60 * (a + p + m * v) + h) + d, y && (a = i(a)), -864e13 <= a && a <= 864e13) ? a : NaN
                }
                return t.parse.apply(this, arguments)
            };
            return F(e, {
                parse: s
            }), e
        }(Date)
    }
    Date.now || (Date.now = function() {
        return (new Date).getTime()
    });
    var ye = f.toFixed && ("0.000" !== 8e-5.toFixed(3) || "1" !== .9.toFixed(0) || "1.25" !== 1.255.toFixed(2) || "1000000000000000128" !== (0xde0b6b3a7640080).toFixed(0)),
        ve = {
            base: 1e7,
            size: 6,
            data: [0, 0, 0, 0, 0, 0],
            multiply: function(t, e) {
                for (var n = -1, r = e; ++n < ve.size;) r += t * ve.data[n], ve.data[n] = r % ve.base, r = Math.floor(r / ve.base)
            },
            divide: function(t) {
                for (var e = ve.size, n = 0; --e >= 0;) n += ve.data[e], ve.data[e] = Math.floor(n / t), n = n % t * ve.base
            },
            numToString: function() {
                for (var t = ve.size, e = ""; --t >= 0;)
                    if ("" !== e || 0 === t || 0 !== ve.data[t]) {
                        var n = u(ve.data[t]);
                        "" === e ? e = n : e += X("0000000", 0, 7 - n.length) + n
                    } return e
            },
            pow: function Ie(t, e, n) {
                return 0 === e ? n : e % 2 === 1 ? Ie(t, e - 1, n * t) : Ie(t * t, e / 2, n)
            },
            log: function(t) {
                for (var e = 0, n = t; n >= 4096;) e += 12, n /= 4096;
                for (; n >= 2;) e += 1, n /= 2;
                return e
            }
        },
        ge = function(t) {
            var e, n, r, o, i, a, s, l;
            if (e = c(t), e = B(e) ? 0 : Math.floor(e), e < 0 || e > 20) throw new RangeError("Number.toFixed called with invalid number of decimals");
            if (n = c(this), B(n)) return "NaN";
            if (n <= -1e21 || n >= 1e21) return u(n);
            if (r = "", n < 0 && (r = "-", n = -n), o = "0", n > 1e-21)
                if (i = ve.log(n * ve.pow(2, 69, 1)) - 69, a = i < 0 ? n * ve.pow(2, -i, 1) : n / ve.pow(2, i, 1), a *= 4503599627370496, i = 52 - i, i > 0) {
                    for (ve.multiply(0, a), s = e; s >= 7;) ve.multiply(1e7, 0), s -= 7;
                    for (ve.multiply(ve.pow(10, s, 1), 0), s = i - 1; s >= 23;) ve.divide(1 << 23), s -= 23;
                    ve.divide(1 << s), ve.multiply(1, 1), ve.divide(2), o = ve.numToString()
                } else ve.multiply(0, a), ve.multiply(1 << -i, 0), o = ve.numToString() + X("0.00000000000000000000", 2, 2 + e);
            return e > 0 ? (l = o.length, o = l <= e ? r + X("0.0000000000000000000", 0, e - l + 2) + o : r + X(o, 0, l - e) + "." + X(o, l - e)) : o = r + o, o
        };
    F(f, {
        toFixed: ge
    }, ye);
    var me = function() {
            try {
                return "1" === 1..toPrecision(void 0)
            } catch (t) {
                return !0
            }
        }(),
        be = f.toPrecision;
    F(f, {
        toPrecision: function(t) {
            return "undefined" == typeof t ? be.call(this) : be.call(this, t)
        }
    }, me), 2 !== "ab".split(/(?:ab)*/).length || 4 !== ".".split(/(.?)(.?)/).length || "t" === "tesst".split(/(s)*/)[1] || 4 !== "test".split(/(?:)/, -1).length || "".split(/.?/).length || ".".split(/()()/).length > 1 ? ! function() {
        var t = "undefined" == typeof /()??/.exec("")[1],
            n = Math.pow(2, 32) - 1;
        l.split = function(r, o) {
            var i = String(this);
            if ("undefined" == typeof r && 0 === o) return [];
            if (!e(r)) return G(this, r, o);
            var a, s, u, l, c = [],
                f = (r.ignoreCase ? "i" : "") + (r.multiline ? "m" : "") + (r.unicode ? "u" : "") + (r.sticky ? "y" : ""),
                p = 0,
                h = new RegExp(r.source, f + "g");
            t || (a = new RegExp("^" + h.source + "$(?!\\s)", f));
            var y = "undefined" == typeof o ? n : z.ToUint32(o);
            for (s = h.exec(i); s && (u = s.index + s[0].length, !(u > p && (Q(c, X(i, p, s.index)), !t && s.length > 1 && s[0].replace(a, function() {
                    for (var t = 1; t < arguments.length - 2; t++) "undefined" == typeof arguments[t] && (s[t] = void 0)
                }), s.length > 1 && s.index < i.length && d.apply(c, W(s, 1)), l = s[0].length, p = u, c.length >= y)));) h.lastIndex === s.index && h.lastIndex++, s = h.exec(i);
            return p === i.length ? !l && h.test("") || Q(c, "") : Q(c, X(i, p)), c.length > y ? W(c, 0, y) : c
        }
    }() : "0".split(void 0, 0).length && (l.split = function(t, e) {
        return "undefined" == typeof t && 0 === e ? [] : G(this, t, e)
    });
    var _e = l.replace,
        we = function() {
            var t = [];
            return "x".replace(/x(.)?/g, function(e, n) {
                Q(t, n)
            }), 1 === t.length && "undefined" == typeof t[0]
        }();
    we || (l.replace = function(n, r) {
        var o = t(r),
            i = e(n) && /\)[*?]/.test(n.source);
        if (o && i) {
            var a = function(t) {
                var e = arguments.length,
                    o = n.lastIndex;
                n.lastIndex = 0;
                var i = n.exec(t) || [];
                return n.lastIndex = o, Q(i, arguments[e - 2], arguments[e - 1]), r.apply(this, i)
            };
            return _e.call(this, n, a)
        }
        return _e.call(this, n, r)
    });
    var Te = l.substr,
        Ee = "".substr && "b" !== "0b".substr(-1);
    F(l, {
        substr: function(t, e) {
            var n = t;
            return t < 0 && (n = _(this.length + t, 0)), Te.call(this, n, e)
        }
    }, Ee);
    var xe = "\t\n\x0B\f\r \xa0\u1680\u180e\u2000\u2001\u2002\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200a\u202f\u205f\u3000\u2028\u2029\ufeff",
        Ce = "\u200b",
        ke = "[" + xe + "]",
        Se = new RegExp("^" + ke + ke + "*"),
        je = new RegExp(ke + ke + "*$"),
        Oe = l.trim && (xe.trim() || !Ce.trim());
    F(l, {
        trim: function() {
            if ("undefined" == typeof this || null === this) throw new TypeError("can't convert " + this + " to object");
            return u(this).replace(Se, "").replace(je, "")
        }
    }, Oe);
    var Pe = m.bind(String.prototype.trim),
        Me = l.lastIndexOf && "abc??".lastIndexOf("??", 2) !== -1;
    F(l, {
        lastIndexOf: function(t) {
            if ("undefined" == typeof this || null === this) throw new TypeError("can't convert " + this + " to object");
            for (var e = u(this), n = u(t), r = arguments.length > 1 ? c(arguments[1]) : NaN, o = B(r) ? 1 / 0 : z.ToInteger(r), i = w(_(o, 0), e.length), a = n.length, s = i + a; s > 0;) {
                s = _(0, s - a);
                var l = Y(X(e, s, i + a), n);
                if (l !== -1) return s + l
            }
            return -1
        }
    }, Me);
    var Ae = l.lastIndexOf;
    if (F(l, {
            lastIndexOf: function(t) {
                return Ae.apply(this, arguments)
            }
        }, 1 !== l.lastIndexOf.length), 8 === parseInt(xe + "08") && 22 === parseInt(xe + "0x16") || (parseInt = function(t) {
            var e = /^[\-+]?0[xX]/;
            return function(n, r) {
                var o = Pe(String(n)),
                    i = c(r) || (e.test(o) ? 16 : 10);
                return t(o, i)
            }
        }(parseInt)), 1 / parseFloat("-0") !== -(1 / 0) && (parseFloat = function(t) {
            return function(e) {
                var n = Pe(String(e)),
                    r = t(n);
                return 0 === r && "-" === X(n, 0, 1) ? -0 : r
            }
        }(parseFloat)), "RangeError: test" !== String(new RangeError("test"))) {
        var Ne = function() {
            if ("undefined" == typeof this || null === this) throw new TypeError("can't convert " + this + " to object");
            var t = this.name;
            "undefined" == typeof t ? t = "Error" : "string" != typeof t && (t = u(t));
            var e = this.message;
            return "undefined" == typeof e ? e = "" : "string" != typeof e && (e = u(e)), t ? e ? t + ": " + e : t : e
        };
        Error.prototype.toString = Ne
    }
    if (R) {
        var De = function(t, e) {
            if (K(t, e)) {
                var n = Object.getOwnPropertyDescriptor(t, e);
                n.configurable && (n.enumerable = !1, Object.defineProperty(t, e, n))
            }
        };
        De(Error.prototype, "message"), "" !== Error.prototype.message && (Error.prototype.message = ""), De(Error.prototype, "name")
    }
    if ("/a/gim" !== String(/a/gim)) {
        var Le = function() {
            var t = "/" + this.source + "/";
            return this.global && (t += "g"), this.ignoreCase && (t += "i"), this.multiline && (t += "m"), t
        };
        RegExp.prototype.toString = Le
    }
}),
function(t, e) {
    "use strict";
    "function" == typeof define && define.amd ? define(e) : "object" == typeof exports ? module.exports = e() : t.returnExports = e()
}(this, function() {
    var t, e, n, r, o = Function.prototype.call,
        i = Object.prototype,
        a = o.bind(i.hasOwnProperty),
        s = o.bind(i.propertyIsEnumerable),
        u = o.bind(i.toString),
        l = a(i, "__defineGetter__");
    l && (t = o.bind(i.__defineGetter__), e = o.bind(i.__defineSetter__), n = o.bind(i.__lookupGetter__), r = o.bind(i.__lookupSetter__)), Object.getPrototypeOf || (Object.getPrototypeOf = function(t) {
        var e = t.__proto__;
        return e || null === e ? e : "[object Function]" === u(t.constructor) ? t.constructor.prototype : t instanceof Object ? i : null
    });
    var c = function(t) {
        try {
            return t.sentinel = 0, 0 === Object.getOwnPropertyDescriptor(t, "sentinel").value
        } catch (e) {
            return !1
        }
    };
    if (Object.defineProperty) {
        var f = c({}),
            p = "undefined" == typeof document || c(document.createElement("div"));
        if (!p || !f) var h = Object.getOwnPropertyDescriptor
    }
    if (!Object.getOwnPropertyDescriptor || h) {
        var d = "Object.getOwnPropertyDescriptor called on a non-object: ";
        Object.getOwnPropertyDescriptor = function(t, e) {
            if ("object" != typeof t && "function" != typeof t || null === t) throw new TypeError(d + t);
            if (h) try {
                return h.call(Object, t, e)
            } catch (o) {}
            var u;
            if (!a(t, e)) return u;
            if (u = {
                    enumerable: s(t, e),
                    configurable: !0
                }, l) {
                var c = t.__proto__,
                    f = t !== i;
                f && (t.__proto__ = i);
                var p = n(t, e),
                    y = r(t, e);
                if (f && (t.__proto__ = c), p || y) return p && (u.get = p), y && (u.set = y), u
            }
            return u.value = t[e], u.writable = !0, u
        }
    }
    if (Object.getOwnPropertyNames || (Object.getOwnPropertyNames = function(t) {
            return Object.keys(t)
        }), !Object.create) {
        var y, v = !({
                    __proto__: null
                }
                instanceof Object),
            g = function() {
                if (!document.domain) return !1;
                try {
                    return !!new ActiveXObject("htmlfile")
                } catch (t) {
                    return !1
                }
            },
            m = function() {
                var t, e;
                return e = new ActiveXObject("htmlfile"), e.write("<script></script>"), e.close(), t = e.parentWindow.Object.prototype, e = null, t
            },
            b = function() {
                var t, e = document.createElement("iframe"),
                    n = document.body || document.documentElement;
                return e.style.display = "none", n.appendChild(e), e.src = "javascript:", t = e.contentWindow.Object.prototype, n.removeChild(e), e = null, t
            };
        y = v || "undefined" == typeof document ? function() {
            return {
                __proto__: null
            }
        } : function() {
            var t = g() ? m() : b();
            delete t.constructor, delete t.hasOwnProperty, delete t.propertyIsEnumerable, delete t.isPrototypeOf, delete t.toLocaleString, delete t.toString, delete t.valueOf;
            var e = function() {};
            return e.prototype = t, y = function() {
                return new e
            }, new e
        }, Object.create = function(t, e) {
            var n, r = function() {};
            if (null === t) n = y();
            else {
                if ("object" != typeof t && "function" != typeof t) throw new TypeError("Object prototype may only be an Object or null");
                r.prototype = t, n = new r, n.__proto__ = t
            }
            return void 0 !== e && Object.defineProperties(n, e), n
        }
    }
    var _ = function(t) {
        try {
            return Object.defineProperty(t, "sentinel", {}), "sentinel" in t
        } catch (e) {
            return !1
        }
    };
    if (Object.defineProperty) {
        var w = _({}),
            T = "undefined" == typeof document || _(document.createElement("div"));
        if (!w || !T) var E = Object.defineProperty,
            x = Object.defineProperties
    }
    if (!Object.defineProperty || E) {
        var C = "Property description must be an object: ",
            k = "Object.defineProperty called on non-object: ",
            S = "getters & setters can not be defined on this javascript engine";
        Object.defineProperty = function(o, a, s) {
            if ("object" != typeof o && "function" != typeof o || null === o) throw new TypeError(k + o);
            if ("object" != typeof s && "function" != typeof s || null === s) throw new TypeError(C + s);
            if (E) try {
                return E.call(Object, o, a, s)
            } catch (u) {}
            if ("value" in s)
                if (l && (n(o, a) || r(o, a))) {
                    var c = o.__proto__;
                    o.__proto__ = i, delete o[a], o[a] = s.value, o.__proto__ = c
                } else o[a] = s.value;
            else {
                if (!l && ("get" in s || "set" in s)) throw new TypeError(S);
                "get" in s && t(o, a, s.get), "set" in s && e(o, a, s.set)
            }
            return o
        }
    }
    Object.defineProperties && !x || (Object.defineProperties = function(t, e) {
        if (x) try {
            return x.call(Object, t, e)
        } catch (n) {}
        return Object.keys(e).forEach(function(n) {
            "__proto__" !== n && Object.defineProperty(t, n, e[n])
        }), t
    }), Object.seal || (Object.seal = function(t) {
        if (Object(t) !== t) throw new TypeError("Object.seal can only be called on Objects.");
        return t
    }), Object.freeze || (Object.freeze = function(t) {
        if (Object(t) !== t) throw new TypeError("Object.freeze can only be called on Objects.");
        return t
    });
    try {
        Object.freeze(function() {})
    } catch (j) {
        Object.freeze = function(t) {
            return function(e) {
                return "function" == typeof e ? e : t(e)
            }
        }(Object.freeze)
    }
    Object.preventExtensions || (Object.preventExtensions = function(t) {
        if (Object(t) !== t) throw new TypeError("Object.preventExtensions can only be called on Objects.");
        return t
    }), Object.isSealed || (Object.isSealed = function(t) {
        if (Object(t) !== t) throw new TypeError("Object.isSealed can only be called on Objects.");
        return !1
    }), Object.isFrozen || (Object.isFrozen = function(t) {
        if (Object(t) !== t) throw new TypeError("Object.isFrozen can only be called on Objects.");
        return !1
    }), Object.isExtensible || (Object.isExtensible = function(t) {
        if (Object(t) !== t) throw new TypeError("Object.isExtensible can only be called on Objects.");
        for (var e = ""; a(t, e);) e += "?";
        t[e] = !0;
        var n = a(t, e);
        return delete t[e], n
    })
}),
function(t) {
    "use strict";

    function e(t, e) {
        function r(t) {
            return this && this.constructor === r ? (this._keys = [], this._values = [], this._itp = [], this.objectOnly = e, void(t && n.call(this, t))) : new r(t)
        }
        return e || b(t, "size", {
            get: v
        }), t.constructor = r, r.prototype = t, r
    }

    function n(t) {
        this.add ? t.forEach(this.add, this) : t.forEach(function(t) {
            this.set(t[0], t[1])
        }, this)
    }

    function r(t) {
        return this.has(t) && (this._keys.splice(m, 1), this._values.splice(m, 1), this._itp.forEach(function(t) {
            m < t[0] && t[0]--
        })), -1 < m
    }

    function o(t) {
        return this.has(t) ? this._values[m] : void 0
    }

    function i(t, e) {
        if (this.objectOnly && e !== Object(e)) throw new TypeError("Invalid value used as weak collection key");
        if (e != e || 0 === e)
            for (m = t.length; m-- && !_(t[m], e););
        else m = t.indexOf(e);
        return -1 < m
    }

    function a(t) {
        return i.call(this, this._values, t)
    }

    function s(t) {
        return i.call(this, this._keys, t)
    }

    function u(t, e) {
        return this.has(t) ? this._values[m] = e : this._values[this._keys.push(t) - 1] = e, this
    }

    function l(t) {
        return this.has(t) || this._values.push(t), this
    }

    function c() {
        (this._keys || 0).length = this._values.length = 0
    }

    function f() {
        return y(this._itp, this._keys)
    }

    function p() {
        return y(this._itp, this._values)
    }

    function h() {
        return y(this._itp, this._keys, this._values)
    }

    function d() {
        return y(this._itp, this._values, this._values)
    }

    function y(t, e, n) {
        var r = [0],
            o = !1;
        return t.push(r), {
            next: function() {
                var i, a = r[0];
                return !o && a < e.length ? (i = n ? [e[a], n[a]] : e[a], r[0]++) : (o = !0, t.splice(t.indexOf(r), 1)), {
                    done: o,
                    value: i
                }
            }
        }
    }

    function v() {
        return this._values.length
    }

    function g(t, e) {
        for (var n = this.entries();;) {
            var r = n.next();
            if (r.done) break;
            t.call(e, r.value[1], r.value[0], this)
        }
    }
    var m, b = Object.defineProperty,
        _ = function(t, e) {
            return t === e || t !== t && e !== e
        };
    "undefined" == typeof WeakMap && (t.WeakMap = e({
        "delete": r,
        clear: c,
        get: o,
        has: s,
        set: u
    }, !0)), "undefined" != typeof Map && "function" == typeof(new Map).values && (new Map).values().next || (t.Map = e({
        "delete": r,
        has: s,
        get: o,
        set: u,
        keys: f,
        values: p,
        entries: h,
        forEach: g,
        clear: c
    })), "undefined" != typeof Set && "function" == typeof(new Set).values && (new Set).values().next || (t.Set = e({
        has: a,
        add: l,
        "delete": r,
        clear: c,
        keys: p,
        values: p,
        entries: d,
        forEach: g
    })), "undefined" == typeof WeakSet && (t.WeakSet = e({
        "delete": r,
        add: l,
        clear: c,
        has: a
    }, !0))
}("undefined" != typeof exports && "undefined" != typeof global ? global : window), String.prototype.repeat || (String.prototype.repeat = function(t) {
        "use strict";
        if (null == this) throw new TypeError("can't convert " + this + " to object");
        var e = "" + this;
        if (t = +t, t != t && (t = 0), t < 0) throw new RangeError("repeat count must be non-negative");
        if (t == 1 / 0) throw new RangeError("repeat count must be less than infinity");
        if (t = Math.floor(t), 0 == e.length || 0 == t) return "";
        if (e.length * t >= 1 << 28) throw new RangeError("repeat count must not overflow maximum string size");
        for (var n = "", r = 0; r < t; r++) n += e;
        return n
    }), String.prototype.padStart || (String.prototype.padStart = function(t, e) {
        return t >>= 0, e = String("undefined" != typeof e ? e : " "), this.length > t ? String(this) : (t -= this.length, t > e.length && (e += e.repeat(t / e.length)), e.slice(0, t) + String(this))
    }), String.prototype.includes || (String.prototype.includes = function(t, e) {
        "use strict";
        if (t instanceof RegExp) throw TypeError("first argument must not be a RegExp");
        return void 0 === e && (e = 0), this.indexOf(t, e) !== -1
    }), Array.prototype.find || (Array.prototype.find = function(t) {
        if (null === this) throw new TypeError("Array.prototype.find called on null or undefined");
        if ("function" != typeof t) throw new TypeError("predicate must be a function");
        for (var e, n = Object(this), r = n.length >>> 0, o = arguments[1], i = 0; i < r; i++)
            if (e = n[i], t.call(o, e, i, n)) return e
    }), Array.prototype.includes || Object.defineProperty(Array.prototype, "includes", {
        value: function(t, e) {
            function n(t, e) {
                return t === e || "number" == typeof t && "number" == typeof e && isNaN(t) && isNaN(e)
            }
            if (null == this) throw new TypeError('"this" is null or not defined');
            var r = Object(this),
                o = r.length >>> 0;
            if (0 === o) return !1;
            for (var i = 0 | e, a = Math.max(i >= 0 ? i : o - Math.abs(i), 0); a < o;) {
                if (n(r[a], t)) return !0;
                a++
            }
            return !1
        }
    }), Array.from || (Array.from = function() {
        var t = Object.prototype.toString,
            e = function(e) {
                return "function" == typeof e || "[object Function]" === t.call(e)
            },
            n = function(t) {
                var e = Number(t);
                return isNaN(e) ? 0 : 0 !== e && isFinite(e) ? (e > 0 ? 1 : -1) * Math.floor(Math.abs(e)) : e
            },
            r = Math.pow(2, 53) - 1,
            o = function(t) {
                var e = n(t);
                return Math.min(Math.max(e, 0), r)
            };
        return function(t) {
            var n = this,
                r = Object(t);
            if (null == t) throw new TypeError("Array.from requires an array-like object - not null or undefined");
            var i, a = arguments.length > 1 ? arguments[1] : void 0;
            if ("undefined" != typeof a) {
                if (!e(a)) throw new TypeError("Array.from: when provided, the second argument must be a function");
                arguments.length > 2 && (i = arguments[2])
            }
            for (var s, u = o(r.length), l = e(n) ? Object(new n(u)) : new Array(u), c = 0; c < u;) s = r[c], a ? l[c] = "undefined" == typeof i ? a(s, c) : a.call(i, s, c) : l[c] = s, c += 1;
            return l.length = u, l
        }
    }()),
    function() {
        function t(t) {
            this.element = t
        }
        var e = function(t) {
                return new RegExp("(^| )" + t + "( |$)")
            },
            n = function(t, e, n) {
                for (var r = 0; r < t.length; r++) e.call(n, t[r])
            };
        t.prototype = {
            add: function() {
                n(arguments, function(t) {
                    this.contains(t) || this.element.setAttribute("class", this.element.getAttribute("class") + " " + t)
                }, this)
            },
            remove: function() {
                n(arguments, function(t) {
                    this.element.setAttribute("class", this.element.getAttribute("class").replace(e(t), " "))
                }, this)
            },
            toggle: function(t) {
                return this.contains(t) ? (this.remove(t), !1) : (this.add(t), !0)
            },
            contains: function(t) {
                return e(t).test(this.element.getAttribute("class"))
            },
            replace: function(t, e) {
                this.remove(t), this.add(e)
            }
        }, "classList" in Element.prototype || Object.defineProperty(Element.prototype, "classList", {
            get: function() {
                return new t(this)
            }
        }), window.DOMTokenList && null == DOMTokenList.prototype.replace && (DOMTokenList.prototype.replace = t.prototype.replace)
    }(), NodeList.prototype.forEach || (NodeList.prototype.forEach = function(t, e) {
        e = e || window;
        for (var n = 0; n < this.length; n++) t.call(e, this[n], n, this)
    }), "function" != typeof Object.assign && (Object.assign = function(t) {
        "use strict";
        if (null == t) throw new TypeError("Cannot convert undefined or null to object");
        t = Object(t);
        for (var e = 1; e < arguments.length; e++) {
            var n = arguments[e];
            if (null != n)
                for (var r in n) Object.prototype.hasOwnProperty.call(n, r) && (t[r] = n[r])
        }
        return t
    });
const promiseFinally = function(t) {
    var e = this.constructor;
    return this.then(function(n) {
        return e.resolve(t()).then(function() {
            return n
        })
    }, function(n) {
        return e.resolve(t()).then(function() {
            return e.reject(n)
        })
    })
};
var setTimeoutFunc = setTimeout;
Promise.prototype["catch"] = function(t) {
        return this.then(null, t)
    }, Promise.prototype.then = function(t, e) {
        var n = new this.constructor(noop);
        return handle(this, new Handler(t, e, n)), n
    }, Promise.prototype["finally"] = promiseFinally, Promise.all = function(t) {
        return new Promise(function(e, n) {
            function r(t, a) {
                try {
                    if (a && ("object" == typeof a || "function" == typeof a)) {
                        var s = a.then;
                        if ("function" == typeof s) return void s.call(a, function(e) {
                            r(t, e)
                        }, n)
                    }
                    o[t] = a, 0 === --i && e(o)
                } catch (u) {
                    n(u)
                }
            }
            if (!isArray(t)) return n(new TypeError("Promise.all accepts an array"));
            var o = Array.prototype.slice.call(t);
            if (0 === o.length) return e([]);
            for (var i = o.length, a = 0; a < o.length; a++) r(a, o[a])
        })
    }, Promise.resolve = function(t) {
        return t && "object" == typeof t && t.constructor === Promise ? t : new Promise(function(e) {
            e(t)
        })
    }, Promise.reject = function(t) {
        return new Promise(function(e, n) {
            n(t)
        })
    }, Promise.race = function(t) {
        return new Promise(function(e, n) {
            if (!isArray(t)) return n(new TypeError("Promise.race accepts an array"));
            for (var r = 0, o = t.length; r < o; r++) Promise.resolve(t[r]).then(e, n)
        })
    }, Promise._immediateFn = "function" == typeof setImmediate && function(t) {
        setImmediate(t)
    } || function(t) {
        setTimeoutFunc(t, 0)
    }, Promise._unhandledRejectionFn = function(t) {
        "undefined" != typeof console && console && console.warn("Possible Unhandled Promise Rejection:", t)
    }, void 0 === window.Promise && (window.Promise = Promise),
    function(t) {
        t.forEach(function(t) {
            t.hasOwnProperty("remove") || Object.defineProperty(t, "remove", {
                configurable: !0,
                enumerable: !0,
                writable: !0,
                value: function() {
                    null !== this.parentNode && this.parentNode.removeChild(this)
                }
            })
        })
    }([Element.prototype, CharacterData.prototype, DocumentType.prototype]), Object.values || (Object.values = function(t) {
        var e = [];
        for (var n in t) t.hasOwnProperty(n) && e.push(t[n]);
        return e
    }), /*! jQuery v3.5.1 | (c) JS Foundation and other contributors | jquery.org/license */
    ! function(t, e) {
        "use strict";
        "object" == typeof module && "object" == typeof module.exports ? module.exports = t.document ? e(t, !0) : function(t) {
            if (!t.document) throw new Error("jQuery requires a window with a document");
            return e(t)
        } : e(t)
    }("undefined" != typeof window ? window : this, function(t, e) {
        "use strict";

        function n(t, e, n) {
            var r, o, i = (n = n || ft).createElement("script");
            if (i.text = t, e)
                for (r in pt)(o = e[r] || e.getAttribute && e.getAttribute(r)) && i.setAttribute(r, o);
            n.head.appendChild(i).parentNode.removeChild(i)
        }

        function r(t) {
            return null == t ? t + "" : "object" == typeof t || "function" == typeof t ? rt[ot.call(t)] || "object" : typeof t
        }

        function o(t) {
            var e = !!t && "length" in t && t.length,
                n = r(t);
            return !lt(t) && !ct(t) && ("array" === n || 0 === e || "number" == typeof e && 0 < e && e - 1 in t)
        }

        function i(t, e) {
            return t.nodeName && t.nodeName.toLowerCase() === e.toLowerCase()
        }

        function a(t, e, n) {
            return lt(e) ? dt.grep(t, function(t, r) {
                return !!e.call(t, r, t) !== n
            }) : e.nodeType ? dt.grep(t, function(t) {
                return t === e !== n
            }) : "string" != typeof e ? dt.grep(t, function(t) {
                return -1 < nt.call(e, t) !== n
            }) : dt.filter(e, t, n)
        }

        function s(t, e) {
            for (;
                (t = t[e]) && 1 !== t.nodeType;);
            return t
        }

        function u(t) {
            return t
        }

        function l(t) {
            throw t
        }

        function c(t, e, n, r) {
            var o;
            try {
                t && lt(o = t.promise) ? o.call(t).done(e).fail(n) : t && lt(o = t.then) ? o.call(t, e, n) : e.apply(void 0, [t].slice(r))
            } catch (t) {
                n.apply(void 0, [t])
            }
        }

        function f() {
            ft.removeEventListener("DOMContentLoaded", f), t.removeEventListener("load", f), dt.ready()
        }

        function p(t, e) {
            return e.toUpperCase()
        }

        function h(t) {
            return t.replace(jt, "ms-").replace(Ot, p)
        }

        function d() {
            this.expando = dt.expando + d.uid++
        }

        function y(t, e, n) {
            var r, o;
            if (void 0 === n && 1 === t.nodeType)
                if (r = "data-" + e.replace(Dt, "-$&").toLowerCase(), "string" == typeof(n = t.getAttribute(r))) {
                    try {
                        n = "true" === (o = n) || "false" !== o && ("null" === o ? null : o === +o + "" ? +o : Nt.test(o) ? JSON.parse(o) : o)
                    } catch (t) {}
                    At.set(t, e, n)
                } else n = void 0;
            return n
        }

        function v(t, e, n, r) {
            var o, i, a = 20,
                s = r ? function() {
                    return r.cur()
                } : function() {
                    return dt.css(t, e, "")
                },
                u = s(),
                l = n && n[3] || (dt.cssNumber[e] ? "" : "px"),
                c = t.nodeType && (dt.cssNumber[e] || "px" !== l && +u) && It.exec(dt.css(t, e));
            if (c && c[3] !== l) {
                for (u /= 2, l = l || c[3], c = +u || 1; a--;) dt.style(t, e, c + l), (1 - i) * (1 - (i = s() / u || .5)) <= 0 && (a = 0), c /= i;
                c *= 2, dt.style(t, e, c + l), n = n || []
            }
            return n && (c = +c || +u || 0, o = n[1] ? c + (n[1] + 1) * n[2] : +n[2], r && (r.unit = l, r.start = c, r.end = o)), o
        }

        function g(t, e) {
            for (var n, r, o, i, a, s, u, l = [], c = 0, f = t.length; c < f; c++)(r = t[c]).style && (n = r.style.display, e ? ("none" === n && (l[c] = Mt.get(r, "display") || null, l[c] || (r.style.display = "")), "" === r.style.display && zt(r) && (l[c] = (u = a = i = void 0, a = (o = r).ownerDocument, s = o.nodeName, (u = Ut[s]) || (i = a.body.appendChild(a.createElement(s)), u = dt.css(i, "display"), i.parentNode.removeChild(i), "none" === u && (u = "block"), Ut[s] = u)))) : "none" !== n && (l[c] = "none", Mt.set(r, "display", n)));
            for (c = 0; c < f; c++) null != l[c] && (t[c].style.display = l[c]);
            return t
        }

        function m(t, e) {
            var n;
            return n = "undefined" != typeof t.getElementsByTagName ? t.getElementsByTagName(e || "*") : "undefined" != typeof t.querySelectorAll ? t.querySelectorAll(e || "*") : [], void 0 === e || e && i(t, e) ? dt.merge([t], n) : n
        }

        function b(t, e) {
            for (var n = 0, r = t.length; n < r; n++) Mt.set(t[n], "globalEval", !e || Mt.get(e[n], "globalEval"))
        }

        function _(t, e, n, o, i) {
            for (var a, s, u, l, c, f, p = e.createDocumentFragment(), h = [], d = 0, y = t.length; d < y; d++)
                if ((a = t[d]) || 0 === a)
                    if ("object" === r(a)) dt.merge(h, a.nodeType ? [a] : a);
                    else if (Yt.test(a)) {
                for (s = s || p.appendChild(e.createElement("div")), u = ($t.exec(a) || ["", ""])[1].toLowerCase(), l = Gt[u] || Gt._default, s.innerHTML = l[1] + dt.htmlPrefilter(a) + l[2], f = l[0]; f--;) s = s.lastChild;
                dt.merge(h, s.childNodes), (s = p.firstChild).textContent = ""
            } else h.push(e.createTextNode(a));
            for (p.textContent = "", d = 0; a = h[d++];)
                if (o && -1 < dt.inArray(a, o)) i && i.push(a);
                else if (c = Ht(a), s = m(p.appendChild(a), "script"), c && b(s), n)
                for (f = 0; a = s[f++];) Xt.test(a.type || "") && n.push(a);
            return p
        }

        function w() {
            return !0
        }

        function T() {
            return !1
        }

        function E(t, e) {
            return t === function() {
                try {
                    return ft.activeElement
                } catch (t) {}
            }() == ("focus" === e)
        }

        function x(t, e, n, r, o, i) {
            var a, s;
            if ("object" == typeof e) {
                for (s in "string" != typeof n && (r = r || n, n = void 0), e) x(t, s, n, r, e[s], i);
                return t
            }
            if (null == r && null == o ? (o = n, r = n = void 0) : null == o && ("string" == typeof n ? (o = r, r = void 0) : (o = r, r = n, n = void 0)), !1 === o) o = T;
            else if (!o) return t;
            return 1 === i && (a = o, (o = function(t) {
                return dt().off(t), a.apply(this, arguments)
            }).guid = a.guid || (a.guid = dt.guid++)), t.each(function() {
                dt.event.add(this, e, o, r, n)
            })
        }

        function C(t, e, n) {
            n ? (Mt.set(t, e, !1), dt.event.add(t, e, {
                namespace: !1,
                handler: function(t) {
                    var r, o, i = Mt.get(this, e);
                    if (1 & t.isTrigger && this[e]) {
                        if (i.length)(dt.event.special[e] || {}).delegateType && t.stopPropagation();
                        else if (i = Z.call(arguments), Mt.set(this, e, i), r = n(this, e), this[e](), i !== (o = Mt.get(this, e)) || r ? Mt.set(this, e, !1) : o = {}, i !== o) return t.stopImmediatePropagation(), t.preventDefault(), o.value
                    } else i.length && (Mt.set(this, e, {
                        value: dt.event.trigger(dt.extend(i[0], dt.Event.prototype), i.slice(1), this)
                    }), t.stopImmediatePropagation())
                }
            })) : void 0 === Mt.get(t, e) && dt.event.add(t, e, w)
        }

        function k(t, e) {
            return i(t, "table") && i(11 !== e.nodeType ? e : e.firstChild, "tr") && dt(t).children("tbody")[0] || t
        }

        function S(t) {
            return t.type = (null !== t.getAttribute("type")) + "/" + t.type, t
        }

        function j(t) {
            return "true/" === (t.type || "").slice(0, 5) ? t.type = t.type.slice(5) : t.removeAttribute("type"), t
        }

        function O(t, e) {
            var n, r, o, i, a, s;
            if (1 === e.nodeType) {
                if (Mt.hasData(t) && (s = Mt.get(t).events))
                    for (o in Mt.remove(e, "handle events"), s)
                        for (n = 0, r = s[o].length; n < r; n++) dt.event.add(e, o, s[o][n]);
                At.hasData(t) && (i = At.access(t), a = dt.extend({}, i), At.set(e, a))
            }
        }

        function P(t, e, r, o) {
            e = tt(e);
            var i, a, s, u, l, c, f = 0,
                p = t.length,
                h = p - 1,
                d = e[0],
                y = lt(d);
            if (y || 1 < p && "string" == typeof d && !ut.checkClone && te.test(d)) return t.each(function(n) {
                var i = t.eq(n);
                y && (e[0] = d.call(this, n, i.html())), P(i, e, r, o)
            });
            if (p && (a = (i = _(e, t[0].ownerDocument, !1, t, o)).firstChild, 1 === i.childNodes.length && (i = a), a || o)) {
                for (u = (s = dt.map(m(i, "script"), S)).length; f < p; f++) l = i, f !== h && (l = dt.clone(l, !0, !0), u && dt.merge(s, m(l, "script"))), r.call(t[f], l, f);
                if (u)
                    for (c = s[s.length - 1].ownerDocument, dt.map(s, j), f = 0; f < u; f++) l = s[f], Xt.test(l.type || "") && !Mt.access(l, "globalEval") && dt.contains(c, l) && (l.src && "module" !== (l.type || "").toLowerCase() ? dt._evalUrl && !l.noModule && dt._evalUrl(l.src, {
                        nonce: l.nonce || l.getAttribute("nonce")
                    }, c) : n(l.textContent.replace(ee, ""), l, c))
            }
            return t
        }

        function M(t, e, n) {
            for (var r, o = e ? dt.filter(e, t) : t, i = 0; null != (r = o[i]); i++) n || 1 !== r.nodeType || dt.cleanData(m(r)), r.parentNode && (n && Ht(r) && b(m(r, "script")), r.parentNode.removeChild(r));
            return t
        }

        function A(t, e, n) {
            var r, o, i, a, s = t.style;
            return (n = n || re(t)) && ("" !== (a = n.getPropertyValue(e) || n[e]) || Ht(t) || (a = dt.style(t, e)), !ut.pixelBoxStyles() && ne.test(a) && ie.test(e) && (r = s.width, o = s.minWidth, i = s.maxWidth, s.minWidth = s.maxWidth = s.width = a, a = n.width, s.width = r, s.minWidth = o, s.maxWidth = i)), void 0 !== a ? a + "" : a
        }

        function N(t, e) {
            return {
                get: function() {
                    return t() ? void delete this.get : (this.get = e).apply(this, arguments)
                }
            }
        }

        function D(t) {
            var e = dt.cssProps[t] || ue[t];
            return e || (t in se ? t : ue[t] = function(t) {
                for (var e = t[0].toUpperCase() + t.slice(1), n = ae.length; n--;)
                    if ((t = ae[n] + e) in se) return t
            }(t) || t)
        }

        function L(t, e, n) {
            var r = It.exec(e);
            return r ? Math.max(0, r[2] - (n || 0)) + (r[3] || "px") : e
        }

        function I(t, e, n, r, o, i) {
            var a = "width" === e ? 1 : 0,
                s = 0,
                u = 0;
            if (n === (r ? "border" : "content")) return 0;
            for (; a < 4; a += 2) "margin" === n && (u += dt.css(t, n + Rt[a], !0, o)), r ? ("content" === n && (u -= dt.css(t, "padding" + Rt[a], !0, o)), "margin" !== n && (u -= dt.css(t, "border" + Rt[a] + "Width", !0, o))) : (u += dt.css(t, "padding" + Rt[a], !0, o), "padding" !== n ? u += dt.css(t, "border" + Rt[a] + "Width", !0, o) : s += dt.css(t, "border" + Rt[a] + "Width", !0, o));
            return !r && 0 <= i && (u += Math.max(0, Math.ceil(t["offset" + e[0].toUpperCase() + e.slice(1)] - i - u - s - .5)) || 0), u
        }

        function R(t, e, n) {
            var r = re(t),
                o = (!ut.boxSizingReliable() || n) && "border-box" === dt.css(t, "boxSizing", !1, r),
                a = o,
                s = A(t, e, r),
                u = "offset" + e[0].toUpperCase() + e.slice(1);
            if (ne.test(s)) {
                if (!n) return s;
                s = "auto"
            }
            return (!ut.boxSizingReliable() && o || !ut.reliableTrDimensions() && i(t, "tr") || "auto" === s || !parseFloat(s) && "inline" === dt.css(t, "display", !1, r)) && t.getClientRects().length && (o = "border-box" === dt.css(t, "boxSizing", !1, r), (a = u in t) && (s = t[u])), (s = parseFloat(s) || 0) + I(t, e, n || (o ? "border" : "content"), a, r, s) + "px"
        }

        function F(t, e, n, r, o) {
            return new F.prototype.init(t, e, n, r, o)
        }

        function H() {
            de && (!1 === ft.hidden && t.requestAnimationFrame ? t.requestAnimationFrame(H) : t.setTimeout(H, dt.fx.interval), dt.fx.tick())
        }

        function B() {
            return t.setTimeout(function() {
                he = void 0
            }), he = Date.now()
        }

        function z(t, e) {
            var n, r = 0,
                o = {
                    height: t
                };
            for (e = e ? 1 : 0; r < 4; r += 2 - e) o["margin" + (n = Rt[r])] = o["padding" + n] = t;
            return e && (o.opacity = o.width = t), o
        }

        function U(t, e, n) {
            for (var r, o = (V.tweeners[e] || []).concat(V.tweeners["*"]), i = 0, a = o.length; i < a; i++)
                if (r = o[i].call(n, e, t)) return r
        }

        function V(t, e, n) {
            var r, o, i = 0,
                a = V.prefilters.length,
                s = dt.Deferred().always(function() {
                    delete u.elem
                }),
                u = function() {
                    if (o) return !1;
                    for (var e = he || B(), n = Math.max(0, l.startTime + l.duration - e), r = 1 - (n / l.duration || 0), i = 0, a = l.tweens.length; i < a; i++) l.tweens[i].run(r);
                    return s.notifyWith(t, [l, r, n]), r < 1 && a ? n : (a || s.notifyWith(t, [l, 1, 0]), s.resolveWith(t, [l]), !1)
                },
                l = s.promise({
                    elem: t,
                    props: dt.extend({}, e),
                    opts: dt.extend(!0, {
                        specialEasing: {},
                        easing: dt.easing._default
                    }, n),
                    originalProperties: e,
                    originalOptions: n,
                    startTime: he || B(),
                    duration: n.duration,
                    tweens: [],
                    createTween: function(e, n) {
                        var r = dt.Tween(t, l.opts, e, n, l.opts.specialEasing[e] || l.opts.easing);
                        return l.tweens.push(r), r
                    },
                    stop: function(e) {
                        var n = 0,
                            r = e ? l.tweens.length : 0;
                        if (o) return this;
                        for (o = !0; n < r; n++) l.tweens[n].run(1);
                        return e ? (s.notifyWith(t, [l, 1, 0]), s.resolveWith(t, [l, e])) : s.rejectWith(t, [l, e]), this
                    }
                }),
                c = l.props;
            for ((! function(t, e) {
                    var n, r, o, i, a;
                    for (n in t)
                        if (o = e[r = h(n)], i = t[n], Array.isArray(i) && (o = i[1], i = t[n] = i[0]), n !== r && (t[r] = i, delete t[n]), (a = dt.cssHooks[r]) && "expand" in a)
                            for (n in i = a.expand(i), delete t[r], i) n in t || (t[n] = i[n], e[n] = o);
                        else e[r] = o
                }(c, l.opts.specialEasing)); i < a; i++)
                if (r = V.prefilters[i].call(l, t, c, l.opts)) return lt(r.stop) && (dt._queueHooks(l.elem, l.opts.queue).stop = r.stop.bind(r)), r;
            return dt.map(c, U, l), lt(l.opts.start) && l.opts.start.call(t, l), l.progress(l.opts.progress).done(l.opts.done, l.opts.complete).fail(l.opts.fail).always(l.opts.always), dt.fx.timer(dt.extend(u, {
                elem: t,
                anim: l,
                queue: l.opts.queue
            })), l
        }

        function q(t) {
            return (t.match(xt) || []).join(" ")
        }

        function W(t) {
            return t.getAttribute && t.getAttribute("class") || ""
        }

        function $(t) {
            return Array.isArray(t) ? t : "string" == typeof t && t.match(xt) || []
        }

        function X(t, e, n, o) {
            var i;
            if (Array.isArray(e)) dt.each(e, function(e, r) {
                n || Oe.test(t) ? o(t, r) : X(t + "[" + ("object" == typeof r && null != r ? e : "") + "]", r, n, o)
            });
            else if (n || "object" !== r(e)) o(t, e);
            else
                for (i in e) X(t + "[" + i + "]", e[i], n, o)
        }

        function G(t) {
            return function(e, n) {
                "string" != typeof e && (n = e, e = "*");
                var r, o = 0,
                    i = e.toLowerCase().match(xt) || [];
                if (lt(n))
                    for (; r = i[o++];) "+" === r[0] ? (r = r.slice(1) || "*", (t[r] = t[r] || []).unshift(n)) : (t[r] = t[r] || []).push(n)
            }
        }

        function Y(t, e, n, r) {
            function o(s) {
                var u;
                return i[s] = !0, dt.each(t[s] || [], function(t, s) {
                    var l = s(e, n, r);
                    return "string" != typeof l || a || i[l] ? a ? !(u = l) : void 0 : (e.dataTypes.unshift(l), o(l), !1)
                }), u
            }
            var i = {},
                a = t === Be;
            return o(e.dataTypes[0]) || !i["*"] && o("*")
        }

        function Q(t, e) {
            var n, r, o = dt.ajaxSettings.flatOptions || {};
            for (n in e) void 0 !== e[n] && ((o[n] ? t : r || (r = {}))[n] = e[n]);
            return r && dt.extend(!0, t, r), t
        }
        var K = [],
            J = Object.getPrototypeOf,
            Z = K.slice,
            tt = K.flat ? function(t) {
                return K.flat.call(t)
            } : function(t) {
                return K.concat.apply([], t)
            },
            et = K.push,
            nt = K.indexOf,
            rt = {},
            ot = rt.toString,
            it = rt.hasOwnProperty,
            at = it.toString,
            st = at.call(Object),
            ut = {},
            lt = function(t) {
                return "function" == typeof t && "number" != typeof t.nodeType
            },
            ct = function(t) {
                return null != t && t === t.window
            },
            ft = t.document,
            pt = {
                type: !0,
                src: !0,
                nonce: !0,
                noModule: !0
            },
            ht = "3.5.1",
            dt = function(t, e) {
                return new dt.fn.init(t, e)
            };
        dt.fn = dt.prototype = {
            jquery: ht,
            constructor: dt,
            length: 0,
            toArray: function() {
                return Z.call(this)
            },
            get: function(t) {
                return null == t ? Z.call(this) : t < 0 ? this[t + this.length] : this[t]
            },
            pushStack: function(t) {
                var e = dt.merge(this.constructor(), t);
                return e.prevObject = this, e
            },
            each: function(t) {
                return dt.each(this, t)
            },
            map: function(t) {
                return this.pushStack(dt.map(this, function(e, n) {
                    return t.call(e, n, e)
                }))
            },
            slice: function() {
                return this.pushStack(Z.apply(this, arguments))
            },
            first: function() {
                return this.eq(0)
            },
            last: function() {
                return this.eq(-1)
            },
            even: function() {
                return this.pushStack(dt.grep(this, function(t, e) {
                    return (e + 1) % 2
                }))
            },
            odd: function() {
                return this.pushStack(dt.grep(this, function(t, e) {
                    return e % 2
                }))
            },
            eq: function(t) {
                var e = this.length,
                    n = +t + (t < 0 ? e : 0);
                return this.pushStack(0 <= n && n < e ? [this[n]] : [])
            },
            end: function() {
                return this.prevObject || this.constructor()
            },
            push: et,
            sort: K.sort,
            splice: K.splice
        }, dt.extend = dt.fn.extend = function() {
            var t, e, n, r, o, i, a = arguments[0] || {},
                s = 1,
                u = arguments.length,
                l = !1;
            for ("boolean" == typeof a && (l = a, a = arguments[s] || {}, s++), "object" == typeof a || lt(a) || (a = {}), s === u && (a = this, s--); s < u; s++)
                if (null != (t = arguments[s]))
                    for (e in t) r = t[e], "__proto__" !== e && a !== r && (l && r && (dt.isPlainObject(r) || (o = Array.isArray(r))) ? (n = a[e], i = o && !Array.isArray(n) ? [] : o || dt.isPlainObject(n) ? n : {}, o = !1, a[e] = dt.extend(l, i, r)) : void 0 !== r && (a[e] = r));
            return a
        }, dt.extend({
            expando: "jQuery" + (ht + Math.random()).replace(/\D/g, ""),
            isReady: !0,
            error: function(t) {
                throw new Error(t)
            },
            noop: function() {},
            isPlainObject: function(t) {
                var e, n;
                return !(!t || "[object Object]" !== ot.call(t) || (e = J(t)) && ("function" != typeof(n = it.call(e, "constructor") && e.constructor) || at.call(n) !== st))
            },
            isEmptyObject: function(t) {
                var e;
                for (e in t) return !1;
                return !0
            },
            globalEval: function(t, e, r) {
                n(t, {
                    nonce: e && e.nonce
                }, r)
            },
            each: function(t, e) {
                var n, r = 0;
                if (o(t))
                    for (n = t.length; r < n && !1 !== e.call(t[r], r, t[r]); r++);
                else
                    for (r in t)
                        if (!1 === e.call(t[r], r, t[r])) break;
                return t
            },
            makeArray: function(t, e) {
                var n = e || [];
                return null != t && (o(Object(t)) ? dt.merge(n, "string" == typeof t ? [t] : t) : et.call(n, t)), n
            },
            inArray: function(t, e, n) {
                return null == e ? -1 : nt.call(e, t, n)
            },
            merge: function(t, e) {
                for (var n = +e.length, r = 0, o = t.length; r < n; r++) t[o++] = e[r];
                return t.length = o, t
            },
            grep: function(t, e, n) {
                for (var r = [], o = 0, i = t.length, a = !n; o < i; o++) !e(t[o], o) !== a && r.push(t[o]);
                return r
            },
            map: function(t, e, n) {
                var r, i, a = 0,
                    s = [];
                if (o(t))
                    for (r = t.length; a < r; a++) null != (i = e(t[a], a, n)) && s.push(i);
                else
                    for (a in t) null != (i = e(t[a], a, n)) && s.push(i);
                return tt(s)
            },
            guid: 1,
            support: ut
        }), "function" == typeof Symbol && (dt.fn[Symbol.iterator] = K[Symbol.iterator]), dt.each("Boolean Number String Function Array Date RegExp Object Error Symbol".split(" "), function(t, e) {
            rt["[object " + e + "]"] = e.toLowerCase()
        });
        var yt = function(t) {
            function e(t, e, n, r) {
                var o, i, a, s, u, l, c, p = e && e.ownerDocument,
                    d = e ? e.nodeType : 9;
                if (n = n || [], "string" != typeof t || !t || 1 !== d && 9 !== d && 11 !== d) return n;
                if (!r && (P(e), e = e || M, N)) {
                    if (11 !== d && (u = gt.exec(t)))
                        if (o = u[1]) {
                            if (9 === d) {
                                if (!(a = e.getElementById(o))) return n;
                                if (a.id === o) return n.push(a), n
                            } else if (p && (a = p.getElementById(o)) && R(e, a) && a.id === o) return n.push(a), n
                        } else {
                            if (u[2]) return K.apply(n, e.getElementsByTagName(t)), n;
                            if ((o = u[3]) && _.getElementsByClassName && e.getElementsByClassName) return K.apply(n, e.getElementsByClassName(o)), n
                        } if (_.qsa && !W[t + " "] && (!D || !D.test(t)) && (1 !== d || "object" !== e.nodeName.toLowerCase())) {
                        if (c = t, p = e, 1 === d && (lt.test(t) || ut.test(t))) {
                            for ((p = mt.test(t) && f(e.parentNode) || e) === e && _.scope || ((s = e.getAttribute("id")) ? s = s.replace(wt, Tt) : e.setAttribute("id", s = F)), i = (l = x(t)).length; i--;) l[i] = (s ? "#" + s : ":scope") + " " + h(l[i]);
                            c = l.join(",")
                        }
                        try {
                            return K.apply(n, p.querySelectorAll(c)), n
                        } catch (e) {
                            W(t, !0)
                        } finally {
                            s === F && e.removeAttribute("id")
                        }
                    }
                }
                return k(t.replace(at, "$1"), e, n, r)
            }

            function n() {
                var t = [];
                return function e(n, r) {
                    return t.push(n + " ") > w.cacheLength && delete e[t.shift()], e[n + " "] = r
                }
            }

            function r(t) {
                return t[F] = !0, t
            }

            function o(t) {
                var e = M.createElement("fieldset");
                try {
                    return !!t(e)
                } catch (t) {
                    return !1
                } finally {
                    e.parentNode && e.parentNode.removeChild(e), e = null
                }
            }

            function i(t, e) {
                for (var n = t.split("|"), r = n.length; r--;) w.attrHandle[n[r]] = e
            }

            function a(t, e) {
                var n = e && t,
                    r = n && 1 === t.nodeType && 1 === e.nodeType && t.sourceIndex - e.sourceIndex;
                if (r) return r;
                if (n)
                    for (; n = n.nextSibling;)
                        if (n === e) return -1;
                return t ? 1 : -1
            }

            function s(t) {
                return function(e) {
                    return "input" === e.nodeName.toLowerCase() && e.type === t
                }
            }

            function u(t) {
                return function(e) {
                    var n = e.nodeName.toLowerCase();
                    return ("input" === n || "button" === n) && e.type === t
                }
            }

            function l(t) {
                return function(e) {
                    return "form" in e ? e.parentNode && !1 === e.disabled ? "label" in e ? "label" in e.parentNode ? e.parentNode.disabled === t : e.disabled === t : e.isDisabled === t || e.isDisabled !== !t && xt(e) === t : e.disabled === t : "label" in e && e.disabled === t
                }
            }

            function c(t) {
                return r(function(e) {
                    return e = +e, r(function(n, r) {
                        for (var o, i = t([], n.length, e), a = i.length; a--;) n[o = i[a]] && (n[o] = !(r[o] = n[o]))
                    })
                })
            }

            function f(t) {
                return t && "undefined" != typeof t.getElementsByTagName && t
            }

            function p() {}

            function h(t) {
                for (var e = 0, n = t.length, r = ""; e < n; e++) r += t[e].value;
                return r
            }

            function d(t, e, n) {
                var r = e.dir,
                    o = e.next,
                    i = o || r,
                    a = n && "parentNode" === i,
                    s = z++;
                return e.first ? function(e, n, o) {
                    for (; e = e[r];)
                        if (1 === e.nodeType || a) return t(e, n, o);
                    return !1
                } : function(e, n, u) {
                    var l, c, f, p = [B, s];
                    if (u) {
                        for (; e = e[r];)
                            if ((1 === e.nodeType || a) && t(e, n, u)) return !0
                    } else
                        for (; e = e[r];)
                            if (1 === e.nodeType || a)
                                if (c = (f = e[F] || (e[F] = {}))[e.uniqueID] || (f[e.uniqueID] = {}), o && o === e.nodeName.toLowerCase()) e = e[r] || e;
                                else {
                                    if ((l = c[i]) && l[0] === B && l[1] === s) return p[2] = l[2];
                                    if ((c[i] = p)[2] = t(e, n, u)) return !0
                                } return !1
                }
            }

            function y(t) {
                return 1 < t.length ? function(e, n, r) {
                    for (var o = t.length; o--;)
                        if (!t[o](e, n, r)) return !1;
                    return !0
                } : t[0]
            }

            function v(t, e, n, r, o) {
                for (var i, a = [], s = 0, u = t.length, l = null != e; s < u; s++)(i = t[s]) && (n && !n(i, r, o) || (a.push(i), l && e.push(s)));
                return a
            }

            function g(t, n, o, i, a, s) {
                return i && !i[F] && (i = g(i)), a && !a[F] && (a = g(a, s)), r(function(r, s, u, l) {
                    var c, f, p, h = [],
                        d = [],
                        y = s.length,
                        g = r || function(t, n, r) {
                            for (var o = 0, i = n.length; o < i; o++) e(t, n[o], r);
                            return r
                        }(n || "*", u.nodeType ? [u] : u, []),
                        m = !t || !r && n ? g : v(g, h, t, u, l),
                        b = o ? a || (r ? t : y || i) ? [] : s : m;
                    if (o && o(m, b, u, l), i)
                        for (c = v(b, d), i(c, [], u, l), f = c.length; f--;)(p = c[f]) && (b[d[f]] = !(m[d[f]] = p));
                    if (r) {
                        if (a || t) {
                            if (a) {
                                for (c = [], f = b.length; f--;)(p = b[f]) && c.push(m[f] = p);
                                a(null, b = [], c, l)
                            }
                            for (f = b.length; f--;)(p = b[f]) && -1 < (c = a ? Z(r, p) : h[f]) && (r[c] = !(s[c] = p))
                        }
                    } else b = v(b === s ? b.splice(y, b.length) : b), a ? a(null, s, b, l) : K.apply(s, b)
                })
            }

            function m(t) {
                for (var e, n, r, o = t.length, i = w.relative[t[0].type], a = i || w.relative[" "], s = i ? 1 : 0, u = d(function(t) {
                        return t === e
                    }, a, !0), l = d(function(t) {
                        return -1 < Z(e, t)
                    }, a, !0), c = [function(t, n, r) {
                        var o = !i && (r || n !== S) || ((e = n).nodeType ? u(t, n, r) : l(t, n, r));
                        return e = null, o
                    }]; s < o; s++)
                    if (n = w.relative[t[s].type]) c = [d(y(c), n)];
                    else {
                        if ((n = w.filter[t[s].type].apply(null, t[s].matches))[F]) {
                            for (r = ++s; r < o && !w.relative[t[r].type]; r++);
                            return g(1 < s && y(c), 1 < s && h(t.slice(0, s - 1).concat({
                                value: " " === t[s - 2].type ? "*" : ""
                            })).replace(at, "$1"), n, s < r && m(t.slice(s, r)), r < o && m(t = t.slice(r)), r < o && h(t))
                        }
                        c.push(n)
                    } return y(c)
            }
            var b, _, w, T, E, x, C, k, S, j, O, P, M, A, N, D, L, I, R, F = "sizzle" + 1 * new Date,
                H = t.document,
                B = 0,
                z = 0,
                U = n(),
                V = n(),
                q = n(),
                W = n(),
                $ = function(t, e) {
                    return t === e && (O = !0), 0
                },
                X = {}.hasOwnProperty,
                G = [],
                Y = G.pop,
                Q = G.push,
                K = G.push,
                J = G.slice,
                Z = function(t, e) {
                    for (var n = 0, r = t.length; n < r; n++)
                        if (t[n] === e) return n;
                    return -1
                },
                tt = "checked|selected|async|autofocus|autoplay|controls|defer|disabled|hidden|ismap|loop|multiple|open|readonly|required|scoped",
                et = "[\\x20\\t\\r\\n\\f]",
                nt = "(?:\\\\[\\da-fA-F]{1,6}" + et + "?|\\\\[^\\r\\n\\f]|[\\w-]|[^\0-\\x7f])+",
                rt = "\\[" + et + "*(" + nt + ")(?:" + et + "*([*^$|!~]?=)" + et + "*(?:'((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\"|(" + nt + "))|)" + et + "*\\]",
                ot = ":(" + nt + ")(?:\\((('((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\")|((?:\\\\.|[^\\\\()[\\]]|" + rt + ")*)|.*)\\)|)",
                it = new RegExp(et + "+", "g"),
                at = new RegExp("^" + et + "+|((?:^|[^\\\\])(?:\\\\.)*)" + et + "+$", "g"),
                st = new RegExp("^" + et + "*," + et + "*"),
                ut = new RegExp("^" + et + "*([>+~]|" + et + ")" + et + "*"),
                lt = new RegExp(et + "|>"),
                ct = new RegExp(ot),
                ft = new RegExp("^" + nt + "$"),
                pt = {
                    ID: new RegExp("^#(" + nt + ")"),
                    CLASS: new RegExp("^\\.(" + nt + ")"),
                    TAG: new RegExp("^(" + nt + "|[*])"),
                    ATTR: new RegExp("^" + rt),
                    PSEUDO: new RegExp("^" + ot),
                    CHILD: new RegExp("^:(only|first|last|nth|nth-last)-(child|of-type)(?:\\(" + et + "*(even|odd|(([+-]|)(\\d*)n|)" + et + "*(?:([+-]|)" + et + "*(\\d+)|))" + et + "*\\)|)", "i"),
                    bool: new RegExp("^(?:" + tt + ")$", "i"),
                    needsContext: new RegExp("^" + et + "*[>+~]|:(even|odd|eq|gt|lt|nth|first|last)(?:\\(" + et + "*((?:-\\d)?\\d*)" + et + "*\\)|)(?=[^-]|$)", "i")
                },
                ht = /HTML$/i,
                dt = /^(?:input|select|textarea|button)$/i,
                yt = /^h\d$/i,
                vt = /^[^{]+\{\s*\[native \w/,
                gt = /^(?:#([\w-]+)|(\w+)|\.([\w-]+))$/,
                mt = /[+~]/,
                bt = new RegExp("\\\\[\\da-fA-F]{1,6}" + et + "?|\\\\([^\\r\\n\\f])", "g"),
                _t = function(t, e) {
                    var n = "0x" + t.slice(1) - 65536;
                    return e || (n < 0 ? String.fromCharCode(n + 65536) : String.fromCharCode(n >> 10 | 55296, 1023 & n | 56320))
                },
                wt = /([\0-\x1f\x7f]|^-?\d)|^-$|[^\0-\x1f\x7f-\uFFFF\w-]/g,
                Tt = function(t, e) {
                    return e ? "\0" === t ? "\ufffd" : t.slice(0, -1) + "\\" + t.charCodeAt(t.length - 1).toString(16) + " " : "\\" + t
                },
                Et = function() {
                    P()
                },
                xt = d(function(t) {
                    return !0 === t.disabled && "fieldset" === t.nodeName.toLowerCase()
                }, {
                    dir: "parentNode",
                    next: "legend"
                });
            try {
                K.apply(G = J.call(H.childNodes), H.childNodes), G[H.childNodes.length].nodeType
            } catch (b) {
                K = {
                    apply: G.length ? function(t, e) {
                        Q.apply(t, J.call(e))
                    } : function(t, e) {
                        for (var n = t.length, r = 0; t[n++] = e[r++];);
                        t.length = n - 1
                    }
                }
            }
            for (b in _ = e.support = {}, E = e.isXML = function(t) {
                    var e = t.namespaceURI,
                        n = (t.ownerDocument || t).documentElement;
                    return !ht.test(e || n && n.nodeName || "HTML")
                }, P = e.setDocument = function(t) {
                    var e, n, r = t ? t.ownerDocument || t : H;
                    return r != M && 9 === r.nodeType && r.documentElement && (A = (M = r).documentElement, N = !E(M), H != M && (n = M.defaultView) && n.top !== n && (n.addEventListener ? n.addEventListener("unload", Et, !1) : n.attachEvent && n.attachEvent("onunload", Et)), _.scope = o(function(t) {
                        return A.appendChild(t).appendChild(M.createElement("div")), "undefined" != typeof t.querySelectorAll && !t.querySelectorAll(":scope fieldset div").length
                    }), _.attributes = o(function(t) {
                        return t.className = "i", !t.getAttribute("className")
                    }), _.getElementsByTagName = o(function(t) {
                        return t.appendChild(M.createComment("")), !t.getElementsByTagName("*").length
                    }), _.getElementsByClassName = vt.test(M.getElementsByClassName), _.getById = o(function(t) {
                        return A.appendChild(t).id = F, !M.getElementsByName || !M.getElementsByName(F).length
                    }), _.getById ? (w.filter.ID = function(t) {
                        var e = t.replace(bt, _t);
                        return function(t) {
                            return t.getAttribute("id") === e
                        }
                    }, w.find.ID = function(t, e) {
                        if ("undefined" != typeof e.getElementById && N) {
                            var n = e.getElementById(t);
                            return n ? [n] : []
                        }
                    }) : (w.filter.ID = function(t) {
                        var e = t.replace(bt, _t);
                        return function(t) {
                            var n = "undefined" != typeof t.getAttributeNode && t.getAttributeNode("id");
                            return n && n.value === e
                        }
                    }, w.find.ID = function(t, e) {
                        if ("undefined" != typeof e.getElementById && N) {
                            var n, r, o, i = e.getElementById(t);
                            if (i) {
                                if ((n = i.getAttributeNode("id")) && n.value === t) return [i];
                                for (o = e.getElementsByName(t), r = 0; i = o[r++];)
                                    if ((n = i.getAttributeNode("id")) && n.value === t) return [i]
                            }
                            return []
                        }
                    }), w.find.TAG = _.getElementsByTagName ? function(t, e) {
                        return "undefined" != typeof e.getElementsByTagName ? e.getElementsByTagName(t) : _.qsa ? e.querySelectorAll(t) : void 0
                    } : function(t, e) {
                        var n, r = [],
                            o = 0,
                            i = e.getElementsByTagName(t);
                        if ("*" === t) {
                            for (; n = i[o++];) 1 === n.nodeType && r.push(n);
                            return r
                        }
                        return i
                    }, w.find.CLASS = _.getElementsByClassName && function(t, e) {
                        if ("undefined" != typeof e.getElementsByClassName && N) return e.getElementsByClassName(t)
                    }, L = [], D = [], (_.qsa = vt.test(M.querySelectorAll)) && (o(function(t) {
                        var e;
                        A.appendChild(t).innerHTML = "<a id='" + F + "'></a><select id='" + F + "-\r\\' msallowcapture=''><option selected=''></option></select>", t.querySelectorAll("[msallowcapture^='']").length && D.push("[*^$]=" + et + "*(?:''|\"\")"), t.querySelectorAll("[selected]").length || D.push("\\[" + et + "*(?:value|" + tt + ")"), t.querySelectorAll("[id~=" + F + "-]").length || D.push("~="), (e = M.createElement("input")).setAttribute("name", ""), t.appendChild(e), t.querySelectorAll("[name='']").length || D.push("\\[" + et + "*name" + et + "*=" + et + "*(?:''|\"\")"), t.querySelectorAll(":checked").length || D.push(":checked"), t.querySelectorAll("a#" + F + "+*").length || D.push(".#.+[+~]"), t.querySelectorAll("\\\f"), D.push("[\\r\\n\\f]")
                    }), o(function(t) {
                        t.innerHTML = "<a href='' disabled='disabled'></a><select disabled='disabled'><option/></select>";
                        var e = M.createElement("input");
                        e.setAttribute("type", "hidden"), t.appendChild(e).setAttribute("name", "D"), t.querySelectorAll("[name=d]").length && D.push("name" + et + "*[*^$|!~]?="), 2 !== t.querySelectorAll(":enabled").length && D.push(":enabled", ":disabled"), A.appendChild(t).disabled = !0, 2 !== t.querySelectorAll(":disabled").length && D.push(":enabled", ":disabled"), t.querySelectorAll("*,:x"), D.push(",.*:")
                    })), (_.matchesSelector = vt.test(I = A.matches || A.webkitMatchesSelector || A.mozMatchesSelector || A.oMatchesSelector || A.msMatchesSelector)) && o(function(t) {
                        _.disconnectedMatch = I.call(t, "*"), I.call(t, "[s!='']:x"), L.push("!=", ot)
                    }), D = D.length && new RegExp(D.join("|")), L = L.length && new RegExp(L.join("|")), e = vt.test(A.compareDocumentPosition), R = e || vt.test(A.contains) ? function(t, e) {
                        var n = 9 === t.nodeType ? t.documentElement : t,
                            r = e && e.parentNode;
                        return t === r || !(!r || 1 !== r.nodeType || !(n.contains ? n.contains(r) : t.compareDocumentPosition && 16 & t.compareDocumentPosition(r)))
                    } : function(t, e) {
                        if (e)
                            for (; e = e.parentNode;)
                                if (e === t) return !0;
                        return !1
                    }, $ = e ? function(t, e) {
                        if (t === e) return O = !0, 0;
                        var n = !t.compareDocumentPosition - !e.compareDocumentPosition;
                        return n || (1 & (n = (t.ownerDocument || t) == (e.ownerDocument || e) ? t.compareDocumentPosition(e) : 1) || !_.sortDetached && e.compareDocumentPosition(t) === n ? t == M || t.ownerDocument == H && R(H, t) ? -1 : e == M || e.ownerDocument == H && R(H, e) ? 1 : j ? Z(j, t) - Z(j, e) : 0 : 4 & n ? -1 : 1)
                    } : function(t, e) {
                        if (t === e) return O = !0, 0;
                        var n, r = 0,
                            o = t.parentNode,
                            i = e.parentNode,
                            s = [t],
                            u = [e];
                        if (!o || !i) return t == M ? -1 : e == M ? 1 : o ? -1 : i ? 1 : j ? Z(j, t) - Z(j, e) : 0;
                        if (o === i) return a(t, e);
                        for (n = t; n = n.parentNode;) s.unshift(n);
                        for (n = e; n = n.parentNode;) u.unshift(n);
                        for (; s[r] === u[r];) r++;
                        return r ? a(s[r], u[r]) : s[r] == H ? -1 : u[r] == H ? 1 : 0
                    }), M
                }, e.matches = function(t, n) {
                    return e(t, null, null, n)
                }, e.matchesSelector = function(t, n) {
                    if (P(t), _.matchesSelector && N && !W[n + " "] && (!L || !L.test(n)) && (!D || !D.test(n))) try {
                        var r = I.call(t, n);
                        if (r || _.disconnectedMatch || t.document && 11 !== t.document.nodeType) return r
                    } catch (t) {
                        W(n, !0)
                    }
                    return 0 < e(n, M, null, [t]).length
                }, e.contains = function(t, e) {
                    return (t.ownerDocument || t) != M && P(t), R(t, e)
                }, e.attr = function(t, e) {
                    (t.ownerDocument || t) != M && P(t);
                    var n = w.attrHandle[e.toLowerCase()],
                        r = n && X.call(w.attrHandle, e.toLowerCase()) ? n(t, e, !N) : void 0;
                    return void 0 !== r ? r : _.attributes || !N ? t.getAttribute(e) : (r = t.getAttributeNode(e)) && r.specified ? r.value : null
                }, e.escape = function(t) {
                    return (t + "").replace(wt, Tt)
                }, e.error = function(t) {
                    throw new Error("Syntax error, unrecognized expression: " + t)
                }, e.uniqueSort = function(t) {
                    var e, n = [],
                        r = 0,
                        o = 0;
                    if (O = !_.detectDuplicates, j = !_.sortStable && t.slice(0), t.sort($), O) {
                        for (; e = t[o++];) e === t[o] && (r = n.push(o));
                        for (; r--;) t.splice(n[r], 1)
                    }
                    return j = null, t
                }, T = e.getText = function(t) {
                    var e, n = "",
                        r = 0,
                        o = t.nodeType;
                    if (o) {
                        if (1 === o || 9 === o || 11 === o) {
                            if ("string" == typeof t.textContent) return t.textContent;
                            for (t = t.firstChild; t; t = t.nextSibling) n += T(t)
                        } else if (3 === o || 4 === o) return t.nodeValue
                    } else
                        for (; e = t[r++];) n += T(e);
                    return n
                }, (w = e.selectors = {
                    cacheLength: 50,
                    createPseudo: r,
                    match: pt,
                    attrHandle: {},
                    find: {},
                    relative: {
                        ">": {
                            dir: "parentNode",
                            first: !0
                        },
                        " ": {
                            dir: "parentNode"
                        },
                        "+": {
                            dir: "previousSibling",
                            first: !0
                        },
                        "~": {
                            dir: "previousSibling"
                        }
                    },
                    preFilter: {
                        ATTR: function(t) {
                            return t[1] = t[1].replace(bt, _t), t[3] = (t[3] || t[4] || t[5] || "").replace(bt, _t), "~=" === t[2] && (t[3] = " " + t[3] + " "), t.slice(0, 4)
                        },
                        CHILD: function(t) {
                            return t[1] = t[1].toLowerCase(), "nth" === t[1].slice(0, 3) ? (t[3] || e.error(t[0]), t[4] = +(t[4] ? t[5] + (t[6] || 1) : 2 * ("even" === t[3] || "odd" === t[3])), t[5] = +(t[7] + t[8] || "odd" === t[3])) : t[3] && e.error(t[0]), t
                        },
                        PSEUDO: function(t) {
                            var e, n = !t[6] && t[2];
                            return pt.CHILD.test(t[0]) ? null : (t[3] ? t[2] = t[4] || t[5] || "" : n && ct.test(n) && (e = x(n, !0)) && (e = n.indexOf(")", n.length - e) - n.length) && (t[0] = t[0].slice(0, e), t[2] = n.slice(0, e)), t.slice(0, 3))
                        }
                    },
                    filter: {
                        TAG: function(t) {
                            var e = t.replace(bt, _t).toLowerCase();
                            return "*" === t ? function() {
                                return !0
                            } : function(t) {
                                return t.nodeName && t.nodeName.toLowerCase() === e
                            }
                        },
                        CLASS: function(t) {
                            var e = U[t + " "];
                            return e || (e = new RegExp("(^|" + et + ")" + t + "(" + et + "|$)")) && U(t, function(t) {
                                return e.test("string" == typeof t.className && t.className || "undefined" != typeof t.getAttribute && t.getAttribute("class") || "")
                            })
                        },
                        ATTR: function(t, n, r) {
                            return function(o) {
                                var i = e.attr(o, t);
                                return null == i ? "!=" === n : !n || (i += "", "=" === n ? i === r : "!=" === n ? i !== r : "^=" === n ? r && 0 === i.indexOf(r) : "*=" === n ? r && -1 < i.indexOf(r) : "$=" === n ? r && i.slice(-r.length) === r : "~=" === n ? -1 < (" " + i.replace(it, " ") + " ").indexOf(r) : "|=" === n && (i === r || i.slice(0, r.length + 1) === r + "-"))
                            }
                        },
                        CHILD: function(t, e, n, r, o) {
                            var i = "nth" !== t.slice(0, 3),
                                a = "last" !== t.slice(-4),
                                s = "of-type" === e;
                            return 1 === r && 0 === o ? function(t) {
                                return !!t.parentNode
                            } : function(e, n, u) {
                                var l, c, f, p, h, d, y = i !== a ? "nextSibling" : "previousSibling",
                                    v = e.parentNode,
                                    g = s && e.nodeName.toLowerCase(),
                                    m = !u && !s,
                                    b = !1;
                                if (v) {
                                    if (i) {
                                        for (; y;) {
                                            for (p = e; p = p[y];)
                                                if (s ? p.nodeName.toLowerCase() === g : 1 === p.nodeType) return !1;
                                            d = y = "only" === t && !d && "nextSibling"
                                        }
                                        return !0
                                    }
                                    if (d = [a ? v.firstChild : v.lastChild], a && m) {
                                        for (b = (h = (l = (c = (f = (p = v)[F] || (p[F] = {}))[p.uniqueID] || (f[p.uniqueID] = {}))[t] || [])[0] === B && l[1]) && l[2], p = h && v.childNodes[h]; p = ++h && p && p[y] || (b = h = 0) || d.pop();)
                                            if (1 === p.nodeType && ++b && p === e) {
                                                c[t] = [B, h, b];
                                                break
                                            }
                                    } else if (m && (b = h = (l = (c = (f = (p = e)[F] || (p[F] = {}))[p.uniqueID] || (f[p.uniqueID] = {}))[t] || [])[0] === B && l[1]), !1 === b)
                                        for (;
                                            (p = ++h && p && p[y] || (b = h = 0) || d.pop()) && ((s ? p.nodeName.toLowerCase() !== g : 1 !== p.nodeType) || !++b || (m && ((c = (f = p[F] || (p[F] = {}))[p.uniqueID] || (f[p.uniqueID] = {}))[t] = [B, b]), p !== e)););
                                    return (b -= o) === r || b % r == 0 && 0 <= b / r
                                }
                            }
                        },
                        PSEUDO: function(t, n) {
                            var o, i = w.pseudos[t] || w.setFilters[t.toLowerCase()] || e.error("unsupported pseudo: " + t);
                            return i[F] ? i(n) : 1 < i.length ? (o = [t, t, "", n], w.setFilters.hasOwnProperty(t.toLowerCase()) ? r(function(t, e) {
                                for (var r, o = i(t, n), a = o.length; a--;) t[r = Z(t, o[a])] = !(e[r] = o[a])
                            }) : function(t) {
                                return i(t, 0, o)
                            }) : i
                        }
                    },
                    pseudos: {
                        not: r(function(t) {
                            var e = [],
                                n = [],
                                o = C(t.replace(at, "$1"));
                            return o[F] ? r(function(t, e, n, r) {
                                for (var i, a = o(t, null, r, []), s = t.length; s--;)(i = a[s]) && (t[s] = !(e[s] = i))
                            }) : function(t, r, i) {
                                return e[0] = t, o(e, null, i, n), e[0] = null, !n.pop()
                            }
                        }),
                        has: r(function(t) {
                            return function(n) {
                                return 0 < e(t, n).length
                            }
                        }),
                        contains: r(function(t) {
                            return t = t.replace(bt, _t),
                                function(e) {
                                    return -1 < (e.textContent || T(e)).indexOf(t)
                                }
                        }),
                        lang: r(function(t) {
                            return ft.test(t || "") || e.error("unsupported lang: " + t), t = t.replace(bt, _t).toLowerCase(),
                                function(e) {
                                    var n;
                                    do
                                        if (n = N ? e.lang : e.getAttribute("xml:lang") || e.getAttribute("lang")) return (n = n.toLowerCase()) === t || 0 === n.indexOf(t + "-"); while ((e = e.parentNode) && 1 === e.nodeType);
                                    return !1
                                }
                        }),
                        target: function(e) {
                            var n = t.location && t.location.hash;
                            return n && n.slice(1) === e.id
                        },
                        root: function(t) {
                            return t === A
                        },
                        focus: function(t) {
                            return t === M.activeElement && (!M.hasFocus || M.hasFocus()) && !!(t.type || t.href || ~t.tabIndex)
                        },
                        enabled: l(!1),
                        disabled: l(!0),
                        checked: function(t) {
                            var e = t.nodeName.toLowerCase();
                            return "input" === e && !!t.checked || "option" === e && !!t.selected
                        },
                        selected: function(t) {
                            return t.parentNode && t.parentNode.selectedIndex, !0 === t.selected
                        },
                        empty: function(t) {
                            for (t = t.firstChild; t; t = t.nextSibling)
                                if (t.nodeType < 6) return !1;
                            return !0
                        },
                        parent: function(t) {
                            return !w.pseudos.empty(t)
                        },
                        header: function(t) {
                            return yt.test(t.nodeName)
                        },
                        input: function(t) {
                            return dt.test(t.nodeName)
                        },
                        button: function(t) {
                            var e = t.nodeName.toLowerCase();
                            return "input" === e && "button" === t.type || "button" === e
                        },
                        text: function(t) {
                            var e;
                            return "input" === t.nodeName.toLowerCase() && "text" === t.type && (null == (e = t.getAttribute("type")) || "text" === e.toLowerCase())
                        },
                        first: c(function() {
                            return [0]
                        }),
                        last: c(function(t, e) {
                            return [e - 1]
                        }),
                        eq: c(function(t, e, n) {
                            return [n < 0 ? n + e : n]
                        }),
                        even: c(function(t, e) {
                            for (var n = 0; n < e; n += 2) t.push(n);
                            return t
                        }),
                        odd: c(function(t, e) {
                            for (var n = 1; n < e; n += 2) t.push(n);
                            return t
                        }),
                        lt: c(function(t, e, n) {
                            for (var r = n < 0 ? n + e : e < n ? e : n; 0 <= --r;) t.push(r);
                            return t
                        }),
                        gt: c(function(t, e, n) {
                            for (var r = n < 0 ? n + e : n; ++r < e;) t.push(r);
                            return t
                        })
                    }
                }).pseudos.nth = w.pseudos.eq, {
                    radio: !0,
                    checkbox: !0,
                    file: !0,
                    password: !0,
                    image: !0
                }) w.pseudos[b] = s(b);
            for (b in {
                    submit: !0,
                    reset: !0
                }) w.pseudos[b] = u(b);
            return p.prototype = w.filters = w.pseudos, w.setFilters = new p, x = e.tokenize = function(t, n) {
                var r, o, i, a, s, u, l, c = V[t + " "];
                if (c) return n ? 0 : c.slice(0);
                for (s = t, u = [], l = w.preFilter; s;) {
                    for (a in r && !(o = st.exec(s)) || (o && (s = s.slice(o[0].length) || s), u.push(i = [])), r = !1, (o = ut.exec(s)) && (r = o.shift(), i.push({
                            value: r,
                            type: o[0].replace(at, " ")
                        }), s = s.slice(r.length)), w.filter) !(o = pt[a].exec(s)) || l[a] && !(o = l[a](o)) || (r = o.shift(), i.push({
                        value: r,
                        type: a,
                        matches: o
                    }), s = s.slice(r.length));
                    if (!r) break
                }
                return n ? s.length : s ? e.error(t) : V(t, u).slice(0)
            }, C = e.compile = function(t, n) {
                var o, i, a, s, u, l, c = [],
                    f = [],
                    p = q[t + " "];
                if (!p) {
                    for (n || (n = x(t)), o = n.length; o--;)(p = m(n[o]))[F] ? c.push(p) : f.push(p);
                    (p = q(t, (i = f, s = 0 < (a = c).length, u = 0 < i.length, l = function(t, n, r, o, l) {
                        var c, f, p, h = 0,
                            d = "0",
                            y = t && [],
                            g = [],
                            m = S,
                            b = t || u && w.find.TAG("*", l),
                            _ = B += null == m ? 1 : Math.random() || .1,
                            T = b.length;
                        for (l && (S = n == M || n || l); d !== T && null != (c = b[d]); d++) {
                            if (u && c) {
                                for (f = 0, n || c.ownerDocument == M || (P(c), r = !N); p = i[f++];)
                                    if (p(c, n || M, r)) {
                                        o.push(c);
                                        break
                                    } l && (B = _)
                            }
                            s && ((c = !p && c) && h--, t && y.push(c))
                        }
                        if (h += d, s && d !== h) {
                            for (f = 0; p = a[f++];) p(y, g, n, r);
                            if (t) {
                                if (0 < h)
                                    for (; d--;) y[d] || g[d] || (g[d] = Y.call(o));
                                g = v(g)
                            }
                            K.apply(o, g), l && !t && 0 < g.length && 1 < h + a.length && e.uniqueSort(o)
                        }
                        return l && (B = _, S = m), y
                    }, s ? r(l) : l))).selector = t
                }
                return p
            }, k = e.select = function(t, e, n, r) {
                var o, i, a, s, u, l = "function" == typeof t && t,
                    c = !r && x(t = l.selector || t);
                if (n = n || [], 1 === c.length) {
                    if (2 < (i = c[0] = c[0].slice(0)).length && "ID" === (a = i[0]).type && 9 === e.nodeType && N && w.relative[i[1].type]) {
                        if (!(e = (w.find.ID(a.matches[0].replace(bt, _t), e) || [])[0])) return n;
                        l && (e = e.parentNode), t = t.slice(i.shift().value.length)
                    }
                    for (o = pt.needsContext.test(t) ? 0 : i.length; o-- && (a = i[o], !w.relative[s = a.type]);)
                        if ((u = w.find[s]) && (r = u(a.matches[0].replace(bt, _t), mt.test(i[0].type) && f(e.parentNode) || e))) {
                            if (i.splice(o, 1), !(t = r.length && h(i))) return K.apply(n, r), n;
                            break
                        }
                }
                return (l || C(t, c))(r, e, !N, n, !e || mt.test(t) && f(e.parentNode) || e), n
            }, _.sortStable = F.split("").sort($).join("") === F, _.detectDuplicates = !!O, P(), _.sortDetached = o(function(t) {
                return 1 & t.compareDocumentPosition(M.createElement("fieldset"))
            }), o(function(t) {
                return t.innerHTML = "<a href='#'></a>", "#" === t.firstChild.getAttribute("href")
            }) || i("type|href|height|width", function(t, e, n) {
                if (!n) return t.getAttribute(e, "type" === e.toLowerCase() ? 1 : 2)
            }), _.attributes && o(function(t) {
                return t.innerHTML = "<input/>", t.firstChild.setAttribute("value", ""), "" === t.firstChild.getAttribute("value")
            }) || i("value", function(t, e, n) {
                if (!n && "input" === t.nodeName.toLowerCase()) return t.defaultValue
            }), o(function(t) {
                return null == t.getAttribute("disabled")
            }) || i(tt, function(t, e, n) {
                var r;
                if (!n) return !0 === t[e] ? e.toLowerCase() : (r = t.getAttributeNode(e)) && r.specified ? r.value : null
            }), e
        }(t);
        dt.find = yt, dt.expr = yt.selectors, dt.expr[":"] = dt.expr.pseudos, dt.uniqueSort = dt.unique = yt.uniqueSort, dt.text = yt.getText, dt.isXMLDoc = yt.isXML, dt.contains = yt.contains, dt.escapeSelector = yt.escape;
        var vt = function(t, e, n) {
                for (var r = [], o = void 0 !== n;
                    (t = t[e]) && 9 !== t.nodeType;)
                    if (1 === t.nodeType) {
                        if (o && dt(t).is(n)) break;
                        r.push(t)
                    } return r
            },
            gt = function(t, e) {
                for (var n = []; t; t = t.nextSibling) 1 === t.nodeType && t !== e && n.push(t);
                return n
            },
            mt = dt.expr.match.needsContext,
            bt = /^<([a-z][^\/\0>:\x20\t\r\n\f]*)[\x20\t\r\n\f]*\/?>(?:<\/\1>|)$/i;
        dt.filter = function(t, e, n) {
            var r = e[0];
            return n && (t = ":not(" + t + ")"), 1 === e.length && 1 === r.nodeType ? dt.find.matchesSelector(r, t) ? [r] : [] : dt.find.matches(t, dt.grep(e, function(t) {
                return 1 === t.nodeType
            }))
        }, dt.fn.extend({
            find: function(t) {
                var e, n, r = this.length,
                    o = this;
                if ("string" != typeof t) return this.pushStack(dt(t).filter(function() {
                    for (e = 0; e < r; e++)
                        if (dt.contains(o[e], this)) return !0
                }));
                for (n = this.pushStack([]), e = 0; e < r; e++) dt.find(t, o[e], n);
                return 1 < r ? dt.uniqueSort(n) : n
            },
            filter: function(t) {
                return this.pushStack(a(this, t || [], !1))
            },
            not: function(t) {
                return this.pushStack(a(this, t || [], !0))
            },
            is: function(t) {
                return !!a(this, "string" == typeof t && mt.test(t) ? dt(t) : t || [], !1).length
            }
        });
        var _t, wt = /^(?:\s*(<[\w\W]+>)[^>]*|#([\w-]+))$/;
        (dt.fn.init = function(t, e, n) {
            var r, o;
            if (!t) return this;
            if (n = n || _t, "string" == typeof t) {
                if (!(r = "<" === t[0] && ">" === t[t.length - 1] && 3 <= t.length ? [null, t, null] : wt.exec(t)) || !r[1] && e) return !e || e.jquery ? (e || n).find(t) : this.constructor(e).find(t);
                if (r[1]) {
                    if (e = e instanceof dt ? e[0] : e, dt.merge(this, dt.parseHTML(r[1], e && e.nodeType ? e.ownerDocument || e : ft, !0)), bt.test(r[1]) && dt.isPlainObject(e))
                        for (r in e) lt(this[r]) ? this[r](e[r]) : this.attr(r, e[r]);
                    return this
                }
                return (o = ft.getElementById(r[2])) && (this[0] = o, this.length = 1), this
            }
            return t.nodeType ? (this[0] = t, this.length = 1, this) : lt(t) ? void 0 !== n.ready ? n.ready(t) : t(dt) : dt.makeArray(t, this)
        }).prototype = dt.fn, _t = dt(ft);
        var Tt = /^(?:parents|prev(?:Until|All))/,
            Et = {
                children: !0,
                contents: !0,
                next: !0,
                prev: !0
            };
        dt.fn.extend({
            has: function(t) {
                var e = dt(t, this),
                    n = e.length;
                return this.filter(function() {
                    for (var t = 0; t < n; t++)
                        if (dt.contains(this, e[t])) return !0
                })
            },
            closest: function(t, e) {
                var n, r = 0,
                    o = this.length,
                    i = [],
                    a = "string" != typeof t && dt(t);
                if (!mt.test(t))
                    for (; r < o; r++)
                        for (n = this[r]; n && n !== e; n = n.parentNode)
                            if (n.nodeType < 11 && (a ? -1 < a.index(n) : 1 === n.nodeType && dt.find.matchesSelector(n, t))) {
                                i.push(n);
                                break
                            } return this.pushStack(1 < i.length ? dt.uniqueSort(i) : i)
            },
            index: function(t) {
                return t ? "string" == typeof t ? nt.call(dt(t), this[0]) : nt.call(this, t.jquery ? t[0] : t) : this[0] && this[0].parentNode ? this.first().prevAll().length : -1
            },
            add: function(t, e) {
                return this.pushStack(dt.uniqueSort(dt.merge(this.get(), dt(t, e))))
            },
            addBack: function(t) {
                return this.add(null == t ? this.prevObject : this.prevObject.filter(t))
            }
        }), dt.each({
            parent: function(t) {
                var e = t.parentNode;
                return e && 11 !== e.nodeType ? e : null
            },
            parents: function(t) {
                return vt(t, "parentNode")
            },
            parentsUntil: function(t, e, n) {
                return vt(t, "parentNode", n)
            },
            next: function(t) {
                return s(t, "nextSibling")
            },
            prev: function(t) {
                return s(t, "previousSibling")
            },
            nextAll: function(t) {
                return vt(t, "nextSibling")
            },
            prevAll: function(t) {
                return vt(t, "previousSibling")
            },
            nextUntil: function(t, e, n) {
                return vt(t, "nextSibling", n)
            },
            prevUntil: function(t, e, n) {
                return vt(t, "previousSibling", n)
            },
            siblings: function(t) {
                return gt((t.parentNode || {}).firstChild, t)
            },
            children: function(t) {
                return gt(t.firstChild)
            },
            contents: function(t) {
                return null != t.contentDocument && J(t.contentDocument) ? t.contentDocument : (i(t, "template") && (t = t.content || t), dt.merge([], t.childNodes))
            }
        }, function(t, e) {
            dt.fn[t] = function(n, r) {
                var o = dt.map(this, e, n);
                return "Until" !== t.slice(-5) && (r = n), r && "string" == typeof r && (o = dt.filter(r, o)), 1 < this.length && (Et[t] || dt.uniqueSort(o), Tt.test(t) && o.reverse()), this.pushStack(o)
            }
        });
        var xt = /[^\x20\t\r\n\f]+/g;
        dt.Callbacks = function(t) {
            var e, n;
            t = "string" == typeof t ? (e = t, n = {}, dt.each(e.match(xt) || [], function(t, e) {
                n[e] = !0
            }), n) : dt.extend({}, t);
            var o, i, a, s, u = [],
                l = [],
                c = -1,
                f = function() {
                    for (s = s || t.once, a = o = !0; l.length; c = -1)
                        for (i = l.shift(); ++c < u.length;) !1 === u[c].apply(i[0], i[1]) && t.stopOnFalse && (c = u.length, i = !1);
                    t.memory || (i = !1), o = !1, s && (u = i ? [] : "")
                },
                p = {
                    add: function() {
                        return u && (i && !o && (c = u.length - 1, l.push(i)), function e(n) {
                            dt.each(n, function(n, o) {
                                lt(o) ? t.unique && p.has(o) || u.push(o) : o && o.length && "string" !== r(o) && e(o)
                            })
                        }(arguments), i && !o && f()), this
                    },
                    remove: function() {
                        return dt.each(arguments, function(t, e) {
                            for (var n; - 1 < (n = dt.inArray(e, u, n));) u.splice(n, 1), n <= c && c--
                        }), this
                    },
                    has: function(t) {
                        return t ? -1 < dt.inArray(t, u) : 0 < u.length
                    },
                    empty: function() {
                        return u && (u = []), this
                    },
                    disable: function() {
                        return s = l = [], u = i = "", this
                    },
                    disabled: function() {
                        return !u
                    },
                    lock: function() {
                        return s = l = [], i || o || (u = i = ""), this
                    },
                    locked: function() {
                        return !!s
                    },
                    fireWith: function(t, e) {
                        return s || (e = [t, (e = e || []).slice ? e.slice() : e], l.push(e), o || f()), this
                    },
                    fire: function() {
                        return p.fireWith(this, arguments), this
                    },
                    fired: function() {
                        return !!a
                    }
                };
            return p
        }, dt.extend({
            Deferred: function(e) {
                var n = [
                        ["notify", "progress", dt.Callbacks("memory"), dt.Callbacks("memory"), 2],
                        ["resolve", "done", dt.Callbacks("once memory"), dt.Callbacks("once memory"), 0, "resolved"],
                        ["reject", "fail", dt.Callbacks("once memory"), dt.Callbacks("once memory"), 1, "rejected"]
                    ],
                    r = "pending",
                    o = {
                        state: function() {
                            return r
                        },
                        always: function() {
                            return i.done(arguments).fail(arguments), this
                        },
                        "catch": function(t) {
                            return o.then(null, t)
                        },
                        pipe: function() {
                            var t = arguments;
                            return dt.Deferred(function(e) {
                                dt.each(n, function(n, r) {
                                    var o = lt(t[r[4]]) && t[r[4]];
                                    i[r[1]](function() {
                                        var t = o && o.apply(this, arguments);
                                        t && lt(t.promise) ? t.promise().progress(e.notify).done(e.resolve).fail(e.reject) : e[r[0] + "With"](this, o ? [t] : arguments)
                                    })
                                }), t = null
                            }).promise()
                        },
                        then: function(e, r, o) {
                            function i(e, n, r, o) {
                                return function() {
                                    var s = this,
                                        c = arguments,
                                        f = function() {
                                            var t, f;
                                            if (!(e < a)) {
                                                if ((t = r.apply(s, c)) === n.promise()) throw new TypeError("Thenable self-resolution");
                                                f = t && ("object" == typeof t || "function" == typeof t) && t.then, lt(f) ? o ? f.call(t, i(a, n, u, o), i(a, n, l, o)) : (a++, f.call(t, i(a, n, u, o), i(a, n, l, o), i(a, n, u, n.notifyWith))) : (r !== u && (s = void 0, c = [t]), (o || n.resolveWith)(s, c))
                                            }
                                        },
                                        p = o ? f : function() {
                                            try {
                                                t()
                                            } catch (t) {
                                                dt.Deferred.exceptionHook && dt.Deferred.exceptionHook(t, p.stackTrace), a <= e + 1 && (r !== l && (s = void 0, c = [t]), n.rejectWith(s, c))
                                            }
                                        };
                                    e ? p() : (dt.Deferred.getStackHook && (p.stackTrace = dt.Deferred.getStackHook()), t.setTimeout(p))
                                }
                            }
                            var a = 0;
                            return dt.Deferred(function(t) {
                                n[0][3].add(i(0, t, lt(o) ? o : u, t.notifyWith)), n[1][3].add(i(0, t, lt(e) ? e : u)), n[2][3].add(i(0, t, lt(r) ? r : l))
                            }).promise()
                        },
                        promise: function(t) {
                            return null != t ? dt.extend(t, o) : o
                        }
                    },
                    i = {};
                return dt.each(n, function(t, e) {
                    var a = e[2],
                        s = e[5];
                    o[e[1]] = a.add, s && a.add(function() {
                        r = s
                    }, n[3 - t][2].disable, n[3 - t][3].disable, n[0][2].lock, n[0][3].lock), a.add(e[3].fire), i[e[0]] = function() {
                        return i[e[0] + "With"](this === i ? void 0 : this, arguments), this
                    }, i[e[0] + "With"] = a.fireWith
                }), o.promise(i), e && e.call(i, i), i
            },
            when: function(t) {
                var e = arguments.length,
                    n = e,
                    r = Array(n),
                    o = Z.call(arguments),
                    i = dt.Deferred(),
                    a = function(t) {
                        return function(n) {
                            r[t] = this, o[t] = 1 < arguments.length ? Z.call(arguments) : n, --e || i.resolveWith(r, o)
                        }
                    };
                if (e <= 1 && (c(t, i.done(a(n)).resolve, i.reject, !e), "pending" === i.state() || lt(o[n] && o[n].then))) return i.then();
                for (; n--;) c(o[n], a(n), i.reject);
                return i.promise()
            }
        });
        var Ct = /^(Eval|Internal|Range|Reference|Syntax|Type|URI)Error$/;
        dt.Deferred.exceptionHook = function(e, n) {
            t.console && t.console.warn && e && Ct.test(e.name) && t.console.warn("jQuery.Deferred exception: " + e.message, e.stack, n)
        }, dt.readyException = function(e) {
            t.setTimeout(function() {
                throw e
            })
        };
        var kt = dt.Deferred();
        dt.fn.ready = function(t) {
            return kt.then(t)["catch"](function(t) {
                dt.readyException(t)
            }), this
        }, dt.extend({
            isReady: !1,
            readyWait: 1,
            ready: function(t) {
                (!0 === t ? --dt.readyWait : dt.isReady) || (dt.isReady = !0) !== t && 0 < --dt.readyWait || kt.resolveWith(ft, [dt])
            }
        }), dt.ready.then = kt.then, "complete" === ft.readyState || "loading" !== ft.readyState && !ft.documentElement.doScroll ? t.setTimeout(dt.ready) : (ft.addEventListener("DOMContentLoaded", f), t.addEventListener("load", f));
        var St = function(t, e, n, o, i, a, s) {
                var u = 0,
                    l = t.length,
                    c = null == n;
                if ("object" === r(n))
                    for (u in i = !0, n) St(t, e, u, n[u], !0, a, s);
                else if (void 0 !== o && (i = !0, lt(o) || (s = !0), c && (s ? (e.call(t, o), e = null) : (c = e, e = function(t, e, n) {
                        return c.call(dt(t), n)
                    })), e))
                    for (; u < l; u++) e(t[u], n, s ? o : o.call(t[u], u, e(t[u], n)));
                return i ? t : c ? e.call(t) : l ? e(t[0], n) : a
            },
            jt = /^-ms-/,
            Ot = /-([a-z])/g,
            Pt = function(t) {
                return 1 === t.nodeType || 9 === t.nodeType || !+t.nodeType
            };
        d.uid = 1, d.prototype = {
            cache: function(t) {
                var e = t[this.expando];
                return e || (e = {}, Pt(t) && (t.nodeType ? t[this.expando] = e : Object.defineProperty(t, this.expando, {
                    value: e,
                    configurable: !0
                }))), e
            },
            set: function(t, e, n) {
                var r, o = this.cache(t);
                if ("string" == typeof e) o[h(e)] = n;
                else
                    for (r in e) o[h(r)] = e[r];
                return o
            },
            get: function(t, e) {
                return void 0 === e ? this.cache(t) : t[this.expando] && t[this.expando][h(e)]
            },
            access: function(t, e, n) {
                return void 0 === e || e && "string" == typeof e && void 0 === n ? this.get(t, e) : (this.set(t, e, n), void 0 !== n ? n : e)
            },
            remove: function(t, e) {
                var n, r = t[this.expando];
                if (void 0 !== r) {
                    if (void 0 !== e) {
                        n = (e = Array.isArray(e) ? e.map(h) : (e = h(e)) in r ? [e] : e.match(xt) || []).length;
                        for (; n--;) delete r[e[n]]
                    }(void 0 === e || dt.isEmptyObject(r)) && (t.nodeType ? t[this.expando] = void 0 : delete t[this.expando])
                }
            },
            hasData: function(t) {
                var e = t[this.expando];
                return void 0 !== e && !dt.isEmptyObject(e)
            }
        };
        var Mt = new d,
            At = new d,
            Nt = /^(?:\{[\w\W]*\}|\[[\w\W]*\])$/,
            Dt = /[A-Z]/g;
        dt.extend({
            hasData: function(t) {
                return At.hasData(t) || Mt.hasData(t)
            },
            data: function(t, e, n) {
                return At.access(t, e, n)
            },
            removeData: function(t, e) {
                At.remove(t, e)
            },
            _data: function(t, e, n) {
                return Mt.access(t, e, n)
            },
            _removeData: function(t, e) {
                Mt.remove(t, e)
            }
        }), dt.fn.extend({
            data: function(t, e) {
                var n, r, o, i = this[0],
                    a = i && i.attributes;
                if (void 0 === t) {
                    if (this.length && (o = At.get(i), 1 === i.nodeType && !Mt.get(i, "hasDataAttrs"))) {
                        for (n = a.length; n--;) a[n] && 0 === (r = a[n].name).indexOf("data-") && (r = h(r.slice(5)), y(i, r, o[r]));
                        Mt.set(i, "hasDataAttrs", !0)
                    }
                    return o
                }
                return "object" == typeof t ? this.each(function() {
                    At.set(this, t)
                }) : St(this, function(e) {
                    var n;
                    return i && void 0 === e ? void 0 !== (n = At.get(i, t)) ? n : void 0 !== (n = y(i, t)) ? n : void 0 : void this.each(function() {
                        At.set(this, t, e)
                    })
                }, null, e, 1 < arguments.length, null, !0)
            },
            removeData: function(t) {
                return this.each(function() {
                    At.remove(this, t)
                })
            }
        }), dt.extend({
            queue: function(t, e, n) {
                var r;
                if (t) return e = (e || "fx") + "queue", r = Mt.get(t, e), n && (!r || Array.isArray(n) ? r = Mt.access(t, e, dt.makeArray(n)) : r.push(n)), r || []
            },
            dequeue: function(t, e) {
                e = e || "fx";
                var n = dt.queue(t, e),
                    r = n.length,
                    o = n.shift(),
                    i = dt._queueHooks(t, e);
                "inprogress" === o && (o = n.shift(), r--), o && ("fx" === e && n.unshift("inprogress"), delete i.stop, o.call(t, function() {
                    dt.dequeue(t, e)
                }, i)), !r && i && i.empty.fire()
            },
            _queueHooks: function(t, e) {
                var n = e + "queueHooks";
                return Mt.get(t, n) || Mt.access(t, n, {
                    empty: dt.Callbacks("once memory").add(function() {
                        Mt.remove(t, [e + "queue", n])
                    })
                })
            }
        }), dt.fn.extend({
            queue: function(t, e) {
                var n = 2;
                return "string" != typeof t && (e = t, t = "fx", n--), arguments.length < n ? dt.queue(this[0], t) : void 0 === e ? this : this.each(function() {
                    var n = dt.queue(this, t, e);
                    dt._queueHooks(this, t), "fx" === t && "inprogress" !== n[0] && dt.dequeue(this, t)
                })
            },
            dequeue: function(t) {
                return this.each(function() {
                    dt.dequeue(this, t)
                })
            },
            clearQueue: function(t) {
                return this.queue(t || "fx", [])
            },
            promise: function(t, e) {
                var n, r = 1,
                    o = dt.Deferred(),
                    i = this,
                    a = this.length,
                    s = function() {
                        --r || o.resolveWith(i, [i])
                    };
                for ("string" != typeof t && (e = t, t = void 0), t = t || "fx"; a--;)(n = Mt.get(i[a], t + "queueHooks")) && n.empty && (r++, n.empty.add(s));
                return s(), o.promise(e)
            }
        });
        var Lt = /[+-]?(?:\d*\.|)\d+(?:[eE][+-]?\d+|)/.source,
            It = new RegExp("^(?:([+-])=|)(" + Lt + ")([a-z%]*)$", "i"),
            Rt = ["Top", "Right", "Bottom", "Left"],
            Ft = ft.documentElement,
            Ht = function(t) {
                return dt.contains(t.ownerDocument, t)
            },
            Bt = {
                composed: !0
            };
        Ft.getRootNode && (Ht = function(t) {
            return dt.contains(t.ownerDocument, t) || t.getRootNode(Bt) === t.ownerDocument
        });
        var zt = function(t, e) {
                return "none" === (t = e || t).style.display || "" === t.style.display && Ht(t) && "none" === dt.css(t, "display")
            },
            Ut = {};
        dt.fn.extend({
            show: function() {
                return g(this, !0)
            },
            hide: function() {
                return g(this)
            },
            toggle: function(t) {
                return "boolean" == typeof t ? t ? this.show() : this.hide() : this.each(function() {
                    zt(this) ? dt(this).show() : dt(this).hide()
                })
            }
        });
        var Vt, qt, Wt = /^(?:checkbox|radio)$/i,
            $t = /<([a-z][^\/\0>\x20\t\r\n\f]*)/i,
            Xt = /^$|^module$|\/(?:java|ecma)script/i;
        Vt = ft.createDocumentFragment().appendChild(ft.createElement("div")), (qt = ft.createElement("input")).setAttribute("type", "radio"), qt.setAttribute("checked", "checked"), qt.setAttribute("name", "t"), Vt.appendChild(qt), ut.checkClone = Vt.cloneNode(!0).cloneNode(!0).lastChild.checked, Vt.innerHTML = "<textarea>x</textarea>", ut.noCloneChecked = !!Vt.cloneNode(!0).lastChild.defaultValue, Vt.innerHTML = "<option></option>", ut.option = !!Vt.lastChild;
        var Gt = {
            thead: [1, "<table>", "</table>"],
            col: [2, "<table><colgroup>", "</colgroup></table>"],
            tr: [2, "<table><tbody>", "</tbody></table>"],
            td: [3, "<table><tbody><tr>", "</tr></tbody></table>"],
            _default: [0, "", ""]
        };
        Gt.tbody = Gt.tfoot = Gt.colgroup = Gt.caption = Gt.thead, Gt.th = Gt.td, ut.option || (Gt.optgroup = Gt.option = [1, "<select multiple='multiple'>", "</select>"]);
        var Yt = /<|&#?\w+;/,
            Qt = /^key/,
            Kt = /^(?:mouse|pointer|contextmenu|drag|drop)|click/,
            Jt = /^([^.]*)(?:\.(.+)|)/;
        dt.event = {
            global: {},
            add: function(t, e, n, r, o) {
                var i, a, s, u, l, c, f, p, h, d, y, v = Mt.get(t);
                if (Pt(t))
                    for (n.handler && (n = (i = n).handler, o = i.selector), o && dt.find.matchesSelector(Ft, o), n.guid || (n.guid = dt.guid++), (u = v.events) || (u = v.events = Object.create(null)), (a = v.handle) || (a = v.handle = function(e) {
                            return "undefined" != typeof dt && dt.event.triggered !== e.type ? dt.event.dispatch.apply(t, arguments) : void 0
                        }), l = (e = (e || "").match(xt) || [""]).length; l--;) h = y = (s = Jt.exec(e[l]) || [])[1], d = (s[2] || "").split(".").sort(), h && (f = dt.event.special[h] || {}, h = (o ? f.delegateType : f.bindType) || h, f = dt.event.special[h] || {}, c = dt.extend({
                        type: h,
                        origType: y,
                        data: r,
                        handler: n,
                        guid: n.guid,
                        selector: o,
                        needsContext: o && dt.expr.match.needsContext.test(o),
                        namespace: d.join(".")
                    }, i), (p = u[h]) || ((p = u[h] = []).delegateCount = 0, f.setup && !1 !== f.setup.call(t, r, d, a) || t.addEventListener && t.addEventListener(h, a)), f.add && (f.add.call(t, c), c.handler.guid || (c.handler.guid = n.guid)), o ? p.splice(p.delegateCount++, 0, c) : p.push(c), dt.event.global[h] = !0)
            },
            remove: function(t, e, n, r, o) {
                var i, a, s, u, l, c, f, p, h, d, y, v = Mt.hasData(t) && Mt.get(t);
                if (v && (u = v.events)) {
                    for (l = (e = (e || "").match(xt) || [""]).length; l--;)
                        if (h = y = (s = Jt.exec(e[l]) || [])[1], d = (s[2] || "").split(".").sort(), h) {
                            for (f = dt.event.special[h] || {}, p = u[h = (r ? f.delegateType : f.bindType) || h] || [], s = s[2] && new RegExp("(^|\\.)" + d.join("\\.(?:.*\\.|)") + "(\\.|$)"), a = i = p.length; i--;) c = p[i], !o && y !== c.origType || n && n.guid !== c.guid || s && !s.test(c.namespace) || r && r !== c.selector && ("**" !== r || !c.selector) || (p.splice(i, 1), c.selector && p.delegateCount--, f.remove && f.remove.call(t, c));
                            a && !p.length && (f.teardown && !1 !== f.teardown.call(t, d, v.handle) || dt.removeEvent(t, h, v.handle), delete u[h])
                        } else
                            for (h in u) dt.event.remove(t, h + e[l], n, r, !0);
                    dt.isEmptyObject(u) && Mt.remove(t, "handle events")
                }
            },
            dispatch: function(t) {
                var e, n, r, o, i, a, s = new Array(arguments.length),
                    u = dt.event.fix(t),
                    l = (Mt.get(this, "events") || Object.create(null))[u.type] || [],
                    c = dt.event.special[u.type] || {};
                for (s[0] = u, e = 1; e < arguments.length; e++) s[e] = arguments[e];
                if (u.delegateTarget = this, !c.preDispatch || !1 !== c.preDispatch.call(this, u)) {
                    for (a = dt.event.handlers.call(this, u, l), e = 0;
                        (o = a[e++]) && !u.isPropagationStopped();)
                        for (u.currentTarget = o.elem, n = 0;
                            (i = o.handlers[n++]) && !u.isImmediatePropagationStopped();) u.rnamespace && !1 !== i.namespace && !u.rnamespace.test(i.namespace) || (u.handleObj = i, u.data = i.data, void 0 !== (r = ((dt.event.special[i.origType] || {}).handle || i.handler).apply(o.elem, s)) && !1 === (u.result = r) && (u.preventDefault(), u.stopPropagation()));
                    return c.postDispatch && c.postDispatch.call(this, u), u.result
                }
            },
            handlers: function(t, e) {
                var n, r, o, i, a, s = [],
                    u = e.delegateCount,
                    l = t.target;
                if (u && l.nodeType && !("click" === t.type && 1 <= t.button))
                    for (; l !== this; l = l.parentNode || this)
                        if (1 === l.nodeType && ("click" !== t.type || !0 !== l.disabled)) {
                            for (i = [], a = {}, n = 0; n < u; n++) void 0 === a[o = (r = e[n]).selector + " "] && (a[o] = r.needsContext ? -1 < dt(o, this).index(l) : dt.find(o, this, null, [l]).length), a[o] && i.push(r);
                            i.length && s.push({
                                elem: l,
                                handlers: i
                            })
                        } return l = this, u < e.length && s.push({
                    elem: l,
                    handlers: e.slice(u)
                }), s
            },
            addProp: function(t, e) {
                Object.defineProperty(dt.Event.prototype, t, {
                    enumerable: !0,
                    configurable: !0,
                    get: lt(e) ? function() {
                        if (this.originalEvent) return e(this.originalEvent)
                    } : function() {
                        if (this.originalEvent) return this.originalEvent[t]
                    },
                    set: function(e) {
                        Object.defineProperty(this, t, {
                            enumerable: !0,
                            configurable: !0,
                            writable: !0,
                            value: e
                        })
                    }
                })
            },
            fix: function(t) {
                return t[dt.expando] ? t : new dt.Event(t)
            },
            special: {
                load: {
                    noBubble: !0
                },
                click: {
                    setup: function(t) {
                        var e = this || t;
                        return Wt.test(e.type) && e.click && i(e, "input") && C(e, "click", w), !1
                    },
                    trigger: function(t) {
                        var e = this || t;
                        return Wt.test(e.type) && e.click && i(e, "input") && C(e, "click"), !0
                    },
                    _default: function(t) {
                        var e = t.target;
                        return Wt.test(e.type) && e.click && i(e, "input") && Mt.get(e, "click") || i(e, "a")
                    }
                },
                beforeunload: {
                    postDispatch: function(t) {
                        void 0 !== t.result && t.originalEvent && (t.originalEvent.returnValue = t.result)
                    }
                }
            }
        }, dt.removeEvent = function(t, e, n) {
            t.removeEventListener && t.removeEventListener(e, n)
        }, dt.Event = function(t, e) {
            return this instanceof dt.Event ? (t && t.type ? (this.originalEvent = t, this.type = t.type, this.isDefaultPrevented = t.defaultPrevented || void 0 === t.defaultPrevented && !1 === t.returnValue ? w : T, this.target = t.target && 3 === t.target.nodeType ? t.target.parentNode : t.target, this.currentTarget = t.currentTarget, this.relatedTarget = t.relatedTarget) : this.type = t, e && dt.extend(this, e), this.timeStamp = t && t.timeStamp || Date.now(), this[dt.expando] = !0, void 0) : new dt.Event(t, e)
        }, dt.Event.prototype = {
            constructor: dt.Event,
            isDefaultPrevented: T,
            isPropagationStopped: T,
            isImmediatePropagationStopped: T,
            isSimulated: !1,
            preventDefault: function() {
                var t = this.originalEvent;
                this.isDefaultPrevented = w, t && !this.isSimulated && t.preventDefault()
            },
            stopPropagation: function() {
                var t = this.originalEvent;
                this.isPropagationStopped = w, t && !this.isSimulated && t.stopPropagation()
            },
            stopImmediatePropagation: function() {
                var t = this.originalEvent;
                this.isImmediatePropagationStopped = w, t && !this.isSimulated && t.stopImmediatePropagation(), this.stopPropagation()
            }
        }, dt.each({
            altKey: !0,
            bubbles: !0,
            cancelable: !0,
            changedTouches: !0,
            ctrlKey: !0,
            detail: !0,
            eventPhase: !0,
            metaKey: !0,
            pageX: !0,
            pageY: !0,
            shiftKey: !0,
            view: !0,
            "char": !0,
            code: !0,
            charCode: !0,
            key: !0,
            keyCode: !0,
            button: !0,
            buttons: !0,
            clientX: !0,
            clientY: !0,
            offsetX: !0,
            offsetY: !0,
            pointerId: !0,
            pointerType: !0,
            screenX: !0,
            screenY: !0,
            targetTouches: !0,
            toElement: !0,
            touches: !0,
            which: function(t) {
                var e = t.button;
                return null == t.which && Qt.test(t.type) ? null != t.charCode ? t.charCode : t.keyCode : !t.which && void 0 !== e && Kt.test(t.type) ? 1 & e ? 1 : 2 & e ? 3 : 4 & e ? 2 : 0 : t.which
            }
        }, dt.event.addProp), dt.each({
            focus: "focusin",
            blur: "focusout"
        }, function(t, e) {
            dt.event.special[t] = {
                setup: function() {
                    return C(this, t, E), !1
                },
                trigger: function() {
                    return C(this, t), !0
                },
                delegateType: e
            }
        }), dt.each({
            mouseenter: "mouseover",
            mouseleave: "mouseout",
            pointerenter: "pointerover",
            pointerleave: "pointerout"
        }, function(t, e) {
            dt.event.special[t] = {
                delegateType: e,
                bindType: e,
                handle: function(t) {
                    var n, r = t.relatedTarget,
                        o = t.handleObj;
                    return r && (r === this || dt.contains(this, r)) || (t.type = o.origType, n = o.handler.apply(this, arguments), t.type = e), n
                }
            }
        }), dt.fn.extend({
            on: function(t, e, n, r) {
                return x(this, t, e, n, r)
            },
            one: function(t, e, n, r) {
                return x(this, t, e, n, r, 1)
            },
            off: function(t, e, n) {
                var r, o;
                if (t && t.preventDefault && t.handleObj) return r = t.handleObj, dt(t.delegateTarget).off(r.namespace ? r.origType + "." + r.namespace : r.origType, r.selector, r.handler), this;
                if ("object" == typeof t) {
                    for (o in t) this.off(o, e, t[o]);
                    return this
                }
                return !1 !== e && "function" != typeof e || (n = e, e = void 0), !1 === n && (n = T), this.each(function() {
                    dt.event.remove(this, t, n, e)
                })
            }
        });
        var Zt = /<script|<style|<link/i,
            te = /checked\s*(?:[^=]|=\s*.checked.)/i,
            ee = /^\s*<!(?:\[CDATA\[|--)|(?:\]\]|--)>\s*$/g;
        dt.extend({
            htmlPrefilter: function(t) {
                return t
            },
            clone: function(t, e, n) {
                var r, o, i, a, s, u, l, c = t.cloneNode(!0),
                    f = Ht(t);
                if (!(ut.noCloneChecked || 1 !== t.nodeType && 11 !== t.nodeType || dt.isXMLDoc(t)))
                    for (a = m(c), r = 0, o = (i = m(t)).length; r < o; r++) s = i[r], u = a[r], "input" === (l = u.nodeName.toLowerCase()) && Wt.test(s.type) ? u.checked = s.checked : "input" !== l && "textarea" !== l || (u.defaultValue = s.defaultValue);
                if (e)
                    if (n)
                        for (i = i || m(t), a = a || m(c), r = 0, o = i.length; r < o; r++) O(i[r], a[r]);
                    else O(t, c);
                return 0 < (a = m(c, "script")).length && b(a, !f && m(t, "script")), c
            },
            cleanData: function(t) {
                for (var e, n, r, o = dt.event.special, i = 0; void 0 !== (n = t[i]); i++)
                    if (Pt(n)) {
                        if (e = n[Mt.expando]) {
                            if (e.events)
                                for (r in e.events) o[r] ? dt.event.remove(n, r) : dt.removeEvent(n, r, e.handle);
                            n[Mt.expando] = void 0
                        }
                        n[At.expando] && (n[At.expando] = void 0)
                    }
            }
        }), dt.fn.extend({
            detach: function(t) {
                return M(this, t, !0)
            },
            remove: function(t) {
                return M(this, t)
            },
            text: function(t) {
                return St(this, function(t) {
                    return void 0 === t ? dt.text(this) : this.empty().each(function() {
                        1 !== this.nodeType && 11 !== this.nodeType && 9 !== this.nodeType || (this.textContent = t)
                    })
                }, null, t, arguments.length)
            },
            append: function() {
                return P(this, arguments, function(t) {
                    1 !== this.nodeType && 11 !== this.nodeType && 9 !== this.nodeType || k(this, t).appendChild(t)
                })
            },
            prepend: function() {
                return P(this, arguments, function(t) {
                    if (1 === this.nodeType || 11 === this.nodeType || 9 === this.nodeType) {
                        var e = k(this, t);
                        e.insertBefore(t, e.firstChild)
                    }
                })
            },
            before: function() {
                return P(this, arguments, function(t) {
                    this.parentNode && this.parentNode.insertBefore(t, this)
                })
            },
            after: function() {
                return P(this, arguments, function(t) {
                    this.parentNode && this.parentNode.insertBefore(t, this.nextSibling)
                })
            },
            empty: function() {
                for (var t, e = 0; null != (t = this[e]); e++) 1 === t.nodeType && (dt.cleanData(m(t, !1)), t.textContent = "");
                return this
            },
            clone: function(t, e) {
                return t = null != t && t, e = null == e ? t : e, this.map(function() {
                    return dt.clone(this, t, e)
                })
            },
            html: function(t) {
                return St(this, function(t) {
                    var e = this[0] || {},
                        n = 0,
                        r = this.length;
                    if (void 0 === t && 1 === e.nodeType) return e.innerHTML;
                    if ("string" == typeof t && !Zt.test(t) && !Gt[($t.exec(t) || ["", ""])[1].toLowerCase()]) {
                        t = dt.htmlPrefilter(t);
                        try {
                            for (; n < r; n++) 1 === (e = this[n] || {}).nodeType && (dt.cleanData(m(e, !1)), e.innerHTML = t);
                            e = 0
                        } catch (t) {}
                    }
                    e && this.empty().append(t)
                }, null, t, arguments.length)
            },
            replaceWith: function() {
                var t = [];
                return P(this, arguments, function(e) {
                    var n = this.parentNode;
                    dt.inArray(this, t) < 0 && (dt.cleanData(m(this)), n && n.replaceChild(e, this))
                }, t)
            }
        }), dt.each({
            appendTo: "append",
            prependTo: "prepend",
            insertBefore: "before",
            insertAfter: "after",
            replaceAll: "replaceWith"
        }, function(t, e) {
            dt.fn[t] = function(t) {
                for (var n, r = [], o = dt(t), i = o.length - 1, a = 0; a <= i; a++) n = a === i ? this : this.clone(!0), dt(o[a])[e](n), et.apply(r, n.get());
                return this.pushStack(r)
            }
        });
        var ne = new RegExp("^(" + Lt + ")(?!px)[a-z%]+$", "i"),
            re = function(e) {
                var n = e.ownerDocument.defaultView;
                return n && n.opener || (n = t), n.getComputedStyle(e)
            },
            oe = function(t, e, n) {
                var r, o, i = {};
                for (o in e) i[o] = t.style[o], t.style[o] = e[o];
                for (o in r = n.call(t), e) t.style[o] = i[o];
                return r
            },
            ie = new RegExp(Rt.join("|"), "i");
        ! function() {
            function e() {
                if (c) {
                    l.style.cssText = "position:absolute;left:-11111px;width:60px;margin-top:1px;padding:0;border:0", c.style.cssText = "position:relative;display:block;box-sizing:border-box;overflow:scroll;margin:auto;border:1px;padding:1px;width:60%;top:1%", Ft.appendChild(l).appendChild(c);
                    var e = t.getComputedStyle(c);
                    r = "1%" !== e.top, u = 12 === n(e.marginLeft), c.style.right = "60%", a = 36 === n(e.right), o = 36 === n(e.width), c.style.position = "absolute", i = 12 === n(c.offsetWidth / 3), Ft.removeChild(l), c = null
                }
            }

            function n(t) {
                return Math.round(parseFloat(t))
            }
            var r, o, i, a, s, u, l = ft.createElement("div"),
                c = ft.createElement("div");
            c.style && (c.style.backgroundClip = "content-box", c.cloneNode(!0).style.backgroundClip = "", ut.clearCloneStyle = "content-box" === c.style.backgroundClip, dt.extend(ut, {
                boxSizingReliable: function() {
                    return e(), o
                },
                pixelBoxStyles: function() {
                    return e(), a
                },
                pixelPosition: function() {
                    return e(), r
                },
                reliableMarginLeft: function() {
                    return e(), u
                },
                scrollboxSize: function() {
                    return e(), i
                },
                reliableTrDimensions: function() {
                    var e, n, r, o;
                    return null == s && (e = ft.createElement("table"), n = ft.createElement("tr"), r = ft.createElement("div"), e.style.cssText = "position:absolute;left:-11111px", n.style.height = "1px", r.style.height = "9px", Ft.appendChild(e).appendChild(n).appendChild(r), o = t.getComputedStyle(n), s = 3 < parseInt(o.height), Ft.removeChild(e)), s
                }
            }))
        }();
        var ae = ["Webkit", "Moz", "ms"],
            se = ft.createElement("div").style,
            ue = {},
            le = /^(none|table(?!-c[ea]).+)/,
            ce = /^--/,
            fe = {
                position: "absolute",
                visibility: "hidden",
                display: "block"
            },
            pe = {
                letterSpacing: "0",
                fontWeight: "400"
            };
        dt.extend({
            cssHooks: {
                opacity: {
                    get: function(t, e) {
                        if (e) {
                            var n = A(t, "opacity");
                            return "" === n ? "1" : n
                        }
                    }
                }
            },
            cssNumber: {
                animationIterationCount: !0,
                columnCount: !0,
                fillOpacity: !0,
                flexGrow: !0,
                flexShrink: !0,
                fontWeight: !0,
                gridArea: !0,
                gridColumn: !0,
                gridColumnEnd: !0,
                gridColumnStart: !0,
                gridRow: !0,
                gridRowEnd: !0,
                gridRowStart: !0,
                lineHeight: !0,
                opacity: !0,
                order: !0,
                orphans: !0,
                widows: !0,
                zIndex: !0,
                zoom: !0
            },
            cssProps: {},
            style: function(t, e, n, r) {
                if (t && 3 !== t.nodeType && 8 !== t.nodeType && t.style) {
                    var o, i, a, s = h(e),
                        u = ce.test(e),
                        l = t.style;
                    if (u || (e = D(s)), a = dt.cssHooks[e] || dt.cssHooks[s], void 0 === n) return a && "get" in a && void 0 !== (o = a.get(t, !1, r)) ? o : l[e];
                    "string" == (i = typeof n) && (o = It.exec(n)) && o[1] && (n = v(t, e, o), i = "number"), null != n && n == n && ("number" !== i || u || (n += o && o[3] || (dt.cssNumber[s] ? "" : "px")), ut.clearCloneStyle || "" !== n || 0 !== e.indexOf("background") || (l[e] = "inherit"), a && "set" in a && void 0 === (n = a.set(t, n, r)) || (u ? l.setProperty(e, n) : l[e] = n))
                }
            },
            css: function(t, e, n, r) {
                var o, i, a, s = h(e);
                return ce.test(e) || (e = D(s)), (a = dt.cssHooks[e] || dt.cssHooks[s]) && "get" in a && (o = a.get(t, !0, n)), void 0 === o && (o = A(t, e, r)), "normal" === o && e in pe && (o = pe[e]), "" === n || n ? (i = parseFloat(o), !0 === n || isFinite(i) ? i || 0 : o) : o
            }
        }), dt.each(["height", "width"], function(t, e) {
            dt.cssHooks[e] = {
                get: function(t, n, r) {
                    if (n) return !le.test(dt.css(t, "display")) || t.getClientRects().length && t.getBoundingClientRect().width ? R(t, e, r) : oe(t, fe, function() {
                        return R(t, e, r)
                    })
                },
                set: function(t, n, r) {
                    var o, i = re(t),
                        a = !ut.scrollboxSize() && "absolute" === i.position,
                        s = (a || r) && "border-box" === dt.css(t, "boxSizing", !1, i),
                        u = r ? I(t, e, r, s, i) : 0;
                    return s && a && (u -= Math.ceil(t["offset" + e[0].toUpperCase() + e.slice(1)] - parseFloat(i[e]) - I(t, e, "border", !1, i) - .5)), u && (o = It.exec(n)) && "px" !== (o[3] || "px") && (t.style[e] = n, n = dt.css(t, e)), L(0, n, u)
                }
            }
        }), dt.cssHooks.marginLeft = N(ut.reliableMarginLeft, function(t, e) {
            if (e) return (parseFloat(A(t, "marginLeft")) || t.getBoundingClientRect().left - oe(t, {
                marginLeft: 0
            }, function() {
                return t.getBoundingClientRect().left
            })) + "px"
        }), dt.each({
            margin: "",
            padding: "",
            border: "Width"
        }, function(t, e) {
            dt.cssHooks[t + e] = {
                expand: function(n) {
                    for (var r = 0, o = {}, i = "string" == typeof n ? n.split(" ") : [n]; r < 4; r++) o[t + Rt[r] + e] = i[r] || i[r - 2] || i[0];
                    return o
                }
            }, "margin" !== t && (dt.cssHooks[t + e].set = L)
        }), dt.fn.extend({
            css: function(t, e) {
                return St(this, function(t, e, n) {
                    var r, o, i = {},
                        a = 0;
                    if (Array.isArray(e)) {
                        for (r = re(t), o = e.length; a < o; a++) i[e[a]] = dt.css(t, e[a], !1, r);
                        return i
                    }
                    return void 0 !== n ? dt.style(t, e, n) : dt.css(t, e)
                }, t, e, 1 < arguments.length)
            }
        }), ((dt.Tween = F).prototype = {
            constructor: F,
            init: function(t, e, n, r, o, i) {
                this.elem = t, this.prop = n, this.easing = o || dt.easing._default, this.options = e, this.start = this.now = this.cur(), this.end = r, this.unit = i || (dt.cssNumber[n] ? "" : "px")
            },
            cur: function() {
                var t = F.propHooks[this.prop];
                return t && t.get ? t.get(this) : F.propHooks._default.get(this)
            },
            run: function(t) {
                var e, n = F.propHooks[this.prop];
                return this.options.duration ? this.pos = e = dt.easing[this.easing](t, this.options.duration * t, 0, 1, this.options.duration) : this.pos = e = t, this.now = (this.end - this.start) * e + this.start, this.options.step && this.options.step.call(this.elem, this.now, this), n && n.set ? n.set(this) : F.propHooks._default.set(this), this
            }
        }).init.prototype = F.prototype, (F.propHooks = {
            _default: {
                get: function(t) {
                    var e;
                    return 1 !== t.elem.nodeType || null != t.elem[t.prop] && null == t.elem.style[t.prop] ? t.elem[t.prop] : (e = dt.css(t.elem, t.prop, "")) && "auto" !== e ? e : 0
                },
                set: function(t) {
                    dt.fx.step[t.prop] ? dt.fx.step[t.prop](t) : 1 !== t.elem.nodeType || !dt.cssHooks[t.prop] && null == t.elem.style[D(t.prop)] ? t.elem[t.prop] = t.now : dt.style(t.elem, t.prop, t.now + t.unit)
                }
            }
        }).scrollTop = F.propHooks.scrollLeft = {
            set: function(t) {
                t.elem.nodeType && t.elem.parentNode && (t.elem[t.prop] = t.now)
            }
        }, dt.easing = {
            linear: function(t) {
                return t
            },
            swing: function(t) {
                return .5 - Math.cos(t * Math.PI) / 2
            },
            _default: "swing"
        }, dt.fx = F.prototype.init, dt.fx.step = {};
        var he, de, ye, ve, ge = /^(?:toggle|show|hide)$/,
            me = /queueHooks$/;
        dt.Animation = dt.extend(V, {
            tweeners: {
                "*": [function(t, e) {
                    var n = this.createTween(t, e);
                    return v(n.elem, t, It.exec(e), n), n
                }]
            },
            tweener: function(t, e) {
                lt(t) ? (e = t, t = ["*"]) : t = t.match(xt);
                for (var n, r = 0, o = t.length; r < o; r++) n = t[r], V.tweeners[n] = V.tweeners[n] || [], V.tweeners[n].unshift(e)
            },
            prefilters: [function(t, e, n) {
                var r, o, i, a, s, u, l, c, f = "width" in e || "height" in e,
                    p = this,
                    h = {},
                    d = t.style,
                    y = t.nodeType && zt(t),
                    v = Mt.get(t, "fxshow");
                for (r in n.queue || (null == (a = dt._queueHooks(t, "fx")).unqueued && (a.unqueued = 0, s = a.empty.fire, a.empty.fire = function() {
                        a.unqueued || s()
                    }), a.unqueued++, p.always(function() {
                        p.always(function() {
                            a.unqueued--, dt.queue(t, "fx").length || a.empty.fire()
                        })
                    })), e)
                    if (o = e[r], ge.test(o)) {
                        if (delete e[r], i = i || "toggle" === o, o === (y ? "hide" : "show")) {
                            if ("show" !== o || !v || void 0 === v[r]) continue;
                            y = !0
                        }
                        h[r] = v && v[r] || dt.style(t, r)
                    } if ((u = !dt.isEmptyObject(e)) || !dt.isEmptyObject(h))
                    for (r in f && 1 === t.nodeType && (n.overflow = [d.overflow, d.overflowX, d.overflowY], null == (l = v && v.display) && (l = Mt.get(t, "display")), "none" === (c = dt.css(t, "display")) && (l ? c = l : (g([t], !0), l = t.style.display || l, c = dt.css(t, "display"), g([t]))), ("inline" === c || "inline-block" === c && null != l) && "none" === dt.css(t, "float") && (u || (p.done(function() {
                            d.display = l
                        }), null == l && (c = d.display, l = "none" === c ? "" : c)), d.display = "inline-block")), n.overflow && (d.overflow = "hidden", p.always(function() {
                            d.overflow = n.overflow[0], d.overflowX = n.overflow[1], d.overflowY = n.overflow[2]
                        })), u = !1, h) u || (v ? "hidden" in v && (y = v.hidden) : v = Mt.access(t, "fxshow", {
                        display: l
                    }), i && (v.hidden = !y), y && g([t], !0), p.done(function() {
                        for (r in y || g([t]), Mt.remove(t, "fxshow"), h) dt.style(t, r, h[r])
                    })), u = U(y ? v[r] : 0, r, p), r in v || (v[r] = u.start, y && (u.end = u.start, u.start = 0))
            }],
            prefilter: function(t, e) {
                e ? V.prefilters.unshift(t) : V.prefilters.push(t)
            }
        }), dt.speed = function(t, e, n) {
            var r = t && "object" == typeof t ? dt.extend({}, t) : {
                complete: n || !n && e || lt(t) && t,
                duration: t,
                easing: n && e || e && !lt(e) && e
            };
            return dt.fx.off ? r.duration = 0 : "number" != typeof r.duration && (r.duration in dt.fx.speeds ? r.duration = dt.fx.speeds[r.duration] : r.duration = dt.fx.speeds._default),
                null != r.queue && !0 !== r.queue || (r.queue = "fx"), r.old = r.complete, r.complete = function() {
                    lt(r.old) && r.old.call(this), r.queue && dt.dequeue(this, r.queue)
                }, r
        }, dt.fn.extend({
            fadeTo: function(t, e, n, r) {
                return this.filter(zt).css("opacity", 0).show().end().animate({
                    opacity: e
                }, t, n, r)
            },
            animate: function(t, e, n, r) {
                var o = dt.isEmptyObject(t),
                    i = dt.speed(e, n, r),
                    a = function() {
                        var e = V(this, dt.extend({}, t), i);
                        (o || Mt.get(this, "finish")) && e.stop(!0)
                    };
                return a.finish = a, o || !1 === i.queue ? this.each(a) : this.queue(i.queue, a)
            },
            stop: function(t, e, n) {
                var r = function(t) {
                    var e = t.stop;
                    delete t.stop, e(n)
                };
                return "string" != typeof t && (n = e, e = t, t = void 0), e && this.queue(t || "fx", []), this.each(function() {
                    var e = !0,
                        o = null != t && t + "queueHooks",
                        i = dt.timers,
                        a = Mt.get(this);
                    if (o) a[o] && a[o].stop && r(a[o]);
                    else
                        for (o in a) a[o] && a[o].stop && me.test(o) && r(a[o]);
                    for (o = i.length; o--;) i[o].elem !== this || null != t && i[o].queue !== t || (i[o].anim.stop(n), e = !1, i.splice(o, 1));
                    !e && n || dt.dequeue(this, t)
                })
            },
            finish: function(t) {
                return !1 !== t && (t = t || "fx"), this.each(function() {
                    var e, n = Mt.get(this),
                        r = n[t + "queue"],
                        o = n[t + "queueHooks"],
                        i = dt.timers,
                        a = r ? r.length : 0;
                    for (n.finish = !0, dt.queue(this, t, []), o && o.stop && o.stop.call(this, !0), e = i.length; e--;) i[e].elem === this && i[e].queue === t && (i[e].anim.stop(!0), i.splice(e, 1));
                    for (e = 0; e < a; e++) r[e] && r[e].finish && r[e].finish.call(this);
                    delete n.finish
                })
            }
        }), dt.each(["toggle", "show", "hide"], function(t, e) {
            var n = dt.fn[e];
            dt.fn[e] = function(t, r, o) {
                return null == t || "boolean" == typeof t ? n.apply(this, arguments) : this.animate(z(e, !0), t, r, o)
            }
        }), dt.each({
            slideDown: z("show"),
            slideUp: z("hide"),
            slideToggle: z("toggle"),
            fadeIn: {
                opacity: "show"
            },
            fadeOut: {
                opacity: "hide"
            },
            fadeToggle: {
                opacity: "toggle"
            }
        }, function(t, e) {
            dt.fn[t] = function(t, n, r) {
                return this.animate(e, t, n, r)
            }
        }), dt.timers = [], dt.fx.tick = function() {
            var t, e = 0,
                n = dt.timers;
            for (he = Date.now(); e < n.length; e++)(t = n[e])() || n[e] !== t || n.splice(e--, 1);
            n.length || dt.fx.stop(), he = void 0
        }, dt.fx.timer = function(t) {
            dt.timers.push(t), dt.fx.start()
        }, dt.fx.interval = 13, dt.fx.start = function() {
            de || (de = !0, H())
        }, dt.fx.stop = function() {
            de = null
        }, dt.fx.speeds = {
            slow: 600,
            fast: 200,
            _default: 400
        }, dt.fn.delay = function(e, n) {
            return e = dt.fx && dt.fx.speeds[e] || e, n = n || "fx", this.queue(n, function(n, r) {
                var o = t.setTimeout(n, e);
                r.stop = function() {
                    t.clearTimeout(o)
                }
            })
        }, ye = ft.createElement("input"), ve = ft.createElement("select").appendChild(ft.createElement("option")), ye.type = "checkbox", ut.checkOn = "" !== ye.value, ut.optSelected = ve.selected, (ye = ft.createElement("input")).value = "t", ye.type = "radio", ut.radioValue = "t" === ye.value;
        var be, _e = dt.expr.attrHandle;
        dt.fn.extend({
            attr: function(t, e) {
                return St(this, dt.attr, t, e, 1 < arguments.length)
            },
            removeAttr: function(t) {
                return this.each(function() {
                    dt.removeAttr(this, t)
                })
            }
        }), dt.extend({
            attr: function(t, e, n) {
                var r, o, i = t.nodeType;
                if (3 !== i && 8 !== i && 2 !== i) return "undefined" == typeof t.getAttribute ? dt.prop(t, e, n) : (1 === i && dt.isXMLDoc(t) || (o = dt.attrHooks[e.toLowerCase()] || (dt.expr.match.bool.test(e) ? be : void 0)), void 0 !== n ? null === n ? void dt.removeAttr(t, e) : o && "set" in o && void 0 !== (r = o.set(t, n, e)) ? r : (t.setAttribute(e, n + ""), n) : o && "get" in o && null !== (r = o.get(t, e)) ? r : null == (r = dt.find.attr(t, e)) ? void 0 : r)
            },
            attrHooks: {
                type: {
                    set: function(t, e) {
                        if (!ut.radioValue && "radio" === e && i(t, "input")) {
                            var n = t.value;
                            return t.setAttribute("type", e), n && (t.value = n), e
                        }
                    }
                }
            },
            removeAttr: function(t, e) {
                var n, r = 0,
                    o = e && e.match(xt);
                if (o && 1 === t.nodeType)
                    for (; n = o[r++];) t.removeAttribute(n)
            }
        }), be = {
            set: function(t, e, n) {
                return !1 === e ? dt.removeAttr(t, n) : t.setAttribute(n, n), n
            }
        }, dt.each(dt.expr.match.bool.source.match(/\w+/g), function(t, e) {
            var n = _e[e] || dt.find.attr;
            _e[e] = function(t, e, r) {
                var o, i, a = e.toLowerCase();
                return r || (i = _e[a], _e[a] = o, o = null != n(t, e, r) ? a : null, _e[a] = i), o
            }
        });
        var we = /^(?:input|select|textarea|button)$/i,
            Te = /^(?:a|area)$/i;
        dt.fn.extend({
            prop: function(t, e) {
                return St(this, dt.prop, t, e, 1 < arguments.length)
            },
            removeProp: function(t) {
                return this.each(function() {
                    delete this[dt.propFix[t] || t]
                })
            }
        }), dt.extend({
            prop: function(t, e, n) {
                var r, o, i = t.nodeType;
                if (3 !== i && 8 !== i && 2 !== i) return 1 === i && dt.isXMLDoc(t) || (e = dt.propFix[e] || e, o = dt.propHooks[e]), void 0 !== n ? o && "set" in o && void 0 !== (r = o.set(t, n, e)) ? r : t[e] = n : o && "get" in o && null !== (r = o.get(t, e)) ? r : t[e]
            },
            propHooks: {
                tabIndex: {
                    get: function(t) {
                        var e = dt.find.attr(t, "tabindex");
                        return e ? parseInt(e, 10) : we.test(t.nodeName) || Te.test(t.nodeName) && t.href ? 0 : -1
                    }
                }
            },
            propFix: {
                "for": "htmlFor",
                "class": "className"
            }
        }), ut.optSelected || (dt.propHooks.selected = {
            get: function(t) {
                var e = t.parentNode;
                return e && e.parentNode && e.parentNode.selectedIndex, null
            },
            set: function(t) {
                var e = t.parentNode;
                e && (e.selectedIndex, e.parentNode && e.parentNode.selectedIndex)
            }
        }), dt.each(["tabIndex", "readOnly", "maxLength", "cellSpacing", "cellPadding", "rowSpan", "colSpan", "useMap", "frameBorder", "contentEditable"], function() {
            dt.propFix[this.toLowerCase()] = this
        }), dt.fn.extend({
            addClass: function(t) {
                var e, n, r, o, i, a, s, u = 0;
                if (lt(t)) return this.each(function(e) {
                    dt(this).addClass(t.call(this, e, W(this)))
                });
                if ((e = $(t)).length)
                    for (; n = this[u++];)
                        if (o = W(n), r = 1 === n.nodeType && " " + q(o) + " ") {
                            for (a = 0; i = e[a++];) r.indexOf(" " + i + " ") < 0 && (r += i + " ");
                            o !== (s = q(r)) && n.setAttribute("class", s)
                        } return this
            },
            removeClass: function(t) {
                var e, n, r, o, i, a, s, u = 0;
                if (lt(t)) return this.each(function(e) {
                    dt(this).removeClass(t.call(this, e, W(this)))
                });
                if (!arguments.length) return this.attr("class", "");
                if ((e = $(t)).length)
                    for (; n = this[u++];)
                        if (o = W(n), r = 1 === n.nodeType && " " + q(o) + " ") {
                            for (a = 0; i = e[a++];)
                                for (; - 1 < r.indexOf(" " + i + " ");) r = r.replace(" " + i + " ", " ");
                            o !== (s = q(r)) && n.setAttribute("class", s)
                        } return this
            },
            toggleClass: function(t, e) {
                var n = typeof t,
                    r = "string" === n || Array.isArray(t);
                return "boolean" == typeof e && r ? e ? this.addClass(t) : this.removeClass(t) : lt(t) ? this.each(function(n) {
                    dt(this).toggleClass(t.call(this, n, W(this), e), e)
                }) : this.each(function() {
                    var e, o, i, a;
                    if (r)
                        for (o = 0, i = dt(this), a = $(t); e = a[o++];) i.hasClass(e) ? i.removeClass(e) : i.addClass(e);
                    else void 0 !== t && "boolean" !== n || ((e = W(this)) && Mt.set(this, "__className__", e), this.setAttribute && this.setAttribute("class", e || !1 === t ? "" : Mt.get(this, "__className__") || ""))
                })
            },
            hasClass: function(t) {
                var e, n, r = 0;
                for (e = " " + t + " "; n = this[r++];)
                    if (1 === n.nodeType && -1 < (" " + q(W(n)) + " ").indexOf(e)) return !0;
                return !1
            }
        });
        var Ee = /\r/g;
        dt.fn.extend({
            val: function(t) {
                var e, n, r, o = this[0];
                return arguments.length ? (r = lt(t), this.each(function(n) {
                    var o;
                    1 === this.nodeType && (null == (o = r ? t.call(this, n, dt(this).val()) : t) ? o = "" : "number" == typeof o ? o += "" : Array.isArray(o) && (o = dt.map(o, function(t) {
                        return null == t ? "" : t + ""
                    })), (e = dt.valHooks[this.type] || dt.valHooks[this.nodeName.toLowerCase()]) && "set" in e && void 0 !== e.set(this, o, "value") || (this.value = o))
                })) : o ? (e = dt.valHooks[o.type] || dt.valHooks[o.nodeName.toLowerCase()]) && "get" in e && void 0 !== (n = e.get(o, "value")) ? n : "string" == typeof(n = o.value) ? n.replace(Ee, "") : null == n ? "" : n : void 0
            }
        }), dt.extend({
            valHooks: {
                option: {
                    get: function(t) {
                        var e = dt.find.attr(t, "value");
                        return null != e ? e : q(dt.text(t))
                    }
                },
                select: {
                    get: function(t) {
                        var e, n, r, o = t.options,
                            a = t.selectedIndex,
                            s = "select-one" === t.type,
                            u = s ? null : [],
                            l = s ? a + 1 : o.length;
                        for (r = a < 0 ? l : s ? a : 0; r < l; r++)
                            if (((n = o[r]).selected || r === a) && !n.disabled && (!n.parentNode.disabled || !i(n.parentNode, "optgroup"))) {
                                if (e = dt(n).val(), s) return e;
                                u.push(e)
                            } return u
                    },
                    set: function(t, e) {
                        for (var n, r, o = t.options, i = dt.makeArray(e), a = o.length; a--;)((r = o[a]).selected = -1 < dt.inArray(dt.valHooks.option.get(r), i)) && (n = !0);
                        return n || (t.selectedIndex = -1), i
                    }
                }
            }
        }), dt.each(["radio", "checkbox"], function() {
            dt.valHooks[this] = {
                set: function(t, e) {
                    if (Array.isArray(e)) return t.checked = -1 < dt.inArray(dt(t).val(), e)
                }
            }, ut.checkOn || (dt.valHooks[this].get = function(t) {
                return null === t.getAttribute("value") ? "on" : t.value
            })
        }), ut.focusin = "onfocusin" in t;
        var xe = /^(?:focusinfocus|focusoutblur)$/,
            Ce = function(t) {
                t.stopPropagation()
            };
        dt.extend(dt.event, {
            trigger: function(e, n, r, o) {
                var i, a, s, u, l, c, f, p, h = [r || ft],
                    d = it.call(e, "type") ? e.type : e,
                    y = it.call(e, "namespace") ? e.namespace.split(".") : [];
                if (a = p = s = r = r || ft, 3 !== r.nodeType && 8 !== r.nodeType && !xe.test(d + dt.event.triggered) && (-1 < d.indexOf(".") && (d = (y = d.split(".")).shift(), y.sort()), l = d.indexOf(":") < 0 && "on" + d, (e = e[dt.expando] ? e : new dt.Event(d, "object" == typeof e && e)).isTrigger = o ? 2 : 3, e.namespace = y.join("."), e.rnamespace = e.namespace ? new RegExp("(^|\\.)" + y.join("\\.(?:.*\\.|)") + "(\\.|$)") : null, e.result = void 0, e.target || (e.target = r), n = null == n ? [e] : dt.makeArray(n, [e]), f = dt.event.special[d] || {}, o || !f.trigger || !1 !== f.trigger.apply(r, n))) {
                    if (!o && !f.noBubble && !ct(r)) {
                        for (u = f.delegateType || d, xe.test(u + d) || (a = a.parentNode); a; a = a.parentNode) h.push(a), s = a;
                        s === (r.ownerDocument || ft) && h.push(s.defaultView || s.parentWindow || t)
                    }
                    for (i = 0;
                        (a = h[i++]) && !e.isPropagationStopped();) p = a, e.type = 1 < i ? u : f.bindType || d, (c = (Mt.get(a, "events") || Object.create(null))[e.type] && Mt.get(a, "handle")) && c.apply(a, n), (c = l && a[l]) && c.apply && Pt(a) && (e.result = c.apply(a, n), !1 === e.result && e.preventDefault());
                    return e.type = d, o || e.isDefaultPrevented() || f._default && !1 !== f._default.apply(h.pop(), n) || !Pt(r) || l && lt(r[d]) && !ct(r) && ((s = r[l]) && (r[l] = null), dt.event.triggered = d, e.isPropagationStopped() && p.addEventListener(d, Ce), r[d](), e.isPropagationStopped() && p.removeEventListener(d, Ce), dt.event.triggered = void 0, s && (r[l] = s)), e.result
                }
            },
            simulate: function(t, e, n) {
                var r = dt.extend(new dt.Event, n, {
                    type: t,
                    isSimulated: !0
                });
                dt.event.trigger(r, null, e)
            }
        }), dt.fn.extend({
            trigger: function(t, e) {
                return this.each(function() {
                    dt.event.trigger(t, e, this)
                })
            },
            triggerHandler: function(t, e) {
                var n = this[0];
                if (n) return dt.event.trigger(t, e, n, !0)
            }
        }), ut.focusin || dt.each({
            focus: "focusin",
            blur: "focusout"
        }, function(t, e) {
            var n = function(t) {
                dt.event.simulate(e, t.target, dt.event.fix(t))
            };
            dt.event.special[e] = {
                setup: function() {
                    var r = this.ownerDocument || this.document || this,
                        o = Mt.access(r, e);
                    o || r.addEventListener(t, n, !0), Mt.access(r, e, (o || 0) + 1)
                },
                teardown: function() {
                    var r = this.ownerDocument || this.document || this,
                        o = Mt.access(r, e) - 1;
                    o ? Mt.access(r, e, o) : (r.removeEventListener(t, n, !0), Mt.remove(r, e))
                }
            }
        });
        var ke = t.location,
            Se = {
                guid: Date.now()
            },
            je = /\?/;
        dt.parseXML = function(e) {
            var n;
            if (!e || "string" != typeof e) return null;
            try {
                n = (new t.DOMParser).parseFromString(e, "text/xml")
            } catch (e) {
                n = void 0
            }
            return n && !n.getElementsByTagName("parsererror").length || dt.error("Invalid XML: " + e), n
        };
        var Oe = /\[\]$/,
            Pe = /\r?\n/g,
            Me = /^(?:submit|button|image|reset|file)$/i,
            Ae = /^(?:input|select|textarea|keygen)/i;
        dt.param = function(t, e) {
            var n, r = [],
                o = function(t, e) {
                    var n = lt(e) ? e() : e;
                    r[r.length] = encodeURIComponent(t) + "=" + encodeURIComponent(null == n ? "" : n)
                };
            if (null == t) return "";
            if (Array.isArray(t) || t.jquery && !dt.isPlainObject(t)) dt.each(t, function() {
                o(this.name, this.value)
            });
            else
                for (n in t) X(n, t[n], e, o);
            return r.join("&")
        }, dt.fn.extend({
            serialize: function() {
                return dt.param(this.serializeArray())
            },
            serializeArray: function() {
                return this.map(function() {
                    var t = dt.prop(this, "elements");
                    return t ? dt.makeArray(t) : this
                }).filter(function() {
                    var t = this.type;
                    return this.name && !dt(this).is(":disabled") && Ae.test(this.nodeName) && !Me.test(t) && (this.checked || !Wt.test(t))
                }).map(function(t, e) {
                    var n = dt(this).val();
                    return null == n ? null : Array.isArray(n) ? dt.map(n, function(t) {
                        return {
                            name: e.name,
                            value: t.replace(Pe, "\r\n")
                        }
                    }) : {
                        name: e.name,
                        value: n.replace(Pe, "\r\n")
                    }
                }).get()
            }
        });
        var Ne = /%20/g,
            De = /#.*$/,
            Le = /([?&])_=[^&]*/,
            Ie = /^(.*?):[ \t]*([^\r\n]*)$/gm,
            Re = /^(?:GET|HEAD)$/,
            Fe = /^\/\//,
            He = {},
            Be = {},
            ze = "*/".concat("*"),
            Ue = ft.createElement("a");
        Ue.href = ke.href, dt.extend({
            active: 0,
            lastModified: {},
            etag: {},
            ajaxSettings: {
                url: ke.href,
                type: "GET",
                isLocal: /^(?:about|app|app-storage|.+-extension|file|res|widget):$/.test(ke.protocol),
                global: !0,
                processData: !0,
                async: !0,
                contentType: "application/x-www-form-urlencoded; charset=UTF-8",
                accepts: {
                    "*": ze,
                    text: "text/plain",
                    html: "text/html",
                    xml: "application/xml, text/xml",
                    json: "application/json, text/javascript"
                },
                contents: {
                    xml: /\bxml\b/,
                    html: /\bhtml/,
                    json: /\bjson\b/
                },
                responseFields: {
                    xml: "responseXML",
                    text: "responseText",
                    json: "responseJSON"
                },
                converters: {
                    "* text": String,
                    "text html": !0,
                    "text json": JSON.parse,
                    "text xml": dt.parseXML
                },
                flatOptions: {
                    url: !0,
                    context: !0
                }
            },
            ajaxSetup: function(t, e) {
                return e ? Q(Q(t, dt.ajaxSettings), e) : Q(dt.ajaxSettings, t)
            },
            ajaxPrefilter: G(He),
            ajaxTransport: G(Be),
            ajax: function(e, n) {
                function r(e, n, r, s) {
                    var l, p, h, _, w, T = n;
                    c || (c = !0, u && t.clearTimeout(u), o = void 0, a = s || "", E.readyState = 0 < e ? 4 : 0, l = 200 <= e && e < 300 || 304 === e, r && (_ = function(t, e, n) {
                        for (var r, o, i, a, s = t.contents, u = t.dataTypes;
                            "*" === u[0];) u.shift(), void 0 === r && (r = t.mimeType || e.getResponseHeader("Content-Type"));
                        if (r)
                            for (o in s)
                                if (s[o] && s[o].test(r)) {
                                    u.unshift(o);
                                    break
                                } if (u[0] in n) i = u[0];
                        else {
                            for (o in n) {
                                if (!u[0] || t.converters[o + " " + u[0]]) {
                                    i = o;
                                    break
                                }
                                a || (a = o)
                            }
                            i = i || a
                        }
                        if (i) return i !== u[0] && u.unshift(i), n[i]
                    }(d, E, r)), !l && -1 < dt.inArray("script", d.dataTypes) && (d.converters["text script"] = function() {}), _ = function(t, e, n, r) {
                        var o, i, a, s, u, l = {},
                            c = t.dataTypes.slice();
                        if (c[1])
                            for (a in t.converters) l[a.toLowerCase()] = t.converters[a];
                        for (i = c.shift(); i;)
                            if (t.responseFields[i] && (n[t.responseFields[i]] = e), !u && r && t.dataFilter && (e = t.dataFilter(e, t.dataType)), u = i, i = c.shift())
                                if ("*" === i) i = u;
                                else if ("*" !== u && u !== i) {
                            if (!(a = l[u + " " + i] || l["* " + i]))
                                for (o in l)
                                    if ((s = o.split(" "))[1] === i && (a = l[u + " " + s[0]] || l["* " + s[0]])) {
                                        !0 === a ? a = l[o] : !0 !== l[o] && (i = s[0], c.unshift(s[1]));
                                        break
                                    } if (!0 !== a)
                                if (a && t["throws"]) e = a(e);
                                else try {
                                    e = a(e)
                                } catch (t) {
                                    return {
                                        state: "parsererror",
                                        error: a ? t : "No conversion from " + u + " to " + i
                                    }
                                }
                        }
                        return {
                            state: "success",
                            data: e
                        }
                    }(d, _, E, l), l ? (d.ifModified && ((w = E.getResponseHeader("Last-Modified")) && (dt.lastModified[i] = w), (w = E.getResponseHeader("etag")) && (dt.etag[i] = w)), 204 === e || "HEAD" === d.type ? T = "nocontent" : 304 === e ? T = "notmodified" : (T = _.state, p = _.data, l = !(h = _.error))) : (h = T, !e && T || (T = "error", e < 0 && (e = 0))), E.status = e, E.statusText = (n || T) + "", l ? g.resolveWith(y, [p, T, E]) : g.rejectWith(y, [E, T, h]), E.statusCode(b), b = void 0, f && v.trigger(l ? "ajaxSuccess" : "ajaxError", [E, d, l ? p : h]), m.fireWith(y, [E, T]), f && (v.trigger("ajaxComplete", [E, d]), --dt.active || dt.event.trigger("ajaxStop")))
                }
                "object" == typeof e && (n = e, e = void 0), n = n || {};
                var o, i, a, s, u, l, c, f, p, h, d = dt.ajaxSetup({}, n),
                    y = d.context || d,
                    v = d.context && (y.nodeType || y.jquery) ? dt(y) : dt.event,
                    g = dt.Deferred(),
                    m = dt.Callbacks("once memory"),
                    b = d.statusCode || {},
                    _ = {},
                    w = {},
                    T = "canceled",
                    E = {
                        readyState: 0,
                        getResponseHeader: function(t) {
                            var e;
                            if (c) {
                                if (!s)
                                    for (s = {}; e = Ie.exec(a);) s[e[1].toLowerCase() + " "] = (s[e[1].toLowerCase() + " "] || []).concat(e[2]);
                                e = s[t.toLowerCase() + " "]
                            }
                            return null == e ? null : e.join(", ")
                        },
                        getAllResponseHeaders: function() {
                            return c ? a : null
                        },
                        setRequestHeader: function(t, e) {
                            return null == c && (t = w[t.toLowerCase()] = w[t.toLowerCase()] || t, _[t] = e), this
                        },
                        overrideMimeType: function(t) {
                            return null == c && (d.mimeType = t), this
                        },
                        statusCode: function(t) {
                            var e;
                            if (t)
                                if (c) E.always(t[E.status]);
                                else
                                    for (e in t) b[e] = [b[e], t[e]];
                            return this
                        },
                        abort: function(t) {
                            var e = t || T;
                            return o && o.abort(e), r(0, e), this
                        }
                    };
                if (g.promise(E), d.url = ((e || d.url || ke.href) + "").replace(Fe, ke.protocol + "//"), d.type = n.method || n.type || d.method || d.type, d.dataTypes = (d.dataType || "*").toLowerCase().match(xt) || [""], null == d.crossDomain) {
                    l = ft.createElement("a");
                    try {
                        l.href = d.url, l.href = l.href, d.crossDomain = Ue.protocol + "//" + Ue.host != l.protocol + "//" + l.host
                    } catch (e) {
                        d.crossDomain = !0
                    }
                }
                if (d.data && d.processData && "string" != typeof d.data && (d.data = dt.param(d.data, d.traditional)), Y(He, d, n, E), c) return E;
                for (p in (f = dt.event && d.global) && 0 == dt.active++ && dt.event.trigger("ajaxStart"), d.type = d.type.toUpperCase(), d.hasContent = !Re.test(d.type), i = d.url.replace(De, ""), d.hasContent ? d.data && d.processData && 0 === (d.contentType || "").indexOf("application/x-www-form-urlencoded") && (d.data = d.data.replace(Ne, "+")) : (h = d.url.slice(i.length), d.data && (d.processData || "string" == typeof d.data) && (i += (je.test(i) ? "&" : "?") + d.data, delete d.data), !1 === d.cache && (i = i.replace(Le, "$1"), h = (je.test(i) ? "&" : "?") + "_=" + Se.guid++ + h), d.url = i + h), d.ifModified && (dt.lastModified[i] && E.setRequestHeader("If-Modified-Since", dt.lastModified[i]), dt.etag[i] && E.setRequestHeader("If-None-Match", dt.etag[i])), (d.data && d.hasContent && !1 !== d.contentType || n.contentType) && E.setRequestHeader("Content-Type", d.contentType), E.setRequestHeader("Accept", d.dataTypes[0] && d.accepts[d.dataTypes[0]] ? d.accepts[d.dataTypes[0]] + ("*" !== d.dataTypes[0] ? ", " + ze + "; q=0.01" : "") : d.accepts["*"]), d.headers) E.setRequestHeader(p, d.headers[p]);
                if (d.beforeSend && (!1 === d.beforeSend.call(y, E, d) || c)) return E.abort();
                if (T = "abort", m.add(d.complete), E.done(d.success), E.fail(d.error), o = Y(Be, d, n, E)) {
                    if (E.readyState = 1, f && v.trigger("ajaxSend", [E, d]), c) return E;
                    d.async && 0 < d.timeout && (u = t.setTimeout(function() {
                        E.abort("timeout")
                    }, d.timeout));
                    try {
                        c = !1, o.send(_, r)
                    } catch (e) {
                        if (c) throw e;
                        r(-1, e)
                    }
                } else r(-1, "No Transport");
                return E
            },
            getJSON: function(t, e, n) {
                return dt.get(t, e, n, "json")
            },
            getScript: function(t, e) {
                return dt.get(t, void 0, e, "script")
            }
        }), dt.each(["get", "post"], function(t, e) {
            dt[e] = function(t, n, r, o) {
                return lt(n) && (o = o || r, r = n, n = void 0), dt.ajax(dt.extend({
                    url: t,
                    type: e,
                    dataType: o,
                    data: n,
                    success: r
                }, dt.isPlainObject(t) && t))
            }
        }), dt.ajaxPrefilter(function(t) {
            var e;
            for (e in t.headers) "content-type" === e.toLowerCase() && (t.contentType = t.headers[e] || "")
        }), dt._evalUrl = function(t, e, n) {
            return dt.ajax({
                url: t,
                type: "GET",
                dataType: "script",
                cache: !0,
                async: !1,
                global: !1,
                converters: {
                    "text script": function() {}
                },
                dataFilter: function(t) {
                    dt.globalEval(t, e, n)
                }
            })
        }, dt.fn.extend({
            wrapAll: function(t) {
                var e;
                return this[0] && (lt(t) && (t = t.call(this[0])), e = dt(t, this[0].ownerDocument).eq(0).clone(!0), this[0].parentNode && e.insertBefore(this[0]), e.map(function() {
                    for (var t = this; t.firstElementChild;) t = t.firstElementChild;
                    return t
                }).append(this)), this
            },
            wrapInner: function(t) {
                return lt(t) ? this.each(function(e) {
                    dt(this).wrapInner(t.call(this, e))
                }) : this.each(function() {
                    var e = dt(this),
                        n = e.contents();
                    n.length ? n.wrapAll(t) : e.append(t)
                })
            },
            wrap: function(t) {
                var e = lt(t);
                return this.each(function(n) {
                    dt(this).wrapAll(e ? t.call(this, n) : t)
                })
            },
            unwrap: function(t) {
                return this.parent(t).not("body").each(function() {
                    dt(this).replaceWith(this.childNodes)
                }), this
            }
        }), dt.expr.pseudos.hidden = function(t) {
            return !dt.expr.pseudos.visible(t)
        }, dt.expr.pseudos.visible = function(t) {
            return !!(t.offsetWidth || t.offsetHeight || t.getClientRects().length)
        }, dt.ajaxSettings.xhr = function() {
            try {
                return new t.XMLHttpRequest
            } catch (e) {}
        };
        var Ve = {
                0: 200,
                1223: 204
            },
            qe = dt.ajaxSettings.xhr();
        ut.cors = !!qe && "withCredentials" in qe, ut.ajax = qe = !!qe, dt.ajaxTransport(function(e) {
            var n, r;
            if (ut.cors || qe && !e.crossDomain) return {
                send: function(o, i) {
                    var a, s = e.xhr();
                    if (s.open(e.type, e.url, e.async, e.username, e.password), e.xhrFields)
                        for (a in e.xhrFields) s[a] = e.xhrFields[a];
                    for (a in e.mimeType && s.overrideMimeType && s.overrideMimeType(e.mimeType), e.crossDomain || o["X-Requested-With"] || (o["X-Requested-With"] = "XMLHttpRequest"), o) s.setRequestHeader(a, o[a]);
                    n = function(t) {
                        return function() {
                            n && (n = r = s.onload = s.onerror = s.onabort = s.ontimeout = s.onreadystatechange = null, "abort" === t ? s.abort() : "error" === t ? "number" != typeof s.status ? i(0, "error") : i(s.status, s.statusText) : i(Ve[s.status] || s.status, s.statusText, "text" !== (s.responseType || "text") || "string" != typeof s.responseText ? {
                                binary: s.response
                            } : {
                                text: s.responseText
                            }, s.getAllResponseHeaders()))
                        }
                    }, s.onload = n(), r = s.onerror = s.ontimeout = n("error"), void 0 !== s.onabort ? s.onabort = r : s.onreadystatechange = function() {
                        4 === s.readyState && t.setTimeout(function() {
                            n && r()
                        })
                    }, n = n("abort");
                    try {
                        s.send(e.hasContent && e.data || null)
                    } catch (o) {
                        if (n) throw o
                    }
                },
                abort: function() {
                    n && n()
                }
            }
        }), dt.ajaxPrefilter(function(t) {
            t.crossDomain && (t.contents.script = !1)
        }), dt.ajaxSetup({
            accepts: {
                script: "text/javascript, application/javascript, application/ecmascript, application/x-ecmascript"
            },
            contents: {
                script: /\b(?:java|ecma)script\b/
            },
            converters: {
                "text script": function(t) {
                    return dt.globalEval(t), t
                }
            }
        }), dt.ajaxPrefilter("script", function(t) {
            void 0 === t.cache && (t.cache = !1), t.crossDomain && (t.type = "GET")
        }), dt.ajaxTransport("script", function(t) {
            var e, n;
            if (t.crossDomain || t.scriptAttrs) return {
                send: function(r, o) {
                    e = dt("<script>").attr(t.scriptAttrs || {}).prop({
                        charset: t.scriptCharset,
                        src: t.url
                    }).on("load error", n = function(t) {
                        e.remove(), n = null, t && o("error" === t.type ? 404 : 200, t.type)
                    }), ft.head.appendChild(e[0])
                },
                abort: function() {
                    n && n()
                }
            }
        });
        var We, $e = [],
            Xe = /(=)\?(?=&|$)|\?\?/;
        dt.ajaxSetup({
            jsonp: "callback",
            jsonpCallback: function() {
                var t = $e.pop() || dt.expando + "_" + Se.guid++;
                return this[t] = !0, t
            }
        }), dt.ajaxPrefilter("json jsonp", function(e, n, r) {
            var o, i, a, s = !1 !== e.jsonp && (Xe.test(e.url) ? "url" : "string" == typeof e.data && 0 === (e.contentType || "").indexOf("application/x-www-form-urlencoded") && Xe.test(e.data) && "data");
            if (s || "jsonp" === e.dataTypes[0]) return o = e.jsonpCallback = lt(e.jsonpCallback) ? e.jsonpCallback() : e.jsonpCallback, s ? e[s] = e[s].replace(Xe, "$1" + o) : !1 !== e.jsonp && (e.url += (je.test(e.url) ? "&" : "?") + e.jsonp + "=" + o), e.converters["script json"] = function() {
                return a || dt.error(o + " was not called"), a[0]
            }, e.dataTypes[0] = "json", i = t[o], t[o] = function() {
                a = arguments
            }, r.always(function() {
                void 0 === i ? dt(t).removeProp(o) : t[o] = i, e[o] && (e.jsonpCallback = n.jsonpCallback, $e.push(o)), a && lt(i) && i(a[0]), a = i = void 0
            }), "script"
        }), ut.createHTMLDocument = ((We = ft.implementation.createHTMLDocument("").body).innerHTML = "<form></form><form></form>", 2 === We.childNodes.length), dt.parseHTML = function(t, e, n) {
            return "string" != typeof t ? [] : ("boolean" == typeof e && (n = e, e = !1), e || (ut.createHTMLDocument ? ((r = (e = ft.implementation.createHTMLDocument("")).createElement("base")).href = ft.location.href, e.head.appendChild(r)) : e = ft), i = !n && [], (o = bt.exec(t)) ? [e.createElement(o[1])] : (o = _([t], e, i), i && i.length && dt(i).remove(), dt.merge([], o.childNodes)));
            var r, o, i
        }, dt.fn.load = function(t, e, n) {
            var r, o, i, a = this,
                s = t.indexOf(" ");
            return -1 < s && (r = q(t.slice(s)), t = t.slice(0, s)), lt(e) ? (n = e, e = void 0) : e && "object" == typeof e && (o = "POST"), 0 < a.length && dt.ajax({
                url: t,
                type: o || "GET",
                dataType: "html",
                data: e
            }).done(function(t) {
                i = arguments, a.html(r ? dt("<div>").append(dt.parseHTML(t)).find(r) : t)
            }).always(n && function(t, e) {
                a.each(function() {
                    n.apply(this, i || [t.responseText, e, t])
                })
            }), this
        }, dt.expr.pseudos.animated = function(t) {
            return dt.grep(dt.timers, function(e) {
                return t === e.elem
            }).length
        }, dt.offset = {
            setOffset: function(t, e, n) {
                var r, o, i, a, s, u, l = dt.css(t, "position"),
                    c = dt(t),
                    f = {};
                "static" === l && (t.style.position = "relative"), s = c.offset(), i = dt.css(t, "top"), u = dt.css(t, "left"), ("absolute" === l || "fixed" === l) && -1 < (i + u).indexOf("auto") ? (a = (r = c.position()).top, o = r.left) : (a = parseFloat(i) || 0, o = parseFloat(u) || 0), lt(e) && (e = e.call(t, n, dt.extend({}, s))), null != e.top && (f.top = e.top - s.top + a), null != e.left && (f.left = e.left - s.left + o), "using" in e ? e.using.call(t, f) : ("number" == typeof f.top && (f.top += "px"), "number" == typeof f.left && (f.left += "px"), c.css(f))
            }
        }, dt.fn.extend({
            offset: function(t) {
                if (arguments.length) return void 0 === t ? this : this.each(function(e) {
                    dt.offset.setOffset(this, t, e)
                });
                var e, n, r = this[0];
                return r ? r.getClientRects().length ? (e = r.getBoundingClientRect(), n = r.ownerDocument.defaultView, {
                    top: e.top + n.pageYOffset,
                    left: e.left + n.pageXOffset
                }) : {
                    top: 0,
                    left: 0
                } : void 0
            },
            position: function() {
                if (this[0]) {
                    var t, e, n, r = this[0],
                        o = {
                            top: 0,
                            left: 0
                        };
                    if ("fixed" === dt.css(r, "position")) e = r.getBoundingClientRect();
                    else {
                        for (e = this.offset(), n = r.ownerDocument, t = r.offsetParent || n.documentElement; t && (t === n.body || t === n.documentElement) && "static" === dt.css(t, "position");) t = t.parentNode;
                        t && t !== r && 1 === t.nodeType && ((o = dt(t).offset()).top += dt.css(t, "borderTopWidth", !0), o.left += dt.css(t, "borderLeftWidth", !0))
                    }
                    return {
                        top: e.top - o.top - dt.css(r, "marginTop", !0),
                        left: e.left - o.left - dt.css(r, "marginLeft", !0)
                    }
                }
            },
            offsetParent: function() {
                return this.map(function() {
                    for (var t = this.offsetParent; t && "static" === dt.css(t, "position");) t = t.offsetParent;
                    return t || Ft
                })
            }
        }), dt.each({
            scrollLeft: "pageXOffset",
            scrollTop: "pageYOffset"
        }, function(t, e) {
            var n = "pageYOffset" === e;
            dt.fn[t] = function(r) {
                return St(this, function(t, r, o) {
                    var i;
                    return ct(t) ? i = t : 9 === t.nodeType && (i = t.defaultView), void 0 === o ? i ? i[e] : t[r] : void(i ? i.scrollTo(n ? i.pageXOffset : o, n ? o : i.pageYOffset) : t[r] = o)
                }, t, r, arguments.length)
            }
        }), dt.each(["top", "left"], function(t, e) {
            dt.cssHooks[e] = N(ut.pixelPosition, function(t, n) {
                if (n) return n = A(t, e), ne.test(n) ? dt(t).position()[e] + "px" : n
            })
        }), dt.each({
            Height: "height",
            Width: "width"
        }, function(t, e) {
            dt.each({
                padding: "inner" + t,
                content: e,
                "": "outer" + t
            }, function(n, r) {
                dt.fn[r] = function(o, i) {
                    var a = arguments.length && (n || "boolean" != typeof o),
                        s = n || (!0 === o || !0 === i ? "margin" : "border");
                    return St(this, function(e, n, o) {
                        var i;
                        return ct(e) ? 0 === r.indexOf("outer") ? e["inner" + t] : e.document.documentElement["client" + t] : 9 === e.nodeType ? (i = e.documentElement, Math.max(e.body["scroll" + t], i["scroll" + t], e.body["offset" + t], i["offset" + t], i["client" + t])) : void 0 === o ? dt.css(e, n, s) : dt.style(e, n, o, s)
                    }, e, a ? o : void 0, a)
                }
            })
        }), dt.each(["ajaxStart", "ajaxStop", "ajaxComplete", "ajaxError", "ajaxSuccess", "ajaxSend"], function(t, e) {
            dt.fn[e] = function(t) {
                return this.on(e, t)
            }
        }), dt.fn.extend({
            bind: function(t, e, n) {
                return this.on(t, null, e, n)
            },
            unbind: function(t, e) {
                return this.off(t, null, e)
            },
            delegate: function(t, e, n, r) {
                return this.on(e, t, n, r)
            },
            undelegate: function(t, e, n) {
                return 1 === arguments.length ? this.off(t, "**") : this.off(e, t || "**", n)
            },
            hover: function(t, e) {
                return this.mouseenter(t).mouseleave(e || t)
            }
        }), dt.each("blur focus focusin focusout resize scroll click dblclick mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave change select submit keydown keypress keyup contextmenu".split(" "), function(t, e) {
            dt.fn[e] = function(t, n) {
                return 0 < arguments.length ? this.on(e, null, t, n) : this.trigger(e)
            }
        });
        var Ge = /^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g;
        dt.proxy = function(t, e) {
            var n, r, o;
            if ("string" == typeof e && (n = t[e], e = t, t = n), lt(t)) return r = Z.call(arguments, 2), (o = function() {
                return t.apply(e || this, r.concat(Z.call(arguments)))
            }).guid = t.guid = t.guid || dt.guid++, o
        }, dt.holdReady = function(t) {
            t ? dt.readyWait++ : dt.ready(!0)
        }, dt.isArray = Array.isArray, dt.parseJSON = JSON.parse, dt.nodeName = i, dt.isFunction = lt, dt.isWindow = ct, dt.camelCase = h, dt.type = r, dt.now = Date.now, dt.isNumeric = function(t) {
            var e = dt.type(t);
            return ("number" === e || "string" === e) && !isNaN(t - parseFloat(t))
        }, dt.trim = function(t) {
            return null == t ? "" : (t + "").replace(Ge, "")
        }, "function" == typeof define && define.amd && define("jquery", [], function() {
            return dt
        });
        var Ye = t.jQuery,
            Qe = t.$;
        return dt.noConflict = function(e) {
            return t.$ === dt && (t.$ = Qe), e && t.jQuery === dt && (t.jQuery = Ye), dt
        }, "undefined" == typeof e && (t.jQuery = t.$ = dt), dt
    }),
    /*
     * jQuery outside events - v1.1 - 3/16/2010
     * http://benalman.com/projects/jquery-outside-events-plugin/
     *
     * Copyright (c) 2010 "Cowboy" Ben Alman
     * Dual licensed under the MIT and GPL licenses.
     * http://benalman.com/about/license/
     */
    function(t, e, n) {
        function r(r, o) {
            function i(e) {
                t(a).each(function() {
                    var n = t(this);
                    this === e.target || n.has(e.target).length || n.triggerHandler(o, [e.target])
                })
            }
            o = o || r + n;
            var a = t(),
                s = r + "." + o + "-special-event";
            t.event.special[o] = {
                setup: function() {
                    a = a.add(this), 1 === a.length && t(e).bind(s, i)
                },
                teardown: function() {
                    a = a.not(this), 0 === a.length && t(e).unbind(s)
                },
                add: function(t) {
                    var e = t.handler;
                    t.handler = function(t, n) {
                        t.target = n, e.apply(this, arguments)
                    }
                }
            }
        }
        t.map("click dblclick mousemove mousedown mouseup mouseover mouseout change select submit keydown keypress keyup".split(" "), function(t) {
            r(t)
        }), r("focusin", "focus" + n), r("focusout", "blur" + n), t.addOutsideEvent = r
    }(jQuery, document, "outside"),
    /**
     * jQuery.timers - Timer abstractions for jQuery
     * Written by Blair Mitchelmore (blair DOT mitchelmore AT gmail DOT com)
     * Licensed under the WTFPL (http://sam.zoy.org/wtfpl/).
     * Date: 2009/10/16
     *
     * @author Blair Mitchelmore
     * @version 1.2
     *
     **/
    jQuery.fn.extend({
        everyTime: function(t, e, n, r) {
            return this.each(function() {
                jQuery.timer.add(this, t, e, n, r)
            })
        },
        oneTime: function(t, e, n) {
            return this.each(function() {
                jQuery.timer.add(this, t, e, n, 1)
            })
        },
        stopTime: function(t, e) {
            return this.each(function() {
                jQuery.timer.remove(this, t, e)
            })
        }
    }), jQuery.extend({
        timer: {
            global: [],
            guid: 1,
            dataKey: "jQuery.timer",
            regex: /^([0-9]+(?:\.[0-9]*)?)\s*(.*s)?$/,
            powers: {
                ms: 1,
                cs: 10,
                ds: 100,
                s: 1e3,
                das: 1e4,
                hs: 1e5,
                ks: 1e6
            },
            timeParse: function(t) {
                if (void 0 == t || null == t) return null;
                var e = this.regex.exec(jQuery.trim(t.toString()));
                if (e[2]) {
                    var n = parseFloat(e[1]),
                        r = this.powers[e[2]] || 1;
                    return n * r
                }
                return t
            },
            add: function(t, e, n, r, o) {
                var i = 0;
                if (jQuery.isFunction(n) && (o || (o = r), r = n, n = e), e = jQuery.timer.timeParse(e), !("number" != typeof e || isNaN(e) || e < 0)) {
                    ("number" != typeof o || isNaN(o) || o < 0) && (o = 0), o = o || 0;
                    var a = jQuery.data(t, this.dataKey) || jQuery.data(t, this.dataKey, {});
                    a[n] || (a[n] = {}), r.timerID = r.timerID || this.guid++;
                    var s = function() {
                        (++i > o && 0 !== o || r.call(t, i) === !1) && jQuery.timer.remove(t, n, r)
                    };
                    s.timerID = r.timerID, a[n][r.timerID] || (a[n][r.timerID] = window.setInterval(s, e)), this.global.push(t)
                }
            },
            remove: function(t, e, n) {
                var r, o = jQuery.data(t, this.dataKey);
                if (o) {
                    if (e) {
                        if (o[e]) {
                            if (n) n.timerID && (window.clearInterval(o[e][n.timerID]), delete o[e][n.timerID]);
                            else
                                for (var n in o[e]) window.clearInterval(o[e][n]), delete o[e][n];
                            for (r in o[e]) break;
                            r || (r = null, delete o[e])
                        }
                    } else
                        for (e in o) this.remove(t, e, n);
                    for (r in o) break;
                    r || jQuery.removeData(t, this.dataKey)
                }
            }
        }
    }), jQuery(window).bind("unload", function() {
        jQuery.each(jQuery.timer.global, function(t, e) {
            jQuery.timer.remove(e)
        })
    }),
    /*
     * @fileOverview TouchSwipe - jQuery Plugin
     * @version 1.6.5
     *
     * @author Matt Bryson http://www.github.com/mattbryson
     * @see https://github.com/mattbryson/TouchSwipe-Jquery-Plugin
     * @see http://labs.skinkers.com/touchSwipe/
     * @see http://plugins.jquery.com/project/touchSwipe
     *
     * Copyright (c) 2010 Matt Bryson
     * Dual licensed under the MIT or GPL Version 2 licenses.
     */
    function(t) {
        "function" == typeof define && define.amd && define.amd.jQuery ? define(["jquery"], t) : t(jQuery)
    }(function(t) {
        function e(e) {
            return !e || void 0 !== e.allowPageScroll || void 0 === e.swipe && void 0 === e.swipeStatus || (e.allowPageScroll = l), void 0 !== e.click && void 0 === e.tap && (e.tap = e.click), e || (e = {}), e = t.extend({}, t.fn.swipe.defaults, e), this.each(function() {
                var r = t(this),
                    o = r.data(C);
                o || (o = new n(this, e), r.data(C, o))
            })
        }

        function n(e, n) {
            function k(e) {
                if (!(st() || t(e.target).closest(n.excludedElements, Ut).length > 0)) {
                    var r, o = e.originalEvent ? e.originalEvent : e,
                        i = x ? o.touches[0] : o;
                    return Vt = _, x ? qt = o.touches.length : e.preventDefault(), Nt = 0, Dt = null, Bt = null, Lt = 0, It = 0, Rt = 0, Ft = 1, Ht = 0, Wt = pt(), zt = yt(), it(), !x || qt === n.fingers || n.fingers === m || z() ? (lt(0, i), $t = xt(), 2 == qt && (lt(1, o.touches[1]), It = Rt = mt(Wt[0].start, Wt[1].start)), (n.swipeStatus || n.pinchStatus) && (r = N(o, Vt))) : r = !1, r === !1 ? (Vt = E, N(o, Vt), r) : (ut(!0), null)
                }
            }

            function S(t) {
                var e = t.originalEvent ? t.originalEvent : t;
                if (Vt !== T && Vt !== E && !at()) {
                    var r, o = x ? e.touches[0] : e,
                        i = ct(o);
                    if (Xt = xt(), x && (qt = e.touches.length), Vt = w, 2 == qt && (0 == It ? (lt(1, e.touches[1]), It = Rt = mt(Wt[0].start, Wt[1].start)) : (ct(e.touches[1]), Rt = mt(Wt[0].end, Wt[1].end), Bt = _t(Wt[0].end, Wt[1].end)), Ft = bt(It, Rt), Ht = Math.abs(It - Rt)), qt === n.fingers || n.fingers === m || !x || z()) {
                        if (Dt = Et(i.start, i.end), H(t, Dt), Nt = wt(i.start, i.end), Lt = gt(), ht(Dt, Nt), (n.swipeStatus || n.pinchStatus) && (r = N(e, Vt)), !n.triggerOnTouchEnd || n.triggerOnTouchLeave) {
                            var a = !0;
                            if (n.triggerOnTouchLeave) {
                                var s = Ct(this);
                                a = kt(i.end, s)
                            }!n.triggerOnTouchEnd && a ? Vt = A(w) : n.triggerOnTouchLeave && !a && (Vt = A(T)), Vt != E && Vt != T || N(e, Vt)
                        }
                    } else Vt = E, N(e, Vt);
                    r === !1 && (Vt = E, N(e, Vt))
                }
            }

            function j(t) {
                var e = t.originalEvent;
                return x && e.touches.length > 0 ? (ot(), !0) : (at() && (qt = Yt), t.preventDefault(), Xt = xt(), Lt = gt(), I() ? (Vt = E, N(e, Vt)) : n.triggerOnTouchEnd || 0 == n.triggerOnTouchEnd && Vt === w ? (Vt = T, N(e, Vt)) : !n.triggerOnTouchEnd && G() ? (Vt = T, D(e, Vt, h)) : Vt === w && (Vt = E, N(e, Vt)), ut(!1), null)
            }

            function O() {
                qt = 0, Xt = 0, $t = 0, It = 0, Rt = 0, Ft = 1, it(), ut(!1)
            }

            function P(t) {
                var e = t.originalEvent;
                n.triggerOnTouchLeave && (Vt = A(T), N(e, Vt))
            }

            function M() {
                Ut.unbind(jt, k), Ut.unbind(At, O), Ut.unbind(Ot, S), Ut.unbind(Pt, j), Mt && Ut.unbind(Mt, P), ut(!1)
            }

            function A(t) {
                var e = t,
                    r = F(),
                    o = L(),
                    i = I();
                return !r || i ? e = E : !o || t != w || n.triggerOnTouchEnd && !n.triggerOnTouchLeave ? !o && t == T && n.triggerOnTouchLeave && (e = E) : e = T, e
            }

            function N(t, e) {
                var n = void 0;
                return W() || q() ? n = D(t, e, f) : (U() || z()) && n !== !1 && (n = D(t, e, p)), nt() && n !== !1 ? n = D(t, e, d) : rt() && n !== !1 ? n = D(t, e, y) : et() && n !== !1 && (n = D(t, e, h)), e === E && O(t), e === T && (x ? 0 == t.touches.length && O(t) : O(t)), n
            }

            function D(e, l, c) {
                var v = void 0;
                if (c == f) {
                    if (Ut.trigger("swipeStatus", [l, Dt || null, Nt || 0, Lt || 0, qt]), n.swipeStatus && (v = n.swipeStatus.call(Ut, e, l, Dt || null, Nt || 0, Lt || 0, qt), v === !1)) return !1;
                    if (l == T && V()) {
                        if (Ut.trigger("swipe", [Dt, Nt, Lt, qt]), n.swipe && (v = n.swipe.call(Ut, e, Dt, Nt, Lt, qt), v === !1)) return !1;
                        switch (Dt) {
                            case r:
                                Ut.trigger("swipeLeft", [Dt, Nt, Lt, qt]), n.swipeLeft && (v = n.swipeLeft.call(Ut, e, Dt, Nt, Lt, qt));
                                break;
                            case o:
                                Ut.trigger("swipeRight", [Dt, Nt, Lt, qt]), n.swipeRight && (v = n.swipeRight.call(Ut, e, Dt, Nt, Lt, qt));
                                break;
                            case i:
                                Ut.trigger("swipeUp", [Dt, Nt, Lt, qt]), n.swipeUp && (v = n.swipeUp.call(Ut, e, Dt, Nt, Lt, qt));
                                break;
                            case a:
                                Ut.trigger("swipeDown", [Dt, Nt, Lt, qt]), n.swipeDown && (v = n.swipeDown.call(Ut, e, Dt, Nt, Lt, qt))
                        }
                    }
                }
                if (c == p) {
                    if (Ut.trigger("pinchStatus", [l, Bt || null, Ht || 0, Lt || 0, qt, Ft]), n.pinchStatus && (v = n.pinchStatus.call(Ut, e, l, Bt || null, Ht || 0, Lt || 0, qt, Ft), v === !1)) return !1;
                    if (l == T && B()) switch (Bt) {
                        case s:
                            Ut.trigger("pinchIn", [Bt || null, Ht || 0, Lt || 0, qt, Ft]), n.pinchIn && (v = n.pinchIn.call(Ut, e, Bt || null, Ht || 0, Lt || 0, qt, Ft));
                            break;
                        case u:
                            Ut.trigger("pinchOut", [Bt || null, Ht || 0, Lt || 0, qt, Ft]), n.pinchOut && (v = n.pinchOut.call(Ut, e, Bt || null, Ht || 0, Lt || 0, qt, Ft))
                    }
                }
                return c == h ? l !== E && l !== T || (clearTimeout(Kt), Y() && !J() ? (Qt = xt(), Kt = setTimeout(t.proxy(function() {
                    Qt = null, Ut.trigger("tap", [e.target]), n.tap && (v = n.tap.call(Ut, e, e.target))
                }, this), n.doubleTapThreshold)) : (Qt = null, Ut.trigger("tap", [e.target]), n.tap && (v = n.tap.call(Ut, e, e.target)))) : c == d ? l !== E && l !== T || (clearTimeout(Kt), Qt = null, Ut.trigger("doubletap", [e.target]), n.doubleTap && (v = n.doubleTap.call(Ut, e, e.target))) : c == y && (l !== E && l !== T || (clearTimeout(Kt), Qt = null, Ut.trigger("longtap", [e.target]), n.longTap && (v = n.longTap.call(Ut, e, e.target)))), v
            }

            function L() {
                var t = !0;
                return null !== n.threshold && (t = Nt >= n.threshold), t
            }

            function I() {
                var t = !1;
                return null !== n.cancelThreshold && null !== Dt && (t = dt(Dt) - Nt >= n.cancelThreshold), t
            }

            function R() {
                return null === n.pinchThreshold || Ht >= n.pinchThreshold
            }

            function F() {
                var t;
                return t = !n.maxTimeThreshold || !(Lt >= n.maxTimeThreshold)
            }

            function H(t, e) {
                if (n.allowPageScroll === l || z()) t.preventDefault();
                else {
                    var s = n.allowPageScroll === c;
                    switch (e) {
                        case r:
                            (n.swipeLeft && s || !s && n.allowPageScroll != v) && t.preventDefault();
                            break;
                        case o:
                            (n.swipeRight && s || !s && n.allowPageScroll != v) && t.preventDefault();
                            break;
                        case i:
                            (n.swipeUp && s || !s && n.allowPageScroll != g) && t.preventDefault();
                            break;
                        case a:
                            (n.swipeDown && s || !s && n.allowPageScroll != g) && t.preventDefault()
                    }
                }
            }

            function B() {
                var t = $(),
                    e = X(),
                    n = R();
                return t && e && n
            }

            function z() {
                return !!(n.pinchStatus || n.pinchIn || n.pinchOut)
            }

            function U() {
                return !(!B() || !z())
            }

            function V() {
                var t = F(),
                    e = L(),
                    n = $(),
                    r = X(),
                    o = I(),
                    i = !o && r && n && e && t;
                return i
            }

            function q() {
                return !!(n.swipe || n.swipeStatus || n.swipeLeft || n.swipeRight || n.swipeUp || n.swipeDown)
            }

            function W() {
                return !(!V() || !q())
            }

            function $() {
                return qt === n.fingers || n.fingers === m || !x
            }

            function X() {
                return 0 !== Wt[0].end.x
            }

            function G() {
                return !!n.tap
            }

            function Y() {
                return !!n.doubleTap
            }

            function Q() {
                return !!n.longTap
            }

            function K() {
                if (null == Qt) return !1;
                var t = xt();
                return Y() && t - Qt <= n.doubleTapThreshold
            }

            function J() {
                return K()
            }

            function Z() {
                return (1 === qt || !x) && (isNaN(Nt) || 0 === Nt)
            }

            function tt() {
                return Lt > n.longTapThreshold && Nt < b
            }

            function et() {
                return !(!Z() || !G())
            }

            function nt() {
                return !(!K() || !Y())
            }

            function rt() {
                return !(!tt() || !Q())
            }

            function ot() {
                Gt = xt(), Yt = event.touches.length + 1
            }

            function it() {
                Gt = 0, Yt = 0
            }

            function at() {
                var t = !1;
                if (Gt) {
                    var e = xt() - Gt;
                    e <= n.fingerReleaseThreshold && (t = !0)
                }
                return t
            }

            function st() {
                return !(Ut.data(C + "_intouch") !== !0)
            }

            function ut(t) {
                t === !0 ? (Ut.bind(Ot, S), Ut.bind(Pt, j), Mt && Ut.bind(Mt, P)) : (Ut.unbind(Ot, S, !1), Ut.unbind(Pt, j, !1), Mt && Ut.unbind(Mt, P, !1)), Ut.data(C + "_intouch", t === !0)
            }

            function lt(t, e) {
                var n = void 0 !== e.identifier ? e.identifier : 0;
                return Wt[t].identifier = n, Wt[t].start.x = Wt[t].end.x = e.pageX || e.clientX, Wt[t].start.y = Wt[t].end.y = e.pageY || e.clientY, Wt[t]
            }

            function ct(t) {
                var e = void 0 !== t.identifier ? t.identifier : 0,
                    n = ft(e);
                return n.end.x = t.pageX || t.clientX, n.end.y = t.pageY || t.clientY, n
            }

            function ft(t) {
                for (var e = 0; e < Wt.length; e++)
                    if (Wt[e].identifier == t) return Wt[e]
            }

            function pt() {
                for (var t = [], e = 0; e <= 5; e++) t.push({
                    start: {
                        x: 0,
                        y: 0
                    },
                    end: {
                        x: 0,
                        y: 0
                    },
                    identifier: 0
                });
                return t
            }

            function ht(t, e) {
                e = Math.max(e, dt(t)), zt[t].distance = e
            }

            function dt(t) {
                if (zt[t]) return zt[t].distance
            }

            function yt() {
                var t = {};
                return t[r] = vt(r), t[o] = vt(o), t[i] = vt(i), t[a] = vt(a), t
            }

            function vt(t) {
                return {
                    direction: t,
                    distance: 0
                }
            }

            function gt() {
                return Xt - $t
            }

            function mt(t, e) {
                var n = Math.abs(t.x - e.x),
                    r = Math.abs(t.y - e.y);
                return Math.round(Math.sqrt(n * n + r * r))
            }

            function bt(t, e) {
                var n = e / t * 1;
                return n.toFixed(2)
            }

            function _t() {
                return Ft < 1 ? u : s
            }

            function wt(t, e) {
                return Math.round(Math.sqrt(Math.pow(e.x - t.x, 2) + Math.pow(e.y - t.y, 2)))
            }

            function Tt(t, e) {
                var n = t.x - e.x,
                    r = e.y - t.y,
                    o = Math.atan2(r, n),
                    i = Math.round(180 * o / Math.PI);
                return i < 0 && (i = 360 - Math.abs(i)), i
            }

            function Et(t, e) {
                var n = Tt(t, e);
                return n <= 45 && n >= 0 ? r : n <= 360 && n >= 315 ? r : n >= 135 && n <= 225 ? o : n > 45 && n < 135 ? a : i
            }

            function xt() {
                var t = new Date;
                return t.getTime()
            }

            function Ct(e) {
                e = t(e);
                var n = e.offset(),
                    r = {
                        left: n.left,
                        right: n.left + e.outerWidth(),
                        top: n.top,
                        bottom: n.top + e.outerHeight()
                    };
                return r
            }

            function kt(t, e) {
                return t.x > e.left && t.x < e.right && t.y > e.top && t.y < e.bottom
            }
            var St = x || !n.fallbackToMouseEvents,
                jt = St ? "touchstart" : "mousedown",
                Ot = St ? "touchmove" : "mousemove",
                Pt = St ? "touchend" : "mouseup",
                Mt = St ? null : "mouseleave",
                At = "touchcancel",
                Nt = 0,
                Dt = null,
                Lt = 0,
                It = 0,
                Rt = 0,
                Ft = 1,
                Ht = 0,
                Bt = 0,
                zt = null,
                Ut = t(e),
                Vt = "start",
                qt = 0,
                Wt = null,
                $t = 0,
                Xt = 0,
                Gt = 0,
                Yt = 0,
                Qt = 0,
                Kt = null;
            try {
                Ut.bind(jt, k), Ut.bind(At, O)
            } catch (Jt) {
                t.error("events not supported " + jt + "," + At + " on jQuery.swipe")
            }
            this.enable = function() {
                return Ut.bind(jt, k), Ut.bind(At, O), Ut
            }, this.disable = function() {
                return M(), Ut
            }, this.destroy = function() {
                return M(), Ut.data(C, null), Ut
            }, this.option = function(e, r) {
                if (void 0 !== n[e]) {
                    if (void 0 === r) return n[e];
                    n[e] = r
                } else t.error("Option " + e + " does not exist on jQuery.swipe.options");
                return null
            }
        }
        var r = "left",
            o = "right",
            i = "up",
            a = "down",
            s = "in",
            u = "out",
            l = "none",
            c = "auto",
            f = "swipe",
            p = "pinch",
            h = "tap",
            d = "doubletap",
            y = "longtap",
            v = "horizontal",
            g = "vertical",
            m = "all",
            b = 10,
            _ = "start",
            w = "move",
            T = "end",
            E = "cancel",
            x = "ontouchstart" in window,
            C = "TouchSwipe",
            k = {
                fingers: 1,
                threshold: 75,
                cancelThreshold: null,
                pinchThreshold: 20,
                maxTimeThreshold: null,
                fingerReleaseThreshold: 250,
                longTapThreshold: 500,
                doubleTapThreshold: 200,
                swipe: null,
                swipeLeft: null,
                swipeRight: null,
                swipeUp: null,
                swipeDown: null,
                swipeStatus: null,
                pinchIn: null,
                pinchOut: null,
                pinchStatus: null,
                click: null,
                tap: null,
                doubleTap: null,
                longTap: null,
                triggerOnTouchEnd: !0,
                triggerOnTouchLeave: !1,
                allowPageScroll: "auto",
                fallbackToMouseEvents: !0,
                excludedElements: "label, button, input, select, textarea, a, .noSwipe"
            };
        t.fn.swipe = function(n) {
            var r = t(this),
                o = r.data(C);
            if (o && "string" == typeof n) {
                if (o[n]) return o[n].apply(this, Array.prototype.slice.call(arguments, 1));
                t.error("Method " + n + " does not exist on jQuery.swipe")
            } else if (!(o || "object" != typeof n && n)) return e.apply(this, arguments);
            return r
        }, t.fn.swipe.defaults = k, t.fn.swipe.phases = {
            PHASE_START: _,
            PHASE_MOVE: w,
            PHASE_END: T,
            PHASE_CANCEL: E
        }, t.fn.swipe.directions = {
            LEFT: r,
            RIGHT: o,
            UP: i,
            DOWN: a,
            IN: s,
            OUT: u
        }, t.fn.swipe.pageScroll = {
            NONE: l,
            HORIZONTAL: v,
            VERTICAL: g,
            AUTO: c
        }, t.fn.swipe.fingers = {
            ONE: 1,
            TWO: 2,
            THREE: 3,
            ALL: m
        }
    }), jQuery.fn.clickoutside = function(t) {
        var e = 1,
            n = $(this);
        return n.cb = t, this.click(function() {
            e = 0
        }), $(document).click(function(t) {
            e && n.cb(t), e = 1
        }), $(this)
    },
    function(t) {
        t.fn.extend({
            setSelection: function(e) {
                return e === !0 ? e = "all" : e === !1 ? e = "none" : e || (e = "all"), this.each(function() {
                    "none" == e ? (this.onselectstart = function() {
                        return !1
                    }, this.unselectable = "on") : (this.onselectstart = null, this.unselectable = "off"), t(this).css({
                        "user-select": e,
                        "-o-user-select": e,
                        "-moz-user-select": e,
                        "-khtml-user-select": e,
                        "-webkit-user-select": e,
                        "-ms-user-select": e
                    })
                })
            }
        })
    }(jQuery),
    /*! Copyright (c) 2013 Brandon Aaron (http://brandon.aaron.sh)
     * Licensed under the MIT License (LICENSE.txt).
     *
     * Version: 3.1.6
     *
     * Requires: jQuery 1.2.2+
     */
    function(t) {
        "function" == typeof define && define.amd ? define(["jquery"], t) : "object" == typeof exports ? module.exports = t : t(jQuery)
    }(function(t) {
        function e(e) {
            var i = e || window.event,
                a = s.call(arguments, 1),
                u = 0,
                l = 0,
                c = 0,
                f = 0;
            if (e = t.event.fix(i), e.type = "mousewheel", "detail" in i && (c = i.detail * -1), "wheelDelta" in i && (c = i.wheelDelta), "wheelDeltaY" in i && (c = i.wheelDeltaY), "wheelDeltaX" in i && (l = i.wheelDeltaX * -1), "axis" in i && i.axis === i.HORIZONTAL_AXIS && (l = c * -1, c = 0), u = 0 === c ? l : c, "deltaY" in i && (c = i.deltaY * -1, u = c), "deltaX" in i && (l = i.deltaX, 0 === c && (u = l * -1)), 0 !== c || 0 !== l) return f = Math.max(Math.abs(c), Math.abs(l)), (!o || f < o) && (o = f), u = Math[u >= 1 ? "floor" : "ceil"](u / o), l = Math[l >= 1 ? "floor" : "ceil"](l / o), c = Math[c >= 1 ? "floor" : "ceil"](c / o), e.deltaX = l, e.deltaY = c, e.deltaFactor = o, a.unshift(e, u, l, c), r && clearTimeout(r), r = setTimeout(n, 200), (t.event.dispatch || t.event.handle).apply(this, a)
        }

        function n() {
            o = null
        }
        var r, o, i = ["wheel", "mousewheel", "DOMMouseScroll", "MozMousePixelScroll"],
            a = "onwheel" in document || document.documentMode >= 9 ? ["wheel"] : ["mousewheel", "DomMouseScroll", "MozMousePixelScroll"],
            s = Array.prototype.slice;
        if (t.event.fixHooks)
            for (var u = i.length; u;) t.event.fixHooks[i[--u]] = t.event.mouseHooks;
        t.event.special.mousewheel = {
            version: "3.1.6",
            setup: function() {
                if (this.addEventListener)
                    for (var t = a.length; t;) this.addEventListener(a[--t], e, !1);
                else this.onmousewheel = e
            },
            teardown: function() {
                if (this.removeEventListener)
                    for (var t = a.length; t;) this.removeEventListener(a[--t], e, !1);
                else this.onmousewheel = null
            }
        }, t.fn.extend({
            mousewheel: function(t) {
                return t ? this.bind("mousewheel", t) : this.trigger("mousewheel")
            },
            unmousewheel: function(t) {
                return this.unbind("mousewheel", t)
            }
        })
    }),
    function(t, e, n, r) {
        function o(t, e) {
            e = e || !1, "string" == typeof t && (t = a(t));
            var n = r.extend(!0, a(h()), t),
                o = i(e ? n.query : t.query),
                s = [];
            if (n.pathname) {
                var u = n.pathname.split(w);
                r(u).each(function(t, e) {
                    e = r.trim(e), "" !== e && s.push(e)
                })
            }
            return n.protocol + _ + n.hostname + w + s.join(w) + o + n.hash
        }

        function i(t) {
            var e = [];
            return r.each(t, function(t, n) {
                n && ("object" != typeof n && (n = [n]), r.each(n, function(n, r) {
                    e.push(encodeURIComponent(t) + b + encodeURIComponent(r))
                }))
            }), e.length ? g + e.join(m) : ""
        }

        function a(t) {
            t = t || "#";
            var e = document.createElement("a");
            return e.href = t, e.href = e.href, {
                protocol: e.protocol.length > 1 ? e.protocol : void 0,
                hostname: e.hostname || window.location.hostname,
                port: e.port.length ? e.port : void 0,
                pathname: s(e.pathname.length && !e.hostname && t.substr(0, 1) !== w ? u(e.pathname) : e.pathname),
                search: e.search.length ? e.search : void 0,
                hash: e.hash,
                host: e.host,
                query: c(e.search.replace(/\+/g, "%20"))
            }
        }

        function s(t) {
            return "undefined" == typeof t || t.substr(0, 1) === w ? t : "undefined" == typeof window.ActiveXObject && "ActiveXObject" in window ? w + t : t
        }

        function u(t) {
            var n = e.pathname.split(w),
                r = t.split(w),
                o = "" == r[0];
            return o ? t : n.slice(0, n.length - 1).join(w) + w + r.join(w)
        }

        function l(t) {
            try {
                return decodeURIComponent(t)
            } catch (e) {
                return unescape(t)
            }
        }

        function c(t) {
            t = t.substr(0, 1) == g ? t.substr(1) : t;
            var e = {};
            return t.length < 1 ? e : (r(t.split(m)).each(function(t, n) {
                var o = n.split(b);
                try {
                    var i = l(o[0]),
                        a = l(o[1])
                } catch (s) {
                    console.error({
                        exception: s,
                        key: o[0],
                        value: o[1]
                    })
                }
                "undefined" != typeof e[i] ? "string" != typeof e[i] ? r.inArray(a, e[i]) === -1 && e[i].push(a) : e[i] = [e[i], a] : e[i] = a
            }), e)
        }

        function f(t) {
            r(T).each(function(e, o) {
                r.isFunction(o) && o(t, n.state)
            })
        }

        function p(t) {
            var e = {
                state: {},
                title: document.title
            };
            return r.extend(e, t)
        }

        function h() {
            return E
        }

        function d() {
            return l(E)
        }

        function y(t) {
            return encodeURI(t)
        }

        function v(t) {
            return decodeURI(t)
        }
        var g = "?",
            m = "&",
            b = "=",
            _ = "//",
            w = "/",
            T = [],
            E = e.href;
        t.LocationService = {
            pushState: function(t, e, n, r) {
                r = r || !1;
                var i = p("undefined" == typeof n ? t : {
                        state: t,
                        title: e,
                        url: n
                    }),
                    a = o(i.url, r);
                E = a, window.history.pushState && window.history.pushState(i.state, i.title)
            },
            replaceState: function(t, e, n, r) {
                r = r || !1;
                var i = p("undefined" == typeof n ? t : {
                        state: t,
                        title: e,
                        url: n
                    }),
                    a = o(i.url, r);
                E = a, window.history.replaceState && window.history.replaceState(i.state, i.title, a)
            },
            popstate: function(t) {
                t ? T.push(t) : f()
            },
            reload: function() {
                e.href == E ? e.reload() : window.location.href = E
            },
            setLocation: function(t, e) {
                e = e || !1;
                var n = this.buildUrlString(t, e);
                E = n, window.location.href = n
            },
            parseUrl: a,
            parseQueryString: c,
            buildUrlString: o,
            sameLocation: d,
            urlEncode: y,
            urlDecode: v
        }, window.addEventListener && window.addEventListener("load", setTimeout.bind(null, function() {
            window.onpopstate = f
        }, 0))
    }(window, window.location, window.history, jQuery),
    function(t, e) {
        var n = function(t, n) {
            this.$element = e(t), this.options = {
                theme: "black",
                positioning: "absolute",
                zIndex: 999,
                customPosition: {
                    position: "absolute",
                    left: "0px",
                    top: "0px"
                }
            }, n = n || {}, e.extend(!0, this.options, n), this.$loadingImage = this._getPreparedLoadingImage(), this._setPosition(this.$loadingImage)
        };
        n.prototype._getOption = function(t) {
            return this.options[t]
        }, n.prototype._getPreparedLoadingImage = function() {
            return this.$element.find(".tr-loading-image").length ? this.$element.find(".tr-loading-image") : e('<img src="' + globals.picsOffset + "images/misc/loader-" + this._getOption("theme") + '.gif" class="tr-loading-image" width="38" height="21">').appendTo(this.$element).css({
                zIndex: this._getOption("zIndex"),
                display: "none"
            })
        }, n.prototype._setPosition = function(t) {
            switch (this._getOption("positioning")) {
                case "absolute":
                    "static" == this.$element.css("position") && this.$element.css("position", "relative"), t.css({
                        position: "absolute",
                        left: (this.$element.width() - parseInt(t.attr("width"))) / 2 + "px",
                        top: (this.$element.height() - parseInt(t.attr("height"))) / 2 + "px"
                    });
                    break;
                case "custom":
                    "static" == this.$element.css("position") && this.$element.css("position", "relative"), t.css(this._getOption("customPosition"));
                    break;
                default:
                    console.error("Invalid positioning option for LoadingAnimation")
            }
            return this
        }, n.prototype.show = function() {
            return this._setPosition(this.$loadingImage), this.$loadingImage.show(), this
        }, n.prototype.hide = function() {
            return this.$loadingImage.fadeOut(80), this
        }, t.LoadingAnimation = n
    }(window, jQuery), /*! audio5 2018-03-13 */
    ! function(t, e, n) {
        "use strict";
        "undefined" != typeof module && module.exports ? module.exports = n(e, t) : "function" == typeof define && define.amd ? define(function() {
            return n(e, t)
        }) : t[e] = n(e, t)
    }(window, "Audio5js", function(t, e) {
        "use strict";

        function n(t) {
            this.message = t
        }

        function r(t) {
            var e, n = {};
            for (e in t) "object" == typeof t[e] ? n[e] = r(t[e]) : n[e] = t[e];
            return n
        }
        var o = e.ActiveXObject;
        n.prototype = new Error;
        var i = function(t, e) {
                var n, o = r(e);
                for (n in o) o.hasOwnProperty(n) && (t[n] = o[n]);
                return t
            },
            a = function(t, e) {
                return i(t.prototype, e)
            },
            s = {
                on: function(t, e, n) {
                    this.subscribe(t, e, n, !1)
                },
                one: function(t, e, n) {
                    this.subscribe(t, e, n, !0)
                },
                off: function(t, e) {
                    if (void 0 !== this.channels[t]) {
                        var n, r;
                        for (n = 0, r = this.channels[t].length; n < r; n++)
                            if (this.channels[t][n].fn === e) {
                                this.channels[t].splice(n, 1);
                                break
                            }
                    }
                },
                subscribe: function(t, e, n, r) {
                    void 0 === this.channels && (this.channels = {}), this.channels[t] = this.channels[t] || [], this.channels[t].push({
                        fn: e,
                        ctx: n,
                        once: r || !1
                    })
                },
                trigger: function(t) {
                    if (this.channels && this.channels.hasOwnProperty(t)) {
                        for (var e = Array.prototype.slice.call(arguments, 1), n = [], r = []; this.channels[t].length > 0;) {
                            var o = this.channels[t].shift();
                            o.once || n.push(o), "function" == typeof o.fn && r.push(o)
                        }
                        for (this.channels[t] = n; r.length > 0;) {
                            var i = r.shift();
                            i.fn.apply(i.ctx, e)
                        }
                    }
                }
            },
            u = {
                flash_embed_code: function(e, n, r) {
                    var i = t + e,
                        a = '<param name="movie" value="' + n + "?playerInstanceNumber=" + e + "&datetime=" + r + '"/><param name="wmode" value="transparent"/><param name="allowscriptaccess" value="always" /></object>';
                    return (o ? '<object classid="clsid:D27CDB6E-AE6D-11cf-96B8-444553540000" width="1" height="1" id="' + i + '">' : '<object type="application/x-shockwave-flash" data="' + n + "?playerInstanceNumber=" + e + "&datetime=" + r + '" width="1" height="1" id="' + i + '" >') + a
                },
                can_play: function(t) {
                    var e, n = document.createElement("audio");
                    switch (t) {
                        case "mp3":
                            e = "audio/mpeg;";
                            break;
                        case "vorbis":
                            e = 'audio/ogg; codecs="vorbis"';
                            break;
                        case "opus":
                            e = 'audio/ogg; codecs="opus"';
                            break;
                        case "webm":
                            e = 'audio/webm; codecs="vorbis"';
                            break;
                        case "mp4":
                            e = 'audio/mp4; codecs="mp4a.40.5"';
                            break;
                        case "wav":
                            e = 'audio/wav; codecs="1"'
                    }
                    if (void 0 !== e) {
                        if ("mp3" === t && navigator.userAgent.match(/Android/i) && navigator.userAgent.match(/Firefox/i)) return !0;
                        try {
                            return !!n.canPlayType && "" !== n.canPlayType(e)
                        } catch (r) {
                            return !1
                        }
                    }
                    return !1
                },
                has_flash: function() {
                    var t = !1;
                    if (navigator.plugins && navigator.plugins.length && navigator.plugins["Shockwave Flash"]) t = !0;
                    else if (navigator.mimeTypes && navigator.mimeTypes.length) {
                        var e = navigator.mimeTypes["application/x-shockwave-flash"];
                        t = e && e.enabledPlugin
                    } else try {
                        var n = new o("ShockwaveFlash.ShockwaveFlash");
                        t = "object" == typeof n
                    } catch (r) {}
                    return t
                }(),
                embedFlash: function(n, r) {
                    var o = document.createElement("div");
                    if (o.style.position = "absolute", o.style.width = "1px", o.style.height = "1px", o.style.top = "1px", document.body.appendChild(o), "object" == typeof e.swfobject) {
                        var i = {
                                playerInstance: "window." + t + "_flash.instances['" + r + "']"
                            },
                            a = {
                                allowscriptaccess: "always",
                                wmode: "transparent"
                            };
                        o.innerHTML = '<div id="' + t + r + '"></div>', swfobject.embedSWF(n + "?ts=" + ((new Date).getTime() + Math.random()), t + r, "1", "1", "9.0.0", null, i, a)
                    } else {
                        var s = (new Date).getTime() + Math.random();
                        o.innerHTML = this.flash_embed_code(r, n, s)
                    }
                    return document.getElementById(r)
                },
                formatTime: function(t) {
                    var e = parseInt(t / 3600, 10) % 24,
                        n = parseInt(t / 60, 10) % 60,
                        r = parseInt(t % 60, 10),
                        o = (n < 10 ? "0" + n : n) + ":" + (r < 10 ? "0" + r : r);
                    return e > 0 ? (e < 10 ? "0" + e : e) + ":" + o : o
                }
            };
        u.use_flash = u.can_play("mp3");
        var l, c, f, p = {
                playing: !1,
                vol: 1,
                duration: 0,
                position: 0,
                load_percent: 0,
                seekable: !1,
                ready: null
            },
            h = e[t + "_flash"] = e[t + "_flash"] || {
                instances: []
            };
        c = function() {
            if (u.use_flash && !u.has_flash) throw new Error("Flash Plugin Missing")
        }, c.prototype = {
            init: function(t) {
                h.instances.push(this), this.id = h.instances.length - 1, this.embed(t)
            },
            embed: function(t) {
                u.embedFlash(t, this.id)
            },
            eiReady: function() {
                this.audio = document.getElementById(t + this.id), this.trigger("ready")
            },
            eiLoadStart: function() {
                this.trigger("loadstart")
            },
            eiLoadedMetadata: function() {
                this.trigger("loadedmetadata")
            },
            eiCanPlay: function() {
                this.trigger("canplay")
            },
            eiTimeUpdate: function(t, e, n) {
                this.position = t, this.duration = e, this.seekable = n, this.trigger("timeupdate", t, this.seekable ? e : null)
            },
            eiProgress: function(t, e, n) {
                this.load_percent = t, this.duration = e, this.seekable = n, this.trigger("progress", t)
            },
            eiLoadError: function(t) {
                this.trigger("error", t)
            },
            eiPlay: function() {
                this.playing = !0, this.trigger("play"), this.trigger("playing")
            },
            eiPause: function() {
                this.playing = !1, this.trigger("pause")
            },
            eiEnded: function() {
                this.pause(), this.trigger("ended")
            },
            eiSeeking: function() {
                this.trigger("seeking")
            },
            eiSeeked: function() {
                this.trigger("seeked")
            },
            reset: function() {
                this.seekable = !1, this.duration = 0, this.position = 0, this.load_percent = 0
            },
            load: function(t) {
                this.reset(), this.audio.load(t)
            },
            play: function() {
                this.audio.pplay()
            },
            pause: function() {
                this.audio.ppause()
            },
            volume: function(t) {
                return void 0 === t || isNaN(parseInt(t, 10)) ? this.vol : (this.audio.setVolume(t), void(this.vol = t))
            },
            seek: function(t) {
                try {
                    this.audio.seekTo(t), this.position = t
                } catch (e) {}
            },
            rate: function() {},
            destroyAudio: function() {
                this.audio && (this.pause(), this.audio.parentNode.removeChild(this.audio), delete h.instances[this.id], h.instances.splice(this.id, 1), delete this.audio)
            }
        }, a(c, s), a(c, p), f = function() {}, f.prototype = {
            init: function() {
                this._rate = 1, this.trigger("ready")
            },
            createAudio: function() {
                this.audio = new Audio, this.audio.autoplay = !1, this.audio.preload = "auto", this.audio.autobuffer = !0, this.audio.playbackRate = this._rate, this.bindEvents()
            },
            destroyAudio: function() {
                if (this.audio) {
                    this.pause(), this.unbindEvents();
                    try {
                        this.audio.setAttribute("src", "")
                    } finally {
                        delete this.audio
                    }
                }
            },
            setupEventListeners: function() {
                this.listeners = {
                    loadstart: this.onLoadStart.bind(this),
                    canplay: this.onLoad.bind(this),
                    loadedmetadata: this.onLoadedMetadata.bind(this),
                    play: this.onPlay.bind(this),
                    playing: this.onPlaying.bind(this),
                    pause: this.onPause.bind(this),
                    ended: this.onEnded.bind(this),
                    error: this.onError.bind(this),
                    timeupdate: this.onTimeUpdate.bind(this),
                    seeking: this.onSeeking.bind(this),
                    seeked: this.onSeeked.bind(this)
                }
            },
            bindEvents: function() {
                void 0 === this.listeners && this.setupEventListeners(), this.audio.addEventListener("loadstart", this.listeners.loadstart, !1), this.audio.addEventListener("canplay", this.listeners.canplay, !1), this.audio.addEventListener("loadedmetadata", this.listeners.loadedmetadata, !1), this.audio.addEventListener("play", this.listeners.play, !1), this.audio.addEventListener("playing", this.listeners.playing, !1), this.audio.addEventListener("pause", this.listeners.pause, !1), this.audio.addEventListener("ended", this.listeners.ended, !1), this.audio.addEventListener("error", this.listeners.error, !1), this.audio.addEventListener("timeupdate", this.listeners.timeupdate, !1), this.audio.addEventListener("seeking", this.listeners.seeking, !1), this.audio.addEventListener("seeked", this.listeners.seeked, !1)
            },
            unbindEvents: function() {
                this.audio.removeEventListener("loadstart", this.listeners.loadstart), this.audio.removeEventListener("canplay", this.listeners.canplay), this.audio.removeEventListener("loadedmetadata", this.listeners.loadedmetadata), this.audio.removeEventListener("play", this.listeners.play), this.audio.removeEventListener("playing", this.listeners.playing), this.audio.removeEventListener("pause", this.listeners.pause), this.audio.removeEventListener("ended", this.listeners.ended), this.audio.removeEventListener("error", this.listeners.error), this.audio.removeEventListener("timeupdate", this.listeners.timeupdate), this.audio.removeEventListener("seeking", this.listeners.seeking), this.audio.removeEventListener("seeked", this.listeners.seeked)
            },
            onLoadStart: function() {
                this.trigger("loadstart")
            },
            onLoad: function() {
                return this.audio ? (this.seekable = this.audio.seekable && this.audio.seekable.length > 0, this.seekable && (this.timer = setInterval(this.onProgress.bind(this), 250)), this.trigger("canplay"), void 0) : setTimeout(this.onLoad.bind(this), 100)
            },
            onLoadedMetadata: function() {
                this.trigger("loadedmetadata")
            },
            onPlay: function() {
                this.playing = !0, this.trigger("play")
            },
            onPlaying: function() {
                this.playing = !0, this.trigger("playing")
            },
            onPause: function() {
                this.playing = !1, this.trigger("pause")
            },
            onEnded: function() {
                this.playing = !1, this.trigger("ended")
            },
            onTimeUpdate: function() {
                if (this.audio && this.playing) {
                    try {
                        this.position = this.audio.currentTime, this.duration = this.audio.duration === 1 / 0 ? null : this.audio.duration
                    } catch (t) {}
                    this.trigger("timeupdate", this.position, this.duration)
                }
            },
            onProgress: function() {
                this.audio && null !== this.audio.buffered && this.audio.buffered.length && (this.duration = this.audio.duration === 1 / 0 ? null : this.audio.duration, this.load_percent = parseInt(this.audio.buffered.end(this.audio.buffered.length - 1) / this.duration * 100, 10), this.trigger("progress", this.load_percent), this.load_percent >= 100 && this.clearLoadProgress())
            },
            onError: function(t) {
                this.trigger("error", t)
            },
            onSeeking: function() {
                this.trigger("seeking")
            },
            onSeeked: function() {
                this.trigger("seeked")
            },
            clearLoadProgress: function() {
                void 0 !== this.timer && (clearInterval(this.timer), delete this.timer)
            },
            reset: function() {
                this.clearLoadProgress(), this.seekable = !1, this.duration = 0, this.position = 0, this.load_percent = 0
            },
            load: function(t) {
                this.reset(), this.trigger("pause"), void 0 === this.audio && this.createAudio(), this.audio.setAttribute("src", t), this.audio.load()
            },
            play: function() {
                if (this.audio) {
                    var t = this.audio.play();
                    return this.audio.playbackRate = this._rate, t
                }
            },
            pause: function() {
                this.audio && this.audio.pause()
            },
            volume: function(t) {
                if (void 0 === t || isNaN(parseInt(t, 10))) return this.vol;
                var e = t < 0 ? 0 : Math.min(1, t);
                this.audio.volume = e, this.vol = e
            },
            seek: function(t) {
                var e = this.playing;
                this.position = t, this.audio.currentTime = t, e ? this.play() : null !== this.audio.buffered && this.audio.buffered.length && this.trigger("timeupdate", this.position, this.duration)
            },
            rate: function(t) {
                return void 0 === t || isNaN(parseFloat(t)) ? this._rate : (this._rate = t, void(this.audio && (this.audio.playbackRate = t)))
            }
        }, a(f, s), a(f, p);
        var d = {
            swf_path: "/swf/audiojs.swf",
            throw_errors: !0,
            format_time: !0,
            codecs: ["mp3"]
        };
        return l = function(t) {
            t = t || {};
            var e;
            for (e in d) d.hasOwnProperty(e) && !t.hasOwnProperty(e) && (t[e] = d[e]);
            this.init(t)
        }, l.can_play = function(t) {
            return u.can_play(t)
        }, l.prototype = {
            init: function(t) {
                this.ready = !1, this.settings = t, this.audio = this.getPlayer(), this.bindAudioEvents(), this.settings.use_flash ? this.audio.init(t.swf_path) : this.audio.init()
            },
            getPlayer: function() {
                var t, e, n, r;
                if (this.settings.use_flash) n = new c, this.settings.player = {
                    engine: "flash",
                    codec: "mp3"
                };
                else {
                    for (t = 0, e = this.settings.codecs.length; t < e; t++)
                        if (r = this.settings.codecs[t], l.can_play(r)) {
                            n = new f, this.settings.use_flash = !1, this.settings.player = {
                                engine: "html",
                                codec: r
                            };
                            break
                        } void 0 === n && (this.settings.use_flash = !l.can_play("mp3"), n = this.settings.use_flash ? new c : new f, this.settings.player = {
                        engine: this.settings.use_flash ? "flash" : "html",
                        codec: "mp3"
                    })
                }
                return n
            },
            bindAudioEvents: function() {
                this.audio.on("ready", this.onReady, this), this.audio.on("loadstart", this.onLoadStart, this), this.audio.on("loadedmetadata", this.onLoadedMetadata, this), this.audio.on("play", this.onPlay, this), this.audio.on("pause", this.onPause, this), this.audio.on("ended", this.onEnded, this), this.audio.on("canplay", this.onCanPlay, this), this.audio.on("timeupdate", this.onTimeUpdate, this), this.audio.on("progress", this.onProgress, this), this.audio.on("error", this.onError, this), this.audio.on("seeking", this.onSeeking, this), this.audio.on("seeked", this.onSeeked, this)
            },
            unbindAudioEvents: function() {
                this.audio.off("ready", this.onReady), this.audio.off("loadstart", this.onLoadStart), this.audio.off("loadedmetadata", this.onLoadedMetadata), this.audio.off("play", this.onPlay), this.audio.off("pause", this.onPause), this.audio.off("ended", this.onEnded), this.audio.off("canplay", this.onCanPlay), this.audio.off("timeupdate", this.onTimeUpdate), this.audio.off("progress", this.onProgress), this.audio.off("error", this.onError), this.audio.off("seeking", this.onSeeking), this.audio.off("seeked", this.onSeeked)
            },
            load: function(t) {
                var e = this,
                    n = function(t) {
                        e.audio.load(t), e.trigger("load")
                    };
                this.ready ? n(t) : this.on("ready", n)
            },
            play: function() {
                if (!this.playing) return this.audio.play()
            },
            pause: function() {
                this.playing && this.audio.pause()
            },
            playPause: function() {
                this[this.playing ? "pause" : "play"]()
            },
            volume: function(t) {
                return void 0 === t || isNaN(parseInt(t, 10)) ? this.vol : (this.audio.volume(t), void(this.vol = t))
            },
            seek: function(t) {
                this.audio.seek(t), this.position = t
            },
            rate: function(t) {
                return this.audio.rate(t)
            },
            destroy: function() {
                this.unbindAudioEvents(), this.audio.destroyAudio()
            },
            onReady: function() {
                this.ready = !0, "function" == typeof this.settings.ready && this.settings.ready.call(this, this.settings.player), this.trigger("ready")
            },
            onLoadStart: function() {
                this.trigger("loadstart")
            },
            onLoadedMetadata: function() {
                this.trigger("loadedmetadata")
            },
            onPlay: function() {
                this.playing = !0, this.trigger("play")
            },
            onPause: function() {
                this.playing = !1, this.trigger("pause")
            },
            onEnded: function() {
                this.playing = !1, this.trigger("ended")
            },
            onError: function() {
                var t = new n("Audio Error. Failed to Load Audio");
                if (this.settings.throw_errors) throw t;
                this.trigger("error", t)
            },
            onCanPlay: function() {
                this.trigger("canplay")
            },
            onSeeking: function() {
                this.trigger("seeking")
            },
            onSeeked: function() {
                this.trigger("seeked")
            },
            onTimeUpdate: function(t, e) {
                this.position = this.settings.format_time ? u.formatTime(t) : t, this.duration = this.settings.format_time && null !== e ? u.formatTime(e) : e, this.trigger("timeupdate", this.position, this.duration)
            },
            onProgress: function(t) {
                this.duration = this.audio.duration, this.load_percent = t, this.trigger("progress", t)
            }
        }, a(l, s), a(l, p), l
    }),
    /**
     * @license
     * Video.js 5.19.1 <http://videojs.com/>
     * Copyright Brightcove, Inc. <https://www.brightcove.com/>
     * Available under Apache License Version 2.0
     * <https://github.com/videojs/video.js/blob/master/LICENSE>
     *
     * Includes vtt.js <https://github.com/mozilla/vtt.js>
     * Available under Apache License Version 2.0
     * <https://github.com/mozilla/vtt.js/blob/master/LICENSE>
     */
    ! function(t) {
        if ("object" == typeof exports && "undefined" != typeof module) module.exports = t();
        else if ("function" == typeof define && define.amd) define([], t);
        else {
            var e;
            e = "undefined" != typeof window ? window : "undefined" != typeof global ? global : "undefined" != typeof self ? self : this, e.videojs = t()
        }
    }(function() {
        var t;
        return function e(t, n, r) {
            function o(a, s) {
                if (!n[a]) {
                    if (!t[a]) {
                        var u = "function" == typeof require && require;
                        if (!s && u) return u(a, !0);
                        if (i) return i(a, !0);
                        var l = new Error("Cannot find module '" + a + "'");
                        throw l.code = "MODULE_NOT_FOUND", l
                    }
                    var c = n[a] = {
                        exports: {}
                    };
                    t[a][0].call(c.exports, function(e) {
                        var n = t[a][1][e];
                        return o(n ? n : e)
                    }, c, c.exports, e, t, n, r)
                }
                return n[a].exports
            }
            for (var i = "function" == typeof require && require, a = 0; a < r.length; a++) o(r[a]);
            return o
        }({
            1: [function(t, e, n) {
                "use strict";

                function r(t) {
                    return t && t.__esModule ? t : {
                        "default": t
                    }
                }

                function o(t, e) {
                    if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function")
                }

                function i(t, e) {
                    if (!t) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
                    return !e || "object" != typeof e && "function" != typeof e ? t : e
                }

                function a(t, e) {
                    if ("function" != typeof e && null !== e) throw new TypeError("Super expression must either be null or a function, not " + typeof e);
                    t.prototype = Object.create(e && e.prototype, {
                        constructor: {
                            value: t,
                            enumerable: !1,
                            writable: !0,
                            configurable: !0
                        }
                    }), e && (Object.setPrototypeOf ? Object.setPrototypeOf(t, e) : t.__proto__ = e)
                }
                n.__esModule = !0;
                var s = t(2),
                    u = r(s),
                    l = t(5),
                    c = r(l),
                    f = function(t) {
                        function e() {
                            return o(this, e), i(this, t.apply(this, arguments))
                        }
                        return a(e, t), e.prototype.buildCSSClass = function() {
                            return "vjs-big-play-button"
                        }, e.prototype.handleClick = function(t) {
                            this.player_.play();
                            var e = this.player_.getChild("controlBar"),
                                n = e && e.getChild("playToggle");
                            return n ? void this.setTimeout(function() {
                                n.focus()
                            }, 1) : void this.player_.focus()
                        }, e
                    }(u["default"]);
                f.prototype.controlText_ = "Play Video", c["default"].registerComponent("BigPlayButton", f), n["default"] = f
            }, {
                2: 2,
                5: 5
            }],
            2: [function(t, e, n) {
                "use strict";

                function r(t) {
                    return t && t.__esModule ? t : {
                        "default": t
                    }
                }

                function o(t, e) {
                    if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function")
                }

                function i(t, e) {
                    if (!t) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
                    return !e || "object" != typeof e && "function" != typeof e ? t : e
                }

                function a(t, e) {
                    if ("function" != typeof e && null !== e) throw new TypeError("Super expression must either be null or a function, not " + typeof e);
                    t.prototype = Object.create(e && e.prototype, {
                        constructor: {
                            value: t,
                            enumerable: !1,
                            writable: !0,
                            configurable: !0
                        }
                    }), e && (Object.setPrototypeOf ? Object.setPrototypeOf(t, e) : t.__proto__ = e)
                }
                n.__esModule = !0;
                var s = t(3),
                    u = r(s),
                    l = t(5),
                    c = r(l),
                    f = t(86),
                    p = r(f),
                    h = t(88),
                    d = function(t) {
                        function e() {
                            return o(this, e), i(this, t.apply(this, arguments))
                        }
                        return a(e, t), e.prototype.createEl = function() {
                            var t = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : "button",
                                e = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {},
                                n = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : {};
                            e = (0, h.assign)({
                                className: this.buildCSSClass()
                            }, e), "button" !== t && (p["default"].warn("Creating a Button with an HTML element of " + t + " is deprecated; use ClickableComponent instead."), e = (0, h.assign)({
                                tabIndex: 0
                            }, e), n = (0, h.assign)({
                                role: "button"
                            }, n)), n = (0, h.assign)({
                                type: "button",
                                "aria-live": "polite"
                            }, n);
                            var r = c["default"].prototype.createEl.call(this, t, e, n);
                            return this.createControlTextEl(r), r
                        }, e.prototype.addChild = function(t) {
                            var e = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {},
                                n = this.constructor.name;
                            return p["default"].warn("Adding an actionable (user controllable) child to a Button (" + n + ") is not supported; use a ClickableComponent instead."), c["default"].prototype.addChild.call(this, t, e)
                        }, e.prototype.enable = function() {
                            t.prototype.enable.call(this), this.el_.removeAttribute("disabled")
                        }, e.prototype.disable = function() {
                            t.prototype.disable.call(this), this.el_.setAttribute("disabled", "disabled")
                        }, e.prototype.handleKeyPress = function(e) {
                            32 !== e.which && 13 !== e.which && t.prototype.handleKeyPress.call(this, e)
                        }, e
                    }(u["default"]);
                c["default"].registerComponent("Button", d), n["default"] = d
            }, {
                3: 3,
                5: 5,
                86: 86,
                88: 88
            }],
            3: [function(t, e, n) {
                "use strict";

                function r(t) {
                    if (t && t.__esModule) return t;
                    var e = {};
                    if (null != t)
                        for (var n in t) Object.prototype.hasOwnProperty.call(t, n) && (e[n] = t[n]);
                    return e["default"] = t, e
                }

                function o(t) {
                    return t && t.__esModule ? t : {
                        "default": t
                    }
                }

                function i(t, e) {
                    if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function")
                }

                function a(t, e) {
                    if (!t) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
                    return !e || "object" != typeof e && "function" != typeof e ? t : e
                }

                function s(t, e) {
                    if ("function" != typeof e && null !== e) throw new TypeError("Super expression must either be null or a function, not " + typeof e);
                    t.prototype = Object.create(e && e.prototype, {
                        constructor: {
                            value: t,
                            enumerable: !1,
                            writable: !0,
                            configurable: !0
                        }
                    }), e && (Object.setPrototypeOf ? Object.setPrototypeOf(t, e) : t.__proto__ = e)
                }
                n.__esModule = !0;
                var u = t(5),
                    l = o(u),
                    c = t(81),
                    f = r(c),
                    p = t(82),
                    h = r(p),
                    d = t(83),
                    y = r(d),
                    v = t(86),
                    g = o(v),
                    m = t(94),
                    b = o(m),
                    _ = t(88),
                    w = function(t) {
                        function e(n, r) {
                            i(this, e);
                            var o = a(this, t.call(this, n, r));
                            return o.emitTapEvents(), o.enable(), o
                        }
                        return s(e, t), e.prototype.createEl = function() {
                            var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : "div",
                                n = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {},
                                r = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : {};
                            n = (0, _.assign)({
                                className: this.buildCSSClass(),
                                tabIndex: 0
                            }, n), "button" === e && g["default"].error("Creating a ClickableComponent with an HTML element of " + e + " is not supported; use a Button instead."), r = (0, _.assign)({
                                role: "button",
                                "aria-live": "polite"
                            }, r), this.tabIndex_ = n.tabIndex;
                            var o = t.prototype.createEl.call(this, e, n, r);
                            return this.createControlTextEl(o), o
                        }, e.prototype.createControlTextEl = function(t) {
                            return this.controlTextEl_ = f.createEl("span", {
                                className: "vjs-control-text"
                            }), t && t.appendChild(this.controlTextEl_), this.controlText(this.controlText_, t), this.controlTextEl_
                        }, e.prototype.controlText = function(t) {
                            var e = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : this.el();
                            if (!t) return this.controlText_ || "Need Text";
                            var n = this.localize(t);
                            return this.controlText_ = t, this.controlTextEl_.innerHTML = n, this.nonIconControl || e.setAttribute("title", n), this
                        }, e.prototype.buildCSSClass = function() {
                            return "vjs-control vjs-button " + t.prototype.buildCSSClass.call(this)
                        }, e.prototype.enable = function() {
                            return this.removeClass("vjs-disabled"), this.el_.setAttribute("aria-disabled", "false"), "undefined" != typeof this.tabIndex_ && this.el_.setAttribute("tabIndex", this.tabIndex_), this.on("tap", this.handleClick), this.on("click", this.handleClick), this.on("focus", this.handleFocus), this.on("blur", this.handleBlur), this
                        }, e.prototype.disable = function() {
                            return this.addClass("vjs-disabled"), this.el_.setAttribute("aria-disabled", "true"), "undefined" != typeof this.tabIndex_ && this.el_.removeAttribute("tabIndex"), this.off("tap", this.handleClick), this.off("click", this.handleClick), this.off("focus", this.handleFocus), this.off("blur", this.handleBlur), this
                        }, e.prototype.handleClick = function(t) {}, e.prototype.handleFocus = function(t) {
                            h.on(b["default"], "keydown", y.bind(this, this.handleKeyPress))
                        }, e.prototype.handleKeyPress = function(e) {
                            32 === e.which || 13 === e.which ? (e.preventDefault(), this.handleClick(e)) : t.prototype.handleKeyPress && t.prototype.handleKeyPress.call(this, e)
                        }, e.prototype.handleBlur = function(t) {
                            h.off(b["default"], "keydown", y.bind(this, this.handleKeyPress))
                        }, e
                    }(l["default"]);
                l["default"].registerComponent("ClickableComponent", w), n["default"] = w
            }, {
                5: 5,
                81: 81,
                82: 82,
                83: 83,
                86: 86,
                88: 88,
                94: 94
            }],
            4: [function(t, e, n) {
                "use strict";

                function r(t) {
                    return t && t.__esModule ? t : {
                        "default": t
                    }
                }

                function o(t, e) {
                    if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function")
                }

                function i(t, e) {
                    if (!t) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
                    return !e || "object" != typeof e && "function" != typeof e ? t : e
                }

                function a(t, e) {
                    if ("function" != typeof e && null !== e) throw new TypeError("Super expression must either be null or a function, not " + typeof e);
                    t.prototype = Object.create(e && e.prototype, {
                        constructor: {
                            value: t,
                            enumerable: !1,
                            writable: !0,
                            configurable: !0
                        }
                    }), e && (Object.setPrototypeOf ? Object.setPrototypeOf(t, e) : t.__proto__ = e)
                }
                n.__esModule = !0;
                var s = t(2),
                    u = r(s),
                    l = t(5),
                    c = r(l),
                    f = function(t) {
                        function e(n, r) {
                            o(this, e);
                            var a = i(this, t.call(this, n, r));
                            return a.controlText(r && r.controlText || a.localize("Close")), a
                        }
                        return a(e, t), e.prototype.buildCSSClass = function() {
                            return "vjs-close-button " + t.prototype.buildCSSClass.call(this)
                        }, e.prototype.handleClick = function(t) {
                            this.trigger({
                                type: "close",
                                bubbles: !1
                            })
                        }, e
                    }(u["default"]);
                c["default"].registerComponent("CloseButton", f), n["default"] = f
            }, {
                2: 2,
                5: 5
            }],
            5: [function(t, e, n) {
                "use strict";

                function r(t) {
                    if (t && t.__esModule) return t;
                    var e = {};
                    if (null != t)
                        for (var n in t) Object.prototype.hasOwnProperty.call(t, n) && (e[n] = t[n]);
                    return e["default"] = t, e
                }

                function o(t) {
                    return t && t.__esModule ? t : {
                        "default": t
                    }
                }

                function i(t, e) {
                    if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function")
                }
                n.__esModule = !0;
                var a = t(95),
                    s = o(a),
                    u = t(81),
                    l = r(u),
                    c = t(83),
                    f = r(c),
                    p = t(85),
                    h = r(p),
                    d = t(82),
                    y = r(d),
                    v = t(86),
                    g = o(v),
                    m = t(91),
                    b = o(m),
                    _ = t(87),
                    w = o(_),
                    T = function() {
                        function t(e, n, r) {
                            if (i(this, t), !e && this.play ? this.player_ = e = this : this.player_ = e, this.options_ = (0, w["default"])({}, this.options_), n = this.options_ = (0, w["default"])(this.options_, n), this.id_ = n.id || n.el && n.el.id, !this.id_) {
                                var o = e && e.id && e.id() || "no_player";
                                this.id_ = o + "_component_" + h.newGUID()
                            }
                            this.name_ = n.name || null, n.el ? this.el_ = n.el : n.createEl !== !1 && (this.el_ = this.createEl()), this.children_ = [], this.childIndex_ = {}, this.childNameIndex_ = {}, n.initChildren !== !1 && this.initChildren(), this.ready(r), n.reportTouchActivity !== !1 && this.enableTouchActivity()
                        }
                        return t.prototype.dispose = function() {
                            if (this.trigger({
                                    type: "dispose",
                                    bubbles: !1
                                }), this.children_)
                                for (var t = this.children_.length - 1; t >= 0; t--) this.children_[t].dispose && this.children_[t].dispose();
                            this.children_ = null, this.childIndex_ = null, this.childNameIndex_ = null, this.off(), this.el_.parentNode && this.el_.parentNode.removeChild(this.el_), l.removeElData(this.el_), this.el_ = null
                        }, t.prototype.player = function() {
                            return this.player_
                        }, t.prototype.options = function(t) {
                            return g["default"].warn("this.options() has been deprecated and will be moved to the constructor in 6.0"), t ? (this.options_ = (0, w["default"])(this.options_, t), this.options_) : this.options_
                        }, t.prototype.el = function() {
                            return this.el_
                        }, t.prototype.createEl = function(t, e, n) {
                            return l.createEl(t, e, n)
                        }, t.prototype.localize = function(t) {
                            var e = this.player_.language && this.player_.language(),
                                n = this.player_.languages && this.player_.languages();
                            if (!e || !n) return t;
                            var r = n[e];
                            if (r && r[t]) return r[t];
                            var o = e.split("-")[0],
                                i = n[o];
                            return i && i[t] ? i[t] : t
                        }, t.prototype.contentEl = function() {
                            return this.contentEl_ || this.el_
                        }, t.prototype.id = function() {
                            return this.id_
                        }, t.prototype.name = function() {
                            return this.name_
                        }, t.prototype.children = function() {
                            return this.children_
                        }, t.prototype.getChildById = function(t) {
                            return this.childIndex_[t]
                        }, t.prototype.getChild = function(t) {
                            if (t) return t = (0, b["default"])(t), this.childNameIndex_[t]
                        }, t.prototype.addChild = function(e) {
                            var n = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {},
                                r = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : this.children_.length,
                                o = void 0,
                                i = void 0;
                            if ("string" == typeof e) {
                                i = (0, b["default"])(e), n || (n = {}), n === !0 && (g["default"].warn("Initializing a child component with `true` is deprecated.Children should be defined in an array when possible, but if necessary use an object instead of `true`."), n = {});
                                var a = n.componentClass || i;
                                n.name = i;
                                var s = t.getComponent(a);
                                if (!s) throw new Error("Component " + a + " does not exist");
                                if ("function" != typeof s) return null;
                                o = new s(this.player_ || this, n)
                            } else o = e;
                            if (this.children_.splice(r, 0, o), "function" == typeof o.id && (this.childIndex_[o.id()] = o), i = i || o.name && (0, b["default"])(o.name()), i && (this.childNameIndex_[i] = o), "function" == typeof o.el && o.el()) {
                                var u = this.contentEl().children,
                                    l = u[r] || null;
                                this.contentEl().insertBefore(o.el(), l)
                            }
                            return o
                        }, t.prototype.removeChild = function(t) {
                            if ("string" == typeof t && (t = this.getChild(t)), t && this.children_) {
                                for (var e = !1, n = this.children_.length - 1; n >= 0; n--)
                                    if (this.children_[n] === t) {
                                        e = !0, this.children_.splice(n, 1);
                                        break
                                    } if (e) {
                                    this.childIndex_[t.id()] = null, this.childNameIndex_[t.name()] = null;
                                    var r = t.el();
                                    r && r.parentNode === this.contentEl() && this.contentEl().removeChild(t.el())
                                }
                            }
                        }, t.prototype.initChildren = function() {
                            var e = this,
                                n = this.options_.children;
                            if (n) {
                                var r = this.options_,
                                    o = function(t) {
                                        var n = t.name,
                                            o = t.opts;
                                        if (void 0 !== r[n] && (o = r[n]), o !== !1) {
                                            o === !0 && (o = {}), o.playerOptions = e.options_.playerOptions;
                                            var i = e.addChild(n, o);
                                            i && (e[n] = i)
                                        }
                                    },
                                    i = void 0,
                                    a = t.getComponent("Tech");
                                i = Array.isArray(n) ? n : Object.keys(n), i.concat(Object.keys(this.options_).filter(function(t) {
                                    return !i.some(function(e) {
                                        return "string" == typeof e ? t === e : t === e.name
                                    })
                                })).map(function(t) {
                                    var r = void 0,
                                        o = void 0;
                                    return "string" == typeof t ? (r = t, o = n[r] || e.options_[r] || {}) : (r = t.name, o = t), {
                                        name: r,
                                        opts: o
                                    }
                                }).filter(function(e) {
                                    var n = t.getComponent(e.opts.componentClass || (0, b["default"])(e.name));
                                    return n && !a.isTech(n)
                                }).forEach(o)
                            }
                        }, t.prototype.buildCSSClass = function() {
                            return ""
                        }, t.prototype.on = function(t, e, n) {
                            var r = this;
                            if ("string" == typeof t || Array.isArray(t)) y.on(this.el_, t, f.bind(this, e));
                            else {
                                var o = t,
                                    i = e,
                                    a = f.bind(this, n),
                                    s = function() {
                                        return r.off(o, i, a)
                                    };
                                s.guid = a.guid, this.on("dispose", s);
                                var u = function() {
                                    return r.off("dispose", s)
                                };
                                u.guid = a.guid, t.nodeName ? (y.on(o, i, a), y.on(o, "dispose", u)) : "function" == typeof t.on && (o.on(i, a), o.on("dispose", u))
                            }
                            return this
                        }, t.prototype.off = function(t, e, n) {
                            if (!t || "string" == typeof t || Array.isArray(t)) y.off(this.el_, t, e);
                            else {
                                var r = t,
                                    o = e,
                                    i = f.bind(this, n);
                                this.off("dispose", i), t.nodeName ? (y.off(r, o, i), y.off(r, "dispose", i)) : (r.off(o, i), r.off("dispose", i))
                            }
                            return this
                        }, t.prototype.one = function(t, e, n) {
                            var r = this,
                                o = arguments;
                            if ("string" == typeof t || Array.isArray(t)) y.one(this.el_, t, f.bind(this, e));
                            else {
                                var i = t,
                                    a = e,
                                    s = f.bind(this, n),
                                    u = function l() {
                                        r.off(i, a, l), s.apply(null, o)
                                    };
                                u.guid = s.guid, this.on(i, a, u)
                            }
                            return this
                        }, t.prototype.trigger = function(t, e) {
                            return y.trigger(this.el_, t, e), this
                        }, t.prototype.ready = function(t) {
                            var e = arguments.length > 1 && void 0 !== arguments[1] && arguments[1];
                            return t && (this.isReady_ ? e ? t.call(this) : this.setTimeout(t, 1) : (this.readyQueue_ = this.readyQueue_ || [], this.readyQueue_.push(t))), this
                        }, t.prototype.triggerReady = function() {
                            this.isReady_ = !0, this.setTimeout(function() {
                                var t = this.readyQueue_;
                                this.readyQueue_ = [], t && t.length > 0 && t.forEach(function(t) {
                                    t.call(this)
                                }, this), this.trigger("ready")
                            }, 1)
                        }, t.prototype.$ = function(t, e) {
                            return l.$(t, e || this.contentEl())
                        }, t.prototype.$$ = function(t, e) {
                            return l.$$(t, e || this.contentEl())
                        }, t.prototype.hasClass = function(t) {
                            return l.hasElClass(this.el_, t)
                        }, t.prototype.addClass = function(t) {
                            return l.addElClass(this.el_, t), this
                        }, t.prototype.removeClass = function(t) {
                            return l.removeElClass(this.el_, t), this
                        }, t.prototype.toggleClass = function(t, e) {
                            return l.toggleElClass(this.el_, t, e), this
                        }, t.prototype.show = function() {
                            return this.removeClass("vjs-hidden"), this
                        }, t.prototype.hide = function() {
                            return this.addClass("vjs-hidden"), this
                        }, t.prototype.lockShowing = function() {
                            return this.addClass("vjs-lock-showing"), this
                        }, t.prototype.unlockShowing = function() {
                            return this.removeClass("vjs-lock-showing"), this
                        }, t.prototype.getAttribute = function(t) {
                            return l.getAttribute(this.el_, t)
                        }, t.prototype.setAttribute = function(t, e) {
                            return l.setAttribute(this.el_, t, e), this
                        }, t.prototype.removeAttribute = function(t) {
                            return l.removeAttribute(this.el_, t), this
                        }, t.prototype.width = function(t, e) {
                            return this.dimension("width", t, e)
                        }, t.prototype.height = function(t, e) {
                            return this.dimension("height", t, e)
                        }, t.prototype.dimensions = function(t, e) {
                            return this.width(t, !0).height(e)
                        }, t.prototype.dimension = function(t, e, n) {
                            if (void 0 !== e) return null !== e && e === e || (e = 0), ("" + e).indexOf("%") !== -1 || ("" + e).indexOf("px") !== -1 ? this.el_.style[t] = e : this.el_.style[t] = "auto" === e ? "" : e + "px", n || this.trigger("resize"), this;
                            if (!this.el_) return 0;
                            var r = this.el_.style[t],
                                o = r.indexOf("px");
                            return o !== -1 ? parseInt(r.slice(0, o), 10) : parseInt(this.el_["offset" + (0, b["default"])(t)], 10)
                        }, t.prototype.currentDimension = function(t) {
                            var e = 0;
                            if ("width" !== t && "height" !== t) throw new Error("currentDimension only accepts width or height value");
                            if ("function" == typeof s["default"].getComputedStyle) {
                                var n = s["default"].getComputedStyle(this.el_);
                                e = n.getPropertyValue(t) || n[t]
                            }
                            if (e = parseFloat(e), 0 === e) {
                                var r = "offset" + (0, b["default"])(t);
                                e = this.el_[r]
                            }
                            return e
                        }, t.prototype.currentDimensions = function() {
                            return {
                                width: this.currentDimension("width"),
                                height: this.currentDimension("height")
                            }
                        }, t.prototype.currentWidth = function() {
                            return this.currentDimension("width")
                        }, t.prototype.currentHeight = function() {
                            return this.currentDimension("height")
                        }, t.prototype.focus = function() {
                            this.el_.focus()
                        }, t.prototype.blur = function() {
                            this.el_.blur()
                        }, t.prototype.emitTapEvents = function() {
                            var t = 0,
                                e = null,
                                n = void 0;
                            this.on("touchstart", function(r) {
                                1 === r.touches.length && (e = {
                                    pageX: r.touches[0].pageX,
                                    pageY: r.touches[0].pageY
                                }, t = (new Date).getTime(), n = !0)
                            }), this.on("touchmove", function(t) {
                                if (t.touches.length > 1) n = !1;
                                else if (e) {
                                    var r = t.touches[0].pageX - e.pageX,
                                        o = t.touches[0].pageY - e.pageY,
                                        i = Math.sqrt(r * r + o * o);
                                    i > 10 && (n = !1)
                                }
                            });
                            var r = function() {
                                n = !1
                            };
                            this.on("touchleave", r), this.on("touchcancel", r), this.on("touchend", function(r) {
                                e = null, n === !0 && (new Date).getTime() - t < 200 && (r.preventDefault(), this.trigger("tap"))
                            })
                        }, t.prototype.enableTouchActivity = function() {
                            if (this.player() && this.player().reportUserActivity) {
                                var t = f.bind(this.player(), this.player().reportUserActivity),
                                    e = void 0;
                                this.on("touchstart", function() {
                                    t(), this.clearInterval(e), e = this.setInterval(t, 250)
                                });
                                var n = function(n) {
                                    t(), this.clearInterval(e)
                                };
                                this.on("touchmove", t), this.on("touchend", n), this.on("touchcancel", n)
                            }
                        }, t.prototype.setTimeout = function(t, e) {
                            t = f.bind(this, t);
                            var n = s["default"].setTimeout(t, e),
                                r = function() {
                                    this.clearTimeout(n)
                                };
                            return r.guid = "vjs-timeout-" + n, this.on("dispose", r), n
                        }, t.prototype.clearTimeout = function(t) {
                            s["default"].clearTimeout(t);
                            var e = function() {};
                            return e.guid = "vjs-timeout-" + t, this.off("dispose", e), t
                        }, t.prototype.setInterval = function(t, e) {
                            t = f.bind(this, t);
                            var n = s["default"].setInterval(t, e),
                                r = function() {
                                    this.clearInterval(n)
                                };
                            return r.guid = "vjs-interval-" + n, this.on("dispose", r), n
                        }, t.prototype.clearInterval = function(t) {
                            s["default"].clearInterval(t);
                            var e = function() {};
                            return e.guid = "vjs-interval-" + t, this.off("dispose", e), t
                        }, t.registerComponent = function(e, n) {
                            if (e) {
                                if (e = (0, b["default"])(e), t.components_ || (t.components_ = {}), "Player" === e && t.components_[e]) {
                                    var r = t.components_[e];
                                    if (r.players && Object.keys(r.players).length > 0 && Object.keys(r.players).map(function(t) {
                                            return r.players[t]
                                        }).every(Boolean)) throw new Error("Can not register Player component after player has been created")
                                }
                                return t.components_[e] = n, n
                            }
                        }, t.getComponent = function(e) {
                            if (e) return e = (0, b["default"])(e), t.components_ && t.components_[e] ? t.components_[e] : s["default"] && s["default"].videojs && s["default"].videojs[e] ? (g["default"].warn("The " + e + " component was added to the videojs object when it should be registered using videojs.registerComponent(name, component)"), s["default"].videojs[e]) : void 0
                        }, t.extend = function(e) {
                            e = e || {}, g["default"].warn("Component.extend({}) has been deprecated,  use videojs.extend(Component, {}) instead");
                            var n = e.init || e.init || this.prototype.init || this.prototype.init || function() {},
                                r = function() {
                                    n.apply(this, arguments)
                                };
                            r.prototype = Object.create(this.prototype), r.prototype.constructor = r, r.extend = t.extend;
                            for (var o in e) e.hasOwnProperty(o) && (r.prototype[o] = e[o]);
                            return r
                        }, t
                    }();
                T.registerComponent("Component", T), n["default"] = T
            }, {
                81: 81,
                82: 82,
                83: 83,
                85: 85,
                86: 86,
                87: 87,
                91: 91,
                95: 95
            }],
            6: [function(t, e, n) {
                "use strict";

                function r(t) {
                    return t && t.__esModule ? t : {
                        "default": t
                    }
                }

                function o(t, e) {
                    if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function")
                }

                function i(t, e) {
                    if (!t) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
                    return !e || "object" != typeof e && "function" != typeof e ? t : e
                }

                function a(t, e) {
                    if ("function" != typeof e && null !== e) throw new TypeError("Super expression must either be null or a function, not " + typeof e);
                    t.prototype = Object.create(e && e.prototype, {
                        constructor: {
                            value: t,
                            enumerable: !1,
                            writable: !0,
                            configurable: !0
                        }
                    }), e && (Object.setPrototypeOf ? Object.setPrototypeOf(t, e) : t.__proto__ = e)
                }
                n.__esModule = !0;
                var s = t(36),
                    u = r(s),
                    l = t(5),
                    c = r(l),
                    f = t(7),
                    p = r(f),
                    h = function(t) {
                        function e(n) {
                            var r = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {};
                            o(this, e), r.tracks = n.audioTracks && n.audioTracks();
                            var a = i(this, t.call(this, n, r));
                            return a.el_.setAttribute("aria-label", "Audio Menu"), a
                        }
                        return a(e, t), e.prototype.buildCSSClass = function() {
                            return "vjs-audio-button " + t.prototype.buildCSSClass.call(this)
                        }, e.prototype.createItems = function() {
                            var t = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : [];
                            this.hideThreshold_ = 1;
                            var e = this.player_.audioTracks && this.player_.audioTracks();
                            if (!e) return t;
                            for (var n = 0; n < e.length; n++) {
                                var r = e[n];
                                t.push(new p["default"](this.player_, {
                                    track: r,
                                    selectable: !0
                                }))
                            }
                            return t
                        }, e
                    }(u["default"]);
                h.prototype.controlText_ = "Audio Track", c["default"].registerComponent("AudioTrackButton", h), n["default"] = h
            }, {
                36: 36,
                5: 5,
                7: 7
            }],
            7: [function(t, e, n) {
                "use strict";

                function r(t) {
                    if (t && t.__esModule) return t;
                    var e = {};
                    if (null != t)
                        for (var n in t) Object.prototype.hasOwnProperty.call(t, n) && (e[n] = t[n]);
                    return e["default"] = t, e
                }

                function o(t) {
                    return t && t.__esModule ? t : {
                        "default": t
                    }
                }

                function i(t, e) {
                    if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function")
                }

                function a(t, e) {
                    if (!t) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
                    return !e || "object" != typeof e && "function" != typeof e ? t : e
                }

                function s(t, e) {
                    if ("function" != typeof e && null !== e) throw new TypeError("Super expression must either be null or a function, not " + typeof e);
                    t.prototype = Object.create(e && e.prototype, {
                        constructor: {
                            value: t,
                            enumerable: !1,
                            writable: !0,
                            configurable: !0
                        }
                    }), e && (Object.setPrototypeOf ? Object.setPrototypeOf(t, e) : t.__proto__ = e)
                }
                n.__esModule = !0;
                var u = t(48),
                    l = o(u),
                    c = t(5),
                    f = o(c),
                    p = t(83),
                    h = r(p),
                    d = function(t) {
                        function e(n, r) {
                            i(this, e);
                            var o = r.track,
                                s = n.audioTracks();
                            r.label = o.label || o.language || "Unknown", r.selected = o.enabled;
                            var u = a(this, t.call(this, n, r));
                            if (u.track = o, s) {
                                var l = h.bind(u, u.handleTracksChange);
                                s.addEventListener("change", l), u.on("dispose", function() {
                                    s.removeEventListener("change", l)
                                })
                            }
                            return u
                        }
                        return s(e, t), e.prototype.handleClick = function(e) {
                            var n = this.player_.audioTracks();
                            if (t.prototype.handleClick.call(this, e), n)
                                for (var r = 0; r < n.length; r++) {
                                    var o = n[r];
                                    o.enabled = o === this.track
                                }
                        }, e.prototype.handleTracksChange = function(t) {
                            this.selected(this.track.enabled)
                        }, e
                    }(l["default"]);
                f["default"].registerComponent("AudioTrackMenuItem", d), n["default"] = d
            }, {
                48: 48,
                5: 5,
                83: 83
            }],
            8: [function(t, e, n) {
                "use strict";

                function r(t) {
                    return t && t.__esModule ? t : {
                        "default": t
                    }
                }

                function o(t, e) {
                    if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function")
                }

                function i(t, e) {
                    if (!t) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
                    return !e || "object" != typeof e && "function" != typeof e ? t : e
                }

                function a(t, e) {
                    if ("function" != typeof e && null !== e) throw new TypeError("Super expression must either be null or a function, not " + typeof e);
                    t.prototype = Object.create(e && e.prototype, {
                        constructor: {
                            value: t,
                            enumerable: !1,
                            writable: !0,
                            configurable: !0
                        }
                    }), e && (Object.setPrototypeOf ? Object.setPrototypeOf(t, e) : t.__proto__ = e)
                }
                n.__esModule = !0;
                var s = t(5),
                    u = r(s);
                t(12), t(32), t(33), t(35), t(34), t(10), t(18), t(9), t(38), t(40), t(11), t(25), t(27), t(29), t(24), t(6), t(13), t(21);
                var l = function(t) {
                    function e() {
                        return o(this, e), i(this, t.apply(this, arguments))
                    }
                    return a(e, t), e.prototype.createEl = function() {
                        return t.prototype.createEl.call(this, "div", {
                            className: "vjs-control-bar",
                            dir: "ltr"
                        }, {
                            role: "group"
                        })
                    }, e
                }(u["default"]);
                l.prototype.options_ = {
                    children: ["playToggle", "volumeMenuButton", "currentTimeDisplay", "timeDivider", "durationDisplay", "progressControl", "liveDisplay", "remainingTimeDisplay", "customControlSpacer", "playbackRateMenuButton", "chaptersButton", "descriptionsButton", "subtitlesButton", "captionsButton", "audioTrackButton", "fullscreenToggle"]
                }, u["default"].registerComponent("ControlBar", l), n["default"] = l
            }, {
                10: 10,
                11: 11,
                12: 12,
                13: 13,
                18: 18,
                21: 21,
                24: 24,
                25: 25,
                27: 27,
                29: 29,
                32: 32,
                33: 33,
                34: 34,
                35: 35,
                38: 38,
                40: 40,
                5: 5,
                6: 6,
                9: 9
            }],
            9: [function(t, e, n) {
                "use strict";

                function r(t) {
                    return t && t.__esModule ? t : {
                        "default": t
                    }
                }

                function o(t, e) {
                    if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function")
                }

                function i(t, e) {
                    if (!t) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
                    return !e || "object" != typeof e && "function" != typeof e ? t : e
                }

                function a(t, e) {
                    if ("function" != typeof e && null !== e) throw new TypeError("Super expression must either be null or a function, not " + typeof e);
                    t.prototype = Object.create(e && e.prototype, {
                        constructor: {
                            value: t,
                            enumerable: !1,
                            writable: !0,
                            configurable: !0
                        }
                    }), e && (Object.setPrototypeOf ? Object.setPrototypeOf(t, e) : t.__proto__ = e)
                }
                n.__esModule = !0;
                var s = t(2),
                    u = r(s),
                    l = t(5),
                    c = r(l),
                    f = function(t) {
                        function e(n, r) {
                            o(this, e);
                            var a = i(this, t.call(this, n, r));
                            return a.on(n, "fullscreenchange", a.handleFullscreenChange), a
                        }
                        return a(e, t), e.prototype.buildCSSClass = function() {
                            return "vjs-fullscreen-control " + t.prototype.buildCSSClass.call(this)
                        }, e.prototype.handleFullscreenChange = function(t) {
                            this.player_.isFullscreen() ? this.controlText("Non-Fullscreen") : this.controlText("Fullscreen")
                        }, e.prototype.handleClick = function(t) {
                            this.player_.isFullscreen() ? this.player_.exitFullscreen() : this.player_.requestFullscreen()
                        }, e
                    }(u["default"]);
                f.prototype.controlText_ = "Fullscreen", c["default"].registerComponent("FullscreenToggle", f), n["default"] = f
            }, {
                2: 2,
                5: 5
            }],
            10: [function(t, e, n) {
                "use strict";

                function r(t) {
                    if (t && t.__esModule) return t;
                    var e = {};
                    if (null != t)
                        for (var n in t) Object.prototype.hasOwnProperty.call(t, n) && (e[n] = t[n]);
                    return e["default"] = t, e
                }

                function o(t) {
                    return t && t.__esModule ? t : {
                        "default": t
                    }
                }

                function i(t, e) {
                    if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function")
                }

                function a(t, e) {
                    if (!t) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
                    return !e || "object" != typeof e && "function" != typeof e ? t : e
                }

                function s(t, e) {
                    if ("function" != typeof e && null !== e) throw new TypeError("Super expression must either be null or a function, not " + typeof e);
                    t.prototype = Object.create(e && e.prototype, {
                        constructor: {
                            value: t,
                            enumerable: !1,
                            writable: !0,
                            configurable: !0
                        }
                    }), e && (Object.setPrototypeOf ? Object.setPrototypeOf(t, e) : t.__proto__ = e)
                }
                n.__esModule = !0;
                var u = t(5),
                    l = o(u),
                    c = t(81),
                    f = r(c),
                    p = function(t) {
                        function e(n, r) {
                            i(this, e);
                            var o = a(this, t.call(this, n, r));
                            return o.updateShowing(), o.on(o.player(), "durationchange", o.updateShowing), o
                        }
                        return s(e, t), e.prototype.createEl = function() {
                            var e = t.prototype.createEl.call(this, "div", {
                                className: "vjs-live-control vjs-control"
                            });
                            return this.contentEl_ = f.createEl("div", {
                                className: "vjs-live-display",
                                innerHTML: '<span class="vjs-control-text">' + this.localize("Stream Type") + "</span>" + this.localize("LIVE")
                            }, {
                                "aria-live": "off"
                            }), e.appendChild(this.contentEl_), e
                        }, e.prototype.updateShowing = function(t) {
                            this.player().duration() === 1 / 0 ? this.show() : this.hide()
                        }, e
                    }(l["default"]);
                l["default"].registerComponent("LiveDisplay", p), n["default"] = p
            }, {
                5: 5,
                81: 81
            }],
            11: [function(t, e, n) {
                "use strict";

                function r(t) {
                    if (t && t.__esModule) return t;
                    var e = {};
                    if (null != t)
                        for (var n in t) Object.prototype.hasOwnProperty.call(t, n) && (e[n] = t[n]);
                    return e["default"] = t, e
                }

                function o(t) {
                    return t && t.__esModule ? t : {
                        "default": t
                    }
                }

                function i(t, e) {
                    if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function")
                }

                function a(t, e) {
                    if (!t) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
                    return !e || "object" != typeof e && "function" != typeof e ? t : e
                }

                function s(t, e) {
                    if ("function" != typeof e && null !== e) throw new TypeError("Super expression must either be null or a function, not " + typeof e);
                    t.prototype = Object.create(e && e.prototype, {
                        constructor: {
                            value: t,
                            enumerable: !1,
                            writable: !0,
                            configurable: !0
                        }
                    }), e && (Object.setPrototypeOf ? Object.setPrototypeOf(t, e) : t.__proto__ = e)
                }
                n.__esModule = !0;
                var u = t(2),
                    l = o(u),
                    c = t(5),
                    f = o(c),
                    p = t(81),
                    h = r(p),
                    d = function(t) {
                        function e(n, r) {
                            i(this, e);
                            var o = a(this, t.call(this, n, r));
                            return o.on(n, "volumechange", o.update), n.tech_ && n.tech_.featuresVolumeControl === !1 && o.addClass("vjs-hidden"), o.on(n, "loadstart", function() {
                                this.update(), n.tech_.featuresVolumeControl === !1 ? this.addClass("vjs-hidden") : this.removeClass("vjs-hidden")
                            }), o
                        }
                        return s(e, t), e.prototype.buildCSSClass = function() {
                            return "vjs-mute-control " + t.prototype.buildCSSClass.call(this)
                        }, e.prototype.handleClick = function(t) {
                            this.player_.muted(!this.player_.muted())
                        }, e.prototype.update = function(t) {
                            var e = this.player_.volume(),
                                n = 3;
                            0 === e || this.player_.muted() ? n = 0 : e < .33 ? n = 1 : e < .67 && (n = 2);
                            var r = this.player_.muted() ? "Unmute" : "Mute";
                            this.controlText() !== r && this.controlText(r);
                            for (var o = 0; o < 4; o++) h.removeElClass(this.el_, "vjs-vol-" + o);
                            h.addElClass(this.el_, "vjs-vol-" + n)
                        }, e
                    }(l["default"]);
                d.prototype.controlText_ = "Mute", f["default"].registerComponent("MuteToggle", d), n["default"] = d
            }, {
                2: 2,
                5: 5,
                81: 81
            }],
            12: [function(t, e, n) {
                "use strict";

                function r(t) {
                    return t && t.__esModule ? t : {
                        "default": t
                    }
                }

                function o(t, e) {
                    if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function")
                }

                function i(t, e) {
                    if (!t) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
                    return !e || "object" != typeof e && "function" != typeof e ? t : e
                }

                function a(t, e) {
                    if ("function" != typeof e && null !== e) throw new TypeError("Super expression must either be null or a function, not " + typeof e);
                    t.prototype = Object.create(e && e.prototype, {
                        constructor: {
                            value: t,
                            enumerable: !1,
                            writable: !0,
                            configurable: !0
                        }
                    }), e && (Object.setPrototypeOf ? Object.setPrototypeOf(t, e) : t.__proto__ = e)
                }
                n.__esModule = !0;
                var s = t(2),
                    u = r(s),
                    l = t(5),
                    c = r(l),
                    f = function(t) {
                        function e(n, r) {
                            o(this, e);
                            var a = i(this, t.call(this, n, r));
                            return a.on(n, "play", a.handlePlay), a.on(n, "pause", a.handlePause), a
                        }
                        return a(e, t), e.prototype.buildCSSClass = function() {
                            return "vjs-play-control " + t.prototype.buildCSSClass.call(this)
                        }, e.prototype.handleClick = function(t) {
                            this.player_.paused() ? this.player_.play() : this.player_.pause()
                        }, e.prototype.handlePlay = function(t) {
                            this.removeClass("vjs-paused"), this.addClass("vjs-playing"), this.controlText("Pause")
                        }, e.prototype.handlePause = function(t) {
                            this.removeClass("vjs-playing"), this.addClass("vjs-paused"), this.controlText("Play")
                        }, e
                    }(u["default"]);
                f.prototype.controlText_ = "Play", c["default"].registerComponent("PlayToggle", f), n["default"] = f
            }, {
                2: 2,
                5: 5
            }],
            13: [function(t, e, n) {
                "use strict";

                function r(t) {
                    if (t && t.__esModule) return t;
                    var e = {};
                    if (null != t)
                        for (var n in t) Object.prototype.hasOwnProperty.call(t, n) && (e[n] = t[n]);
                    return e["default"] = t, e
                }

                function o(t) {
                    return t && t.__esModule ? t : {
                        "default": t
                    }
                }

                function i(t, e) {
                    if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function")
                }

                function a(t, e) {
                    if (!t) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
                    return !e || "object" != typeof e && "function" != typeof e ? t : e
                }

                function s(t, e) {
                    if ("function" != typeof e && null !== e) throw new TypeError("Super expression must either be null or a function, not " + typeof e);
                    t.prototype = Object.create(e && e.prototype, {
                        constructor: {
                            value: t,
                            enumerable: !1,
                            writable: !0,
                            configurable: !0
                        }
                    }), e && (Object.setPrototypeOf ? Object.setPrototypeOf(t, e) : t.__proto__ = e)
                }
                n.__esModule = !0;
                var u = t(47),
                    l = o(u),
                    c = t(49),
                    f = o(c),
                    p = t(14),
                    h = o(p),
                    d = t(5),
                    y = o(d),
                    v = t(81),
                    g = r(v),
                    m = function(t) {
                        function e(n, r) {
                            i(this, e);
                            var o = a(this, t.call(this, n, r));
                            return o.updateVisibility(), o.updateLabel(), o.on(n, "loadstart", o.updateVisibility), o.on(n, "ratechange", o.updateLabel), o
                        }
                        return s(e, t), e.prototype.createEl = function() {
                            var e = t.prototype.createEl.call(this);
                            return this.labelEl_ = g.createEl("div", {
                                className: "vjs-playback-rate-value",
                                innerHTML: 1
                            }), e.appendChild(this.labelEl_), e
                        }, e.prototype.buildCSSClass = function() {
                            return "vjs-playback-rate " + t.prototype.buildCSSClass.call(this)
                        }, e.prototype.createMenu = function() {
                            var t = new f["default"](this.player()),
                                e = this.playbackRates();
                            if (e)
                                for (var n = e.length - 1; n >= 0; n--) t.addChild(new h["default"](this.player(), {
                                    rate: e[n] + "x"
                                }));
                            return t
                        }, e.prototype.updateARIAAttributes = function() {
                            this.el().setAttribute("aria-valuenow", this.player().playbackRate())
                        }, e.prototype.handleClick = function(t) {
                            for (var e = this.player().playbackRate(), n = this.playbackRates(), r = n[0], o = 0; o < n.length; o++)
                                if (n[o] > e) {
                                    r = n[o];
                                    break
                                } this.player().playbackRate(r)
                        }, e.prototype.playbackRates = function() {
                            return this.options_.playbackRates || this.options_.playerOptions && this.options_.playerOptions.playbackRates
                        }, e.prototype.playbackRateSupported = function() {
                            return this.player().tech_ && this.player().tech_.featuresPlaybackRate && this.playbackRates() && this.playbackRates().length > 0
                        }, e.prototype.updateVisibility = function(t) {
                            this.playbackRateSupported() ? this.removeClass("vjs-hidden") : this.addClass("vjs-hidden")
                        }, e.prototype.updateLabel = function(t) {
                            this.playbackRateSupported() && (this.labelEl_.innerHTML = this.player().playbackRate() + "x")
                        }, e
                    }(l["default"]);
                m.prototype.controlText_ = "Playback Rate", y["default"].registerComponent("PlaybackRateMenuButton", m), n["default"] = m
            }, {
                14: 14,
                47: 47,
                49: 49,
                5: 5,
                81: 81
            }],
            14: [function(t, e, n) {
                "use strict";

                function r(t) {
                    return t && t.__esModule ? t : {
                        "default": t
                    }
                }

                function o(t, e) {
                    if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function")
                }

                function i(t, e) {
                    if (!t) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
                    return !e || "object" != typeof e && "function" != typeof e ? t : e
                }

                function a(t, e) {
                    if ("function" != typeof e && null !== e) throw new TypeError("Super expression must either be null or a function, not " + typeof e);
                    t.prototype = Object.create(e && e.prototype, {
                        constructor: {
                            value: t,
                            enumerable: !1,
                            writable: !0,
                            configurable: !0
                        }
                    }), e && (Object.setPrototypeOf ? Object.setPrototypeOf(t, e) : t.__proto__ = e)
                }
                n.__esModule = !0;
                var s = t(48),
                    u = r(s),
                    l = t(5),
                    c = r(l),
                    f = function(t) {
                        function e(n, r) {
                            o(this, e);
                            var a = r.rate,
                                s = parseFloat(a, 10);
                            r.label = a, r.selected = 1 === s, r.selectable = !0;
                            var u = i(this, t.call(this, n, r));
                            return u.label = a, u.rate = s, u.on(n, "ratechange", u.update), u
                        }
                        return a(e, t), e.prototype.handleClick = function(e) {
                            t.prototype.handleClick.call(this), this.player().playbackRate(this.rate)
                        }, e.prototype.update = function(t) {
                            this.selected(this.player().playbackRate() === this.rate)
                        }, e
                    }(u["default"]);
                f.prototype.contentElType = "button", c["default"].registerComponent("PlaybackRateMenuItem", f), n["default"] = f
            }, {
                48: 48,
                5: 5
            }],
            15: [function(t, e, n) {
                "use strict";

                function r(t) {
                    if (t && t.__esModule) return t;
                    var e = {};
                    if (null != t)
                        for (var n in t) Object.prototype.hasOwnProperty.call(t, n) && (e[n] = t[n]);
                    return e["default"] = t, e
                }

                function o(t) {
                    return t && t.__esModule ? t : {
                        "default": t
                    }
                }

                function i(t, e) {
                    if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function")
                }

                function a(t, e) {
                    if (!t) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
                    return !e || "object" != typeof e && "function" != typeof e ? t : e
                }

                function s(t, e) {
                    if ("function" != typeof e && null !== e) throw new TypeError("Super expression must either be null or a function, not " + typeof e);
                    t.prototype = Object.create(e && e.prototype, {
                        constructor: {
                            value: t,
                            enumerable: !1,
                            writable: !0,
                            configurable: !0
                        }
                    }), e && (Object.setPrototypeOf ? Object.setPrototypeOf(t, e) : t.__proto__ = e)
                }
                n.__esModule = !0;
                var u = t(5),
                    l = o(u),
                    c = t(81),
                    f = r(c),
                    p = function(t) {
                        function e(n, r) {
                            i(this, e);
                            var o = a(this, t.call(this, n, r));
                            return o.partEls_ = [], o.on(n, "progress", o.update), o
                        }
                        return s(e, t), e.prototype.createEl = function() {
                            return t.prototype.createEl.call(this, "div", {
                                className: "vjs-load-progress",
                                innerHTML: '<span class="vjs-control-text"><span>' + this.localize("Loaded") + "</span>: 0%</span>"
                            })
                        }, e.prototype.update = function(t) {
                            var e = this.player_.buffered(),
                                n = this.player_.duration(),
                                r = this.player_.bufferedEnd(),
                                o = this.partEls_,
                                i = function(t, e) {
                                    var n = t / e || 0;
                                    return 100 * (n >= 1 ? 1 : n) + "%"
                                };
                            this.el_.style.width = i(r, n);
                            for (var a = 0; a < e.length; a++) {
                                var s = e.start(a),
                                    u = e.end(a),
                                    l = o[a];
                                l || (l = this.el_.appendChild(f.createEl()), o[a] = l), l.style.left = i(s, r), l.style.width = i(u - s, r)
                            }
                            for (var c = o.length; c > e.length; c--) this.el_.removeChild(o[c - 1]);
                            o.length = e.length
                        }, e
                    }(l["default"]);
                l["default"].registerComponent("LoadProgressBar", p), n["default"] = p
            }, {
                5: 5,
                81: 81
            }],
            16: [function(t, e, n) {
                "use strict";

                function r(t) {
                    if (t && t.__esModule) return t;
                    var e = {};
                    if (null != t)
                        for (var n in t) Object.prototype.hasOwnProperty.call(t, n) && (e[n] = t[n]);
                    return e["default"] = t, e
                }

                function o(t) {
                    return t && t.__esModule ? t : {
                        "default": t
                    }
                }

                function i(t, e) {
                    if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function")
                }

                function a(t, e) {
                    if (!t) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
                    return !e || "object" != typeof e && "function" != typeof e ? t : e
                }

                function s(t, e) {
                    if ("function" != typeof e && null !== e) throw new TypeError("Super expression must either be null or a function, not " + typeof e);
                    t.prototype = Object.create(e && e.prototype, {
                        constructor: {
                            value: t,
                            enumerable: !1,
                            writable: !0,
                            configurable: !0
                        }
                    }), e && (Object.setPrototypeOf ? Object.setPrototypeOf(t, e) : t.__proto__ = e)
                }
                n.__esModule = !0;
                var u = t(5),
                    l = o(u),
                    c = t(81),
                    f = r(c),
                    p = t(83),
                    h = r(p),
                    d = t(84),
                    y = o(d),
                    v = t(80),
                    g = o(v),
                    m = function(t) {
                        function e(n, r) {
                            i(this, e);
                            var o = a(this, t.call(this, n, r));
                            return r.playerOptions && r.playerOptions.controlBar && r.playerOptions.controlBar.progressControl && r.playerOptions.controlBar.progressControl.keepTooltipsInside && (o.keepTooltipsInside = r.playerOptions.controlBar.progressControl.keepTooltipsInside), o.keepTooltipsInside && (o.tooltip = f.createEl("div", {
                                className: "vjs-time-tooltip"
                            }), o.el().appendChild(o.tooltip), o.addClass("vjs-keep-tooltips-inside")), o.update(0, 0), n.on("ready", function() {
                                o.on(n.controlBar.progressControl.el(), "mousemove", h.throttle(h.bind(o, o.handleMouseMove), 25))
                            }), o
                        }
                        return s(e, t), e.prototype.createEl = function() {
                            return t.prototype.createEl.call(this, "div", {
                                className: "vjs-mouse-display"
                            })
                        }, e.prototype.handleMouseMove = function(t) {
                            var e = this.player_.duration(),
                                n = this.calculateDistance(t) * e,
                                r = t.pageX - f.findElPosition(this.el().parentNode).left;
                            this.update(n, r)
                        }, e.prototype.update = function(t, e) {
                            var n = (0, y["default"])(t, this.player_.duration());
                            if (this.el().style.left = e + "px", this.el().setAttribute("data-current-time", n), this.keepTooltipsInside) {
                                var r = this.clampPosition_(e),
                                    o = e - r + 1,
                                    i = parseFloat((0, g["default"])(this.tooltip, "width")),
                                    a = i / 2;
                                this.tooltip.innerHTML = n, this.tooltip.style.right = "-" + (a - o) + "px"
                            }
                        }, e.prototype.calculateDistance = function(t) {
                            return f.getPointerPosition(this.el().parentNode, t).x
                        }, e.prototype.clampPosition_ = function(t) {
                            if (!this.keepTooltipsInside) return t;
                            var e = parseFloat((0, g["default"])(this.player().el(), "width")),
                                n = parseFloat((0, g["default"])(this.tooltip, "width")),
                                r = n / 2,
                                o = t;
                            return t < r ? o = Math.ceil(r) : t > e - r && (o = Math.floor(e - r)), o
                        }, e
                    }(l["default"]);
                l["default"].registerComponent("MouseTimeDisplay", m), n["default"] = m
            }, {
                5: 5,
                80: 80,
                81: 81,
                83: 83,
                84: 84
            }],
            17: [function(t, e, n) {
                "use strict";

                function r(t) {
                    if (t && t.__esModule) return t;
                    var e = {};
                    if (null != t)
                        for (var n in t) Object.prototype.hasOwnProperty.call(t, n) && (e[n] = t[n]);
                    return e["default"] = t, e
                }

                function o(t) {
                    return t && t.__esModule ? t : {
                        "default": t
                    }
                }

                function i(t, e) {
                    if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function")
                }

                function a(t, e) {
                    if (!t) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
                    return !e || "object" != typeof e && "function" != typeof e ? t : e
                }

                function s(t, e) {
                    if ("function" != typeof e && null !== e) throw new TypeError("Super expression must either be null or a function, not " + typeof e);
                    t.prototype = Object.create(e && e.prototype, {
                        constructor: {
                            value: t,
                            enumerable: !1,
                            writable: !0,
                            configurable: !0
                        }
                    }), e && (Object.setPrototypeOf ? Object.setPrototypeOf(t, e) : t.__proto__ = e)
                }
                n.__esModule = !0;
                var u = t(5),
                    l = o(u),
                    c = t(83),
                    f = r(c),
                    p = t(84),
                    h = o(p),
                    d = function(t) {
                        function e(n, r) {
                            i(this, e);
                            var o = a(this, t.call(this, n, r));
                            return o.updateDataAttr(), o.on(n, "timeupdate", o.updateDataAttr), n.ready(f.bind(o, o.updateDataAttr)), r.playerOptions && r.playerOptions.controlBar && r.playerOptions.controlBar.progressControl && r.playerOptions.controlBar.progressControl.keepTooltipsInside && (o.keepTooltipsInside = r.playerOptions.controlBar.progressControl.keepTooltipsInside), o.keepTooltipsInside && o.addClass("vjs-keep-tooltips-inside"), o
                        }
                        return s(e, t), e.prototype.createEl = function() {
                            return t.prototype.createEl.call(this, "div", {
                                className: "vjs-play-progress vjs-slider-bar",
                                innerHTML: '<span class="vjs-control-text"><span>' + this.localize("Progress") + "</span>: 0%</span>"
                            })
                        }, e.prototype.updateDataAttr = function(t) {
                            var e = this.player_.scrubbing() ? this.player_.getCache().currentTime : this.player_.currentTime();
                            this.el_.setAttribute("data-current-time", (0, h["default"])(e, this.player_.duration()))
                        }, e
                    }(l["default"]);
                l["default"].registerComponent("PlayProgressBar", d), n["default"] = d
            }, {
                5: 5,
                83: 83,
                84: 84
            }],
            18: [function(t, e, n) {
                "use strict";

                function r(t) {
                    return t && t.__esModule ? t : {
                        "default": t
                    }
                }

                function o(t, e) {
                    if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function")
                }

                function i(t, e) {
                    if (!t) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
                    return !e || "object" != typeof e && "function" != typeof e ? t : e
                }

                function a(t, e) {
                    if ("function" != typeof e && null !== e) throw new TypeError("Super expression must either be null or a function, not " + typeof e);
                    t.prototype = Object.create(e && e.prototype, {
                        constructor: {
                            value: t,
                            enumerable: !1,
                            writable: !0,
                            configurable: !0
                        }
                    }), e && (Object.setPrototypeOf ? Object.setPrototypeOf(t, e) : t.__proto__ = e)
                }
                n.__esModule = !0;
                var s = t(5),
                    u = r(s);
                t(19), t(16);
                var l = function(t) {
                    function e() {
                        return o(this, e), i(this, t.apply(this, arguments))
                    }
                    return a(e, t), e.prototype.createEl = function() {
                        return t.prototype.createEl.call(this, "div", {
                            className: "vjs-progress-control vjs-control"
                        })
                    }, e
                }(u["default"]);
                l.prototype.options_ = {
                    children: ["seekBar"]
                }, u["default"].registerComponent("ProgressControl", l), n["default"] = l
            }, {
                16: 16,
                19: 19,
                5: 5
            }],
            19: [function(t, e, n) {
                "use strict";

                function r(t) {
                    if (t && t.__esModule) return t;
                    var e = {};
                    if (null != t)
                        for (var n in t) Object.prototype.hasOwnProperty.call(t, n) && (e[n] = t[n]);
                    return e["default"] = t, e
                }

                function o(t) {
                    return t && t.__esModule ? t : {
                        "default": t
                    }
                }

                function i(t, e) {
                    if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function")
                }

                function a(t, e) {
                    if (!t) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
                    return !e || "object" != typeof e && "function" != typeof e ? t : e
                }

                function s(t, e) {
                    if ("function" != typeof e && null !== e) throw new TypeError("Super expression must either be null or a function, not " + typeof e);
                    t.prototype = Object.create(e && e.prototype, {
                        constructor: {
                            value: t,
                            enumerable: !1,
                            writable: !0,
                            configurable: !0
                        }
                    }), e && (Object.setPrototypeOf ? Object.setPrototypeOf(t, e) : t.__proto__ = e)
                }
                n.__esModule = !0;
                var u = t(57),
                    l = o(u),
                    c = t(5),
                    f = o(c),
                    p = t(83),
                    h = r(p),
                    d = t(84),
                    y = o(d),
                    v = t(80),
                    g = o(v);
                t(15), t(17), t(20);
                var m = function(t) {
                    function e(n, r) {
                        i(this, e);
                        var o = a(this, t.call(this, n, r));
                        return o.on(n, "timeupdate", o.updateProgress), o.on(n, "ended", o.updateProgress), n.ready(h.bind(o, o.updateProgress)), r.playerOptions && r.playerOptions.controlBar && r.playerOptions.controlBar.progressControl && r.playerOptions.controlBar.progressControl.keepTooltipsInside && (o.keepTooltipsInside = r.playerOptions.controlBar.progressControl.keepTooltipsInside), o.keepTooltipsInside && (o.tooltipProgressBar = o.addChild("TooltipProgressBar")), o
                    }
                    return s(e, t), e.prototype.createEl = function() {
                        return t.prototype.createEl.call(this, "div", {
                            className: "vjs-progress-holder"
                        }, {
                            "aria-label": "progress bar"
                        })
                    }, e.prototype.updateProgress = function(t) {
                        if (this.updateAriaAttributes(this.el_), this.keepTooltipsInside) {
                            this.updateAriaAttributes(this.tooltipProgressBar.el_), this.tooltipProgressBar.el_.style.width = this.bar.el_.style.width;
                            var e = parseFloat((0, g["default"])(this.player().el(), "width")),
                                n = parseFloat((0, g["default"])(this.tooltipProgressBar.tooltip, "width")),
                                r = this.tooltipProgressBar.el().style;
                            r.maxWidth = Math.floor(e - n / 2) + "px", r.minWidth = Math.ceil(n / 2) + "px", r.right = "-" + n / 2 + "px"
                        }
                    }, e.prototype.updateAriaAttributes = function(t) {
                        var e = this.player_.scrubbing() ? this.player_.getCache().currentTime : this.player_.currentTime();
                        t.setAttribute("aria-valuenow", (100 * this.getPercent()).toFixed(2)), t.setAttribute("aria-valuetext", (0, y["default"])(e, this.player_.duration()))
                    }, e.prototype.getPercent = function() {
                        var t = this.player_.currentTime() / this.player_.duration();
                        return t >= 1 ? 1 : t
                    }, e.prototype.handleMouseDown = function(e) {
                        this.player_.scrubbing(!0), this.videoWasPlaying = !this.player_.paused(), this.player_.pause(), t.prototype.handleMouseDown.call(this, e)
                    }, e.prototype.handleMouseMove = function(t) {
                        var e = this.calculateDistance(t) * this.player_.duration();
                        e === this.player_.duration() && (e -= .1), this.player_.currentTime(e)
                    }, e.prototype.handleMouseUp = function(e) {
                        t.prototype.handleMouseUp.call(this, e), this.player_.scrubbing(!1), this.videoWasPlaying && this.player_.play()
                    }, e.prototype.stepForward = function() {
                        this.player_.currentTime(this.player_.currentTime() + 5)
                    }, e.prototype.stepBack = function() {
                        this.player_.currentTime(this.player_.currentTime() - 5)
                    }, e
                }(l["default"]);
                m.prototype.options_ = {
                    children: ["loadProgressBar", "mouseTimeDisplay", "playProgressBar"],
                    barName: "playProgressBar"
                }, m.prototype.playerEvent = "timeupdate", f["default"].registerComponent("SeekBar", m), n["default"] = m
            }, {
                15: 15,
                17: 17,
                20: 20,
                5: 5,
                57: 57,
                80: 80,
                83: 83,
                84: 84
            }],
            20: [function(t, e, n) {
                "use strict";

                function r(t) {
                    if (t && t.__esModule) return t;
                    var e = {};
                    if (null != t)
                        for (var n in t) Object.prototype.hasOwnProperty.call(t, n) && (e[n] = t[n]);
                    return e["default"] = t, e
                }

                function o(t) {
                    return t && t.__esModule ? t : {
                        "default": t
                    }
                }

                function i(t, e) {
                    if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function")
                }

                function a(t, e) {
                    if (!t) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
                    return !e || "object" != typeof e && "function" != typeof e ? t : e
                }

                function s(t, e) {
                    if ("function" != typeof e && null !== e) throw new TypeError("Super expression must either be null or a function, not " + typeof e);
                    t.prototype = Object.create(e && e.prototype, {
                        constructor: {
                            value: t,
                            enumerable: !1,
                            writable: !0,
                            configurable: !0
                        }
                    }), e && (Object.setPrototypeOf ? Object.setPrototypeOf(t, e) : t.__proto__ = e)
                }
                n.__esModule = !0;
                var u = t(5),
                    l = o(u),
                    c = t(83),
                    f = r(c),
                    p = t(84),
                    h = o(p),
                    d = function(t) {
                        function e(n, r) {
                            i(this, e);
                            var o = a(this, t.call(this, n, r));
                            return o.updateDataAttr(), o.on(n, "timeupdate", o.updateDataAttr), n.ready(f.bind(o, o.updateDataAttr)), o
                        }
                        return s(e, t), e.prototype.createEl = function() {
                            var e = t.prototype.createEl.call(this, "div", {
                                className: "vjs-tooltip-progress-bar vjs-slider-bar",
                                innerHTML: '<div class="vjs-time-tooltip"></div>\n        <span class="vjs-control-text"><span>' + this.localize("Progress") + "</span>: 0%</span>"
                            });
                            return this.tooltip = e.querySelector(".vjs-time-tooltip"), e
                        }, e.prototype.updateDataAttr = function(t) {
                            var e = this.player_.scrubbing() ? this.player_.getCache().currentTime : this.player_.currentTime(),
                                n = (0, h["default"])(e, this.player_.duration());
                            this.el_.setAttribute("data-current-time", n), this.tooltip.innerHTML = n
                        }, e
                    }(l["default"]);
                l["default"].registerComponent("TooltipProgressBar", d), n["default"] = d
            }, {
                5: 5,
                83: 83,
                84: 84
            }],
            21: [function(t, e, n) {
                "use strict";

                function r(t) {
                    return t && t.__esModule ? t : {
                        "default": t
                    }
                }

                function o(t, e) {
                    if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function")
                }

                function i(t, e) {
                    if (!t) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
                    return !e || "object" != typeof e && "function" != typeof e ? t : e
                }

                function a(t, e) {
                    if ("function" != typeof e && null !== e) throw new TypeError("Super expression must either be null or a function, not " + typeof e);
                    t.prototype = Object.create(e && e.prototype, {
                        constructor: {
                            value: t,
                            enumerable: !1,
                            writable: !0,
                            configurable: !0
                        }
                    }), e && (Object.setPrototypeOf ? Object.setPrototypeOf(t, e) : t.__proto__ = e)
                }
                n.__esModule = !0;
                var s = t(22),
                    u = r(s),
                    l = t(5),
                    c = r(l),
                    f = function(t) {
                        function e() {
                            return o(this, e), i(this, t.apply(this, arguments))
                        }
                        return a(e, t), e.prototype.buildCSSClass = function() {
                            return "vjs-custom-control-spacer " + t.prototype.buildCSSClass.call(this)
                        }, e.prototype.createEl = function() {
                            var e = t.prototype.createEl.call(this, {
                                className: this.buildCSSClass()
                            });
                            return e.innerHTML = "&nbsp;", e
                        }, e
                    }(u["default"]);
                c["default"].registerComponent("CustomControlSpacer", f), n["default"] = f
            }, {
                22: 22,
                5: 5
            }],
            22: [function(t, e, n) {
                "use strict";

                function r(t) {
                    return t && t.__esModule ? t : {
                        "default": t
                    }
                }

                function o(t, e) {
                    if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function")
                }

                function i(t, e) {
                    if (!t) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
                    return !e || "object" != typeof e && "function" != typeof e ? t : e
                }

                function a(t, e) {
                    if ("function" != typeof e && null !== e) throw new TypeError("Super expression must either be null or a function, not " + typeof e);
                    t.prototype = Object.create(e && e.prototype, {
                        constructor: {
                            value: t,
                            enumerable: !1,
                            writable: !0,
                            configurable: !0
                        }
                    }), e && (Object.setPrototypeOf ? Object.setPrototypeOf(t, e) : t.__proto__ = e)
                }
                n.__esModule = !0;
                var s = t(5),
                    u = r(s),
                    l = function(t) {
                        function e() {
                            return o(this, e), i(this, t.apply(this, arguments))
                        }
                        return a(e, t), e.prototype.buildCSSClass = function() {
                            return "vjs-spacer " + t.prototype.buildCSSClass.call(this)
                        }, e.prototype.createEl = function() {
                            return t.prototype.createEl.call(this, "div", {
                                className: this.buildCSSClass()
                            })
                        }, e
                    }(u["default"]);
                u["default"].registerComponent("Spacer", l), n["default"] = l
            }, {
                5: 5
            }],
            23: [function(t, e, n) {
                "use strict";

                function r(t) {
                    return t && t.__esModule ? t : {
                        "default": t
                    }
                }

                function o(t, e) {
                    if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function")
                }

                function i(t, e) {
                    if (!t) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
                    return !e || "object" != typeof e && "function" != typeof e ? t : e
                }

                function a(t, e) {
                    if ("function" != typeof e && null !== e) throw new TypeError("Super expression must either be null or a function, not " + typeof e);
                    t.prototype = Object.create(e && e.prototype, {
                        constructor: {
                            value: t,
                            enumerable: !1,
                            writable: !0,
                            configurable: !0
                        }
                    }), e && (Object.setPrototypeOf ? Object.setPrototypeOf(t, e) : t.__proto__ = e)
                }
                n.__esModule = !0;
                var s = t(31),
                    u = r(s),
                    l = t(5),
                    c = r(l),
                    f = function(t) {
                        function e(n, r) {
                            o(this, e), r.track = {
                                player: n,
                                kind: r.kind,
                                label: r.kind + " settings",
                                selectable: !1,
                                "default": !1,
                                mode: "disabled"
                            }, r.selectable = !1;
                            var a = i(this, t.call(this, n, r));
                            return a.addClass("vjs-texttrack-settings"), a.controlText(", opens " + r.kind + " settings dialog"), a
                        }
                        return a(e, t), e.prototype.handleClick = function(t) {
                            this.player().getChild("textTrackSettings").show(), this.player().getChild("textTrackSettings").el_.focus()
                        }, e
                    }(u["default"]);
                c["default"].registerComponent("CaptionSettingsMenuItem", f), n["default"] = f
            }, {
                31: 31,
                5: 5
            }],
            24: [function(t, e, n) {
                "use strict";

                function r(t) {
                    return t && t.__esModule ? t : {
                        "default": t
                    }
                }

                function o(t, e) {
                    if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function")
                }

                function i(t, e) {
                    if (!t) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
                    return !e || "object" != typeof e && "function" != typeof e ? t : e
                }

                function a(t, e) {
                    if ("function" != typeof e && null !== e) throw new TypeError("Super expression must either be null or a function, not " + typeof e);
                    t.prototype = Object.create(e && e.prototype, {
                        constructor: {
                            value: t,
                            enumerable: !1,
                            writable: !0,
                            configurable: !0
                        }
                    }), e && (Object.setPrototypeOf ? Object.setPrototypeOf(t, e) : t.__proto__ = e)
                }
                n.__esModule = !0;
                var s = t(30),
                    u = r(s),
                    l = t(5),
                    c = r(l),
                    f = t(23),
                    p = r(f),
                    h = function(t) {
                        function e(n, r, a) {
                            o(this, e);
                            var s = i(this, t.call(this, n, r, a));
                            return s.el_.setAttribute("aria-label", "Captions Menu"), s
                        }
                        return a(e, t), e.prototype.buildCSSClass = function() {
                            return "vjs-captions-button " + t.prototype.buildCSSClass.call(this)
                        }, e.prototype.createItems = function() {
                            var e = [];
                            return this.player().tech_ && this.player().tech_.featuresNativeTextTracks || (e.push(new p["default"](this.player_, {
                                kind: this.kind_
                            })), this.hideThreshold_ += 1), t.prototype.createItems.call(this, e)
                        }, e
                    }(u["default"]);
                h.prototype.kind_ = "captions", h.prototype.controlText_ = "Captions", c["default"].registerComponent("CaptionsButton", h), n["default"] = h
            }, {
                23: 23,
                30: 30,
                5: 5
            }],
            25: [function(t, e, n) {
                "use strict";

                function r(t) {
                    return t && t.__esModule ? t : {
                        "default": t
                    }
                }

                function o(t, e) {
                    if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function")
                }

                function i(t, e) {
                    if (!t) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
                    return !e || "object" != typeof e && "function" != typeof e ? t : e
                }

                function a(t, e) {
                    if ("function" != typeof e && null !== e) throw new TypeError("Super expression must either be null or a function, not " + typeof e);
                    t.prototype = Object.create(e && e.prototype, {
                        constructor: {
                            value: t,
                            enumerable: !1,
                            writable: !0,
                            configurable: !0
                        }
                    }), e && (Object.setPrototypeOf ? Object.setPrototypeOf(t, e) : t.__proto__ = e)
                }
                n.__esModule = !0;
                var s = t(30),
                    u = r(s),
                    l = t(5),
                    c = r(l),
                    f = t(26),
                    p = r(f),
                    h = t(91),
                    d = r(h),
                    y = function(t) {
                        function e(n, r, a) {
                            o(this, e);
                            var s = i(this, t.call(this, n, r, a));
                            return s.el_.setAttribute("aria-label", "Chapters Menu"), s
                        }
                        return a(e, t), e.prototype.buildCSSClass = function() {
                            return "vjs-chapters-button " + t.prototype.buildCSSClass.call(this)
                        }, e.prototype.update = function(e) {
                            this.track_ && (!e || "addtrack" !== e.type && "removetrack" !== e.type) || this.setTrack(this.findChaptersTrack()), t.prototype.update.call(this)
                        }, e.prototype.setTrack = function(t) {
                            if (this.track_ !== t) {
                                if (this.updateHandler_ || (this.updateHandler_ = this.update.bind(this)), this.track_) {
                                    var e = this.player_.remoteTextTrackEls().getTrackElementByTrack_(this.track_);
                                    e && e.removeEventListener("load", this.updateHandler_), this.track_ = null
                                }
                                if (this.track_ = t, this.track_) {
                                    this.track_.mode = "hidden";
                                    var n = this.player_.remoteTextTrackEls().getTrackElementByTrack_(this.track_);
                                    n && n.addEventListener("load", this.updateHandler_)
                                }
                            }
                        }, e.prototype.findChaptersTrack = function() {
                            for (var t = this.player_.textTracks() || [], e = t.length - 1; e >= 0; e--) {
                                var n = t[e];
                                if (n.kind === this.kind_) return n
                            }
                        }, e.prototype.getMenuCaption = function() {
                            return this.track_ && this.track_.label ? this.track_.label : this.localize((0, d["default"])(this.kind_))
                        }, e.prototype.createMenu = function() {
                            return this.options_.title = this.getMenuCaption(), t.prototype.createMenu.call(this)
                        }, e.prototype.createItems = function() {
                            var t = [];
                            if (!this.track_) return t;
                            var e = this.track_.cues;
                            if (!e) return t;
                            for (var n = 0, r = e.length; n < r; n++) {
                                var o = e[n],
                                    i = new p["default"](this.player_, {
                                        track: this.track_,
                                        cue: o
                                    });
                                t.push(i)
                            }
                            return t
                        }, e
                    }(u["default"]);
                y.prototype.kind_ = "chapters", y.prototype.controlText_ = "Chapters", c["default"].registerComponent("ChaptersButton", y), n["default"] = y
            }, {
                26: 26,
                30: 30,
                5: 5,
                91: 91
            }],
            26: [function(t, e, n) {
                "use strict";

                function r(t) {
                    if (t && t.__esModule) return t;
                    var e = {};
                    if (null != t)
                        for (var n in t) Object.prototype.hasOwnProperty.call(t, n) && (e[n] = t[n]);
                    return e["default"] = t, e
                }

                function o(t) {
                    return t && t.__esModule ? t : {
                        "default": t
                    }
                }

                function i(t, e) {
                    if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function")
                }

                function a(t, e) {
                    if (!t) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
                    return !e || "object" != typeof e && "function" != typeof e ? t : e
                }

                function s(t, e) {
                    if ("function" != typeof e && null !== e) throw new TypeError("Super expression must either be null or a function, not " + typeof e);
                    t.prototype = Object.create(e && e.prototype, {
                        constructor: {
                            value: t,
                            enumerable: !1,
                            writable: !0,
                            configurable: !0
                        }
                    }), e && (Object.setPrototypeOf ? Object.setPrototypeOf(t, e) : t.__proto__ = e)
                }
                n.__esModule = !0;
                var u = t(48),
                    l = o(u),
                    c = t(5),
                    f = o(c),
                    p = t(83),
                    h = r(p),
                    d = function(t) {
                        function e(n, r) {
                            i(this, e);
                            var o = r.track,
                                s = r.cue,
                                u = n.currentTime();
                            r.selectable = !0, r.label = s.text, r.selected = s.startTime <= u && u < s.endTime;
                            var l = a(this, t.call(this, n, r));
                            return l.track = o, l.cue = s, o.addEventListener("cuechange", h.bind(l, l.update)), l
                        }
                        return s(e, t), e.prototype.handleClick = function(e) {
                            t.prototype.handleClick.call(this), this.player_.currentTime(this.cue.startTime), this.update(this.cue.startTime)
                        }, e.prototype.update = function(t) {
                            var e = this.cue,
                                n = this.player_.currentTime();
                            this.selected(e.startTime <= n && n < e.endTime)
                        }, e
                    }(l["default"]);
                f["default"].registerComponent("ChaptersTrackMenuItem", d), n["default"] = d
            }, {
                48: 48,
                5: 5,
                83: 83
            }],
            27: [function(t, e, n) {
                "use strict";

                function r(t) {
                    if (t && t.__esModule) return t;
                    var e = {};
                    if (null != t)
                        for (var n in t) Object.prototype.hasOwnProperty.call(t, n) && (e[n] = t[n]);
                    return e["default"] = t, e
                }

                function o(t) {
                    return t && t.__esModule ? t : {
                        "default": t
                    }
                }

                function i(t, e) {
                    if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function")
                }

                function a(t, e) {
                    if (!t) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
                    return !e || "object" != typeof e && "function" != typeof e ? t : e
                }

                function s(t, e) {
                    if ("function" != typeof e && null !== e) throw new TypeError("Super expression must either be null or a function, not " + typeof e);
                    t.prototype = Object.create(e && e.prototype, {
                        constructor: {
                            value: t,
                            enumerable: !1,
                            writable: !0,
                            configurable: !0
                        }
                    }), e && (Object.setPrototypeOf ? Object.setPrototypeOf(t, e) : t.__proto__ = e)
                }
                n.__esModule = !0;
                var u = t(30),
                    l = o(u),
                    c = t(5),
                    f = o(c),
                    p = t(83),
                    h = r(p),
                    d = function(t) {
                        function e(n, r, o) {
                            i(this, e);
                            var s = a(this, t.call(this, n, r, o));
                            s.el_.setAttribute("aria-label", "Descriptions Menu");
                            var u = n.textTracks();
                            if (u) {
                                var l = h.bind(s, s.handleTracksChange);
                                u.addEventListener("change", l), s.on("dispose", function() {
                                    u.removeEventListener("change", l)
                                })
                            }
                            return s
                        }
                        return s(e, t), e.prototype.handleTracksChange = function(t) {
                            for (var e = this.player().textTracks(), n = !1, r = 0, o = e.length; r < o; r++) {
                                var i = e[r];
                                if (i.kind !== this.kind_ && "showing" === i.mode) {
                                    n = !0;
                                    break
                                }
                            }
                            n ? this.disable() : this.enable()
                        }, e.prototype.buildCSSClass = function() {
                            return "vjs-descriptions-button " + t.prototype.buildCSSClass.call(this)
                        }, e
                    }(l["default"]);
                d.prototype.kind_ = "descriptions", d.prototype.controlText_ = "Descriptions", f["default"].registerComponent("DescriptionsButton", d), n["default"] = d
            }, {
                30: 30,
                5: 5,
                83: 83
            }],
            28: [function(t, e, n) {
                "use strict";

                function r(t) {
                    return t && t.__esModule ? t : {
                        "default": t
                    }
                }

                function o(t, e) {
                    if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function")
                }

                function i(t, e) {
                    if (!t) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
                    return !e || "object" != typeof e && "function" != typeof e ? t : e
                }

                function a(t, e) {
                    if ("function" != typeof e && null !== e) throw new TypeError("Super expression must either be null or a function, not " + typeof e);
                    t.prototype = Object.create(e && e.prototype, {
                        constructor: {
                            value: t,
                            enumerable: !1,
                            writable: !0,
                            configurable: !0
                        }
                    }), e && (Object.setPrototypeOf ? Object.setPrototypeOf(t, e) : t.__proto__ = e)
                }
                n.__esModule = !0;
                var s = t(31),
                    u = r(s),
                    l = t(5),
                    c = r(l),
                    f = function(t) {
                        function e(n, r) {
                            o(this, e), r.track = {
                                player: n,
                                kind: r.kind,
                                label: r.kind + " off",
                                "default": !1,
                                mode: "disabled"
                            }, r.selectable = !0;
                            var a = i(this, t.call(this, n, r));
                            return a.selected(!0), a
                        }
                        return a(e, t), e.prototype.handleTracksChange = function(t) {
                            for (var e = this.player().textTracks(), n = !0, r = 0, o = e.length; r < o; r++) {
                                var i = e[r];
                                if (i.kind === this.track.kind && "showing" === i.mode) {
                                    n = !1;
                                    break
                                }
                            }
                            this.selected(n)
                        }, e
                    }(u["default"]);
                c["default"].registerComponent("OffTextTrackMenuItem", f), n["default"] = f
            }, {
                31: 31,
                5: 5
            }],
            29: [function(t, e, n) {
                "use strict";

                function r(t) {
                    return t && t.__esModule ? t : {
                        "default": t
                    }
                }

                function o(t, e) {
                    if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function")
                }

                function i(t, e) {
                    if (!t) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
                    return !e || "object" != typeof e && "function" != typeof e ? t : e
                }

                function a(t, e) {
                    if ("function" != typeof e && null !== e) throw new TypeError("Super expression must either be null or a function, not " + typeof e);
                    t.prototype = Object.create(e && e.prototype, {
                        constructor: {
                            value: t,
                            enumerable: !1,
                            writable: !0,
                            configurable: !0
                        }
                    }), e && (Object.setPrototypeOf ? Object.setPrototypeOf(t, e) : t.__proto__ = e)
                }
                n.__esModule = !0;
                var s = t(30),
                    u = r(s),
                    l = t(5),
                    c = r(l),
                    f = function(t) {
                        function e(n, r, a) {
                            o(this, e);
                            var s = i(this, t.call(this, n, r, a));
                            return s.el_.setAttribute("aria-label", "Subtitles Menu"), s
                        }
                        return a(e, t), e.prototype.buildCSSClass = function() {
                            return "vjs-subtitles-button " + t.prototype.buildCSSClass.call(this)
                        }, e
                    }(u["default"]);
                f.prototype.kind_ = "subtitles", f.prototype.controlText_ = "Subtitles", c["default"].registerComponent("SubtitlesButton", f), n["default"] = f
            }, {
                30: 30,
                5: 5
            }],
            30: [function(t, e, n) {
                "use strict";

                function r(t) {
                    return t && t.__esModule ? t : {
                        "default": t
                    }
                }

                function o(t, e) {
                    if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function")
                }

                function i(t, e) {
                    if (!t) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
                    return !e || "object" != typeof e && "function" != typeof e ? t : e
                }

                function a(t, e) {
                    if ("function" != typeof e && null !== e) throw new TypeError("Super expression must either be null or a function, not " + typeof e);
                    t.prototype = Object.create(e && e.prototype, {
                        constructor: {
                            value: t,
                            enumerable: !1,
                            writable: !0,
                            configurable: !0
                        }
                    }), e && (Object.setPrototypeOf ? Object.setPrototypeOf(t, e) : t.__proto__ = e)
                }
                n.__esModule = !0;
                var s = t(36),
                    u = r(s),
                    l = t(5),
                    c = r(l),
                    f = t(31),
                    p = r(f),
                    h = t(28),
                    d = r(h),
                    y = function(t) {
                        function e(n) {
                            var r = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {};
                            return o(this, e), r.tracks = n.textTracks(), i(this, t.call(this, n, r))
                        }
                        return a(e, t), e.prototype.createItems = function() {
                            var t = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : [];
                            t.push(new d["default"](this.player_, {
                                kind: this.kind_
                            })), this.hideThreshold_ += 1;
                            var e = this.player_.textTracks();
                            if (!e) return t;
                            for (var n = 0; n < e.length; n++) {
                                var r = e[n];
                                r.kind === this.kind_ && t.push(new p["default"](this.player_, {
                                    track: r,
                                    selectable: !0
                                }))
                            }
                            return t
                        }, e
                    }(u["default"]);
                c["default"].registerComponent("TextTrackButton", y), n["default"] = y
            }, {
                28: 28,
                31: 31,
                36: 36,
                5: 5
            }],
            31: [function(t, e, n) {
                "use strict";

                function r(t) {
                    if (t && t.__esModule) return t;
                    var e = {};
                    if (null != t)
                        for (var n in t) Object.prototype.hasOwnProperty.call(t, n) && (e[n] = t[n]);
                    return e["default"] = t, e
                }

                function o(t) {
                    return t && t.__esModule ? t : {
                        "default": t
                    }
                }

                function i(t, e) {
                    if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function")
                }

                function a(t, e) {
                    if (!t) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
                    return !e || "object" != typeof e && "function" != typeof e ? t : e
                }

                function s(t, e) {
                    if ("function" != typeof e && null !== e) throw new TypeError("Super expression must either be null or a function, not " + typeof e);
                    t.prototype = Object.create(e && e.prototype, {
                        constructor: {
                            value: t,
                            enumerable: !1,
                            writable: !0,
                            configurable: !0
                        }
                    }), e && (Object.setPrototypeOf ? Object.setPrototypeOf(t, e) : t.__proto__ = e)
                }
                n.__esModule = !0;
                var u = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(t) {
                        return typeof t
                    } : function(t) {
                        return t && "function" == typeof Symbol && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t
                    },
                    l = t(48),
                    c = o(l),
                    f = t(5),
                    p = o(f),
                    h = t(83),
                    d = r(h),
                    y = t(95),
                    v = o(y),
                    g = t(94),
                    m = o(g),
                    b = function(t) {
                        function e(n, r) {
                            i(this, e);
                            var o = r.track,
                                s = n.textTracks();
                            r.label = o.label || o.language || "Unknown", r.selected = o["default"] || "showing" === o.mode;
                            var l = a(this, t.call(this, n, r));
                            if (l.track = o, s) {
                                var c = d.bind(l, l.handleTracksChange);
                                n.on(["loadstart", "texttrackchange"], c), s.addEventListener("change", c), l.on("dispose", function() {
                                    s.removeEventListener("change", c)
                                })
                            }
                            if (s && void 0 === s.onchange) {
                                var f = void 0;
                                l.on(["tap", "click"], function() {
                                    if ("object" !== u(v["default"].Event)) try {
                                        f = new v["default"].Event("change")
                                    } catch (t) {}
                                    f || (f = m["default"].createEvent("Event"), f.initEvent("change", !0, !0)), s.dispatchEvent(f)
                                })
                            }
                            return l
                        }
                        return s(e, t), e.prototype.handleClick = function(e) {
                            var n = this.track.kind,
                                r = this.player_.textTracks();
                            if (t.prototype.handleClick.call(this, e), r)
                                for (var o = 0; o < r.length; o++) {
                                    var i = r[o];
                                    i.kind === n && (i === this.track ? i.mode = "showing" : i.mode = "disabled")
                                }
                        }, e.prototype.handleTracksChange = function(t) {
                            this.selected("showing" === this.track.mode)
                        }, e
                    }(c["default"]);
                p["default"].registerComponent("TextTrackMenuItem", b), n["default"] = b
            }, {
                48: 48,
                5: 5,
                83: 83,
                94: 94,
                95: 95
            }],
            32: [function(t, e, n) {
                "use strict";

                function r(t) {
                    if (t && t.__esModule) return t;
                    var e = {};
                    if (null != t)
                        for (var n in t) Object.prototype.hasOwnProperty.call(t, n) && (e[n] = t[n]);
                    return e["default"] = t, e
                }

                function o(t) {
                    return t && t.__esModule ? t : {
                        "default": t
                    }
                }

                function i(t, e) {
                    if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function")
                }

                function a(t, e) {
                    if (!t) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
                    return !e || "object" != typeof e && "function" != typeof e ? t : e
                }

                function s(t, e) {
                    if ("function" != typeof e && null !== e) throw new TypeError("Super expression must either be null or a function, not " + typeof e);
                    t.prototype = Object.create(e && e.prototype, {
                        constructor: {
                            value: t,
                            enumerable: !1,
                            writable: !0,
                            configurable: !0
                        }
                    }), e && (Object.setPrototypeOf ? Object.setPrototypeOf(t, e) : t.__proto__ = e);
                }
                n.__esModule = !0;
                var u = t(5),
                    l = o(u),
                    c = t(81),
                    f = r(c),
                    p = t(84),
                    h = o(p),
                    d = function(t) {
                        function e(n, r) {
                            i(this, e);
                            var o = a(this, t.call(this, n, r));
                            return o.on(n, "timeupdate", o.updateContent), o
                        }
                        return s(e, t), e.prototype.createEl = function() {
                            var e = t.prototype.createEl.call(this, "div", {
                                className: "vjs-current-time vjs-time-control vjs-control"
                            });
                            return this.contentEl_ = f.createEl("div", {
                                className: "vjs-current-time-display",
                                innerHTML: '<span class="vjs-control-text">Current Time </span>0:00'
                            }, {
                                "aria-live": "off"
                            }), e.appendChild(this.contentEl_), e
                        }, e.prototype.updateContent = function(t) {
                            var e = this.player_.scrubbing() ? this.player_.getCache().currentTime : this.player_.currentTime(),
                                n = this.localize("Current Time"),
                                r = (0, h["default"])(e, this.player_.duration());
                            r !== this.formattedTime_ && (this.formattedTime_ = r, this.contentEl_.innerHTML = '<span class="vjs-control-text">' + n + "</span> " + r)
                        }, e
                    }(l["default"]);
                l["default"].registerComponent("CurrentTimeDisplay", d), n["default"] = d
            }, {
                5: 5,
                81: 81,
                84: 84
            }],
            33: [function(t, e, n) {
                "use strict";

                function r(t) {
                    if (t && t.__esModule) return t;
                    var e = {};
                    if (null != t)
                        for (var n in t) Object.prototype.hasOwnProperty.call(t, n) && (e[n] = t[n]);
                    return e["default"] = t, e
                }

                function o(t) {
                    return t && t.__esModule ? t : {
                        "default": t
                    }
                }

                function i(t, e) {
                    if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function")
                }

                function a(t, e) {
                    if (!t) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
                    return !e || "object" != typeof e && "function" != typeof e ? t : e
                }

                function s(t, e) {
                    if ("function" != typeof e && null !== e) throw new TypeError("Super expression must either be null or a function, not " + typeof e);
                    t.prototype = Object.create(e && e.prototype, {
                        constructor: {
                            value: t,
                            enumerable: !1,
                            writable: !0,
                            configurable: !0
                        }
                    }), e && (Object.setPrototypeOf ? Object.setPrototypeOf(t, e) : t.__proto__ = e)
                }
                n.__esModule = !0;
                var u = t(5),
                    l = o(u),
                    c = t(81),
                    f = r(c),
                    p = t(84),
                    h = o(p),
                    d = function(t) {
                        function e(n, r) {
                            i(this, e);
                            var o = a(this, t.call(this, n, r));
                            return o.on(n, "durationchange", o.updateContent), o.on(n, "timeupdate", o.updateContent), o.on(n, "loadedmetadata", o.updateContent), o
                        }
                        return s(e, t), e.prototype.createEl = function() {
                            var e = t.prototype.createEl.call(this, "div", {
                                className: "vjs-duration vjs-time-control vjs-control"
                            });
                            return this.contentEl_ = f.createEl("div", {
                                className: "vjs-duration-display",
                                innerHTML: '<span class="vjs-control-text">' + this.localize("Duration Time") + "</span> 0:00"
                            }, {
                                "aria-live": "off"
                            }), e.appendChild(this.contentEl_), e
                        }, e.prototype.updateContent = function(t) {
                            var e = this.player_.duration();
                            if (e && this.duration_ !== e) {
                                this.duration_ = e;
                                var n = this.localize("Duration Time"),
                                    r = (0, h["default"])(e);
                                this.contentEl_.innerHTML = '<span class="vjs-control-text">' + n + "</span> " + r
                            }
                        }, e
                    }(l["default"]);
                l["default"].registerComponent("DurationDisplay", d), n["default"] = d
            }, {
                5: 5,
                81: 81,
                84: 84
            }],
            34: [function(t, e, n) {
                "use strict";

                function r(t) {
                    if (t && t.__esModule) return t;
                    var e = {};
                    if (null != t)
                        for (var n in t) Object.prototype.hasOwnProperty.call(t, n) && (e[n] = t[n]);
                    return e["default"] = t, e
                }

                function o(t) {
                    return t && t.__esModule ? t : {
                        "default": t
                    }
                }

                function i(t, e) {
                    if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function")
                }

                function a(t, e) {
                    if (!t) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
                    return !e || "object" != typeof e && "function" != typeof e ? t : e
                }

                function s(t, e) {
                    if ("function" != typeof e && null !== e) throw new TypeError("Super expression must either be null or a function, not " + typeof e);
                    t.prototype = Object.create(e && e.prototype, {
                        constructor: {
                            value: t,
                            enumerable: !1,
                            writable: !0,
                            configurable: !0
                        }
                    }), e && (Object.setPrototypeOf ? Object.setPrototypeOf(t, e) : t.__proto__ = e)
                }
                n.__esModule = !0;
                var u = t(5),
                    l = o(u),
                    c = t(81),
                    f = r(c),
                    p = t(84),
                    h = o(p),
                    d = function(t) {
                        function e(n, r) {
                            i(this, e);
                            var o = a(this, t.call(this, n, r));
                            return o.on(n, "timeupdate", o.updateContent), o.on(n, "durationchange", o.updateContent), o
                        }
                        return s(e, t), e.prototype.createEl = function() {
                            var e = t.prototype.createEl.call(this, "div", {
                                className: "vjs-remaining-time vjs-time-control vjs-control"
                            });
                            return this.contentEl_ = f.createEl("div", {
                                className: "vjs-remaining-time-display",
                                innerHTML: '<span class="vjs-control-text">' + this.localize("Remaining Time") + "</span> -0:00"
                            }, {
                                "aria-live": "off"
                            }), e.appendChild(this.contentEl_), e
                        }, e.prototype.updateContent = function(t) {
                            if (this.player_.duration()) {
                                var e = this.localize("Remaining Time"),
                                    n = (0, h["default"])(this.player_.remainingTime());
                                n !== this.formattedTime_ && (this.formattedTime_ = n, this.contentEl_.innerHTML = '<span class="vjs-control-text">' + e + "</span> -" + n)
                            }
                        }, e
                    }(l["default"]);
                l["default"].registerComponent("RemainingTimeDisplay", d), n["default"] = d
            }, {
                5: 5,
                81: 81,
                84: 84
            }],
            35: [function(t, e, n) {
                "use strict";

                function r(t) {
                    return t && t.__esModule ? t : {
                        "default": t
                    }
                }

                function o(t, e) {
                    if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function")
                }

                function i(t, e) {
                    if (!t) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
                    return !e || "object" != typeof e && "function" != typeof e ? t : e
                }

                function a(t, e) {
                    if ("function" != typeof e && null !== e) throw new TypeError("Super expression must either be null or a function, not " + typeof e);
                    t.prototype = Object.create(e && e.prototype, {
                        constructor: {
                            value: t,
                            enumerable: !1,
                            writable: !0,
                            configurable: !0
                        }
                    }), e && (Object.setPrototypeOf ? Object.setPrototypeOf(t, e) : t.__proto__ = e)
                }
                n.__esModule = !0;
                var s = t(5),
                    u = r(s),
                    l = function(t) {
                        function e() {
                            return o(this, e), i(this, t.apply(this, arguments))
                        }
                        return a(e, t), e.prototype.createEl = function() {
                            return t.prototype.createEl.call(this, "div", {
                                className: "vjs-time-control vjs-time-divider",
                                innerHTML: "<div><span>/</span></div>"
                            })
                        }, e
                    }(u["default"]);
                u["default"].registerComponent("TimeDivider", l), n["default"] = l
            }, {
                5: 5
            }],
            36: [function(t, e, n) {
                "use strict";

                function r(t) {
                    if (t && t.__esModule) return t;
                    var e = {};
                    if (null != t)
                        for (var n in t) Object.prototype.hasOwnProperty.call(t, n) && (e[n] = t[n]);
                    return e["default"] = t, e
                }

                function o(t) {
                    return t && t.__esModule ? t : {
                        "default": t
                    }
                }

                function i(t, e) {
                    if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function")
                }

                function a(t, e) {
                    if (!t) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
                    return !e || "object" != typeof e && "function" != typeof e ? t : e
                }

                function s(t, e) {
                    if ("function" != typeof e && null !== e) throw new TypeError("Super expression must either be null or a function, not " + typeof e);
                    t.prototype = Object.create(e && e.prototype, {
                        constructor: {
                            value: t,
                            enumerable: !1,
                            writable: !0,
                            configurable: !0
                        }
                    }), e && (Object.setPrototypeOf ? Object.setPrototypeOf(t, e) : t.__proto__ = e)
                }
                n.__esModule = !0;
                var u = t(47),
                    l = o(u),
                    c = t(5),
                    f = o(c),
                    p = t(83),
                    h = r(p),
                    d = function(t) {
                        function e(n, r) {
                            i(this, e);
                            var o = r.tracks,
                                s = a(this, t.call(this, n, r));
                            if (s.items.length <= 1 && s.hide(), !o) return a(s);
                            var u = h.bind(s, s.update);
                            return o.addEventListener("removetrack", u), o.addEventListener("addtrack", u), s.player_.on("dispose", function() {
                                o.removeEventListener("removetrack", u), o.removeEventListener("addtrack", u)
                            }), s
                        }
                        return s(e, t), e
                    }(l["default"]);
                f["default"].registerComponent("TrackButton", d), n["default"] = d
            }, {
                47: 47,
                5: 5,
                83: 83
            }],
            37: [function(t, e, n) {
                "use strict";

                function r(t) {
                    if (t && t.__esModule) return t;
                    var e = {};
                    if (null != t)
                        for (var n in t) Object.prototype.hasOwnProperty.call(t, n) && (e[n] = t[n]);
                    return e["default"] = t, e
                }

                function o(t) {
                    return t && t.__esModule ? t : {
                        "default": t
                    }
                }

                function i(t, e) {
                    if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function")
                }

                function a(t, e) {
                    if (!t) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
                    return !e || "object" != typeof e && "function" != typeof e ? t : e
                }

                function s(t, e) {
                    if ("function" != typeof e && null !== e) throw new TypeError("Super expression must either be null or a function, not " + typeof e);
                    t.prototype = Object.create(e && e.prototype, {
                        constructor: {
                            value: t,
                            enumerable: !1,
                            writable: !0,
                            configurable: !0
                        }
                    }), e && (Object.setPrototypeOf ? Object.setPrototypeOf(t, e) : t.__proto__ = e)
                }
                n.__esModule = !0;
                var u = t(57),
                    l = o(u),
                    c = t(5),
                    f = o(c),
                    p = t(83),
                    h = r(p);
                t(39);
                var d = function(t) {
                    function e(n, r) {
                        i(this, e);
                        var o = a(this, t.call(this, n, r));
                        return o.on(n, "volumechange", o.updateARIAAttributes), n.ready(h.bind(o, o.updateARIAAttributes)), o
                    }
                    return s(e, t), e.prototype.createEl = function() {
                        return t.prototype.createEl.call(this, "div", {
                            className: "vjs-volume-bar vjs-slider-bar"
                        }, {
                            "aria-label": "volume level"
                        })
                    }, e.prototype.handleMouseMove = function(t) {
                        this.checkMuted(), this.player_.volume(this.calculateDistance(t))
                    }, e.prototype.checkMuted = function() {
                        this.player_.muted() && this.player_.muted(!1)
                    }, e.prototype.getPercent = function() {
                        return this.player_.muted() ? 0 : this.player_.volume()
                    }, e.prototype.stepForward = function() {
                        this.checkMuted(), this.player_.volume(this.player_.volume() + .1)
                    }, e.prototype.stepBack = function() {
                        this.checkMuted(), this.player_.volume(this.player_.volume() - .1)
                    }, e.prototype.updateARIAAttributes = function(t) {
                        var e = (100 * this.player_.volume()).toFixed(2);
                        this.el_.setAttribute("aria-valuenow", e), this.el_.setAttribute("aria-valuetext", e + "%")
                    }, e
                }(l["default"]);
                d.prototype.options_ = {
                    children: ["volumeLevel"],
                    barName: "volumeLevel"
                }, d.prototype.playerEvent = "volumechange", f["default"].registerComponent("VolumeBar", d), n["default"] = d
            }, {
                39: 39,
                5: 5,
                57: 57,
                83: 83
            }],
            38: [function(t, e, n) {
                "use strict";

                function r(t) {
                    return t && t.__esModule ? t : {
                        "default": t
                    }
                }

                function o(t, e) {
                    if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function")
                }

                function i(t, e) {
                    if (!t) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
                    return !e || "object" != typeof e && "function" != typeof e ? t : e
                }

                function a(t, e) {
                    if ("function" != typeof e && null !== e) throw new TypeError("Super expression must either be null or a function, not " + typeof e);
                    t.prototype = Object.create(e && e.prototype, {
                        constructor: {
                            value: t,
                            enumerable: !1,
                            writable: !0,
                            configurable: !0
                        }
                    }), e && (Object.setPrototypeOf ? Object.setPrototypeOf(t, e) : t.__proto__ = e)
                }
                n.__esModule = !0;
                var s = t(5),
                    u = r(s);
                t(37);
                var l = function(t) {
                    function e(n, r) {
                        o(this, e);
                        var a = i(this, t.call(this, n, r));
                        return n.tech_ && n.tech_.featuresVolumeControl === !1 && a.addClass("vjs-hidden"), a.on(n, "loadstart", function() {
                            n.tech_.featuresVolumeControl === !1 ? this.addClass("vjs-hidden") : this.removeClass("vjs-hidden")
                        }), a
                    }
                    return a(e, t), e.prototype.createEl = function() {
                        return t.prototype.createEl.call(this, "div", {
                            className: "vjs-volume-control vjs-control"
                        })
                    }, e
                }(u["default"]);
                l.prototype.options_ = {
                    children: ["volumeBar"]
                }, u["default"].registerComponent("VolumeControl", l), n["default"] = l
            }, {
                37: 37,
                5: 5
            }],
            39: [function(t, e, n) {
                "use strict";

                function r(t) {
                    return t && t.__esModule ? t : {
                        "default": t
                    }
                }

                function o(t, e) {
                    if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function")
                }

                function i(t, e) {
                    if (!t) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
                    return !e || "object" != typeof e && "function" != typeof e ? t : e
                }

                function a(t, e) {
                    if ("function" != typeof e && null !== e) throw new TypeError("Super expression must either be null or a function, not " + typeof e);
                    t.prototype = Object.create(e && e.prototype, {
                        constructor: {
                            value: t,
                            enumerable: !1,
                            writable: !0,
                            configurable: !0
                        }
                    }), e && (Object.setPrototypeOf ? Object.setPrototypeOf(t, e) : t.__proto__ = e)
                }
                n.__esModule = !0;
                var s = t(5),
                    u = r(s),
                    l = function(t) {
                        function e() {
                            return o(this, e), i(this, t.apply(this, arguments))
                        }
                        return a(e, t), e.prototype.createEl = function() {
                            return t.prototype.createEl.call(this, "div", {
                                className: "vjs-volume-level",
                                innerHTML: '<span class="vjs-control-text"></span>'
                            })
                        }, e
                    }(u["default"]);
                u["default"].registerComponent("VolumeLevel", l), n["default"] = l
            }, {
                5: 5
            }],
            40: [function(t, e, n) {
                "use strict";

                function r(t) {
                    return t && t.__esModule ? t : {
                        "default": t
                    }
                }

                function o(t) {
                    if (t && t.__esModule) return t;
                    var e = {};
                    if (null != t)
                        for (var n in t) Object.prototype.hasOwnProperty.call(t, n) && (e[n] = t[n]);
                    return e["default"] = t, e
                }

                function i(t, e) {
                    if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function")
                }

                function a(t, e) {
                    if (!t) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
                    return !e || "object" != typeof e && "function" != typeof e ? t : e
                }

                function s(t, e) {
                    if ("function" != typeof e && null !== e) throw new TypeError("Super expression must either be null or a function, not " + typeof e);
                    t.prototype = Object.create(e && e.prototype, {
                        constructor: {
                            value: t,
                            enumerable: !1,
                            writable: !0,
                            configurable: !0
                        }
                    }), e && (Object.setPrototypeOf ? Object.setPrototypeOf(t, e) : t.__proto__ = e)
                }
                n.__esModule = !0;
                var u = t(83),
                    l = o(u),
                    c = t(5),
                    f = r(c),
                    p = t(54),
                    h = r(p),
                    d = t(53),
                    y = r(d),
                    v = t(11),
                    g = r(v),
                    m = t(37),
                    b = r(m),
                    _ = function(t) {
                        function e(n) {
                            function r() {
                                n.tech_ && n.tech_.featuresVolumeControl === !1 ? this.addClass("vjs-hidden") : this.removeClass("vjs-hidden")
                            }
                            var o = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {};
                            i(this, e), void 0 === o.inline && (o.inline = !0), void 0 === o.vertical && (o.inline ? o.vertical = !1 : o.vertical = !0), o.volumeBar = o.volumeBar || {}, o.volumeBar.vertical = !!o.vertical;
                            var s = a(this, t.call(this, n, o));
                            return s.on(n, "volumechange", s.volumeUpdate), s.on(n, "loadstart", s.volumeUpdate), r.call(s), s.on(n, "loadstart", r), s.on(s.volumeBar, ["slideractive", "focus"], function() {
                                this.addClass("vjs-slider-active")
                            }), s.on(s.volumeBar, ["sliderinactive", "blur"], function() {
                                this.removeClass("vjs-slider-active")
                            }), s.on(s.volumeBar, ["focus"], function() {
                                this.addClass("vjs-lock-showing")
                            }), s.on(s.volumeBar, ["blur"], function() {
                                this.removeClass("vjs-lock-showing")
                            }), s
                        }
                        return s(e, t), e.prototype.buildCSSClass = function() {
                            var e = "";
                            return e = this.options_.vertical ? "vjs-volume-menu-button-vertical" : "vjs-volume-menu-button-horizontal", "vjs-volume-menu-button " + t.prototype.buildCSSClass.call(this) + " " + e
                        }, e.prototype.createPopup = function() {
                            var t = new h["default"](this.player_, {
                                    contentElType: "div"
                                }),
                                e = new b["default"](this.player_, this.options_.volumeBar);
                            return t.addChild(e), this.menuContent = t, this.volumeBar = e, this.attachVolumeBarEvents(), t
                        }, e.prototype.handleClick = function(e) {
                            g["default"].prototype.handleClick.call(this), t.prototype.handleClick.call(this)
                        }, e.prototype.attachVolumeBarEvents = function() {
                            this.menuContent.on(["mousedown", "touchdown"], l.bind(this, this.handleMouseDown))
                        }, e.prototype.handleMouseDown = function(t) {
                            this.on(["mousemove", "touchmove"], l.bind(this.volumeBar, this.volumeBar.handleMouseMove)), this.on(this.el_.ownerDocument, ["mouseup", "touchend"], this.handleMouseUp)
                        }, e.prototype.handleMouseUp = function(t) {
                            this.off(["mousemove", "touchmove"], l.bind(this.volumeBar, this.volumeBar.handleMouseMove))
                        }, e
                    }(y["default"]);
                _.prototype.volumeUpdate = g["default"].prototype.update, _.prototype.controlText_ = "Mute", f["default"].registerComponent("VolumeMenuButton", _), n["default"] = _
            }, {
                11: 11,
                37: 37,
                5: 5,
                53: 53,
                54: 54,
                83: 83
            }],
            41: [function(t, e, n) {
                "use strict";

                function r(t) {
                    return t && t.__esModule ? t : {
                        "default": t
                    }
                }

                function o(t, e) {
                    if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function")
                }

                function i(t, e) {
                    if (!t) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
                    return !e || "object" != typeof e && "function" != typeof e ? t : e
                }

                function a(t, e) {
                    if ("function" != typeof e && null !== e) throw new TypeError("Super expression must either be null or a function, not " + typeof e);
                    t.prototype = Object.create(e && e.prototype, {
                        constructor: {
                            value: t,
                            enumerable: !1,
                            writable: !0,
                            configurable: !0
                        }
                    }), e && (Object.setPrototypeOf ? Object.setPrototypeOf(t, e) : t.__proto__ = e)
                }
                n.__esModule = !0;
                var s = t(5),
                    u = r(s),
                    l = t(50),
                    c = r(l),
                    f = t(87),
                    p = r(f),
                    h = function(t) {
                        function e(n, r) {
                            o(this, e);
                            var a = i(this, t.call(this, n, r));
                            return a.on(n, "error", a.open), a
                        }
                        return a(e, t), e.prototype.buildCSSClass = function() {
                            return "vjs-error-display " + t.prototype.buildCSSClass.call(this)
                        }, e.prototype.content = function() {
                            var t = this.player().error();
                            return t ? this.localize(t.message) : ""
                        }, e
                    }(c["default"]);
                h.prototype.options_ = (0, p["default"])(c["default"].prototype.options_, {
                    pauseOnOpen: !1,
                    fillAlways: !0,
                    temporary: !1,
                    uncloseable: !0
                }), u["default"].registerComponent("ErrorDisplay", h), n["default"] = h
            }, {
                5: 5,
                50: 50,
                87: 87
            }],
            42: [function(t, e, n) {
                "use strict";

                function r(t) {
                    if (t && t.__esModule) return t;
                    var e = {};
                    if (null != t)
                        for (var n in t) Object.prototype.hasOwnProperty.call(t, n) && (e[n] = t[n]);
                    return e["default"] = t, e
                }
                n.__esModule = !0;
                var o = t(82),
                    i = r(o),
                    a = function() {};
                a.prototype.allowedEvents_ = {}, a.prototype.on = function(t, e) {
                    var n = this.addEventListener;
                    this.addEventListener = function() {}, i.on(this, t, e), this.addEventListener = n
                }, a.prototype.addEventListener = a.prototype.on, a.prototype.off = function(t, e) {
                    i.off(this, t, e)
                }, a.prototype.removeEventListener = a.prototype.off, a.prototype.one = function(t, e) {
                    var n = this.addEventListener;
                    this.addEventListener = function() {}, i.one(this, t, e), this.addEventListener = n
                }, a.prototype.trigger = function(t) {
                    var e = t.type || t;
                    "string" == typeof t && (t = {
                        type: e
                    }), t = i.fixEvent(t), this.allowedEvents_[e] && this["on" + e] && this["on" + e](t), i.trigger(this, t)
                }, a.prototype.dispatchEvent = a.prototype.trigger, n["default"] = a
            }, {
                82: 82
            }],
            43: [function(t, e, n) {
                "use strict";

                function r(t) {
                    return t && t.__esModule ? t : {
                        "default": t
                    }
                }
                n.__esModule = !0;
                var o = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(t) {
                        return typeof t
                    } : function(t) {
                        return t && "function" == typeof Symbol && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t
                    },
                    i = t(86),
                    a = r(i),
                    s = t(88),
                    u = function(t, e) {
                        if ("function" != typeof e && null !== e) throw new TypeError("Super expression must either be null or a function, not " + (void 0 === e ? "undefined" : o(e)));
                        t.prototype = Object.create(e && e.prototype, {
                            constructor: {
                                value: t,
                                enumerable: !1,
                                writable: !0,
                                configurable: !0
                            }
                        }), e && (t.super_ = e)
                    },
                    l = function(t) {
                        var e = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {},
                            n = function() {
                                t.apply(this, arguments)
                            },
                            r = {};
                        (0, s.isObject)(e) ? ("function" == typeof e.init && (a["default"].warn("Constructor logic via init() is deprecated; please use constructor() instead."), e.constructor = e.init), e.constructor !== Object.prototype.constructor && (n = e.constructor), r = e) : "function" == typeof e && (n = e), u(n, t);
                        for (var o in r) r.hasOwnProperty(o) && (n.prototype[o] = r[o]);
                        return n
                    };
                n["default"] = l
            }, {
                86: 86,
                88: 88
            }],
            44: [function(t, e, n) {
                "use strict";

                function r(t) {
                    return t && t.__esModule ? t : {
                        "default": t
                    }
                }
                n.__esModule = !0;
                for (var o = t(94), i = r(o), a = {}, s = [
                        ["requestFullscreen", "exitFullscreen", "fullscreenElement", "fullscreenEnabled", "fullscreenchange", "fullscreenerror"],
                        ["webkitRequestFullscreen", "webkitExitFullscreen", "webkitFullscreenElement", "webkitFullscreenEnabled", "webkitfullscreenchange", "webkitfullscreenerror"],
                        ["webkitRequestFullScreen", "webkitCancelFullScreen", "webkitCurrentFullScreenElement", "webkitCancelFullScreen", "webkitfullscreenchange", "webkitfullscreenerror"],
                        ["mozRequestFullScreen", "mozCancelFullScreen", "mozFullScreenElement", "mozFullScreenEnabled", "mozfullscreenchange", "mozfullscreenerror"],
                        ["msRequestFullscreen", "msExitFullscreen", "msFullscreenElement", "msFullscreenEnabled", "MSFullscreenChange", "MSFullscreenError"]
                    ], u = s[0], l = void 0, c = 0; c < s.length; c++)
                    if (s[c][1] in i["default"]) {
                        l = s[c];
                        break
                    } if (l)
                    for (var f = 0; f < l.length; f++) a[u[f]] = l[f];
                n["default"] = a
            }, {
                94: 94
            }],
            45: [function(t, e, n) {
                "use strict";

                function r(t) {
                    return t && t.__esModule ? t : {
                        "default": t
                    }
                }

                function o(t, e) {
                    if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function")
                }

                function i(t, e) {
                    if (!t) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
                    return !e || "object" != typeof e && "function" != typeof e ? t : e
                }

                function a(t, e) {
                    if ("function" != typeof e && null !== e) throw new TypeError("Super expression must either be null or a function, not " + typeof e);
                    t.prototype = Object.create(e && e.prototype, {
                        constructor: {
                            value: t,
                            enumerable: !1,
                            writable: !0,
                            configurable: !0
                        }
                    }), e && (Object.setPrototypeOf ? Object.setPrototypeOf(t, e) : t.__proto__ = e)
                }
                n.__esModule = !0;
                var s = t(5),
                    u = r(s),
                    l = function(t) {
                        function e() {
                            return o(this, e), i(this, t.apply(this, arguments))
                        }
                        return a(e, t), e.prototype.createEl = function() {
                            return t.prototype.createEl.call(this, "div", {
                                className: "vjs-loading-spinner",
                                dir: "ltr"
                            })
                        }, e
                    }(u["default"]);
                u["default"].registerComponent("LoadingSpinner", l), n["default"] = l
            }, {
                5: 5
            }],
            46: [function(t, e, n) {
                "use strict";

                function r(t) {
                    return t instanceof r ? t : ("number" == typeof t ? this.code = t : "string" == typeof t ? this.message = t : (0, o.isObject)(t) && ("number" == typeof t.code && (this.code = t.code), (0, o.assign)(this, t)), void(this.message || (this.message = r.defaultMessages[this.code] || "")))
                }
                n.__esModule = !0;
                var o = t(88);
                r.prototype.code = 0, r.prototype.message = "", r.prototype.status = null, r.errorTypes = ["MEDIA_ERR_CUSTOM", "MEDIA_ERR_ABORTED", "MEDIA_ERR_NETWORK", "MEDIA_ERR_DECODE", "MEDIA_ERR_SRC_NOT_SUPPORTED", "MEDIA_ERR_ENCRYPTED"], r.defaultMessages = {
                    1: "You aborted the media playback",
                    2: "A network error caused the media download to fail part-way.",
                    3: "The media playback was aborted due to a corruption problem or because the media used features your browser did not support.",
                    4: "The media could not be loaded, either because the server or network failed or because the format is not supported.",
                    5: "The media is encrypted and we do not have the keys to decrypt it."
                };
                for (var i = 0; i < r.errorTypes.length; i++) r[r.errorTypes[i]] = i, r.prototype[r.errorTypes[i]] = i;
                n["default"] = r
            }, {
                88: 88
            }],
            47: [function(t, e, n) {
                "use strict";

                function r(t) {
                    if (t && t.__esModule) return t;
                    var e = {};
                    if (null != t)
                        for (var n in t) Object.prototype.hasOwnProperty.call(t, n) && (e[n] = t[n]);
                    return e["default"] = t, e
                }

                function o(t) {
                    return t && t.__esModule ? t : {
                        "default": t
                    }
                }

                function i(t, e) {
                    if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function")
                }

                function a(t, e) {
                    if (!t) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
                    return !e || "object" != typeof e && "function" != typeof e ? t : e
                }

                function s(t, e) {
                    if ("function" != typeof e && null !== e) throw new TypeError("Super expression must either be null or a function, not " + typeof e);
                    t.prototype = Object.create(e && e.prototype, {
                        constructor: {
                            value: t,
                            enumerable: !1,
                            writable: !0,
                            configurable: !0
                        }
                    }), e && (Object.setPrototypeOf ? Object.setPrototypeOf(t, e) : t.__proto__ = e)
                }
                n.__esModule = !0;
                var u = t(3),
                    l = o(u),
                    c = t(5),
                    f = o(c),
                    p = t(49),
                    h = o(p),
                    d = t(81),
                    y = r(d),
                    v = t(83),
                    g = r(v),
                    m = t(91),
                    b = o(m),
                    _ = function(t) {
                        function e(n) {
                            var r = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {};
                            i(this, e);
                            var o = a(this, t.call(this, n, r));
                            return o.update(), o.enabled_ = !0, o.el_.setAttribute("aria-haspopup", "true"), o.el_.setAttribute("role", "menuitem"), o.on("keydown", o.handleSubmenuKeyPress), o
                        }
                        return s(e, t), e.prototype.update = function() {
                            var t = this.createMenu();
                            this.menu && this.removeChild(this.menu), this.menu = t, this.addChild(t), this.buttonPressed_ = !1, this.el_.setAttribute("aria-expanded", "false"), this.items && this.items.length <= this.hideThreshold_ ? this.hide() : this.show()
                        }, e.prototype.createMenu = function() {
                            var t = new h["default"](this.player_);
                            if (this.hideThreshold_ = 0, this.options_.title) {
                                var e = y.createEl("li", {
                                    className: "vjs-menu-title",
                                    innerHTML: (0, b["default"])(this.options_.title),
                                    tabIndex: -1
                                });
                                this.hideThreshold_ += 1, t.children_.unshift(e), y.insertElFirst(e, t.contentEl())
                            }
                            if (this.items = this.createItems(), this.items)
                                for (var n = 0; n < this.items.length; n++) t.addItem(this.items[n]);
                            return t
                        }, e.prototype.createItems = function() {}, e.prototype.createEl = function() {
                            return t.prototype.createEl.call(this, "div", {
                                className: this.buildCSSClass()
                            })
                        }, e.prototype.buildCSSClass = function() {
                            var e = "vjs-menu-button";
                            return e += this.options_.inline === !0 ? "-inline" : "-popup", "vjs-menu-button " + e + " " + t.prototype.buildCSSClass.call(this)
                        }, e.prototype.handleClick = function(t) {
                            this.one(this.menu.contentEl(), "mouseleave", g.bind(this, function(t) {
                                this.unpressButton(), this.el_.blur()
                            })), this.buttonPressed_ ? this.unpressButton() : this.pressButton()
                        }, e.prototype.handleKeyPress = function(e) {
                            27 === e.which || 9 === e.which ? (this.buttonPressed_ && this.unpressButton(), 9 !== e.which && e.preventDefault()) : 38 === e.which || 40 === e.which ? this.buttonPressed_ || (this.pressButton(), e.preventDefault()) : t.prototype.handleKeyPress.call(this, e)
                        }, e.prototype.handleSubmenuKeyPress = function(t) {
                            27 !== t.which && 9 !== t.which || (this.buttonPressed_ && this.unpressButton(), 9 !== t.which && t.preventDefault())
                        }, e.prototype.pressButton = function() {
                            this.enabled_ && (this.buttonPressed_ = !0, this.menu.lockShowing(), this.el_.setAttribute("aria-expanded", "true"), this.menu.focus())
                        }, e.prototype.unpressButton = function() {
                            this.enabled_ && (this.buttonPressed_ = !1, this.menu.unlockShowing(), this.el_.setAttribute("aria-expanded", "false"), this.el_.focus())
                        }, e.prototype.disable = function() {
                            return this.buttonPressed_ = !1, this.menu.unlockShowing(), this.el_.setAttribute("aria-expanded", "false"), this.enabled_ = !1, t.prototype.disable.call(this)
                        }, e.prototype.enable = function() {
                            return this.enabled_ = !0, t.prototype.enable.call(this)
                        }, e
                    }(l["default"]);
                f["default"].registerComponent("MenuButton", _), n["default"] = _
            }, {
                3: 3,
                49: 49,
                5: 5,
                81: 81,
                83: 83,
                91: 91
            }],
            48: [function(t, e, n) {
                "use strict";

                function r(t) {
                    return t && t.__esModule ? t : {
                        "default": t
                    }
                }

                function o(t, e) {
                    if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function")
                }

                function i(t, e) {
                    if (!t) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
                    return !e || "object" != typeof e && "function" != typeof e ? t : e
                }

                function a(t, e) {
                    if ("function" != typeof e && null !== e) throw new TypeError("Super expression must either be null or a function, not " + typeof e);
                    t.prototype = Object.create(e && e.prototype, {
                        constructor: {
                            value: t,
                            enumerable: !1,
                            writable: !0,
                            configurable: !0
                        }
                    }), e && (Object.setPrototypeOf ? Object.setPrototypeOf(t, e) : t.__proto__ = e)
                }
                n.__esModule = !0;
                var s = t(3),
                    u = r(s),
                    l = t(5),
                    c = r(l),
                    f = t(88),
                    p = function(t) {
                        function e(n, r) {
                            o(this, e);
                            var a = i(this, t.call(this, n, r));
                            return a.selectable = r.selectable, a.selected(r.selected), a.selectable ? a.el_.setAttribute("role", "menuitemcheckbox") : a.el_.setAttribute("role", "menuitem"), a
                        }
                        return a(e, t), e.prototype.createEl = function(e, n, r) {
                            return this.nonIconControl = !0, t.prototype.createEl.call(this, "li", (0, f.assign)({
                                className: "vjs-menu-item",
                                innerHTML: this.localize(this.options_.label),
                                tabIndex: -1
                            }, n), r)
                        }, e.prototype.handleClick = function(t) {
                            this.selected(!0)
                        }, e.prototype.selected = function(t) {
                            this.selectable && (t ? (this.addClass("vjs-selected"), this.el_.setAttribute("aria-checked", "true"), this.controlText(", selected")) : (this.removeClass("vjs-selected"), this.el_.setAttribute("aria-checked", "false"), this.controlText(" ")))
                        }, e
                    }(u["default"]);
                c["default"].registerComponent("MenuItem", p), n["default"] = p
            }, {
                3: 3,
                5: 5,
                88: 88
            }],
            49: [function(t, e, n) {
                "use strict";

                function r(t) {
                    if (t && t.__esModule) return t;
                    var e = {};
                    if (null != t)
                        for (var n in t) Object.prototype.hasOwnProperty.call(t, n) && (e[n] = t[n]);
                    return e["default"] = t, e
                }

                function o(t) {
                    return t && t.__esModule ? t : {
                        "default": t
                    }
                }

                function i(t, e) {
                    if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function")
                }

                function a(t, e) {
                    if (!t) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
                    return !e || "object" != typeof e && "function" != typeof e ? t : e
                }

                function s(t, e) {
                    if ("function" != typeof e && null !== e) throw new TypeError("Super expression must either be null or a function, not " + typeof e);
                    t.prototype = Object.create(e && e.prototype, {
                        constructor: {
                            value: t,
                            enumerable: !1,
                            writable: !0,
                            configurable: !0
                        }
                    }), e && (Object.setPrototypeOf ? Object.setPrototypeOf(t, e) : t.__proto__ = e)
                }
                n.__esModule = !0;
                var u = t(5),
                    l = o(u),
                    c = t(81),
                    f = r(c),
                    p = t(83),
                    h = r(p),
                    d = t(82),
                    y = r(d),
                    v = function(t) {
                        function e(n, r) {
                            i(this, e);
                            var o = a(this, t.call(this, n, r));
                            return o.focusedChild_ = -1, o.on("keydown", o.handleKeyPress), o
                        }
                        return s(e, t), e.prototype.addItem = function(t) {
                            this.addChild(t), t.on("click", h.bind(this, function(t) {
                                this.unlockShowing()
                            }))
                        }, e.prototype.createEl = function() {
                            var e = this.options_.contentElType || "ul";
                            this.contentEl_ = f.createEl(e, {
                                className: "vjs-menu-content"
                            }), this.contentEl_.setAttribute("role", "menu");
                            var n = t.prototype.createEl.call(this, "div", {
                                append: this.contentEl_,
                                className: "vjs-menu"
                            });
                            return n.setAttribute("role", "presentation"), n.appendChild(this.contentEl_), y.on(n, "click", function(t) {
                                t.preventDefault(), t.stopImmediatePropagation()
                            }), n
                        }, e.prototype.handleKeyPress = function(t) {
                            37 === t.which || 40 === t.which ? (t.preventDefault(), this.stepForward()) : 38 !== t.which && 39 !== t.which || (t.preventDefault(), this.stepBack())
                        }, e.prototype.stepForward = function() {
                            var t = 0;
                            void 0 !== this.focusedChild_ && (t = this.focusedChild_ + 1), this.focus(t)
                        }, e.prototype.stepBack = function() {
                            var t = 0;
                            void 0 !== this.focusedChild_ && (t = this.focusedChild_ - 1), this.focus(t)
                        }, e.prototype.focus = function() {
                            var t = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : 0,
                                e = this.children().slice();
                            e.length && e[0].className && /vjs-menu-title/.test(e[0].className) && e.shift(), e.length > 0 && (t < 0 ? t = 0 : t >= e.length && (t = e.length - 1), this.focusedChild_ = t, e[t].el_.focus())
                        }, e
                    }(l["default"]);
                l["default"].registerComponent("Menu", v), n["default"] = v
            }, {
                5: 5,
                81: 81,
                82: 82,
                83: 83
            }],
            50: [function(t, e, n) {
                "use strict";

                function r(t) {
                    return t && t.__esModule ? t : {
                        "default": t
                    }
                }

                function o(t) {
                    if (t && t.__esModule) return t;
                    var e = {};
                    if (null != t)
                        for (var n in t) Object.prototype.hasOwnProperty.call(t, n) && (e[n] = t[n]);
                    return e["default"] = t, e
                }

                function i(t, e) {
                    if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function")
                }

                function a(t, e) {
                    if (!t) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
                    return !e || "object" != typeof e && "function" != typeof e ? t : e
                }

                function s(t, e) {
                    if ("function" != typeof e && null !== e) throw new TypeError("Super expression must either be null or a function, not " + typeof e);
                    t.prototype = Object.create(e && e.prototype, {
                        constructor: {
                            value: t,
                            enumerable: !1,
                            writable: !0,
                            configurable: !0
                        }
                    }), e && (Object.setPrototypeOf ? Object.setPrototypeOf(t, e) : t.__proto__ = e)
                }
                n.__esModule = !0;
                var u = t(81),
                    l = o(u),
                    c = t(83),
                    f = o(c),
                    p = t(5),
                    h = r(p),
                    d = function(t) {
                        function e(n, r) {
                            i(this, e);
                            var o = a(this, t.call(this, n, r));
                            return o.opened_ = o.hasBeenOpened_ = o.hasBeenFilled_ = !1, o.closeable(!o.options_.uncloseable), o.content(o.options_.content), o.contentEl_ = l.createEl("div", {
                                className: "vjs-modal-dialog-content"
                            }, {
                                role: "document"
                            }), o.descEl_ = l.createEl("p", {
                                className: "vjs-modal-dialog-description vjs-offscreen",
                                id: o.el().getAttribute("aria-describedby")
                            }), l.textContent(o.descEl_, o.description()), o.el_.appendChild(o.descEl_), o.el_.appendChild(o.contentEl_), o
                        }
                        return s(e, t), e.prototype.createEl = function() {
                            return t.prototype.createEl.call(this, "div", {
                                className: this.buildCSSClass(),
                                tabIndex: -1
                            }, {
                                "aria-describedby": this.id() + "_description",
                                "aria-hidden": "true",
                                "aria-label": this.label(),
                                role: "dialog"
                            })
                        }, e.prototype.buildCSSClass = function() {
                            return "vjs-modal-dialog vjs-hidden " + t.prototype.buildCSSClass.call(this)
                        }, e.prototype.handleKeyPress = function(t) {
                            27 === t.which && this.closeable() && this.close()
                        }, e.prototype.label = function() {
                            return this.options_.label || this.localize("Modal Window")
                        }, e.prototype.description = function() {
                            var t = this.options_.description || this.localize("This is a modal window.");
                            return this.closeable() && (t += " " + this.localize("This modal can be closed by pressing the Escape key or activating the close button.")), t
                        }, e.prototype.open = function() {
                            if (!this.opened_) {
                                var t = this.player();
                                this.trigger("beforemodalopen"), this.opened_ = !0, (this.options_.fillAlways || !this.hasBeenOpened_ && !this.hasBeenFilled_) && this.fill(), this.wasPlaying_ = !t.paused(), this.options_.pauseOnOpen && this.wasPlaying_ && t.pause(), this.closeable() && this.on(this.el_.ownerDocument, "keydown", f.bind(this, this.handleKeyPress)), t.controls(!1), this.show(), this.el().setAttribute("aria-hidden", "false"), this.trigger("modalopen"), this.hasBeenOpened_ = !0
                            }
                            return this
                        }, e.prototype.opened = function(t) {
                            return "boolean" == typeof t && this[t ? "open" : "close"](), this.opened_
                        }, e.prototype.close = function() {
                            if (this.opened_) {
                                var t = this.player();
                                this.trigger("beforemodalclose"), this.opened_ = !1, this.wasPlaying_ && this.options_.pauseOnOpen && t.play(), this.closeable() && this.off(this.el_.ownerDocument, "keydown", f.bind(this, this.handleKeyPress)), t.controls(!0), this.hide(), this.el().setAttribute("aria-hidden", "true"), this.trigger("modalclose"), this.options_.temporary && this.dispose()
                            }
                            return this
                        }, e.prototype.closeable = function n(t) {
                            if ("boolean" == typeof t) {
                                var n = this.closeable_ = !!t,
                                    e = this.getChild("closeButton");
                                if (n && !e) {
                                    var r = this.contentEl_;
                                    this.contentEl_ = this.el_, e = this.addChild("closeButton", {
                                        controlText: "Close Modal Dialog"
                                    }), this.contentEl_ = r, this.on(e, "close", this.close)
                                }!n && e && (this.off(e, "close", this.close), this.removeChild(e), e.dispose())
                            }
                            return this.closeable_
                        }, e.prototype.fill = function() {
                            return this.fillWith(this.content())
                        }, e.prototype.fillWith = function(t) {
                            var e = this.contentEl(),
                                n = e.parentNode,
                                r = e.nextSibling;
                            return this.trigger("beforemodalfill"), this.hasBeenFilled_ = !0, n.removeChild(e), this.empty(),
                                l.insertContent(e, t), this.trigger("modalfill"), r ? n.insertBefore(e, r) : n.appendChild(e), this
                        }, e.prototype.empty = function() {
                            return this.trigger("beforemodalempty"), l.emptyEl(this.contentEl()), this.trigger("modalempty"), this
                        }, e.prototype.content = function(t) {
                            return void 0 !== t && (this.content_ = t), this.content_
                        }, e
                    }(h["default"]);
                d.prototype.options_ = {
                    pauseOnOpen: !0,
                    temporary: !0
                }, h["default"].registerComponent("ModalDialog", d), n["default"] = d
            }, {
                5: 5,
                81: 81,
                83: 83
            }],
            51: [function(t, e, n) {
                "use strict";

                function r(t) {
                    if (t && t.__esModule) return t;
                    var e = {};
                    if (null != t)
                        for (var n in t) Object.prototype.hasOwnProperty.call(t, n) && (e[n] = t[n]);
                    return e["default"] = t, e
                }

                function o(t) {
                    return t && t.__esModule ? t : {
                        "default": t
                    }
                }

                function i(t, e) {
                    if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function")
                }

                function a(t, e) {
                    if (!t) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
                    return !e || "object" != typeof e && "function" != typeof e ? t : e
                }

                function s(t, e) {
                    if ("function" != typeof e && null !== e) throw new TypeError("Super expression must either be null or a function, not " + typeof e);
                    t.prototype = Object.create(e && e.prototype, {
                        constructor: {
                            value: t,
                            enumerable: !1,
                            writable: !0,
                            configurable: !0
                        }
                    }), e && (Object.setPrototypeOf ? Object.setPrototypeOf(t, e) : t.__proto__ = e)
                }
                n.__esModule = !0;
                var u = t(5),
                    l = o(u),
                    c = t(94),
                    f = o(c),
                    p = t(95),
                    h = o(p),
                    d = t(82),
                    y = r(d),
                    v = t(81),
                    g = r(v),
                    m = t(83),
                    b = r(m),
                    _ = t(85),
                    w = r(_),
                    T = t(78),
                    E = r(T),
                    x = t(86),
                    C = o(x),
                    k = t(91),
                    S = o(k),
                    j = t(90),
                    O = t(79),
                    P = t(89),
                    M = r(P),
                    A = t(44),
                    N = o(A),
                    D = t(46),
                    L = o(D),
                    I = t(97),
                    R = o(I),
                    F = t(88),
                    H = t(87),
                    B = o(H),
                    z = t(69),
                    U = o(z),
                    V = t(50),
                    q = o(V),
                    W = t(62),
                    $ = o(W),
                    X = t(63),
                    G = o(X),
                    Y = t(76),
                    Q = o(Y);
                t(61), t(59), t(55), t(68), t(45), t(1), t(4), t(8), t(41), t(71), t(60);
                var K = ["progress", "abort", "suspend", "emptied", "stalled", "loadedmetadata", "loadeddata", "timeupdate", "ratechange", "volumechange", "texttrackchange"],
                    J = function(t) {
                        function e(n, r, o) {
                            if (i(this, e), n.id = n.id || "vjs_video_" + w.newGUID(), r = (0, F.assign)(e.getTagSettings(n), r), r.initChildren = !1, r.createEl = !1, r.reportTouchActivity = !1, !r.language)
                                if ("function" == typeof n.closest) {
                                    var s = n.closest("[lang]");
                                    s && (r.language = s.getAttribute("lang"))
                                } else
                                    for (var u = n; u && 1 === u.nodeType;) {
                                        if (g.getElAttributes(u).hasOwnProperty("lang")) {
                                            r.language = u.getAttribute("lang");
                                            break
                                        }
                                        u = u.parentNode
                                    }
                            var l = a(this, t.call(this, null, r, o));
                            if (!l.options_ || !l.options_.techOrder || !l.options_.techOrder.length) throw new Error("No techOrder specified. Did you overwrite videojs.options instead of just changing the properties you want to override?");
                            if (l.tag = n, l.tagAttributes = n && g.getElAttributes(n), l.language(l.options_.language), r.languages) {
                                var c = {};
                                Object.getOwnPropertyNames(r.languages).forEach(function(t) {
                                    c[t.toLowerCase()] = r.languages[t]
                                }), l.languages_ = c
                            } else l.languages_ = e.prototype.options_.languages;
                            l.cache_ = {}, l.poster_ = r.poster || "", l.controls_ = !!r.controls, n.controls = !1, l.scrubbing_ = !1, l.el_ = l.createEl();
                            var f = (0, B["default"])(l.options_);
                            if (r.plugins) {
                                var p = r.plugins;
                                Object.getOwnPropertyNames(p).forEach(function(t) {
                                    "function" == typeof this[t] ? this[t](p[t]) : C["default"].error("Unable to find plugin:", t)
                                }, l)
                            }
                            return l.options_.playerOptions = f, l.initChildren(), l.isAudio("audio" === n.nodeName.toLowerCase()), l.controls() ? l.addClass("vjs-controls-enabled") : l.addClass("vjs-controls-disabled"), l.el_.setAttribute("role", "region"), l.isAudio() ? l.el_.setAttribute("aria-label", "audio player") : l.el_.setAttribute("aria-label", "video player"), l.isAudio() && l.addClass("vjs-audio"), l.flexNotSupported_() && l.addClass("vjs-no-flex"), E.IS_IOS || l.addClass("vjs-workinghover"), e.players[l.id_] = l, l.userActive(!0), l.reportUserActivity(), l.listenForUserActivity_(), l.on("fullscreenchange", l.handleFullscreenChange_), l.on("stageclick", l.handleStageClick_), l
                        }
                        return s(e, t), e.prototype.dispose = function() {
                            this.trigger("dispose"), this.off("dispose"), this.styleEl_ && this.styleEl_.parentNode && this.styleEl_.parentNode.removeChild(this.styleEl_), e.players[this.id_] = null, this.tag && this.tag.player && (this.tag.player = null), this.el_ && this.el_.player && (this.el_.player = null), this.tech_ && this.tech_.dispose(), t.prototype.dispose.call(this)
                        }, e.prototype.createEl = function() {
                            var e = this.tag,
                                n = void 0,
                                r = this.playerElIngest_ = e.parentNode && e.parentNode.hasAttribute && e.parentNode.hasAttribute("data-vjs-player");
                            n = this.el_ = r ? e.parentNode : t.prototype.createEl.call(this, "div"), e.setAttribute("tabindex", "-1"), e.removeAttribute("width"), e.removeAttribute("height");
                            var o = g.getElAttributes(e);
                            if (Object.getOwnPropertyNames(o).forEach(function(t) {
                                    "class" === t ? n.className += " " + o[t] : n.setAttribute(t, o[t])
                                }), e.playerId = e.id, e.id += "_html5_api", e.className = "vjs-tech", e.player = n.player = this, this.addClass("vjs-paused"), h["default"].VIDEOJS_NO_DYNAMIC_STYLE !== !0) {
                                this.styleEl_ = M.createStyleElement("vjs-styles-dimensions");
                                var i = g.$(".vjs-styles-defaults"),
                                    a = g.$("head");
                                a.insertBefore(this.styleEl_, i ? i.nextSibling : a.firstChild)
                            }
                            this.width(this.options_.width), this.height(this.options_.height), this.fluid(this.options_.fluid), this.aspectRatio(this.options_.aspectRatio);
                            for (var s = e.getElementsByTagName("a"), u = 0; u < s.length; u++) {
                                var l = s.item(u);
                                g.addElClass(l, "vjs-hidden"), l.setAttribute("hidden", "hidden")
                            }
                            return e.initNetworkState_ = e.networkState, e.parentNode && !r && e.parentNode.insertBefore(n, e), g.insertElFirst(e, n), this.children_.unshift(e), this.el_ = n, n
                        }, e.prototype.width = function(t) {
                            return this.dimension("width", t)
                        }, e.prototype.height = function(t) {
                            return this.dimension("height", t)
                        }, e.prototype.dimension = function(t, e) {
                            var n = t + "_";
                            if (void 0 === e) return this[n] || 0;
                            if ("" === e) this[n] = void 0;
                            else {
                                var r = parseFloat(e);
                                if (isNaN(r)) return C["default"].error('Improper value "' + e + '" supplied for for ' + t), this;
                                this[n] = r
                            }
                            return this.updateStyleEl_(), this
                        }, e.prototype.fluid = function(t) {
                            return void 0 === t ? !!this.fluid_ : (this.fluid_ = !!t, t ? this.addClass("vjs-fluid") : this.removeClass("vjs-fluid"), this.updateStyleEl_(), void 0)
                        }, e.prototype.aspectRatio = function(t) {
                            if (void 0 === t) return this.aspectRatio_;
                            if (!/^\d+\:\d+$/.test(t)) throw new Error("Improper value supplied for aspect ratio. The format should be width:height, for example 16:9.");
                            this.aspectRatio_ = t, this.fluid(!0), this.updateStyleEl_()
                        }, e.prototype.updateStyleEl_ = function() {
                            if (h["default"].VIDEOJS_NO_DYNAMIC_STYLE === !0) {
                                var t = "number" == typeof this.width_ ? this.width_ : this.options_.width,
                                    e = "number" == typeof this.height_ ? this.height_ : this.options_.height,
                                    n = this.tech_ && this.tech_.el();
                                return void(n && (t >= 0 && (n.width = t), e >= 0 && (n.height = e)))
                            }
                            var r = void 0,
                                o = void 0,
                                i = void 0,
                                a = void 0;
                            i = void 0 !== this.aspectRatio_ && "auto" !== this.aspectRatio_ ? this.aspectRatio_ : this.videoWidth() > 0 ? this.videoWidth() + ":" + this.videoHeight() : "16:9";
                            var s = i.split(":"),
                                u = s[1] / s[0];
                            r = void 0 !== this.width_ ? this.width_ : void 0 !== this.height_ ? this.height_ / u : this.videoWidth() || 300, o = void 0 !== this.height_ ? this.height_ : r * u, a = /^[^a-zA-Z]/.test(this.id()) ? "dimensions-" + this.id() : this.id() + "-dimensions", this.addClass(a), M.setTextContent(this.styleEl_, "\n      ." + a + " {\n        width: " + r + "px;\n        height: " + o + "px;\n      }\n\n      ." + a + ".vjs-fluid {\n        padding-top: " + 100 * u + "%;\n      }\n    ")
                        }, e.prototype.loadTech_ = function(t, e) {
                            var n = this;
                            this.tech_ && this.unloadTech_(), "Html5" !== t && this.tag && ($["default"].getTech("Html5").disposeMediaElement(this.tag), this.tag.player = null, this.tag = null), this.techName_ = t, this.isReady_ = !1;
                            var r = (0, F.assign)({
                                source: e,
                                nativeControlsForTouch: this.options_.nativeControlsForTouch,
                                playerId: this.id(),
                                techId: this.id() + "_" + t + "_api",
                                videoTracks: this.videoTracks_,
                                textTracks: this.textTracks_,
                                audioTracks: this.audioTracks_,
                                autoplay: this.options_.autoplay,
                                preload: this.options_.preload,
                                loop: this.options_.loop,
                                muted: this.options_.muted,
                                poster: this.poster(),
                                language: this.language(),
                                playerElIngest: this.playerElIngest_ || !1,
                                "vtt.js": this.options_["vtt.js"]
                            }, this.options_[t.toLowerCase()]);
                            this.tag && (r.tag = this.tag), e && (this.currentType_ = e.type, e.src === this.cache_.src && this.cache_.currentTime > 0 && (r.startTime = this.cache_.currentTime), this.cache_.sources = null, this.cache_.source = e, this.cache_.src = e.src);
                            var o = $["default"].getTech(t);
                            o || (o = l["default"].getComponent(t)), this.tech_ = new o(r), this.tech_.ready(b.bind(this, this.handleTechReady_), !0), U["default"].jsonToTextTracks(this.textTracksJson_ || [], this.tech_), K.forEach(function(t) {
                                n.on(n.tech_, t, n["handleTech" + (0, S["default"])(t) + "_"])
                            }), this.on(this.tech_, "loadstart", this.handleTechLoadStart_), this.on(this.tech_, "waiting", this.handleTechWaiting_), this.on(this.tech_, "canplay", this.handleTechCanPlay_), this.on(this.tech_, "canplaythrough", this.handleTechCanPlayThrough_), this.on(this.tech_, "playing", this.handleTechPlaying_), this.on(this.tech_, "ended", this.handleTechEnded_), this.on(this.tech_, "seeking", this.handleTechSeeking_), this.on(this.tech_, "seeked", this.handleTechSeeked_), this.on(this.tech_, "play", this.handleTechPlay_), this.on(this.tech_, "firstplay", this.handleTechFirstPlay_), this.on(this.tech_, "pause", this.handleTechPause_), this.on(this.tech_, "durationchange", this.handleTechDurationChange_), this.on(this.tech_, "fullscreenchange", this.handleTechFullscreenChange_), this.on(this.tech_, "error", this.handleTechError_), this.on(this.tech_, "loadedmetadata", this.updateStyleEl_), this.on(this.tech_, "posterchange", this.handleTechPosterChange_), this.on(this.tech_, "textdata", this.handleTechTextData_), this.usingNativeControls(this.techGet_("controls")), this.controls() && !this.usingNativeControls() && this.addTechControlsListeners_(), this.tech_.el().parentNode === this.el() || "Html5" === t && this.tag || g.insertElFirst(this.tech_.el(), this.el()), this.tag && (this.tag.player = null, this.tag = null)
                        }, e.prototype.unloadTech_ = function() {
                            this.videoTracks_ = this.videoTracks(), this.textTracks_ = this.textTracks(), this.audioTracks_ = this.audioTracks(), this.textTracksJson_ = U["default"].textTracksToJson(this.tech_), this.isReady_ = !1, this.tech_.dispose(), this.tech_ = !1
                        }, e.prototype.tech = function(t) {
                            if (t && t.IWillNotUseThisInPlugins) return this.tech_;
                            var e = "\n      Please make sure that you are not using this inside of a plugin.\n      To disable this alert and error, please pass in an object with\n      `IWillNotUseThisInPlugins` to the `tech` method. See\n      https://github.com/videojs/video.js/issues/2617 for more info.\n    ";
                            throw h["default"].alert(e), new Error(e)
                        }, e.prototype.addTechControlsListeners_ = function() {
                            this.removeTechControlsListeners_(), this.on(this.tech_, "mousedown", this.handleTechClick_), this.on(this.tech_, "touchstart", this.handleTechTouchStart_), this.on(this.tech_, "touchmove", this.handleTechTouchMove_), this.on(this.tech_, "touchend", this.handleTechTouchEnd_), this.on(this.tech_, "tap", this.handleTechTap_)
                        }, e.prototype.removeTechControlsListeners_ = function() {
                            this.off(this.tech_, "tap", this.handleTechTap_), this.off(this.tech_, "touchstart", this.handleTechTouchStart_), this.off(this.tech_, "touchmove", this.handleTechTouchMove_), this.off(this.tech_, "touchend", this.handleTechTouchEnd_), this.off(this.tech_, "mousedown", this.handleTechClick_)
                        }, e.prototype.handleTechReady_ = function() {
                            if (this.triggerReady(), this.cache_.volume && this.techCall_("setVolume", this.cache_.volume), this.handleTechPosterChange_(), this.handleTechDurationChange_(), (this.src() || this.currentSrc()) && this.tag && this.options_.autoplay && this.paused()) {
                                try {
                                    delete this.tag.poster
                                } catch (t) {
                                    (0, C["default"])("deleting tag.poster throws in some browsers", t)
                                }
                                this.play()
                            }
                        }, e.prototype.handleTechLoadStart_ = function() {
                            this.removeClass("vjs-ended"), this.removeClass("vjs-seeking"), this.error(null), this.paused() ? (this.hasStarted(!1), this.trigger("loadstart")) : (this.trigger("loadstart"), this.trigger("firstplay"))
                        }, e.prototype.hasStarted = function(t) {
                            return void 0 !== t ? (this.hasStarted_ !== t && (this.hasStarted_ = t, t ? (this.addClass("vjs-has-started"), this.trigger("firstplay")) : this.removeClass("vjs-has-started")), this) : !!this.hasStarted_
                        }, e.prototype.handleTechPlay_ = function() {
                            this.removeClass("vjs-ended"), this.removeClass("vjs-paused"), this.addClass("vjs-playing"), this.hasStarted(!0), this.trigger("play")
                        }, e.prototype.handleTechWaiting_ = function() {
                            var t = this;
                            this.addClass("vjs-waiting"), this.trigger("waiting"), this.one("timeupdate", function() {
                                return t.removeClass("vjs-waiting")
                            })
                        }, e.prototype.handleTechCanPlay_ = function() {
                            this.removeClass("vjs-waiting"), this.trigger("canplay")
                        }, e.prototype.handleTechCanPlayThrough_ = function() {
                            this.removeClass("vjs-waiting"), this.trigger("canplaythrough")
                        }, e.prototype.handleTechPlaying_ = function() {
                            this.removeClass("vjs-waiting"), this.trigger("playing")
                        }, e.prototype.handleTechSeeking_ = function() {
                            this.addClass("vjs-seeking"), this.trigger("seeking")
                        }, e.prototype.handleTechSeeked_ = function() {
                            this.removeClass("vjs-seeking"), this.trigger("seeked")
                        }, e.prototype.handleTechFirstPlay_ = function() {
                            this.options_.starttime && (C["default"].warn("Passing the `starttime` option to the player will be deprecated in 6.0"), this.currentTime(this.options_.starttime)), this.addClass("vjs-has-started"), this.trigger("firstplay")
                        }, e.prototype.handleTechPause_ = function() {
                            this.removeClass("vjs-playing"), this.addClass("vjs-paused"), this.trigger("pause")
                        }, e.prototype.handleTechEnded_ = function() {
                            this.addClass("vjs-ended"), this.options_.loop ? (this.currentTime(0), this.play()) : this.paused() || this.pause(), this.trigger("ended")
                        }, e.prototype.handleTechDurationChange_ = function() {
                            this.duration(this.techGet_("duration"))
                        }, e.prototype.handleTechClick_ = function(t) {
                            0 === t.button && this.controls() && (this.paused() ? this.play() : this.pause())
                        }, e.prototype.handleTechTap_ = function() {
                            this.userActive(!this.userActive())
                        }, e.prototype.handleTechTouchStart_ = function() {
                            this.userWasActive = this.userActive()
                        }, e.prototype.handleTechTouchMove_ = function() {
                            this.userWasActive && this.reportUserActivity()
                        }, e.prototype.handleTechTouchEnd_ = function(t) {
                            t.preventDefault()
                        }, e.prototype.handleFullscreenChange_ = function() {
                            this.isFullscreen() ? this.addClass("vjs-fullscreen") : this.removeClass("vjs-fullscreen")
                        }, e.prototype.handleStageClick_ = function() {
                            this.reportUserActivity()
                        }, e.prototype.handleTechFullscreenChange_ = function(t, e) {
                            e && this.isFullscreen(e.isFullscreen), this.trigger("fullscreenchange")
                        }, e.prototype.handleTechError_ = function() {
                            var t = this.tech_.error();
                            this.error(t)
                        }, e.prototype.handleTechTextData_ = function() {
                            var t = null;
                            arguments.length > 1 && (t = arguments[1]), this.trigger("textdata", t)
                        }, e.prototype.getCache = function() {
                            return this.cache_
                        }, e.prototype.techCall_ = function(t, e) {
                            if (this.tech_ && !this.tech_.isReady_) this.tech_.ready(function() {
                                this[t](e)
                            }, !0);
                            else try {
                                this.tech_ && this.tech_[t](e)
                            } catch (n) {
                                throw (0, C["default"])(n), n
                            }
                        }, e.prototype.techGet_ = function(t) {
                            if (this.tech_ && this.tech_.isReady_) try {
                                return this.tech_[t]()
                            } catch (e) {
                                throw void 0 === this.tech_[t] ? (0, C["default"])("Video.js: " + t + " method not defined for " + this.techName_ + " playback technology.", e) : "TypeError" === e.name ? ((0, C["default"])("Video.js: " + t + " unavailable on " + this.techName_ + " playback technology element.", e), this.tech_.isReady_ = !1) : (0, C["default"])(e), e
                            }
                        }, e.prototype.play = function() {
                            return this.src() || this.currentSrc() ? this.techCall_("play") : this.tech_.one("loadstart", function() {
                                this.play()
                            }), this
                        }, e.prototype.pause = function() {
                            return this.techCall_("pause"), this
                        }, e.prototype.paused = function() {
                            return this.techGet_("paused") !== !1
                        }, e.prototype.scrubbing = function(t) {
                            return void 0 !== t ? (this.scrubbing_ = !!t, t ? this.addClass("vjs-scrubbing") : this.removeClass("vjs-scrubbing"), this) : this.scrubbing_
                        }, e.prototype.currentTime = function(t) {
                            return void 0 !== t ? (this.techCall_("setCurrentTime", t), this) : (this.cache_.currentTime = this.techGet_("currentTime") || 0, this.cache_.currentTime)
                        }, e.prototype.duration = function(t) {
                            return void 0 === t ? this.cache_.duration || 0 : (t = parseFloat(t) || 0, t < 0 && (t = 1 / 0), t !== this.cache_.duration && (this.cache_.duration = t, t === 1 / 0 ? this.addClass("vjs-live") : this.removeClass("vjs-live"), this.trigger("durationchange")), this)
                        }, e.prototype.remainingTime = function() {
                            return this.duration() - this.currentTime()
                        }, e.prototype.buffered = function n() {
                            var n = this.techGet_("buffered");
                            return n && n.length || (n = (0, j.createTimeRange)(0, 0)), n
                        }, e.prototype.bufferedPercent = function() {
                            return (0, O.bufferedPercent)(this.buffered(), this.duration())
                        }, e.prototype.bufferedEnd = function() {
                            var t = this.buffered(),
                                e = this.duration(),
                                n = t.end(t.length - 1);
                            return n > e && (n = e), n
                        }, e.prototype.volume = function(t) {
                            var e = void 0;
                            return void 0 !== t ? (e = Math.max(0, Math.min(1, parseFloat(t))), this.cache_.volume = e, this.techCall_("setVolume", e), this) : (e = parseFloat(this.techGet_("volume")), isNaN(e) ? 1 : e)
                        }, e.prototype.muted = function(t) {
                            return void 0 !== t ? (this.techCall_("setMuted", t), this) : this.techGet_("muted") || !1
                        }, e.prototype.supportsFullScreen = function() {
                            return this.techGet_("supportsFullScreen") || !1
                        }, e.prototype.isFullscreen = function(t) {
                            return void 0 !== t ? (this.isFullscreen_ = !!t, this) : !!this.isFullscreen_
                        }, e.prototype.requestFullscreen = function() {
                            var t = N["default"];
                            return this.isFullscreen(!0), t.requestFullscreen ? (y.on(f["default"], t.fullscreenchange, b.bind(this, function e(n) {
                                this.isFullscreen(f["default"][t.fullscreenElement]), this.isFullscreen() === !1 && y.off(f["default"], t.fullscreenchange, e), this.trigger("fullscreenchange")
                            })), this.el_[t.requestFullscreen]()) : this.tech_.supportsFullScreen() ? this.techCall_("enterFullScreen") : (this.enterFullWindow(), this.trigger("fullscreenchange")), this
                        }, e.prototype.exitFullscreen = function() {
                            var t = N["default"];
                            return this.isFullscreen(!1), t.requestFullscreen ? f["default"][t.exitFullscreen]() : this.tech_.supportsFullScreen() ? this.techCall_("exitFullScreen") : (this.exitFullWindow(), this.trigger("fullscreenchange")), this
                        }, e.prototype.enterFullWindow = function() {
                            this.isFullWindow = !0, this.docOrigOverflow = f["default"].documentElement.style.overflow, y.on(f["default"], "keydown", b.bind(this, this.fullWindowOnEscKey)), f["default"].documentElement.style.overflow = "hidden", g.addElClass(f["default"].body, "vjs-full-window"), this.trigger("enterFullWindow")
                        }, e.prototype.fullWindowOnEscKey = function(t) {
                            27 === t.keyCode && (this.isFullscreen() === !0 ? this.exitFullscreen() : this.exitFullWindow())
                        }, e.prototype.exitFullWindow = function() {
                            this.isFullWindow = !1, y.off(f["default"], "keydown", this.fullWindowOnEscKey), f["default"].documentElement.style.overflow = this.docOrigOverflow, g.removeElClass(f["default"].body, "vjs-full-window"), this.trigger("exitFullWindow")
                        }, e.prototype.canPlayType = function(t) {
                            for (var e = void 0, n = 0, r = this.options_.techOrder; n < r.length; n++) {
                                var o = (0, S["default"])(r[n]),
                                    i = $["default"].getTech(o);
                                if (i || (i = l["default"].getComponent(o)), i) {
                                    if (i.isSupported() && (e = i.canPlayType(t))) return e
                                } else C["default"].error('The "' + o + '" tech is undefined. Skipped browser support check for that tech.')
                            }
                            return ""
                        }, e.prototype.selectSource = function(t) {
                            var e = this,
                                n = this.options_.techOrder.map(S["default"]).map(function(t) {
                                    return [t, $["default"].getTech(t) || l["default"].getComponent(t)]
                                }).filter(function(t) {
                                    var e = t[0],
                                        n = t[1];
                                    return n ? n.isSupported() : (C["default"].error('The "' + e + '" tech is undefined. Skipped browser support check for that tech.'), !1)
                                }),
                                r = function(t, e, n) {
                                    var r = void 0;
                                    return t.some(function(t) {
                                        return e.some(function(e) {
                                            if (r = n(t, e)) return !0
                                        })
                                    }), r
                                },
                                o = void 0,
                                i = function(t) {
                                    return function(e, n) {
                                        return t(n, e)
                                    }
                                },
                                a = function(t, n) {
                                    var r = t[0];
                                    if (t[1].canPlaySource(n, e.options_[r.toLowerCase()])) return {
                                        source: n,
                                        tech: r
                                    }
                                };
                            return o = this.options_.sourceOrder ? r(t, n, i(a)) : r(n, t, a), o || !1
                        }, e.prototype.src = function(t) {
                            if (void 0 === t) return this.techGet_("src");
                            var e = $["default"].getTech(this.techName_);
                            return e || (e = l["default"].getComponent(this.techName_)), Array.isArray(t) ? this.sourceList_(t) : "string" == typeof t ? this.src({
                                src: t
                            }) : t instanceof Object && (t.type && !e.canPlaySource(t, this.options_[this.techName_.toLowerCase()]) ? this.sourceList_([t]) : (this.cache_.sources = null, this.cache_.source = t, this.cache_.src = t.src, this.currentType_ = t.type || "", this.ready(function() {
                                e.prototype.hasOwnProperty("setSource") ? this.techCall_("setSource", t) : this.techCall_("src", t.src), "auto" === this.options_.preload && this.load(), this.options_.autoplay && this.play()
                            }, !0))), this
                        }, e.prototype.sourceList_ = function(t) {
                            var e = this.selectSource(t);
                            e ? (e.tech === this.techName_ ? this.src(e.source) : this.loadTech_(e.tech, e.source), this.cache_.sources = t) : (this.setTimeout(function() {
                                this.error({
                                    code: 4,
                                    message: this.localize(this.options_.notSupportedMessage)
                                })
                            }, 0), this.triggerReady())
                        }, e.prototype.load = function() {
                            return this.techCall_("load"), this
                        }, e.prototype.reset = function() {
                            return this.loadTech_((0, S["default"])(this.options_.techOrder[0]), null), this.techCall_("reset"), this
                        }, e.prototype.currentSources = function() {
                            var t = this.currentSource(),
                                e = [];
                            return 0 !== Object.keys(t).length && e.push(t), this.cache_.sources || e
                        }, e.prototype.currentSource = function() {
                            var t = {},
                                e = this.currentSrc();
                            return e && (t.src = e), this.cache_.source || t
                        }, e.prototype.currentSrc = function() {
                            return this.techGet_("currentSrc") || this.cache_.src || ""
                        }, e.prototype.currentType = function() {
                            return this.currentType_ || ""
                        }, e.prototype.preload = function(t) {
                            return void 0 !== t ? (this.techCall_("setPreload", t), this.options_.preload = t, this) : this.techGet_("preload")
                        }, e.prototype.autoplay = function(t) {
                            return void 0 !== t ? (this.techCall_("setAutoplay", t), this.options_.autoplay = t, this) : this.techGet_("autoplay", t)
                        }, e.prototype.loop = function(t) {
                            return void 0 !== t ? (this.techCall_("setLoop", t), this.options_.loop = t, this) : this.techGet_("loop")
                        }, e.prototype.poster = function(t) {
                            return void 0 === t ? this.poster_ : (t || (t = ""), this.poster_ = t, this.techCall_("setPoster", t), this.trigger("posterchange"), this)
                        }, e.prototype.handleTechPosterChange_ = function() {
                            !this.poster_ && this.tech_ && this.tech_.poster && (this.poster_ = this.tech_.poster() || "", this.trigger("posterchange"))
                        }, e.prototype.controls = function(t) {
                            return void 0 !== t ? (t = !!t, this.controls_ !== t && (this.controls_ = t, this.usingNativeControls() && this.techCall_("setControls", t), t ? (this.removeClass("vjs-controls-disabled"), this.addClass("vjs-controls-enabled"), this.trigger("controlsenabled"), this.usingNativeControls() || this.addTechControlsListeners_()) : (this.removeClass("vjs-controls-enabled"), this.addClass("vjs-controls-disabled"), this.trigger("controlsdisabled"), this.usingNativeControls() || this.removeTechControlsListeners_())), this) : !!this.controls_
                        }, e.prototype.usingNativeControls = function(t) {
                            return void 0 !== t ? (t = !!t, this.usingNativeControls_ !== t && (this.usingNativeControls_ = t, t ? (this.addClass("vjs-using-native-controls"), this.trigger("usingnativecontrols")) : (this.removeClass("vjs-using-native-controls"), this.trigger("usingcustomcontrols"))), this) : !!this.usingNativeControls_
                        }, e.prototype.error = function(t) {
                            return void 0 === t ? this.error_ || null : null === t ? (this.error_ = t, this.removeClass("vjs-error"), this.errorDisplay && this.errorDisplay.close(), this) : (this.error_ = new L["default"](t), this.addClass("vjs-error"), C["default"].error("(CODE:" + this.error_.code + " " + L["default"].errorTypes[this.error_.code] + ")", this.error_.message, this.error_), this.trigger("error"), this)
                        }, e.prototype.reportUserActivity = function(t) {
                            this.userActivity_ = !0
                        }, e.prototype.userActive = function(t) {
                            return void 0 !== t ? (t = !!t, t !== this.userActive_ && (this.userActive_ = t, t ? (this.userActivity_ = !0, this.removeClass("vjs-user-inactive"), this.addClass("vjs-user-active"), this.trigger("useractive")) : (this.userActivity_ = !1, this.tech_ && this.tech_.one("mousemove", function(t) {
                                t.stopPropagation(), t.preventDefault()
                            }), this.removeClass("vjs-user-active"), this.addClass("vjs-user-inactive"), this.trigger("userinactive"))), this) : this.userActive_
                        }, e.prototype.listenForUserActivity_ = function() {
                            var t = void 0,
                                e = void 0,
                                n = void 0,
                                r = b.bind(this, this.reportUserActivity),
                                o = function(t) {
                                    t.screenX === e && t.screenY === n || (e = t.screenX, n = t.screenY, r())
                                },
                                i = function() {
                                    r(), this.clearInterval(t), t = this.setInterval(r, 250)
                                },
                                a = function(e) {
                                    r(), this.clearInterval(t)
                                };
                            this.on("mousedown", i), this.on("mousemove", o), this.on("mouseup", a), this.on("keydown", r), this.on("keyup", r);
                            var s = void 0;
                            this.setInterval(function() {
                                if (this.userActivity_) {
                                    this.userActivity_ = !1, this.userActive(!0), this.clearTimeout(s);
                                    var t = this.options_.inactivityTimeout;
                                    t > 0 && (s = this.setTimeout(function() {
                                        this.userActivity_ || this.userActive(!1)
                                    }, t))
                                }
                            }, 250)
                        }, e.prototype.playbackRate = function(t) {
                            return void 0 !== t ? (this.techCall_("setPlaybackRate", t), this) : this.tech_ && this.tech_.featuresPlaybackRate ? this.techGet_("playbackRate") : 1
                        }, e.prototype.isAudio = function(t) {
                            return void 0 !== t ? (this.isAudio_ = !!t, this) : !!this.isAudio_
                        }, e.prototype.videoTracks = function() {
                            return this.tech_ ? this.tech_.videoTracks() : (this.videoTracks_ = this.videoTracks_ || new Q["default"], this.videoTracks_)
                        }, e.prototype.audioTracks = function() {
                            return this.tech_ ? this.tech_.audioTracks() : (this.audioTracks_ = this.audioTracks_ || new G["default"], this.audioTracks_)
                        }, e.prototype.textTracks = function() {
                            if (this.tech_) return this.tech_.textTracks()
                        }, e.prototype.remoteTextTracks = function() {
                            if (this.tech_) return this.tech_.remoteTextTracks()
                        }, e.prototype.remoteTextTrackEls = function() {
                            if (this.tech_) return this.tech_.remoteTextTrackEls()
                        }, e.prototype.addTextTrack = function(t, e, n) {
                            if (this.tech_) return this.tech_.addTextTrack(t, e, n)
                        }, e.prototype.addRemoteTextTrack = function(t, e) {
                            if (this.tech_) return this.tech_.addRemoteTextTrack(t, e)
                        }, e.prototype.removeRemoteTextTrack = function() {
                            var t = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {},
                                e = t.track,
                                n = void 0 === e ? arguments[0] : e;
                            if (this.tech_) return this.tech_.removeRemoteTextTrack(n)
                        }, e.prototype.videoWidth = function() {
                            return this.tech_ && this.tech_.videoWidth && this.tech_.videoWidth() || 0
                        }, e.prototype.videoHeight = function() {
                            return this.tech_ && this.tech_.videoHeight && this.tech_.videoHeight() || 0
                        }, e.prototype.language = function(t) {
                            return void 0 === t ? this.language_ : (this.language_ = String(t).toLowerCase(), this)
                        }, e.prototype.languages = function() {
                            return (0, B["default"])(e.prototype.options_.languages, this.languages_)
                        }, e.prototype.toJSON = function() {
                            var t = (0, B["default"])(this.options_),
                                e = t.tracks;
                            t.tracks = [];
                            for (var n = 0; n < e.length; n++) {
                                var r = e[n];
                                r = (0, B["default"])(r), r.player = void 0, t.tracks[n] = r
                            }
                            return t
                        }, e.prototype.createModal = function(t, e) {
                            var n = this;
                            e = e || {}, e.content = t || "";
                            var r = new q["default"](this, e);
                            return this.addChild(r), r.on("dispose", function() {
                                n.removeChild(r)
                            }), r.open()
                        }, e.getTagSettings = function(t) {
                            var e = {
                                    sources: [],
                                    tracks: []
                                },
                                n = g.getElAttributes(t),
                                r = n["data-setup"];
                            if (g.hasElClass(t, "vjs-fluid") && (n.fluid = !0), null !== r) {
                                var o = (0, R["default"])(r || "{}"),
                                    i = o[0],
                                    a = o[1];
                                i && C["default"].error(i), (0, F.assign)(n, a)
                            }
                            if ((0, F.assign)(e, n), t.hasChildNodes())
                                for (var s = t.childNodes, u = 0, l = s.length; u < l; u++) {
                                    var c = s[u],
                                        f = c.nodeName.toLowerCase();
                                    "source" === f ? e.sources.push(g.getElAttributes(c)) : "track" === f && e.tracks.push(g.getElAttributes(c))
                                }
                            return e
                        }, e.prototype.flexNotSupported_ = function() {
                            var t = f["default"].createElement("i");
                            return !("flexBasis" in t.style || "webkitFlexBasis" in t.style || "mozFlexBasis" in t.style || "msFlexBasis" in t.style || "msFlexOrder" in t.style)
                        }, e
                    }(l["default"]);
                J.players = {};
                var Z = h["default"].navigator;
                J.prototype.options_ = {
                    techOrder: ["html5", "flash"],
                    html5: {},
                    flash: {},
                    defaultVolume: 0,
                    inactivityTimeout: 2e3,
                    playbackRates: [],
                    children: ["mediaLoader", "posterImage", "textTrackDisplay", "loadingSpinner", "bigPlayButton", "controlBar", "errorDisplay", "textTrackSettings"],
                    language: Z && (Z.languages && Z.languages[0] || Z.userLanguage || Z.language) || "en",
                    languages: {},
                    notSupportedMessage: "No compatible source was found for this media."
                }, ["ended", "seeking", "seekable", "networkState", "readyState"].forEach(function(t) {
                    J.prototype[t] = function() {
                        return this.techGet_(t)
                    }
                }), K.forEach(function(t) {
                    J.prototype["handleTech" + (0, S["default"])(t) + "_"] = function() {
                        return this.trigger(t)
                    }
                }), l["default"].registerComponent("Player", J), n["default"] = J
            }, {
                1: 1,
                4: 4,
                41: 41,
                44: 44,
                45: 45,
                46: 46,
                5: 5,
                50: 50,
                55: 55,
                59: 59,
                60: 60,
                61: 61,
                62: 62,
                63: 63,
                68: 68,
                69: 69,
                71: 71,
                76: 76,
                78: 78,
                79: 79,
                8: 8,
                81: 81,
                82: 82,
                83: 83,
                85: 85,
                86: 86,
                87: 87,
                88: 88,
                89: 89,
                90: 90,
                91: 91,
                94: 94,
                95: 95,
                97: 97
            }],
            52: [function(t, e, n) {
                "use strict";

                function r(t) {
                    return t && t.__esModule ? t : {
                        "default": t
                    }
                }
                n.__esModule = !0;
                var o = t(51),
                    i = r(o),
                    a = function(t, e) {
                        i["default"].prototype[t] = e
                    };
                n["default"] = a
            }, {
                51: 51
            }],
            53: [function(t, e, n) {
                "use strict";

                function r(t) {
                    return t && t.__esModule ? t : {
                        "default": t
                    }
                }

                function o(t, e) {
                    if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function")
                }

                function i(t, e) {
                    if (!t) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
                    return !e || "object" != typeof e && "function" != typeof e ? t : e
                }

                function a(t, e) {
                    if ("function" != typeof e && null !== e) throw new TypeError("Super expression must either be null or a function, not " + typeof e);
                    t.prototype = Object.create(e && e.prototype, {
                        constructor: {
                            value: t,
                            enumerable: !1,
                            writable: !0,
                            configurable: !0
                        }
                    }), e && (Object.setPrototypeOf ? Object.setPrototypeOf(t, e) : t.__proto__ = e)
                }
                n.__esModule = !0;
                var s = t(3),
                    u = r(s),
                    l = t(5),
                    c = r(l),
                    f = function(t) {
                        function e(n) {
                            var r = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {};
                            o(this, e);
                            var a = i(this, t.call(this, n, r));
                            return a.update(), a
                        }
                        return a(e, t), e.prototype.update = function() {
                            var t = this.createPopup();
                            this.popup && this.removeChild(this.popup), this.popup = t, this.addChild(t), this.items && 0 === this.items.length ? this.hide() : this.items && this.items.length > 1 && this.show()
                        }, e.prototype.createPopup = function() {}, e.prototype.createEl = function() {
                            return t.prototype.createEl.call(this, "div", {
                                className: this.buildCSSClass()
                            })
                        }, e.prototype.buildCSSClass = function() {
                            var e = "vjs-menu-button";
                            return e += this.options_.inline === !0 ? "-inline" : "-popup", "vjs-menu-button " + e + " " + t.prototype.buildCSSClass.call(this)
                        }, e
                    }(u["default"]);
                c["default"].registerComponent("PopupButton", f), n["default"] = f
            }, {
                3: 3,
                5: 5
            }],
            54: [function(t, e, n) {
                "use strict";

                function r(t) {
                    if (t && t.__esModule) return t;
                    var e = {};
                    if (null != t)
                        for (var n in t) Object.prototype.hasOwnProperty.call(t, n) && (e[n] = t[n]);
                    return e["default"] = t, e
                }

                function o(t) {
                    return t && t.__esModule ? t : {
                        "default": t
                    }
                }

                function i(t, e) {
                    if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function")
                }

                function a(t, e) {
                    if (!t) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
                    return !e || "object" != typeof e && "function" != typeof e ? t : e
                }

                function s(t, e) {
                    if ("function" != typeof e && null !== e) throw new TypeError("Super expression must either be null or a function, not " + typeof e);
                    t.prototype = Object.create(e && e.prototype, {
                        constructor: {
                            value: t,
                            enumerable: !1,
                            writable: !0,
                            configurable: !0
                        }
                    }), e && (Object.setPrototypeOf ? Object.setPrototypeOf(t, e) : t.__proto__ = e)
                }
                n.__esModule = !0;
                var u = t(5),
                    l = o(u),
                    c = t(81),
                    f = r(c),
                    p = t(83),
                    h = r(p),
                    d = t(82),
                    y = r(d),
                    v = function(t) {
                        function e() {
                            return i(this, e), a(this, t.apply(this, arguments))
                        }
                        return s(e, t), e.prototype.addItem = function(t) {
                            this.addChild(t), t.on("click", h.bind(this, function() {
                                this.unlockShowing()
                            }))
                        }, e.prototype.createEl = function() {
                            var e = this.options_.contentElType || "ul";
                            this.contentEl_ = f.createEl(e, {
                                className: "vjs-menu-content"
                            });
                            var n = t.prototype.createEl.call(this, "div", {
                                append: this.contentEl_,
                                className: "vjs-menu"
                            });
                            return n.appendChild(this.contentEl_), y.on(n, "click", function(t) {
                                t.preventDefault(), t.stopImmediatePropagation()
                            }), n
                        }, e
                    }(l["default"]);
                l["default"].registerComponent("Popup", v), n["default"] = v
            }, {
                5: 5,
                81: 81,
                82: 82,
                83: 83
            }],
            55: [function(t, e, n) {
                "use strict";

                function r(t) {
                    if (t && t.__esModule) return t;
                    var e = {};
                    if (null != t)
                        for (var n in t) Object.prototype.hasOwnProperty.call(t, n) && (e[n] = t[n]);
                    return e["default"] = t, e
                }

                function o(t) {
                    return t && t.__esModule ? t : {
                        "default": t
                    }
                }

                function i(t, e) {
                    if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function")
                }

                function a(t, e) {
                    if (!t) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
                    return !e || "object" != typeof e && "function" != typeof e ? t : e
                }

                function s(t, e) {
                    if ("function" != typeof e && null !== e) throw new TypeError("Super expression must either be null or a function, not " + typeof e);
                    t.prototype = Object.create(e && e.prototype, {
                        constructor: {
                            value: t,
                            enumerable: !1,
                            writable: !0,
                            configurable: !0
                        }
                    }), e && (Object.setPrototypeOf ? Object.setPrototypeOf(t, e) : t.__proto__ = e)
                }
                n.__esModule = !0;
                var u = t(3),
                    l = o(u),
                    c = t(5),
                    f = o(c),
                    p = t(83),
                    h = r(p),
                    d = t(81),
                    y = r(d),
                    v = t(78),
                    g = r(v),
                    m = function(t) {
                        function e(n, r) {
                            i(this, e);
                            var o = a(this, t.call(this, n, r));
                            return o.update(), n.on("posterchange", h.bind(o, o.update)), o
                        }
                        return s(e, t), e.prototype.dispose = function() {
                            this.player().off("posterchange", this.update),
                                t.prototype.dispose.call(this)
                        }, e.prototype.createEl = function() {
                            var t = y.createEl("div", {
                                className: "vjs-poster",
                                tabIndex: -1
                            });
                            return g.BACKGROUND_SIZE_SUPPORTED || (this.fallbackImg_ = y.createEl("img"), t.appendChild(this.fallbackImg_)), t
                        }, e.prototype.update = function(t) {
                            var e = this.player().poster();
                            this.setSrc(e), e ? this.show() : this.hide()
                        }, e.prototype.setSrc = function(t) {
                            if (this.fallbackImg_) this.fallbackImg_.src = t;
                            else {
                                var e = "";
                                t && (e = 'url("' + t + '")'), this.el_.style.backgroundImage = e
                            }
                        }, e.prototype.handleClick = function(t) {
                            this.player_.controls() && (this.player_.paused() ? this.player_.play() : this.player_.pause())
                        }, e
                    }(l["default"]);
                f["default"].registerComponent("PosterImage", m), n["default"] = m
            }, {
                3: 3,
                5: 5,
                78: 78,
                81: 81,
                83: 83
            }],
            56: [function(t, e, n) {
                "use strict";

                function r(t) {
                    return t && t.__esModule ? t : {
                        "default": t
                    }
                }

                function o(t) {
                    if (t && t.__esModule) return t;
                    var e = {};
                    if (null != t)
                        for (var n in t) Object.prototype.hasOwnProperty.call(t, n) && (e[n] = t[n]);
                    return e["default"] = t, e
                }

                function i(t, e) {
                    e && (y = e), h["default"].setTimeout(v, t)
                }
                n.__esModule = !0, n.hasLoaded = n.autoSetupTimeout = n.autoSetup = void 0;
                var a = t(81),
                    s = o(a),
                    u = t(82),
                    l = o(u),
                    c = t(94),
                    f = r(c),
                    p = t(95),
                    h = r(p),
                    d = !1,
                    y = void 0,
                    v = function() {
                        if (s.isReal()) {
                            var t = f["default"].getElementsByTagName("video"),
                                e = f["default"].getElementsByTagName("audio"),
                                n = [];
                            if (t && t.length > 0)
                                for (var r = 0, o = t.length; r < o; r++) n.push(t[r]);
                            if (e && e.length > 0)
                                for (var a = 0, u = e.length; a < u; a++) n.push(e[a]);
                            if (n && n.length > 0)
                                for (var l = 0, c = n.length; l < c; l++) {
                                    var p = n[l];
                                    if (!p || !p.getAttribute) {
                                        i(1);
                                        break
                                    }
                                    if (void 0 === p.player) {
                                        var h = p.getAttribute("data-setup");
                                        null !== h && y(p)
                                    }
                                } else d || i(1)
                        }
                    };
                s.isReal() && "complete" === f["default"].readyState ? d = !0 : l.one(h["default"], "load", function() {
                    d = !0
                });
                var g = function() {
                    return d
                };
                n.autoSetup = v, n.autoSetupTimeout = i, n.hasLoaded = g
            }, {
                81: 81,
                82: 82,
                94: 94,
                95: 95
            }],
            57: [function(t, e, n) {
                "use strict";

                function r(t) {
                    if (t && t.__esModule) return t;
                    var e = {};
                    if (null != t)
                        for (var n in t) Object.prototype.hasOwnProperty.call(t, n) && (e[n] = t[n]);
                    return e["default"] = t, e
                }

                function o(t) {
                    return t && t.__esModule ? t : {
                        "default": t
                    }
                }

                function i(t, e) {
                    if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function")
                }

                function a(t, e) {
                    if (!t) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
                    return !e || "object" != typeof e && "function" != typeof e ? t : e
                }

                function s(t, e) {
                    if ("function" != typeof e && null !== e) throw new TypeError("Super expression must either be null or a function, not " + typeof e);
                    t.prototype = Object.create(e && e.prototype, {
                        constructor: {
                            value: t,
                            enumerable: !1,
                            writable: !0,
                            configurable: !0
                        }
                    }), e && (Object.setPrototypeOf ? Object.setPrototypeOf(t, e) : t.__proto__ = e)
                }
                n.__esModule = !0;
                var u = t(5),
                    l = o(u),
                    c = t(81),
                    f = r(c),
                    p = t(88),
                    h = function(t) {
                        function e(n, r) {
                            i(this, e);
                            var o = a(this, t.call(this, n, r));
                            return o.bar = o.getChild(o.options_.barName), o.vertical(!!o.options_.vertical), o.on("mousedown", o.handleMouseDown), o.on("touchstart", o.handleMouseDown), o.on("focus", o.handleFocus), o.on("blur", o.handleBlur), o.on("click", o.handleClick), o.on(n, "controlsvisible", o.update), o.on(n, o.playerEvent, o.update), o
                        }
                        return s(e, t), e.prototype.createEl = function(e) {
                            var n = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {},
                                r = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : {};
                            return n.className = n.className + " vjs-slider", n = (0, p.assign)({
                                tabIndex: 0
                            }, n), r = (0, p.assign)({
                                role: "slider",
                                "aria-valuenow": 0,
                                "aria-valuemin": 0,
                                "aria-valuemax": 100,
                                tabIndex: 0
                            }, r), t.prototype.createEl.call(this, e, n, r)
                        }, e.prototype.handleMouseDown = function(t) {
                            var e = this.bar.el_.ownerDocument;
                            t.preventDefault(), f.blockTextSelection(), this.addClass("vjs-sliding"), this.trigger("slideractive"), this.on(e, "mousemove", this.handleMouseMove), this.on(e, "mouseup", this.handleMouseUp), this.on(e, "touchmove", this.handleMouseMove), this.on(e, "touchend", this.handleMouseUp), this.handleMouseMove(t)
                        }, e.prototype.handleMouseMove = function(t) {}, e.prototype.handleMouseUp = function() {
                            var t = this.bar.el_.ownerDocument;
                            f.unblockTextSelection(), this.removeClass("vjs-sliding"), this.trigger("sliderinactive"), this.off(t, "mousemove", this.handleMouseMove), this.off(t, "mouseup", this.handleMouseUp), this.off(t, "touchmove", this.handleMouseMove), this.off(t, "touchend", this.handleMouseUp), this.update()
                        }, e.prototype.update = function() {
                            if (this.el_) {
                                var t = this.getPercent(),
                                    e = this.bar;
                                if (e) {
                                    ("number" != typeof t || t !== t || t < 0 || t === 1 / 0) && (t = 0);
                                    var n = (100 * t).toFixed(2) + "%";
                                    this.vertical() ? e.el().style.height = n : e.el().style.width = n
                                }
                            }
                        }, e.prototype.calculateDistance = function(t) {
                            var e = f.getPointerPosition(this.el_, t);
                            return this.vertical() ? e.y : e.x
                        }, e.prototype.handleFocus = function() {
                            this.on(this.bar.el_.ownerDocument, "keydown", this.handleKeyPress)
                        }, e.prototype.handleKeyPress = function(t) {
                            37 === t.which || 40 === t.which ? (t.preventDefault(), this.stepBack()) : 38 !== t.which && 39 !== t.which || (t.preventDefault(), this.stepForward())
                        }, e.prototype.handleBlur = function() {
                            this.off(this.bar.el_.ownerDocument, "keydown", this.handleKeyPress)
                        }, e.prototype.handleClick = function(t) {
                            t.stopImmediatePropagation(), t.preventDefault()
                        }, e.prototype.vertical = function(t) {
                            return void 0 === t ? this.vertical_ || !1 : (this.vertical_ = !!t, this.vertical_ ? this.addClass("vjs-slider-vertical") : this.addClass("vjs-slider-horizontal"), this)
                        }, e
                    }(l["default"]);
                l["default"].registerComponent("Slider", h), n["default"] = h
            }, {
                5: 5,
                81: 81,
                88: 88
            }],
            58: [function(t, e, n) {
                "use strict";

                function r(t) {
                    return t.streamingFormats = {
                        "rtmp/mp4": "MP4",
                        "rtmp/flv": "FLV"
                    }, t.streamFromParts = function(t, e) {
                        return t + "&" + e
                    }, t.streamToParts = function(t) {
                        var e = {
                            connection: "",
                            stream: ""
                        };
                        if (!t) return e;
                        var n = t.search(/&(?!\w+=)/),
                            r = void 0;
                        return n !== -1 ? r = n + 1 : (n = r = t.lastIndexOf("/") + 1, 0 === n && (n = r = t.length)), e.connection = t.substring(0, n), e.stream = t.substring(r, t.length), e
                    }, t.isStreamingType = function(e) {
                        return e in t.streamingFormats
                    }, t.RTMP_RE = /^rtmp[set]?:\/\//i, t.isStreamingSrc = function(e) {
                        return t.RTMP_RE.test(e)
                    }, t.rtmpSourceHandler = {}, t.rtmpSourceHandler.canPlayType = function(e) {
                        return t.isStreamingType(e) ? "maybe" : ""
                    }, t.rtmpSourceHandler.canHandleSource = function(e, n) {
                        var r = t.rtmpSourceHandler.canPlayType(e.type);
                        return r ? r : t.isStreamingSrc(e.src) ? "maybe" : ""
                    }, t.rtmpSourceHandler.handleSource = function(e, n, r) {
                        var o = t.streamToParts(e.src);
                        n.setRtmpConnection(o.connection), n.setRtmpStream(o.stream)
                    }, t.registerSourceHandler(t.rtmpSourceHandler), t
                }
                n.__esModule = !0, n["default"] = r
            }, {}],
            59: [function(t, e, n) {
                "use strict";

                function r(t) {
                    if (t && t.__esModule) return t;
                    var e = {};
                    if (null != t)
                        for (var n in t) Object.prototype.hasOwnProperty.call(t, n) && (e[n] = t[n]);
                    return e["default"] = t, e
                }

                function o(t) {
                    return t && t.__esModule ? t : {
                        "default": t
                    }
                }

                function i(t, e) {
                    if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function")
                }

                function a(t, e) {
                    if (!t) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
                    return !e || "object" != typeof e && "function" != typeof e ? t : e
                }

                function s(t, e) {
                    if ("function" != typeof e && null !== e) throw new TypeError("Super expression must either be null or a function, not " + typeof e);
                    t.prototype = Object.create(e && e.prototype, {
                        constructor: {
                            value: t,
                            enumerable: !1,
                            writable: !0,
                            configurable: !0
                        }
                    }), e && (Object.setPrototypeOf ? Object.setPrototypeOf(t, e) : t.__proto__ = e)
                }

                function u(t) {
                    k["set" + (t.charAt(0).toUpperCase() + t.slice(1))] = function(e) {
                        return this.el_.vjs_setProperty(t, e)
                    }
                }

                function l(t) {
                    k[t] = function() {
                        return this.el_.vjs_getProperty(t)
                    }
                }
                n.__esModule = !0;
                for (var c = t(62), f = o(c), p = t(81), h = r(p), d = t(92), y = r(d), v = t(90), g = t(58), m = o(g), b = t(5), _ = o(b), w = t(95), T = o(w), E = t(88), x = T["default"].navigator, C = function(t) {
                        function e(n, r) {
                            i(this, e);
                            var o = a(this, t.call(this, n, r));
                            return n.source && o.ready(function() {
                                this.setSource(n.source)
                            }, !0), n.startTime && o.ready(function() {
                                this.load(), this.play(), this.currentTime(n.startTime)
                            }, !0), T["default"].videojs = T["default"].videojs || {}, T["default"].videojs.Flash = T["default"].videojs.Flash || {}, T["default"].videojs.Flash.onReady = e.onReady, T["default"].videojs.Flash.onEvent = e.onEvent, T["default"].videojs.Flash.onError = e.onError, o.on("seeked", function() {
                                this.lastSeekTarget_ = void 0
                            }), o
                        }
                        return s(e, t), e.prototype.createEl = function() {
                            var t = this.options_;
                            t.swf || (t.swf = "https://vjs.zencdn.net/swf/5.3.0/video-js.swf");
                            var n = t.techId,
                                r = (0, E.assign)({
                                    readyFunction: "videojs.Flash.onReady",
                                    eventProxyFunction: "videojs.Flash.onEvent",
                                    errorEventProxyFunction: "videojs.Flash.onError",
                                    autoplay: t.autoplay,
                                    preload: t.preload,
                                    loop: t.loop,
                                    muted: t.muted
                                }, t.flashVars),
                                o = (0, E.assign)({
                                    wmode: "opaque",
                                    bgcolor: "#000000"
                                }, t.params),
                                i = (0, E.assign)({
                                    id: n,
                                    name: n,
                                    "class": "vjs-tech"
                                }, t.attributes);
                            return this.el_ = e.embed(t.swf, r, o, i), this.el_.tech = this, this.el_
                        }, e.prototype.play = function() {
                            this.ended() && this.setCurrentTime(0), this.el_.vjs_play()
                        }, e.prototype.pause = function() {
                            this.el_.vjs_pause()
                        }, e.prototype.src = function(t) {
                            return void 0 === t ? this.currentSrc() : this.setSrc(t)
                        }, e.prototype.setSrc = function(t) {
                            var e = this;
                            t = y.getAbsoluteURL(t), this.el_.vjs_src(t), this.autoplay() && this.setTimeout(function() {
                                return e.play()
                            }, 0)
                        }, e.prototype.seeking = function() {
                            return void 0 !== this.lastSeekTarget_
                        }, e.prototype.setCurrentTime = function(e) {
                            var n = this.seekable();
                            n.length && (e = e > n.start(0) ? e : n.start(0), e = e < n.end(n.length - 1) ? e : n.end(n.length - 1), this.lastSeekTarget_ = e, this.trigger("seeking"), this.el_.vjs_setProperty("currentTime", e), t.prototype.setCurrentTime.call(this))
                        }, e.prototype.currentTime = function() {
                            return this.seeking() ? this.lastSeekTarget_ || 0 : this.el_.vjs_getProperty("currentTime")
                        }, e.prototype.currentSrc = function() {
                            return this.currentSource_ ? this.currentSource_.src : this.el_.vjs_getProperty("currentSrc")
                        }, e.prototype.duration = function n() {
                            if (0 === this.readyState()) return NaN;
                            var n = this.el_.vjs_getProperty("duration");
                            return n >= 0 ? n : 1 / 0
                        }, e.prototype.load = function() {
                            this.el_.vjs_load()
                        }, e.prototype.poster = function() {
                            this.el_.vjs_getProperty("poster")
                        }, e.prototype.setPoster = function() {}, e.prototype.seekable = function() {
                            var t = this.duration();
                            return 0 === t ? (0, v.createTimeRange)() : (0, v.createTimeRange)(0, t)
                        }, e.prototype.buffered = function() {
                            var t = this.el_.vjs_getProperty("buffered");
                            return 0 === t.length ? (0, v.createTimeRange)() : (0, v.createTimeRange)(t[0][0], t[0][1])
                        }, e.prototype.supportsFullScreen = function() {
                            return !1
                        }, e.prototype.enterFullScreen = function() {
                            return !1
                        }, e
                    }(f["default"]), k = C.prototype, S = "rtmpConnection,rtmpStream,preload,defaultPlaybackRate,playbackRate,autoplay,loop,mediaGroup,controller,controls,volume,muted,defaultMuted".split(","), j = "networkState,readyState,initialTime,startOffsetTime,paused,ended,videoWidth,videoHeight".split(","), O = 0; O < S.length; O++) l(S[O]), u(S[O]);
                for (var P = 0; P < j.length; P++) l(j[P]);
                C.isSupported = function() {
                    return C.version()[0] >= 10
                }, f["default"].withSourceHandlers(C), C.nativeSourceHandler = {}, C.nativeSourceHandler.canPlayType = function(t) {
                    return t in C.formats ? "maybe" : ""
                }, C.nativeSourceHandler.canHandleSource = function(t, e) {
                    function n(t) {
                        var e = y.getFileExtension(t);
                        return e ? "video/" + e : ""
                    }
                    var r = void 0;
                    return r = t.type ? t.type.replace(/;.*/, "").toLowerCase() : n(t.src), C.nativeSourceHandler.canPlayType(r)
                }, C.nativeSourceHandler.handleSource = function(t, e, n) {
                    e.setSrc(t.src)
                }, C.nativeSourceHandler.dispose = function() {}, C.registerSourceHandler(C.nativeSourceHandler), C.formats = {
                    "video/flv": "FLV",
                    "video/x-flv": "FLV",
                    "video/mp4": "MP4",
                    "video/m4v": "MP4"
                }, C.onReady = function(t) {
                    var e = h.getEl(t),
                        n = e && e.tech;
                    n && n.el() && C.checkReady(n)
                }, C.checkReady = function(t) {
                    t.el() && (t.el().vjs_getProperty ? t.triggerReady() : this.setTimeout(function() {
                        C.checkReady(t)
                    }, 50))
                }, C.onEvent = function(t, e) {
                    var n = h.getEl(t).tech,
                        r = Array.prototype.slice.call(arguments, 2);
                    n.setTimeout(function() {
                        n.trigger(e, r)
                    }, 1)
                }, C.onError = function(t, e) {
                    var n = h.getEl(t).tech;
                    return "srcnotfound" === e ? n.error(4) : void n.error("FLASH: " + e)
                }, C.version = function() {
                    var t = "0,0,0";
                    try {
                        t = new T["default"].ActiveXObject("ShockwaveFlash.ShockwaveFlash").GetVariable("$version").replace(/\D+/g, ",").match(/^,?(.+),?$/)[1]
                    } catch (e) {
                        try {
                            x.mimeTypes["application/x-shockwave-flash"].enabledPlugin && (t = (x.plugins["Shockwave Flash 2.0"] || x.plugins["Shockwave Flash"]).description.replace(/\D+/g, ",").match(/^,?(.+),?$/)[1])
                        } catch (n) {}
                    }
                    return t.split(",")
                }, C.embed = function(t, e, n, r) {
                    var o = C.getEmbedCode(t, e, n, r);
                    return h.createEl("div", {
                        innerHTML: o
                    }).childNodes[0]
                }, C.getEmbedCode = function(t, e, n, r) {
                    var o = "",
                        i = "",
                        a = "";
                    return e && Object.getOwnPropertyNames(e).forEach(function(t) {
                        o += t + "=" + e[t] + "&amp;"
                    }), n = (0, E.assign)({
                        movie: t,
                        flashvars: o,
                        allowScriptAccess: "always",
                        allowNetworking: "all"
                    }, n), Object.getOwnPropertyNames(n).forEach(function(t) {
                        i += '<param name="' + t + '" value="' + n[t] + '" />'
                    }), r = (0, E.assign)({
                        data: t,
                        width: "100%",
                        height: "100%"
                    }, r), Object.getOwnPropertyNames(r).forEach(function(t) {
                        a += t + '="' + r[t] + '" '
                    }), '<object type="application/x-shockwave-flash" ' + a + ">" + i + "</object>"
                }, (0, m["default"])(C), _["default"].registerComponent("Flash", C), f["default"].registerTech("Flash", C), n["default"] = C
            }, {
                5: 5,
                58: 58,
                62: 62,
                81: 81,
                88: 88,
                90: 90,
                92: 92,
                95: 95
            }],
            60: [function(t, e, n) {
                "use strict";

                function r(t) {
                    if (t && t.__esModule) return t;
                    var e = {};
                    if (null != t)
                        for (var n in t) Object.prototype.hasOwnProperty.call(t, n) && (e[n] = t[n]);
                    return e["default"] = t, e
                }

                function o(t) {
                    return t && t.__esModule ? t : {
                        "default": t
                    }
                }

                function i(t, e) {
                    return t.raw = e, t
                }

                function a(t, e) {
                    if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function")
                }

                function s(t, e) {
                    if (!t) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
                    return !e || "object" != typeof e && "function" != typeof e ? t : e
                }

                function u(t, e) {
                    if ("function" != typeof e && null !== e) throw new TypeError("Super expression must either be null or a function, not " + typeof e);
                    t.prototype = Object.create(e && e.prototype, {
                        constructor: {
                            value: t,
                            enumerable: !1,
                            writable: !0,
                            configurable: !0
                        }
                    }), e && (Object.setPrototypeOf ? Object.setPrototypeOf(t, e) : t.__proto__ = e)
                }
                n.__esModule = !0;
                var l = i(["Text Tracks are being loaded from another origin but the crossorigin attribute isn't used.\n            This may prevent text tracks from loading."], ["Text Tracks are being loaded from another origin but the crossorigin attribute isn't used.\n            This may prevent text tracks from loading."]),
                    c = t(62),
                    f = o(c),
                    p = t(5),
                    h = o(p),
                    d = t(81),
                    y = r(d),
                    v = t(92),
                    g = r(v),
                    m = t(83),
                    b = r(m),
                    _ = t(86),
                    w = o(_),
                    T = t(98),
                    E = o(T),
                    x = t(78),
                    C = r(x),
                    k = t(94),
                    S = o(k),
                    j = t(95),
                    O = o(j),
                    P = t(88),
                    M = t(87),
                    A = o(M),
                    N = t(91),
                    D = o(N),
                    L = function(t) {
                        function e(n, r) {
                            a(this, e);
                            var o = s(this, t.call(this, n, r)),
                                i = n.source,
                                u = !1;
                            if (i && (o.el_.currentSrc !== i.src || n.tag && 3 === n.tag.initNetworkState_) ? o.setSource(i) : o.handleLateInit_(o.el_), o.el_.hasChildNodes()) {
                                for (var c = o.el_.childNodes, f = c.length, p = []; f--;) {
                                    var h = c[f];
                                    "track" === h.nodeName.toLowerCase() && (o.featuresNativeTextTracks ? (o.remoteTextTrackEls().addTrackElement_(h), o.remoteTextTracks().addTrack_(h.track), u || o.el_.hasAttribute("crossorigin") || !g.isCrossOrigin(h.src) || (u = !0)) : p.push(h))
                                }
                                for (var d = 0; d < p.length; d++) o.el_.removeChild(p[d])
                            }
                            return ["audio", "video"].forEach(function(t) {
                                var e = o.el()[t + "Tracks"],
                                    n = o[t + "Tracks"](),
                                    r = (0, D["default"])(t);
                                o["featuresNative" + r + "Tracks"] && e && e.addEventListener && (o["handle" + r + "TrackChange_"] = function(t) {
                                    n.trigger({
                                        type: "change",
                                        target: n,
                                        currentTarget: n,
                                        srcElement: n
                                    })
                                }, o["handle" + r + "TrackAdd_"] = function(t) {
                                    return n.addTrack(t.track)
                                }, o["handle" + r + "TrackRemove_"] = function(t) {
                                    return n.removeTrack(t.track)
                                }, e.addEventListener("change", o["handle" + r + "TrackChange_"]), e.addEventListener("addtrack", o["handle" + r + "TrackAdd_"]), e.addEventListener("removetrack", o["handle" + r + "TrackRemove_"]), o["removeOld" + r + "Tracks_"] = function(t) {
                                    return o.removeOldTracks_(n, e)
                                }, o.on("loadstart", o["removeOld" + r + "Tracks_"]))
                            }), o.featuresNativeTextTracks && (u && w["default"].warn((0, E["default"])(l)), o.handleTextTrackChange_ = b.bind(o, o.handleTextTrackChange), o.handleTextTrackAdd_ = b.bind(o, o.handleTextTrackAdd), o.handleTextTrackRemove_ = b.bind(o, o.handleTextTrackRemove), o.proxyNativeTextTracks_()), (C.TOUCH_ENABLED || C.IS_IPHONE || C.IS_NATIVE_ANDROID) && n.nativeControlsForTouch === !0 && o.setControls(!0), o.proxyWebkitFullscreen_(), o.triggerReady(), o
                        }
                        return u(e, t), e.prototype.dispose = function() {
                            var n = this;
                            ["audio", "video", "text"].forEach(function(t) {
                                var e = (0, D["default"])(t),
                                    r = n.el_[t + "Tracks"];
                                r && r.removeEventListener && (r.removeEventListener("change", n["handle" + e + "TrackChange_"]), r.removeEventListener("addtrack", n["handle" + e + "TrackAdd_"]), r.removeEventListener("removetrack", n["handle" + e + "TrackRemove_"])), r && n.off("loadstart", n["removeOld" + e + "Tracks_"])
                            }), e.disposeMediaElement(this.el_), t.prototype.dispose.call(this)
                        }, e.prototype.createEl = function() {
                            var t = this.options_.tag;
                            if (!t || !this.options_.playerElIngest && !this.movingMediaElementInDOM) {
                                if (t) {
                                    var n = t.cloneNode(!0);
                                    t.parentNode && t.parentNode.insertBefore(n, t), e.disposeMediaElement(t), t = n
                                } else {
                                    t = S["default"].createElement("video");
                                    var r = this.options_.tag && y.getElAttributes(this.options_.tag),
                                        o = (0, A["default"])({}, r);
                                    C.TOUCH_ENABLED && this.options_.nativeControlsForTouch === !0 || delete o.controls, y.setElAttributes(t, (0, P.assign)(o, {
                                        id: this.options_.techId,
                                        "class": "vjs-tech"
                                    }))
                                }
                                t.playerId = this.options_.playerId
                            }
                            for (var i = ["autoplay", "preload", "loop", "muted"], a = i.length - 1; a >= 0; a--) {
                                var s = i[a],
                                    u = {};
                                "undefined" != typeof this.options_[s] && (u[s] = this.options_[s]), y.setElAttributes(t, u)
                            }
                            return t
                        }, e.prototype.handleLateInit_ = function(t) {
                            if (0 !== t.networkState && 3 !== t.networkState) {
                                if (0 === t.readyState) {
                                    var e = !1,
                                        n = function() {
                                            e = !0
                                        };
                                    this.on("loadstart", n);
                                    var r = function() {
                                        e || this.trigger("loadstart")
                                    };
                                    return this.on("loadedmetadata", r), void this.ready(function() {
                                        this.off("loadstart", n), this.off("loadedmetadata", r), e || this.trigger("loadstart")
                                    })
                                }
                                var o = ["loadstart"];
                                o.push("loadedmetadata"), t.readyState >= 2 && o.push("loadeddata"), t.readyState >= 3 && o.push("canplay"), t.readyState >= 4 && o.push("canplaythrough"), this.ready(function() {
                                    o.forEach(function(t) {
                                        this.trigger(t)
                                    }, this)
                                })
                            }
                        }, e.prototype.proxyNativeTextTracks_ = function() {
                            var t = this.el().textTracks;
                            if (t) {
                                for (var e = 0; e < t.length; e++) this.textTracks().addTrack_(t[e]);
                                t.addEventListener && (t.addEventListener("change", this.handleTextTrackChange_), t.addEventListener("addtrack", this.handleTextTrackAdd_), t.addEventListener("removetrack", this.handleTextTrackRemove_)), this.on("loadstart", this.removeOldTextTracks_)
                            }
                        }, e.prototype.handleTextTrackChange = function(t) {
                            var e = this.textTracks();
                            this.textTracks().trigger({
                                type: "change",
                                target: e,
                                currentTarget: e,
                                srcElement: e
                            })
                        }, e.prototype.handleTextTrackAdd = function(t) {
                            this.textTracks().addTrack_(t.track)
                        }, e.prototype.handleTextTrackRemove = function(t) {
                            this.textTracks().removeTrack_(t.track)
                        }, e.prototype.removeOldTracks_ = function(t, e) {
                            var n = [];
                            if (e) {
                                for (var r = 0; r < t.length; r++) {
                                    for (var o = t[r], i = !1, a = 0; a < e.length; a++)
                                        if (e[a] === o) {
                                            i = !0;
                                            break
                                        } i || n.push(o)
                                }
                                for (var s = 0; s < n.length; s++) {
                                    var u = n[s];
                                    t.removeTrack_(u)
                                }
                            }
                        }, e.prototype.removeOldTextTracks_ = function(t) {
                            var e = this.textTracks(),
                                n = this.el().textTracks;
                            this.removeOldTracks_(e, n)
                        }, e.prototype.play = function() {
                            var t = this.el_.play();
                            void 0 !== t && "function" == typeof t.then && t.then(null, function(t) {})
                        }, e.prototype.setCurrentTime = function(t) {
                            try {
                                this.el_.currentTime = t
                            } catch (e) {
                                (0, w["default"])(e, "Video is not ready. (Video.js)")
                            }
                        }, e.prototype.duration = function() {
                            var t = this;
                            if (this.el_.duration === 1 / 0 && C.IS_ANDROID && C.IS_CHROME && 0 === this.el_.currentTime) {
                                var e = function n() {
                                    t.el_.currentTime > 0 && (t.el_.duration === 1 / 0 && t.trigger("durationchange"), t.off("timeupdate", n))
                                };
                                return this.on("timeupdate", e), NaN
                            }
                            return this.el_.duration || NaN
                        }, e.prototype.width = function() {
                            return this.el_.offsetWidth
                        }, e.prototype.height = function() {
                            return this.el_.offsetHeight
                        }, e.prototype.proxyWebkitFullscreen_ = function() {
                            var t = this;
                            if ("webkitDisplayingFullscreen" in this.el_) {
                                var e = function() {
                                        this.trigger("fullscreenchange", {
                                            isFullscreen: !1
                                        })
                                    },
                                    n = function() {
                                        this.one("webkitendfullscreen", e), this.trigger("fullscreenchange", {
                                            isFullscreen: !0
                                        })
                                    };
                                this.on("webkitbeginfullscreen", n), this.on("dispose", function() {
                                    t.off("webkitbeginfullscreen", n), t.off("webkitendfullscreen", e)
                                })
                            }
                        }, e.prototype.supportsFullScreen = function() {
                            if ("function" == typeof this.el_.webkitEnterFullScreen) {
                                var t = O["default"].navigator && O["default"].navigator.userAgent || "";
                                if (/Android/.test(t) || !/Chrome|Mac OS X 10.5/.test(t)) return !0
                            }
                            return !1
                        }, e.prototype.enterFullScreen = function() {
                            var t = this.el_;
                            t.paused && t.networkState <= t.HAVE_METADATA ? (this.el_.play(), this.setTimeout(function() {
                                t.pause(), t.webkitEnterFullScreen()
                            }, 0)) : t.webkitEnterFullScreen()
                        }, e.prototype.exitFullScreen = function() {
                            this.el_.webkitExitFullScreen()
                        }, e.prototype.src = function(t) {
                            return void 0 === t ? this.el_.src : void this.setSrc(t)
                        }, e.prototype.reset = function() {
                            e.resetMediaElement(this.el_)
                        }, e.prototype.currentSrc = function() {
                            return this.currentSource_ ? this.currentSource_.src : this.el_.currentSrc
                        }, e.prototype.setControls = function(t) {
                            this.el_.controls = !!t
                        }, e.prototype.addTextTrack = function(e, n, r) {
                            return this.featuresNativeTextTracks ? this.el_.addTextTrack(e, n, r) : t.prototype.addTextTrack.call(this, e, n, r)
                        }, e.prototype.createRemoteTextTrack = function(e) {
                            if (!this.featuresNativeTextTracks) return t.prototype.createRemoteTextTrack.call(this, e);
                            var n = S["default"].createElement("track");
                            return e.kind && (n.kind = e.kind), e.label && (n.label = e.label), (e.language || e.srclang) && (n.srclang = e.language || e.srclang), e["default"] && (n["default"] = e["default"]), e.id && (n.id = e.id), e.src && (n.src = e.src), n
                        }, e.prototype.addRemoteTextTrack = function(e, n) {
                            var r = t.prototype.addRemoteTextTrack.call(this, e, n);
                            return this.featuresNativeTextTracks && this.el().appendChild(r), r
                        }, e.prototype.removeRemoteTextTrack = function(e) {
                            if (t.prototype.removeRemoteTextTrack.call(this, e), this.featuresNativeTextTracks)
                                for (var n = this.$$("track"), r = n.length; r--;) e !== n[r] && e !== n[r].track || this.el().removeChild(n[r])
                        }, e
                    }(f["default"]);
                if (y.isReal()) {
                    L.TEST_VID = S["default"].createElement("video");
                    var I = S["default"].createElement("track");
                    I.kind = "captions", I.srclang = "en", I.label = "English", L.TEST_VID.appendChild(I)
                }
                L.isSupported = function() {
                    try {
                        L.TEST_VID.volume = .5
                    } catch (t) {
                        return !1
                    }
                    return !(!L.TEST_VID || !L.TEST_VID.canPlayType)
                }, L.canControlVolume = function() {
                    try {
                        var t = L.TEST_VID.volume;
                        return L.TEST_VID.volume = t / 2 + .1, t !== L.TEST_VID.volume
                    } catch (e) {
                        return !1
                    }
                }, L.canControlPlaybackRate = function() {
                    if (C.IS_ANDROID && C.IS_CHROME) return !1;
                    try {
                        var t = L.TEST_VID.playbackRate;
                        return L.TEST_VID.playbackRate = t / 2 + .1, t !== L.TEST_VID.playbackRate
                    } catch (e) {
                        return !1
                    }
                }, L.supportsNativeTextTracks = function() {
                    return C.IS_ANY_SAFARI
                }, L.supportsNativeVideoTracks = function() {
                    return !(!L.TEST_VID || !L.TEST_VID.videoTracks)
                }, L.supportsNativeAudioTracks = function() {
                    return !(!L.TEST_VID || !L.TEST_VID.audioTracks)
                }, L.Events = ["loadstart", "suspend", "abort", "error", "emptied", "stalled", "loadedmetadata", "loadeddata", "canplay", "canplaythrough", "playing", "waiting", "seeking", "seeked", "ended", "durationchange", "timeupdate", "progress", "play", "pause", "ratechange", "volumechange"], L.prototype.featuresVolumeControl = L.canControlVolume(), L.prototype.featuresPlaybackRate = L.canControlPlaybackRate(), L.prototype.movingMediaElementInDOM = !C.IS_IOS, L.prototype.featuresFullscreenResize = !0, L.prototype.featuresProgressEvents = !0, L.prototype.featuresTimeupdateEvents = !0, L.prototype.featuresNativeTextTracks = L.supportsNativeTextTracks(), L.prototype.featuresNativeVideoTracks = L.supportsNativeVideoTracks(), L.prototype.featuresNativeAudioTracks = L.supportsNativeAudioTracks();
                var R = L.TEST_VID && L.TEST_VID.constructor.prototype.canPlayType,
                    F = /^application\/(?:x-|vnd\.apple\.)mpegurl/i,
                    H = /^video\/mp4/i;
                L.patchCanPlayType = function() {
                    C.ANDROID_VERSION >= 4 && !C.IS_FIREFOX ? L.TEST_VID.constructor.prototype.canPlayType = function(t) {
                        return t && F.test(t) ? "maybe" : R.call(this, t)
                    } : C.IS_OLD_ANDROID && (L.TEST_VID.constructor.prototype.canPlayType = function(t) {
                        return t && H.test(t) ? "maybe" : R.call(this, t)
                    })
                }, L.unpatchCanPlayType = function() {
                    var t = L.TEST_VID.constructor.prototype.canPlayType;
                    return L.TEST_VID.constructor.prototype.canPlayType = R, t
                }, L.patchCanPlayType(), L.disposeMediaElement = function(t) {
                    if (t) {
                        for (t.parentNode && t.parentNode.removeChild(t); t.hasChildNodes();) t.removeChild(t.firstChild);
                        t.removeAttribute("src"), "function" == typeof t.load && function() {
                            try {
                                t.load()
                            } catch (e) {}
                        }()
                    }
                }, L.resetMediaElement = function(t) {
                    if (t) {
                        for (var e = t.querySelectorAll("source"), n = e.length; n--;) t.removeChild(e[n]);
                        t.removeAttribute("src"), "function" == typeof t.load && function() {
                            try {
                                t.load()
                            } catch (e) {}
                        }()
                    }
                }, ["paused", "currentTime", "buffered", "volume", "muted", "poster", "preload", "autoplay", "controls", "loop", "error", "seeking", "seekable", "ended", "defaultMuted", "playbackRate", "played", "networkState", "readyState", "videoWidth", "videoHeight"].forEach(function(t) {
                    L.prototype[t] = function() {
                        return this.el_[t]
                    }
                }), ["volume", "muted", "src", "poster", "preload", "autoplay", "loop", "playbackRate"].forEach(function(t) {
                    L.prototype["set" + (0, D["default"])(t)] = function(e) {
                        this.el_[t] = e
                    }
                }), ["pause", "load"].forEach(function(t) {
                    L.prototype[t] = function() {
                        return this.el_[t]()
                    }
                }), f["default"].withSourceHandlers(L), L.nativeSourceHandler = {}, L.nativeSourceHandler.canPlayType = function(t) {
                    try {
                        return L.TEST_VID.canPlayType(t)
                    } catch (e) {
                        return ""
                    }
                }, L.nativeSourceHandler.canHandleSource = function(t, e) {
                    if (t.type) return L.nativeSourceHandler.canPlayType(t.type);
                    if (t.src) {
                        var n = g.getFileExtension(t.src);
                        return L.nativeSourceHandler.canPlayType("video/" + n)
                    }
                    return ""
                }, L.nativeSourceHandler.handleSource = function(t, e, n) {
                    e.setSrc(t.src)
                }, L.nativeSourceHandler.dispose = function() {}, L.registerSourceHandler(L.nativeSourceHandler), h["default"].registerComponent("Html5", L), f["default"].registerTech("Html5", L), n["default"] = L
            }, {
                5: 5,
                62: 62,
                78: 78,
                81: 81,
                83: 83,
                86: 86,
                87: 87,
                88: 88,
                91: 91,
                92: 92,
                94: 94,
                95: 95,
                98: 98
            }],
            61: [function(t, e, n) {
                "use strict";

                function r(t) {
                    return t && t.__esModule ? t : {
                        "default": t
                    }
                }

                function o(t, e) {
                    if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function")
                }

                function i(t, e) {
                    if (!t) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
                    return !e || "object" != typeof e && "function" != typeof e ? t : e
                }

                function a(t, e) {
                    if ("function" != typeof e && null !== e) throw new TypeError("Super expression must either be null or a function, not " + typeof e);
                    t.prototype = Object.create(e && e.prototype, {
                        constructor: {
                            value: t,
                            enumerable: !1,
                            writable: !0,
                            configurable: !0
                        }
                    }), e && (Object.setPrototypeOf ? Object.setPrototypeOf(t, e) : t.__proto__ = e)
                }
                n.__esModule = !0;
                var s = t(5),
                    u = r(s),
                    l = t(62),
                    c = r(l),
                    f = t(91),
                    p = r(f),
                    h = function(t) {
                        function e(n, r, a) {
                            o(this, e);
                            var s = i(this, t.call(this, n, r, a));
                            if (r.playerOptions.sources && 0 !== r.playerOptions.sources.length) n.src(r.playerOptions.sources);
                            else
                                for (var l = 0, f = r.playerOptions.techOrder; l < f.length; l++) {
                                    var h = (0, p["default"])(f[l]),
                                        d = c["default"].getTech(h);
                                    if (h || (d = u["default"].getComponent(h)), d && d.isSupported()) {
                                        n.loadTech_(h);
                                        break
                                    }
                                }
                            return s
                        }
                        return a(e, t), e
                    }(u["default"]);
                u["default"].registerComponent("MediaLoader", h), n["default"] = h
            }, {
                5: 5,
                62: 62,
                91: 91
            }],
            62: [function(t, e, n) {
                "use strict";

                function r(t) {
                    if (t && t.__esModule) return t;
                    var e = {};
                    if (null != t)
                        for (var n in t) Object.prototype.hasOwnProperty.call(t, n) && (e[n] = t[n]);
                    return e["default"] = t, e
                }

                function o(t) {
                    return t && t.__esModule ? t : {
                        "default": t
                    }
                }

                function i(t, e) {
                    if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function")
                }

                function a(t, e) {
                    if (!t) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
                    return !e || "object" != typeof e && "function" != typeof e ? t : e
                }

                function s(t, e) {
                    if ("function" != typeof e && null !== e) throw new TypeError("Super expression must either be null or a function, not " + typeof e);
                    t.prototype = Object.create(e && e.prototype, {
                        constructor: {
                            value: t,
                            enumerable: !1,
                            writable: !0,
                            configurable: !0
                        }
                    }), e && (Object.setPrototypeOf ? Object.setPrototypeOf(t, e) : t.__proto__ = e)
                }

                function u(t, e, n, r) {
                    var o = arguments.length > 4 && void 0 !== arguments[4] ? arguments[4] : {},
                        i = t.textTracks();
                    o.kind = e, n && (o.label = n), r && (o.language = r), o.tech = t;
                    var a = new m["default"](o);
                    return i.addTrack_(a), a
                }
                n.__esModule = !0;
                var l = t(5),
                    c = o(l),
                    f = t(66),
                    p = o(f),
                    h = t(65),
                    d = o(h),
                    y = t(87),
                    v = o(y),
                    g = t(72),
                    m = o(g),
                    b = t(70),
                    _ = o(b),
                    w = t(76),
                    T = o(w),
                    E = t(63),
                    x = o(E),
                    C = t(83),
                    k = r(C),
                    S = t(86),
                    j = o(S),
                    O = t(90),
                    P = t(79),
                    M = t(46),
                    A = o(M),
                    N = t(95),
                    D = o(N),
                    L = t(94),
                    I = o(L),
                    R = t(88),
                    F = function(e) {
                        function n() {
                            var t = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {},
                                r = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : function() {};
                            i(this, n), t.reportTouchActivity = !1;
                            var o = a(this, e.call(this, null, t, r));
                            return o.hasStarted_ = !1, o.on("playing", function() {
                                this.hasStarted_ = !0
                            }), o.on("loadstart", function() {
                                this.hasStarted_ = !1
                            }), o.textTracks_ = t.textTracks, o.videoTracks_ = t.videoTracks, o.audioTracks_ = t.audioTracks, o.featuresProgressEvents || o.manualProgressOn(), o.featuresTimeupdateEvents || o.manualTimeUpdatesOn(), ["Text", "Audio", "Video"].forEach(function(e) {
                                t["native" + e + "Tracks"] === !1 && (o["featuresNative" + e + "Tracks"] = !1)
                            }), t.nativeCaptions === !1 && (o.featuresNativeTextTracks = !1), o.featuresNativeTextTracks || o.emulateTextTracks(), o.autoRemoteTextTracks_ = new _["default"], o.initTextTrackListeners(), o.initTrackListeners(), t.nativeControlsForTouch || o.emitTapEvents(), o.constructor && (o.name_ = o.constructor.name || "Unknown Tech"), o
                        }
                        return s(n, e), n.prototype.manualProgressOn = function() {
                            this.on("durationchange", this.onDurationChange), this.manualProgress = !0, this.one("ready", this.trackProgress)
                        }, n.prototype.manualProgressOff = function() {
                            this.manualProgress = !1, this.stopTrackingProgress(), this.off("durationchange", this.onDurationChange)
                        }, n.prototype.trackProgress = function(t) {
                            this.stopTrackingProgress(), this.progressInterval = this.setInterval(k.bind(this, function() {
                                var t = this.bufferedPercent();
                                this.bufferedPercent_ !== t && this.trigger("progress"), this.bufferedPercent_ = t, 1 === t && this.stopTrackingProgress()
                            }), 500)
                        }, n.prototype.onDurationChange = function(t) {
                            this.duration_ = this.duration()
                        }, n.prototype.buffered = function() {
                            return (0, O.createTimeRange)(0, 0)
                        }, n.prototype.bufferedPercent = function() {
                            return (0, P.bufferedPercent)(this.buffered(), this.duration_)
                        }, n.prototype.stopTrackingProgress = function() {
                            this.clearInterval(this.progressInterval)
                        }, n.prototype.manualTimeUpdatesOn = function() {
                            this.manualTimeUpdates = !0, this.on("play", this.trackCurrentTime), this.on("pause", this.stopTrackingCurrentTime)
                        }, n.prototype.manualTimeUpdatesOff = function() {
                            this.manualTimeUpdates = !1, this.stopTrackingCurrentTime(), this.off("play", this.trackCurrentTime), this.off("pause", this.stopTrackingCurrentTime)
                        }, n.prototype.trackCurrentTime = function() {
                            this.currentTimeInterval && this.stopTrackingCurrentTime(), this.currentTimeInterval = this.setInterval(function() {
                                this.trigger({
                                    type: "timeupdate",
                                    target: this,
                                    manuallyTriggered: !0
                                })
                            }, 250)
                        }, n.prototype.stopTrackingCurrentTime = function() {
                            this.clearInterval(this.currentTimeInterval), this.trigger({
                                type: "timeupdate",
                                target: this,
                                manuallyTriggered: !0
                            })
                        }, n.prototype.dispose = function() {
                            this.clearTracks(["audio", "video", "text"]), this.manualProgress && this.manualProgressOff(), this.manualTimeUpdates && this.manualTimeUpdatesOff(), e.prototype.dispose.call(this)
                        }, n.prototype.clearTracks = function(t) {
                            var e = this;
                            t = [].concat(t), t.forEach(function(t) {
                                for (var n = e[t + "Tracks"]() || [], r = n.length; r--;) {
                                    var o = n[r];
                                    "text" === t && e.removeRemoteTextTrack(o), n.removeTrack_(o)
                                }
                            })
                        }, n.prototype.cleanupAutoTextTracks = function() {
                            for (var t = this.autoRemoteTextTracks_ || [], e = t.length; e--;) {
                                var n = t[e];
                                this.removeRemoteTextTrack(n)
                            }
                        }, n.prototype.reset = function() {}, n.prototype.error = function(t) {
                            return void 0 !== t && (this.error_ = new A["default"](t), this.trigger("error")), this.error_
                        }, n.prototype.played = function() {
                            return this.hasStarted_ ? (0, O.createTimeRange)(0, 0) : (0, O.createTimeRange)()
                        }, n.prototype.setCurrentTime = function() {
                            this.manualTimeUpdates && this.trigger({
                                type: "timeupdate",
                                target: this,
                                manuallyTriggered: !0
                            })
                        }, n.prototype.initTextTrackListeners = function() {
                            var t = k.bind(this, function() {
                                    this.trigger("texttrackchange")
                                }),
                                e = this.textTracks();
                            e && (e.addEventListener("removetrack", t), e.addEventListener("addtrack", t), this.on("dispose", k.bind(this, function() {
                                e.removeEventListener("removetrack", t), e.removeEventListener("addtrack", t)
                            })))
                        }, n.prototype.initTrackListeners = function() {
                            var t = this;
                            ["video", "audio"].forEach(function(e) {
                                var n = function() {
                                        t.trigger(e + "trackchange")
                                    },
                                    r = t[e + "Tracks"]();
                                r.addEventListener("removetrack", n), r.addEventListener("addtrack", n), t.on("dispose", function() {
                                    r.removeEventListener("removetrack", n), r.removeEventListener("addtrack", n)
                                })
                            })
                        }, n.prototype.addWebVttScript_ = function() {
                            var e = this;
                            if (!D["default"].WebVTT)
                                if (I["default"].body.contains(this.el())) {
                                    var n = t(105);
                                    if (!this.options_["vtt.js"] && (0, R.isPlain)(n) && Object.keys(n).length > 0) return void this.trigger("vttjsloaded");
                                    var r = I["default"].createElement("script");
                                    r.src = this.options_["vtt.js"] || "https://vjs.zencdn.net/vttjs/0.12.3/vtt.min.js", r.onload = function() {
                                        e.trigger("vttjsloaded")
                                    }, r.onerror = function() {
                                        e.trigger("vttjserror")
                                    }, this.on("dispose", function() {
                                        r.onload = null, r.onerror = null
                                    }), D["default"].WebVTT = !0, this.el().parentNode.appendChild(r)
                                } else this.ready(this.addWebVttScript_)
                        }, n.prototype.emulateTextTracks = function() {
                            var t = this,
                                e = this.textTracks();
                            if (e) {
                                var n = this.remoteTextTracks(),
                                    r = function(t) {
                                        return e.addTrack_(t.track)
                                    },
                                    o = function(t) {
                                        return e.removeTrack_(t.track)
                                    };
                                n.on("addtrack", r), n.on("removetrack", o), this.addWebVttScript_();
                                var i = function() {
                                        return t.trigger("texttrackchange")
                                    },
                                    a = function() {
                                        i();
                                        for (var t = 0; t < e.length; t++) {
                                            var n = e[t];
                                            n.removeEventListener("cuechange", i), "showing" === n.mode && n.addEventListener("cuechange", i)
                                        }
                                    };
                                a(), e.addEventListener("change", a), e.addEventListener("addtrack", a), e.addEventListener("removetrack", a), this.on("dispose", function() {
                                    n.off("addtrack", r), n.off("removetrack", o), e.removeEventListener("change", a), e.removeEventListener("addtrack", a), e.removeEventListener("removetrack", a);
                                    for (var t = 0; t < e.length; t++) e[t].removeEventListener("cuechange", i)
                                })
                            }
                        }, n.prototype.videoTracks = function() {
                            return this.videoTracks_ = this.videoTracks_ || new T["default"], this.videoTracks_
                        }, n.prototype.audioTracks = function() {
                            return this.audioTracks_ = this.audioTracks_ || new x["default"], this.audioTracks_
                        }, n.prototype.textTracks = function() {
                            return this.textTracks_ = this.textTracks_ || new _["default"], this.textTracks_
                        }, n.prototype.remoteTextTracks = function() {
                            return this.remoteTextTracks_ = this.remoteTextTracks_ || new _["default"], this.remoteTextTracks_
                        }, n.prototype.remoteTextTrackEls = function() {
                            return this.remoteTextTrackEls_ = this.remoteTextTrackEls_ || new d["default"], this.remoteTextTrackEls_
                        }, n.prototype.addTextTrack = function(t, e, n) {
                            if (!t) throw new Error("TextTrack kind is required but was not provided");
                            return u(this, t, e, n)
                        }, n.prototype.createRemoteTextTrack = function(t) {
                            var e = (0, v["default"])(t, {
                                tech: this
                            });
                            return new p["default"](e)
                        }, n.prototype.addRemoteTextTrack = function() {
                            var t = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {},
                                e = arguments[1],
                                n = this.createRemoteTextTrack(t);
                            return e !== !0 && e !== !1 && (j["default"].warn('Calling addRemoteTextTrack without explicitly setting the "manualCleanup" parameter to `true` is deprecated and default to `false` in future version of video.js'), e = !0), this.remoteTextTrackEls().addTrackElement_(n), this.remoteTextTracks().addTrack_(n.track), e !== !0 && this.autoRemoteTextTracks_.addTrack_(n.track), n
                        }, n.prototype.removeRemoteTextTrack = function(t) {
                            var e = this.remoteTextTrackEls().getTrackElementByTrack_(t);
                            this.remoteTextTrackEls().removeTrackElement_(e), this.remoteTextTracks().removeTrack_(t), this.autoRemoteTextTracks_.removeTrack_(t)
                        }, n.prototype.setPoster = function() {}, n.prototype.canPlayType = function() {
                            return ""
                        }, n.isTech = function(t) {
                            return t.prototype instanceof n || t instanceof n || t === n
                        }, n.registerTech = function(t, e) {
                            if (n.techs_ || (n.techs_ = {}), !n.isTech(e)) throw new Error("Tech " + t + " must be a Tech");
                            return n.techs_[t] = e, e
                        }, n.getTech = function(t) {
                            return n.techs_ && n.techs_[t] ? n.techs_[t] : D["default"] && D["default"].videojs && D["default"].videojs[t] ? (j["default"].warn("The " + t + " tech was added to the videojs object when it should be registered using videojs.registerTech(name, tech)"), D["default"].videojs[t]) : void 0
                        }, n
                    }(c["default"]);
                F.prototype.textTracks_, F.prototype.audioTracks_, F.prototype.videoTracks_, F.prototype.featuresVolumeControl = !0, F.prototype.featuresFullscreenResize = !1, F.prototype.featuresPlaybackRate = !1, F.prototype.featuresProgressEvents = !1, F.prototype.featuresTimeupdateEvents = !1, F.prototype.featuresNativeTextTracks = !1, F.withSourceHandlers = function(t) {
                    t.registerSourceHandler = function(e, n) {
                        var r = t.sourceHandlers;
                        r || (r = t.sourceHandlers = []), void 0 === n && (n = r.length), r.splice(n, 0, e)
                    }, t.canPlayType = function(e) {
                        for (var n = t.sourceHandlers || [], r = void 0, o = 0; o < n.length; o++)
                            if (r = n[o].canPlayType(e)) return r;
                        return ""
                    }, t.selectSourceHandler = function(e, n) {
                        for (var r = t.sourceHandlers || [], o = 0; o < r.length; o++)
                            if (r[o].canHandleSource(e, n)) return r[o];
                        return null
                    }, t.canPlaySource = function(e, n) {
                        var r = t.selectSourceHandler(e, n);
                        return r ? r.canHandleSource(e, n) : ""
                    }, ["seekable", "duration"].forEach(function(t) {
                        var e = this[t];
                        "function" == typeof e && (this[t] = function() {
                            return this.sourceHandler_ && this.sourceHandler_[t] ? this.sourceHandler_[t].apply(this.sourceHandler_, arguments) : e.apply(this, arguments)
                        })
                    }, t.prototype), t.prototype.setSource = function(e) {
                        var n = t.selectSourceHandler(e, this.options_);
                        return n || (t.nativeSourceHandler ? n = t.nativeSourceHandler : j["default"].error("No source hander found for the current source.")), this.disposeSourceHandler(), this.off("dispose", this.disposeSourceHandler), n !== t.nativeSourceHandler && (this.currentSource_ = e, this.off(this.el_, "loadstart", t.prototype.firstLoadStartListener_), this.off(this.el_, "loadstart", t.prototype.successiveLoadStartListener_), this.one(this.el_, "loadstart", t.prototype.firstLoadStartListener_)), this.sourceHandler_ = n.handleSource(e, this, this.options_), this.on("dispose", this.disposeSourceHandler), this
                    }, t.prototype.firstLoadStartListener_ = function() {
                        this.one(this.el_, "loadstart", t.prototype.successiveLoadStartListener_)
                    }, t.prototype.successiveLoadStartListener_ = function() {
                        this.disposeSourceHandler(), this.one(this.el_, "loadstart", t.prototype.successiveLoadStartListener_)
                    }, t.prototype.disposeSourceHandler = function() {
                        this.currentSource_ && (this.clearTracks(["audio", "video"]), this.currentSource_ = null), this.cleanupAutoTextTracks(), this.sourceHandler_ && (this.off(this.el_, "loadstart", t.prototype.firstLoadStartListener_), this.off(this.el_, "loadstart", t.prototype.successiveLoadStartListener_), this.sourceHandler_.dispose && this.sourceHandler_.dispose(), this.sourceHandler_ = null)
                    }
                }, c["default"].registerComponent("Tech", F), c["default"].registerComponent("MediaTechController", F), F.registerTech("Tech", F), n["default"] = F
            }, {
                105: 105,
                46: 46,
                5: 5,
                63: 63,
                65: 65,
                66: 66,
                70: 70,
                72: 72,
                76: 76,
                79: 79,
                83: 83,
                86: 86,
                87: 87,
                88: 88,
                90: 90,
                94: 94,
                95: 95
            }],
            63: [function(t, e, n) {
                "use strict";

                function r(t) {
                    if (t && t.__esModule) return t;
                    var e = {};
                    if (null != t)
                        for (var n in t) Object.prototype.hasOwnProperty.call(t, n) && (e[n] = t[n]);
                    return e["default"] = t, e
                }

                function o(t) {
                    return t && t.__esModule ? t : {
                        "default": t
                    }
                }

                function i(t, e) {
                    if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function")
                }

                function a(t, e) {
                    if (!t) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
                    return !e || "object" != typeof e && "function" != typeof e ? t : e
                }

                function s(t, e) {
                    if ("function" != typeof e && null !== e) throw new TypeError("Super expression must either be null or a function, not " + typeof e);
                    t.prototype = Object.create(e && e.prototype, {
                        constructor: {
                            value: t,
                            enumerable: !1,
                            writable: !0,
                            configurable: !0
                        }
                    }), e && (Object.setPrototypeOf ? Object.setPrototypeOf(t, e) : t.__proto__ = e)
                }
                n.__esModule = !0;
                var u = t(74),
                    l = o(u),
                    c = t(78),
                    f = r(c),
                    p = t(94),
                    h = o(p),
                    d = function(t, e) {
                        for (var n = 0; n < t.length; n++) e.id !== t[n].id && (t[n].enabled = !1)
                    },
                    y = function(t) {
                        function e() {
                            var n, r, o = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : [];
                            i(this, e);
                            for (var s = void 0, u = o.length - 1; u >= 0; u--)
                                if (o[u].enabled) {
                                    d(o, o[u]);
                                    break
                                } if (f.IS_IE8) {
                                s = h["default"].createElement("custom");
                                for (var c in l["default"].prototype) "constructor" !== c && (s[c] = l["default"].prototype[c]);
                                for (var p in e.prototype) "constructor" !== p && (s[p] = e.prototype[p])
                            }
                            return s = n = a(this, t.call(this, o, s)), s.changing_ = !1, r = s, a(n, r)
                        }
                        return s(e, t), e.prototype.addTrack_ = function(e) {
                            var n = this;
                            e.enabled && d(this, e), t.prototype.addTrack_.call(this, e), e.addEventListener && e.addEventListener("enabledchange", function() {
                                n.changing_ || (n.changing_ = !0, d(n, e), n.changing_ = !1, n.trigger("change"))
                            })
                        }, e.prototype.addTrack = function(t) {
                            this.addTrack_(t)
                        }, e.prototype.removeTrack = function(e) {
                            t.prototype.removeTrack_.call(this, e)
                        }, e
                    }(l["default"]);
                n["default"] = y
            }, {
                74: 74,
                78: 78,
                94: 94
            }],
            64: [function(t, e, n) {
                "use strict";

                function r(t) {
                    if (t && t.__esModule) return t;
                    var e = {};
                    if (null != t)
                        for (var n in t) Object.prototype.hasOwnProperty.call(t, n) && (e[n] = t[n]);
                    return e["default"] = t, e
                }

                function o(t) {
                    return t && t.__esModule ? t : {
                        "default": t
                    }
                }

                function i(t, e) {
                    if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function")
                }

                function a(t, e) {
                    if (!t) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
                    return !e || "object" != typeof e && "function" != typeof e ? t : e
                }

                function s(t, e) {
                    if ("function" != typeof e && null !== e) throw new TypeError("Super expression must either be null or a function, not " + typeof e);
                    t.prototype = Object.create(e && e.prototype, {
                        constructor: {
                            value: t,
                            enumerable: !1,
                            writable: !0,
                            configurable: !0
                        }
                    }), e && (Object.setPrototypeOf ? Object.setPrototypeOf(t, e) : t.__proto__ = e)
                }
                n.__esModule = !0;
                var u = t(73),
                    l = t(75),
                    c = o(l),
                    f = t(87),
                    p = o(f),
                    h = t(78),
                    d = r(h),
                    y = function(t) {
                        function e() {
                            var n, r, o = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};
                            i(this, e);
                            var s = (0, p["default"])(o, {
                                    kind: u.AudioTrackKind[o.kind] || ""
                                }),
                                l = n = a(this, t.call(this, s)),
                                c = !1;
                            if (d.IS_IE8)
                                for (var f in e.prototype) "constructor" !== f && (l[f] = e.prototype[f]);
                            return Object.defineProperty(l, "enabled", {
                                get: function() {
                                    return c
                                },
                                set: function(t) {
                                    "boolean" == typeof t && t !== c && (c = t, this.trigger("enabledchange"))
                                }
                            }), s.enabled && (l.enabled = s.enabled), l.loaded_ = !0, r = l, a(n, r)
                        }
                        return s(e, t), e
                    }(c["default"]);
                n["default"] = y
            }, {
                73: 73,
                75: 75,
                78: 78,
                87: 87
            }],
            65: [function(t, e, n) {
                "use strict";

                function r(t) {
                    return t && t.__esModule ? t : {
                        "default": t
                    }
                }

                function o(t) {
                    if (t && t.__esModule) return t;
                    var e = {};
                    if (null != t)
                        for (var n in t) Object.prototype.hasOwnProperty.call(t, n) && (e[n] = t[n]);
                    return e["default"] = t, e
                }

                function i(t, e) {
                    if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function")
                }
                n.__esModule = !0;
                var a = t(78),
                    s = o(a),
                    u = t(94),
                    l = r(u),
                    c = function() {
                        function t() {
                            var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : [];
                            i(this, t);
                            var n = this;
                            if (s.IS_IE8) {
                                n = l["default"].createElement("custom");
                                for (var r in t.prototype) "constructor" !== r && (n[r] = t.prototype[r])
                            }
                            n.trackElements_ = [], Object.defineProperty(n, "length", {
                                get: function() {
                                    return this.trackElements_.length
                                }
                            });
                            for (var o = 0, a = e.length; o < a; o++) n.addTrackElement_(e[o]);
                            if (s.IS_IE8) return n
                        }
                        return t.prototype.addTrackElement_ = function(t) {
                            var e = this.trackElements_.length;
                            "" + e in this || Object.defineProperty(this, e, {
                                get: function() {
                                    return this.trackElements_[e]
                                }
                            }), this.trackElements_.indexOf(t) === -1 && this.trackElements_.push(t)
                        }, t.prototype.getTrackElementByTrack_ = function(t) {
                            for (var e = void 0, n = 0, r = this.trackElements_.length; n < r; n++)
                                if (t === this.trackElements_[n].track) {
                                    e = this.trackElements_[n];
                                    break
                                } return e
                        }, t.prototype.removeTrackElement_ = function(t) {
                            for (var e = 0, n = this.trackElements_.length; e < n; e++)
                                if (t === this.trackElements_[e]) {
                                    this.trackElements_.splice(e, 1);
                                    break
                                }
                        }, t
                    }();
                n["default"] = c
            }, {
                78: 78,
                94: 94
            }],
            66: [function(t, e, n) {
                "use strict";

                function r(t) {
                    return t && t.__esModule ? t : {
                        "default": t
                    }
                }

                function o(t) {
                    if (t && t.__esModule) return t;
                    var e = {};
                    if (null != t)
                        for (var n in t) Object.prototype.hasOwnProperty.call(t, n) && (e[n] = t[n]);
                    return e["default"] = t, e
                }

                function i(t, e) {
                    if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function")
                }

                function a(t, e) {
                    if (!t) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
                    return !e || "object" != typeof e && "function" != typeof e ? t : e
                }

                function s(t, e) {
                    if ("function" != typeof e && null !== e) throw new TypeError("Super expression must either be null or a function, not " + typeof e);
                    t.prototype = Object.create(e && e.prototype, {
                        constructor: {
                            value: t,
                            enumerable: !1,
                            writable: !0,
                            configurable: !0
                        }
                    }), e && (Object.setPrototypeOf ? Object.setPrototypeOf(t, e) : t.__proto__ = e)
                }
                n.__esModule = !0;
                var u = t(78),
                    l = o(u),
                    c = t(94),
                    f = r(c),
                    p = t(42),
                    h = r(p),
                    d = t(72),
                    y = r(d),
                    v = function(t) {
                        function e() {
                            var n = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};
                            i(this, e);
                            var r = a(this, t.call(this)),
                                o = void 0,
                                s = r;
                            if (l.IS_IE8) {
                                s = f["default"].createElement("custom");
                                for (var u in e.prototype) "constructor" !== u && (s[u] = e.prototype[u])
                            }
                            var c = new y["default"](n);
                            if (s.kind = c.kind, s.src = c.src, s.srclang = c.language, s.label = c.label, s["default"] = c["default"], Object.defineProperty(s, "readyState", {
                                    get: function() {
                                        return o
                                    }
                                }), Object.defineProperty(s, "track", {
                                    get: function() {
                                        return c
                                    }
                                }), o = 0, c.addEventListener("loadeddata", function() {
                                    o = 2, s.trigger({
                                        type: "load",
                                        target: s
                                    })
                                }), l.IS_IE8) {
                                var p;
                                return p = s, a(r, p)
                            }
                            return r
                        }
                        return s(e, t), e
                    }(h["default"]);
                v.prototype.allowedEvents_ = {
                    load: "load"
                }, v.NONE = 0, v.LOADING = 1, v.LOADED = 2, v.ERROR = 3, n["default"] = v
            }, {
                42: 42,
                72: 72,
                78: 78,
                94: 94
            }],
            67: [function(t, e, n) {
                "use strict";

                function r(t) {
                    return t && t.__esModule ? t : {
                        "default": t
                    }
                }

                function o(t) {
                    if (t && t.__esModule) return t;
                    var e = {};
                    if (null != t)
                        for (var n in t) Object.prototype.hasOwnProperty.call(t, n) && (e[n] = t[n]);
                    return e["default"] = t, e
                }

                function i(t, e) {
                    if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function")
                }
                n.__esModule = !0;
                var a = t(78),
                    s = o(a),
                    u = t(94),
                    l = r(u),
                    c = function() {
                        function t(e) {
                            i(this, t);
                            var n = this;
                            if (s.IS_IE8) {
                                n = l["default"].createElement("custom");
                                for (var r in t.prototype) "constructor" !== r && (n[r] = t.prototype[r])
                            }
                            if (t.prototype.setCues_.call(n, e), Object.defineProperty(n, "length", {
                                    get: function() {
                                        return this.length_
                                    }
                                }), s.IS_IE8) return n
                        }
                        return t.prototype.setCues_ = function(t) {
                            var e = this.length || 0,
                                n = 0,
                                r = t.length;
                            this.cues_ = t, this.length_ = t.length;
                            var o = function(t) {
                                "" + t in this || Object.defineProperty(this, "" + t, {
                                    get: function() {
                                        return this.cues_[t]
                                    }
                                })
                            };
                            if (e < r)
                                for (n = e; n < r; n++) o.call(this, n)
                        }, t.prototype.getCueById = function(t) {
                            for (var e = null, n = 0, r = this.length; n < r; n++) {
                                var o = this[n];
                                if (o.id === t) {
                                    e = o;
                                    break
                                }
                            }
                            return e
                        }, t
                    }();
                n["default"] = c
            }, {
                78: 78,
                94: 94
            }],
            68: [function(t, e, n) {
                "use strict";

                function r(t) {
                    if (t && t.__esModule) return t;
                    var e = {};
                    if (null != t)
                        for (var n in t) Object.prototype.hasOwnProperty.call(t, n) && (e[n] = t[n]);
                    return e["default"] = t, e
                }

                function o(t) {
                    return t && t.__esModule ? t : {
                        "default": t
                    }
                }

                function i(t, e) {
                    if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function")
                }

                function a(t, e) {
                    if (!t) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
                    return !e || "object" != typeof e && "function" != typeof e ? t : e
                }

                function s(t, e) {
                    if ("function" != typeof e && null !== e) throw new TypeError("Super expression must either be null or a function, not " + typeof e);
                    t.prototype = Object.create(e && e.prototype, {
                        constructor: {
                            value: t,
                            enumerable: !1,
                            writable: !0,
                            configurable: !0
                        }
                    }), e && (Object.setPrototypeOf ? Object.setPrototypeOf(t, e) : t.__proto__ = e)
                }

                function u(t, e) {
                    return "rgba(" + parseInt(t[1] + t[1], 16) + "," + parseInt(t[2] + t[2], 16) + "," + parseInt(t[3] + t[3], 16) + "," + e + ")"
                }

                function l(t, e, n) {
                    try {
                        t.style[e] = n
                    } catch (r) {
                        return
                    }
                }
                n.__esModule = !0;
                var c = t(5),
                    f = o(c),
                    p = t(83),
                    h = r(p),
                    d = t(95),
                    y = o(d),
                    v = {
                        monospace: "monospace",
                        sansSerif: "sans-serif",
                        serif: "serif",
                        monospaceSansSerif: '"Andale Mono", "Lucida Console", monospace',
                        monospaceSerif: '"Courier New", monospace',
                        proportionalSansSerif: "sans-serif",
                        proportionalSerif: "serif",
                        casual: '"Comic Sans MS", Impact, fantasy',
                        script: '"Monotype Corsiva", cursive',
                        smallcaps: '"Andale Mono", "Lucida Console", monospace, sans-serif'
                    },
                    g = function(t) {
                        function e(n, r, o) {
                            i(this, e);
                            var s = a(this, t.call(this, n, r, o));
                            return n.on("loadstart", h.bind(s, s.toggleDisplay)), n.on("texttrackchange", h.bind(s, s.updateDisplay)), n.ready(h.bind(s, function() {
                                if (n.tech_ && n.tech_.featuresNativeTextTracks) return void this.hide();
                                n.on("fullscreenchange", h.bind(this, this.updateDisplay));
                                for (var t = this.options_.playerOptions.tracks || [], e = 0; e < t.length; e++) this.player_.addRemoteTextTrack(t[e], !0);
                                var r = {
                                        captions: 1,
                                        subtitles: 1
                                    },
                                    o = this.player_.textTracks(),
                                    i = void 0,
                                    a = void 0;
                                if (o) {
                                    for (var s = 0; s < o.length; s++) {
                                        var u = o[s];
                                        u["default"] && ("descriptions" !== u.kind || i ? u.kind in r && !a && (a = u) : i = u)
                                    }
                                    a ? a.mode = "showing" : i && (i.mode = "showing")
                                }
                            })), s
                        }
                        return s(e, t), e.prototype.toggleDisplay = function() {
                            this.player_.tech_ && this.player_.tech_.featuresNativeTextTracks ? this.hide() : this.show()
                        }, e.prototype.createEl = function() {
                            return t.prototype.createEl.call(this, "div", {
                                className: "vjs-text-track-display"
                            }, {
                                "aria-live": "off",
                                "aria-atomic": "true"
                            })
                        }, e.prototype.clearDisplay = function() {
                            "function" == typeof y["default"].WebVTT && y["default"].WebVTT.processCues(y["default"], [], this.el_)
                        }, e.prototype.updateDisplay = function() {
                            var t = this.player_.textTracks();
                            if (this.clearDisplay(), t) {
                                for (var e = null, n = null, r = t.length; r--;) {
                                    var o = t[r];
                                    "showing" === o.mode && ("descriptions" === o.kind ? e = o : n = o)
                                }
                                n ? ("off" !== this.getAttribute("aria-live") && this.setAttribute("aria-live", "off"), this.updateForTrack(n)) : e && ("assertive" !== this.getAttribute("aria-live") && this.setAttribute("aria-live", "assertive"), this.updateForTrack(e))
                            }
                        }, e.prototype.updateForTrack = function(t) {
                            if ("function" == typeof y["default"].WebVTT && t.activeCues) {
                                for (var e = this.player_.textTrackSettings.getValues(), n = [], r = 0; r < t.activeCues.length; r++) n.push(t.activeCues[r]);
                                y["default"].WebVTT.processCues(y["default"], n, this.el_);
                                for (var o = n.length; o--;) {
                                    var i = n[o];
                                    if (i) {
                                        var a = i.displayState;
                                        if (e.color && (a.firstChild.style.color = e.color), e.textOpacity && l(a.firstChild, "color", u(e.color || "#fff", e.textOpacity)), e.backgroundColor && (a.firstChild.style.backgroundColor = e.backgroundColor), e.backgroundOpacity && l(a.firstChild, "backgroundColor", u(e.backgroundColor || "#000", e.backgroundOpacity)), e.windowColor && (e.windowOpacity ? l(a, "backgroundColor", u(e.windowColor, e.windowOpacity)) : a.style.backgroundColor = e.windowColor), e.edgeStyle && ("dropshadow" === e.edgeStyle ? a.firstChild.style.textShadow = "2px 2px 3px #222, 2px 2px 4px #222, 2px 2px 5px #222" : "raised" === e.edgeStyle ? a.firstChild.style.textShadow = "1px 1px #222, 2px 2px #222, 3px 3px #222" : "depressed" === e.edgeStyle ? a.firstChild.style.textShadow = "1px 1px #ccc, 0 1px #ccc, -1px -1px #222, 0 -1px #222" : "uniform" === e.edgeStyle && (a.firstChild.style.textShadow = "0 0 4px #222, 0 0 4px #222, 0 0 4px #222, 0 0 4px #222")), e.fontPercent && 1 !== e.fontPercent) {
                                            var s = y["default"].parseFloat(a.style.fontSize);
                                            a.style.fontSize = s * e.fontPercent + "px", a.style.height = "auto", a.style.top = "auto", a.style.bottom = "2px"
                                        }
                                        e.fontFamily && "default" !== e.fontFamily && ("small-caps" === e.fontFamily ? a.firstChild.style.fontVariant = "small-caps" : a.firstChild.style.fontFamily = v[e.fontFamily])
                                    }
                                }
                            }
                        }, e
                    }(f["default"]);
                f["default"].registerComponent("TextTrackDisplay", g), n["default"] = g
            }, {
                5: 5,
                83: 83,
                95: 95
            }],
            69: [function(t, e, n) {
                "use strict";
                n.__esModule = !0;
                var r = function(t) {
                        return ["kind", "label", "language", "id", "inBandMetadataTrackDispatchType", "mode", "src"].reduce(function(e, n, r) {
                            return t[n] && (e[n] = t[n]), e
                        }, {
                            cues: t.cues && Array.prototype.map.call(t.cues, function(t) {
                                return {
                                    startTime: t.startTime,
                                    endTime: t.endTime,
                                    text: t.text,
                                    id: t.id
                                }
                            })
                        })
                    },
                    o = function(t) {
                        var e = t.$$("track"),
                            n = Array.prototype.map.call(e, function(t) {
                                return t.track
                            });
                        return Array.prototype.map.call(e, function(t) {
                            var e = r(t.track);
                            return t.src && (e.src = t.src), e
                        }).concat(Array.prototype.filter.call(t.textTracks(), function(t) {
                            return n.indexOf(t) === -1
                        }).map(r))
                    },
                    i = function(t, e) {
                        return t.forEach(function(t) {
                            var n = e.addRemoteTextTrack(t).track;
                            !t.src && t.cues && t.cues.forEach(function(t) {
                                return n.addCue(t)
                            })
                        }), e.textTracks()
                    };
                n["default"] = {
                    textTracksToJson: o,
                    jsonToTextTracks: i,
                    trackToJson_: r
                }
            }, {}],
            70: [function(t, e, n) {
                "use strict";

                function r(t) {
                    if (t && t.__esModule) return t;
                    var e = {};
                    if (null != t)
                        for (var n in t) Object.prototype.hasOwnProperty.call(t, n) && (e[n] = t[n]);
                    return e["default"] = t, e
                }

                function o(t) {
                    return t && t.__esModule ? t : {
                        "default": t
                    }
                }

                function i(t, e) {
                    if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function")
                }

                function a(t, e) {
                    if (!t) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
                    return !e || "object" != typeof e && "function" != typeof e ? t : e
                }

                function s(t, e) {
                    if ("function" != typeof e && null !== e) throw new TypeError("Super expression must either be null or a function, not " + typeof e);
                    t.prototype = Object.create(e && e.prototype, {
                        constructor: {
                            value: t,
                            enumerable: !1,
                            writable: !0,
                            configurable: !0
                        }
                    }), e && (Object.setPrototypeOf ? Object.setPrototypeOf(t, e) : t.__proto__ = e)
                }
                n.__esModule = !0;
                var u = t(74),
                    l = o(u),
                    c = t(83),
                    f = r(c),
                    p = t(78),
                    h = r(p),
                    d = t(94),
                    y = o(d),
                    v = function(t) {
                        function e() {
                            var n, r, o = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : [];
                            i(this, e);
                            var s = void 0;
                            if (h.IS_IE8) {
                                s = y["default"].createElement("custom");
                                for (var u in l["default"].prototype) "constructor" !== u && (s[u] = l["default"].prototype[u]);
                                for (var c in e.prototype) "constructor" !== c && (s[c] = e.prototype[c])
                            }
                            return s = n = a(this, t.call(this, o, s)), r = s, a(n, r)
                        }
                        return s(e, t), e.prototype.addTrack_ = function(e) {
                            t.prototype.addTrack_.call(this, e), e.addEventListener("modechange", f.bind(this, function() {
                                this.trigger("change")
                            }))
                        }, e
                    }(l["default"]);
                n["default"] = v
            }, {
                74: 74,
                78: 78,
                83: 83,
                94: 94
            }],
            71: [function(t, e, n) {
                "use strict";

                function r(t) {
                    if (t && t.__esModule) return t;
                    var e = {};
                    if (null != t)
                        for (var n in t) Object.prototype.hasOwnProperty.call(t, n) && (e[n] = t[n]);
                    return e["default"] = t, e
                }

                function o(t) {
                    return t && t.__esModule ? t : {
                        "default": t
                    }
                }

                function i(t, e) {
                    if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function")
                }

                function a(t, e) {
                    if (!t) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
                    return !e || "object" != typeof e && "function" != typeof e ? t : e
                }

                function s(t, e) {
                    if ("function" != typeof e && null !== e) throw new TypeError("Super expression must either be null or a function, not " + typeof e);
                    t.prototype = Object.create(e && e.prototype, {
                        constructor: {
                            value: t,
                            enumerable: !1,
                            writable: !0,
                            configurable: !0
                        }
                    }), e && (Object.setPrototypeOf ? Object.setPrototypeOf(t, e) : t.__proto__ = e)
                }

                function u(t, e) {
                    if (e && (t = e(t)), t && "none" !== t) return t
                }

                function l(t, e) {
                    return u(t.options[t.options.selectedIndex].value, e)
                }

                function c(t, e, n) {
                    if (e)
                        for (var r = 0; r < t.options.length; r++)
                            if (u(t.options[r].value, n) === e) {
                                t.selectedIndex = r;
                                break
                            }
                }
                n.__esModule = !0;
                var f = t(95),
                    p = o(f),
                    h = t(5),
                    d = o(h),
                    y = t(81),
                    v = t(83),
                    g = r(v),
                    m = t(88),
                    b = r(m),
                    _ = t(86),
                    w = o(_),
                    T = ["#000", "Black"],
                    E = ["#00F", "Blue"],
                    x = ["#0FF", "Cyan"],
                    C = ["#0F0", "Green"],
                    k = ["#F0F", "Magenta"],
                    S = ["#F00", "Red"],
                    j = ["#FFF", "White"],
                    O = ["#FF0", "Yellow"],
                    P = ["1", "Opaque"],
                    M = ["0.5", "Semi-Transparent"],
                    A = ["0", "Transparent"],
                    N = {
                        backgroundColor: {
                            selector: ".vjs-bg-color > select",
                            id: "captions-background-color-%s",
                            label: "Color",
                            options: [T, j, S, C, E, O, k, x]
                        },
                        backgroundOpacity: {
                            selector: ".vjs-bg-opacity > select",
                            id: "captions-background-opacity-%s",
                            label: "Transparency",
                            options: [P, M, A]
                        },
                        color: {
                            selector: ".vjs-fg-color > select",
                            id: "captions-foreground-color-%s",
                            label: "Color",
                            options: [j, T, S, C, E, O, k, x]
                        },
                        edgeStyle: {
                            selector: ".vjs-edge-style > select",
                            id: "%s",
                            label: "Text Edge Style",
                            options: [
                                ["none", "None"],
                                ["raised", "Raised"],
                                ["depressed", "Depressed"],
                                ["uniform", "Uniform"],
                                ["dropshadow", "Dropshadow"]
                            ]
                        },
                        fontFamily: {
                            selector: ".vjs-font-family > select",
                            id: "captions-font-family-%s",
                            label: "Font Family",
                            options: [
                                ["proportionalSansSerif", "Proportional Sans-Serif"],
                                ["monospaceSansSerif", "Monospace Sans-Serif"],
                                ["proportionalSerif", "Proportional Serif"],
                                ["monospaceSerif", "Monospace Serif"],
                                ["casual", "Casual"],
                                ["script", "Script"],
                                ["small-caps", "Small Caps"]
                            ]
                        },
                        fontPercent: {
                            selector: ".vjs-font-percent > select",
                            id: "captions-font-size-%s",
                            label: "Font Size",
                            options: [
                                ["0.50", "50%"],
                                ["0.75", "75%"],
                                ["1.00", "100%"],
                                ["1.25", "125%"],
                                ["1.50", "150%"],
                                ["1.75", "175%"],
                                ["2.00", "200%"],
                                ["3.00", "300%"],
                                ["4.00", "400%"]
                            ],
                            "default": 2,
                            parser: function(t) {
                                return "1.00" === t ? null : Number(t)
                            }
                        },
                        textOpacity: {
                            selector: ".vjs-text-opacity > select",
                            id: "captions-foreground-opacity-%s",
                            label: "Transparency",
                            options: [P, M]
                        },
                        windowColor: {
                            selector: ".vjs-window-color > select",
                            id: "captions-window-color-%s",
                            label: "Color"
                        },
                        windowOpacity: {
                            selector: ".vjs-window-opacity > select",
                            id: "captions-window-opacity-%s",
                            label: "Transparency",
                            options: [A, M, P]
                        }
                    };
                N.windowColor.options = N.backgroundColor.options;
                var D = function(t) {
                    function e(n, r) {
                        i(this, e);
                        var o = a(this, t.call(this, n, r));
                        return o.setDefaults(), o.hide(), o.updateDisplay = g.bind(o, o.updateDisplay), void 0 === r.persistTextTrackSettings && (o.options_.persistTextTrackSettings = o.options_.playerOptions.persistTextTrackSettings), o.on(o.$(".vjs-done-button"), "click", function() {
                            o.saveSettings(), o.hide()
                        }), o.on(o.$(".vjs-default-button"), "click", function() {
                            o.setDefaults(), o.updateDisplay()
                        }), b.each(N, function(t) {
                            o.on(o.$(t.selector), "change", o.updateDisplay)
                        }), o.options_.persistTextTrackSettings && o.restoreSettings(), o
                    }
                    return s(e, t), e.prototype.createElSelect_ = function(t) {
                        var e = this,
                            n = N[t],
                            r = n.id.replace("%s", this.id_);
                        return [(0, y.createEl)("label", {
                            className: "vjs-label",
                            textContent: n.label
                        }, {
                            "for": r
                        }), (0, y.createEl)("select", {
                            id: r
                        }, void 0, n.options.map(function(t) {
                            return (0, y.createEl)("option", {
                                textContent: e.localize(t[1]),
                                value: t[0]
                            })
                        }))]
                    }, e.prototype.createElFgColor_ = function() {
                        var t = (0, y.createEl)("legend", {
                                textContent: this.localize("Text")
                            }),
                            e = this.createElSelect_("color"),
                            n = (0, y.createEl)("span", {
                                className: "vjs-text-opacity vjs-opacity"
                            }, void 0, this.createElSelect_("textOpacity"));
                        return (0, y.createEl)("fieldset", {
                            className: "vjs-fg-color vjs-tracksetting"
                        }, void 0, [t].concat(e, n))
                    }, e.prototype.createElBgColor_ = function() {
                        var t = (0, y.createEl)("legend", {
                                textContent: this.localize("Background")
                            }),
                            e = this.createElSelect_("backgroundColor"),
                            n = (0, y.createEl)("span", {
                                className: "vjs-bg-opacity vjs-opacity"
                            }, void 0, this.createElSelect_("backgroundOpacity"));
                        return (0, y.createEl)("fieldset", {
                            className: "vjs-bg-color vjs-tracksetting"
                        }, void 0, [t].concat(e, n))
                    }, e.prototype.createElWinColor_ = function() {
                        var t = (0, y.createEl)("legend", {
                                textContent: this.localize("Window")
                            }),
                            e = this.createElSelect_("windowColor"),
                            n = (0, y.createEl)("span", {
                                className: "vjs-window-opacity vjs-opacity"
                            }, void 0, this.createElSelect_("windowOpacity"));
                        return (0, y.createEl)("fieldset", {
                            className: "vjs-window-color vjs-tracksetting"
                        }, void 0, [t].concat(e, n))
                    }, e.prototype.createElColors_ = function() {
                        return (0, y.createEl)("div", {
                            className: "vjs-tracksettings-colors"
                        }, void 0, [this.createElFgColor_(), this.createElBgColor_(), this.createElWinColor_()])
                    }, e.prototype.createElFont_ = function() {
                        var t = (0, y.createEl)("div", {
                                className: "vjs-font-percent vjs-tracksetting"
                            }, void 0, this.createElSelect_("fontPercent")),
                            e = (0, y.createEl)("div", {
                                className: "vjs-edge-style vjs-tracksetting"
                            }, void 0, this.createElSelect_("edgeStyle")),
                            n = (0, y.createEl)("div", {
                                className: "vjs-font-family vjs-tracksetting"
                            }, void 0, this.createElSelect_("fontFamily"));
                        return (0, y.createEl)("div", {
                            className: "vjs-tracksettings-font"
                        }, void 0, [t, e, n])
                    }, e.prototype.createElControls_ = function() {
                        var t = (0, y.createEl)("button", {
                                className: "vjs-default-button",
                                textContent: this.localize("Defaults")
                            }),
                            e = (0, y.createEl)("button", {
                                className: "vjs-done-button",
                                textContent: "Done"
                            });
                        return (0, y.createEl)("div", {
                            className: "vjs-tracksettings-controls"
                        }, void 0, [t, e])
                    }, e.prototype.createEl = function() {
                        var t = (0, y.createEl)("div", {
                                className: "vjs-tracksettings"
                            }, void 0, [this.createElColors_(), this.createElFont_(), this.createElControls_()]),
                            e = (0, y.createEl)("div", {
                                className: "vjs-control-text",
                                id: "TTsettingsDialogLabel-" + this.id_,
                                textContent: "Caption Settings Dialog"
                            }, {
                                "aria-level": "1",
                                role: "heading"
                            }),
                            n = (0, y.createEl)("div", {
                                className: "vjs-control-text",
                                id: "TTsettingsDialogDescription-" + this.id_,
                                textContent: "Beginning of dialog window. Escape will cancel and close the window."
                            }),
                            r = (0, y.createEl)("div", void 0, {
                                role: "document"
                            }, [e, n, t]);
                        return (0, y.createEl)("div", {
                            className: "vjs-caption-settings vjs-modal-overlay",
                            tabIndex: -1
                        }, {
                            role: "dialog",
                            "aria-labelledby": e.id,
                            "aria-describedby": n.id
                        }, r)
                    }, e.prototype.getValues = function() {
                        var t = this;
                        return b.reduce(N, function(e, n, r) {
                            var o = l(t.$(n.selector), n.parser);
                            return void 0 !== o && (e[r] = o), e
                        }, {})
                    }, e.prototype.setValues = function(t) {
                        var e = this;
                        b.each(N, function(n, r) {
                            c(e.$(n.selector), t[r], n.parser)
                        })
                    }, e.prototype.setDefaults = function() {
                        var t = this;
                        b.each(N, function(e) {
                            var n = e.hasOwnProperty("default") ? e["default"] : 0;
                            t.$(e.selector).selectedIndex = n
                        })
                    }, e.prototype.restoreSettings = function() {
                        var t = void 0;
                        try {
                            t = JSON.parse(p["default"].localStorage.getItem("vjs-text-track-settings"))
                        } catch (e) {
                            w["default"].warn(e)
                        }
                        t && this.setValues(t)
                    }, e.prototype.saveSettings = function() {
                        if (this.options_.persistTextTrackSettings) {
                            var t = this.getValues();
                            try {
                                Object.keys(t).length ? p["default"].localStorage.setItem("vjs-text-track-settings", JSON.stringify(t)) : p["default"].localStorage.removeItem("vjs-text-track-settings")
                            } catch (e) {
                                w["default"].warn(e)
                            }
                        }
                    }, e.prototype.updateDisplay = function() {
                        var t = this.player_.getChild("textTrackDisplay");
                        t && t.updateDisplay()
                    }, e
                }(d["default"]);
                d["default"].registerComponent("TextTrackSettings", D), n["default"] = D
            }, {
                5: 5,
                81: 81,
                83: 83,
                86: 86,
                88: 88,
                95: 95
            }],
            72: [function(t, e, n) {
                "use strict";

                function r(t) {
                    if (t && t.__esModule) return t;
                    var e = {};
                    if (null != t)
                        for (var n in t) Object.prototype.hasOwnProperty.call(t, n) && (e[n] = t[n]);
                    return e["default"] = t, e
                }

                function o(t) {
                    return t && t.__esModule ? t : {
                        "default": t
                    }
                }

                function i(t, e) {
                    if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function")
                }

                function a(t, e) {
                    if (!t) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
                    return !e || "object" != typeof e && "function" != typeof e ? t : e
                }

                function s(t, e) {
                    if ("function" != typeof e && null !== e) throw new TypeError("Super expression must either be null or a function, not " + typeof e);
                    t.prototype = Object.create(e && e.prototype, {
                        constructor: {
                            value: t,
                            enumerable: !1,
                            writable: !0,
                            configurable: !0
                        }
                    }), e && (Object.setPrototypeOf ? Object.setPrototypeOf(t, e) : t.__proto__ = e)
                }
                n.__esModule = !0;
                var u = t(67),
                    l = o(u),
                    c = t(83),
                    f = r(c),
                    p = t(73),
                    h = t(86),
                    d = o(h),
                    y = t(95),
                    v = o(y),
                    g = t(75),
                    m = o(g),
                    b = t(92),
                    _ = t(99),
                    w = o(_),
                    T = t(87),
                    E = o(T),
                    x = t(78),
                    C = r(x),
                    k = function(t, e) {
                        var n = new v["default"].WebVTT.Parser(v["default"], v["default"].vttjs, v["default"].WebVTT.StringDecoder()),
                            r = [];
                        n.oncue = function(t) {
                            e.addCue(t)
                        }, n.onparsingerror = function(t) {
                            r.push(t)
                        }, n.onflush = function() {
                            e.trigger({
                                type: "loadeddata",
                                target: e
                            })
                        }, n.parse(t), r.length > 0 && (v["default"].console && v["default"].console.groupCollapsed && v["default"].console.groupCollapsed("Text Track parsing errors for " + e.src), r.forEach(function(t) {
                            return d["default"].error(t)
                        }), v["default"].console && v["default"].console.groupEnd && v["default"].console.groupEnd()), n.flush()
                    },
                    S = function(t, e) {
                        var n = {
                                uri: t
                            },
                            r = (0, b.isCrossOrigin)(t);
                        r && (n.cors = r), (0, w["default"])(n, f.bind(this, function(t, n, r) {
                            if (t) return d["default"].error(t, n);
                            if (e.loaded_ = !0, "function" != typeof v["default"].WebVTT) {
                                if (e.tech_) {
                                    var o = function() {
                                        return k(r, e)
                                    };
                                    e.tech_.on("vttjsloaded", o), e.tech_.on("vttjserror", function() {
                                        d["default"].error("vttjs failed to load, stopping trying to process " + e.src), e.tech_.off("vttjsloaded", o)
                                    })
                                }
                            } else k(r, e)
                        }))
                    },
                    j = function(t) {
                        function e() {
                            var n, r, o = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};
                            if (i(this, e), !o.tech) throw new Error("A tech was not provided.");
                            var s = (0, E["default"])(o, {
                                    kind: p.TextTrackKind[o.kind] || "subtitles",
                                    language: o.language || o.srclang || ""
                                }),
                                u = p.TextTrackMode[s.mode] || "disabled",
                                c = s["default"];
                            "metadata" !== s.kind && "chapters" !== s.kind || (u = "hidden");
                            var h = n = a(this, t.call(this, s));
                            if (h.tech_ = s.tech, C.IS_IE8)
                                for (var d in e.prototype) "constructor" !== d && (h[d] = e.prototype[d]);
                            h.cues_ = [], h.activeCues_ = [];
                            var y = new l["default"](h.cues_),
                                v = new l["default"](h.activeCues_),
                                g = !1,
                                m = f.bind(h, function() {
                                    this.activeCues, g && (this.trigger("cuechange"), g = !1)
                                });
                            return "disabled" !== u && h.tech_.ready(function() {
                                h.tech_.on("timeupdate", m)
                            }, !0), Object.defineProperty(h, "default", {
                                get: function() {
                                    return c
                                },
                                set: function() {}
                            }), Object.defineProperty(h, "mode", {
                                get: function() {
                                    return u
                                },
                                set: function(t) {
                                    var e = this;
                                    p.TextTrackMode[t] && (u = t, "showing" === u && this.tech_.ready(function() {
                                        e.tech_.on("timeupdate", m)
                                    }, !0), this.trigger("modechange"))
                                }
                            }), Object.defineProperty(h, "cues", {
                                get: function() {
                                    return this.loaded_ ? y : null
                                },
                                set: function() {}
                            }), Object.defineProperty(h, "activeCues", {
                                get: function() {
                                    if (!this.loaded_) return null;
                                    if (0 === this.cues.length) return v;
                                    for (var t = this.tech_.currentTime(), e = [], n = 0, r = this.cues.length; n < r; n++) {
                                        var o = this.cues[n];
                                        o.startTime <= t && o.endTime >= t ? e.push(o) : o.startTime === o.endTime && o.startTime <= t && o.startTime + .5 >= t && e.push(o)
                                    }
                                    if (g = !1, e.length !== this.activeCues_.length) g = !0;
                                    else
                                        for (var i = 0; i < e.length; i++) this.activeCues_.indexOf(e[i]) === -1 && (g = !0);
                                    return this.activeCues_ = e, v.setCues_(this.activeCues_), v
                                },
                                set: function() {}
                            }), s.src ? (h.src = s.src, S(s.src, h)) : h.loaded_ = !0, r = h, a(n, r)
                        }
                        return s(e, t), e.prototype.addCue = function(t) {
                            var e = t;
                            if (v["default"].vttjs && !(t instanceof v["default"].vttjs.VTTCue)) {
                                e = new v["default"].vttjs.VTTCue(t.startTime, t.endTime, t.text);
                                for (var n in t) n in e || (e[n] = t[n]);
                                e.id = t.id, e.originalCue_ = t
                            }
                            var r = this.tech_.textTracks();
                            if (r)
                                for (var o = 0; o < r.length; o++) r[o] !== this && r[o].removeCue(e);
                            this.cues_.push(e), this.cues.setCues_(this.cues_)
                        }, e.prototype.removeCue = function(t) {
                            for (var e = this.cues_.length; e--;) {
                                var n = this.cues_[e];
                                if (n === t || n.originalCue_ && n.originalCue_ === t) {
                                    this.cues_.splice(e, 1), this.cues.setCues_(this.cues_);
                                    break
                                }
                            }
                        }, e
                    }(m["default"]);
                j.prototype.allowedEvents_ = {
                    cuechange: "cuechange"
                }, n["default"] = j
            }, {
                67: 67,
                73: 73,
                75: 75,
                78: 78,
                83: 83,
                86: 86,
                87: 87,
                92: 92,
                95: 95,
                99: 99
            }],
            73: [function(t, e, n) {
                "use strict";
                n.__esModule = !0, n.VideoTrackKind = {
                    alternative: "alternative",
                    captions: "captions",
                    main: "main",
                    sign: "sign",
                    subtitles: "subtitles",
                    commentary: "commentary"
                }, n.AudioTrackKind = {
                    alternative: "alternative",
                    descriptions: "descriptions",
                    main: "main",
                    "main-desc": "main-desc",
                    translation: "translation",
                    commentary: "commentary"
                }, n.TextTrackKind = {
                    subtitles: "subtitles",
                    captions: "captions",
                    descriptions: "descriptions",
                    chapters: "chapters",
                    metadata: "metadata"
                }, n.TextTrackMode = {
                    disabled: "disabled",
                    hidden: "hidden",
                    showing: "showing"
                }
            }, {}],
            74: [function(t, e, n) {
                "use strict";

                function r(t) {
                    if (t && t.__esModule) return t;
                    var e = {};
                    if (null != t)
                        for (var n in t) Object.prototype.hasOwnProperty.call(t, n) && (e[n] = t[n]);
                    return e["default"] = t, e
                }

                function o(t) {
                    return t && t.__esModule ? t : {
                        "default": t
                    }
                }

                function i(t, e) {
                    if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function")
                }

                function a(t, e) {
                    if (!t) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
                    return !e || "object" != typeof e && "function" != typeof e ? t : e
                }

                function s(t, e) {
                    if ("function" != typeof e && null !== e) throw new TypeError("Super expression must either be null or a function, not " + typeof e);
                    t.prototype = Object.create(e && e.prototype, {
                        constructor: {
                            value: t,
                            enumerable: !1,
                            writable: !0,
                            configurable: !0
                        }
                    }), e && (Object.setPrototypeOf ? Object.setPrototypeOf(t, e) : t.__proto__ = e)
                }
                n.__esModule = !0;
                var u = t(42),
                    l = o(u),
                    c = t(78),
                    f = r(c),
                    p = t(94),
                    h = o(p),
                    d = function(t) {
                        function e() {
                            var n, r = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : [],
                                o = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : null;
                            i(this, e);
                            var s = a(this, t.call(this));
                            if (!o && (o = s, f.IS_IE8)) {
                                o = h["default"].createElement("custom");
                                for (var u in e.prototype) "constructor" !== u && (o[u] = e.prototype[u])
                            }
                            o.tracks_ = [], Object.defineProperty(o, "length", {
                                get: function() {
                                    return this.tracks_.length
                                }
                            });
                            for (var l = 0; l < r.length; l++) o.addTrack_(r[l]);
                            return n = o, a(s, n)
                        }
                        return s(e, t), e.prototype.addTrack_ = function(t) {
                            var e = this.tracks_.length;
                            "" + e in this || Object.defineProperty(this, e, {
                                get: function() {
                                    return this.tracks_[e]
                                }
                            }), this.tracks_.indexOf(t) === -1 && (this.tracks_.push(t), this.trigger({
                                track: t,
                                type: "addtrack"
                            }))
                        }, e.prototype.removeTrack_ = function(t) {
                            for (var e = void 0, n = 0, r = this.length; n < r; n++)
                                if (this[n] === t) {
                                    e = this[n], e.off && e.off(), this.tracks_.splice(n, 1);
                                    break
                                } e && this.trigger({
                                track: e,
                                type: "removetrack"
                            })
                        }, e.prototype.getTrackById = function(t) {
                            for (var e = null, n = 0, r = this.length; n < r; n++) {
                                var o = this[n];
                                if (o.id === t) {
                                    e = o;
                                    break
                                }
                            }
                            return e
                        }, e
                    }(l["default"]);
                d.prototype.allowedEvents_ = {
                    change: "change",
                    addtrack: "addtrack",
                    removetrack: "removetrack"
                };
                for (var y in d.prototype.allowedEvents_) d.prototype["on" + y] = null;
                n["default"] = d
            }, {
                42: 42,
                78: 78,
                94: 94
            }],
            75: [function(t, e, n) {
                "use strict";

                function r(t) {
                    return t && t.__esModule ? t : {
                        "default": t
                    }
                }

                function o(t) {
                    if (t && t.__esModule) return t;
                    var e = {};
                    if (null != t)
                        for (var n in t) Object.prototype.hasOwnProperty.call(t, n) && (e[n] = t[n]);
                    return e["default"] = t, e
                }

                function i(t, e) {
                    if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function")
                }

                function a(t, e) {
                    if (!t) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
                    return !e || "object" != typeof e && "function" != typeof e ? t : e
                }

                function s(t, e) {
                    if ("function" != typeof e && null !== e) throw new TypeError("Super expression must either be null or a function, not " + typeof e);
                    t.prototype = Object.create(e && e.prototype, {
                        constructor: {
                            value: t,
                            enumerable: !1,
                            writable: !0,
                            configurable: !0
                        }
                    }), e && (Object.setPrototypeOf ? Object.setPrototypeOf(t, e) : t.__proto__ = e)
                }
                n.__esModule = !0;
                var u = t(78),
                    l = o(u),
                    c = t(94),
                    f = r(c),
                    p = t(85),
                    h = o(p),
                    d = t(42),
                    y = r(d),
                    v = function(t) {
                        function e() {
                            var n, r = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};
                            i(this, e);
                            var o = a(this, t.call(this)),
                                s = o;
                            if (l.IS_IE8) {
                                s = f["default"].createElement("custom");
                                for (var u in e.prototype) "constructor" !== u && (s[u] = e.prototype[u])
                            }
                            var c = {
                                    id: r.id || "vjs_track_" + h.newGUID(),
                                    kind: r.kind || "",
                                    label: r.label || "",
                                    language: r.language || ""
                                },
                                p = function(t) {
                                    Object.defineProperty(s, t, {
                                        get: function() {
                                            return c[t]
                                        },
                                        set: function() {}
                                    })
                                };
                            for (var d in c) p(d);
                            return n = s, a(o, n)
                        }
                        return s(e, t), e
                    }(y["default"]);
                n["default"] = v
            }, {
                42: 42,
                78: 78,
                85: 85,
                94: 94
            }],
            76: [function(t, e, n) {
                "use strict";

                function r(t) {
                    if (t && t.__esModule) return t;
                    var e = {};
                    if (null != t)
                        for (var n in t) Object.prototype.hasOwnProperty.call(t, n) && (e[n] = t[n]);
                    return e["default"] = t, e
                }

                function o(t) {
                    return t && t.__esModule ? t : {
                        "default": t
                    }
                }

                function i(t, e) {
                    if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function")
                }

                function a(t, e) {
                    if (!t) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
                    return !e || "object" != typeof e && "function" != typeof e ? t : e
                }

                function s(t, e) {
                    if ("function" != typeof e && null !== e) throw new TypeError("Super expression must either be null or a function, not " + typeof e);
                    t.prototype = Object.create(e && e.prototype, {
                        constructor: {
                            value: t,
                            enumerable: !1,
                            writable: !0,
                            configurable: !0
                        }
                    }), e && (Object.setPrototypeOf ? Object.setPrototypeOf(t, e) : t.__proto__ = e)
                }
                n.__esModule = !0;
                var u = t(74),
                    l = o(u),
                    c = t(78),
                    f = r(c),
                    p = t(94),
                    h = o(p),
                    d = function(t, e) {
                        for (var n = 0; n < t.length; n++) e.id !== t[n].id && (t[n].selected = !1)
                    },
                    y = function(t) {
                        function e() {
                            var n, r, o = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : [];
                            i(this, e);
                            for (var s = void 0, u = o.length - 1; u >= 0; u--)
                                if (o[u].selected) {
                                    d(o, o[u]);
                                    break
                                } if (f.IS_IE8) {
                                s = h["default"].createElement("custom");
                                for (var c in l["default"].prototype) "constructor" !== c && (s[c] = l["default"].prototype[c]);
                                for (var p in e.prototype) "constructor" !== p && (s[p] = e.prototype[p])
                            }
                            return s = n = a(this, t.call(this, o, s)), s.changing_ = !1, Object.defineProperty(s, "selectedIndex", {
                                get: function() {
                                    for (var t = 0; t < this.length; t++)
                                        if (this[t].selected) return t;
                                    return -1
                                },
                                set: function() {}
                            }), r = s, a(n, r)
                        }
                        return s(e, t), e.prototype.addTrack_ = function(e) {
                            var n = this;
                            e.selected && d(this, e), t.prototype.addTrack_.call(this, e), e.addEventListener && e.addEventListener("selectedchange", function() {
                                n.changing_ || (n.changing_ = !0, d(n, e), n.changing_ = !1, n.trigger("change"))
                            })
                        }, e.prototype.addTrack = function(t) {
                            this.addTrack_(t)
                        }, e.prototype.removeTrack = function(e) {
                            t.prototype.removeTrack_.call(this, e)
                        }, e
                    }(l["default"]);
                n["default"] = y
            }, {
                74: 74,
                78: 78,
                94: 94
            }],
            77: [function(t, e, n) {
                "use strict";

                function r(t) {
                    if (t && t.__esModule) return t;
                    var e = {};
                    if (null != t)
                        for (var n in t) Object.prototype.hasOwnProperty.call(t, n) && (e[n] = t[n]);
                    return e["default"] = t, e
                }

                function o(t) {
                    return t && t.__esModule ? t : {
                        "default": t
                    }
                }

                function i(t, e) {
                    if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function")
                }

                function a(t, e) {
                    if (!t) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
                    return !e || "object" != typeof e && "function" != typeof e ? t : e
                }

                function s(t, e) {
                    if ("function" != typeof e && null !== e) throw new TypeError("Super expression must either be null or a function, not " + typeof e);
                    t.prototype = Object.create(e && e.prototype, {
                        constructor: {
                            value: t,
                            enumerable: !1,
                            writable: !0,
                            configurable: !0
                        }
                    }), e && (Object.setPrototypeOf ? Object.setPrototypeOf(t, e) : t.__proto__ = e)
                }
                n.__esModule = !0;
                var u = t(73),
                    l = t(75),
                    c = o(l),
                    f = t(87),
                    p = o(f),
                    h = t(78),
                    d = r(h),
                    y = function(t) {
                        function e() {
                            var n, r, o = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};
                            i(this, e);
                            var s = (0, p["default"])(o, {
                                    kind: u.VideoTrackKind[o.kind] || ""
                                }),
                                l = n = a(this, t.call(this, s)),
                                c = !1;
                            if (d.IS_IE8)
                                for (var f in e.prototype) "constructor" !== f && (l[f] = e.prototype[f]);
                            return Object.defineProperty(l, "selected", {
                                get: function() {
                                    return c
                                },
                                set: function(t) {
                                    "boolean" == typeof t && t !== c && (c = t, this.trigger("selectedchange"))
                                }
                            }), s.selected && (l.selected = s.selected), r = l, a(n, r)
                        }
                        return s(e, t), e
                    }(c["default"]);
                n["default"] = y
            }, {
                73: 73,
                75: 75,
                78: 78,
                87: 87
            }],
            78: [function(t, e, n) {
                "use strict";

                function r(t) {
                    return t && t.__esModule ? t : {
                        "default": t
                    }
                }

                function o(t) {
                    if (t && t.__esModule) return t;
                    var e = {};
                    if (null != t)
                        for (var n in t) Object.prototype.hasOwnProperty.call(t, n) && (e[n] = t[n]);
                    return e["default"] = t, e
                }
                n.__esModule = !0, n.BACKGROUND_SIZE_SUPPORTED = n.TOUCH_ENABLED = n.IS_ANY_SAFARI = n.IS_SAFARI = n.IE_VERSION = n.IS_IE8 = n.IS_CHROME = n.IS_EDGE = n.IS_FIREFOX = n.IS_NATIVE_ANDROID = n.IS_OLD_ANDROID = n.ANDROID_VERSION = n.IS_ANDROID = n.IOS_VERSION = n.IS_IOS = n.IS_IPOD = n.IS_IPHONE = n.IS_IPAD = void 0;
                var i = t(81),
                    a = o(i),
                    s = t(95),
                    u = r(s),
                    l = u["default"].navigator && u["default"].navigator.userAgent || "",
                    c = /AppleWebKit\/([\d.]+)/i.exec(l),
                    f = c ? parseFloat(c.pop()) : null,
                    p = n.IS_IPAD = /iPad/i.test(l),
                    h = n.IS_IPHONE = /iPhone/i.test(l) && !p,
                    d = n.IS_IPOD = /iPod/i.test(l),
                    y = n.IS_IOS = h || p || d,
                    v = (n.IOS_VERSION = function() {
                        var t = l.match(/OS (\d+)_/i);
                        return t && t[1] ? t[1] : null
                    }(), n.IS_ANDROID = /Android/i.test(l)),
                    g = n.ANDROID_VERSION = function() {
                        var t = l.match(/Android (\d+)(?:\.(\d+))?(?:\.(\d+))*/i);
                        if (!t) return null;
                        var e = t[1] && parseFloat(t[1]),
                            n = t[2] && parseFloat(t[2]);
                        return e && n ? parseFloat(t[1] + "." + t[2]) : e ? e : null
                    }(),
                    m = (n.IS_OLD_ANDROID = v && /webkit/i.test(l) && g < 2.3, n.IS_NATIVE_ANDROID = v && g < 5 && f < 537, n.IS_FIREFOX = /Firefox/i.test(l), n.IS_EDGE = /Edge/i.test(l)),
                    b = n.IS_CHROME = !m && /Chrome/i.test(l),
                    _ = (n.IS_IE8 = /MSIE\s8\.0/.test(l), n.IE_VERSION = function(t) {
                        return t && parseFloat(t[1])
                    }(/MSIE\s(\d+)\.\d/.exec(l)), n.IS_SAFARI = /Safari/i.test(l) && !b && !v && !m);
                n.IS_ANY_SAFARI = _ || y, n.TOUCH_ENABLED = a.isReal() && ("ontouchstart" in u["default"] || u["default"].DocumentTouch && u["default"].document instanceof u["default"].DocumentTouch), n.BACKGROUND_SIZE_SUPPORTED = a.isReal() && "backgroundSize" in u["default"].document.createElement("video").style
            }, {
                81: 81,
                95: 95
            }],
            79: [function(t, e, n) {
                "use strict";

                function r(t, e) {
                    var n = 0,
                        r = void 0,
                        i = void 0;
                    if (!e) return 0;
                    t && t.length || (t = (0, o.createTimeRange)(0, 0));
                    for (var a = 0; a < t.length; a++) r = t.start(a), i = t.end(a), i > e && (i = e), n += i - r;
                    return n / e
                }
                n.__esModule = !0, n.bufferedPercent = r;
                var o = t(90)
            }, {
                90: 90
            }],
            80: [function(t, e, n) {
                "use strict";

                function r(t) {
                    return t && t.__esModule ? t : {
                        "default": t
                    }
                }

                function o(t, e) {
                    if (!t || !e) return "";
                    if ("function" == typeof a["default"].getComputedStyle) {
                        var n = a["default"].getComputedStyle(t);
                        return n ? n[e] : ""
                    }
                    return t.currentStyle[e] || ""
                }
                n.__esModule = !0, n["default"] = o;
                var i = t(95),
                    a = r(i)
            }, {
                95: 95
            }],
            81: [function(t, e, n) {
                "use strict";

                function r(t) {
                    if (t && t.__esModule) return t;
                    var e = {};
                    if (null != t)
                        for (var n in t) Object.prototype.hasOwnProperty.call(t, n) && (e[n] = t[n]);
                    return e["default"] = t, e
                }

                function o(t) {
                    return t && t.__esModule ? t : {
                        "default": t
                    }
                }

                function i(t, e) {
                    return t.raw = e, t
                }

                function a(t) {
                    return "string" == typeof t && /\S/.test(t)
                }

                function s(t) {
                    if (/\s/.test(t)) throw new Error("class has illegal whitespace characters")
                }

                function u(t) {
                    return new RegExp("(^|\\s)" + t + "($|\\s)")
                }

                function l() {
                    return H["default"] === z["default"].document && "undefined" != typeof H["default"].createElement
                }

                function c(t) {
                    return (0, G.isObject)(t) && 1 === t.nodeType
                }

                function f(t) {
                    return function(e, n) {
                        if (!a(e)) return H["default"][t](null);
                        a(n) && (n = H["default"].querySelector(n));
                        var r = c(n) ? n : H["default"];
                        return r[t] && r[t](e)
                    }
                }

                function p(t) {
                    return 0 === t.indexOf("#") && (t = t.slice(1)), H["default"].getElementById(t)
                }

                function h() {
                    var t = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : "div",
                        e = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {},
                        n = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : {},
                        r = arguments[3],
                        o = H["default"].createElement(t);
                    return Object.getOwnPropertyNames(e).forEach(function(t) {
                        var n = e[t];
                        t.indexOf("aria-") !== -1 || "role" === t || "type" === t ? (W["default"].warn((0, X["default"])(R, t, n)), o.setAttribute(t, n)) : "textContent" === t ? d(o, n) : o[t] = n
                    }), Object.getOwnPropertyNames(n).forEach(function(t) {
                        o.setAttribute(t, n[t])
                    }), r && L(o, r), o
                }

                function d(t, e) {
                    return "undefined" == typeof t.textContent ? t.innerText = e : t.textContent = e, t
                }

                function y(t, e) {
                    e.firstChild ? e.insertBefore(t, e.firstChild) : e.appendChild(t)
                }

                function v(t) {
                    var e = t[Q];
                    return e || (e = t[Q] = V.newGUID()), Y[e] || (Y[e] = {}), Y[e]
                }

                function g(t) {
                    var e = t[Q];
                    return !!e && !!Object.getOwnPropertyNames(Y[e]).length
                }

                function m(t) {
                    var e = t[Q];
                    if (e) {
                        delete Y[e];
                        try {
                            delete t[Q]
                        } catch (n) {
                            t.removeAttribute ? t.removeAttribute(Q) : t[Q] = null
                        }
                    }
                }

                function b(t, e) {
                    return s(e), t.classList ? t.classList.contains(e) : u(e).test(t.className)
                }

                function _(t, e) {
                    return t.classList ? t.classList.add(e) : b(t, e) || (t.className = (t.className + " " + e).trim()), t
                }

                function w(t, e) {
                    return t.classList ? t.classList.remove(e) : (s(e), t.className = t.className.split(/\s+/).filter(function(t) {
                        return t !== e
                    }).join(" ")), t
                }

                function T(t, e, n) {
                    var r = b(t, e);
                    if ("function" == typeof n && (n = n(t, e)), "boolean" != typeof n && (n = !r), n !== r) return n ? _(t, e) : w(t, e), t
                }

                function E(t, e) {
                    Object.getOwnPropertyNames(e).forEach(function(n) {
                        var r = e[n];
                        null === r || void 0 === r || r === !1 ? t.removeAttribute(n) : t.setAttribute(n, r === !0 ? "" : r)
                    })
                }

                function x(t) {
                    var e = {};
                    if (t && t.attributes && t.attributes.length > 0)
                        for (var n = t.attributes, r = n.length - 1; r >= 0; r--) {
                            var o = n[r].name,
                                i = n[r].value;
                            "boolean" != typeof t[o] && ",autoplay,controls,loop,muted,default,".indexOf("," + o + ",") === -1 || (i = null !== i), e[o] = i
                        }
                    return e
                }

                function C(t, e) {
                    return t.getAttribute(e)
                }

                function k(t, e, n) {
                    t.setAttribute(e, n)
                }

                function S(t, e) {
                    t.removeAttribute(e)
                }

                function j() {
                    H["default"].body.focus(), H["default"].onselectstart = function() {
                        return !1
                    }
                }

                function O() {
                    H["default"].onselectstart = function() {
                        return !0
                    }
                }

                function P(t) {
                    var e = void 0;
                    if (t.getBoundingClientRect && t.parentNode && (e = t.getBoundingClientRect()), !e) return {
                        left: 0,
                        top: 0
                    };
                    var n = H["default"].documentElement,
                        r = H["default"].body,
                        o = n.clientLeft || r.clientLeft || 0,
                        i = z["default"].pageXOffset || r.scrollLeft,
                        a = e.left + i - o,
                        s = n.clientTop || r.clientTop || 0,
                        u = z["default"].pageYOffset || r.scrollTop,
                        l = e.top + u - s;
                    return {
                        left: Math.round(a),
                        top: Math.round(l)
                    }
                }

                function M(t, e) {
                    var n = {},
                        r = P(t),
                        o = t.offsetWidth,
                        i = t.offsetHeight,
                        a = r.top,
                        s = r.left,
                        u = e.pageY,
                        l = e.pageX;
                    return e.changedTouches && (l = e.changedTouches[0].pageX, u = e.changedTouches[0].pageY), n.y = Math.max(0, Math.min(1, (a - u + i) / i)), n.x = Math.max(0, Math.min(1, (l - s) / o)), n
                }

                function A(t) {
                    return (0, G.isObject)(t) && 3 === t.nodeType
                }

                function N(t) {
                    for (; t.firstChild;) t.removeChild(t.firstChild);
                    return t
                }

                function D(t) {
                    return "function" == typeof t && (t = t()), (Array.isArray(t) ? t : [t]).map(function(t) {
                        return "function" == typeof t && (t = t()), c(t) || A(t) ? t : "string" == typeof t && /\S/.test(t) ? H["default"].createTextNode(t) : void 0
                    }).filter(function(t) {
                        return t
                    })
                }

                function L(t, e) {
                    return D(e).forEach(function(e) {
                        return t.appendChild(e)
                    }), t
                }

                function I(t, e) {
                    return L(N(t), e)
                }
                n.__esModule = !0, n.$$ = n.$ = void 0;
                var R = i(["Setting attributes in the second argument of createEl()\n                has been deprecated. Use the third argument instead.\n                createEl(type, properties, attributes). Attempting to set ", " to ", "."], ["Setting attributes in the second argument of createEl()\n                has been deprecated. Use the third argument instead.\n                createEl(type, properties, attributes). Attempting to set ", " to ", "."]);
                n.isReal = l, n.isEl = c, n.getEl = p, n.createEl = h, n.textContent = d, n.insertElFirst = y, n.getElData = v, n.hasElData = g, n.removeElData = m, n.hasElClass = b, n.addElClass = _, n.removeElClass = w, n.toggleElClass = T, n.setElAttributes = E, n.getElAttributes = x, n.getAttribute = C, n.setAttribute = k, n.removeAttribute = S, n.blockTextSelection = j, n.unblockTextSelection = O, n.findElPosition = P, n.getPointerPosition = M, n.isTextNode = A, n.emptyEl = N, n.normalizeContent = D, n.appendContent = L, n.insertContent = I;
                var F = t(94),
                    H = o(F),
                    B = t(95),
                    z = o(B),
                    U = t(85),
                    V = r(U),
                    q = t(86),
                    W = o(q),
                    $ = t(98),
                    X = o($),
                    G = t(88),
                    Y = {},
                    Q = "vdata" + (new Date).getTime();
                n.$ = f("querySelector"), n.$$ = f("querySelectorAll")
            }, {
                85: 85,
                86: 86,
                88: 88,
                94: 94,
                95: 95,
                98: 98
            }],
            82: [function(t, e, n) {
                "use strict";

                function r(t) {
                    return t && t.__esModule ? t : {
                        "default": t
                    }
                }

                function o(t) {
                    if (t && t.__esModule) return t;
                    var e = {};
                    if (null != t)
                        for (var n in t) Object.prototype.hasOwnProperty.call(t, n) && (e[n] = t[n]);
                    return e["default"] = t, e
                }

                function i(t, e) {
                    var n = h.getElData(t);
                    0 === n.handlers[e].length && (delete n.handlers[e], t.removeEventListener ? t.removeEventListener(e, n.dispatcher, !1) : t.detachEvent && t.detachEvent("on" + e, n.dispatcher)), Object.getOwnPropertyNames(n.handlers).length <= 0 && (delete n.handlers, delete n.dispatcher, delete n.disabled), 0 === Object.getOwnPropertyNames(n).length && h.removeElData(t)
                }

                function a(t, e, n, r) {
                    n.forEach(function(n) {
                        t(e, n, r)
                    })
                }

                function s(t) {
                    function e() {
                        return !0
                    }

                    function n() {
                        return !1
                    }
                    if (!t || !t.isPropagationStopped) {
                        var r = t || b["default"].event;
                        t = {};
                        for (var o in r) "layerX" !== o && "layerY" !== o && "keyLocation" !== o && "webkitMovementX" !== o && "webkitMovementY" !== o && ("returnValue" === o && r.preventDefault || (t[o] = r[o]));
                        if (t.target || (t.target = t.srcElement || w["default"]), t.relatedTarget || (t.relatedTarget = t.fromElement === t.target ? t.toElement : t.fromElement), t.preventDefault = function() {
                                r.preventDefault && r.preventDefault(), t.returnValue = !1, r.returnValue = !1, t.defaultPrevented = !0
                            }, t.defaultPrevented = !1, t.stopPropagation = function() {
                                r.stopPropagation && r.stopPropagation(), t.cancelBubble = !0, r.cancelBubble = !0, t.isPropagationStopped = e
                            }, t.isPropagationStopped = n, t.stopImmediatePropagation = function() {
                                r.stopImmediatePropagation && r.stopImmediatePropagation(), t.isImmediatePropagationStopped = e, t.stopPropagation()
                            }, t.isImmediatePropagationStopped = n, null !== t.clientX && void 0 !== t.clientX) {
                            var i = w["default"].documentElement,
                                a = w["default"].body;
                            t.pageX = t.clientX + (i && i.scrollLeft || a && a.scrollLeft || 0) - (i && i.clientLeft || a && a.clientLeft || 0), t.pageY = t.clientY + (i && i.scrollTop || a && a.scrollTop || 0) - (i && i.clientTop || a && a.clientTop || 0)
                        }
                        t.which = t.charCode || t.keyCode, null !== t.button && void 0 !== t.button && (t.button = 1 & t.button ? 0 : 4 & t.button ? 1 : 2 & t.button ? 2 : 0)
                    }
                    return t
                }

                function u(t, e, n) {
                    if (Array.isArray(e)) return a(u, t, e, n);
                    var r = h.getElData(t);
                    r.handlers || (r.handlers = {}), r.handlers[e] || (r.handlers[e] = []), n.guid || (n.guid = y.newGUID()), r.handlers[e].push(n), r.dispatcher || (r.disabled = !1, r.dispatcher = function(e, n) {
                        if (!r.disabled) {
                            e = s(e);
                            var o = r.handlers[e.type];
                            if (o)
                                for (var i = o.slice(0), a = 0, u = i.length; a < u && !e.isImmediatePropagationStopped(); a++) try {
                                    i[a].call(t, e, n)
                                } catch (l) {
                                    g["default"].error(l)
                                }
                        }
                    }), 1 === r.handlers[e].length && (t.addEventListener ? t.addEventListener(e, r.dispatcher, !1) : t.attachEvent && t.attachEvent("on" + e, r.dispatcher))
                }

                function l(t, e, n) {
                    if (h.hasElData(t)) {
                        var r = h.getElData(t);
                        if (r.handlers) {
                            if (Array.isArray(e)) return a(l, t, e, n);
                            var o = function(e) {
                                r.handlers[e] = [], i(t, e)
                            };
                            if (e) {
                                var s = r.handlers[e];
                                if (s) {
                                    if (!n) return void o(e);
                                    if (n.guid)
                                        for (var u = 0; u < s.length; u++) s[u].guid === n.guid && s.splice(u--, 1);
                                    i(t, e)
                                }
                            } else
                                for (var c in r.handlers) o(c)
                        }
                    }
                }

                function c(t, e, n) {
                    var r = h.hasElData(t) ? h.getElData(t) : {},
                        o = t.parentNode || t.ownerDocument;
                    if ("string" == typeof e && (e = {
                            type: e,
                            target: t
                        }), e = s(e), r.dispatcher && r.dispatcher.call(t, e, n), o && !e.isPropagationStopped() && e.bubbles === !0) c.call(null, o, e, n);
                    else if (!o && !e.defaultPrevented) {
                        var i = h.getElData(e.target);
                        e.target[e.type] && (i.disabled = !0, "function" == typeof e.target[e.type] && e.target[e.type](), i.disabled = !1)
                    }
                    return !e.defaultPrevented
                }

                function f(t, e, n) {
                    if (Array.isArray(e)) return a(f, t, e, n);
                    var r = function o() {
                        l(t, e, o), n.apply(this, arguments)
                    };
                    r.guid = n.guid = n.guid || y.newGUID(), u(t, e, r)
                }
                n.__esModule = !0, n.fixEvent = s, n.on = u, n.off = l, n.trigger = c, n.one = f;
                var p = t(81),
                    h = o(p),
                    d = t(85),
                    y = o(d),
                    v = t(86),
                    g = r(v),
                    m = t(95),
                    b = r(m),
                    _ = t(94),
                    w = r(_)
            }, {
                81: 81,
                85: 85,
                86: 86,
                94: 94,
                95: 95
            }],
            83: [function(t, e, n) {
                "use strict";
                n.__esModule = !0, n.throttle = n.bind = void 0;
                var r = t(85);
                n.bind = function(t, e, n) {
                    e.guid || (e.guid = (0, r.newGUID)());
                    var o = function() {
                        return e.apply(t, arguments)
                    };
                    return o.guid = n ? n + "_" + e.guid : e.guid, o
                }, n.throttle = function(t, e) {
                    var n = Date.now();
                    return function() {
                        var r = Date.now();
                        r - n >= e && (t.apply(void 0, arguments), n = r)
                    }
                }
            }, {
                85: 85
            }],
            84: [function(t, e, n) {
                "use strict";

                function r(t) {
                    var e = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : t;
                    t = t < 0 ? 0 : t;
                    var n = Math.floor(t % 60),
                        r = Math.floor(t / 60 % 60),
                        o = Math.floor(t / 3600),
                        i = Math.floor(e / 60 % 60),
                        a = Math.floor(e / 3600);
                    return (isNaN(t) || t === 1 / 0) && (o = r = n = "-"), o = o > 0 || a > 0 ? o + ":" : "", r = ((o || i >= 10) && r < 10 ? "0" + r : r) + ":", n = n < 10 ? "0" + n : n, o + r + n
                }
                n.__esModule = !0, n["default"] = r
            }, {}],
            85: [function(t, e, n) {
                "use strict";

                function r() {
                    return o++
                }
                n.__esModule = !0, n.newGUID = r;
                var o = 1
            }, {}],
            86: [function(t, e, n) {
                "use strict";

                function r(t) {
                    return t && t.__esModule ? t : {
                        "default": t
                    }
                }
                n.__esModule = !0, n.logByType = void 0;
                var o = t(95),
                    i = r(o),
                    a = t(78),
                    s = t(88),
                    u = void 0,
                    l = n.logByType = function(t, e) {
                        var n = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : !!a.IE_VERSION && a.IE_VERSION < 11;
                        "log" !== t && e.unshift(t.toUpperCase() + ":"), u.history.push(e), e.unshift("VIDEOJS:");
                        var r = i["default"].console && i["default"].console[t];
                        r && (n && (e = e.map(function(t) {
                            if ((0, s.isObject)(t) || Array.isArray(t)) try {
                                return JSON.stringify(t)
                            } catch (e) {
                                return String(t)
                            }
                            return String(t)
                        }).join(" ")), r.apply ? r[Array.isArray(e) ? "apply" : "call"](i["default"].console, e) : r(e))
                    };
                u = function() {
                    for (var t = arguments.length, e = Array(t), n = 0; n < t; n++) e[n] = arguments[n];
                    l("log", e)
                }, u.history = [], u.error = function() {
                    for (var t = arguments.length, e = Array(t), n = 0; n < t; n++) e[n] = arguments[n];
                    return l("error", e)
                }, u.warn = function() {
                    for (var t = arguments.length, e = Array(t), n = 0; n < t; n++) e[n] = arguments[n];
                    return l("warn", e)
                }, n["default"] = u
            }, {
                78: 78,
                88: 88,
                95: 95
            }],
            87: [function(t, e, n) {
                "use strict";

                function r() {
                    for (var t = {}, e = arguments.length, n = Array(e), i = 0; i < e; i++) n[i] = arguments[i];
                    return n.forEach(function(e) {
                        e && (0, o.each)(e, function(e, n) {
                            return (0, o.isPlain)(e) ? ((0, o.isPlain)(t[n]) || (t[n] = {}), void(t[n] = r(t[n], e))) : void(t[n] = e)
                        })
                    }), t
                }
                n.__esModule = !0, n["default"] = r;
                var o = t(88)
            }, {
                88: 88
            }],
            88: [function(t, e, n) {
                "use strict";

                function r(t, e) {
                    c(t).forEach(function(n) {
                        return e(t[n], n)
                    })
                }

                function o(t, e) {
                    var n = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : 0;
                    return c(t).reduce(function(n, r) {
                        return e(n, t[r], r)
                    }, n)
                }

                function i(t) {
                    for (var e = arguments.length, n = Array(e > 1 ? e - 1 : 0), o = 1; o < e; o++) n[o - 1] = arguments[o];
                    return Object.assign ? Object.assign.apply(Object, [t].concat(n)) : (n.forEach(function(e) {
                        e && r(e, function(e, n) {
                            t[n] = e
                        })
                    }), t)
                }

                function a(t) {
                    return !!t && "object" === (void 0 === t ? "undefined" : u(t))
                }

                function s(t) {
                    return a(t) && "[object Object]" === l.call(t) && t.constructor === Object
                }
                n.__esModule = !0;
                var u = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(t) {
                    return typeof t
                } : function(t) {
                    return t && "function" == typeof Symbol && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t
                };
                n.each = r, n.reduce = o, n.assign = i, n.isObject = a, n.isPlain = s;
                var l = Object.prototype.toString,
                    c = function(t) {
                        return a(t) ? Object.keys(t) : []
                    }
            }, {}],
            89: [function(t, e, n) {
                "use strict";

                function r(t) {
                    return t && t.__esModule ? t : {
                        "default": t
                    }
                }
                n.__esModule = !0, n.setTextContent = n.createStyleElement = void 0;
                var o = t(94),
                    i = r(o);
                n.createStyleElement = function(t) {
                    var e = i["default"].createElement("style");
                    return e.className = t, e
                }, n.setTextContent = function(t, e) {
                    t.styleSheet ? t.styleSheet.cssText = e : t.textContent = e
                }
            }, {
                94: 94
            }],
            90: [function(t, e, n) {
                "use strict";

                function r(t) {
                    return t && t.__esModule ? t : {
                        "default": t
                    }
                }

                function o(t, e, n) {
                    if (e < 0 || e > n) throw new Error("Failed to execute '" + t + "' on 'TimeRanges': The index provided (" + e + ") is greater than or equal to the maximum bound (" + n + ").")
                }

                function i(t, e, n, r) {
                    return void 0 === r && (l["default"].warn("DEPRECATED: Function '" + t + "' on 'TimeRanges' called without an index argument."), r = 0), o(t, r, n.length - 1), n[r][e]
                }

                function a(t) {
                    return void 0 === t || 0 === t.length ? {
                        length: 0,
                        start: function() {
                            throw new Error("This TimeRanges object is empty")
                        },
                        end: function() {
                            throw new Error("This TimeRanges object is empty")
                        }
                    } : {
                        length: t.length,
                        start: i.bind(null, "start", 0, t),
                        end: i.bind(null, "end", 1, t)
                    }
                }

                function s(t, e) {
                    return Array.isArray(t) ? a(t) : void 0 === t || void 0 === e ? a() : a([
                        [t, e]
                    ])
                }
                n.__esModule = !0, n.createTimeRange = void 0, n.createTimeRanges = s;
                var u = t(86),
                    l = r(u);
                n.createTimeRange = s
            }, {
                86: 86
            }],
            91: [function(t, e, n) {
                "use strict";

                function r(t) {
                    return "string" != typeof t ? t : t.charAt(0).toUpperCase() + t.slice(1)
                }
                n.__esModule = !0, n["default"] = r
            }, {}],
            92: [function(t, e, n) {
                "use strict";

                function r(t) {
                    return t && t.__esModule ? t : {
                        "default": t
                    }
                }
                n.__esModule = !0, n.isCrossOrigin = n.getFileExtension = n.getAbsoluteURL = n.parseUrl = void 0;
                var o = t(94),
                    i = r(o),
                    a = t(95),
                    s = r(a),
                    u = n.parseUrl = function(t) {
                        var e = ["protocol", "hostname", "port", "pathname", "search", "hash", "host"],
                            n = i["default"].createElement("a");
                        n.href = t;
                        var r = "" === n.host && "file:" !== n.protocol,
                            o = void 0;
                        r && (o = i["default"].createElement("div"), o.innerHTML = '<a href="' + t + '"></a>', n = o.firstChild, o.setAttribute("style", "display:none; position:absolute;"), i["default"].body.appendChild(o));
                        for (var a = {}, s = 0; s < e.length; s++) a[e[s]] = n[e[s]];
                        return "http:" === a.protocol && (a.host = a.host.replace(/:80$/, "")), "https:" === a.protocol && (a.host = a.host.replace(/:443$/, "")), r && i["default"].body.removeChild(o), a
                    };
                n.getAbsoluteURL = function(t) {
                    if (!t.match(/^https?:\/\//)) {
                        var e = i["default"].createElement("div");
                        e.innerHTML = '<a href="' + t + '">x</a>', t = e.firstChild.href
                    }
                    return t
                }, n.getFileExtension = function(t) {
                    if ("string" == typeof t) {
                        var e = /^(\/?)([\s\S]*?)((?:\.{1,2}|[^\/]+?)(\.([^\.\/\?]+)))(?:[\/]*|[\?].*)$/i,
                            n = e.exec(t);
                        if (n) return n.pop().toLowerCase()
                    }
                    return ""
                }, n.isCrossOrigin = function(t) {
                    var e = s["default"].location,
                        n = u(t);
                    return (":" === n.protocol ? e.protocol : n.protocol) + n.host !== e.protocol + e.host
                }
            }, {
                94: 94,
                95: 95
            }],
            93: [function(e, n, r) {
                "use strict";

                function o(t) {
                    if (t && t.__esModule) return t;
                    var e = {};
                    if (null != t)
                        for (var n in t) Object.prototype.hasOwnProperty.call(t, n) && (e[n] = t[n]);
                    return e["default"] = t, e
                }

                function i(t) {
                    return t && t.__esModule ? t : {
                        "default": t
                    }
                }

                function a(t, e, n) {
                    var r = void 0;
                    if ("string" == typeof t) {
                        if (0 === t.indexOf("#") && (t = t.slice(1)), a.getPlayers()[t]) return e && B["default"].warn('Player "' + t + '" is already initialised. Options will not be applied.'), n && a.getPlayers()[t].ready(n), a.getPlayers()[t];
                        r = U.getEl(t)
                    } else r = t;
                    if (!r || !r.nodeName) throw new TypeError("The element or ID supplied is not valid. (videojs)");
                    if (r.player || E["default"].players[r.playerId]) return r.player || E["default"].players[r.playerId];
                    e = e || {}, a.hooks("beforesetup").forEach(function(t) {
                        var n = t(r, (0, S["default"])(e));
                        return !(0, X.isObject)(n) || Array.isArray(n) ? void B["default"].error("please return an object in beforesetup hooks") : void(e = (0, S["default"])(e, n))
                    });
                    var o = g["default"].getComponent("Player"),
                        i = new o(r, e, n);
                    return a.hooks("setup").forEach(function(t) {
                        return t(i)
                    }), i
                }
                r.__esModule = !0;
                var s = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(t) {
                        return typeof t
                    } : function(t) {
                        return t && "function" == typeof Symbol && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t
                    },
                    u = e(95),
                    l = i(u),
                    c = e(94),
                    f = i(c),
                    p = e(56),
                    h = o(p),
                    d = e(89),
                    y = o(d),
                    v = e(5),
                    g = i(v),
                    m = e(42),
                    b = i(m),
                    _ = e(82),
                    w = o(_),
                    T = e(51),
                    E = i(T),
                    x = e(52),
                    C = i(x),
                    k = e(87),
                    S = i(k),
                    j = e(83),
                    O = o(j),
                    P = e(72),
                    M = i(P),
                    A = e(64),
                    N = i(A),
                    D = e(77),
                    L = i(D),
                    I = e(90),
                    R = e(84),
                    F = i(R),
                    H = e(86),
                    B = i(H),
                    z = e(81),
                    U = o(z),
                    V = e(78),
                    q = o(V),
                    W = e(92),
                    $ = o(W),
                    X = e(88),
                    G = e(80),
                    Y = i(G),
                    Q = e(43),
                    K = i(Q),
                    J = e(99),
                    Z = i(J),
                    tt = e(62),
                    et = i(tt);
                if ("undefined" == typeof HTMLVideoElement && U.isReal() && (f["default"].createElement("video"), f["default"].createElement("audio"), f["default"].createElement("track")), a.hooks_ = {}, a.hooks = function(t, e) {
                        return a.hooks_[t] = a.hooks_[t] || [], e && (a.hooks_[t] = a.hooks_[t].concat(e)), a.hooks_[t]
                    }, a.hook = function(t, e) {
                        a.hooks(t, e)
                    }, a.removeHook = function(t, e) {
                        var n = a.hooks(t).indexOf(e);
                        return !(n <= -1 || (a.hooks_[t] = a.hooks_[t].slice(), a.hooks_[t].splice(n, 1), 0))
                    }, l["default"].VIDEOJS_NO_DYNAMIC_STYLE !== !0 && U.isReal()) {
                    var nt = U.$(".vjs-styles-defaults");
                    if (!nt) {
                        nt = y.createStyleElement("vjs-styles-defaults");
                        var rt = U.$("head");
                        rt && rt.insertBefore(nt, rt.firstChild), y.setTextContent(nt, "\n      .video-js {\n        width: 300px;\n        height: 150px;\n      }\n\n      .vjs-fluid {\n        padding-top: 56.25%\n      }\n    ")
                    }
                }
                h.autoSetupTimeout(1, a), a.VERSION = "5.19.1", a.options = E["default"].prototype.options_, a.getPlayers = function() {
                    return E["default"].players
                }, a.players = E["default"].players, a.getComponent = g["default"].getComponent, a.registerComponent = function(t, e) {
                    et["default"].isTech(e) && B["default"].warn("The " + t + " tech was registered as a component. It should instead be registered using videojs.registerTech(name, tech)"), g["default"].registerComponent.call(g["default"], t, e)
                }, a.getTech = et["default"].getTech, a.registerTech = et["default"].registerTech, a.browser = q, a.TOUCH_ENABLED = q.TOUCH_ENABLED, a.extend = K["default"], a.mergeOptions = S["default"], a.bind = O.bind, a.plugin = C["default"], a.addLanguage = function(t, e) {
                    var n;
                    return t = ("" + t).toLowerCase(), a.options.languages = (0, S["default"])(a.options.languages, (n = {}, n[t] = e, n)), a.options.languages[t]
                }, a.log = B["default"], a.createTimeRange = a.createTimeRanges = I.createTimeRanges, a.formatTime = F["default"], a.parseUrl = $.parseUrl, a.isCrossOrigin = $.isCrossOrigin, a.EventTarget = b["default"], a.on = w.on, a.one = w.one, a.off = w.off, a.trigger = w.trigger, a.xhr = Z["default"], a.TextTrack = M["default"], a.AudioTrack = N["default"], a.VideoTrack = L["default"], a.isEl = U.isEl, a.isTextNode = U.isTextNode, a.createEl = U.createEl, a.hasClass = U.hasElClass, a.addClass = U.addElClass, a.removeClass = U.removeElClass, a.toggleClass = U.toggleElClass, a.setAttributes = U.setElAttributes, a.getAttributes = U.getElAttributes, a.emptyEl = U.emptyEl, a.appendContent = U.appendContent, a.insertContent = U.insertContent, a.computedStyle = Y["default"], "function" == typeof t && t.amd ? t("videojs", [], function() {
                    return a
                }) : "object" === (void 0 === r ? "undefined" : s(r)) && "object" === (void 0 === n ? "undefined" : s(n)) && (n.exports = a), r["default"] = a
            }, {
                42: 42,
                43: 43,
                5: 5,
                51: 51,
                52: 52,
                56: 56,
                62: 62,
                64: 64,
                72: 72,
                77: 77,
                78: 78,
                80: 80,
                81: 81,
                82: 82,
                83: 83,
                84: 84,
                86: 86,
                87: 87,
                88: 88,
                89: 89,
                90: 90,
                92: 92,
                94: 94,
                95: 95,
                99: 99
            }],
            94: [function(t, e, n) {
                (function(n) {
                    var r = void 0 !== n ? n : "undefined" != typeof window ? window : {},
                        o = t(96);
                    if ("undefined" != typeof document) e.exports = document;
                    else {
                        var i = r["__GLOBAL_DOCUMENT_CACHE@4"];
                        i || (i = r["__GLOBAL_DOCUMENT_CACHE@4"] = o), e.exports = i
                    }
                }).call(this, "undefined" != typeof global ? global : "undefined" != typeof self ? self : "undefined" != typeof window ? window : {})
            }, {
                96: 96
            }],
            95: [function(t, e, n) {
                (function(t) {
                    "undefined" != typeof window ? e.exports = window : void 0 !== t ? e.exports = t : "undefined" != typeof self ? e.exports = self : e.exports = {}
                }).call(this, "undefined" != typeof global ? global : "undefined" != typeof self ? self : "undefined" != typeof window ? window : {})
            }, {}],
            96: [function(t, e, n) {}, {}],
            97: [function(t, e, n) {
                function r(t, e) {
                    var n, r = null;
                    try {
                        n = JSON.parse(t, e)
                    } catch (o) {
                        r = o
                    }
                    return [r, n]
                }
                e.exports = r
            }, {}],
            98: [function(t, e, n) {
                function r(t) {
                    return t.replace(/\n\r?\s*/g, "")
                }
                e.exports = function(t) {
                    for (var e = "", n = 0; n < arguments.length; n++) e += r(t[n]) + (arguments[n + 1] || "");
                    return e
                }
            }, {}],
            99: [function(t, e, n) {
                "use strict";

                function r(t, e) {
                    for (var n = 0; n < t.length; n++) e(t[n])
                }

                function o(t) {
                    for (var e in t)
                        if (t.hasOwnProperty(e)) return !1;
                    return !0
                }

                function i(t, e, n) {
                    var r = t;
                    return f(e) ? (n = e, "string" == typeof t && (r = {
                        uri: t
                    })) : r = h(e, {
                        uri: t
                    }), r.callback = n, r
                }

                function a(t, e, n) {
                    return e = i(t, e, n), s(e)
                }

                function s(t) {
                    function e() {
                        4 === c.readyState && setTimeout(i, 0)
                    }

                    function n() {
                        var t = void 0;
                        if (t = c.response ? c.response : c.responseText || u(c), _) try {
                            t = JSON.parse(t)
                        } catch (e) {}
                        return t
                    }

                    function r(t) {
                        return clearTimeout(d), t instanceof Error || (t = new Error("" + (t || "Unknown XMLHttpRequest Error"))), t.statusCode = 0, l(t, w)
                    }

                    function i() {
                        if (!h) {
                            var e;
                            clearTimeout(d), e = t.useXDR && void 0 === c.status ? 200 : 1223 === c.status ? 204 : c.status;
                            var r = w,
                                o = null;
                            return 0 !== e ? (r = {
                                body: n(),
                                statusCode: e,
                                method: v,
                                headers: {},
                                url: y,
                                rawRequest: c
                            }, c.getAllResponseHeaders && (r.headers = p(c.getAllResponseHeaders()))) : o = new Error("Internal XMLHttpRequest Error"), l(o, r, r.body)
                        }
                    }
                    if ("undefined" == typeof t.callback) throw new Error("callback argument missing");
                    var s = !1,
                        l = function(e, n, r) {
                            s || (s = !0, t.callback(e, n, r))
                        },
                        c = t.xhr || null;
                    c || (c = t.cors || t.useXDR ? new a.XDomainRequest : new a.XMLHttpRequest);
                    var f, h, d, y = c.url = t.uri || t.url,
                        v = c.method = t.method || "GET",
                        g = t.body || t.data,
                        m = c.headers = t.headers || {},
                        b = !!t.sync,
                        _ = !1,
                        w = {
                            body: void 0,
                            headers: {},
                            statusCode: 0,
                            method: v,
                            url: y,
                            rawRequest: c
                        };
                    if ("json" in t && t.json !== !1 && (_ = !0, m.accept || m.Accept || (m.Accept = "application/json"), "GET" !== v && "HEAD" !== v && (m["content-type"] || m["Content-Type"] || (m["Content-Type"] = "application/json"), g = JSON.stringify(t.json === !0 ? g : t.json))), c.onreadystatechange = e, c.onload = i, c.onerror = r, c.onprogress = function() {}, c.onabort = function() {
                            h = !0
                        }, c.ontimeout = r, c.open(v, y, !b, t.username, t.password), b || (c.withCredentials = !!t.withCredentials), !b && t.timeout > 0 && (d = setTimeout(function() {
                            if (!h) {
                                h = !0, c.abort("timeout");
                                var t = new Error("XMLHttpRequest timeout");
                                t.code = "ETIMEDOUT", r(t)
                            }
                        }, t.timeout)), c.setRequestHeader)
                        for (f in m) m.hasOwnProperty(f) && c.setRequestHeader(f, m[f]);
                    else if (t.headers && !o(t.headers)) throw new Error("Headers cannot be set on an XDomainRequest object");
                    return "responseType" in t && (c.responseType = t.responseType), "beforeSend" in t && "function" == typeof t.beforeSend && t.beforeSend(c), c.send(g || null), c
                }

                function u(t) {
                    if ("document" === t.responseType) return t.responseXML;
                    var e = t.responseXML && "parsererror" === t.responseXML.documentElement.nodeName;
                    return "" !== t.responseType || e ? null : t.responseXML
                }

                function l() {}
                var c = t(95),
                    f = t(100),
                    p = t(103),
                    h = t(104);
                e.exports = a, a.XMLHttpRequest = c.XMLHttpRequest || l, a.XDomainRequest = "withCredentials" in new a.XMLHttpRequest ? a.XMLHttpRequest : c.XDomainRequest, r(["get", "put", "post", "patch", "head", "delete"], function(t) {
                    a["delete" === t ? "del" : t] = function(e, n, r) {
                        return n = i(e, n, r), n.method = t.toUpperCase(), s(n)
                    }
                })
            }, {
                100: 100,
                103: 103,
                104: 104,
                95: 95
            }],
            100: [function(t, e, n) {
                function r(t) {
                    var e = o.call(t);
                    return "[object Function]" === e || "function" == typeof t && "[object RegExp]" !== e || "undefined" != typeof window && (t === window.setTimeout || t === window.alert || t === window.confirm || t === window.prompt)
                }
                e.exports = r;
                var o = Object.prototype.toString
            }, {}],
            101: [function(t, e, n) {
                function r(t, e, n) {
                    if (!s(e)) throw new TypeError("iterator must be a function");
                    arguments.length < 3 && (n = this), "[object Array]" === u.call(t) ? o(t, e, n) : "string" == typeof t ? i(t, e, n) : a(t, e, n)
                }

                function o(t, e, n) {
                    for (var r = 0, o = t.length; r < o; r++) l.call(t, r) && e.call(n, t[r], r, t)
                }

                function i(t, e, n) {
                    for (var r = 0, o = t.length; r < o; r++) e.call(n, t.charAt(r), r, t)
                }

                function a(t, e, n) {
                    for (var r in t) l.call(t, r) && e.call(n, t[r], r, t)
                }
                var s = t(100);
                e.exports = r;
                var u = Object.prototype.toString,
                    l = Object.prototype.hasOwnProperty
            }, {
                100: 100
            }],
            102: [function(t, e, n) {
                function r(t) {
                    return t.replace(/^\s*|\s*$/g, "")
                }
                n = e.exports = r, n.left = function(t) {
                    return t.replace(/^\s*/, "")
                }, n.right = function(t) {
                    return t.replace(/\s*$/, "")
                }
            }, {}],
            103: [function(t, e, n) {
                var r = t(102),
                    o = t(101),
                    i = function(t) {
                        return "[object Array]" === Object.prototype.toString.call(t)
                    };
                e.exports = function(t) {
                    if (!t) return {};
                    var e = {};
                    return o(r(t).split("\n"), function(t) {
                        var n = t.indexOf(":"),
                            o = r(t.slice(0, n)).toLowerCase(),
                            a = r(t.slice(n + 1));
                        "undefined" == typeof e[o] ? e[o] = a : i(e[o]) ? e[o].push(a) : e[o] = [e[o], a]
                    }), e
                }
            }, {
                101: 101,
                102: 102
            }],
            104: [function(t, e, n) {
                function r() {
                    for (var t = {}, e = 0; e < arguments.length; e++) {
                        var n = arguments[e];
                        for (var r in n) o.call(n, r) && (t[r] = n[r])
                    }
                    return t
                }
                e.exports = r;
                var o = Object.prototype.hasOwnProperty
            }, {}],
            105: [function(t, e, n) {
                var r = e.exports = {
                    WebVTT: t(106).WebVTT,
                    VTTCue: t(107).VTTCue,
                    VTTRegion: t(109).VTTRegion
                };
                window.vttjs = r, window.WebVTT = r.WebVTT;
                var o = r.VTTCue,
                    i = r.VTTRegion,
                    a = window.VTTCue,
                    s = window.VTTRegion;
                r.shim = function() {
                    window.VTTCue = o, window.VTTRegion = i
                }, r.restore = function() {
                    window.VTTCue = a, window.VTTRegion = s
                }, window.VTTCue || r.shim()
            }, {
                106: 106,
                107: 107,
                109: 109
            }],
            106: [function(t, e, n) {
                ! function(t) {
                    function e(t, e) {
                        this.name = "ParsingError", this.code = t.code, this.message = e || t.message
                    }

                    function n(t) {
                        function e(t, e, n, r) {
                            return 3600 * (0 | t) + 60 * (0 | e) + (0 | n) + (0 | r) / 1e3
                        }
                        var n = t.match(/^(\d+):(\d{2})(:\d{2})?\.(\d{3})/);
                        return n ? n[3] ? e(n[1], n[2], n[3].replace(":", ""), n[4]) : n[1] > 59 ? e(n[1], n[2], 0, n[4]) : e(0, n[1], n[2], n[4]) : null
                    }

                    function r() {
                        this.values = y(null)
                    }

                    function o(t, e, n, r) {
                        var o = r ? t.split(r) : [t];
                        for (var i in o)
                            if ("string" == typeof o[i]) {
                                var a = o[i].split(n);
                                if (2 === a.length) {
                                    var s = a[0],
                                        u = a[1];
                                    e(s, u)
                                }
                            }
                    }

                    function i(t, i, a) {
                        function s() {
                            var r = n(t);
                            if (null === r) throw new e(e.Errors.BadTimeStamp, "Malformed timestamp: " + c);
                            return t = t.replace(/^[^\sa-zA-Z-]+/, ""), r
                        }

                        function u(t, e) {
                            var n = new r;
                            o(t, function(t, e) {
                                switch (t) {
                                    case "region":
                                        for (var r = a.length - 1; r >= 0; r--)
                                            if (a[r].id === e) {
                                                n.set(t, a[r].region);
                                                break
                                            } break;
                                    case "vertical":
                                        n.alt(t, e, ["rl", "lr"]);
                                        break;
                                    case "line":
                                        var o = e.split(","),
                                            i = o[0];
                                        n.integer(t, i), n.percent(t, i) && n.set("snapToLines", !1), n.alt(t, i, ["auto"]), 2 === o.length && n.alt("lineAlign", o[1], ["start", "middle", "end"]);
                                        break;
                                    case "position":
                                        o = e.split(","), n.percent(t, o[0]), 2 === o.length && n.alt("positionAlign", o[1], ["start", "middle", "end"]);
                                        break;
                                    case "size":
                                        n.percent(t, e);
                                        break;
                                    case "align":
                                        n.alt(t, e, ["start", "middle", "end", "left", "right"])
                                }
                            }, /:/, /\s/), e.region = n.get("region", null), e.vertical = n.get("vertical", ""), e.line = n.get("line", "auto"), e.lineAlign = n.get("lineAlign", "start"), e.snapToLines = n.get("snapToLines", !0), e.size = n.get("size", 100), e.align = n.get("align", "middle"), e.position = n.get("position", {
                                start: 0,
                                left: 0,
                                middle: 50,
                                end: 100,
                                right: 100
                            }, e.align), e.positionAlign = n.get("positionAlign", {
                                start: "start",
                                left: "start",
                                middle: "middle",
                                end: "end",
                                right: "end"
                            }, e.align)
                        }

                        function l() {
                            t = t.replace(/^\s+/, "")
                        }
                        var c = t;
                        if (l(), i.startTime = s(), l(), "-->" !== t.substr(0, 3)) throw new e(e.Errors.BadTimeStamp, "Malformed time stamp (time stamps must be separated by '-->'): " + c);
                        t = t.substr(3), l(), i.endTime = s(), l(), u(t, i)
                    }

                    function a(t, e) {
                        function r() {
                            function t(t) {
                                return e = e.substr(t.length), t
                            }
                            if (!e) return null;
                            var n = e.match(/^([^<]*)(<[^>]+>?)?/);
                            return t(n[1] ? n[1] : n[2])
                        }

                        function o(t) {
                            return v[t]
                        }

                        function i(t) {
                            for (; d = t.match(/&(amp|lt|gt|lrm|rlm|nbsp);/);) t = t.replace(d[0], o);
                            return t
                        }

                        function a(t, e) {
                            return !b[e.localName] || b[e.localName] === t.localName
                        }

                        function s(e, n) {
                            var r = g[e];
                            if (!r) return null;
                            var o = t.document.createElement(r);
                            o.localName = r;
                            var i = m[e];
                            return i && n && (o[i] = n.trim()), o
                        }
                        for (var u, l = t.document.createElement("div"), c = l, f = []; null !== (u = r());)
                            if ("<" !== u[0]) c.appendChild(t.document.createTextNode(i(u)));
                            else {
                                if ("/" === u[1]) {
                                    f.length && f[f.length - 1] === u.substr(2).replace(">", "") && (f.pop(), c = c.parentNode);
                                    continue
                                }
                                var p, h = n(u.substr(1, u.length - 2));
                                if (h) {
                                    p = t.document.createProcessingInstruction("timestamp", h), c.appendChild(p);
                                    continue
                                }
                                var d = u.match(/^<([^.\s\/0-9>]+)(\.[^\s\\>]+)?([^>\\]+)?(\\?)>?$/);
                                if (!d) continue;
                                if (p = s(d[1], d[3]), !p) continue;
                                if (!a(c, p)) continue;
                                d[2] && (p.className = d[2].substr(1).replace(".", " ")), f.push(d[1]), c.appendChild(p), c = p
                            } return l
                    }

                    function s(t) {
                        for (var e = 0; e < _.length; e++) {
                            var n = _[e];
                            if (t >= n[0] && t <= n[1]) return !0
                        }
                        return !1
                    }

                    function u(t) {
                        function e(t, e) {
                            for (var n = e.childNodes.length - 1; n >= 0; n--) t.push(e.childNodes[n])
                        }

                        function n(t) {
                            if (!t || !t.length) return null;
                            var r = t.pop(),
                                o = r.textContent || r.innerText;
                            if (o) {
                                var i = o.match(/^.*(\n|\r)/);
                                return i ? (t.length = 0, i[0]) : o
                            }
                            return "ruby" === r.tagName ? n(t) : r.childNodes ? (e(t, r), n(t)) : void 0
                        }
                        var r, o = [],
                            i = "";
                        if (!t || !t.childNodes) return "ltr";
                        for (e(o, t); i = n(o);)
                            for (var a = 0; a < i.length; a++)
                                if (r = i.charCodeAt(a), s(r)) return "rtl";
                        return "ltr"
                    }

                    function l(t) {
                        if ("number" == typeof t.line && (t.snapToLines || t.line >= 0 && t.line <= 100)) return t.line;
                        if (!t.track || !t.track.textTrackList || !t.track.textTrackList.mediaElement) return -1;
                        for (var e = t.track, n = e.textTrackList, r = 0, o = 0; o < n.length && n[o] !== e; o++) "showing" === n[o].mode && r++;
                        return ++r * -1
                    }

                    function c() {}

                    function f(t, e, n) {
                        var r = /MSIE\s8\.0/.test(navigator.userAgent),
                            o = "rgba(255, 255, 255, 1)",
                            i = "rgba(0, 0, 0, 0.8)";
                        r && (o = "rgb(255, 255, 255)", i = "rgb(0, 0, 0)"), c.call(this), this.cue = e, this.cueDiv = a(t, e.text);
                        var s = {
                            color: o,
                            backgroundColor: i,
                            position: "relative",
                            left: 0,
                            right: 0,
                            top: 0,
                            bottom: 0,
                            display: "inline"
                        };
                        r || (s.writingMode = "" === e.vertical ? "horizontal-tb" : "lr" === e.vertical ? "vertical-lr" : "vertical-rl", s.unicodeBidi = "plaintext"), this.applyStyles(s, this.cueDiv), this.div = t.document.createElement("div"), s = {
                            textAlign: "middle" === e.align ? "center" : e.align,
                            font: n.font,
                            whiteSpace: "pre-line",
                            position: "absolute"
                        }, r || (s.direction = u(this.cueDiv), s.writingMode = "" === e.vertical ? "horizontal-tb" : "lr" === e.vertical ? "vertical-lr" : "vertical-rl".stylesunicodeBidi = "plaintext"), this.applyStyles(s), this.div.appendChild(this.cueDiv);
                        var l = 0;
                        switch (e.positionAlign) {
                            case "start":
                                l = e.position;
                                break;
                            case "middle":
                                l = e.position - e.size / 2;
                                break;
                            case "end":
                                l = e.position - e.size
                        }
                        "" === e.vertical ? this.applyStyles({
                            left: this.formatStyle(l, "%"),
                            width: this.formatStyle(e.size, "%")
                        }) : this.applyStyles({
                            top: this.formatStyle(l, "%"),
                            height: this.formatStyle(e.size, "%")
                        }), this.move = function(t) {
                            this.applyStyles({
                                top: this.formatStyle(t.top, "px"),
                                bottom: this.formatStyle(t.bottom, "px"),
                                left: this.formatStyle(t.left, "px"),
                                right: this.formatStyle(t.right, "px"),
                                height: this.formatStyle(t.height, "px"),
                                width: this.formatStyle(t.width, "px")
                            })
                        }
                    }

                    function p(t) {
                        var e, n, r, o, i = /MSIE\s8\.0/.test(navigator.userAgent);
                        if (t.div) {
                            n = t.div.offsetHeight, r = t.div.offsetWidth, o = t.div.offsetTop;
                            var a = (a = t.div.childNodes) && (a = a[0]) && a.getClientRects && a.getClientRects();
                            t = t.div.getBoundingClientRect(), e = a ? Math.max(a[0] && a[0].height || 0, t.height / a.length) : 0
                        }
                        this.left = t.left, this.right = t.right, this.top = t.top || o, this.height = t.height || n, this.bottom = t.bottom || o + (t.height || n), this.width = t.width || r, this.lineHeight = void 0 !== e ? e : t.lineHeight, i && !this.lineHeight && (this.lineHeight = 13)
                    }

                    function h(t, e, n, r) {
                        function o(t, e) {
                            for (var o, i = new p(t), a = 1, s = 0; s < e.length; s++) {
                                for (; t.overlapsOppositeAxis(n, e[s]) || t.within(n) && t.overlapsAny(r);) t.move(e[s]);
                                if (t.within(n)) return t;
                                var u = t.intersectPercentage(n);
                                a > u && (o = new p(t), a = u), t = new p(i)
                            }
                            return o || i
                        }
                        var i = new p(e),
                            a = e.cue,
                            s = l(a),
                            u = [];
                        if (a.snapToLines) {
                            var c;
                            switch (a.vertical) {
                                case "":
                                    u = ["+y", "-y"], c = "height";
                                    break;
                                case "rl":
                                    u = ["+x", "-x"], c = "width";
                                    break;
                                case "lr":
                                    u = ["-x", "+x"], c = "width"
                            }
                            var f = i.lineHeight,
                                h = f * Math.round(s),
                                d = n[c] + f,
                                y = u[0];
                            Math.abs(h) > d && (h = h < 0 ? -1 : 1, h *= Math.ceil(d / f) * f), s < 0 && (h += "" === a.vertical ? n.height : n.width, u = u.reverse()), i.move(y, h)
                        } else {
                            var v = i.lineHeight / n.height * 100;
                            switch (a.lineAlign) {
                                case "middle":
                                    s -= v / 2;
                                    break;
                                case "end":
                                    s -= v
                            }
                            switch (a.vertical) {
                                case "":
                                    e.applyStyles({
                                        top: e.formatStyle(s, "%")
                                    });
                                    break;
                                case "rl":
                                    e.applyStyles({
                                        left: e.formatStyle(s, "%")
                                    });
                                    break;
                                case "lr":
                                    e.applyStyles({
                                        right: e.formatStyle(s, "%")
                                    })
                            }
                            u = ["+y", "-x", "+x", "-y"], i = new p(e)
                        }
                        var g = o(i, u);
                        e.move(g.toCSSCompatValues(n))
                    }

                    function d() {}
                    var y = Object.create || function() {
                        function t() {}
                        return function(e) {
                            if (1 !== arguments.length) throw new Error("Object.create shim only accepts one parameter.");
                            return t.prototype = e, new t
                        }
                    }();
                    e.prototype = y(Error.prototype), e.prototype.constructor = e, e.Errors = {
                        BadSignature: {
                            code: 0,
                            message: "Malformed WebVTT signature."
                        },
                        BadTimeStamp: {
                            code: 1,
                            message: "Malformed time stamp."
                        }
                    }, r.prototype = {
                        set: function(t, e) {
                            this.get(t) || "" === e || (this.values[t] = e)
                        },
                        get: function(t, e, n) {
                            return n ? this.has(t) ? this.values[t] : e[n] : this.has(t) ? this.values[t] : e
                        },
                        has: function(t) {
                            return t in this.values
                        },
                        alt: function(t, e, n) {
                            for (var r = 0; r < n.length; ++r)
                                if (e === n[r]) {
                                    this.set(t, e);
                                    break
                                }
                        },
                        integer: function(t, e) {
                            /^-?\d+$/.test(e) && this.set(t, parseInt(e, 10))
                        },
                        percent: function(t, e) {
                            return !!(e.match(/^([\d]{1,3})(\.[\d]*)?%$/) && (e = parseFloat(e), e >= 0 && e <= 100)) && (this.set(t, e), !0)
                        }
                    };
                    var v = {
                            "&amp;": "&",
                            "&lt;": "<",
                            "&gt;": ">",
                            "&lrm;": "\u200e",
                            "&rlm;": "\u200f",
                            "&nbsp;": "\xa0"
                        },
                        g = {
                            c: "span",
                            i: "i",
                            b: "b",
                            u: "u",
                            ruby: "ruby",
                            rt: "rt",
                            v: "span",
                            lang: "span"
                        },
                        m = {
                            v: "title",
                            lang: "lang"
                        },
                        b = {
                            rt: "ruby"
                        },
                        _ = [
                            [1470, 1470],
                            [1472, 1472],
                            [1475, 1475],
                            [1478, 1478],
                            [1488, 1514],
                            [1520, 1524],
                            [1544, 1544],
                            [1547, 1547],
                            [1549, 1549],
                            [1563, 1563],
                            [1566, 1610],
                            [1645, 1647],
                            [1649, 1749],
                            [1765, 1766],
                            [1774, 1775],
                            [1786, 1805],
                            [1807, 1808],
                            [1810, 1839],
                            [1869, 1957],
                            [1969, 1969],
                            [1984, 2026],
                            [2036, 2037],
                            [2042, 2042],
                            [2048, 2069],
                            [2074, 2074],
                            [2084, 2084],
                            [2088, 2088],
                            [2096, 2110],
                            [2112, 2136],
                            [2142, 2142],
                            [2208, 2208],
                            [2210, 2220],
                            [8207, 8207],
                            [64285, 64285],
                            [64287, 64296],
                            [64298, 64310],
                            [64312, 64316],
                            [64318, 64318],
                            [64320, 64321],
                            [64323, 64324],
                            [64326, 64449],
                            [64467, 64829],
                            [64848, 64911],
                            [64914, 64967],
                            [65008, 65020],
                            [65136, 65140],
                            [65142, 65276],
                            [67584, 67589],
                            [67592, 67592],
                            [67594, 67637],
                            [67639, 67640],
                            [67644, 67644],
                            [67647, 67669],
                            [67671, 67679],
                            [67840, 67867],
                            [67872, 67897],
                            [67903, 67903],
                            [67968, 68023],
                            [68030, 68031],
                            [68096, 68096],
                            [68112, 68115],
                            [68117, 68119],
                            [68121, 68147],
                            [68160, 68167],
                            [68176, 68184],
                            [68192, 68223],
                            [68352, 68405],
                            [68416, 68437],
                            [68440, 68466],
                            [68472, 68479],
                            [68608, 68680],
                            [126464, 126467],
                            [126469, 126495],
                            [126497, 126498],
                            [126500, 126500],
                            [126503, 126503],
                            [126505, 126514],
                            [126516, 126519],
                            [126521, 126521],
                            [126523, 126523],
                            [126530, 126530],
                            [126535, 126535],
                            [126537, 126537],
                            [126539, 126539],
                            [126541, 126543],
                            [126545, 126546],
                            [126548, 126548],
                            [126551, 126551],
                            [126553, 126553],
                            [126555, 126555],
                            [126557, 126557],
                            [126559, 126559],
                            [126561, 126562],
                            [126564, 126564],
                            [126567, 126570],
                            [126572, 126578],
                            [126580, 126583],
                            [126585, 126588],
                            [126590, 126590],
                            [126592, 126601],
                            [126603, 126619],
                            [126625, 126627],
                            [126629, 126633],
                            [126635, 126651],
                            [1114109, 1114109]
                        ];
                    c.prototype.applyStyles = function(t, e) {
                        e = e || this.div;
                        for (var n in t) t.hasOwnProperty(n) && (e.style[n] = t[n])
                    }, c.prototype.formatStyle = function(t, e) {
                        return 0 === t ? 0 : t + e
                    }, f.prototype = y(c.prototype), f.prototype.constructor = f, p.prototype.move = function(t, e) {
                        switch (e = void 0 !== e ? e : this.lineHeight, t) {
                            case "+x":
                                this.left += e, this.right += e;
                                break;
                            case "-x":
                                this.left -= e, this.right -= e;
                                break;
                            case "+y":
                                this.top += e, this.bottom += e;
                                break;
                            case "-y":
                                this.top -= e, this.bottom -= e
                        }
                    }, p.prototype.overlaps = function(t) {
                        return this.left < t.right && this.right > t.left && this.top < t.bottom && this.bottom > t.top
                    }, p.prototype.overlapsAny = function(t) {
                        for (var e = 0; e < t.length; e++)
                            if (this.overlaps(t[e])) return !0;
                        return !1
                    }, p.prototype.within = function(t) {
                        return this.top >= t.top && this.bottom <= t.bottom && this.left >= t.left && this.right <= t.right
                    }, p.prototype.overlapsOppositeAxis = function(t, e) {
                        switch (e) {
                            case "+x":
                                return this.left < t.left;
                            case "-x":
                                return this.right > t.right;
                            case "+y":
                                return this.top < t.top;
                            case "-y":
                                return this.bottom > t.bottom
                        }
                    }, p.prototype.intersectPercentage = function(t) {
                        return Math.max(0, Math.min(this.right, t.right) - Math.max(this.left, t.left)) * Math.max(0, Math.min(this.bottom, t.bottom) - Math.max(this.top, t.top)) / (this.height * this.width)
                    }, p.prototype.toCSSCompatValues = function(t) {
                        return {
                            top: this.top - t.top,
                            bottom: t.bottom - this.bottom,
                            left: this.left - t.left,
                            right: t.right - this.right,
                            height: this.height,
                            width: this.width
                        }
                    }, p.getSimpleBoxPosition = function(t) {
                        var e = t.div ? t.div.offsetHeight : t.tagName ? t.offsetHeight : 0,
                            n = t.div ? t.div.offsetWidth : t.tagName ? t.offsetWidth : 0,
                            r = t.div ? t.div.offsetTop : t.tagName ? t.offsetTop : 0;
                        return t = t.div ? t.div.getBoundingClientRect() : t.tagName ? t.getBoundingClientRect() : t, {
                            left: t.left,
                            right: t.right,
                            top: t.top || r,
                            height: t.height || e,
                            bottom: t.bottom || r + (t.height || e),
                            width: t.width || n
                        }
                    }, d.StringDecoder = function() {
                        return {
                            decode: function(t) {
                                if (!t) return "";
                                if ("string" != typeof t) throw new Error("Error - expected string data.");
                                return decodeURIComponent(encodeURIComponent(t))
                            }
                        }
                    }, d.convertCueToDOMTree = function(t, e) {
                        return t && e ? a(t, e) : null
                    }, d.processCues = function(t, e, n) {
                        function r(t) {
                            for (var e = 0; e < t.length; e++)
                                if (t[e].hasBeenReset || !t[e].displayState) return !0;
                            return !1
                        }
                        if (!t || !e || !n) return null;
                        for (; n.firstChild;) n.removeChild(n.firstChild);
                        var o = t.document.createElement("div");
                        if (o.style.position = "absolute", o.style.left = "0", o.style.right = "0", o.style.top = "0", o.style.bottom = "0", o.style.margin = "1.5%", n.appendChild(o), r(e)) {
                            var i = [],
                                a = p.getSimpleBoxPosition(o),
                                s = Math.round(.05 * a.height * 100) / 100,
                                u = {
                                    font: s + "px sans-serif"
                                };
                            ! function() {
                                for (var n, r, s = 0; s < e.length; s++) r = e[s], n = new f(t, r, u), o.appendChild(n.div), h(t, n, a, i), r.displayState = n.div, i.push(p.getSimpleBoxPosition(n))
                            }()
                        } else
                            for (var l = 0; l < e.length; l++) o.appendChild(e[l].displayState)
                    }, d.Parser = function(t, e, n) {
                        n || (n = e, e = {}), e || (e = {}), this.window = t, this.vttjs = e, this.state = "INITIAL", this.buffer = "", this.decoder = n || new TextDecoder("utf8"), this.regionList = []
                    }, d.Parser.prototype = {
                        reportOrThrowError: function(t) {
                            if (!(t instanceof e)) throw t;
                            this.onparsingerror && this.onparsingerror(t)
                        },
                        parse: function(t) {
                            function a() {
                                for (var t = c.buffer, e = 0; e < t.length && "\r" !== t[e] && "\n" !== t[e];) ++e;
                                var n = t.substr(0, e);
                                return "\r" === t[e] && ++e, "\n" === t[e] && ++e, c.buffer = t.substr(e), n
                            }

                            function s(t) {
                                var e = new r;
                                if (o(t, function(t, n) {
                                        switch (t) {
                                            case "id":
                                                e.set(t, n);
                                                break;
                                            case "width":
                                                e.percent(t, n);
                                                break;
                                            case "lines":
                                                e.integer(t, n);
                                                break;
                                            case "regionanchor":
                                            case "viewportanchor":
                                                var o = n.split(",");
                                                if (2 !== o.length) break;
                                                var i = new r;
                                                if (i.percent("x", o[0]), i.percent("y", o[1]), !i.has("x") || !i.has("y")) break;
                                                e.set(t + "X", i.get("x")), e.set(t + "Y", i.get("y"));
                                                break;
                                            case "scroll":
                                                e.alt(t, n, ["up"])
                                        }
                                    }, /=/, /\s/), e.has("id")) {
                                    var n = new(c.vttjs.VTTRegion || c.window.VTTRegion);
                                    n.width = e.get("width", 100), n.lines = e.get("lines", 3), n.regionAnchorX = e.get("regionanchorX", 0), n.regionAnchorY = e.get("regionanchorY", 100), n.viewportAnchorX = e.get("viewportanchorX", 0), n.viewportAnchorY = e.get("viewportanchorY", 100), n.scroll = e.get("scroll", ""), c.onregion && c.onregion(n), c.regionList.push({
                                        id: e.get("id"),
                                        region: n
                                    })
                                }
                            }

                            function u(t) {
                                var e = new r;
                                o(t, function(t, r) {
                                    switch (t) {
                                        case "MPEGT":
                                            e.integer(t + "S", r);
                                            break;
                                        case "LOCA":
                                            e.set(t + "L", n(r))
                                    }
                                }, /[^\d]:/, /,/), c.ontimestampmap && c.ontimestampmap({
                                    MPEGTS: e.get("MPEGTS"),
                                    LOCAL: e.get("LOCAL")
                                })
                            }

                            function l(t) {
                                t.match(/X-TIMESTAMP-MAP/) ? o(t, function(t, e) {
                                    switch (t) {
                                        case "X-TIMESTAMP-MAP":
                                            u(e)
                                    }
                                }, /=/) : o(t, function(t, e) {
                                    switch (t) {
                                        case "Region":
                                            s(e)
                                    }
                                }, /:/)
                            }
                            var c = this;
                            t && (c.buffer += c.decoder.decode(t, {
                                stream: !0
                            }));
                            try {
                                var f;
                                if ("INITIAL" === c.state) {
                                    if (!/\r\n|\n/.test(c.buffer)) return this;
                                    f = a();
                                    var p = f.match(/^WEBVTT([ \t].*)?$/);
                                    if (!p || !p[0]) throw new e(e.Errors.BadSignature);
                                    c.state = "HEADER"
                                }
                                for (var h = !1; c.buffer;) {
                                    if (!/\r\n|\n/.test(c.buffer)) return this;
                                    switch (h ? h = !1 : f = a(), c.state) {
                                        case "HEADER":
                                            /:/.test(f) ? l(f) : f || (c.state = "ID");
                                            continue;
                                        case "NOTE":
                                            f || (c.state = "ID");
                                            continue;
                                        case "ID":
                                            if (/^NOTE($|[ \t])/.test(f)) {
                                                c.state = "NOTE";
                                                break
                                            }
                                            if (!f) continue;
                                            if (c.cue = new(c.vttjs.VTTCue || c.window.VTTCue)(0, 0, ""), c.state = "CUE", f.indexOf("-->") === -1) {
                                                c.cue.id = f;
                                                continue
                                            }
                                            case "CUE":
                                                try {
                                                    i(f, c.cue, c.regionList)
                                                } catch (d) {
                                                    c.reportOrThrowError(d), c.cue = null, c.state = "BADCUE";
                                                    continue
                                                }
                                                c.state = "CUETEXT";
                                                continue;
                                            case "CUETEXT":
                                                var y = f.indexOf("-->") !== -1;
                                                if (!f || y && (h = !0)) {
                                                    c.oncue && c.oncue(c.cue), c.cue = null, c.state = "ID";
                                                    continue
                                                }
                                                c.cue.text && (c.cue.text += "\n"), c.cue.text += f;
                                                continue;
                                            case "BADCUE":
                                                f || (c.state = "ID");
                                                continue
                                    }
                                }
                            } catch (d) {
                                c.reportOrThrowError(d), "CUETEXT" === c.state && c.cue && c.oncue && c.oncue(c.cue), c.cue = null, c.state = "INITIAL" === c.state ? "BADWEBVTT" : "BADCUE"
                            }
                            return this
                        },
                        flush: function() {
                            var t = this;
                            try {
                                if (t.buffer += t.decoder.decode(), (t.cue || "HEADER" === t.state) && (t.buffer += "\n\n", t.parse()), "INITIAL" === t.state) throw new e(e.Errors.BadSignature)
                            } catch (n) {
                                t.reportOrThrowError(n)
                            }
                            return t.onflush && t.onflush(), this
                        }
                    }, t.WebVTT = d
                }(this, this.vttjs)
            }, {}],
            107: [function(t, e, n) {
                void 0 !== e && e.exports && (this.VTTCue = this.VTTCue || t(108).VTTCue),
                    function(t) {
                        t.VTTCue.prototype.toJSON = function() {
                            var t = {},
                                e = this;
                            return Object.keys(this).forEach(function(n) {
                                "getCueAsHTML" !== n && "hasBeenReset" !== n && "displayState" !== n && (t[n] = e[n])
                            }), t
                        }, t.VTTCue.create = function(e) {
                            if (!e.hasOwnProperty("startTime") || !e.hasOwnProperty("endTime") || !e.hasOwnProperty("text")) throw new Error("You must at least have start time, end time, and text.");
                            var n = new t.VTTCue(e.startTime, e.endTime, e.text);
                            for (var r in e) n.hasOwnProperty(r) && (n[r] = e[r]);
                            return n
                        }, t.VTTCue.fromJSON = function(t) {
                            return this.create(JSON.parse(t))
                        }
                    }(this)
            }, {
                108: 108
            }],
            108: [function(t, e, n) {
                ! function(t, e) {
                    function n(t) {
                        return "string" == typeof t && !!a[t.toLowerCase()] && t.toLowerCase()
                    }

                    function r(t) {
                        return "string" == typeof t && !!s[t.toLowerCase()] && t.toLowerCase()
                    }

                    function o(t) {
                        for (var e = 1; e < arguments.length; e++) {
                            var n = arguments[e];
                            for (var r in n) t[r] = n[r]
                        }
                        return t
                    }

                    function i(t, e, i) {
                        var a = this,
                            s = /MSIE\s8\.0/.test(navigator.userAgent),
                            u = {};
                        s ? a = document.createElement("custom") : u.enumerable = !0, a.hasBeenReset = !1;
                        var l = "",
                            c = !1,
                            f = t,
                            p = e,
                            h = i,
                            d = null,
                            y = "",
                            v = !0,
                            g = "auto",
                            m = "start",
                            b = 50,
                            _ = "middle",
                            w = 50,
                            T = "middle";
                        if (Object.defineProperty(a, "id", o({}, u, {
                                get: function() {
                                    return l
                                },
                                set: function(t) {
                                    l = "" + t
                                }
                            })), Object.defineProperty(a, "pauseOnExit", o({}, u, {
                                get: function() {
                                    return c
                                },
                                set: function(t) {
                                    c = !!t
                                }
                            })), Object.defineProperty(a, "startTime", o({}, u, {
                                get: function() {
                                    return f
                                },
                                set: function(t) {
                                    if ("number" != typeof t) throw new TypeError("Start time must be set to a number.");
                                    f = t, this.hasBeenReset = !0
                                }
                            })), Object.defineProperty(a, "endTime", o({}, u, {
                                get: function() {
                                    return p
                                },
                                set: function(t) {
                                    if ("number" != typeof t) throw new TypeError("End time must be set to a number.");
                                    p = t, this.hasBeenReset = !0
                                }
                            })), Object.defineProperty(a, "text", o({}, u, {
                                get: function() {
                                    return h
                                },
                                set: function(t) {
                                    h = "" + t, this.hasBeenReset = !0
                                }
                            })), Object.defineProperty(a, "region", o({}, u, {
                                get: function() {
                                    return d
                                },
                                set: function(t) {
                                    d = t, this.hasBeenReset = !0
                                }
                            })), Object.defineProperty(a, "vertical", o({}, u, {
                                get: function() {
                                    return y
                                },
                                set: function(t) {
                                    var e = n(t);
                                    if (e === !1) throw new SyntaxError("An invalid or illegal string was specified.");
                                    y = e, this.hasBeenReset = !0
                                }
                            })), Object.defineProperty(a, "snapToLines", o({}, u, {
                                get: function() {
                                    return v
                                },
                                set: function(t) {
                                    v = !!t, this.hasBeenReset = !0
                                }
                            })), Object.defineProperty(a, "line", o({}, u, {
                                get: function() {
                                    return g
                                },
                                set: function(t) {
                                    if ("number" != typeof t && "auto" !== t) throw new SyntaxError("An invalid number or illegal string was specified.");
                                    g = t, this.hasBeenReset = !0
                                }
                            })), Object.defineProperty(a, "lineAlign", o({}, u, {
                                get: function() {
                                    return m
                                },
                                set: function(t) {
                                    var e = r(t);
                                    if (!e) throw new SyntaxError("An invalid or illegal string was specified.");
                                    m = e, this.hasBeenReset = !0
                                }
                            })), Object.defineProperty(a, "position", o({}, u, {
                                get: function() {
                                    return b
                                },
                                set: function(t) {
                                    if (t < 0 || t > 100) throw new Error("Position must be between 0 and 100.");
                                    b = t, this.hasBeenReset = !0
                                }
                            })), Object.defineProperty(a, "positionAlign", o({}, u, {
                                get: function() {
                                    return _
                                },
                                set: function(t) {
                                    var e = r(t);
                                    if (!e) throw new SyntaxError("An invalid or illegal string was specified.");
                                    _ = e, this.hasBeenReset = !0
                                }
                            })), Object.defineProperty(a, "size", o({}, u, {
                                get: function() {
                                    return w
                                },
                                set: function(t) {
                                    if (t < 0 || t > 100) throw new Error("Size must be between 0 and 100.");
                                    w = t, this.hasBeenReset = !0
                                }
                            })), Object.defineProperty(a, "align", o({}, u, {
                                get: function() {
                                    return T
                                },
                                set: function(t) {
                                    var e = r(t);
                                    if (!e) throw new SyntaxError("An invalid or illegal string was specified.");
                                    T = e, this.hasBeenReset = !0
                                }
                            })), a.displayState = void 0, s) return a
                    }
                    var a = {
                            "": !0,
                            lr: !0,
                            rl: !0
                        },
                        s = {
                            start: !0,
                            middle: !0,
                            end: !0,
                            left: !0,
                            right: !0
                        };
                    i.prototype.getCueAsHTML = function() {
                        return WebVTT.convertCueToDOMTree(window, this.text)
                    }, t.VTTCue = t.VTTCue || i, e.VTTCue = i
                }(this, this.vttjs || {})
            }, {}],
            109: [function(t, e, n) {
                void 0 !== e && e.exports && (this.VTTRegion = t(110).VTTRegion),
                    function(t) {
                        t.VTTRegion.create = function(e) {
                            var n = new t.VTTRegion;
                            for (var r in e) n.hasOwnProperty(r) && (n[r] = e[r]);
                            return n
                        }, t.VTTRegion.fromJSON = function(t) {
                            return this.create(JSON.parse(t))
                        }
                    }(this)
            }, {
                110: 110
            }],
            110: [function(t, e, n) {
                ! function(t, e) {
                    function n(t) {
                        return "string" == typeof t && !!i[t.toLowerCase()] && t.toLowerCase()
                    }

                    function r(t) {
                        return "number" == typeof t && t >= 0 && t <= 100
                    }

                    function o() {
                        var t = 100,
                            e = 3,
                            o = 0,
                            i = 100,
                            a = 0,
                            s = 100,
                            u = "";
                        Object.defineProperties(this, {
                            width: {
                                enumerable: !0,
                                get: function() {
                                    return t
                                },
                                set: function(e) {
                                    if (!r(e)) throw new Error("Width must be between 0 and 100.");
                                    t = e
                                }
                            },
                            lines: {
                                enumerable: !0,
                                get: function() {
                                    return e
                                },
                                set: function(t) {
                                    if ("number" != typeof t) throw new TypeError("Lines must be set to a number.");
                                    e = t
                                }
                            },
                            regionAnchorY: {
                                enumerable: !0,
                                get: function() {
                                    return i
                                },
                                set: function(t) {
                                    if (!r(t)) throw new Error("RegionAnchorX must be between 0 and 100.");
                                    i = t
                                }
                            },
                            regionAnchorX: {
                                enumerable: !0,
                                get: function() {
                                    return o
                                },
                                set: function(t) {
                                    if (!r(t)) throw new Error("RegionAnchorY must be between 0 and 100.");
                                    o = t
                                }
                            },
                            viewportAnchorY: {
                                enumerable: !0,
                                get: function() {
                                    return s
                                },
                                set: function(t) {
                                    if (!r(t)) throw new Error("ViewportAnchorY must be between 0 and 100.");
                                    s = t
                                }
                            },
                            viewportAnchorX: {
                                enumerable: !0,
                                get: function() {
                                    return a
                                },
                                set: function(t) {
                                    if (!r(t)) throw new Error("ViewportAnchorX must be between 0 and 100.");
                                    a = t
                                }
                            },
                            scroll: {
                                enumerable: !0,
                                get: function() {
                                    return u
                                },
                                set: function(t) {
                                    var e = n(t);
                                    if (e === !1) throw new SyntaxError("An invalid or illegal string was specified.");
                                    u = e
                                }
                            }
                        })
                    }
                    var i = {
                        "": !0,
                        up: !0
                    };
                    t.VTTRegion = t.VTTRegion || o, e.VTTRegion = o
                }(this, this.vttjs || {})
            }, {}]
        }, {}, [93])(93)
    }),
    /*! videojs-resolution-switcher - v0.0.0 - 2015-7-26
     * Copyright (c) 2015 Kasper Moskwiak
     * Modified by Pierre Kraft
     * Licensed under the Apache-2.0 license. */
    function() {
        "use strict";
        var t = null;
        t = "undefined" == typeof window.videojs && "function" == typeof require ? require("videojs") : window.videojs,
            function(t, e) {
                function n(t, e, n) {
                    return i = {
                        label: n,
                        sources: e
                    }, t.src(e.map(function(t) {
                        return {
                            src: t.src,
                            type: t.type,
                            res: t.res
                        }
                    }))
                }
                var r, o = {},
                    i = {},
                    a = {},
                    s = e.getComponent("MenuItem"),
                    u = e.extend(s, {
                        constructor: function(t, e, n, r) {
                            this.onClickListener = n, this.label = r, s.call(this, t, e), this.src = e.src, this.on("click", this.onClick), this.on("touchstart", this.onClick), e.initialySelected && (this.showAsLabel(), this.selected(!0))
                        },
                        showAsLabel: function() {
                            this.label && (this.label.innerHTML = this.options_.label)
                        },
                        onClick: function() {
                            this.onClickListener(this);
                            var t = this.player_.currentTime(),
                                e = this.player_.paused();
                            this.showAsLabel(), e || this.player_.bigPlayButton.hide(), n(this.player_, this.src, this.options_.label).one("loadeddata", function() {
                                this.player_.currentTime(t), this.player_.handleTechSeeked_(), e || this.player_.play().handleTechSeeked_(), this.player_.trigger("resolutionchange")
                            })
                        }
                    }),
                    l = e.getComponent("MenuButton"),
                    c = e.extend(l, {
                        constructor: function(t, e, n, r) {
                            if (this.sources = e.sources, this.label = r, this.label.innerHTML = e.initialySelectedLabel, l.call(this, t, e), this.controlText("Quality"), n.dynamicLabel) this.el().appendChild(r);
                            else {
                                var o = document.createElement("span");
                                o.className = "vjs-resolution-button-staticlabel", this.el().appendChild(o)
                            }
                        },
                        createItems: function() {
                            var t = [],
                                e = this.sources && this.sources.label || {},
                                n = function(e) {
                                    t.map(function(t) {
                                        t.selected(t === e)
                                    })
                                };
                            for (var r in e) e.hasOwnProperty(r) && (t.push(new u(this.player_, {
                                label: r,
                                src: e[r],
                                initialySelected: r === this.options_.initialySelectedLabel
                            }, n, this.label)), a[r] = t[t.length - 1]);
                            return t
                        }
                    });
                r = function(t) {
                    function r(t, e) {
                        return t.res && e.res ? +e.res - +t.res : 0
                    }

                    function s(t) {
                        var e = {
                            label: {},
                            res: {},
                            type: {}
                        };
                        return t.map(function(t) {
                            u(e, "label", t), u(e, "res", t), u(e, "type", t), l(e, "label", t), l(e, "res", t), l(e, "type", t)
                        }), e
                    }

                    function u(t, e, n) {
                        null == t[e][n[e]] && (t[e][n[e]] = [])
                    }

                    function l(t, e, n) {
                        t[e][n[e]].push(n)
                    }

                    function f(t, e) {
                        var n = p["default"],
                            r = "";
                        return "high" === n ? (n = e[0].res, r = e[0].label) : "low" === n || null == n ? (n = e[e.length - 1].res, r = e[e.length - 1].label) : t.res[n] && (r = t.res[n][0].label), void 0 === n ? {
                            res: n,
                            label: r,
                            sources: t.label[r]
                        } : {
                            res: n,
                            label: r,
                            sources: t.res[n]
                        }
                    }
                    var p = e.mergeOptions(o, t),
                        h = this,
                        d = document.createElement("span");
                    d.className = "vjs-resolution-button-label", h.updateSrc = function(t) {
                        if (!t) return h.src();
                        h.controlBar.resolutionSwitcher && (h.controlBar.resolutionSwitcher.dispose(), delete h.controlBar.resolutionSwitcher), t = t.sort(r);
                        var e = s(t),
                            o = f(e, t),
                            i = new c(h, {
                                sources: e,
                                initialySelectedLabel: o.label,
                                initialySelectedRes: o.res
                            }, p, d);
                        return i.el().className += " vjs-resolution-button", h.controlBar.resolutionSwitcher = h.controlBar.addChild(i), n(h, o.sources, o.label)
                    }, h.currentResolution = function(t) {
                        return null == t ? i : (null != a[t] && a[t].onClick(), h)
                    }, h.options_.sources.length > 1 && h.ready(function() {
                        h.updateSrc(h.options_.sources)
                    })
                }, e.plugin("videoJsResolutionSwitcher", r)
            }(window, t)
    }(), /*! nouislider - 9.0.0 - 2016-09-29 21:44:02 */
    function(t) {
        "function" == typeof define && define.amd ? define([], t) : "object" == typeof exports ? module.exports = t() : window.noUiSlider = t()
    }(function() {
        "use strict";

        function t(t, e) {
            var n = document.createElement("div");
            return l(n, e), t.appendChild(n), n
        }

        function e(t) {
            return t.filter(function(t) {
                return !this[t] && (this[t] = !0)
            }, {})
        }

        function n(t, e) {
            return Math.round(t / e) * e
        }

        function r(t, e) {
            var n = t.getBoundingClientRect(),
                r = t.ownerDocument,
                o = r.documentElement,
                i = p();
            return /webkit.*Chrome.*Mobile/i.test(navigator.userAgent) && (i.x = 0), e ? n.top + i.y - o.clientTop : n.left + i.x - o.clientLeft
        }

        function o(t) {
            return "number" == typeof t && !isNaN(t) && isFinite(t)
        }

        function i(t, e, n) {
            n > 0 && (l(t, e), setTimeout(function() {
                c(t, e)
            }, n))
        }

        function a(t) {
            return Math.max(Math.min(t, 100), 0)
        }

        function s(t) {
            return Array.isArray(t) ? t : [t]
        }

        function u(t) {
            t = String(t);
            var e = t.split(".");
            return e.length > 1 ? e[1].length : 0
        }

        function l(t, e) {
            t.classList ? t.classList.add(e) : t.className += " " + e
        }

        function c(t, e) {
            t.classList ? t.classList.remove(e) : t.className = t.className.replace(new RegExp("(^|\\b)" + e.split(" ").join("|") + "(\\b|$)", "gi"), " ")
        }

        function f(t, e) {
            return t.classList ? t.classList.contains(e) : new RegExp("\\b" + e + "\\b").test(t.className)
        }

        function p() {
            var t = void 0 !== window.pageXOffset,
                e = "CSS1Compat" === (document.compatMode || ""),
                n = t ? window.pageXOffset : e ? document.documentElement.scrollLeft : document.body.scrollLeft,
                r = t ? window.pageYOffset : e ? document.documentElement.scrollTop : document.body.scrollTop;
            return {
                x: n,
                y: r
            }
        }

        function h() {
            return window.navigator.pointerEnabled ? {
                start: "pointerdown",
                move: "pointermove",
                end: "pointerup"
            } : window.navigator.msPointerEnabled ? {
                start: "MSPointerDown",
                move: "MSPointerMove",
                end: "MSPointerUp"
            } : {
                start: "mousedown touchstart",
                move: "mousemove touchmove",
                end: "mouseup touchend"
            }
        }

        function d(t, e) {
            return 100 / (e - t)
        }

        function y(t, e) {
            return 100 * e / (t[1] - t[0])
        }

        function v(t, e) {
            return y(t, t[0] < 0 ? e + Math.abs(t[0]) : e - t[0])
        }

        function g(t, e) {
            return e * (t[1] - t[0]) / 100 + t[0]
        }

        function m(t, e) {
            for (var n = 1; t >= e[n];) n += 1;
            return n
        }

        function b(t, e, n) {
            if (n >= t.slice(-1)[0]) return 100;
            var r, o, i, a, s = m(n, t);
            return r = t[s - 1], o = t[s], i = e[s - 1], a = e[s], i + v([r, o], n) / d(i, a)
        }

        function _(t, e, n) {
            if (n >= 100) return t.slice(-1)[0];
            var r, o, i, a, s = m(n, e);
            return r = t[s - 1], o = t[s], i = e[s - 1], a = e[s], g([r, o], (n - i) * d(i, a))
        }

        function w(t, e, r, o) {
            if (100 === o) return o;
            var i, a, s = m(o, t);
            return r ? (i = t[s - 1], a = t[s], o - i > (a - i) / 2 ? a : i) : e[s - 1] ? t[s - 1] + n(o - t[s - 1], e[s - 1]) : o
        }

        function T(t, e, n) {
            var r;
            if ("number" == typeof e && (e = [e]), "[object Array]" !== Object.prototype.toString.call(e)) throw new Error("noUiSlider: 'range' contains invalid value.");
            if (r = "min" === t ? 0 : "max" === t ? 100 : parseFloat(t), !o(r) || !o(e[0])) throw new Error("noUiSlider: 'range' value isn't numeric.");
            n.xPct.push(r), n.xVal.push(e[0]), r ? n.xSteps.push(!isNaN(e[1]) && e[1]) : isNaN(e[1]) || (n.xSteps[0] = e[1]), n.xHighestCompleteStep.push(0)
        }

        function E(t, e, n) {
            if (!e) return !0;
            n.xSteps[t] = y([n.xVal[t], n.xVal[t + 1]], e) / d(n.xPct[t], n.xPct[t + 1]);
            var r = (n.xVal[t + 1] - n.xVal[t]) / n.xNumSteps[t],
                o = Math.ceil(Number(r.toFixed(3)) - 1),
                i = n.xVal[t] + n.xNumSteps[t] * o;
            n.xHighestCompleteStep[t] = i
        }

        function x(t, e, n, r) {
            this.xPct = [], this.xVal = [], this.xSteps = [r || !1], this.xNumSteps = [!1], this.xHighestCompleteStep = [], this.snap = e, this.direction = n;
            var o, i = [];
            for (o in t) t.hasOwnProperty(o) && i.push([t[o], o]);
            for (i.length && "object" == typeof i[0][0] ? i.sort(function(t, e) {
                    return t[0][0] - e[0][0]
                }) : i.sort(function(t, e) {
                    return t[0] - e[0]
                }), o = 0; o < i.length; o++) T(i[o][1], i[o][0], this);
            for (this.xNumSteps = this.xSteps.slice(0), o = 0; o < this.xNumSteps.length; o++) E(o, this.xNumSteps[o], this)
        }

        function C(t, e) {
            if (!o(e)) throw new Error("noUiSlider: 'step' is not numeric.");
            t.singleStep = e
        }

        function k(t, e) {
            if ("object" != typeof e || Array.isArray(e)) throw new Error("noUiSlider: 'range' is not an object.");
            if (void 0 === e.min || void 0 === e.max) throw new Error("noUiSlider: Missing 'min' or 'max' in 'range'.");
            if (e.min === e.max) throw new Error("noUiSlider: 'range' 'min' and 'max' cannot be equal.");
            t.spectrum = new x(e, t.snap, t.dir, t.singleStep)
        }

        function S(t, e) {
            if (e = s(e), !Array.isArray(e) || !e.length) throw new Error("noUiSlider: 'start' option is incorrect.");
            t.handles = e.length, t.start = e
        }

        function j(t, e) {
            if (t.snap = e, "boolean" != typeof e) throw new Error("noUiSlider: 'snap' option must be a boolean.")
        }

        function O(t, e) {
            if (t.animate = e, "boolean" != typeof e) throw new Error("noUiSlider: 'animate' option must be a boolean.")
        }

        function P(t, e) {
            if (t.animationDuration = e, "number" != typeof e) throw new Error("noUiSlider: 'animationDuration' option must be a number.")
        }

        function M(t, e) {
            var n, r = [!1];
            if (e === !0 || e === !1) {
                for (n = 1; n < t.handles; n++) r.push(e);
                r.push(!1)
            } else {
                if (!Array.isArray(e) || !e.length || e.length !== t.handles + 1) throw new Error("noUiSlider: 'connect' option doesn't match handle count.");
                r = e
            }
            t.connect = r
        }

        function A(t, e) {
            switch (e) {
                case "horizontal":
                    t.ort = 0;
                    break;
                case "vertical":
                    t.ort = 1;
                    break;
                default:
                    throw new Error("noUiSlider: 'orientation' option is invalid.")
            }
        }

        function N(t, e) {
            if (!o(e)) throw new Error("noUiSlider: 'margin' option must be numeric.");
            if (0 !== e && (t.margin = t.spectrum.getMargin(e), !t.margin)) throw new Error("noUiSlider: 'margin' option is only supported on linear sliders.")
        }

        function D(t, e) {
            if (!o(e)) throw new Error("noUiSlider: 'limit' option must be numeric.");
            if (t.limit = t.spectrum.getMargin(e), !t.limit || t.handles < 2) throw new Error("noUiSlider: 'limit' option is only supported on linear sliders with 2 or more handles.")
        }

        function L(t, e) {
            switch (e) {
                case "ltr":
                    t.dir = 0;
                    break;
                case "rtl":
                    t.dir = 1;
                    break;
                default:
                    throw new Error("noUiSlider: 'direction' option was not recognized.")
            }
        }

        function I(t, e) {
            if ("string" != typeof e) throw new Error("noUiSlider: 'behaviour' must be a string containing options.");
            var n = e.indexOf("tap") >= 0,
                r = e.indexOf("drag") >= 0,
                o = e.indexOf("fixed") >= 0,
                i = e.indexOf("snap") >= 0,
                a = e.indexOf("hover") >= 0;
            if (o) {
                if (2 !== t.handles) throw new Error("noUiSlider: 'fixed' behaviour must be used with 2 handles");
                N(t, t.start[1] - t.start[0])
            }
            t.events = {
                tap: n || i,
                drag: r,
                fixed: o,
                snap: i,
                hover: a
            }
        }

        function R(t, e) {
            if (e !== !1)
                if (e === !0) {
                    t.tooltips = [];
                    for (var n = 0; n < t.handles; n++) t.tooltips.push(!0)
                } else {
                    if (t.tooltips = s(e), t.tooltips.length !== t.handles) throw new Error("noUiSlider: must pass a formatter for all handles.");
                    t.tooltips.forEach(function(t) {
                        if ("boolean" != typeof t && ("object" != typeof t || "function" != typeof t.to)) throw new Error("noUiSlider: 'tooltips' must be passed a formatter or 'false'.")
                    })
                }
        }

        function F(t, e) {
            if (t.format = e, "function" == typeof e.to && "function" == typeof e.from) return !0;
            throw new Error("noUiSlider: 'format' requires 'to' and 'from' methods.")
        }

        function H(t, e) {
            if (void 0 !== e && "string" != typeof e && e !== !1) throw new Error("noUiSlider: 'cssPrefix' must be a string or `false`.");
            t.cssPrefix = e
        }

        function B(t, e) {
            if (void 0 !== e && "object" != typeof e) throw new Error("noUiSlider: 'cssClasses' must be an object.");
            if ("string" == typeof t.cssPrefix) {
                t.cssClasses = {};
                for (var n in e) e.hasOwnProperty(n) && (t.cssClasses[n] = t.cssPrefix + e[n])
            } else t.cssClasses = e
        }

        function z(t, e) {
            if (e !== !0 && e !== !1) throw new Error("noUiSlider: 'useRequestAnimationFrame' option should be true (default) or false.");
            t.useRequestAnimationFrame = e
        }

        function U(t) {
            var e, n = {
                margin: 0,
                limit: 0,
                animate: !0,
                animationDuration: 300,
                format: W
            };
            e = {
                step: {
                    r: !1,
                    t: C
                },
                start: {
                    r: !0,
                    t: S
                },
                connect: {
                    r: !0,
                    t: M
                },
                direction: {
                    r: !0,
                    t: L
                },
                snap: {
                    r: !1,
                    t: j
                },
                animate: {
                    r: !1,
                    t: O
                },
                animationDuration: {
                    r: !1,
                    t: P
                },
                range: {
                    r: !0,
                    t: k
                },
                orientation: {
                    r: !1,
                    t: A
                },
                margin: {
                    r: !1,
                    t: N
                },
                limit: {
                    r: !1,
                    t: D
                },
                behaviour: {
                    r: !0,
                    t: I
                },
                format: {
                    r: !1,
                    t: F
                },
                tooltips: {
                    r: !1,
                    t: R
                },
                cssPrefix: {
                    r: !1,
                    t: H
                },
                cssClasses: {
                    r: !1,
                    t: B
                },
                useRequestAnimationFrame: {
                    r: !1,
                    t: z
                }
            };
            var r = {
                connect: !1,
                direction: "ltr",
                behaviour: "tap",
                orientation: "horizontal",
                cssPrefix: "noUi-",
                cssClasses: {
                    target: "target",
                    base: "base",
                    origin: "origin",
                    handle: "handle",
                    horizontal: "horizontal",
                    vertical: "vertical",
                    background: "background",
                    connect: "connect",
                    ltr: "ltr",
                    rtl: "rtl",
                    draggable: "draggable",
                    drag: "state-drag",
                    tap: "state-tap",
                    active: "active",
                    tooltip: "tooltip",
                    pips: "pips",
                    pipsHorizontal: "pips-horizontal",
                    pipsVertical: "pips-vertical",
                    marker: "marker",
                    markerHorizontal: "marker-horizontal",
                    markerVertical: "marker-vertical",
                    markerNormal: "marker-normal",
                    markerLarge: "marker-large",
                    markerSub: "marker-sub",
                    value: "value",
                    valueHorizontal: "value-horizontal",
                    valueVertical: "value-vertical",
                    valueNormal: "value-normal",
                    valueLarge: "value-large",
                    valueSub: "value-sub"
                },
                useRequestAnimationFrame: !0
            };
            Object.keys(e).forEach(function(o) {
                if (void 0 === t[o] && void 0 === r[o]) {
                    if (e[o].r) throw new Error("noUiSlider: '" + o + "' is required.");
                    return !0
                }
                e[o].t(n, void 0 === t[o] ? r[o] : t[o])
            }), n.pips = t.pips;
            var o = [
                ["left", "top"],
                ["right", "bottom"]
            ];
            return n.style = o[n.dir][n.ort], n.styleOposite = o[n.dir ? 0 : 1][n.ort], n
        }

        function V(n, o, u) {
            function d(e, n) {
                var r = t(e, o.cssClasses.origin),
                    i = t(r, o.cssClasses.handle);
                return i.setAttribute("data-handle", n), r
            }

            function y(e, n) {
                return !!n && t(e, o.cssClasses.connect)
            }

            function v(t, e) {
                et = [], nt = [], nt.push(y(e, t[0]));
                for (var n = 0; n < o.handles; n++) et.push(d(e, n)), st[n] = n, nt.push(y(e, t[n + 1]))
            }

            function g(e) {
                l(e, o.cssClasses.target), 0 === o.dir ? l(e, o.cssClasses.ltr) : l(e, o.cssClasses.rtl), 0 === o.ort ? l(e, o.cssClasses.horizontal) : l(e, o.cssClasses.vertical), tt = t(e, o.cssClasses.base)
            }

            function m(e, n) {
                return !!o.tooltips[n] && t(e.firstChild, o.cssClasses.tooltip)
            }

            function b() {
                var t = et.map(m);
                K("update", function(e, n, r) {
                    if (t[n]) {
                        var i = e[n];
                        o.tooltips[n] !== !0 && (i = o.tooltips[n].to(r[n])), t[n].innerHTML = i
                    }
                })
            }

            function _(t, e, n) {
                if ("range" === t || "steps" === t) return ut.xVal;
                if ("count" === t) {
                    var r, o = 100 / (e - 1),
                        i = 0;
                    for (e = [];
                        (r = i++ * o) <= 100;) e.push(r);
                    t = "positions"
                }
                return "positions" === t ? e.map(function(t) {
                    return ut.fromStepping(n ? ut.getStep(t) : t)
                }) : "values" === t ? n ? e.map(function(t) {
                    return ut.fromStepping(ut.getStep(ut.toStepping(t)))
                }) : e : void 0
            }

            function w(t, n, r) {
                function o(t, e) {
                    return (t + e).toFixed(7) / 1
                }
                var i = {},
                    a = ut.xVal[0],
                    s = ut.xVal[ut.xVal.length - 1],
                    u = !1,
                    l = !1,
                    c = 0;
                return r = e(r.slice().sort(function(t, e) {
                    return t - e
                })), r[0] !== a && (r.unshift(a), u = !0), r[r.length - 1] !== s && (r.push(s), l = !0), r.forEach(function(e, a) {
                    var s, f, p, h, d, y, v, g, m, b, _ = e,
                        w = r[a + 1];
                    if ("steps" === n && (s = ut.xNumSteps[a]), s || (s = w - _), _ !== !1 && void 0 !== w)
                        for (s = Math.max(s, 1e-7), f = _; f <= w; f = o(f, s)) {
                            for (h = ut.toStepping(f), d = h - c, g = d / t, m = Math.round(g), b = d / m, p = 1; p <= m; p += 1) y = c + p * b, i[y.toFixed(5)] = ["x", 0];
                            v = r.indexOf(f) > -1 ? 1 : "steps" === n ? 2 : 0, !a && u && (v = 0), f === w && l || (i[h.toFixed(5)] = [f, v]), c = h
                        }
                }), i
            }

            function T(t, e, n) {
                function r(t, e) {
                    var n = e === o.cssClasses.value,
                        r = n ? p : h,
                        i = n ? c : f;
                    return e + " " + r[o.ort] + " " + i[t]
                }

                function i(t, e, n) {
                    return 'class="' + r(n[1], e) + '" style="' + o.style + ": " + t + '%"'
                }

                function a(t, r) {
                    r[1] = r[1] && e ? e(r[0], r[1]) : r[1], u += "<div " + i(t, o.cssClasses.marker, r) + "></div>", r[1] && (u += "<div " + i(t, o.cssClasses.value, r) + ">" + n.to(r[0]) + "</div>")
                }
                var s = document.createElement("div"),
                    u = "",
                    c = [o.cssClasses.valueNormal, o.cssClasses.valueLarge, o.cssClasses.valueSub],
                    f = [o.cssClasses.markerNormal, o.cssClasses.markerLarge, o.cssClasses.markerSub],
                    p = [o.cssClasses.valueHorizontal, o.cssClasses.valueVertical],
                    h = [o.cssClasses.markerHorizontal, o.cssClasses.markerVertical];
                return l(s, o.cssClasses.pips), l(s, 0 === o.ort ? o.cssClasses.pipsHorizontal : o.cssClasses.pipsVertical), Object.keys(t).forEach(function(e) {
                    a(e, t[e])
                }), s.innerHTML = u, s
            }

            function E(t) {
                var e = t.mode,
                    n = t.density || 1,
                    r = t.filter || !1,
                    o = t.values || !1,
                    i = t.stepped || !1,
                    a = _(e, o, i),
                    s = w(n, e, a),
                    u = t.format || {
                        to: Math.round
                    };
                return it.appendChild(T(s, r, u))
            }

            function x() {
                var t = tt.getBoundingClientRect(),
                    e = "offset" + ["Width", "Height"][o.ort];
                return 0 === o.ort ? t.width || tt[e] : t.height || tt[e]
            }

            function C(t, e, n, r) {
                var i = function(e) {
                        return !it.hasAttribute("disabled") && (!f(it, o.cssClasses.tap) && (e = k(e, r.pageOffset), !(t === ot.start && void 0 !== e.buttons && e.buttons > 1) && ((!r.hover || !e.buttons) && (e.calcPoint = e.points[o.ort], void n(e, r)))))
                    },
                    a = [];
                return t.split(" ").forEach(function(t) {
                    e.addEventListener(t, i, !1), a.push([t, i])
                }), a
            }

            function k(t, e) {
                t.preventDefault();
                var n, r, o = 0 === t.type.indexOf("touch"),
                    i = 0 === t.type.indexOf("mouse"),
                    a = 0 === t.type.indexOf("pointer"),
                    s = t;
                if (0 === t.type.indexOf("MSPointer") && (a = !0), o) {
                    if (s.touches.length > 1) return !1;
                    n = t.changedTouches[0].pageX, r = t.changedTouches[0].pageY
                }
                return e = e || p(), (i || a) && (n = t.clientX + e.x, r = t.clientY + e.y), s.pageOffset = e, s.points = [n, r], s.cursor = i || a, s
            }

            function S(t) {
                var e = t - r(tt, o.ort),
                    n = 100 * e / x();
                return o.dir ? 100 - n : n
            }

            function j(t) {
                var e = 100,
                    n = !1;
                return et.forEach(function(r, o) {
                    if (!r.hasAttribute("disabled")) {
                        var i = Math.abs(at[o] - t);
                        i < e && (n = o, e = i)
                    }
                }), n
            }

            function O(t, e, n, r) {
                var o = n.slice(),
                    i = [!t, t],
                    a = [t, !t];
                r = r.slice(), t && r.reverse(), r.length > 1 ? r.forEach(function(t, n) {
                    var r = F(o, t, o[t] + e, i[n], a[n]);
                    r === !1 ? e = 0 : (e = r - o[t], o[t] = r)
                }) : i = a = [!0];
                var s = !1;
                r.forEach(function(t, r) {
                    s = V(t, n[t] + e, i[r], a[r]) || s
                }), s && r.forEach(function(t) {
                    P("update", t), P("slide", t)
                })
            }

            function P(t, e, n) {
                Object.keys(ct).forEach(function(r) {
                    var i = r.split(".")[0];
                    t === i && ct[r].forEach(function(t) {
                        t.call(rt, lt.map(o.format.to), e, lt.slice(), n || !1, at.slice())
                    })
                })
            }

            function M(t, e) {
                "mouseout" === t.type && "HTML" === t.target.nodeName && null === t.relatedTarget && N(t, e)
            }

            function A(t, e) {
                if (navigator.appVersion.indexOf("MSIE 9") === -1 && 0 === t.buttons && 0 !== e.buttonsProperty) return N(t, e);
                var n = (o.dir ? -1 : 1) * (t.calcPoint - e.startCalcPoint),
                    r = 100 * n / e.baseSize;
                O(n > 0, r, e.locations, e.handleNumbers)
            }

            function N(t, e) {
                var n = tt.querySelector("." + o.cssClasses.active);
                null !== n && c(n, o.cssClasses.active), t.cursor && (document.body.style.cursor = "", document.body.removeEventListener("selectstart", document.body.noUiListener)), document.documentElement.noUiListeners.forEach(function(t) {
                    document.documentElement.removeEventListener(t[0], t[1])
                }), c(it, o.cssClasses.drag), z(), e.handleNumbers.forEach(function(t) {
                    P("set", t), P("change", t), P("end", t)
                })
            }

            function D(t, e) {
                if (1 === e.handleNumbers.length) {
                    var n = et[e.handleNumbers[0]];
                    if (n.hasAttribute("disabled")) return !1;
                    l(n.children[0], o.cssClasses.active)
                }
                t.preventDefault(), t.stopPropagation();
                var r = C(ot.move, document.documentElement, A, {
                        startCalcPoint: t.calcPoint,
                        baseSize: x(),
                        pageOffset: t.pageOffset,
                        handleNumbers: e.handleNumbers,
                        buttonsProperty: t.buttons,
                        locations: at.slice()
                    }),
                    i = C(ot.end, document.documentElement, N, {
                        handleNumbers: e.handleNumbers
                    }),
                    a = C("mouseout", document.documentElement, M, {
                        handleNumbers: e.handleNumbers
                    });
                if (document.documentElement.noUiListeners = r.concat(i, a), t.cursor) {
                    document.body.style.cursor = getComputedStyle(t.target).cursor, et.length > 1 && l(it, o.cssClasses.drag);
                    var s = function() {
                        return !1
                    };
                    document.body.noUiListener = s, document.body.addEventListener("selectstart", s, !1)
                }
                e.handleNumbers.forEach(function(t) {
                    P("start", t)
                })
            }

            function L(t) {
                t.stopPropagation();
                var e = S(t.calcPoint),
                    n = j(e);
                return n !== !1 && (o.events.snap || i(it, o.cssClasses.tap, o.animationDuration), V(n, e, !0, !0), z(), P("slide", n, !0), P("set", n, !0), P("change", n, !0), P("update", n, !0), void(o.events.snap && D(t, {
                    handleNumbers: [n]
                })))
            }

            function I(t) {
                var e = S(t.calcPoint),
                    n = ut.getStep(e),
                    r = ut.fromStepping(n);
                Object.keys(ct).forEach(function(t) {
                    "hover" === t.split(".")[0] && ct[t].forEach(function(t) {
                        t.call(rt, r)
                    })
                })
            }

            function R(t) {
                t.fixed || et.forEach(function(t, e) {
                    C(ot.start, t.children[0], D, {
                        handleNumbers: [e]
                    })
                }), t.tap && C(ot.start, tt, L, {}), t.hover && C(ot.move, tt, I, {
                    hover: !0
                }), t.drag && nt.forEach(function(e, n) {
                    if (e !== !1 && 0 !== n && n !== nt.length - 1) {
                        var r = et[n - 1],
                            i = et[n],
                            a = [e];
                        l(e, o.cssClasses.draggable), t.fixed && (a.push(r.children[0]), a.push(i.children[0])), a.forEach(function(t) {
                            C(ot.start, t, D, {
                                handles: [r, i],
                                handleNumbers: [n - 1, n]
                            })
                        })
                    }
                })
            }

            function F(t, e, n, r, i) {
                return et.length > 1 && (r && e > 0 && (n = Math.max(n, t[e - 1] + o.margin)), i && e < et.length - 1 && (n = Math.min(n, t[e + 1] - o.margin))), et.length > 1 && o.limit && (r && e > 0 && (n = Math.min(n, t[e - 1] + o.limit)), i && e < et.length - 1 && (n = Math.max(n, t[e + 1] - o.limit))), n = ut.getStep(n), n = a(n), n !== t[e] && n
            }

            function H(t) {
                return t + "%"
            }

            function B(t, e) {
                at[t] = e, lt[t] = ut.fromStepping(e);
                var n = function() {
                    et[t].style[o.style] = H(e), q(t), q(t + 1)
                };
                window.requestAnimationFrame && o.useRequestAnimationFrame ? window.requestAnimationFrame(n) : n()
            }

            function z() {
                st.forEach(function(t) {
                    var e = at[t] > 50 ? -1 : 1,
                        n = 3 + (et.length + e * t);
                    et[t].childNodes[0].style.zIndex = n
                })
            }

            function V(t, e, n, r) {
                return e = F(at, t, e, n, r), e !== !1 && (B(t, e), !0)
            }

            function q(t) {
                if (nt[t]) {
                    var e = 0,
                        n = 100;
                    0 !== t && (e = at[t - 1]), t !== nt.length - 1 && (n = at[t]), nt[t].style[o.style] = H(e), nt[t].style[o.styleOposite] = H(100 - n)
                }
            }

            function W(t, e) {
                null !== t && t !== !1 && ("number" == typeof t && (t = String(t)), t = o.format.from(t), t === !1 || isNaN(t) || V(e, ut.toStepping(t), !1, !1))
            }

            function $(t, e) {
                var n = s(t),
                    r = void 0 === at[0];
                e = void 0 === e || !!e, n.forEach(W), o.animate && !r && i(it, o.cssClasses.tap, o.animationDuration), st.forEach(function(t) {
                    V(t, at[t], !0, !1)
                }), z(), st.forEach(function(t) {
                    P("update", t), null !== n[t] && e && P("set", t)
                })
            }

            function X(t) {
                $(o.start, t)
            }

            function G() {
                var t = lt.map(o.format.to);
                return 1 === t.length ? t[0] : t
            }

            function Y() {
                for (var t in o.cssClasses) o.cssClasses.hasOwnProperty(t) && c(it, o.cssClasses[t]);
                for (; it.firstChild;) it.removeChild(it.firstChild);
                delete it.noUiSlider
            }

            function Q() {
                return at.map(function(t, e) {
                    var n = ut.getNearbySteps(t),
                        r = lt[e],
                        o = n.thisStep.step,
                        i = null;
                    o !== !1 && r + o > n.stepAfter.startValue && (o = n.stepAfter.startValue - r), i = r > n.thisStep.startValue ? n.thisStep.step : n.stepBefore.step !== !1 && r - n.stepBefore.highestStep, 100 === t ? o = null : 0 === t && (i = null);
                    var a = ut.countStepDecimals();
                    return null !== o && o !== !1 && (o = Number(o.toFixed(a))), null !== i && i !== !1 && (i = Number(i.toFixed(a))), [i, o]
                })
            }

            function K(t, e) {
                ct[t] = ct[t] || [], ct[t].push(e), "update" === t.split(".")[0] && et.forEach(function(t, e) {
                    P("update", e)
                })
            }

            function J(t) {
                var e = t && t.split(".")[0],
                    n = e && t.substring(e.length);
                Object.keys(ct).forEach(function(t) {
                    var r = t.split(".")[0],
                        o = t.substring(r.length);
                    e && e !== r || n && n !== o || delete ct[t]
                })
            }

            function Z(t, e) {
                var n = G(),
                    r = ["margin", "limit", "range", "animate", "snap", "step", "format"];
                r.forEach(function(e) {
                    void 0 !== t[e] && (u[e] = t[e])
                });
                var i = U(u);
                r.forEach(function(e) {
                    void 0 !== t[e] && (o[e] = i[e])
                }), i.spectrum.direction = ut.direction, ut = i.spectrum, o.margin = i.margin, o.limit = i.limit, at = [], $(t.start || n, e)
            }
            var tt, et, nt, rt, ot = h(),
                it = n,
                at = [],
                st = [],
                ut = o.spectrum,
                lt = [],
                ct = {};
            if (it.noUiSlider) throw new Error("Slider was already initialized.");
            return g(it), v(o.connect, tt), rt = {
                destroy: Y,
                steps: Q,
                on: K,
                off: J,
                get: G,
                set: $,
                reset: X,
                __moveHandles: function(t, e, n) {
                    O(t, e, at, n)
                },
                options: u,
                updateOptions: Z,
                target: it,
                pips: E
            }, R(o.events), $(o.start), o.pips && E(o.pips), o.tooltips && b(), rt
        }

        function q(t, e) {
            if (!t.nodeName) throw new Error("noUiSlider.create requires a single element.");
            var n = U(e, t),
                r = V(t, n, e);
            return t.noUiSlider = r, r
        }
        x.prototype.getMargin = function(t) {
            var e = this.xNumSteps[0];
            if (e && t % e) throw new Error("noUiSlider: 'limit' and 'margin' must be divisible by step.");
            return 2 === this.xPct.length && y(this.xVal, t)
        }, x.prototype.toStepping = function(t) {
            return t = b(this.xVal, this.xPct, t)
        }, x.prototype.fromStepping = function(t) {
            return _(this.xVal, this.xPct, t)
        }, x.prototype.getStep = function(t) {
            return t = w(this.xPct, this.xSteps, this.snap, t)
        }, x.prototype.getNearbySteps = function(t) {
            var e = m(t, this.xPct);
            return {
                stepBefore: {
                    startValue: this.xVal[e - 2],
                    step: this.xNumSteps[e - 2],
                    highestStep: this.xHighestCompleteStep[e - 2]
                },
                thisStep: {
                    startValue: this.xVal[e - 1],
                    step: this.xNumSteps[e - 1],
                    highestStep: this.xHighestCompleteStep[e - 1]
                },
                stepAfter: {
                    startValue: this.xVal[e - 0],
                    step: this.xNumSteps[e - 0],
                    highestStep: this.xHighestCompleteStep[e - 0]
                }
            }
        }, x.prototype.countStepDecimals = function() {
            var t = this.xNumSteps.map(u);
            return Math.max.apply(null, t)
        }, x.prototype.convert = function(t) {
            return this.getStep(this.toStepping(t))
        };
        var W = {
            to: function(t) {
                return void 0 !== t && t.toFixed(2)
            },
            from: Number
        };
        return {
            create: q
        }
    }),
    function() {
        "use strict";

        function t(t) {
            return t.split("").reverse().join("")
        }

        function e(t, e) {
            return t.substring(0, e.length) === e
        }

        function n(t, e) {
            return t.slice(-1 * e.length) === e
        }

        function r(t, e, n) {
            if ((t[e] || t[n]) && t[e] === t[n]) throw new Error(e)
        }

        function o(t) {
            return "number" == typeof t && isFinite(t)
        }

        function i(t, e) {
            var n = Math.pow(10, e);
            return (Math.round(t * n) / n).toFixed(e)
        }

        function a(e, n, r, a, s, u, l, c, f, p, h, d) {
            var y, v, g, m = d,
                b = "",
                _ = "";
            return u && (d = u(d)), !!o(d) && (e !== !1 && 0 === parseFloat(d.toFixed(e)) && (d = 0), d < 0 && (y = !0, d = Math.abs(d)), e !== !1 && (d = i(d, e)), d = d.toString(), d.indexOf(".") !== -1 ? (v = d.split("."), g = v[0], r && (b = r + v[1])) : g = d, n && (g = t(g).match(/.{1,3}/g), g = t(g.join(t(n)))), y && c && (_ += c), a && (_ += a), y && f && (_ += f), _ += g, _ += b, s && (_ += s), p && (_ = p(_, m)), _)
        }

        function s(t, r, i, a, s, u, l, c, f, p, h, d) {
            var y, v = "";
            return h && (d = h(d)), !(!d || "string" != typeof d) && (c && e(d, c) && (d = d.replace(c, ""), y = !0), a && e(d, a) && (d = d.replace(a, "")), f && e(d, f) && (d = d.replace(f, ""), y = !0), s && n(d, s) && (d = d.slice(0, -1 * s.length)), r && (d = d.split(r).join("")), i && (d = d.replace(i, ".")), y && (v += "-"), v += d, v = v.replace(/[^0-9\.\-.]/g, ""), "" !== v && (v = Number(v), l && (v = l(v)), !!o(v) && v))
        }

        function u(t) {
            var e, n, o, i = {};
            for (e = 0; e < f.length; e += 1)
                if (n = f[e], o = t[n], void 0 === o) "negative" !== n || i.negativeBefore ? "mark" === n && "." !== i.thousand ? i[n] = "." : i[n] = !1 : i[n] = "-";
                else if ("decimals" === n) {
                if (!(o >= 0 && o < 8)) throw new Error(n);
                i[n] = o
            } else if ("encoder" === n || "decoder" === n || "edit" === n || "undo" === n) {
                if ("function" != typeof o) throw new Error(n);
                i[n] = o
            } else {
                if ("string" != typeof o) throw new Error(n);
                i[n] = o
            }
            return r(i, "mark", "thousand"), r(i, "prefix", "negative"), r(i, "prefix", "negativeBefore"), i
        }

        function l(t, e, n) {
            var r, o = [];
            for (r = 0; r < f.length; r += 1) o.push(t[f[r]]);
            return o.push(n), e.apply("", o)
        }

        function c(t) {
            return this instanceof c ? void("object" == typeof t && (t = u(t), this.to = function(e) {
                return l(t, a, e)
            }, this.from = function(e) {
                return l(t, s, e)
            })) : new c(t)
        }
        var f = ["decimals", "thousand", "mark", "prefix", "postfix", "encoder", "decoder", "negativeBefore", "negative", "edit", "undo"];
        window.wNumb = c
    }(),
    function(t, e) {
        function n(t, e) {
            var n, r = t.cssRules ? t.cssRules : t.media,
                o = [],
                i = 0,
                a = r.length;
            for (i; i < a; i++) n = r[i], e(n) && o.push(n);
            return o
        }

        function r(t) {
            return n(t, function(t) {
                return t.constructor === CSSMediaRule
            })
        }

        function o(n) {
            var r = t.location,
                o = e.createElement("a");
            return o.href = n, o.hostname === r.hostname && o.protocol === r.protocol
        }

        function i(t) {
            return t.ownerNode.constructor === HTMLStyleElement
        }

        function a(t) {
            return t.href && o(t.href)
        }

        function s() {
            var t, n = e.styleSheets,
                r = n.length,
                o = 0,
                s = [];
            for (o; o < r; o++) t = n[o], (a(t) || i(t)) && s.push(t);
            return s
        }
        return e.addEventListener ? void e.addEventListener("DOMContentLoaded", function() {
            t.mqGenie = function() {
                var n = e.documentElement;
                n.style.overflowY = "scroll";
                var o = t.innerWidth - n.clientWidth,
                    i = {
                        adjusted: o > 0,
                        fontSize: parseFloat(t.getComputedStyle(n).getPropertyValue("font-size")),
                        width: o,
                        adjustMediaQuery: function(t) {
                            if (!mqGenie.adjusted) return t;
                            var e = t.replace(/\d+px/gi, function(t) {
                                return parseInt(t, 10) + mqGenie.width + "px"
                            });
                            return e = e.replace(/\d.+?em/gi, function(t) {
                                return (parseFloat(t) * mqGenie.fontSize + mqGenie.width) / mqGenie.fontSize + "em"
                            })
                        }
                    };
                if (i.adjusted) {
                    if ("WebkitAppearance" in n.style) {
                        var a, u = /Chrome\/(\d*?\.\d*?\.\d*?\.\d*?)\s/g,
                            l = navigator.userAgent.match(u);
                        if (l ? (l = l[0].replace(u, "$1"), a = l.split("."), a[0] = parseInt(a[0]), a[2] = parseInt(a[2]), a[3] = parseInt(a[3]), a[0] <= 29 && (29 === a[0] && a[2] < 1548 && a[3] < 57 ? i.adjusted = !1 : a[0] < 29 && (i.adjusted = !1))) : i.adjusted = !1, !i.adjusted) return i
                    }
                    var c, f, p = s(),
                        h = p.length,
                        d = 0;
                    for (d; d < h; d++) {
                        c = r(p[d]), f = c.length;
                        for (var y = 0; y < f; y++) c[y].media.mediaText = c[y].media.mediaText.replace(/m(in|ax)-width:\s*(\d|\.)+(px|em)/gi, function(t) {
                            return t.match("px") ? t.replace(/\d+px/gi, function(t) {
                                return parseInt(t, 10) + i.width + "px"
                            }) : t.replace(/\d.+?em/gi, function(t) {
                                return (parseFloat(t) * i.fontSize + i.width) / i.fontSize + "em"
                            })
                        })
                    }
                }
                return i
            }()
        }) : void(t.mqGenie = {
            adjustMediaQuery: function(t) {
                return t
            }
        })
    }(window, document), ! function(t, e) {
        "function" == typeof define && define.amd ? define([], function() {
            return t.svg4everybody = e()
        }) : "object" == typeof module && module.exports ? module.exports = e() : t.svg4everybody = e()
    }(this, function() {
        /*! svg4everybody v2.1.8 | github.com/jonathantneal/svg4everybody */
        function t(t, e, n) {
            if (n) {
                var r = document.createDocumentFragment(),
                    o = !e.hasAttribute("viewBox") && n.getAttribute("viewBox");
                o && e.setAttribute("viewBox", o);
                for (var i = n.cloneNode(!0); i.childNodes.length;) r.appendChild(i.firstChild);
                t.appendChild(r)
            }
        }

        function e(e) {
            e.onreadystatechange = function() {
                if (4 === e.readyState) {
                    var n = e._cachedDocument;
                    n || (n = e._cachedDocument = document.implementation.createHTMLDocument(""), n.body.innerHTML = e.responseText, e._cachedTarget = {}), e._embeds.splice(0).map(function(r) {
                        var o = e._cachedTarget[r.id];
                        o || (o = e._cachedTarget[r.id] = n.getElementById(r.id)), t(r.parent, r.svg, o)
                    })
                }
            }, e.onreadystatechange()
        }

        function n(n) {
            function o() {
                for (var n = 0; n < d.length;) {
                    var s = d[n],
                        u = s.parentNode,
                        l = r(u);
                    if (l) {
                        var c = s.getAttribute("xlink:href") || s.getAttribute("href");
                        if (!c && a.attributeName && (c = s.getAttribute(a.attributeName)), i)
                            if (!a.validate || a.validate(c, l, s)) {
                                u.removeChild(s);
                                var f = c.split("#"),
                                    v = f.shift(),
                                    g = f.join("#");
                                if (v.length) {
                                    var m = p[v];
                                    m || (m = p[v] = new XMLHttpRequest, m.open("GET", v), m.send(), m._embeds = []), m._embeds.push({
                                        parent: u,
                                        svg: l,
                                        id: g
                                    }), e(m)
                                } else t(u, l, document.getElementById(g))
                            } else ++n, ++y
                    } else ++n
                }(!d.length || d.length - y > 0) && h(o, 67)
            }
            var i, a = Object(n),
                s = /\bTrident\/[567]\b|\bMSIE (?:9|10)\.0\b/,
                u = /\bAppleWebKit\/(\d+)\b/,
                l = /\bEdge\/12\.(\d+)\b/,
                c = /\bEdge\/.(\d+)\b/,
                f = window.top !== window.self;
            i = "polyfill" in a ? a.polyfill : s.test(navigator.userAgent) || (navigator.userAgent.match(l) || [])[1] < 10547 || (navigator.userAgent.match(u) || [])[1] < 537 || c.test(navigator.userAgent) && f;
            var p = {},
                h = window.requestAnimationFrame || setTimeout,
                d = document.getElementsByTagName("use"),
                y = 0;
            i && o()
        }

        function r(t) {
            for (var e = t;
                "svg" !== e.nodeName.toLowerCase() && (e = e.parentNode););
            return e
        }
        return n
    });
/**
 * Copyright (c) 2014-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var runtime = function(t) {
    "use strict";

    function e(t, e, n, o) {
        var i = e && e.prototype instanceof r ? e : r,
            a = Object.create(i.prototype),
            s = new p(o || []);
        return a._invoke = u(t, n, s), a
    }

    function n(t, e, n) {
        try {
            return {
                type: "normal",
                arg: t.call(e, n)
            }
        } catch (r) {
            return {
                type: "throw",
                arg: r
            }
        }
    }

    function r() {}

    function o() {}

    function i() {}

    function a(t) {
        ["next", "throw", "return"].forEach(function(e) {
            t[e] = function(t) {
                return this._invoke(e, t)
            }
        })
    }

    function s(t) {
        function e(r, o, i, a) {
            var s = n(t[r], t, o);
            if ("throw" !== s.type) {
                var u = s.arg,
                    l = u.value;
                return l && "object" == typeof l && g.call(l, "__await") ? Promise.resolve(l.__await).then(function(t) {
                    e("next", t, i, a)
                }, function(t) {
                    e("throw", t, i, a)
                }) : Promise.resolve(l).then(function(t) {
                    u.value = t, i(u)
                }, function(t) {
                    return e("throw", t, i, a)
                })
            }
            a(s.arg)
        }

        function r(t, n) {
            function r() {
                return new Promise(function(r, o) {
                    e(t, n, r, o)
                })
            }
            return o = o ? o.then(r, r) : r()
        }
        var o;
        this._invoke = r
    }

    function u(t, e, r) {
        var o = T;
        return function(i, a) {
            if (o === x) throw new Error("Generator is already running");
            if (o === C) {
                if ("throw" === i) throw a;
                return d()
            }
            for (r.method = i, r.arg = a;;) {
                var s = r.delegate;
                if (s) {
                    var u = l(s, r);
                    if (u) {
                        if (u === k) continue;
                        return u
                    }
                }
                if ("next" === r.method) r.sent = r._sent = r.arg;
                else if ("throw" === r.method) {
                    if (o === T) throw o = C, r.arg;
                    r.dispatchException(r.arg)
                } else "return" === r.method && r.abrupt("return", r.arg);
                o = x;
                var c = n(t, e, r);
                if ("normal" === c.type) {
                    if (o = r.done ? C : E, c.arg === k) continue;
                    return {
                        value: c.arg,
                        done: r.done
                    }
                }
                "throw" === c.type && (o = C, r.method = "throw", r.arg = c.arg)
            }
        }
    }

    function l(t, e) {
        var r = t.iterator[e.method];
        if (r === y) {
            if (e.delegate = null, "throw" === e.method) {
                if (t.iterator["return"] && (e.method = "return", e.arg = y, l(t, e), "throw" === e.method)) return k;
                e.method = "throw", e.arg = new TypeError("The iterator does not provide a 'throw' method")
            }
            return k
        }
        var o = n(r, t.iterator, e.arg);
        if ("throw" === o.type) return e.method = "throw", e.arg = o.arg, e.delegate = null, k;
        var i = o.arg;
        return i ? i.done ? (e[t.resultName] = i.value, e.next = t.nextLoc, "return" !== e.method && (e.method = "next", e.arg = y), e.delegate = null, k) : i : (e.method = "throw", e.arg = new TypeError("iterator result is not an object"), e.delegate = null, k)
    }

    function c(t) {
        var e = {
            tryLoc: t[0]
        };
        1 in t && (e.catchLoc = t[1]), 2 in t && (e.finallyLoc = t[2], e.afterLoc = t[3]), this.tryEntries.push(e)
    }

    function f(t) {
        var e = t.completion || {};
        e.type = "normal", delete e.arg, t.completion = e
    }

    function p(t) {
        this.tryEntries = [{
            tryLoc: "root"
        }], t.forEach(c, this), this.reset(!0)
    }

    function h(t) {
        if (t) {
            var e = t[b];
            if (e) return e.call(t);
            if ("function" == typeof t.next) return t;
            if (!isNaN(t.length)) {
                var n = -1,
                    r = function o() {
                        for (; ++n < t.length;)
                            if (g.call(t, n)) return o.value = t[n], o.done = !1, o;
                        return o.value = y, o.done = !0, o
                    };
                return r.next = r
            }
        }
        return {
            next: d
        }
    }

    function d() {
        return {
            value: y,
            done: !0
        }
    }
    var y, v = Object.prototype,
        g = v.hasOwnProperty,
        m = "function" == typeof Symbol ? Symbol : {},
        b = m.iterator || "@@iterator",
        _ = m.asyncIterator || "@@asyncIterator",
        w = m.toStringTag || "@@toStringTag";
    t.wrap = e;
    var T = "suspendedStart",
        E = "suspendedYield",
        x = "executing",
        C = "completed",
        k = {},
        S = {};
    S[b] = function() {
        return this
    };
    var j = Object.getPrototypeOf,
        O = j && j(j(h([])));
    O && O !== v && g.call(O, b) && (S = O);
    var P = i.prototype = r.prototype = Object.create(S);
    return o.prototype = P.constructor = i, i.constructor = o, i[w] = o.displayName = "GeneratorFunction", t.isGeneratorFunction = function(t) {
        var e = "function" == typeof t && t.constructor;
        return !!e && (e === o || "GeneratorFunction" === (e.displayName || e.name))
    }, t.mark = function(t) {
        return Object.setPrototypeOf ? Object.setPrototypeOf(t, i) : (t.__proto__ = i, w in t || (t[w] = "GeneratorFunction")), t.prototype = Object.create(P), t
    }, t.awrap = function(t) {
        return {
            __await: t
        }
    }, a(s.prototype), s.prototype[_] = function() {
        return this
    }, t.AsyncIterator = s, t.async = function(n, r, o, i) {
        var a = new s(e(n, r, o, i));
        return t.isGeneratorFunction(r) ? a : a.next().then(function(t) {
            return t.done ? t.value : a.next()
        })
    }, a(P), P[w] = "Generator", P[b] = function() {
        return this
    }, P.toString = function() {
        return "[object Generator]"
    }, t.keys = function(t) {
        var e = [];
        for (var n in t) e.push(n);
        return e.reverse(),
            function r() {
                for (; e.length;) {
                    var n = e.pop();
                    if (n in t) return r.value = n, r.done = !1, r
                }
                return r.done = !0, r
            }
    }, t.values = h, p.prototype = {
        constructor: p,
        reset: function(t) {
            if (this.prev = 0, this.next = 0, this.sent = this._sent = y, this.done = !1, this.delegate = null, this.method = "next", this.arg = y, this.tryEntries.forEach(f), !t)
                for (var e in this) "t" === e.charAt(0) && g.call(this, e) && !isNaN(+e.slice(1)) && (this[e] = y)
        },
        stop: function() {
            this.done = !0;
            var t = this.tryEntries[0],
                e = t.completion;
            if ("throw" === e.type) throw e.arg;
            return this.rval
        },
        dispatchException: function(t) {
            function e(e, r) {
                return i.type = "throw", i.arg = t, n.next = e, r && (n.method = "next", n.arg = y), !!r
            }
            if (this.done) throw t;
            for (var n = this, r = this.tryEntries.length - 1; r >= 0; --r) {
                var o = this.tryEntries[r],
                    i = o.completion;
                if ("root" === o.tryLoc) return e("end");
                if (o.tryLoc <= this.prev) {
                    var a = g.call(o, "catchLoc"),
                        s = g.call(o, "finallyLoc");
                    if (a && s) {
                        if (this.prev < o.catchLoc) return e(o.catchLoc, !0);
                        if (this.prev < o.finallyLoc) return e(o.finallyLoc)
                    } else if (a) {
                        if (this.prev < o.catchLoc) return e(o.catchLoc, !0)
                    } else {
                        if (!s) throw new Error("try statement without catch or finally");
                        if (this.prev < o.finallyLoc) return e(o.finallyLoc)
                    }
                }
            }
        },
        abrupt: function(t, e) {
            for (var n = this.tryEntries.length - 1; n >= 0; --n) {
                var r = this.tryEntries[n];
                if (r.tryLoc <= this.prev && g.call(r, "finallyLoc") && this.prev < r.finallyLoc) {
                    var o = r;
                    break
                }
            }
            o && ("break" === t || "continue" === t) && o.tryLoc <= e && e <= o.finallyLoc && (o = null);
            var i = o ? o.completion : {};
            return i.type = t, i.arg = e, o ? (this.method = "next", this.next = o.finallyLoc, k) : this.complete(i)
        },
        complete: function(t, e) {
            if ("throw" === t.type) throw t.arg;
            return "break" === t.type || "continue" === t.type ? this.next = t.arg : "return" === t.type ? (this.rval = this.arg = t.arg, this.method = "return", this.next = "end") : "normal" === t.type && e && (this.next = e), k
        },
        finish: function(t) {
            for (var e = this.tryEntries.length - 1; e >= 0; --e) {
                var n = this.tryEntries[e];
                if (n.finallyLoc === t) return this.complete(n.completion, n.afterLoc), f(n), k
            }
        },
        "catch": function(t) {
            for (var e = this.tryEntries.length - 1; e >= 0; --e) {
                var n = this.tryEntries[e];
                if (n.tryLoc === t) {
                    var r = n.completion;
                    if ("throw" === r.type) {
                        var o = r.arg;
                        f(n)
                    }
                    return o
                }
            }
            throw new Error("illegal catch attempt")
        },
        delegateYield: function(t, e, n) {
            return this.delegate = {
                iterator: h(t),
                resultName: e,
                nextLoc: n
            }, "next" === this.method && (this.arg = y), k
        }
    }, t
}("object" == typeof module ? module.exports : {});
try {
    regeneratorRuntime = runtime
} catch (accidentalStrictMode) {
    Function("r", "regeneratorRuntime = r")(runtime)
} /*! lazysizes - v5.3.2 https://github.com/aFarkas/lazysizes */ ! function(t) {
    var e = function(t, e, n) {
        "use strict";
        var r, o;
        if (function() {
                var e, n = {
                    lazyClass: "lazyload",
                    loadedClass: "lazyloaded",
                    loadingClass: "lazyloading",
                    preloadClass: "lazypreload",
                    errorClass: "lazyerror",
                    autosizesClass: "lazyautosizes",
                    fastLoadedClass: "ls-is-cached",
                    iframeLoadMode: 0,
                    srcAttr: "data-src",
                    srcsetAttr: "data-srcset",
                    sizesAttr: "data-sizes",
                    minSize: 40,
                    customMedia: {},
                    init: !0,
                    expFactor: 1.5,
                    hFac: .8,
                    loadMode: 2,
                    loadHidden: !0,
                    ricTimeout: 0,
                    throttleDelay: 125
                };
                o = t.lazySizesConfig || t.lazysizesConfig || {};
                for (e in n) e in o || (o[e] = n[e])
            }(), !e || !e.getElementsByClassName) return {
            init: function() {},
            cfg: o,
            noSupport: !0
        };
        var i = e.documentElement,
            a = t.HTMLPictureElement,
            s = "addEventListener",
            u = "getAttribute",
            l = t[s].bind(t),
            c = t.setTimeout,
            f = t.requestAnimationFrame || c,
            p = t.requestIdleCallback,
            h = /^picture$/i,
            d = ["load", "error", "lazyincluded", "_lazyloaded"],
            y = {},
            v = Array.prototype.forEach,
            g = function(t, e) {
                return y[e] || (y[e] = new RegExp("(\\s|^)" + e + "(\\s|$)")), y[e].test(t[u]("class") || "") && y[e]
            },
            m = function(t, e) {
                g(t, e) || t.setAttribute("class", (t[u]("class") || "").trim() + " " + e)
            },
            b = function(t, e) {
                var n;
                (n = g(t, e)) && t.setAttribute("class", (t[u]("class") || "").replace(n, " "))
            },
            _ = function(t, e, n) {
                var r = n ? s : "removeEventListener";
                n && _(t, e), d.forEach(function(n) {
                    t[r](n, e)
                })
            },
            w = function(t, n, o, i, a) {
                var s = e.createEvent("Event");
                return o || (o = {}), o.instance = r, s.initEvent(n, !i, !a), s.detail = o, t.dispatchEvent(s), s
            },
            T = function(e, n) {
                var r;
                !a && (r = t.picturefill || o.pf) ? (n && n.src && !e[u]("srcset") && e.setAttribute("srcset", n.src), r({
                    reevaluate: !0,
                    elements: [e]
                })) : n && n.src && (e.src = n.src)
            },
            E = function(t, e) {
                return (getComputedStyle(t, null) || {})[e]
            },
            x = function(t, e, n) {
                for (n = n || t.offsetWidth; n < o.minSize && e && !t._lazysizesWidth;) n = e.offsetWidth, e = e.parentNode;
                return n
            },
            C = function() {
                var t, n, r = [],
                    o = [],
                    i = r,
                    a = function() {
                        var e = i;
                        for (i = r.length ? o : r, t = !0, n = !1; e.length;) e.shift()();
                        t = !1
                    },
                    s = function(r, o) {
                        t && !o ? r.apply(this, arguments) : (i.push(r), n || (n = !0, (e.hidden ? c : f)(a)))
                    };
                return s._lsFlush = a, s
            }(),
            k = function(t, e) {
                return e ? function() {
                    C(t)
                } : function() {
                    var e = this,
                        n = arguments;
                    C(function() {
                        t.apply(e, n)
                    })
                }
            },
            S = function(t) {
                var e, r = 0,
                    i = o.throttleDelay,
                    a = o.ricTimeout,
                    s = function() {
                        e = !1, r = n.now(), t()
                    },
                    u = p && a > 49 ? function() {
                        p(s, {
                            timeout: a
                        }), a !== o.ricTimeout && (a = o.ricTimeout)
                    } : k(function() {
                        c(s)
                    }, !0);
                return function(t) {
                    var o;
                    (t = t === !0) && (a = 33), e || (e = !0, o = i - (n.now() - r), o < 0 && (o = 0), t || o < 9 ? u() : c(u, o))
                }
            },
            j = function(t) {
                var e, r, o = 99,
                    i = function() {
                        e = null, t()
                    },
                    a = function() {
                        var t = n.now() - r;
                        t < o ? c(a, o - t) : (p || i)(i)
                    };
                return function() {
                    r = n.now(), e || (e = c(a, o))
                }
            },
            O = function() {
                var a, p, d, y, x, O, M, A, N, D, L, I, R = /^img$/i,
                    F = /^iframe$/i,
                    H = "onscroll" in t && !/(gle|ing)bot/.test(navigator.userAgent),
                    B = 0,
                    z = 0,
                    U = 0,
                    V = -1,
                    q = function(t) {
                        U--, (!t || U < 0 || !t.target) && (U = 0)
                    },
                    W = function(t) {
                        return null == I && (I = "hidden" == E(e.body, "visibility")), I || !("hidden" == E(t.parentNode, "visibility") && "hidden" == E(t, "visibility"))
                    },
                    $ = function(t, n) {
                        var r, o = t,
                            a = W(t);
                        for (A -= n, L += n, N -= n, D += n; a && (o = o.offsetParent) && o != e.body && o != i;) a = (E(o, "opacity") || 1) > 0, a && "visible" != E(o, "overflow") && (r = o.getBoundingClientRect(), a = D > r.left && N < r.right && L > r.top - 1 && A < r.bottom + 1);
                        return a
                    },
                    X = function() {
                        var t, n, s, l, c, f, h, d, v, g, m, b, _ = r.elements;
                        if ((y = o.loadMode) && U < 8 && (t = _.length)) {
                            for (n = 0, V++; n < t; n++)
                                if (_[n] && !_[n]._lazyRace)
                                    if (!H || r.prematureUnveil && r.prematureUnveil(_[n])) et(_[n]);
                                    else if ((d = _[n][u]("data-expand")) && (f = 1 * d) || (f = z), g || (g = !o.expand || o.expand < 1 ? i.clientHeight > 500 && i.clientWidth > 500 ? 500 : 370 : o.expand, r._defEx = g, m = g * o.expFactor, b = o.hFac, I = null, z < m && U < 1 && V > 2 && y > 2 && !e.hidden ? (z = m, V = 0) : z = y > 1 && V > 1 && U < 6 ? g : B), v !== f && (O = innerWidth + f * b, M = innerHeight + f, h = f * -1, v = f), s = _[n].getBoundingClientRect(), (L = s.bottom) >= h && (A = s.top) <= M && (D = s.right) >= h * b && (N = s.left) <= O && (L || D || N || A) && (o.loadHidden || W(_[n])) && (p && U < 3 && !d && (y < 3 || V < 4) || $(_[n], f))) {
                                if (et(_[n]), c = !0, U > 9) break
                            } else !c && p && !l && U < 4 && V < 4 && y > 2 && (a[0] || o.preloadAfterLoad) && (a[0] || !d && (L || D || N || A || "auto" != _[n][u](o.sizesAttr))) && (l = a[0] || _[n]);
                            l && !c && et(l)
                        }
                    },
                    G = S(X),
                    Y = function(t) {
                        var e = t.target;
                        return e._lazyCache ? void delete e._lazyCache : (q(t), m(e, o.loadedClass), b(e, o.loadingClass), _(e, K), void w(e, "lazyloaded"))
                    },
                    Q = k(Y),
                    K = function(t) {
                        Q({
                            target: t.target
                        })
                    },
                    J = function(t, e) {
                        var n = t.getAttribute("data-load-mode") || o.iframeLoadMode;
                        0 == n ? t.contentWindow.location.replace(e) : 1 == n && (t.src = e)
                    },
                    Z = function(t) {
                        var e, n = t[u](o.srcsetAttr);
                        (e = o.customMedia[t[u]("data-media") || t[u]("media")]) && t.setAttribute("media", e), n && t.setAttribute("srcset", n)
                    },
                    tt = k(function(t, e, n, r, i) {
                        var a, s, l, f, p, y;
                        (p = w(t, "lazybeforeunveil", e)).defaultPrevented || (r && (n ? m(t, o.autosizesClass) : t.setAttribute("sizes", r)), s = t[u](o.srcsetAttr), a = t[u](o.srcAttr), i && (l = t.parentNode, f = l && h.test(l.nodeName || "")), y = e.firesLoad || "src" in t && (s || a || f), p = {
                            target: t
                        }, m(t, o.loadingClass), y && (clearTimeout(d), d = c(q, 2500), _(t, K, !0)), f && v.call(l.getElementsByTagName("source"), Z), s ? t.setAttribute("srcset", s) : a && !f && (F.test(t.nodeName) ? J(t, a) : t.src = a), i && (s || f) && T(t, {
                            src: a
                        })), t._lazyRace && delete t._lazyRace, b(t, o.lazyClass), C(function() {
                            var e = t.complete && t.naturalWidth > 1;
                            y && !e || (e && m(t, o.fastLoadedClass), Y(p), t._lazyCache = !0, c(function() {
                                "_lazyCache" in t && delete t._lazyCache
                            }, 9)), "lazy" == t.loading && U--
                        }, !0)
                    }),
                    et = function(t) {
                        if (!t._lazyRace) {
                            var e, n = R.test(t.nodeName),
                                r = n && (t[u](o.sizesAttr) || t[u]("sizes")),
                                i = "auto" == r;
                            (!i && p || !n || !t[u]("src") && !t.srcset || t.complete || g(t, o.errorClass) || !g(t, o.lazyClass)) && (e = w(t, "lazyunveilread").detail, i && P.updateElem(t, !0, t.offsetWidth), t._lazyRace = !0, U++, tt(t, e, i, r, n))
                        }
                    },
                    nt = j(function() {
                        o.loadMode = 3, G()
                    }),
                    rt = function() {
                        3 == o.loadMode && (o.loadMode = 2), nt()
                    },
                    ot = function() {
                        if (!p) {
                            if (n.now() - x < 999) return void c(ot, 999);
                            p = !0, o.loadMode = 3, G(), l("scroll", rt, !0)
                        }
                    };
                return {
                    _: function() {
                        x = n.now(), r.elements = e.getElementsByClassName(o.lazyClass), a = e.getElementsByClassName(o.lazyClass + " " + o.preloadClass), l("scroll", G, !0), l("resize", G, !0), l("pageshow", function(t) {
                            if (t.persisted) {
                                var n = e.querySelectorAll("." + o.loadingClass);
                                n.length && n.forEach && f(function() {
                                    n.forEach(function(t) {
                                        t.complete && et(t)
                                    })
                                })
                            }
                        }), t.MutationObserver ? new MutationObserver(G).observe(i, {
                            childList: !0,
                            subtree: !0,
                            attributes: !0
                        }) : (i[s]("DOMNodeInserted", G, !0), i[s]("DOMAttrModified", G, !0), setInterval(G, 999)), l("hashchange", G, !0), ["focus", "mouseover", "click", "load", "transitionend", "animationend"].forEach(function(t) {
                            e[s](t, G, !0)
                        }), /d$|^c/.test(e.readyState) ? ot() : (l("load", ot), e[s]("DOMContentLoaded", G), c(ot, 2e4)), r.elements.length ? (X(), C._lsFlush()) : G()
                    },
                    checkElems: G,
                    unveil: et,
                    _aLSL: rt
                }
            }(),
            P = function() {
                var t, n = k(function(t, e, n, r) {
                        var o, i, a;
                        if (t._lazysizesWidth = r, r += "px", t.setAttribute("sizes", r), h.test(e.nodeName || ""))
                            for (o = e.getElementsByTagName("source"), i = 0, a = o.length; i < a; i++) o[i].setAttribute("sizes", r);
                        n.detail.dataAttr || T(t, n.detail)
                    }),
                    r = function(t, e, r) {
                        var o, i = t.parentNode;
                        i && (r = x(t, i, r), o = w(t, "lazybeforesizes", {
                            width: r,
                            dataAttr: !!e
                        }), o.defaultPrevented || (r = o.detail.width, r && r !== t._lazysizesWidth && n(t, i, o, r)))
                    },
                    i = function() {
                        var e, n = t.length;
                        if (n)
                            for (e = 0; e < n; e++) r(t[e])
                    },
                    a = j(i);
                return {
                    _: function() {
                        t = e.getElementsByClassName(o.autosizesClass), l("resize", a)
                    },
                    checkElems: a,
                    updateElem: r
                }
            }(),
            M = function() {
                !M.i && e.getElementsByClassName && (M.i = !0, P._(), O._())
            };
        return c(function() {
            o.init && M()
        }), r = {
            cfg: o,
            autoSizer: P,
            loader: O,
            init: M,
            uP: T,
            aC: m,
            rC: b,
            hC: g,
            fire: w,
            gW: x,
            rAF: C
        }
    }(t, t.document, Date);
    t.lazySizes = e, "object" == typeof module && module.exports && (module.exports = e)
}("undefined" != typeof window ? window : {}), /*! lazysizes - v5.2.2 */
! function(t, e) {
    var n;
    t && (n = function() {
        e(t.lazySizes), t.removeEventListener("lazyunveilread", n, !0)
    }, e = e.bind(null, t, t.document), "object" == typeof module && module.exports ? e(require("lazysizes")) : "function" == typeof define && define.amd ? define(["lazysizes"], e) : t.lazySizes ? n() : t.addEventListener("lazyunveilread", n, !0))
}("undefined" != typeof window ? window : 0, function(t, e, n) {
    "use strict";

    function r(t, e) {
        return t.w - e.w
    }

    function o(t, e, n, r) {
        f.push({
            c: e,
            u: n,
            w: +r
        })
    }

    function i(e, r) {
        var o, i = e.getAttribute("srcset") || e.getAttribute(b.srcsetAttr);
        !i && r && (i = e._lazypolyfill ? e._lazypolyfill._set : e.getAttribute(b.srcAttr) || e.getAttribute("src")), e._lazypolyfill && e._lazypolyfill._set == i || (o = y(i || ""), r && e.parentNode && (o.isPicture = "PICTURE" == e.parentNode.nodeName.toUpperCase(), o.isPicture && t.matchMedia && (n.aC(e, "lazymatchmedia"), v())), o._set = i, Object.defineProperty(e, "_lazypolyfill", {
            value: o,
            writable: !0
        }))
    }

    function a(e) {
        var o, a, s, u, l, c, f, p, h, y = e;
        if (i(y, !0), (u = y._lazypolyfill).isPicture)
            for (a = 0, s = (o = e.parentNode.getElementsByTagName("source")).length; a < s; a++)
                if (b.supportsType(o[a].getAttribute("type"), e) && g(o[a].getAttribute("media"))) {
                    y = o[a], i(y), u = y._lazypolyfill;
                    break
                } return 1 < u.length ? (c = y.getAttribute("sizes") || "", c = d.test(c) && parseInt(c, 10) || n.gW(e, e.parentNode), u.d = (f = e, p = t.devicePixelRatio || 1, h = n.getX && n.getX(f), Math.min(h || p, 2.5, p)), !u.src || !u.w || u.w < c ? (u.w = c, l = function(t) {
            for (var e, n, r = t.length, o = t[r - 1], i = 0; i < r; i++)
                if ((o = t[i]).d = o.w / t.w, o.d >= t.d) {
                    !o.cached && (e = t[i - 1]) && e.d > t.d - .13 * Math.pow(t.d, 2.2) && (n = Math.pow(e.d - .6, 1.6), e.cached && (e.d += .15 * n), e.d + (o.d - t.d) * n > t.d && (o = e));
                    break
                } return o
        }(u.sort(r)), u.src = l) : l = u.src) : l = u[0], l
    }

    function s(t) {
        var e;
        w && t.parentNode && "PICTURE" != t.parentNode.nodeName.toUpperCase() || (e = a(t)) && e.u && t._lazypolyfill.cur != e.u && (t._lazypolyfill.cur = e.u, e.cached = !0, t.setAttribute(b.srcAttr, e.u), t.setAttribute("src", e.u))
    }
    var u, l, c, f, p, h, d, y, v, g, m, b = n.cfg,
        _ = e.createElement("img"),
        w = "sizes" in _ && "srcset" in _,
        T = /\s+\d+h/g,
        E = (l = /\s+(\d+)(w|h)\s+(\d+)(w|h)/, c = Array.prototype.forEach, function() {
            function t(t) {
                var e, n, r = t.getAttribute(b.srcsetAttr);
                r && (n = r.match(l)) && ((e = "w" == n[2] ? n[1] / n[3] : n[3] / n[1]) && t.setAttribute("data-aspectratio", e), t.setAttribute(b.srcsetAttr, r.replace(T, "")))
            }

            function r(e) {
                var r;
                e.detail.instance == n && ((r = e.target.parentNode) && "PICTURE" == r.nodeName && c.call(r.getElementsByTagName("source"), t), t(e.target))
            }

            function o() {
                i.currentSrc && e.removeEventListener("lazybeforeunveil", r)
            }
            var i = e.createElement("img");
            e.addEventListener("lazybeforeunveil", r), i.onload = o, i.onerror = o, i.srcset = "data:,a 1w 1h", i.complete && o()
        });
    b.supportsType || (b.supportsType = function(t) {
        return !t
    }), t.HTMLPictureElement && w ? !n.hasHDescriptorFix && e.msElementsFromPoint && (n.hasHDescriptorFix = !0, E()) : t.picturefill || b.pf || (b.pf = function(e) {
        var n, r;
        if (!t.picturefill)
            for (n = 0, r = e.elements.length; n < r; n++) u(e.elements[n])
    }, d = /^\s*\d+\.*\d*px\s*$/, p = /(([^,\s].[^\s]+)\s+(\d+)w)/g, h = /\s/, v = function() {
        function t() {
            for (var t = 0, e = r.length; t < e; t++) u(r[t])
        }
        var n, r;
        v.init || (v.init = !0, addEventListener("resize", (r = e.getElementsByClassName("lazymatchmedia"), function() {
            clearTimeout(n), n = setTimeout(t, 66)
        })))
    }, g = function(e) {
        return t.matchMedia ? (g = function(t) {
            return !t || (matchMedia(t) || {}).matches
        })(e) : !e
    }, s.parse = y = function(t) {
        return f = [], (t = t.trim()).replace(T, "").replace(p, o), f.length || !t || h.test(t) || f.push({
            c: t,
            u: t,
            w: 99
        }), f
    }, u = s, b.loadedClass && b.loadingClass && (m = [], ['img[sizes$="px"][srcset].', "picture > img:not([srcset])."].forEach(function(t) {
        m.push(t + b.loadedClass), m.push(t + b.loadingClass)
    }), b.pf({
        elements: e.querySelectorAll(m.join(", "))
    })))
});