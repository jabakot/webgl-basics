// используем webpack raw-loader
import fragmentShaderSrc from "./fragment.glsl";
import vertexShaderSrc from "./vertex.glsl";

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
  console.log(fragmentShaderSrc);
  const vertexShader = createShader(gl, gl.VERTEX_SHADER, vertexShaderSrc);
  const fragmentShader = createShader(
    gl,
    gl.FRAGMENT_SHADER,
    fragmentShaderSrc
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
