import { o as __toESM, t as __commonJSMin } from '../../_runtime.mjs'
//#region node_modules/react/cjs/react.production.js
/**
 * @license React
 * react.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var require_react_production = /* @__PURE__ */ __commonJSMin((exports) => {
  var REACT_ELEMENT_TYPE = Symbol.for('react.transitional.element'),
    REACT_PORTAL_TYPE = Symbol.for('react.portal'),
    REACT_FRAGMENT_TYPE = Symbol.for('react.fragment'),
    REACT_STRICT_MODE_TYPE = Symbol.for('react.strict_mode'),
    REACT_PROFILER_TYPE = Symbol.for('react.profiler'),
    REACT_CONSUMER_TYPE = Symbol.for('react.consumer'),
    REACT_CONTEXT_TYPE = Symbol.for('react.context'),
    REACT_FORWARD_REF_TYPE = Symbol.for('react.forward_ref'),
    REACT_SUSPENSE_TYPE = Symbol.for('react.suspense'),
    REACT_MEMO_TYPE = Symbol.for('react.memo'),
    REACT_LAZY_TYPE = Symbol.for('react.lazy'),
    REACT_ACTIVITY_TYPE = Symbol.for('react.activity'),
    MAYBE_ITERATOR_SYMBOL = Symbol.iterator
  function getIteratorFn(maybeIterable) {
    if (null === maybeIterable || 'object' !== typeof maybeIterable) return null
    maybeIterable =
      (MAYBE_ITERATOR_SYMBOL && maybeIterable[MAYBE_ITERATOR_SYMBOL]) ||
      maybeIterable['@@iterator']
    return 'function' === typeof maybeIterable ? maybeIterable : null
  }
  var ReactNoopUpdateQueue = {
      isMounted: function () {
        return !1
      },
      enqueueForceUpdate: function () {},
      enqueueReplaceState: function () {},
      enqueueSetState: function () {}
    },
    assign = Object.assign,
    emptyObject = {}
  function Component(props, context, updater) {
    this.props = props
    this.context = context
    this.refs = emptyObject
    this.updater = updater || ReactNoopUpdateQueue
  }
  Component.prototype.isReactComponent = {}
  Component.prototype.setState = function (partialState, callback) {
    if (
      'object' !== typeof partialState &&
      'function' !== typeof partialState &&
      null != partialState
    )
      throw Error(
        'takes an object of state variables to update or a function which returns an object of state variables.'
      )
    this.updater.enqueueSetState(this, partialState, callback, 'setState')
  }
  Component.prototype.forceUpdate = function (callback) {
    this.updater.enqueueForceUpdate(this, callback, 'forceUpdate')
  }
  function ComponentDummy() {}
  ComponentDummy.prototype = Component.prototype
  function PureComponent(props, context, updater) {
    this.props = props
    this.context = context
    this.refs = emptyObject
    this.updater = updater || ReactNoopUpdateQueue
  }
  var pureComponentPrototype = (PureComponent.prototype = new ComponentDummy())
  pureComponentPrototype.constructor = PureComponent
  assign(pureComponentPrototype, Component.prototype)
  pureComponentPrototype.isPureReactComponent = !0
  var isArrayImpl = Array.isArray
  function noop() {}
  var ReactSharedInternals = {
      H: null,
      A: null,
      T: null,
      S: null
    },
    hasOwnProperty = Object.prototype.hasOwnProperty
  function ReactElement(type, key, props) {
    var refProp = props.ref
    return {
      $$typeof: REACT_ELEMENT_TYPE,
      type,
      key,
      ref: void 0 !== refProp ? refProp : null,
      props
    }
  }
  function cloneAndReplaceKey(oldElement, newKey) {
    return ReactElement(oldElement.type, newKey, oldElement.props)
  }
  function isValidElement(object) {
    return (
      'object' === typeof object &&
      null !== object &&
      object.$$typeof === REACT_ELEMENT_TYPE
    )
  }
  function escape(key) {
    var escaperLookup = {
      '=': '=0',
      ':': '=2'
    }
    return (
      '$' +
      key.replace(/[=:]/g, function (match) {
        return escaperLookup[match]
      })
    )
  }
  var userProvidedKeyEscapeRegex = /\/+/g
  function getElementKey(element, index) {
    return 'object' === typeof element &&
      null !== element &&
      null != element.key
      ? escape('' + element.key)
      : index.toString(36)
  }
  function resolveThenable(thenable) {
    switch (thenable.status) {
      case 'fulfilled':
        return thenable.value
      case 'rejected':
        throw thenable.reason
      default:
        switch (
          ('string' === typeof thenable.status
            ? thenable.then(noop, noop)
            : ((thenable.status = 'pending'),
              thenable.then(
                function (fulfilledValue) {
                  'pending' === thenable.status &&
                    ((thenable.status = 'fulfilled'),
                    (thenable.value = fulfilledValue))
                },
                function (error) {
                  'pending' === thenable.status &&
                    ((thenable.status = 'rejected'), (thenable.reason = error))
                }
              )),
          thenable.status)
        ) {
          case 'fulfilled':
            return thenable.value
          case 'rejected':
            throw thenable.reason
        }
    }
    throw thenable
  }
  function mapIntoArray(children, array, escapedPrefix, nameSoFar, callback) {
    var type = typeof children
    if ('undefined' === type || 'boolean' === type) children = null
    var invokeCallback = !1
    if (null === children) invokeCallback = !0
    else
      switch (type) {
        case 'bigint':
        case 'string':
        case 'number':
          invokeCallback = !0
          break
        case 'object':
          switch (children.$$typeof) {
            case REACT_ELEMENT_TYPE:
            case REACT_PORTAL_TYPE:
              invokeCallback = !0
              break
            case REACT_LAZY_TYPE:
              return (
                (invokeCallback = children._init),
                mapIntoArray(
                  invokeCallback(children._payload),
                  array,
                  escapedPrefix,
                  nameSoFar,
                  callback
                )
              )
          }
      }
    if (invokeCallback)
      return (
        (callback = callback(children)),
        (invokeCallback =
          '' === nameSoFar ? '.' + getElementKey(children, 0) : nameSoFar),
        isArrayImpl(callback)
          ? ((escapedPrefix = ''),
            null != invokeCallback &&
              (escapedPrefix =
                invokeCallback.replace(userProvidedKeyEscapeRegex, '$&/') +
                '/'),
            mapIntoArray(callback, array, escapedPrefix, '', function (c) {
              return c
            }))
          : null != callback &&
            (isValidElement(callback) &&
              (callback = cloneAndReplaceKey(
                callback,
                escapedPrefix +
                  (null == callback.key ||
                  (children && children.key === callback.key)
                    ? ''
                    : ('' + callback.key).replace(
                        userProvidedKeyEscapeRegex,
                        '$&/'
                      ) + '/') +
                  invokeCallback
              )),
            array.push(callback)),
        1
      )
    invokeCallback = 0
    var nextNamePrefix = '' === nameSoFar ? '.' : nameSoFar + ':'
    if (isArrayImpl(children))
      for (var i = 0; i < children.length; i++)
        ((nameSoFar = children[i]),
          (type = nextNamePrefix + getElementKey(nameSoFar, i)),
          (invokeCallback += mapIntoArray(
            nameSoFar,
            array,
            escapedPrefix,
            type,
            callback
          )))
    else if (((i = getIteratorFn(children)), 'function' === typeof i))
      for (
        children = i.call(children), i = 0;
        !(nameSoFar = children.next()).done;
      )
        ((nameSoFar = nameSoFar.value),
          (type = nextNamePrefix + getElementKey(nameSoFar, i++)),
          (invokeCallback += mapIntoArray(
            nameSoFar,
            array,
            escapedPrefix,
            type,
            callback
          )))
    else if ('object' === type) {
      if ('function' === typeof children.then)
        return mapIntoArray(
          resolveThenable(children),
          array,
          escapedPrefix,
          nameSoFar,
          callback
        )
      array = String(children)
      throw Error(
        'Objects are not valid as a React child (found: ' +
          ('[object Object]' === array
            ? 'object with keys {' + Object.keys(children).join(', ') + '}'
            : array) +
          '). If you meant to render a collection of children, use an array instead.'
      )
    }
    return invokeCallback
  }
  function mapChildren(children, func, context) {
    if (null == children) return children
    var result = [],
      count = 0
    mapIntoArray(children, result, '', '', function (child) {
      return func.call(context, child, count++)
    })
    return result
  }
  function lazyInitializer(payload) {
    if (-1 === payload._status) {
      var ctor = payload._result
      ctor = ctor()
      ctor.then(
        function (moduleObject) {
          if (0 === payload._status || -1 === payload._status)
            ((payload._status = 1), (payload._result = moduleObject))
        },
        function (error) {
          if (0 === payload._status || -1 === payload._status)
            ((payload._status = 2), (payload._result = error))
        }
      )
      ;-1 === payload._status &&
        ((payload._status = 0), (payload._result = ctor))
    }
    if (1 === payload._status) return payload._result.default
    throw payload._result
  }
  var reportGlobalError =
      'function' === typeof reportError
        ? reportError
        : function (error) {
            if (
              'object' === typeof window &&
              'function' === typeof window.ErrorEvent
            ) {
              var event = new window.ErrorEvent('error', {
                bubbles: !0,
                cancelable: !0,
                message:
                  'object' === typeof error &&
                  null !== error &&
                  'string' === typeof error.message
                    ? String(error.message)
                    : String(error),
                error
              })
              if (!window.dispatchEvent(event)) return
            } else if (
              'object' === typeof process &&
              'function' === typeof process.emit
            ) {
              process.emit('uncaughtException', error)
              return
            }
            console.error(error)
          },
    Children = {
      map: mapChildren,
      forEach: function (children, forEachFunc, forEachContext) {
        mapChildren(
          children,
          function () {
            forEachFunc.apply(this, arguments)
          },
          forEachContext
        )
      },
      count: function (children) {
        var n = 0
        mapChildren(children, function () {
          n++
        })
        return n
      },
      toArray: function (children) {
        return (
          mapChildren(children, function (child) {
            return child
          }) || []
        )
      },
      only: function (children) {
        if (!isValidElement(children))
          throw Error(
            'React.Children.only expected to receive a single React element child.'
          )
        return children
      }
    }
  exports.Activity = REACT_ACTIVITY_TYPE
  exports.Children = Children
  exports.Component = Component
  exports.Fragment = REACT_FRAGMENT_TYPE
  exports.Profiler = REACT_PROFILER_TYPE
  exports.PureComponent = PureComponent
  exports.StrictMode = REACT_STRICT_MODE_TYPE
  exports.Suspense = REACT_SUSPENSE_TYPE
  exports.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE =
    ReactSharedInternals
  exports.__COMPILER_RUNTIME = {
    __proto__: null,
    c: function (size) {
      return ReactSharedInternals.H.useMemoCache(size)
    }
  }
  exports.cache = function (fn) {
    return function () {
      return fn.apply(null, arguments)
    }
  }
  exports.cacheSignal = function () {
    return null
  }
  exports.cloneElement = function (element, config, children) {
    if (null === element || void 0 === element)
      throw Error(
        'The argument must be a React element, but you passed ' + element + '.'
      )
    var props = assign({}, element.props),
      key = element.key
    if (null != config)
      for (propName in (void 0 !== config.key && (key = '' + config.key),
      config))
        !hasOwnProperty.call(config, propName) ||
          'key' === propName ||
          '__self' === propName ||
          '__source' === propName ||
          ('ref' === propName && void 0 === config.ref) ||
          (props[propName] = config[propName])
    var propName = arguments.length - 2
    if (1 === propName) props.children = children
    else if (1 < propName) {
      for (var childArray = Array(propName), i = 0; i < propName; i++)
        childArray[i] = arguments[i + 2]
      props.children = childArray
    }
    return ReactElement(element.type, key, props)
  }
  exports.createContext = function (defaultValue) {
    defaultValue = {
      $$typeof: REACT_CONTEXT_TYPE,
      _currentValue: defaultValue,
      _currentValue2: defaultValue,
      _threadCount: 0,
      Provider: null,
      Consumer: null
    }
    defaultValue.Provider = defaultValue
    defaultValue.Consumer = {
      $$typeof: REACT_CONSUMER_TYPE,
      _context: defaultValue
    }
    return defaultValue
  }
  exports.createElement = function (type, config, children) {
    var propName,
      props = {},
      key = null
    if (null != config)
      for (propName in (void 0 !== config.key && (key = '' + config.key),
      config))
        hasOwnProperty.call(config, propName) &&
          'key' !== propName &&
          '__self' !== propName &&
          '__source' !== propName &&
          (props[propName] = config[propName])
    var childrenLength = arguments.length - 2
    if (1 === childrenLength) props.children = children
    else if (1 < childrenLength) {
      for (
        var childArray = Array(childrenLength), i = 0;
        i < childrenLength;
        i++
      )
        childArray[i] = arguments[i + 2]
      props.children = childArray
    }
    if (type && type.defaultProps)
      for (propName in ((childrenLength = type.defaultProps), childrenLength))
        void 0 === props[propName] &&
          (props[propName] = childrenLength[propName])
    return ReactElement(type, key, props)
  }
  exports.createRef = function () {
    return { current: null }
  }
  exports.forwardRef = function (render) {
    return {
      $$typeof: REACT_FORWARD_REF_TYPE,
      render
    }
  }
  exports.isValidElement = isValidElement
  exports.lazy = function (ctor) {
    return {
      $$typeof: REACT_LAZY_TYPE,
      _payload: {
        _status: -1,
        _result: ctor
      },
      _init: lazyInitializer
    }
  }
  exports.memo = function (type, compare) {
    return {
      $$typeof: REACT_MEMO_TYPE,
      type,
      compare: void 0 === compare ? null : compare
    }
  }
  exports.startTransition = function (scope) {
    var prevTransition = ReactSharedInternals.T,
      currentTransition = {}
    ReactSharedInternals.T = currentTransition
    try {
      var returnValue = scope(),
        onStartTransitionFinish = ReactSharedInternals.S
      null !== onStartTransitionFinish &&
        onStartTransitionFinish(currentTransition, returnValue)
      'object' === typeof returnValue &&
        null !== returnValue &&
        'function' === typeof returnValue.then &&
        returnValue.then(noop, reportGlobalError)
    } catch (error) {
      reportGlobalError(error)
    } finally {
      ;(null !== prevTransition &&
        null !== currentTransition.types &&
        (prevTransition.types = currentTransition.types),
        (ReactSharedInternals.T = prevTransition))
    }
  }
  exports.unstable_useCacheRefresh = function () {
    return ReactSharedInternals.H.useCacheRefresh()
  }
  exports.use = function (usable) {
    return ReactSharedInternals.H.use(usable)
  }
  exports.useActionState = function (action, initialState, permalink) {
    return ReactSharedInternals.H.useActionState(
      action,
      initialState,
      permalink
    )
  }
  exports.useCallback = function (callback, deps) {
    return ReactSharedInternals.H.useCallback(callback, deps)
  }
  exports.useContext = function (Context) {
    return ReactSharedInternals.H.useContext(Context)
  }
  exports.useDebugValue = function () {}
  exports.useDeferredValue = function (value, initialValue) {
    return ReactSharedInternals.H.useDeferredValue(value, initialValue)
  }
  exports.useEffect = function (create, deps) {
    return ReactSharedInternals.H.useEffect(create, deps)
  }
  exports.useEffectEvent = function (callback) {
    return ReactSharedInternals.H.useEffectEvent(callback)
  }
  exports.useId = function () {
    return ReactSharedInternals.H.useId()
  }
  exports.useImperativeHandle = function (ref, create, deps) {
    return ReactSharedInternals.H.useImperativeHandle(ref, create, deps)
  }
  exports.useInsertionEffect = function (create, deps) {
    return ReactSharedInternals.H.useInsertionEffect(create, deps)
  }
  exports.useLayoutEffect = function (create, deps) {
    return ReactSharedInternals.H.useLayoutEffect(create, deps)
  }
  exports.useMemo = function (create, deps) {
    return ReactSharedInternals.H.useMemo(create, deps)
  }
  exports.useOptimistic = function (passthrough, reducer) {
    return ReactSharedInternals.H.useOptimistic(passthrough, reducer)
  }
  exports.useReducer = function (reducer, initialArg, init) {
    return ReactSharedInternals.H.useReducer(reducer, initialArg, init)
  }
  exports.useRef = function (initialValue) {
    return ReactSharedInternals.H.useRef(initialValue)
  }
  exports.useState = function (initialState) {
    return ReactSharedInternals.H.useState(initialState)
  }
  exports.useSyncExternalStore = function (
    subscribe,
    getSnapshot,
    getServerSnapshot
  ) {
    return ReactSharedInternals.H.useSyncExternalStore(
      subscribe,
      getSnapshot,
      getServerSnapshot
    )
  }
  exports.useTransition = function () {
    return ReactSharedInternals.H.useTransition()
  }
  exports.version = '19.2.6'
})
//#endregion
//#region node_modules/react/index.js
var require_react = /* @__PURE__ */ __commonJSMin((exports, module) => {
  module.exports = require_react_production()
})
//#endregion
//#region node_modules/react/cjs/react-jsx-runtime.production.js
/**
 * @license React
 * react-jsx-runtime.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var require_react_jsx_runtime_production = /* @__PURE__ */ __commonJSMin(
  (exports) => {
    var REACT_ELEMENT_TYPE = Symbol.for('react.transitional.element'),
      REACT_FRAGMENT_TYPE = Symbol.for('react.fragment')
    function jsxProd(type, config, maybeKey) {
      var key = null
      void 0 !== maybeKey && (key = '' + maybeKey)
      void 0 !== config.key && (key = '' + config.key)
      if ('key' in config) {
        maybeKey = {}
        for (var propName in config)
          'key' !== propName && (maybeKey[propName] = config[propName])
      } else maybeKey = config
      config = maybeKey.ref
      return {
        $$typeof: REACT_ELEMENT_TYPE,
        type,
        key,
        ref: void 0 !== config ? config : null,
        props: maybeKey
      }
    }
    exports.Fragment = REACT_FRAGMENT_TYPE
    exports.jsx = jsxProd
    exports.jsxs = jsxProd
  }
)
//#endregion
//#region node_modules/react/jsx-runtime.js
var require_jsx_runtime = /* @__PURE__ */ __commonJSMin((exports, module) => {
  module.exports = require_react_jsx_runtime_production()
})
//#endregion
//#region node_modules/use-sync-external-store/cjs/use-sync-external-store-shim.production.js
/**
 * @license React
 * use-sync-external-store-shim.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var require_use_sync_external_store_shim_production =
  /* @__PURE__ */ __commonJSMin((exports) => {
    var React = require_react()
    function is(x, y) {
      return (x === y && (0 !== x || 1 / x === 1 / y)) || (x !== x && y !== y)
    }
    var objectIs = 'function' === typeof Object.is ? Object.is : is,
      useState = React.useState,
      useEffect = React.useEffect,
      useLayoutEffect = React.useLayoutEffect,
      useDebugValue = React.useDebugValue
    function useSyncExternalStore$2(subscribe, getSnapshot) {
      var value = getSnapshot(),
        _useState = useState({
          inst: {
            value,
            getSnapshot
          }
        }),
        inst = _useState[0].inst,
        forceUpdate = _useState[1]
      useLayoutEffect(
        function () {
          inst.value = value
          inst.getSnapshot = getSnapshot
          checkIfSnapshotChanged(inst) && forceUpdate({ inst })
        },
        [subscribe, value, getSnapshot]
      )
      useEffect(
        function () {
          checkIfSnapshotChanged(inst) && forceUpdate({ inst })
          return subscribe(function () {
            checkIfSnapshotChanged(inst) && forceUpdate({ inst })
          })
        },
        [subscribe]
      )
      useDebugValue(value)
      return value
    }
    function checkIfSnapshotChanged(inst) {
      var latestGetSnapshot = inst.getSnapshot
      inst = inst.value
      try {
        var nextValue = latestGetSnapshot()
        return !objectIs(inst, nextValue)
      } catch (error) {
        return !0
      }
    }
    function useSyncExternalStore$1(subscribe, getSnapshot) {
      return getSnapshot()
    }
    var shim =
      'undefined' === typeof window ||
      'undefined' === typeof window.document ||
      'undefined' === typeof window.document.createElement
        ? useSyncExternalStore$1
        : useSyncExternalStore$2
    exports.useSyncExternalStore =
      void 0 !== React.useSyncExternalStore ? React.useSyncExternalStore : shim
  })
//#endregion
//#region node_modules/use-sync-external-store/shim/index.js
var require_shim = /* @__PURE__ */ __commonJSMin((exports, module) => {
  module.exports = require_use_sync_external_store_shim_production()
})
//#endregion
//#region node_modules/use-sync-external-store/cjs/use-sync-external-store-shim/with-selector.production.js
/**
 * @license React
 * use-sync-external-store-shim/with-selector.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var require_with_selector_production = /* @__PURE__ */ __commonJSMin(
  (exports) => {
    var React = require_react(),
      shim = require_shim()
    function is(x, y) {
      return (x === y && (0 !== x || 1 / x === 1 / y)) || (x !== x && y !== y)
    }
    var objectIs = 'function' === typeof Object.is ? Object.is : is,
      useSyncExternalStore = shim.useSyncExternalStore,
      useRef = React.useRef,
      useEffect = React.useEffect,
      useMemo = React.useMemo,
      useDebugValue = React.useDebugValue
    exports.useSyncExternalStoreWithSelector = function (
      subscribe,
      getSnapshot,
      getServerSnapshot,
      selector,
      isEqual
    ) {
      var instRef = useRef(null)
      if (null === instRef.current) {
        var inst = {
          hasValue: !1,
          value: null
        }
        instRef.current = inst
      } else inst = instRef.current
      instRef = useMemo(
        function () {
          function memoizedSelector(nextSnapshot) {
            if (!hasMemo) {
              hasMemo = !0
              memoizedSnapshot = nextSnapshot
              nextSnapshot = selector(nextSnapshot)
              if (void 0 !== isEqual && inst.hasValue) {
                var currentSelection = inst.value
                if (isEqual(currentSelection, nextSnapshot))
                  return (memoizedSelection = currentSelection)
              }
              return (memoizedSelection = nextSnapshot)
            }
            currentSelection = memoizedSelection
            if (objectIs(memoizedSnapshot, nextSnapshot))
              return currentSelection
            var nextSelection = selector(nextSnapshot)
            if (void 0 !== isEqual && isEqual(currentSelection, nextSelection))
              return ((memoizedSnapshot = nextSnapshot), currentSelection)
            memoizedSnapshot = nextSnapshot
            return (memoizedSelection = nextSelection)
          }
          var hasMemo = !1,
            memoizedSnapshot,
            memoizedSelection,
            maybeGetServerSnapshot =
              void 0 === getServerSnapshot ? null : getServerSnapshot
          return [
            function () {
              return memoizedSelector(getSnapshot())
            },
            null === maybeGetServerSnapshot
              ? void 0
              : function () {
                  return memoizedSelector(maybeGetServerSnapshot())
                }
          ]
        },
        [getSnapshot, getServerSnapshot, selector, isEqual]
      )
      var value = useSyncExternalStore(subscribe, instRef[0], instRef[1])
      useEffect(
        function () {
          inst.hasValue = !0
          inst.value = value
        },
        [value]
      )
      useDebugValue(value)
      return value
    }
  }
)
//#endregion
//#region node_modules/use-sync-external-store/shim/with-selector.js
var require_with_selector = /* @__PURE__ */ __commonJSMin((exports, module) => {
  module.exports = require_with_selector_production()
})
//#endregion
//#region node_modules/react-dom/cjs/react-dom.production.js
/**
 * @license React
 * react-dom.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var require_react_dom_production = /* @__PURE__ */ __commonJSMin((exports) => {
  var React = require_react()
  function formatProdErrorMessage(code) {
    var url = 'https://react.dev/errors/' + code
    if (1 < arguments.length) {
      url += '?args[]=' + encodeURIComponent(arguments[1])
      for (var i = 2; i < arguments.length; i++)
        url += '&args[]=' + encodeURIComponent(arguments[i])
    }
    return (
      'Minified React error #' +
      code +
      '; visit ' +
      url +
      ' for the full message or use the non-minified dev environment for full errors and additional helpful warnings.'
    )
  }
  function noop() {}
  var Internals = {
      d: {
        f: noop,
        r: function () {
          throw Error(formatProdErrorMessage(522))
        },
        D: noop,
        C: noop,
        L: noop,
        m: noop,
        X: noop,
        S: noop,
        M: noop
      },
      p: 0,
      findDOMNode: null
    },
    REACT_PORTAL_TYPE = Symbol.for('react.portal')
  function createPortal$1(children, containerInfo, implementation) {
    var key =
      3 < arguments.length && void 0 !== arguments[3] ? arguments[3] : null
    return {
      $$typeof: REACT_PORTAL_TYPE,
      key: null == key ? null : '' + key,
      children,
      containerInfo,
      implementation
    }
  }
  var ReactSharedInternals =
    React.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE
  function getCrossOriginStringAs(as, input) {
    if ('font' === as) return ''
    if ('string' === typeof input)
      return 'use-credentials' === input ? input : ''
  }
  exports.__DOM_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE =
    Internals
  exports.createPortal = function (children, container) {
    var key =
      2 < arguments.length && void 0 !== arguments[2] ? arguments[2] : null
    if (
      !container ||
      (1 !== container.nodeType &&
        9 !== container.nodeType &&
        11 !== container.nodeType)
    )
      throw Error(formatProdErrorMessage(299))
    return createPortal$1(children, container, null, key)
  }
  exports.flushSync = function (fn) {
    var previousTransition = ReactSharedInternals.T,
      previousUpdatePriority = Internals.p
    try {
      if (((ReactSharedInternals.T = null), (Internals.p = 2), fn)) return fn()
    } finally {
      ;((ReactSharedInternals.T = previousTransition),
        (Internals.p = previousUpdatePriority),
        Internals.d.f())
    }
  }
  exports.preconnect = function (href, options) {
    'string' === typeof href &&
      (options
        ? ((options = options.crossOrigin),
          (options =
            'string' === typeof options
              ? 'use-credentials' === options
                ? options
                : ''
              : void 0))
        : (options = null),
      Internals.d.C(href, options))
  }
  exports.prefetchDNS = function (href) {
    'string' === typeof href && Internals.d.D(href)
  }
  exports.preinit = function (href, options) {
    if ('string' === typeof href && options && 'string' === typeof options.as) {
      var as = options.as,
        crossOrigin = getCrossOriginStringAs(as, options.crossOrigin),
        integrity =
          'string' === typeof options.integrity ? options.integrity : void 0,
        fetchPriority =
          'string' === typeof options.fetchPriority
            ? options.fetchPriority
            : void 0
      'style' === as
        ? Internals.d.S(
            href,
            'string' === typeof options.precedence
              ? options.precedence
              : void 0,
            {
              crossOrigin,
              integrity,
              fetchPriority
            }
          )
        : 'script' === as &&
          Internals.d.X(href, {
            crossOrigin,
            integrity,
            fetchPriority,
            nonce: 'string' === typeof options.nonce ? options.nonce : void 0
          })
    }
  }
  exports.preinitModule = function (href, options) {
    if ('string' === typeof href)
      if ('object' === typeof options && null !== options) {
        if (null == options.as || 'script' === options.as) {
          var crossOrigin = getCrossOriginStringAs(
            options.as,
            options.crossOrigin
          )
          Internals.d.M(href, {
            crossOrigin,
            integrity:
              'string' === typeof options.integrity
                ? options.integrity
                : void 0,
            nonce: 'string' === typeof options.nonce ? options.nonce : void 0
          })
        }
      } else options ?? Internals.d.M(href)
  }
  exports.preload = function (href, options) {
    if (
      'string' === typeof href &&
      'object' === typeof options &&
      null !== options &&
      'string' === typeof options.as
    ) {
      var as = options.as,
        crossOrigin = getCrossOriginStringAs(as, options.crossOrigin)
      Internals.d.L(href, as, {
        crossOrigin,
        integrity:
          'string' === typeof options.integrity ? options.integrity : void 0,
        nonce: 'string' === typeof options.nonce ? options.nonce : void 0,
        type: 'string' === typeof options.type ? options.type : void 0,
        fetchPriority:
          'string' === typeof options.fetchPriority
            ? options.fetchPriority
            : void 0,
        referrerPolicy:
          'string' === typeof options.referrerPolicy
            ? options.referrerPolicy
            : void 0,
        imageSrcSet:
          'string' === typeof options.imageSrcSet
            ? options.imageSrcSet
            : void 0,
        imageSizes:
          'string' === typeof options.imageSizes ? options.imageSizes : void 0,
        media: 'string' === typeof options.media ? options.media : void 0
      })
    }
  }
  exports.preloadModule = function (href, options) {
    if ('string' === typeof href)
      if (options) {
        var crossOrigin = getCrossOriginStringAs(
          options.as,
          options.crossOrigin
        )
        Internals.d.m(href, {
          as:
            'string' === typeof options.as && 'script' !== options.as
              ? options.as
              : void 0,
          crossOrigin,
          integrity:
            'string' === typeof options.integrity ? options.integrity : void 0
        })
      } else Internals.d.m(href)
  }
  exports.requestFormReset = function (form) {
    Internals.d.r(form)
  }
  exports.unstable_batchedUpdates = function (fn, a) {
    return fn(a)
  }
  exports.useFormState = function (action, initialState, permalink) {
    return ReactSharedInternals.H.useFormState(action, initialState, permalink)
  }
  exports.useFormStatus = function () {
    return ReactSharedInternals.H.useHostTransitionStatus()
  }
  exports.version = '19.2.6'
})
//#endregion
//#region node_modules/react-dom/index.js
var require_react_dom = /* @__PURE__ */ __commonJSMin((exports, module) => {
  function checkDCE() {
    if (
      typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ === 'undefined' ||
      typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE !== 'function'
    )
      return
    try {
      __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(checkDCE)
    } catch (err) {
      console.error(err)
    }
  }
  checkDCE()
  module.exports = require_react_dom_production()
})
//#endregion
//#region node_modules/@floating-ui/utils/dist/floating-ui.utils.mjs
var import_react = /* @__PURE__ */ __toESM(require_react(), 1)
var import_jsx_runtime = require_jsx_runtime()
/**
 * Custom positioning reference element.
 * @see https://floating-ui.com/docs/virtual-elements
 */
var sides = ['top', 'right', 'bottom', 'left']
var min = Math.min
var max = Math.max
var round = Math.round
var floor = Math.floor
var createCoords = (v) => ({
  x: v,
  y: v
})
var oppositeSideMap = {
  left: 'right',
  right: 'left',
  bottom: 'top',
  top: 'bottom'
}
function clamp(start, value, end) {
  return max(start, min(value, end))
}
function evaluate(value, param) {
  return typeof value === 'function' ? value(param) : value
}
function getSide(placement) {
  return placement.split('-')[0]
}
function getAlignment(placement) {
  return placement.split('-')[1]
}
function getOppositeAxis(axis) {
  return axis === 'x' ? 'y' : 'x'
}
function getAxisLength(axis) {
  return axis === 'y' ? 'height' : 'width'
}
function getSideAxis(placement) {
  const firstChar = placement[0]
  return firstChar === 't' || firstChar === 'b' ? 'y' : 'x'
}
function getAlignmentAxis(placement) {
  return getOppositeAxis(getSideAxis(placement))
}
function getAlignmentSides(placement, rects, rtl) {
  if (rtl === void 0) rtl = false
  const alignment = getAlignment(placement)
  const alignmentAxis = getAlignmentAxis(placement)
  const length = getAxisLength(alignmentAxis)
  let mainAlignmentSide =
    alignmentAxis === 'x'
      ? alignment === (rtl ? 'end' : 'start')
        ? 'right'
        : 'left'
      : alignment === 'start'
        ? 'bottom'
        : 'top'
  if (rects.reference[length] > rects.floating[length])
    mainAlignmentSide = getOppositePlacement(mainAlignmentSide)
  return [mainAlignmentSide, getOppositePlacement(mainAlignmentSide)]
}
function getExpandedPlacements(placement) {
  const oppositePlacement = getOppositePlacement(placement)
  return [
    getOppositeAlignmentPlacement(placement),
    oppositePlacement,
    getOppositeAlignmentPlacement(oppositePlacement)
  ]
}
function getOppositeAlignmentPlacement(placement) {
  return placement.includes('start')
    ? placement.replace('start', 'end')
    : placement.replace('end', 'start')
}
var lrPlacement = ['left', 'right']
var rlPlacement = ['right', 'left']
var tbPlacement = ['top', 'bottom']
var btPlacement = ['bottom', 'top']
function getSideList(side, isStart, rtl) {
  switch (side) {
    case 'top':
    case 'bottom':
      if (rtl) return isStart ? rlPlacement : lrPlacement
      return isStart ? lrPlacement : rlPlacement
    case 'left':
    case 'right':
      return isStart ? tbPlacement : btPlacement
    default:
      return []
  }
}
function getOppositeAxisPlacements(placement, flipAlignment, direction, rtl) {
  const alignment = getAlignment(placement)
  let list = getSideList(getSide(placement), direction === 'start', rtl)
  if (alignment) {
    list = list.map((side) => side + '-' + alignment)
    if (flipAlignment)
      list = list.concat(list.map(getOppositeAlignmentPlacement))
  }
  return list
}
function getOppositePlacement(placement) {
  const side = getSide(placement)
  return oppositeSideMap[side] + placement.slice(side.length)
}
function expandPaddingObject(padding) {
  return {
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    ...padding
  }
}
function getPaddingObject(padding) {
  return typeof padding !== 'number'
    ? expandPaddingObject(padding)
    : {
        top: padding,
        right: padding,
        bottom: padding,
        left: padding
      }
}
function rectToClientRect(rect) {
  const { x, y, width, height } = rect
  return {
    width,
    height,
    top: y,
    left: x,
    right: x + width,
    bottom: y + height,
    x,
    y
  }
}
//#endregion
//#region node_modules/@floating-ui/core/dist/floating-ui.core.mjs
var import_shim = require_shim()
var import_with_selector = require_with_selector()
var import_react_dom = /* @__PURE__ */ __toESM(require_react_dom(), 1)
function computeCoordsFromPlacement(_ref, placement, rtl) {
  let { reference, floating } = _ref
  const sideAxis = getSideAxis(placement)
  const alignmentAxis = getAlignmentAxis(placement)
  const alignLength = getAxisLength(alignmentAxis)
  const side = getSide(placement)
  const isVertical = sideAxis === 'y'
  const commonX = reference.x + reference.width / 2 - floating.width / 2
  const commonY = reference.y + reference.height / 2 - floating.height / 2
  const commonAlign = reference[alignLength] / 2 - floating[alignLength] / 2
  let coords
  switch (side) {
    case 'top':
      coords = {
        x: commonX,
        y: reference.y - floating.height
      }
      break
    case 'bottom':
      coords = {
        x: commonX,
        y: reference.y + reference.height
      }
      break
    case 'right':
      coords = {
        x: reference.x + reference.width,
        y: commonY
      }
      break
    case 'left':
      coords = {
        x: reference.x - floating.width,
        y: commonY
      }
      break
    default:
      coords = {
        x: reference.x,
        y: reference.y
      }
  }
  switch (getAlignment(placement)) {
    case 'start':
      coords[alignmentAxis] -= commonAlign * (rtl && isVertical ? -1 : 1)
      break
    case 'end':
      coords[alignmentAxis] += commonAlign * (rtl && isVertical ? -1 : 1)
      break
  }
  return coords
}
/**
 * Resolves with an object of overflow side offsets that determine how much the
 * element is overflowing a given clipping boundary on each side.
 * - positive = overflowing the boundary by that number of pixels
 * - negative = how many pixels left before it will overflow
 * - 0 = lies flush with the boundary
 * @see https://floating-ui.com/docs/detectOverflow
 */
async function detectOverflow(state, options) {
  var _await$platform$isEle
  if (options === void 0) options = {}
  const { x, y, platform, rects, elements, strategy } = state
  const {
    boundary = 'clippingAncestors',
    rootBoundary = 'viewport',
    elementContext = 'floating',
    altBoundary = false,
    padding = 0
  } = evaluate(options, state)
  const paddingObject = getPaddingObject(padding)
  const element =
    elements[
      altBoundary
        ? elementContext === 'floating'
          ? 'reference'
          : 'floating'
        : elementContext
    ]
  const clippingClientRect = rectToClientRect(
    await platform.getClippingRect({
      element: (
        (_await$platform$isEle = await (platform.isElement == null
          ? void 0
          : platform.isElement(element))) != null
          ? _await$platform$isEle
          : true
      )
        ? element
        : element.contextElement ||
          (await (platform.getDocumentElement == null
            ? void 0
            : platform.getDocumentElement(elements.floating))),
      boundary,
      rootBoundary,
      strategy
    })
  )
  const rect =
    elementContext === 'floating'
      ? {
          x,
          y,
          width: rects.floating.width,
          height: rects.floating.height
        }
      : rects.reference
  const offsetParent = await (platform.getOffsetParent == null
    ? void 0
    : platform.getOffsetParent(elements.floating))
  const offsetScale = (await (platform.isElement == null
    ? void 0
    : platform.isElement(offsetParent)))
    ? (await (platform.getScale == null
        ? void 0
        : platform.getScale(offsetParent))) || {
        x: 1,
        y: 1
      }
    : {
        x: 1,
        y: 1
      }
  const elementClientRect = rectToClientRect(
    platform.convertOffsetParentRelativeRectToViewportRelativeRect
      ? await platform.convertOffsetParentRelativeRectToViewportRelativeRect({
          elements,
          rect,
          offsetParent,
          strategy
        })
      : rect
  )
  return {
    top:
      (clippingClientRect.top - elementClientRect.top + paddingObject.top) /
      offsetScale.y,
    bottom:
      (elementClientRect.bottom -
        clippingClientRect.bottom +
        paddingObject.bottom) /
      offsetScale.y,
    left:
      (clippingClientRect.left - elementClientRect.left + paddingObject.left) /
      offsetScale.x,
    right:
      (elementClientRect.right -
        clippingClientRect.right +
        paddingObject.right) /
      offsetScale.x
  }
}
var MAX_RESET_COUNT = 50
/**
 * Computes the `x` and `y` coordinates that will place the floating element
 * next to a given reference element.
 *
 * This export does not have any `platform` interface logic. You will need to
 * write one for the platform you are using Floating UI with.
 */
var computePosition$1 = async (reference, floating, config) => {
  const {
    placement = 'bottom',
    strategy = 'absolute',
    middleware = [],
    platform
  } = config
  const platformWithDetectOverflow = platform.detectOverflow
    ? platform
    : {
        ...platform,
        detectOverflow
      }
  const rtl = await (platform.isRTL == null ? void 0 : platform.isRTL(floating))
  let rects = await platform.getElementRects({
    reference,
    floating,
    strategy
  })
  let { x, y } = computeCoordsFromPlacement(rects, placement, rtl)
  let statefulPlacement = placement
  let resetCount = 0
  const middlewareData = {}
  for (let i = 0; i < middleware.length; i++) {
    const currentMiddleware = middleware[i]
    if (!currentMiddleware) continue
    const { name, fn } = currentMiddleware
    const {
      x: nextX,
      y: nextY,
      data,
      reset
    } = await fn({
      x,
      y,
      initialPlacement: placement,
      placement: statefulPlacement,
      strategy,
      middlewareData,
      rects,
      platform: platformWithDetectOverflow,
      elements: {
        reference,
        floating
      }
    })
    x = nextX != null ? nextX : x
    y = nextY != null ? nextY : y
    middlewareData[name] = {
      ...middlewareData[name],
      ...data
    }
    if (reset && resetCount < MAX_RESET_COUNT) {
      resetCount++
      if (typeof reset === 'object') {
        if (reset.placement) statefulPlacement = reset.placement
        if (reset.rects)
          rects =
            reset.rects === true
              ? await platform.getElementRects({
                  reference,
                  floating,
                  strategy
                })
              : reset.rects
        ;({ x, y } = computeCoordsFromPlacement(rects, statefulPlacement, rtl))
      }
      i = -1
    }
  }
  return {
    x,
    y,
    placement: statefulPlacement,
    strategy,
    middlewareData
  }
}
/**
 * Provides data to position an inner element of the floating element so that it
 * appears centered to the reference element.
 * @see https://floating-ui.com/docs/arrow
 */
var arrow$4 = (options) => ({
  name: 'arrow',
  options,
  async fn(state) {
    const { x, y, placement, rects, platform, elements, middlewareData } = state
    const { element, padding = 0 } = evaluate(options, state) || {}
    if (element == null) return {}
    const paddingObject = getPaddingObject(padding)
    const coords = {
      x,
      y
    }
    const axis = getAlignmentAxis(placement)
    const length = getAxisLength(axis)
    const arrowDimensions = await platform.getDimensions(element)
    const isYAxis = axis === 'y'
    const minProp = isYAxis ? 'top' : 'left'
    const maxProp = isYAxis ? 'bottom' : 'right'
    const clientProp = isYAxis ? 'clientHeight' : 'clientWidth'
    const endDiff =
      rects.reference[length] +
      rects.reference[axis] -
      coords[axis] -
      rects.floating[length]
    const startDiff = coords[axis] - rects.reference[axis]
    const arrowOffsetParent = await (platform.getOffsetParent == null
      ? void 0
      : platform.getOffsetParent(element))
    let clientSize = arrowOffsetParent ? arrowOffsetParent[clientProp] : 0
    if (
      !clientSize ||
      !(await (platform.isElement == null
        ? void 0
        : platform.isElement(arrowOffsetParent)))
    )
      clientSize = elements.floating[clientProp] || rects.floating[length]
    const centerToReference = endDiff / 2 - startDiff / 2
    const largestPossiblePadding =
      clientSize / 2 - arrowDimensions[length] / 2 - 1
    const minPadding = min(paddingObject[minProp], largestPossiblePadding)
    const maxPadding = min(paddingObject[maxProp], largestPossiblePadding)
    const min$1 = minPadding
    const max = clientSize - arrowDimensions[length] - maxPadding
    const center =
      clientSize / 2 - arrowDimensions[length] / 2 + centerToReference
    const offset = clamp(min$1, center, max)
    const shouldAddOffset =
      !middlewareData.arrow &&
      getAlignment(placement) != null &&
      center !== offset &&
      rects.reference[length] / 2 -
        (center < min$1 ? minPadding : maxPadding) -
        arrowDimensions[length] / 2 <
        0
    const alignmentOffset = shouldAddOffset
      ? center < min$1
        ? center - min$1
        : center - max
      : 0
    return {
      [axis]: coords[axis] + alignmentOffset,
      data: {
        [axis]: offset,
        centerOffset: center - offset - alignmentOffset,
        ...(shouldAddOffset && { alignmentOffset })
      },
      reset: shouldAddOffset
    }
  }
})
/**
 * Optimizes the visibility of the floating element by flipping the `placement`
 * in order to keep it in view when the preferred placement(s) will overflow the
 * clipping boundary. Alternative to `autoPlacement`.
 * @see https://floating-ui.com/docs/flip
 */
var flip$2 = function (options) {
  if (options === void 0) options = {}
  return {
    name: 'flip',
    options,
    async fn(state) {
      var _middlewareData$arrow, _middlewareData$flip
      const {
        placement,
        middlewareData,
        rects,
        initialPlacement,
        platform,
        elements
      } = state
      const {
        mainAxis: checkMainAxis = true,
        crossAxis: checkCrossAxis = true,
        fallbackPlacements: specifiedFallbackPlacements,
        fallbackStrategy = 'bestFit',
        fallbackAxisSideDirection = 'none',
        flipAlignment = true,
        ...detectOverflowOptions
      } = evaluate(options, state)
      if (
        (_middlewareData$arrow = middlewareData.arrow) != null &&
        _middlewareData$arrow.alignmentOffset
      )
        return {}
      const side = getSide(placement)
      const initialSideAxis = getSideAxis(initialPlacement)
      const isBasePlacement = getSide(initialPlacement) === initialPlacement
      const rtl = await (platform.isRTL == null
        ? void 0
        : platform.isRTL(elements.floating))
      const fallbackPlacements =
        specifiedFallbackPlacements ||
        (isBasePlacement || !flipAlignment
          ? [getOppositePlacement(initialPlacement)]
          : getExpandedPlacements(initialPlacement))
      const hasFallbackAxisSideDirection = fallbackAxisSideDirection !== 'none'
      if (!specifiedFallbackPlacements && hasFallbackAxisSideDirection)
        fallbackPlacements.push(
          ...getOppositeAxisPlacements(
            initialPlacement,
            flipAlignment,
            fallbackAxisSideDirection,
            rtl
          )
        )
      const placements = [initialPlacement, ...fallbackPlacements]
      const overflow = await platform.detectOverflow(
        state,
        detectOverflowOptions
      )
      const overflows = []
      let overflowsData =
        ((_middlewareData$flip = middlewareData.flip) == null
          ? void 0
          : _middlewareData$flip.overflows) || []
      if (checkMainAxis) overflows.push(overflow[side])
      if (checkCrossAxis) {
        const sides = getAlignmentSides(placement, rects, rtl)
        overflows.push(overflow[sides[0]], overflow[sides[1]])
      }
      overflowsData = [
        ...overflowsData,
        {
          placement,
          overflows
        }
      ]
      if (!overflows.every((side) => side <= 0)) {
        var _middlewareData$flip2, _overflowsData$filter
        const nextIndex =
          (((_middlewareData$flip2 = middlewareData.flip) == null
            ? void 0
            : _middlewareData$flip2.index) || 0) + 1
        const nextPlacement = placements[nextIndex]
        if (nextPlacement) {
          if (
            !(checkCrossAxis === 'alignment'
              ? initialSideAxis !== getSideAxis(nextPlacement)
              : false) ||
            overflowsData.every((d) =>
              getSideAxis(d.placement) === initialSideAxis
                ? d.overflows[0] > 0
                : true
            )
          )
            return {
              data: {
                index: nextIndex,
                overflows: overflowsData
              },
              reset: { placement: nextPlacement }
            }
        }
        let resetPlacement =
          (_overflowsData$filter = overflowsData
            .filter((d) => d.overflows[0] <= 0)
            .sort((a, b) => a.overflows[1] - b.overflows[1])[0]) == null
            ? void 0
            : _overflowsData$filter.placement
        if (!resetPlacement)
          switch (fallbackStrategy) {
            case 'bestFit': {
              var _overflowsData$filter2
              const placement =
                (_overflowsData$filter2 = overflowsData
                  .filter((d) => {
                    if (hasFallbackAxisSideDirection) {
                      const currentSideAxis = getSideAxis(d.placement)
                      return (
                        currentSideAxis === initialSideAxis ||
                        currentSideAxis === 'y'
                      )
                    }
                    return true
                  })
                  .map((d) => [
                    d.placement,
                    d.overflows
                      .filter((overflow) => overflow > 0)
                      .reduce((acc, overflow) => acc + overflow, 0)
                  ])
                  .sort((a, b) => a[1] - b[1])[0]) == null
                  ? void 0
                  : _overflowsData$filter2[0]
              if (placement) resetPlacement = placement
              break
            }
            case 'initialPlacement':
              resetPlacement = initialPlacement
              break
          }
        if (placement !== resetPlacement)
          return { reset: { placement: resetPlacement } }
      }
      return {}
    }
  }
}
function getSideOffsets(overflow, rect) {
  return {
    top: overflow.top - rect.height,
    right: overflow.right - rect.width,
    bottom: overflow.bottom - rect.height,
    left: overflow.left - rect.width
  }
}
function isAnySideFullyClipped(overflow) {
  return sides.some((side) => overflow[side] >= 0)
}
/**
 * Provides data to hide the floating element in applicable situations, such as
 * when it is not in the same clipping context as the reference element.
 * @see https://floating-ui.com/docs/hide
 */
var hide$3 = function (options) {
  if (options === void 0) options = {}
  return {
    name: 'hide',
    options,
    async fn(state) {
      const { rects, platform } = state
      const { strategy = 'referenceHidden', ...detectOverflowOptions } =
        evaluate(options, state)
      switch (strategy) {
        case 'referenceHidden': {
          const offsets = getSideOffsets(
            await platform.detectOverflow(state, {
              ...detectOverflowOptions,
              elementContext: 'reference'
            }),
            rects.reference
          )
          return {
            data: {
              referenceHiddenOffsets: offsets,
              referenceHidden: isAnySideFullyClipped(offsets)
            }
          }
        }
        case 'escaped': {
          const offsets = getSideOffsets(
            await platform.detectOverflow(state, {
              ...detectOverflowOptions,
              altBoundary: true
            }),
            rects.floating
          )
          return {
            data: {
              escapedOffsets: offsets,
              escaped: isAnySideFullyClipped(offsets)
            }
          }
        }
        default:
          return {}
      }
    }
  }
}
var originSides = /* @__PURE__ */ new Set(['left', 'top'])
async function convertValueToCoords(state, options) {
  const { placement, platform, elements } = state
  const rtl = await (platform.isRTL == null
    ? void 0
    : platform.isRTL(elements.floating))
  const side = getSide(placement)
  const alignment = getAlignment(placement)
  const isVertical = getSideAxis(placement) === 'y'
  const mainAxisMulti = originSides.has(side) ? -1 : 1
  const crossAxisMulti = rtl && isVertical ? -1 : 1
  const rawValue = evaluate(options, state)
  let { mainAxis, crossAxis, alignmentAxis } =
    typeof rawValue === 'number'
      ? {
          mainAxis: rawValue,
          crossAxis: 0,
          alignmentAxis: null
        }
      : {
          mainAxis: rawValue.mainAxis || 0,
          crossAxis: rawValue.crossAxis || 0,
          alignmentAxis: rawValue.alignmentAxis
        }
  if (alignment && typeof alignmentAxis === 'number')
    crossAxis = alignment === 'end' ? alignmentAxis * -1 : alignmentAxis
  return isVertical
    ? {
        x: crossAxis * crossAxisMulti,
        y: mainAxis * mainAxisMulti
      }
    : {
        x: mainAxis * mainAxisMulti,
        y: crossAxis * crossAxisMulti
      }
}
/**
 * Modifies the placement by translating the floating element along the
 * specified axes.
 * A number (shorthand for `mainAxis` or distance), or an axes configuration
 * object may be passed.
 * @see https://floating-ui.com/docs/offset
 */
var offset$2 = function (options) {
  if (options === void 0) options = 0
  return {
    name: 'offset',
    options,
    async fn(state) {
      var _middlewareData$offse, _middlewareData$arrow
      const { x, y, placement, middlewareData } = state
      const diffCoords = await convertValueToCoords(state, options)
      if (
        placement ===
          ((_middlewareData$offse = middlewareData.offset) == null
            ? void 0
            : _middlewareData$offse.placement) &&
        (_middlewareData$arrow = middlewareData.arrow) != null &&
        _middlewareData$arrow.alignmentOffset
      )
        return {}
      return {
        x: x + diffCoords.x,
        y: y + diffCoords.y,
        data: {
          ...diffCoords,
          placement
        }
      }
    }
  }
}
/**
 * Optimizes the visibility of the floating element by shifting it in order to
 * keep it in view when it will overflow the clipping boundary.
 * @see https://floating-ui.com/docs/shift
 */
var shift$2 = function (options) {
  if (options === void 0) options = {}
  return {
    name: 'shift',
    options,
    async fn(state) {
      const { x, y, placement, platform } = state
      const {
        mainAxis: checkMainAxis = true,
        crossAxis: checkCrossAxis = false,
        limiter = {
          fn: (_ref) => {
            let { x, y } = _ref
            return {
              x,
              y
            }
          }
        },
        ...detectOverflowOptions
      } = evaluate(options, state)
      const coords = {
        x,
        y
      }
      const overflow = await platform.detectOverflow(
        state,
        detectOverflowOptions
      )
      const crossAxis = getSideAxis(getSide(placement))
      const mainAxis = getOppositeAxis(crossAxis)
      let mainAxisCoord = coords[mainAxis]
      let crossAxisCoord = coords[crossAxis]
      if (checkMainAxis) {
        const minSide = mainAxis === 'y' ? 'top' : 'left'
        const maxSide = mainAxis === 'y' ? 'bottom' : 'right'
        const min = mainAxisCoord + overflow[minSide]
        const max = mainAxisCoord - overflow[maxSide]
        mainAxisCoord = clamp(min, mainAxisCoord, max)
      }
      if (checkCrossAxis) {
        const minSide = crossAxis === 'y' ? 'top' : 'left'
        const maxSide = crossAxis === 'y' ? 'bottom' : 'right'
        const min = crossAxisCoord + overflow[minSide]
        const max = crossAxisCoord - overflow[maxSide]
        crossAxisCoord = clamp(min, crossAxisCoord, max)
      }
      const limitedCoords = limiter.fn({
        ...state,
        [mainAxis]: mainAxisCoord,
        [crossAxis]: crossAxisCoord
      })
      return {
        ...limitedCoords,
        data: {
          x: limitedCoords.x - x,
          y: limitedCoords.y - y,
          enabled: {
            [mainAxis]: checkMainAxis,
            [crossAxis]: checkCrossAxis
          }
        }
      }
    }
  }
}
/**
 * Built-in `limiter` that will stop `shift()` at a certain point.
 */
var limitShift$2 = function (options) {
  if (options === void 0) options = {}
  return {
    options,
    fn(state) {
      const { x, y, placement, rects, middlewareData } = state
      const {
        offset = 0,
        mainAxis: checkMainAxis = true,
        crossAxis: checkCrossAxis = true
      } = evaluate(options, state)
      const coords = {
        x,
        y
      }
      const crossAxis = getSideAxis(placement)
      const mainAxis = getOppositeAxis(crossAxis)
      let mainAxisCoord = coords[mainAxis]
      let crossAxisCoord = coords[crossAxis]
      const rawOffset = evaluate(offset, state)
      const computedOffset =
        typeof rawOffset === 'number'
          ? {
              mainAxis: rawOffset,
              crossAxis: 0
            }
          : {
              mainAxis: 0,
              crossAxis: 0,
              ...rawOffset
            }
      if (checkMainAxis) {
        const len = mainAxis === 'y' ? 'height' : 'width'
        const limitMin =
          rects.reference[mainAxis] -
          rects.floating[len] +
          computedOffset.mainAxis
        const limitMax =
          rects.reference[mainAxis] +
          rects.reference[len] -
          computedOffset.mainAxis
        if (mainAxisCoord < limitMin) mainAxisCoord = limitMin
        else if (mainAxisCoord > limitMax) mainAxisCoord = limitMax
      }
      if (checkCrossAxis) {
        var _middlewareData$offse, _middlewareData$offse2
        const len = mainAxis === 'y' ? 'width' : 'height'
        const isOriginSide = originSides.has(getSide(placement))
        const limitMin =
          rects.reference[crossAxis] -
          rects.floating[len] +
          (isOriginSide
            ? ((_middlewareData$offse = middlewareData.offset) == null
                ? void 0
                : _middlewareData$offse[crossAxis]) || 0
            : 0) +
          (isOriginSide ? 0 : computedOffset.crossAxis)
        const limitMax =
          rects.reference[crossAxis] +
          rects.reference[len] +
          (isOriginSide
            ? 0
            : ((_middlewareData$offse2 = middlewareData.offset) == null
                ? void 0
                : _middlewareData$offse2[crossAxis]) || 0) -
          (isOriginSide ? computedOffset.crossAxis : 0)
        if (crossAxisCoord < limitMin) crossAxisCoord = limitMin
        else if (crossAxisCoord > limitMax) crossAxisCoord = limitMax
      }
      return {
        [mainAxis]: mainAxisCoord,
        [crossAxis]: crossAxisCoord
      }
    }
  }
}
/**
 * Provides data that allows you to change the size of the floating element —
 * for instance, prevent it from overflowing the clipping boundary or match the
 * width of the reference element.
 * @see https://floating-ui.com/docs/size
 */
var size$2 = function (options) {
  if (options === void 0) options = {}
  return {
    name: 'size',
    options,
    async fn(state) {
      var _state$middlewareData, _state$middlewareData2
      const { placement, rects, platform, elements } = state
      const { apply = () => {}, ...detectOverflowOptions } = evaluate(
        options,
        state
      )
      const overflow = await platform.detectOverflow(
        state,
        detectOverflowOptions
      )
      const side = getSide(placement)
      const alignment = getAlignment(placement)
      const isYAxis = getSideAxis(placement) === 'y'
      const { width, height } = rects.floating
      let heightSide
      let widthSide
      if (side === 'top' || side === 'bottom') {
        heightSide = side
        widthSide =
          alignment ===
          ((await (platform.isRTL == null
            ? void 0
            : platform.isRTL(elements.floating)))
            ? 'start'
            : 'end')
            ? 'left'
            : 'right'
      } else {
        widthSide = side
        heightSide = alignment === 'end' ? 'top' : 'bottom'
      }
      const maximumClippingHeight = height - overflow.top - overflow.bottom
      const maximumClippingWidth = width - overflow.left - overflow.right
      const overflowAvailableHeight = min(
        height - overflow[heightSide],
        maximumClippingHeight
      )
      const overflowAvailableWidth = min(
        width - overflow[widthSide],
        maximumClippingWidth
      )
      const noShift = !state.middlewareData.shift
      let availableHeight = overflowAvailableHeight
      let availableWidth = overflowAvailableWidth
      if (
        (_state$middlewareData = state.middlewareData.shift) != null &&
        _state$middlewareData.enabled.x
      )
        availableWidth = maximumClippingWidth
      if (
        (_state$middlewareData2 = state.middlewareData.shift) != null &&
        _state$middlewareData2.enabled.y
      )
        availableHeight = maximumClippingHeight
      if (noShift && !alignment) {
        const xMin = max(overflow.left, 0)
        const xMax = max(overflow.right, 0)
        const yMin = max(overflow.top, 0)
        const yMax = max(overflow.bottom, 0)
        if (isYAxis)
          availableWidth =
            width -
            2 *
              (xMin !== 0 || xMax !== 0
                ? xMin + xMax
                : max(overflow.left, overflow.right))
        else
          availableHeight =
            height -
            2 *
              (yMin !== 0 || yMax !== 0
                ? yMin + yMax
                : max(overflow.top, overflow.bottom))
      }
      await apply({
        ...state,
        availableWidth,
        availableHeight
      })
      const nextDimensions = await platform.getDimensions(elements.floating)
      if (width !== nextDimensions.width || height !== nextDimensions.height)
        return { reset: { rects: true } }
      return {}
    }
  }
}
//#endregion
//#region node_modules/@floating-ui/utils/dist/floating-ui.utils.dom.mjs
function hasWindow() {
  return typeof window !== 'undefined'
}
function getNodeName(node) {
  if (isNode(node)) return (node.nodeName || '').toLowerCase()
  return '#document'
}
function getWindow(node) {
  var _node$ownerDocument
  return (
    (node == null || (_node$ownerDocument = node.ownerDocument) == null
      ? void 0
      : _node$ownerDocument.defaultView) || window
  )
}
function getDocumentElement(node) {
  var _ref
  return (_ref =
    (isNode(node) ? node.ownerDocument : node.document) || window.document) ==
    null
    ? void 0
    : _ref.documentElement
}
function isNode(value) {
  if (!hasWindow()) return false
  return value instanceof Node || value instanceof getWindow(value).Node
}
function isElement(value) {
  if (!hasWindow()) return false
  return value instanceof Element || value instanceof getWindow(value).Element
}
function isHTMLElement(value) {
  if (!hasWindow()) return false
  return (
    value instanceof HTMLElement ||
    value instanceof getWindow(value).HTMLElement
  )
}
function isShadowRoot(value) {
  if (!hasWindow() || typeof ShadowRoot === 'undefined') return false
  return (
    value instanceof ShadowRoot || value instanceof getWindow(value).ShadowRoot
  )
}
function isOverflowElement(element) {
  const { overflow, overflowX, overflowY, display } =
    getComputedStyle$1(element)
  return (
    /auto|scroll|overlay|hidden|clip/.test(overflow + overflowY + overflowX) &&
    display !== 'inline' &&
    display !== 'contents'
  )
}
function isTableElement(element) {
  return /^(table|td|th)$/.test(getNodeName(element))
}
function isTopLayer(element) {
  try {
    if (element.matches(':popover-open')) return true
  } catch (_e) {}
  try {
    return element.matches(':modal')
  } catch (_e) {
    return false
  }
}
var willChangeRe = /transform|translate|scale|rotate|perspective|filter/
var containRe = /paint|layout|strict|content/
var isNotNone = (value) => !!value && value !== 'none'
var isWebKitValue
function isContainingBlock(elementOrCss) {
  const css = isElement(elementOrCss)
    ? getComputedStyle$1(elementOrCss)
    : elementOrCss
  return (
    isNotNone(css.transform) ||
    isNotNone(css.translate) ||
    isNotNone(css.scale) ||
    isNotNone(css.rotate) ||
    isNotNone(css.perspective) ||
    (!isWebKit() && (isNotNone(css.backdropFilter) || isNotNone(css.filter))) ||
    willChangeRe.test(css.willChange || '') ||
    containRe.test(css.contain || '')
  )
}
function getContainingBlock(element) {
  let currentNode = getParentNode(element)
  while (isHTMLElement(currentNode) && !isLastTraversableNode(currentNode)) {
    if (isContainingBlock(currentNode)) return currentNode
    else if (isTopLayer(currentNode)) return null
    currentNode = getParentNode(currentNode)
  }
  return null
}
function isWebKit() {
  if (isWebKitValue == null)
    isWebKitValue =
      typeof CSS !== 'undefined' &&
      CSS.supports &&
      CSS.supports('-webkit-backdrop-filter', 'none')
  return isWebKitValue
}
function isLastTraversableNode(node) {
  return /^(html|body|#document)$/.test(getNodeName(node))
}
function getComputedStyle$1(element) {
  return getWindow(element).getComputedStyle(element)
}
function getNodeScroll(element) {
  if (isElement(element))
    return {
      scrollLeft: element.scrollLeft,
      scrollTop: element.scrollTop
    }
  return {
    scrollLeft: element.scrollX,
    scrollTop: element.scrollY
  }
}
function getParentNode(node) {
  if (getNodeName(node) === 'html') return node
  const result =
    node.assignedSlot ||
    node.parentNode ||
    (isShadowRoot(node) && node.host) ||
    getDocumentElement(node)
  return isShadowRoot(result) ? result.host : result
}
function getNearestOverflowAncestor(node) {
  const parentNode = getParentNode(node)
  if (isLastTraversableNode(parentNode))
    return node.ownerDocument ? node.ownerDocument.body : node.body
  if (isHTMLElement(parentNode) && isOverflowElement(parentNode))
    return parentNode
  return getNearestOverflowAncestor(parentNode)
}
function getOverflowAncestors(node, list, traverseIframes) {
  var _node$ownerDocument2
  if (list === void 0) list = []
  if (traverseIframes === void 0) traverseIframes = true
  const scrollableAncestor = getNearestOverflowAncestor(node)
  const isBody =
    scrollableAncestor ===
    ((_node$ownerDocument2 = node.ownerDocument) == null
      ? void 0
      : _node$ownerDocument2.body)
  const win = getWindow(scrollableAncestor)
  if (isBody) {
    const frameElement = getFrameElement(win)
    return list.concat(
      win,
      win.visualViewport || [],
      isOverflowElement(scrollableAncestor) ? scrollableAncestor : [],
      frameElement && traverseIframes ? getOverflowAncestors(frameElement) : []
    )
  } else
    return list.concat(
      scrollableAncestor,
      getOverflowAncestors(scrollableAncestor, [], traverseIframes)
    )
}
function getFrameElement(win) {
  return win.parent && Object.getPrototypeOf(win.parent)
    ? win.frameElement
    : null
}
//#endregion
//#region node_modules/@floating-ui/dom/dist/floating-ui.dom.mjs
function getCssDimensions(element) {
  const css = getComputedStyle$1(element)
  let width = parseFloat(css.width) || 0
  let height = parseFloat(css.height) || 0
  const hasOffset = isHTMLElement(element)
  const offsetWidth = hasOffset ? element.offsetWidth : width
  const offsetHeight = hasOffset ? element.offsetHeight : height
  const shouldFallback =
    round(width) !== offsetWidth || round(height) !== offsetHeight
  if (shouldFallback) {
    width = offsetWidth
    height = offsetHeight
  }
  return {
    width,
    height,
    $: shouldFallback
  }
}
function unwrapElement(element) {
  return !isElement(element) ? element.contextElement : element
}
function getScale(element) {
  const domElement = unwrapElement(element)
  if (!isHTMLElement(domElement)) return createCoords(1)
  const rect = domElement.getBoundingClientRect()
  const { width, height, $ } = getCssDimensions(domElement)
  let x = ($ ? round(rect.width) : rect.width) / width
  let y = ($ ? round(rect.height) : rect.height) / height
  if (!x || !Number.isFinite(x)) x = 1
  if (!y || !Number.isFinite(y)) y = 1
  return {
    x,
    y
  }
}
var noOffsets = /* @__PURE__ */ createCoords(0)
function getVisualOffsets(element) {
  const win = getWindow(element)
  if (!isWebKit() || !win.visualViewport) return noOffsets
  return {
    x: win.visualViewport.offsetLeft,
    y: win.visualViewport.offsetTop
  }
}
function shouldAddVisualOffsets(element, isFixed, floatingOffsetParent) {
  if (isFixed === void 0) isFixed = false
  if (
    !floatingOffsetParent ||
    (isFixed && floatingOffsetParent !== getWindow(element))
  )
    return false
  return isFixed
}
function getBoundingClientRect(
  element,
  includeScale,
  isFixedStrategy,
  offsetParent
) {
  if (includeScale === void 0) includeScale = false
  if (isFixedStrategy === void 0) isFixedStrategy = false
  const clientRect = element.getBoundingClientRect()
  const domElement = unwrapElement(element)
  let scale = createCoords(1)
  if (includeScale)
    if (offsetParent) {
      if (isElement(offsetParent)) scale = getScale(offsetParent)
    } else scale = getScale(element)
  const visualOffsets = shouldAddVisualOffsets(
    domElement,
    isFixedStrategy,
    offsetParent
  )
    ? getVisualOffsets(domElement)
    : createCoords(0)
  let x = (clientRect.left + visualOffsets.x) / scale.x
  let y = (clientRect.top + visualOffsets.y) / scale.y
  let width = clientRect.width / scale.x
  let height = clientRect.height / scale.y
  if (domElement) {
    const win = getWindow(domElement)
    const offsetWin =
      offsetParent && isElement(offsetParent)
        ? getWindow(offsetParent)
        : offsetParent
    let currentWin = win
    let currentIFrame = getFrameElement(currentWin)
    while (currentIFrame && offsetParent && offsetWin !== currentWin) {
      const iframeScale = getScale(currentIFrame)
      const iframeRect = currentIFrame.getBoundingClientRect()
      const css = getComputedStyle$1(currentIFrame)
      const left =
        iframeRect.left +
        (currentIFrame.clientLeft + parseFloat(css.paddingLeft)) * iframeScale.x
      const top =
        iframeRect.top +
        (currentIFrame.clientTop + parseFloat(css.paddingTop)) * iframeScale.y
      x *= iframeScale.x
      y *= iframeScale.y
      width *= iframeScale.x
      height *= iframeScale.y
      x += left
      y += top
      currentWin = getWindow(currentIFrame)
      currentIFrame = getFrameElement(currentWin)
    }
  }
  return rectToClientRect({
    width,
    height,
    x,
    y
  })
}
function getWindowScrollBarX(element, rect) {
  const leftScroll = getNodeScroll(element).scrollLeft
  if (!rect)
    return getBoundingClientRect(getDocumentElement(element)).left + leftScroll
  return rect.left + leftScroll
}
function getHTMLOffset(documentElement, scroll) {
  const htmlRect = documentElement.getBoundingClientRect()
  return {
    x:
      htmlRect.left +
      scroll.scrollLeft -
      getWindowScrollBarX(documentElement, htmlRect),
    y: htmlRect.top + scroll.scrollTop
  }
}
function convertOffsetParentRelativeRectToViewportRelativeRect(_ref) {
  let { elements, rect, offsetParent, strategy } = _ref
  const isFixed = strategy === 'fixed'
  const documentElement = getDocumentElement(offsetParent)
  const topLayer = elements ? isTopLayer(elements.floating) : false
  if (offsetParent === documentElement || (topLayer && isFixed)) return rect
  let scroll = {
    scrollLeft: 0,
    scrollTop: 0
  }
  let scale = createCoords(1)
  const offsets = createCoords(0)
  const isOffsetParentAnElement = isHTMLElement(offsetParent)
  if (isOffsetParentAnElement || (!isOffsetParentAnElement && !isFixed)) {
    if (
      getNodeName(offsetParent) !== 'body' ||
      isOverflowElement(documentElement)
    )
      scroll = getNodeScroll(offsetParent)
    if (isOffsetParentAnElement) {
      const offsetRect = getBoundingClientRect(offsetParent)
      scale = getScale(offsetParent)
      offsets.x = offsetRect.x + offsetParent.clientLeft
      offsets.y = offsetRect.y + offsetParent.clientTop
    }
  }
  const htmlOffset =
    documentElement && !isOffsetParentAnElement && !isFixed
      ? getHTMLOffset(documentElement, scroll)
      : createCoords(0)
  return {
    width: rect.width * scale.x,
    height: rect.height * scale.y,
    x:
      rect.x * scale.x - scroll.scrollLeft * scale.x + offsets.x + htmlOffset.x,
    y: rect.y * scale.y - scroll.scrollTop * scale.y + offsets.y + htmlOffset.y
  }
}
function getClientRects(element) {
  return Array.from(element.getClientRects())
}
function getDocumentRect(element) {
  const html = getDocumentElement(element)
  const scroll = getNodeScroll(element)
  const body = element.ownerDocument.body
  const width = max(
    html.scrollWidth,
    html.clientWidth,
    body.scrollWidth,
    body.clientWidth
  )
  const height = max(
    html.scrollHeight,
    html.clientHeight,
    body.scrollHeight,
    body.clientHeight
  )
  let x = -scroll.scrollLeft + getWindowScrollBarX(element)
  const y = -scroll.scrollTop
  if (getComputedStyle$1(body).direction === 'rtl')
    x += max(html.clientWidth, body.clientWidth) - width
  return {
    width,
    height,
    x,
    y
  }
}
var SCROLLBAR_MAX = 25
function getViewportRect(element, strategy) {
  const win = getWindow(element)
  const html = getDocumentElement(element)
  const visualViewport = win.visualViewport
  let width = html.clientWidth
  let height = html.clientHeight
  let x = 0
  let y = 0
  if (visualViewport) {
    width = visualViewport.width
    height = visualViewport.height
    const visualViewportBased = isWebKit()
    if (!visualViewportBased || (visualViewportBased && strategy === 'fixed')) {
      x = visualViewport.offsetLeft
      y = visualViewport.offsetTop
    }
  }
  const windowScrollbarX = getWindowScrollBarX(html)
  if (windowScrollbarX <= 0) {
    const doc = html.ownerDocument
    const body = doc.body
    const bodyStyles = getComputedStyle(body)
    const bodyMarginInline =
      doc.compatMode === 'CSS1Compat'
        ? parseFloat(bodyStyles.marginLeft) +
            parseFloat(bodyStyles.marginRight) || 0
        : 0
    const clippingStableScrollbarWidth = Math.abs(
      html.clientWidth - body.clientWidth - bodyMarginInline
    )
    if (clippingStableScrollbarWidth <= SCROLLBAR_MAX)
      width -= clippingStableScrollbarWidth
  } else if (windowScrollbarX <= SCROLLBAR_MAX) width += windowScrollbarX
  return {
    width,
    height,
    x,
    y
  }
}
function getInnerBoundingClientRect(element, strategy) {
  const clientRect = getBoundingClientRect(element, true, strategy === 'fixed')
  const top = clientRect.top + element.clientTop
  const left = clientRect.left + element.clientLeft
  const scale = isHTMLElement(element) ? getScale(element) : createCoords(1)
  return {
    width: element.clientWidth * scale.x,
    height: element.clientHeight * scale.y,
    x: left * scale.x,
    y: top * scale.y
  }
}
function getClientRectFromClippingAncestor(
  element,
  clippingAncestor,
  strategy
) {
  let rect
  if (clippingAncestor === 'viewport') rect = getViewportRect(element, strategy)
  else if (clippingAncestor === 'document')
    rect = getDocumentRect(getDocumentElement(element))
  else if (isElement(clippingAncestor))
    rect = getInnerBoundingClientRect(clippingAncestor, strategy)
  else {
    const visualOffsets = getVisualOffsets(element)
    rect = {
      x: clippingAncestor.x - visualOffsets.x,
      y: clippingAncestor.y - visualOffsets.y,
      width: clippingAncestor.width,
      height: clippingAncestor.height
    }
  }
  return rectToClientRect(rect)
}
function hasFixedPositionAncestor(element, stopNode) {
  const parentNode = getParentNode(element)
  if (
    parentNode === stopNode ||
    !isElement(parentNode) ||
    isLastTraversableNode(parentNode)
  )
    return false
  return (
    getComputedStyle$1(parentNode).position === 'fixed' ||
    hasFixedPositionAncestor(parentNode, stopNode)
  )
}
function getClippingElementAncestors(element, cache) {
  const cachedResult = cache.get(element)
  if (cachedResult) return cachedResult
  let result = getOverflowAncestors(element, [], false).filter(
    (el) => isElement(el) && getNodeName(el) !== 'body'
  )
  let currentContainingBlockComputedStyle = null
  const elementIsFixed = getComputedStyle$1(element).position === 'fixed'
  let currentNode = elementIsFixed ? getParentNode(element) : element
  while (isElement(currentNode) && !isLastTraversableNode(currentNode)) {
    const computedStyle = getComputedStyle$1(currentNode)
    const currentNodeIsContaining = isContainingBlock(currentNode)
    if (!currentNodeIsContaining && computedStyle.position === 'fixed')
      currentContainingBlockComputedStyle = null
    if (
      elementIsFixed
        ? !currentNodeIsContaining && !currentContainingBlockComputedStyle
        : (!currentNodeIsContaining &&
            computedStyle.position === 'static' &&
            !!currentContainingBlockComputedStyle &&
            (currentContainingBlockComputedStyle.position === 'absolute' ||
              currentContainingBlockComputedStyle.position === 'fixed')) ||
          (isOverflowElement(currentNode) &&
            !currentNodeIsContaining &&
            hasFixedPositionAncestor(element, currentNode))
    )
      result = result.filter((ancestor) => ancestor !== currentNode)
    else currentContainingBlockComputedStyle = computedStyle
    currentNode = getParentNode(currentNode)
  }
  cache.set(element, result)
  return result
}
function getClippingRect(_ref) {
  let { element, boundary, rootBoundary, strategy } = _ref
  const clippingAncestors = [
    ...(boundary === 'clippingAncestors'
      ? isTopLayer(element)
        ? []
        : getClippingElementAncestors(element, this._c)
      : [].concat(boundary)),
    rootBoundary
  ]
  const firstRect = getClientRectFromClippingAncestor(
    element,
    clippingAncestors[0],
    strategy
  )
  let top = firstRect.top
  let right = firstRect.right
  let bottom = firstRect.bottom
  let left = firstRect.left
  for (let i = 1; i < clippingAncestors.length; i++) {
    const rect = getClientRectFromClippingAncestor(
      element,
      clippingAncestors[i],
      strategy
    )
    top = max(rect.top, top)
    right = min(rect.right, right)
    bottom = min(rect.bottom, bottom)
    left = max(rect.left, left)
  }
  return {
    width: right - left,
    height: bottom - top,
    x: left,
    y: top
  }
}
function getDimensions(element) {
  const { width, height } = getCssDimensions(element)
  return {
    width,
    height
  }
}
function getRectRelativeToOffsetParent(element, offsetParent, strategy) {
  const isOffsetParentAnElement = isHTMLElement(offsetParent)
  const documentElement = getDocumentElement(offsetParent)
  const isFixed = strategy === 'fixed'
  const rect = getBoundingClientRect(element, true, isFixed, offsetParent)
  let scroll = {
    scrollLeft: 0,
    scrollTop: 0
  }
  const offsets = createCoords(0)
  function setLeftRTLScrollbarOffset() {
    offsets.x = getWindowScrollBarX(documentElement)
  }
  if (isOffsetParentAnElement || (!isOffsetParentAnElement && !isFixed)) {
    if (
      getNodeName(offsetParent) !== 'body' ||
      isOverflowElement(documentElement)
    )
      scroll = getNodeScroll(offsetParent)
    if (isOffsetParentAnElement) {
      const offsetRect = getBoundingClientRect(
        offsetParent,
        true,
        isFixed,
        offsetParent
      )
      offsets.x = offsetRect.x + offsetParent.clientLeft
      offsets.y = offsetRect.y + offsetParent.clientTop
    } else if (documentElement) setLeftRTLScrollbarOffset()
  }
  if (isFixed && !isOffsetParentAnElement && documentElement)
    setLeftRTLScrollbarOffset()
  const htmlOffset =
    documentElement && !isOffsetParentAnElement && !isFixed
      ? getHTMLOffset(documentElement, scroll)
      : createCoords(0)
  return {
    x: rect.left + scroll.scrollLeft - offsets.x - htmlOffset.x,
    y: rect.top + scroll.scrollTop - offsets.y - htmlOffset.y,
    width: rect.width,
    height: rect.height
  }
}
function isStaticPositioned(element) {
  return getComputedStyle$1(element).position === 'static'
}
function getTrueOffsetParent(element, polyfill) {
  if (
    !isHTMLElement(element) ||
    getComputedStyle$1(element).position === 'fixed'
  )
    return null
  if (polyfill) return polyfill(element)
  let rawOffsetParent = element.offsetParent
  if (getDocumentElement(element) === rawOffsetParent)
    rawOffsetParent = rawOffsetParent.ownerDocument.body
  return rawOffsetParent
}
function getOffsetParent(element, polyfill) {
  const win = getWindow(element)
  if (isTopLayer(element)) return win
  if (!isHTMLElement(element)) {
    let svgOffsetParent = getParentNode(element)
    while (svgOffsetParent && !isLastTraversableNode(svgOffsetParent)) {
      if (isElement(svgOffsetParent) && !isStaticPositioned(svgOffsetParent))
        return svgOffsetParent
      svgOffsetParent = getParentNode(svgOffsetParent)
    }
    return win
  }
  let offsetParent = getTrueOffsetParent(element, polyfill)
  while (
    offsetParent &&
    isTableElement(offsetParent) &&
    isStaticPositioned(offsetParent)
  )
    offsetParent = getTrueOffsetParent(offsetParent, polyfill)
  if (
    offsetParent &&
    isLastTraversableNode(offsetParent) &&
    isStaticPositioned(offsetParent) &&
    !isContainingBlock(offsetParent)
  )
    return win
  return offsetParent || getContainingBlock(element) || win
}
var getElementRects = async function (data) {
  const getOffsetParentFn = this.getOffsetParent || getOffsetParent
  const getDimensionsFn = this.getDimensions
  const floatingDimensions = await getDimensionsFn(data.floating)
  return {
    reference: getRectRelativeToOffsetParent(
      data.reference,
      await getOffsetParentFn(data.floating),
      data.strategy
    ),
    floating: {
      x: 0,
      y: 0,
      width: floatingDimensions.width,
      height: floatingDimensions.height
    }
  }
}
function isRTL(element) {
  return getComputedStyle$1(element).direction === 'rtl'
}
var platform$1 = {
  convertOffsetParentRelativeRectToViewportRelativeRect,
  getDocumentElement,
  getClippingRect,
  getOffsetParent,
  getElementRects,
  getClientRects,
  getDimensions,
  getScale,
  isElement,
  isRTL
}
function rectsAreEqual(a, b) {
  return (
    a.x === b.x && a.y === b.y && a.width === b.width && a.height === b.height
  )
}
function observeMove(element, onMove) {
  let io = null
  let timeoutId
  const root = getDocumentElement(element)
  function cleanup() {
    var _io
    clearTimeout(timeoutId)
    ;(_io = io) == null || _io.disconnect()
    io = null
  }
  function refresh(skip, threshold) {
    if (skip === void 0) skip = false
    if (threshold === void 0) threshold = 1
    cleanup()
    const elementRectForRootMargin = element.getBoundingClientRect()
    const { left, top, width, height } = elementRectForRootMargin
    if (!skip) onMove()
    if (!width || !height) return
    const insetTop = floor(top)
    const insetRight = floor(root.clientWidth - (left + width))
    const insetBottom = floor(root.clientHeight - (top + height))
    const insetLeft = floor(left)
    const options = {
      rootMargin:
        -insetTop +
        'px ' +
        -insetRight +
        'px ' +
        -insetBottom +
        'px ' +
        -insetLeft +
        'px',
      threshold: max(0, min(1, threshold)) || 1
    }
    let isFirstUpdate = true
    function handleObserve(entries) {
      const ratio = entries[0].intersectionRatio
      if (ratio !== threshold) {
        if (!isFirstUpdate) return refresh()
        if (!ratio)
          timeoutId = setTimeout(() => {
            refresh(false, 1e-7)
          }, 1e3)
        else refresh(false, ratio)
      }
      if (
        ratio === 1 &&
        !rectsAreEqual(
          elementRectForRootMargin,
          element.getBoundingClientRect()
        )
      )
        refresh()
      isFirstUpdate = false
    }
    try {
      io = new IntersectionObserver(handleObserve, {
        ...options,
        root: root.ownerDocument
      })
    } catch (_e) {
      io = new IntersectionObserver(handleObserve, options)
    }
    io.observe(element)
  }
  refresh(true)
  return cleanup
}
/**
 * Automatically updates the position of the floating element when necessary.
 * Should only be called when the floating element is mounted on the DOM or
 * visible on the screen.
 * @returns cleanup function that should be invoked when the floating element is
 * removed from the DOM or hidden from the screen.
 * @see https://floating-ui.com/docs/autoUpdate
 */
function autoUpdate(reference, floating, update, options) {
  if (options === void 0) options = {}
  const {
    ancestorScroll = true,
    ancestorResize = true,
    elementResize = typeof ResizeObserver === 'function',
    layoutShift = typeof IntersectionObserver === 'function',
    animationFrame = false
  } = options
  const referenceEl = unwrapElement(reference)
  const ancestors =
    ancestorScroll || ancestorResize
      ? [
          ...(referenceEl ? getOverflowAncestors(referenceEl) : []),
          ...(floating ? getOverflowAncestors(floating) : [])
        ]
      : []
  ancestors.forEach((ancestor) => {
    ancestorScroll &&
      ancestor.addEventListener('scroll', update, { passive: true })
    ancestorResize && ancestor.addEventListener('resize', update)
  })
  const cleanupIo =
    referenceEl && layoutShift ? observeMove(referenceEl, update) : null
  let reobserveFrame = -1
  let resizeObserver = null
  if (elementResize) {
    resizeObserver = new ResizeObserver((_ref) => {
      let [firstEntry] = _ref
      if (
        firstEntry &&
        firstEntry.target === referenceEl &&
        resizeObserver &&
        floating
      ) {
        resizeObserver.unobserve(floating)
        cancelAnimationFrame(reobserveFrame)
        reobserveFrame = requestAnimationFrame(() => {
          var _resizeObserver
          ;(_resizeObserver = resizeObserver) == null ||
            _resizeObserver.observe(floating)
        })
      }
      update()
    })
    if (referenceEl && !animationFrame) resizeObserver.observe(referenceEl)
    if (floating) resizeObserver.observe(floating)
  }
  let frameId
  let prevRefRect = animationFrame ? getBoundingClientRect(reference) : null
  if (animationFrame) frameLoop()
  function frameLoop() {
    const nextRefRect = getBoundingClientRect(reference)
    if (prevRefRect && !rectsAreEqual(prevRefRect, nextRefRect)) update()
    prevRefRect = nextRefRect
    frameId = requestAnimationFrame(frameLoop)
  }
  update()
  return () => {
    var _resizeObserver2
    ancestors.forEach((ancestor) => {
      ancestorScroll && ancestor.removeEventListener('scroll', update)
      ancestorResize && ancestor.removeEventListener('resize', update)
    })
    cleanupIo?.()
    ;(_resizeObserver2 = resizeObserver) == null ||
      _resizeObserver2.disconnect()
    resizeObserver = null
    if (animationFrame) cancelAnimationFrame(frameId)
  }
}
/**
 * Modifies the placement by translating the floating element along the
 * specified axes.
 * A number (shorthand for `mainAxis` or distance), or an axes configuration
 * object may be passed.
 * @see https://floating-ui.com/docs/offset
 */
var offset$1 = offset$2
/**
 * Optimizes the visibility of the floating element by shifting it in order to
 * keep it in view when it will overflow the clipping boundary.
 * @see https://floating-ui.com/docs/shift
 */
var shift$1 = shift$2
/**
 * Optimizes the visibility of the floating element by flipping the `placement`
 * in order to keep it in view when the preferred placement(s) will overflow the
 * clipping boundary. Alternative to `autoPlacement`.
 * @see https://floating-ui.com/docs/flip
 */
var flip$1 = flip$2
/**
 * Provides data that allows you to change the size of the floating element —
 * for instance, prevent it from overflowing the clipping boundary or match the
 * width of the reference element.
 * @see https://floating-ui.com/docs/size
 */
var size$1 = size$2
/**
 * Provides data to hide the floating element in applicable situations, such as
 * when it is not in the same clipping context as the reference element.
 * @see https://floating-ui.com/docs/hide
 */
var hide$2 = hide$3
/**
 * Provides data to position an inner element of the floating element so that it
 * appears centered to the reference element.
 * @see https://floating-ui.com/docs/arrow
 */
var arrow$3 = arrow$4
/**
 * Built-in `limiter` that will stop `shift()` at a certain point.
 */
var limitShift$1 = limitShift$2
/**
 * Computes the `x` and `y` coordinates that will place the floating element
 * next to a given reference element.
 */
var computePosition = (reference, floating, options) => {
  const cache = /* @__PURE__ */ new Map()
  const mergedOptions = {
    platform: platform$1,
    ...options
  }
  const platformWithCache = {
    ...mergedOptions.platform,
    _c: cache
  }
  return computePosition$1(reference, floating, {
    ...mergedOptions,
    platform: platformWithCache
  })
}
//#endregion
//#region node_modules/@floating-ui/react-dom/dist/floating-ui.react-dom.mjs
var index =
  typeof document !== 'undefined'
    ? import_react.useLayoutEffect
    : function noop() {}
function deepEqual(a, b) {
  if (a === b) return true
  if (typeof a !== typeof b) return false
  if (typeof a === 'function' && a.toString() === b.toString()) return true
  let length
  let i
  let keys
  if (a && b && typeof a === 'object') {
    if (Array.isArray(a)) {
      length = a.length
      if (length !== b.length) return false
      for (i = length; i-- !== 0; ) if (!deepEqual(a[i], b[i])) return false
      return true
    }
    keys = Object.keys(a)
    length = keys.length
    if (length !== Object.keys(b).length) return false
    for (i = length; i-- !== 0; )
      if (!{}.hasOwnProperty.call(b, keys[i])) return false
    for (i = length; i-- !== 0; ) {
      const key = keys[i]
      if (key === '_owner' && a.$$typeof) continue
      if (!deepEqual(a[key], b[key])) return false
    }
    return true
  }
  return a !== a && b !== b
}
function getDPR(element) {
  if (typeof window === 'undefined') return 1
  return (element.ownerDocument.defaultView || window).devicePixelRatio || 1
}
function roundByDPR(element, value) {
  const dpr = getDPR(element)
  return Math.round(value * dpr) / dpr
}
function useLatestRef(value) {
  const ref = import_react.useRef(value)
  index(() => {
    ref.current = value
  })
  return ref
}
/**
 * Provides data to position a floating element.
 * @see https://floating-ui.com/docs/useFloating
 */
function useFloating$1(options) {
  if (options === void 0) options = {}
  const {
    placement = 'bottom',
    strategy = 'absolute',
    middleware = [],
    platform,
    elements: { reference: externalReference, floating: externalFloating } = {},
    transform = true,
    whileElementsMounted,
    open
  } = options
  const [data, setData] = import_react.useState({
    x: 0,
    y: 0,
    strategy,
    placement,
    middlewareData: {},
    isPositioned: false
  })
  const [latestMiddleware, setLatestMiddleware] =
    import_react.useState(middleware)
  if (!deepEqual(latestMiddleware, middleware)) setLatestMiddleware(middleware)
  const [_reference, _setReference] = import_react.useState(null)
  const [_floating, _setFloating] = import_react.useState(null)
  const setReference = import_react.useCallback((node) => {
    if (node !== referenceRef.current) {
      referenceRef.current = node
      _setReference(node)
    }
  }, [])
  const setFloating = import_react.useCallback((node) => {
    if (node !== floatingRef.current) {
      floatingRef.current = node
      _setFloating(node)
    }
  }, [])
  const referenceEl = externalReference || _reference
  const floatingEl = externalFloating || _floating
  const referenceRef = import_react.useRef(null)
  const floatingRef = import_react.useRef(null)
  const dataRef = import_react.useRef(data)
  const hasWhileElementsMounted = whileElementsMounted != null
  const whileElementsMountedRef = useLatestRef(whileElementsMounted)
  const platformRef = useLatestRef(platform)
  const openRef = useLatestRef(open)
  const update = import_react.useCallback(() => {
    if (!referenceRef.current || !floatingRef.current) return
    const config = {
      placement,
      strategy,
      middleware: latestMiddleware
    }
    if (platformRef.current) config.platform = platformRef.current
    computePosition(referenceRef.current, floatingRef.current, config).then(
      (data) => {
        const fullData = {
          ...data,
          isPositioned: openRef.current !== false
        }
        if (isMountedRef.current && !deepEqual(dataRef.current, fullData)) {
          dataRef.current = fullData
          import_react_dom.flushSync(() => {
            setData(fullData)
          })
        }
      }
    )
  }, [latestMiddleware, placement, strategy, platformRef, openRef])
  index(() => {
    if (open === false && dataRef.current.isPositioned) {
      dataRef.current.isPositioned = false
      setData((data) => ({
        ...data,
        isPositioned: false
      }))
    }
  }, [open])
  const isMountedRef = import_react.useRef(false)
  index(() => {
    isMountedRef.current = true
    return () => {
      isMountedRef.current = false
    }
  }, [])
  index(() => {
    if (referenceEl) referenceRef.current = referenceEl
    if (floatingEl) floatingRef.current = floatingEl
    if (referenceEl && floatingEl) {
      if (whileElementsMountedRef.current)
        return whileElementsMountedRef.current(referenceEl, floatingEl, update)
      update()
    }
  }, [
    referenceEl,
    floatingEl,
    update,
    whileElementsMountedRef,
    hasWhileElementsMounted
  ])
  const refs = import_react.useMemo(
    () => ({
      reference: referenceRef,
      floating: floatingRef,
      setReference,
      setFloating
    }),
    [setReference, setFloating]
  )
  const elements = import_react.useMemo(
    () => ({
      reference: referenceEl,
      floating: floatingEl
    }),
    [referenceEl, floatingEl]
  )
  const floatingStyles = import_react.useMemo(() => {
    const initialStyles = {
      position: strategy,
      left: 0,
      top: 0
    }
    if (!elements.floating) return initialStyles
    const x = roundByDPR(elements.floating, data.x)
    const y = roundByDPR(elements.floating, data.y)
    if (transform)
      return {
        ...initialStyles,
        transform: 'translate(' + x + 'px, ' + y + 'px)',
        ...(getDPR(elements.floating) >= 1.5 && { willChange: 'transform' })
      }
    return {
      position: strategy,
      left: x,
      top: y
    }
  }, [strategy, transform, elements.floating, data.x, data.y])
  return import_react.useMemo(
    () => ({
      ...data,
      update,
      refs,
      elements,
      floatingStyles
    }),
    [data, update, refs, elements, floatingStyles]
  )
}
/**
 * Provides data to position an inner element of the floating element so that it
 * appears centered to the reference element.
 * This wraps the core `arrow` middleware to allow React refs as the element.
 * @see https://floating-ui.com/docs/arrow
 */
var arrow$1 = (options) => {
  function isRef(value) {
    return {}.hasOwnProperty.call(value, 'current')
  }
  return {
    name: 'arrow',
    options,
    fn(state) {
      const { element, padding } =
        typeof options === 'function' ? options(state) : options
      if (element && isRef(element)) {
        if (element.current != null)
          return arrow$3({
            element: element.current,
            padding
          }).fn(state)
        return {}
      }
      if (element)
        return arrow$3({
          element,
          padding
        }).fn(state)
      return {}
    }
  }
}
/**
 * Modifies the placement by translating the floating element along the
 * specified axes.
 * A number (shorthand for `mainAxis` or distance), or an axes configuration
 * object may be passed.
 * @see https://floating-ui.com/docs/offset
 */
var offset = (options, deps) => {
  const result = offset$1(options)
  return {
    name: result.name,
    fn: result.fn,
    options: [options, deps]
  }
}
/**
 * Optimizes the visibility of the floating element by shifting it in order to
 * keep it in view when it will overflow the clipping boundary.
 * @see https://floating-ui.com/docs/shift
 */
var shift = (options, deps) => {
  const result = shift$1(options)
  return {
    name: result.name,
    fn: result.fn,
    options: [options, deps]
  }
}
/**
 * Built-in `limiter` that will stop `shift()` at a certain point.
 */
var limitShift = (options, deps) => {
  return {
    fn: limitShift$1(options).fn,
    options: [options, deps]
  }
}
/**
 * Optimizes the visibility of the floating element by flipping the `placement`
 * in order to keep it in view when the preferred placement(s) will overflow the
 * clipping boundary. Alternative to `autoPlacement`.
 * @see https://floating-ui.com/docs/flip
 */
var flip = (options, deps) => {
  const result = flip$1(options)
  return {
    name: result.name,
    fn: result.fn,
    options: [options, deps]
  }
}
/**
 * Provides data that allows you to change the size of the floating element —
 * for instance, prevent it from overflowing the clipping boundary or match the
 * width of the reference element.
 * @see https://floating-ui.com/docs/size
 */
var size = (options, deps) => {
  const result = size$1(options)
  return {
    name: result.name,
    fn: result.fn,
    options: [options, deps]
  }
}
/**
 * Provides data to hide the floating element in applicable situations, such as
 * when it is not in the same clipping context as the reference element.
 * @see https://floating-ui.com/docs/hide
 */
var hide$1 = (options, deps) => {
  const result = hide$2(options)
  return {
    name: result.name,
    fn: result.fn,
    options: [options, deps]
  }
}
/**
 * Provides data to position an inner element of the floating element so that it
 * appears centered to the reference element.
 * This wraps the core `arrow` middleware to allow React refs as the element.
 * @see https://floating-ui.com/docs/arrow
 */
var arrow$2 = (options, deps) => {
  const result = arrow$1(options)
  return {
    name: result.name,
    fn: result.fn,
    options: [options, deps]
  }
}
//#endregion
//#region node_modules/@base-ui/utils/useControlled.mjs
function useControlled({
  controlled,
  default: defaultProp,
  name,
  state = 'value'
}) {
  const { current: isControlled } = import_react.useRef(controlled !== void 0)
  const [valueState, setValue] = import_react.useState(defaultProp)
  return [
    isControlled ? controlled : valueState,
    import_react.useCallback((newValue) => {
      if (!isControlled) setValue(newValue)
    }, [])
  ]
}
//#endregion
//#region node_modules/@base-ui/utils/safeReact.mjs
/**
 * A clone of the React namespace for reading APIs that may be missing in older
 * supported React versions. Bundlers can rewrite direct `React.someNewApi`
 * reads into named imports, which breaks React 17. Reading from this cloned
 * object keeps those lookups optional.
 *
 * @see https://github.com/mui/material-ui/issues/41190#issuecomment-2040873379
 */
var SafeReact = { ...import_react }
//#endregion
//#region node_modules/@base-ui/utils/useRefWithInit.mjs
var UNINITIALIZED = {}
/**
 * A React.useRef() that is initialized with a function. Note that it accepts an optional
 * initialization argument, so the initialization function doesn't need to be an inline closure.
 *
 * @usage
 *   const ref = useRefWithInit(sortColumns, columns)
 */
function useRefWithInit(init, initArg) {
  const ref = import_react.useRef(UNINITIALIZED)
  if (ref.current === UNINITIALIZED) ref.current = init(initArg)
  return ref
}
//#endregion
//#region node_modules/@base-ui/utils/useStableCallback.mjs
var useInsertionEffect = SafeReact.useInsertionEffect
var useSafeInsertionEffect =
  useInsertionEffect && useInsertionEffect !== SafeReact.useLayoutEffect
    ? useInsertionEffect
    : (fn) => fn()
/**
 * Stabilizes the function passed so it's always the same between renders.
 *
 * The function becomes non-reactive to any values it captures.
 * It can safely be passed as a dependency of `React.useMemo` and `React.useEffect` without re-triggering them if its captured values change.
 *
 * The function must only be called inside effects and event handlers, never during render (which throws an error).
 *
 * This hook is a more permissive version of React 19.2's `React.useEffectEvent` in that it can be passed through contexts and called in event handler props, not just effects.
 */
function useStableCallback(callback) {
  const stable = useRefWithInit(createStableCallback).current
  stable.next = callback
  useSafeInsertionEffect(stable.effect)
  return stable.trampoline
}
function createStableCallback() {
  const stable = {
    next: void 0,
    callback: assertNotCalled,
    trampoline: (...args) => stable.callback?.(...args),
    effect: () => {
      stable.callback = stable.next
    }
  }
  return stable
}
function assertNotCalled() {}
//#endregion
//#region node_modules/@base-ui/utils/useIsoLayoutEffect.mjs
var noop = () => {}
var useIsoLayoutEffect =
  typeof document !== 'undefined' ? import_react.useLayoutEffect : noop
//#endregion
//#region node_modules/@base-ui/react/internals/composite/list/CompositeListContext.mjs
var CompositeListContext = /* @__PURE__ */ import_react.createContext({
  register: () => {},
  unregister: () => {},
  subscribeMapChange: () => {
    return () => {}
  },
  elementsRef: { current: [] },
  nextIndexRef: { current: 0 }
})
function useCompositeListContext() {
  return import_react.useContext(CompositeListContext)
}
//#endregion
//#region node_modules/@base-ui/react/internals/composite/list/CompositeList.mjs
/**
 * Provides context for a list of items in a composite component.
 * @internal
 */
function CompositeList(props) {
  const {
    children,
    elementsRef,
    labelsRef,
    onMapChange: onMapChangeProp
  } = props
  const onMapChange = useStableCallback(onMapChangeProp)
  const nextIndexRef = import_react.useRef(0)
  const listeners = useRefWithInit(createListeners).current
  const map = useRefWithInit(createMap).current
  const [mapTick, setMapTick] = import_react.useState(0)
  const lastTickRef = import_react.useRef(mapTick)
  const register = useStableCallback((node, metadata) => {
    map.set(node, metadata ?? null)
    lastTickRef.current += 1
    setMapTick(lastTickRef.current)
  })
  const unregister = useStableCallback((node) => {
    map.delete(node)
    lastTickRef.current += 1
    setMapTick(lastTickRef.current)
  })
  const sortedMap = import_react.useMemo(() => {
    const newMap = /* @__PURE__ */ new Map()
    Array.from(map.keys())
      .filter((node) => node.isConnected)
      .sort(sortByDocumentPosition)
      .forEach((node, index) => {
        const metadata = map.get(node) ?? {}
        newMap.set(node, {
          ...metadata,
          index
        })
      })
    return newMap
  }, [map, mapTick])
  useIsoLayoutEffect(() => {
    if (typeof MutationObserver !== 'function' || sortedMap.size === 0) return
    const mutationObserver = new MutationObserver((entries) => {
      const diff = /* @__PURE__ */ new Set()
      const updateDiff = (node) =>
        diff.has(node) ? diff.delete(node) : diff.add(node)
      entries.forEach((entry) => {
        entry.removedNodes.forEach(updateDiff)
        entry.addedNodes.forEach(updateDiff)
      })
      if (diff.size === 0) {
        lastTickRef.current += 1
        setMapTick(lastTickRef.current)
      }
    })
    sortedMap.forEach((_, node) => {
      if (node.parentElement)
        mutationObserver.observe(node.parentElement, { childList: true })
    })
    return () => {
      mutationObserver.disconnect()
    }
  }, [sortedMap])
  useIsoLayoutEffect(() => {
    if (lastTickRef.current === mapTick) {
      if (elementsRef.current.length !== sortedMap.size)
        elementsRef.current.length = sortedMap.size
      if (labelsRef && labelsRef.current.length !== sortedMap.size)
        labelsRef.current.length = sortedMap.size
      nextIndexRef.current = sortedMap.size
    }
    onMapChange(sortedMap)
  }, [onMapChange, sortedMap, elementsRef, labelsRef, mapTick])
  useIsoLayoutEffect(() => {
    return () => {
      elementsRef.current = []
    }
  }, [elementsRef])
  useIsoLayoutEffect(() => {
    return () => {
      if (labelsRef) labelsRef.current = []
    }
  }, [labelsRef])
  const subscribeMapChange = useStableCallback((fn) => {
    listeners.add(fn)
    return () => {
      listeners.delete(fn)
    }
  })
  useIsoLayoutEffect(() => {
    listeners.forEach((l) => l(sortedMap))
  }, [listeners, sortedMap])
  const contextValue = import_react.useMemo(
    () => ({
      register,
      unregister,
      subscribeMapChange,
      elementsRef,
      labelsRef,
      nextIndexRef
    }),
    [
      register,
      unregister,
      subscribeMapChange,
      elementsRef,
      labelsRef,
      nextIndexRef
    ]
  )
  return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
    CompositeListContext.Provider,
    {
      value: contextValue,
      children
    }
  )
}
function createMap() {
  return /* @__PURE__ */ new Map()
}
function createListeners() {
  return /* @__PURE__ */ new Set()
}
function sortByDocumentPosition(a, b) {
  const position = a.compareDocumentPosition(b)
  if (
    position & Node.DOCUMENT_POSITION_FOLLOWING ||
    position & Node.DOCUMENT_POSITION_CONTAINED_BY
  )
    return -1
  if (
    position & Node.DOCUMENT_POSITION_PRECEDING ||
    position & Node.DOCUMENT_POSITION_CONTAINS
  )
    return 1
  return 0
}
//#endregion
//#region node_modules/@base-ui/react/internals/direction-context/DirectionContext.mjs
/**
 * @internal
 */
var DirectionContext = /* @__PURE__ */ import_react.createContext(void 0)
function useDirection() {
  return import_react.useContext(DirectionContext)?.direction ?? 'ltr'
}
//#endregion
//#region node_modules/@base-ui/utils/formatErrorMessage.mjs
/**
 * Creates a formatErrorMessage function with a custom URL and prefix.
 * @param baseUrl - The base URL for the error page (e.g., 'https://base-ui.com/production-error')
 * @param prefix - The prefix for the error message (e.g., 'Base UI')
 * @returns A function that formats error messages with the given URL and prefix
 */
function createFormatErrorMessage(baseUrl, prefix) {
  return function formatErrorMessage(code, ...args) {
    const url = new URL(baseUrl)
    url.searchParams.set('code', code.toString())
    args.forEach((arg) => url.searchParams.append('args[]', arg))
    return `${prefix} error #${code}; visit ${url} for the full message.`
  }
}
/**
 * WARNING: Don't import this directly. It's imported by the code generated by
 * `@mui/internal-babel-plugin-minify-errors`. Make sure to always use string literals in `Error`
 * constructors to ensure the plugin works as expected. Supported patterns include:
 *   throw new Error('My message');
 *   throw new Error(`My message: ${foo}`);
 *   throw new Error(`My message: ${foo}` + 'another string');
 *   ...
 */
var formatErrorMessage = createFormatErrorMessage(
  'https://base-ui.com/production-error',
  'Base UI'
)
//#endregion
//#region node_modules/@base-ui/utils/useMergedRefs.mjs
/**
 * Merges refs into a single memoized callback ref or `null`.
 * This makes sure multiple refs are updated together and have the same value.
 *
 * This function accepts up to four refs. If you need to merge more, or have an unspecified number of refs to merge,
 * use `useMergedRefsN` instead.
 */
function useMergedRefs(a, b, c, d) {
  const forkRef = useRefWithInit(createForkRef).current
  if (didChange(forkRef, a, b, c, d)) update(forkRef, [a, b, c, d])
  return forkRef.callback
}
/**
 * Merges an array of refs into a single memoized callback ref or `null`.
 *
 * If you need to merge a fixed number (up to four) of refs, use `useMergedRefs` instead for better performance.
 */
function useMergedRefsN(refs) {
  const forkRef = useRefWithInit(createForkRef).current
  if (didChangeN(forkRef, refs)) update(forkRef, refs)
  return forkRef.callback
}
function createForkRef() {
  return {
    callback: null,
    cleanup: null,
    refs: []
  }
}
function didChange(forkRef, a, b, c, d) {
  return (
    forkRef.refs[0] !== a ||
    forkRef.refs[1] !== b ||
    forkRef.refs[2] !== c ||
    forkRef.refs[3] !== d
  )
}
function didChangeN(forkRef, newRefs) {
  return (
    forkRef.refs.length !== newRefs.length ||
    forkRef.refs.some((ref, index) => ref !== newRefs[index])
  )
}
function update(forkRef, refs) {
  forkRef.refs = refs
  if (refs.every((ref) => ref == null)) {
    forkRef.callback = null
    return
  }
  forkRef.callback = (instance) => {
    if (forkRef.cleanup) {
      forkRef.cleanup()
      forkRef.cleanup = null
    }
    if (instance != null) {
      const cleanupCallbacks = Array(refs.length).fill(null)
      for (let i = 0; i < refs.length; i += 1) {
        const ref = refs[i]
        if (ref == null) continue
        switch (typeof ref) {
          case 'function': {
            const refCleanup = ref(instance)
            if (typeof refCleanup === 'function')
              cleanupCallbacks[i] = refCleanup
            break
          }
          case 'object':
            ref.current = instance
            break
          default:
        }
      }
      forkRef.cleanup = () => {
        for (let i = 0; i < refs.length; i += 1) {
          const ref = refs[i]
          if (ref == null) continue
          switch (typeof ref) {
            case 'function': {
              const cleanupCallback = cleanupCallbacks[i]
              if (typeof cleanupCallback === 'function') cleanupCallback()
              else ref(null)
              break
            }
            case 'object':
              ref.current = null
              break
            default:
          }
        }
      }
    }
  }
}
//#endregion
//#region node_modules/@base-ui/utils/reactVersion.mjs
var majorVersion = parseInt('19.2.6', 10)
function isReactVersionAtLeast(reactVersionToCheck) {
  return majorVersion >= reactVersionToCheck
}
//#endregion
//#region node_modules/@base-ui/utils/getReactElementRef.mjs
/**
 * Extracts the `ref` from a React element, handling different React versions.
 */
function getReactElementRef(element) {
  if (!(/* @__PURE__ */ import_react.isValidElement(element))) return null
  const reactElement = element
  const propsWithRef = reactElement.props
  return (
    (isReactVersionAtLeast(19) ? propsWithRef?.ref : reactElement.ref) ?? null
  )
}
//#endregion
//#region node_modules/@base-ui/utils/mergeObjects.mjs
function mergeObjects(a, b) {
  if (a && !b) return a
  if (!a && b) return b
  if (a || b)
    return {
      ...a,
      ...b
    }
}
//#endregion
//#region node_modules/@base-ui/utils/empty.mjs
function NOOP() {}
var EMPTY_ARRAY = Object.freeze([])
var EMPTY_OBJECT = Object.freeze({})
//#endregion
//#region node_modules/@base-ui/react/internals/getStateAttributesProps.mjs
function getStateAttributesProps(state, customMapping) {
  const props = {}
  for (const key in state) {
    const value = state[key]
    if (customMapping?.hasOwnProperty(key)) {
      const customProps = customMapping[key](value)
      if (customProps != null) Object.assign(props, customProps)
      continue
    }
    if (value === true) props[`data-${key.toLowerCase()}`] = ''
    else if (value) props[`data-${key.toLowerCase()}`] = value.toString()
  }
  return props
}
//#endregion
//#region node_modules/@base-ui/react/utils/resolveClassName.mjs
/**
 * If the provided className is a string, it will be returned as is.
 * Otherwise, the function will call the className function with the state as the first argument.
 *
 * @param className
 * @param state
 */
function resolveClassName(className, state) {
  return typeof className === 'function' ? className(state) : className
}
//#endregion
//#region node_modules/@base-ui/react/utils/resolveStyle.mjs
/**
 * If the provided style is an object, it will be returned as is.
 * Otherwise, the function will call the style function with the state as the first argument.
 *
 * @param style
 * @param state
 */
function resolveStyle(style, state) {
  return typeof style === 'function' ? style(state) : style
}
//#endregion
//#region node_modules/@base-ui/react/merge-props/mergeProps.mjs
var EMPTY_PROPS = {}
/**
 * Merges multiple sets of React props. It follows the Object.assign pattern where the rightmost object's fields overwrite
 * the conflicting ones from others. This doesn't apply to event handlers, `className` and `style` props.
 *
 * Event handlers are merged and called in right-to-left order (rightmost handler executes first, leftmost last).
 * For React synthetic events, the rightmost handler can prevent prior (left-positioned) handlers from executing
 * by calling `event.preventBaseUIHandler()`. For non-synthetic events (custom events with primitive/object values),
 * all handlers always execute without prevention capability.
 *
 * The `className` prop is merged by concatenating classes in right-to-left order (rightmost class appears first in the string).
 * The `style` prop is merged with rightmost styles overwriting the prior ones.
 *
 * Props can either be provided as objects or as functions that take the previous props as an argument.
 * The function will receive the merged props up to that point (going from left to right):
 * so in the case of `(obj1, obj2, fn, obj3)`, `fn` will receive the merged props of `obj1` and `obj2`.
 * The function is responsible for chaining event handlers if needed (that is, we don't run the merge logic).
 *
 * Event handlers returned by the functions are not automatically prevented when `preventBaseUIHandler` is called.
 * They must check `event.baseUIHandlerPrevented` themselves and bail out if it's true.
 *
 * @important **`ref` is not merged.**
 * @param a Props object to merge.
 * @param b Props object to merge. The function will overwrite conflicting props from `a`.
 * @param c Props object to merge. The function will overwrite conflicting props from previous parameters.
 * @param d Props object to merge. The function will overwrite conflicting props from previous parameters.
 * @param e Props object to merge. The function will overwrite conflicting props from previous parameters.
 * @returns The merged props.
 * @public
 */
function mergeProps(a, b, c, d, e) {
  if (!c && !d && !e && !a) return createInitialMergedProps(b)
  let merged = createInitialMergedProps(a)
  if (b) merged = mergeInto(merged, b)
  if (c) merged = mergeInto(merged, c)
  if (d) merged = mergeInto(merged, d)
  if (e) merged = mergeInto(merged, e)
  return merged
}
/**
 * Merges an arbitrary number of React props using the same logic as {@link mergeProps}.
 * This function accepts an array of props instead of individual arguments.
 *
 * This has slightly lower performance than {@link mergeProps} due to accepting an array
 * instead of a fixed number of arguments. Prefer {@link mergeProps} when merging 5 or
 * fewer prop sets for better performance.
 *
 * @param props Array of props to merge.
 * @returns The merged props.
 * @see mergeProps
 * @public
 */
function mergePropsN(props) {
  if (props.length === 0) return EMPTY_PROPS
  if (props.length === 1) return createInitialMergedProps(props[0])
  let merged = createInitialMergedProps(props[0])
  for (let i = 1; i < props.length; i += 1) merged = mergeInto(merged, props[i])
  return merged
}
function createInitialMergedProps(inputProps) {
  if (isPropsGetter(inputProps))
    return { ...resolvePropsGetter(inputProps, EMPTY_PROPS) }
  return copyInitialProps(inputProps)
}
function mergeInto(merged, inputProps) {
  if (isPropsGetter(inputProps)) return resolvePropsGetter(inputProps, merged)
  return mutablyMergeInto(merged, inputProps)
}
function copyInitialProps(inputProps) {
  const copiedProps = { ...inputProps }
  for (const propName in copiedProps) {
    const propValue = copiedProps[propName]
    if (isEventHandler(propName, propValue))
      copiedProps[propName] = wrapEventHandler(propValue)
  }
  return copiedProps
}
/**
 * Merges two sets of props. In case of conflicts, the external props take precedence.
 */
function mutablyMergeInto(mergedProps, externalProps) {
  if (!externalProps) return mergedProps
  for (const propName in externalProps) {
    const externalPropValue = externalProps[propName]
    switch (propName) {
      case 'style':
        mergedProps[propName] = mergeObjects(
          mergedProps.style,
          externalPropValue
        )
        break
      case 'className':
        mergedProps[propName] = mergeClassNames(
          mergedProps.className,
          externalPropValue
        )
        break
      default:
        if (isEventHandler(propName, externalPropValue))
          mergedProps[propName] = mergeEventHandlers(
            mergedProps[propName],
            externalPropValue
          )
        else mergedProps[propName] = externalPropValue
    }
  }
  return mergedProps
}
function isEventHandler(key, value) {
  const code0 = key.charCodeAt(0)
  const code1 = key.charCodeAt(1)
  const code2 = key.charCodeAt(2)
  return (
    code0 === 111 &&
    code1 === 110 &&
    code2 >= 65 &&
    code2 <= 90 &&
    (typeof value === 'function' || typeof value === 'undefined')
  )
}
function isPropsGetter(inputProps) {
  return typeof inputProps === 'function'
}
function resolvePropsGetter(inputProps, previousProps) {
  if (isPropsGetter(inputProps)) return inputProps(previousProps)
  return inputProps ?? EMPTY_PROPS
}
function mergeEventHandlers(ourHandler, theirHandler) {
  if (!theirHandler) return ourHandler
  if (!ourHandler) return wrapEventHandler(theirHandler)
  return (...args) => {
    const event = args[0]
    if (isSyntheticEvent(event)) {
      const baseUIEvent = event
      makeEventPreventable(baseUIEvent)
      const result = theirHandler(...args)
      if (!baseUIEvent.baseUIHandlerPrevented) ourHandler?.(...args)
      return result
    }
    const result = theirHandler(...args)
    ourHandler?.(...args)
    return result
  }
}
function wrapEventHandler(handler) {
  if (!handler) return handler
  return (...args) => {
    const event = args[0]
    if (isSyntheticEvent(event)) makeEventPreventable(event)
    return handler(...args)
  }
}
function makeEventPreventable(event) {
  event.preventBaseUIHandler = () => {
    event.baseUIHandlerPrevented = true
  }
  return event
}
function mergeClassNames(ourClassName, theirClassName) {
  if (theirClassName) {
    if (ourClassName) return theirClassName + ' ' + ourClassName
    return theirClassName
  }
  return ourClassName
}
function isSyntheticEvent(event) {
  return event != null && typeof event === 'object' && 'nativeEvent' in event
}
//#endregion
//#region node_modules/@base-ui/react/internals/useRenderElement.mjs
/**
 * Renders a Base UI element.
 *
 * @param element The default HTML element to render. Can be overridden by the `render` prop.
 * @param componentProps An object containing the `render` and `className` props to be used for element customization. Other props are ignored.
 * @param params Additional parameters for rendering the element.
 */
function useRenderElement(element, componentProps, params = {}) {
  const renderProp = componentProps.render
  const outProps = useRenderElementProps(componentProps, params)
  if (params.enabled === false) return null
  return evaluateRenderProp(
    element,
    renderProp,
    outProps,
    params.state ?? EMPTY_OBJECT
  )
}
/**
 * Computes render element final props.
 */
function useRenderElementProps(componentProps, params = {}) {
  const {
    className: classNameProp,
    style: styleProp,
    render: renderProp
  } = componentProps
  const {
    state = EMPTY_OBJECT,
    ref,
    props,
    stateAttributesMapping,
    enabled = true
  } = params
  const className = enabled ? resolveClassName(classNameProp, state) : void 0
  const style = enabled ? resolveStyle(styleProp, state) : void 0
  const stateProps = enabled
    ? getStateAttributesProps(state, stateAttributesMapping)
    : EMPTY_OBJECT
  const resolvedProps =
    enabled && props ? resolveRenderFunctionProps(props) : void 0
  const outProps = enabled
    ? (mergeObjects(stateProps, resolvedProps) ?? {})
    : EMPTY_OBJECT
  if (typeof document !== 'undefined')
    if (!enabled) useMergedRefs(null, null)
    else if (Array.isArray(ref))
      outProps.ref = useMergedRefsN([
        outProps.ref,
        getReactElementRef(renderProp),
        ...ref
      ])
    else
      outProps.ref = useMergedRefs(
        outProps.ref,
        getReactElementRef(renderProp),
        ref
      )
  if (!enabled) return EMPTY_OBJECT
  if (className !== void 0)
    outProps.className = mergeClassNames(outProps.className, className)
  if (style !== void 0) outProps.style = mergeObjects(outProps.style, style)
  return outProps
}
function resolveRenderFunctionProps(props) {
  if (Array.isArray(props)) return mergePropsN(props)
  return mergeProps(void 0, props)
}
var REACT_LAZY_TYPE = Symbol.for('react.lazy')
function evaluateRenderProp(element, render, props, state) {
  if (render) {
    if (typeof render === 'function') return render(props, state)
    const mergedProps = mergeProps(props, render.props)
    mergedProps.ref = props.ref
    let newElement = render
    if (newElement?.$$typeof === REACT_LAZY_TYPE)
      newElement = import_react.Children.toArray(render)[0]
    return /* @__PURE__ */ import_react.cloneElement(newElement, mergedProps)
  }
  if (element) {
    if (typeof element === 'string') return renderTag(element, props)
  }
  throw new Error(formatErrorMessage(8))
}
function renderTag(Tag, props) {
  if (Tag === 'button')
    return /* @__PURE__ */ (0, import_react.createElement)('button', {
      type: 'button',
      ...props,
      key: props.key
    })
  if (Tag === 'img')
    return /* @__PURE__ */ (0, import_react.createElement)('img', {
      alt: '',
      ...props,
      key: props.key
    })
  return /* @__PURE__ */ import_react.createElement(Tag, props)
}
//#endregion
//#region node_modules/@base-ui/utils/useId.mjs
var globalId = 0
function useGlobalId(idOverride, prefix = 'mui') {
  const [defaultId, setDefaultId] = import_react.useState(idOverride)
  const id = idOverride || defaultId
  import_react.useEffect(() => {
    if (defaultId == null) {
      globalId += 1
      setDefaultId(`${prefix}-${globalId}`)
    }
  }, [defaultId, prefix])
  return id
}
var maybeReactUseId = SafeReact.useId
/**
 *
 * @example <div id={useId()} />
 * @param idOverride
 * @returns {string}
 */
function useId(idOverride, prefix) {
  if (maybeReactUseId !== void 0) {
    const reactId = maybeReactUseId()
    return idOverride ?? (prefix ? `${prefix}-${reactId}` : reactId)
  }
  return useGlobalId(idOverride, prefix)
}
//#endregion
//#region node_modules/@base-ui/react/internals/useBaseUiId.mjs
/**
 * Wraps `useId` and prefixes generated `id`s with `base-ui-`
 * @param {string | undefined} idOverride overrides the generated id when provided
 * @returns {string | undefined}
 */
function useBaseUiId(idOverride) {
  return useId(idOverride, 'base-ui')
}
//#endregion
//#region node_modules/@base-ui/react/internals/reason-parts.mjs
var none = 'none'
var triggerPress = 'trigger-press'
var outsidePress = 'outside-press'
var itemPress = 'item-press'
var closePress = 'close-press'
var clearPress = 'clear-press'
var chipRemovePress = 'chip-remove-press'
var inputChange = 'input-change'
var inputClear = 'input-clear'
var inputPress = 'input-press'
var focusOut = 'focus-out'
var escapeKey = 'escape-key'
var listNavigation = 'list-navigation'
//#endregion
//#region node_modules/@base-ui/react/internals/createBaseUIEventDetails.mjs
/**
 * Maps a change `reason` string to the corresponding native event type.
 */
/**
 * Details of custom change events emitted by Base UI components.
 */
/**
 * Details of custom generic events emitted by Base UI components.
 */
/**
 * Creates a Base UI event details object with the given reason and utilities
 * for preventing Base UI's internal event handling.
 */
function createChangeEventDetails(reason, event, trigger, customProperties) {
  let canceled = false
  let allowPropagation = false
  const custom = customProperties ?? EMPTY_OBJECT
  return {
    reason,
    event: event ?? new Event('base-ui'),
    cancel() {
      canceled = true
    },
    allowPropagation() {
      allowPropagation = true
    },
    get isCanceled() {
      return canceled
    },
    get isPropagationAllowed() {
      return allowPropagation
    },
    trigger,
    ...custom
  }
}
function createGenericEventDetails(reason, event, customProperties) {
  const custom = customProperties ?? EMPTY_OBJECT
  return {
    reason,
    event: event ?? new Event('base-ui'),
    ...custom
  }
}
//#endregion
//#region node_modules/@base-ui/utils/useOnMount.mjs
var EMPTY$2 = []
/**
 * A React.useEffect equivalent that runs once, when the component is mounted.
 */
function useOnMount(fn) {
  import_react.useEffect(fn, EMPTY$2)
}
//#endregion
//#region node_modules/@base-ui/utils/useAnimationFrame.mjs
/** Unlike `setTimeout`, rAF doesn't guarantee a positive integer return value, so we can't have
 * a monomorphic `uint` type with `0` meaning empty.
 * See warning note at:
 * https://developer.mozilla.org/en-US/docs/Web/API/Window/requestAnimationFrame#return_value */
var EMPTY$1 = null
globalThis.requestAnimationFrame
var Scheduler = class {
  callbacks = []
  callbacksCount = 0
  nextId = 1
  startId = 1
  isScheduled = false
  tick = (timestamp) => {
    this.isScheduled = false
    const currentCallbacks = this.callbacks
    const currentCallbacksCount = this.callbacksCount
    this.callbacks = []
    this.callbacksCount = 0
    this.startId = this.nextId
    if (currentCallbacksCount > 0)
      for (let i = 0; i < currentCallbacks.length; i += 1)
        currentCallbacks[i]?.(timestamp)
  }
  request(fn) {
    const id = this.nextId
    this.nextId += 1
    this.callbacks.push(fn)
    this.callbacksCount += 1
    if (!this.isScheduled || false) {
      requestAnimationFrame(this.tick)
      this.isScheduled = true
    }
    return id
  }
  cancel(id) {
    const index = id - this.startId
    if (index < 0 || index >= this.callbacks.length) return
    this.callbacks[index] = null
    this.callbacksCount -= 1
  }
}
var scheduler = new Scheduler()
var AnimationFrame = class AnimationFrame {
  static create() {
    return new AnimationFrame()
  }
  static request(fn) {
    return scheduler.request(fn)
  }
  static cancel(id) {
    return scheduler.cancel(id)
  }
  currentId = EMPTY$1
  /**
   * Executes `fn` after `delay`, clearing any previously scheduled call.
   */
  request(fn) {
    this.cancel()
    this.currentId = scheduler.request(() => {
      this.currentId = EMPTY$1
      fn()
    })
  }
  cancel = () => {
    if (this.currentId !== EMPTY$1) {
      scheduler.cancel(this.currentId)
      this.currentId = EMPTY$1
    }
  }
  disposeEffect = () => {
    return this.cancel
  }
}
/**
 * A `requestAnimationFrame` with automatic cleanup and guard.
 */
function useAnimationFrame() {
  const timeout = useRefWithInit(AnimationFrame.create).current
  useOnMount(timeout.disposeEffect)
  return timeout
}
//#endregion
//#region node_modules/@base-ui/react/internals/useTransitionStatus.mjs
/**
 * Provides a status string for CSS animations.
 * @param open - a boolean that determines if the element is open.
 * @param enableIdleState - a boolean that enables the `'idle'` state between `'starting'` and `'ending'`
 */
function useTransitionStatus(
  open,
  enableIdleState = false,
  deferEndingState = false
) {
  const [transitionStatus, setTransitionStatus] = import_react.useState(
    open && enableIdleState ? 'idle' : void 0
  )
  const [mounted, setMounted] = import_react.useState(open)
  if (open && !mounted) {
    setMounted(true)
    setTransitionStatus('starting')
  }
  if (!open && mounted && transitionStatus !== 'ending' && !deferEndingState)
    setTransitionStatus('ending')
  if (!open && !mounted && transitionStatus === 'ending')
    setTransitionStatus(void 0)
  useIsoLayoutEffect(() => {
    if (!open && mounted && transitionStatus !== 'ending' && deferEndingState) {
      const frame = AnimationFrame.request(() => {
        setTransitionStatus('ending')
      })
      return () => {
        AnimationFrame.cancel(frame)
      }
    }
  }, [open, mounted, transitionStatus, deferEndingState])
  useIsoLayoutEffect(() => {
    if (!open || enableIdleState) return
    const frame = AnimationFrame.request(() => {
      setTransitionStatus(void 0)
    })
    return () => {
      AnimationFrame.cancel(frame)
    }
  }, [enableIdleState, open])
  useIsoLayoutEffect(() => {
    if (!open || !enableIdleState) return
    if (open && mounted && transitionStatus !== 'idle')
      setTransitionStatus('starting')
    const frame = AnimationFrame.request(() => {
      setTransitionStatus('idle')
    })
    return () => {
      AnimationFrame.cancel(frame)
    }
  }, [enableIdleState, open, mounted, transitionStatus])
  return {
    mounted,
    setMounted,
    transitionStatus
  }
}
//#endregion
//#region node_modules/@base-ui/react/internals/composite/list/useCompositeListItem.mjs
var IndexGuessBehavior = /* @__PURE__ */ (function (IndexGuessBehavior) {
  IndexGuessBehavior[(IndexGuessBehavior['None'] = 0)] = 'None'
  IndexGuessBehavior[(IndexGuessBehavior['GuessFromOrder'] = 1)] =
    'GuessFromOrder'
  return IndexGuessBehavior
})({})
/**
 * Used to register a list item and its index (DOM position) in the `CompositeList`.
 */
function useCompositeListItem(params = {}) {
  const {
    label,
    metadata,
    textRef,
    indexGuessBehavior,
    index: externalIndex
  } = params
  const {
    register,
    unregister,
    subscribeMapChange,
    elementsRef,
    labelsRef,
    nextIndexRef
  } = useCompositeListContext()
  const indexRef = import_react.useRef(-1)
  const [index, setIndex] = import_react.useState(
    externalIndex ??
      (indexGuessBehavior === IndexGuessBehavior.GuessFromOrder
        ? () => {
            if (indexRef.current === -1) {
              const newIndex = nextIndexRef.current
              nextIndexRef.current += 1
              indexRef.current = newIndex
            }
            return indexRef.current
          }
        : -1)
  )
  const componentRef = import_react.useRef(null)
  const ref = import_react.useCallback(
    (node) => {
      componentRef.current = node
      if (index !== -1 && node !== null) {
        elementsRef.current[index] = node
        if (labelsRef) {
          const isLabelDefined = label !== void 0
          labelsRef.current[index] = isLabelDefined
            ? label
            : (textRef?.current?.textContent ?? node.textContent)
        }
      }
    },
    [index, elementsRef, labelsRef, label, textRef]
  )
  useIsoLayoutEffect(() => {
    if (externalIndex != null) return
    const node = componentRef.current
    if (node) {
      register(node, metadata)
      return () => {
        unregister(node)
      }
    }
  }, [externalIndex, register, unregister, metadata])
  useIsoLayoutEffect(() => {
    if (externalIndex != null) return
    return subscribeMapChange((map) => {
      const i = componentRef.current
        ? map.get(componentRef.current)?.index
        : null
      if (i != null) setIndex(i)
    })
  }, [externalIndex, subscribeMapChange, setIndex])
  return {
    ref,
    index
  }
}
//#endregion
//#region node_modules/@base-ui/react/internals/stateAttributesMapping.mjs
var TransitionStatusDataAttributes = /* @__PURE__ */ (function (
  TransitionStatusDataAttributes
) {
  /**
   * Present when the component is animating in.
   */
  TransitionStatusDataAttributes['startingStyle'] = 'data-starting-style'
  /**
   * Present when the component is animating out.
   */
  TransitionStatusDataAttributes['endingStyle'] = 'data-ending-style'
  return TransitionStatusDataAttributes
})({})
var STARTING_HOOK = { [TransitionStatusDataAttributes.startingStyle]: '' }
var ENDING_HOOK = { [TransitionStatusDataAttributes.endingStyle]: '' }
var transitionStatusMapping = {
  transitionStatus(value) {
    if (value === 'starting') return STARTING_HOOK
    if (value === 'ending') return ENDING_HOOK
    return null
  }
}
//#endregion
//#region node_modules/@base-ui/react/internals/composite/root/CompositeRootContext.mjs
var CompositeRootContext = /* @__PURE__ */ import_react.createContext(void 0)
function useCompositeRootContext(optional = false) {
  const context = import_react.useContext(CompositeRootContext)
  if (context === void 0 && !optional) throw new Error(formatErrorMessage(16))
  return context
}
//#endregion
//#region node_modules/@base-ui/react/utils/useFocusableWhenDisabled.mjs
function useFocusableWhenDisabled(parameters) {
  const {
    focusableWhenDisabled,
    disabled,
    composite = false,
    tabIndex: tabIndexProp = 0,
    isNativeButton
  } = parameters
  const isFocusableComposite = composite && focusableWhenDisabled !== false
  const isNonFocusableComposite = composite && focusableWhenDisabled === false
  return {
    props: import_react.useMemo(() => {
      const additionalProps = {
        onKeyDown(event) {
          if (disabled && focusableWhenDisabled && event.key !== 'Tab')
            event.preventDefault()
        }
      }
      if (!composite) {
        additionalProps.tabIndex = tabIndexProp
        if (!isNativeButton && disabled)
          additionalProps.tabIndex = focusableWhenDisabled ? tabIndexProp : -1
      }
      if (
        (isNativeButton && (focusableWhenDisabled || isFocusableComposite)) ||
        (!isNativeButton && disabled)
      )
        additionalProps['aria-disabled'] = disabled
      if (isNativeButton && (!focusableWhenDisabled || isNonFocusableComposite))
        additionalProps.disabled = disabled
      return additionalProps
    }, [
      composite,
      disabled,
      focusableWhenDisabled,
      isFocusableComposite,
      isNonFocusableComposite,
      isNativeButton,
      tabIndexProp
    ])
  }
}
//#endregion
//#region node_modules/@base-ui/react/internals/use-button/useButton.mjs
function useButton(parameters = {}) {
  const {
    disabled = false,
    focusableWhenDisabled,
    tabIndex = 0,
    native: isNativeButton = true,
    composite: compositeProp
  } = parameters
  const elementRef = import_react.useRef(null)
  const compositeRootContext = useCompositeRootContext(true)
  const isCompositeItem = compositeProp ?? compositeRootContext !== void 0
  const { props: focusableWhenDisabledProps } = useFocusableWhenDisabled({
    focusableWhenDisabled,
    disabled,
    composite: isCompositeItem,
    tabIndex,
    isNativeButton
  })
  const updateDisabled = import_react.useCallback(() => {
    const element = elementRef.current
    if (!isButtonElement(element)) return
    if (
      isCompositeItem &&
      disabled &&
      focusableWhenDisabledProps.disabled === void 0 &&
      element.disabled
    )
      element.disabled = false
  }, [disabled, focusableWhenDisabledProps.disabled, isCompositeItem])
  useIsoLayoutEffect(updateDisabled, [updateDisabled])
  return {
    getButtonProps: import_react.useCallback(
      (externalProps = {}) => {
        const {
          onClick: externalOnClick,
          onMouseDown: externalOnMouseDown,
          onKeyUp: externalOnKeyUp,
          onKeyDown: externalOnKeyDown,
          onPointerDown: externalOnPointerDown,
          ...otherExternalProps
        } = externalProps
        return mergeProps(
          {
            onClick(event) {
              if (disabled) {
                event.preventDefault()
                return
              }
              externalOnClick?.(event)
            },
            onMouseDown(event) {
              if (!disabled) externalOnMouseDown?.(event)
            },
            onKeyDown(event) {
              if (disabled) return
              makeEventPreventable(event)
              externalOnKeyDown?.(event)
              if (event.baseUIHandlerPrevented) return
              const isCurrentTarget = event.target === event.currentTarget
              const currentTarget = event.currentTarget
              const isButton = isButtonElement(currentTarget)
              const isLink =
                !isNativeButton && isValidLinkElement(currentTarget)
              const shouldClick =
                isCurrentTarget && (isNativeButton ? isButton : !isLink)
              const isEnterKey = event.key === 'Enter'
              const isSpaceKey = event.key === ' '
              const role = currentTarget.getAttribute('role')
              const isTextNavigationRole =
                role?.startsWith('menuitem') ||
                role === 'option' ||
                role === 'gridcell'
              if (isCurrentTarget && isCompositeItem && isSpaceKey) {
                if (event.defaultPrevented && isTextNavigationRole) return
                event.preventDefault()
                if (isLink || (isNativeButton && isButton)) {
                  currentTarget.click()
                  event.preventBaseUIHandler()
                } else if (shouldClick) {
                  externalOnClick?.(event)
                  event.preventBaseUIHandler()
                }
                return
              }
              if (shouldClick) {
                if (!isNativeButton && (isSpaceKey || isEnterKey))
                  event.preventDefault()
                if (!isNativeButton && isEnterKey) externalOnClick?.(event)
              }
            },
            onKeyUp(event) {
              if (disabled) return
              makeEventPreventable(event)
              externalOnKeyUp?.(event)
              if (
                event.target === event.currentTarget &&
                isNativeButton &&
                isCompositeItem &&
                isButtonElement(event.currentTarget) &&
                event.key === ' '
              ) {
                event.preventDefault()
                return
              }
              if (event.baseUIHandlerPrevented) return
              if (
                event.target === event.currentTarget &&
                !isNativeButton &&
                !isCompositeItem &&
                event.key === ' '
              )
                externalOnClick?.(event)
            },
            onPointerDown(event) {
              if (disabled) {
                event.preventDefault()
                return
              }
              externalOnPointerDown?.(event)
            }
          },
          isNativeButton ? { type: 'button' } : { role: 'button' },
          focusableWhenDisabledProps,
          otherExternalProps
        )
      },
      [disabled, focusableWhenDisabledProps, isCompositeItem, isNativeButton]
    ),
    buttonRef: useStableCallback((element) => {
      elementRef.current = element
      updateDisabled()
    })
  }
}
function isButtonElement(elem) {
  return isHTMLElement(elem) && elem.tagName === 'BUTTON'
}
function isValidLinkElement(elem) {
  return Boolean(elem?.tagName === 'A' && elem?.href)
}
//#endregion
//#region node_modules/@base-ui/utils/addEventListener.mjs
/**
 * Adds an event listener and returns a cleanup function to remove it.
 */
function addEventListener(target, type, listener, options) {
  target.addEventListener(type, listener, options)
  return () => {
    target.removeEventListener(type, listener, options)
  }
}
//#endregion
//#region node_modules/@base-ui/utils/useValueAsRef.mjs
/**
 * Untracks the provided value by turning it into a ref to remove its reactivity.
 *
 * Used to access the passed value inside `React.useEffect` without causing the effect to re-run when the value changes.
 */
function useValueAsRef(value) {
  const latest = useRefWithInit(createLatestRef, value).current
  latest.next = value
  useIsoLayoutEffect(latest.effect)
  return latest
}
function createLatestRef(value) {
  const latest = {
    current: value,
    next: value,
    effect: () => {
      latest.current = latest.next
    }
  }
  return latest
}
//#endregion
//#region node_modules/@base-ui/utils/owner.mjs
function ownerDocument(node) {
  return node?.ownerDocument || document
}
//#endregion
//#region node_modules/@base-ui/react/utils/resolveRef.mjs
/**
 * If the provided argument is a ref object, returns its `current` value.
 * Otherwise, returns the argument itself.
 */
function resolveRef(maybeRef) {
  if (maybeRef == null) return maybeRef
  return 'current' in maybeRef ? maybeRef.current : maybeRef
}
//#endregion
//#region node_modules/@base-ui/react/internals/useAnimationsFinished.mjs
/**
 * Executes a function once all animations have finished on the provided element.
 * @param elementOrRef - The element to watch for animations.
 * @param waitForStartingStyleRemoved - Whether to wait for [data-starting-style] to be removed before checking for animations.
 * @param treatAbortedAsFinished - Whether to treat aborted animations as finished. If `false`, and there are aborted animations,
 *   the function will check again if any new animations have started and wait for them to finish.
 * @returns A function that takes a callback to execute once all animations have finished, and an optional AbortSignal to abort the callback
 */
function useAnimationsFinished(
  elementOrRef,
  waitForStartingStyleRemoved = false,
  treatAbortedAsFinished = true
) {
  const frame = useAnimationFrame()
  return useStableCallback((fnToExecute, signal = null) => {
    frame.cancel()
    const element = resolveRef(elementOrRef)
    if (element == null) return
    const resolvedElement = element
    const done = () => {
      import_react_dom.flushSync(fnToExecute)
    }
    if (
      typeof resolvedElement.getAnimations !== 'function' ||
      globalThis.BASE_UI_ANIMATIONS_DISABLED
    ) {
      fnToExecute()
      return
    }
    function exec() {
      Promise.all(
        resolvedElement.getAnimations().map((animation) => animation.finished)
      )
        .then(() => {
          if (!signal?.aborted) done()
        })
        .catch(() => {
          if (treatAbortedAsFinished) {
            if (!signal?.aborted) done()
            return
          }
          const currentAnimations = resolvedElement.getAnimations()
          if (
            !signal?.aborted &&
            currentAnimations.length > 0 &&
            currentAnimations.some(
              (animation) =>
                animation.pending || animation.playState !== 'finished'
            )
          )
            exec()
        })
    }
    if (waitForStartingStyleRemoved) {
      const startingStyleAttribute =
        TransitionStatusDataAttributes.startingStyle
      if (!resolvedElement.hasAttribute(startingStyleAttribute)) {
        frame.request(exec)
        return
      }
      const attributeObserver = new MutationObserver(() => {
        if (!resolvedElement.hasAttribute(startingStyleAttribute)) {
          attributeObserver.disconnect()
          exec()
        }
      })
      attributeObserver.observe(resolvedElement, {
        attributes: true,
        attributeFilter: [startingStyleAttribute]
      })
      signal?.addEventListener('abort', () => attributeObserver.disconnect(), {
        once: true
      })
      return
    }
    frame.request(exec)
  })
}
//#endregion
//#region node_modules/@base-ui/react/internals/useOpenChangeComplete.mjs
/**
 * Calls the provided function when the CSS open/close animation or transition completes.
 */
function useOpenChangeComplete(parameters) {
  const { enabled = true, open, ref, onComplete: onCompleteParam } = parameters
  const onComplete = useStableCallback(onCompleteParam)
  const runOnceAnimationsFinish = useAnimationsFinished(ref, open, false)
  import_react.useEffect(() => {
    if (!enabled) return
    const abortController = new AbortController()
    runOnceAnimationsFinish(onComplete, abortController.signal)
    return () => {
      abortController.abort()
    }
  }, [enabled, open, onComplete, runOnceAnimationsFinish])
}
//#endregion
//#region node_modules/@base-ui/utils/useOnFirstRender.mjs
function useOnFirstRender(fn) {
  const ref = import_react.useRef(true)
  if (ref.current) {
    ref.current = false
    fn()
  }
}
//#endregion
//#region node_modules/@base-ui/utils/platform/shared.mjs
/**
 * Reads `navigator.userAgent` / `navigator.platform` (legacy but universally
 * supported) into a normalized shape. In development, prefers the modern
 * `navigator.userAgentData` API on Chromium to avoid DevTools warnings about
 * the deprecated reads; that branch is dead-code-eliminated in production
 * builds to keep the bundle small.
 *
 * Returns empty/zero values when `navigator` is undefined (SSR), so every
 * derived flag safely evaluates to `false`.
 */
function readRawData() {
  if (typeof navigator === 'undefined')
    return {
      userAgent: '',
      platform: '',
      maxTouchPoints: 0
    }
  return {
    userAgent: navigator.userAgent,
    platform: navigator.platform ?? '',
    maxTouchPoints: navigator.maxTouchPoints ?? 0
  }
}
var { userAgent, platform, maxTouchPoints } = readRawData()
var lowerUserAgent = userAgent.toLowerCase()
var lowerPlatform = platform.toLowerCase()
//#endregion
//#region node_modules/@base-ui/utils/platform/os.mjs
/** iPhone, iPad (including iPadOS 13+ reporting as macOS), iPod. */
var ios =
  /^i(os$|p)/.test(lowerPlatform) ||
  (lowerPlatform === 'macintel' && maxTouchPoints > 1)
/** Android phones, tablets, and embedded Android browsers. */
var ANDROID_STRING = 'android'
var android =
  lowerPlatform === ANDROID_STRING || lowerUserAgent.includes(ANDROID_STRING)
/** macOS desktop. Excludes iPadOS, which reports as `MacIntel`. */
var mac = !ios && lowerPlatform.startsWith('mac')
lowerPlatform.startsWith('win')
!android && /^(linux|chrome os)/.test(lowerPlatform)
/** Any Apple OS (`mac || ios`). */
var apple = mac || ios
//#endregion
//#region node_modules/@base-ui/utils/platform/engine.mjs
/** WebKit: Safari, all iOS browsers, GNOME Web. Excludes Blink. */
var webkit =
  typeof CSS !== 'undefined' && !!CSS.supports?.('-webkit-backdrop-filter:none')
/** Gecko: Firefox. */
var gecko = !webkit && lowerUserAgent.includes('firefox')
!webkit && lowerUserAgent.includes('chrom')
//#endregion
//#region node_modules/@base-ui/utils/platform/screen-reader.mjs
/**
 * The user *may* be using VoiceOver — actual activation is not detectable.
 * True on any Apple platform (macOS, iOS, iPadOS).
 */
var voiceOver = apple
//#endregion
//#region node_modules/@base-ui/utils/platform/env.mjs
/** Running in jsdom or HappyDOM (used by unit tests). */
var jsdom = /jsdom|happydom/.test(lowerUserAgent)
//#endregion
//#region node_modules/@base-ui/utils/useTimeout.mjs
var EMPTY = 0
var Timeout = class Timeout {
  static create() {
    return new Timeout()
  }
  currentId = EMPTY
  /**
   * Executes `fn` after `delay`, clearing any previously scheduled call.
   */
  start(delay, fn) {
    this.clear()
    this.currentId = setTimeout(() => {
      this.currentId = EMPTY
      fn()
    }, delay)
  }
  isStarted() {
    return this.currentId !== EMPTY
  }
  clear = () => {
    if (this.currentId !== EMPTY) {
      clearTimeout(this.currentId)
      this.currentId = EMPTY
    }
  }
  disposeEffect = () => {
    return this.clear
  }
}
/**
 * A `setTimeout` with automatic cleanup and guard.
 */
function useTimeout() {
  const timeout = useRefWithInit(Timeout.create).current
  useOnMount(timeout.disposeEffect)
  return timeout
}
//#endregion
//#region node_modules/@base-ui/utils/useScrollLock.mjs
var originalHtmlStyles = {}
var originalBodyStyles = {}
var originalHtmlScrollBehavior = ''
function hasInsetScrollbars(referenceElement) {
  if (typeof document === 'undefined') return false
  const doc = ownerDocument(referenceElement)
  return getWindow(doc).innerWidth - doc.documentElement.clientWidth > 0
}
function supportsStableScrollbarGutter(referenceElement) {
  if (
    !(
      typeof CSS !== 'undefined' &&
      CSS.supports &&
      CSS.supports('scrollbar-gutter', 'stable')
    ) ||
    typeof document === 'undefined'
  )
    return false
  const doc = ownerDocument(referenceElement)
  const html = doc.documentElement
  const body = doc.body
  const scrollContainer = isOverflowElement(html) ? html : body
  const originalScrollContainerOverflowY = scrollContainer.style.overflowY
  const originalHtmlStyleGutter = html.style.scrollbarGutter
  html.style.scrollbarGutter = 'stable'
  scrollContainer.style.overflowY = 'scroll'
  const before = scrollContainer.offsetWidth
  scrollContainer.style.overflowY = 'hidden'
  const after = scrollContainer.offsetWidth
  scrollContainer.style.overflowY = originalScrollContainerOverflowY
  html.style.scrollbarGutter = originalHtmlStyleGutter
  return before === after
}
function preventScrollOverlayScrollbars(referenceElement) {
  const doc = ownerDocument(referenceElement)
  const html = doc.documentElement
  const body = doc.body
  const elementToLock = isOverflowElement(html) ? html : body
  const originalElementToLockStyles = {
    overflowY: elementToLock.style.overflowY,
    overflowX: elementToLock.style.overflowX
  }
  Object.assign(elementToLock.style, {
    overflowY: 'hidden',
    overflowX: 'hidden'
  })
  return () => {
    Object.assign(elementToLock.style, originalElementToLockStyles)
  }
}
function preventScrollInsetScrollbars(referenceElement) {
  const doc = ownerDocument(referenceElement)
  const html = doc.documentElement
  const body = doc.body
  const win = getWindow(html)
  let scrollTop = 0
  let scrollLeft = 0
  let updateGutterOnly = false
  const resizeFrame = AnimationFrame.create()
  if (webkit && (win.visualViewport?.scale ?? 1) !== 1) return () => {}
  function lockScroll() {
    const htmlStyles = win.getComputedStyle(html)
    const bodyStyles = win.getComputedStyle(body)
    const scrollbarGutterValue = (htmlStyles.scrollbarGutter || '').includes(
      'both-edges'
    )
      ? 'stable both-edges'
      : 'stable'
    scrollTop = html.scrollTop
    scrollLeft = html.scrollLeft
    originalHtmlStyles = {
      scrollbarGutter: html.style.scrollbarGutter,
      overflowY: html.style.overflowY,
      overflowX: html.style.overflowX
    }
    originalHtmlScrollBehavior = html.style.scrollBehavior
    originalBodyStyles = {
      position: body.style.position,
      height: body.style.height,
      width: body.style.width,
      boxSizing: body.style.boxSizing,
      overflowY: body.style.overflowY,
      overflowX: body.style.overflowX,
      scrollBehavior: body.style.scrollBehavior
    }
    const isScrollableY = html.scrollHeight > html.clientHeight
    const isScrollableX = html.scrollWidth > html.clientWidth
    const hasConstantOverflowY =
      htmlStyles.overflowY === 'scroll' || bodyStyles.overflowY === 'scroll'
    const hasConstantOverflowX =
      htmlStyles.overflowX === 'scroll' || bodyStyles.overflowX === 'scroll'
    const scrollbarWidth = Math.max(0, win.innerWidth - body.clientWidth)
    const scrollbarHeight = Math.max(0, win.innerHeight - body.clientHeight)
    const marginY =
      parseFloat(bodyStyles.marginTop) + parseFloat(bodyStyles.marginBottom)
    const marginX =
      parseFloat(bodyStyles.marginLeft) + parseFloat(bodyStyles.marginRight)
    const elementToLock = isOverflowElement(html) ? html : body
    updateGutterOnly = supportsStableScrollbarGutter(referenceElement)
    if (updateGutterOnly) {
      html.style.scrollbarGutter = scrollbarGutterValue
      elementToLock.style.overflowY = 'hidden'
      elementToLock.style.overflowX = 'hidden'
      return
    }
    Object.assign(html.style, {
      scrollbarGutter: scrollbarGutterValue,
      overflowY: 'hidden',
      overflowX: 'hidden'
    })
    if (isScrollableY || hasConstantOverflowY) html.style.overflowY = 'scroll'
    if (isScrollableX || hasConstantOverflowX) html.style.overflowX = 'scroll'
    Object.assign(body.style, {
      position: 'relative',
      height:
        marginY || scrollbarHeight
          ? `calc(100dvh - ${marginY + scrollbarHeight}px)`
          : '100dvh',
      width:
        marginX || scrollbarWidth
          ? `calc(100vw - ${marginX + scrollbarWidth}px)`
          : '100vw',
      boxSizing: 'border-box',
      overflow: 'hidden',
      scrollBehavior: 'unset'
    })
    body.scrollTop = scrollTop
    body.scrollLeft = scrollLeft
    html.setAttribute('data-base-ui-scroll-locked', '')
    html.style.scrollBehavior = 'unset'
  }
  function cleanup() {
    Object.assign(html.style, originalHtmlStyles)
    Object.assign(body.style, originalBodyStyles)
    if (!updateGutterOnly) {
      html.scrollTop = scrollTop
      html.scrollLeft = scrollLeft
      html.removeAttribute('data-base-ui-scroll-locked')
      html.style.scrollBehavior = originalHtmlScrollBehavior
    }
  }
  function handleResize() {
    cleanup()
    resizeFrame.request(lockScroll)
  }
  lockScroll()
  const unsubscribeResize = addEventListener(win, 'resize', handleResize)
  return () => {
    resizeFrame.cancel()
    cleanup()
    if (typeof win.removeEventListener === 'function') unsubscribeResize()
  }
}
var ScrollLocker = class {
  lockCount = 0
  restore = null
  timeoutLock = Timeout.create()
  timeoutUnlock = Timeout.create()
  acquire(referenceElement) {
    this.lockCount += 1
    if (this.lockCount === 1 && this.restore === null)
      this.timeoutLock.start(0, () => this.lock(referenceElement))
    return this.release
  }
  release = () => {
    this.lockCount -= 1
    if (this.lockCount === 0 && this.restore)
      this.timeoutUnlock.start(0, this.unlock)
  }
  unlock = () => {
    if (this.lockCount === 0 && this.restore) {
      this.restore?.()
      this.restore = null
    }
  }
  lock(referenceElement) {
    if (this.lockCount === 0 || this.restore !== null) return
    const html = ownerDocument(referenceElement).documentElement
    const htmlOverflowY = getWindow(html).getComputedStyle(html).overflowY
    if (htmlOverflowY === 'hidden' || htmlOverflowY === 'clip') {
      this.restore = NOOP
      return
    }
    const hasOverlayScrollbars = ios || !hasInsetScrollbars(referenceElement)
    this.restore = hasOverlayScrollbars
      ? preventScrollOverlayScrollbars(referenceElement)
      : preventScrollInsetScrollbars(referenceElement)
  }
}
var SCROLL_LOCKER = new ScrollLocker()
/**
 * Locks the scroll of the document when enabled.
 *
 * @param enabled - Whether to enable the scroll lock.
 * @param referenceElement - Element to use as a reference for lock calculations.
 */
function useScrollLock(enabled = true, referenceElement = null) {
  useIsoLayoutEffect(() => {
    if (!enabled) return
    return SCROLL_LOCKER.acquire(referenceElement)
  }, [enabled, referenceElement])
}
//#endregion
//#region node_modules/@base-ui/react/floating-ui-react/utils/event.mjs
function stopEvent(event) {
  event.preventDefault()
  event.stopPropagation()
}
function isReactEvent(event) {
  return 'nativeEvent' in event
}
function isVirtualClick(event) {
  if (event.pointerType === '' && event.isTrusted) return true
  if (android && event.pointerType)
    return event.type === 'click' && event.buttons === 1
  return event.detail === 0 && !event.pointerType
}
function isVirtualPointerEvent(event) {
  if (jsdom) return false
  return (
    (!android && event.width === 0 && event.height === 0) ||
    (android &&
      event.width === 1 &&
      event.height === 1 &&
      event.pressure === 0 &&
      event.detail === 0 &&
      event.pointerType === 'mouse') ||
    (event.width < 1 &&
      event.height < 1 &&
      event.pressure === 0 &&
      event.detail === 0 &&
      event.pointerType === 'touch')
  )
}
function isMouseLikePointerType(pointerType, strict) {
  const values = ['mouse', 'pen']
  if (!strict) values.push('', void 0)
  return values.includes(pointerType)
}
function isClickLikeEvent(event) {
  const type = event.type
  return (
    type === 'click' ||
    type === 'mousedown' ||
    type === 'keydown' ||
    type === 'keyup'
  )
}
//#endregion
//#region node_modules/@base-ui/react/floating-ui-react/utils/constants.mjs
var FOCUSABLE_ATTRIBUTE = 'data-base-ui-focusable'
var TYPEABLE_SELECTOR =
  "input:not([type='hidden']):not([disabled]),[contenteditable]:not([contenteditable='false']),textarea:not([disabled])"
var ARROW_LEFT = 'ArrowLeft'
var ARROW_RIGHT = 'ArrowRight'
var ARROW_UP = 'ArrowUp'
var ARROW_DOWN = 'ArrowDown'
//#endregion
//#region node_modules/@base-ui/react/internals/shadowDom.mjs
function activeElement(doc) {
  let element = doc.activeElement
  while (element?.shadowRoot?.activeElement != null)
    element = element.shadowRoot.activeElement
  return element
}
function contains(parent, child) {
  if (!parent || !child) return false
  const rootNode = child.getRootNode?.()
  if (parent.contains(child)) return true
  if (rootNode && isShadowRoot(rootNode)) {
    let next = child
    while (next) {
      if (parent === next) return true
      next = next.parentNode || next.host
    }
  }
  return false
}
function getTarget(event) {
  if ('composedPath' in event) return event.composedPath()[0]
  return event.target
}
//#endregion
//#region node_modules/@base-ui/react/floating-ui-react/utils/element.mjs
function isEventTargetWithin(event, node) {
  if (node == null) return false
  if ('composedPath' in event) return event.composedPath().includes(node)
  const eventAgain = event
  return eventAgain.target != null && node.contains(eventAgain.target)
}
function isRootElement(element) {
  return element.matches('html,body')
}
function isTypeableElement(element) {
  return (
    isHTMLElement(element) &&
    element.matches(
      "input:not([type='hidden']):not([disabled]),[contenteditable]:not([contenteditable='false']),textarea:not([disabled])"
    )
  )
}
function isInteractiveElement(element) {
  return (
    element?.closest(
      `button,a[href],[role="button"],select,[tabindex]:not([tabindex="-1"]),${TYPEABLE_SELECTOR}`
    ) != null
  )
}
function isTypeableCombobox(element) {
  if (!element) return false
  return (
    element.getAttribute('role') === 'combobox' && isTypeableElement(element)
  )
}
function getFloatingFocusElement(floatingElement) {
  if (!floatingElement) return null
  return floatingElement.hasAttribute('data-base-ui-focusable')
    ? floatingElement
    : floatingElement.querySelector(`[data-base-ui-focusable]`) ||
        floatingElement
}
//#endregion
//#region node_modules/@base-ui/utils/mergeCleanups.mjs
/**
 * Combines multiple cleanup functions into a single cleanup function.
 */
function mergeCleanups(...cleanups) {
  return () => {
    for (let i = 0; i < cleanups.length; i += 1) {
      const cleanup = cleanups[i]
      if (cleanup) cleanup()
    }
  }
}
//#endregion
//#region node_modules/@base-ui/utils/visuallyHidden.mjs
var visuallyHiddenBase = {
  clipPath: 'inset(50%)',
  overflow: 'hidden',
  whiteSpace: 'nowrap',
  border: 0,
  padding: 0,
  width: 1,
  height: 1,
  margin: -1
}
var visuallyHidden = {
  ...visuallyHiddenBase,
  position: 'fixed',
  top: 0,
  left: 0
}
var visuallyHiddenInput = {
  ...visuallyHiddenBase,
  position: 'absolute'
}
//#endregion
//#region node_modules/@base-ui/react/utils/FocusGuard.mjs
/**
 * @internal
 */
var FocusGuard = /* @__PURE__ */ import_react.forwardRef(
  function FocusGuard(props, ref) {
    const [role, setRole] = import_react.useState()
    useIsoLayoutEffect(() => {
      if (voiceOver && webkit) setRole('button')
    }, [])
    const restProps = {
      tabIndex: 0,
      role
    }
    return /* @__PURE__ */ (0, import_jsx_runtime.jsx)('span', {
      ...props,
      ref,
      style: visuallyHidden,
      'aria-hidden': role ? void 0 : true,
      ...restProps,
      'data-base-ui-focus-guard': ''
    })
  }
)
//#endregion
//#region node_modules/@base-ui/react/floating-ui-react/utils/composite.mjs
function isDifferentGridRow(index, cols, prevRow) {
  return Math.floor(index / cols) !== prevRow
}
function isIndexOutOfListBounds(list, index) {
  return index < 0 || index >= list.length
}
function getMinListIndex(listRef, disabledIndices) {
  return findNonDisabledListIndex(listRef.current, { disabledIndices })
}
function getMaxListIndex(listRef, disabledIndices) {
  return findNonDisabledListIndex(listRef.current, {
    decrement: true,
    startingIndex: listRef.current.length,
    disabledIndices
  })
}
function findNonDisabledListIndex(
  list,
  { startingIndex = -1, decrement = false, disabledIndices, amount = 1 } = {}
) {
  let index = startingIndex
  do index += decrement ? -amount : amount
  while (
    index >= 0 &&
    index <= list.length - 1 &&
    isListIndexDisabled(list, index, disabledIndices)
  )
  return index
}
function getGridNavigatedIndex(
  list,
  {
    event,
    orientation,
    loopFocus,
    onLoop,
    rtl,
    cols,
    disabledIndices,
    minIndex,
    maxIndex,
    prevIndex,
    stopEvent: stop = false
  }
) {
  let nextIndex = prevIndex
  let verticalDirection
  if (event.key === 'ArrowUp') verticalDirection = 'up'
  else if (event.key === 'ArrowDown') verticalDirection = 'down'
  if (verticalDirection) {
    const rows = []
    const rowIndexMap = []
    let hasRoleRow = false
    let visibleItemCount = 0
    {
      let currentRowEl = null
      let currentRowIndex = -1
      list.forEach((el, idx) => {
        if (el == null) return
        visibleItemCount += 1
        const rowEl = el.closest('[role="row"]')
        if (rowEl) hasRoleRow = true
        if (rowEl !== currentRowEl || currentRowIndex === -1) {
          currentRowEl = rowEl
          currentRowIndex += 1
          rows[currentRowIndex] = []
        }
        rows[currentRowIndex].push(idx)
        rowIndexMap[idx] = currentRowIndex
      })
    }
    let hasDomRows = false
    let inferredDomCols = 0
    if (hasRoleRow)
      for (const row of rows) {
        const rowLength = row.length
        if (rowLength > inferredDomCols) inferredDomCols = rowLength
        if (rowLength !== cols) hasDomRows = true
      }
    const hasVirtualizedGaps = hasDomRows && visibleItemCount < list.length
    const verticalCols = inferredDomCols || cols
    const navigateVertically = (direction) => {
      if (!hasDomRows || prevIndex === -1) return
      const currentRow = rowIndexMap[prevIndex]
      if (currentRow == null) return
      const colInRow = rows[currentRow].indexOf(prevIndex)
      const step = direction === 'up' ? -1 : 1
      for (
        let nextRow = currentRow + step, i = 0;
        i < rows.length;
        i += 1, nextRow += step
      ) {
        if (nextRow < 0 || nextRow >= rows.length) {
          if (!loopFocus || hasVirtualizedGaps) return
          nextRow = nextRow < 0 ? rows.length - 1 : 0
          if (onLoop) {
            const clampedCol = Math.min(colInRow, rows[nextRow].length - 1)
            nextRow =
              rowIndexMap[
                onLoop(
                  event,
                  prevIndex,
                  rows[nextRow][clampedCol] ?? rows[nextRow][0]
                )
              ] ?? nextRow
          }
        }
        const targetRow = rows[nextRow]
        for (
          let col = Math.min(colInRow, targetRow.length - 1);
          col >= 0;
          col -= 1
        ) {
          const candidate = targetRow[col]
          if (!isListIndexDisabled(list, candidate, disabledIndices))
            return candidate
        }
      }
    }
    const navigateVerticallyWithInferredRows = (direction) => {
      if (!hasVirtualizedGaps || prevIndex === -1) return
      const colInRow = prevIndex % verticalCols
      const rowStep = direction === 'up' ? -verticalCols : verticalCols
      const lastRowStart = maxIndex - (maxIndex % verticalCols)
      const rowCount = floor(maxIndex / verticalCols) + 1
      for (
        let rowStart = prevIndex - colInRow + rowStep, i = 0;
        i < rowCount;
        i += 1, rowStart += rowStep
      ) {
        if (rowStart < 0 || rowStart > maxIndex) {
          if (!loopFocus) return
          rowStart = rowStart < 0 ? lastRowStart : 0
        }
        const rowEnd = Math.min(rowStart + verticalCols - 1, maxIndex)
        for (
          let candidate = Math.min(rowStart + colInRow, rowEnd);
          candidate >= rowStart;
          candidate -= 1
        )
          if (!isListIndexDisabled(list, candidate, disabledIndices))
            return candidate
      }
    }
    if (stop) stopEvent(event)
    const verticalCandidate =
      navigateVertically(verticalDirection) ??
      navigateVerticallyWithInferredRows(verticalDirection)
    if (verticalCandidate !== void 0) nextIndex = verticalCandidate
    else if (prevIndex === -1)
      nextIndex = verticalDirection === 'up' ? maxIndex : minIndex
    else {
      nextIndex = findNonDisabledListIndex(list, {
        startingIndex: prevIndex,
        amount: verticalCols,
        decrement: verticalDirection === 'up',
        disabledIndices
      })
      if (loopFocus) {
        if (
          verticalDirection === 'up' &&
          (prevIndex - verticalCols < minIndex || nextIndex < 0)
        ) {
          const col = prevIndex % verticalCols
          const maxCol = maxIndex % verticalCols
          const offset = maxIndex - (maxCol - col)
          if (maxCol === col) nextIndex = maxIndex
          else nextIndex = maxCol > col ? offset : offset - verticalCols
          if (onLoop) nextIndex = onLoop(event, prevIndex, nextIndex)
        }
        if (
          verticalDirection === 'down' &&
          prevIndex + verticalCols > maxIndex
        ) {
          nextIndex = findNonDisabledListIndex(list, {
            startingIndex: (prevIndex % verticalCols) - verticalCols,
            amount: verticalCols,
            disabledIndices
          })
          if (onLoop) nextIndex = onLoop(event, prevIndex, nextIndex)
        }
      }
    }
    if (isIndexOutOfListBounds(list, nextIndex)) nextIndex = prevIndex
  }
  if (orientation === 'both') {
    const prevRow = floor(prevIndex / cols)
    if (event.key === (rtl ? 'ArrowLeft' : 'ArrowRight')) {
      if (stop) stopEvent(event)
      if (prevIndex % cols !== cols - 1) {
        nextIndex = findNonDisabledListIndex(list, {
          startingIndex: prevIndex,
          disabledIndices
        })
        if (loopFocus && isDifferentGridRow(nextIndex, cols, prevRow)) {
          nextIndex = findNonDisabledListIndex(list, {
            startingIndex: prevIndex - (prevIndex % cols) - 1,
            disabledIndices
          })
          if (onLoop) nextIndex = onLoop(event, prevIndex, nextIndex)
        }
      } else if (loopFocus) {
        nextIndex = findNonDisabledListIndex(list, {
          startingIndex: prevIndex - (prevIndex % cols) - 1,
          disabledIndices
        })
        if (onLoop) nextIndex = onLoop(event, prevIndex, nextIndex)
      }
      if (isDifferentGridRow(nextIndex, cols, prevRow)) nextIndex = prevIndex
    }
    if (event.key === (rtl ? 'ArrowRight' : 'ArrowLeft')) {
      if (stop) stopEvent(event)
      if (prevIndex % cols !== 0) {
        nextIndex = findNonDisabledListIndex(list, {
          startingIndex: prevIndex,
          decrement: true,
          disabledIndices
        })
        if (loopFocus && isDifferentGridRow(nextIndex, cols, prevRow)) {
          nextIndex = findNonDisabledListIndex(list, {
            startingIndex: prevIndex + (cols - (prevIndex % cols)),
            decrement: true,
            disabledIndices
          })
          if (onLoop) nextIndex = onLoop(event, prevIndex, nextIndex)
        }
      } else if (loopFocus) {
        nextIndex = findNonDisabledListIndex(list, {
          startingIndex: prevIndex + (cols - (prevIndex % cols)),
          decrement: true,
          disabledIndices
        })
        if (onLoop) nextIndex = onLoop(event, prevIndex, nextIndex)
      }
      if (isDifferentGridRow(nextIndex, cols, prevRow)) nextIndex = prevIndex
    }
    const lastRow = floor(maxIndex / cols) === prevRow
    if (isIndexOutOfListBounds(list, nextIndex))
      if (loopFocus && lastRow) {
        nextIndex =
          event.key === (rtl ? 'ArrowRight' : 'ArrowLeft')
            ? maxIndex
            : findNonDisabledListIndex(list, {
                startingIndex: prevIndex - (prevIndex % cols) - 1,
                disabledIndices
              })
        if (onLoop) nextIndex = onLoop(event, prevIndex, nextIndex)
      } else nextIndex = prevIndex
  }
  return nextIndex
}
function isListIndexDisabled(list, index, disabledIndices) {
  if (
    typeof disabledIndices === 'function'
      ? disabledIndices(index)
      : (disabledIndices?.includes(index) ?? false)
  )
    return true
  const element = list[index]
  if (!element) return false
  if (!isElementVisible(element)) return true
  return (
    !disabledIndices &&
    (element.hasAttribute('disabled') ||
      element.getAttribute('aria-disabled') === 'true')
  )
}
function isHiddenByStyles(styles) {
  return styles.visibility === 'hidden' || styles.visibility === 'collapse'
}
function isElementVisible(
  element,
  styles = element ? getComputedStyle$1(element) : null
) {
  if (!element || !element.isConnected || !styles || isHiddenByStyles(styles))
    return false
  if (typeof element.checkVisibility === 'function')
    return element.checkVisibility()
  return styles.display !== 'none' && styles.display !== 'contents'
}
//#endregion
//#region node_modules/@base-ui/react/floating-ui-react/utils/tabbable.mjs
var CANDIDATE_SELECTOR =
  'a[href],button,input,select,textarea,summary,details,iframe,object,embed,[tabindex],[contenteditable]:not([contenteditable="false"]),audio[controls],video[controls]'
function getParentElement(element) {
  const assignedSlot = element.assignedSlot
  if (assignedSlot) return assignedSlot
  if (element.parentElement) return element.parentElement
  const rootNode = element.getRootNode()
  return isShadowRoot(rootNode) ? rootNode.host : null
}
function getDetailsSummary(details) {
  for (const child of Array.from(details.children))
    if (getNodeName(child) === 'summary') return child
  return null
}
function isWithinOpenDetailsSummary(element, details) {
  const summary = getDetailsSummary(details)
  return !!summary && (element === summary || contains(summary, element))
}
function isFocusableCandidate(element) {
  const nodeName = element ? getNodeName(element) : ''
  return (
    element != null &&
    element.matches(CANDIDATE_SELECTOR) &&
    (nodeName !== 'summary' ||
      (element.parentElement != null &&
        getNodeName(element.parentElement) === 'details' &&
        getDetailsSummary(element.parentElement) === element)) &&
    (nodeName !== 'details' || getDetailsSummary(element) == null) &&
    (nodeName !== 'input' || element.type !== 'hidden')
  )
}
function isFocusableElement(element) {
  if (
    !isFocusableCandidate(element) ||
    !element.isConnected ||
    element.matches(':disabled')
  )
    return false
  for (let current = element; current; current = getParentElement(current)) {
    const isAncestor = current !== element
    const isSlot = getNodeName(current) === 'slot'
    if (current.hasAttribute('inert')) return false
    if (
      (isAncestor &&
        getNodeName(current) === 'details' &&
        !current.open &&
        !isWithinOpenDetailsSummary(element, current)) ||
      current.hasAttribute('hidden') ||
      (!isSlot && !isVisibleInTabbableTree(current, isAncestor))
    )
      return false
  }
  return true
}
function isVisibleInTabbableTree(element, isAncestor) {
  const styles = getComputedStyle$1(element)
  if (!isAncestor) return isElementVisible(element, styles)
  return styles.display !== 'none'
}
function getTabIndex(element) {
  const tabIndex = element.tabIndex
  if (tabIndex < 0) {
    const nodeName = getNodeName(element)
    if (
      nodeName === 'details' ||
      nodeName === 'audio' ||
      nodeName === 'video' ||
      (isHTMLElement(element) && element.isContentEditable)
    )
      return 0
  }
  return tabIndex
}
function getNamedRadioInput(element) {
  if (getNodeName(element) !== 'input') return null
  const input = element
  return input.type === 'radio' && input.name !== '' ? input : null
}
function isTabbableRadio(element, candidates) {
  const input = getNamedRadioInput(element)
  if (!input) return true
  const checkedRadio = candidates.find((candidate) => {
    const radio = getNamedRadioInput(candidate)
    return (
      radio?.name === input.name && radio.form === input.form && radio.checked
    )
  })
  if (checkedRadio) return checkedRadio === input
  return (
    candidates.find((candidate) => {
      const radio = getNamedRadioInput(candidate)
      return radio?.name === input.name && radio.form === input.form
    }) === input
  )
}
function getComposedChildren(container) {
  if (isHTMLElement(container) && getNodeName(container) === 'slot') {
    const assignedElements = container.assignedElements({ flatten: true })
    if (assignedElements.length > 0) return assignedElements
  }
  if (isHTMLElement(container) && container.shadowRoot)
    return Array.from(container.shadowRoot.children)
  return Array.from(container.children)
}
function appendCandidates(container, list) {
  getComposedChildren(container).forEach((child) => {
    if (isFocusableCandidate(child)) list.push(child)
    appendCandidates(child, list)
  })
}
function appendMatchingElements(container, selector, list) {
  getComposedChildren(container).forEach((child) => {
    if (isHTMLElement(child) && child.matches(selector)) list.push(child)
    appendMatchingElements(child, selector, list)
  })
}
function isTabbable(element) {
  return isFocusableElement(element) && getTabIndex(element) >= 0
}
function focusable(container) {
  const candidates = []
  appendCandidates(container, candidates)
  return candidates.filter(isFocusableElement)
}
function tabbable(container) {
  const candidates = focusable(container)
  return candidates.filter(
    (element) =>
      getTabIndex(element) >= 0 && isTabbableRadio(element, candidates)
  )
}
function getTabbableIn(container, dir) {
  const list = tabbable(container)
  const len = list.length
  if (len === 0) return
  const active = activeElement(ownerDocument(container))
  const index = list.indexOf(active)
  return list[index === -1 ? (dir === 1 ? 0 : len - 1) : index + dir]
}
function getNextTabbable(referenceElement) {
  return (
    getTabbableIn(ownerDocument(referenceElement).body, 1) || referenceElement
  )
}
function getPreviousTabbable(referenceElement) {
  return (
    getTabbableIn(ownerDocument(referenceElement).body, -1) || referenceElement
  )
}
function isOutsideEvent(event, container) {
  const containerElement = container || event.currentTarget
  const relatedTarget = event.relatedTarget
  return !relatedTarget || !contains(containerElement, relatedTarget)
}
function disableFocusInside(container) {
  tabbable(container).forEach((element) => {
    element.dataset.tabindex = element.getAttribute('tabindex') || ''
    element.setAttribute('tabindex', '-1')
  })
}
function enableFocusInside(container) {
  const elements = []
  appendMatchingElements(container, '[data-tabindex]', elements)
  elements.forEach((element) => {
    const tabindex = element.dataset.tabindex
    delete element.dataset.tabindex
    if (tabindex) element.setAttribute('tabindex', tabindex)
    else element.removeAttribute('tabindex')
  })
}
//#endregion
//#region node_modules/@base-ui/react/floating-ui-react/utils/nodes.mjs
function getNodeChildren(nodes, id, onlyOpenChildren = true) {
  return nodes
    .filter((node) => node.parentId === id)
    .flatMap((child) => [
      ...(!onlyOpenChildren || child.context?.open ? [child] : []),
      ...getNodeChildren(nodes, child.id, onlyOpenChildren)
    ])
}
function getNodeAncestors(nodes, id) {
  let allAncestors = []
  let currentParentId = nodes.find((node) => node.id === id)?.parentId
  while (currentParentId) {
    const currentNode = nodes.find((node) => node.id === currentParentId)
    currentParentId = currentNode?.parentId
    if (currentNode) allAncestors = allAncestors.concat(currentNode)
  }
  return allAncestors
}
//#endregion
//#region node_modules/@base-ui/react/floating-ui-react/utils/createAttribute.mjs
function createAttribute(name) {
  return `data-base-ui-${name}`
}
//#endregion
//#region node_modules/@base-ui/react/floating-ui-react/utils/enqueueFocus.mjs
var rafId = 0
function enqueueFocus(el, options = {}) {
  const { preventScroll = false, sync = false, shouldFocus } = options
  cancelAnimationFrame(rafId)
  function exec() {
    if (shouldFocus && !shouldFocus()) return
    el?.focus({ preventScroll })
  }
  if (sync) {
    exec()
    return NOOP
  }
  const currentRafId = requestAnimationFrame(exec)
  rafId = currentRafId
  return () => {
    if (rafId === currentRafId) {
      cancelAnimationFrame(currentRafId)
      rafId = 0
    }
  }
}
//#endregion
//#region node_modules/@base-ui/react/floating-ui-react/utils/markOthers.mjs
var counters = {
  inert: /* @__PURE__ */ new WeakMap(),
  'aria-hidden': /* @__PURE__ */ new WeakMap()
}
var markerName = 'data-base-ui-inert'
var uncontrolledElementsSets = {
  inert: /* @__PURE__ */ new WeakSet(),
  'aria-hidden': /* @__PURE__ */ new WeakSet()
}
var markerCounterMap = /* @__PURE__ */ new WeakMap()
var lockCount = 0
function getUncontrolledElementsSet(controlAttribute) {
  return uncontrolledElementsSets[controlAttribute]
}
function unwrapHost(node) {
  if (!node) return null
  return isShadowRoot(node) ? node.host : unwrapHost(node.parentNode)
}
var correctElements = (parent, targets) =>
  targets
    .map((target) => {
      if (parent.contains(target)) return target
      const correctedTarget = unwrapHost(target)
      if (parent.contains(correctedTarget)) return correctedTarget
      return null
    })
    .filter((x) => x != null)
var buildKeepSet = (targets) => {
  const keep = /* @__PURE__ */ new Set()
  targets.forEach((target) => {
    let node = target
    while (node && !keep.has(node)) {
      keep.add(node)
      node = node.parentNode
    }
  })
  return keep
}
var collectOutsideElements = (root, keepElements, stopElements) => {
  const outside = []
  const walk = (parent) => {
    if (!parent || stopElements.has(parent)) return
    Array.from(parent.children).forEach((node) => {
      if (getNodeName(node) === 'script') return
      if (keepElements.has(node)) walk(node)
      else outside.push(node)
    })
  }
  walk(root)
  return outside
}
function applyAttributeToOthers(
  uncorrectedAvoidElements,
  body,
  ariaHidden,
  inert,
  { mark = true }
) {
  let controlAttribute = null
  if (inert) controlAttribute = 'inert'
  else if (ariaHidden) controlAttribute = 'aria-hidden'
  let counterMap = null
  let uncontrolledElementsSet = null
  const avoidElements = correctElements(body, uncorrectedAvoidElements)
  const markerTargets = mark
    ? collectOutsideElements(
        body,
        buildKeepSet(avoidElements),
        new Set(avoidElements)
      )
    : []
  const hiddenElements = []
  const markedElements = []
  if (controlAttribute) {
    const map = counters[controlAttribute]
    const currentUncontrolledElementsSet =
      getUncontrolledElementsSet(controlAttribute)
    uncontrolledElementsSet = currentUncontrolledElementsSet
    counterMap = map
    const ariaLiveElements = correctElements(
      body,
      Array.from(body.querySelectorAll('[aria-live]'))
    )
    const controlElements = avoidElements.concat(ariaLiveElements)
    collectOutsideElements(
      body,
      buildKeepSet(controlElements),
      new Set(controlElements)
    ).forEach((node) => {
      const attr = node.getAttribute(controlAttribute)
      const alreadyHidden = attr !== null && attr !== 'false'
      const counterValue = (map.get(node) || 0) + 1
      map.set(node, counterValue)
      hiddenElements.push(node)
      if (counterValue === 1 && alreadyHidden)
        currentUncontrolledElementsSet.add(node)
      if (!alreadyHidden)
        node.setAttribute(
          controlAttribute,
          controlAttribute === 'inert' ? '' : 'true'
        )
    })
  }
  if (mark)
    markerTargets.forEach((node) => {
      const markerValue = (markerCounterMap.get(node) || 0) + 1
      markerCounterMap.set(node, markerValue)
      markedElements.push(node)
      if (markerValue === 1) node.setAttribute(markerName, '')
    })
  lockCount += 1
  return () => {
    if (counterMap)
      hiddenElements.forEach((element) => {
        const counterValue = (counterMap.get(element) || 0) - 1
        counterMap.set(element, counterValue)
        if (!counterValue) {
          if (!uncontrolledElementsSet?.has(element) && controlAttribute)
            element.removeAttribute(controlAttribute)
          uncontrolledElementsSet?.delete(element)
        }
      })
    if (mark)
      markedElements.forEach((element) => {
        const markerValue = (markerCounterMap.get(element) || 0) - 1
        markerCounterMap.set(element, markerValue)
        if (!markerValue) element.removeAttribute(markerName)
      })
    lockCount -= 1
    if (!lockCount) {
      counters.inert = /* @__PURE__ */ new WeakMap()
      counters['aria-hidden'] = /* @__PURE__ */ new WeakMap()
      uncontrolledElementsSets.inert = /* @__PURE__ */ new WeakSet()
      uncontrolledElementsSets['aria-hidden'] = /* @__PURE__ */ new WeakSet()
      markerCounterMap = /* @__PURE__ */ new WeakMap()
    }
  }
}
function markOthers(avoidElements, options = {}) {
  const { ariaHidden = false, inert = false, mark = true } = options
  const body = ownerDocument(avoidElements[0]).body
  return applyAttributeToOthers(avoidElements, body, ariaHidden, inert, {
    mark
  })
}
//#endregion
//#region node_modules/@base-ui/react/internals/constants.mjs
var DISABLED_TRANSITIONS_STYLE = { style: { transition: 'none' } }
var BASE_UI_SWIPE_IGNORE_ATTRIBUTE = 'data-base-ui-swipe-ignore'
var LEGACY_SWIPE_IGNORE_ATTRIBUTE = 'data-swipe-ignore'
;`${BASE_UI_SWIPE_IGNORE_ATTRIBUTE}`
;`${LEGACY_SWIPE_IGNORE_ATTRIBUTE}`
/**
 * Used for dropdowns that usually strictly prefer top/bottom placements and
 * use `var(--available-height)` to limit their height.
 */
var DROPDOWN_COLLISION_AVOIDANCE = { fallbackAxisSide: 'none' }
/**
 * Special visually hidden styles for the aria-owns owner element to ensure owned element
 * accessibility in iOS/Safari/VoiceControl.
 * The owner element is an empty span, so most of the common visually hidden styles are not needed.
 * @see https://github.com/floating-ui/floating-ui/issues/3403
 */
var ownerVisuallyHidden = {
  clipPath: 'inset(50%)',
  position: 'fixed',
  top: 0,
  left: 0
}
//#endregion
//#region node_modules/@base-ui/react/floating-ui-react/components/FloatingPortal.mjs
var PortalContext = /* @__PURE__ */ import_react.createContext(null)
var usePortalContext = () => import_react.useContext(PortalContext)
var attr = createAttribute('portal')
function useFloatingPortalNode(props = {}) {
  const {
    ref,
    container: containerProp,
    componentProps = EMPTY_OBJECT,
    elementProps
  } = props
  const uniqueId = useId()
  const parentPortalNode = usePortalContext()?.portalNode
  const [containerElement, setContainerElement] = import_react.useState(null)
  const [portalNode, setPortalNode] = import_react.useState(null)
  const setPortalNodeRef = useStableCallback((node) => {
    if (node !== null) setPortalNode(node)
  })
  const containerRef = import_react.useRef(null)
  useIsoLayoutEffect(() => {
    if (containerProp === null) {
      if (containerRef.current) {
        containerRef.current = null
        setPortalNode(null)
        setContainerElement(null)
      }
      return
    }
    if (uniqueId == null) return
    const resolvedContainer =
      (containerProp &&
        (isNode(containerProp) ? containerProp : containerProp.current)) ??
      parentPortalNode ??
      document.body
    if (resolvedContainer == null) {
      if (containerRef.current) {
        containerRef.current = null
        setPortalNode(null)
        setContainerElement(null)
      }
      return
    }
    if (containerRef.current !== resolvedContainer) {
      containerRef.current = resolvedContainer
      setPortalNode(null)
      setContainerElement(resolvedContainer)
    }
  }, [containerProp, parentPortalNode, uniqueId])
  const portalElement = useRenderElement('div', componentProps, {
    ref: [ref, setPortalNodeRef],
    props: [
      {
        id: uniqueId,
        [attr]: ''
      },
      elementProps
    ]
  })
  return {
    portalNode,
    portalSubtree:
      containerElement && portalElement
        ? /* @__PURE__ */ import_react_dom.createPortal(
            portalElement,
            containerElement
          )
        : null
  }
}
/**
 * Portals the floating element into a given container element — by default,
 * outside of the app root and into the body.
 * This is necessary to ensure the floating element can appear outside any
 * potential parent containers that cause clipping (such as `overflow: hidden`),
 * while retaining its location in the React tree.
 * @see https://floating-ui.com/docs/FloatingPortal
 * @internal
 */
var FloatingPortal = /* @__PURE__ */ import_react.forwardRef(
  function FloatingPortal(componentProps, forwardedRef) {
    const {
      render,
      className,
      style,
      children,
      container,
      renderGuards,
      ...elementProps
    } = componentProps
    const { portalNode, portalSubtree } = useFloatingPortalNode({
      container,
      ref: forwardedRef,
      componentProps,
      elementProps
    })
    const beforeOutsideRef = import_react.useRef(null)
    const afterOutsideRef = import_react.useRef(null)
    const beforeInsideRef = import_react.useRef(null)
    const afterInsideRef = import_react.useRef(null)
    const [focusManagerState, setFocusManagerState] =
      import_react.useState(null)
    const focusInsideDisabledRef = import_react.useRef(false)
    const modal = focusManagerState?.modal
    const open = focusManagerState?.open
    const shouldRenderGuards =
      typeof renderGuards === 'boolean'
        ? renderGuards
        : !!focusManagerState &&
          !focusManagerState.modal &&
          focusManagerState.open &&
          !!portalNode
    import_react.useEffect(() => {
      if (!portalNode || modal) return
      function onFocus(event) {
        if (portalNode && event.relatedTarget && isOutsideEvent(event))
          if (event.type === 'focusin') {
            if (focusInsideDisabledRef.current) {
              enableFocusInside(portalNode)
              focusInsideDisabledRef.current = false
            }
          } else {
            disableFocusInside(portalNode)
            focusInsideDisabledRef.current = true
          }
      }
      return mergeCleanups(
        addEventListener(portalNode, 'focusin', onFocus, true),
        addEventListener(portalNode, 'focusout', onFocus, true)
      )
    }, [portalNode, modal])
    useIsoLayoutEffect(() => {
      if (!portalNode || open !== true || !focusInsideDisabledRef.current)
        return
      enableFocusInside(portalNode)
      focusInsideDisabledRef.current = false
    }, [open, portalNode])
    const portalContextValue = import_react.useMemo(
      () => ({
        beforeOutsideRef,
        afterOutsideRef,
        beforeInsideRef,
        afterInsideRef,
        portalNode,
        setFocusManagerState
      }),
      [portalNode]
    )
    return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_react.Fragment, {
      children: [
        portalSubtree,
        /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(PortalContext.Provider, {
          value: portalContextValue,
          children: [
            shouldRenderGuards &&
              portalNode &&
              /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FocusGuard, {
                'data-type': 'outside',
                ref: beforeOutsideRef,
                onFocus: (event) => {
                  if (isOutsideEvent(event, portalNode))
                    beforeInsideRef.current?.focus()
                  else
                    getPreviousTabbable(
                      focusManagerState ? focusManagerState.domReference : null
                    )?.focus()
                }
              }),
            shouldRenderGuards &&
              portalNode &&
              /* @__PURE__ */ (0, import_jsx_runtime.jsx)('span', {
                'aria-owns': portalNode.id,
                style: ownerVisuallyHidden
              }),
            portalNode &&
              /* @__PURE__ */ import_react_dom.createPortal(
                children,
                portalNode
              ),
            shouldRenderGuards &&
              portalNode &&
              /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FocusGuard, {
                'data-type': 'outside',
                ref: afterOutsideRef,
                onFocus: (event) => {
                  if (isOutsideEvent(event, portalNode))
                    afterInsideRef.current?.focus()
                  else {
                    getNextTabbable(
                      focusManagerState ? focusManagerState.domReference : null
                    )?.focus()
                    if (focusManagerState?.closeOnFocusOut)
                      focusManagerState?.onOpenChange(
                        false,
                        createChangeEventDetails('focus-out', event.nativeEvent)
                      )
                  }
                }
              })
          ]
        })
      ]
    })
  }
)
//#endregion
//#region node_modules/@base-ui/react/floating-ui-react/utils/createEventEmitter.mjs
function createEventEmitter() {
  const map = /* @__PURE__ */ new Map()
  return {
    emit(event, data) {
      map.get(event)?.forEach((listener) => listener(data))
    },
    on(event, listener) {
      if (!map.has(event)) map.set(event, /* @__PURE__ */ new Set())
      map.get(event).add(listener)
    },
    off(event, listener) {
      map.get(event)?.delete(listener)
    }
  }
}
//#endregion
//#region node_modules/@base-ui/react/floating-ui-react/components/FloatingTree.mjs
var FloatingNodeContext = /* @__PURE__ */ import_react.createContext(null)
var FloatingTreeContext = /* @__PURE__ */ import_react.createContext(null)
var useFloatingParentNodeId = () =>
  import_react.useContext(FloatingNodeContext)?.id || null
/**
 * Returns the nearest floating tree context, if available.
 */
var useFloatingTree = (externalTree) => {
  const contextTree = import_react.useContext(FloatingTreeContext)
  return externalTree ?? contextTree
}
//#endregion
//#region node_modules/@base-ui/react/floating-ui-react/components/FloatingFocusManager.mjs
function getEventType(event, lastInteractionType) {
  const win = getWindow(getTarget(event))
  if (event instanceof win.KeyboardEvent) return 'keyboard'
  if (event instanceof win.FocusEvent) return lastInteractionType || 'keyboard'
  if ('pointerType' in event) return event.pointerType || 'keyboard'
  if ('touches' in event) return 'touch'
  if (event instanceof win.MouseEvent)
    return lastInteractionType || (event.detail === 0 ? 'keyboard' : 'mouse')
  return ''
}
var LIST_LIMIT = 20
var previouslyFocusedElements = []
function clearDisconnectedPreviouslyFocusedElements() {
  previouslyFocusedElements = previouslyFocusedElements.filter((entry) => {
    return entry.deref()?.isConnected
  })
}
function addPreviouslyFocusedElement(element) {
  clearDisconnectedPreviouslyFocusedElements()
  if (element && getNodeName(element) !== 'body') {
    previouslyFocusedElements.push(new WeakRef(element))
    if (previouslyFocusedElements.length > LIST_LIMIT)
      previouslyFocusedElements = previouslyFocusedElements.slice(-20)
  }
}
function getPreviouslyFocusedElement() {
  clearDisconnectedPreviouslyFocusedElements()
  return previouslyFocusedElements[
    previouslyFocusedElements.length - 1
  ]?.deref()
}
function getFirstTabbableElement(container) {
  if (!container) return null
  if (isTabbable(container)) return container
  return tabbable(container)[0] || container
}
function handleTabIndex(floatingFocusElement) {
  if (
    floatingFocusElement.hasAttribute('tabindex') &&
    !floatingFocusElement.hasAttribute('data-tabindex')
  )
    return
  if (!floatingFocusElement.getAttribute('role')?.includes('dialog')) return
  const tabbableContent = focusable(floatingFocusElement).filter((element) => {
    const dataTabIndex = element.getAttribute('data-tabindex') || ''
    return (
      isTabbable(element) ||
      (element.hasAttribute('data-tabindex') && !dataTabIndex.startsWith('-'))
    )
  })
  const tabIndex = floatingFocusElement.getAttribute('tabindex')
  if (tabbableContent.length === 0) {
    if (tabIndex !== '0') {
      floatingFocusElement.setAttribute('tabindex', '0')
      floatingFocusElement.setAttribute('data-tabindex', '0')
    }
  } else if (
    tabIndex !== '-1' ||
    (floatingFocusElement.hasAttribute('data-tabindex') &&
      floatingFocusElement.getAttribute('data-tabindex') !== '-1')
  ) {
    floatingFocusElement.setAttribute('tabindex', '-1')
    floatingFocusElement.setAttribute('data-tabindex', '-1')
  }
}
/**
 * Provides focus management for the floating element.
 * @see https://floating-ui.com/docs/FloatingFocusManager
 * @internal
 */
function FloatingFocusManager(props) {
  const {
    context,
    children,
    disabled = false,
    initialFocus = true,
    returnFocus = true,
    restoreFocus = false,
    modal = true,
    closeOnFocusOut = true,
    openInteractionType = '',
    nextFocusableElement,
    previousFocusableElement,
    beforeContentFocusGuardRef,
    externalTree,
    getInsideElements
  } = props
  const store = 'rootStore' in context ? context.rootStore : context
  const open = store.useState('open')
  const domReference = store.useState('domReferenceElement')
  const floating = store.useState('floatingElement')
  const { events, dataRef } = store.context
  const getNodeId = useStableCallback(
    () => dataRef.current.floatingContext?.nodeId
  )
  const ignoreInitialFocus = initialFocus === false
  const isUntrappedTypeableCombobox =
    isTypeableCombobox(domReference) && ignoreInitialFocus
  const initialFocusRef = useValueAsRef(initialFocus)
  const returnFocusRef = useValueAsRef(returnFocus)
  const openInteractionTypeRef = useValueAsRef(openInteractionType)
  const openRef = useValueAsRef(open)
  const tree = useFloatingTree(externalTree)
  const portalContext = usePortalContext()
  const preventReturnFocusRef = import_react.useRef(false)
  const isPointerDownRef = import_react.useRef(false)
  const pointerDownOutsideRef = import_react.useRef(false)
  const lastFocusedTabbableRef = import_react.useRef(null)
  const closeTypeRef = import_react.useRef('')
  const lastInteractionTypeRef = import_react.useRef('')
  const beforeGuardRef = import_react.useRef(null)
  const afterGuardRef = import_react.useRef(null)
  const mergedBeforeGuardRef = useMergedRefs(
    beforeGuardRef,
    beforeContentFocusGuardRef,
    portalContext?.beforeInsideRef
  )
  const mergedAfterGuardRef = useMergedRefs(
    afterGuardRef,
    portalContext?.afterInsideRef
  )
  const blurTimeout = useTimeout()
  const pointerDownTimeout = useTimeout()
  const restoreFocusFrame = useAnimationFrame()
  const isInsidePortal = portalContext != null
  const floatingFocusElement = getFloatingFocusElement(floating)
  const getTabbableContent = useStableCallback(
    (container = floatingFocusElement) => {
      return container ? tabbable(container) : []
    }
  )
  const getResolvedInsideElements = useStableCallback(
    () => getInsideElements?.().filter((element) => element != null) ?? []
  )
  import_react.useEffect(() => {
    if (disabled || !modal) return
    function onKeyDown(event) {
      if (event.key === 'Tab') {
        if (
          contains(
            floatingFocusElement,
            activeElement(ownerDocument(floatingFocusElement))
          ) &&
          getTabbableContent().length === 0 &&
          !isUntrappedTypeableCombobox
        )
          stopEvent(event)
      }
    }
    return addEventListener(
      ownerDocument(floatingFocusElement),
      'keydown',
      onKeyDown
    )
  }, [
    disabled,
    floatingFocusElement,
    modal,
    isUntrappedTypeableCombobox,
    getTabbableContent
  ])
  import_react.useEffect(() => {
    if (disabled || !open) return
    const doc = ownerDocument(floatingFocusElement)
    function clearPointerDownOutside() {
      pointerDownOutsideRef.current = false
    }
    function onPointerDown(event) {
      const target = getTarget(event)
      const insideElements = getResolvedInsideElements()
      pointerDownOutsideRef.current = !(
        contains(floating, target) ||
        contains(domReference, target) ||
        contains(portalContext?.portalNode, target) ||
        insideElements.some(
          (element) => element === target || contains(element, target)
        )
      )
      lastInteractionTypeRef.current = event.pointerType || 'keyboard'
      if (target?.closest(`[data-base-ui-click-trigger]`)) {
        isPointerDownRef.current = true
        pointerDownTimeout.start(0, () => {
          isPointerDownRef.current = false
        })
      }
    }
    function onKeyDown() {
      lastInteractionTypeRef.current = 'keyboard'
    }
    return mergeCleanups(
      addEventListener(doc, 'pointerdown', onPointerDown, true),
      addEventListener(doc, 'pointerup', clearPointerDownOutside, true),
      addEventListener(doc, 'pointercancel', clearPointerDownOutside, true),
      addEventListener(doc, 'keydown', onKeyDown, true),
      clearPointerDownOutside
    )
  }, [
    disabled,
    floating,
    domReference,
    floatingFocusElement,
    open,
    portalContext,
    pointerDownTimeout,
    getResolvedInsideElements
  ])
  import_react.useEffect(() => {
    if (disabled || !closeOnFocusOut) return
    const doc = ownerDocument(floatingFocusElement)
    function handlePointerDown() {
      isPointerDownRef.current = true
      pointerDownTimeout.start(0, () => {
        isPointerDownRef.current = false
      })
    }
    function handleFocusIn(event) {
      const target = getTarget(event)
      if (isTabbable(target)) lastFocusedTabbableRef.current = target
    }
    function handleFocusOutside(event) {
      const relatedTarget = event.relatedTarget
      const currentTarget = event.currentTarget
      const target = getTarget(event)
      if (
        modal &&
        relatedTarget == null &&
        target != null &&
        contains(floating, target)
      )
        addPreviouslyFocusedElement(target)
      queueMicrotask(() => {
        const nodeId = getNodeId()
        const triggers = store.context.triggerElements
        const insideElements = getResolvedInsideElements()
        const isRelatedFocusGuard =
          relatedTarget?.hasAttribute(createAttribute('focus-guard')) &&
          [
            beforeGuardRef.current,
            afterGuardRef.current,
            portalContext?.beforeInsideRef.current,
            portalContext?.afterInsideRef.current,
            portalContext?.beforeOutsideRef.current,
            portalContext?.afterOutsideRef.current,
            resolveRef(previousFocusableElement),
            resolveRef(nextFocusableElement)
          ].includes(relatedTarget)
        const movedToUnrelatedNode = !(
          contains(domReference, relatedTarget) ||
          contains(floating, relatedTarget) ||
          contains(relatedTarget, floating) ||
          contains(portalContext?.portalNode, relatedTarget) ||
          insideElements.some(
            (element) =>
              element === relatedTarget || contains(element, relatedTarget)
          ) ||
          (relatedTarget != null && triggers.hasElement(relatedTarget)) ||
          triggers.hasMatchingElement((trigger) =>
            contains(trigger, relatedTarget)
          ) ||
          isRelatedFocusGuard ||
          (tree &&
            (getNodeChildren(tree.nodesRef.current, nodeId).find(
              (node) =>
                contains(node.context?.elements.floating, relatedTarget) ||
                contains(node.context?.elements.domReference, relatedTarget)
            ) ||
              getNodeAncestors(tree.nodesRef.current, nodeId).find(
                (node) =>
                  [
                    node.context?.elements.floating,
                    getFloatingFocusElement(node.context?.elements.floating)
                  ].includes(relatedTarget) ||
                  node.context?.elements.domReference === relatedTarget
              )))
        )
        if (currentTarget === domReference && floatingFocusElement)
          handleTabIndex(floatingFocusElement)
        if (
          restoreFocus &&
          currentTarget !== domReference &&
          !isElementVisible(target) &&
          activeElement(doc) === doc.body
        ) {
          if (isHTMLElement(floatingFocusElement)) {
            floatingFocusElement.focus()
            if (restoreFocus === 'popup') {
              restoreFocusFrame.request(() => {
                floatingFocusElement.focus()
              })
              return
            }
          }
          const tabbableContent = getTabbableContent()
          const prevTabbable = lastFocusedTabbableRef.current
          const nodeToFocus =
            (prevTabbable && tabbableContent.includes(prevTabbable)
              ? prevTabbable
              : null) ||
            tabbableContent[tabbableContent.length - 1] ||
            floatingFocusElement
          if (isHTMLElement(nodeToFocus)) nodeToFocus.focus()
        }
        if (dataRef.current.insideReactTree) {
          dataRef.current.insideReactTree = false
          return
        }
        if (
          (isUntrappedTypeableCombobox ? true : !modal) &&
          relatedTarget &&
          movedToUnrelatedNode &&
          !isPointerDownRef.current &&
          (isUntrappedTypeableCombobox ||
            relatedTarget !== getPreviouslyFocusedElement())
        ) {
          preventReturnFocusRef.current = true
          store.setOpen(false, createChangeEventDetails(focusOut, event))
        }
      })
    }
    function markInsideReactTree() {
      if (pointerDownOutsideRef.current) return
      dataRef.current.insideReactTree = true
      blurTimeout.start(0, () => {
        dataRef.current.insideReactTree = false
      })
    }
    const domReferenceElement = isHTMLElement(domReference)
      ? domReference
      : null
    if (!floating && !domReferenceElement) return
    return mergeCleanups(
      domReferenceElement &&
        addEventListener(domReferenceElement, 'focusout', handleFocusOutside),
      domReferenceElement &&
        addEventListener(domReferenceElement, 'pointerdown', handlePointerDown),
      floating && addEventListener(floating, 'focusin', handleFocusIn),
      floating && addEventListener(floating, 'focusout', handleFocusOutside),
      floating &&
        portalContext &&
        addEventListener(floating, 'focusout', markInsideReactTree, true)
    )
  }, [
    disabled,
    domReference,
    floating,
    floatingFocusElement,
    modal,
    tree,
    portalContext,
    store,
    closeOnFocusOut,
    restoreFocus,
    getTabbableContent,
    isUntrappedTypeableCombobox,
    getNodeId,
    dataRef,
    blurTimeout,
    pointerDownTimeout,
    restoreFocusFrame,
    nextFocusableElement,
    previousFocusableElement,
    getResolvedInsideElements
  ])
  import_react.useEffect(() => {
    if (disabled || !floating || !open) return
    const portalNodes = Array.from(
      portalContext?.portalNode?.querySelectorAll(
        `[${createAttribute('portal')}]`
      ) || []
    )
    const rootAncestorComboboxDomReference = (
      tree ? getNodeAncestors(tree.nodesRef.current, getNodeId()) : []
    ).find((node) =>
      isTypeableCombobox(node.context?.elements.domReference || null)
    )?.context?.elements.domReference
    const ariaHiddenCleanup = markOthers(
      [
        ...[
          floating,
          ...portalNodes,
          beforeGuardRef.current,
          afterGuardRef.current,
          portalContext?.beforeOutsideRef.current,
          portalContext?.afterOutsideRef.current,
          ...getResolvedInsideElements()
        ],
        rootAncestorComboboxDomReference,
        resolveRef(previousFocusableElement),
        resolveRef(nextFocusableElement),
        isUntrappedTypeableCombobox ? domReference : null
      ].filter((x) => x != null),
      {
        ariaHidden: modal || isUntrappedTypeableCombobox,
        mark: false
      }
    )
    const markerCleanup = markOthers(
      [floating, ...portalNodes].filter((x) => x != null)
    )
    return () => {
      markerCleanup()
      ariaHiddenCleanup()
    }
  }, [
    open,
    disabled,
    domReference,
    floating,
    modal,
    portalContext,
    isUntrappedTypeableCombobox,
    tree,
    getNodeId,
    nextFocusableElement,
    previousFocusableElement,
    getResolvedInsideElements
  ])
  useIsoLayoutEffect(() => {
    if (!open || disabled || !isHTMLElement(floatingFocusElement)) return
    const doc = ownerDocument(floatingFocusElement)
    const previouslyFocusedElement = activeElement(doc)
    queueMicrotask(() => {
      const initialFocusValueOrFn = initialFocusRef.current
      const resolvedInitialFocus =
        typeof initialFocusValueOrFn === 'function'
          ? initialFocusValueOrFn(openInteractionTypeRef.current || '')
          : initialFocusValueOrFn
      if (resolvedInitialFocus === void 0 || resolvedInitialFocus === false)
        return
      if (contains(floatingFocusElement, previouslyFocusedElement)) return
      let focusableElements = null
      const getDefaultFocusElement = () => {
        if (focusableElements == null)
          focusableElements = getTabbableContent(floatingFocusElement)
        return focusableElements[0] || floatingFocusElement
      }
      let elToFocus
      if (resolvedInitialFocus === true || resolvedInitialFocus === null)
        elToFocus = getDefaultFocusElement()
      else elToFocus = resolveRef(resolvedInitialFocus)
      elToFocus = elToFocus || getDefaultFocusElement()
      const hadFocusInside = contains(floatingFocusElement, activeElement(doc))
      enqueueFocus(elToFocus, {
        preventScroll: elToFocus === floatingFocusElement,
        shouldFocus() {
          if (!openRef.current) return false
          if (hadFocusInside) return true
          const currentActiveElement = activeElement(doc)
          return !(
            currentActiveElement !== elToFocus &&
            contains(floatingFocusElement, currentActiveElement)
          )
        }
      })
    })
  }, [
    disabled,
    open,
    floatingFocusElement,
    getTabbableContent,
    initialFocusRef,
    openInteractionTypeRef,
    openRef
  ])
  useIsoLayoutEffect(() => {
    if (disabled || !floatingFocusElement) return
    const doc = ownerDocument(floatingFocusElement)
    const elementFocusedBeforeOpen = activeElement(doc)
    const preferPreviousFocus = openInteractionTypeRef.current == null
    addPreviouslyFocusedElement(elementFocusedBeforeOpen)
    function onOpenChangeLocal(details) {
      if (!details.open)
        closeTypeRef.current = getEventType(
          details.nativeEvent,
          lastInteractionTypeRef.current
        )
      if (
        details.reason === 'trigger-hover' &&
        details.nativeEvent.type === 'mouseleave'
      )
        preventReturnFocusRef.current = true
      if (details.reason !== 'outside-press') return
      if (details.nested) preventReturnFocusRef.current = false
      else if (
        isVirtualClick(details.nativeEvent) ||
        isVirtualPointerEvent(details.nativeEvent)
      )
        preventReturnFocusRef.current = false
      else {
        let isPreventScrollSupported = false
        ownerDocument(floatingFocusElement)
          .createElement('div')
          .focus({
            get preventScroll() {
              isPreventScrollSupported = true
              return false
            }
          })
        if (isPreventScrollSupported) preventReturnFocusRef.current = false
        else preventReturnFocusRef.current = true
      }
    }
    events.on('openchange', onOpenChangeLocal)
    function getReturnElement() {
      const returnFocusValueOrFn = returnFocusRef.current
      let resolvedReturnFocusValue =
        typeof returnFocusValueOrFn === 'function'
          ? returnFocusValueOrFn(closeTypeRef.current)
          : returnFocusValueOrFn
      if (
        resolvedReturnFocusValue === void 0 ||
        resolvedReturnFocusValue === false
      )
        return null
      if (resolvedReturnFocusValue === null) resolvedReturnFocusValue = true
      const referenceReturnElement = domReference?.isConnected
        ? domReference
        : null
      const previousReturnElement =
        elementFocusedBeforeOpen?.isConnected &&
        getNodeName(elementFocusedBeforeOpen) !== 'body'
          ? elementFocusedBeforeOpen
          : null
      let defaultReturnElement = preferPreviousFocus
        ? previousReturnElement || referenceReturnElement
        : referenceReturnElement || previousReturnElement
      if (!defaultReturnElement)
        defaultReturnElement = getPreviouslyFocusedElement() || null
      if (typeof resolvedReturnFocusValue === 'boolean')
        return defaultReturnElement
      return (
        resolveRef(resolvedReturnFocusValue) || defaultReturnElement || null
      )
    }
    return () => {
      events.off('openchange', onOpenChangeLocal)
      const activeEl = activeElement(doc)
      const insideElements = getResolvedInsideElements()
      const isFocusInsideFloatingTree =
        contains(floating, activeEl) ||
        insideElements.some(
          (element) => element === activeEl || contains(element, activeEl)
        ) ||
        (tree &&
          getNodeChildren(tree.nodesRef.current, getNodeId(), false).some(
            (node) => contains(node.context?.elements.floating, activeEl)
          ))
      const returnFocusValueOrFn = returnFocusRef.current
      const returnElement = getReturnElement()
      queueMicrotask(() => {
        const tabbableReturnElement = getFirstTabbableElement(returnElement)
        const hasExplicitReturnFocus = typeof returnFocusValueOrFn !== 'boolean'
        if (
          returnFocusValueOrFn &&
          !preventReturnFocusRef.current &&
          isHTMLElement(tabbableReturnElement) &&
          (!hasExplicitReturnFocus &&
          tabbableReturnElement !== activeEl &&
          activeEl !== doc.body
            ? isFocusInsideFloatingTree
            : true)
        )
          tabbableReturnElement.focus({ preventScroll: true })
        preventReturnFocusRef.current = false
      })
    }
  }, [
    disabled,
    floating,
    floatingFocusElement,
    returnFocusRef,
    openInteractionTypeRef,
    events,
    tree,
    domReference,
    getNodeId,
    getResolvedInsideElements
  ])
  useIsoLayoutEffect(() => {
    if (!webkit || open || !floating) return
    const activeEl = activeElement(ownerDocument(floating))
    if (!isHTMLElement(activeEl) || !isTypeableElement(activeEl)) return
    if (contains(floating, activeEl)) activeEl.blur()
  }, [open, floating])
  useIsoLayoutEffect(() => {
    if (disabled || !portalContext) return
    portalContext.setFocusManagerState({
      modal,
      closeOnFocusOut,
      open,
      onOpenChange: store.setOpen,
      domReference
    })
    return () => {
      portalContext.setFocusManagerState(null)
    }
  }, [
    disabled,
    portalContext,
    modal,
    open,
    store,
    closeOnFocusOut,
    domReference
  ])
  useIsoLayoutEffect(() => {
    if (disabled || !floatingFocusElement) return
    handleTabIndex(floatingFocusElement)
    return () => {
      queueMicrotask(clearDisconnectedPreviouslyFocusedElements)
    }
  }, [disabled, floatingFocusElement])
  const shouldRenderGuards =
    !disabled &&
    (modal ? !isUntrappedTypeableCombobox : true) &&
    (isInsidePortal || modal)
  return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_react.Fragment, {
    children: [
      shouldRenderGuards &&
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FocusGuard, {
          'data-type': 'inside',
          ref: mergedBeforeGuardRef,
          onFocus: (event) => {
            if (modal) {
              const els = getTabbableContent()
              enqueueFocus(els[els.length - 1])
            } else if (portalContext?.portalNode) {
              preventReturnFocusRef.current = false
              if (isOutsideEvent(event, portalContext.portalNode))
                getNextTabbable(domReference)?.focus()
              else
                resolveRef(
                  previousFocusableElement ?? portalContext.beforeOutsideRef
                )?.focus()
            }
          }
        }),
      children,
      shouldRenderGuards &&
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FocusGuard, {
          'data-type': 'inside',
          ref: mergedAfterGuardRef,
          onFocus: (event) => {
            if (modal) enqueueFocus(getTabbableContent()[0])
            else if (portalContext?.portalNode) {
              if (closeOnFocusOut) preventReturnFocusRef.current = true
              if (isOutsideEvent(event, portalContext.portalNode))
                getPreviousTabbable(domReference)?.focus()
              else
                resolveRef(
                  nextFocusableElement ?? portalContext.afterOutsideRef
                )?.focus()
            }
          }
        })
    ]
  })
}
//#endregion
//#region node_modules/@base-ui/react/floating-ui-react/hooks/useClick.mjs
/**
 * Opens or closes the floating element when clicking the reference element.
 * @see https://floating-ui.com/docs/useClick
 */
function useClick(context, props = {}) {
  const {
    enabled = true,
    event: eventOption = 'click',
    toggle = true,
    ignoreMouse = false,
    stickIfOpen = true,
    touchOpenDelay = 0,
    reason = triggerPress
  } = props
  const store = 'rootStore' in context ? context.rootStore : context
  const dataRef = store.context.dataRef
  const pointerTypeRef = import_react.useRef(void 0)
  const frame = useAnimationFrame()
  const touchOpenTimeout = useTimeout()
  const reference = import_react.useMemo(() => {
    function setOpenWithTouchDelay(nextOpen, nativeEvent, target, pointerType) {
      const details = createChangeEventDetails(reason, nativeEvent, target)
      if (nextOpen && pointerType === 'touch' && touchOpenDelay > 0)
        touchOpenTimeout.start(touchOpenDelay, () => {
          store.setOpen(true, details)
        })
      else store.setOpen(nextOpen, details)
    }
    function getNextOpen(open, currentTarget, isClickLikeOpenEvent) {
      const openEvent = dataRef.current.openEvent
      const hasClickedOnInactiveTrigger =
        store.select('domReferenceElement') !== currentTarget
      if (open && hasClickedOnInactiveTrigger) return true
      if (!open) return true
      if (!toggle) return true
      if (openEvent && stickIfOpen) return !isClickLikeOpenEvent(openEvent.type)
      return false
    }
    return {
      onPointerDown(event) {
        pointerTypeRef.current = event.pointerType
      },
      onMouseDown(event) {
        const pointerType = pointerTypeRef.current
        const nativeEvent = event.nativeEvent
        const open = store.select('open')
        if (
          event.button !== 0 ||
          eventOption === 'click' ||
          (isMouseLikePointerType(pointerType, true) && ignoreMouse)
        )
          return
        const nextOpen = getNextOpen(
          open,
          event.currentTarget,
          (openEventType) =>
            openEventType === 'click' || openEventType === 'mousedown'
        )
        const target = getTarget(nativeEvent)
        if (isTypeableElement(target)) {
          setOpenWithTouchDelay(nextOpen, nativeEvent, target, pointerType)
          return
        }
        const eventCurrentTarget = event.currentTarget
        frame.request(() => {
          setOpenWithTouchDelay(
            nextOpen,
            nativeEvent,
            eventCurrentTarget,
            pointerType
          )
        })
      },
      onClick(event) {
        if (eventOption === 'mousedown-only') return
        const pointerType = pointerTypeRef.current
        if (eventOption === 'mousedown' && pointerType) {
          pointerTypeRef.current = void 0
          return
        }
        if (isMouseLikePointerType(pointerType, true) && ignoreMouse) return
        setOpenWithTouchDelay(
          getNextOpen(
            store.select('open'),
            event.currentTarget,
            (openEventType) =>
              openEventType === 'click' ||
              openEventType === 'mousedown' ||
              openEventType === 'keydown' ||
              openEventType === 'keyup'
          ),
          event.nativeEvent,
          event.currentTarget,
          pointerType
        )
      },
      onKeyDown() {
        pointerTypeRef.current = void 0
      }
    }
  }, [
    dataRef,
    eventOption,
    ignoreMouse,
    reason,
    store,
    stickIfOpen,
    toggle,
    frame,
    touchOpenTimeout,
    touchOpenDelay
  ])
  return import_react.useMemo(
    () => (enabled ? { reference } : EMPTY_OBJECT),
    [enabled, reference]
  )
}
//#endregion
//#region node_modules/@base-ui/react/floating-ui-react/hooks/useDismiss.mjs
function alwaysFalse() {
  return false
}
function normalizeProp(normalizable) {
  return {
    escapeKey:
      typeof normalizable === 'boolean'
        ? normalizable
        : (normalizable?.escapeKey ?? false),
    outsidePress:
      typeof normalizable === 'boolean'
        ? normalizable
        : (normalizable?.outsidePress ?? true)
  }
}
/**
 * Closes the floating element when a dismissal is requested — by default, when
 * the user presses the `escape` key or outside of the floating element.
 * @see https://floating-ui.com/docs/useDismiss
 */
function useDismiss(context, props = {}) {
  const {
    enabled = true,
    escapeKey: escapeKey$1 = true,
    outsidePress: outsidePressProp = true,
    outsidePressEvent = 'sloppy',
    referencePress = alwaysFalse,
    bubbles,
    externalTree
  } = props
  const store = 'rootStore' in context ? context.rootStore : context
  const open = store.useState('open')
  const floatingElement = store.useState('floatingElement')
  const { dataRef } = store.context
  const tree = useFloatingTree(externalTree)
  const outsidePressFn = useStableCallback(
    typeof outsidePressProp === 'function' ? outsidePressProp : () => false
  )
  const outsidePress$1 =
    typeof outsidePressProp === 'function' ? outsidePressFn : outsidePressProp
  const outsidePressEnabled = outsidePress$1 !== false
  const getOutsidePressEventProp = useStableCallback(() => outsidePressEvent)
  const { escapeKey: escapeKeyBubbles, outsidePress: outsidePressBubbles } =
    normalizeProp(bubbles)
  const pressStartedInsideRef = import_react.useRef(false)
  const pressStartPreventedRef = import_react.useRef(false)
  const suppressNextOutsideClickRef = import_react.useRef(false)
  const isComposingRef = import_react.useRef(false)
  const currentPointerTypeRef = import_react.useRef('')
  const touchStateRef = import_react.useRef(null)
  const cancelDismissOnEndTimeout = useTimeout()
  const clearInsideReactTreeTimeout = useTimeout()
  const clearInsideReactTree = useStableCallback(() => {
    clearInsideReactTreeTimeout.clear()
    dataRef.current.insideReactTree = false
  })
  const hasBlockingChild = useStableCallback((bubbleKey) => {
    const nodeId = dataRef.current.floatingContext?.nodeId
    return (tree ? getNodeChildren(tree.nodesRef.current, nodeId) : []).some(
      (child) =>
        child.context?.open && !child.context.dataRef.current[bubbleKey]
    )
  })
  const isEventWithinOwnElements = useStableCallback((event) => {
    return (
      isEventTargetWithin(event, store.select('floatingElement')) ||
      isEventTargetWithin(event, store.select('domReferenceElement'))
    )
  })
  const closeOnReferencePress = useStableCallback((event) => {
    if (!referencePress()) return
    store.setOpen(
      false,
      createChangeEventDetails(triggerPress, event.nativeEvent)
    )
  })
  const closeOnEscapeKeyDown = useStableCallback((event) => {
    if (!open || !enabled || !escapeKey$1 || event.key !== 'Escape') return
    if (isComposingRef.current) return
    if (!escapeKeyBubbles && hasBlockingChild('__escapeKeyBubbles')) return
    const eventDetails = createChangeEventDetails(
      escapeKey,
      isReactEvent(event) ? event.nativeEvent : event
    )
    store.setOpen(false, eventDetails)
    if (!eventDetails.isCanceled) event.preventDefault()
    if (!escapeKeyBubbles && !eventDetails.isPropagationAllowed)
      event.stopPropagation()
  })
  const markInsideReactTree = useStableCallback(() => {
    dataRef.current.insideReactTree = true
    clearInsideReactTreeTimeout.start(0, clearInsideReactTree)
  })
  const markPressStartedInsideReactTree = useStableCallback((event) => {
    if (!open || !enabled || event.button !== 0) return
    const target = getTarget(event.nativeEvent)
    if (!contains(store.select('floatingElement'), target)) return
    if (!pressStartedInsideRef.current) {
      pressStartedInsideRef.current = true
      pressStartPreventedRef.current = false
    }
  })
  const markInsidePressStartPrevented = useStableCallback((event) => {
    if (!open || !enabled) return
    if (!(event.defaultPrevented || event.nativeEvent.defaultPrevented)) return
    if (pressStartedInsideRef.current) pressStartPreventedRef.current = true
  })
  import_react.useEffect(() => {
    if (!open || !enabled) return
    dataRef.current.__escapeKeyBubbles = escapeKeyBubbles
    dataRef.current.__outsidePressBubbles = outsidePressBubbles
    const compositionTimeout = new Timeout()
    const preventedPressSuppressionTimeout = new Timeout()
    function handleCompositionStart() {
      compositionTimeout.clear()
      isComposingRef.current = true
    }
    function handleCompositionEnd() {
      compositionTimeout.start(webkit ? 5 : 0, () => {
        isComposingRef.current = false
      })
    }
    function suppressImmediateOutsideClickAfterPreventedStart() {
      suppressNextOutsideClickRef.current = true
      preventedPressSuppressionTimeout.start(0, () => {
        suppressNextOutsideClickRef.current = false
      })
    }
    function resetPressStartState() {
      pressStartedInsideRef.current = false
      pressStartPreventedRef.current = false
    }
    function getOutsidePressEvent() {
      const type = currentPointerTypeRef.current
      const computedType = type === 'pen' || !type ? 'mouse' : type
      const outsidePressEventValue = getOutsidePressEventProp()
      const resolved =
        typeof outsidePressEventValue === 'function'
          ? outsidePressEventValue()
          : outsidePressEventValue
      if (typeof resolved === 'string') return resolved
      return resolved[computedType]
    }
    function shouldIgnoreEvent(event) {
      const computedOutsidePressEvent = getOutsidePressEvent()
      return (
        (computedOutsidePressEvent === 'intentional' &&
          event.type !== 'click') ||
        (computedOutsidePressEvent === 'sloppy' && event.type === 'click')
      )
    }
    function isEventWithinFloatingTree(event) {
      const nodeId = dataRef.current.floatingContext?.nodeId
      const targetIsInsideChildren =
        tree &&
        getNodeChildren(tree.nodesRef.current, nodeId).some((node) =>
          isEventTargetWithin(event, node.context?.elements.floating)
        )
      return isEventWithinOwnElements(event) || targetIsInsideChildren
    }
    function closeOnPressOutside(event) {
      if (shouldIgnoreEvent(event)) {
        if (event.type !== 'click' && !isEventWithinOwnElements(event)) {
          preventedPressSuppressionTimeout.clear()
          suppressNextOutsideClickRef.current = false
        }
        clearInsideReactTree()
        return
      }
      if (dataRef.current.insideReactTree) {
        clearInsideReactTree()
        return
      }
      const target = getTarget(event)
      const inertSelector = `[${createAttribute('inert')}]`
      const targetRoot = isElement(target) ? target.getRootNode() : null
      const markers = Array.from(
        (isShadowRoot(targetRoot)
          ? targetRoot
          : ownerDocument(store.select('floatingElement'))
        ).querySelectorAll(inertSelector)
      )
      const triggers = store.context.triggerElements
      if (
        target &&
        (triggers.hasElement(target) ||
          triggers.hasMatchingElement((trigger) => contains(trigger, target)))
      )
        return
      let targetRootAncestor = isElement(target) ? target : null
      while (targetRootAncestor && !isLastTraversableNode(targetRootAncestor)) {
        const nextParent = getParentNode(targetRootAncestor)
        if (isLastTraversableNode(nextParent) || !isElement(nextParent)) break
        targetRootAncestor = nextParent
      }
      if (
        markers.length &&
        isElement(target) &&
        !isRootElement(target) &&
        !contains(target, store.select('floatingElement')) &&
        markers.every((marker) => !contains(targetRootAncestor, marker))
      )
        return
      if (isHTMLElement(target) && !('touches' in event)) {
        const lastTraversableNode = isLastTraversableNode(target)
        const style = getComputedStyle$1(target)
        const scrollRe = /auto|scroll/
        const isScrollableX =
          lastTraversableNode || scrollRe.test(style.overflowX)
        const isScrollableY =
          lastTraversableNode || scrollRe.test(style.overflowY)
        const canScrollX =
          isScrollableX &&
          target.clientWidth > 0 &&
          target.scrollWidth > target.clientWidth
        const canScrollY =
          isScrollableY &&
          target.clientHeight > 0 &&
          target.scrollHeight > target.clientHeight
        const isRTL = style.direction === 'rtl'
        const pressedVerticalScrollbar =
          canScrollY &&
          (isRTL
            ? event.offsetX <= target.offsetWidth - target.clientWidth
            : event.offsetX > target.clientWidth)
        const pressedHorizontalScrollbar =
          canScrollX && event.offsetY > target.clientHeight
        if (pressedVerticalScrollbar || pressedHorizontalScrollbar) return
      }
      if (isEventWithinFloatingTree(event)) return
      if (
        getOutsidePressEvent() === 'intentional' &&
        suppressNextOutsideClickRef.current
      ) {
        preventedPressSuppressionTimeout.clear()
        suppressNextOutsideClickRef.current = false
        return
      }
      if (typeof outsidePress$1 === 'function' && !outsidePress$1(event)) return
      if (hasBlockingChild('__outsidePressBubbles')) return
      store.setOpen(false, createChangeEventDetails(outsidePress, event))
      clearInsideReactTree()
    }
    function handlePointerDown(event) {
      if (
        getOutsidePressEvent() !== 'sloppy' ||
        event.pointerType === 'touch' ||
        !store.select('open') ||
        !enabled ||
        isEventWithinOwnElements(event)
      )
        return
      closeOnPressOutside(event)
    }
    function handleTouchStart(event) {
      if (
        getOutsidePressEvent() !== 'sloppy' ||
        !store.select('open') ||
        !enabled ||
        isEventWithinOwnElements(event)
      )
        return
      const touch = event.touches[0]
      if (touch) {
        touchStateRef.current = {
          startTime: Date.now(),
          startX: touch.clientX,
          startY: touch.clientY,
          dismissOnTouchEnd: false,
          dismissOnMouseDown: true
        }
        cancelDismissOnEndTimeout.start(1e3, () => {
          if (touchStateRef.current) {
            touchStateRef.current.dismissOnTouchEnd = false
            touchStateRef.current.dismissOnMouseDown = false
          }
        })
      }
    }
    function addTargetEventListenerOnce(event, listener) {
      const target = getTarget(event)
      if (!target) return
      const unsubscribe = addEventListener(target, event.type, () => {
        listener(event)
        unsubscribe()
      })
    }
    function handleTouchStartCapture(event) {
      currentPointerTypeRef.current = 'touch'
      addTargetEventListenerOnce(event, handleTouchStart)
    }
    function closeOnPressOutsideCapture(event) {
      cancelDismissOnEndTimeout.clear()
      if (event.type === 'pointerdown')
        currentPointerTypeRef.current = event.pointerType
      if (
        event.type === 'mousedown' &&
        touchStateRef.current &&
        !touchStateRef.current.dismissOnMouseDown
      )
        return
      addTargetEventListenerOnce(event, (targetEvent) => {
        if (targetEvent.type === 'pointerdown') handlePointerDown(targetEvent)
        else closeOnPressOutside(targetEvent)
      })
    }
    function handlePressEndCapture(event) {
      if (!pressStartedInsideRef.current) return
      const pressStartedInsideDefaultPrevented = pressStartPreventedRef.current
      resetPressStartState()
      if (getOutsidePressEvent() !== 'intentional') return
      if (event.type === 'pointercancel') {
        if (pressStartedInsideDefaultPrevented)
          suppressImmediateOutsideClickAfterPreventedStart()
        return
      }
      if (isEventWithinFloatingTree(event)) return
      if (pressStartedInsideDefaultPrevented) {
        suppressImmediateOutsideClickAfterPreventedStart()
        return
      }
      if (typeof outsidePress$1 === 'function' && !outsidePress$1(event)) return
      preventedPressSuppressionTimeout.clear()
      suppressNextOutsideClickRef.current = true
      clearInsideReactTree()
    }
    function handleTouchMove(event) {
      if (
        getOutsidePressEvent() !== 'sloppy' ||
        !touchStateRef.current ||
        isEventWithinOwnElements(event)
      )
        return
      const touch = event.touches[0]
      if (!touch) return
      const deltaX = Math.abs(touch.clientX - touchStateRef.current.startX)
      const deltaY = Math.abs(touch.clientY - touchStateRef.current.startY)
      const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY)
      if (distance > 5) touchStateRef.current.dismissOnTouchEnd = true
      if (distance > 10) {
        closeOnPressOutside(event)
        cancelDismissOnEndTimeout.clear()
        touchStateRef.current = null
      }
    }
    function handleTouchMoveCapture(event) {
      addTargetEventListenerOnce(event, handleTouchMove)
    }
    function handleTouchEnd(event) {
      if (
        getOutsidePressEvent() !== 'sloppy' ||
        !touchStateRef.current ||
        isEventWithinOwnElements(event)
      )
        return
      if (touchStateRef.current.dismissOnTouchEnd) closeOnPressOutside(event)
      cancelDismissOnEndTimeout.clear()
      touchStateRef.current = null
    }
    function handleTouchEndCapture(event) {
      addTargetEventListenerOnce(event, handleTouchEnd)
    }
    const doc = ownerDocument(floatingElement)
    const unsubscribe = mergeCleanups(
      escapeKey$1 &&
        mergeCleanups(
          addEventListener(doc, 'keydown', closeOnEscapeKeyDown),
          addEventListener(doc, 'compositionstart', handleCompositionStart),
          addEventListener(doc, 'compositionend', handleCompositionEnd)
        ),
      outsidePressEnabled &&
        mergeCleanups(
          addEventListener(doc, 'click', closeOnPressOutsideCapture, true),
          addEventListener(
            doc,
            'pointerdown',
            closeOnPressOutsideCapture,
            true
          ),
          addEventListener(doc, 'pointerup', handlePressEndCapture, true),
          addEventListener(doc, 'pointercancel', handlePressEndCapture, true),
          addEventListener(doc, 'mousedown', closeOnPressOutsideCapture, true),
          addEventListener(doc, 'mouseup', handlePressEndCapture, true),
          addEventListener(doc, 'touchstart', handleTouchStartCapture, true),
          addEventListener(doc, 'touchmove', handleTouchMoveCapture, true),
          addEventListener(doc, 'touchend', handleTouchEndCapture, true)
        )
    )
    return () => {
      unsubscribe()
      compositionTimeout.clear()
      preventedPressSuppressionTimeout.clear()
      resetPressStartState()
      suppressNextOutsideClickRef.current = false
    }
  }, [
    dataRef,
    floatingElement,
    escapeKey$1,
    outsidePressEnabled,
    outsidePress$1,
    open,
    enabled,
    escapeKeyBubbles,
    outsidePressBubbles,
    closeOnEscapeKeyDown,
    clearInsideReactTree,
    getOutsidePressEventProp,
    hasBlockingChild,
    isEventWithinOwnElements,
    tree,
    store,
    cancelDismissOnEndTimeout
  ])
  import_react.useEffect(clearInsideReactTree, [
    outsidePress$1,
    clearInsideReactTree
  ])
  const reference = import_react.useMemo(
    () => ({
      onKeyDown: closeOnEscapeKeyDown,
      onPointerDown: closeOnReferencePress,
      onClick: closeOnReferencePress
    }),
    [closeOnEscapeKeyDown, closeOnReferencePress]
  )
  const floating = import_react.useMemo(
    () => ({
      onKeyDown: closeOnEscapeKeyDown,
      onPointerDown: markInsidePressStartPrevented,
      onMouseDown: markInsidePressStartPrevented,
      onClickCapture: markInsideReactTree,
      onMouseDownCapture(event) {
        markInsideReactTree()
        markPressStartedInsideReactTree(event)
      },
      onPointerDownCapture(event) {
        markInsideReactTree()
        markPressStartedInsideReactTree(event)
      },
      onMouseUpCapture: markInsideReactTree,
      onTouchEndCapture: markInsideReactTree,
      onTouchMoveCapture: markInsideReactTree
    }),
    [
      closeOnEscapeKeyDown,
      markInsideReactTree,
      markPressStartedInsideReactTree,
      markInsidePressStartPrevented
    ]
  )
  return import_react.useMemo(
    () =>
      enabled
        ? {
            reference,
            floating,
            trigger: reference
          }
        : {},
    [enabled, reference, floating]
  )
}
//#endregion
//#region node_modules/@base-ui/utils/store/createSelector.mjs
/**
 * The NoOptionalParams type is a utility type that checks if a function has optional or default parameters.
 * If the function has optional or default parameters, it returns a string literal type with an error message.
 * Otherwise, it returns the original function type.
 *
 * This is used to enforce that the combiner function passed to createSelector does not have optional or default parameters,
 * as memoization relies on the Function.length property, which does not account for optional or default parameters.
 */
/**
 * Creates a selector function that can be used to derive values from the store's state.
 *
 * The combiner function can have up to three additional parameters, but it **cannot have optional or default parameters**.
 *
 * This function accepts up to six functions and combines them into a single selector function.
 * The resulting selector will take the state from the combined selectors and any additional parameters required by the combiner.
 *
 * The return type of the resulting selector is determined by the return type of the combiner function.
 *
 * @example
 * const selector = createSelector(
 *  (state) => state.disabled
 * );
 *
 * @example
 * const selector = createSelector(
 *   (state) => state.disabled,
 *   (state) => state.open,
 *   (disabled, open) => ({ disabled, open })
 * );
 */
var createSelector = (a, b, c, d, e, f, ...other) => {
  if (other.length > 0) throw new Error(formatErrorMessage(1))
  let selector
  if (a && b && c && d && e && f)
    selector = (state, a1, a2, a3) => {
      return f(
        a(state, a1, a2, a3),
        b(state, a1, a2, a3),
        c(state, a1, a2, a3),
        d(state, a1, a2, a3),
        e(state, a1, a2, a3),
        a1,
        a2,
        a3
      )
    }
  else if (a && b && c && d && e)
    selector = (state, a1, a2, a3) => {
      return e(
        a(state, a1, a2, a3),
        b(state, a1, a2, a3),
        c(state, a1, a2, a3),
        d(state, a1, a2, a3),
        a1,
        a2,
        a3
      )
    }
  else if (a && b && c && d)
    selector = (state, a1, a2, a3) => {
      return d(
        a(state, a1, a2, a3),
        b(state, a1, a2, a3),
        c(state, a1, a2, a3),
        a1,
        a2,
        a3
      )
    }
  else if (a && b && c)
    selector = (state, a1, a2, a3) => {
      return c(a(state, a1, a2, a3), b(state, a1, a2, a3), a1, a2, a3)
    }
  else if (a && b)
    selector = (state, a1, a2, a3) => {
      return b(a(state, a1, a2, a3), a1, a2, a3)
    }
  else if (a) selector = a
  else throw new Error('Missing arguments')
  return selector
}
//#endregion
//#region node_modules/@base-ui/utils/fastHooks.mjs
var hooks = []
var currentInstance = void 0
function getInstance() {
  return currentInstance
}
function register(hook) {
  hooks.push(hook)
}
//#endregion
//#region node_modules/@base-ui/utils/store/useStore.mjs
var useStoreImplementation = isReactVersionAtLeast(19)
  ? useStoreFast
  : useStoreLegacy
function useStore(store, selector, a1, a2, a3) {
  return useStoreImplementation(store, selector, a1, a2, a3)
}
function useStoreR19(store, selector, a1, a2, a3) {
  const getSelection = import_react.useCallback(
    () => selector(store.getSnapshot(), a1, a2, a3),
    [store, selector, a1, a2, a3]
  )
  return (0, import_shim.useSyncExternalStore)(
    store.subscribe,
    getSelection,
    getSelection
  )
}
register({
  before(instance) {
    instance.syncIndex = 0
    if (!instance.didInitialize) {
      instance.syncTick = 1
      instance.syncHooks = []
      instance.didChangeStore = true
      instance.getSnapshot = () => {
        let didChange = false
        for (let i = 0; i < instance.syncHooks.length; i += 1) {
          const hook = instance.syncHooks[i]
          const value = hook.selector(
            hook.store.state,
            hook.a1,
            hook.a2,
            hook.a3
          )
          if (!Object.is(hook.value, value)) {
            didChange = true
            hook.value = value
          }
        }
        if (didChange) instance.syncTick += 1
        return instance.syncTick
      }
    }
  },
  after(instance) {
    if (instance.syncHooks.length > 0) {
      if (instance.didChangeStore) {
        instance.didChangeStore = false
        instance.subscribe = (onStoreChange) => {
          const stores = /* @__PURE__ */ new Set()
          for (const hook of instance.syncHooks) stores.add(hook.store)
          const unsubscribes = []
          for (const store of stores)
            unsubscribes.push(store.subscribe(onStoreChange))
          return () => {
            for (const unsubscribe of unsubscribes) unsubscribe()
          }
        }
      }
      ;(0, import_shim.useSyncExternalStore)(
        instance.subscribe,
        instance.getSnapshot,
        instance.getSnapshot
      )
    }
  }
})
function useStoreFast(store, selector, a1, a2, a3) {
  const instance = getInstance()
  if (!instance) return useStoreR19(store, selector, a1, a2, a3)
  const index = instance.syncIndex
  instance.syncIndex += 1
  let hook
  if (!instance.didInitialize) {
    hook = {
      store,
      selector,
      a1,
      a2,
      a3,
      value: selector(store.getSnapshot(), a1, a2, a3)
    }
    instance.syncHooks.push(hook)
  } else {
    hook = instance.syncHooks[index]
    if (
      hook.store !== store ||
      hook.selector !== selector ||
      !Object.is(hook.a1, a1) ||
      !Object.is(hook.a2, a2) ||
      !Object.is(hook.a3, a3)
    ) {
      if (hook.store !== store) instance.didChangeStore = true
      hook.store = store
      hook.selector = selector
      hook.a1 = a1
      hook.a2 = a2
      hook.a3 = a3
      hook.value = selector(store.getSnapshot(), a1, a2, a3)
    }
  }
  return hook.value
}
function useStoreLegacy(store, selector, a1, a2, a3) {
  return (0, import_with_selector.useSyncExternalStoreWithSelector)(
    store.subscribe,
    store.getSnapshot,
    store.getSnapshot,
    (state) => selector(state, a1, a2, a3)
  )
}
//#endregion
//#region node_modules/@base-ui/utils/store/Store.mjs
/**
 * A data store implementation that allows subscribing to state changes and updating the state.
 * It uses an observer pattern to notify subscribers when the state changes.
 */
var Store = class {
  /**
   * The current state of the store.
   * This property is updated immediately when the state changes as a result of calling {@link setState}, {@link update}, or {@link set}.
   * To subscribe to state changes, use the {@link useState} method. The value returned by {@link useState} is updated after the component renders (similarly to React's useState).
   * The values can be used directly (to avoid subscribing to the store) in effects or event handlers.
   *
   * Do not modify properties in state directly. Instead, use the provided methods to ensure proper state management and listener notification.
   */
  constructor(state) {
    this.state = state
    this.listeners = /* @__PURE__ */ new Set()
    this.updateTick = 0
  }
  /**
   * Registers a listener that will be called whenever the store's state changes.
   *
   * @param fn The listener function to be called on state changes.
   * @returns A function to unsubscribe the listener.
   */
  subscribe = (fn) => {
    this.listeners.add(fn)
    return () => {
      this.listeners.delete(fn)
    }
  }
  /**
   * Returns the current state of the store.
   */
  getSnapshot = () => {
    return this.state
  }
  /**
   * Updates the entire store's state and notifies all registered listeners.
   *
   * @param newState The new state to set for the store.
   */
  setState(newState) {
    if (this.state === newState) return
    this.state = newState
    this.updateTick += 1
    const currentTick = this.updateTick
    for (const listener of this.listeners) {
      if (currentTick !== this.updateTick) return
      listener(newState)
    }
  }
  /**
   * Merges the provided changes into the current state and notifies listeners if there are changes.
   *
   * @param changes An object containing the changes to apply to the current state.
   */
  update(changes) {
    for (const key in changes)
      if (!Object.is(this.state[key], changes[key])) {
        this.setState({
          ...this.state,
          ...changes
        })
        return
      }
  }
  /**
   * Sets a specific key in the store's state to a new value and notifies listeners if the value has changed.
   *
   * @param key The key in the store's state to update.
   * @param value The new value to set for the specified key.
   */
  set(key, value) {
    if (!Object.is(this.state[key], value))
      this.setState({
        ...this.state,
        [key]: value
      })
  }
  /**
   * Gives the state a new reference and updates all registered listeners.
   */
  notifyAll() {
    const newState = { ...this.state }
    this.setState(newState)
  }
  use(selector, a1, a2, a3) {
    return useStore(this, selector, a1, a2, a3)
  }
}
//#endregion
//#region node_modules/@base-ui/utils/store/ReactStore.mjs
/**
 * A Store that supports controlled state keys, non-reactive values and provides utility methods for React.
 */
var ReactStore = class extends Store {
  /**
   * Creates a new ReactStore instance.
   *
   * @param state Initial state of the store.
   * @param context Non-reactive context values.
   * @param selectors Optional selectors for use with `useState`.
   */
  constructor(state, context = {}, selectors) {
    super(state)
    this.context = context
    this.selectors = selectors
  }
  /**
   * Non-reactive values such as refs, callbacks, etc.
   */
  /**
   * Synchronizes a single external value into the store.
   *
   * Note that the while the value in `state` is updated immediately, the value returned
   * by `useState` is updated before the next render (similarly to React's `useState`).
   */
  useSyncedValue(key, value) {
    import_react.useDebugValue(key)
    const store = this
    useIsoLayoutEffect(() => {
      if (store.state[key] !== value) store.set(key, value)
    }, [store, key, value])
  }
  /**
   * Synchronizes a single external value into the store and
   * cleans it up (sets to `undefined`) on unmount.
   *
   * Note that the while the value in `state` is updated immediately, the value returned
   * by `useState` is updated before the next render (similarly to React's `useState`).
   */
  useSyncedValueWithCleanup(key, value) {
    const store = this
    useIsoLayoutEffect(() => {
      if (store.state[key] !== value) store.set(key, value)
      return () => {
        store.set(key, void 0)
      }
    }, [store, key, value])
  }
  /**
   * Synchronizes multiple external values into the store.
   *
   * Note that the while the values in `state` are updated immediately, the values returned
   * by `useState` are updated before the next render (similarly to React's `useState`).
   */
  useSyncedValues(statePart) {
    const store = this
    useIsoLayoutEffect(() => {
      store.update(statePart)
    }, [store, ...Object.values(statePart)])
  }
  /**
   * Registers a controllable prop pair (`controlled`, `defaultValue`) for a specific key. If `controlled`
   * is non-undefined, the store's state at `key` is updated to match `controlled`.
   */
  useControlledProp(key, controlled) {
    import_react.useDebugValue(key)
    const store = this
    const isControlled = controlled !== void 0
    useIsoLayoutEffect(() => {
      if (isControlled && !Object.is(store.state[key], controlled))
        store.setState({
          ...store.state,
          [key]: controlled
        })
    }, [store, key, controlled, isControlled])
  }
  /** Gets the current value from the store using a selector with the provided key.
   *
   * @param key Key of the selector to use.
   */
  select(key, a1, a2, a3) {
    const selector = this.selectors[key]
    return selector(this.state, a1, a2, a3)
  }
  /**
   * Returns a value from the store's state using a selector function.
   * Used to subscribe to specific parts of the state.
   * This methods causes a rerender whenever the selected state changes.
   *
   * @param key Key of the selector to use.
   */
  useState(key, a1, a2, a3) {
    import_react.useDebugValue(key)
    return useStore(this, this.selectors[key], a1, a2, a3)
  }
  /**
   * Wraps a function with `useStableCallback` to ensure it has a stable reference
   * and assigns it to the context.
   *
   * @param key Key of the event callback. Must be a function in the context.
   * @param fn Function to assign.
   */
  useContextCallback(key, fn) {
    import_react.useDebugValue(key)
    const stableFunction = useStableCallback(fn ?? NOOP)
    this.context[key] = stableFunction
  }
  /**
   * Returns a stable setter function for a specific key in the store's state.
   * It's commonly used to pass as a ref callback to React elements.
   *
   * @param key Key of the state to set.
   */
  useStateSetter(key) {
    const ref = import_react.useRef(void 0)
    if (ref.current === void 0)
      ref.current = (value) => {
        this.set(key, value)
      }
    return ref.current
  }
  /**
   * Observes changes derived from the store's selectors and calls the listener when the selected value changes.
   *
   * @param key Key of the selector to observe.
   * @param listener Listener function called when the selector result changes.
   */
  observe(selector, listener) {
    let selectFn
    if (typeof selector === 'function') selectFn = selector
    else selectFn = this.selectors[selector]
    let prevValue = selectFn(this.state)
    listener(prevValue, prevValue, this)
    return this.subscribe((nextState) => {
      const nextValue = selectFn(nextState)
      if (!Object.is(prevValue, nextValue)) {
        const oldValue = prevValue
        prevValue = nextValue
        listener(nextValue, oldValue, this)
      }
    })
  }
}
//#endregion
//#region node_modules/@base-ui/react/floating-ui-react/components/FloatingRootStore.mjs
var selectors$1 = {
  open: createSelector((state) => state.open),
  transitionStatus: createSelector((state) => state.transitionStatus),
  domReferenceElement: createSelector((state) => state.domReferenceElement),
  referenceElement: createSelector(
    (state) => state.positionReference ?? state.referenceElement
  ),
  floatingElement: createSelector((state) => state.floatingElement),
  floatingId: createSelector((state) => state.floatingId)
}
var FloatingRootStore = class extends ReactStore {
  constructor(options) {
    const { syncOnly, nested, onOpenChange, triggerElements, ...initialState } =
      options
    super(
      {
        ...initialState,
        positionReference: initialState.referenceElement,
        domReferenceElement: initialState.referenceElement
      },
      {
        onOpenChange,
        dataRef: { current: {} },
        events: createEventEmitter(),
        nested,
        triggerElements
      },
      selectors$1
    )
    this.syncOnly = syncOnly
  }
  /**
   * Syncs the event used by hover logic to distinguish hover-open from click-like interaction.
   */
  syncOpenEvent = (newOpen, event) => {
    if (
      !newOpen ||
      !this.state.open ||
      (event != null && isClickLikeEvent(event))
    )
      this.context.dataRef.current.openEvent = newOpen ? event : void 0
  }
  /**
   * Runs the root-owned side effects for an open state change.
   */
  dispatchOpenChange = (newOpen, eventDetails) => {
    this.syncOpenEvent(newOpen, eventDetails.event)
    const details = {
      open: newOpen,
      reason: eventDetails.reason,
      nativeEvent: eventDetails.event,
      nested: this.context.nested,
      triggerElement: eventDetails.trigger
    }
    this.context.events.emit('openchange', details)
  }
  /**
   * Emits the `openchange` event through the internal event emitter and calls the `onOpenChange` handler with the provided arguments.
   *
   * @param newOpen The new open state.
   * @param eventDetails Details about the event that triggered the open state change.
   */
  setOpen = (newOpen, eventDetails) => {
    if (this.syncOnly) {
      this.context.onOpenChange?.(newOpen, eventDetails)
      return
    }
    this.dispatchOpenChange(newOpen, eventDetails)
    this.context.onOpenChange?.(newOpen, eventDetails)
  }
}
//#endregion
//#region node_modules/@base-ui/react/utils/popups/popupStoreUtils.mjs
var FOCUSABLE_POPUP_PROPS = {
  tabIndex: -1,
  [FOCUSABLE_ATTRIBUTE]: ''
}
//#endregion
//#region node_modules/@base-ui/react/utils/popups/popupTriggerMap.mjs
/**
 * Data structure to keep track of popup trigger elements by their IDs.
 * Uses both a set of Elements and a map of IDs to Elements for efficient lookups.
 */
var PopupTriggerMap = class {
  constructor() {
    this.elementsSet = /* @__PURE__ */ new Set()
    this.idMap = /* @__PURE__ */ new Map()
  }
  /**
   * Adds a trigger element with the given ID.
   *
   * Note: The provided element is assumed to not be registered under multiple IDs.
   */
  add(id, element) {
    const existingElement = this.idMap.get(id)
    if (existingElement === element) return
    if (existingElement !== void 0) this.elementsSet.delete(existingElement)
    this.elementsSet.add(element)
    this.idMap.set(id, element)
  }
  /**
   * Removes the trigger element with the given ID.
   */
  delete(id) {
    const element = this.idMap.get(id)
    if (element) {
      this.elementsSet.delete(element)
      this.idMap.delete(id)
    }
  }
  /**
   * Whether the given element is registered as a trigger.
   */
  hasElement(element) {
    return this.elementsSet.has(element)
  }
  /**
   * Whether there is a registered trigger element matching the given predicate.
   */
  hasMatchingElement(predicate) {
    for (const element of this.elementsSet) if (predicate(element)) return true
    return false
  }
  /**
   * Returns the trigger element associated with the given ID, or undefined if no such element exists.
   */
  getById(id) {
    return this.idMap.get(id)
  }
  /**
   * Returns an iterable of all registered trigger entries, where each entry is a tuple of [id, element].
   */
  entries() {
    return this.idMap.entries()
  }
  /**
   * Returns an iterable of all registered trigger elements.
   */
  elements() {
    return this.elementsSet.values()
  }
  /**
   * Returns the number of registered trigger elements.
   */
  get size() {
    return this.idMap.size
  }
}
//#endregion
//#region node_modules/@base-ui/react/floating-ui-react/hooks/useFloatingRootContext.mjs
function useFloatingRootContext(options) {
  const { open = false, onOpenChange, elements = {} } = options
  const floatingId = useId()
  const nested = useFloatingParentNodeId() != null
  const store = useRefWithInit(
    () =>
      new FloatingRootStore({
        open,
        transitionStatus: void 0,
        onOpenChange,
        referenceElement: elements.reference ?? null,
        floatingElement: elements.floating ?? null,
        triggerElements: new PopupTriggerMap(),
        floatingId,
        syncOnly: false,
        nested
      })
  ).current
  useIsoLayoutEffect(() => {
    const valuesToSync = {
      open,
      floatingId
    }
    if (elements.reference !== void 0) {
      valuesToSync.referenceElement = elements.reference
      valuesToSync.domReferenceElement = isElement(elements.reference)
        ? elements.reference
        : null
    }
    if (elements.floating !== void 0)
      valuesToSync.floatingElement = elements.floating
    store.update(valuesToSync)
  }, [open, floatingId, elements.reference, elements.floating, store])
  store.context.onOpenChange = onOpenChange
  store.context.nested = nested
  return store
}
//#endregion
//#region node_modules/@base-ui/react/floating-ui-react/hooks/useFloating.mjs
/**
 * Provides data to position a floating element and context to add interactions.
 * @see https://floating-ui.com/docs/useFloating
 */
function useFloating(options = {}) {
  const { nodeId, externalTree } = options
  const internalStore = useFloatingRootContext(options)
  const store = options.rootContext || internalStore
  const referenceElement = store.useState('referenceElement')
  const floatingElement = store.useState('floatingElement')
  const domReferenceElement = store.useState('domReferenceElement')
  const open = store.useState('open')
  const floatingId = store.useState('floatingId')
  const [positionReference, setPositionReferenceRaw] =
    import_react.useState(null)
  const [localDomReference, setLocalDomReference] =
    import_react.useState(void 0)
  const [localFloatingElement, setLocalFloatingElement] =
    import_react.useState(void 0)
  const domReferenceRef = import_react.useRef(null)
  const tree = useFloatingTree(externalTree)
  const storeElements = import_react.useMemo(
    () => ({
      reference: referenceElement,
      floating: floatingElement,
      domReference: domReferenceElement
    }),
    [referenceElement, floatingElement, domReferenceElement]
  )
  const position = useFloating$1({
    ...options,
    elements: {
      ...storeElements,
      ...(positionReference && { reference: positionReference })
    }
  })
  const localDomReferenceElement = isElement(localDomReference)
    ? localDomReference
    : null
  const syncedFloatingElement =
    localFloatingElement === void 0
      ? store.state.floatingElement
      : localFloatingElement
  store.useSyncedValue('referenceElement', localDomReference ?? null)
  store.useSyncedValue(
    'domReferenceElement',
    localDomReference === void 0
      ? domReferenceElement
      : localDomReferenceElement
  )
  store.useSyncedValue('floatingElement', syncedFloatingElement)
  const setPositionReference = import_react.useCallback(
    (node) => {
      const computedPositionReference = isElement(node)
        ? {
            getBoundingClientRect: () => node.getBoundingClientRect(),
            getClientRects: () => node.getClientRects(),
            contextElement: node
          }
        : node
      setPositionReferenceRaw(computedPositionReference)
      position.refs.setReference(computedPositionReference)
    },
    [position.refs]
  )
  const setReference = import_react.useCallback(
    (node) => {
      if (isElement(node) || node === null) {
        domReferenceRef.current = node
        setLocalDomReference(node)
      }
      if (
        isElement(position.refs.reference.current) ||
        position.refs.reference.current === null ||
        (node !== null && !isElement(node))
      )
        position.refs.setReference(node)
    },
    [position.refs, setLocalDomReference]
  )
  const setFloating = import_react.useCallback(
    (node) => {
      setLocalFloatingElement(node)
      position.refs.setFloating(node)
    },
    [position.refs]
  )
  const refs = import_react.useMemo(
    () => ({
      ...position.refs,
      setReference,
      setFloating,
      setPositionReference,
      domReference: domReferenceRef
    }),
    [position.refs, setReference, setFloating, setPositionReference]
  )
  const elements = import_react.useMemo(
    () => ({
      ...position.elements,
      domReference: domReferenceElement
    }),
    [position.elements, domReferenceElement]
  )
  const context = import_react.useMemo(
    () => ({
      ...position,
      dataRef: store.context.dataRef,
      open,
      onOpenChange: store.setOpen,
      events: store.context.events,
      floatingId,
      refs,
      elements,
      nodeId,
      rootStore: store
    }),
    [position, refs, elements, nodeId, store, open, floatingId]
  )
  useIsoLayoutEffect(() => {
    if (domReferenceElement) domReferenceRef.current = domReferenceElement
  }, [domReferenceElement])
  useIsoLayoutEffect(() => {
    store.context.dataRef.current.floatingContext = context
    const node = tree?.nodesRef.current.find((n) => n.id === nodeId)
    if (node) node.context = context
  })
  return import_react.useMemo(
    () => ({
      ...position,
      context,
      refs,
      elements,
      rootStore: store
    }),
    [position, refs, elements, context, store]
  )
}
//#endregion
//#region node_modules/@base-ui/react/floating-ui-react/hooks/useListNavigation.mjs
var ESCAPE = 'Escape'
function doSwitch(orientation, vertical, horizontal) {
  switch (orientation) {
    case 'vertical':
      return vertical
    case 'horizontal':
      return horizontal
    default:
      return vertical || horizontal
  }
}
function isMainOrientationKey(key, orientation) {
  return doSwitch(
    orientation,
    key === 'ArrowUp' || key === 'ArrowDown',
    key === 'ArrowLeft' || key === 'ArrowRight'
  )
}
function isMainOrientationToEndKey(key, orientation, rtl) {
  return (
    doSwitch(
      orientation,
      key === 'ArrowDown',
      rtl ? key === 'ArrowLeft' : key === 'ArrowRight'
    ) ||
    key === 'Enter' ||
    key === ' ' ||
    key === ''
  )
}
function isCrossOrientationOpenKey(key, orientation, rtl) {
  return doSwitch(
    orientation,
    rtl ? key === ARROW_LEFT : key === ARROW_RIGHT,
    key === ARROW_DOWN
  )
}
function isCrossOrientationCloseKey(key, orientation, rtl, grid) {
  const vertical = rtl ? key === ARROW_RIGHT : key === ARROW_LEFT
  const horizontal = key === ARROW_UP
  if (orientation === 'both' || (orientation === 'horizontal' && grid))
    return key === ESCAPE
  return doSwitch(orientation, vertical, horizontal)
}
/**
 * Adds arrow key-based navigation of a list of items, either using real DOM
 * focus or virtual focus.
 * @see https://floating-ui.com/docs/useListNavigation
 */
function useListNavigation(context, props) {
  const {
    listRef,
    activeIndex,
    onNavigate: onNavigateProp = () => {},
    enabled = true,
    selectedIndex = null,
    allowEscape = false,
    loopFocus = false,
    nested = false,
    rtl = false,
    virtual = false,
    focusItemOnOpen = 'auto',
    focusItemOnHover = true,
    openOnArrowKeyDown = true,
    disabledIndices = void 0,
    orientation = 'vertical',
    parentOrientation,
    id,
    resetOnPointerLeave = true,
    externalTree,
    grid: navigateGrid
  } = props
  const isGrid = navigateGrid != null
  const store = 'rootStore' in context ? context.rootStore : context
  const open = store.useState('open')
  const floatingElement = store.useState('floatingElement')
  const domReferenceElement = store.useState('domReferenceElement')
  const dataRef = store.context.dataRef
  const floatingFocusElement = getFloatingFocusElement(floatingElement)
  const typeableComboboxReference = isTypeableCombobox(domReferenceElement)
  const floatingFocusElementRef = useValueAsRef(floatingFocusElement)
  const parentId = useFloatingParentNodeId()
  const tree = useFloatingTree(externalTree)
  const focusItemOnOpenRef = import_react.useRef(focusItemOnOpen)
  const indexRef = import_react.useRef(selectedIndex ?? -1)
  const keyRef = import_react.useRef(null)
  const isPointerModalityRef = import_react.useRef(true)
  const onNavigate = useStableCallback((event) => {
    onNavigateProp(indexRef.current === -1 ? null : indexRef.current, event)
  })
  const previousMountedRef = import_react.useRef(!!floatingElement)
  const previousOpenRef = import_react.useRef(open)
  const forceSyncFocusRef = import_react.useRef(false)
  const forceScrollIntoViewRef = import_react.useRef(false)
  const cancelQueuedFocusRef = import_react.useRef(null)
  const disabledIndicesRef = useValueAsRef(disabledIndices)
  const latestOpenRef = useValueAsRef(open)
  const selectedIndexRef = useValueAsRef(selectedIndex)
  const resetOnPointerLeaveRef = useValueAsRef(resetOnPointerLeave)
  const focusFrame = useAnimationFrame()
  const waitForListPopulatedFrame = useAnimationFrame()
  const focusItem = useStableCallback(() => {
    function runFocus(item) {
      if (virtual) tree?.events.emit('virtualfocus', item)
      else
        cancelQueuedFocusRef.current = enqueueFocus(item, {
          sync: forceSyncFocusRef.current,
          preventScroll: true
        })
    }
    const initialItem = listRef.current[indexRef.current]
    const forceScrollIntoView = forceScrollIntoViewRef.current
    if (initialItem) runFocus(initialItem)
    ;(forceSyncFocusRef.current
      ? (callback) => callback()
      : (callback) => focusFrame.request(callback))(() => {
      const waitedItem = listRef.current[indexRef.current] || initialItem
      if (!waitedItem) return
      if (!initialItem) runFocus(waitedItem)
      if (item && (forceScrollIntoView || !isPointerModalityRef.current))
        waitedItem.scrollIntoView?.({
          block: 'nearest',
          inline: 'nearest'
        })
    })
  })
  useIsoLayoutEffect(() => {
    dataRef.current.orientation = orientation
  }, [dataRef, orientation])
  useIsoLayoutEffect(() => {
    if (!enabled) return
    if (open && floatingElement) {
      indexRef.current = selectedIndex ?? -1
      if (focusItemOnOpenRef.current && selectedIndex != null) {
        forceScrollIntoViewRef.current = true
        onNavigate()
      }
    } else if (previousMountedRef.current) {
      indexRef.current = -1
      onNavigate()
    }
  }, [enabled, open, floatingElement, selectedIndex, onNavigate])
  useIsoLayoutEffect(() => {
    if (!enabled) return
    if (!open) {
      forceSyncFocusRef.current = false
      return
    }
    if (!floatingElement) return
    if (activeIndex == null) {
      forceSyncFocusRef.current = false
      if (selectedIndexRef.current != null) return
      if (previousMountedRef.current) {
        indexRef.current = -1
        focusItem()
      }
      if (
        (!previousOpenRef.current || !previousMountedRef.current) &&
        focusItemOnOpenRef.current &&
        (keyRef.current != null ||
          (focusItemOnOpenRef.current === true && keyRef.current == null))
      ) {
        let runs = 0
        const waitForListPopulated = () => {
          if (listRef.current[0] == null) {
            if (runs < 2)
              (runs
                ? (callback) => waitForListPopulatedFrame.request(callback)
                : queueMicrotask)(waitForListPopulated)
            runs += 1
          } else {
            indexRef.current =
              keyRef.current == null ||
              isMainOrientationToEndKey(keyRef.current, orientation, rtl) ||
              nested
                ? getMinListIndex(listRef)
                : getMaxListIndex(listRef)
            keyRef.current = null
            onNavigate()
          }
        }
        waitForListPopulated()
      }
    } else if (!isIndexOutOfListBounds(listRef.current, activeIndex)) {
      indexRef.current = activeIndex
      focusItem()
      forceScrollIntoViewRef.current = false
    }
  }, [
    enabled,
    open,
    floatingElement,
    activeIndex,
    selectedIndexRef,
    nested,
    listRef,
    orientation,
    rtl,
    onNavigate,
    focusItem,
    waitForListPopulatedFrame
  ])
  useIsoLayoutEffect(() => {
    if (
      !enabled ||
      floatingElement ||
      !tree ||
      virtual ||
      !previousMountedRef.current
    )
      return
    const nodes = tree.nodesRef.current
    const parent = nodes.find((node) => node.id === parentId)?.context?.elements
      .floating
    const activeEl = activeElement(
      ownerDocument(domReferenceElement ?? parent ?? null)
    )
    const treeContainsActiveEl = nodes.some(
      (node) =>
        node.context && contains(node.context.elements.floating, activeEl)
    )
    if (parent && !treeContainsActiveEl && isPointerModalityRef.current)
      parent.focus({ preventScroll: true })
  }, [enabled, floatingElement, domReferenceElement, tree, parentId, virtual])
  useIsoLayoutEffect(() => {
    previousOpenRef.current = open
    previousMountedRef.current = !!floatingElement
  })
  useIsoLayoutEffect(() => {
    if (!open) {
      keyRef.current = null
      focusItemOnOpenRef.current = focusItemOnOpen
    }
  }, [open, focusItemOnOpen])
  const hasActiveIndex = activeIndex != null
  const syncCurrentTarget = useStableCallback((event) => {
    if (!latestOpenRef.current) return
    const index = listRef.current.indexOf(event.currentTarget)
    if (index !== -1 && (indexRef.current !== index || activeIndex !== index)) {
      indexRef.current = index
      onNavigate(event)
    }
  })
  const getParentOrientation = useStableCallback(() => {
    return (
      parentOrientation ??
      tree?.nodesRef.current.find((node) => node.id === parentId)?.context
        ?.dataRef?.current.orientation
    )
  })
  const getMinEnabledIndex = useStableCallback(() => {
    return getMinListIndex(listRef, disabledIndicesRef.current)
  })
  const commonOnKeyDown = useStableCallback((event) => {
    isPointerModalityRef.current = false
    forceSyncFocusRef.current = true
    if (event.which === 229) return
    if (
      !latestOpenRef.current &&
      event.currentTarget === floatingFocusElementRef.current
    )
      return
    if (
      nested &&
      isCrossOrientationCloseKey(event.key, orientation, rtl, isGrid)
    ) {
      if (!isMainOrientationKey(event.key, getParentOrientation()))
        stopEvent(event)
      store.setOpen(
        false,
        createChangeEventDetails(listNavigation, event.nativeEvent)
      )
      if (isHTMLElement(domReferenceElement))
        if (virtual) tree?.events.emit('virtualfocus', domReferenceElement)
        else domReferenceElement.focus()
      return
    }
    const currentIndex = indexRef.current
    const minIndex = getMinListIndex(listRef, disabledIndices)
    const maxIndex = getMaxListIndex(listRef, disabledIndices)
    if (!typeableComboboxReference) {
      if (event.key === 'Home') {
        stopEvent(event)
        indexRef.current = minIndex
        onNavigate(event)
      }
      if (event.key === 'End') {
        stopEvent(event)
        indexRef.current = maxIndex
        onNavigate(event)
      }
    }
    if (navigateGrid != null) {
      const index = navigateGrid(
        event,
        indexRef.current,
        listRef,
        orientation,
        loopFocus,
        rtl,
        disabledIndices,
        minIndex,
        maxIndex
      )
      if (index != null) {
        indexRef.current = index
        onNavigate(event)
      }
      if (orientation === 'both') return
    }
    if (isMainOrientationKey(event.key, orientation)) {
      stopEvent(event)
      if (
        open &&
        !virtual &&
        activeElement(event.currentTarget.ownerDocument) === event.currentTarget
      ) {
        indexRef.current = isMainOrientationToEndKey(
          event.key,
          orientation,
          rtl
        )
          ? minIndex
          : maxIndex
        onNavigate(event)
        return
      }
      if (isMainOrientationToEndKey(event.key, orientation, rtl))
        if (loopFocus)
          if (currentIndex >= maxIndex)
            if (allowEscape && currentIndex !== listRef.current.length)
              indexRef.current = -1
            else {
              forceSyncFocusRef.current = false
              indexRef.current = minIndex
            }
          else
            indexRef.current = findNonDisabledListIndex(listRef.current, {
              startingIndex: currentIndex,
              disabledIndices
            })
        else
          indexRef.current = Math.min(
            maxIndex,
            findNonDisabledListIndex(listRef.current, {
              startingIndex: currentIndex,
              disabledIndices
            })
          )
      else if (loopFocus)
        if (currentIndex <= minIndex)
          if (allowEscape && currentIndex !== -1)
            indexRef.current = listRef.current.length
          else {
            forceSyncFocusRef.current = false
            indexRef.current = maxIndex
          }
        else
          indexRef.current = findNonDisabledListIndex(listRef.current, {
            startingIndex: currentIndex,
            decrement: true,
            disabledIndices
          })
      else
        indexRef.current = Math.max(
          minIndex,
          findNonDisabledListIndex(listRef.current, {
            startingIndex: currentIndex,
            decrement: true,
            disabledIndices
          })
        )
      if (isIndexOutOfListBounds(listRef.current, indexRef.current))
        indexRef.current = -1
      onNavigate(event)
    }
  })
  const item = import_react.useMemo(() => {
    return {
      onFocus(event) {
        forceSyncFocusRef.current = true
        syncCurrentTarget(event)
      },
      onClick: ({ currentTarget }) =>
        currentTarget.focus({ preventScroll: true }),
      onMouseMove(event) {
        forceSyncFocusRef.current = true
        forceScrollIntoViewRef.current = false
        if (focusItemOnHover) syncCurrentTarget(event)
      },
      onPointerLeave(event) {
        if (
          !latestOpenRef.current ||
          !isPointerModalityRef.current ||
          event.pointerType === 'touch'
        )
          return
        forceSyncFocusRef.current = true
        const relatedTarget = event.relatedTarget
        if (!focusItemOnHover || listRef.current.includes(relatedTarget)) return
        if (!resetOnPointerLeaveRef.current) return
        cancelQueuedFocusRef.current?.()
        cancelQueuedFocusRef.current = null
        indexRef.current = -1
        onNavigate(event)
        if (!virtual) {
          const floatingFocusEl = floatingFocusElementRef.current
          const activeEl = activeElement(ownerDocument(floatingFocusEl))
          if (floatingFocusEl && contains(floatingFocusEl, activeEl))
            floatingFocusEl.focus({ preventScroll: true })
        }
      }
    }
  }, [
    syncCurrentTarget,
    latestOpenRef,
    floatingFocusElementRef,
    focusItemOnHover,
    listRef,
    onNavigate,
    resetOnPointerLeaveRef,
    virtual
  ])
  const ariaActiveDescendantProp = import_react.useMemo(() => {
    return (
      virtual &&
      open &&
      hasActiveIndex && { 'aria-activedescendant': `${id}-${activeIndex}` }
    )
  }, [virtual, open, hasActiveIndex, id, activeIndex])
  const floating = import_react.useMemo(() => {
    return {
      'aria-orientation': orientation === 'both' ? void 0 : orientation,
      ...(!typeableComboboxReference ? ariaActiveDescendantProp : {}),
      onKeyDown(event) {
        if (event.key === 'Tab' && event.shiftKey && open && !virtual) {
          const target = getTarget(event.nativeEvent)
          if (target && !contains(floatingFocusElementRef.current, target))
            return
          stopEvent(event)
          store.setOpen(
            false,
            createChangeEventDetails(focusOut, event.nativeEvent)
          )
          if (isHTMLElement(domReferenceElement)) domReferenceElement.focus()
          return
        }
        commonOnKeyDown(event)
      },
      onPointerMove() {
        isPointerModalityRef.current = true
      }
    }
  }, [
    ariaActiveDescendantProp,
    commonOnKeyDown,
    floatingFocusElementRef,
    orientation,
    typeableComboboxReference,
    store,
    open,
    virtual,
    domReferenceElement
  ])
  const trigger = import_react.useMemo(() => {
    function openOnNavigationKeyDown(event) {
      store.setOpen(
        true,
        createChangeEventDetails(
          listNavigation,
          event.nativeEvent,
          event.currentTarget
        )
      )
    }
    function checkVirtualMouse(event) {
      if (focusItemOnOpen === 'auto' && isVirtualClick(event.nativeEvent))
        focusItemOnOpenRef.current = !virtual
    }
    function checkVirtualPointer(event) {
      focusItemOnOpenRef.current = focusItemOnOpen
      if (
        focusItemOnOpen === 'auto' &&
        isVirtualPointerEvent(event.nativeEvent)
      )
        focusItemOnOpenRef.current = true
    }
    return {
      onKeyDown(event) {
        const currentOpen = store.select('open')
        isPointerModalityRef.current = false
        const isArrowKey = event.key.startsWith('Arrow')
        const isParentCrossOpenKey = isCrossOrientationOpenKey(
          event.key,
          getParentOrientation(),
          rtl
        )
        const isMainKey = isMainOrientationKey(event.key, orientation)
        const isNavigationKey =
          (nested ? isParentCrossOpenKey : isMainKey) ||
          event.key === 'Enter' ||
          event.key.trim() === ''
        if (virtual && currentOpen) return commonOnKeyDown(event)
        if (!currentOpen && !openOnArrowKeyDown && isArrowKey) return
        if (isNavigationKey) {
          const isParentMainKey = isMainOrientationKey(
            event.key,
            getParentOrientation()
          )
          keyRef.current = nested && isParentMainKey ? null : event.key
        }
        if (nested) {
          if (isParentCrossOpenKey) {
            stopEvent(event)
            if (currentOpen) {
              indexRef.current = getMinEnabledIndex()
              onNavigate(event)
            } else openOnNavigationKeyDown(event)
          }
          return
        }
        if (isMainKey) {
          if (selectedIndexRef.current != null)
            indexRef.current = selectedIndexRef.current
          stopEvent(event)
          if (!currentOpen && openOnArrowKeyDown) openOnNavigationKeyDown(event)
          else commonOnKeyDown(event)
          if (currentOpen) onNavigate(event)
        }
      },
      onFocus(event) {
        if (store.select('open') && !virtual) {
          indexRef.current = -1
          onNavigate(event)
        }
      },
      onPointerDown: checkVirtualPointer,
      onPointerEnter: checkVirtualPointer,
      onMouseDown: checkVirtualMouse,
      onClick: checkVirtualMouse
    }
  }, [
    commonOnKeyDown,
    focusItemOnOpen,
    getMinEnabledIndex,
    nested,
    onNavigate,
    store,
    openOnArrowKeyDown,
    orientation,
    getParentOrientation,
    rtl,
    selectedIndexRef,
    virtual
  ])
  const reference = import_react.useMemo(() => {
    return {
      ...ariaActiveDescendantProp,
      ...trigger
    }
  }, [ariaActiveDescendantProp, trigger])
  return import_react.useMemo(
    () =>
      enabled
        ? {
            reference,
            floating,
            item,
            trigger
          }
        : {},
    [enabled, reference, floating, trigger, item]
  )
}
//#endregion
//#region node_modules/@base-ui/react/floating-ui-react/hooks/useTypeahead.mjs
/**
 * Provides a matching callback that can be used to focus an item as the user
 * types, often used in tandem with `useListNavigation()`.
 * @see https://floating-ui.com/docs/useTypeahead
 */
function useTypeahead(context, props) {
  const {
    listRef,
    elementsRef,
    activeIndex,
    onMatch: onMatchProp,
    disabledIndices,
    onTyping,
    enabled = true,
    resetMs = 750,
    selectedIndex = null
  } = props
  const store = 'rootStore' in context ? context.rootStore : context
  const open = store.useState('open')
  const timeout = useTimeout()
  const stringRef = import_react.useRef('')
  const prevIndexRef = import_react.useRef(selectedIndex ?? activeIndex ?? -1)
  const matchIndexRef = import_react.useRef(null)
  const onKeyDown = useStableCallback((event) => {
    function isVisible(index) {
      const element = elementsRef?.current[index]
      return !element || isElementVisible(element)
    }
    function isItemAvailable(index) {
      if (!isVisible(index)) return false
      return (
        disabledIndices == null ||
        !isListIndexDisabled(EMPTY_ARRAY, index, disabledIndices)
      )
    }
    function getMatchingIndex(list, string, startIndex = 0) {
      if (list.length === 0) return -1
      const normalizedStartIndex =
        ((startIndex % list.length) + list.length) % list.length
      const lowerString = string.toLowerCase()
      for (let offset = 0; offset < list.length; offset += 1) {
        const index = (normalizedStartIndex + offset) % list.length
        if (
          !list[index]?.toLowerCase().startsWith(lowerString) ||
          !isItemAvailable(index)
        )
          continue
        return index
      }
      return -1
    }
    const listContent = listRef.current
    if (stringRef.current.length > 0 && event.key === ' ') {
      stopEvent(event)
      onTyping?.(true)
    }
    if (stringRef.current.length > 0 && stringRef.current[0] !== ' ') {
      if (
        getMatchingIndex(listContent, stringRef.current) === -1 &&
        event.key !== ' '
      )
        onTyping?.(false)
    }
    if (
      listContent == null ||
      event.key.length !== 1 ||
      event.ctrlKey ||
      event.metaKey ||
      event.altKey
    )
      return
    if (open && event.key !== ' ') {
      stopEvent(event)
      onTyping?.(true)
    }
    const isNewSession = stringRef.current === ''
    if (isNewSession) prevIndexRef.current = selectedIndex ?? activeIndex ?? -1
    if (
      listContent.every((text, index) =>
        text && isItemAvailable(index)
          ? text[0]?.toLowerCase() !== text[1]?.toLowerCase()
          : true
      ) &&
      stringRef.current === event.key
    ) {
      stringRef.current = ''
      prevIndexRef.current = matchIndexRef.current
    }
    stringRef.current += event.key
    timeout.start(resetMs, () => {
      stringRef.current = ''
      prevIndexRef.current = matchIndexRef.current
      onTyping?.(false)
    })
    const startIndex =
      ((isNewSession
        ? (selectedIndex ?? activeIndex ?? -1)
        : prevIndexRef.current) ?? 0) + 1
    const index = getMatchingIndex(listContent, stringRef.current, startIndex)
    if (index !== -1) {
      onMatchProp?.(index)
      matchIndexRef.current = index
    } else if (event.key !== ' ') {
      stringRef.current = ''
      onTyping?.(false)
    }
  })
  const onBlur = useStableCallback((event) => {
    const next = event.relatedTarget
    const currentDomReferenceElement = store.select('domReferenceElement')
    const currentFloatingElement = store.select('floatingElement')
    if (
      contains(currentDomReferenceElement, next) ||
      contains(currentFloatingElement, next)
    )
      return
    timeout.clear()
    stringRef.current = ''
    prevIndexRef.current = matchIndexRef.current
    onTyping?.(false)
  })
  useIsoLayoutEffect(() => {
    if (!open && selectedIndex !== null) return
    timeout.clear()
    matchIndexRef.current = null
    if (stringRef.current !== '') stringRef.current = ''
  }, [open, selectedIndex, timeout])
  useIsoLayoutEffect(() => {
    if (open && stringRef.current === '')
      prevIndexRef.current = selectedIndex ?? activeIndex ?? -1
  }, [open, selectedIndex, activeIndex])
  const sharedProps = import_react.useMemo(
    () => ({
      onKeyDown,
      onBlur
    }),
    [onKeyDown, onBlur]
  )
  return import_react.useMemo(
    () =>
      enabled
        ? {
            reference: sharedProps,
            floating: sharedProps
          }
        : {},
    [enabled, sharedProps]
  )
}
//#endregion
//#region node_modules/@base-ui/react/utils/popupStateMapping.mjs
var CommonPopupDataAttributes = (function (CommonPopupDataAttributes) {
  /**
   * Present when the popup is open.
   */
  CommonPopupDataAttributes['open'] = 'data-open'
  /**
   * Present when the popup is closed.
   */
  CommonPopupDataAttributes['closed'] = 'data-closed'
  /**
   * Present when the popup is animating in.
   */
  CommonPopupDataAttributes[
    (CommonPopupDataAttributes['startingStyle'] =
      TransitionStatusDataAttributes.startingStyle)
  ] = 'startingStyle'
  /**
   * Present when the popup is animating out.
   */
  CommonPopupDataAttributes[
    (CommonPopupDataAttributes['endingStyle'] =
      TransitionStatusDataAttributes.endingStyle)
  ] = 'endingStyle'
  /**
   * Present when the anchor is hidden.
   */
  CommonPopupDataAttributes['anchorHidden'] = 'data-anchor-hidden'
  /**
   * Indicates which side the popup is positioned relative to the trigger.
   * @type { 'top' | 'bottom' | 'left' | 'right' | 'inline-end' | 'inline-start'}
   */
  CommonPopupDataAttributes['side'] = 'data-side'
  /**
   * Indicates how the popup is aligned relative to specified side.
   * @type {'start' | 'center' | 'end'}
   */
  CommonPopupDataAttributes['align'] = 'data-align'
  return CommonPopupDataAttributes
})({})
var CommonTriggerDataAttributes = /* @__PURE__ */ (function (
  CommonTriggerDataAttributes
) {
  /**
   * Present when the popup is open.
   */
  CommonTriggerDataAttributes['popupOpen'] = 'data-popup-open'
  /**
   * Present when a pressable trigger is pressed.
   */
  CommonTriggerDataAttributes['pressed'] = 'data-pressed'
  return CommonTriggerDataAttributes
})({})
var TRIGGER_HOOK = { [CommonTriggerDataAttributes.popupOpen]: '' }
var PRESSABLE_TRIGGER_HOOK = {
  [CommonTriggerDataAttributes.popupOpen]: '',
  [CommonTriggerDataAttributes.pressed]: ''
}
var POPUP_OPEN_HOOK = { [CommonPopupDataAttributes.open]: '' }
var POPUP_CLOSED_HOOK = { [CommonPopupDataAttributes.closed]: '' }
var ANCHOR_HIDDEN_HOOK = { [CommonPopupDataAttributes.anchorHidden]: '' }
var triggerOpenStateMapping = {
  open(value) {
    if (value) return TRIGGER_HOOK
    return null
  }
}
var pressableTriggerOpenStateMapping = {
  open(value) {
    if (value) return PRESSABLE_TRIGGER_HOOK
    return null
  }
}
var popupStateMapping = {
  open(value) {
    if (value) return POPUP_OPEN_HOOK
    return POPUP_CLOSED_HOOK
  },
  anchorHidden(value) {
    if (value) return ANCHOR_HIDDEN_HOOK
    return null
  }
}
//#endregion
//#region node_modules/@base-ui/utils/inertValue.mjs
function inertValue(value) {
  if (isReactVersionAtLeast(19)) return value
  return value ? 'true' : void 0
}
//#endregion
//#region node_modules/@base-ui/react/utils/InternalBackdrop.mjs
/**
 * @internal
 */
var InternalBackdrop = /* @__PURE__ */ import_react.forwardRef(
  function InternalBackdrop(props, ref) {
    const { cutout, ...otherProps } = props
    let clipPath
    if (cutout) {
      const rect = cutout.getBoundingClientRect()
      clipPath = `polygon(0% 0%,100% 0%,100% 100%,0% 100%,0% 0%,${rect.left}px ${rect.top}px,${rect.left}px ${rect.bottom}px,${rect.right}px ${rect.bottom}px,${rect.right}px ${rect.top}px,${rect.left}px ${rect.top}px)`
    }
    return /* @__PURE__ */ (0, import_jsx_runtime.jsx)('div', {
      ref,
      role: 'presentation',
      'data-base-ui-inert': '',
      ...otherProps,
      style: {
        position: 'fixed',
        inset: 0,
        userSelect: 'none',
        WebkitUserSelect: 'none',
        clipPath
      }
    })
  }
)
//#endregion
//#region node_modules/@base-ui/utils/useEnhancedClickHandler.mjs
/**
 * Provides a cross-browser way to determine the type of the pointer used to click.
 * Safari and Firefox do not provide the PointerEvent to the click handler (they use MouseEvent) yet.
 * Additionally, this implementation detects if the click was triggered by the keyboard.
 *
 * @param handler The function to be called when the button is clicked. The first parameter is the original event and the second parameter is the pointer type.
 */
function useEnhancedClickHandler(handler) {
  const lastClickInteractionTypeRef = import_react.useRef('')
  const handlePointerDown = import_react.useCallback(
    (event) => {
      if (event.defaultPrevented) return
      lastClickInteractionTypeRef.current = event.pointerType
      handler(event, event.pointerType)
    },
    [handler]
  )
  return {
    onClick: import_react.useCallback(
      (event) => {
        if (event.detail === 0) {
          handler(event, 'keyboard')
          return
        }
        if ('pointerType' in event) handler(event, event.pointerType)
        else handler(event, lastClickInteractionTypeRef.current)
        lastClickInteractionTypeRef.current = ''
      },
      [handler]
    ),
    onPointerDown: handlePointerDown
  }
}
//#endregion
//#region node_modules/@base-ui/react/internals/useValueChanged.mjs
function useValueChanged(value, onChange) {
  const valueRef = import_react.useRef(value)
  const onChangeCallback = useStableCallback(onChange)
  useIsoLayoutEffect(() => {
    if (valueRef.current === value) return
    onChangeCallback(valueRef.current)
  }, [value, onChangeCallback])
  useIsoLayoutEffect(() => {
    valueRef.current = value
  }, [value])
}
//#endregion
//#region node_modules/@base-ui/react/utils/useOpenInteractionType.mjs
function useOpenMethodTriggerProps(open, setOpenMethod) {
  const { onClick, onPointerDown } = useEnhancedClickHandler(
    useStableCallback((_, interactionType) => {
      if (!(typeof open === 'function' ? open() : open))
        setOpenMethod(interactionType || (ios ? 'touch' : ''))
    })
  )
  return import_react.useMemo(
    () => ({
      onClick,
      onPointerDown
    }),
    [onClick, onPointerDown]
  )
}
/**
 * Determines the interaction type (keyboard, mouse, touch, etc.) that opened the component.
 *
 * @param open The open state of the component.
 */
function useOpenInteractionType(open) {
  const [openMethod, setOpenMethod] = import_react.useState(null)
  const triggerProps = useOpenMethodTriggerProps(open, setOpenMethod)
  useValueChanged(open, (previousOpen) => {
    if (previousOpen && !open) setOpenMethod(null)
  })
  return import_react.useMemo(
    () => ({
      openMethod,
      triggerProps
    }),
    [openMethod, triggerProps]
  )
}
//#endregion
//#region node_modules/@base-ui/react/floating-ui-react/hooks/gridNavigation.mjs
/**
 * Positional arguments are deliberate: property names of an options object
 * don't minify, and the signature is locked to the caller via `typeof` on the
 * `grid` option of `useListNavigation`.
 *
 * The injected grid navigator only ever operates on a uniform 1x1 grid (sizes are
 * always `1x1` and packing is never dense), so the cell-map machinery that supports
 * multi-cell items collapses to an identity transform over the item list. Calling
 * `getGridNavigatedIndex` directly keeps the cell-map helpers
 * (`createGridCellMap`/`getGridCellIndexOfCorner`/`getGridCellIndices`) out of
 * grid-combobox bundles.
 */
function gridNavigation(
  event,
  prevIndex,
  listRef,
  orientation,
  loopFocus,
  rtl,
  disabledIndices,
  minIndex,
  maxIndex,
  cols = 2
) {
  const nextIndex = getGridNavigatedIndex(listRef.current, {
    event,
    orientation,
    loopFocus,
    rtl,
    cols,
    disabledIndices,
    minIndex,
    maxIndex,
    prevIndex: prevIndex > maxIndex ? minIndex : prevIndex,
    stopEvent: true
  })
  return isIndexOutOfListBounds(listRef.current, nextIndex) ? void 0 : nextIndex
}
//#endregion
//#region node_modules/@base-ui/react/combobox/root/ComboboxRootContext.mjs
var ComboboxRootContext = /* @__PURE__ */ import_react.createContext(void 0)
var ComboboxFloatingContext = /* @__PURE__ */ import_react.createContext(void 0)
var ComboboxDerivedItemsContext =
  /* @__PURE__ */ import_react.createContext(void 0)
var ComboboxHasItemsContext = /* @__PURE__ */ import_react.createContext(false)
var ComboboxInputValueContext = /* @__PURE__ */ import_react.createContext('')
function useComboboxRootContext() {
  const context = import_react.useContext(ComboboxRootContext)
  if (!context) throw new Error(formatErrorMessage(22))
  return context
}
function useComboboxFloatingContext() {
  const context = import_react.useContext(ComboboxFloatingContext)
  if (!context) throw new Error(formatErrorMessage(23))
  return context
}
function useComboboxDerivedItemsContext() {
  const context = import_react.useContext(ComboboxDerivedItemsContext)
  if (!context) throw new Error(formatErrorMessage(24))
  return context
}
function useComboboxInputValueContext() {
  return import_react.useContext(ComboboxInputValueContext)
}
function useComboboxHasItemsContext() {
  return import_react.useContext(ComboboxHasItemsContext)
}
//#endregion
//#region node_modules/@base-ui/react/internals/itemEquality.mjs
var defaultItemEquality = (itemValue, selectedValue) =>
  Object.is(itemValue, selectedValue)
function compareItemEquality(itemValue, selectedValue, comparer) {
  if (itemValue == null || selectedValue == null)
    return Object.is(itemValue, selectedValue)
  return comparer(itemValue, selectedValue)
}
function selectedValueIncludes(selectedValues, itemValue, comparer) {
  if (!selectedValues || selectedValues.length === 0) return false
  return selectedValues.some((selectedValue) => {
    if (selectedValue === void 0) return false
    return compareItemEquality(itemValue, selectedValue, comparer)
  })
}
function findItemIndex(itemValues, selectedValue, comparer) {
  if (!itemValues || itemValues.length === 0) return -1
  return itemValues.findIndex((itemValue) => {
    if (itemValue === void 0) return false
    return compareItemEquality(itemValue, selectedValue, comparer)
  })
}
function removeItem(selectedValues, itemValue, comparer) {
  return selectedValues.filter(
    (selectedValue) => !compareItemEquality(itemValue, selectedValue, comparer)
  )
}
//#endregion
//#region node_modules/@base-ui/react/internals/serializeValue.mjs
function serializeValue(value) {
  if (value == null) return ''
  if (typeof value === 'string') return value
  try {
    return JSON.stringify(value)
  } catch {
    return String(value)
  }
}
//#endregion
//#region node_modules/@base-ui/react/internals/resolveValueLabel.mjs
function isGroupedItems(items) {
  return (
    items != null &&
    items.length > 0 &&
    typeof items[0] === 'object' &&
    items[0] != null &&
    'items' in items[0]
  )
}
/**
 * Checks if the items array contains an item with a null value that has a non-null label.
 */
function hasNullItemLabel(items) {
  if (!Array.isArray(items)) return items != null && 'null' in items
  const arrayItems = items
  if (isGroupedItems(arrayItems)) {
    for (const group of arrayItems)
      for (const item of group.items)
        if (item && item.value == null && item.label != null) return true
    return false
  }
  for (const item of arrayItems)
    if (item && item.value == null && item.label != null) return true
  return false
}
function stringifyAsLabel(item, itemToStringLabel) {
  if (itemToStringLabel && item != null) return itemToStringLabel(item) ?? ''
  if (item && typeof item === 'object') {
    if ('label' in item && item.label != null) return String(item.label)
    if ('value' in item) return String(item.value)
  }
  return serializeValue(item)
}
function stringifyAsValue(item, itemToStringValue) {
  if (itemToStringValue && item != null) return itemToStringValue(item) ?? ''
  if (item && typeof item === 'object' && 'value' in item && 'label' in item)
    return serializeValue(item.value)
  return serializeValue(item)
}
function resolveSelectedLabel(value, items, itemToStringLabel) {
  function fallback() {
    return stringifyAsLabel(value, itemToStringLabel)
  }
  if (itemToStringLabel && value != null) return itemToStringLabel(value)
  if (
    value &&
    typeof value === 'object' &&
    'label' in value &&
    value.label != null
  )
    return value.label
  if (items && !Array.isArray(items)) return items[value] ?? fallback()
  if (Array.isArray(items)) {
    const arrayItems = items
    const flatItems = isGroupedItems(arrayItems)
      ? arrayItems.flatMap((group) => group.items)
      : arrayItems
    if (value == null || typeof value !== 'object') {
      const match = flatItems.find((item) => item.value === value)
      if (match && match.label != null) return match.label
      return fallback()
    }
    if ('value' in value) {
      const match = flatItems.find((item) => item && item.value === value.value)
      if (match && match.label != null) return match.label
    }
  }
  return fallback()
}
function resolveMultipleLabels(values, items, itemToStringLabel) {
  return values.reduce((acc, value, index) => {
    if (index > 0) acc.push(', ')
    acc.push(
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
        import_react.Fragment,
        { children: resolveSelectedLabel(value, items, itemToStringLabel) },
        index
      )
    )
    return acc
  }, [])
}
//#endregion
//#region node_modules/@base-ui/react/combobox/store.mjs
var selectors = {
  id: createSelector((state) => state.id),
  labelId: createSelector((state) => state.labelId),
  items: createSelector((state) => state.items),
  selectedValue: createSelector((state) => state.selectedValue),
  hasSelectionChips: createSelector((state) => {
    const selectedValue = state.selectedValue
    return Array.isArray(selectedValue) && selectedValue.length > 0
  }),
  hasSelectedValue: createSelector((state) => {
    const { selectedValue, selectionMode } = state
    if (selectedValue == null) return false
    if (selectionMode === 'multiple' && Array.isArray(selectedValue))
      return selectedValue.length > 0
    return true
  }),
  hasNullItemLabel: createSelector((state, enabled) => {
    return enabled ? hasNullItemLabel(state.items) : false
  }),
  open: createSelector((state) => state.open),
  mounted: createSelector((state) => state.mounted),
  forceMounted: createSelector((state) => state.forceMounted),
  inline: createSelector((state) => state.inline),
  activeIndex: createSelector((state) => state.activeIndex),
  selectedIndex: createSelector((state) => state.selectedIndex),
  isActive: createSelector((state, index) => state.activeIndex === index),
  isSelected: createSelector((state, itemValue) => {
    const comparer = state.isItemEqualToValue
    const selectedValue = state.selectedValue
    if (Array.isArray(selectedValue))
      return selectedValue.some((selectedItem) =>
        compareItemEquality(itemValue, selectedItem, comparer)
      )
    return compareItemEquality(itemValue, selectedValue, comparer)
  }),
  transitionStatus: createSelector((state) => state.transitionStatus),
  popupProps: createSelector((state) => state.popupProps),
  inputProps: createSelector((state) => state.inputProps),
  triggerProps: createSelector((state) => state.triggerProps),
  itemProps: createSelector((state) => state.itemProps),
  positionerElement: createSelector((state) => state.positionerElement),
  listElement: createSelector((state) => state.listElement),
  popupId: createSelector((state) => state.popupId),
  triggerElement: createSelector((state) => state.triggerElement),
  inputElement: createSelector((state) => state.inputElement),
  inputGroupElement: createSelector((state) => state.inputGroupElement),
  popupSide: createSelector((state) => state.popupSide),
  openMethod: createSelector((state) => state.openMethod),
  inputInsidePopup: createSelector((state) => state.inputInsidePopup),
  inputOwnsFormValue: createSelector((state) => state.inputOwnsFormValue),
  selectionMode: createSelector((state) => state.selectionMode),
  name: createSelector((state) => state.name),
  form: createSelector((state) => state.form),
  disabled: createSelector((state) => state.disabled),
  readOnly: createSelector((state) => state.readOnly),
  required: createSelector((state) => state.required),
  grid: createSelector((state) => state.grid),
  virtualized: createSelector((state) => state.virtualized),
  itemToStringLabel: createSelector((state) => state.itemToStringLabel),
  isItemEqualToValue: createSelector((state) => state.isItemEqualToValue),
  modal: createSelector((state) => state.modal),
  autoHighlight: createSelector((state) => state.autoHighlight),
  submitOnItemClick: createSelector((state) => state.submitOnItemClick)
}
//#endregion
//#region node_modules/@base-ui/react/field/control/FieldControlDataAttributes.mjs
var FieldControlDataAttributes = /* @__PURE__ */ (function (
  FieldControlDataAttributes
) {
  /**
   * Present when the field is disabled.
   */
  FieldControlDataAttributes['disabled'] = 'data-disabled'
  /**
   * Present when the field is in a valid state.
   */
  FieldControlDataAttributes['valid'] = 'data-valid'
  /**
   * Present when the field is in an invalid state.
   */
  FieldControlDataAttributes['invalid'] = 'data-invalid'
  /**
   * Present when the field has been touched.
   */
  FieldControlDataAttributes['touched'] = 'data-touched'
  /**
   * Present when the field's value has changed.
   */
  FieldControlDataAttributes['dirty'] = 'data-dirty'
  /**
   * Present when the field is filled.
   */
  FieldControlDataAttributes['filled'] = 'data-filled'
  /**
   * Present when the field control is focused.
   */
  FieldControlDataAttributes['focused'] = 'data-focused'
  return FieldControlDataAttributes
})({})
//#endregion
//#region node_modules/@base-ui/react/internals/field-constants/constants.mjs
var DEFAULT_VALIDITY_STATE = {
  badInput: false,
  customError: false,
  patternMismatch: false,
  rangeOverflow: false,
  rangeUnderflow: false,
  stepMismatch: false,
  tooLong: false,
  tooShort: false,
  typeMismatch: false,
  valid: null,
  valueMissing: false
}
var DEFAULT_FIELD_STATE_ATTRIBUTES = {
  valid: null,
  touched: false,
  dirty: false,
  filled: false,
  focused: false
}
var DEFAULT_FIELD_ROOT_STATE = {
  disabled: false,
  ...DEFAULT_FIELD_STATE_ATTRIBUTES
}
var fieldValidityMapping = {
  valid(value) {
    if (value === null) return null
    if (value) return { [FieldControlDataAttributes.valid]: '' }
    return { [FieldControlDataAttributes.invalid]: '' }
  }
}
//#endregion
//#region node_modules/@base-ui/react/internals/field-root-context/FieldRootContext.mjs
var DEFAULT_FIELD_ROOT_CONTEXT = {
  invalid: void 0,
  name: void 0,
  validityData: {
    state: DEFAULT_VALIDITY_STATE,
    errors: [],
    error: '',
    value: '',
    initialValue: null
  },
  setValidityData: NOOP,
  disabled: void 0,
  touched: DEFAULT_FIELD_STATE_ATTRIBUTES.touched,
  setTouched: NOOP,
  dirty: DEFAULT_FIELD_STATE_ATTRIBUTES.dirty,
  setDirty: NOOP,
  filled: DEFAULT_FIELD_STATE_ATTRIBUTES.filled,
  setFilled: NOOP,
  focused: DEFAULT_FIELD_STATE_ATTRIBUTES.focused,
  setFocused: NOOP,
  validate: () => null,
  validationMode: 'onSubmit',
  validationDebounceTime: 0,
  shouldValidateOnChange: () => false,
  state: DEFAULT_FIELD_ROOT_STATE,
  markedDirtyRef: { current: false },
  registerFieldControl: NOOP,
  validation: {
    getValidationProps: (_disabled, props = EMPTY_OBJECT) => props,
    inputRef: { current: null },
    registerInput: NOOP,
    commit: async () => {},
    change: NOOP
  }
}
var FieldRootContext = /* @__PURE__ */ import_react.createContext(
  DEFAULT_FIELD_ROOT_CONTEXT
)
function useFieldRootContext(optional = true) {
  const context = import_react.useContext(FieldRootContext)
  if (context.setValidityData === NOOP && !optional)
    throw new Error(formatErrorMessage(28))
  return context
}
//#endregion
//#region node_modules/@base-ui/react/internals/field-register-control/useRegisterFieldControl.mjs
function useRegisterFieldControl(
  controlRef,
  id,
  value,
  getFormValueOverride,
  enabled = true,
  name
) {
  const { registerFieldControl } = useFieldRootContext()
  const sourceRef = import_react.useRef(null)
  if (!sourceRef.current) sourceRef.current = Symbol()
  useIsoLayoutEffect(() => {
    const source = sourceRef.current
    if (!source || !enabled) return
    registerFieldControl(source, {
      controlRef,
      getValue: getFormValueOverride,
      id,
      name,
      value
    })
    return () => {
      registerFieldControl(source, void 0)
    }
  }, [
    controlRef,
    enabled,
    getFormValueOverride,
    id,
    name,
    registerFieldControl,
    value
  ])
}
//#endregion
//#region node_modules/@base-ui/react/internals/form-context/FormContext.mjs
var FormContext = /* @__PURE__ */ import_react.createContext({
  formRef: { current: { fields: /* @__PURE__ */ new Map() } },
  errors: {},
  clearErrors: NOOP,
  validationMode: 'onSubmit',
  submitAttemptedRef: { current: false }
})
function useFormContext() {
  return import_react.useContext(FormContext)
}
//#endregion
//#region node_modules/@base-ui/react/internals/labelable-provider/LabelableContext.mjs
/**
 * A context for providing [labelable elements](https://html.spec.whatwg.org/multipage/forms.html#category-label)\
 * with an accessible name (label) and description.
 */
var LabelableContext = /* @__PURE__ */ import_react.createContext({
  controlId: void 0,
  registerControlId: NOOP,
  labelId: void 0,
  setLabelId: NOOP,
  messageIds: [],
  setMessageIds: NOOP,
  getDescriptionProps: (externalProps) => externalProps
})
function useLabelableContext() {
  return import_react.useContext(LabelableContext)
}
//#endregion
//#region node_modules/@base-ui/react/internals/labelable-provider/useLabelableId.mjs
function useLabelableId(params = {}) {
  const { id, implicit = false, controlRef } = params
  const { controlId, registerControlId } = useLabelableContext()
  const defaultId = useBaseUiId(id)
  const controlIdForEffect = implicit ? controlId : void 0
  const controlSourceRef = useRefWithInit(() => Symbol('labelable-control'))
  const hasRegisteredRef = import_react.useRef(false)
  const hadExplicitIdRef = import_react.useRef(id != null)
  const unregisterControlId = useStableCallback(() => {
    if (!hasRegisteredRef.current || registerControlId === NOOP) return
    hasRegisteredRef.current = false
    registerControlId(controlSourceRef.current, void 0)
  })
  useIsoLayoutEffect(() => {
    if (registerControlId === NOOP) return
    let nextId
    if (implicit) {
      const elem = controlRef?.current
      if (isElement(elem) && elem.closest('label') != null) nextId = id ?? null
      else nextId = controlIdForEffect ?? defaultId
    } else if (id != null) {
      hadExplicitIdRef.current = true
      nextId = id
    } else if (hadExplicitIdRef.current) nextId = defaultId
    else {
      unregisterControlId()
      return
    }
    if (nextId === void 0) {
      unregisterControlId()
      return
    }
    hasRegisteredRef.current = true
    registerControlId(controlSourceRef.current, nextId)
  }, [
    id,
    controlRef,
    controlIdForEffect,
    registerControlId,
    implicit,
    defaultId,
    controlSourceRef,
    unregisterControlId
  ])
  import_react.useEffect(() => {
    return unregisterControlId
  }, [unregisterControlId])
  return controlId ?? defaultId
}
//#endregion
//#region node_modules/@base-ui/react/combobox/root/utils/index.mjs
/**
 * Derives the default id assigned to `Combobox.Popup` when the input is rendered inside it.
 * Shared by the popup (which applies it) and the trigger (which references it via `aria-controls`)
 * so the convention only lives in one place.
 */
function getComboboxPopupId(rootId) {
  return rootId == null ? void 0 : `${rootId}-popup`
}
/**
 * Enhanced filter using Intl.Collator for more robust string matching.
 * Uses the provided `itemToStringLabel` function if available, otherwise falls back to:
 * • When `item` is an object with a `value` property, that property is used.
 * • When `item` is a primitive (e.g. `string`), it is used directly.
 */
function createCollatorItemFilter(collatorFilter, itemToStringLabel) {
  return (item, query) => {
    if (item == null) return false
    const itemString = stringifyAsLabel(item, itemToStringLabel)
    return collatorFilter.contains(itemString, query)
  }
}
/**
 * Enhanced filter for single selection mode using Intl.Collator that shows all items
 * when query is empty or matches the current selection, making it easier to browse options.
 */
function createSingleSelectionCollatorFilter(
  collatorFilter,
  itemToStringLabel,
  selectedValue
) {
  return (item, query) => {
    if (item == null) return false
    if (!query) return true
    const itemString = stringifyAsLabel(item, itemToStringLabel)
    const selectedString =
      selectedValue != null
        ? stringifyAsLabel(selectedValue, itemToStringLabel)
        : ''
    if (
      selectedString &&
      collatorFilter.contains(selectedString, query) &&
      selectedString.length === query.length
    )
      return true
    return collatorFilter.contains(itemString, query)
  }
}
//#endregion
//#region node_modules/@base-ui/react/utils/stringifyLocale.mjs
function stringifyLocale(locale) {
  if (Array.isArray(locale))
    return locale.map((value) => stringifyLocale(value)).join(',')
  if (locale == null) return ''
  return String(locale)
}
//#endregion
//#region node_modules/@base-ui/react/internals/filter.mjs
var filterCache = /* @__PURE__ */ new Map()
function getFilter(options = {}) {
  const mergedOptions = {
    usage: 'search',
    sensitivity: 'base',
    ignorePunctuation: true,
    ...options
  }
  const cacheKey = `${stringifyLocale(options.locale)}|${JSON.stringify(mergedOptions)}`
  const cachedFilter = filterCache.get(cacheKey)
  if (cachedFilter) return cachedFilter
  const collator = new Intl.Collator(options.locale, mergedOptions)
  const filter = {
    contains(item, query, itemToString) {
      if (!query) return true
      const itemString = stringifyAsLabel(item, itemToString)
      for (let i = 0; i <= itemString.length - query.length; i += 1)
        if (
          collator.compare(itemString.slice(i, i + query.length), query) === 0
        )
          return true
      return false
    },
    startsWith(item, query, itemToString) {
      if (!query) return true
      const itemString = stringifyAsLabel(item, itemToString)
      return collator.compare(itemString.slice(0, query.length), query) === 0
    },
    endsWith(item, query, itemToString) {
      if (!query) return true
      const itemString = stringifyAsLabel(item, itemToString)
      const queryLength = query.length
      return (
        itemString.length >= queryLength &&
        collator.compare(
          itemString.slice(itemString.length - queryLength),
          query
        ) === 0
      )
    }
  }
  filterCache.set(cacheKey, filter)
  return filter
}
//#endregion
//#region node_modules/@base-ui/react/combobox/root/utils/useFilter.mjs
/**
 * Matches items against a query using `Intl.Collator` for robust string matching.
 */
var useCoreFilter = getFilter
//#endregion
//#region node_modules/@base-ui/react/internals/areArraysEqual.mjs
function areArraysEqual(array1, array2, itemComparer = (a, b) => a === b) {
  return (
    array1.length === array2.length &&
    array1.every((value, index) => itemComparer(value, array2[index]))
  )
}
//#endregion
//#region node_modules/@base-ui/react/combobox/root/utils/constants.mjs
var NO_ACTIVE_VALUE = Symbol('none')
var INITIAL_LAST_HIGHLIGHT = {
  value: NO_ACTIVE_VALUE,
  index: -1
}
//#endregion
//#region node_modules/@base-ui/react/combobox/root/AriaCombobox.mjs
/**
 * @internal
 */
function AriaCombobox(props) {
  const {
    id: idProp,
    onOpenChangeComplete: onOpenChangeCompleteProp,
    defaultSelectedValue = null,
    selectedValue: selectedValueProp,
    onSelectedValueChange,
    defaultInputValue: defaultInputValueProp,
    inputValue: inputValueProp,
    open: openProp,
    defaultOpen = false,
    selectionMode = 'none',
    onItemHighlighted: onItemHighlightedProp,
    name: nameProp,
    form,
    disabled: disabledProp = false,
    readOnly = false,
    required = false,
    inputRef: inputRefProp,
    grid = false,
    items,
    filteredItems: filteredItemsProp,
    filter: filterProp,
    openOnInputClick = true,
    autoHighlight = false,
    keepHighlight = false,
    highlightItemOnHover = true,
    loopFocus = true,
    itemToStringLabel,
    itemToStringValue,
    isItemEqualToValue = defaultItemEquality,
    virtualized = false,
    inline: inlineProp = false,
    fillInputOnItemPress = true,
    modal = false,
    limit = -1,
    autoComplete = 'list',
    formAutoComplete,
    locale,
    submitOnItemClick = false
  } = props
  const { clearErrors } = useFormContext()
  const {
    setDirty,
    validityData,
    setFilled,
    name: fieldName,
    disabled: fieldDisabled,
    setTouched,
    setFocused,
    validationMode,
    validation
  } = useFieldRootContext()
  const direction = useDirection()
  const id = useLabelableId({ id: idProp })
  const collatorFilter = useCoreFilter({ locale })
  const [queryChangedAfterOpen, setQueryChangedAfterOpen] =
    import_react.useState(false)
  const [closeQuery, setCloseQuery] = import_react.useState(null)
  const listRef = import_react.useRef([])
  const labelsRef = import_react.useRef([])
  const popupRef = import_react.useRef(null)
  const inputRef = import_react.useRef(null)
  const startDismissRef = import_react.useRef(null)
  const endDismissRef = import_react.useRef(null)
  const emptyRef = import_react.useRef(null)
  const keyboardActiveRef = import_react.useRef(true)
  const hadInputClearRef = import_react.useRef(false)
  const chipsContainerRef = import_react.useRef(null)
  const clearRef = import_react.useRef(null)
  const selectionEventRef = import_react.useRef(null)
  const lastHighlightRef = import_react.useRef(INITIAL_LAST_HIGHLIGHT)
  const pendingQueryHighlightRef = import_react.useRef(null)
  /**
   * Contains the currently visible list of item values post-filtering.
   */
  const valuesRef = import_react.useRef([])
  /**
   * Contains all item values in a stable, unfiltered order.
   * This is only used when `items` prop is not provided.
   * It accumulates values on first mount and does not remove them on unmount due to
   * filtering, providing a stable index for selected value tracking.
   */
  const allValuesRef = import_react.useRef([])
  const disabled = fieldDisabled || disabledProp
  const name = fieldName ?? nameProp
  const multiple = selectionMode === 'multiple'
  const single = selectionMode === 'single'
  const hasInputValue =
    inputValueProp !== void 0 || defaultInputValueProp !== void 0
  const hasItems = items !== void 0
  const hasFilteredItemsProp = filteredItemsProp !== void 0
  let autoHighlightMode
  if (autoHighlight === 'always') autoHighlightMode = 'always'
  else autoHighlightMode = autoHighlight ? 'input-change' : false
  const [selectedValue, setSelectedValueUnwrapped] = useControlled({
    controlled: selectedValueProp,
    default: multiple
      ? (defaultSelectedValue ?? EMPTY_ARRAY)
      : defaultSelectedValue,
    name: 'Combobox',
    state: 'selectedValue'
  })
  const filter = import_react.useMemo(() => {
    if (filterProp === null) return () => true
    if (filterProp !== void 0) return filterProp
    if (single && !queryChangedAfterOpen)
      return createSingleSelectionCollatorFilter(
        collatorFilter,
        itemToStringLabel,
        selectedValue
      )
    return createCollatorItemFilter(collatorFilter, itemToStringLabel)
  }, [
    filterProp,
    single,
    selectedValue,
    queryChangedAfterOpen,
    collatorFilter,
    itemToStringLabel
  ])
  const initialDefaultInputValue = useRefWithInit(() => {
    if (hasInputValue) return defaultInputValueProp ?? ''
    if (single) return stringifyAsLabel(selectedValue, itemToStringLabel)
    return ''
  }).current
  const [inputValue, setInputValueUnwrapped] = useControlled({
    controlled: inputValueProp,
    default: initialDefaultInputValue,
    name: 'Combobox',
    state: 'inputValue'
  })
  const [open, setOpenUnwrapped] = useControlled({
    controlled: openProp,
    default: defaultOpen,
    name: 'Combobox',
    state: 'open'
  })
  const isGrouped = isGroupedItems(items)
  const query =
    closeQuery ?? (inputValue === '' ? '' : String(inputValue).trim())
  const selectedLabelString = single
    ? stringifyAsLabel(selectedValue, itemToStringLabel)
    : ''
  const shouldBypassFiltering =
    single &&
    !queryChangedAfterOpen &&
    query !== '' &&
    selectedLabelString !== '' &&
    selectedLabelString.length === query.length &&
    collatorFilter.contains(selectedLabelString, query)
  const filterQuery = shouldBypassFiltering ? '' : query
  const shouldIgnoreExternalFiltering =
    hasItems && hasFilteredItemsProp && shouldBypassFiltering
  const flatItems = import_react.useMemo(() => {
    if (!items) return EMPTY_ARRAY
    if (isGrouped) return items.flatMap((group) => group.items)
    return items
  }, [items, isGrouped])
  const filteredItems = import_react.useMemo(() => {
    if (filteredItemsProp && !shouldIgnoreExternalFiltering)
      return filteredItemsProp
    if (!items) return EMPTY_ARRAY
    if (isGrouped) {
      const groupedItems = items
      const resultingGroups = []
      let currentCount = 0
      for (const group of groupedItems) {
        if (limit > -1 && currentCount >= limit) break
        const candidateItems =
          filterQuery === ''
            ? group.items
            : group.items.filter((item) =>
                filter(item, filterQuery, itemToStringLabel)
              )
        if (candidateItems.length === 0) continue
        const remainingLimit = limit > -1 ? limit - currentCount : Infinity
        const itemsToTake = candidateItems.slice(0, remainingLimit)
        if (itemsToTake.length > 0) {
          const newGroup = {
            ...group,
            items: itemsToTake
          }
          resultingGroups.push(newGroup)
          currentCount += itemsToTake.length
        }
      }
      return resultingGroups
    }
    if (filterQuery === '')
      return limit > -1 ? flatItems.slice(0, limit) : flatItems
    const limitedItems = []
    for (const item of flatItems) {
      if (limit > -1 && limitedItems.length >= limit) break
      if (filter(item, filterQuery, itemToStringLabel)) limitedItems.push(item)
    }
    return limitedItems
  }, [
    filteredItemsProp,
    shouldIgnoreExternalFiltering,
    items,
    isGrouped,
    filterQuery,
    limit,
    filter,
    itemToStringLabel,
    flatItems
  ])
  const flatFilteredItems = import_react.useMemo(() => {
    if (isGrouped) return filteredItems.flatMap((g) => g.items)
    return filteredItems
  }, [filteredItems, isGrouped])
  const store = useRefWithInit(
    () =>
      new Store({
        id,
        labelId: void 0,
        selectedValue,
        open,
        filter,
        query,
        items,
        selectionMode,
        listRef,
        labelsRef,
        popupRef,
        emptyRef,
        inputRef,
        startDismissRef,
        endDismissRef,
        keyboardActiveRef,
        chipsContainerRef,
        clearRef,
        valuesRef,
        allValuesRef,
        selectionEventRef,
        name,
        form,
        disabled,
        readOnly,
        required,
        grid,
        isGrouped,
        virtualized,
        openOnInputClick,
        itemToStringLabel,
        isItemEqualToValue,
        modal,
        autoHighlight: autoHighlightMode,
        submitOnItemClick,
        hasInputValue,
        mounted: false,
        forceMounted: false,
        transitionStatus: 'idle',
        inline: inlineProp,
        activeIndex: null,
        selectedIndex: null,
        popupProps: {},
        inputProps: {},
        triggerProps: {},
        itemProps: EMPTY_OBJECT,
        positionerElement: null,
        listElement: null,
        popupId: void 0,
        triggerElement: null,
        inputElement: null,
        inputGroupElement: null,
        popupSide: null,
        openMethod: null,
        inputInsidePopup: true,
        inputOwnsFormValue: selectionMode === 'none',
        onOpenChangeComplete: onOpenChangeCompleteProp || NOOP,
        setOpen: NOOP,
        setInputValue: NOOP,
        setSelectedValue: NOOP,
        setIndices: NOOP,
        onItemHighlighted: NOOP,
        handleSelection: NOOP,
        forceMount: NOOP,
        requestSubmit: NOOP
      })
  ).current
  const fieldRawValue = selectionMode === 'none' ? inputValue : selectedValue
  const fieldStringValue = import_react.useMemo(() => {
    if (selectionMode === 'none') return fieldRawValue
    if (Array.isArray(selectedValue))
      return selectedValue.map((value) =>
        stringifyAsValue(value, itemToStringValue)
      )
    return stringifyAsValue(selectedValue, itemToStringValue)
  }, [fieldRawValue, itemToStringValue, selectionMode, selectedValue])
  const onItemHighlighted = useStableCallback(onItemHighlightedProp)
  const onOpenChangeComplete = useStableCallback(onOpenChangeCompleteProp)
  const activeIndex = useStore(store, selectors.activeIndex)
  const selectedIndex = useStore(store, selectors.selectedIndex)
  const positionerElement = useStore(store, selectors.positionerElement)
  const listElement = useStore(store, selectors.listElement)
  const triggerElement = useStore(store, selectors.triggerElement)
  const inputElement = useStore(store, selectors.inputElement)
  const inputGroupElement = useStore(store, selectors.inputGroupElement)
  const inline = useStore(store, selectors.inline)
  const inputInsidePopup = useStore(store, selectors.inputInsidePopup)
  const inputOwnsFormValue = useStore(store, selectors.inputOwnsFormValue)
  const triggerRef = useValueAsRef(triggerElement)
  const { mounted, setMounted, transitionStatus } = useTransitionStatus(open)
  const { openMethod, triggerProps } = useOpenInteractionType(open)
  const getStringifiedValueForForm = useStableCallback(() => fieldStringValue)
  useRegisterFieldControl(
    inputInsidePopup ? triggerRef : inputRef,
    id,
    fieldRawValue,
    getStringifiedValueForForm,
    !disabled,
    nameProp
  )
  const forceMount = useStableCallback(() => {
    if (items)
      labelsRef.current = flatFilteredItems.map((item) =>
        stringifyAsLabel(item, itemToStringLabel)
      )
    else store.set('forceMounted', true)
  })
  const initialSelectedValueRef = import_react.useRef(selectedValue)
  useIsoLayoutEffect(() => {
    if (selectedValue !== initialSelectedValueRef.current) forceMount()
  }, [forceMount, selectedValue])
  const setIndices = useStableCallback((options) => {
    store.update(options)
    const type = options.type || 'none'
    if (options.activeIndex === void 0) return
    if (options.activeIndex === null) {
      if (lastHighlightRef.current !== INITIAL_LAST_HIGHLIGHT) {
        lastHighlightRef.current = INITIAL_LAST_HIGHLIGHT
        onItemHighlighted(
          void 0,
          createGenericEventDetails(type, void 0, { index: -1 })
        )
      }
    } else {
      const activeValue = valuesRef.current[options.activeIndex]
      lastHighlightRef.current = {
        value: activeValue,
        index: options.activeIndex
      }
      onItemHighlighted(
        activeValue,
        createGenericEventDetails(type, void 0, { index: options.activeIndex })
      )
    }
  })
  const setInputValue = useStableCallback((next, eventDetails) => {
    hadInputClearRef.current = eventDetails.reason === inputClear
    props.onInputValueChange?.(next, eventDetails)
    if (eventDetails.isCanceled) return
    if (eventDetails.reason === 'input-change') {
      const event = eventDetails.event
      const inputType = event.inputType
      if (
        event.type === 'compositionend' ||
        (inputType != null &&
          inputType !== '' &&
          inputType !== 'insertReplacementText')
      ) {
        const hasQuery = next.trim() !== ''
        if (hasQuery) setQueryChangedAfterOpen(true)
        pendingQueryHighlightRef.current = { hasQuery }
        if (hasQuery && autoHighlightMode && store.state.activeIndex == null)
          store.set('activeIndex', 0)
      }
    }
    setInputValueUnwrapped(next)
  })
  const setOpen = useStableCallback((nextOpen, eventDetails) => {
    if (open === nextOpen) return
    if (
      eventDetails.reason === 'escape-key' &&
      hasItems &&
      flatFilteredItems.length === 0 &&
      !store.state.emptyRef.current
    )
      eventDetails.allowPropagation()
    props.onOpenChange?.(nextOpen, eventDetails)
    if (eventDetails.isCanceled) return
    if (
      nextOpen &&
      multiple &&
      inputInsidePopup &&
      !inline &&
      closeQuery !== null
    ) {
      setQueryChangedAfterOpen(false)
      setCloseQuery(null)
      if (inputValue !== '')
        setInputValue(
          '',
          createChangeEventDetails(inputClear, eventDetails.event)
        )
    }
    if (!nextOpen && queryChangedAfterOpen) {
      if (single) {
        if (!inline) setCloseQuery(query)
        if (query === '') setQueryChangedAfterOpen(false)
      } else if (multiple) {
        if (!inline) setCloseQuery(query)
        if (inputInsidePopup) setIndices({ activeIndex: null })
        if (!inputInsidePopup || inline)
          setInputValue(
            '',
            createChangeEventDetails(inputClear, eventDetails.event)
          )
      }
    }
    setOpenUnwrapped(nextOpen)
    if (
      !nextOpen &&
      inputInsidePopup &&
      (eventDetails.reason === 'focus-out' ||
        eventDetails.reason === 'outside-press')
    ) {
      setTouched(true)
      setFocused(false)
      if (validationMode === 'onBlur') {
        const valueToValidate =
          selectionMode === 'none' ? inputValue : selectedValue
        validation.commit(valueToValidate)
      }
    }
  })
  const setSelectedValue = useStableCallback((nextValue, eventDetails) => {
    onSelectedValueChange?.(nextValue, eventDetails)
    if (eventDetails.isCanceled) return
    setSelectedValueUnwrapped(nextValue)
    if (
      (selectionMode === 'none' && popupRef.current && fillInputOnItemPress) ||
      (single && !store.state.inputInsidePopup)
    )
      setInputValue(
        stringifyAsLabel(nextValue, itemToStringLabel),
        createChangeEventDetails(eventDetails.reason, eventDetails.event)
      )
    if (
      single &&
      nextValue != null &&
      eventDetails.reason !== 'input-change' &&
      queryChangedAfterOpen &&
      !inline
    )
      setCloseQuery(query)
  })
  const handleSelection = useStableCallback((event, passedValue) => {
    let itemValue = passedValue
    if (itemValue === void 0) {
      if (activeIndex === null) return
      itemValue = valuesRef.current[activeIndex]
    }
    const targetEl = getTarget(event)
    const overrideEvent = selectionEventRef.current ?? event
    selectionEventRef.current = null
    const eventDetails = createChangeEventDetails(itemPress, overrideEvent)
    const href = targetEl?.closest('a')?.getAttribute('href')
    if (href) {
      if (href.startsWith('#')) setOpen(false, eventDetails)
      return
    }
    if (multiple) {
      const currentSelectedValue = Array.isArray(selectedValue)
        ? selectedValue
        : []
      setSelectedValue(
        selectedValueIncludes(
          currentSelectedValue,
          itemValue,
          store.state.isItemEqualToValue
        )
          ? removeItem(
              currentSelectedValue,
              itemValue,
              store.state.isItemEqualToValue
            )
          : [...currentSelectedValue, itemValue],
        eventDetails
      )
      if (eventDetails.isCanceled) return
      if (!(inputRef.current ? inputRef.current.value.trim() !== '' : false))
        return
      if (store.state.inputInsidePopup)
        setInputValue(
          '',
          createChangeEventDetails(inputClear, eventDetails.event)
        )
      else setOpen(false, eventDetails)
    } else {
      setSelectedValue(itemValue, eventDetails)
      if (eventDetails.isCanceled) return
      setOpen(false, eventDetails)
    }
  })
  const requestSubmit = useStableCallback(() => {
    if (!store.state.submitOnItemClick) return
    const formElement =
      validation.inputRef.current?.form ?? store.state.inputElement?.form
    if (formElement && typeof formElement.requestSubmit === 'function')
      formElement.requestSubmit()
  })
  const handleUnmount = useStableCallback(() => {
    setMounted(false)
    onOpenChangeComplete?.(false)
    setQueryChangedAfterOpen(false)
    setCloseQuery(null)
    if (selectionMode === 'none')
      setIndices({
        activeIndex: null,
        selectedIndex: null
      })
    else setIndices({ activeIndex: null })
    if (
      multiple &&
      inputRef.current &&
      inputRef.current.value !== '' &&
      !hadInputClearRef.current
    )
      setInputValue('', createChangeEventDetails(inputClear))
    if (single)
      if (store.state.inputInsidePopup) {
        if (inputRef.current && inputRef.current.value !== '')
          setInputValue('', createChangeEventDetails(inputClear))
      } else {
        const stringVal = stringifyAsLabel(selectedValue, itemToStringLabel)
        if (inputRef.current && inputRef.current.value !== stringVal)
          setInputValue(
            stringVal,
            createChangeEventDetails(stringVal === '' ? inputClear : none)
          )
      }
  })
  const resolvedPopupRef = import_react.useMemo(() => {
    if (inline && positionerElement)
      return { current: positionerElement.closest('[role="dialog"]') }
    return popupRef
  }, [inline, positionerElement])
  useOpenChangeComplete({
    enabled: !props.actionsRef,
    open,
    ref: resolvedPopupRef,
    onComplete() {
      if (!open) handleUnmount()
    }
  })
  import_react.useImperativeHandle(
    props.actionsRef,
    () => ({ unmount: handleUnmount }),
    [handleUnmount]
  )
  useIsoLayoutEffect(
    function syncSelectedIndex() {
      if (open || selectionMode === 'none') return
      const registry = items ? flatItems : allValuesRef.current
      if (multiple) {
        const currentValue = Array.isArray(selectedValue) ? selectedValue : []
        const lastValue = currentValue[currentValue.length - 1]
        const lastIndex = findItemIndex(registry, lastValue, isItemEqualToValue)
        setIndices({ selectedIndex: lastIndex === -1 ? null : lastIndex })
      } else {
        const index = findItemIndex(registry, selectedValue, isItemEqualToValue)
        setIndices({ selectedIndex: index === -1 ? null : index })
      }
    },
    [
      open,
      selectedValue,
      items,
      selectionMode,
      flatItems,
      multiple,
      isItemEqualToValue,
      setIndices
    ]
  )
  useIsoLayoutEffect(() => {
    if (items) {
      valuesRef.current = flatFilteredItems
      listRef.current.length = flatFilteredItems.length
    }
  }, [items, flatFilteredItems])
  useIsoLayoutEffect(() => {
    const pendingHighlight = pendingQueryHighlightRef.current
    if (pendingHighlight) {
      if (pendingHighlight.hasQuery) {
        if (autoHighlightMode) store.set('activeIndex', 0)
      } else if (autoHighlightMode === 'always') store.set('activeIndex', 0)
      pendingQueryHighlightRef.current = null
    }
    if (!open && !inline) return
    const candidateItems =
      hasItems || hasFilteredItemsProp ? flatFilteredItems : valuesRef.current
    const storeActiveIndex = store.state.activeIndex
    if (storeActiveIndex == null) {
      if (autoHighlightMode === 'always' && candidateItems.length > 0) {
        store.set('activeIndex', 0)
        return
      }
      if (lastHighlightRef.current !== INITIAL_LAST_HIGHLIGHT) {
        lastHighlightRef.current = INITIAL_LAST_HIGHLIGHT
        store.state.onItemHighlighted(
          void 0,
          createGenericEventDetails(none, void 0, { index: -1 })
        )
      }
      return
    }
    if (storeActiveIndex >= candidateItems.length) {
      if (lastHighlightRef.current !== INITIAL_LAST_HIGHLIGHT) {
        lastHighlightRef.current = INITIAL_LAST_HIGHLIGHT
        store.state.onItemHighlighted(
          void 0,
          createGenericEventDetails(none, void 0, { index: -1 })
        )
      }
      store.set('activeIndex', null)
      return
    }
    const itemValue = candidateItems[storeActiveIndex]
    const previouslyHighlightedItemValue = lastHighlightRef.current.value
    const isSameItem =
      previouslyHighlightedItemValue !== NO_ACTIVE_VALUE &&
      compareItemEquality(
        itemValue,
        previouslyHighlightedItemValue,
        store.state.isItemEqualToValue
      )
    if (lastHighlightRef.current.index !== storeActiveIndex || !isSameItem) {
      lastHighlightRef.current = {
        value: itemValue,
        index: storeActiveIndex
      }
      store.state.onItemHighlighted(
        itemValue,
        createGenericEventDetails(none, void 0, { index: storeActiveIndex })
      )
    }
  }, [
    activeIndex,
    autoHighlightMode,
    hasFilteredItemsProp,
    hasItems,
    flatFilteredItems,
    inline,
    open,
    store
  ])
  useIsoLayoutEffect(() => {
    if (selectionMode === 'none') {
      setFilled(String(inputValue) !== '')
      return
    }
    setFilled(
      multiple
        ? Array.isArray(selectedValue) && selectedValue.length > 0
        : selectedValue != null
    )
  }, [setFilled, selectionMode, inputValue, selectedValue, multiple])
  import_react.useEffect(() => {
    if (hasItems && autoHighlightMode && flatFilteredItems.length === 0)
      setIndices({ activeIndex: null })
  }, [hasItems, autoHighlightMode, flatFilteredItems.length, setIndices])
  function isSelectedValueDirty(value) {
    const initialValue = validityData.initialValue
    if (Array.isArray(value) && Array.isArray(initialValue))
      return !areArraysEqual(
        value,
        initialValue,
        (itemValue, initialItemValue) =>
          compareItemEquality(itemValue, initialItemValue, isItemEqualToValue)
      )
    return value !== initialValue
  }
  useValueChanged(query, () => {
    if (!open || query === '' || query === String(initialDefaultInputValue))
      return
    setQueryChangedAfterOpen(true)
  })
  useValueChanged(selectedValue, () => {
    if (selectionMode === 'none') return
    clearErrors(name)
    setDirty(isSelectedValueDirty(selectedValue))
    validation.change(selectedValue)
    if (single && !hasInputValue && !inputInsidePopup) {
      const nextInputValue = stringifyAsLabel(selectedValue, itemToStringLabel)
      if (inputValue !== nextInputValue)
        setInputValue(nextInputValue, createChangeEventDetails(none))
    }
  })
  useValueChanged(inputValue, () => {
    if (selectionMode !== 'none') return
    clearErrors(name)
    setDirty(inputValue !== validityData.initialValue)
    validation.change(inputValue)
  })
  useValueChanged(items, () => {
    if (!single || hasInputValue || inputInsidePopup || queryChangedAfterOpen)
      return
    const nextInputValue = stringifyAsLabel(selectedValue, itemToStringLabel)
    if (inputValue !== nextInputValue)
      setInputValue(nextInputValue, createChangeEventDetails(none))
  })
  const floatingRootContext = useFloatingRootContext({
    open: inline ? true : open,
    onOpenChange: setOpen,
    elements: {
      reference: inputInsidePopup ? triggerElement : inputElement,
      floating: positionerElement
    }
  })
  let ariaHasPopup
  let ariaExpanded
  if (!inline) {
    ariaHasPopup = grid ? 'grid' : 'listbox'
    ariaExpanded = open ? 'true' : 'false'
  }
  const role = import_react.useMemo(() => {
    const isPlainInput = inputElement?.tagName === 'INPUT'
    const shouldTreatAsInput = inputElement == null || isPlainInput
    const shouldApplyAria = shouldTreatAsInput || open
    const reference = shouldTreatAsInput
      ? {
          autoComplete: 'off',
          spellCheck: 'false',
          autoCorrect: 'off',
          autoCapitalize: 'none'
        }
      : {}
    if (shouldApplyAria) {
      reference.role = 'combobox'
      reference['aria-expanded'] = ariaExpanded
      reference['aria-haspopup'] = ariaHasPopup
      reference['aria-controls'] = open ? listElement?.id : void 0
      reference['aria-autocomplete'] = autoComplete
    }
    return {
      reference,
      floating: { role: 'presentation' }
    }
  }, [
    inputElement,
    open,
    ariaExpanded,
    ariaHasPopup,
    listElement?.id,
    autoComplete
  ])
  const click = useClick(floatingRootContext, {
    enabled: !readOnly && !disabled && openOnInputClick,
    event: 'mousedown-only',
    toggle: false,
    touchOpenDelay: inputInsidePopup ? 0 : 100,
    reason: inputPress
  })
  const dismiss = useDismiss(floatingRootContext, {
    enabled: !readOnly && !disabled && !inline,
    outsidePressEvent: {
      mouse: 'sloppy',
      touch: 'intentional'
    },
    bubbles: inline ? true : void 0,
    outsidePress(event) {
      const target = getTarget(event)
      return (
        !contains(triggerElement, target) &&
        !contains(clearRef.current, target) &&
        !contains(chipsContainerRef.current, target) &&
        !contains(inputGroupElement, target)
      )
    }
  })
  const listNavigation = useListNavigation(floatingRootContext, {
    enabled: !readOnly && !disabled,
    id,
    listRef,
    activeIndex,
    selectedIndex,
    virtual: true,
    loopFocus,
    allowEscape: loopFocus && !autoHighlightMode,
    focusItemOnOpen:
      queryChangedAfterOpen || (selectionMode === 'none' && !autoHighlightMode)
        ? false
        : 'auto',
    focusItemOnHover: highlightItemOnHover,
    resetOnPointerLeave: !keepHighlight,
    orientation: grid ? 'horizontal' : void 0,
    rtl: direction === 'rtl',
    disabledIndices: EMPTY_ARRAY,
    grid: grid ? gridNavigation : void 0,
    onNavigate(nextActiveIndex, event) {
      if ((!event && !open) || transitionStatus === 'ending') return
      if (!event) setIndices({ activeIndex: nextActiveIndex })
      else
        setIndices({
          activeIndex: nextActiveIndex,
          type: keyboardActiveRef.current ? 'keyboard' : 'pointer'
        })
    }
  })
  const inputProps = import_react.useMemo(
    () =>
      mergeProps(
        listNavigation.reference,
        {
          onKeyDown(event) {
            if (
              grid &&
              store.state.activeIndex == null &&
              (event.key === 'ArrowLeft' || event.key === 'ArrowRight')
            )
              event.preventBaseUIHandler()
          }
        },
        dismiss.reference,
        click.reference,
        role.reference
      ),
    [
      listNavigation.reference,
      dismiss.reference,
      click.reference,
      role.reference,
      grid,
      store
    ]
  )
  const popupProps = import_react.useMemo(
    () =>
      mergeProps(
        FOCUSABLE_POPUP_PROPS,
        listNavigation.floating,
        dismiss.floating,
        role.floating
      ),
    [listNavigation.floating, dismiss.floating, role.floating]
  )
  const itemProps = import_react.useMemo(() => {
    const listNavigationItemProps = listNavigation.item
    if (!listNavigationItemProps) return EMPTY_OBJECT
    return {
      ...listNavigationItemProps,
      onFocus: void 0
    }
  }, [listNavigation.item])
  useOnFirstRender(() => {
    store.update({
      inline: inlineProp,
      popupProps,
      inputProps,
      triggerProps,
      itemProps,
      setOpen,
      setInputValue,
      setSelectedValue,
      setIndices,
      onItemHighlighted,
      handleSelection,
      forceMount,
      requestSubmit
    })
  })
  useIsoLayoutEffect(() => {
    store.update({
      id,
      selectedValue,
      open,
      mounted,
      transitionStatus,
      items,
      inline: inlineProp,
      popupProps,
      inputProps,
      triggerProps,
      openMethod,
      itemProps,
      selectionMode,
      name,
      form,
      disabled,
      readOnly,
      required,
      grid,
      isGrouped,
      virtualized,
      onOpenChangeComplete,
      openOnInputClick,
      itemToStringLabel,
      modal,
      autoHighlight: autoHighlightMode,
      isItemEqualToValue,
      submitOnItemClick,
      hasInputValue,
      requestSubmit,
      inputOwnsFormValue:
        selectionMode === 'none' &&
        (inlineProp || !store.state.inputInsidePopup)
    })
  }, [
    store,
    id,
    selectedValue,
    open,
    mounted,
    transitionStatus,
    items,
    popupProps,
    inputProps,
    itemProps,
    openMethod,
    triggerProps,
    selectionMode,
    name,
    disabled,
    readOnly,
    required,
    validation,
    grid,
    isGrouped,
    virtualized,
    onOpenChangeComplete,
    openOnInputClick,
    itemToStringLabel,
    modal,
    isItemEqualToValue,
    submitOnItemClick,
    hasInputValue,
    inlineProp,
    requestSubmit,
    autoHighlightMode,
    form
  ])
  const hiddenInputRef = useMergedRefs(inputRefProp, validation.inputRef)
  const itemsContextValue = import_react.useMemo(
    () => ({
      query,
      hasItems,
      filteredItems,
      flatFilteredItems
    }),
    [query, hasItems, filteredItems, flatFilteredItems]
  )
  const serializedValue = import_react.useMemo(() => {
    if (Array.isArray(fieldRawValue)) return ''
    return stringifyAsValue(fieldRawValue, itemToStringValue)
  }, [fieldRawValue, itemToStringValue])
  const hasMultipleSelection =
    multiple && Array.isArray(selectedValue) && selectedValue.length > 0
  const hiddenInputName =
    multiple || (selectionMode === 'none' && inputOwnsFormValue) ? void 0 : name
  const hiddenInputs = import_react.useMemo(() => {
    if (!multiple || !Array.isArray(selectedValue) || !name) return null
    return selectedValue.map((value) => {
      const currentSerializedValue = stringifyAsValue(value, itemToStringValue)
      return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
        'input',
        {
          type: 'hidden',
          form,
          name,
          value: currentSerializedValue,
          disabled
        },
        currentSerializedValue
      )
    })
  }, [multiple, selectedValue, form, name, itemToStringValue, disabled])
  const children = /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(
    import_react.Fragment,
    {
      children: [
        props.children,
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)('input', {
          ...validation.getValidationProps(disabled, {
            onFocus() {
              if (inputInsidePopup) {
                triggerElement?.focus()
                return
              }
              ;(inputRef.current || triggerElement)?.focus()
            },
            onChange(event) {
              if (event.nativeEvent.defaultPrevented || disabled || readOnly)
                return
              const nextValue = event.currentTarget.value
              const nextValueLower = nextValue.toLowerCase()
              const details = createChangeEventDetails(none, event.nativeEvent)
              const findSerializedMatchIndex = () =>
                valuesRef.current.findIndex(
                  (candidate) =>
                    stringifyAsValue(
                      candidate,
                      itemToStringValue
                    ).toLowerCase() === nextValueLower ||
                    stringifyAsLabel(
                      candidate,
                      itemToStringLabel
                    ).toLowerCase() === nextValueLower
                )
              function handleChange() {
                if (multiple) return
                if (selectionMode === 'none') {
                  setInputValue(nextValue, details)
                  return
                }
                let matchingIndex = findSerializedMatchIndex()
                if (matchingIndex === -1)
                  matchingIndex = valuesRef.current.findIndex((_, index) => {
                    const renderedLabel = labelsRef.current[index]
                    return (
                      renderedLabel != null &&
                      renderedLabel.toLowerCase() === nextValueLower
                    )
                  })
                const matchingValue =
                  matchingIndex === -1
                    ? void 0
                    : valuesRef.current[matchingIndex]
                if (matchingValue != null)
                  setSelectedValue?.(matchingValue, details)
              }
              if (single) {
                forceMount()
                if (items && findSerializedMatchIndex() === -1)
                  store.set('forceMounted', true)
              }
              queueMicrotask(handleChange)
            }
          }),
          id: id && hiddenInputName == null ? `${id}-hidden-input` : void 0,
          form,
          name: hiddenInputName,
          autoComplete: formAutoComplete,
          disabled,
          required: required && !hasMultipleSelection,
          readOnly,
          value: serializedValue,
          ref: hiddenInputRef,
          style: hiddenInputName ? visuallyHiddenInput : visuallyHidden,
          tabIndex: -1,
          'aria-hidden': true,
          suppressHydrationWarning: true
        }),
        hiddenInputs
      ]
    }
  )
  return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
    ComboboxRootContext.Provider,
    {
      value: store,
      children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
        ComboboxFloatingContext.Provider,
        {
          value: floatingRootContext,
          children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
            ComboboxHasItemsContext.Provider,
            {
              value: hasItems,
              children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
                ComboboxDerivedItemsContext.Provider,
                {
                  value: itemsContextValue,
                  children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
                    ComboboxInputValueContext.Provider,
                    {
                      value: inputValue,
                      children
                    }
                  )
                }
              )
            }
          )
        }
      )
    }
  )
}
//#endregion
//#region node_modules/@base-ui/react/combobox/utils/stateAttributesMapping.mjs
var triggerStateAttributesMapping = {
  ...pressableTriggerOpenStateMapping,
  ...fieldValidityMapping,
  popupSide: (side) => (side ? { 'data-popup-side': side } : null),
  listEmpty: (empty) => (empty ? { 'data-list-empty': '' } : null)
}
//#endregion
//#region node_modules/@base-ui/react/utils/getPseudoElementBounds.mjs
function getPseudoElementBounds(element) {
  const elementRect = element.getBoundingClientRect()
  const win = getWindow(element)
  if (jsdom) return elementRect
  const beforeStyles = win.getComputedStyle(element, '::before')
  const afterStyles = win.getComputedStyle(element, '::after')
  if (!(beforeStyles.content !== 'none' || afterStyles.content !== 'none'))
    return elementRect
  const beforeWidth = parseFloat(beforeStyles.width) || 0
  const beforeHeight = parseFloat(beforeStyles.height) || 0
  const afterWidth = parseFloat(afterStyles.width) || 0
  const afterHeight = parseFloat(afterStyles.height) || 0
  const totalWidth = Math.max(elementRect.width, beforeWidth, afterWidth)
  const totalHeight = Math.max(elementRect.height, beforeHeight, afterHeight)
  const widthDiff = totalWidth - elementRect.width
  const heightDiff = totalHeight - elementRect.height
  return {
    left: elementRect.left - widthDiff / 2,
    right: elementRect.right + widthDiff / 2,
    top: elementRect.top - heightDiff / 2,
    bottom: elementRect.bottom + heightDiff / 2
  }
}
//#endregion
//#region node_modules/@base-ui/react/utils/resolveAriaLabelledBy.mjs
function resolveAriaLabelledBy(fieldLabelId, localLabelId) {
  return fieldLabelId ?? localLabelId
}
//#endregion
//#region node_modules/@base-ui/react/combobox/trigger/ComboboxTrigger.mjs
var BOUNDARY_OFFSET = 2
/**
 * A button that opens the popup.
 * Renders a `<button>` element.
 *
 * Documentation: [Base UI Combobox](https://base-ui.com/react/components/combobox)
 */
var ComboboxTrigger = /* @__PURE__ */ import_react.forwardRef(
  function ComboboxTrigger(componentProps, forwardedRef) {
    const {
      render,
      className,
      nativeButton = true,
      disabled: disabledProp = false,
      id: idProp,
      style,
      ...elementProps
    } = componentProps
    const {
      state: fieldState,
      disabled: fieldDisabled,
      setTouched,
      setFocused,
      validationMode,
      validation
    } = useFieldRootContext()
    const { labelId: fieldLabelId } = useLabelableContext()
    const store = useComboboxRootContext()
    const { filteredItems } = useComboboxDerivedItemsContext()
    const selectionMode = useStore(store, selectors.selectionMode)
    const comboboxDisabled = useStore(store, selectors.disabled)
    const readOnly = useStore(store, selectors.readOnly)
    const required = useStore(store, selectors.required)
    const mounted = useStore(store, selectors.mounted)
    const popupSideValue = useStore(store, selectors.popupSide)
    const positionerElement = useStore(store, selectors.positionerElement)
    const listElement = useStore(store, selectors.listElement)
    const storedPopupId = useStore(store, selectors.popupId)
    const triggerProps = useStore(store, selectors.triggerProps)
    const triggerElement = useStore(store, selectors.triggerElement)
    const inputInsidePopup = useStore(store, selectors.inputInsidePopup)
    const rootId = useStore(store, selectors.id)
    const comboboxLabelId = useStore(store, selectors.labelId)
    const open = useStore(store, selectors.open)
    const selectedValue = useStore(store, selectors.selectedValue)
    const activeIndex = useStore(store, selectors.activeIndex)
    const selectedIndex = useStore(store, selectors.selectedIndex)
    const hasSelectedValue = useStore(store, selectors.hasSelectedValue)
    const floatingRootContext = useComboboxFloatingContext()
    const inputValue = useComboboxInputValueContext()
    const focusTimeout = useTimeout()
    const disabled = fieldDisabled || comboboxDisabled || disabledProp
    const listEmpty = filteredItems.length === 0
    const popupSide = mounted && positionerElement ? popupSideValue : null
    useLabelableId({ id: inputInsidePopup ? idProp : void 0 })
    const id = inputInsidePopup ? (idProp ?? rootId) : idProp
    const ariaLabelledBy = resolveAriaLabelledBy(fieldLabelId, comboboxLabelId)
    let ariaControls
    if (open && inputInsidePopup)
      ariaControls = storedPopupId ?? getComboboxPopupId(rootId)
    else if (open) ariaControls = listElement?.id
    const currentPointerTypeRef = import_react.useRef('')
    function trackPointerType(event) {
      currentPointerTypeRef.current = event.pointerType
    }
    const domReference = floatingRootContext.useState('domReferenceElement')
    import_react.useEffect(() => {
      if (!inputInsidePopup) return
      if (triggerElement && triggerElement !== domReference)
        floatingRootContext.set('domReferenceElement', triggerElement)
    }, [triggerElement, domReference, floatingRootContext, inputInsidePopup])
    const { reference: triggerTypeaheadProps } = useTypeahead(
      floatingRootContext,
      {
        enabled:
          !open && !readOnly && !comboboxDisabled && selectionMode === 'single',
        listRef: store.state.labelsRef,
        activeIndex,
        selectedIndex,
        onMatch(index) {
          const nextSelectedValue = store.state.valuesRef.current[index]
          if (nextSelectedValue !== void 0)
            store.state.setSelectedValue(
              nextSelectedValue,
              createChangeEventDetails('none')
            )
        }
      }
    )
    const { reference: triggerClickProps } = useClick(floatingRootContext, {
      enabled: !readOnly && !comboboxDisabled,
      event: 'mousedown'
    })
    const { buttonRef, getButtonProps } = useButton({
      native: nativeButton,
      disabled
    })
    const state = {
      ...fieldState,
      open,
      disabled,
      popupSide,
      listEmpty,
      placeholder: selectionMode === 'none' ? false : !hasSelectedValue
    }
    return useRenderElement('button', componentProps, {
      ref: [
        forwardedRef,
        buttonRef,
        useStableCallback((element) => {
          store.set('triggerElement', element)
        })
      ],
      state,
      props: [
        triggerProps,
        triggerClickProps,
        triggerTypeaheadProps,
        {
          id,
          tabIndex: inputInsidePopup ? 0 : -1,
          role: inputInsidePopup ? 'combobox' : void 0,
          'aria-expanded': open ? 'true' : 'false',
          'aria-haspopup': inputInsidePopup ? 'dialog' : 'listbox',
          'aria-controls': ariaControls,
          'aria-required': inputInsidePopup ? required || void 0 : void 0,
          'aria-labelledby': ariaLabelledBy,
          onPointerDown: trackPointerType,
          onPointerEnter: trackPointerType,
          onFocus() {
            setFocused(true)
            if (disabled || readOnly) return
            focusTimeout.start(0, store.state.forceMount)
          },
          onBlur(event) {
            if (contains(positionerElement, event.relatedTarget)) return
            setTouched(true)
            setFocused(false)
            if (validationMode === 'onBlur') {
              const valueToValidate =
                selectionMode === 'none' ? inputValue : selectedValue
              validation.commit(valueToValidate)
            }
          },
          onMouseDown(event) {
            if (disabled || readOnly) return
            if (!inputInsidePopup)
              floatingRootContext.set(
                'domReferenceElement',
                event.currentTarget
              )
            store.state.forceMount()
            if (currentPointerTypeRef.current !== 'touch') {
              store.state.inputRef.current?.focus()
              if (!inputInsidePopup) event.preventDefault()
            }
            if (open) return
            const doc = ownerDocument(event.currentTarget)
            function handleMouseUp(mouseEvent) {
              if (!triggerElement) return
              const mouseUpTarget = getTarget(mouseEvent)
              const positioner = store.state.positionerElement
              const list = store.state.listElement
              if (
                contains(triggerElement, mouseUpTarget) ||
                contains(positioner, mouseUpTarget) ||
                contains(list, mouseUpTarget) ||
                mouseUpTarget === triggerElement
              )
                return
              const bounds = getPseudoElementBounds(triggerElement)
              const withinHorizontal =
                mouseEvent.clientX >= bounds.left - BOUNDARY_OFFSET &&
                mouseEvent.clientX <= bounds.right + BOUNDARY_OFFSET
              const withinVertical =
                mouseEvent.clientY >= bounds.top - BOUNDARY_OFFSET &&
                mouseEvent.clientY <= bounds.bottom + BOUNDARY_OFFSET
              if (withinHorizontal && withinVertical) return
              store.state.setOpen(
                false,
                createChangeEventDetails('cancel-open', mouseEvent)
              )
            }
            if (inputInsidePopup)
              doc.addEventListener('mouseup', handleMouseUp, { once: true })
          },
          onKeyDown(event) {
            if (disabled || readOnly) return
            if (event.key === 'ArrowDown' || event.key === 'ArrowUp') {
              stopEvent(event)
              store.state.setOpen(
                true,
                createChangeEventDetails(listNavigation, event.nativeEvent)
              )
              store.state.inputRef.current?.focus()
            }
          }
        },
        validation
          ? validation.getValidationProps(disabled, elementProps)
          : elementProps,
        getButtonProps
      ],
      stateAttributesMapping: triggerStateAttributesMapping
    })
  }
)
//#endregion
//#region node_modules/@base-ui/react/combobox/chips/ComboboxChipsContext.mjs
var ComboboxChipsContext = /* @__PURE__ */ import_react.createContext(void 0)
function useComboboxChipsContext() {
  return import_react.useContext(ComboboxChipsContext)
}
//#endregion
//#region node_modules/@base-ui/react/combobox/positioner/ComboboxPositionerContext.mjs
var ComboboxPositionerContext =
  /* @__PURE__ */ import_react.createContext(void 0)
function useComboboxPositionerContext(optional) {
  const context = import_react.useContext(ComboboxPositionerContext)
  if (context === void 0 && !optional) throw new Error(formatErrorMessage(21))
  return context
}
//#endregion
//#region node_modules/@base-ui/react/combobox/utils/ComboboxInternalDismissButton.mjs
/**
 * @internal
 */
var ComboboxInternalDismissButton = /* @__PURE__ */ import_react.forwardRef(
  function ComboboxInternalDismissButton(_, forwardedRef) {
    const store = useComboboxRootContext()
    const { buttonRef, getButtonProps } = useButton({ native: false })
    const mergedRef = useMergedRefs(forwardedRef, buttonRef)
    function handleDismiss(event) {
      store.state.setOpen(
        false,
        createChangeEventDetails(
          closePress,
          event.nativeEvent,
          event.currentTarget
        )
      )
    }
    return /* @__PURE__ */ (0, import_jsx_runtime.jsx)('span', {
      ref: mergedRef,
      ...getButtonProps({ onClick: handleDismiss }),
      'aria-label': 'Dismiss',
      tabIndex: void 0,
      style: visuallyHiddenInput
    })
  }
)
//#endregion
//#region node_modules/@base-ui/react/combobox/input/ComboboxInput.mjs
/**
 * A text input to search for items in the list.
 * Renders an `<input>` element.
 *
 * Documentation: [Base UI Combobox](https://base-ui.com/react/components/combobox)
 */
var ComboboxInput = /* @__PURE__ */ import_react.forwardRef(
  function ComboboxInput(componentProps, forwardedRef) {
    const {
      render,
      className,
      disabled: disabledProp = false,
      id: idProp,
      style,
      ...elementProps
    } = componentProps
    const {
      state: fieldState,
      disabled: fieldDisabled,
      setTouched,
      setFocused,
      validationMode,
      validation
    } = useFieldRootContext()
    const { labelId: fieldLabelId } = useLabelableContext()
    const comboboxChipsContext = useComboboxChipsContext()
    const positioning = useComboboxPositionerContext(true)
    const hasPositionerParent = Boolean(positioning)
    const store = useComboboxRootContext()
    const { filteredItems } = useComboboxDerivedItemsContext()
    const inputValue = useComboboxInputValueContext()
    const direction = useDirection()
    const required = useStore(store, selectors.required)
    const comboboxDisabled = useStore(store, selectors.disabled)
    const readOnly = useStore(store, selectors.readOnly)
    const name = useStore(store, selectors.name)
    const form = useStore(store, selectors.form)
    const selectionMode = useStore(store, selectors.selectionMode)
    const autoHighlightMode = useStore(store, selectors.autoHighlight)
    const inputProps = useStore(store, selectors.inputProps)
    const triggerProps = useStore(store, selectors.triggerProps)
    const open = useStore(store, selectors.open)
    const mounted = useStore(store, selectors.mounted)
    const selectedValue = useStore(store, selectors.selectedValue)
    const popupSideValue = useStore(store, selectors.popupSide)
    const positionerElement = useStore(store, selectors.positionerElement)
    const rootId = useStore(store, selectors.id)
    const inline = useStore(store, selectors.inline)
    const modal = useStore(store, selectors.modal)
    const autoHighlightEnabled = Boolean(autoHighlightMode)
    const popupSide = mounted && positionerElement ? popupSideValue : null
    const disabled = fieldDisabled || comboboxDisabled || disabledProp
    const listEmpty = filteredItems.length === 0
    const isInsidePopup = hasPositionerParent || inline
    const focusManagerModal = !isInsidePopup || modal
    const id = useBaseUiId(idProp ?? (!isInsidePopup ? rootId : void 0))
    const ariaLabelledBy = resolveAriaLabelledBy(fieldLabelId, void 0)
    const fieldStateForInput = hasPositionerParent
      ? DEFAULT_FIELD_STATE_ATTRIBUTES
      : fieldState
    const [composingValue, setComposingValue] = import_react.useState(null)
    const isComposingRef = import_react.useRef(false)
    const lastActiveIndexRef = import_react.useRef(null)
    const shouldRestoreActiveIndexRef = import_react.useRef(false)
    const inputOwnsFormValue = selectionMode === 'none' && !hasPositionerParent
    const setInputElement = useStableCallback((element) => {
      const nextIsInsidePopup = hasPositionerParent || store.state.inline
      if (nextIsInsidePopup && !store.state.hasInputValue)
        store.state.setInputValue('', createChangeEventDetails(none))
      store.update({
        inputElement: element,
        inputInsidePopup: nextIsInsidePopup,
        inputOwnsFormValue
      })
    })
    const validationProps =
      hasPositionerParent || !validation
        ? elementProps
        : validation.getValidationProps(disabled, elementProps)
    const state = {
      ...fieldStateForInput,
      open,
      disabled,
      readOnly,
      popupSide,
      listEmpty
    }
    function handleKeyDown(event) {
      if (!comboboxChipsContext) return
      let nextIndex
      const { highlightedChipIndex } = comboboxChipsContext
      const renderedChipsCount = comboboxChipsContext.chipsRef.current.length
      const isRtl = direction === 'rtl'
      const previousChipKey = isRtl ? 'ArrowRight' : 'ArrowLeft'
      const nextChipKey = isRtl ? 'ArrowLeft' : 'ArrowRight'
      if (highlightedChipIndex !== void 0) {
        if (event.key === previousChipKey) {
          event.preventDefault()
          if (highlightedChipIndex > 0) nextIndex = highlightedChipIndex - 1
          else nextIndex = void 0
        } else if (event.key === nextChipKey) {
          event.preventDefault()
          if (highlightedChipIndex < renderedChipsCount - 1)
            nextIndex = highlightedChipIndex + 1
          else nextIndex = void 0
        } else if (event.key === 'Backspace' || event.key === 'Delete') {
          event.preventDefault()
          const computedNextIndex =
            highlightedChipIndex >= selectedValue.length - 1
              ? selectedValue.length - 2
              : highlightedChipIndex
          nextIndex = computedNextIndex >= 0 ? computedNextIndex : void 0
          store.state.setIndices({
            activeIndex: null,
            selectedIndex: null,
            type: 'keyboard'
          })
        }
        return nextIndex
      }
      if (
        event.key === previousChipKey &&
        (event.currentTarget.selectionStart ?? 0) === 0 &&
        selectedValue.length > 0
      ) {
        event.preventDefault()
        nextIndex = renderedChipsCount > 0 ? renderedChipsCount - 1 : void 0
      } else if (
        event.key === 'Backspace' &&
        event.currentTarget.value === '' &&
        selectedValue.length > 0
      ) {
        store.state.setIndices({
          activeIndex: null,
          selectedIndex: null,
          type: 'keyboard'
        })
        event.preventDefault()
      }
      return nextIndex
    }
    const element = useRenderElement('input', componentProps, {
      state,
      ref: [forwardedRef, store.state.inputRef, setInputElement],
      props: [
        inputProps,
        triggerProps,
        {
          type: 'text',
          value: componentProps.value ?? composingValue ?? inputValue,
          'aria-readonly': readOnly || void 0,
          'aria-required': required || void 0,
          'aria-labelledby': ariaLabelledBy,
          disabled,
          readOnly,
          required: selectionMode === 'none' ? required : void 0,
          form,
          ...(inputOwnsFormValue && name && { name }),
          id,
          onFocus() {
            setFocused(true)
            if (!inline || !shouldRestoreActiveIndexRef.current) return
            shouldRestoreActiveIndexRef.current = false
            const nextActiveIndex = lastActiveIndexRef.current
            if (
              nextActiveIndex == null ||
              !Object.hasOwn(store.state.valuesRef.current, nextActiveIndex)
            )
              return
            store.state.setIndices({ activeIndex: nextActiveIndex })
          },
          onBlur() {
            setTouched(true)
            setFocused(false)
            const activeIndex = store.state.activeIndex
            if (
              inline &&
              activeIndex !== null &&
              autoHighlightMode !== 'always'
            ) {
              lastActiveIndexRef.current = activeIndex
              shouldRestoreActiveIndexRef.current = true
              store.state.setIndices({ activeIndex: null })
            }
            if (validationMode === 'onBlur') {
              const valueToValidate =
                selectionMode === 'none' ? inputValue : selectedValue
              validation.commit(valueToValidate)
            }
          },
          onCompositionStart(event) {
            if (android) return
            isComposingRef.current = true
            setComposingValue(event.currentTarget.value)
          },
          onCompositionEnd(event) {
            isComposingRef.current = false
            const next = event.currentTarget.value
            setComposingValue(null)
            store.state.setInputValue(
              next,
              createChangeEventDetails(inputChange, event.nativeEvent)
            )
          },
          onChange(event) {
            const inputType = event.nativeEvent.inputType
            const autofillLikeInput =
              !inputType || inputType === 'insertReplacementText'
            const shouldOpenOnInput =
              isComposingRef.current || !autofillLikeInput
            if (isComposingRef.current) {
              const nextVal = event.currentTarget.value
              setComposingValue(nextVal)
              if (
                nextVal === '' &&
                !store.state.openOnInputClick &&
                !store.state.inputInsidePopup
              )
                store.state.setOpen(
                  false,
                  createChangeEventDetails(inputClear, event.nativeEvent)
                )
              const trimmed = nextVal.trim()
              const shouldMaintainHighlight =
                autoHighlightEnabled && trimmed !== ''
              if (!readOnly && !disabled && trimmed) {
                if (shouldOpenOnInput) {
                  store.state.setOpen(
                    true,
                    createChangeEventDetails(inputChange, event.nativeEvent)
                  )
                  if (!autoHighlightEnabled)
                    store.state.setIndices({
                      activeIndex: null,
                      selectedIndex: null,
                      type: store.state.keyboardActiveRef.current
                        ? 'keyboard'
                        : 'pointer'
                    })
                }
              }
              if (
                open &&
                store.state.activeIndex !== null &&
                !shouldMaintainHighlight
              )
                store.state.setIndices({
                  activeIndex: null,
                  selectedIndex: null,
                  type: store.state.keyboardActiveRef.current
                    ? 'keyboard'
                    : 'pointer'
                })
              return
            }
            const inputChangeDetails = createChangeEventDetails(
              inputChange,
              event.nativeEvent
            )
            store.state.setInputValue(
              event.currentTarget.value,
              inputChangeDetails
            )
            if (inputChangeDetails.isCanceled) return
            const empty = event.currentTarget.value === ''
            const clearDetails = createChangeEventDetails(
              inputClear,
              event.nativeEvent
            )
            if (empty && !store.state.inputInsidePopup) {
              if (selectionMode === 'single')
                store.state.setSelectedValue(null, clearDetails)
              if (!store.state.openOnInputClick)
                store.state.setOpen(false, clearDetails)
            }
            const trimmed = event.currentTarget.value.trim()
            if (!readOnly && !disabled && trimmed) {
              if (shouldOpenOnInput) {
                store.state.setOpen(
                  true,
                  createChangeEventDetails(inputChange, event.nativeEvent)
                )
                if (!autoHighlightEnabled)
                  store.state.setIndices({
                    activeIndex: null,
                    selectedIndex: null,
                    type: store.state.keyboardActiveRef.current
                      ? 'keyboard'
                      : 'pointer'
                  })
              }
            }
            if (
              open &&
              store.state.activeIndex !== null &&
              !autoHighlightEnabled
            )
              store.state.setIndices({
                activeIndex: null,
                selectedIndex: null,
                type: store.state.keyboardActiveRef.current
                  ? 'keyboard'
                  : 'pointer'
              })
          },
          onKeyDown(event) {
            if (disabled || readOnly) return
            if (
              event.ctrlKey ||
              event.shiftKey ||
              event.altKey ||
              event.metaKey
            )
              return
            store.state.keyboardActiveRef.current = true
            const input = event.currentTarget
            const scrollAmount = input.scrollWidth - input.clientWidth
            const isRTL = direction === 'rtl'
            if (event.key === 'Home') {
              stopEvent(event)
              const cursor = gecko && isRTL ? input.value.length : 0
              input.setSelectionRange(cursor, cursor)
              input.scrollLeft = 0
              return
            }
            if (event.key === 'End') {
              stopEvent(event)
              const cursor = gecko && isRTL ? 0 : input.value.length
              input.setSelectionRange(cursor, cursor)
              input.scrollLeft = isRTL ? -scrollAmount : scrollAmount
              return
            }
            if (!mounted && event.key === 'Escape') {
              const isClear =
                selectionMode === 'multiple' && Array.isArray(selectedValue)
                  ? selectedValue.length === 0
                  : selectedValue === null
              const details = createChangeEventDetails(
                escapeKey,
                event.nativeEvent
              )
              const value = selectionMode === 'multiple' ? [] : null
              store.state.setInputValue('', details)
              store.state.setSelectedValue(value, details)
              if (
                !isClear &&
                !store.state.inline &&
                !details.isPropagationAllowed
              )
                event.stopPropagation()
              return
            }
            if (
              comboboxChipsContext &&
              event.key === 'Backspace' &&
              input.value === '' &&
              comboboxChipsContext.highlightedChipIndex === void 0 &&
              Array.isArray(selectedValue) &&
              selectedValue.length > 0
            ) {
              const renderedChipsCount =
                comboboxChipsContext.chipsRef.current.length
              const removalIndex =
                renderedChipsCount > 0
                  ? renderedChipsCount - 1
                  : selectedValue.length - 1
              const newValue = selectedValue.filter(
                (_, index) => index !== removalIndex
              )
              store.state.setIndices({
                activeIndex: null,
                selectedIndex: null,
                type: store.state.keyboardActiveRef.current
                  ? 'keyboard'
                  : 'pointer'
              })
              store.state.setSelectedValue(
                newValue,
                createChangeEventDetails(none, event.nativeEvent)
              )
              return
            }
            const hadHighlightedChip =
              comboboxChipsContext?.highlightedChipIndex !== void 0
            const nextIndex = handleKeyDown(event)
            comboboxChipsContext?.setHighlightedChipIndex(nextIndex)
            if (nextIndex !== void 0)
              comboboxChipsContext?.chipsRef.current[nextIndex]?.focus()
            else if (hadHighlightedChip) store.state.inputRef.current?.focus()
            if (event.which === 229) return
            if (event.key === 'Enter' && open) {
              const activeIndex = store.state.activeIndex
              const nativeEvent = event.nativeEvent
              if (activeIndex === null) {
                if (inline) return
                store.state.setOpen(
                  false,
                  createChangeEventDetails(none, nativeEvent)
                )
                return
              }
              stopEvent(event)
              const listItem = store.state.listRef.current[activeIndex]
              if (listItem) {
                store.state.selectionEventRef.current = nativeEvent
                listItem.click()
                store.state.selectionEventRef.current = null
              }
            }
          },
          onPointerMove() {
            store.state.keyboardActiveRef.current = false
          },
          onPointerDown() {
            store.state.keyboardActiveRef.current = false
          }
        },
        validationProps
      ],
      stateAttributesMapping: triggerStateAttributesMapping
    })
    const renderedInput = hasPositionerParent
      ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FieldRootContext.Provider, {
          value: DEFAULT_FIELD_ROOT_CONTEXT,
          children: element
        })
      : element
    return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_react.Fragment, {
      children: [
        open &&
          focusManagerModal &&
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
            ComboboxInternalDismissButton,
            { ref: store.state.startDismissRef }
          ),
        renderedInput
      ]
    })
  }
)
//#endregion
//#region node_modules/@base-ui/react/combobox/utils/handleInputPress.mjs
function handleInputPress(
  event,
  store,
  disabled,
  readOnly,
  shouldIgnoreTarget
) {
  if (event.baseUIHandlerPrevented || readOnly) return
  const target = getTarget(event.nativeEvent)
  const targetElement = isElement(target) ? target : null
  if (
    targetElement !== event.currentTarget &&
    (shouldIgnoreTarget?.(targetElement) || isInteractiveElement(targetElement))
  )
    return
  event.preventDefault()
  if (disabled) return
  store.state.inputRef.current?.focus()
  if (store.state.openOnInputClick)
    store.state.setOpen(
      true,
      createChangeEventDetails(inputPress, event.nativeEvent)
    )
}
//#endregion
//#region node_modules/@base-ui/react/combobox/clear/ComboboxClear.mjs
var stateAttributesMapping$1 = {
  ...transitionStatusMapping,
  ...triggerOpenStateMapping
}
/**
 * Clears the value when clicked.
 * Renders a `<button>` element.
 *
 * Documentation: [Base UI Combobox](https://base-ui.com/react/components/combobox)
 */
var ComboboxClear = /* @__PURE__ */ import_react.forwardRef(
  function ComboboxClear(componentProps, forwardedRef) {
    const {
      render,
      className,
      disabled: disabledProp = false,
      nativeButton = true,
      keepMounted = false,
      style,
      ...elementProps
    } = componentProps
    const { disabled: fieldDisabled } = useFieldRootContext()
    const store = useComboboxRootContext()
    const selectionMode = useStore(store, selectors.selectionMode)
    const comboboxDisabled = useStore(store, selectors.disabled)
    const readOnly = useStore(store, selectors.readOnly)
    const open = useStore(store, selectors.open)
    const selectedValue = useStore(store, selectors.selectedValue)
    const hasSelectionChips = useStore(store, selectors.hasSelectionChips)
    const inputValue = useComboboxInputValueContext()
    let visible = false
    if (selectionMode === 'none') visible = inputValue !== ''
    else if (selectionMode === 'single') visible = selectedValue != null
    else visible = hasSelectionChips
    const disabled = fieldDisabled || comboboxDisabled || disabledProp
    const { buttonRef, getButtonProps } = useButton({
      native: nativeButton,
      disabled
    })
    const { mounted, transitionStatus, setMounted } =
      useTransitionStatus(visible)
    const state = {
      disabled,
      visible,
      open,
      transitionStatus
    }
    useOpenChangeComplete({
      open: visible,
      ref: store.state.clearRef,
      onComplete() {
        if (!visible) setMounted(false)
      }
    })
    const element = useRenderElement('button', componentProps, {
      state,
      ref: [forwardedRef, buttonRef, store.state.clearRef],
      props: [
        {
          tabIndex: -1,
          children: 'x',
          onMouseDown(event) {
            event.preventDefault()
          },
          onClick(event) {
            if (disabled || readOnly) return
            const keyboardActiveRef = store.state.keyboardActiveRef
            store.state.setInputValue(
              '',
              createChangeEventDetails(clearPress, event.nativeEvent)
            )
            if (selectionMode !== 'none') {
              store.state.setSelectedValue(
                Array.isArray(selectedValue) ? [] : null,
                createChangeEventDetails(clearPress, event.nativeEvent)
              )
              store.state.setIndices({
                activeIndex: null,
                selectedIndex: null,
                type: keyboardActiveRef.current ? 'keyboard' : 'pointer'
              })
            } else
              store.state.setIndices({
                activeIndex: null,
                type: keyboardActiveRef.current ? 'keyboard' : 'pointer'
              })
            store.state.inputRef.current?.focus()
          }
        },
        elementProps,
        getButtonProps
      ],
      stateAttributesMapping: stateAttributesMapping$1
    })
    if (!(keepMounted || mounted)) return null
    return element
  }
)
//#endregion
//#region node_modules/@base-ui/react/combobox/collection/GroupCollectionContext.mjs
var GroupCollectionContext = /* @__PURE__ */ import_react.createContext(null)
function useGroupCollectionContext() {
  return import_react.useContext(GroupCollectionContext)
}
//#endregion
//#region node_modules/@base-ui/react/combobox/collection/ComboboxCollection.mjs
/**
 * Renders filtered list items.
 * Doesn't render its own HTML element.
 *
 * If rendering a flat list, pass a function child to the `List` component instead, which implicitly wraps it.
 *
 * Documentation: [Base UI Combobox](https://base-ui.com/react/components/combobox)
 */
function ComboboxCollection(props) {
  const { children } = props
  const { filteredItems } = useComboboxDerivedItemsContext()
  const groupContext = useGroupCollectionContext()
  const itemsToRender = groupContext ? groupContext.items : filteredItems
  if (!itemsToRender) return null
  return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_react.Fragment, {
    children: itemsToRender.map(children)
  })
}
//#endregion
//#region node_modules/@base-ui/react/combobox/list/ComboboxList.mjs
/**
 * A list container for the items.
 * Renders a `<div>` element.
 *
 * Documentation: [Base UI Combobox](https://base-ui.com/react/components/combobox)
 */
var ComboboxList = /* @__PURE__ */ import_react.forwardRef(
  function ComboboxList(componentProps, forwardedRef) {
    var _ComboboxCollection
    const { render, className, style, children, ...elementProps } =
      componentProps
    const store = useComboboxRootContext()
    const floatingRootContext = useComboboxFloatingContext()
    const hasPositionerContext = Boolean(useComboboxPositionerContext(true))
    const { filteredItems, hasItems } = useComboboxDerivedItemsContext()
    const selectionMode = useStore(store, selectors.selectionMode)
    const grid = useStore(store, selectors.grid)
    const popupProps = useStore(store, selectors.popupProps)
    const virtualized = useStore(store, selectors.virtualized)
    const forceMounted = useStore(store, selectors.forceMounted)
    const multiple = selectionMode === 'multiple'
    const empty = filteredItems.length === 0
    const setPositionerElement = useStableCallback((element) => {
      store.set('positionerElement', element)
    })
    const setListElement = useStableCallback((element) => {
      store.set('listElement', element)
    })
    const resolvedChildren = import_react.useMemo(() => {
      if (typeof children === 'function')
        return (
          _ComboboxCollection ||
          (_ComboboxCollection = /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
            ComboboxCollection,
            { children }
          ))
        )
      return children
    }, [children])
    const state = { empty }
    const floatingId = floatingRootContext.useState('floatingId')
    const element = useRenderElement('div', componentProps, {
      state,
      ref: [
        forwardedRef,
        setListElement,
        hasPositionerContext ? null : setPositionerElement
      ],
      props: [
        popupProps,
        {
          children: resolvedChildren,
          tabIndex: -1,
          id: floatingId,
          role: grid ? 'grid' : 'listbox',
          'aria-multiselectable': multiple ? 'true' : void 0,
          onKeyDown(event) {
            if (store.state.disabled || store.state.readOnly) return
            if (event.key === 'Enter') {
              const activeIndex = store.state.activeIndex
              if (activeIndex == null) return
              stopEvent(event)
              const nativeEvent = event.nativeEvent
              const listItem = store.state.listRef.current[activeIndex]
              if (listItem) {
                store.state.selectionEventRef.current = nativeEvent
                listItem.click()
                store.state.selectionEventRef.current = null
              }
            }
          },
          onKeyDownCapture() {
            store.state.keyboardActiveRef.current = true
          },
          onPointerMoveCapture() {
            store.state.keyboardActiveRef.current = false
          }
        },
        elementProps
      ]
    })
    if (virtualized) return element
    const labelsRef = hasItems && !forceMounted ? void 0 : store.state.labelsRef
    return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CompositeList, {
      elementsRef: store.state.listRef,
      labelsRef,
      children: element
    })
  }
)
//#endregion
//#region node_modules/@base-ui/react/combobox/utils/useInitialLiveRegionTextMutation.mjs
var LIVE_REGION_MARKER = '⁠'
function findLastTextNode(root) {
  const walker = root.ownerDocument.createTreeWalker(root, NodeFilter.SHOW_TEXT)
  let lastTextNode = null
  while (walker.nextNode()) {
    const textNode = walker.currentNode
    if (textNode.nodeValue !== '') lastTextNode = textNode
  }
  return lastTextNode
}
function useInitialLiveRegionTextMutation() {
  const timeout = useTimeout()
  const rootRef = import_react.useRef(null)
  import_react.useEffect(() => {
    if (ios) return
    const root = rootRef.current
    if (root == null) return
    const textNode = findLastTextNode(root)
    if (textNode == null) return
    const originalValue = textNode.nodeValue ?? ''
    const markedValue = `${originalValue}${LIVE_REGION_MARKER}`
    textNode.nodeValue = markedValue
    timeout.start(200, () => {
      if (textNode.nodeValue === markedValue) textNode.nodeValue = originalValue
    })
    return () => {
      timeout.clear()
      if (textNode.nodeValue === markedValue) textNode.nodeValue = originalValue
    }
  }, [rootRef, timeout])
  return rootRef
}
//#endregion
//#region node_modules/@base-ui/react/combobox/portal/ComboboxPortalContext.mjs
var ComboboxPortalContext = /* @__PURE__ */ import_react.createContext(void 0)
function useComboboxPortalContext() {
  const context = import_react.useContext(ComboboxPortalContext)
  if (context === void 0) throw new Error(formatErrorMessage(20))
  return context
}
//#endregion
//#region node_modules/@base-ui/react/combobox/portal/ComboboxPortal.mjs
/**
 * A portal element that moves the popup to a different part of the DOM.
 * By default, the portal element is appended to `<body>`.
 * Renders a `<div>` element.
 *
 * Documentation: [Base UI Combobox](https://base-ui.com/react/components/combobox)
 */
var ComboboxPortal = /* @__PURE__ */ import_react.forwardRef(
  function ComboboxPortal(props, forwardedRef) {
    const { keepMounted = false, ...portalProps } = props
    const store = useComboboxRootContext()
    const mounted = useStore(store, selectors.mounted)
    const forceMounted = useStore(store, selectors.forceMounted)
    if (!(mounted || keepMounted || forceMounted)) return null
    return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
      ComboboxPortalContext.Provider,
      {
        value: keepMounted,
        children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FloatingPortal, {
          ref: forwardedRef,
          ...portalProps
        })
      }
    )
  }
)
//#endregion
//#region node_modules/@base-ui/react/floating-ui-react/middleware/arrow.mjs
/**
 * Fork of the original `arrow` middleware from Floating UI that allows
 * configuring the offset parent.
 */
var baseArrow = (options) => ({
  name: 'arrow',
  options,
  async fn(state) {
    const { x, y, placement, rects, platform, elements, middlewareData } = state
    const {
      element,
      padding = 0,
      offsetParent = 'real'
    } = evaluate(options, state) || {}
    if (element == null) return {}
    const paddingObject = getPaddingObject(padding)
    const coords = {
      x,
      y
    }
    const axis = getAlignmentAxis(placement)
    const length = getAxisLength(axis)
    const arrowDimensions = await platform.getDimensions(element)
    const isYAxis = axis === 'y'
    const minProp = isYAxis ? 'top' : 'left'
    const maxProp = isYAxis ? 'bottom' : 'right'
    const clientProp = isYAxis ? 'clientHeight' : 'clientWidth'
    const endDiff =
      rects.reference[length] +
      rects.reference[axis] -
      coords[axis] -
      rects.floating[length]
    const startDiff = coords[axis] - rects.reference[axis]
    const arrowOffsetParent =
      offsetParent === 'real'
        ? await platform.getOffsetParent?.(element)
        : elements.floating
    let clientSize = elements.floating[clientProp] || rects.floating[length]
    if (!clientSize || !(await platform.isElement?.(arrowOffsetParent)))
      clientSize = elements.floating[clientProp] || rects.floating[length]
    const centerToReference = endDiff / 2 - startDiff / 2
    const largestPossiblePadding =
      clientSize / 2 - arrowDimensions[length] / 2 - 1
    const minPadding = Math.min(paddingObject[minProp], largestPossiblePadding)
    const maxPadding = Math.min(paddingObject[maxProp], largestPossiblePadding)
    const min = minPadding
    const max = clientSize - arrowDimensions[length] - maxPadding
    const center =
      clientSize / 2 - arrowDimensions[length] / 2 + centerToReference
    const offset = clamp(min, center, max)
    const shouldAddOffset =
      !middlewareData.arrow &&
      getAlignment(placement) != null &&
      center !== offset &&
      rects.reference[length] / 2 -
        (center < min ? minPadding : maxPadding) -
        arrowDimensions[length] / 2 <
        0
    const alignmentOffset = shouldAddOffset
      ? center < min
        ? center - min
        : center - max
      : 0
    return {
      [axis]: coords[axis] + alignmentOffset,
      data: {
        [axis]: offset,
        centerOffset: center - offset - alignmentOffset,
        ...(shouldAddOffset && { alignmentOffset })
      },
      reset: shouldAddOffset
    }
  }
})
/**
 * Provides data to position an inner element of the floating element so that it
 * appears centered to the reference element.
 * This wraps the core `arrow` middleware to allow React refs as the element.
 * @see https://floating-ui.com/docs/arrow
 */
var arrow = (options, deps) => ({
  ...baseArrow(options),
  options: [options, deps]
})
//#endregion
//#region node_modules/@base-ui/react/utils/hideMiddleware.mjs
var nativeHideFn = hide$1().fn
var hide = {
  name: 'hide',
  async fn(state) {
    const { width, height, x, y } = state.rects.reference
    const anchorHidden = width === 0 && height === 0 && x === 0 && y === 0
    return {
      data: {
        referenceHidden:
          (await nativeHideFn(state)).data?.referenceHidden || anchorHidden
      }
    }
  }
}
//#endregion
//#region node_modules/@base-ui/react/utils/adaptiveOriginMiddleware.mjs
var DEFAULT_SIDES = {
  sideX: 'left',
  sideY: 'top'
}
//#endregion
//#region node_modules/@base-ui/react/utils/useAnchorPositioning.mjs
function getLogicalSide(sideParam, renderedSide, isRtl) {
  const isLogicalSideParam =
    sideParam === 'inline-start' || sideParam === 'inline-end'
  return {
    top: 'top',
    right: isLogicalSideParam
      ? isRtl
        ? 'inline-start'
        : 'inline-end'
      : 'right',
    bottom: 'bottom',
    left: isLogicalSideParam ? (isRtl ? 'inline-end' : 'inline-start') : 'left'
  }[renderedSide]
}
function getOffsetData(state, sideParam, isRtl) {
  const { rects, placement } = state
  return {
    side: getLogicalSide(sideParam, getSide(placement), isRtl),
    align: getAlignment(placement) || 'center',
    anchor: {
      width: rects.reference.width,
      height: rects.reference.height
    },
    positioner: {
      width: rects.floating.width,
      height: rects.floating.height
    }
  }
}
/**
 * Provides standardized anchor positioning behavior for floating elements. Wraps Floating UI's
 * `useFloating` hook.
 */
function useAnchorPositioning(params) {
  const {
    anchor,
    positionMethod = 'absolute',
    side: sideParam = 'bottom',
    sideOffset = 0,
    align = 'center',
    alignOffset = 0,
    collisionBoundary,
    collisionPadding: collisionPaddingParam = 5,
    sticky = false,
    arrowPadding = 5,
    disableAnchorTracking = false,
    inline: inlineMiddleware,
    keepMounted = false,
    floatingRootContext,
    mounted,
    collisionAvoidance,
    shiftCrossAxis = false,
    nodeId,
    adaptiveOrigin,
    lazyFlip = false,
    externalTree
  } = params
  const [mountSide, setMountSide] = import_react.useState(null)
  if (!mounted && mountSide !== null) setMountSide(null)
  const collisionAvoidanceSide = collisionAvoidance.side || 'flip'
  const collisionAvoidanceAlign = collisionAvoidance.align || 'flip'
  const collisionAvoidanceFallbackAxisSide =
    collisionAvoidance.fallbackAxisSide || 'end'
  const anchorFn = typeof anchor === 'function' ? anchor : void 0
  const anchorFnCallback = useStableCallback(anchorFn)
  const anchorDep = anchorFn ? anchorFnCallback : anchor
  const anchorValueRef = useValueAsRef(anchor)
  const mountedRef = useValueAsRef(mounted)
  const isRtl = useDirection() === 'rtl'
  const side =
    mountSide ||
    {
      top: 'top',
      right: 'right',
      bottom: 'bottom',
      left: 'left',
      'inline-end': isRtl ? 'left' : 'right',
      'inline-start': isRtl ? 'right' : 'left'
    }[sideParam]
  const placement = align === 'center' ? side : `${side}-${align}`
  let collisionPadding = collisionPaddingParam
  const bias = 1
  const biasTop = sideParam === 'bottom' ? bias : 0
  const biasBottom = sideParam === 'top' ? bias : 0
  const biasLeft = sideParam === 'right' ? bias : 0
  const biasRight = sideParam === 'left' ? bias : 0
  if (typeof collisionPadding === 'number')
    collisionPadding = {
      top: collisionPadding + biasTop,
      right: collisionPadding + biasRight,
      bottom: collisionPadding + biasBottom,
      left: collisionPadding + biasLeft
    }
  else if (collisionPadding)
    collisionPadding = {
      top: (collisionPadding.top || 0) + biasTop,
      right: (collisionPadding.right || 0) + biasRight,
      bottom: (collisionPadding.bottom || 0) + biasBottom,
      left: (collisionPadding.left || 0) + biasLeft
    }
  const commonCollisionProps = {
    boundary:
      collisionBoundary === 'clipping-ancestors'
        ? 'clippingAncestors'
        : collisionBoundary,
    padding: collisionPadding
  }
  const arrowRef = import_react.useRef(null)
  const sideOffsetRef = useValueAsRef(sideOffset)
  const alignOffsetRef = useValueAsRef(alignOffset)
  const sideOffsetDep = typeof sideOffset !== 'function' ? sideOffset : 0
  const alignOffsetDep = typeof alignOffset !== 'function' ? alignOffset : 0
  const middleware = []
  if (inlineMiddleware) middleware.push(inlineMiddleware)
  middleware.push(
    offset(
      (state) => {
        const data = getOffsetData(state, sideParam, isRtl)
        const sideAxis =
          typeof sideOffsetRef.current === 'function'
            ? sideOffsetRef.current(data)
            : sideOffsetRef.current
        const alignAxis =
          typeof alignOffsetRef.current === 'function'
            ? alignOffsetRef.current(data)
            : alignOffsetRef.current
        return {
          mainAxis: sideAxis,
          crossAxis: alignAxis,
          alignmentAxis: alignAxis
        }
      },
      [sideOffsetDep, alignOffsetDep, isRtl, sideParam]
    )
  )
  const shiftDisabled =
    collisionAvoidanceAlign === 'none' && collisionAvoidanceSide !== 'shift'
  const crossAxisShiftEnabled =
    !shiftDisabled &&
    (sticky || shiftCrossAxis || collisionAvoidanceSide === 'shift')
  const flipMiddleware =
    collisionAvoidanceSide === 'none'
      ? null
      : flip({
          ...commonCollisionProps,
          padding: {
            top: collisionPadding.top + bias,
            right: collisionPadding.right + bias,
            bottom: collisionPadding.bottom + bias,
            left: collisionPadding.left + bias
          },
          mainAxis: !shiftCrossAxis && collisionAvoidanceSide === 'flip',
          crossAxis: collisionAvoidanceAlign === 'flip' ? 'alignment' : false,
          fallbackAxisSideDirection: collisionAvoidanceFallbackAxisSide
        })
  const shiftMiddleware = shiftDisabled
    ? null
    : shift(
        (data) => {
          const html = ownerDocument(data.elements.floating).documentElement
          return {
            ...commonCollisionProps,
            rootBoundary: shiftCrossAxis
              ? {
                  x: 0,
                  y: 0,
                  width: html.clientWidth,
                  height: html.clientHeight
                }
              : void 0,
            mainAxis: collisionAvoidanceAlign !== 'none',
            crossAxis: crossAxisShiftEnabled,
            limiter:
              sticky || shiftCrossAxis
                ? void 0
                : limitShift((limitData) => {
                    if (!arrowRef.current) return {}
                    const { width, height } =
                      arrowRef.current.getBoundingClientRect()
                    const sideAxis = getSideAxis(getSide(limitData.placement))
                    const arrowSize = sideAxis === 'y' ? width : height
                    const offsetAmount =
                      sideAxis === 'y'
                        ? collisionPadding.left + collisionPadding.right
                        : collisionPadding.top + collisionPadding.bottom
                    return { offset: arrowSize / 2 + offsetAmount / 2 }
                  })
          }
        },
        [
          commonCollisionProps,
          sticky,
          shiftCrossAxis,
          collisionPadding,
          collisionAvoidanceAlign
        ]
      )
  if (
    collisionAvoidanceSide === 'shift' ||
    collisionAvoidanceAlign === 'shift' ||
    align === 'center'
  )
    middleware.push(shiftMiddleware, flipMiddleware)
  else middleware.push(flipMiddleware, shiftMiddleware)
  middleware.push(
    size({
      ...commonCollisionProps,
      apply({
        elements: { floating },
        availableWidth,
        availableHeight,
        rects
      }) {
        if (!mountedRef.current) return
        const floatingStyle = floating.style
        floatingStyle.setProperty('--available-width', `${availableWidth}px`)
        floatingStyle.setProperty('--available-height', `${availableHeight}px`)
        const dpr = getWindow(floating).devicePixelRatio || 1
        const { x, y, width, height } = rects.reference
        const anchorWidth =
          (Math.round((x + width) * dpr) - Math.round(x * dpr)) / dpr
        const anchorHeight =
          (Math.round((y + height) * dpr) - Math.round(y * dpr)) / dpr
        floatingStyle.setProperty('--anchor-width', `${anchorWidth}px`)
        floatingStyle.setProperty('--anchor-height', `${anchorHeight}px`)
      }
    }),
    arrow(
      (state) => ({
        element:
          arrowRef.current ||
          ownerDocument(state.elements.floating).createElement('div'),
        padding: arrowPadding,
        offsetParent: 'floating'
      }),
      [arrowPadding]
    ),
    {
      name: 'transformOrigin',
      fn(state) {
        const {
          elements,
          middlewareData,
          placement: renderedPlacement,
          rects,
          y
        } = state
        const currentRenderedSide = getSide(renderedPlacement)
        const currentRenderedAxis = getSideAxis(currentRenderedSide)
        const arrowEl = arrowRef.current
        const arrowX = middlewareData.arrow?.x || 0
        const arrowY = middlewareData.arrow?.y || 0
        const arrowWidth = arrowEl?.clientWidth || 0
        const arrowHeight = arrowEl?.clientHeight || 0
        const transformX = arrowX + arrowWidth / 2
        const transformY = arrowY + arrowHeight / 2
        const shiftY = Math.abs(middlewareData.shift?.y || 0)
        const halfAnchorHeight = rects.reference.height / 2
        const sideOffsetValue =
          typeof sideOffset === 'function'
            ? sideOffset(getOffsetData(state, sideParam, isRtl))
            : sideOffset
        const isOverlappingAnchor = shiftY > sideOffsetValue
        const adjacentTransformOrigin = {
          top: `${transformX}px calc(100% + ${sideOffsetValue}px)`,
          bottom: `${transformX}px ${-sideOffsetValue}px`,
          left: `calc(100% + ${sideOffsetValue}px) ${transformY}px`,
          right: `${-sideOffsetValue}px ${transformY}px`
        }[currentRenderedSide]
        const overlapTransformOrigin = `${transformX}px ${rects.reference.y + halfAnchorHeight - y}px`
        elements.floating.style.setProperty(
          '--transform-origin',
          crossAxisShiftEnabled &&
            currentRenderedAxis === 'y' &&
            isOverlappingAnchor
            ? overlapTransformOrigin
            : adjacentTransformOrigin
        )
        return {}
      }
    },
    hide,
    adaptiveOrigin
  )
  useIsoLayoutEffect(() => {
    if (!mounted && floatingRootContext)
      floatingRootContext.update({
        referenceElement: null,
        floatingElement: null,
        domReferenceElement: null,
        positionReference: null
      })
  }, [mounted, floatingRootContext])
  const autoUpdateOptions = import_react.useMemo(
    () => ({
      elementResize:
        !disableAnchorTracking && typeof ResizeObserver !== 'undefined',
      layoutShift:
        !disableAnchorTracking && typeof IntersectionObserver !== 'undefined'
    }),
    [disableAnchorTracking]
  )
  const {
    refs,
    elements,
    x,
    y,
    middlewareData,
    update,
    placement: renderedPlacement,
    context,
    isPositioned,
    floatingStyles: originalFloatingStyles
  } = useFloating({
    rootContext: floatingRootContext,
    open: keepMounted ? mounted : void 0,
    placement,
    middleware,
    strategy: positionMethod,
    whileElementsMounted: keepMounted
      ? void 0
      : (...args) => autoUpdate(...args, autoUpdateOptions),
    nodeId,
    externalTree
  })
  const { sideX, sideY } = middlewareData.adaptiveOrigin || DEFAULT_SIDES
  const resolvedPosition = isPositioned ? positionMethod : 'fixed'
  const floatingStyles = import_react.useMemo(() => {
    const base = adaptiveOrigin
      ? {
          position: resolvedPosition,
          [sideX]: x,
          [sideY]: y
        }
      : {
          position: resolvedPosition,
          ...originalFloatingStyles
        }
    if (!isPositioned) base.opacity = 0
    return base
  }, [
    adaptiveOrigin,
    resolvedPosition,
    sideX,
    x,
    sideY,
    y,
    originalFloatingStyles,
    isPositioned
  ])
  const registeredPositionReferenceRef = import_react.useRef(null)
  useIsoLayoutEffect(() => {
    if (!mounted) return
    const anchorValue = anchorValueRef.current
    const resolvedAnchor =
      typeof anchorValue === 'function' ? anchorValue() : anchorValue
    const finalAnchor =
      (isRef(resolvedAnchor) ? resolvedAnchor.current : resolvedAnchor) || null
    if (finalAnchor !== registeredPositionReferenceRef.current) {
      refs.setPositionReference(finalAnchor)
      registeredPositionReferenceRef.current = finalAnchor
    }
  }, [mounted, refs, anchorDep, anchorValueRef])
  import_react.useEffect(() => {
    if (!mounted) return
    const anchorValue = anchorValueRef.current
    if (typeof anchorValue === 'function') return
    if (
      isRef(anchorValue) &&
      anchorValue.current !== registeredPositionReferenceRef.current
    ) {
      refs.setPositionReference(anchorValue.current)
      registeredPositionReferenceRef.current = anchorValue.current
    }
  }, [mounted, refs, anchorDep, anchorValueRef])
  import_react.useEffect(() => {
    if (keepMounted && mounted && elements.reference && elements.floating)
      return autoUpdate(
        elements.reference,
        elements.floating,
        update,
        autoUpdateOptions
      )
  }, [keepMounted, mounted, elements, update, autoUpdateOptions])
  const renderedSide = getSide(renderedPlacement)
  const logicalRenderedSide = getLogicalSide(sideParam, renderedSide, isRtl)
  const renderedAlign = getAlignment(renderedPlacement) || 'center'
  const anchorHidden = Boolean(middlewareData.hide?.referenceHidden)
  useIsoLayoutEffect(() => {
    if (lazyFlip && mounted && isPositioned) setMountSide(renderedSide)
  }, [lazyFlip, mounted, isPositioned, renderedSide])
  const arrowStyles = import_react.useMemo(
    () => ({
      position: 'absolute',
      top: middlewareData.arrow?.y,
      left: middlewareData.arrow?.x
    }),
    [middlewareData.arrow]
  )
  const arrowUncentered = middlewareData.arrow?.centerOffset !== 0
  return import_react.useMemo(
    () => ({
      positionerStyles: floatingStyles,
      arrowStyles,
      arrowRef,
      arrowUncentered,
      side: logicalRenderedSide,
      align: renderedAlign,
      physicalSide: renderedSide,
      anchorHidden,
      refs,
      context,
      isPositioned,
      update
    }),
    [
      floatingStyles,
      arrowStyles,
      arrowRef,
      arrowUncentered,
      logicalRenderedSide,
      renderedAlign,
      renderedSide,
      anchorHidden,
      refs,
      context,
      isPositioned,
      update
    ]
  )
}
function isRef(param) {
  return param != null && 'current' in param
}
//#endregion
//#region node_modules/@base-ui/react/utils/getDisabledMountTransitionStyles.mjs
function getDisabledMountTransitionStyles(transitionStatus) {
  return transitionStatus === 'starting'
    ? DISABLED_TRANSITIONS_STYLE
    : EMPTY_OBJECT
}
//#endregion
//#region node_modules/@base-ui/react/utils/usePositioner.mjs
/**
 * Renders the shared outer Positioner element used by popup components.
 * Applies the common role, hidden state, transition styles, state attributes, and optional inert styling.
 */
function usePositioner(
  componentProps,
  state,
  { styles, transitionStatus, props, refs, hidden, inert = false }
) {
  const style = { ...styles }
  if (inert) style.pointerEvents = 'none'
  return useRenderElement('div', componentProps, {
    state,
    ref: refs,
    props: [
      {
        role: 'presentation',
        hidden,
        style
      },
      getDisabledMountTransitionStyles(transitionStatus),
      props
    ],
    stateAttributesMapping: popupStateMapping
  })
}
//#endregion
//#region node_modules/@base-ui/react/utils/useAnchoredPopupScrollLock.mjs
var VIEWPORT_WIDTH_TOLERANCE_PX = 20
/**
 * Manages scroll lock for anchored popups. For non-touch opens, scroll lock is applied when
 * enabled. For touch opens, scroll lock is applied only when the positioner width is effectively
 * viewport-sized.
 */
function useAnchoredPopupScrollLock(
  enabled,
  touchOpen,
  positionerElement,
  referenceElement
) {
  const [touchOpenShouldLockScroll, setTouchOpenShouldLockScroll] =
    import_react.useState(false)
  useIsoLayoutEffect(() => {
    if (!enabled || !touchOpen || positionerElement == null) {
      setTouchOpenShouldLockScroll(false)
      return
    }
    const viewportWidth =
      ownerDocument(positionerElement).documentElement.clientWidth
    const popupWidth = positionerElement.offsetWidth
    setTouchOpenShouldLockScroll(
      viewportWidth > 0 &&
        popupWidth > 0 &&
        popupWidth >= viewportWidth - VIEWPORT_WIDTH_TOLERANCE_PX
    )
  }, [enabled, touchOpen, positionerElement])
  useScrollLock(
    enabled && (!touchOpen || touchOpenShouldLockScroll),
    referenceElement
  )
}
//#endregion
//#region node_modules/@base-ui/react/combobox/positioner/ComboboxPositioner.mjs
/**
 * Positions the popup against the trigger.
 * Renders a `<div>` element.
 *
 * Documentation: [Base UI Combobox](https://base-ui.com/react/components/combobox)
 */
var ComboboxPositioner = /* @__PURE__ */ import_react.forwardRef(
  function ComboboxPositioner(componentProps, forwardedRef) {
    const {
      render,
      className,
      anchor,
      positionMethod = 'absolute',
      side = 'bottom',
      align = 'center',
      sideOffset = 0,
      alignOffset = 0,
      collisionBoundary = 'clipping-ancestors',
      collisionPadding = 5,
      arrowPadding = 5,
      sticky = false,
      disableAnchorTracking = false,
      collisionAvoidance = DROPDOWN_COLLISION_AVOIDANCE,
      style: styleProp,
      ...elementProps
    } = componentProps
    const store = useComboboxRootContext()
    const { filteredItems } = useComboboxDerivedItemsContext()
    const floatingRootContext = useComboboxFloatingContext()
    const keepMounted = useComboboxPortalContext()
    const modal = useStore(store, selectors.modal)
    const open = useStore(store, selectors.open)
    const mounted = useStore(store, selectors.mounted)
    const openMethod = useStore(store, selectors.openMethod)
    const positionerElement = useStore(store, selectors.positionerElement)
    const triggerElement = useStore(store, selectors.triggerElement)
    const inputElement = useStore(store, selectors.inputElement)
    const inputGroupElement = useStore(store, selectors.inputGroupElement)
    const inputInsidePopup = useStore(store, selectors.inputInsidePopup)
    const transitionStatus = useStore(store, selectors.transitionStatus)
    const empty = filteredItems.length === 0
    const positioning = useAnchorPositioning({
      anchor:
        anchor ??
        (inputInsidePopup
          ? triggerElement
          : (inputGroupElement ?? inputElement)),
      floatingRootContext,
      positionMethod,
      mounted,
      side,
      sideOffset,
      align,
      alignOffset,
      arrowPadding,
      collisionBoundary,
      collisionPadding,
      sticky,
      disableAnchorTracking,
      keepMounted,
      collisionAvoidance,
      lazyFlip: true
    })
    useAnchoredPopupScrollLock(
      open && modal,
      openMethod === 'touch',
      positionerElement,
      triggerElement
    )
    const state = {
      open,
      side: positioning.side,
      align: positioning.align,
      anchorHidden: positioning.anchorHidden,
      empty
    }
    useIsoLayoutEffect(() => {
      store.set('popupSide', positioning.side)
    }, [store, positioning.side])
    const setPositionerElement = useStableCallback((element) => {
      store.set('positionerElement', element)
    })
    const element = usePositioner(componentProps, state, {
      styles: positioning.positionerStyles,
      transitionStatus,
      props: elementProps,
      refs: [forwardedRef, setPositionerElement],
      hidden: !mounted,
      inert: !open
    })
    return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(
      ComboboxPositionerContext.Provider,
      {
        value: positioning,
        children: [
          mounted &&
            modal &&
            /* @__PURE__ */ (0, import_jsx_runtime.jsx)(InternalBackdrop, {
              inert: inertValue(!open),
              cutout: inputGroupElement ?? inputElement ?? triggerElement
            }),
          element
        ]
      }
    )
  }
)
//#endregion
//#region node_modules/@base-ui/react/combobox/popup/ComboboxPopup.mjs
var stateAttributesMapping = {
  ...popupStateMapping,
  ...transitionStatusMapping
}
/**
 * A container for the list.
 * Renders a `<div>` element.
 *
 * Documentation: [Base UI Combobox](https://base-ui.com/react/components/combobox)
 */
var ComboboxPopup = /* @__PURE__ */ import_react.forwardRef(
  function ComboboxPopup(componentProps, forwardedRef) {
    const {
      render,
      className,
      style,
      initialFocus,
      finalFocus,
      ...elementProps
    } = componentProps
    const store = useComboboxRootContext()
    const positioning = useComboboxPositionerContext()
    const floatingRootContext = useComboboxFloatingContext()
    const { filteredItems } = useComboboxDerivedItemsContext()
    const mounted = useStore(store, selectors.mounted)
    const open = useStore(store, selectors.open)
    const openMethod = useStore(store, selectors.openMethod)
    const transitionStatus = useStore(store, selectors.transitionStatus)
    const inputInsidePopup = useStore(store, selectors.inputInsidePopup)
    const inputElement = useStore(store, selectors.inputElement)
    const modal = useStore(store, selectors.modal)
    const rootId = useStore(store, selectors.id)
    const empty = filteredItems.length === 0
    const popupId =
      elementProps.id ??
      (inputInsidePopup ? getComboboxPopupId(rootId) : void 0)
    useIsoLayoutEffect(() => {
      store.set('popupId', store.state.popupRef.current?.id || popupId)
      return () => {
        store.set('popupId', void 0)
      }
    }, [store, popupId])
    useOpenChangeComplete({
      open,
      ref: store.state.popupRef,
      onComplete() {
        if (open) store.state.onOpenChangeComplete(true)
      }
    })
    const element = useRenderElement('div', componentProps, {
      state: {
        open,
        side: positioning.side,
        align: positioning.align,
        anchorHidden: positioning.anchorHidden,
        transitionStatus,
        empty
      },
      ref: [forwardedRef, store.state.popupRef],
      props: [
        {
          id: popupId,
          role: inputInsidePopup ? 'dialog' : 'presentation',
          tabIndex: -1,
          onFocus(event) {
            const target = getTarget(event.nativeEvent)
            if (
              openMethod !== 'touch' &&
              (contains(store.state.listElement, target) ||
                target === event.currentTarget)
            )
              store.state.inputRef.current?.focus()
          }
        },
        getDisabledMountTransitionStyles(transitionStatus),
        elementProps
      ],
      stateAttributesMapping
    })
    const resolvedInitialFocus =
      initialFocus === void 0
        ? inputInsidePopup
          ? (interactionType) =>
              interactionType === 'touch'
                ? store.state.popupRef.current
                : inputElement
          : false
        : initialFocus
    let resolvedFinalFocus
    if (finalFocus != null) resolvedFinalFocus = finalFocus
    else resolvedFinalFocus = inputInsidePopup ? void 0 : false
    const focusManagerModal = !inputInsidePopup || modal
    return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FloatingFocusManager, {
      context: floatingRootContext,
      disabled: !mounted,
      modal: focusManagerModal,
      openInteractionType: openMethod,
      initialFocus: resolvedInitialFocus,
      returnFocus: resolvedFinalFocus,
      getInsideElements: () => [
        store.state.startDismissRef.current,
        store.state.endDismissRef.current
      ],
      children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(
        import_react.Fragment,
        {
          children: [
            element,
            focusManagerModal &&
              /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
                ComboboxInternalDismissButton,
                { ref: store.state.endDismissRef }
              )
          ]
        }
      )
    })
  }
)
//#endregion
//#region node_modules/@base-ui/react/combobox/item/ComboboxItemContext.mjs
var ComboboxItemContext = /* @__PURE__ */ import_react.createContext(void 0)
function useComboboxItemContext() {
  const context = import_react.useContext(ComboboxItemContext)
  if (!context) throw new Error(formatErrorMessage(19))
  return context
}
//#endregion
//#region node_modules/@base-ui/react/combobox/row/ComboboxRowContext.mjs
var ComboboxRowContext = /* @__PURE__ */ import_react.createContext(false)
function useComboboxRowContext() {
  return import_react.useContext(ComboboxRowContext)
}
//#endregion
//#region node_modules/@base-ui/react/combobox/item/ComboboxItem.mjs
function ComboboxItemInner(props) {
  const { componentProps, forwardedRef, virtualized, indexFromFilter } = props
  const {
    render,
    className,
    style,
    value: itemValue = null,
    index: indexProp,
    disabled = false,
    nativeButton = false,
    ...elementProps
  } = componentProps
  const didPointerDownRef = import_react.useRef(false)
  const textRef = import_react.useRef(null)
  const listItem = useCompositeListItem({
    index: indexProp,
    textRef,
    indexGuessBehavior: IndexGuessBehavior.GuessFromOrder
  })
  const store = useComboboxRootContext()
  const isRow = useComboboxRowContext()
  const hasItems = useComboboxHasItemsContext()
  const open = useStore(store, selectors.open)
  const selectionMode = useStore(store, selectors.selectionMode)
  const readOnly = useStore(store, selectors.readOnly)
  const isItemEqualToValue = useStore(store, selectors.isItemEqualToValue)
  const selectable = selectionMode !== 'none'
  const index =
    indexProp ?? (virtualized ? (indexFromFilter ?? -1) : listItem.index)
  const hasRegistered = listItem.index !== -1
  const rootId = useStore(store, selectors.id)
  const highlighted = useStore(store, selectors.isActive, index)
  const matchesSelectedValue = useStore(store, selectors.isSelected, itemValue)
  const itemProps = useStore(store, selectors.itemProps)
  const itemRef = import_react.useRef(null)
  const id = rootId != null && hasRegistered ? `${rootId}-${index}` : void 0
  const selected = matchesSelectedValue && selectable
  useIsoLayoutEffect(() => {
    if (!(hasRegistered && (virtualized || indexProp != null))) return
    const list = store.state.listRef.current
    list[index] = itemRef.current
    return () => {
      delete list[index]
    }
  }, [hasRegistered, virtualized, index, indexProp, store])
  useIsoLayoutEffect(() => {
    if (!hasRegistered || hasItems) return
    const visibleMap = store.state.valuesRef.current
    visibleMap[index] = itemValue
    if (selectionMode !== 'none')
      store.state.allValuesRef.current.push(itemValue)
    return () => {
      delete visibleMap[index]
    }
  }, [hasRegistered, hasItems, index, itemValue, store, selectionMode])
  useIsoLayoutEffect(() => {
    if (!open) {
      didPointerDownRef.current = false
      return
    }
    if (!hasRegistered || hasItems) return
    const selectedValue = store.state.selectedValue
    if (
      compareItemEquality(
        itemValue,
        Array.isArray(selectedValue)
          ? selectedValue[selectedValue.length - 1]
          : selectedValue,
        isItemEqualToValue
      )
    )
      store.set('selectedIndex', index)
  }, [
    hasRegistered,
    hasItems,
    open,
    store,
    index,
    itemValue,
    isItemEqualToValue
  ])
  const { getButtonProps, buttonRef } = useButton({
    disabled,
    focusableWhenDisabled: true,
    native: nativeButton,
    composite: true
  })
  const state = {
    disabled,
    selected,
    highlighted
  }
  function commitSelection(nativeEvent) {
    function selectItem() {
      store.state.handleSelection(nativeEvent, itemValue)
    }
    if (store.state.submitOnItemClick) {
      import_react_dom.flushSync(selectItem)
      store.state.requestSubmit()
    } else selectItem()
  }
  const defaultProps = {
    id,
    role: isRow ? 'gridcell' : 'option',
    'aria-selected': selectable ? selected : void 0,
    tabIndex: void 0,
    onPointerDownCapture(event) {
      didPointerDownRef.current = true
      event.preventDefault()
    },
    onMouseDown(event) {
      event.preventDefault()
    },
    onClick(event) {
      if (disabled || readOnly) return
      commitSelection(event.nativeEvent)
    },
    onMouseUp(event) {
      const pointerStartedOnItem = didPointerDownRef.current
      didPointerDownRef.current = false
      if (
        disabled ||
        readOnly ||
        event.button !== 0 ||
        pointerStartedOnItem ||
        !highlighted
      )
        return
      commitSelection(event.nativeEvent)
    }
  }
  const element = useRenderElement('div', componentProps, {
    ref: [buttonRef, forwardedRef, listItem.ref, itemRef],
    state,
    props: [itemProps, defaultProps, elementProps, getButtonProps]
  })
  const contextValue = import_react.useMemo(
    () => ({
      selected,
      textRef
    }),
    [selected, textRef]
  )
  return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
    ComboboxItemContext.Provider,
    {
      value: contextValue,
      children: element
    }
  )
}
/**
 * Resolves the index from the filtered items for the virtualized fallback (no `index` prop).
 * Isolated here so that this per-keystroke subscription to the derived-items context is only
 * paid by virtualized items. Those re-render on every input change anyway — the parent
 * virtualizer re-windows the list as the filtered set changes — so the extra subscription costs
 * them nothing, while it keeps every non-virtualized item off that context.
 */
function ComboboxItemVirtualizedIndex(props) {
  const { componentProps, forwardedRef } = props
  const isItemEqualToValue = useStore(
    useComboboxRootContext(),
    selectors.isItemEqualToValue
  )
  const { flatFilteredItems } = useComboboxDerivedItemsContext()
  return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ComboboxItemInner, {
    componentProps,
    forwardedRef,
    virtualized: true,
    indexFromFilter: findItemIndex(
      flatFilteredItems,
      componentProps.value ?? null,
      isItemEqualToValue
    )
  })
}
/**
 * An individual item in the list.
 * Renders a `<div>` element.
 *
 * Documentation: [Base UI Combobox](https://base-ui.com/react/components/combobox)
 */
var ComboboxItem = /* @__PURE__ */ import_react.memo(
  /* @__PURE__ */ import_react.forwardRef(
    function ComboboxItem(componentProps, forwardedRef) {
      const virtualized = useStore(
        useComboboxRootContext(),
        selectors.virtualized
      )
      if (virtualized && componentProps.index == null)
        return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
          ComboboxItemVirtualizedIndex,
          {
            componentProps,
            forwardedRef
          }
        )
      return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ComboboxItemInner, {
        componentProps,
        forwardedRef,
        virtualized,
        indexFromFilter: void 0
      })
    }
  )
)
//#endregion
//#region node_modules/@base-ui/react/combobox/empty/ComboboxEmpty.mjs
/**
 * Renders its children only when the list is empty.
 * Requires the `items` prop on the root component.
 * Announces changes politely to screen readers.
 * This component's root element must remain mounted in the DOM to announce
 * changes consistently across screen readers. Avoid hiding or removing the
 * component itself with `display: none`, `hidden`, `aria-hidden`, or conditional
 * rendering. Prefer updating or conditionally rendering its children instead.
 * Renders a `<div>` element.
 *
 * Documentation: [Base UI Combobox](https://base-ui.com/react/components/combobox)
 */
var ComboboxEmpty = /* @__PURE__ */ import_react.forwardRef(
  function ComboboxEmpty(componentProps, forwardedRef) {
    const {
      render,
      className,
      style,
      children: childrenProp,
      ...elementProps
    } = componentProps
    const { filteredItems } = useComboboxDerivedItemsContext()
    const store = useComboboxRootContext()
    const emptyRef = useInitialLiveRegionTextMutation()
    const children = filteredItems.length === 0 ? childrenProp : null
    return useRenderElement('div', componentProps, {
      ref: [forwardedRef, store.state.emptyRef, emptyRef],
      props: [
        {
          children,
          role: 'status',
          'aria-live': 'polite',
          'aria-atomic': true
        },
        elementProps
      ]
    })
  }
)
//#endregion
//#region node_modules/@base-ui/react/combobox/root/ComboboxRoot.mjs
/**
 * Groups all parts of the combobox.
 * Doesn't render its own HTML element.
 *
 * Documentation: [Base UI Combobox](https://base-ui.com/react/components/combobox)
 */
function ComboboxRoot(props) {
  const {
    multiple = false,
    defaultValue,
    value,
    onValueChange,
    autoComplete,
    ...other
  } = props
  return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AriaCombobox, {
    ...other,
    selectionMode: multiple ? 'multiple' : 'single',
    selectedValue: value,
    defaultSelectedValue: defaultValue,
    onSelectedValueChange: onValueChange,
    formAutoComplete: autoComplete
  })
}
//#endregion
//#region node_modules/@base-ui/react/combobox/value/ComboboxValue.mjs
/**
 * The current value of the combobox.
 * Doesn't render its own HTML element.
 *
 * Documentation: [Base UI Combobox](https://base-ui.com/react/components/combobox)
 */
function ComboboxValue(props) {
  const { children: childrenProp, placeholder } = props
  const store = useComboboxRootContext()
  const itemToStringLabel = useStore(store, selectors.itemToStringLabel)
  const selectedValue = useStore(store, selectors.selectedValue)
  const items = useStore(store, selectors.items)
  const multiple = useStore(store, selectors.selectionMode) === 'multiple'
  const hasSelectedValue = useStore(store, selectors.hasSelectedValue)
  const shouldCheckNullItemLabel =
    !hasSelectedValue && placeholder != null && childrenProp == null
  const hasNullLabel = useStore(
    store,
    selectors.hasNullItemLabel,
    shouldCheckNullItemLabel
  )
  let children = null
  if (typeof childrenProp === 'function') children = childrenProp(selectedValue)
  else if (childrenProp != null) children = childrenProp
  else if (!hasSelectedValue && placeholder != null && !hasNullLabel)
    children = placeholder
  else if (multiple && Array.isArray(selectedValue))
    children = resolveMultipleLabels(selectedValue, items, itemToStringLabel)
  else children = resolveSelectedLabel(selectedValue, items, itemToStringLabel)
  return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_react.Fragment, {
    children
  })
}
//#endregion
//#region node_modules/@base-ui/react/combobox/item-indicator/ComboboxItemIndicator.mjs
/**
 * Indicates whether the item is selected.
 * Renders a `<span>` element.
 *
 * Documentation: [Base UI Combobox](https://base-ui.com/react/components/combobox)
 */
var ComboboxItemIndicator = /* @__PURE__ */ import_react.forwardRef(
  function ComboboxItemIndicator(componentProps, forwardedRef) {
    const keepMounted = componentProps.keepMounted ?? false
    const { selected } = useComboboxItemContext()
    if (!(keepMounted || selected)) return null
    return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Inner, {
      ...componentProps,
      ref: forwardedRef
    })
  }
)
var Inner = /* @__PURE__ */ import_react.memo(
  /* @__PURE__ */ import_react.forwardRef((componentProps, forwardedRef) => {
    const { render, className, style, keepMounted, ...elementProps } =
      componentProps
    const { selected } = useComboboxItemContext()
    const indicatorRef = import_react.useRef(null)
    const { transitionStatus, setMounted } = useTransitionStatus(selected)
    const element = useRenderElement('span', componentProps, {
      ref: [forwardedRef, indicatorRef],
      state: {
        selected,
        transitionStatus
      },
      props: [
        {
          'aria-hidden': true,
          children: '✔️'
        },
        elementProps
      ],
      stateAttributesMapping: transitionStatusMapping
    })
    useOpenChangeComplete({
      open: selected,
      ref: indicatorRef,
      onComplete() {
        if (!selected) setMounted(false)
      }
    })
    return element
  })
)
//#endregion
//#region node_modules/@base-ui/react/combobox/chips/ComboboxChips.mjs
/**
 * A container for the chips in a multiselectable input.
 * Renders a `<div>` element.
 *
 * Documentation: [Base UI Combobox](https://base-ui.com/react/components/combobox)
 */
var ComboboxChips = /* @__PURE__ */ import_react.forwardRef(
  function ComboboxChips(componentProps, forwardedRef) {
    const { render, className, style, ...elementProps } = componentProps
    const store = useComboboxRootContext()
    const open = useStore(store, selectors.open)
    const hasSelectionChips = useStore(store, selectors.hasSelectionChips)
    const [highlightedChipIndex, setHighlightedChipIndex] =
      import_react.useState(void 0)
    if (open && highlightedChipIndex !== void 0) setHighlightedChipIndex(void 0)
    const chipsRef = import_react.useRef([])
    const element = useRenderElement('div', componentProps, {
      ref: [forwardedRef, store.state.chipsContainerRef],
      props: [
        hasSelectionChips ? { role: 'toolbar' } : EMPTY_OBJECT,
        {
          onMouseDown(event) {
            handleInputPress(
              event,
              store,
              store.state.disabled,
              store.state.readOnly
            )
          }
        },
        elementProps
      ]
    })
    const contextValue = import_react.useMemo(
      () => ({
        highlightedChipIndex,
        setHighlightedChipIndex,
        chipsRef
      }),
      [highlightedChipIndex, setHighlightedChipIndex, chipsRef]
    )
    return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
      ComboboxChipsContext.Provider,
      {
        value: contextValue,
        children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CompositeList, {
          elementsRef: chipsRef,
          children: element
        })
      }
    )
  }
)
//#endregion
//#region node_modules/@base-ui/react/combobox/chip/ComboboxChipContext.mjs
var ComboboxChipContext = /* @__PURE__ */ import_react.createContext(void 0)
function useComboboxChipContext() {
  const context = import_react.useContext(ComboboxChipContext)
  if (!context) throw new Error(formatErrorMessage(17))
  return context
}
//#endregion
//#region node_modules/@base-ui/react/combobox/chip/ComboboxChip.mjs
/**
 * An individual chip that represents a value in a multiselectable input.
 * Renders a `<div>` element.
 *
 * Documentation: [Base UI Combobox](https://base-ui.com/react/components/combobox)
 */
var ComboboxChip = /* @__PURE__ */ import_react.forwardRef(
  function ComboboxChip(componentProps, forwardedRef) {
    const { render, className, style, ...elementProps } = componentProps
    const store = useComboboxRootContext()
    const { setHighlightedChipIndex, chipsRef } = useComboboxChipsContext()
    const direction = useDirection()
    const disabled = useStore(store, selectors.disabled)
    const readOnly = useStore(store, selectors.readOnly)
    const selectedValue = useStore(store, selectors.selectedValue)
    const { ref, index } = useCompositeListItem()
    function handleKeyDown(event) {
      let nextIndex = index
      const isRtl = direction === 'rtl'
      const previousChipKey = isRtl ? 'ArrowRight' : 'ArrowLeft'
      const nextChipKey = isRtl ? 'ArrowLeft' : 'ArrowRight'
      if (event.key === previousChipKey) {
        event.preventDefault()
        if (index > 0) nextIndex = index - 1
        else nextIndex = void 0
      } else if (event.key === nextChipKey) {
        event.preventDefault()
        if (index < chipsRef.current.length - 1) nextIndex = index + 1
        else nextIndex = void 0
      } else if (event.key === 'Backspace' || event.key === 'Delete') {
        const computedNextIndex =
          index >= selectedValue.length - 1 ? selectedValue.length - 2 : index
        nextIndex = computedNextIndex >= 0 ? computedNextIndex : void 0
        stopEvent(event)
        store.state.setIndices({
          activeIndex: null,
          selectedIndex: null,
          type: 'keyboard'
        })
        store.state.setSelectedValue(
          selectedValue.filter((_, i) => i !== index),
          createChangeEventDetails(none, event.nativeEvent)
        )
      } else if (event.key === 'Enter' || event.key === ' ') {
        stopEvent(event)
        nextIndex = void 0
      } else if (event.key === 'ArrowDown' || event.key === 'ArrowUp') {
        stopEvent(event)
        store.state.setOpen(
          true,
          createChangeEventDetails(listNavigation, event.nativeEvent)
        )
        nextIndex = void 0
      } else if (
        event.key.length === 1 &&
        !event.ctrlKey &&
        !event.metaKey &&
        !event.altKey
      )
        nextIndex = void 0
      return nextIndex
    }
    const element = useRenderElement('div', componentProps, {
      ref: [forwardedRef, ref],
      state: { disabled },
      props: [
        {
          tabIndex: -1,
          'aria-disabled': disabled || void 0,
          'aria-readonly': readOnly || void 0,
          onKeyDown(event) {
            if (disabled || readOnly) return
            const nextIndex = handleKeyDown(event)
            import_react_dom.flushSync(() => {
              setHighlightedChipIndex(nextIndex)
            })
            if (nextIndex === void 0) store.state.inputRef.current?.focus()
            else chipsRef.current[nextIndex]?.focus()
          }
        },
        elementProps
      ]
    })
    const contextValue = import_react.useMemo(() => ({ index }), [index])
    return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
      ComboboxChipContext.Provider,
      {
        value: contextValue,
        children: element
      }
    )
  }
)
//#endregion
//#region node_modules/@base-ui/react/combobox/chip-remove/ComboboxChipRemove.mjs
/**
 * A button to remove a chip.
 * Renders a `<button>` element.
 *
 * Documentation: [Base UI Combobox](https://base-ui.com/react/components/combobox)
 */
var ComboboxChipRemove = /* @__PURE__ */ import_react.forwardRef(
  function ComboboxChipRemove(componentProps, forwardedRef) {
    const {
      render,
      className,
      disabled: disabledProp = false,
      nativeButton = true,
      style,
      ...elementProps
    } = componentProps
    const store = useComboboxRootContext()
    const { index } = useComboboxChipContext()
    const comboboxDisabled = useStore(store, selectors.disabled)
    const readOnly = useStore(store, selectors.readOnly)
    const selectedValue = useStore(store, selectors.selectedValue)
    const isItemEqualToValue = useStore(store, selectors.isItemEqualToValue)
    const disabled = comboboxDisabled || disabledProp
    const { buttonRef, getButtonProps } = useButton({
      native: nativeButton,
      disabled: disabled || readOnly,
      focusableWhenDisabled: true
    })
    const state = { disabled }
    function clearActiveIndexForRemovedItem(removedItem) {
      const activeIndex = store.state.activeIndex
      if (activeIndex == null) return
      const removedIndex = findItemIndex(
        store.state.valuesRef.current,
        removedItem,
        isItemEqualToValue
      )
      if (removedIndex !== -1 && activeIndex === removedIndex)
        store.state.setIndices({
          activeIndex: null,
          type: store.state.keyboardActiveRef.current ? 'keyboard' : 'pointer'
        })
    }
    function removeChip(event) {
      const eventDetails = createChangeEventDetails(
        chipRemovePress,
        event.nativeEvent
      )
      const removedItem = selectedValue[index]
      clearActiveIndexForRemovedItem(removedItem)
      store.state.setSelectedValue(
        selectedValue.filter((_, i) => i !== index),
        eventDetails
      )
      store.state.inputRef.current?.focus()
      return eventDetails
    }
    return useRenderElement('button', componentProps, {
      ref: [forwardedRef, buttonRef],
      state,
      props: [
        {
          tabIndex: -1,
          onMouseDown(event) {
            event.preventDefault()
          },
          onClick(event) {
            if (disabled || readOnly) return
            if (!removeChip(event).isPropagationAllowed) event.stopPropagation()
          },
          onKeyDown(event) {
            if (disabled || readOnly) return
            if (event.key === 'Enter' || event.key === ' ') {
              if (!removeChip(event).isPropagationAllowed) stopEvent(event)
            }
          }
        },
        elementProps,
        getButtonProps
      ]
    })
  }
)
//#endregion
export {
  useFloating$1 as C,
  require_shim as D,
  require_with_selector as E,
  require_jsx_runtime as O,
  size as S,
  require_react_dom as T,
  flip as _,
  ComboboxValue as a,
  offset as b,
  ComboboxItem as c,
  ComboboxPortal as d,
  ComboboxList as f,
  arrow$2 as g,
  ComboboxTrigger as h,
  ComboboxItemIndicator as i,
  require_react as k,
  ComboboxPopup as l,
  ComboboxInput as m,
  ComboboxChip as n,
  ComboboxRoot as o,
  ComboboxClear as p,
  ComboboxChips as r,
  ComboboxEmpty as s,
  ComboboxChipRemove as t,
  ComboboxPositioner as u,
  hide$1 as v,
  autoUpdate as w,
  shift as x,
  limitShift as y
}
