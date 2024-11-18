'use client'
import { CharacterModal } from '@/components/organisms'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import { useMyCharacters } from '@/hooks'
import { Character } from '@/models'
import { CHARACTERS_GENDERS_DICTIONARY, CHARACTERS_SPECIES_DICTIONARY, CHARACTERS_STATUS_DICTIONARY } from '@/utils'
import { MoreVerticalIcon } from 'lucide-react'
import Image from 'next/image'
import { useState } from 'react'

interface MyCharacterCardProps {
  /**
   * The character to display.
   */
  character: Character
}

function MyCharacterCard({ character }: MyCharacterCardProps) {
  const { removeCharacter } = useMyCharacters()
  const [isOpenDropdown, setIsOpenDropdown] = useState(false)

  /**
   * Handles the closing of the dropdown menu.
   */
  const handleCloseDropdown = () => setIsOpenDropdown(false)

  return (
    <Card className='h-full'>
      <CardHeader>
        <div className='relative aspect-square'>
          <Image className='rounded-xl object-cover' src={character.image} alt={character.name} fill sizes='50vw' />
        </div>
        <CardTitle className='grid grid-cols-[1fr_auto] items-center gap-x-2'>
          <span className='truncate'>{character.name}</span>
          <DropdownMenu open={isOpenDropdown} onOpenChange={setIsOpenDropdown}>
            <DropdownMenuTrigger>
              <MoreVerticalIcon size={20} />
            </DropdownMenuTrigger>
            <DropdownMenuContent align='end'>
              <CharacterModal character={character} onSuccess={handleCloseDropdown}>
                <DropdownMenuItem onSelect={(ev) => ev.preventDefault()}>Editar</DropdownMenuItem>
              </CharacterModal>
              <DropdownMenuItem onSelect={() => removeCharacter(character.id)}>Eliminar</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </CardTitle>
        <CardDescription>
          {CHARACTERS_STATUS_DICTIONARY[character.status]} - {CHARACTERS_SPECIES_DICTIONARY[character.species]}
        </CardDescription>
      </CardHeader>
      <CardContent className='flex flex-wrap items-center gap-2'>
        <Badge className='line-clamp-1 break-all' variant='outline'>
          {CHARACTERS_GENDERS_DICTIONARY[character.gender]}
        </Badge>
        <Badge className='line-clamp-1 break-all' variant='outline'>
          {character.origin.name}
        </Badge>
        <Badge className='line-clamp-1 break-all' variant='outline'>
          {character.location.name}
        </Badge>
      </CardContent>
    </Card>
  )
}

export { MyCharacterCard }
