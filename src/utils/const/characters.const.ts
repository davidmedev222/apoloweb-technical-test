import { CharacterGender, CharacterSpecies, CharacterStatus } from '@/models'

/**
 * Dictionary of gender options.
 */
export const CHARACTERS_GENDERS_DICTIONARY = {
  [CharacterGender.Female]: 'Mujer',
  [CharacterGender.Male]: 'Hombre',
  [CharacterGender.Unknown]: 'Desconocido'
}

/**
 * Dictionary of status options.
 */
export const CHARACTERS_STATUS_DICTIONARY = {
  [CharacterStatus.Alive]: 'Vivo',
  [CharacterStatus.Dead]: 'Muerto',
  [CharacterStatus.Unknown]: 'Desconocido'
}

/**
 * Dictionary of species options.
 */
export const CHARACTERS_SPECIES_DICTIONARY = {
  [CharacterSpecies.Alien]: 'Alien',
  [CharacterSpecies.Human]: 'Humano'
}

/**
 * List of gender options.
 */
export const CHARACTERS_GENDERS_LIST = Object.values(CharacterGender)

/**
 * List of status options.
 */
export const CHARACTERS_STATUS_LIST = Object.values(CharacterStatus)

/**
 * List of species options.
 */
export const CHARACTERS_SPECIES_LIST = Object.values(CharacterSpecies)

/**
 * Key for the query string parameter for character.
 */
export const KEY_QUERY_CHARACTER_NAME = 'name'
export const KEY_QUERY_CHARACTER_STATUS = 'status'
export const KEY_QUERY_CHARACTER_GENDER = 'gender'
export const KEY_QUERY_CHARACTER_SPECIES = 'species'

/**
 * Minimum page size for the API.
 */
export const MIN_PAGE_SIZE = 1
