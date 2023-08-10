import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
} from "@mui/material";
import Modal from "@mui/material/Modal";
import axios from "axios";
import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { RootState } from "store";
import { Row } from "antd";
import styled from "styled-components";

interface ManageModalProps {
  isManageModalOpen: boolean;
  onClose: () => void;
  imgSrc: string;
  nickname: string;
  userId: number;
}

export const ManageModal: React.FC<ManageModalProps> = (props) => {
  const infos = useSelector((state: RootState) => state.bootcampInfo);

  const onAccess = () => {
    axios.put(
      `http://localhost:8080/users/admin/permission/${props.userId}`,
      { bootcampId: bootcamp.valueOf() },
      {
        headers: {
          "content-type": "application/json",
        },
      }
    );
    props.onClose();
  };

  const onReject = () => {
    axios.put(`http://localhost:8080/users/admin/reject/${props.userId}`);
    props.onClose();
  };
  const [bootcamp, setBootcamp] = React.useState("");
  const handleChange = (event: SelectChangeEvent) => {
    setBootcamp(event.target.value as string);
  };

  return (
    <div>
      <Modal
        open={props.isManageModalOpen}
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
          {/* 모달 내용을 추가합니다. */}
          <h2 id="modal-modal-title">{props.nickname}</h2>
          <img
            src={props.imgSrc}
            alt=""
            style={{ height: "500px", width: "550px" }}
          />
          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">Bootcamp</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="item"
              value={bootcamp}
              label="Bootcamp"
              onChange={handleChange}
            >
              {infos.bootcampInfo.map((row) => (
                <MenuItem value={row.id}>{row.name}</MenuItem>
              ))}
            </Select>
          </FormControl>
          <button onClick={onAccess}>승인</button>
          <button onClick={onReject}>반려</button>
        </div>
      </Modal>
    </div>
  );
};
