precision lowp float;

uniform sampler2D u_sampler;

varying vec3 v_normal;
varying vec3 v_color;
varying vec2 v_texPos;

vec3 light = vec3(0.0, 0.0, 1.0);

void main() {
    float diffuse = clamp(dot(v_normal, light), 0.2, 1.0);
    vec3 color = v_color * (vec3(1) - texture2D(u_sampler, v_texPos).rgb);

    gl_FragColor = vec4(color * diffuse, 1);
}
