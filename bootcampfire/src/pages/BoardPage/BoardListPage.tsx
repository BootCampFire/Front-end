import { useEffect, useRef, useState } from 'react';
import SearchBar from 'components/Board/BoardList/SearchBar';
import CategorySideBar from 'components/Board/BoardList/CategorySideBar';
import BoardCard from 'components/Board/BoardList/BoardCard';
import styled, {keyframes} from 'styled-components';
import { StyledPage } from './styledPage';
import { useSelector } from 'react-redux';
import { RootState } from 'store';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';
import { Board } from 'components/Board/interface';
import useIntersect from 'components/Board/BoardList/useIntersect';
import LoginModal from 'components/Login/LoginModal';
import useGetHeader from 'constant/useGetHeader';
import SkeletonBoardCard from 'components/Board/BoardList/SkeletonBoardCard';

const API_URL = `${process.env.REACT_APP_API_URL}/categories`;
const accesToken = localStorage.getItem('Authorization');

function BoardListPage() {
    const index = useLocation().state as number ?? 1;
    const navigate = useNavigate();
    const sort = useSelector((state: RootState) => state.search.sort);
    const keyword = useSelector((state: RootState) => state.search.keyword);
    const type = useSelector((state: RootState) => state.search.type);
    const user = useSelector((state: RootState) => state.auth);
    const [selectCategory, setSelectCategory] = useState(index);
    const [boardListData, setBoardListData] = useState<Board[]>([]);
    const [isModalOpen, setModalOpen] = useState(false);
    const [url, setUrl] = useState("");
    const [pageCount, setPageCount] = useState(0);
    const [hasNext, setHasNext] = useState(true);
    const [isLoading, setIsLoding] = useState(true);

    const handlerSelectCategory = (id: number) => {
        if (id === 9 && !user.isLoggedIn) setModalOpen(true);
        else setSelectCategory(id);
      };
    
      const handleCloseModal = () => {
        // 모달 닫기 함수
        setModalOpen(false);
      };

    // keyword 변화 (검색 버튼 눌렀을 때)에 따른 반영
    useEffect(() => {
        if (keyword.length === 0) return;
        const completeURL = API_URL + `/${selectCategory}` + getURLByKeyword(keyword, type);
        getDataFromAPI(0, completeURL).then((res) => setBoardListData(res.content));
        setUrl(completeURL);
        setPageCount(1);
        setHasNext(true);

    }, [keyword]);

    // sort 및 selectCategory 변화에 따른 반영
    useEffect(() => {
        const completeURL = API_URL + `/${selectCategory}` + getURLBySort(sort);
        console.log("번호 확인", selectCategory)
        getDataFromAPI(0, completeURL).then((res) => setBoardListData(res.content));
        setUrl(completeURL);
        setHasNext(true);
        setPageCount(1);
        // setIsLoding(false);

    }, [selectCategory, sort]);    
    
    // 무한스크롤용 로직
    const [_, setRef] = useIntersect(async(entry, observer) => {
        if (!hasNext) return ;
        let temp = await getDataFromAPI(pageCount, url);
        
        if (temp.last) {
            setHasNext(false);
        }

        if (pageCount === 0) {
            setBoardListData(temp.content);
        } else {
            setBoardListData(boardListData.concat(temp.content));

        }
        setPageCount(pageCount + 1);
        observer.unobserve(entry.target)
    }, {});
    
    const BoardList = boardListData.map((element, idx) => (
        isLoading ? <SkeletonBoardCard /> :
        <BoardCard key={idx} data={element} 
            onClick={() => navigate(`/BoardDetail/${element.id}`, {state: selectCategory})}/>
    ))
    
    return (
        <StyledPage>
            <SearchBar selectCategory={selectCategory}/> 
            <BoardListMain>
                <CategorySideBar selectCategory={selectCategory} onCategorySelect={handlerSelectCategory}/>
                <TStyledDiv>
                    <div className='board-list-margin'>
                    {BoardList}
                    </div>
                    <Sp ref={setRef}>is Loading</Sp>
                </TStyledDiv>
            </BoardListMain>
            <LoginModal isModalOpen={isModalOpen} onClose={handleCloseModal} />
        </StyledPage>
    )
}

const loadingAnimation = keyframes`
  0% {
    background-position: -200%;
  }
  100% {
    background-position: 200%;
  }
`;

const TStyledDiv = styled.div`
    height: 730px;
    width: 100%;
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
        /* width: 80%; */
    }
`

const getDataFromAPI = async (pageCount: number, url: string) => {
    // boardList 받아오는 axios 요청
    const response = await axios.get(`${url}?page=${pageCount}&size=5`, {
        headers: {
            Authorization: `Bearer ${accesToken}`,
        },
        withCredentials : true
    });
    console.log(response)
    return response.data.data;
}

const getURLByKeyword = (keyword: string, type: number) => {
    // keyword에 따라 달라지는 쿼리문 조정
    const keywordType = type === 0 ? "keywords" : "nickname";
    return `/${keywordType}/${keyword}`;
}

const getURLBySort = (sort: number) => {
    // sort 상태에 따라 달라지는 쿼리문 조정
    if (sort === 0) {
        return "";
    } else if (sort === 1) {
        return "/likes";
    } else {
        return "/views";
    }
}

export default BoardListPage;