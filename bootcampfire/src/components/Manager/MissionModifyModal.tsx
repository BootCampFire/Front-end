import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
} from "@mui/material";
import Modal from "@mui/material/Modal";
import { LightBtn, StrongBtn } from "components/Board/styled";
import React, { useState } from "react";

interface MissionModifyModalProps {
  isMissionModifyModalOpen: boolean;
  onClose: () => void;
}

export const MissionModifyModal: React.FC<MissionModifyModalProps> = (
  props
) => {
  const onAccess = () => {
    props.onClose();
  };

  // Sample data for the table
  const [tableData, setTableData] = useState([
    { id: 1, column1: "날짜", column2: "Row 1, Column 2" },
    { id: 2, column1: "문제 번호", column2: "Row 2, Column 2" },
    { id: 3, column1: "문제 제목", column2: "Row 3, Column 2" },
  ]);

  const handleTextFieldChange = (
    id: number,
    columnKey: string,
    value: string
  ) => {
    setTableData((prevData) =>
      prevData.map((row) =>
        row.id === id ? { ...row, [columnKey]: value } : row
      )
    );
  };

  return (
    <div>
      <Modal
        open={props.isMissionModifyModalOpen}
        onClose={props.onClose}
        aria-labelledby="modal-modal-title"
      >
        <div
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            backgroundColor: "#fff",
            padding: "20px",
            borderRadius: "5px",
          }}
        >
          <TableContainer>
            <Table>
              <TableBody>
                {tableData.map((row) => (
                  <TableRow key={row.id}>
                    <TableCell sx={{ borderBottom: "none" }}>
                      <TextField
                        fullWidth
                        variant="outlined"
                        value={row.column1}
                      />
                    </TableCell>
                    <TableCell sx={{ borderBottom: "none" }}>
                      <TextField
                        fullWidth
                        variant="outlined"
                        value={row.column2}
                        onChange={(event) =>
                          handleTextFieldChange(
                            row.id,
                            "column2",
                            event.target.value
                          )
                        }
                      />
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              marginBottom: "20px",
              justifyContent: "right",
            }}
          >
            <LightBtn type="first" onClick={onAccess}>
              {"수정"}
            </LightBtn>
          </div>
        </div>
      </Modal>
    </div>
  );
};
