import styled from 'styled-components';
import HotContent from './HotContent';
import { Bold18px } from 'components/Board/styled';
import MoreBtn from './MoreBtn';
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
function createData(user: string, link: string, text: string) {
  return { user, link, text };
}
const rows = [
  createData('김민범', '../../pages/BoardPage/BoardDetailPage.tsx', 'SSAFY'),
  createData('김봉준', '../../pages/BoardPage/BoardDetailPage.tsx', 'SSAFY'),
  createData('박지환', '../../pages/BoardPage/BoardDetailPage.tsx', 'SSAFY'),
  createData('안나', '../../pages/BoardPage/BoardDetailPage.tsx', 'SSAFY'),
  createData('이연희', '../../pages/BoardPage/BoardDetailPage.tsx', 'SSAFY'),
  createData('임수형', '../../pages/BoardPage/BoardDetailPage.tsx', 'SSAFY'),
];
export default function HealthBoard() {
  return (
    <div>
      <Container>
        <img src="/public/logo.png" alt="" height={'auto'} width={'auto'} />
        <div style={{ display: 'flex', gap: '30px', marginBottom: '10px', alignItems: 'center' }}>
          <Bold18px>헬스 다이어트</Bold18px>
          <MoreBtn index={3}></MoreBtn>
        </div>
        <div style={{ borderBottom: 'solid 1px' }} />
        <Table>
          <tbody>
            {rows.map((row) => (
              <Row key={row.user}>
                <Cell>
                  <HotContent link={row.link} text={row.text}></HotContent>
                </Cell>
              </Row>
            ))}
          </tbody>
        </Table>
      </Container>
    </div>
  );
}
