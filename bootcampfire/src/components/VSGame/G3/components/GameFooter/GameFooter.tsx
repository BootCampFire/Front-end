import React from "react";
import { isMobile } from "../../utils/utils";
import { SectionProps } from "./Interfaces";

const Section = (props: SectionProps) => {
  return (
    <div id={props.id}>
      <h4>{props.title}</h4>
      {props.children}
      {props.bottomSeparator ? <hr /> : null}
    </div>
  );
};

const GameRules = () => {
  const text = isMobile(navigator.userAgent || navigator.vendor)
    ? "Swipe with your fingers to move the numbers."
    : "Use your arrow keys to move the numbers.";

  return (
    <Section
      id="howToPlaySection"
      title="게임 설명"
      bottomSeparator
    >
      <p>
        방향키 대충 돌리다 2048 맹글면 이기는 게임이에요.
      </p>
    </Section>
  );
};

const LearnMore = () => {
  return (
    <Section title="LEARN MORE">
      <p>
        This app is inspired by{" "}
        <a
          href="https://github.com/grigorzyapkov/2048game"
          target="_blank"
          rel="noreferrer"
        >
          Github repository
        </a>
        .
      </p>
    </Section>
  );
};

export const GameFooter = () => {
  return (
    <div>
      <GameRules />
      <LearnMore />
    </div>
  );
};
