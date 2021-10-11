// EffectParameters represents the arguments given to an Effect needed to compute a yield
export interface EffectParameters {
  [key: string]: any
}

export interface EffectTargets {
  [key: string]: any
}

export interface EffectModifier<EffectParametersSubtype extends EffectParameters> {
  add: (options: EffectParametersSubtype) => number
  multiply: (options: EffectParametersSubtype) => number
}

export interface EffectResultModifier {
  add: number
  multiply: number
}
