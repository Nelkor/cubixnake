import { registerFrame } from '@fps-counter/fps-counter'
import { canvas } from '@generator-2d/canvas-2d'

import { gl } from './canvas-webgl'
import { program } from './program'
import { strideCount, points } from './figure'
import { createMat4 } from './mat4'
import { rotation } from './cube-state'

const fSize = Float32Array.BYTES_PER_ELEMENT
const stride = strideCount * fSize

gl.useProgram(program)


// BUFFER
const buffer = gl.createBuffer()

gl.bindBuffer(gl.ARRAY_BUFFER, buffer)
gl.bufferData(gl.ARRAY_BUFFER, points, gl.DYNAMIC_DRAW)


// PROGRAM VARIABLES
const aPos = gl.getAttribLocation(program, 'a_pos')
const aNormal = gl.getAttribLocation(program, 'a_normal')
const aTexPos = gl.getAttribLocation(program, 'a_texPos')
const aColor = gl.getAttribLocation(program, 'a_color')
const uTransform = gl.getUniformLocation(program, 'u_transform')
const uSampler = gl.getUniformLocation(program, 'u_sampler')

gl.enableVertexAttribArray(aPos)
gl.enableVertexAttribArray(aNormal)
gl.enableVertexAttribArray(aTexPos)
gl.enableVertexAttribArray(aColor)


// TEXTURE
const texture = gl.createTexture()

gl.activeTexture(gl.TEXTURE0)
gl.bindTexture(gl.TEXTURE_2D, texture)

gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR)
gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE)
gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE)


// PROGRAM DATA
gl.vertexAttribPointer(aPos, 3, gl.FLOAT, false, stride, 0)
gl.vertexAttribPointer(aNormal, 3, gl.FLOAT, true, stride, 3 * fSize)
gl.vertexAttribPointer(aTexPos, 2, gl.FLOAT, false, stride, 6 * fSize)
gl.vertexAttribPointer(aColor, 3, gl.FLOAT, false, stride, 8 * fSize)

gl.uniform1i(uSampler, 0)


// DRAW
const draw = (): void => {
  registerFrame()
  requestAnimationFrame(draw)

  gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT)

  const transform = createMat4()

  transform.rotateX(rotation.x)
  transform.rotateY(rotation.y)

  gl.uniformMatrix4fv(uTransform, false, transform.finalize())

  gl.texImage2D(
    gl.TEXTURE_2D,
    0,
    gl.RGBA,
    gl.RGBA,
    gl.UNSIGNED_BYTE,
    canvas,
  )

  gl.drawArrays(gl.TRIANGLES, 0, points.length / strideCount)
}

export const startPainting = (): void => {
  draw()
}
