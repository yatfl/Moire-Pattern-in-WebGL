// uniform vec2 uCursor;
uniform sampler2D uNameTexture;

varying vec2 vUv;

void main() {
    vec2 uv = vUv;

    vec3 name = texture(uNameTexture, uv).rgb;

    uv.x = smoothstep(0.49, 0.51, fract(uv.x * 80.));
    
    gl_FragColor = vec4(name, uv.x);
}
