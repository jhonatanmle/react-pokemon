import { Col, Row } from "antd";
import { useEffect, useState } from "react";
import { Searcher } from "@components/index";
import {
  useDebounce,
  useAppDispatch,
  useAppSelector,
} from "@shared/hooks/index";
import { searchPokemon } from "@store/slices/pokemonSlice";
import PokemonsResult from "@pages/Home/components/PokemonResult";
import styles from "./styles.module.scss";

const PokemonList = () => {
  const dispatch = useAppDispatch();
  const pokemons = useAppSelector((state) => state.pokemon.pokemons);
  const showAddPokemon = useAppSelector(
    (state) => state.pokemon.showAddPokemon
  );
  const [searchText, setSearchText] = useState("");
  const debouncedSearchText = useDebounce(searchText, 500);

  const handlerSearch = (value: string) => {
    setSearchText(value);
  };

  useEffect(() => {
    dispatch(searchPokemon(debouncedSearchText));
  }, [debouncedSearchText]);

  return (
    <>
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
      <PokemonsResult
        pokemons={pokemons}
        isSelected={false}
        showAddIcon={showAddPokemon}
      />
      ;
    </>
  );
};

export default PokemonList;
