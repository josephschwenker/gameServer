interface EffectResultValueOptions {
  add: number
  multiply: number
}

class EffectResultValue {
  options: EffectResultValueOptions
  constructor (
    options: EffectResultValueOptions
  ) {
    this.options = options
  }
}

export default EffectResultValue
