
import styled from "styled-components";
import BoardCard from "components/MyPage/BoardCard";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import type { Board } from "components/Board/interface";
import useIntersect from "components/Board/BoardList/useIntersect";

const url = "http://localhost:8080/boards/users";
const accessToken = localStorage.getItem("accessToken");

function MyPosts() {
  const navigate = useNavigate();
  const [boardList, setBoardList] = useState<Board[]>([]);
  const [pageCount, setPageCount] = useState(0);
  const [hasNext, setHasNext] = useState(true);

  const [_, setRef] = useIntersect(async(entry, observer) => {
    if (!hasNext) return ;
    let temp = await getDataFromAPI(pageCount, url);
    
    if (temp.last) {
        setHasNext(false);
    }

    if (pageCount === 0) {
        console.log("test", pageCount);
        console.log(temp.content)
        setBoardList(temp.content);
    } else {
      setBoardList(boardList.concat(temp.content));

    }
    setPageCount(pageCount + 1);
    observer.unobserve(entry.target)
}, {});


  const BoardList = boardList.map((element) => (
    <BoardCard data={element} onClick={() => navigate(`/BoardDetail:${element.id}`)} />
  ));

  return (
    <WrapperBoardListMain>
      <BoardListMain className="board-list-margin">
        {BoardList}
        <p style={{visibility: "hidden"}} ref={setRef}>is Loading</p>
      </BoardListMain>
    </WrapperBoardListMain>
  );
}

const WrapperBoardListMain = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
`

const BoardListMain = styled.div`
    display: flex;
    height: 760px;
    overflow: auto;
    flex-direction: column;
    justify-content: center;
    width: 100%;
    .board-list-margin {
        margin: 0 43px;
    }
`

const getDataFromAPI = async (pageCount: number, url: string) => {
  const response = await axios.get(`${url}?page=${pageCount}&size=5`, {
    headers: {
      Authorization: `Bearer ${accessToken}`
      // "Content-Type" : "appl"
    }});
  // const response = await axios.get(`${url}`);
  // console.log('response check', response);
  console.log("check", response.data.data)
  return response.data.data;
  // return Board[];
}

export default MyPosts;
