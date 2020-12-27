/**
 * WARNING
 *
 * ВНИМАНИЕ
 *
 * В данном файле описываются правила переходов точек между сторонами куба.
 * Каждое такое правило являются лютейшим хардкодом.
 * Попытки врубиться в логику опасны для психического здоровья человека.
 */

import { SIDE, HEIGHT_MULTIPLIER, WIDTH_MULTIPLIER } from '@/constants'
import { Direction, Point } from '@/types'

import { state } from './snake-state'

const DOUBLE_SIDE = SIDE * 2
const PENTA_SIDE = SIDE * 5

const width = SIDE * WIDTH_MULTIPLIER
const height = SIDE * HEIGHT_MULTIPLIER

export const correctPoint = (point: Point, direction: Direction): void => {
  if (point[0] < 0) {
    state.direction = Direction.Down

    if (point[1] < SIDE) {
      point[0] = point[1] + SIDE
      point[1] = SIDE
    } else {
      point[0] = point[1]
      point[1] = 0
    }
  }


  if (point[0] == width) {
    state.direction = Direction.Up

    if (point[1] < SIDE) {
      point[0] = point[1] + SIDE
      point[1] = height - 1
    } else {
      point[0] = point[1]
      point[1] = SIDE - 1
    }
  }


  if (point[1] < 0) {
    if (point[0] < SIDE) {
      state.direction = Direction.Down

      point[0] = SIDE - 1 - point[0]
      point[1] = SIDE
    } else if (point[0] < DOUBLE_SIDE) {
      state.direction = Direction.Right

      point[1] = point[0]
      point[0] = 0
    } else {
      point[0] -= DOUBLE_SIDE
      point[1] = height - 1
    }
  }


  if (point[1] == height) {
    if (point[0] < SIDE) {
      point[0] += DOUBLE_SIDE
      point[1] = 0
    } else if (point[0] < DOUBLE_SIDE) {
      state.direction = Direction.Left

      point[1] = point[0] - SIDE
      point[0] = width - 1
    } else {
      state.direction = Direction.Up

      point[0] = PENTA_SIDE - 1 - point[0]
      point[1] = SIDE - 1
    }
  }


  if (point[1] == SIDE && direction == Direction.Down) {
    if (point[0] < SIDE) {
      point[0] += DOUBLE_SIDE
    } else if (point[0] < DOUBLE_SIDE) {
      state.direction = Direction.Left

      point[1] = point[0]
      point[0] = width - 1
    } else {
      state.direction = Direction.Up

      point[0] = PENTA_SIDE - 1 - point[0]
      point[1] = height - 1
    }
  }


  if (point[1] == SIDE - 1 && direction == Direction.Up) {
    if (point[0] < SIDE) {
      state.direction = Direction.Down

      point[0] = SIDE - 1 - point[0]
      point[1] = 0
    } else if (point[0] < DOUBLE_SIDE) {
      state.direction = Direction.Right

      point[1] = point[0] - SIDE
      point[0] = 0
    } else {
      point[0] -= DOUBLE_SIDE
    }
  }
}
