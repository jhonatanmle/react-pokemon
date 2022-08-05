import { ArrowLeftOutlined, LoadingOutlined } from "@ant-design/icons";
import { Button, Descriptions, Image, Spin } from "antd";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { paths } from "@routes/index";
import { ProgressBar } from "@components/index";
import { useAppDispatch, useAppSelector } from "@shared/hooks/store";
import { PokemonDetailStats } from "@shared/models/pokemon-detail.model";
import {
  addPokemonToBattle,
  removePokemonFromBattle,
} from "@store/slices/pokemonSlice";

import styles from "./styles.module.scss";

const PokemonDetail = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const pokemon = useAppSelector((state) => state.pokemon.pokemonDetail);
  const showAddPokemon = useAppSelector(
    (state) => state.pokemon.showAddPokemon
  );
  const isSelected = useAppSelector((state) =>
    state.pokemon.pokemonsCombatReady.some(
      (element) => element.id === pokemon!.id
    )
  );

  const typesString = pokemon?.types
    .map((element) => element.type.name)
    .join(", ");

  const pokemonStats: PokemonDetailStats = pokemon
    ? pokemon.stats.reduce((acc, cur) => {
        if (cur.stat.name === "attack") {
          return {
            ...acc,
            attack: cur.base_stat,
          };
        }

        if (cur.stat.name === "defense") {
          return {
            ...acc,
            defense: cur.base_stat,
          };
        }

        if (cur.stat.name === "special-attack") {
          return {
            ...acc,
            specialAttack: cur.base_stat,
          };
        }

        if (cur.stat.name === "special-defense") {
          return {
            ...acc,
            specialDefense: cur.base_stat,
          };
        }

        if (cur.stat.name === "speed") {
          return {
            ...acc,
            speed: cur.base_stat,
          };
        }

        return acc;
      }, {})
    : {};

  const handleButtonClick = () => {
    if (pokemon) {
      dispatch(
        !isSelected
          ? addPokemonToBattle(pokemon.id)
          : removePokemonFromBattle(pokemon.id)
      );
    }
  };

  const handleBackClick = () => {
    navigate(`../${paths.home}`);
  };

  useEffect(() => {
    if (!pokemon) {
      navigate(`../${paths.home}`);
    }
  }, []);

  return (
    <div className={styles.container}>
      <div className={styles.containerButtons}>
        <Button
          type="text"
          size="large"
          icon={<ArrowLeftOutlined />}
          onClick={handleBackClick}
        >
          Volver
        </Button>

        {pokemon && !isSelected ? (
          showAddPokemon ? (
            <Button type="primary" onClick={handleButtonClick}>
              Agregar a la lista
            </Button>
          ) : null
        ) : (
          <Button type="default" danger onClick={handleButtonClick}>
            Eliminar de la lista
          </Button>
        )}
      </div>
      <div>
        {pokemon ? (
          <div>
            <div className={styles.containerImage}>
              <Image
                src={pokemon.sprites.front_default}
                preview={false}
                width={300}
                placeholder={
                  <div className={styles.spin}>
                    <Spin
                      indicator={
                        <LoadingOutlined style={{ fontSize: 24 }} spin />
                      }
                    />
                  </div>
                }
              />
            </div>
            <Descriptions title="Detalles del Pokemon" bordered>
              <Descriptions.Item label="Nombre">
                {pokemon.name}
              </Descriptions.Item>
              <Descriptions.Item label="Número">{pokemon.id}</Descriptions.Item>
              <Descriptions.Item label="Altura">
                {pokemon.height}
              </Descriptions.Item>
              <Descriptions.Item label="Tipo">{typesString}</Descriptions.Item>
              <Descriptions.Item label="Estadísticas base">
                Ataque:
                <ProgressBar value={pokemonStats.attack!} />
                <br />
                Defensa:
                <ProgressBar value={pokemonStats.defense!} />
                <br />
                Ataque especial:
                <ProgressBar value={pokemonStats.specialAttack!} />
                <br />
                Defensa especial:
                <ProgressBar value={pokemonStats.specialDefense!} />
                <br />
                Velocidad:
                <ProgressBar value={pokemonStats.speed!} />
                <br />
              </Descriptions.Item>
            </Descriptions>
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default PokemonDetail;
