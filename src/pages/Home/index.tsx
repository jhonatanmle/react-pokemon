import { Col, Empty, Row } from "antd";
import { useEffect } from "react";
import { Outlet } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "@shared/hooks/store";
import { fetchPokemonsWithDetails } from "@store/slices/pokemonSlice";
import PokemonList from "./components/PokemonResult";

import styles from "./styles.module.scss";

const Home = () => {
  const pokemonsCombatReady = useAppSelector(
    (state) => state.pokemon.pokemonsCombatReady
  );
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchPokemonsWithDetails());
  }, []);

  return (
    <div>
      <Row gutter={[0, 24]}>
        <Col
          span={24}
          md={{
            span: 16,
          }}
        >
          <Outlet />
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
