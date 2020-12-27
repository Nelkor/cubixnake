type Mat4 = {
  finalize(): Float32Array
  rotateX(angle: number): void
  rotateY(angle: number): void
  rotateZ(angle: number): void
}

type Mat4Array = number[]

const mul = (mat1: Mat4Array, mat2: Mat4Array): Mat4Array => {
  const result = []

  for (let i = 0; i < 16; i += 4) {
    for (let j = 0; j < 4; j++) {
      result.push(
        mat1[j] * mat2[i] +
        mat1[j + 4] * mat2[i + 1] +
        mat1[j + 8] * mat2[i + 2] +
        mat1[j + 12] * mat2[i + 3],
      )
    }
  }

  return result
}

const getSinCos = (angle: number): [
  number,
  number,
] => [
  Math.sin(angle),
  Math.cos(angle),
]

const rotateX = (mat: Mat4Array, angle: number): Mat4Array => {
  const [sin, cos] = getSinCos(angle)

  const turnMatrix = [
    1, 0, 0, 0,
    0, cos, sin, 0,
    0, -sin, cos, 0,
    0, 0, 0, 1,
  ]

  return mul(mat, turnMatrix)
}

const rotateY = (mat: Mat4Array, angle: number): Mat4Array => {
  const [sin, cos] = getSinCos(angle)

  const turnMatrix = [
    cos, 0, -sin, 0,
    0, 1, 0, 0,
    sin, 0, cos, 0,
    0, 0, 0, 1,
  ]

  return mul(mat, turnMatrix)
}

const rotateZ = (mat: Mat4Array, angle: number): Mat4Array => {
  const [sin, cos] = getSinCos(angle)

  const turnMatrix = [
    cos, sin, 0, 0,
    -sin, cos, 0, 0,
    0, 0, 1, 0,
    0, 0, 0, 1,
  ]

  return mul(mat, turnMatrix)
}

export const createMat4 = (): Mat4 => {
  const fudgeFactor = -.3

  // fudgeFactor * Z добавляется к W
  let value = [
    1, 0, 0, 0,
    0, 1, 0, 0,
    0, 0, 1, fudgeFactor,
    0, 0, 0, 1,
  ]

  return {
    finalize: () => new Float32Array(value),
    rotateX: angle => value = rotateX(value, angle),
    rotateY: angle => value = rotateY(value, angle),
    rotateZ: angle => value = rotateZ(value, angle),
  }
}
