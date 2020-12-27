import vShaderText from './shaders/vertex.glsl'
import fShaderText from './shaders/fragment.glsl'

import { gl } from './canvas-webgl'

const compileShader = (shader: WebGLShader) => {
  gl.compileShader(shader)

  if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
    throw new Error(gl.getShaderInfoLog(shader)!)
  }
}

export const program = gl.createProgram()!

const vertexShader = gl.createShader(gl.VERTEX_SHADER)!
const fragmentShader = gl.createShader(gl.FRAGMENT_SHADER)!

gl.shaderSource(vertexShader, vShaderText)
gl.shaderSource(fragmentShader, fShaderText)

compileShader(vertexShader)
compileShader(fragmentShader)

gl.attachShader(program, vertexShader)
gl.attachShader(program, fragmentShader)
gl.linkProgram(program)
gl.validateProgram(program)

if (!gl.getProgramParameter(program, gl.VALIDATE_STATUS)) {
  throw new Error(gl.getProgramInfoLog(program)!)
}
