/* eslint-disable @typescript-eslint/indent */
'use client'
import { Button } from '@/components/ui/button'
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from '@/components/ui/command'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from '@/components/ui/dialog'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { useMyCharacters } from '@/hooks'
import { cn } from '@/lib/utils'
import { Character, CharacterGender, CharacterSpecies, CharacterStatus } from '@/models'
import {
  CHARACTERS_GENDERS_DICTIONARY,
  CHARACTERS_GENDERS_LIST,
  CHARACTERS_SPECIES_DICTIONARY,
  CHARACTERS_SPECIES_LIST,
  CHARACTERS_STATUS_DICTIONARY,
  CHARACTERS_STATUS_LIST,
  CharacterSchema,
  characterSchema
} from '@/utils'
import { zodResolver } from '@hookform/resolvers/zod'
import { CheckIcon, ChevronsUpDown, Loader2Icon } from 'lucide-react'
import Image from 'next/image'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'

interface CharacterModalProps {
  /**
   * The children components.
   */
  children: React.ReactNode
  /**
   * The character to edit.
   */
  character?: Character
  /**
   * Callback function to be called when the modal is closed.
   */
  onSuccess?: () => void
}

function CharacterModal({ children, character, onSuccess }: CharacterModalProps) {
  const [isOpenModal, setIsOpenModal] = useState(false)
  const { addCharacter, updateCharacter } = useMyCharacters()
  const form = useForm<CharacterSchema>({
    resolver: zodResolver(characterSchema),
    defaultValues: {
      name: character?.name ?? '',
      image: character?.image ?? '',
      status: character?.status ?? undefined,
      species: character?.species ?? undefined,
      gender: character?.gender ?? undefined,
      origin: {
        name: character?.origin?.name ?? ''
      },
      location: {
        name: character?.location?.name ?? ''
      }
    }
  })
  const { isSubmitting, isDirty } = form.formState

  /**
   * Handles form submission.
   * @param values - The form values.
   * @returns This function does not return a value.
   */
  const onSubmit = async (values: CharacterSchema) => {
    try {
      await new Promise((resolve) => setTimeout(resolve, 500))

      if (character) {
        updateCharacter({
          id: character.id,
          name: values.name,
          image: values.image,
          status: values.status,
          species: values.species,
          gender: values.gender,
          origin: { name: values.origin.name },
          location: { name: values.location.name }
        })
      } else {
        addCharacter({
          id: crypto.randomUUID(),
          name: values.name,
          image: values.image,
          status: values.status,
          species: values.species,
          gender: values.gender,
          origin: { name: values.origin.name },
          location: { name: values.location.name }
        })
      }

      toast.success(`¡El personaje se ${character ? 'ha editado' : 'ha creado'} correctamente!`)
      form.reset()
      setIsOpenModal(false)
      onSuccess?.()
    } catch (error) {
      toast.error(`¡Ocurrió un error al ${character ? 'editar' : 'crear'} el personaje, inténtalo de nuevo!`)
    }
  }

  return (
    <Dialog
      open={isOpenModal}
      onOpenChange={(state) => {
        setIsOpenModal(state)
        form.reset()
      }}
    >
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{character ? 'Edita el personaje' : 'Crea un nuevo personaje'}</DialogTitle>
          <DialogDescription>
            {character
              ? 'Completa la información para editar el personaje.'
              : 'Completa la información para crear un nuevo personaje. Puedes editar los datos después.'}
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className='grid gap-4 xsm:grid-cols-2'>
            <FormField
              control={form.control}
              name='name'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nombre</FormLabel>
                  <FormControl>
                    <Input placeholder='John Doe' {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='origin.name'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Origen</FormLabel>
                  <FormControl>
                    <Input placeholder='Earth' {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='location.name'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Ubicación</FormLabel>
                  <FormControl>
                    <Input placeholder='Citadel' {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='status'
              render={({ field }) => (
                <FormItem className='flex flex-col gap-y-2'>
                  <FormLabel>Estado</FormLabel>
                  <Popover modal>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          variant='outline'
                          role='combobox'
                          className={cn('justify-between', !field.value && 'text-muted-foreground')}
                        >
                          {field.value
                            ? CHARACTERS_STATUS_DICTIONARY[
                                CHARACTERS_STATUS_LIST.find((status) => status === field.value) as CharacterStatus
                              ]
                            : 'Selecciona un estado'}
                          <ChevronsUpDown className='ml-2 h-4 w-4 shrink-0 opacity-50' />
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className='p-0'>
                      <Command>
                        <CommandInput placeholder='Buscar estado...' />
                        <CommandList>
                          <CommandEmpty>Sin resultados.</CommandEmpty>
                          <CommandGroup>
                            {CHARACTERS_STATUS_LIST.map((status) => (
                              <CommandItem
                                keywords={[CHARACTERS_STATUS_DICTIONARY[status]]}
                                value={status}
                                key={status}
                                onSelect={() => {
                                  form.setValue('status', status, { shouldDirty: true, shouldValidate: true })
                                }}
                              >
                                {CHARACTERS_STATUS_DICTIONARY[status]}
                                <CheckIcon
                                  className={cn('ml-auto', status === field.value ? 'opacity-100' : 'opacity-0')}
                                />
                              </CommandItem>
                            ))}
                          </CommandGroup>
                        </CommandList>
                      </Command>
                    </PopoverContent>
                  </Popover>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='species'
              render={({ field }) => (
                <FormItem className='flex flex-col gap-y-2'>
                  <FormLabel>Especie</FormLabel>
                  <Popover modal>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          variant='outline'
                          role='combobox'
                          className={cn('justify-between', !field.value && 'text-muted-foreground')}
                        >
                          {field.value
                            ? CHARACTERS_SPECIES_DICTIONARY[
                                CHARACTERS_SPECIES_LIST.find((status) => status === field.value) as CharacterSpecies
                              ]
                            : 'Selecciona un especie'}
                          <ChevronsUpDown className='ml-2 h-4 w-4 shrink-0 opacity-50' />
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className='p-0'>
                      <Command>
                        <CommandInput placeholder='Buscar especie...' />
                        <CommandList>
                          <CommandEmpty>Sin resultados.</CommandEmpty>
                          <CommandGroup>
                            {CHARACTERS_SPECIES_LIST.map((species) => (
                              <CommandItem
                                keywords={[CHARACTERS_SPECIES_DICTIONARY[species]]}
                                value={species}
                                key={species}
                                onSelect={() => {
                                  form.setValue('species', species, { shouldDirty: true, shouldValidate: true })
                                }}
                              >
                                {CHARACTERS_SPECIES_DICTIONARY[species]}
                                <CheckIcon
                                  className={cn('ml-auto', species === field.value ? 'opacity-100' : 'opacity-0')}
                                />
                              </CommandItem>
                            ))}
                          </CommandGroup>
                        </CommandList>
                      </Command>
                    </PopoverContent>
                  </Popover>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='gender'
              render={({ field }) => (
                <FormItem className='flex flex-col gap-y-2'>
                  <FormLabel>Género</FormLabel>
                  <Popover modal>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          variant='outline'
                          role='combobox'
                          className={cn('justify-between', !field.value && 'text-muted-foreground')}
                        >
                          {field.value
                            ? CHARACTERS_GENDERS_DICTIONARY[
                                CHARACTERS_GENDERS_LIST.find((status) => status === field.value) as CharacterGender
                              ]
                            : 'Selecciona un género'}
                          <ChevronsUpDown className='ml-2 h-4 w-4 shrink-0 opacity-50' />
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className='p-0'>
                      <Command>
                        <CommandInput placeholder='Buscar estado...' />
                        <CommandList>
                          <CommandEmpty>Sin resultados.</CommandEmpty>
                          <CommandGroup>
                            {CHARACTERS_GENDERS_LIST.map((gender) => (
                              <CommandItem
                                keywords={[CHARACTERS_GENDERS_DICTIONARY[gender]]}
                                value={gender}
                                key={gender}
                                onSelect={() => {
                                  form.setValue('gender', gender, { shouldDirty: true, shouldValidate: true })
                                }}
                              >
                                {CHARACTERS_GENDERS_DICTIONARY[gender]}
                                <CheckIcon
                                  className={cn('ml-auto', gender === field.value ? 'opacity-100' : 'opacity-0')}
                                />
                              </CommandItem>
                            ))}
                          </CommandGroup>
                        </CommandList>
                      </Command>
                    </PopoverContent>
                  </Popover>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='image'
              render={({ field }) => (
                <FormItem className='col-span-full'>
                  <FormLabel>Imagen</FormLabel>
                  <FormControl>
                    <Input
                      type='file'
                      accept='image/*'
                      onChange={(ev) => {
                        const file = ev.target.files?.[0]
                        if (!file) return toast.error('¡No se ha seleccionado ningún archivo!')

                        field.onChange(URL.createObjectURL(file))
                      }}
                    />
                  </FormControl>
                  {field.value && (
                    <div className='relative aspect-video max-h-32 w-full'>
                      <Image src={field.value} alt='Imagen' className='rounded-xl object-cover' fill />
                    </div>
                  )}
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button
              className='col-span-full ml-auto mt-4 w-full max-w-44'
              type='submit'
              disabled={isSubmitting || !isDirty}
            >
              {isSubmitting && <Loader2Icon className='animate-spin' />}
              {character ? 'Guardar cambios' : 'Crear personaje'}
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}

export { CharacterModal }
