// атрибут, который будет получать данные из буфера
attribute vec4 a_position;

void main() {
        gl_Position = a_position;
        gl_PointSize = 1.0;
}