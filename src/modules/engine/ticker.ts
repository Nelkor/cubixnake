import { TICK_RATE } from '@/constants'
import { Direction, Rotation } from '@/types'

import { draw } from '@generator-2d/picture-painter'

import { state } from './snake-state'
import { createPointsComparator, move } from './points'
import { randomizeFood } from './random-food'

const delay = 1000 / TICK_RATE

const rotate = (direction: Direction, rotation: Rotation): Direction => {
  switch (direction) {
    case Direction.Left:
      return rotation == Rotation.Left ? Direction.Down : Direction.Up
    case Direction.Down:
      return rotation == Rotation.Left ? Direction.Right : Direction.Left
    case Direction.Right:
      return rotation == Rotation.Left ? Direction.Up : Direction.Down
    case Direction.Up:
      return rotation == Rotation.Left ? Direction.Left : Direction.Right
  }
}

const tick = (): void => {
  setTimeout(tick, delay)

  if (state.rotation !== null) {
    state.direction = rotate(state.direction, state.rotation)
    state.rotation = null
  }

  const head = move(state.snake[0], state.direction)
  const isEqualToHead = createPointsComparator(head)

  if (isEqualToHead(state.food)) {
    randomizeFood()
  } else {
    state.snake.pop()
  }

  const collision = state.snake.findIndex(isEqualToHead)

  if (collision != -1) {
    state.snake.length = collision
  }

  state.snake.unshift(head)

  draw()
}

export const startTicking = (): void => {
  tick()
}
