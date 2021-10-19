/******/ (function() { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./src/App.js":
/*!********************!*\
  !*** ./src/App.js ***!
  \********************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": function() { return /* binding */ App; }
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var _components_courseExercise__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./components/courseExercise */ "./src/components/courseExercise/index.jsx");
/* harmony import */ var _index_less__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./index.less */ "./src/index.less");
/* harmony import */ var _index_less__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_index_less__WEBPACK_IMPORTED_MODULE_2__);



function App() {
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(_components_courseExercise__WEBPACK_IMPORTED_MODULE_1__["default"], null);
}

/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react_dom__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react-dom */ "./node_modules/react-dom/index.js");
/* harmony import */ var _index_less__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./index.less */ "./src/index.less");
/* harmony import */ var _index_less__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_index_less__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _App__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./App */ "./src/App.js");
/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! react-redux */ "./node_modules/react-redux/es/index.js");
/* harmony import */ var react_router_dom__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! react-router-dom */ "./node_modules/react-router-dom/esm/react-router-dom.js");
/* harmony import */ var react_router_dom__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! react-router-dom */ "./node_modules/react-router/esm/react-router.js");
/* harmony import */ var _store__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./store */ "./src/store/index.js");







react_dom__WEBPACK_IMPORTED_MODULE_1__.render( /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(react_redux__WEBPACK_IMPORTED_MODULE_4__.Provider, {
  store: _store__WEBPACK_IMPORTED_MODULE_5__["default"]
}, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(react_router_dom__WEBPACK_IMPORTED_MODULE_6__.BrowserRouter, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(react_router_dom__WEBPACK_IMPORTED_MODULE_7__.Switch, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(react_router_dom__WEBPACK_IMPORTED_MODULE_7__.Route, {
  path: "/",
  exact: true
}, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(_App__WEBPACK_IMPORTED_MODULE_3__["default"], null))))), document.getElementById("root"));

/***/ }),

/***/ "./src/store/index.js":
/*!****************************!*\
  !*** ./src/store/index.js ***!
  \****************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var redux__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! redux */ "./node_modules/redux/es/redux.js");
/* harmony import */ var redux_saga__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! redux-saga */ "./node_modules/redux-saga/dist/redux-saga-core-npm-proxy.esm.js");
/* harmony import */ var _rootReducer_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./rootReducer.js */ "./src/store/rootReducer.js");
/* harmony import */ var _rootSaga__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./rootSaga */ "./src/store/rootSaga.js");




var sagaMiddleware = (0,redux_saga__WEBPACK_IMPORTED_MODULE_0__["default"])();
var store = (0,redux__WEBPACK_IMPORTED_MODULE_3__.createStore)(_rootReducer_js__WEBPACK_IMPORTED_MODULE_1__["default"], window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__((0,redux__WEBPACK_IMPORTED_MODULE_3__.applyMiddleware)(sagaMiddleware)));
sagaMiddleware.run(_rootSaga__WEBPACK_IMPORTED_MODULE_2__["default"]);
/* harmony default export */ __webpack_exports__["default"] = (store);

/***/ }),

/***/ "./src/store/rootReducer.js":
/*!**********************************!*\
  !*** ./src/store/rootReducer.js ***!
  \**********************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "appReducer": function() { return /* binding */ appReducer; }
/* harmony export */ });
/* harmony import */ var redux__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! redux */ "./node_modules/redux/es/redux.js");
/* harmony import */ var _terminal__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./terminal */ "./src/store/terminal/index.js");


var initial = {};
function appReducer() {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : initial;
  var action = arguments.length > 1 ? arguments[1] : undefined;
  return state;
}
var rootReducer = (0,redux__WEBPACK_IMPORTED_MODULE_1__.combineReducers)({
  app: appReducer,
  terminal: _terminal__WEBPACK_IMPORTED_MODULE_0__["default"]
});
/* harmony default export */ __webpack_exports__["default"] = (rootReducer);

/***/ }),

/***/ "./src/store/rootSaga.js":
/*!*******************************!*\
  !*** ./src/store/rootSaga.js ***!
  \*******************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": function() { return /* binding */ rootSaga; }
/* harmony export */ });
/* harmony import */ var _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/regenerator */ "./node_modules/@babel/runtime/regenerator/index.js");
/* harmony import */ var _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var redux_saga_effects__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! redux-saga/effects */ "./node_modules/redux-saga/dist/redux-saga-effects-npm-proxy.esm.js");
/* harmony import */ var _terminal__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./terminal */ "./src/store/terminal/index.js");


var _marked = /*#__PURE__*/_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default().mark(rootSaga);



function rootSaga() {
  var sagas;
  return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default().wrap(function rootSaga$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          sagas = [_terminal__WEBPACK_IMPORTED_MODULE_2__["default"]];
          _context.next = 3;
          return (0,redux_saga_effects__WEBPACK_IMPORTED_MODULE_1__.all)(sagas.map(function (s) {
            return (0,redux_saga_effects__WEBPACK_IMPORTED_MODULE_1__.spawn)(s);
          }));

        case 3:
        case "end":
          return _context.stop();
      }
    }
  }, _marked);
}

/***/ }),

/***/ "./src/store/terminal/actions.js":
/*!***************************************!*\
  !*** ./src/store/terminal/actions.js ***!
  \***************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "COMPILE_CODE": function() { return /* binding */ COMPILE_CODE; }
/* harmony export */ });
var COMPILE_CODE = 'COMPILE_CODE';

/***/ }),

/***/ "./src/store/terminal/index.js":
/*!*************************************!*\
  !*** ./src/store/terminal/index.js ***!
  \*************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": function() { return /* binding */ terminalReducer; }
