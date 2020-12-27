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
const aColor = gl.getAttribLocation(program, 'a_color')
const uTransform = gl.getUniformLocation(program, 'u_transform')

gl.enableVertexAttribArray(aPos)
gl.enableVertexAttribArray(aNormal)
gl.enableVertexAttribArray(aColor)


//
gl.vertexAttribPointer(aPos, 3, gl.FLOAT, false, stride, 0)
gl.vertexAttribPointer(aNormal, 3, gl.FLOAT, true, stride, 3 * fSize)
gl.vertexAttribPointer(aColor, 3, gl.FLOAT, false, stride, 6 * fSize)


//
const draw = (): void => {
  requestAnimationFrame(draw)

  gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT)

  const transform = createMat4()

  transform.rotateX(rotation.x)
  transform.rotateY(rotation.y)

  gl.uniformMatrix4fv(uTransform, false, transform.finalize())

  gl.drawArrays(gl.TRIANGLES, 0, points.length / strideCount)
}

export const startPainting = (): void => {
  draw()
}
