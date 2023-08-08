import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { LightBtn } from "components/Board/styled";
import { MissionModifyModal } from "./MissionModifyModal";

function createData(date: string, problemNum: number, problemTitle: string) {
  return { date, problemNum, problemTitle };
}
const rows = [
  createData("7월1일", 1234, "SSAFY"),
  createData("7월1일", 1234, "boostcamp"),
  createData("7월1일", 3313, "UTC"),
  createData("7월1일", 2132, "42Seoul"),
  createData("7월1일", 5431, "SAP"),
  createData("7월1일", 4123, "GOOGLE"),
];

export default function MissionTable() {
  const [isMissionModifyModalOpen, setMissionModifyModalOpen] =
    React.useState(false);
  const isManageModifyHandle = () => {
    setMissionModifyModalOpen(true);
  };

  // 모달을 닫기 위한 이벤트 핸들러를 만듭니다.
  const handleCloseModal = () => {
    setMissionModifyModalOpen(false);
  };
  return (
    <div>
      <TableContainer component={Paper}>
        <Table
          sx={{ minWidth: 650, boxShadow: "none", minHeight: 450 }}
          aria-label="simple table"
        >
          <TableHead sx={{ borderBottom: "solid" }}>
            <TableRow>
              <TableCell align="center">날짜</TableCell>
              <TableCell align="center">문제번호</TableCell>
              <TableCell align="center">문제제목</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => (
              <TableRow
                key={row.date}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell align="center">{row.date}</TableCell>
                <TableCell align="center">{row.problemNum}</TableCell>
                <TableCell align="center">{row.problemTitle}</TableCell>
                <TableCell align="right">
                  <LightBtn type="first" onClick={isManageModifyHandle}>
                    수정
                  </LightBtn>
                  <LightBtn type="" style={{ marginLeft: "30px" }}>
                    삭제
                  </LightBtn>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <MissionModifyModal
        isMissionModifyModalOpen={isMissionModifyModalOpen}
        onClose={handleCloseModal}
      />
    </div>
  );
}
