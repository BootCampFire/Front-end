import { useEffect, useState } from 'react';
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

const API_URL = 'http://localhost:8080/categories';

function BoardListPage() {
    // Main Page와 연결했을 경우 ->>
    // const {state} = useLocation();
    // const [selectCategory, setSelectCategory] = useState(state.categoryId);
    const navigate = useNavigate();
    const [selectCategory, setSelectCategory] = useState(1);
    const [boardListData, setBoardListData] = useState<Board[]>([]);
    const sort = useSelector((state: RootState) => state.search.sort);
    const keyword = useSelector((state: RootState) => state.search.keyword);
    const type = useSelector((state: RootState) => state.search.type);
    const handlerSelectCategory = ((id : number) => {
        setSelectCategory(id);
    })

    // keyword에 따른 렌더링
    useEffect(() => {
        if (keyword.length === 0) return ;        
        const keywordType = type === 0 ? "keywords" : "nickname"; 
        axios.get(API_URL + `/${selectCategory}/${keywordType}/${keyword}`)
        .then((res) => {setBoardListData(res.data.data.content);
        });
    }, [keyword]);

    // // sort 기준에 따른 렌더링
    useEffect(() => {
        if (sort === 0) {
            console.log(API_URL + `/${selectCategory}`)
            axios.get(API_URL + `/${selectCategory}?page=0&size=5`)
            .then((res) => {
                console.log(res)
                setBoardListData(res.data.data.content);
            });
            return ;
        }
        let sortType = "";
        if (sort === 1) {
            sortType = "likes";
        } else if (sort === 2) {
            sortType = "views";
        }
        // axios.get(API_URL + `/${selectCategory}/${sortType}`)
        // .then((res) => setBoardListData(res.data.data.content));
    }, [selectCategory, sort]);
    const BoardList = boardListData.map((element) => (
        <BoardCard key={element.id} 
            data={element} 
            onClick={() => navigate(`/BoardDetail/${element.id}`, {state: selectCategory})}/>
        // <BoardCard key={element.id} data={element} onClick={() => a(element.id)}/>
    ))

    return (
        <StyledPage className="test">
            <SearchBar selectCategory={selectCategory} setBoardList={setBoardListData}/> 
            <BoardListMain>
                <CategorySideBar selectCategory={selectCategory} onCategorySelect={handlerSelectCategory}/>
                <div className='board-list-margin'>
                {BoardList}
                </div>
            </BoardListMain>
        </StyledPage>
    )
}

const BoardListMain = styled.div`
    display: flex;
    justify-content: center;
    width: 100%;
    .board-list-margin {
        margin-left: 42px;
        width: 80%;
    }
`
    
export default BoardListPage;

