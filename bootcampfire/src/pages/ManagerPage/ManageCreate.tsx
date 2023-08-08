import {
  Box,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  TextField,
} from "@mui/material";
import {
  Bold15px,
  Bold18px,
  LightBtn,
  StrongBtn,
} from "components/Board/styled";
import { bootcamp } from "constant/constant";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "store";
import ManageRadioBtn from "components/Manager/ManageRadioBtn";
import { useNavigate } from "react-router-dom";

const ManageCreate = () => {
  const [selectedStacks, setSelectedStacks] = useState<string[]>([]);
  const [selectedTracks, setSelectedTracks] = useState<string[]>([]);
  const [selectedPlaces, setSelectedPlaces] = useState<string[]>([]);
  const navigate = useNavigate();

  const handleSelectStack = (event: SelectChangeEvent) => {
    const value = event.target.value as string;
    if (!selectedStacks.includes(value)) {
      setSelectedStacks([...selectedStacks, value]);
    }
    console.log(selectedStacks);
  };
  const handleSelectTrack = (event: SelectChangeEvent) => {
    const value = event.target.value as string;
    if (!selectedTracks.includes(value)) {
      setSelectedTracks([...selectedTracks, value]);
    }
    console.log(selectedTracks);
  };
  const handleSelectPlace = (event: SelectChangeEvent) => {
    const value = event.target.value as string;
    if (!selectedPlaces.includes(value)) {
      setSelectedPlaces([...selectedPlaces, value]);
    }
    console.log(selectedPlaces);
  };

  const addFile = () => {};

  const onCreateBootcamp = () => {
    navigate("/ManagerPage/Management");
  };

  return (
    <Box
      component="form"
      sx={{
        "& > :not(style)": { m: 1, width: "100%" },
      }}
      noValidate
      autoComplete="off"
    >
      <Bold18px style={{ marginTop: "20px", marginBottom: "15px" }}>
        부트캠프 등록하기
      </Bold18px>
      <div
        style={{
          borderBottom: "solid",
          color: "#cccccc",
          marginBottom: "15px",
        }}
      ></div>
      <Bold15px></Bold15px>
      <div style={{ display: "flex" }}>
        <Bold15px style={{ marginRight: "50px" }}>부트캠프 명</Bold15px>
        <TextField id="bootcamp" label="bootcamp" variant="outlined" />
      </div>
      <div
        style={{
          borderBottom: "solid",
          color: "#cccccc",
          marginTop: "20px",
          marginBottom: "15px",
        }}
      ></div>
      <div style={{ display: "flex" }}>
        <Bold15px style={{ marginRight: "50px" }}>로고</Bold15px>
        <button onClick={addFile}>파일첨부</button>
      </div>
      <div
        style={{
          borderBottom: "solid",
          color: "#cccccc",
          marginTop: "20px",
          marginBottom: "15px",
        }}
      ></div>
      <div style={{ display: "flex" }}>
        <Bold15px style={{ marginRight: "50px" }}>URL</Bold15px>
        <TextField id="URL" label="URL" variant="outlined" />
      </div>
      <div
        style={{
          borderBottom: "solid",
          color: "#cccccc",
          marginTop: "20px",
          marginBottom: "15px",
        }}
      ></div>
      <div style={{ display: "flex" }}>
        <Bold15px style={{ marginRight: "50px" }}>트랙추가</Bold15px>
        <FormControl fullWidth>
          <InputLabel id="demo-simple-select-label">Track</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            label="Bootcamp"
            onChange={handleSelectTrack}
          >
            <MenuItem value="Back-end">Back-end</MenuItem>
            <MenuItem value="Front-end">Front-end</MenuItem>
            <MenuItem value="Cloud">Cloud</MenuItem>
            <MenuItem value="DBA">DBA</MenuItem>
            <MenuItem value="AI">AI</MenuItem>
            <MenuItem value="K8S">K8S</MenuItem>
          </Select>
        </FormControl>
        <div>
          {selectedTracks.map((row) => (
            <LightBtn type={""}>{row}</LightBtn>
          ))}
        </div>
      </div>
      <div
        style={{
          borderBottom: "solid",
          color: "#cccccc",
          marginTop: "20px",
          marginBottom: "15px",
        }}
      ></div>
      <div style={{ display: "flex" }}>
        <Bold15px style={{ marginRight: "50px" }}>사용언어</Bold15px>
        <FormControl fullWidth>
          <InputLabel id="demo-simple-select-label">Stack</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            label="Bootcamp"
            onChange={handleSelectStack}
          >
            <MenuItem value="JAVA">JAVA</MenuItem>
            <MenuItem value="C++">C++</MenuItem>
            <MenuItem value="Spring">Spring</MenuItem>
            <MenuItem value="React">React</MenuItem>
            <MenuItem value="JavaScript">JavaScript</MenuItem>
            <MenuItem value="Cloud">Cloud</MenuItem>
          </Select>
        </FormControl>
        <div>
          {selectedStacks.map((row) => (
            <LightBtn type={""}>{row}</LightBtn>
          ))}
        </div>
      </div>
      <div
        style={{
          borderBottom: "solid",
          color: "#cccccc",
          marginTop: "20px",
          marginBottom: "15px",
        }}
      ></div>
      <div style={{ display: "flex" }}>
        <Bold15px style={{ marginRight: "50px" }}>부트캠프 명</Bold15px>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              marginBottom: "20px",
            }}
          >
            <Bold15px style={{ marginRight: "50px", color: "#cccccc" }}>
              학습기간
            </Bold15px>
            <TextField id="learning" label="learning" variant="outlined" />
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              marginBottom: "20px",
            }}
          >
            <Bold15px style={{ marginRight: "50px", color: "#cccccc" }}>
              요청/기간
            </Bold15px>
            <TextField id="calender" label="calender" variant="outlined" />
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              marginBottom: "20px",
            }}
          >
            <Bold15px style={{ marginRight: "50px", color: "#cccccc" }}>
              온/오프라인
            </Bold15px>
            <ManageRadioBtn></ManageRadioBtn>
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              marginBottom: "20px",
            }}
          >
            <Bold15px style={{ marginRight: "50px", color: "#cccccc" }}>
              장소
            </Bold15px>
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">Place</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                label="place"
                onChange={handleSelectPlace}
              >
                <MenuItem value="서울">서울</MenuItem>
                <MenuItem value="경기도">경기도</MenuItem>
                <MenuItem value="충청도">충청도</MenuItem>
                <MenuItem value="부산">부산</MenuItem>
                <MenuItem value="대구">대구</MenuItem>
                <MenuItem value="강원도">강원도</MenuItem>
              </Select>
            </FormControl>
            <div>
              {selectedPlaces.map((row) => (
                <LightBtn type={""}>{row}</LightBtn>
              ))}
            </div>
          </div>
        </div>
      </div>
      <div
        style={{
          borderBottom: "solid",
          color: "#cccccc",
          marginTop: "20px",
          marginBottom: "15px",
        }}
      ></div>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          marginBottom: "20px",
          justifyContent: "right",
        }}
      >
        <StrongBtn type={"first"} onClick={onCreateBootcamp}>
          {"등록"}
        </StrongBtn>
      </div>
    </Box>
  );
};

export default ManageCreate;
