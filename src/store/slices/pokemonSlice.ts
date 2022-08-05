import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { Pokemon } from "@shared/models/pokemon.model";
import {
  getPokemonDetailService,
  getPokemonsService,
} from "@services/pokemon.service";
import { MAX_POKEMONS_IN_BATTLE } from "@shared/constants";

interface PokemonState {
  pokemons: Pokemon[];
  pokemonsSearchList: Pokemon[];
  pokemonsCombatReady: Pokemon[];
  pokemonDetail: Pokemon | null;
  showAddPokemon: boolean;
}

const initialState: PokemonState = {
  pokemons: [],
  pokemonsSearchList: [],
  pokemonsCombatReady: [],
  pokemonDetail: null,
  showAddPokemon: true,
};

export const fetchPokemonsWithDetails = createAsyncThunk(
  "data/fetchPokemonsWithDetails",
  async (_, { dispatch }) => {
    // dispatch(setLoading(true));

    const data = await getPokemonsService();
    const pokemonWithDetails = await Promise.all(
      data.map((pokemon) => getPokemonDetailService(pokemon.name))
    );

    dispatch(setPokemons(pokemonWithDetails));
    // dispatch(setLoading(false));
  }
);

export const pokemonSlice = createSlice({
  name: "pokemon",
  initialState,
  reducers: {
    setPokemons: (state, action) => {
      state.pokemons = action.payload;
      state.pokemonsSearchList = action.payload;
    },
    addPokemonToBattle: (state, action) => {
      const index = state.pokemons.findIndex(
        (element) => element.id === action.payload
      );

      if (index >= 0) {
        const pokemon = state.pokemons[index];

        state.pokemonsCombatReady.push({ ...pokemon, initialIndex: index });
        state.pokemons.splice(index, 1);
      }

      if (state.pokemonsCombatReady.length === MAX_POKEMONS_IN_BATTLE) {
        state.showAddPokemon = false;
      }
    },
    removePokemonFromBattle: (state, action) => {
      const index = state.pokemonsCombatReady.findIndex(
        (element) => element.id === action.payload
      );

      if (index >= 0) {
        const pokemon = state.pokemonsCombatReady[index];

        state.pokemons.splice(pokemon.initialIndex!, 0, pokemon);
        state.pokemonsCombatReady.splice(index, 1);
      }

      if (state.pokemonsCombatReady.length < MAX_POKEMONS_IN_BATTLE) {
        state.showAddPokemon = true;
      }
    },
    searchPokemon: (state, action) => {
      const search = action.payload;

      const filteredPokemons = state.pokemonsSearchList.filter(
        (pokemon) =>
          pokemon.name.toLowerCase().includes(search?.toLowerCase()) &&
          !state.pokemonsCombatReady.some(
            (element) => element.id === pokemon.id
          )
      );

      state.pokemons = filteredPokemons;
    },
    getPokemonDetail: (state, action) => {
      const pokemon = state.pokemonsSearchList.find(
        (element) => element.id === action.payload
      );

      if (pokemon) {
        state.pokemonDetail = pokemon;
      }
    },
  },
});

export const {
  setPokemons,
  addPokemonToBattle,
  removePokemonFromBattle,
  searchPokemon,
  getPokemonDetail,
} = pokemonSlice.actions;

export default pokemonSlice.reducer;
