import { Box, FormControl, Input, InputLabel, MenuItem, Select, SelectChangeEvent, TextField} from "@mui/material";
import { Bold15px, Bold18px, LightBtn, StrongBtn,} from "components/Board/styled";
import { ChangeEvent, useState } from "react";
import ManageRadioBtn from "components/Manager/ManageRadioBtn";
import { useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";
import { colors } from "constant/constant";
import { useEffect } from "react";
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined';
import axios from "axios";
import { onOffList, onOffMap, supportSelectList, cardSelectList, codingTestSelectList } from "constant/constant";
import type { bootcampInput, bootcampInputResponse } from "components/Board/interface";
import AWS from "aws-sdk"

const API_KEY = 'http://localhost:8080/bootcamps/';
const accessToken = localStorage.getItem("Authorization");
const header = {
  headers: {
    Authorization: `Bearer ${accessToken}`,
}}

AWS.config.update({
  region: process.env.REACT_APP_AWS_REGION,
  accessKeyId: process.env.REACT_APP_AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.REACT_APP_AWS_SECRET_ACCESS_KEY,
});  // 

const ManageModify = () => {
  const {bootcampId} = useParams();
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
    imgUrl: "none",
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
  const [upload, setUpload] = useState<AWS.S3.ManagedUpload | null>(null);
  const [isimg, setIsimg] = useState("");

  useEffect(() => {
    const axiosRequest = [
      axios.get(API_KEY + "regions", header),
      axios.get(API_KEY + "tracks", header),
      axios.get(API_KEY + "languages", header),
      axios.get(API_KEY + bootcampId, header)
    ]

    Promise.all(axiosRequest).then(([regionsRes, tracksRes, languagesRes, initRes]) => {
      setTracks(tracksRes.data.data);
      setPlaces(regionsRes.data.data);
      setStacks(languagesRes.data.data);
      // console.log(initRes)
      setInputData(changePropertyStringToNumber(initRes.data.data));
      if(initRes.data.data.imgUrl != "none") {downloadFile(initRes.data.data.name);}
          })
  },[])

  const downloadFile = async (Bname : string) => {
    const s3 = new AWS.S3();  
    const params = {
      Bucket: process.env.REACT_APP_AWS_BUCKER || 'default-bucket-name',
      Key: `logo/${Bname}.png`,
    };
  
    try {
      const res = await s3.getObject(params).promise();
      // console.log(res);
      setIsimg(Bname);

    } catch (error) {
      console.error('Error downloading file:', error);
    }
  };

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
      return ;
    }
    setInputData({
      ...inputData,
      [event.target.name]: event.target.value
    })
  }
  

  const addFile = async (e : any) => {
    const selectedFile = e.target.files[0];

    if (selectedFile) {
        // console.log("Selected image name:", selectedFile.name);
        const newUpload = new AWS.S3.ManagedUpload({
          params: {
              Bucket: process.env.REACT_APP_AWS_BUCKER || 'default-bucket-name', // 버킷 이름
              Key: `logo/${inputData.name}.png`, 
              Body: selectedFile, 
          },
        }); 
        setUpload(newUpload);       
    }   
  };
  const upload2S3 = async () => {
    if (upload) {
        try {
            const result = await upload.promise(); // upload 실행
            // console.log("Image uploaded successfully:", result.Location);
        } catch (error) {console.error("Error uploading image:", error);
        }} else {  }
};




  const onCreateBootcamp = () => {
    const requestReady = {...inputData};

    if (!emptyCheck(requestReady)) {
      alert("빈 입력값이 존재합니다.");
      return ;
    }

    console.log("inputData", inputData);
    ["card", "support", "hasCodingtest"].forEach((element) => {
      requestReady[element] = requestReady[element] === 0 ? true : false;
    })

    const request = {...requestReady,
      onOff: onOffList[requestReady.onOff]
    }

    // console.log("request", request)
    axios.put(API_KEY + bootcampId, request, {
      headers: {
        Authorization: `Bearer ${accessToken}`
      }
    })
    upload2S3()
    navigate("/ManagerPage/Management", {state: request});
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
          <input
            type="file" 
            accept="image/*"
            onChange={addFile} />    
            {  isimg == "" ?  "not in S3" : "in S3"}  
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
`

const emptyCheck = (request: bootcampInput) => {
  for (const key in request) {
    const value = request[key];
    if (value === "imgUrl" || key === "reviewCnt" || key === "algoCnt") { // 이미지는 default 이미지가 존재하므로 스킵
      continue;
    } else if (typeof value === "string" && value === "") {
      // console.log("어디?", key)
      return false;
    } else if (Array.isArray(value) && value.length === 0) {
      // console.log("어디?", key)
      return false;
    }
  }

  return true;
}

const changePropertyStringToNumber = (input : bootcampInputResponse) => {
  const initData = {...input,
    card: input.card? 1 : 2,
    support: input.support? 1 : 2,
    hasCodingtest: input.hasCodingtest? 1 : 2,
    onOff: onOffMap.get(input.onOff) + 1,
    startDate: input.startDate.replace(' ', 'T'),
    endDate: input.endDate.replace(' ', 'T'),
  }
  return initData;
}

export default ManageModify;
