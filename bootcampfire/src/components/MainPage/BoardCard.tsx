import React from 'react';
import A2 from 'components/Board/Tag';
import type {Board} from 'components/Board/interface';
import { Bold18px, Bold15px ,Normal15px, Normal13px } from 'components/Board/styled';
import styled from 'styled-components';
import DateInfo from 'components/Board/BoardList/DateInfo';
interface BoardDate {
    view: number;
    likeCnt: number;
    commentCnt: number;
    createdDate: string;
}


function BoardCard({data, onClick}: {data: Board, onClick: () => void}){
    const dataForDateInfo: BoardDate = {
        view: data.view,
        likeCnt: data.likeCnt,
        commentCnt: data.commentCnt,
        createdDate: data.createdDate,
    }

    return (
        <StyledBoardCard onClick={onClick}>
            <Bold18px className="position1px">{data.title}</Bold18px>
            <Normal15px className="position40px">{data.content}</Normal15px>
            <A2>{data.category}</A2>
            <Infodiv className="position110px">
                <DateInfo data={dataForDateInfo}/>

                <WriterSpan>
                    <A2>{data.bootcamp}</A2>
                    <Bold15px as="span">{data.writer}</Bold15px>
                </WriterSpan>
            </Infodiv>
        </StyledBoardCard>
    )
}

const StyledBoardCard = styled.div`
    position: relative;
    border-bottom: solid;
    border-width: 1px;
    /* min-width: 600px;
    width: 60%;
    max-width: 1040px; */
    height: 138px;
    .position1px {
        position: absolute;
        top: 1px;
    }

    .position40px {
        position: absolute;
        top: 40px;
    }

    .position110px {
        position: absolute;
        top: 110px;
    }

    .infoMargin {
        margin: 0px 10px;
    }

    .hegiht-center {
        display: flex;
        align-items: center;

    }
`

const Infodiv = styled.div`
    display: flex;
    justify-content: space-between;
    width: 100%;
`

const WriterSpan = styled.span`
    display: flex;
    align-items: center;
    gap: 10px;
`

export default BoardCard;