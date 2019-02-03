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
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
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
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 2);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

module.exports = "void main() {\r\n  gl_FragColor = vec4(0.3, 0.3, 0.3, 1);\r\n}"

/***/ }),
/* 1 */
/***/ (function(module, exports) {

module.exports = "// атрибут, который будет получать данные из буфера\r\nattribute vec4 a_position;\r\n\r\nvoid main() {\r\n        gl_Position = a_position;\r\n        gl_PointSize = 1.0;\r\n}"

/***/ }),
/* 2 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _fragment_glsl__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(0);
/* harmony import */ var _fragment_glsl__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_fragment_glsl__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _vertex_glsl__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(1);
/* harmony import */ var _vertex_glsl__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_vertex_glsl__WEBPACK_IMPORTED_MODULE_1__);
// используем webpack raw-loader



function getCanvasContext() {
  const canvas = document.getElementById("cvs");
  let gl = undefined;
  try {
    // Попытаться получить стандартный контекст. Если не получится,
    // попробовать получить экспериментальный.
    gl = canvas.getContext("webgl") || canvas.getContext("experimental-webgl");
  } catch (e) {
    console.error("Whoops! Can't get WebGL context");
  }
  // Если мы не получили контекст GL, завершить работу
  if (!gl) {
    console.error(
      "Unable to initialize WebGL. Your browser may not support it."
    );
    gl = null;
  }

  return gl;
}

function createShader(gl, type, source) {
  const shader = gl.createShader(type); // создание шейдера
  gl.shaderSource(shader, source); // устанавливаем шейдеру его программный код
  gl.compileShader(shader); // компилируем шейдер
  const success = gl.getShaderParameter(shader, gl.COMPILE_STATUS);
  if (success) {
    // если компиляция прошла успешно - возвращаем шейдер
    return shader;
  }

  gl.deleteShader(shader);
}

function createProgram(gl, vertexShader, fragmentShader) {
  const program = gl.createProgram();
  gl.attachShader(program, vertexShader);
  gl.attachShader(program, fragmentShader);
  gl.linkProgram(program);
  const success = gl.getProgramParameter(program, gl.LINK_STATUS);
  if (success) {
    return program;
  }
  console.error(gl.getProgramInfoLog(program));
  gl.deleteProgram(program);
}

function clear(gl) {
  gl.clearColor(0, 0, 0, 0);
  gl.clear(gl.COLOR_BUFFER_BIT);
}

function bindVertexBuffer(gl, vertexBuffer, positions) {
  // Привязываем vertexBuffer к ARRAY_BUFFER который содержит параметры фигур
  // (создаем точку связи)
  gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer);
  // Заполняем буффер данными через точку связи созданную выше
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(positions), gl.STATIC_DRAW);
}

function prepare(gl, positionAttributeLocation) {
  // 2 компонента атрибута вершин за итерацию
  const size = 2;
  // наши данные - 32-битные числа с плавающей точкой
  const type = gl.FLOAT;
  // не нормализовать данные
  const normalize = true;
  // 0 = перемещаться на size * sizeof(type) каждую итерацию
  // для получения следующего положения
  const stride = 0;
  // начинать с начала буфера
  const offset = 0;

  gl.vertexAttribPointer(
    positionAttributeLocation,
    size,
    type,
    normalize,
    stride,
    offset
  );
}

function render(gl) {
  // тип примитива - треугольники ( группа из 3х вершин )
  const primitiveType = gl.TRIANGLES;
  const offset = 0;
  const count = 3;
  gl.drawArrays(primitiveType, offset, count);
}

document.addEventListener("DOMContentLoaded", () => {
  let gl = getCanvasContext();
  console.log(_fragment_glsl__WEBPACK_IMPORTED_MODULE_0___default.a);
  const vertexShader = createShader(gl, gl.VERTEX_SHADER, _vertex_glsl__WEBPACK_IMPORTED_MODULE_1___default.a);
  const fragmentShader = createShader(
    gl,
    gl.FRAGMENT_SHADER,
    _fragment_glsl__WEBPACK_IMPORTED_MODULE_0___default.a
  );

  const program = createProgram(gl, vertexShader, fragmentShader);
  // Создаем буфер вершин
  const vertexBuffer = gl.createBuffer();
  // Массив координат вершин треугольника
  const positions = [0, 0, 0, 0.5, 0.7, 0];
  bindVertexBuffer(gl, vertexBuffer, positions);
  clear(gl);
  // Используем нашу программу ( пару шейдеров )
  gl.useProgram(program);
  // Получаем ссылку на атрибут вершинного шейдера
  const positionAttributeLocation = gl.getAttribLocation(program, "a_position");  
  // Включаем атрибут
  gl.enableVertexAttribArray(positionAttributeLocation);

  prepare(gl, positionAttributeLocation, vertexBuffer);
  render(gl);
});


/***/ })
/******/ ]);