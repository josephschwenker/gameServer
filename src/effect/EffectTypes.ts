// EffectParameters represents the arguments given to an Effect needed to compute a yield.
export interface EffectParameters {
  readonly [key: string]: any
}

// EffectTargets represents the resource or statistic to which this effect confers a modifier. For example: food, minerals, attack, defense.
export interface EffectTargets {
  readonly [key: string]: any
}

export interface EffectModifier<EffectParametersSubtype extends EffectParameters> {
  readonly add: (options: EffectParametersSubtype) => number
  readonly multiply: (options: EffectParametersSubtype) => number
}

export interface EffectResultModifier {
  readonly add: number
  readonly multiply: number
}