/* harmony export */ });
/* harmony import */ var _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/defineProperty */ "./node_modules/@babel/runtime/helpers/esm/defineProperty.js");
/* harmony import */ var _actions__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./actions */ "./src/store/terminal/actions.js");


function ownKeys(object, enumerableOnly) {
  var keys = Object.keys(object);

  if (Object.getOwnPropertySymbols) {
    var symbols = Object.getOwnPropertySymbols(object);

    if (enumerableOnly) {
      symbols = symbols.filter(function (sym) {
        return Object.getOwnPropertyDescriptor(object, sym).enumerable;
      });
    }

    keys.push.apply(keys, symbols);
  }

  return keys;
}

function _objectSpread(target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i] != null ? arguments[i] : {};

    if (i % 2) {
      ownKeys(Object(source), true).forEach(function (key) {
        (0,_babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_0__["default"])(target, key, source[key]);
      });
    } else if (Object.getOwnPropertyDescriptors) {
      Object.defineProperties(target, Object.getOwnPropertyDescriptors(source));
    } else {
      ownKeys(Object(source)).forEach(function (key) {
        Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));
      });
    }
  }

  return target;
}


var initialState = {
  data: []
};
function terminalReducer() {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : initialState;
  var action = arguments.length > 1 ? arguments[1] : undefined;
  console.log(action);

  switch (action.type) {
    case _actions__WEBPACK_IMPORTED_MODULE_1__.COMPILE_CODE:
      {
        return _objectSpread(_objectSpread({}, state), {}, {
          data: action.payload
        });
      }

    default:
      return state;
  }
}

/***/ }),

/***/ "./src/components/common/button/index.jsx":
/*!************************************************!*\
  !*** ./src/components/common/button/index.jsx ***!
  \************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var _styles_module_less__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./styles.module.less */ "./src/components/common/button/styles.module.less");
/* harmony import */ var _styles_module_less__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_styles_module_less__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! classnames */ "./node_modules/classnames/index.js");
/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(classnames__WEBPACK_IMPORTED_MODULE_2__);




var Button = function Button(_ref) {
  var children = _ref.children,
      variant = _ref.variant,
      className = _ref.className,
      onClick = _ref.onClick;
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("button", {
    type: "button",
    className: classnames__WEBPACK_IMPORTED_MODULE_2___default()((_styles_module_less__WEBPACK_IMPORTED_MODULE_1___default().btn), (_styles_module_less__WEBPACK_IMPORTED_MODULE_1___default())[variant], className),
    onClick: onClick
  }, children);
};

/* harmony default export */ __webpack_exports__["default"] = (Button);

/***/ }),

/***/ "./src/components/common/container/index.jsx":
/*!***************************************************!*\
  !*** ./src/components/common/container/index.jsx ***!
  \***************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var _styles_module_less__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./styles.module.less */ "./src/components/common/container/styles.module.less");
/* harmony import */ var _styles_module_less__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_styles_module_less__WEBPACK_IMPORTED_MODULE_1__);



var Container = function Container(_ref) {
  var children = _ref.children;
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("div", {
    className: (_styles_module_less__WEBPACK_IMPORTED_MODULE_1___default().container)
  }, children);
};

/* harmony default export */ __webpack_exports__["default"] = (Container);

/***/ }),

/***/ "./src/components/courseExercise/index.jsx":
/*!*************************************************!*\
  !*** ./src/components/courseExercise/index.jsx ***!
  \*************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _babel_runtime_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/slicedToArray */ "./node_modules/@babel/runtime/helpers/esm/slicedToArray.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var _common_container__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../common/container */ "./src/components/common/container/index.jsx");
/* harmony import */ var _styles_module_less__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./styles.module.less */ "./src/components/courseExercise/styles.module.less");
/* harmony import */ var _styles_module_less__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_styles_module_less__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _tempJSON_json__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../tempJSON.json */ "./src/tempJSON.json");
/* harmony import */ var _terminal__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../terminal */ "./src/components/terminal/index.jsx");
/* harmony import */ var _exercise__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../exercise */ "./src/components/exercise/index.jsx");
/* harmony import */ var _instruction__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../instruction */ "./src/components/instruction/index.jsx");
/* harmony import */ var _common_button__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../common/button */ "./src/components/common/button/index.jsx");
/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! classnames */ "./node_modules/classnames/index.js");
/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_9___default = /*#__PURE__*/__webpack_require__.n(classnames__WEBPACK_IMPORTED_MODULE_9__);
/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! react-redux */ "./node_modules/react-redux/es/index.js");












