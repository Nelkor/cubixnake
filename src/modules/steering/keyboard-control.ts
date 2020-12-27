import { Rotation } from '@/types'

import { state } from '@engine/snake-state'

const leftCodes = [
  'ArrowLeft',
  'KeyA',
]

const rightCodes = [
  'ArrowRight',
  'KeyD',
]

const onKeyDown = (keyEvent: KeyboardEvent): void => {
  if (leftCodes.includes(keyEvent.code)) {
    state.rotation = Rotation.Left
  }

  if (rightCodes.includes(keyEvent.code)) {
    state.rotation = Rotation.Right
  }
}

export const startListeningKeyboard = (): void => document
  .addEventListener('keydown', onKeyDown)
