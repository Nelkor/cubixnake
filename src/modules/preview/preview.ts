import { startListeningKeyboard } from '@steering/keyboard-control'
import { startListeningMouse } from '@steering/mouse-control'
import { startTicking } from '@engine/ticker'
import { startPainting } from '@view-3d/view'

const element = document.querySelector('#preview')!

const hide = (): void => {
  element.classList.add('hidden')
  element.removeEventListener('mouseup', hide)

  startListeningKeyboard()
  startListeningMouse()
  startTicking()
  startPainting()
}

export const enablePreview = (): void => {
  element.addEventListener('mouseup', hide)
}
