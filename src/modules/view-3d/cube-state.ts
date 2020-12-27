export const rotation = {
  x: Math.PI / 16,
  y: Math.PI / -4,
}

export const rotateX = (angle: number): void => {
  rotation.x += angle

  rotation.x = Math.min(1, rotation.x)
  rotation.x = Math.max(-1, rotation.x)
}

export const rotateY = (angle: number): void => {
  rotation.y += angle
}
