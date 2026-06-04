// uniform vec2 uCursor;

varying vec2 vUv;

void main() {
    vec2 uv = vUv;
    uv.x = smoothstep(0.49, 0.51, fract(uv.x * 20.));
    
    gl_FragColor = vec4(vec3(1.), uv.x);
}