function CourseExercise() {
  var _useState = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(),
      _useState2 = (0,_babel_runtime_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_0__["default"])(_useState, 2),
      hint = _useState2[0],
      setHint = _useState2[1];

  var _useState3 = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(),
      _useState4 = (0,_babel_runtime_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_0__["default"])(_useState3, 2),
      sampleCode = _useState4[0],
      setSampleCode = _useState4[1];

  var _useState5 = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(),
      _useState6 = (0,_babel_runtime_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_0__["default"])(_useState5, 2),
      solution = _useState6[0],
      setSolution = _useState6[1];

  var _useState7 = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)("script"),
      _useState8 = (0,_babel_runtime_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_0__["default"])(_useState7, 2),
      activeTab = _useState8[0],
      setActiveTab = _useState8[1];

  var output = (0,react_redux__WEBPACK_IMPORTED_MODULE_10__.useSelector)(function (state) {
    return state.terminal.data.output;
  });
  (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(function () {
    setSampleCode(_tempJSON_json__WEBPACK_IMPORTED_MODULE_4__.sample_code);
  }, []);
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1__.createElement(_common_container__WEBPACK_IMPORTED_MODULE_2__["default"], null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1__.createElement("div", {
    className: (_styles_module_less__WEBPACK_IMPORTED_MODULE_3___default().exerciseContainer)
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1__.createElement("div", {
    className: (_styles_module_less__WEBPACK_IMPORTED_MODULE_3___default().content)
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1__.createElement("div", {
    className: (_styles_module_less__WEBPACK_IMPORTED_MODULE_3___default().sidebar)
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1__.createElement(_exercise__WEBPACK_IMPORTED_MODULE_6__["default"], _tempJSON_json__WEBPACK_IMPORTED_MODULE_4__), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1__.createElement(_instruction__WEBPACK_IMPORTED_MODULE_7__["default"], null)), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1__.createElement("div", {
    className: (_styles_module_less__WEBPACK_IMPORTED_MODULE_3___default().hint)
  }, hint && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1__.createElement(react__WEBPACK_IMPORTED_MODULE_1__.Fragment, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1__.createElement("div", {
    className: (_styles_module_less__WEBPACK_IMPORTED_MODULE_3___default().hintInfo)
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1__.createElement("h6", null, "\u041F\u043E\u0434\u0441\u043A\u0430\u0437\u043A\u0430"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1__.createElement("p", {
    dangerouslySetInnerHTML: {
      __html: hint
    }
  })), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1__.createElement("div", {
    className: (_styles_module_less__WEBPACK_IMPORTED_MODULE_3___default().feedback)
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1__.createElement("p", null, "\u0412\u0430\u043C \u043F\u043E\u043C\u043E\u0433\u043B\u0430 \u044D\u0442\u0430 \u043F\u043E\u0434\u0441\u043A\u0430\u0437\u043A\u0430?"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1__.createElement("div", {
    className: (_styles_module_less__WEBPACK_IMPORTED_MODULE_3___default().feedbackAnswer)
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1__.createElement(_common_button__WEBPACK_IMPORTED_MODULE_8__["default"], {
    variant: "outline"
  }, "\u041D\u0435\u0442"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1__.createElement(_common_button__WEBPACK_IMPORTED_MODULE_8__["default"], {
    variant: "outline"
  }, "\u0414\u0430")))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1__.createElement(_common_button__WEBPACK_IMPORTED_MODULE_8__["default"], {
    className: (_styles_module_less__WEBPACK_IMPORTED_MODULE_3___default().btn),
    variant: "outline",
    onClick: function onClick() {
      if (hint) {
        setSolution(_tempJSON_json__WEBPACK_IMPORTED_MODULE_4__.solution);
        setActiveTab('solution');
      } else {
        setHint(_tempJSON_json__WEBPACK_IMPORTED_MODULE_4__.hint);
      }
    }
  }, !hint ? "Подсказка (-30 XP)" : "Показать ответ (-70 XP)"))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1__.createElement("div", {
    className: (_styles_module_less__WEBPACK_IMPORTED_MODULE_3___default().terminal)
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1__.createElement("div", {
    className: (_styles_module_less__WEBPACK_IMPORTED_MODULE_3___default().terminalHeader)
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1__.createElement("div", {
    onClick: function onClick() {
      return setActiveTab("script");
    },
    className: classnames__WEBPACK_IMPORTED_MODULE_9___default()(activeTab === "script" ? (_styles_module_less__WEBPACK_IMPORTED_MODULE_3___default().tabActive) : "", (_styles_module_less__WEBPACK_IMPORTED_MODULE_3___default().tab))
  }, "script.py"), solution && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1__.createElement("div", {
    onClick: function onClick() {
      return setActiveTab("solution");
    },
    className: classnames__WEBPACK_IMPORTED_MODULE_9___default()(activeTab === "solution" ? (_styles_module_less__WEBPACK_IMPORTED_MODULE_3___default().tabActive) : "", (_styles_module_less__WEBPACK_IMPORTED_MODULE_3___default().tab))
  }, "solution.py")), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1__.createElement(_terminal__WEBPACK_IMPORTED_MODULE_5__["default"], {
    sampleCode: activeTab === 'solution' ? solution : sampleCode,
    readonly: activeTab === 'solution' ? true : false
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1__.createElement("p", null, output))));
}

/* harmony default export */ __webpack_exports__["default"] = (CourseExercise);

/***/ }),

/***/ "./src/components/exercise/index.jsx":
/*!*******************************************!*\
  !*** ./src/components/exercise/index.jsx ***!
  \*******************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var _styles_module_less__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./styles.module.less */ "./src/components/exercise/styles.module.less");
/* harmony import */ var _styles_module_less__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_styles_module_less__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var assets_Terminal_svg__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! assets/Terminal.svg */ "./assets/Terminal.svg");
/* harmony import */ var assets_SideBarArrowLeft_svg__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! assets/SideBarArrowLeft.svg */ "./assets/SideBarArrowLeft.svg");





function Exercise(props) {
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(react__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("div", {
    className: (_styles_module_less__WEBPACK_IMPORTED_MODULE_1___default().header)
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("div", {
    className: (_styles_module_less__WEBPACK_IMPORTED_MODULE_1___default().left__side)
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(assets_Terminal_svg__WEBPACK_IMPORTED_MODULE_2__["default"], null), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("span", {
    className: (_styles_module_less__WEBPACK_IMPORTED_MODULE_1___default().title)
  }, "\u0423\u043F\u0440\u0430\u0436\u043D\u0435\u043D\u0438\u0435")), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("div", {
    className: (_styles_module_less__WEBPACK_IMPORTED_MODULE_1___default().right__side)
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(assets_SideBarArrowLeft_svg__WEBPACK_IMPORTED_MODULE_3__["default"], null))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("div", {
    className: (_styles_module_less__WEBPACK_IMPORTED_MODULE_1___default().exercise)
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("h1", null, props.title), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("p", null, props.description), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("ul", {
    className: (_styles_module_less__WEBPACK_IMPORTED_MODULE_1___default().decimal)
  }, props.list && props.list.map(function (item) {
    return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("li", {
      key: item.text,
      dangerouslySetInnerHTML: {
        __html: item.text
      }
    });
  })), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("p", null, "\u041E\u0431\u0440\u0430\u0442\u0438\u0442\u0435 \u0432\u043D\u0438\u043C\u0430\u043D\u0438\u0435, \u0447\u0442\u043E \u0443 \u043A\u0430\u0436\u0434\u043E\u0433\u043E \u043C\u043E\u0434\u0443\u043B\u044F \u0435\u0441\u0442\u044C \u0441\u0442\u0430\u043D\u0434\u0430\u0440\u0442\u043D\u044B\u0439 \u043F\u0441\u0435\u0432\u0434\u043E\u043D\u0438\u043C, \u043A\u043E\u0442\u043E\u0440\u044B\u0439 \u043F\u043E\u0437\u0432\u043E\u043B\u044F\u0435\u0442 \u0432\u0430\u043C \u043F\u043E\u043B\u0443\u0447\u0438\u0442\u044C \u0434\u043E\u0441\u0442\u0443\u043F \u043A \u0438\u043D\u0441\u0442\u0440\u0443\u043C\u0435\u043D\u0442\u0430\u043C \u0432\u043D\u0443\u0442\u0440\u0438 \u043C\u043E\u0434\u0443\u043B\u044F, \u043D\u0435 \u043D\u0430\u0431\u0438\u0440\u0430\u044F \u0441\u0442\u043E\u043B\u044C\u043A\u043E \u0441\u0438\u043C\u0432\u043E\u043B\u043E\u0432. \u041D\u0430\u043F\u0440\u0438\u043C\u0435\u0440, \u0441\u0433\u043B\u0430\u0436\u0438\u0432\u0430\u043D\u0438\u0435 \u043F\u043E\u0437\u0432\u043E\u043B\u044F\u0435\u0442 \u0441\u043E\u043A\u0440\u0430\u0442\u0438\u0442\u044C", " ", /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("code", null, "seaborn.scatterplot ()"), " \u0434\u043E", " ", /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("code", null, "sns.scatterplot ()."))));
}

/* harmony default export */ __webpack_exports__["default"] = (Exercise);

/***/ }),

/***/ "./src/components/instruction/index.jsx":
/*!**********************************************!*\
  !*** ./src/components/instruction/index.jsx ***!
  \**********************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var _styles_module_less__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./styles.module.less */ "./src/components/instruction/styles.module.less");
/* harmony import */ var _styles_module_less__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_styles_module_less__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var assets_Instruction_svg__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! assets/Instruction.svg */ "./assets/Instruction.svg");




var Instructions = function Instructions() {
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(react__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("div", {
    className: (_styles_module_less__WEBPACK_IMPORTED_MODULE_1___default().header)
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("div", {
    className: (_styles_module_less__WEBPACK_IMPORTED_MODULE_1___default().left__side)
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(assets_Instruction_svg__WEBPACK_IMPORTED_MODULE_2__["default"], null), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("span", {
    className: (_styles_module_less__WEBPACK_IMPORTED_MODULE_1___default().title)
  }, "\u0418\u043D\u0441\u0442\u0440\u0443\u043A\u0446\u0438\u0438")), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("div", {
    className: (_styles_module_less__WEBPACK_IMPORTED_MODULE_1___default().right__side)
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("div", {
    className: (_styles_module_less__WEBPACK_IMPORTED_MODULE_1___default().experience)
  }, "100 xp"))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("div", {
    className: (_styles_module_less__WEBPACK_IMPORTED_MODULE_1___default().instructions)
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("ul", {
    className: (_styles_module_less__WEBPACK_IMPORTED_MODULE_1___default().disc)
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("li", null, "\u042D\u043A\u0441\u043F\u0435\u0440\u0438\u043C\u0435\u043D\u0442\u0438\u0440\u0443\u0439\u0442\u0435 \u0432 \u043E\u0431\u043E\u043B\u043E\u0447\u043A\u0435 IPython; \u0432\u0432\u0435\u0434\u0438\u0442\u0435   5/8  , \u043D\u0430\u043F\u0440\u0438\u043C\u0435\u0440."), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("li", null, "\u0414\u043E\u0431\u0430\u0432\u044C\u0442\u0435 \u0435\u0449\u0435 \u043E\u0434\u043D\u0443 \u0441\u0442\u0440\u043E\u043A\u0443 \u043A\u043E\u0434\u0430 \u0432 \u0441\u043A\u0440\u0438\u043F\u0442 Python \u0432 \u043F\u0440\u0430\u0432\u043E\u043C \u0432\u0435\u0440\u0445\u043D\u0435\u043C \u0443\u0433\u043B\u0443 (\u043D\u0435 \u0432 \u043E\u0431\u043E\u043B\u043E\u0447\u043A\u0435):  ", /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("code", null, "print (7 + 10)")), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("li", null, "\u042D\u043A\u0441\u043F\u0435\u0440\u0438\u043C\u0435\u043D\u0442\u0438\u0440\u0443\u0439\u0442\u0435 \u0432 \u043E\u0431\u043E\u043B\u043E\u0447\u043A\u0435 IPython; \u0432\u0432\u0435\u0434\u0438\u0442\u0435   5/8  , \u043D\u0430\u043F\u0440\u0438\u043C\u0435\u0440."))));
};

/* harmony default export */ __webpack_exports__["default"] = (Instructions);

/***/ }),

/***/ "./src/components/terminal/index.jsx":
/*!*******************************************!*\
  !*** ./src/components/terminal/index.jsx ***!
  \*******************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _babel_runtime_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/slicedToArray */ "./node_modules/@babel/runtime/helpers/esm/slicedToArray.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react_ace__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react-ace */ "./node_modules/react-ace/lib/index.js");
/* harmony import */ var brace__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! brace */ "./node_modules/brace/index.js");
/* harmony import */ var brace__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(brace__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var brace_mode_python__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! brace/mode/python */ "./node_modules/brace/mode/python.js");
/* harmony import */ var brace_mode_python__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(brace_mode_python__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var brace_ext_language_tools__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! brace/ext/language_tools */ "./node_modules/brace/ext/language_tools.js");
/* harmony import */ var brace_ext_language_tools__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(brace_ext_language_tools__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _common_button__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../common/button */ "./src/components/common/button/index.jsx");
/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! react-redux */ "./node_modules/react-redux/es/index.js");
/* harmony import */ var _store_terminal_actions__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../../store/terminal/actions */ "./src/store/terminal/actions.js");
/* harmony import */ var assets_Reset_svg__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! assets/Reset.svg */ "./assets/Reset.svg");
/* harmony import */ var _styles_module_less__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./styles.module.less */ "./src/components/terminal/styles.module.less");
/* harmony import */ var _styles_module_less__WEBPACK_IMPORTED_MODULE_10___default = /*#__PURE__*/__webpack_require__.n(_styles_module_less__WEBPACK_IMPORTED_MODULE_10__);
/* harmony import */ var _terminal_module_less__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./terminal.module.less */ "./src/components/terminal/terminal.module.less");
/* harmony import */ var _terminal_module_less__WEBPACK_IMPORTED_MODULE_11___default = /*#__PURE__*/__webpack_require__.n(_terminal_module_less__WEBPACK_IMPORTED_MODULE_11__);













function Terminal(_ref) {
  var sampleCode = _ref.sampleCode,
      readonly = _ref.readonly;

  var _useState = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(),
      _useState2 = (0,_babel_runtime_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_0__["default"])(_useState, 2),
      value = _useState2[0],
      setValue = _useState2[1];

  var dispatch = (0,react_redux__WEBPACK_IMPORTED_MODULE_7__.useDispatch)();
  (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(function () {
    setValue(sampleCode);
  }, [sampleCode]);

  function onChange(value) {
    setValue(value);
  }

  brace__WEBPACK_IMPORTED_MODULE_3___default().define("ace/snippets/python", ["require", "exports", "module"], function (e, t, n) {
    t.snippetText = snippet, t.scope = "python";
  });
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1__.createElement("div", {
    className: (_styles_module_less__WEBPACK_IMPORTED_MODULE_10___default().terminal)
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1__.createElement(react_ace__WEBPACK_IMPORTED_MODULE_2__["default"], {
    mode: "python",
    theme: "monokai",
    className: "editor",
    width: "100%",
    height: "100%",
    showPrintMargin: true,
    showGutter: true,
    highlightActiveLine: true,
    defaultValue: sampleCode,
    value: value,
    readOnly: readonly,
    fontSize: "16px",
    setOptions: {
      enableBasicAutocompletion: true,
      enableLiveAutocompletion: true,
      enableSnippets: true,
      showLineNumbers: true,
      tabSize: 4
    },
    onChange: onChange,
    name: "UNIQUE_ID_OF_DIV",
    editorProps: {
      $blockScrolling: true
    }
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1__.createElement("div", {
    className: (_styles_module_less__WEBPACK_IMPORTED_MODULE_10___default().actions)
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1__.createElement(_common_button__WEBPACK_IMPORTED_MODULE_6__["default"], {
    variant: "outline",
    className: (_styles_module_less__WEBPACK_IMPORTED_MODULE_10___default().btnOutline),
    onClick: function onClick() {
      setValue(sampleCode);
    }
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1__.createElement(assets_Reset_svg__WEBPACK_IMPORTED_MODULE_9__["default"], null)), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1__.createElement(_common_button__WEBPACK_IMPORTED_MODULE_6__["default"], {
    variant: "outline",
    className: (_styles_module_less__WEBPACK_IMPORTED_MODULE_10___default().btnOutline),
    onClick: function onClick() {
      dispatch({
        type: _store_terminal_actions__WEBPACK_IMPORTED_MODULE_8__.COMPILE_CODE,
        payload: {
          code: value
        }
      });
    }
  }, "\u0412\u044B\u043F\u043E\u043B\u043D\u0438\u0442\u044C \u043A\u043E\u0434"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1__.createElement(_common_button__WEBPACK_IMPORTED_MODULE_6__["default"], {
    variant: "fill",
    className: (_styles_module_less__WEBPACK_IMPORTED_MODULE_10___default().btnFill),
    onClick: function onClick() {
      dispatch({
        type: _store_terminal_actions__WEBPACK_IMPORTED_MODULE_8__.COMPILE_CODE,
        payload: {
          code: value
        }
      });
    }
  }, "\u041E\u0442\u0432\u0435\u0442\u0438\u0442\u044C")));
}

/* harmony default export */ __webpack_exports__["default"] = (Terminal);

/***/ }),

/***/ "./assets/Instruction.svg":
/*!********************************!*\
  !*** ./assets/Instruction.svg ***!
  \********************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _babel_runtime_helpers_extends__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/extends */ "./node_modules/@babel/runtime/helpers/esm/extends.js");
/* harmony import */ var _babel_runtime_helpers_objectWithoutProperties__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime/helpers/objectWithoutProperties */ "./node_modules/@babel/runtime/helpers/esm/objectWithoutProperties.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");


var _excluded = ["styles"];

/* harmony default export */ __webpack_exports__["default"] = (function (_ref) {
  var _ref$styles = _ref.styles,
      styles = _ref$styles === void 0 ? {} : _ref$styles,
      props = (0,_babel_runtime_helpers_objectWithoutProperties__WEBPACK_IMPORTED_MODULE_1__["default"])(_ref, _excluded);

  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2__.createElement("svg", (0,_babel_runtime_helpers_extends__WEBPACK_IMPORTED_MODULE_0__["default"])({
    width: "24",
    height: "24",
    fill: "none",
    xmlns: "http://www.w3.org/2000/svg"
  }, props), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2__.createElement("path", {
    d: "M19 3h-4.18C14.4 1.84 13.3 1 12 1c-1.3 0-2.4.84-2.82 2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-7 0c.55 0 1 .45 1 1s-.45 1-1 1-1-.45-1-1 .45-1 1-1zm1 14H8c-.55 0-1-.45-1-1s.45-1 1-1h5c.55 0 1 .45 1 1s-.45 1-1 1zm3-4H8c-.55 0-1-.45-1-1s.45-1 1-1h8c.55 0 1 .45 1 1s-.45 1-1 1zm0-4H8c-.55 0-1-.45-1-1s.45-1 1-1h8c.55 0 1 .45 1 1s-.45 1-1 1z",
    fill: "#fff"
  }));
});

/***/ }),

/***/ "./assets/Reset.svg":
/*!**************************!*\
  !*** ./assets/Reset.svg ***!
  \**************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _babel_runtime_helpers_extends__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/extends */ "./node_modules/@babel/runtime/helpers/esm/extends.js");
/* harmony import */ var _babel_runtime_helpers_objectWithoutProperties__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime/helpers/objectWithoutProperties */ "./node_modules/@babel/runtime/helpers/esm/objectWithoutProperties.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");


var _excluded = ["styles"];

/* harmony default export */ __webpack_exports__["default"] = (function (_ref) {
  var _ref$styles = _ref.styles,
      styles = _ref$styles === void 0 ? {} : _ref$styles,
      props = (0,_babel_runtime_helpers_objectWithoutProperties__WEBPACK_IMPORTED_MODULE_1__["default"])(_ref, _excluded);

  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2__.createElement("svg", (0,_babel_runtime_helpers_extends__WEBPACK_IMPORTED_MODULE_0__["default"])({
    width: "18",
    height: "18",
    fill: "none",
    xmlns: "http://www.w3.org/2000/svg"
  }, props), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2__.createElement("path", {
    d: "M2.645 2.644A8.96 8.96 0 019.005 0 8.99 8.99 0 0118 9c0 4.973-4.019 9-8.994 9-4.2 0-7.7-2.869-8.702-6.75h2.341a6.743 6.743 0 006.36 4.5c3.727 0 6.755-3.026 6.755-6.75s-3.028-6.75-6.754-6.75c-1.869 0-3.535.776-4.75 2.003L7.88 7.875H0V0l2.645 2.644z",
    fill: "#fff"
  }));
});

/***/ }),

/***/ "./assets/SideBarArrowLeft.svg":
/*!*************************************!*\
  !*** ./assets/SideBarArrowLeft.svg ***!
  \*************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _babel_runtime_helpers_extends__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/extends */ "./node_modules/@babel/runtime/helpers/esm/extends.js");
/* harmony import */ var _babel_runtime_helpers_objectWithoutProperties__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime/helpers/objectWithoutProperties */ "./node_modules/@babel/runtime/helpers/esm/objectWithoutProperties.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");


var _excluded = ["styles"];

/* harmony default export */ __webpack_exports__["default"] = (function (_ref) {
  var _ref$styles = _ref.styles,
      styles = _ref$styles === void 0 ? {} : _ref$styles,
      props = (0,_babel_runtime_helpers_objectWithoutProperties__WEBPACK_IMPORTED_MODULE_1__["default"])(_ref, _excluded);

  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2__.createElement("svg", (0,_babel_runtime_helpers_extends__WEBPACK_IMPORTED_MODULE_0__["default"])({
    width: "11",
    height: "16",
    fill: "none",
    xmlns: "http://www.w3.org/2000/svg"
  }, props), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2__.createElement("path", {
    d: "M10.547 14.12L4.44 8l6.107-6.12L8.667 0l-8 8 8 8 1.88-1.88z",
    fill: "#fff"
  }));
});

/***/ }),

/***/ "./assets/Terminal.svg":
/*!*****************************!*\
  !*** ./assets/Terminal.svg ***!
  \*****************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _babel_runtime_helpers_extends__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/extends */ "./node_modules/@babel/runtime/helpers/esm/extends.js");
/* harmony import */ var _babel_runtime_helpers_objectWithoutProperties__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime/helpers/objectWithoutProperties */ "./node_modules/@babel/runtime/helpers/esm/objectWithoutProperties.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");


