import { Navigate } from "react-router-dom";
import Home from "@pages/Home";
import PokemonDetail from "@pages/PokemonDetail";
import PokemonList from "@pages/PokemonList";

export const paths = {
  home: "",
  pokemons: "pokemons",
  pokemonDetails: "pokemon/:id",
};

export const routes = [
  {
    path: "",
    element: <Navigate to={paths.home} />,
  },
  {
    path: paths.home,
    element: <Home />,
    children: [
      {
        index: true,
        element: <Navigate to={paths.pokemons} />,
      },
      {
        path: paths.pokemons,
        element: <PokemonList />,
      },
      {
        path: paths.pokemonDetails,
        element: <PokemonDetail />,
      },
    ],
  },
  { path: "*", element: <Navigate to={paths.home} /> },
];
