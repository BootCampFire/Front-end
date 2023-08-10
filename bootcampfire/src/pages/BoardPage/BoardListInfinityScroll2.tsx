import { useEffect, useRef, useState } from 'react';
import SearchBar from 'components/Board/BoardList/SearchBar';
import CategorySideBar from 'components/Board/BoardList/CategorySideBar';
import BoardCard from 'components/Board/BoardList/BoardCard';
import styled from 'styled-components';
import { StyledPage } from './styledPage';
import { useSelector } from 'react-redux';
import { RootState } from 'store';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Board } from 'components/Board/interface';
import useIntersect from 'components/Board/BoardList/useIntersect';
const API_URL = 'http://localhost:8080/categories';
const accessToken = localStorage.getItem("accessToken");

function BoardListInfinityScroll() {
    const navigate = useNavigate();
    const [selectCategory, setSelectCategory] = useState(1);
    const [boardListData, setBoardListData] = useState<Board[]>([]);
    const sort = useSelector((state: RootState) => state.search.sort);
    const keyword = useSelector((state: RootState) => state.search.keyword);
    const type = useSelector((state: RootState) => state.search.type);
    const [url, setUrl] = useState("");
    const [pageCount, setPageCount] = useState(0);
    const [hasNext, setHasNext] = useState(true);

    const handlerSelectCategory = ((id : number) => {
        setSelectCategory(id);
    })

    // keyword에 따른 렌더링
    useEffect(() => {
        if (keyword.length === 0) return;
        const completeURL = API_URL + `/${selectCategory}` + getURLByKeyword(keyword, type);
        getDataFromAPI(0, completeURL).then((res) => setBoardListData(res.content));
        setUrl(completeURL);
        setPageCount(1);
        setHasNext(true);
        console.log("keyword", url)
    }, [keyword]);

    // // sort 기준에 따른 렌더링
    useEffect(() => {
        const completeURL = API_URL + `/${selectCategory}` + getURLBySort(sort);
        getDataFromAPI(0, completeURL).then((res) => setBoardListData(res.content));
        setUrl(completeURL);
        setHasNext(true);
        setPageCount(1);
        console.log("sort", url)
    }, [selectCategory, sort]);    
    
    const [_, setRef] = useIntersect(async(entry, observer) => {
        if (!hasNext) return ;
        let temp = await getDataFromAPI(pageCount, url);
        
        if (temp.last) {
            setHasNext(false);
        }

        if (pageCount === 0) {
            console.log("test", pageCount);
            console.log(temp.content)
            setBoardListData(temp.content);
        } else {
            setBoardListData(boardListData.concat(temp.content));

        }
        setPageCount(pageCount + 1);
        observer.unobserve(entry.target)
    }, {});
    
    const BoardList = boardListData.map((element, idx) => (
        <BoardCard key={idx} 
            data={element} 
            onClick={() => navigate(`/BoardDetail/${element.id}`, {state: selectCategory})}/>
        // <BoardCard key={element.id} data={element} onClick={() => a(element.id)}/>
    ))

    return (
        <StyledPage className="test">
            <SearchBar selectCategory={selectCategory} setBoardList={setBoardListData}/> 
            <BoardListMain>
                <CategorySideBar selectCategory={selectCategory} onCategorySelect={handlerSelectCategory}/>
                <TStyledDiv>
                    <div className='board-list-margin'>
                    {BoardList}
                    </div>
                    <Sp ref={setRef}>is Loading</Sp>
                </TStyledDiv>
            </BoardListMain>
        </StyledPage>
    )
}

const TStyledDiv = styled.div`
    height: 730px;
    width: 800px;
    overflow: auto;
`
const Sp = styled.p`
    visibility: hidden;
`

const BoardListMain = styled.div`
    display: flex;
    justify-content: center;
    width: 100%;
    .board-list-margin {
        margin-left: 42px;
        width: 80%;
    }
`
const StyledDiv = styled.div`
    display: flex;
    width: 500px;
    height: 500px;
`

const getDataFromAPI = async (pageCount: number, url: string) => {
    const response = await axios.get(`${url}?page=${pageCount}&size=5`, {
        headers: {
            Authorization: `Bearer ${accessToken}`,
            "Content-Type": "application/json",
        }
    });
    // const response = await axios.get(`${url}`);
    // console.log('response check', response);
    console.log("check", response.data.data)
    return response.data.data;
    // return Board[];
}

const getURLByKeyword = (keyword: string, type: number) => {
    const keywordType = type === 0 ? "keywords" : "nickname";
    return `/${keywordType}/${keyword}`;
}

const getURLBySort = (sort: number) => {
    if (sort === 0) {
        return "";
    } else if (sort === 1) {
        return "/likes";
    } else {
        return "/views";
    }
}

export default BoardListInfinityScroll;