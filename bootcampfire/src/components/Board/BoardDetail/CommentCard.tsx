import styled from 'styled-components';
import A2 from '../Tag';
import AccessTimeOutlinedIcon from '@mui/icons-material/AccessTimeOutlined';
import type {Comment} from '../interface';
import {Bold15px, Normal15px, Normal13px, StyledSpaceBetween, StyledLeftFlex} from '../styled';
import LightBtn from '../../LightBtn';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { colors } from 'constant/constant';
function CommentCard({data}: {data: Comment}) {
    
    let isLogin = data.commentId % 2 == 0 ? true : false;
    const EditBtn = <LightBtn type="first">수정하기</LightBtn>;
    return (
        <WrapperStyledCommentCard>
            <CommentCardContentsArea>
            {data.reply.isReply && <ArrowForwardIcon sx={{marginRight: 1, marginTop: 1}}/>}
            <StyledCommentCard>
                {data.isAnonymous && 
                <CommentWriter>
                    <Bold15px>{data.writer}</Bold15px>
                    <A2>{data.camp}</A2>
                </CommentWriter>}
                {!data.isAnonymous && 
                <CommentWriter>
                    <Bold15px>익명</Bold15px>
                    <A2>익명 캠프</A2>
                </CommentWriter>}
                <CommentContents>{data.content}</CommentContents>
                <CommentLastDiv>
                    <div className='height-center'>
                        <AccessTimeOutlinedIcon sx={{fontSize:13, marginRight: 1}}/>
                        <Normal13px as="span">{data.date}</Normal13px>
                    </div>
                    <div className='gap'>
                        {isLogin && EditBtn}
                        <LightBtn>답글 달기</LightBtn>
                    </div>
                </CommentLastDiv>
            </StyledCommentCard>
            </CommentCardContentsArea>
        </WrapperStyledCommentCard>
    )
}

const StyledCommentCard = styled.div`
    position: relative;
    width: 100%;
`
const WrapperStyledCommentCard = styled.div`
    /* position: relative; */
    border-bottom: 1px solid ${colors.TEXT_LIGHT};
    `
const CommentCardContentsArea = styled.div`
    /* position: relative; */
    display: flex;
    height: 159px;
    width: 97%;
    margin: auto;
    .height-center {
        display: flex;
        align-items: cneter;
    }
    
    .gap {
        display: flex;
        gap: 20px;
    }
    
`
const CommentWriter = styled(StyledLeftFlex)`
    position: absolute;
`

const CommentContents = styled(Normal15px)`
    position: absolute;
    top: 40px;
`

const CommentLastDiv = styled(StyledSpaceBetween)`
    position: absolute;
    top: 115px;
`
export default CommentCard;