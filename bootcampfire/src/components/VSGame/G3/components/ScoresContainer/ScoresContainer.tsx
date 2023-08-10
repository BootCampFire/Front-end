import React, { useEffect } from "react";
import useGameLocalStorage from "../../hooks/useLocalStorage";
import { getMaxId } from "../../utils/boardUtils";
import { useGameContext } from "../Game/Game";
import { Tile } from "../interfaces";
import ScoreBox from "../ScoreBox";
import { ACTIONTYPE, ScoresState } from "./Interfaces";

import { RootState } from "store";
import { loadMyRank, loadGameRank } from "store/vsSlice";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { updateScore } from "store/vsSlice";

import "./ScoresContainer.scss";

export const ScoresContainer = () => {

  const { gameState } = useGameContext();
  
  const [state, dispatch] = useGameLocalStorage(
    "scores",
    initState(),
    stateReducer
  );

  useEffect(() => {
    dispatch({ type: "change", payload: gameState.tiles });
  }, [gameState.tiles, dispatch]);
  
  const { myGameRank } = useSelector((state: RootState) => state.vs)
  const {isLoggedIn} = useSelector((state: RootState) => state.auth)
  const dispatch2 = useDispatch();

  // GAME_OVER
  useEffect(() => {
      setTimeout(() => {
        if (myGameRank.score < state.bestScore) {
          // console.log("0.9 초후 값 : ",myGameRank.score, state.bestScore)
          dispatch2(updateScore(Math.max(myGameRank.score, state.bestScore)));
          if (isLoggedIn && state.score > 1000) {
            axios.post(`http://localhost:8080/games`, {bestScore : state.bestScore})
            .then((response) => { console.log("성공공! : ", response)})
          }
            axios.get(`http://localhost:8080/games`)
            .then((response)=>dispatch2(loadGameRank(response.data.data)))          
        }
      }, 500);
      axios.get(`http://localhost:8080/games`)
          .then((response)=>dispatch2(loadGameRank(response.data.data))) 
  }, [gameState.status, state.bestScore]);

  

  useEffect(() => {
    
    if (state.newPoints > 0) {
      const oldAddScore = document.getElementById("additionScore");
      if (oldAddScore && oldAddScore.parentNode ) {
        oldAddScore.innerText = `+${state.newPoints}`;
        const newAddScore = oldAddScore.cloneNode(true);
        oldAddScore.parentNode.replaceChild(newAddScore, oldAddScore);
      }
    }
  }, [state]);

  return (
    <div className="scoresContainer">
      <div style={{ position: "relative" }}>
        <ScoreBox title="현재 점수" score={state.score} />
        <div className="addScore" id="additionScore"></div>
      </div>

      <ScoreBox title="최고점수" score={state.bestScore} />
    </div>
  );
};

const initState = (tiles: Tile[] = []): ScoresState => {
  return {
    score: 0,
    newPoints: 0,
    bestScore: 0,
    tiles,
  };
};

const containsTile = (tiles: Tile[], tile: Tile): boolean => {
  return tiles.some((t) => t.id === tile.id);
};

const stateReducer = (state: ScoresState, action: ACTIONTYPE) => {
  switch (action.type) {
    case "change": {
      const tiles = action.payload;

      // handles page refresh
      if (
        state.tiles.length === tiles.length &&
        state.tiles.every((t) => containsTile(tiles, t))
      ) {
        return state;
      }

      // handles restart
      if (
        tiles.length === 2 &&
        [1, 2].every((id) => tiles.find((tile) => tile.id === id)) &&
        !state.tiles.every((t) => containsTile(tiles, t))
      ) {
        return { ...initState(tiles), bestScore: state.bestScore };
      }

      // handles add new tile
      if (
        state.tiles.every((t) => containsTile(tiles, t)) &&
        tiles.length === state.tiles.length + 1
      ) {
        return { ...state, tiles: tiles, newPoints: 0 };
      }

      // handles merge
      const lastGeneratedTileId = getMaxId(tiles);
      const newPoints = tiles.reduce((acc: number, curr: Tile) => {
        const add =
          curr.id === lastGeneratedTileId || containsTile(state.tiles, curr)
            ? 0
            : curr.value;
        return acc + add;
      }, 0);

      const score = state.score + newPoints;
      const bestScore = Math.max(score, state.bestScore);
      
      return { tiles, newPoints, score, bestScore };
    }
    default: {
      throw new Error(`Unhandled action type: ${action.type}`);
    }
  }
};

