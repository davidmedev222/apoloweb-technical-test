export interface Character {
  /**
   * The date and time the character was created.
   */
  created?: Date
  /**
   * The episode(s) the character appeared in.
   */
  episode?: string[]
  /**
   * The gender of the character.
   */
  gender: CharacterGender
  /**
   * The unique identifier of the character.
   */
  id: string
  /**
   * The URL of the character's image.
   */
  image: string
  /**
   * The location of the character.
   */
  location: CharacterLocation
  /**
   * The name of the character.
   */
  name: string
  /**
   * The location of the character's origin.
   */
  origin: CharacterLocation
  /**
   * The species of the character.
   */
  species: CharacterSpecies
  /**
   * The status of the character.
   */
  status: CharacterStatus
  /**
   * The type of the character.
   */
  type?: string
  /**
   * The URL of the character's page on the website.
   */
  url?: string
}

/**
 * Gender of a character.
 */
export enum CharacterGender {
  Female = 'Female',
  Male = 'Male',
  Unknown = 'unknown'
}

export interface CharacterLocation {
  /**
   * The name of the location.
   */
  name: string
  /**
   * The URL of the location's page on the website.
   */
  url?: string
}

/**
 * Species of a character.
 */
export enum CharacterSpecies {
  Alien = 'Alien',
  Human = 'Human'
}

/**
 * Status of a character.
 */
export enum CharacterStatus {
  Alive = 'Alive',
  Dead = 'Dead',
  Unknown = 'unknown'
}
