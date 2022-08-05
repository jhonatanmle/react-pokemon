import { Col, Empty, Row } from "antd";
import { useEffect, useState } from "react";
import { Searcher } from "../../shared/components";
import { useAppDispatch, useAppSelector } from "../../shared/hooks/store";
import useDebounce from "../../shared/hooks/use-debounce";
import {
  fetchPokemonsWithDetails,
  searchPokemon,
} from "../../store/slices/pokemonSlice";
import PokemonList from "./components/PokemonList";

import styles from "./styles.module.scss";

const Home = () => {
  const [searchText, setSearchText] = useState("");
  const debouncedSearchText = useDebounce(searchText, 500);
  const pokemons = useAppSelector((state) => state.pokemon.pokemons);
  const pokemonsCombatReady = useAppSelector(
    (state) => state.pokemon.pokemonsCombatReady
  );
  const showAddPokemon = useAppSelector(
    (state) => state.pokemon.showAddPokemon
  );
  const dispatch = useAppDispatch();

  const handlerSearch = (value: string) => {
    setSearchText(value);
  };

  useEffect(() => {
    dispatch(searchPokemon(debouncedSearchText));
  }, [debouncedSearchText]);

  useEffect(() => {
    console.log("Home");
    dispatch(fetchPokemonsWithDetails());
  }, []);

  return (
    <div>
      <Row gutter={[16, 24]}>
        <Col
          span={24}
          md={{
            span: 16,
          }}
        >
          <Row>
            <Col
              span={16}
              offset={4}
              md={{
                span: 8,
                offset: 8,
              }}
              className={styles.searchContainer}
            >
              <Searcher onSearch={handlerSearch} />
            </Col>
          </Row>
          <br />
          <PokemonList
            pokemons={pokemons}
            isSelected={false}
            showAddIcon={showAddPokemon}
          />
        </Col>
        <Col
          span={24}
          md={{
            span: 8,
          }}
        >
          <section className={styles.pokemonsCombatReady}>
            <h2 className={styles.pokemonsCombatReadyTitle}>
              Listos para el combate
            </h2>
            {pokemonsCombatReady?.length > 0 ? (
              <PokemonList pokemons={pokemonsCombatReady} isSelected />
            ) : (
              <div className={styles.empty}>
                <Empty description="Lista vacia no hay ningun pokemon listo" />
              </div>
            )}
          </section>
        </Col>
      </Row>
    </div>
  );
};

export default Home;
