import styled from 'styled-components';
import { LightBtn, Bold15px, StrongBtn, Normal15px } from 'components/Board/styled';
import { colors } from 'constant/constant';
import FileUploadOutlinedIcon from '@mui/icons-material/FileUploadOutlined';
import { useState, useRef } from 'react';
import type { RootState } from 'store';
import { useSelector } from 'react-redux';
import { bootcamp as bootcampList } from 'constant/constant';
import axios from 'axios';

const duplicateMsg = ['중복 검사가 필요합니다.', '사용 가능한 닉네임입니다.', '이미 사용중인 닉네임입니다.'];

function PersonalInfo() {
  const { nickname, bootcampId /*email, bojId*/ } = useSelector((state: RootState) => state.auth);
  const [enteredNickName, setEneteredNickName] = useState(nickname ?? '');
  const [duplicateState, setDuplicateState] = useState(0);
  const [enteredBojId, setEnteredBojId] = useState('');
  const inputFileRef = useRef<HTMLInputElement>(null);

  const handlerNickNameInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEneteredNickName(event.target.value);
  };

  // 중복 인증 axios 요청하기, enteredNickName 사용
  const handlerDuplicateNickname = () => {
    axios.post('http://localhost:8080/users/duplication', { nickname: enteredNickName }).then((res) => {
      if (res.data.message.split(' ')[0] === '이미') {
        setDuplicateState(2);
      } else {
        setDuplicateState(1);
      }
    });
  };

  const handelrCertifyCamp = () => {
    // 소속 인증 요청, 로그인 완료 후 뭔가 작업해야 하는듣ㅅ?
    axios.post('http://localhost:8080/users/confirm', {
      headers: {
        headers: { Authorization: `Bearer ${localStorage.getItem('Authorization')}` },
      },
    });
  };

  const handlerSubmitInfo = () => {
    // 정보 취합하여 올리기 : 닉네임, BOJ 아이디
    const formdata = new FormData();
    if (inputFileRef.current?.files) {
      formdata.append('imgFile', inputFileRef.current?.files[0]);
    }
    formdata.append('bojId', enteredBojId);
    formdata.append('nickname', enteredNickName);

    axios
      .put('http://localhost:8080/users', formdata, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })
      .then((res) => {
        console.log(res);
      });
  };

  const handlerBojIdInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEnteredBojId(event.target.value);
  };

  const handlerUploadBtn = () => {
    inputFileRef.current?.click();
  };

  return (
    <WarpperStyledPersonalInfo>
      <StyledPersonalInfo>
        <StyledForm>
          <RowDiv>
            <ColomnDiv>
              <InputDiv style={{ position: 'relative' }}>
                <StyledBold15px as="label" htmlFor="nickName">
                  닉네임
                </StyledBold15px>
                <StyledInput type="text" id="nickname" value={enteredNickName} onChange={handlerNickNameInput} />
                <DuplicateCheckMsg type={duplicateState}>{duplicateMsg[duplicateState]}</DuplicateCheckMsg>
              </InputDiv>

              <InputDiv>
                <StyledBold15px as="label" htmlFor="bojId">
                  BOJ ID
                </StyledBold15px>
                <StyledInput type="text" id="bojId" value={enteredBojId} onChange={handlerBojIdInput} />
              </InputDiv>

              <InputDiv>
                <StyledBold15px as="label" htmlFor="camp">
                  소속
                </StyledBold15px>
                <StyledInput type="text" value={bootcampList[bootcampId]} id="camp" readOnly />
              </InputDiv>

              <InputDiv>
                <StyledBold15px as="label" htmlFor="file">
                  인증 사진
                </StyledBold15px>
                <StyledInput type="file" id="file" ref={inputFileRef} />
                <ImgUploadDiv as="div">
                  <Bold15px as="span">test</Bold15px>
                  <FileUploadOutlinedIcon
                    sx={{ marginRight: 1, color: colors.TEXT_NORMAL }}
                    onClick={handlerUploadBtn}
                    className="icon"
                  />
                </ImgUploadDiv>
              </InputDiv>

              <InputDiv>
                <StyledBold15px as="label" htmlFor="email">
                  이메일
                </StyledBold15px>
                <StyledInput type="email" value="email" id="email" readOnly />
              </InputDiv>
            </ColomnDiv>
            <ColomnDiv>
              <StyledLightBtn type="first" onClick={handlerDuplicateNickname}>
                중복확인
              </StyledLightBtn>
              <InvisibileLightBtn type="first">fasd</InvisibileLightBtn>
              <InvisibileLightBtn type="first">asfd</InvisibileLightBtn>
              <StyledLightBtn type="first" onClick={handelrCertifyCamp}>
                소속 인증하기
              </StyledLightBtn>
              <InvisibileLightBtn type="first">asfd</InvisibileLightBtn>
            </ColomnDiv>
          </RowDiv>
          <StrongBtn type="first" onClick={handlerSubmitInfo}>
            수정하기
          </StrongBtn>
        </StyledForm>
      </StyledPersonalInfo>
    </WarpperStyledPersonalInfo>
  );
}

const WarpperStyledPersonalInfo = styled.div`
  height: 800px;
  display: flex;
  align-items: center;

  .icon:hover {
    color: ${colors.PRIMARY};
  }
`;
const DuplicateCheckMsg = styled(Normal15px)<{ type: number }>`
  position: absolute;
  top: 74px;
  left: 130px;
  color: ${(props) => {
    switch (props.type) {
      case 1:
        return `blue`;
      case 2:
        return `red`;
    }
  }};
`;

const StyledPersonalInfo = styled.div`
  margin: auto;
  min-width: 800px;
  width: 40%;
  max-width: 900px;
  height: 600px;
  border: 0.5px solid ${colors.TEXT_LIGHT};
  background-color: ${colors.BACKGROUND_LIGHT};
  border-radius: 25px;
`;

const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100%;
  gap: 25px;
`;

const StyledBold15px = styled(Bold15px)`
  display: inline-block;
  text-align: center;
  background-color: ${colors.WHITE};
  width: 118px;
  border: 1px solid ${colors.TEXT_LIGHT};
  height: 45px;
  padding: 0 0 0 0;
  line-height: 45px;
`;

const ImgUploadDiv = styled.div`
  background-color: ${colors.WHITE};
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 348px;
  height: 45px;
  padding: 0;
  border: 1px solid ${colors.TEXT_LIGHT};
`;

const RowDiv = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  gap: 20px;
`;

const ColomnDiv = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const InputDiv = styled.div`
  display: flex;
  height: 85px;
  align-items: center;
`;

const StyledInput = styled.input`
  width: 348px;
  height: 45px;
  padding: 0;
  border: 1px solid ${colors.TEXT_LIGHT};

  &[type='file'] {
    position: absolute;
    width: 0;
    height: 0;
    padding: 0;
    overflow: hidden;
    border: 0;
  }

  &:read-only {
    background-color: ${colors.BACKGROUND_LIGHT};
    color: ${colors.TEXT_LIGHT};
    font-family: DM Sans;
    font-style: bold;
    margin: 0px;
  }
`;

const StyledLightBtn = styled(LightBtn)`
  margin: 29.5px 0;
`;

const InvisibileLightBtn = styled(StyledLightBtn)`
  visibility: hidden;
`;
export default PersonalInfo;
