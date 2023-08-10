import styled from 'styled-components';
import CustomizedInputBase from '../../components/CustomizedInputBase'; // CustomizedInputBase 컴포넌트 import
import HotBoard from '../../components/MainPage/HotBoard';
import Ranking from '../../components/MainPage/Ranking';
import SampleBoard from 'components/MainPage/SampleBoard';

const MainContainer = styled.div`
  position: relative;
  display: flex;
  flex-direction: row;
  left: 80px;
`;

const BoardDiv = styled.div`
  margin-left: 100;
`;

export default function MainPage() {
  function createData(index: number, img: string, text: string) {
    return { index, img, text };
  }
  const rows = [
    createData(1, '/asd', '자유게시판'),
    createData(2, '/asd', '썸/연애'),
    createData(3, '/asd', '헬스/다이어트'),
    createData(4, '/asd', '고민'),
    createData(5, '/asd', '프로젝트'),
    createData(6, '/asd', '스터디'),
    createData(7, '/asd', '질문'),
    createData(8, '/asd', 'IT'),
    createData(9, '/asd', '내 부트캠프'),
  ];
  return (
    <MainContainer>
      <BoardDiv>
        <h1>MainPage</h1>
        <CustomizedInputBase />
        <HotBoard />
        <div style={{ display: 'flex' }}>
          {rows.map((row) => (
            <SampleBoard index={row.index} img={row.img} text={row.text} />
          ))}
          <Ranking />
        </div>
      </BoardDiv>
    </MainContainer>
  );
}
