const l = .4
const n = .1
// const third = 1 / 3

const vertexVariablesCount = 6
const vertexColorLength = 3

export const strideCount = vertexVariablesCount + vertexColorLength

const rectToTriangles = (rect: number[], color: number[]): number[] => {
  const rectPointsCount = 4

  const fillChunk = (_: unknown, chunkIndex: number) => {
    const takeItem = (_: unknown, itemIndex: number) =>
      rect[chunkIndex * vertexVariablesCount + itemIndex]

    return Array.from({ length: vertexVariablesCount }).map(takeItem)
  }

  const [a0, a1, a2, a3] = Array.from({ length: rectPointsCount })
    .map(fillChunk)
    .map(chunk => [...chunk, ...color])

  return [...a0, ...a1, ...a2, ...a0, ...a3, ...a1]
}

const rawPoints: number[] = [
  // pos(X Y Z), normal(X Y Z), texture(S, T), color(R, G, B)

  // FRONT (1) PURPLE
  ...rectToTriangles([
    -l, -l, l, -n, -n, 1,
    l, l, l, n, n, 1,
    -l, l, l, -n, n, 1,
    l, -l, l, n, -n, 1,
  ], [1, .9, 1]),

  // RIGHT (2) RED
  ...rectToTriangles([
    l, -l, l, 1, -n, n,
    l, l, -l, 1, n, -n,
    l, l, l, 1, n, n,
    l, -l, -l, 1, -n, -n,
  ], [1, .95, .95]),

  // BACK (3) GREEN
  ...rectToTriangles([
    l, -l, -l, n, -n, -1,
    -l, l, -l, -n, n, -1,
    l, l, -l, n, n, -1,
    -l, -l, -l, -n, -n, -1,
  ], [.95, 1, .95]),

  // TOP (4) BLUE
  ...rectToTriangles([
    l, l, -l, n, 1, -n,
    -l, l, l, -n, 1, n,
    l, l, l, n, 1, n,
    -l, l, -l, -n, 1, -n,
  ], [.95, .95, 1]),

  // LEFT (5) YELLOW
  ...rectToTriangles([
    -l, l, -l, -1, n, -n,
    -l, -l, l, -1, -n, n,
    -l, l, l, -1, n, n,
    -l, -l, -l, -1, -n, -n,
  ], [1, 1, .9]),

  // DOWN (6) CYAN
  ...rectToTriangles([
    -l, -l, -l, -n, -1, -n,
    l, -l, l, n, -1, n,
    -l, -l, l, -n, -1, n,
    l, -l, -l, n, -1, -n,
  ], [.9, 1, 1]),
]

export const points = new Float32Array(rawPoints)
