import React, { useEffect, useReducer } from "react";

const GAME_ID = "2048game";

const useStateReducer = (
  prevState: any,
  newState: any | ((prevState: any) => any)
) => {
  return typeof newState === "function" ? newState(prevState) : newState;
};

const getInitialValue = (key: string, defaultValue: any) => {
  try {
    const gameStateStr = window.localStorage.getItem(GAME_ID);
    const gameState = gameStateStr ? JSON.parse(gameStateStr) : null;
    const value = gameState?.[key];
    return value ?? defaultValue;
  } catch (error) {
    // Handle error
    return defaultValue;
  }
};


function useGameLocalStorage<T>(
  key: string,
  defaultValue: T,
  reducer = useStateReducer
): [T, React.Dispatch<any>] {
  const [value, dispatch] = useReducer(
    reducer,
    getInitialValue(key, defaultValue)
  );

  useEffect(() => {
    const gameStateStr = window.localStorage.getItem(GAME_ID);
    if (gameStateStr !== null) {
      let state = JSON.parse(gameStateStr);
      state[key] = value;
      window.localStorage.setItem(GAME_ID, JSON.stringify(state));
    }
  }, [value, key]);

  return [value, dispatch];
}

export default useGameLocalStorage;
