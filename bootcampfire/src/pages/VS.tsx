import App from "components/VSGame/G3/components/App/App";
import styled from "styled-components";

import { RootState } from "store";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { loadGameRank,loadMyRank } from "store/vsSlice";
import axios from "axios";

export default function VS() {
  const { GameRank10, myGameRank } = useSelector((state: RootState) => state.vs)
  const { isLoggedIn } = useSelector((state: RootState) => state.auth)
  // console.log(myGameRank, isLoggedIn)
  const dispatch = useDispatch();


  let flag = myGameRank.rank;
  useEffect(() => {
    setTimeout(() => {
      if (isLoggedIn) {
        // console.log("조건문 안에 있다.")
        axios.get(`http://localhost:8080/games/my-rank`).then((response)=>{dispatch(loadMyRank(response.data.data))})
        axios.get(`http://localhost:8080/games`).then((response)=>dispatch(loadGameRank(response.data.data)))
      }
    }, 1000);
  }, []);

  return (
    <div>
      <h1>VS</h1>
      
      <div>{myGameRank.score}</div>

      {GameRank10.length === 0 && <div>랭킹이없다옹</div>}

      {GameRank10.length != 0 && 
      <Container>
        {GameRank10.map((item, index) => (
          <RankItem key={index}>
            {item.rank}
            {item.userNickname}
            {item.bootcampName}
            {item.score}
            </RankItem>))}
      </Container>     
      }

      
      <div style={{ border: "2px solid red", padding: "10px" }}>
      <App/>
      </div>

    </div>
  );
}




const Container = styled.div`
  display: flex;
  flex-direction: column;
`;

const RankItem = styled.div`
  margin-bottom: 10px;
      display: flex;
    flex-direction: column;
    margin-left: 10px; /* 아이템 간 간격을 위한 여백 설정 */
  
`;