var _excluded = ["styles"];

/* harmony default export */ __webpack_exports__["default"] = (function (_ref) {
  var _ref$styles = _ref.styles,
      styles = _ref$styles === void 0 ? {} : _ref$styles,
      props = (0,_babel_runtime_helpers_objectWithoutProperties__WEBPACK_IMPORTED_MODULE_1__["default"])(_ref, _excluded);

  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2__.createElement("svg", (0,_babel_runtime_helpers_extends__WEBPACK_IMPORTED_MODULE_0__["default"])({
    width: "24",
    height: "24",
    fill: "none",
    xmlns: "http://www.w3.org/2000/svg"
  }, props), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2__.createElement("mask", {
    id: "a",
    style: {
      maskType: "alpha"
    },
    maskUnits: "userSpaceOnUse",
    x: "0",
    y: "0",
    width: "24",
    height: "24"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2__.createElement("path", {
    fill: "#fff",
    d: "M0 0h24v24H0z"
  })), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2__.createElement("g", {
    mask: "url(#a)"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2__.createElement("path", {
    fillRule: "evenodd",
    clipRule: "evenodd",
    d: "M20 21c1.103 0 2-.897 2-2V5c0-1.103-.897-2-2-2H4c-1.103 0-2 .897-2 2v14c0 1.103.897 2 2 2h16zM4 7h16l.001 12H4V7zm14 8v2h-6v-2h6zm-9.707-1.707L6 15.586 7.414 17l3.707-3.707-3.707-3.707L6 11l2.293 2.293z",
    fill: "#fff"
  })));
});

/***/ }),

