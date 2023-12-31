import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
} from "@mui/material";
import Modal from "@mui/material/Modal";
import axios from "axios";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "store";

interface ManageModalProps {
  isManageModalOpen: boolean;
  onClose: () => void;
  imgSrc: string;
  nickname: string;
  userId: number;
}

export const ManageModal: React.FC<ManageModalProps> = (props) => {
  const bootcamps = useSelector(
    (state: RootState) => state.bootcampInfo.bootcampInfo
  );
  const onAccess = () => {
    // console.log(bootcamp);
    axios.put(
      `${process.env.REACT_APP_API_URL}/users/admin/permission/${props.userId}`,
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
    axios.put(
      `${process.env.REACT_APP_API_URL}/users/admin/reject/${props.userId}`
    );
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
              {bootcamps.map((row) => (
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
