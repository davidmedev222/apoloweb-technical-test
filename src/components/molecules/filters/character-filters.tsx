'use client'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from '@/components/ui/command'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { useQueryString } from '@/hooks'
import { cn } from '@/lib/utils'
import {
  CHARACTERS_GENDERS_DICTIONARY,
  CHARACTERS_GENDERS_LIST,
  CHARACTERS_SPECIES_DICTIONARY,
  CHARACTERS_SPECIES_LIST,
  CHARACTERS_STATUS_DICTIONARY,
  CHARACTERS_STATUS_LIST,
  KEY_QUERY_CHARACTER_GENDER,
  KEY_QUERY_CHARACTER_NAME,
  KEY_QUERY_CHARACTER_PAGE,
  KEY_QUERY_CHARACTER_SPECIES,
  KEY_QUERY_CHARACTER_STATUS
} from '@/utils'
import { BoomBox, CircleDotIcon, Disc3Icon } from 'lucide-react'
import { usePathname, useRouter } from 'next/navigation'
import { useState } from 'react'
import { useDebouncedCallback } from 'use-debounce'

function CharacterFilters() {
  const { removeAndToggleQueryString, removeQueryString, getQueryValue, hasQueryString } = useQueryString()
  const router = useRouter()
  const pathname = usePathname()

  const characterName = getQueryValue(KEY_QUERY_CHARACTER_NAME)
  const characterStatus = getQueryValue(KEY_QUERY_CHARACTER_STATUS)
  const characterSpecies = getQueryValue(KEY_QUERY_CHARACTER_SPECIES)
  const characterGender = getQueryValue(KEY_QUERY_CHARACTER_GENDER)
  const characterPage = getQueryValue(KEY_QUERY_CHARACTER_PAGE)

  const hasFilters = characterName || characterStatus || characterSpecies || characterGender || characterPage

  const [searchCharacterName, setSearchCharacterName] = useState(characterName || '')

  /**
   * Debounced function for handling character name changes.
   * @param value - The new value of the character name.
   */
  const debouncedCharacterName = useDebouncedCallback((value) => {
    if (!value) return handleRemoveFilter(KEY_QUERY_CHARACTER_NAME)
    handleToggleFilter(KEY_QUERY_CHARACTER_NAME, value)
  }, 1000)

  /**
   * Handles removing a filter from the query string.
   * @param key - The key of the filter to remove.
   */
  const handleRemoveFilter = (key: string) => {
    router.push(`${pathname}?${removeQueryString(key)}`, { scroll: false })
  }

  /**
   * Handles toggling a filter in the query string.
   * @param key - The key of the filter to toggle.
   * @param value - The new value of the filter.
   */
  const handleToggleFilter = (key: string, value: string) => {
    router.push(`${pathname}?${removeAndToggleQueryString(KEY_QUERY_CHARACTER_PAGE, key, value)}`, { scroll: false })
  }

  /**
   * Handles resetting all filters.
   * @returns This function does not return a value.
   */
  const handleResetFilters = () => {
    setSearchCharacterName('')
    router.push(`${pathname}`, { scroll: false })
  }

  return (
    <div className='flex flex-wrap items-center gap-2'>
      <Input
        value={searchCharacterName}
        onChange={(event) => {
          setSearchCharacterName(event.target.value)
          debouncedCharacterName(event.target.value)
        }}
        className='max-w-screen-sm'
        placeholder='Buscar personaje por nombre...'
      />
      <Popover>
        <PopoverTrigger asChild>
          <Button
            className={cn('gap-x-1', hasQueryString(KEY_QUERY_CHARACTER_STATUS) && 'bg-accent text-accent-foreground')}
            variant='outline'
            size='sm'
          >
            <BoomBox size={16} /> Estado
            {hasQueryString(KEY_QUERY_CHARACTER_STATUS) && (
              <Badge className='text-2xs size-3.5 justify-center p-0'>1</Badge>
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent className='p-0' side='bottom' align='start'>
          <Command>
            <CommandInput placeholder='Buscar estado...' />
            <CommandList>
              <CommandEmpty>Sin resultados.</CommandEmpty>
              <CommandGroup>
                {CHARACTERS_STATUS_LIST.map((status) => (
                  <CommandItem
                    keywords={[CHARACTERS_STATUS_DICTIONARY[status]]}
                    key={status}
                    value={status}
                    onSelect={(value) => handleToggleFilter(KEY_QUERY_CHARACTER_STATUS, value)}
                    asChild
                  >
                    <Label className='justify-normal font-normal'>
                      <Checkbox defaultChecked={characterStatus === status} checked={characterStatus === status} />
                      <span className='truncate'>{CHARACTERS_STATUS_DICTIONARY[status]}</span>
                    </Label>
                  </CommandItem>
                ))}
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
      <Popover>
        <PopoverTrigger asChild>
          <Button
            className={cn('gap-x-1', hasQueryString(KEY_QUERY_CHARACTER_SPECIES) && 'bg-accent text-accent-foreground')}
            variant='outline'
            size='sm'
          >
            <Disc3Icon size={16} /> Especie
            {hasQueryString(KEY_QUERY_CHARACTER_SPECIES) && (
              <Badge className='text-2xs size-3.5 justify-center p-0'>1</Badge>
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent className='p-0' side='bottom' align='start'>
          <Command>
            <CommandInput placeholder='Buscar especie...' />
            <CommandList>
              <CommandEmpty>Sin resultados.</CommandEmpty>
              <CommandGroup>
                {CHARACTERS_SPECIES_LIST.map((species) => (
                  <CommandItem
                    keywords={[CHARACTERS_SPECIES_DICTIONARY[species]]}
                    key={species}
                    value={species}
                    onSelect={(value) => handleToggleFilter(KEY_QUERY_CHARACTER_SPECIES, value)}
                    asChild
                  >
                    <Label className='justify-normal font-normal'>
                      <Checkbox defaultChecked={characterSpecies === species} checked={characterSpecies === species} />
                      <span className='truncate'>{CHARACTERS_SPECIES_DICTIONARY[species]}</span>
                    </Label>
                  </CommandItem>
                ))}
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
      <Popover>
        <PopoverTrigger asChild>
          <Button
            className={cn('gap-x-1', hasQueryString(KEY_QUERY_CHARACTER_GENDER) && 'bg-accent text-accent-foreground')}
            variant='outline'
            size='sm'
          >
            <CircleDotIcon size={16} /> Género
            {hasQueryString(KEY_QUERY_CHARACTER_GENDER) && (
              <Badge className='text-2xs size-3.5 justify-center p-0'>1</Badge>
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent className='p-0' side='bottom' align='start'>
          <Command>
            <CommandInput placeholder='Buscar género...' />
            <CommandList>
              <CommandEmpty>Sin resultados.</CommandEmpty>
              <CommandGroup>
                {CHARACTERS_GENDERS_LIST.map((gender) => (
                  <CommandItem
                    keywords={[CHARACTERS_GENDERS_DICTIONARY[gender]]}
                    key={gender}
                    value={gender}
                    onSelect={(value) => handleToggleFilter(KEY_QUERY_CHARACTER_GENDER, value)}
                    asChild
                  >
                    <Label className='justify-normal font-normal'>
                      <Checkbox defaultChecked={characterGender === gender} checked={characterGender === gender} />
                      <span className='truncate'>{CHARACTERS_GENDERS_DICTIONARY[gender]}</span>
                    </Label>
                  </CommandItem>
                ))}
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
      {hasFilters && (
        <Button onClick={handleResetFilters} variant='ghost'>
          Restablecer filtros
        </Button>
      )}
    </div>
  )
}

export { CharacterFilters }
