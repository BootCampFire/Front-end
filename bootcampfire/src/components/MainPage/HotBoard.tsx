import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import ChatBubbleOutlineRoundedIcon from '@mui/icons-material/ChatBubbleOutlineRounded';
import styled from 'styled-components';
// import A2 from '../Bootcamp/Tag';
import Tag from 'components/BootCamp/Tag';

import HotContent from './HotContent';
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

export default function HotBoard() {
  return (
    <div>
      <Container>
        <h2>뜨거운 이야기</h2>
        <img src="/public/logo.png" alt="" height={'auto'} width={'auto'} />
        <Table>
          <tbody>
            <Row>
              <Cell>
                <Tag text={'자유'} />
              </Cell>
              <Cell>
                <HotContent link={'../../pages/MyPage/MyPage.tsx'} text={'핫글 제목'}></HotContent>
              </Cell>
              <Cell>
                <IconWrapper>
                  <StyledFavoriteBorderIcon /> 3 <StyledChatBubbleOutlineRoundedIcon /> 4
                </IconWrapper>
              </Cell>
            </Row>
          </tbody>
        </Table>
      </Container>
    </div>
  );
}
