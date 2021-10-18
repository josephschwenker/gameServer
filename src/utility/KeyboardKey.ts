import ValidKeyboardKey from './ValidKeyboardKey'

export type KeyboardKey = ValidKeyboardKey | undefined

export function keyboardKey (key: string): ValidKeyboardKey | undefined {
  const whitelist: string[] = [
    'a',
    'b',
    'c'
  ]
  if (whitelist.includes(key)) {
    return new ValidKeyboardKey(key)
  } else {
    return undefined
  }
}
