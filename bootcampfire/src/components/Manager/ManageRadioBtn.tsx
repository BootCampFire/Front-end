import React, { useState } from "react";
import {
  FormControl,
  FormControlLabel,
  Radio,
  RadioGroup,
  Paper,
} from "@mui/material";

const ManageRadioBtn = () => {
  // 선택된 값을 상태로 관리합니다.
  const [selectedValue, setSelectedValue] = useState("option1");

  // 라디오 버튼 값이 변경되었을 때 처리하는 함수
  const handleRadioChange = (event: {
    target: { value: React.SetStateAction<string> };
  }) => {
    setSelectedValue(event.target.value);
  };

  return (
    <Paper
      elevation={3}
      style={{
        padding: "20px",
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
          value={selectedValue}
          onChange={handleRadioChange}
        >
          <FormControlLabel value="온라인" control={<Radio />} label="온라인" />
          <FormControlLabel
            value="오프라인"
            control={<Radio />}
            label="오프라인"
          />
          <FormControlLabel
            value="온/오프라인"
            control={<Radio />}
            label="온/오프라인"
          />
        </RadioGroup>
      </FormControl>
    </Paper>
  );
};

export default ManageRadioBtn;
