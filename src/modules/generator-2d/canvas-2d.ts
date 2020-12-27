import {
  SIDE,
  CELL_SIDE,
  WIDTH_MULTIPLIER,
  HEIGHT_MULTIPLIER,
} from '@/constants'

const side2d = SIDE * CELL_SIDE

export const canvas = document.createElement('canvas')

canvas.width = side2d * WIDTH_MULTIPLIER
canvas.height = side2d * HEIGHT_MULTIPLIER

// document.querySelector('.wrapper')!.appendChild(canvas)
