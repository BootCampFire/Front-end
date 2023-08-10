import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import ChatBubbleOutlineRoundedIcon from '@mui/icons-material/ChatBubbleOutlineRounded';
import styled from 'styled-components';
// import A2 from '../Bootcamp/Tag';
import Tag from 'components/BootCamp/Tag';

import HotContent from './HotContent';
import { useEffect, useState } from 'react';
import axios from 'axios';
const Container = styled.div``;

const Table = styled.table`
  /* Add any styles for the table */
`;

const Row = styled.tr`
  /* Add any styles for the table row */
`;

const Cell = styled.td`
  /* Add any styles for the table cell */
`;

const IconWrapper = styled.div`
  display: inline-block;
  align-items: center;
`;

const StyledFavoriteBorderIcon = styled(FavoriteBorderIcon)`
  color: #94969b;
`;

const StyledChatBubbleOutlineRoundedIcon = styled(ChatBubbleOutlineRoundedIcon)`
  color: #94969b;
`;

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
    axios.get(`http://localhost:8080/categories/hots`).then((res) => {
      setRows(res.data.data);
    });
  }, []);
  return (
    <div>
      <Container>
        <h2>뜨거운 이야기</h2>
        <img src="/public/logo.png" alt="" height={'auto'} width={'auto'} />
        <Table>
          <tbody>
            {rows.map((row) => (
              <Row>
                <Cell>
                  <Tag text={row.category} />
                </Cell>
                <Cell>
                  <HotContent link={`/BoardDetail/${row.id}`} text={row.title}></HotContent>
                </Cell>
                <Cell>
                  <IconWrapper>
                    <StyledFavoriteBorderIcon /> {row.likeCnt} <StyledChatBubbleOutlineRoundedIcon /> {row.commentCnt}
                  </IconWrapper>
                </Cell>
              </Row>
            ))}
          </tbody>
        </Table>
      </Container>
    </div>
  );
}
