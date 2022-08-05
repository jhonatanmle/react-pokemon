export interface Pokemon {
  id: number;
  name: string;
  url: string;
  sprites: PokemonSprite;
  initialIndex?: number;
}

interface PokemonSprite {
  front_default: string;
}
