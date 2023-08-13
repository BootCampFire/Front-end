import { Box, FormControl, InputLabel, MenuItem, Select, SelectChangeEvent, TextField} from "@mui/material";
import { Bold15px, Bold18px, LightBtn, StrongBtn,} from "components/Board/styled";
import { ChangeEvent, useState } from "react";
import ManageRadioBtn from "components/Manager/ManageRadioBtn";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { colors } from "constant/constant";
import { useEffect } from "react";
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined';
import axios from "axios";
import type { bootcampInput } from "components/Board/interface";
import { onOffList, supportSelectList, cardSelectList, codingTestSelectList } from "constant/constant";

const API_KEY = 'http://localhost:8080/bootcamps/';
const accessToken = localStorage.getItem("Authorization");
const header = {
  headers: {
    Authorization: `Bearer ${accessToken}`,
}}

const ManageCreate = () => {
  const [inputData, setInputData] = useState<bootcampInput>({
    name: "",
    siteUrl: "",
    process: "",
    schedule: "",
    description: "",
    card: 0,
    support: 0,
    hasCodingtest: 0,
    onOff: 0,
    startDate: "",
    endDate: "",
    imgUrl: "test",
    tracks: [],
    languages: [],
    regions: [],
    cost: 0,
  });

  const [place, setPlace] = useState("");
  const [stack, setStack] = useState("");
  const [track, setTrack] = useState("");
  const navigate = useNavigate();
  const [tracks, setTracks] = useState([]);
  const [places, setPlaces] = useState([]);
  const [stacks, setStacks] = useState([]);

  useEffect(() => {
    Promise.all([
      axios.get(API_KEY + "regions", header),
      axios.get(API_KEY + "tracks", header),
      axios.get(API_KEY + "languages", header),
    ]).then(([regionsRes, tracksRes, languagesRes]) => {
      setTracks(tracksRes.data.data);
      setPlaces(regionsRes.data.data);
      setStacks(languagesRes.data.data);
    })
  },[])

  const handleSelectDropDown = (event: SelectChangeEvent) => {
    const value = event.target.value as string;
    // if (!selectedStacks.includes(value)) {
      const id = Number(value.substring(0, 1));
      const name = value.substring(1);
      const originData = inputData[event.target.name];
      setInputData({
        ...inputData,
        [event.target.name]: [...originData, {id, name}]
      });
      setStack(name);
    // }  
  }

  const handleDeleteDropDown = (idx: number, type:string) => {
    const newDate = inputData[type];
    newDate.splice(idx, 1);
    setInputData({
      ...inputData,
      [type]: newDate,
    })
  }

  const handleStringInputChange = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setInputData({
      ...inputData,
      [event.target.name]: event.target.value
    })
  }
  
  const handleEndDate = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const start = new Date(inputData.startDate);
    const end = new Date(event.target.value);
    if (start >= end) {
      window.alert("모집 시작일 이후로 선택해주세요.");
      event.target.value = "";
      return ;
    }
    setInputData({
      ...inputData,
      [event.target.name]: event.target.value
    })
  }
  const addFile = () => {
    
  };

  const onCreateBootcamp = () => {
    const requestReady = {...inputData};

    if (!emptyCheck(requestReady)) {
      alert("빈 입력값이 존재합니다.");
      return ;
    }

    ["card", "support", "hasCodingtest"].forEach((element) => {
      requestReady[element] = requestReady[element] === 0 ? true : false;
    })

    const request = {...requestReady,
      onOff: onOffList[requestReady.onOff]
    }

    axios.post(API_KEY, request, {
      headers: {
        Authorization: `Bearer ${accessToken}`
      }
    })
    navigate("/ManagerPage/Management");
  };


  return (
    <Box
      component="form"
      sx={{"& > :not(style)": { m: 1, width: "100%" }}}
      noValidate
      autoComplete="off"
    >
      <Bold18px style={{ marginTop: "20px", marginBottom: "15px" }}>
        부트캠프 등록하기
      </Bold18px>
      <Line/>
      <div style={{ display: "flex"}}>
        <InputCategory>부트캠프 명</InputCategory>
        <TextField size="small" id="bootcamp" label="bootcamp" variant="outlined" name="name"
            value={inputData.name} onChange={handleStringInputChange}/>
      </div>
      <Line />
      <div style={{ display: "flex" }}>
        <StyledSpan>
          <InputCategory as="span">URL</InputCategory>
          <TextField size="small" id="URL" label="URL" variant="outlined" name="siteUrl"
            value={inputData.siteUrl} onChange={handleStringInputChange} />
        </StyledSpan>
        <StyledSpan>
          <InputCategory as="span">로고</InputCategory>
          <button onClick={addFile}>파일첨부</button>
          </StyledSpan>
        </div>
      <Line />
        <div style={{ display: "flex" }}>
          <StyledSpan>
          <InputCategory as="span">모집시작일</InputCategory>
          <StyledShedule type="datetime-local" name="startDate" value={inputData.startDate} onChange={handleStringInputChange}/>
          </StyledSpan>
          <StyledSpan>
          <InputCategory as="span">모집마감일</InputCategory>
          <StyledShedule type="datetime-local" name="endDate" value={inputData.endDate} onChange={handleEndDate}/>
          </StyledSpan>
        </div>
      <Line />
      <div style={{ display: "flex" }}>
        <InputCategory>트랙추가</InputCategory>
        <FormControl sx={{width: "200px"}}>
          <InputLabel id="demo-simple-select-label">Track</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            label="Bootcamp"
            onChange={handleSelectDropDown}
            value={track}
            size="small"
            name="tracks"
          >
            {tracks.map((element: {id: number, name: string}) => (
              <MenuItem value={element.id + element.name}>{element.name}</MenuItem>
            ))}
          </Select>
        </FormControl>
        <div style={{display: "flex"}}>
          {inputData.tracks.map((element, idx) => 
            <LightBtn type={""} style={{margin: "auto 0 auto 10px"}}>{element.name}
              <CloseOutlinedIcon 
                onClick={() => handleDeleteDropDown(idx, "tracks")}
                sx={{fontSize: "18px", color: colors.TEXT_LIGHT}}/>          
            </LightBtn>
          )}
        </div>
      </div>
      <Line />
      <div style={{display: "flex"}}>
        <InputCategory>사용언어</InputCategory>
        <FormControl sx={{width: "200px"}}>
          <InputLabel id="demo-simple-select-label">Stack</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            label="Bootcamp"
            onChange={handleSelectDropDown}
            value={stack}
            size="small"
            name="languages"
          >
            {stacks.map((element: {id: number, name: string}) => (
              <MenuItem value={element.id + element.name}>{element.name}</MenuItem>
            ))}
          </Select>
        </FormControl>
        <div style={{display: "flex"}}>
          {inputData.languages.map((element, idx) => 
            <LightBtn type={""} style={{margin: "auto 0 auto 10px"}}>{element.name}
              <CloseOutlinedIcon 
                onClick={() => handleDeleteDropDown(idx, "languages")}
                sx={{fontSize: "18px", color: colors.TEXT_LIGHT}}/>          
            </LightBtn>
          )}
        </div>
      </div>
      <Line />
      <div style={{ display: "flex" }}>
        <InputCategory>일정 및 장소</InputCategory>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <StyledDiv>
            <StyledBold15px>교육기간</StyledBold15px>
            <TextField size="small" id="learning" label="교육기간" variant="outlined" name="schedule"
             value={inputData.schedule} onChange={handleStringInputChange}/>
          </StyledDiv>
          <StyledDiv>
            <StyledBold15px>온/오프라인</StyledBold15px>
            <ManageRadioBtn list={onOffList} type="onOff" setBtn={setInputData} selectData={inputData}/>
          </StyledDiv>
          <StyledDiv>
            <StyledBold15px>장소</StyledBold15px>
            <FormControl sx={{width: "160px"}}>
              <InputLabel id="demo-simple-select-label">Place</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                label="place"
                onChange={handleSelectDropDown}
                value={place}
                size="small"
                name="regions"
              >
              {places.map((element: {id: number, name: string}) => (
                <MenuItem value={element.id + element.name}>{element.name}</MenuItem>
              ))}
              </Select>
            </FormControl>
            <div style={{display: "flex"}}>
              {inputData.regions.map((element, idx) => 
              <LightBtn type={""} style={{margin: "auto 0 auto 10px"}}>{element.name}
              <CloseOutlinedIcon 
                onClick={() => handleDeleteDropDown(idx, "regions")}
                sx={{fontSize: "18px", color: colors.TEXT_LIGHT}}/>          
            </LightBtn>
          )}
        </div>
          </StyledDiv>
        </div>
      </div>
      <Line />
      <div style={{ display: "flex" }}>
        <InputCategory>지원금 및 수강료</InputCategory>
        <div>
          <StyledDiv>
          <StyledBold15px>수강료</StyledBold15px>
          <TextField size="small"  id="calender" label="수강료" variant="outlined" value={inputData.cost} name="cost"
            onChange={handleStringInputChange}
          />
          </StyledDiv>
          <StyledDiv>
          <StyledBold15px>지원금</StyledBold15px>
          <ManageRadioBtn list={supportSelectList} type="support" setBtn={setInputData} selectData={inputData}/>
          </StyledDiv>
          <StyledDiv>
          <StyledBold15px>내일배움카드</StyledBold15px>
          <ManageRadioBtn  list={cardSelectList} type="card" setBtn={setInputData} selectData={inputData}/>
          </StyledDiv>
        </div>
      </div>
      <Line />
      <div style={{ display: "flex" }}>
        <InputCategory>모집절차</InputCategory>
        <div>
        <StyledDiv>

        <StyledBold15px>모집절차</StyledBold15px>
        <TextField size="small"  id="learning" label="모집절차" variant="outlined" sx={{width: "800px"}} name="process"
          value={inputData.process} onChange={handleStringInputChange}/>
          </StyledDiv>
        <StyledDiv>

        <StyledBold15px>코딩테스트 여부</StyledBold15px>
        <ManageRadioBtn  list={codingTestSelectList} type="hasCodingtest" setBtn={setInputData} selectData={inputData}/>
        </StyledDiv>
          </div>
      </div>
      <Line />
      <div style={{ display: "flex" }}>
        <InputCategory>설명</InputCategory>
        <TextField size="small"  id="learning" label="설명" variant="outlined" sx={{width: "800px"}} name="description"
          value={inputData.description} onChange={handleStringInputChange}/>
      </div>
      <Line />
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


const StyledDiv = styled.div`
  display: flex;
  flex-direction: row;
  margin-bottom: 10px;
`

const StyledBold15px = styled(Bold15px)`
  margin: auto 0 auto 10px;
  color: ${colors.TEXT_LIGHT};
  width: 150px;
`

const Line = styled.div`
  border-bottom: solid;
  color: ${colors.BORDER_LIGHT};
  margin-top: 20px;
  margin-bottom: 15px; 
`

const InputCategory = styled(Bold15px)`
  display: inline-block;
  margin: auto 0 auto 10px;
  width: 150px;
`

const StyledSpan = styled.span`
  width: 50%;
  display: flex;
  align-items: center;
`

const StyledShedule = styled.input`
  height: 23px;
  width: 195px;
  padding: 6.9px 12.4px;
  border-radius: 5px;
  border-color: ${colors.BORDER_LIGHT};
  appearance: none;
  outline: none;
  box-shadow: inset 0px 0px 0px 0px red;

  appearance: none;
  -moz-appearance: none;
  -webkit-appearance: none;
  &::-webkit-calendar-picker-indicator {
  appearance: none;
  outline: none;
  box-shadow: none;
  }
`

const emptyCheck = (request: bootcampInput) => {
  for (const key in request) {
    const value = request[key];
    if (value === "imgUrl") { // 이미지는 default 이미지가 존재하므로 스킵
      continue;
    } else if (typeof value === "string" && value === "") {
      return false;
    } else if (Array.isArray(value) && value.length === 0) {
      return false;
    }
  }

  return true;
}

const getOnOff = (input: number) => {
  switch (input) {
    case 0:
      return "온라인";
    case 1:
      return "오프라인";
    default:
      return "온/오프라인"
  }
}

export default ManageCreate;
