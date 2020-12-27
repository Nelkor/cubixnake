import { SIDE, WIDTH_MULTIPLIER, HEIGHT_MULTIPLIER } from '@/constants'
import { Point } from '@/types'

import { state } from './snake-state'
import { createPointsComparator } from './points'

const width = SIDE * WIDTH_MULTIPLIER
const height = SIDE * HEIGHT_MULTIPLIER

const indexToPoint = (index: number): Point => [
  index % width,
  Math.floor(index / width),
]

const insertFreeIndex = (freeIndex: number, filedIndex: number) => {
  const fieldPoint = indexToPoint(filedIndex)
  const isEqualToFieldPoint = createPointsComparator(fieldPoint)

  const filedPointTaken = isEqualToFieldPoint(state.food)
    || state.snake.some(p => isEqualToFieldPoint(p))

  if (freeIndex == 0 && !filedPointTaken) {
    state.food = fieldPoint

    return
  }

  const nextFreeIndex = filedPointTaken ? freeIndex : freeIndex - 1

  insertFreeIndex(nextFreeIndex, filedIndex + 1)
}

export const randomizeFood = (): void => {
  const fieldCount = width * height
  const takenCount = state.snake.length + 1
  const freeCount = fieldCount - takenCount

  const freeIndex = Math.floor(Math.random() * freeCount)

  insertFreeIndex(freeIndex, 0)
}
