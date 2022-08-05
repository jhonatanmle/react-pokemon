import { useAppSelector } from "@src/shared/hooks";
import { Empty } from "antd";
import { PokemonsResult } from "@components/index";
import styles from "./styles.module.scss";

const BattleZone = () => {
  const pokemonsCombatReady = useAppSelector(
    (state) => state.pokemon.pokemonsCombatReady
  );

  return (
    <section className={styles.pokemonsCombatReady}>
      <h2 className={styles.pokemonsCombatReadyTitle}>
        Listos para el combate
      </h2>
      {pokemonsCombatReady?.length > 0 ? (
        <PokemonsResult pokemons={pokemonsCombatReady} isSelected />
      ) : (
        <div className={styles.empty}>
          <Empty description="Lista vacia no hay ningun pokemon listo" />
        </div>
      )}
    </section>
  );
};

export default BattleZone;
