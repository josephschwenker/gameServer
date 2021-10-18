import { Effect } from '../Effect/Effect'
import Game from '../Game'
import KeyboardShortcut from '../utility/KeyboardShortcut'
import Progress from '../utility/Progress'
import { CommandParameters } from './CommandTypes'

abstract class Command<EffectParametersSubtype, EffectTargetsSubtype> {
  verb: string // Build Base
  gerund: string // Building Base
  icon: string
  shortcut: KeyboardShortcut
  effect: Effect<EffectParametersSubtype, EffectTargetsSubtype>
  commandParameters: CommandParameters
  isAvailable: (options: CommandParameters) => boolean
  do: (options: CommandParameters) => Game
  progress: (options: CommandParameters) => Progress

  constructor (
    options: {
      verb: string
      gerund: string
      icon: string
      shortcut: KeyboardShortcut
      effect: Effect<EffectParametersSubtype, EffectTargetsSubtype>
      commandParameters: CommandParameters
      available: (options: CommandParameters) => boolean
      do: (options: CommandParameters) => Game
      progress: (options: CommandParameters) => Progress
    }
  ) {
    this.verb = options.verb
    this.gerund = options.gerund
    this.icon = options.icon
    this.shortcut = options.shortcut
    this.effect = options.effect
    this.commandParameters = options.commandParameters
    this.isAvailable = options.available
    this.do = options.do
    this.progress = options.progress
  }

  status (): string {
    return `${this.gerund} (${this.progress(this.commandParameters).remainingTurns()} turns}`
  }
}

export default Command
