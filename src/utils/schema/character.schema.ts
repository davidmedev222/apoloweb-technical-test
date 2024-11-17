import { CharacterGender, CharacterSpecies, CharacterStatus } from '@/models'
import { z } from 'zod'

export const characterSchema = z.object({
  name: z.string().min(1, 'El nombre es obligatorio').min(2, {
    message: 'El nombre debe tener al menos 2 caracteres'
  }),
  image: z.string().min(1, 'La imagen es obligatoria'),
  status: z.nativeEnum(CharacterStatus, {
    required_error: 'El estado es obligatorio',
    invalid_type_error: 'El estado debe ser un valor válido'
  }),
  species: z.nativeEnum(CharacterSpecies, {
    required_error: 'La especie es obligatoria',
    invalid_type_error: 'La especie debe ser un valor válido'
  }),
  gender: z.nativeEnum(CharacterGender, {
    required_error: 'El género es obligatorio',
    invalid_type_error: 'El género debe ser un valor válido'
  }),
  origin: z.object({
    name: z.string().min(1, 'El nombre de origen es obligatorio').min(2, {
      message: 'El nombre de origen debe tener al menos 2 caracteres'
    })
  }),
  location: z.object({
    name: z.string().min(1, 'El nombre de ubicación es obligatorio').min(2, {
      message: 'El nombre de ubicación debe tener al menos 2 caracteres'
    })
  })
})

export type CharacterSchema = z.infer<typeof characterSchema>