/***/ "./src/components/common/button/styles.module.less":
/*!*********************************************************!*\
  !*** ./src/components/common/button/styles.module.less ***!
  \*********************************************************/
/***/ (function(module) {

// extracted by mini-css-extract-plugin
module.exports = {"btn":"btn___jreS_","outline":"outline___vrQjk","fill":"fill___bzIT7"};

/***/ }),

/***/ "./src/components/common/container/styles.module.less":
/*!************************************************************!*\
  !*** ./src/components/common/container/styles.module.less ***!
  \************************************************************/
/***/ (function(module) {

// extracted by mini-css-extract-plugin
module.exports = {"container":"container___hcs5f"};

/***/ }),

/***/ "./src/components/courseExercise/styles.module.less":
/*!**********************************************************!*\
  !*** ./src/components/courseExercise/styles.module.less ***!
  \**********************************************************/
/***/ (function(module) {

// extracted by mini-css-extract-plugin
module.exports = {"exerciseContainer":"exerciseContainer___oxt_0","content":"content___hy_eo","sidebar":"sidebar___n7nmD","terminal":"terminal___Kv9KH","terminalHeader":"terminalHeader___oqj16","tab":"tab___MjPXw","tabActive":"tabActive___v7yVT","hint":"hint___qPwXW","hintInfo":"hintInfo___tPJB3","feedback":"feedback___UNAAn","feedbackAnswer":"feedbackAnswer___R8Xpo","btn":"btn___xqDaV"};

/***/ }),

