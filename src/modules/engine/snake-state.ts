import { SIDE } from '@/constants'
import { Direction, Rotation, Point } from '@/types'

const center = Math.floor(SIDE / 2)

export const state: {
  snake: Point[]
  food: Point
  direction: Direction
  rotation: Rotation | null
} = {
  snake: [
    [center, center],
    [center - 1, center],
  ],
  food: [center + 1, center],
  direction: Direction.Right,
  rotation: null,
}
