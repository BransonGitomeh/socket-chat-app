/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 15);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(setImmediate, global) {

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

;(function () {
	"use strict";

	function Vnode(tag, key, attrs0, children, text, dom) {
		return { tag: tag, key: key, attrs: attrs0, children: children, text: text, dom: dom, domSize: undefined, state: undefined, _state: undefined, events: undefined, instance: undefined, skip: false };
	}
	Vnode.normalize = function (node) {
		if (Array.isArray(node)) return Vnode("[", undefined, undefined, Vnode.normalizeChildren(node), undefined, undefined);
		if (node != null && (typeof node === "undefined" ? "undefined" : _typeof(node)) !== "object") return Vnode("#", undefined, undefined, node === false ? "" : node, undefined, undefined);
		return node;
	};
	Vnode.normalizeChildren = function normalizeChildren(children) {
		for (var i = 0; i < children.length; i++) {
			children[i] = Vnode.normalize(children[i]);
		}
		return children;
	};
	var selectorParser = /(?:(^|#|\.)([^#\.\[\]]+))|(\[(.+?)(?:\s*=\s*("|'|)((?:\\["'\]]|.)*?)\5)?\])/g;
	var selectorCache = {};
	var hasOwn = {}.hasOwnProperty;
	function compileSelector(selector) {
		var match,
		    tag = "div",
		    classes = [],
		    attrs = {};
		while (match = selectorParser.exec(selector)) {
			var type = match[1],
			    value = match[2];
			if (type === "" && value !== "") tag = value;else if (type === "#") attrs.id = value;else if (type === ".") classes.push(value);else if (match[3][0] === "[") {
				var attrValue = match[6];
				if (attrValue) attrValue = attrValue.replace(/\\(["'])/g, "$1").replace(/\\\\/g, "\\");
				if (match[4] === "class") classes.push(attrValue);else attrs[match[4]] = attrValue || true;
			}
		}
		if (classes.length > 0) attrs.className = classes.join(" ");
		return selectorCache[selector] = { tag: tag, attrs: attrs };
	}
	function execSelector(state, attrs, children) {
		var hasAttrs = false,
		    childList,
		    text;
		var className = attrs.className || attrs.class;
		for (var key in state.attrs) {
			if (hasOwn.call(state.attrs, key)) {
				attrs[key] = state.attrs[key];
			}
		}
		if (className !== undefined) {
			if (attrs.class !== undefined) {
				attrs.class = undefined;
				attrs.className = className;
			}
			if (state.attrs.className != null) {
				attrs.className = state.attrs.className + " " + className;
			}
		}
		for (var key in attrs) {
			if (hasOwn.call(attrs, key) && key !== "key") {
				hasAttrs = true;
				break;
			}
		}
		if (Array.isArray(children) && children.length === 1 && children[0] != null && children[0].tag === "#") {
			text = children[0].children;
		} else {
			childList = children;
		}
		return Vnode(state.tag, attrs.key, hasAttrs ? attrs : undefined, childList, text);
	}
	function hyperscript(selector) {
		// Because sloppy mode sucks
		var attrs = arguments[1],
		    start = 2,
		    children;
		if (selector == null || typeof selector !== "string" && typeof selector !== "function" && typeof selector.view !== "function") {
			throw Error("The selector must be either a string or a component.");
		}
		if (typeof selector === "string") {
			var cached = selectorCache[selector] || compileSelector(selector);
		}
		if (attrs == null) {
			attrs = {};
		} else if ((typeof attrs === "undefined" ? "undefined" : _typeof(attrs)) !== "object" || attrs.tag != null || Array.isArray(attrs)) {
			attrs = {};
			start = 1;
		}
		if (arguments.length === start + 1) {
			children = arguments[start];
			if (!Array.isArray(children)) children = [children];
		} else {
			children = [];
			while (start < arguments.length) {
				children.push(arguments[start++]);
			}
		}
		var normalized = Vnode.normalizeChildren(children);
		if (typeof selector === "string") {
			return execSelector(cached, attrs, normalized);
		} else {
			return Vnode(selector, attrs.key, attrs, normalized);
		}
	}
	hyperscript.trust = function (html) {
		if (html == null) html = "";
		return Vnode("<", undefined, undefined, html, undefined, undefined);
	};
	hyperscript.fragment = function (attrs1, children) {
		return Vnode("[", attrs1.key, attrs1, Vnode.normalizeChildren(children), undefined, undefined);
	};
	var m = hyperscript;
	/** @constructor */
	var PromisePolyfill = function PromisePolyfill(executor) {
		if (!(this instanceof PromisePolyfill)) throw new Error("Promise must be called with `new`");
		if (typeof executor !== "function") throw new TypeError("executor must be a function");
		var self = this,
		    resolvers = [],
		    rejectors = [],
		    resolveCurrent = handler(resolvers, true),
		    rejectCurrent = handler(rejectors, false);
		var instance = self._instance = { resolvers: resolvers, rejectors: rejectors };
		var callAsync = typeof setImmediate === "function" ? setImmediate : setTimeout;
		function handler(list, shouldAbsorb) {
			return function execute(value) {
				var then;
				try {
					if (shouldAbsorb && value != null && ((typeof value === "undefined" ? "undefined" : _typeof(value)) === "object" || typeof value === "function") && typeof (then = value.then) === "function") {
						if (value === self) throw new TypeError("Promise can't be resolved w/ itself");
						executeOnce(then.bind(value));
					} else {
						callAsync(function () {
							if (!shouldAbsorb && list.length === 0) console.error("Possible unhandled promise rejection:", value);
							for (var i = 0; i < list.length; i++) {
								list[i](value);
							}resolvers.length = 0, rejectors.length = 0;
							instance.state = shouldAbsorb;
							instance.retry = function () {
								execute(value);
							};
						});
					}
				} catch (e) {
					rejectCurrent(e);
				}
			};
		}
		function executeOnce(then) {
			var runs = 0;
			function run(fn) {
				return function (value) {
					if (runs++ > 0) return;
					fn(value);
				};
			}
			var onerror = run(rejectCurrent);
			try {
				then(run(resolveCurrent), onerror);
			} catch (e) {
				onerror(e);
			}
		}
		executeOnce(executor);
	};
	PromisePolyfill.prototype.then = function (onFulfilled, onRejection) {
		var self = this,
		    instance = self._instance;
		function handle(callback, list, next, state) {
			list.push(function (value) {
				if (typeof callback !== "function") next(value);else try {
					resolveNext(callback(value));
				} catch (e) {
					if (rejectNext) rejectNext(e);
				}
			});
			if (typeof instance.retry === "function" && state === instance.state) instance.retry();
		}
		var resolveNext, rejectNext;
		var promise = new PromisePolyfill(function (resolve, reject) {
			resolveNext = resolve, rejectNext = reject;
		});
		handle(onFulfilled, instance.resolvers, resolveNext, true), handle(onRejection, instance.rejectors, rejectNext, false);
		return promise;
	};
	PromisePolyfill.prototype.catch = function (onRejection) {
		return this.then(null, onRejection);
	};
	PromisePolyfill.resolve = function (value) {
		if (value instanceof PromisePolyfill) return value;
		return new PromisePolyfill(function (resolve) {
			resolve(value);
		});
	};
	PromisePolyfill.reject = function (value) {
		return new PromisePolyfill(function (resolve, reject) {
			reject(value);
		});
	};
	PromisePolyfill.all = function (list) {
		return new PromisePolyfill(function (resolve, reject) {
			var total = list.length,
			    count = 0,
			    values = [];
			if (list.length === 0) resolve([]);else for (var i = 0; i < list.length; i++) {
				(function (i) {
					function consume(value) {
						count++;
						values[i] = value;
						if (count === total) resolve(values);
					}
					if (list[i] != null && (_typeof(list[i]) === "object" || typeof list[i] === "function") && typeof list[i].then === "function") {
						list[i].then(consume, reject);
					} else consume(list[i]);
				})(i);
			}
		});
	};
	PromisePolyfill.race = function (list) {
		return new PromisePolyfill(function (resolve, reject) {
			for (var i = 0; i < list.length; i++) {
				list[i].then(resolve, reject);
			}
		});
	};
	if (typeof window !== "undefined") {
		if (typeof window.Promise === "undefined") window.Promise = PromisePolyfill;
		var PromisePolyfill = window.Promise;
	} else if (typeof global !== "undefined") {
		if (typeof global.Promise === "undefined") global.Promise = PromisePolyfill;
		var PromisePolyfill = global.Promise;
	} else {}
	var buildQueryString = function buildQueryString(object) {
		if (Object.prototype.toString.call(object) !== "[object Object]") return "";
		var args = [];
		for (var key0 in object) {
			destructure(key0, object[key0]);
		}
		return args.join("&");
		function destructure(key0, value) {
			if (Array.isArray(value)) {
				for (var i = 0; i < value.length; i++) {
					destructure(key0 + "[" + i + "]", value[i]);
				}
			} else if (Object.prototype.toString.call(value) === "[object Object]") {
				for (var i in value) {
					destructure(key0 + "[" + i + "]", value[i]);
				}
			} else args.push(encodeURIComponent(key0) + (value != null && value !== "" ? "=" + encodeURIComponent(value) : ""));
		}
	};
	var FILE_PROTOCOL_REGEX = new RegExp("^file://", "i");
	var _8 = function _8($window, Promise) {
		var callbackCount = 0;
		var oncompletion;
		function setCompletionCallback(callback) {
			oncompletion = callback;
		}
		function finalizer() {
			var count = 0;
			function complete() {
				if (--count === 0 && typeof oncompletion === "function") oncompletion();
			}
			return function finalize(promise0) {
				var then0 = promise0.then;
				promise0.then = function () {
					count++;
					var next = then0.apply(promise0, arguments);
					next.then(complete, function (e) {
						complete();
						if (count === 0) throw e;
					});
					return finalize(next);
				};
				return promise0;
			};
		}
		function normalize(args, extra) {
			if (typeof args === "string") {
				var url = args;
				args = extra || {};
				if (args.url == null) args.url = url;
			}
			return args;
		}
		function request(args, extra) {
			var finalize = finalizer();
			args = normalize(args, extra);
			var promise0 = new Promise(function (resolve, reject) {
				if (args.method == null) args.method = "GET";
				args.method = args.method.toUpperCase();
				var useBody = args.method === "GET" || args.method === "TRACE" ? false : typeof args.useBody === "boolean" ? args.useBody : true;
				if (typeof args.serialize !== "function") args.serialize = typeof FormData !== "undefined" && args.data instanceof FormData ? function (value) {
					return value;
				} : JSON.stringify;
				if (typeof args.deserialize !== "function") args.deserialize = deserialize;
				if (typeof args.extract !== "function") args.extract = extract;
				args.url = interpolate(args.url, args.data);
				if (useBody) args.data = args.serialize(args.data);else args.url = assemble(args.url, args.data);
				var xhr = new $window.XMLHttpRequest(),
				    aborted = false,
				    _abort = xhr.abort;
				xhr.abort = function abort() {
					aborted = true;
					_abort.call(xhr);
				};
				xhr.open(args.method, args.url, typeof args.async === "boolean" ? args.async : true, typeof args.user === "string" ? args.user : undefined, typeof args.password === "string" ? args.password : undefined);
				if (args.serialize === JSON.stringify && useBody) {
					xhr.setRequestHeader("Content-Type", "application/json; charset=utf-8");
				}
				if (args.deserialize === deserialize) {
					xhr.setRequestHeader("Accept", "application/json, text/*");
				}
				if (args.withCredentials) xhr.withCredentials = args.withCredentials;
				for (var key in args.headers) {
					if ({}.hasOwnProperty.call(args.headers, key)) {
						xhr.setRequestHeader(key, args.headers[key]);
					}
				}if (typeof args.config === "function") xhr = args.config(xhr, args) || xhr;
				xhr.onreadystatechange = function () {
					// Don't throw errors on xhr.abort().
					if (aborted) return;
					if (xhr.readyState === 4) {
						try {
							var response = args.extract !== extract ? args.extract(xhr, args) : args.deserialize(args.extract(xhr, args));
							if (xhr.status >= 200 && xhr.status < 300 || xhr.status === 304 || FILE_PROTOCOL_REGEX.test(args.url)) {
								resolve(cast(args.type, response));
							} else {
								var error = new Error(xhr.responseText);
								for (var key in response) {
									error[key] = response[key];
								}reject(error);
							}
						} catch (e) {
							reject(e);
						}
					}
				};
				if (useBody && args.data != null) xhr.send(args.data);else xhr.send();
			});
			return args.background === true ? promise0 : finalize(promise0);
		}
		function jsonp(args, extra) {
			var finalize = finalizer();
			args = normalize(args, extra);
			var promise0 = new Promise(function (resolve, reject) {
				var callbackName = args.callbackName || "_mithril_" + Math.round(Math.random() * 1e16) + "_" + callbackCount++;
				var script = $window.document.createElement("script");
				$window[callbackName] = function (data) {
					script.parentNode.removeChild(script);
					resolve(cast(args.type, data));
					delete $window[callbackName];
				};
				script.onerror = function () {
					script.parentNode.removeChild(script);
					reject(new Error("JSONP request failed"));
					delete $window[callbackName];
				};
				if (args.data == null) args.data = {};
				args.url = interpolate(args.url, args.data);
				args.data[args.callbackKey || "callback"] = callbackName;
				script.src = assemble(args.url, args.data);
				$window.document.documentElement.appendChild(script);
			});
			return args.background === true ? promise0 : finalize(promise0);
		}
		function interpolate(url, data) {
			if (data == null) return url;
			var tokens = url.match(/:[^\/]+/gi) || [];
			for (var i = 0; i < tokens.length; i++) {
				var key = tokens[i].slice(1);
				if (data[key] != null) {
					url = url.replace(tokens[i], data[key]);
				}
			}
			return url;
		}
		function assemble(url, data) {
			var querystring = buildQueryString(data);
			if (querystring !== "") {
				var prefix = url.indexOf("?") < 0 ? "?" : "&";
				url += prefix + querystring;
			}
			return url;
		}
		function deserialize(data) {
			try {
				return data !== "" ? JSON.parse(data) : null;
			} catch (e) {
				throw new Error(data);
			}
		}
		function extract(xhr) {
			return xhr.responseText;
		}
		function cast(type0, data) {
			if (typeof type0 === "function") {
				if (Array.isArray(data)) {
					for (var i = 0; i < data.length; i++) {
						data[i] = new type0(data[i]);
					}
				} else return new type0(data);
			}
			return data;
		}
		return { request: request, jsonp: jsonp, setCompletionCallback: setCompletionCallback };
	};
	var requestService = _8(window, PromisePolyfill);
	var coreRenderer = function coreRenderer($window) {
		var $doc = $window.document;
		var $emptyFragment = $doc.createDocumentFragment();
		var onevent;
		function setEventCallback(callback) {
			return onevent = callback;
		}
		//create
		function createNodes(parent, vnodes, start, end, hooks, nextSibling, ns) {
			for (var i = start; i < end; i++) {
				var vnode = vnodes[i];
				if (vnode != null) {
					createNode(parent, vnode, hooks, ns, nextSibling);
				}
			}
		}
		function createNode(parent, vnode, hooks, ns, nextSibling) {
			var tag = vnode.tag;
			if (typeof tag === "string") {
				vnode.state = {};
				if (vnode.attrs != null) initLifecycle(vnode.attrs, vnode, hooks);
				switch (tag) {
					case "#":
						return createText(parent, vnode, nextSibling);
					case "<":
						return createHTML(parent, vnode, nextSibling);
					case "[":
						return createFragment(parent, vnode, hooks, ns, nextSibling);
					default:
						return createElement(parent, vnode, hooks, ns, nextSibling);
				}
			} else return createComponent(parent, vnode, hooks, ns, nextSibling);
		}
		function createText(parent, vnode, nextSibling) {
			vnode.dom = $doc.createTextNode(vnode.children);
			insertNode(parent, vnode.dom, nextSibling);
			return vnode.dom;
		}
		function createHTML(parent, vnode, nextSibling) {
			var match1 = vnode.children.match(/^\s*?<(\w+)/im) || [];
			var parent1 = { caption: "table", thead: "table", tbody: "table", tfoot: "table", tr: "tbody", th: "tr", td: "tr", colgroup: "table", col: "colgroup" }[match1[1]] || "div";
			var temp = $doc.createElement(parent1);
			temp.innerHTML = vnode.children;
			vnode.dom = temp.firstChild;
			vnode.domSize = temp.childNodes.length;
			var fragment = $doc.createDocumentFragment();
			var child;
			while (child = temp.firstChild) {
				fragment.appendChild(child);
			}
			insertNode(parent, fragment, nextSibling);
			return fragment;
		}
		function createFragment(parent, vnode, hooks, ns, nextSibling) {
			var fragment = $doc.createDocumentFragment();
			if (vnode.children != null) {
				var children = vnode.children;
				createNodes(fragment, children, 0, children.length, hooks, null, ns);
			}
			vnode.dom = fragment.firstChild;
			vnode.domSize = fragment.childNodes.length;
			insertNode(parent, fragment, nextSibling);
			return fragment;
		}
		function createElement(parent, vnode, hooks, ns, nextSibling) {
			var tag = vnode.tag;
			switch (vnode.tag) {
				case "svg":
					ns = "http://www.w3.org/2000/svg";break;
				case "math":
					ns = "http://www.w3.org/1998/Math/MathML";break;
			}
			var attrs2 = vnode.attrs;
			var is = attrs2 && attrs2.is;
			var element = ns ? is ? $doc.createElementNS(ns, tag, { is: is }) : $doc.createElementNS(ns, tag) : is ? $doc.createElement(tag, { is: is }) : $doc.createElement(tag);
			vnode.dom = element;
			if (attrs2 != null) {
				setAttrs(vnode, attrs2, ns);
			}
			insertNode(parent, element, nextSibling);
			if (vnode.attrs != null && vnode.attrs.contenteditable != null) {
				setContentEditable(vnode);
			} else {
				if (vnode.text != null) {
					if (vnode.text !== "") element.textContent = vnode.text;else vnode.children = [Vnode("#", undefined, undefined, vnode.text, undefined, undefined)];
				}
				if (vnode.children != null) {
					var children = vnode.children;
					createNodes(element, children, 0, children.length, hooks, null, ns);
					setLateAttrs(vnode);
				}
			}
			return element;
		}
		function initComponent(vnode, hooks) {
			var sentinel;
			if (typeof vnode.tag.view === "function") {
				vnode.state = Object.create(vnode.tag);
				sentinel = vnode.state.view;
				if (sentinel.$$reentrantLock$$ != null) return $emptyFragment;
				sentinel.$$reentrantLock$$ = true;
			} else {
				vnode.state = void 0;
				sentinel = vnode.tag;
				if (sentinel.$$reentrantLock$$ != null) return $emptyFragment;
				sentinel.$$reentrantLock$$ = true;
				vnode.state = vnode.tag.prototype != null && typeof vnode.tag.prototype.view === "function" ? new vnode.tag(vnode) : vnode.tag(vnode);
			}
			vnode._state = vnode.state;
			if (vnode.attrs != null) initLifecycle(vnode.attrs, vnode, hooks);
			initLifecycle(vnode._state, vnode, hooks);
			vnode.instance = Vnode.normalize(vnode._state.view.call(vnode.state, vnode));
			if (vnode.instance === vnode) throw Error("A view cannot return the vnode it received as argument");
			sentinel.$$reentrantLock$$ = null;
		}
		function createComponent(parent, vnode, hooks, ns, nextSibling) {
			initComponent(vnode, hooks);
			if (vnode.instance != null) {
				var element = createNode(parent, vnode.instance, hooks, ns, nextSibling);
				vnode.dom = vnode.instance.dom;
				vnode.domSize = vnode.dom != null ? vnode.instance.domSize : 0;
				insertNode(parent, element, nextSibling);
				return element;
			} else {
				vnode.domSize = 0;
				return $emptyFragment;
			}
		}
		//update
		function updateNodes(parent, old, vnodes, recycling, hooks, nextSibling, ns) {
			if (old === vnodes || old == null && vnodes == null) return;else if (old == null) createNodes(parent, vnodes, 0, vnodes.length, hooks, nextSibling, undefined);else if (vnodes == null) removeNodes(old, 0, old.length, vnodes);else {
				if (old.length === vnodes.length) {
					var isUnkeyed = false;
					for (var i = 0; i < vnodes.length; i++) {
						if (vnodes[i] != null && old[i] != null) {
							isUnkeyed = vnodes[i].key == null && old[i].key == null;
							break;
						}
					}
					if (isUnkeyed) {
						for (var i = 0; i < old.length; i++) {
							if (old[i] === vnodes[i]) continue;else if (old[i] == null && vnodes[i] != null) createNode(parent, vnodes[i], hooks, ns, getNextSibling(old, i + 1, nextSibling));else if (vnodes[i] == null) removeNodes(old, i, i + 1, vnodes);else updateNode(parent, old[i], vnodes[i], hooks, getNextSibling(old, i + 1, nextSibling), recycling, ns);
						}
						return;
					}
				}
				recycling = recycling || isRecyclable(old, vnodes);
				if (recycling) {
					var pool = old.pool;
					old = old.concat(old.pool);
				}
				var oldStart = 0,
				    start = 0,
				    oldEnd = old.length - 1,
				    end = vnodes.length - 1,
				    map;
				while (oldEnd >= oldStart && end >= start) {
					var o = old[oldStart],
					    v = vnodes[start];
					if (o === v && !recycling) oldStart++, start++;else if (o == null) oldStart++;else if (v == null) start++;else if (o.key === v.key) {
						var shouldRecycle = pool != null && oldStart >= old.length - pool.length || pool == null && recycling;
						oldStart++, start++;
						updateNode(parent, o, v, hooks, getNextSibling(old, oldStart, nextSibling), shouldRecycle, ns);
						if (recycling && o.tag === v.tag) insertNode(parent, toFragment(o), nextSibling);
					} else {
						var o = old[oldEnd];
						if (o === v && !recycling) oldEnd--, start++;else if (o == null) oldEnd--;else if (v == null) start++;else if (o.key === v.key) {
							var shouldRecycle = pool != null && oldEnd >= old.length - pool.length || pool == null && recycling;
							updateNode(parent, o, v, hooks, getNextSibling(old, oldEnd + 1, nextSibling), shouldRecycle, ns);
							if (recycling || start < end) insertNode(parent, toFragment(o), getNextSibling(old, oldStart, nextSibling));
							oldEnd--, start++;
						} else break;
					}
				}
				while (oldEnd >= oldStart && end >= start) {
					var o = old[oldEnd],
					    v = vnodes[end];
					if (o === v && !recycling) oldEnd--, end--;else if (o == null) oldEnd--;else if (v == null) end--;else if (o.key === v.key) {
						var shouldRecycle = pool != null && oldEnd >= old.length - pool.length || pool == null && recycling;
						updateNode(parent, o, v, hooks, getNextSibling(old, oldEnd + 1, nextSibling), shouldRecycle, ns);
						if (recycling && o.tag === v.tag) insertNode(parent, toFragment(o), nextSibling);
						if (o.dom != null) nextSibling = o.dom;
						oldEnd--, end--;
					} else {
						if (!map) map = getKeyMap(old, oldEnd);
						if (v != null) {
							var oldIndex = map[v.key];
							if (oldIndex != null) {
								var movable = old[oldIndex];
								var shouldRecycle = pool != null && oldIndex >= old.length - pool.length || pool == null && recycling;
								updateNode(parent, movable, v, hooks, getNextSibling(old, oldEnd + 1, nextSibling), recycling, ns);
								insertNode(parent, toFragment(movable), nextSibling);
								old[oldIndex].skip = true;
								if (movable.dom != null) nextSibling = movable.dom;
							} else {
								var dom = createNode(parent, v, hooks, undefined, nextSibling);
								nextSibling = dom;
							}
						}
						end--;
					}
					if (end < start) break;
				}
				createNodes(parent, vnodes, start, end + 1, hooks, nextSibling, ns);
				removeNodes(old, oldStart, oldEnd + 1, vnodes);
			}
		}
		function updateNode(parent, old, vnode, hooks, nextSibling, recycling, ns) {
			var oldTag = old.tag,
			    tag = vnode.tag;
			if (oldTag === tag) {
				vnode.state = old.state;
				vnode._state = old._state;
				vnode.events = old.events;
				if (!recycling && shouldNotUpdate(vnode, old)) return;
				if (typeof oldTag === "string") {
					if (vnode.attrs != null) {
						if (recycling) {
							vnode.state = {};
							initLifecycle(vnode.attrs, vnode, hooks);
						} else updateLifecycle(vnode.attrs, vnode, hooks);
					}
					switch (oldTag) {
						case "#":
							updateText(old, vnode);break;
						case "<":
							updateHTML(parent, old, vnode, nextSibling);break;
						case "[":
							updateFragment(parent, old, vnode, recycling, hooks, nextSibling, ns);break;
						default:
							updateElement(old, vnode, recycling, hooks, ns);
					}
				} else updateComponent(parent, old, vnode, hooks, nextSibling, recycling, ns);
			} else {
				removeNode(old, null);
				createNode(parent, vnode, hooks, ns, nextSibling);
			}
		}
		function updateText(old, vnode) {
			if (old.children.toString() !== vnode.children.toString()) {
				old.dom.nodeValue = vnode.children;
			}
			vnode.dom = old.dom;
		}
		function updateHTML(parent, old, vnode, nextSibling) {
			if (old.children !== vnode.children) {
				toFragment(old);
				createHTML(parent, vnode, nextSibling);
			} else vnode.dom = old.dom, vnode.domSize = old.domSize;
		}
		function updateFragment(parent, old, vnode, recycling, hooks, nextSibling, ns) {
			updateNodes(parent, old.children, vnode.children, recycling, hooks, nextSibling, ns);
			var domSize = 0,
			    children = vnode.children;
			vnode.dom = null;
			if (children != null) {
				for (var i = 0; i < children.length; i++) {
					var child = children[i];
					if (child != null && child.dom != null) {
						if (vnode.dom == null) vnode.dom = child.dom;
						domSize += child.domSize || 1;
					}
				}
				if (domSize !== 1) vnode.domSize = domSize;
			}
		}
		function updateElement(old, vnode, recycling, hooks, ns) {
			var element = vnode.dom = old.dom;
			switch (vnode.tag) {
				case "svg":
					ns = "http://www.w3.org/2000/svg";break;
				case "math":
					ns = "http://www.w3.org/1998/Math/MathML";break;
			}
			if (vnode.tag === "textarea") {
				if (vnode.attrs == null) vnode.attrs = {};
				if (vnode.text != null) {
					vnode.attrs.value = vnode.text; //FIXME handle0 multiple children
					vnode.text = undefined;
				}
			}
			updateAttrs(vnode, old.attrs, vnode.attrs, ns);
			if (vnode.attrs != null && vnode.attrs.contenteditable != null) {
				setContentEditable(vnode);
			} else if (old.text != null && vnode.text != null && vnode.text !== "") {
				if (old.text.toString() !== vnode.text.toString()) old.dom.firstChild.nodeValue = vnode.text;
			} else {
				if (old.text != null) old.children = [Vnode("#", undefined, undefined, old.text, undefined, old.dom.firstChild)];
				if (vnode.text != null) vnode.children = [Vnode("#", undefined, undefined, vnode.text, undefined, undefined)];
				updateNodes(element, old.children, vnode.children, recycling, hooks, null, ns);
			}
		}
		function updateComponent(parent, old, vnode, hooks, nextSibling, recycling, ns) {
			if (recycling) {
				initComponent(vnode, hooks);
			} else {
				vnode.instance = Vnode.normalize(vnode._state.view.call(vnode.state, vnode));
				if (vnode.instance === vnode) throw Error("A view cannot return the vnode it received as argument");
				if (vnode.attrs != null) updateLifecycle(vnode.attrs, vnode, hooks);
				updateLifecycle(vnode._state, vnode, hooks);
			}
			if (vnode.instance != null) {
				if (old.instance == null) createNode(parent, vnode.instance, hooks, ns, nextSibling);else updateNode(parent, old.instance, vnode.instance, hooks, nextSibling, recycling, ns);
				vnode.dom = vnode.instance.dom;
				vnode.domSize = vnode.instance.domSize;
			} else if (old.instance != null) {
				removeNode(old.instance, null);
				vnode.dom = undefined;
				vnode.domSize = 0;
			} else {
				vnode.dom = old.dom;
				vnode.domSize = old.domSize;
			}
		}
		function isRecyclable(old, vnodes) {
			if (old.pool != null && Math.abs(old.pool.length - vnodes.length) <= Math.abs(old.length - vnodes.length)) {
				var oldChildrenLength = old[0] && old[0].children && old[0].children.length || 0;
				var poolChildrenLength = old.pool[0] && old.pool[0].children && old.pool[0].children.length || 0;
				var vnodesChildrenLength = vnodes[0] && vnodes[0].children && vnodes[0].children.length || 0;
				if (Math.abs(poolChildrenLength - vnodesChildrenLength) <= Math.abs(oldChildrenLength - vnodesChildrenLength)) {
					return true;
				}
			}
			return false;
		}
		function getKeyMap(vnodes, end) {
			var map = {},
			    i = 0;
			for (var i = 0; i < end; i++) {
				var vnode = vnodes[i];
				if (vnode != null) {
					var key2 = vnode.key;
					if (key2 != null) map[key2] = i;
				}
			}
			return map;
		}
		function toFragment(vnode) {
			var count0 = vnode.domSize;
			if (count0 != null || vnode.dom == null) {
				var fragment = $doc.createDocumentFragment();
				if (count0 > 0) {
					var dom = vnode.dom;
					while (--count0) {
						fragment.appendChild(dom.nextSibling);
					}fragment.insertBefore(dom, fragment.firstChild);
				}
				return fragment;
			} else return vnode.dom;
		}
		function getNextSibling(vnodes, i, nextSibling) {
			for (; i < vnodes.length; i++) {
				if (vnodes[i] != null && vnodes[i].dom != null) return vnodes[i].dom;
			}
			return nextSibling;
		}
		function insertNode(parent, dom, nextSibling) {
			if (nextSibling && nextSibling.parentNode) parent.insertBefore(dom, nextSibling);else parent.appendChild(dom);
		}
		function setContentEditable(vnode) {
			var children = vnode.children;
			if (children != null && children.length === 1 && children[0].tag === "<") {
				var content = children[0].children;
				if (vnode.dom.innerHTML !== content) vnode.dom.innerHTML = content;
			} else if (vnode.text != null || children != null && children.length !== 0) throw new Error("Child node of a contenteditable must be trusted");
		}
		//remove
		function removeNodes(vnodes, start, end, context) {
			for (var i = start; i < end; i++) {
				var vnode = vnodes[i];
				if (vnode != null) {
					if (vnode.skip) vnode.skip = false;else removeNode(vnode, context);
				}
			}
		}
		function removeNode(vnode, context) {
			var expected = 1,
			    called = 0;
			if (vnode.attrs && typeof vnode.attrs.onbeforeremove === "function") {
				var result = vnode.attrs.onbeforeremove.call(vnode.state, vnode);
				if (result != null && typeof result.then === "function") {
					expected++;
					result.then(continuation, continuation);
				}
			}
			if (typeof vnode.tag !== "string" && typeof vnode._state.onbeforeremove === "function") {
				var result = vnode._state.onbeforeremove.call(vnode.state, vnode);
				if (result != null && typeof result.then === "function") {
					expected++;
					result.then(continuation, continuation);
				}
			}
			continuation();
			function continuation() {
				if (++called === expected) {
					onremove(vnode);
					if (vnode.dom) {
						var count0 = vnode.domSize || 1;
						if (count0 > 1) {
							var dom = vnode.dom;
							while (--count0) {
								removeNodeFromDOM(dom.nextSibling);
							}
						}
						removeNodeFromDOM(vnode.dom);
						if (context != null && vnode.domSize == null && !hasIntegrationMethods(vnode.attrs) && typeof vnode.tag === "string") {
							//TODO test custom elements
							if (!context.pool) context.pool = [vnode];else context.pool.push(vnode);
						}
					}
				}
			}
		}
		function removeNodeFromDOM(node) {
			var parent = node.parentNode;
			if (parent != null) parent.removeChild(node);
		}
		function onremove(vnode) {
			if (vnode.attrs && typeof vnode.attrs.onremove === "function") vnode.attrs.onremove.call(vnode.state, vnode);
			if (typeof vnode.tag !== "string" && typeof vnode._state.onremove === "function") vnode._state.onremove.call(vnode.state, vnode);
			if (vnode.instance != null) onremove(vnode.instance);else {
				var children = vnode.children;
				if (Array.isArray(children)) {
					for (var i = 0; i < children.length; i++) {
						var child = children[i];
						if (child != null) onremove(child);
					}
				}
			}
		}
		//attrs2
		function setAttrs(vnode, attrs2, ns) {
			for (var key2 in attrs2) {
				setAttr(vnode, key2, null, attrs2[key2], ns);
			}
		}
		function setAttr(vnode, key2, old, value, ns) {
			var element = vnode.dom;
			if (key2 === "key" || key2 === "is" || old === value && !isFormAttribute(vnode, key2) && (typeof value === "undefined" ? "undefined" : _typeof(value)) !== "object" || typeof value === "undefined" || isLifecycleMethod(key2)) return;
			var nsLastIndex = key2.indexOf(":");
			if (nsLastIndex > -1 && key2.substr(0, nsLastIndex) === "xlink") {
				element.setAttributeNS("http://www.w3.org/1999/xlink", key2.slice(nsLastIndex + 1), value);
			} else if (key2[0] === "o" && key2[1] === "n" && typeof value === "function") updateEvent(vnode, key2, value);else if (key2 === "style") updateStyle(element, old, value);else if (key2 in element && !isAttribute(key2) && ns === undefined && !isCustomElement(vnode)) {
				//setting input[value] to same value by typing on focused element moves cursor to end in Chrome
				if (vnode.tag === "input" && key2 === "value" && vnode.dom.value == value && vnode.dom === $doc.activeElement) return;
				//setting select[value] to same value while having select open blinks select dropdown in Chrome
				if (vnode.tag === "select" && key2 === "value" && vnode.dom.value == value && vnode.dom === $doc.activeElement) return;
				//setting option[value] to same value while having select open blinks select dropdown in Chrome
				if (vnode.tag === "option" && key2 === "value" && vnode.dom.value == value) return;
				// If you assign an input type1 that is not supported by IE 11 with an assignment expression, an error0 will occur.
				if (vnode.tag === "input" && key2 === "type") {
					element.setAttribute(key2, value);
					return;
				}
				element[key2] = value;
			} else {
				if (typeof value === "boolean") {
					if (value) element.setAttribute(key2, "");else element.removeAttribute(key2);
				} else element.setAttribute(key2 === "className" ? "class" : key2, value);
			}
		}
		function setLateAttrs(vnode) {
			var attrs2 = vnode.attrs;
			if (vnode.tag === "select" && attrs2 != null) {
				if ("value" in attrs2) setAttr(vnode, "value", null, attrs2.value, undefined);
				if ("selectedIndex" in attrs2) setAttr(vnode, "selectedIndex", null, attrs2.selectedIndex, undefined);
			}
		}
		function updateAttrs(vnode, old, attrs2, ns) {
			if (attrs2 != null) {
				for (var key2 in attrs2) {
					setAttr(vnode, key2, old && old[key2], attrs2[key2], ns);
				}
			}
			if (old != null) {
				for (var key2 in old) {
					if (attrs2 == null || !(key2 in attrs2)) {
						if (key2 === "className") key2 = "class";
						if (key2[0] === "o" && key2[1] === "n" && !isLifecycleMethod(key2)) updateEvent(vnode, key2, undefined);else if (key2 !== "key") vnode.dom.removeAttribute(key2);
					}
				}
			}
		}
		function isFormAttribute(vnode, attr) {
			return attr === "value" || attr === "checked" || attr === "selectedIndex" || attr === "selected" && vnode.dom === $doc.activeElement;
		}
		function isLifecycleMethod(attr) {
			return attr === "oninit" || attr === "oncreate" || attr === "onupdate" || attr === "onremove" || attr === "onbeforeremove" || attr === "onbeforeupdate";
		}
		function isAttribute(attr) {
			return attr === "href" || attr === "list" || attr === "form" || attr === "width" || attr === "height"; // || attr === "type"
		}
		function isCustomElement(vnode) {
			return vnode.attrs.is || vnode.tag.indexOf("-") > -1;
		}
		function hasIntegrationMethods(source) {
			return source != null && (source.oncreate || source.onupdate || source.onbeforeremove || source.onremove);
		}
		//style
		function updateStyle(element, old, style) {
			if (old === style) element.style.cssText = "", old = null;
			if (style == null) element.style.cssText = "";else if (typeof style === "string") element.style.cssText = style;else {
				if (typeof old === "string") element.style.cssText = "";
				for (var key2 in style) {
					element.style[key2] = style[key2];
				}
				if (old != null && typeof old !== "string") {
					for (var key2 in old) {
						if (!(key2 in style)) element.style[key2] = "";
					}
				}
			}
		}
		//event
		function updateEvent(vnode, key2, value) {
			var element = vnode.dom;
			var callback = typeof onevent !== "function" ? value : function (e) {
				var result = value.call(element, e);
				onevent.call(element, e);
				return result;
			};
			if (key2 in element) element[key2] = typeof value === "function" ? callback : null;else {
				var eventName = key2.slice(2);
				if (vnode.events === undefined) vnode.events = {};
				if (vnode.events[key2] === callback) return;
				if (vnode.events[key2] != null) element.removeEventListener(eventName, vnode.events[key2], false);
				if (typeof value === "function") {
					vnode.events[key2] = callback;
					element.addEventListener(eventName, vnode.events[key2], false);
				}
			}
		}
		//lifecycle
		function initLifecycle(source, vnode, hooks) {
			if (typeof source.oninit === "function") source.oninit.call(vnode.state, vnode);
			if (typeof source.oncreate === "function") hooks.push(source.oncreate.bind(vnode.state, vnode));
		}
		function updateLifecycle(source, vnode, hooks) {
			if (typeof source.onupdate === "function") hooks.push(source.onupdate.bind(vnode.state, vnode));
		}
		function shouldNotUpdate(vnode, old) {
			var forceVnodeUpdate, forceComponentUpdate;
			if (vnode.attrs != null && typeof vnode.attrs.onbeforeupdate === "function") forceVnodeUpdate = vnode.attrs.onbeforeupdate.call(vnode.state, vnode, old);
			if (typeof vnode.tag !== "string" && typeof vnode._state.onbeforeupdate === "function") forceComponentUpdate = vnode._state.onbeforeupdate.call(vnode.state, vnode, old);
			if (!(forceVnodeUpdate === undefined && forceComponentUpdate === undefined) && !forceVnodeUpdate && !forceComponentUpdate) {
				vnode.dom = old.dom;
				vnode.domSize = old.domSize;
				vnode.instance = old.instance;
				return true;
			}
			return false;
		}
		function render(dom, vnodes) {
			if (!dom) throw new Error("Ensure the DOM element being passed to m.route/m.mount/m.render is not undefined.");
			var hooks = [];
			var active = $doc.activeElement;
			// First time0 rendering into a node clears it out
			if (dom.vnodes == null) dom.textContent = "";
			if (!Array.isArray(vnodes)) vnodes = [vnodes];
			updateNodes(dom, dom.vnodes, Vnode.normalizeChildren(vnodes), false, hooks, null, undefined);
			dom.vnodes = vnodes;
			for (var i = 0; i < hooks.length; i++) {
				hooks[i]();
			}if ($doc.activeElement !== active) active.focus();
		}
		return { render: render, setEventCallback: setEventCallback };
	};
	function throttle(callback) {
		//60fps translates to 16.6ms, round it down since setTimeout requires int
		var time = 16;
		var last = 0,
		    pending = null;
		var timeout = typeof requestAnimationFrame === "function" ? requestAnimationFrame : setTimeout;
		return function () {
			var now = Date.now();
			if (last === 0 || now - last >= time) {
				last = now;
				callback();
			} else if (pending === null) {
				pending = timeout(function () {
					pending = null;
					callback();
					last = Date.now();
				}, time - (now - last));
			}
		};
	}
	var _11 = function _11($window) {
		var renderService = coreRenderer($window);
		renderService.setEventCallback(function (e) {
			if (e.redraw !== false) redraw();
		});
		var callbacks = [];
		function subscribe(key1, callback) {
			unsubscribe(key1);
			callbacks.push(key1, throttle(callback));
		}
		function unsubscribe(key1) {
			var index = callbacks.indexOf(key1);
			if (index > -1) callbacks.splice(index, 2);
		}
		function redraw() {
			for (var i = 1; i < callbacks.length; i += 2) {
				callbacks[i]();
			}
		}
		return { subscribe: subscribe, unsubscribe: unsubscribe, redraw: redraw, render: renderService.render };
	};
	var redrawService = _11(window);
	requestService.setCompletionCallback(redrawService.redraw);
	var _16 = function _16(redrawService0) {
		return function (root, component) {
			if (component === null) {
				redrawService0.render(root, []);
				redrawService0.unsubscribe(root);
				return;
			}

			if (component.view == null && typeof component !== "function") throw new Error("m.mount(element, component) expects a component, not a vnode");

			var run0 = function run0() {
				redrawService0.render(root, Vnode(component));
			};
			redrawService0.subscribe(root, run0);
			redrawService0.redraw();
		};
	};
	m.mount = _16(redrawService);
	var Promise = PromisePolyfill;
	var parseQueryString = function parseQueryString(string) {
		if (string === "" || string == null) return {};
		if (string.charAt(0) === "?") string = string.slice(1);
		var entries = string.split("&"),
		    data0 = {},
		    counters = {};
		for (var i = 0; i < entries.length; i++) {
			var entry = entries[i].split("=");
			var key5 = decodeURIComponent(entry[0]);
			var value = entry.length === 2 ? decodeURIComponent(entry[1]) : "";
			if (value === "true") value = true;else if (value === "false") value = false;
			var levels = key5.split(/\]\[?|\[/);
			var cursor = data0;
			if (key5.indexOf("[") > -1) levels.pop();
			for (var j = 0; j < levels.length; j++) {
				var level = levels[j],
				    nextLevel = levels[j + 1];
				var isNumber = nextLevel == "" || !isNaN(parseInt(nextLevel, 10));
				var isValue = j === levels.length - 1;
				if (level === "") {
					var key5 = levels.slice(0, j).join();
					if (counters[key5] == null) counters[key5] = 0;
					level = counters[key5]++;
				}
				if (cursor[level] == null) {
					cursor[level] = isValue ? value : isNumber ? [] : {};
				}
				cursor = cursor[level];
			}
		}
		return data0;
	};
	var coreRouter = function coreRouter($window) {
		var supportsPushState = typeof $window.history.pushState === "function";
		var callAsync0 = typeof setImmediate === "function" ? setImmediate : setTimeout;
		function normalize1(fragment0) {
			var data = $window.location[fragment0].replace(/(?:%[a-f89][a-f0-9])+/gim, decodeURIComponent);
			if (fragment0 === "pathname" && data[0] !== "/") data = "/" + data;
			return data;
		}
		var asyncId;
		function debounceAsync(callback0) {
			return function () {
				if (asyncId != null) return;
				asyncId = callAsync0(function () {
					asyncId = null;
					callback0();
				});
			};
		}
		function parsePath(path, queryData, hashData) {
			var queryIndex = path.indexOf("?");
			var hashIndex = path.indexOf("#");
			var pathEnd = queryIndex > -1 ? queryIndex : hashIndex > -1 ? hashIndex : path.length;
			if (queryIndex > -1) {
				var queryEnd = hashIndex > -1 ? hashIndex : path.length;
				var queryParams = parseQueryString(path.slice(queryIndex + 1, queryEnd));
				for (var key4 in queryParams) {
					queryData[key4] = queryParams[key4];
				}
			}
			if (hashIndex > -1) {
				var hashParams = parseQueryString(path.slice(hashIndex + 1));
				for (var key4 in hashParams) {
					hashData[key4] = hashParams[key4];
				}
			}
			return path.slice(0, pathEnd);
		}
		var router = { prefix: "#!" };
		router.getPath = function () {
			var type2 = router.prefix.charAt(0);
			switch (type2) {
				case "#":
					return normalize1("hash").slice(router.prefix.length);
				case "?":
					return normalize1("search").slice(router.prefix.length) + normalize1("hash");
				default:
					return normalize1("pathname").slice(router.prefix.length) + normalize1("search") + normalize1("hash");
			}
		};
		router.setPath = function (path, data, options) {
			var queryData = {},
			    hashData = {};
			path = parsePath(path, queryData, hashData);
			if (data != null) {
				for (var key4 in data) {
					queryData[key4] = data[key4];
				}path = path.replace(/:([^\/]+)/g, function (match2, token) {
					delete queryData[token];
					return data[token];
				});
			}
			var query = buildQueryString(queryData);
			if (query) path += "?" + query;
			var hash = buildQueryString(hashData);
			if (hash) path += "#" + hash;
			if (supportsPushState) {
				var state = options ? options.state : null;
				var title = options ? options.title : null;
				$window.onpopstate();
				if (options && options.replace) $window.history.replaceState(state, title, router.prefix + path);else $window.history.pushState(state, title, router.prefix + path);
			} else $window.location.href = router.prefix + path;
		};
		router.defineRoutes = function (routes, resolve, reject) {
			function resolveRoute() {
				var path = router.getPath();
				var params = {};
				var pathname = parsePath(path, params, params);
				var state = $window.history.state;
				if (state != null) {
					for (var k in state) {
						params[k] = state[k];
					}
				}
				for (var route0 in routes) {
					var matcher = new RegExp("^" + route0.replace(/:[^\/]+?\.{3}/g, "(.*?)").replace(/:[^\/]+/g, "([^\\/]+)") + "\/?$");
					if (matcher.test(pathname)) {
						pathname.replace(matcher, function () {
							var keys = route0.match(/:[^\/]+/g) || [];
							var values = [].slice.call(arguments, 1, -2);
							for (var i = 0; i < keys.length; i++) {
								params[keys[i].replace(/:|\./g, "")] = decodeURIComponent(values[i]);
							}
							resolve(routes[route0], params, path, route0);
						});
						return;
					}
				}
				reject(path, params);
			}
			if (supportsPushState) $window.onpopstate = debounceAsync(resolveRoute);else if (router.prefix.charAt(0) === "#") $window.onhashchange = resolveRoute;
			resolveRoute();
		};
		return router;
	};
	var _20 = function _20($window, redrawService0) {
		var routeService = coreRouter($window);
		var identity = function identity(v) {
			return v;
		};
		var render1, component, attrs3, currentPath, _lastUpdate;
		var route = function route(root, defaultRoute, routes) {
			if (root == null) throw new Error("Ensure the DOM element that was passed to `m.route` is not undefined");
			var run1 = function run1() {
				if (render1 != null) redrawService0.render(root, render1(Vnode(component, attrs3.key, attrs3)));
			};
			var bail = function bail(path) {
				if (path !== defaultRoute) routeService.setPath(defaultRoute, null, { replace: true });else throw new Error("Could not resolve default route " + defaultRoute);
			};
			routeService.defineRoutes(routes, function (payload, params, path) {
				var update = _lastUpdate = function lastUpdate(routeResolver, comp) {
					if (update !== _lastUpdate) return;
					component = comp != null && (typeof comp.view === "function" || typeof comp === "function") ? comp : "div";
					attrs3 = params, currentPath = path, _lastUpdate = null;
					render1 = (routeResolver.render || identity).bind(routeResolver);
					run1();
				};
				if (payload.view || typeof payload === "function") update({}, payload);else {
					if (payload.onmatch) {
						Promise.resolve(payload.onmatch(params, path)).then(function (resolved) {
							update(payload, resolved);
						}, bail);
					} else update(payload, "div");
				}
			}, bail);
			redrawService0.subscribe(root, run1);
		};
		route.set = function (path, data, options) {
			if (_lastUpdate != null) options = { replace: true };
			_lastUpdate = null;
			routeService.setPath(path, data, options);
		};
		route.get = function () {
			return currentPath;
		};
		route.prefix = function (prefix0) {
			routeService.prefix = prefix0;
		};
		route.link = function (vnode1) {
			vnode1.dom.setAttribute("href", routeService.prefix + vnode1.attrs.href);
			vnode1.dom.onclick = function (e) {
				if (e.ctrlKey || e.metaKey || e.shiftKey || e.which === 2) return;
				e.preventDefault();
				e.redraw = false;
				var href = this.getAttribute("href");
				if (href.indexOf(routeService.prefix) === 0) href = href.slice(routeService.prefix.length);
				route.set(href, undefined, undefined);
			};
		};
		route.param = function (key3) {
			if (typeof attrs3 !== "undefined" && typeof key3 !== "undefined") return attrs3[key3];
			return attrs3;
		};
		return route;
	};
	m.route = _20(window, redrawService);
	m.withAttr = function (attrName, callback1, context) {
		return function (e) {
			callback1.call(context || this, attrName in e.currentTarget ? e.currentTarget[attrName] : e.currentTarget.getAttribute(attrName));
		};
	};
	var _28 = coreRenderer(window);
	m.render = _28.render;
	m.redraw = redrawService.redraw;
	m.request = requestService.request;
	m.jsonp = requestService.jsonp;
	m.parseQueryString = parseQueryString;
	m.buildQueryString = buildQueryString;
	m.version = "1.1.1";
	m.vnode = Vnode;
	if (true) module["exports"] = m;else window.m = m;
})();
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(18).setImmediate, __webpack_require__(5)))

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = __webpack_require__(13);

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.post = exports.fetch = undefined;

var _mithril = __webpack_require__(0);

var _mithril2 = _interopRequireDefault(_mithril);

var _settings = __webpack_require__(4);

var _settings2 = _interopRequireDefault(_settings);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var post = function post(name, query, variables) {
  return _mithril2.default.request({
    url: _settings2.default.url,
    method: "POST",
    headers: {
      'Authorization': "Bearer " + localStorage.getItem("token")
    },
    data: {
      query: query,
      variables: JSON.stringify(variables)
    }
  });
};

var fetch = function fetch(name, query, variables) {
  return _mithril2.default.request({
    url: _settings2.default.url,
    method: "POST",
    headers: {
      'Authorization': "Bearer " + localStorage.getItem("token")
    },
    data: {
      query: query,
      variables: JSON.stringify(variables)
    }
  });
};

exports.fetch = fetch;
exports.post = post;

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
var plugins = function plugins() {
    // $(document).ready(function() {
    // $("body").on("click", "[data-ma-action]", function(e) {
    //         function launchIntoFullscreen(element) { element.requestFullscreen ? element.requestFullscreen() : element.mozRequestFullScreen ? element.mozRequestFullScreen() : element.webkitRequestFullscreen ? element.webkitRequestFullscreen() : element.msRequestFullscreen && element.msRequestFullscreen() }
    //         e.preventDefault();
    //         var $this = $(this),
    //             action = $(this).data("ma-action");
    //         switch (action) {
    //             case "sidebar-open":
    //                 var target = $this.data("ma-target"),
    //                     backdrop = '<div data-ma-action="sidebar-close" class="ma-backdrop" />';
    //                 $("body").addClass("sidebar-toggled"), $("#header, #header-alt, #main").append(backdrop), $this.addClass("toggled"), $(target).addClass("toggled");
    //                 break;
    //             case "sidebar-close":
    //                 $("body").removeClass("sidebar-toggled"), $(".ma-backdrop").remove(), $(".sidebar, .ma-trigger").removeClass("toggled");
    //                 break;
    //             case "profile-menu-toggle":
    //                 $this.parent().toggleClass("toggled"), $this.next().slideToggle(200);
    //                 break;
    //             case "search-open":
    //                 $("#header").addClass("search-toggled"), $("#top-search-wrap input").focus();
    //                 break;
    //             case "search-close":
    //                 $("#header").removeClass("search-toggled");
    //                 break;
    //             case "clear-notification":
    //                 var x = $this.closest(".list-group"),
    //                     y = x.find(".list-group-item"),
    //                     z = y.size();
    //                 $this.parent().fadeOut(), x.find(".list-group").prepend('<i class="grid-loading hide-it"></i>'), x.find(".grid-loading").fadeIn(1500);
    //                 var w = 0;
    //                 y.each(function() {
    //                     var z = $(this);
    //                     setTimeout(function() { z.addClass("animated fadeOutRightBig").delay(1e3).queue(function() { z.remove() }) }, w += 150)
    //                 }), setTimeout(function() { $(".him-notification").addClass("empty") }, 150 * z + 200);
    //                 break;
    //             case "fullscreen":
    //                 launchIntoFullscreen(document.documentElement);
    //                 break;
    //             case "clear-localstorage":
    //                 swal({ title: "Are you sure?", text: "All your saved localStorage values will be removed", type: "warning", showCancelButton: !0, confirmButtonText: "Yes, delete it!" }).then(function() { localStorage.clear(), swal("Done!", "localStorage is cleared", "success") });
    //                 break;
    //             case "print":
    //                 window.print();
    //                 break;
    //             case "login-switch":
    //                 var loginblock = $this.data("ma-block"),
    //                     loginParent = $this.closest(".lc-block");
    //                 loginParent.removeClass("toggled"), setTimeout(function() { $(loginblock).addClass("toggled") });
    //                 break;
    //             case "profile-edit":
    //                 $this.closest(".pmb-block").toggleClass("toggled");
    //                 break;
    //             case "profile-edit-cancel":
    //                 $(this).closest(".pmb-block").removeClass("toggled");
    //                 break;
    //             case "action-header-open":
    //                 ahParent = $this.closest(".action-header").find(".ah-search"), ahParent.fadeIn(300), ahParent.find(".ahs-input").focus();
    //                 break;
    //             case "action-header-close":
    //                 ahParent.fadeOut(300), setTimeout(function() { ahParent.find(".ahs-input").val("") }, 350);
    //                 break;
    //             case "wall-comment-open":
    //                 $this.closest(".wic-form").hasClass("toggled") || $this.closest(".wic-form").addClass("toggled");
    //                 break;
    //             case "wall-comment-close":
    //                 $this.closest(".wic-form").find("textarea").val(""), $this.closest(".wic-form").removeClass("toggled");
    //                 break;
    //             case "todo-form-open":
    //                 $this.closest(".t-add").addClass("toggled");
    //                 break;
    //             case "todo-form-close":
    //                 $this.closest(".t-add").removeClass("toggled"), $this.closest(".t-add").find("textarea").val("");
    //                 break;
    //             case "change-skin":
    //                 var skin = $this.data("ma-skin");
    //                 $("[data-ma-theme]").attr("data-ma-theme", skin)
    //         }
    //     })
    // })
    // $(document).ready(function() {
    function sparklineBar(id, values, height, barWidth, barColor, barSpacing) {
        $("." + id).sparkline(values, { type: "bar", height: height, barWidth: barWidth, barColor: barColor, barSpacing: barSpacing });
    }

    function sparklineLine(id, values, width, height, lineColor, fillColor, lineWidth, maxSpotColor, minSpotColor, spotColor, spotRadius, hSpotColor, hLineColor) {
        $("." + id).sparkline(values, { type: "line", width: width, height: height, lineColor: lineColor, fillColor: fillColor, lineWidth: lineWidth, maxSpotColor: maxSpotColor, minSpotColor: minSpotColor, spotColor: spotColor, spotRadius: spotRadius, highlightSpotColor: hSpotColor, highlightLineColor: hLineColor });
    }

    function sparklinePie(id, values, width, height, sliceColors) {
        $("." + id).sparkline(values, { type: "pie", width: width, height: height, sliceColors: sliceColors, offset: 0, borderWidth: 0 });
    }

    function easyPieChart(id, trackColor, scaleColor, barColor, lineWidth, lineCap, size) {
        $("." + id).easyPieChart({ trackColor: trackColor, scaleColor: scaleColor, barColor: barColor, lineWidth: lineWidth, lineCap: lineCap, size: size });
    }
    $(".stats-bar")[0] && sparklineBar("stats-bar", [6, 4, 8, 6, 5, 6, 7, 8, 3, 5, 9, 5, 8, 4], "35px", 3, "#fff", 2), $(".stats-bar-2")[0] && sparklineBar("stats-bar-2", [4, 7, 6, 2, 5, 3, 8, 6, 6, 4, 8, 6, 5, 8], "35px", 3, "#fff", 2), $(".stats-line")[0] && sparklineLine("stats-line", [9, 4, 6, 5, 6, 4, 5, 7, 9, 3, 6, 5], 68, 35, "#fff", "rgba(0,0,0,0)", 1.25, "rgba(255,255,255,0.4)", "rgba(255,255,255,0.4)", "rgba(255,255,255,0.4)", 3, "#fff", "rgba(255,255,255,0.4)"), $(".stats-line-2")[0] && sparklineLine("stats-line-2", [5, 6, 3, 9, 7, 5, 4, 6, 5, 6, 4, 9], 68, 35, "#fff", "rgba(0,0,0,0)", 1.25, "rgba(255,255,255,0.4)", "rgba(255,255,255,0.4)", "rgba(255,255,255,0.4)", 3, "#fff", "rgba(255,255,255,0.4)"), $(".stats-pie")[0] && sparklinePie("stats-pie", [20, 35, 30, 5], 45, 45, ["#fff", "rgba(255,255,255,0.7)", "rgba(255,255,255,0.4)", "rgba(255,255,255,0.2)"]), $(".dash-widget-visits")[0] && sparklineLine("dash-widget-visits", [9, 4, 6, 5, 6, 4, 5, 7, 9, 3, 6, 5], "100%", "70px", "rgba(255,255,255,0.7)", "rgba(0,0,0,0)", 2, "#fff", "#fff", "#fff", 5, "rgba(255,255,255,0.4)", "rgba(255,255,255,0.1)"), $(".main-pie")[0] && easyPieChart("main-pie", "rgba(255,255,255,0.2)", "rgba(255,255,255,0)", "rgba(255,255,255,0.7)", 2, "butt", 148), $(".sub-pie-1")[0] && easyPieChart("sub-pie-1", "rgba(255,255,255,0.2)", "rgba(255,255,255,0)", "rgba(255,255,255,0.7)", 2, "butt", 90), $(".sub-pie-2")[0] && easyPieChart("sub-pie-2", "rgba(255,255,255,0.2)", "rgba(255,255,255,0)", "rgba(255,255,255,0.7)", 2, "butt", 90);
    // })
    // $(window).load(function() {
    function notify(message, type) {
        $.growl({ message: message }, { type: type, allow_dismiss: !1, label: "Cancel", className: "btn-xs btn-inverse", placement: { from: "bottom", align: "left" }, delay: 2500, animate: { enter: "animated fadeInUp", exit: "animated fadeOutDown" }, offset: { x: 30, y: 30 } });
    }
    // setTimeout(function() {
    //         $(".login-content")[0] || notify("Welcome back Mallinda Hollaway", "inverse")
    //     }, 1e3)
    // })
    // $(document).ready(function() {
    var data1 = [[1, 60], [2, 30], [3, 50], [4, 100], [5, 10], [6, 90], [7, 85]],
        data2 = [[1, 20], [2, 90], [3, 60], [4, 40], [5, 100], [6, 25], [7, 65]],
        data3 = [[1, 100], [2, 20], [3, 60], [4, 90], [5, 80], [6, 10], [7, 5]],
        barData = [{ label: "Tokyo", data: data1, color: "#8BC34A" }, { label: "Seoul", data: data2, color: "#00BCD4" }, { label: "Beijing", data: data3, color: "#FF9800" }];
    $("#bar-chart")[0] && $.plot($("#bar-chart"), barData, { series: { bars: { show: !0, barWidth: .05, order: 1, fill: 1 } }, grid: { borderWidth: 1, borderColor: "#eee", show: !0, hoverable: !0, clickable: !0 }, yaxis: { tickColor: "#eee", tickDecimals: 0, font: { lineHeight: 13, style: "normal", color: "#9f9f9f" }, shadowSize: 0 }, xaxis: { tickColor: "#fff", tickDecimals: 0, font: { lineHeight: 13, style: "normal", color: "#9f9f9f" }, shadowSize: 0 }, legend: { container: ".flc-bar", backgroundOpacity: .5, noColumns: 0, backgroundColor: "white", lineWidth: 0 } }), $(".flot-chart")[0] && ($(".flot-chart").bind("plothover", function (event, pos, item) {
        if (item) {
            var x = item.datapoint[0].toFixed(2),
                y = item.datapoint[1].toFixed(2);
            $(".flot-tooltip").html(item.series.label + " of " + x + " = " + y).css({ top: item.pageY + 5, left: item.pageX + 5 }).show();
        } else $(".flot-tooltip").hide();
    }), $("<div class='flot-tooltip' class='chart-tooltip'></div>").appendTo("body"));
    // })
    // $(document).ready(function() {
    for (var d1 = [], i = 0; 10 >= i; i += 1) {
        d1.push([i, parseInt(30 * Math.random())]);
    }for (var d2 = [], i = 0; 20 >= i; i += 1) {
        d2.push([i, parseInt(30 * Math.random())]);
    }for (var d3 = [], i = 0; 10 >= i; i += 1) {
        d3.push([i, parseInt(30 * Math.random())]);
    }var options = { series: { shadowSize: 0, curvedLines: { apply: !0, active: !0, monotonicFit: !0 }, lines: { show: !1, lineWidth: 0, fill: 1 } }, grid: { borderWidth: 0, labelMargin: 10, hoverable: !0, clickable: !0, mouseActiveRadius: 6 }, xaxis: { tickDecimals: 0, ticks: !1 }, yaxis: { tickDecimals: 0, ticks: !1 }, legend: { show: !1 } };
    $("#curved-line-chart")[0] && $.plot($("#curved-line-chart"), [{ data: d1, lines: { show: !0, fill: .98 }, label: "Product 1", stack: !0, color: "#e3e3e3" }, { data: d3, lines: { show: !0, fill: .98 }, label: "Product 2", stack: !0, color: "#f1dd2c" }], options), $(".flot-chart")[0] && ($(".flot-chart").bind("plothover", function (event, pos, item) {
        if (item) {
            var x = item.datapoint[0].toFixed(2),
                y = item.datapoint[1].toFixed(2);
            $(".flot-tooltip").html(item.series.label + " of " + x + " = " + y).css({ top: item.pageY + 5, left: item.pageX + 5 }).show();
        } else $(".flot-tooltip").hide();
    }), $("<div class='flot-tooltip' class='chart-tooltip'></div>").appendTo("body"));
    // })
    // $(document).ready(function() {
    function gd(year, month, day) {
        return new Date(year, month - 1, day).getTime();
    }
    var data1 = [[gd(2016, 1, 2), 1800], [gd(2016, 1, 3), 1790], [gd(2016, 1, 4), 1810], [gd(2016, 1, 7), 1750], [gd(2016, 1, 8), 1805], [gd(2016, 1, 9), 1800], [gd(2016, 1, 10), 1794], [gd(2016, 1, 11), 1794], [gd(2016, 1, 14), 1807], [gd(2016, 1, 15), 1788], [gd(2016, 1, 16), 1799], [gd(2016, 1, 17), 1804], [gd(2016, 1, 18), 1811], [gd(2016, 1, 21), 1801], [gd(2016, 1, 22), 1805], [gd(2016, 1, 23), 1770], [gd(2016, 1, 24), 1799], [gd(2016, 1, 25), 1804], [gd(2016, 1, 28), 1810], [gd(2016, 1, 29), 1788], [gd(2016, 1, 30), 1804], [gd(2016, 1, 31), 1775]],
        data2 = [[gd(2016, 1, 2), 1674], [gd(2016, 1, 3), 1680], [gd(2016, 1, 4), 1643], [gd(2016, 1, 7), 1652], [gd(2016, 1, 8), 1640], [gd(2016, 1, 9), 1652], [gd(2016, 1, 10), 1652], [gd(2016, 1, 11), 1664], [gd(2016, 1, 14), 1660], [gd(2016, 1, 15), 1664], [gd(2016, 1, 16), 1673], [gd(2016, 1, 17), 1671], [gd(2016, 1, 18), 1682], [gd(2016, 1, 21), 1680], [gd(2016, 1, 22), 1685], [gd(2016, 1, 23), 1684], [gd(2016, 1, 24), 1670], [gd(2016, 1, 25), 1664], [gd(2016, 1, 28), 1652], [gd(2016, 1, 29), 1655], [gd(2016, 1, 30), 1659], [gd(2016, 1, 31), 1668]],
        dataset = [{ label: "Students", data: data1, color: "#26A69A", points: { fillColor: "#26A69A", show: !0, radius: 0 }, lines: { show: !0, lineWidth: 2 } }, { label: "Teachers", data: data2, xaxis: 2, color: "#FFC107", points: { fillColor: "#FFC107", show: !0, radius: 0 }, lines: { show: !0, lineWidth: 2 } }],
        dayOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thr", "Fri", "Sat"],
        options = {
        series: { shadowSize: 0, curvedLines: { apply: !0, active: !0, monotonicFit: !0 } },
        grid: { borderWidth: 1, borderColor: "#f3f3f3", show: !0, clickable: !0, hoverable: !0, mouseActiveRadius: 20, labelMargin: 10 },
        xaxes: [{
            color: "#f3f3f3",
            mode: "time",
            tickFormatter: function tickFormatter(val, axis) {
                return dayOfWeek[new Date(val).getDay()];
            },
            position: "top",
            font: { lineHeight: 13, style: "normal", color: "#9f9f9f" }
        }, { color: "#f3f3f3", mode: "time", timeformat: "%m/%d", font: { lineHeight: 13, style: "normal", color: "#9f9f9f" } }],
        yaxis: { ticks: 2, color: "#f3f3f3", tickDecimals: 0, font: { lineHeight: 13, style: "normal", color: "#9f9f9f" } },
        legend: { container: ".flc-visits", backgroundOpacity: .5, noColumns: 0, font: { lineHeight: 13, style: "normal", color: "#9f9f9f" } }
    };
    $("#attendance")[0] && $.plot($("#attendance"), dataset, options);
    // })
    // $(document).ready(function() {
    var data1 = [[2010, 60], [2011, 50], [2012, 80], [2013, 30], [2014, 70], [2015, 40], [2016, 55]],
        dataset = [{ label: "Index Value", data: data1, color: "#00BCD4", points: { fillColor: "#00BCD4", show: !0, radius: 0 }, lines: { show: !0, lineWidth: 1, fill: 1, fillColor: { colors: ["rgba(255,255,255,0.0)", "#00BCD4"] } } }],
        options = { series: { shadowSize: 0, curvedLines: { apply: !0, active: !0, monotonicFit: !0 } }, grid: { borderWidth: 1, borderColor: "#eee", show: !0, hoverable: !0, clickable: !0 }, yaxis: { tickColor: "#eee", tickDecimals: 0, font: { lineHeight: 13, style: "normal", color: "#9f9f9f" }, shadowSize: 0 }, xaxis: { tickColor: "#fff", tickDecimals: 0, font: { lineHeight: 13, style: "normal", color: "#9f9f9f" }, shadowSize: 0 }, legend: { container: ".flc-sei", backgroundOpacity: .5, noColumns: 0, backgroundColor: "white", lineWidth: 0 } };
    $("#effective-index")[0] && $.plot($("#effective-index"), dataset, options);
    // })
    // $(document).ready(function() {
    var feeData = [{ data: 5, color: "#03A9F4", label: "Collected" }, { data: 2, color: "#F44336", label: "Not Collected" }, { data: 1, color: "#8BC34A", label: "Pending" }];
    $("#fee-collected")[0] && $.plot("#fee-collected", feeData, { series: { pie: { show: !0, stroke: { width: 2 } } }, legend: { container: ".flc-pie", backgroundOpacity: .5, noColumns: 0, backgroundColor: "white", lineWidth: 0 }, grid: { hoverable: !0, clickable: !0 }, tooltip: !1, tooltipOpts: { content: "%p.0%, %s", defaultTheme: !1, cssClass: "flot-tooltip" } });
    // })
    // $(document).ready(function() {
    var data = [[1, 60], [2, 30], [3, 50], [4, 100], [5, 10], [6, 90], [7, 85], [8, 10], [9, 25], [10, 65], [11, 69], [12, 104], [13, 94], [14, 32], [15, 10], [16, 45], [17, 34], [18, 22], [19, 100], [20, 43], [21, 98], [22, 60], [23, 51], [24, 30]],
        dataset = [{ data: data, label: "Visits", bars: { show: !0, barWidth: .4, order: 1, lineWidth: 0, fillColor: "#ff766c" } }],
        options = {
        grid: { borderWidth: 1, borderColor: "#f3f3f3", show: !0, hoverable: !0, clickable: !0, labelMargin: 10 },
        yaxis: { tickColor: "#f3f3f3", tickDecimals: 0, font: { lineHeight: 13, style: "normal", color: "#9f9f9f" }, shadowSize: 0 },
        xaxis: {
            tickFormatter: function tickFormatter(value, axis) {
                return value + "h";
            },
            tickColor: "#fff",
            tickDecimals: 0,
            font: { lineHeight: 13, style: "normal", color: "#9f9f9f" },
            shadowSize: 0
        },
        legend: { show: !1 }
    };
    $("#visit-server-time")[0] && $.plot($("#visit-server-time"), dataset, options);
    // })
    // $(document).ready(function() {
    function gd(year, month, day) {
        return new Date(year, month - 1, day).getTime();
    }
    var data1 = [[gd(2013, 1, 2), 1690.25], [gd(2013, 1, 3), 1696.3], [gd(2013, 1, 4), 1659.65], [gd(2013, 1, 7), 1668.15], [gd(2013, 1, 8), 1656.1], [gd(2013, 1, 9), 1668.65], [gd(2013, 1, 10), 1668.15], [gd(2013, 1, 11), 1680.2], [gd(2013, 1, 14), 1676.7], [gd(2013, 1, 15), 1680.7], [gd(2013, 1, 16), 1689.75], [gd(2013, 1, 17), 1687.25], [gd(2013, 1, 18), 1698.3], [gd(2013, 1, 21), 1696.8], [gd(2013, 1, 22), 1701.3], [gd(2013, 1, 23), 1700.8], [gd(2013, 1, 24), 1686.75], [gd(2013, 1, 25), 1680], [gd(2013, 1, 28), 1668.65], [gd(2013, 1, 29), 1671.2], [gd(2013, 1, 30), 1675.7], [gd(2013, 1, 31), 1684.25]],
        data2 = [[gd(2013, 1, 2), 1674.15], [gd(2013, 1, 3), 1680.15], [gd(2013, 1, 4), 1643.8], [gd(2013, 1, 7), 1652.25], [gd(2013, 1, 8), 1640.3], [gd(2013, 1, 9), 1652.75], [gd(2013, 1, 10), 1652.25], [gd(2013, 1, 11), 1664.2], [gd(2013, 1, 14), 1660.7], [gd(2013, 1, 15), 1664.7], [gd(2013, 1, 16), 1673.65], [gd(2013, 1, 17), 1671.15], [gd(2013, 1, 18), 1682.1], [gd(2013, 1, 21), 1680.65], [gd(2013, 1, 22), 1685.1], [gd(2013, 1, 23), 1684.6], [gd(2013, 1, 24), 1670.65], [gd(2013, 1, 25), 1664], [gd(2013, 1, 28), 1652.75], [gd(2013, 1, 29), 1655.25], [gd(2013, 1, 30), 1659.7], [gd(2013, 1, 31), 1668.2]],
        dataset = [{ label: "Visits", data: data1, color: "#ff766c", points: { fillColor: "#ff766c", show: !0, radius: 2 }, lines: { show: !0, lineWidth: 1 } }, { label: "Unique Visitors", data: data2, xaxis: 2, color: "#03A9F4", points: { fillColor: "#03A9F4", show: !0, radius: 2 }, lines: { show: !0, lineWidth: 1 } }],
        dayOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thr", "Fri", "Sat"],
        options = {
        series: { shadowSize: 0 },
        grid: { borderWidth: 1, borderColor: "#f3f3f3", show: !0, clickable: !0, hoverable: !0, mouseActiveRadius: 20, labelMargin: 10 },
        xaxes: [{
            color: "#f3f3f3",
            mode: "time",
            tickFormatter: function tickFormatter(val, axis) {
                return dayOfWeek[new Date(val).getDay()];
            },
            position: "top",
            font: { lineHeight: 13, style: "normal", color: "#9f9f9f" }
        }, { color: "#f3f3f3", mode: "time", timeformat: "%m/%d", font: { lineHeight: 13, style: "normal", color: "#9f9f9f" } }],
        yaxis: { ticks: 2, color: "#f3f3f3", tickDecimals: 0, font: { lineHeight: 13, style: "normal", color: "#9f9f9f" } },
        legend: { container: ".flc-visits", backgroundOpacity: .5, noColumns: 0, font: { lineHeight: 13, style: "normal", color: "#9f9f9f" } }
    };
    $("#visit-over-time")[0] && $.plot($("#visit-over-time"), dataset, options);
    // })
    // $(document).ready(function() {
    function getRandomData() {
        for (data.length > 0 && (data = data.slice(1)); data.length < totalPoints;) {
            var prev = data.length > 0 ? data[data.length - 1] : 50,
                y = prev + 10 * Math.random() - 5;
            0 > y ? y = 0 : y > 90 && (y = 90), data.push(y);
        }
        for (var res = [], i = 0; i < data.length; ++i) {
            res.push([i, data[i]]);
        }return res;
    }

    function update() {
        plot.setData([getRandomData()]), plot.draw(), setTimeout(update, updateInterval);
    }
    var data = [],
        totalPoints = 300,
        updateInterval = 30;
    if ($("#dynamic-chart")[0]) {
        var plot = $.plot("#dynamic-chart", [getRandomData()], { series: { label: "Server Process Data", lines: { show: !0, lineWidth: .2, fill: .6 }, color: "#00BCD4", shadowSize: 0 }, yaxis: { min: 0, max: 100, tickColor: "#eee", font: { lineHeight: 13, style: "normal", color: "#9f9f9f" }, shadowSize: 0 }, xaxis: { tickColor: "#eee", show: !0, font: { lineHeight: 13, style: "normal", color: "#9f9f9f" }, shadowSize: 0, min: 0, max: 250 }, grid: { borderWidth: 1, borderColor: "#eee", labelMargin: 10, hoverable: !0, clickable: !0, mouseActiveRadius: 6 }, legend: { show: !1 } });
        update();
    }
    // })
    // $(document).ready(function() {
    function getRandomData() {
        for (data.length > 0 && (data = data.slice(1)); data.length < totalPoints;) {
            var prev = data.length > 0 ? data[data.length - 1] : 50,
                y = prev + 10 * Math.random() - 5;
            0 > y ? y = 0 : y > 90 && (y = 90), data.push(y);
        }
        for (var res = [], i = 0; i < data.length; ++i) {
            res.push([i, data[i]]);
        }return res;
    }
    for (var data = [], totalPoints = 100, d1 = [], i = 0; 10 >= i; i += 1) {
        d1.push([i, parseInt(30 * Math.random())]);
    }for (var d2 = [], i = 0; 20 >= i; i += 1) {
        d2.push([i, parseInt(30 * Math.random())]);
    }for (var d3 = [], i = 0; 10 >= i; i += 1) {
        d3.push([i, parseInt(30 * Math.random())]);
    }var options = { series: { shadowSize: 0, lines: { show: !1, lineWidth: 0 } }, grid: { borderWidth: 0, labelMargin: 10, hoverable: !0, clickable: !0, mouseActiveRadius: 6 }, xaxis: { tickDecimals: 0, ticks: !1 }, yaxis: { tickDecimals: 0, ticks: !1 }, legend: { show: !1 } };
    $("#line-chart")[0] && $.plot($("#line-chart"), [{ data: d1, lines: { show: !0, fill: .98 }, label: "Product 1", stack: !0, color: "#e3e3e3" }, { data: d3, lines: { show: !0, fill: .98 }, label: "Product 2", stack: !0, color: "#FFC107" }], options), $("#recent-items-chart")[0] && $.plot($("#recent-items-chart"), [{ data: getRandomData(), lines: { show: !0, fill: .8 }, label: "Items", stack: !0, color: "#00BCD4" }], options), $(".flot-chart")[0] && ($(".flot-chart").bind("plothover", function (event, pos, item) {
        if (item) {
            var x = item.datapoint[0].toFixed(2),
                y = item.datapoint[1].toFixed(2);
            $(".flot-tooltip").html(item.series.label + " of " + x + " = " + y).css({ top: item.pageY + 5, left: item.pageX + 5 }).show();
        } else $(".flot-tooltip").hide();
    }), $("<div class='flot-tooltip' class='chart-tooltip'></div>").appendTo("body"));
    // })
    // $(document).ready(function() {
    var pieData = [{
        data: 1,
        color: "#F44336",
        label: "Toyota"
    }, {
        data: 2,
        color: "#03A9F4",
        label: "Nissan"
    }, {
        data: 3,
        color: "#8BC34A",
        label: "Hyundai"
    }, {
        data: 4,
        color: "#FFEB3B",
        label: "Scion"
    }, {
        data: 4,
        color: "#009688",
        label: "Daihatsu"
    }];

    $("#pie-chart")[0] && $.plot("#pie-chart", pieData, {
        series: { pie: { show: !0, stroke: { width: 2 } } },
        legend: {
            container: ".flc-pie",
            backgroundOpacity: .5,
            noColumns: 0,
            backgroundColor: "white",
            lineWidth: 0
        },
        grid: { hoverable: !0, clickable: !0 },
        tooltip: !0,
        tooltipOpts: {
            content: "%p.0%, %s",
            shifts: { x: 20, y: 0 },
            defaultTheme: !1,
            cssClass: "flot-tooltip"
        }
    });
    $("#donut-chart")[0] && $.plot("#donut-chart", pieData, {
        series: {
            pie: {
                innerRadius: .5,
                show: !0,
                stroke: { width: 2 }
            }
        },
        legend: {
            container: ".flc-donut",
            backgroundOpacity: .5,
            noColumns: 0,
            backgroundColor: "white",
            lineWidth: 0
        },
        grid: {
            hoverable: !0,
            clickable: !0
        },
        tooltip: !0,
        tooltipOpts: {
            content: "%p.0%, %s",
            shifts: { x: 20, y: 0 },
            defaultTheme: !1,
            cssClass: "flot-tooltip"
        }
    });
    // }), /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) && $("html").addClass("ismobile")
    // $(window).load(function() {
    // $("html").hasClass("ismobile") || $(".page-loader")[0] && setTimeout(function() {
    //         $(".page-loader").fadeOut()
    //     }, 500)
    // })
    // $(document).ready(function() {
    function scrollBar(selector, theme, mousewheelaxis) {
        $(selector).mCustomScrollbar({
            theme: theme,
            scrollInertia: 100,
            axis: "yx",
            mouseWheel: { enable: !0, axis: mousewheelaxis, preventDefault: !0 }
        });
    }
    if ($("html").hasClass("ismobile") || $(".c-overflow")[0], $(".dropdown")[0] && ($("body").on("click", ".dropdown.open .dropdown-menu", function (e) {
        e.stopPropagation();
    }), $(".dropdown").on("shown.bs.dropdown", function (e) {
        $(this).attr("data-animation") && ($animArray = [], $animation = $(this).data("animation"), $animArray = $animation.split(","), $animationIn = "animated " + $animArray[0], $animationOut = "animated " + $animArray[1], $animationDuration = "", $animArray[2] ? $animationDuration = $animArray[2] : $animationDuration = 500, $(this).find(".dropdown-menu").removeClass($animationOut), $(this).find(".dropdown-menu").addClass($animationIn));
    }), $(".dropdown").on("hide.bs.dropdown", function (e) {
        $(this).attr("data-animation") && (e.preventDefault(), $this = $(this), $dropdownMenu = $this.find(".dropdown-menu"), $dropdownMenu.addClass($animationOut), setTimeout(function () {
            $this.removeClass("open");
        }, $animationDuration));
    })), $("#calendar-widget")[0]) {
        !function () {
            $("#cw-body").fullCalendar({ contentHeight: "auto", theme: !1, buttonIcons: { prev: " zmdi zmdi-chevron-left", next: " zmdi zmdi-chevron-right" }, header: { right: "next", center: "title, ", left: "prev" }, defaultDate: "2016-08-12", editable: !0, events: [{ title: "Dolor Pellentesque", start: "2016-08-01", className: "bgm-cyan" }, { title: "Purus Nibh", start: "2016-08-07", className: "bgm-amber" }, { title: "Amet Condimentum", start: "2016-08-09", className: "bgm-green" }, { title: "Tellus", start: "2016-08-12", className: "bgm-blue" }, { title: "Vestibulum", start: "2016-08-18", className: "bgm-cyan" }, { title: "Ipsum", start: "2016-08-24", className: "bgm-teal" }, { title: "Fringilla Sit", start: "2016-08-27", className: "bgm-blue" }, { title: "Amet Pharetra", url: "http://google.com/", start: "2016-08-30", className: "bgm-amber" }] });
        }();
        var mYear = moment().format("YYYY"),
            mDay = moment().format("dddd, MMM D");
        $("#calendar-widget .cwh-year").html(mYear), $("#calendar-widget .cwh-day").html(mDay);
    }
    if ($("#weather-widget")[0] && $.simpleWeather({ location: "Austin, TX", woeid: "", unit: "f", success: function success(weather) {
            html = '<div class="weather-status">' + weather.temp + "&deg;" + weather.units.temp + "</div>", html += '<ul class="weather-info"><li>' + weather.city + ", " + weather.region + "</li>", html += '<li class="currently">' + weather.currently + "</li></ul>", html += '<div class="weather-icon wi-' + weather.code + '"></div>', html += '<div class="dw-footer"><div class="weather-list tomorrow">', html += '<span class="weather-list-icon wi-' + weather.forecast[2].code + '"></span><span>' + weather.forecast[1].high + "/" + weather.forecast[1].low + "</span><span>" + weather.forecast[1].text + "</span>", html += "</div>", html += '<div class="weather-list after-tomorrow">', html += '<span class="weather-list-icon wi-' + weather.forecast[2].code + '"></span><span>' + weather.forecast[2].high + "/" + weather.forecast[2].low + "</span><span>" + weather.forecast[2].text + "</span>", html += "</div></div>", $("#weather-widget").html(html);
        }, error: function error(_error) {
            $("#weather-widget").html("<p>" + _error + "</p>");
        } }), $(".auto-size")[0] && autosize($(".auto-size")), $(".fg-line")[0] && ($("body").on("focus", ".fg-line .form-control", function () {
        $(this).closest(".fg-line").addClass("fg-toggled");
    }), $("body").on("blur", ".form-control", function () {
        var p = $(this).closest(".form-group, .input-group"),
            i = p.find(".form-control").val();
        p.hasClass("fg-float") ? 0 == i.length && $(this).closest(".fg-line").removeClass("fg-toggled") : $(this).closest(".fg-line").removeClass("fg-toggled");
    })), $(".fg-float")[0] && $(".fg-float .form-control").each(function () {
        var i = $(this).val();
        0 == !i.length && $(this).closest(".fg-line").addClass("fg-toggled");
    }), $("audio, video")[0] && $("video,audio").mediaelementplayer(), $(".chosen")[0] && $(".chosen").chosen({ width: "100%", allow_single_deselect: !0 }), $("#input-slider")[0]) {
        var slider = document.getElementById("input-slider");
        noUiSlider.create(slider, { start: [20], connect: "lower", range: { min: 0, max: 100 } });
    }
    if ($("#input-slider-range")[0]) {
        var sliderRange = document.getElementById("input-slider-range");
        noUiSlider.create(sliderRange, { start: [40, 70], connect: !0, range: { min: 0, max: 100 } });
    }
    if ($("#input-slider-value")[0]) {
        var sliderRangeValue = document.getElementById("input-slider-value");
        noUiSlider.create(sliderRangeValue, { start: [10, 50], connect: !0, range: { min: 0, max: 100 } }), sliderRangeValue.noUiSlider.on("update", function (values, handle) {
            document.getElementById("input-slider-value-output").innerHTML = values[handle];
        });
    }
    if ($(".color-picker")[0] && $(".color-picker").each(function () {
        var colorOutput = $(this).closest(".cp-container").find(".cp-value");
        $(this).farbtastic(colorOutput);
    }), $(".html-editor")[0] && $(".html-editor").summernote({ height: 150 }), $(".html-editor-click")[0] && ($("body").on("click", ".hec-button", function () {
        $(".html-editor-click").summernote({ focus: !0 }), $(".hec-save").show();
    }), $("body").on("click", ".hec-save", function () {
        $(".html-editor-click").code(), $(".html-editor-click").destroy(), $(".hec-save").hide(), notify("Content Saved Successfully!", "success");
    })), $(".html-editor-airmod")[0] && $(".html-editor-airmod").summernote({ airMode: !0 }), $(".date-time-picker")[0] && $(".date-time-picker").datetimepicker(), $(".time-picker")[0] && $(".time-picker").datetimepicker({ format: "LT" }), $(".date-picker")[0] && $(".date-picker").datetimepicker({ format: "DD/MM/YYYY" }), $(".date-picker").on("dp.hide", function () {
        $(this).closest(".dtp-container").removeClass("fg-toggled"), $(this).blur();
    }), $(".form-wizard-basic")[0] && $(".form-wizard-basic").bootstrapWizard({ tabClass: "fw-nav", nextSelector: ".next", previousSelector: ".previous" }), function () {
        Waves.attach(".btn:not(.btn-icon):not(.btn-float)"), Waves.attach(".btn-icon, .btn-float", ["waves-circle", "waves-float"]), Waves.init();
    }(), $(".lightbox")[0] && $(".lightbox").lightGallery({ enableTouch: !0 }), $("body").on("click", ".a-prevent", function (e) {
        e.preventDefault();
    }), $(".collapse")[0] && ($(".collapse").on("show.bs.collapse", function (e) {
        $(this).closest(".panel").find(".panel-heading").addClass("active");
    }), $(".collapse").on("hide.bs.collapse", function (e) {
        $(this).closest(".panel").find(".panel-heading").removeClass("active");
    }), $(".collapse.in").each(function () {
        $(this).closest(".panel").find(".panel-heading").addClass("active");
    })), $('[data-toggle="tooltip"]')[0] && $('[data-toggle="tooltip"]').tooltip(), $('[data-toggle="popover"]')[0] && $('[data-toggle="popover"]').popover(), $("html").hasClass("ie9") && $("input, textarea").placeholder({ customClass: "ie9-placeholder" }), $(".typeahead")[0]) {
        var statesArray = ["Alabama", "Alaska", "Arizona", "Arkansas", "California", "Colorado", "Connecticut", "Delaware", "Florida", "Georgia", "Hawaii", "Idaho", "Illinois", "Indiana", "Iowa", "Kansas", "Kentucky", "Louisiana", "Maine", "Maryland", "Massachusetts", "Michigan", "Minnesota", "Mississippi", "Missouri", "Montana", "Nebraska", "Nevada", "New Hampshire", "New Jersey", "New Mexico", "New York", "North Carolina", "North Dakota", "Ohio", "Oklahoma", "Oregon", "Pennsylvania", "Rhode Island", "South Carolina", "South Dakota", "Tennessee", "Texas", "Utah", "Vermont", "Virginia", "Washington", "West Virginia", "Wisconsin", "Wyoming"],
            states = new Bloodhound({ datumTokenizer: Bloodhound.tokenizers.whitespace, queryTokenizer: Bloodhound.tokenizers.whitespace, local: statesArray });
        $(".typeahead").typeahead({ hint: !0, highlight: !0, minLength: 1 }, { name: "states", source: states });
    }
    $(".dropzone")[0] && (Dropzone.autoDiscover = !1, $("#dropzone-upload").dropzone({ url: "/file/post", addRemoveLinks: !0 }));
    // })
    // $(document).ready(function() {
    $("#map-world")[0] && $("#map-world").vectorMap({
        map: "world_en",
        backgroundColor: null,
        color: "#eee",
        borderColor: "#eee",
        hoverOpacity: 1,
        selectedColor: "#00BCD4",
        enableZoom: !0,
        showTooltip: !0,
        normalizeFunction: "polynomial",
        selectedRegions: ["US", "EN", "NZ", "CN", "JP", "SL", "BR", "AU"],
        onRegionClick: function onRegionClick(event) {
            event.preventDefault();
        }
    });
    // });
};

exports.plugins = plugins;

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _stream = __webpack_require__(1);

var _stream2 = _interopRequireDefault(_stream);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

console.log();

var settings = {
  color: (0, _stream2.default)("cyan"),
  defaultColor: (0, _stream2.default)("cyan"),
  url: window.location.origin + "/graphiql"
};

exports.default = settings;

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var g;

// This works in non-strict mode
g = function () {
	return this;
}();

try {
	// This works if eval is allowed (see CSP)
	g = g || Function("return this")() || (1, eval)("this");
} catch (e) {
	// This works if the window reference is available
	if ((typeof window === "undefined" ? "undefined" : _typeof(window)) === "object") g = window;
}

// g can still be undefined, but nothing to do about it...
// We return undefined, instead of nothing here, so it's
// easier to handle this case. if(!global) { ...}

module.exports = g;

/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _mithril = __webpack_require__(0);

var _mithril2 = _interopRequireDefault(_mithril);

var _plugins = __webpack_require__(3);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var content = {
  oncreate: _plugins.plugins,
  oninit: function oninit() {
    // if (!localStorage.getItem("token")) {
    //   m.route.set("/")
    // }
  },
  view: function view(vnode) {
    console.log(vnode.attrs);
    return (0, _mithril2.default)(".container", (0, _mithril2.default)(vnode.attrs.component));
  }
};

exports.default = content;

/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _mithril = __webpack_require__(0);

var _mithril2 = _interopRequireDefault(_mithril);

var _stream = __webpack_require__(1);

var _stream2 = _interopRequireDefault(_stream);

var _requestToolBox = __webpack_require__(2);

var _settings = __webpack_require__(4);

var _settings2 = _interopRequireDefault(_settings);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// import navbar from "./navbar"
var Data = {
  navData: {
    fetch: function fetch(argument) {
      (0, _requestToolBox.fetch)("org_info", "query test{\n                  Organisations{\n                    name\n                  }\n                }").then(function (res) {
        return Data.navData = res.data.Organisations.pop();
      });
    }
  }
};

var header = {
  oninit: Data.navData.fetch,
  view: function view() {
    return (0, _mithril2.default)("header.clearfix[data-ma-theme='blue'][id='header']", [(0, _mithril2.default)("ul.h-inner", [(0, _mithril2.default)("li.hi-trigger.ma-trigger[data-ma-action='sidebar-open'][data-ma-target='#sidebar']", {
      onclick: function onclick(e) {
        var $this = $(this);
        var target = $this.data("ma-target"),
            backdrop = '<div id="sidebar_close" data-ma-action="sidebar-close" class="ma-backdrop" />';
        $("body").addClass("sidebar-toggled"), $("#header, #header-alt, #main").append(backdrop), $this.addClass("toggled"), $(target).addClass("toggled");

        $('#sidebar_close').on('click', function () {
          $("body").removeClass("sidebar-toggled"), $(".ma-backdrop").remove(), $(".sidebar, .ma-trigger").removeClass("toggled");
        });
      }
    }, [(0, _mithril2.default)(".line-wrap", [(0, _mithril2.default)(".line.top"), (0, _mithril2.default)(".line.center"), (0, _mithril2.default)(".line.bottom")])]), (0, _mithril2.default)("li.hi-logo.hidden-xs", (0, _mithril2.default)("a", Data.navData.name)), (0, _mithril2.default)("li.pull-right", (0, _mithril2.default)("ul.hi-menu", [(0, _mithril2.default)("li[data-ma-action='search-open']", (0, _mithril2.default)("a", {
      onclick: function onclick(e) {
        console.log("opening search");
        $("#header").addClass("search-toggled"), $("#top-search-wrap input").focus();
      }
    }, (0, _mithril2.default)("i.him-icon.zmdi.zmdi-search"))), (0, _mithril2.default)("li.dropdown", [(0, _mithril2.default)("a[data-toggle='dropdown'][href='']", [(0, _mithril2.default)("i.him-icon.zmdi.zmdi-notifications"), (0, _mithril2.default)("i.him-counts", "0")]), (0, _mithril2.default)(".dropdown-menu.dropdown-menu-lg.pull-right", (0, _mithril2.default)(".list-group", [(0, _mithril2.default)(".lg-header"), (0, _mithril2.default)(".lg-body", [(0, _mithril2.default)("a.list-group-item.media[href='']", [(0, _mithril2.default)(".pull-left", (0, _mithril2.default)("img.lgi-img[alt=''][src='img/demo/profile-pics/1.jpg']")), (0, _mithril2.default)(".media-body", [(0, _mithril2.default)(".lgi-heading", "Notification bot"), (0, _mithril2.default)("small.lgi-text", "No notifications yet today")])])]), (0, _mithril2.default)("a.view-more[href='']", "View All")]))])]
    // m("li.dropdown", [
    //     m("a[data-toggle='dropdown'][href='']", [
    //         m("i.him-icon.zmdi.zmdi-notifications"),
    //         m("i.him-counts",
    //             "9"
    //         )
    //     ]),
    //     m(".dropdown-menu.dropdown-menu-lg.pull-right",
    //         m(".list-group.him-notification", [
    //             m(".lg-header",
    //                 m("ul.actions",
    //                     m("li.dropdown",
    //                         m("a[data-ma-action='clear-notification'][href='']",
    //                             m("i.zmdi.zmdi-check-all")
    //                         )
    //                     )
    //                 )
    //             ),
    //             m(".lg-body", [
    //                 m("a.list-group-item.media[href='']", [
    //                     m(".pull-left",
    //                         m("img.lgi-img[alt=''][src='img/demo/profile-pics/1.jpg']")
    //                     ),
    //                     m(".media-body", [
    //                         m(".lgi-heading",
    //                             "David Belle"
    //                         ),
    //                         m("small.lgi-text",
    //                             "Cum sociis natoque penatibus et magnis dis parturient montes"
    //                         )
    //                     ])
    //                 ]),
    //                 m("a.list-group-item.media[href='']", [
    //                     m(".pull-left",
    //                         m("img.lgi-img[alt=''][src='img/demo/profile-pics/2.jpg']")
    //                     ),
    //                     m(".media-body", [
    //                         m(".lgi-heading",
    //                             "Jonathan Morris"
    //                         ),
    //                         m("small.lgi-text",
    //                             "Nunc quis diam diamurabitur at dolor elementum, dictum turpis vel"
    //                         )
    //                     ])
    //                 ]),
    //                 m("a.list-group-item.media[href='']", [
    //                     m(".pull-left",
    //                         m("img.lgi-img[alt=''][src='img/demo/profile-pics/3.jpg']")
    //                     ),
    //                     m(".media-body", [
    //                         m(".lgi-heading",
    //                             "Fredric Mitchell Jr."
    //                         ),
    //                         m("small.lgi-text",
    //                             "Phasellus a ante et est ornare accumsan at vel magnauis blandit turpis at augue ultricies"
    //                         )
    //                     ])
    //                 ]),
    //                 m("a.list-group-item.media[href='']", [
    //                     m(".pull-left",
    //                         m("img.lgi-img[alt=''][src='img/demo/profile-pics/4.jpg']")
    //                     ),
    //                     m(".media-body", [
    //                         m(".lgi-heading",
    //                             "Glenn Jecobs"
    //                         ),
    //                         m("small.lgi-text",
    //                             "Ut vitae lacus sem ellentesque maximus, nunc sit amet varius dignissim, dui est consectetur neque"
    //                         )
    //                     ])
    //                 ]),
    //                 m("a.list-group-item.media[href='']", [
    //                     m(".pull-left",
    //                         m("img.lgi-img[alt=''][src='img/demo/profile-pics/4.jpg']")
    //                     ),
    //                     m(".media-body", [
    //                         m(".lgi-heading",
    //                             "Bill Phillips"
    //                         ),
    //                         m("small.lgi-text",
    //                             "Proin laoreet commodo eros id faucibus. Donec ligula quam, imperdiet vel ante placerat"
    //                         )
    //                     ])
    //                 ])
    //             ]),
    //             m("a.view-more[href='']",
    //                 "View Previous"
    //             )
    //         ])
    //     )
    // ]),
    // m("li.dropdown.hidden-xs", [
    //     m("a[data-toggle='dropdown'][href='']", [
    //         m("i.him-icon.zmdi.zmdi-view-list-alt"),
    //         m("i.him-counts",
    //             "2"
    //         )
    //     ]),
    //     m(".dropdown-menu.pull-right.dropdown-menu-lg",
    //         m(".list-group", [
    //             m(".lg-header", ),
    //             m(".lg-body", [
    //                 m(".list-group-item", [
    //                     m(".lgi-heading.m-b-5",
    //                         "HTML5 Validation Report"
    //                     ),
    //                     m(".progress",
    //                         m(".progress-bar[aria-valuemax='100'][aria-valuemin='0'][aria-valuenow='95'][role='progressbar']", { style: { "width": "95%" } },
    //                             m("span.sr-only",
    //                                 "95% Complete (success)"
    //                             )
    //                         )
    //                     )
    //                 ]),
    //                 m(".list-group-item", [
    //                     m(".lgi-heading.m-b-5",
    //                         "Google Chrome Extension"
    //                     ),
    //                     m(".progress",
    //                         m(".progress-bar.progress-bar-success[aria-valuemax='100'][aria-valuemin='0'][aria-valuenow='80'][role='progressbar']", { style: { "width": "80%" } },
    //                             m("span.sr-only",
    //                                 "80% Complete (success)"
    //                             )
    //                         )
    //                     )
    //                 ]),
    //                 m(".list-group-item", [
    //                     m(".lgi-heading.m-b-5",
    //                         "Social Intranet Projects"
    //                     ),
    //                     m(".progress",
    //                         m(".progress-bar.progress-bar-info[aria-valuemax='100'][aria-valuemin='0'][aria-valuenow='20'][role='progressbar']", { style: { "width": "20%" } },
    //                             m("span.sr-only",
    //                                 "20% Complete"
    //                             )
    //                         )
    //                     )
    //                 ]),
    //                 m(".list-group-item", [
    //                     m(".lgi-heading.m-b-5",
    //                         "Bootstrap Admin Template"
    //                     ),
    //                     m(".progress",
    //                         m(".progress-bar.progress-bar-warning[aria-valuemax='100'][aria-valuemin='0'][aria-valuenow='60'][role='progressbar']", { style: { "width": "60%" } },
    //                             m("span.sr-only",
    //                                 "60% Complete (warning)"
    //                             )
    //                         )
    //                     )
    //                 ]),
    //                 m(".list-group-item", [
    //                     m(".lgi-heading.m-b-5",
    //                         "Youtube Client App"
    //                     ),
    //                     m(".progress",
    //                         m(".progress-bar.progress-bar-danger[aria-valuemax='100'][aria-valuemin='0'][aria-valuenow='80'][role='progressbar']", { style: { "width": "80%" } },
    //                             m("span.sr-only",
    //                                 "80% Complete (danger)"
    //                             )
    //                         )
    //                     )
    //                 ])
    //             ]),
    //             m("a.view-more[href='']",
    //                 "View All"
    //             )
    //         ])
    //     )
    // ]),
    // m("li.dropdown", [
    //     m("a[data-toggle='dropdown'][href='']",
    //         m("i.him-icon.zmdi.zmdi-more-vert")
    //     ),
    //     m("ul.dropdown-menu.dm-icon.pull-right", [
    //         m("li.skin-switch.hidden-xs", [
    //             m("span.ss-skin.bgm-lightblue[data-ma-action='change-skin'][data-ma-skin='lightblue']"),
    //             m("span.ss-skin.bgm-bluegray[data-ma-action='change-skin'][data-ma-skin='bluegray']"),
    //             m("span.ss-skin.bgm-cyan[data-ma-action='change-skin'][data-ma-skin='cyan']"),
    //             m("span.ss-skin.bgm-teal[data-ma-action='change-skin'][data-ma-skin='teal']"),
    //             m("span.ss-skin.bgm-orange[data-ma-action='change-skin'][data-ma-skin='orange']"),
    //             m("span.ss-skin.bgm-blue[data-ma-action='change-skin'][data-sma-kin='blue']")
    //         ]),
    //         m("li.divider.hidden-xs"),
    //         m("li.hidden-xs",
    //             m("a[data-ma-action='fullscreen'][href='']", [
    //                 m("i.zmdi.zmdi-fullscreen"),
    //                 " Toggle Fullscreen"
    //             ])
    //         ),
    //         m("li",
    //             m("a[data-ma-action='clear-localstorage'][href='']", [
    //                 m("i.zmdi.zmdi-delete"),
    //                 " Clear Local Storage"
    //             ])
    //         ),
    //         m("li",
    //             m("a[href='']", [
    //                 m("i.zmdi.zmdi-face"),
    //                 " Privacy Settings"
    //             ])
    //         ),
    //         m("li",
    //             m("a[href='']", [
    //                 m("i.zmdi.zmdi-settings"),
    //                 " Other Settings"
    //             ])
    //         )
    //     ])
    // ]),
    // m("li.hidden-xs.ma-trigger[data-ma-action='sidebar-open'][data-ma-target='#chat']",
    //     m("a[href='']",
    //         m("i.him-icon.zmdi.zmdi-comment-alt-text")
    //     )
    // )
    ))]), (0, _mithril2.default)(".h-search-wrap", (0, _mithril2.default)(".hsw-inner", [(0, _mithril2.default)("i.hsw-close.zmdi.zmdi-arrow-left[data-ma-action='search-close']", {
      onclick: function onclick() {
        $("#header").removeClass("search-toggled");
      }
    }), (0, _mithril2.default)("input[type='text']")]))]);
  }
};

exports.default = header;

/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _mithril = __webpack_require__(0);

var _mithril2 = _interopRequireDefault(_mithril);

var _side_link = __webpack_require__(14);

var _stream = __webpack_require__(1);

var _stream2 = _interopRequireDefault(_stream);

var _requestToolBox = __webpack_require__(2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Data = {
    left_side_nav: {
        Admin: {
            name: (0, _stream2.default)("loading"),
            email: (0, _stream2.default)("loading")
        },
        fetch: function fetch() {
            (0, _requestToolBox.fetch)("left_side_nav", "query test{\n                  Admin{\n                    email\n                  }\n                }").then(function (res) {
                return Data.left_side_nav.Admin = res.data.Admin;
            });
        }
    }
};

function scrollBar(selector, theme, mousewheelaxis) {
    $(selector).mCustomScrollbar({
        theme: theme,
        scrollInertia: 100,
        axis: "yx",
        mouseWheel: { enable: !0, axis: mousewheelaxis, preventDefault: !0 }
    });
}

var left_side_nav = {
    oncreate: Data.left_side_nav.fetch,
    oninit: function oninit(vnode) {
        vnode.state.active = false;
    },
    view: function view(vnode) {
        return (0, _mithril2.default)("aside.sidebar.c-overflow[id='sidebar']", [(0, _mithril2.default)(".s-profile", [(0, _mithril2.default)("a[data-ma-action='profile-menu-toggle'].toggled.active", {
            href: _mithril2.default.route.get(),
            oncreate: _mithril2.default.route.link,
            onclick: function onclick() {
                vnode.state.active === true ? vnode.state.active = false : vnode.state.active = true;
            }
        }, [(0, _mithril2.default)(".sp-pic", (0, _mithril2.default)("img[alt=''][src='img/demo/profile-pics/1.jpg']")), (0, _mithril2.default)(".sp-info", [(0, _mithril2.default)("i.zmdi.zmdi-caret-" + (vnode.state.active === true ? "down" : "up"))], Data.left_side_nav.Admin.email)]), (0, _mithril2.default)("ul.main-menu", {
            style: {
                display: vnode.state.active === true ? "block" : ""
            }
        }, [(0, _mithril2.default)(_side_link.side_link, {
            icon: "zmdi.zmdi-account",
            href: "/logout",
            text: "View Profile"
        }), (0, _mithril2.default)(_side_link.side_link, {
            icon: "zmdi.zmdi-input-antenna",
            href: "/logout",
            text: "Privacy Settings"
        }), (0, _mithril2.default)(_side_link.side_link, {
            icon: "zmdi.zmdi-settings",
            href: "/logout",
            text: "Settings"
        }), (0, _mithril2.default)(_side_link.side_link, {
            icon: "zmdi.zmdi-time-restore",
            href: "/logout",
            text: "Logout"
        })])]), (0, _mithril2.default)("ul.main-menu", [(0, _mithril2.default)(_side_link.side_link, {
            icon: "zmdi.zmdi-view-dashboard",
            href: "/dashboard",
            text: "Dashboard"
        }), (0, _mithril2.default)(_side_link.side_link, {
            icon: "zmdi.zmdi-accounts-list-alt",
            href: "/contacts",
            text: "Contacts"
        }), (0, _mithril2.default)(_side_link.side_link, {
            icon: "zmdi.zmdi-accounts",
            href: "/groups",
            text: "Groups"
        }), (0, _mithril2.default)(_side_link.side_link, {
            icon: "zmdi.zmdi-comment-more",
            href: "/message/send",
            text: "Send Message"
        }), (0, _mithril2.default)(_side_link.side_drop, {
            icon: "zmdi.zmdi-settings",
            href: "/configurations",
            text: "Configurations",
            drops: [{
                href: "/configurations/sender_id",
                text: "Sender ID's"
            }, {
                href: "/configurations/org",
                text: "About your company"
            }]
        }), (0, _mithril2.default)(_side_link.side_drop, {
            icon: "zmdi.zmdi-home",
            href: "/financials",
            text: "Financials",
            drops: [{
                href: "/financials/wallet",
                text: "My wallet"
            }, {
                href: "/financials/spending",
                text: "My Spending"
            }, {
                href: "/financials/discounts",
                text: "Discounts"
            }]
        }), (0, _mithril2.default)(_side_link.side_drop, {
            icon: "zmdi.zmdi-device-hub",
            href: "/technical",
            text: "Technical",
            drops: [{
                href: "/sandbox/api",
                text: "Integration Api"
            }, {
                href: "/financials/spending",
                text: "Web hooks"
            }, {
                href: "/financials/discounts",
                text: "Open ticket for Support"
            }]
        })])]);
    }
};

exports.default = left_side_nav;

/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _mithril = __webpack_require__(0);

var _mithril2 = _interopRequireDefault(_mithril);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var right_side_nav = {
    view: function view() {
        return (0, _mithril2.default)("aside.sidebar[id='chat']", [(0, _mithril2.default)(".chat-search", (0, _mithril2.default)(".fg-line", [(0, _mithril2.default)("input.form-control[placeholder='Search People'][type='text']"), (0, _mithril2.default)("i.zmdi.zmdi-search")])), (0, _mithril2.default)(".lg-body.c-overflow", (0, _mithril2.default)(".list-group", [(0, _mithril2.default)("a.list-group-item.media[href='']", [(0, _mithril2.default)(".pull-left.p-relative", [(0, _mithril2.default)("img.lgi-img[alt=''][src='img/demo/profile-pics/2.jpg']"), (0, _mithril2.default)("i.chat-status-busy")]), (0, _mithril2.default)(".media-body", [(0, _mithril2.default)(".lgi-heading", "Jonathan Morris"), (0, _mithril2.default)("small.lgi-text", "Available")])]), (0, _mithril2.default)("a.list-group-item.media[href='']", [(0, _mithril2.default)(".pull-left", (0, _mithril2.default)("img.lgi-img[alt=''][src='img/demo/profile-pics/1.jpg']")), (0, _mithril2.default)(".media-body", [(0, _mithril2.default)(".lgi-heading", "David Belle"), (0, _mithril2.default)("small.lgi-text", "Last seen 3 hours ago")])]), (0, _mithril2.default)("a.list-group-item.media[href='']", [(0, _mithril2.default)(".pull-left.p-relative", [(0, _mithril2.default)("img.lgi-img[alt=''][src='img/demo/profile-pics/3.jpg']"), (0, _mithril2.default)("i.chat-status-online")]), (0, _mithril2.default)(".media-body", [(0, _mithril2.default)(".lgi-heading", "Fredric Mitchell Jr."), (0, _mithril2.default)("small.lgi-text", "Availble")])]), (0, _mithril2.default)("a.list-group-item.media[href='']", [(0, _mithril2.default)(".pull-left.p-relative", [(0, _mithril2.default)("img.lgi-img[alt=''][src='img/demo/profile-pics/4.jpg']"), (0, _mithril2.default)("i.chat-status-online")]), (0, _mithril2.default)(".media-body", [(0, _mithril2.default)(".lgi-heading", "Glenn Jecobs"), (0, _mithril2.default)("small.lgi-text", "Availble")])]), (0, _mithril2.default)("a.list-group-item.media[href='']", [(0, _mithril2.default)(".pull-left", (0, _mithril2.default)("img.lgi-img[alt=''][src='img/demo/profile-pics/5.jpg']")), (0, _mithril2.default)(".media-body", [(0, _mithril2.default)(".lgi-heading", "Bill Phillips"), (0, _mithril2.default)("small.lgi-text", "Last seen 3 days ago")])]), (0, _mithril2.default)("a.list-group-item.media[href='']", [(0, _mithril2.default)(".pull-left", (0, _mithril2.default)("img.lgi-img[alt=''][src='img/demo/profile-pics/6.jpg']")), (0, _mithril2.default)(".media-body", [(0, _mithril2.default)(".lgi-heading", "Wendy Mitchell"), (0, _mithril2.default)("small.lgi-text", "Last seen 2 minutes ago")])])]))]);
    }
};

exports.default = right_side_nav;

/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.contacts = undefined;

var _mithril = __webpack_require__(0);

var _mithril2 = _interopRequireDefault(_mithril);

var _plugins = __webpack_require__(3);

var _stream = __webpack_require__(1);

var _stream2 = _interopRequireDefault(_stream);

var _requestToolBox = __webpack_require__(2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Data = {
  groups: [],
  fetch: function fetch() {
    (0, _requestToolBox.fetch)("contacts", "query {\n                Organisations{\n                  id,\n                  questionnaires{\n                    id,\n                    name,\n                    singleTexts{\n                      id,\n                      title,\n                      explanation\n                    },\n                    multiTexts{\n                      id,\n                      title,\n                      explanation,\n                      Options{\n                        value\n                      }\n                    },\n                    singleChoices{\n                      id,\n                      title,\n                      explanation,\n                      choiceOptions{\n                        value\n                      }\n                    },\n                    multiChoices{\n                      id,\n                      title,\n                      explanation,\n                      choiceOptions{\n                        value\n                      }\n                    },\n                  }\n                }\n              }").then(function (res) {
      console.log(res);
      res.data.Organisation = res.data.Organisations.pop();
      Data.Organisation = res.data.Organisation;
      Data.questionnaires = res.data.Organisation.questionnaires;
    }, function (err) {
      console.log("faild");
    });
    $('#data-table-basic').DataTable();
  },
  create: function create(data, cb) {
    (0, _requestToolBox.post)("contacts", "mutation x($org:String!,$name:String!,){\n  QuestionnaireMutations{\n    Create(org:$org,name:$name){\n      id\n    }\n  }\n}", data).then(function (res) {
      cb(res.data.QuestionnaireMutations.Create);
    });
  },
  update: function update(data, cb) {
    data.ContactGroups = data.groups;
    (0, _requestToolBox.post)("contacts", "mutation x(\n                $id:String!\n              ){\n                questionnaireMutations{\n                  Create(\n                    id:$id,\n                    name:$name\n                  ){\n                    id\n                  }\n                }\n              }", data).then(function (res) {
      console.log(res);
      cb(res.data.questionnaireMutations.Update);
    });
  },
  delete: function _delete(data, cb) {
    (0, _requestToolBox.post)("contacts", "mutation x($id:String!){\n                        questionnaireMutations{\n                          Delete(id:$id){\n                            id\n                          }\n                        }\n                      }", data).then(function (res) {
      cb(res.data.questionnaireMutations.Delete);
    });
  }
};

var createForm = {
  oninit: function oninit(vnode) {
    var form = vnode.attrs.data;
    // console.log(form, Data.Organisation.id)
    form.org = Data.Organisation.id;
    vnode.state = {
      org: form.org,
      name: form.name,
      sending: false,
      submit: function submit(e) {
        e.preventDefault();
        vnode.state.sending = true;
        _mithril2.default.redraw();
        if ($("#chosen").chosen().val()) {
          vnode.state.groups = $("#chosen").chosen().val();
        }

        vnode.attrs.submit(vnode.state);
      }
    };
  },
  view: function view(vnode) {
    return (0, _mithril2.default)(".card", [(0, _mithril2.default)(".card-header", (0, _mithril2.default)("h2", ["Create Questionnaire", (0, _mithril2.default)("small", "You can create a edit contact here and hit submit, the contact will be changed and you will be able to send messages to him, please change groups you want him to join directly after you edit him.")])), (0, _mithril2.default)(".card-body.card-padding", (0, _mithril2.default)("form", {
      onsubmit: vnode.state.submit
    }, [(0, _mithril2.default)(".form-group.fg-line", [(0, _mithril2.default)("label[for='exampleInputEmail1']", "Name"), (0, _mithril2.default)("input.form-control.input-sm[id='exampleInputEmail1'][placeholder='Data collection'][type='text']", {
      onchange: _mithril2.default.withAttr("value", function (value) {
        return vnode.state.name = value;
      }),
      value: vnode.state.name
    })]), (0, _mithril2.default)(".form-group.fg-line", [!vnode.state.sending ? (0, _mithril2.default)("button.btn.btn-primary.btn-sm.m-t-10[type='submit']", "Submit") : (0, _mithril2.default)(".preloader.pls-red", (0, _mithril2.default)("svg.pl-circular[viewBox='25 25 50 50']", (0, _mithril2.default)("circle.plc-path[cx='50'][cy='50'][r='20']"))), (0, _mithril2.default)("button.btn.btn-grey.btn-sm.m-t-10.pull-right[type='button']", {
      onclick: function onclick() {
        vnode.attrs.cancel();
        _mithril2.default.redraw();
      }
    }, "Cancel")])]))]);
  }
};

var editForm = {
  oninit: function oninit(vnode) {
    var form = vnode.attrs.data;
    console.log(vnode.attrs);
    vnode.state = {
      id: form.id,
      name: form.name,
      sending: false,
      submit: function submit(e) {
        e.preventDefault();
        vnode.state.sending = true;
        _mithril2.default.redraw();
        if ($("#chosen").chosen().val()) {
          vnode.state.groups = $("#chosen").chosen().val();
        } else {
          vnode.state.groups = [];
        }

        vnode.attrs.submit(vnode.state);
      }
    };
  },
  view: function view(vnode) {
    return (0, _mithril2.default)(".card", [(0, _mithril2.default)(".card-header", (0, _mithril2.default)("h2", ["Edit questionnaire", (0, _mithril2.default)("small", "You can create a edit contact here and hit submit, the contact will be changed and you will be able to send messages to him, please change groups you want him to join directly after you edit him.")])), (0, _mithril2.default)(".card-body.card-padding", (0, _mithril2.default)("form", {
      onsubmit: vnode.state.submit
    }, [(0, _mithril2.default)(".form-group.fg-line", [(0, _mithril2.default)("label[for='exampleInputEmail1']", "Name"), (0, _mithril2.default)("input.form-control.input-sm[id='exampleInputEmail1'][placeholder='Name'][type='text']", {
      onchange: _mithril2.default.withAttr("value", function (value) {
        return vnode.state.name = value;
      }),
      value: vnode.state.name
    })]), (0, _mithril2.default)(".form-group.fg-line", [!vnode.state.sending ? (0, _mithril2.default)("button.btn.btn-primary.btn-sm.m-t-10[type='submit']", "Submit") : (0, _mithril2.default)(".preloader.pls-red", (0, _mithril2.default)("svg.pl-circular[viewBox='25 25 50 50']", (0, _mithril2.default)("circle.plc-path[cx='50'][cy='50'][r='20']"))), (0, _mithril2.default)("button.btn.btn-grey.btn-sm.m-t-10.pull-right[type='button']", {
      onclick: function onclick() {
        vnode.attrs.cancel();
        _mithril2.default.redraw();
      }
    }, "Cancel")])]))]);
  }
};

var contacts = {
  oninit: function oninit(vnode) {
    vnode.state.show = false;
    vnode.state.formData = {
      org: Data.Organisation ? Data.Organisation.id : "",
      name: ""
    };
    vnode.state.submit = function (formData) {
      if (vnode.state.edit != true) {
        formData.ContactGroups = formData.groups;
        Data.create(formData, function (data) {
          vnode.state.show = false;
          formData.id = data.id;
          Data.contacts.push(formData);
          _mithril2.default.redraw();
        });
      } else {
        Data.update(formData, function (data) {
          vnode.state.show = false;
          vnode.state.edit = false;
          delete Data.contacts;
          _mithril2.default.redraw();
          Data.fetch();
        });
      }
    };
  },

  oncreate: Data.fetch,
  onremove: function onremove() {
    var table = $('#data-table-basic').DataTable();
    table.destroy();
  },
  onbeforeupdate: function onbeforeupdate() {
    return new Promise(function (resolve, reject) {
      var table = $('#data-table-basic').DataTable();
      table.destroy();
      resolve();
    });
  },
  onupdate: function onupdate() {
    $('#data-table-basic').DataTable();
  },
  view: function view(vnode) {
    var selectedForm = createForm;
    if (vnode.state.edit == true) {
      selectedForm = editForm;
    }

    return [vnode.state.show === true ? (0, _mithril2.default)(selectedForm, {
      submit: vnode.state.submit,
      cancel: function cancel() {
        vnode.state.show = false;
        vnode.state.edit = false;
        _mithril2.default.redraw();
      },

      data: vnode.state.formData
    }) : !Data.questionnaires ? (0, _mithril2.default)(".text-center.p-20.m-t-25", (0, _mithril2.default)(".preloader.pl-xxl", (0, _mithril2.default)(".preloader.pls-red", (0, _mithril2.default)("svg.pl-circular[viewBox='25 25 50 50']", (0, _mithril2.default)("circle.plc-path[cx='50'][cy='50'][r='20']"))))) : (0, _mithril2.default)(".card", [(0, _mithril2.default)(".card-header", (0, _mithril2.default)("h2", ["Contact List", (0, _mithril2.default)("small", "All your contacts are here in this table, you can filter and use the edit button on the far left.")])), (0, _mithril2.default)(".table-responsive", (0, _mithril2.default)("table.table.table-striped[id='data-table-basic']", [(0, _mithril2.default)("thead", (0, _mithril2.default)("tr", [(0, _mithril2.default)("th", "Name"), (0, _mithril2.default)("th", ""), (0, _mithril2.default)("th", "")])), (0, _mithril2.default)("tbody", [Data.questionnaires.map(function (q) {
      return (0, _mithril2.default)("tr", [(0, _mithril2.default)("td", q.name), (0, _mithril2.default)("td", (0, _mithril2.default)("a.btn.btn-primary.btn-xs", {
        href: "/manage/" + q.id,
        oncreate: _mithril2.default.route.link
      }, 'view content')), (0, _mithril2.default)("td", (0, _mithril2.default)(".btn-group.pull-right", [(0, _mithril2.default)("button.btn.btn-primary.btn-xs", {
        onclick: function onclick() {
          vnode.state.show = true;
          vnode.state.edit = true;

          vnode.state.formData = {
            org: Data.Organisation.id,
            name: q.name
          };
          _mithril2.default.redraw();
        }
      }, "edit"), (0, _mithril2.default)("button.btn.btn-warning.btn-xs", {
        onclick: function onclick() {
          var q = confirm("Are you sure you want to delete this contact?");
          if (q == true) {
            vnode.state.formData = {
              id: contact.id
            };

            Data.delete(vnode.state.formData, function (data) {
              delete Data.contacts;
              Data.fetch();
              _mithril2.default.redraw();
            });
          }
        }
      }, "delete")]))]);
    })])])), (0, _mithril2.default)("button.btn.btn-float.btn-info.m-btn.waves-effect.waves-circle.waves-float", {
      onclick: function onclick() {
        vnode.state.show = true;
        vnode.state.name = "";
        vnode.state.number = "";
        vnode.state.groups = [];
      }
    }, (0, _mithril2.default)("i.zmdi.zmdi-plus"))])];
  }
};

exports.contacts = contacts;

/***/ }),
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.dashboard = undefined;

var _mithril = __webpack_require__(0);

var _mithril2 = _interopRequireDefault(_mithril);

var _stream = __webpack_require__(1);

var _stream2 = _interopRequireDefault(_stream);

var _requestToolBox = __webpack_require__(2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Data = {
  Organisations: "",
  dashboards: {
    fetch: function fetch() {
      (0, _requestToolBox.fetch)("dashboards", "query {\n                  Organisations{\n                    questionnaires{\n                      name,\n                      singleTexts{\n                        id,\n                        title,\n                        explanation\n                      },\n                      multiTexts{\n                        id,\n                        title,\n                        explanation,\n                        Options{\n                          value\n                        }\n                      },\n                      singleChoices{\n                        id,\n                        title,\n                        explanation,\n                        choiceOptions{\n                          value\n                        }\n                      },\n                      multiChoices{\n                        id,\n                        title,\n                        explanation,\n                        choiceOptions{\n                          value\n                        }\n                      },\n                    }\n                  }\n                }").then(function (res) {
        return Data.Organisation = res.data.Organisations.pop();
      });
    }
  }
};

var dashboard = {
  oncreate: Data.dashboards.fetch,
  oninit: function oninit(vnode) {
    vnode.state.openTodo = (0, _stream2.default)(false);
    vnode.state.todoList = [];
    vnode.state.newTodo = (0, _stream2.default)("");
  },
  view: function view(vnode) {
    return (0, _mithril2.default)(".card", [!Data.Organisation ? (0, _mithril2.default)(".text-center.p-20.m-t-25", (0, _mithril2.default)(".preloader.pl-xxl", (0, _mithril2.default)(".preloader.pls-red", (0, _mithril2.default)("svg.pl-circular[viewBox='25 25 50 50']", (0, _mithril2.default)("circle.plc-path[cx='50'][cy='50'][r='20']"))))) : (0, _mithril2.default)(".q", [Data.Organisation.questionnaires.map(function (questionnaire) {
      return (0, _mithril2.default)(".question", [(0, _mithril2.default)(".card-header", (0, _mithril2.default)(".block-header", [(0, _mithril2.default)("h2", questionnaire.name)])), (0, _mithril2.default)(".card-body.card-padding", [questionnaire.singleTexts.map(function (singleText) {
        return (0, _mithril2.default)(".form-group", (0, _mithril2.default)(".fg-line", (0, _mithril2.default)("input.form-control.input-sm[placeholder='" + singleText.explanation + "'][type='text']")));
      }), questionnaire.multiTexts.map(function (multiText) {
        return multiText.Options.map(function (option) {
          return (0, _mithril2.default)(".form-group", (0, _mithril2.default)(".fg-line", (0, _mithril2.default)("input.form-control.input-sm[placeholder='" + option.value + "'][type='text']")));
        });
      }), questionnaire.multiChoices.map(function (choice) {
        return choice.choiceOptions.map(function (option) {
          return (0, _mithril2.default)(".checkbox.m-b-15", (0, _mithril2.default)("label", [(0, _mithril2.default)("input[type='checkbox'][value='']"), (0, _mithril2.default)("i.input-helper"), " Option one is this and that-be sure to include why it's great"]));
        });
      }), questionnaire.singleChoices.map(function (choice) {
        return choice.choiceOptions.map(function (option) {
          return (0, _mithril2.default)(".radio.m-b-15", (0, _mithril2.default)("label", [(0, _mithril2.default)("input[name='sample'][type='radio'][value='']"), (0, _mithril2.default)("i.input-helper"), " Option one is this and that-be sure to include why it's great"]));
        });
      })]), (0, _mithril2.default)(".card-footer", [(0, _mithril2.default)(".container", [(0, _mithril2.default)("button.btn.btn-xs.btn-primary.btn-icon-text.waves-effect.pull-right", "Next", (0, _mithril2.default)("i.zmdi.zmdi-arrow-forward")), (0, _mithril2.default)("button.btn.btn-xs.btn-danger.btn-icon-text.waves-effect", (0, _mithril2.default)("i.zmdi.zmdi-arrow-back"), "Back")]), (0, _mithril2.default)("br"), (0, _mithril2.default)(".progress", (0, _mithril2.default)(".progress-bar[aria-valuemax='100'][aria-valuemin='0'][aria-valuenow='60'][role='progressbar']", {
        style: {
          "width": "60%"
        }
      }, (0, _mithril2.default)("span.sr-only", "60% Complete")))])]);
    })])]);
  }
};

exports.dashboard = dashboard;

/***/ }),
/* 12 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.preview = undefined;

var _mithril = __webpack_require__(0);

var _mithril2 = _interopRequireDefault(_mithril);

var _stream = __webpack_require__(1);

var _stream2 = _interopRequireDefault(_stream);

var _requestToolBox = __webpack_require__(2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Data = {
  Organisations: "",
  dashboards: {
    fetch: function fetch() {
      (0, _requestToolBox.fetch)("dashboards", "query {\n                  Organisations{\n                    questionnaires{\n                      name,\n                      singleTexts{\n                        id,\n                        title,\n                        explanation\n                      },\n                      multiTexts{\n                        id,\n                        title,\n                        explanation,\n                        Options{\n                          value\n                        }\n                      },\n                      singleChoices{\n                        id,\n                        title,\n                        explanation,\n                        choiceOptions{\n                          value\n                        }\n                      },\n                      multiChoices{\n                        id,\n                        title,\n                        explanation,\n                        choiceOptions{\n                          value\n                        }\n                      },\n                    }\n                  }\n                }").then(function (res) {
        return Data.Organisation = res.data.Organisations.pop();
      });
    }
  }
};

var preview = {
  oncreate: Data.dashboards.fetch,
  oninit: function oninit(vnode) {
    vnode.state.openTodo = (0, _stream2.default)(false);
    vnode.state.todoList = [];
    vnode.state.newTodo = (0, _stream2.default)("");
  },
  view: function view(vnode) {
    return (0, _mithril2.default)(".card", [!Data.Organisation ? (0, _mithril2.default)(".text-center.p-20.m-t-25", (0, _mithril2.default)(".preloader.pl-xxl", (0, _mithril2.default)(".preloader.pls-red", (0, _mithril2.default)("svg.pl-circular[viewBox='25 25 50 50']", (0, _mithril2.default)("circle.plc-path[cx='50'][cy='50'][r='20']"))))) : (0, _mithril2.default)(".q", [Data.Organisation.questionnaires.map(function (questionnaire) {
      return (0, _mithril2.default)(".question", [(0, _mithril2.default)(".card-header", (0, _mithril2.default)(".block-header", [(0, _mithril2.default)("h2", questionnaire.name), (0, _mithril2.default)("a.btn.btn-default.btn-icon-text.waves-effect.center.pull-right", {
        href: "/manage",
        oncreate: _mithril2.default.route.link
      }, (0, _mithril2.default)("i.zmdi.zmdi-refresh"), "manage")])), (0, _mithril2.default)(".card-body.card-padding", [questionnaire.singleTexts.map(function (singleText) {
        return (0, _mithril2.default)(".form-group", (0, _mithril2.default)(".fg-line", (0, _mithril2.default)("input.form-control.input-sm[placeholder='" + singleText.explanation + "'][type='text']")));
      }), questionnaire.multiTexts.map(function (multiText) {
        return multiText.Options.map(function (option) {
          return (0, _mithril2.default)(".form-group", (0, _mithril2.default)(".fg-line", (0, _mithril2.default)("input.form-control.input-sm[placeholder='" + option.value + "'][type='text']")));
        });
      }), questionnaire.multiChoices.map(function (choice) {
        return choice.choiceOptions.map(function (option) {
          return (0, _mithril2.default)(".checkbox.m-b-15", (0, _mithril2.default)("label", [(0, _mithril2.default)("input[type='checkbox'][value='']"), (0, _mithril2.default)("i.input-helper"), " Option one is this and that-be sure to include why it's great"]));
        });
      }), questionnaire.singleChoices.map(function (choice) {
        return choice.choiceOptions.map(function (option) {
          return (0, _mithril2.default)(".radio.m-b-15", (0, _mithril2.default)("label", [(0, _mithril2.default)("input[name='sample'][type='radio'][value='']"), (0, _mithril2.default)("i.input-helper"), " Option one is this and that-be sure to include why it's great"]));
        });
      })]), (0, _mithril2.default)(".card-footer", [(0, _mithril2.default)(".container", [(0, _mithril2.default)("button.btn.btn-xs.btn-primary.btn-icon-text.waves-effect.pull-right", "Next", (0, _mithril2.default)("i.zmdi.zmdi-arrow-forward")), (0, _mithril2.default)("button.btn.btn-xs.btn-danger.btn-icon-text.waves-effect", (0, _mithril2.default)("i.zmdi.zmdi-arrow-back"), "Back")]), (0, _mithril2.default)("br"), (0, _mithril2.default)(".progress", (0, _mithril2.default)(".progress-bar[aria-valuemax='100'][aria-valuemin='0'][aria-valuenow='60'][role='progressbar']", {
        style: {
          "width": "60%"
        }
      }, (0, _mithril2.default)("span.sr-only", "60% Complete")))])]);
    })])]);
  }
};

exports.preview = preview;

/***/ }),
/* 13 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

(function () {

	var guid = 0,
	    HALT = {};
	function createStream() {
		function stream() {
			if (arguments.length > 0 && arguments[0] !== HALT) updateStream(stream, arguments[0]);
			return stream._state.value;
		}
		initStream(stream);

		if (arguments.length > 0 && arguments[0] !== HALT) updateStream(stream, arguments[0]);

		return stream;
	}
	function initStream(stream) {
		stream.constructor = createStream;
		stream._state = { id: guid++, value: undefined, state: 0, derive: undefined, recover: undefined, deps: {}, parents: [], endStream: undefined, unregister: undefined };
		stream.map = stream["fantasy-land/map"] = map, stream["fantasy-land/ap"] = ap, stream["fantasy-land/of"] = createStream;
		stream.valueOf = valueOf, stream.toJSON = toJSON, stream.toString = valueOf;

		Object.defineProperties(stream, {
			end: { get: function get() {
					if (!stream._state.endStream) {
						var endStream = createStream();
						endStream.map(function (value) {
							if (value === true) {
								unregisterStream(stream);
								endStream._state.unregister = function () {
									unregisterStream(endStream);
								};
							}
							return value;
						});
						stream._state.endStream = endStream;
					}
					return stream._state.endStream;
				} }
		});
	}
	function updateStream(stream, value) {
		updateState(stream, value);
		for (var id in stream._state.deps) {
			updateDependency(stream._state.deps[id], false);
		}if (stream._state.unregister != null) stream._state.unregister();
		finalize(stream);
	}
	function updateState(stream, value) {
		stream._state.value = value;
		stream._state.changed = true;
		if (stream._state.state !== 2) stream._state.state = 1;
	}
	function updateDependency(stream, mustSync) {
		var state = stream._state,
		    parents = state.parents;
		if (parents.length > 0 && parents.every(active) && (mustSync || parents.some(changed))) {
			var value = stream._state.derive();
			if (value === HALT) return false;
			updateState(stream, value);
		}
	}
	function finalize(stream) {
		stream._state.changed = false;
		for (var id in stream._state.deps) {
			stream._state.deps[id]._state.changed = false;
		}
	}

	function combine(fn, streams) {
		if (!streams.every(valid)) throw new Error("Ensure that each item passed to stream.combine/stream.merge is a stream");
		return initDependency(createStream(), streams, function () {
			return fn.apply(this, streams.concat([streams.filter(changed)]));
		});
	}

	function initDependency(dep, streams, derive) {
		var state = dep._state;
		state.derive = derive;
		state.parents = streams.filter(notEnded);

		registerDependency(dep, state.parents);
		updateDependency(dep, true);

		return dep;
	}
	function registerDependency(stream, parents) {
		for (var i = 0; i < parents.length; i++) {
			parents[i]._state.deps[stream._state.id] = stream;
			registerDependency(stream, parents[i]._state.parents);
		}
	}
	function unregisterStream(stream) {
		for (var i = 0; i < stream._state.parents.length; i++) {
			var parent = stream._state.parents[i];
			delete parent._state.deps[stream._state.id];
		}
		for (var id in stream._state.deps) {
			var dependent = stream._state.deps[id];
			var index = dependent._state.parents.indexOf(stream);
			if (index > -1) dependent._state.parents.splice(index, 1);
		}
		stream._state.state = 2; //ended
		stream._state.deps = {};
	}

	function map(fn) {
		return combine(function (stream) {
			return fn(stream());
		}, [this]);
	}
	function ap(stream) {
		return combine(function (s1, s2) {
			return s1()(s2());
		}, [stream, this]);
	}
	function valueOf() {
		return this._state.value;
	}
	function toJSON() {
		return this._state.value != null && typeof this._state.value.toJSON === "function" ? this._state.value.toJSON() : this._state.value;
	}

	function valid(stream) {
		return stream._state;
	}
	function active(stream) {
		return stream._state.state === 1;
	}
	function changed(stream) {
		return stream._state.changed;
	}
	function notEnded(stream) {
		return stream._state.state !== 2;
	}

	function merge(streams) {
		return combine(function () {
			return streams.map(function (s) {
				return s();
			});
		}, streams);
	}

	function scan(reducer, seed, stream) {
		var newStream = combine(function (s) {
			return seed = reducer(seed, s._state.value);
		}, [stream]);

		if (newStream._state.state === 0) newStream(seed);

		return newStream;
	}

	function scanMerge(tuples, seed) {
		var streams = tuples.map(function (tuple) {
			var stream = tuple[0];
			if (stream._state.state === 0) stream(undefined);
			return stream;
		});

		var newStream = combine(function () {
			var changed = arguments[arguments.length - 1];

			streams.forEach(function (stream, idx) {
				if (changed.indexOf(stream) > -1) {
					seed = tuples[idx][1](seed, stream._state.value);
				}
			});

			return seed;
		}, streams);

		return newStream;
	}

	createStream["fantasy-land/of"] = createStream;
	createStream.merge = merge;
	createStream.combine = combine;
	createStream.scan = scan;
	createStream.scanMerge = scanMerge;
	createStream.HALT = HALT;

	if (true) module["exports"] = createStream;else if (typeof window.m === "function" && !("stream" in window.m)) window.m.stream = createStream;else window.m = { stream: createStream };
})();

/***/ }),
/* 14 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.side_drop = exports.side_link = undefined;

var _mithril = __webpack_require__(0);

var _mithril2 = _interopRequireDefault(_mithril);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var side_link = {
    view: function view(vnode) {
        return (0, _mithril2.default)("li" + (vnode.attrs.href == _mithril2.default.route.get() ? ".active" : ""), (0, _mithril2.default)("a", {
            oncreate: _mithril2.default.route.link,
            href: vnode.attrs.href
        }, [(0, _mithril2.default)("i." + vnode.attrs.icon), vnode.attrs.text, vnode.attrs.badge ? (0, _mithril2.default)("span.badge." + vnode.attrs.badgeColor, vnode.attrs.badge) : ""]));
    }
};

var side_drop = {
    oninit: function oninit(vnode) {
        vnode.state.active = false;
        vnode.state.activate = function () {
            vnode.state.active === false ? vnode.state.active = true : vnode.state.active = false;
        };
        vnode.attrs.drops.map(function (drop) {
            if (drop.href == _mithril2.default.route.get()) {
                vnode.state.active = true;
            }
        });
    },
    view: function view(vnode) {
        return (0, _mithril2.default)("li.sub-menu" + (vnode.state.active === true ? ".toggled.active" : ""), {
            onclick: vnode.state.activate
        }, [(0, _mithril2.default)("a[data-ma-action='submenu-toggle']", {
            oncreate: _mithril2.default.route.link,
            href: _mithril2.default.route.get()
        }, [(0, _mithril2.default)("i." + vnode.attrs.icon), vnode.attrs.text]), (0, _mithril2.default)("ul", {
            style: {
                display: vnode.state.active === true ? "block" : ""
            }
        }, [vnode.attrs.drops.map(function (drop) {
            drop.activate = vnode.state.activate;
            return (0, _mithril2.default)(side_link, drop);
        })])]);
    }
};

exports.side_link = side_link;
exports.side_drop = side_drop;

/***/ }),
/* 15 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _mithril = __webpack_require__(0);

var _mithril2 = _interopRequireDefault(_mithril);

var _header = __webpack_require__(7);

var _header2 = _interopRequireDefault(_header);

var _left_side_nav = __webpack_require__(8);

var _left_side_nav2 = _interopRequireDefault(_left_side_nav);

var _right_side_nav = __webpack_require__(9);

var _right_side_nav2 = _interopRequireDefault(_right_side_nav);

var _content = __webpack_require__(6);

var _content2 = _interopRequireDefault(_content);

var _dashboard = __webpack_require__(11);

var _contacts = __webpack_require__(10);

var _preview = __webpack_require__(12);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var layout = {
  view: function view(vnode) {
    return (0, _mithril2.default)(".app", [
    // header here
    (0, _mithril2.default)(_header2.default), (0, _mithril2.default)("section[id='main']", {
      style: {
        'padding-bottom': '0px'
      }
    }, [
    // left_sidebar_here
    // m(left_side_nav),
    // right_sidebar_here
    // m(right_side_nav),
    // m("section[id='content']", )
    (0, _mithril2.default)(_content2.default, vnode.attrs)])]);
  }
};

_mithril2.default.route(document.body, "/", {
  "/manage": {
    view: function view() {
      return (0, _mithril2.default)(layout, {
        component: _contacts.contacts
      });
    }
  },
  "/manage/:q_id": {
    view: function view() {
      return (0, _mithril2.default)(layout, {
        component: _contacts.contacts
      });
    }
  },
  "/client": {
    view: function view() {
      return (0, _mithril2.default)(layout, {
        component: _dashboard.dashboard
      });
    }
  },
  "/": {
    view: function view() {
      return (0, _mithril2.default)(layout, {
        component: _preview.preview
      });
    }
  },
  "/sandbox/api": {
    view: function view() {
      return (0, _mithril2.default)(layout, {
        component: sandbox
      });
    }
  }
  // '/manage': {
  //   view: () => m('.app', [
  //     m(".test", "test"),
  //     m("a", {
  //       href: "/",
  //       oncreate: m.route.link
  //     }, "home")
  //   ])
  // }
});

// m.route(document.body, "/", {
//   '/': {
//     view: () => m('.app', [
//       m(".test", "test"),
//       m("a", {
//         href: "/test",
//         oncreate: m.route.link
//       }, "test")
//     ])
//   },
//   '/test': {
//     view: () => m('.app', [
//       m(".test", "test"),
//       m("a", {
//         href: "/",
//         oncreate: m.route.link
//       }, "home")
//     ])
//   }
// })

/***/ }),
/* 16 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


// shim for using process in browser
var process = module.exports = {};

// cached from whatever global is present so that test runners that stub it
// don't break things.  But we need to wrap it in a try catch in case it is
// wrapped in strict mode code which doesn't define any globals.  It's inside a
// function because try/catches deoptimize in certain engines.

var cachedSetTimeout;
var cachedClearTimeout;

function defaultSetTimout() {
    throw new Error('setTimeout has not been defined');
}
function defaultClearTimeout() {
    throw new Error('clearTimeout has not been defined');
}
(function () {
    try {
        if (typeof setTimeout === 'function') {
            cachedSetTimeout = setTimeout;
        } else {
            cachedSetTimeout = defaultSetTimout;
        }
    } catch (e) {
        cachedSetTimeout = defaultSetTimout;
    }
    try {
        if (typeof clearTimeout === 'function') {
            cachedClearTimeout = clearTimeout;
        } else {
            cachedClearTimeout = defaultClearTimeout;
        }
    } catch (e) {
        cachedClearTimeout = defaultClearTimeout;
    }
})();
function runTimeout(fun) {
    if (cachedSetTimeout === setTimeout) {
        //normal enviroments in sane situations
        return setTimeout(fun, 0);
    }
    // if setTimeout wasn't available but was latter defined
    if ((cachedSetTimeout === defaultSetTimout || !cachedSetTimeout) && setTimeout) {
        cachedSetTimeout = setTimeout;
        return setTimeout(fun, 0);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedSetTimeout(fun, 0);
    } catch (e) {
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't trust the global object when called normally
            return cachedSetTimeout.call(null, fun, 0);
        } catch (e) {
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error
            return cachedSetTimeout.call(this, fun, 0);
        }
    }
}
function runClearTimeout(marker) {
    if (cachedClearTimeout === clearTimeout) {
        //normal enviroments in sane situations
        return clearTimeout(marker);
    }
    // if clearTimeout wasn't available but was latter defined
    if ((cachedClearTimeout === defaultClearTimeout || !cachedClearTimeout) && clearTimeout) {
        cachedClearTimeout = clearTimeout;
        return clearTimeout(marker);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedClearTimeout(marker);
    } catch (e) {
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't  trust the global object when called normally
            return cachedClearTimeout.call(null, marker);
        } catch (e) {
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error.
            // Some versions of I.E. have different rules for clearTimeout vs setTimeout
            return cachedClearTimeout.call(this, marker);
        }
    }
}
var queue = [];
var draining = false;
var currentQueue;
var queueIndex = -1;

function cleanUpNextTick() {
    if (!draining || !currentQueue) {
        return;
    }
    draining = false;
    if (currentQueue.length) {
        queue = currentQueue.concat(queue);
    } else {
        queueIndex = -1;
    }
    if (queue.length) {
        drainQueue();
    }
}

function drainQueue() {
    if (draining) {
        return;
    }
    var timeout = runTimeout(cleanUpNextTick);
    draining = true;

    var len = queue.length;
    while (len) {
        currentQueue = queue;
        queue = [];
        while (++queueIndex < len) {
            if (currentQueue) {
                currentQueue[queueIndex].run();
            }
        }
        queueIndex = -1;
        len = queue.length;
    }
    currentQueue = null;
    draining = false;
    runClearTimeout(timeout);
}

process.nextTick = function (fun) {
    var args = new Array(arguments.length - 1);
    if (arguments.length > 1) {
        for (var i = 1; i < arguments.length; i++) {
            args[i - 1] = arguments[i];
        }
    }
    queue.push(new Item(fun, args));
    if (queue.length === 1 && !draining) {
        runTimeout(drainQueue);
    }
};

// v8 likes predictible objects
function Item(fun, array) {
    this.fun = fun;
    this.array = array;
}
Item.prototype.run = function () {
    this.fun.apply(null, this.array);
};
process.title = 'browser';
process.browser = true;
process.env = {};
process.argv = [];
process.version = ''; // empty string to avoid regexp issues
process.versions = {};

function noop() {}

process.on = noop;
process.addListener = noop;
process.once = noop;
process.off = noop;
process.removeListener = noop;
process.removeAllListeners = noop;
process.emit = noop;
process.prependListener = noop;
process.prependOnceListener = noop;

process.listeners = function (name) {
    return [];
};

process.binding = function (name) {
    throw new Error('process.binding is not supported');
};

process.cwd = function () {
    return '/';
};
process.chdir = function (dir) {
    throw new Error('process.chdir is not supported');
};
process.umask = function () {
    return 0;
};

/***/ }),
/* 17 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(global, process) {

(function (global, undefined) {
    "use strict";

    if (global.setImmediate) {
        return;
    }

    var nextHandle = 1; // Spec says greater than zero
    var tasksByHandle = {};
    var currentlyRunningATask = false;
    var doc = global.document;
    var registerImmediate;

    function setImmediate(callback) {
        // Callback can either be a function or a string
        if (typeof callback !== "function") {
            callback = new Function("" + callback);
        }
        // Copy function arguments
        var args = new Array(arguments.length - 1);
        for (var i = 0; i < args.length; i++) {
            args[i] = arguments[i + 1];
        }
        // Store and register the task
        var task = { callback: callback, args: args };
        tasksByHandle[nextHandle] = task;
        registerImmediate(nextHandle);
        return nextHandle++;
    }

    function clearImmediate(handle) {
        delete tasksByHandle[handle];
    }

    function run(task) {
        var callback = task.callback;
        var args = task.args;
        switch (args.length) {
            case 0:
                callback();
                break;
            case 1:
                callback(args[0]);
                break;
            case 2:
                callback(args[0], args[1]);
                break;
            case 3:
                callback(args[0], args[1], args[2]);
                break;
            default:
                callback.apply(undefined, args);
                break;
        }
    }

    function runIfPresent(handle) {
        // From the spec: "Wait until any invocations of this algorithm started before this one have completed."
        // So if we're currently running a task, we'll need to delay this invocation.
        if (currentlyRunningATask) {
            // Delay by doing a setTimeout. setImmediate was tried instead, but in Firefox 7 it generated a
            // "too much recursion" error.
            setTimeout(runIfPresent, 0, handle);
        } else {
            var task = tasksByHandle[handle];
            if (task) {
                currentlyRunningATask = true;
                try {
                    run(task);
                } finally {
                    clearImmediate(handle);
                    currentlyRunningATask = false;
                }
            }
        }
    }

    function installNextTickImplementation() {
        registerImmediate = function registerImmediate(handle) {
            process.nextTick(function () {
                runIfPresent(handle);
            });
        };
    }

    function canUsePostMessage() {
        // The test against `importScripts` prevents this implementation from being installed inside a web worker,
        // where `global.postMessage` means something completely different and can't be used for this purpose.
        if (global.postMessage && !global.importScripts) {
            var postMessageIsAsynchronous = true;
            var oldOnMessage = global.onmessage;
            global.onmessage = function () {
                postMessageIsAsynchronous = false;
            };
            global.postMessage("", "*");
            global.onmessage = oldOnMessage;
            return postMessageIsAsynchronous;
        }
    }

    function installPostMessageImplementation() {
        // Installs an event handler on `global` for the `message` event: see
        // * https://developer.mozilla.org/en/DOM/window.postMessage
        // * http://www.whatwg.org/specs/web-apps/current-work/multipage/comms.html#crossDocumentMessages

        var messagePrefix = "setImmediate$" + Math.random() + "$";
        var onGlobalMessage = function onGlobalMessage(event) {
            if (event.source === global && typeof event.data === "string" && event.data.indexOf(messagePrefix) === 0) {
                runIfPresent(+event.data.slice(messagePrefix.length));
            }
        };

        if (global.addEventListener) {
            global.addEventListener("message", onGlobalMessage, false);
        } else {
            global.attachEvent("onmessage", onGlobalMessage);
        }

        registerImmediate = function registerImmediate(handle) {
            global.postMessage(messagePrefix + handle, "*");
        };
    }

    function installMessageChannelImplementation() {
        var channel = new MessageChannel();
        channel.port1.onmessage = function (event) {
            var handle = event.data;
            runIfPresent(handle);
        };

        registerImmediate = function registerImmediate(handle) {
            channel.port2.postMessage(handle);
        };
    }

    function installReadyStateChangeImplementation() {
        var html = doc.documentElement;
        registerImmediate = function registerImmediate(handle) {
            // Create a <script> element; its readystatechange event will be fired asynchronously once it is inserted
            // into the document. Do so, thus queuing up the task. Remember to clean up once it's been called.
            var script = doc.createElement("script");
            script.onreadystatechange = function () {
                runIfPresent(handle);
                script.onreadystatechange = null;
                html.removeChild(script);
                script = null;
            };
            html.appendChild(script);
        };
    }

    function installSetTimeoutImplementation() {
        registerImmediate = function registerImmediate(handle) {
            setTimeout(runIfPresent, 0, handle);
        };
    }

    // If supported, we should attach to the prototype of global, since that is where setTimeout et al. live.
    var attachTo = Object.getPrototypeOf && Object.getPrototypeOf(global);
    attachTo = attachTo && attachTo.setTimeout ? attachTo : global;

    // Don't get fooled by e.g. browserify environments.
    if ({}.toString.call(global.process) === "[object process]") {
        // For Node.js before 0.9
        installNextTickImplementation();
    } else if (canUsePostMessage()) {
        // For non-IE10 modern browsers
        installPostMessageImplementation();
    } else if (global.MessageChannel) {
        // For web workers, where supported
        installMessageChannelImplementation();
    } else if (doc && "onreadystatechange" in doc.createElement("script")) {
        // For IE 6–8
        installReadyStateChangeImplementation();
    } else {
        // For older browsers
        installSetTimeoutImplementation();
    }

    attachTo.setImmediate = setImmediate;
    attachTo.clearImmediate = clearImmediate;
})(typeof self === "undefined" ? typeof global === "undefined" ? undefined : global : self);
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(5), __webpack_require__(16)))

/***/ }),
/* 18 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var apply = Function.prototype.apply;

// DOM APIs, for completeness

exports.setTimeout = function () {
  return new Timeout(apply.call(setTimeout, window, arguments), clearTimeout);
};
exports.setInterval = function () {
  return new Timeout(apply.call(setInterval, window, arguments), clearInterval);
};
exports.clearTimeout = exports.clearInterval = function (timeout) {
  if (timeout) {
    timeout.close();
  }
};

function Timeout(id, clearFn) {
  this._id = id;
  this._clearFn = clearFn;
}
Timeout.prototype.unref = Timeout.prototype.ref = function () {};
Timeout.prototype.close = function () {
  this._clearFn.call(window, this._id);
};

// Does not start the time, just sets up the members needed.
exports.enroll = function (item, msecs) {
  clearTimeout(item._idleTimeoutId);
  item._idleTimeout = msecs;
};

exports.unenroll = function (item) {
  clearTimeout(item._idleTimeoutId);
  item._idleTimeout = -1;
};

exports._unrefActive = exports.active = function (item) {
  clearTimeout(item._idleTimeoutId);

  var msecs = item._idleTimeout;
  if (msecs >= 0) {
    item._idleTimeoutId = setTimeout(function onTimeout() {
      if (item._onTimeout) item._onTimeout();
    }, msecs);
  }
};

// setimmediate attaches itself to the global object
__webpack_require__(17);
exports.setImmediate = setImmediate;
exports.clearImmediate = clearImmediate;

/***/ })
/******/ ]);
//# sourceMappingURL=main.bundle.js.map