/***/ "./src/components/exercise/styles.module.less":
/*!****************************************************!*\
  !*** ./src/components/exercise/styles.module.less ***!
  \****************************************************/
/***/ (function(module) {

// extracted by mini-css-extract-plugin
module.exports = {"left__side":"left__side___SngS7","right__side":"right__side___KoOLM","exercise":"exercise___mzX2I","header":"header___IqWfK","title":"title___kQWQK","decimal":"decimal___l_8ZS"};

/***/ }),

/***/ "./src/components/instruction/styles.module.less":
/*!*******************************************************!*\
  !*** ./src/components/instruction/styles.module.less ***!
  \*******************************************************/
/***/ (function(module) {

// extracted by mini-css-extract-plugin
module.exports = {"left__side":"left__side___IAn1f","right__side":"right__side___NB1rv","experience":"experience___mS2lG","instructions":"instructions___tiU9S","header":"header___HDqCc","title":"title___S0VBT","disc":"disc___uE2Jo"};

/***/ }),

/***/ "./src/components/terminal/styles.module.less":
/*!****************************************************!*\
  !*** ./src/components/terminal/styles.module.less ***!
  \****************************************************/
/***/ (function(module) {

// extracted by mini-css-extract-plugin
module.exports = {"header":"header___iiuQp","terminal":"terminal___wMYDb","actions":"actions___OvLEO","btnOutline":"btnOutline___evY7p","btnFill":"btnFill___CeSyR"};

/***/ }),

