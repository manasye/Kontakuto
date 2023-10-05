import React, {
  ReactNode,
  createContext,
  useCallback,
  useContext,
} from "react";
import useLocalStorage from "../hooks/useLocalStorage";

interface FavoritesContextType {
  favoriteIds: number[];
  removeFavorite: (id: number) => void;
  addNewFavorite: (id: number) => void;
}

const FavoritesContext = createContext<FavoritesContextType | undefined>(
  undefined,
);

export const useFavoritesContext = () => {
  const context = useContext(FavoritesContext);
  if (context === undefined) {
    throw new Error(
      "useFavoritesContext must be used within a FavoritesProvider",
    );
  }
  return context;
};

export const FavoritesProvider: React.FC<{
  children: ReactNode;
}> = ({ children }) => {
  const [favoriteIds, setFavoriteIds] = useLocalStorage<number[]>(
    "favoriteIds",
    [],
  );

  const removeFavorite = useCallback(
    (id: number) => {
      const newFavs = favoriteIds.filter((favId) => favId !== id);
      setFavoriteIds(newFavs);
    },
    [favoriteIds, setFavoriteIds],
  );

  const addNewFavorite = useCallback(
    (id: number) => {
      setFavoriteIds([...favoriteIds, id]);
    },
    [favoriteIds, setFavoriteIds],
  );

  return (
    <FavoritesContext.Provider
      value={{ favoriteIds, removeFavorite, addNewFavorite }}
    >
      {children}
    </FavoritesContext.Provider>
  );
};

function withFavoritesContext<P>(Component: React.ComponentType<P>) {
  return function WrappedComponent(props: P & { children?: ReactNode }) {
    return (
      <FavoritesProvider>
        <Component {...props} />
      </FavoritesProvider>
    );
  };
}

export default withFavoritesContext;
