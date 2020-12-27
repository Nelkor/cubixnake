import { Point } from '@/types'
import { CELL_SIDE } from '@/constants'

import { state } from '@engine/snake-state'

import { canvas } from './canvas-2d'

const cellBorder = 1
const cellInnerSide = CELL_SIDE - cellBorder * 2

const ctx = canvas.getContext('2d')!

export const drawCell = (point: Point): void => {
  const [x, y] = point
    .map(a => a * CELL_SIDE)
    .map(a => a + cellBorder)

  ctx.beginPath()
  ctx.rect(x, y, cellInnerSide, cellInnerSide)
  ctx.fill()
}

export const draw = (): void => {
  ctx.clearRect(0, 0, canvas.width, canvas.height)

  ctx.fillStyle = '#666'

  state.snake.forEach(drawCell)

  ctx.fillStyle = '#f66'

  drawCell(state.food)
}