/***/ "./src/components/terminal/terminal.module.less":
/*!******************************************************!*\
  !*** ./src/components/terminal/terminal.module.less ***!
  \******************************************************/
/***/ (function(module) {

// extracted by mini-css-extract-plugin
module.exports = {};

/***/ }),

/***/ "./src/index.less":
/*!************************!*\
  !*** ./src/index.less ***!
  \************************/
/***/ (function(module) {

// extracted by mini-css-extract-plugin
module.exports = {};

/***/ }),

/***/ "./src/tempJSON.json":
/*!***************************!*\
  !*** ./src/tempJSON.json ***!
  \***************************/
/***/ (function(module) {

"use strict";
module.exports = JSON.parse('{"title":"Импорт модулей Python","description":"Модули (иногда называемые пакетами или библиотеками) помогают группировать связанные наборы инструментов в Python. В этом упражнении мы рассмотрим два модуля, которые часто используются специалистами по анализу данных:","list":[{"text":"<code>statsmodels</code> : используются в машинном обучении; обычно обозначается как <code>sm</code>"},{"text":"<code>seaborn</code> : библиотека визуализации; обычно имеет псевдоним <code>sns</code>"}],"hint":"Просто добавьте   <code>print(7 + 10)</code>   сценарий в правом верхнем углу и нажмите кнопку «Отправить ответ».","pre_exersize_code":"import math","sample_code":"#this is an example code\\na = 5\\nprint(a)","solution":"def fac(n):\\n\\tif n == 0:\\n\\t\\treturn 1\\n\\treturn fac(n-1) * n \\nprint(fac(5))"}');

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			id: moduleId,
/******/ 			loaded: false,
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = __webpack_modules__;
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/amd define */
/******/ 	!function() {
/******/ 		__webpack_require__.amdD = function () {
/******/ 			throw new Error('define cannot be used indirect');
/******/ 		};
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/chunk loaded */
/******/ 	!function() {
/******/ 		var deferred = [];
/******/ 		__webpack_require__.O = function(result, chunkIds, fn, priority) {
/******/ 			if(chunkIds) {
/******/ 				priority = priority || 0;
/******/ 				for(var i = deferred.length; i > 0 && deferred[i - 1][2] > priority; i--) deferred[i] = deferred[i - 1];
/******/ 				deferred[i] = [chunkIds, fn, priority];
/******/ 				return;
/******/ 			}
/******/ 			var notFulfilled = Infinity;
/******/ 			for (var i = 0; i < deferred.length; i++) {
/******/ 				var chunkIds = deferred[i][0];
/******/ 				var fn = deferred[i][1];
/******/ 				var priority = deferred[i][2];
/******/ 				var fulfilled = true;
/******/ 				for (var j = 0; j < chunkIds.length; j++) {
/******/ 					if ((priority & 1 === 0 || notFulfilled >= priority) && Object.keys(__webpack_require__.O).every(function(key) { return __webpack_require__.O[key](chunkIds[j]); })) {
/******/ 						chunkIds.splice(j--, 1);
/******/ 					} else {
/******/ 						fulfilled = false;
/******/ 						if(priority < notFulfilled) notFulfilled = priority;
/******/ 					}
/******/ 				}
/******/ 				if(fulfilled) {
/******/ 					deferred.splice(i--, 1)
/******/ 					var r = fn();
/******/ 					if (r !== undefined) result = r;
/******/ 				}
/******/ 			}
/******/ 			return result;
/******/ 		};
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	!function() {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = function(module) {
/******/ 			var getter = module && module.__esModule ?
/******/ 				function() { return module['default']; } :
/******/ 				function() { return module; };
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	!function() {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = function(exports, definition) {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/global */
/******/ 	!function() {
/******/ 		__webpack_require__.g = (function() {
/******/ 			if (typeof globalThis === 'object') return globalThis;
/******/ 			try {
/******/ 				return this || new Function('return this')();
/******/ 			} catch (e) {
/******/ 				if (typeof window === 'object') return window;
/******/ 			}
/******/ 		})();
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	!function() {
/******/ 		__webpack_require__.o = function(obj, prop) { return Object.prototype.hasOwnProperty.call(obj, prop); }
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	!function() {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = function(exports) {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/node module decorator */
/******/ 	!function() {
/******/ 		__webpack_require__.nmd = function(module) {
/******/ 			module.paths = [];
/******/ 			if (!module.children) module.children = [];
/******/ 			return module;
/******/ 		};
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/jsonp chunk loading */
/******/ 	!function() {
/******/ 		// no baseURI
/******/ 		
/******/ 		// object to store loaded and loading chunks
/******/ 		// undefined = chunk not loaded, null = chunk preloaded/prefetched
/******/ 		// [resolve, reject, Promise] = chunk loading, 0 = chunk loaded
/******/ 		var installedChunks = {
/******/ 			"main": 0
/******/ 		};
/******/ 		
/******/ 		// no chunk on demand loading
/******/ 		
/******/ 		// no prefetching
/******/ 		
/******/ 		// no preloaded
/******/ 		
/******/ 		// no HMR
/******/ 		
/******/ 		// no HMR manifest
/******/ 		
/******/ 		__webpack_require__.O.j = function(chunkId) { return installedChunks[chunkId] === 0; };
/******/ 		
/******/ 		// install a JSONP callback for chunk loading
/******/ 		var webpackJsonpCallback = function(parentChunkLoadingFunction, data) {
/******/ 			var chunkIds = data[0];
/******/ 			var moreModules = data[1];
/******/ 			var runtime = data[2];
/******/ 			// add "moreModules" to the modules object,
/******/ 			// then flag all "chunkIds" as loaded and fire callback
/******/ 			var moduleId, chunkId, i = 0;
/******/ 			if(chunkIds.some(function(id) { return installedChunks[id] !== 0; })) {
/******/ 				for(moduleId in moreModules) {
/******/ 					if(__webpack_require__.o(moreModules, moduleId)) {
/******/ 						__webpack_require__.m[moduleId] = moreModules[moduleId];
/******/ 					}
/******/ 				}
/******/ 				if(runtime) var result = runtime(__webpack_require__);
/******/ 			}
/******/ 			if(parentChunkLoadingFunction) parentChunkLoadingFunction(data);
/******/ 			for(;i < chunkIds.length; i++) {
/******/ 				chunkId = chunkIds[i];
/******/ 				if(__webpack_require__.o(installedChunks, chunkId) && installedChunks[chunkId]) {
/******/ 					installedChunks[chunkId][0]();
/******/ 				}
/******/ 				installedChunks[chunkIds[i]] = 0;
/******/ 			}
/******/ 			return __webpack_require__.O(result);
/******/ 		}
/******/ 		
/******/ 		var chunkLoadingGlobal = self["webpackChunklearn_by_doing"] = self["webpackChunklearn_by_doing"] || [];
/******/ 		chunkLoadingGlobal.forEach(webpackJsonpCallback.bind(null, 0));
/******/ 		chunkLoadingGlobal.push = webpackJsonpCallback.bind(null, chunkLoadingGlobal.push.bind(chunkLoadingGlobal));
/******/ 	}();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module depends on other loaded chunks and execution need to be delayed
/******/ 	var __webpack_exports__ = __webpack_require__.O(undefined, ["vendors-node_modules_babel_runtime_regenerator_index_js-node_modules_brace_ext_language_tools-02d6c3"], function() { return __webpack_require__("./src/index.js"); })
/******/ 	__webpack_exports__ = __webpack_require__.O(__webpack_exports__);
/******/ 	
/******/ })()
;
//# sourceMappingURL=main.5d99642e178399aa348d.js.map