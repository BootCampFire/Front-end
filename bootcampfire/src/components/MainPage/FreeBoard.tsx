import styled from 'styled-components';
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
export default function FreeBoard() {
  return (
    <div>
      <Container>
        <img src="/public/logo.png" alt="" height={'auto'} width={'auto'} />
        <hr />
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
