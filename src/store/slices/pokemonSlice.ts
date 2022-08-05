import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { Pokemon } from "@shared/models/pokemon.model";
import {
  getPokemonDetailService,
  getPokemonsService,
} from "@services/pokemon.service";
import { MAX_POKEMONS_IN_BATTLE } from "@shared/constants";

interface PokemonState {
  pokemons: Pokemon[];
  pokemonsCompleteList: Pokemon[];
  pokemonsCombatReady: Pokemon[];
  pokemonDetail: Pokemon | null;
  showAddPokemon: boolean;
  isLoading: boolean;
}

const initialState: PokemonState = {
  pokemons: [],
  pokemonsCompleteList: [],
  pokemonsCombatReady: [],
  pokemonDetail: null,
  showAddPokemon: true,
  isLoading: false,
};

const formatPokemonStats = (pokemon: Pokemon) => {
  return pokemon.stats.reduce((acc, cur) => {
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
  }, {});
};

const formatPokemonTypes = (pokemon: Pokemon) => {
  return pokemon.types.map((element) => element.type.name).join(", ");
};

export const fetchPokemonsWithDetails = createAsyncThunk(
  "data/fetchPokemonsWithDetails",
  async (_, { dispatch }) => {
    dispatch(setLoading(true));

    const data = await getPokemonsService();
    const pokemonWithDetails = await Promise.all(
      data.map((pokemon) => getPokemonDetailService(pokemon.name))
    );

    const pokemonsFormatted = pokemonWithDetails.map((element) => {
      return {
        ...element,
        formattedStats: formatPokemonStats(element!),
        formattedTypes: formatPokemonTypes(element!),
      };
    });

    dispatch(setPokemons(pokemonsFormatted));
    dispatch(setLoading(false));
  }
);

export const pokemonSlice = createSlice({
  name: "pokemon",
  initialState,
  reducers: {
    setPokemons: (state, action) => {
      state.pokemons = action.payload;
      state.pokemonsCompleteList = action.payload;
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

      const filteredPokemons = state.pokemonsCompleteList.filter(
        (pokemon) =>
          pokemon.name.toLowerCase().includes(search?.toLowerCase()) &&
          !state.pokemonsCombatReady.some(
            (element) => element.id === pokemon.id
          )
      );

      state.pokemons = filteredPokemons;
    },
    getPokemonDetail: (state, action) => {
      const pokemon = state.pokemonsCompleteList.find(
        (element) => element.id === action.payload
      );

      if (pokemon) {
        state.pokemonDetail = pokemon;
      }
    },
    setLoading: (state, action) => {
      state.isLoading = action.payload;
    },
  },
});

export const {
  setPokemons,
  addPokemonToBattle,
  removePokemonFromBattle,
  searchPokemon,
  getPokemonDetail,
  setLoading,
} = pokemonSlice.actions;

export default pokemonSlice.reducer;
