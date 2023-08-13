import React, { useState } from "react";
import {
  FormControl,
  FormControlLabel,
  Radio,
  RadioGroup,
  Paper,
} from "@mui/material";

interface bootcampInput {
  name: string;
  siteUrl: string;
  process: string;
  schedule: string;
  description: string;
  cost: number;
  card: number;
  support: number;
  hasCodingtest: number;
  onOff: number;
  startDate: string;
  endDate: string;
  imgUrl: string,
  tracks: {id:number, name:string}[];
  languages: {id:number, name:string}[];
  regions: {id:number, name:string}[];
  [key: string]: any;
}

const ManageRadioBtn = ({list, setBtn, selectData, type}: {
    list: string[], 
    setBtn: React.Dispatch<React.SetStateAction<bootcampInput>>,
    selectData: bootcampInput
    type: string}) => 
  // 선택된 값을 상태로 관리합니다.
  // 라디오 버튼 값이 변경되었을 때 처리하는 함수
  { const handleRadioChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setBtn({
      ...selectData,
      [type]: event.target.value
    });
  }

  return (
    <Paper
      elevation={3}
      style={{
        width: "fit-content",
        display: "flex",
        flexDirection: "row",
        boxShadow: "none",
      }}
    >
      <FormControl component="fieldset">
        <RadioGroup
          aria-label="radio-group"
          name="radio-group"
          value={selectData[type]}
          onChange={handleRadioChange}
          sx={{flexDirection: "row"}}
        >
        {list.map((element, idx) => (
          <FormControlLabel value={idx} control={<Radio />} label={list[idx]}/>
        ))}
        </RadioGroup>
      </FormControl>
    </Paper>
  );
};


export default ManageRadioBtn;
