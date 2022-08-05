import { PokemonDetailStats } from "./pokemon-detail.model";

export interface Pokemon {
  id: number;
  name: string;
  url: string;
  sprites: PokemonSprite;
  height: number;
  types: PokemonType[];
  stats: PokemonStats[];
  isSelected: boolean;
  initialIndex?: number;
  formattedStats: PokemonDetailStats;
  formattedTypes: string;
}

interface PokemonSprite {
  front_default: string;
}

interface PokemonType {
  slot: number;
  type: Type;
}

interface Type {
  name: string;
  url: string;
}

interface PokemonStats {
  base_stat: number;
  effort: number;
  stat: Stat;
}

interface Stat {
  name: string;
}
