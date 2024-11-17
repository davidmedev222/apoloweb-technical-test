export interface Character {
  created: Date
  episode: string[]
  gender: CharacterGender
  id: number
  image: string
  location: CharacterLocation
  name: string
  origin: CharacterLocation
  species: CharacterSpecies
  status: CharacterStatus
  type: string
  url: string
}

export enum CharacterGender {
  Female = 'Female',
  Male = 'Male',
  Unknown = 'unknown'
}

export interface CharacterLocation {
  name: string
  url: string
}

export enum CharacterSpecies {
  Alien = 'Alien',
  Human = 'Human'
}

export enum CharacterStatus {
  Alive = 'Alive',
  Dead = 'Dead',
  Unknown = 'unknown'
}
