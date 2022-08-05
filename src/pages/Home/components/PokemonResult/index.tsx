import { FC } from "react";
import { useNavigate } from "react-router-dom";
import { PokemonCard } from "@components/index";
import { useAppDispatch } from "@shared/hooks/store";
import { Pokemon } from "@shared/models/pokemon.model";
import {
  addPokemonToBattle,
  getPokemonDetail,
  removePokemonFromBattle,
} from "@store/slices/pokemonSlice";

import styles from "./style.module.scss";

type Props = {
  pokemons: Pokemon[];
  isSelected: boolean;
  showAddIcon?: boolean;
};

const PokemonsResult: FC<Props> = ({
  pokemons,
  isSelected,
  showAddIcon = true,
}) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleIconClick = (id: number) => {
    dispatch(
      !isSelected ? addPokemonToBattle(id) : removePokemonFromBattle(id)
    );
  };

  const handleCardClick = (id: number) => {
    navigate(`/pokemon/${id}`);
    dispatch(getPokemonDetail(id));
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
          onCardClick={handleCardClick}
        />
      ))}
    </section>
  );
};

export default PokemonsResult;
