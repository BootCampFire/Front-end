import { useState } from "react";
import MainBoard from "components/VSGame/G2/components/mainBoard";
import { Game } from "components/VSGame/G3/components/Game/Game";
import App from "components/VSGame/G3/components/App/App";
export default function VS() {
  const [date, setDate] = useState<Date>(new Date());

  const handleRestart = () => {
    setDate(new Date());
  };
  return (
    <div>
      <h1>VS</h1>
      <div style={{ border: "2px solid red", padding: "10px" }}>
      {/* <GApp key={date.toISOString()} /> */}
      {/* <MainBoard /> */}
      <App/>
      </div>

    </div>
  );
}
