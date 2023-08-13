import MissionBar from "../../components/VSGame/MissionBar";
import axios from "axios";
import MissionData from "components/VSGame/MissionData";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "store";
interface bootcampList {
  bootcampId: number;
  bootcampName: string;
}
export default function MissionPage() {
  const bootcampId = useSelector((state: RootState) => state.auth.bootcampId);
  const [myBootcamp, setBootcamp] = useState<bootcampList>(Object);
  axios.get(`${process.env.REACT_APP_API_URL}/names`).then((res) => {
    setBootcamp(res.data.data);
    console.log(res.data.data);
  });
  return (
    <div>
      <h3 style={{ marginTop: "20px" }}>{myBootcamp.bootcampName}</h3>
      <div style={{ display: "flex" }}>
        <span>
          <img src="vsCampFire.png" alt="" />
          <MissionBar />
        </span>
        <span>
          <div style={{ display: "flex" }}>
            <MissionData />
          </div>
        </span>
      </div>
      <div style={{ display: "flex" }}>
        <span style={{ marginLeft: "auto", marginRight: "auto" }}>
          <div>가장 불을 먼저 점화시킨 부트 캠프</div>
          <div
            style={{
              marginTop: "20px",
              borderBottom: "solid",
              marginLeft: "auto",
              color: "#94969B",
              marginBottom: "20px",
            }}
          ></div>
        </span>
        <span style={{ marginLeft: "auto", marginRight: "auto" }}>
          <div>가장 많이 문제를 푼 부트 캠프</div>
          <div
            style={{
              marginTop: "20px",
              borderBottom: "solid",
              marginLeft: "auto",
              color: "#94969B",
            }}
          ></div>
        </span>
      </div>
    </div>
  );
}
