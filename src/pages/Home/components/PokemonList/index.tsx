import { FC } from "react";
import { PokemonCard } from "../../../../shared/components";
import { useAppDispatch, useAppSelector } from "../../../../shared/hooks/store";
import { Pokemon } from "../../../../shared/models/pokemon.model";
import {
  addPokemonToBattle,
  removePokemonFromBattle,
} from "../../../../store/slices/pokemonSlice";

import styles from "./style.module.scss";

type Props = {
  pokemons: Pokemon[];
  isSelected: boolean;
  showAddIcon?: boolean;
};

const PokemonList: FC<Props> = ({
  pokemons,
  isSelected,
  showAddIcon = true,
}) => {
  const dispatch = useAppDispatch();

  const handleIconClick = (id: number) => {
    dispatch(
      !isSelected ? addPokemonToBattle(id) : removePokemonFromBattle(id)
    );
  };

  return (
    <section className={styles.pokemonsContainer}>
      {pokemons.map((pokemon) => (
        <PokemonCard
          key={pokemon.id}
          id={pokemon.id}
          name={pokemon.name}
          image={pokemon.sprites.front_default}
          isSelected={isSelected}
          showIconButton={showAddIcon}
          onIconClick={handleIconClick}
        />
      ))}
    </section>
  );
};

export default PokemonList;
