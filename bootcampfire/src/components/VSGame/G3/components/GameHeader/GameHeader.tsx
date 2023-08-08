import React from "react";
import Button from "../Button";
import { useGameContext } from "../Game";
import ScoresContainer from "../ScoresContainer";

import "./GameHeader.scss";

const GameTitle = () => <span className="gameTitle">2048</span>;

const GameDescription = () => {
  return (
    <div>
      <span> 배고파요 <b>2048</b>!</span>      
    </div>
  );
};

export const GameHeader = () => {
  const gameContext = useGameContext();

  if (!gameContext) {
    return null;
  }
  const { dispatch } = gameContext;

  return (
    <div className="header">
      <div className="gameIntro">
        <GameTitle />
        <GameDescription />
      </div>
      <div className="actions">
        <ScoresContainer />
        <Button
          id="restartGameBtn"
          onClick={(_) => dispatch({ type: "restart" })}
        >
          새로운 게임
        </Button>
      </div>
    </div>
  );
};
