const canvas = document.querySelector('#view-3d')! as HTMLCanvasElement

export const gl = canvas.getContext('webgl')!

gl.enable(gl.CULL_FACE)
gl.clearColor(.15, .2, .22, 1)

const resize = (): void => {
  const { innerWidth: width, innerHeight: height } = window
  const sideSize = Math.min(width, height, 1024)

  canvas.width = sideSize
  canvas.height = sideSize

  gl.viewport(0, 0, sideSize, sideSize)
}

resize()

window.addEventListener('resize', resize)
