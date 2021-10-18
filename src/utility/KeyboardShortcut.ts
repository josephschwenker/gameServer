import ValidKeyboardKey from './ValidKeyboardKey'

class KeyboardShortcut {
  ctrl: boolean
  shift: boolean
  alt: boolean
  key: ValidKeyboardKey

  constructor (
    options: {
      ctrl: boolean
      shift: boolean
      alt: boolean
      key: ValidKeyboardKey
    }
  ) {
    this.ctrl = options.ctrl
    this.shift = options.shift
    this.alt = options.shift
    this.key = options.key
  }
}

export default KeyboardShortcut
