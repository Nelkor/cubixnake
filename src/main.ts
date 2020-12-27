import './main.scss'

import { startListeningKeyboard } from '@steering/keyboard-control'
import { startListeningMouse } from '@steering/mouse-control'
import { startTicking } from '@engine/ticker'
import { startPainting } from '@view-3d/view'

startListeningKeyboard()
startListeningMouse()
startTicking()
startPainting()
