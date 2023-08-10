import styled from 'styled-components';
import HotContent from './HotContent';
import { Bold18px } from 'components/Board/styled';
import MoreBtn from './MoreBtn';
import axios from 'axios';
import { useEffect, useState } from 'react';
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

interface createDataProps {
  text: string;
  img: string;
  index: number;
}
interface boardData {
  id: number;
  title: string;
}

const SampleBoard: React.FC<createDataProps> = (props) => {
  const [rows, setRows] = useState<boardData[]>([]);

  useEffect(() => {
    console.log(props);
    axios.get(`http://localhost:8080/categories/${props.index}/main`).then((res) => {
      setRows(res.data.data);
    });
  }, []);

  return (
    <div>
      <Container>
        <img src={props.img} alt="" height={'auto'} width={'auto'} />
        <div
          style={{
            display: 'flex',
            gap: '30px',
            marginBottom: '10px',
            alignItems: 'center',
          }}>
          <Bold18px>{props.text}</Bold18px>
          <MoreBtn index={props.index}></MoreBtn>
        </div>
        <div style={{ borderBottom: 'solid 1px' }} />
        <Table>
          <tbody>
            {rows.map((row) => (
              <Row key={row.id}>
                <Cell>
                  <HotContent link={`/BoardDetail/${row.id}`} text={row.title}></HotContent>
                </Cell>
              </Row>
            ))}
          </tbody>
        </Table>
      </Container>
    </div>
  );
};

export default SampleBoard;
