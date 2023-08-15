import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import ChatBubbleOutlineRoundedIcon from '@mui/icons-material/ChatBubbleOutlineRounded';
import styled from 'styled-components';
import Tag from 'components/Board/Tag';
import { Bold24px, Normal13px } from 'components/Board/styled';
import HotContent from './HotContent';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { colors } from 'constant/constant';

const Container = styled.div``;

const IconWrapper = styled.div`
  display: flex;
  gap: 5px;
  /* align-items: center; */
`;

const StyledFavoriteBorderIcon = styled(FavoriteBorderIcon)`
  color: #94969b;
`;

const StyledChatBubbleOutlineRoundedIcon = styled(ChatBubbleOutlineRoundedIcon)`
  color: #94969b;
`;

const HotBoardTitle = styled.div`
  display: flex;
  align-items: center;
  padding-bottom: 10px;
  border-bottom: 2px solid ${colors.TEXT_LIGHT};
`
const ContentsContainer = styled.div`
  display: flex;
  flex-direction: column;
  row-gap: 5px;
  margin-top: 5px;
`
const ContainerRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`

interface hotData {
  id: number;
  category: string;
  title: string;
  likeCnt: number;
  commentCnt: number;
}


export default function HotBoard() {
  const [rows, setRows] = useState<hotData[]>([]);

  useEffect(() => {
    axios.get(`${process.env.REACT_APP_API_URL}/categories/hots`).then((res) => {
      console.log(res)
      setRows(res.data.data);
    });
  }, []);
  return (
    <Container>
        <HotBoardTitle style={{display: "flex", alignItems: "center", gap: '5px'}}>

        <img src="/hotBoardIcon.png" alt="" height={'32px'} width={'32px'} style={{marginRight: "10px"}}/>
        <Bold24px as="span">뜨거운 이야기</Bold24px>
        </HotBoardTitle>
        <ContentsContainer>
            {rows.map((row) => (
              <ContainerRow>
                <span style={{width: "180px"}}> 
                  <Tag type={colors.TEXT_LIGHT}>{row.category}</Tag>
                </span>
                  <HotContent link={`/BoardDetail/${row.id}`} text={row.title} />
                  <IconWrapper>
                      <StyledFavoriteBorderIcon /> 
                      <Normal13px as="span" style={{marginRight: "10px"}}>{row.likeCnt}</Normal13px>
                      <StyledChatBubbleOutlineRoundedIcon /> 
                      <Normal13px as="span" style={{marginRight: "10px"}}>{row.commentCnt}</Normal13px>
                  </IconWrapper>
              </ContainerRow>
            ))}
        </ContentsContainer>
    </Container>
  );
}
