import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Character } from '@/models'
import { CHARACTERS_GENDERS_DICTIONARY, CHARACTERS_SPECIES_DICTIONARY, CHARACTERS_STATUS_DICTIONARY } from '@/utils'
import Image from 'next/image'

interface CharacterCardProps {
  character: Character
}

function CharacterCard({ character }: CharacterCardProps) {
  return (
    <Card className='h-full'>
      <CardHeader>
        <div className='relative aspect-square'>
          <Image className='rounded-xl object-cover' src={character.image} alt={character.name} fill sizes='50vw' />
        </div>
        <CardTitle>{character.name}</CardTitle>
        <CardDescription>
          {CHARACTERS_STATUS_DICTIONARY[character.status]} - {CHARACTERS_SPECIES_DICTIONARY[character.species]}
        </CardDescription>
      </CardHeader>
      <CardContent className='flex flex-wrap items-center gap-2'>
        <Badge variant='outline'>{CHARACTERS_GENDERS_DICTIONARY[character.gender]}</Badge>
        <Badge variant='outline'>{character.origin.name}</Badge>
        <Badge variant='outline'>{character.location.name}</Badge>
      </CardContent>
    </Card>
  )
}

export { CharacterCard }
