import { Navigate } from "react-router-dom";
import Home from "@pages/Home";
import { lazy, Suspense } from "react";
import { Skeleton } from "antd";

export const PokemonList = lazy(() => import("@pages/PokemonList"));
export const PokemonDetail = lazy(() => import("@pages/PokemonDetail"));

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
        element: (
          <Suspense fallback={<Skeleton active />}>
            <PokemonList />
          </Suspense>
        ),
      },
      {
        path: paths.pokemonDetails,
        element: (
          <Suspense fallback={<Skeleton active />}>
            <PokemonDetail />
          </Suspense>
        ),
      },
    ],
  },
  { path: "*", element: <Navigate to={paths.home} /> },
];
