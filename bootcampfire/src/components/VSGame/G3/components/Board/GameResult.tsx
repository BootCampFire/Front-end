import React from "react";
import Button from "../Button";
import { useGameContext } from "../Game";
import { GameStatus, Tile } from "../interfaces";

const DATA = {
  WIN: {
    message: "축하해요! 당신이 이겼어요",
    buttonText: "한 판 더",
    containerClass: "gameResultWin",
  },
  GAME_OVER: {
    message: "분발 하세요!",
    buttonText: "Try again",
    containerClass: "gameResultLose",
  },
};

const Result = (props: {
  isWin: boolean;
  onContinue: () => void;
  onRestart: () => void;
  playAfterWin: boolean;
  status: GameStatus;
}) => {
  const { isWin, onContinue, onRestart, playAfterWin } = props;
  const { message, buttonText, containerClass } =
    isWin || playAfterWin ? DATA.WIN : DATA.GAME_OVER;

  return (
    <div className={`gameResult ${containerClass}`}>
      <p>{message}</p>
      <div>
        {isWin && (
          <Button className="continueButton" onClick={() => onContinue()}>
            To be continue....
          </Button>
        )}
        <Button onClick={() => onRestart()}>{buttonText}</Button>
      </div>
    </div>
  );
};

const GameResultContainer = (props: { tiles: Tile[] }) => {

  const gameContext = useGameContext();

  if (!gameContext) {
    return null; // 또는 로딩 표시 등의 UI를 반환할 수 있음
  }
  const { gameState, dispatch } = gameContext;

  const { status } = gameState;

  const handleContinue = () => {
    dispatch({ type: "continue" });
  };

  const handleRestart = () => {
    dispatch({ type: "restart" });
  };

  const playAfterWin = props.tiles.some((x) => x.value === 2048);
  return (
    <>
      {status !== "IN_PROGRESS" && status !== "PLAY_AFTER_WIN" && (
        <Result
          isWin={status === "WIN"}
          playAfterWin={playAfterWin}
          onRestart={handleRestart}
          onContinue={handleContinue}
          status={status}
        />
      )}
    </>
  );
};

export default GameResultContainer;
