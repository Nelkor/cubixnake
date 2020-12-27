import { rotateX, rotateY } from '@view-3d/cube-state'

let position: {
  x: number
  y: number
} | null = null

const onMouseDown = (event: MouseEvent): void => {
  position = {
    x: event.clientX,
    y: event.clientY,
  }
}

const onMouseUp = (): void => {
  position = null
}

const onMouseMove = (event: MouseEvent) => {
  if (!position) {
    return
  }

  const difX = event.clientX - position.x
  const difY = event.clientY - position.y

  rotateY(difX * .002)
  rotateX(difY * .002)

  position.x += difX
  position.y += difY
}

export const startListeningMouse = (): void => {
  window.addEventListener('mousedown', onMouseDown)
  window.addEventListener('mouseup', onMouseUp)
  window.addEventListener('mousemove', onMouseMove)
}
