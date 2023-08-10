import { Card } from '@mui/material';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

function createData(rank: number, name: string, bootCampName: string, rankDate: string) {
  return { rank, name, bootCampName, rankDate };
}
const VSBtn = styled(Link)`
  margin-right: 20px;
  padding: 8px 16px;
  border: none;
  border-radius: 4px;
  background-color: #ff603d;
  color: #fff;
  font-size: 16px;
  text-decoration: none;
  cursor: pointer;
`;

const rows = [
  createData(1, '김민범', 'SSAFY', Date()),
  createData(2, '김봉준', 'SSAFY', Date()),
  createData(3, '박지환', 'SSAFY', Date()),
  createData(4, '안나', 'SSAFY', Date()),
  createData(5, '이연희', 'SSAFY', Date()),
  createData(6, '임수형', 'SSAFY', Date()),
];

const Sample = styled.div`
  position: absolute;
  top: 120px;
  right: 20px;
  display: 'flex';
  flex-direction: 'column';
  box-shadow: 'none';
  margin-left: 80;
`;

const Sample2 = styled.div`
  background-color: #ffd0c1;
  box-shadow: 'none';
  margin-right: '20px';
`;

export default function Ranking() {
  return (
    <Sample>
      <Sample2>
        <h3>VS 랭킹</h3>
        <table>
          <tbody>
            {rows.map((row) => (
              <tr key={row.rank}>
                <td>{row.rank}</td>
                <td>{row.name}</td>
                <td>{row.bootCampName}</td>
                <td>{row.rankDate}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </Sample2>
      <VSBtn to="/Vs">바로가기</VSBtn>
    </Sample>
  );
}
