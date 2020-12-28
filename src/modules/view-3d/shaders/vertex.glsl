uniform mat4 u_transform;

attribute vec3 a_pos;
attribute vec3 a_normal;
attribute vec3 a_color;
attribute vec2 a_texPos;

varying vec3 v_normal;
varying vec3 v_color;
varying vec2 v_texPos;

void main() {
    v_normal = (u_transform * vec4(a_normal, 1.0)).xyz;
    v_color = a_color;
    v_texPos = a_texPos;

    gl_Position = u_transform * vec4(a_pos, 1.0);
}
