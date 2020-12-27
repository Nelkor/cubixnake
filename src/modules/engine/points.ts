import { Direction, Point } from '@/types'

import { correctPoint } from './correct-point'

export const createPointsComparator = (p1: Point) =>
  (p2: Point): boolean => p1[0] == p2[0] && p1[1] == p2[1]

export const move = (point: Point, direction: Direction): Point => {
  const newPoint: Point = [...point]

  switch (direction) {
    case Direction.Up:
      newPoint[1]--

      break
    case Direction.Right:
      newPoint[0]++

      break
    case Direction.Down:
      newPoint[1]++

      break
    case Direction.Left:
      newPoint[0]--

      break
  }

  correctPoint(newPoint, direction)

  return newPoint
}
