import { Pokemon } from "@shared/models/pokemon.model";
import { httpClient } from "./config";

export const getPokemonsService = async (): Promise<Pokemon[]> => {
  try {
    const { data } = await httpClient.get("/pokemon?limit=151");

    return data.results;
  } catch (error) {
    console.error(error);
    return [];
  }
};

export const getPokemonDetailService = async (
  name: string
): Promise<Pokemon | null> => {
  try {
    const { data } = await httpClient.get(`/pokemon/${name}`);
    return data;
  } catch (error) {
    console.error(error);
    return null;
  }
};
