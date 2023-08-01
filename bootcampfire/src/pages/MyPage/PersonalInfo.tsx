import React from "react";
import styled from "styled-components";
import { LightBtn, Bold15px, SrtongBtn } from "components/Board/styled";
import { colors } from "constant/constant";
import FileUploadOutlinedIcon from '@mui/icons-material/FileUploadOutlined';

function PersonalInfo() {
    return (
        <WarpperStyledPersonalInfo>
        <StyledPersonalInfo>
            <StyledForm>
                <RowDiv>
                    <ColomnDiv>
                        <InputDiv>
                            <StyledBold15px as="label" htmlFor="nickName">닉네임</StyledBold15px>
                            <StyledInput type="text" id="nickname"/>
                        </InputDiv>

                        <InputDiv>
                            <StyledBold15px as="label" htmlFor="bojId">BOJ ID</StyledBold15px>
                            <StyledInput type="text" id="bojId"/>
                        </InputDiv>

                        <InputDiv>
                            <StyledBold15px as="label" htmlFor="camp">소속</StyledBold15px>
                            <StyledInput type="text" value=" 소속test" id="camp" readOnly/>
                        </InputDiv>

                        <InputDiv>
                            <StyledBold15px as="label" htmlFor="file">인증 사진</StyledBold15px>
                            <StyledInput type="file" id="file" />
                            <ImgUploadDiv as="div">
                                <Bold15px as="span">test</Bold15px>
                                <FileUploadOutlinedIcon sx={{marginRight: 1, color: colors.TEXT_NORMAL}} className="icon"/>
                            </ImgUploadDiv>
                        </InputDiv>    

                        <InputDiv>
                            <StyledBold15px as="label" htmlFor="email">이메일</StyledBold15px>
                            <StyledInput type="email" value="이메일test" id="email" readOnly />
                        </InputDiv>
                    </ColomnDiv>
                    <ColomnDiv>
                        <StyledLightBtn type="first">중복확인</StyledLightBtn>
                        <InvisibileLightBtn type="first">fasd</InvisibileLightBtn>
                        <InvisibileLightBtn type="first">asfd</InvisibileLightBtn>
                        <StyledLightBtn type="first">소속 인증하기</StyledLightBtn>
                        <InvisibileLightBtn type="first">asfd</InvisibileLightBtn>
                    </ColomnDiv>
                </RowDiv>
                <SrtongBtn type="first">수정하기</SrtongBtn>

            </StyledForm>
        </StyledPersonalInfo>
        </WarpperStyledPersonalInfo>
    )
}

const WarpperStyledPersonalInfo = styled.div`
    height: 800px;
    display: flex;
    align-items: center;

    .icon:hover{
        color: ${colors.PRIMARY};
    }

`

const StyledPersonalInfo = styled.div`
    margin: auto;
    min-width: 800px;
    width: 40%;
    max-width: 900px;
    height: 600px;
    border: 0.5px solid ${colors.TEXT_LIGHT};
    background-color: ${colors.BACKGROUND_LIGHT};
    border-radius: 25px;
`

const StyledForm = styled.form`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    height: 100%;
    gap: 25px;
`

const StyledBold15px = styled(Bold15px)`
    display: inline-block;
    text-align: center;
    background-color: ${colors.WHITE};
    width: 118px;
    border: 1px solid ${colors.TEXT_LIGHT};
    height: 45px;
    padding: 0 0 0 0;
    line-height: 45px;
`

const ImgUploadDiv = styled.div`
    background-color: ${colors.WHITE};
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 348px;
    height: 45px;
    padding: 0;
    border: 1px solid ${colors.TEXT_LIGHT};
`

const RowDiv = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: center;
    gap: 20px;
`

const ColomnDiv = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
`

const InputDiv = styled.div`
    display: flex;
    height: 85px;
    align-items: center;
`

const StyledInput = styled.input`
    width: 348px;
    height: 45px;
    padding: 0;
    border: 1px solid ${colors.TEXT_LIGHT};

    &[type="file"] {
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
`

const StyledLightBtn = styled(LightBtn)`
    margin: 29.5px 0;

`

const InvisibileLightBtn = styled(StyledLightBtn)`
    visibility: hidden;
`
export default PersonalInfo;