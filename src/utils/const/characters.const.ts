import { CharacterGender, CharacterSpecies, CharacterStatus } from '@/models'

export const CHARACTERS_GENDERS_DICTIONARY = {
  [CharacterGender.Female]: 'Mujer',
  [CharacterGender.Male]: 'Hombre',
  [CharacterGender.Unknown]: 'Desconocido'
}

export const CHARACTERS_STATUS_DICTIONARY = {
  [CharacterStatus.Alive]: 'Vivo',
  [CharacterStatus.Dead]: 'Muerto',
  [CharacterStatus.Unknown]: 'Desconocido'
}

export const CHARACTERS_SPECIES_DICTIONARY = {
  [CharacterSpecies.Alien]: 'Alien',
  [CharacterSpecies.Human]: 'Humano'
}

export const CHARACTERS_GENDERS_LIST = Object.values(CharacterGender)
export const CHARACTERS_STATUS_LIST = Object.values(CharacterStatus)
export const CHARACTERS_SPECIES_LIST = Object.values(CharacterSpecies)

export const KEY_QUERY_CHARACTER_NAME = 'name'
export const KEY_QUERY_CHARACTER_STATUS = 'status'
export const KEY_QUERY_CHARACTER_GENDER = 'gender'
export const KEY_QUERY_CHARACTER_SPECIES = 'species'
export const KEY_QUERY_CHARACTER_PAGE = 'page'
