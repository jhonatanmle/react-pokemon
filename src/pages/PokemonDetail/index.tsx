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
              <Descriptions.Item label="Tipo">
                {pokemon.formattedTypes}
              </Descriptions.Item>
              <Descriptions.Item label="Estadísticas base">
                Ataque:
                <ProgressBar value={pokemon.formattedStats.attack!} />
                <br />
                Defensa:
                <ProgressBar value={pokemon.formattedStats.defense!} />
                <br />
                Ataque especial:
                <ProgressBar value={pokemon.formattedStats.specialAttack!} />
                <br />
                Defensa especial:
                <ProgressBar value={pokemon.formattedStats.specialDefense!} />
                <br />
                Velocidad:
                <ProgressBar value={pokemon.formattedStats.speed!} />
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
