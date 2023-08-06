import React, { useRef, useState } from "react";
import styled from "styled-components";
import { StyledPage } from "./styledPage";
import RadioButtonUncheckedIcon from '@mui/icons-material/RadioButtonUnchecked';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline'
import { colors } from "constant/constant";
import CreateOutlinedIcon from '@mui/icons-material/CreateOutlined';
import { StrongBtn } from "components/Board/styled";
// import BoardCreateHeader from "components/Board/BoardCreate/BoardCreateHeader";
import { StyledRightFlex, Bold15px } from "components/Board/styled";
import CategoryDropDown from "components/Board/BoardCreate/CategoryDropDown";
import axios from "axios";
import { useNavigate, useLocation } from "react-router-dom";
import { BoardDetail } from "components/Board/interface";
const TEST_USERID = 1;

interface DropDownList {
    current: string;
    category : string[];
}

let dummyData : DropDownList = {
    current: "카테고리 선택",
    category : ["카테고리 선택", "자유", "썸/연애", "헬스/스포츠", "스터디", "프로젝트", "IT", "고민",
            "질문", "부트캠프"], // 백에서 CAMP LIST 받아와야 하는 부분
}

interface LocationState {
  boardDetail: BoardDetail;
  categoryId: number;
}

function BoardCreatePage() {
  const navigate = useNavigate();
  const state = useLocation().state as LocationState;
  const titleRef = useRef<HTMLInputElement>(null);
  const contentRef = useRef<HTMLTextAreaElement>(null);
  let [initAnonymous, initCategory, initTitle, initContent] = [false, 0, "", ""];
  if (state) {
    initAnonymous = state.boardDetail.isLike;
    initCategory = state.categoryId;
    initTitle = state.boardDetail.title;
    initContent = state.boardDetail.content;
  }
  const [isAnonymous, setIsAnonymous] = useState(initAnonymous);
  const [selectCategory, setSelectCategory] = useState<number>(initCategory);
  const [titleInput, setTitleInput] = useState(initTitle);
  const [contentInput, setContentInput] = useState(initContent);

  const handlerAnonymous = () => {
    setIsAnonymous(!isAnonymous);
  }

  const handlerSubmitBtn = () => {
    const requestBody = {
      anonymous: isAnonymous,
      categoryId: selectCategory,
      content: contentInput,
      title: titleInput,
      userId: TEST_USERID,
    }
    axios.post('http://localhost:8080/boards', requestBody)
    .then((res) => navigate('/BoardDetail/' + res.data.data.id, {state: selectCategory}));
  }

  return (
    <StyledPage>
      <StyledWrapperDiv className="fsdsdsd?">
        <StyledHeader>
        <CategoryDropDown selectCategory={selectCategory} onSelectCategory= {setSelectCategory}></CategoryDropDown>
        <StyledTitleInput type="text" 
            placeholder="글 제목을 작성하세요."
            value={titleInput}
            onChange={(event) => setTitleInput(event.target.value)}/>
          <StyledAnonymousBtn>
            {isAnonymous && <CheckCircleOutlineIcon sx={{color: colors.TEXT_LIGHT}} onClick={handlerAnonymous}/>}
            {!isAnonymous && <RadioButtonUncheckedIcon sx={{color: colors.TEXT_LIGHT}} onClick={handlerAnonymous}/>}
          <AnonymousText>익명으로 작성하기</AnonymousText>
        </StyledAnonymousBtn>
        </StyledHeader> 
      </StyledWrapperDiv>
      <StyledWrapperDiv>
        <StyledInput placeholder="글 내용을 입력하세요."
          value={contentInput}
          onChange={(event) => setContentInput(event.target.value)}/>
      </StyledWrapperDiv>
        <StyledButtonDiv>
          <StrongBtn type="first" onClick={handlerSubmitBtn}>
            작성하기<CreateOutlinedIcon sx={{color: colors.WHITE}}/>
          </StrongBtn>
        </StyledButtonDiv>
    </StyledPage>
  );
}

const StyledInput = styled.textarea`
  border: none;
  display: block;
  height: 40vh;
  margin: 10px auto;
  min-height: 200px;
  max-height: 450px;
  position: relative;
  width: 97%;

  &::placeholder {
    position: absolute;
    top: 10px;
    text-align: left;
    font-size: 18px;
    font-family: DM sans;
  }

  &:hover {
    background-color: ${colors.BACKGROUND_HOVER};
  }
`

const StyledWrapperDiv = styled.div`
  border-bottom: 1px solid ${colors.TEXT_LIGHT};
`
const StyledButtonDiv = styled(StyledRightFlex)`
  width: 97%;
  margin: 10px auto;

`

const StyledHeader = styled.div`

    width: 97%;
    height: 180px;
    margin: auto;
    display: flex;
    flex-direction: column;
`;

const AnonymousText = styled(Bold15px)`
    color: ${colors.TEXT_LIGHT};
    margin: 0 40px 0 0 ;
`
const StyledAnonymousBtn = styled.div`
    flex-grow: 2;
    display: flex;
    align-items: center;
    gap: 5px;
    margin: 10px 0;
`
const StyledTitleInput = styled.input`
    width: 100%;
    height: 28px;
    margin: 0px auto;
    border: none;
    flex-grow: 2.5;
    &::placeholder{
        font-size: 24px;
        font-family: DM sans;
        font-style: bold;
    }

    &:hover {
        background-color: ${colors.BACKGROUND_HOVER};
    }
`
export default BoardCreatePage;