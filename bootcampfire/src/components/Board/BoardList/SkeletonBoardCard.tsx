import { colors } from "constant/constant";
import styled, {keyframes} from 'styled-components';

function SkeletonBoardCard () {
    return (
        <StyledSkeletonBoardCard>
        <SkeletonTitle className="position1px"/>
        <SkeletonContent className="position40px"/>
        <Infodiv className="position110px">
            <SkeletonInfodiv/>

            <WriterSpan>
                <SkeletonChip/>
                <SkeletonName/>
            </WriterSpan>
        </Infodiv>
        </StyledSkeletonBoardCard>
    )
}

const WriterSpan = styled.span`
    display: flex;
    align-items: center;
    gap: 10px;
`
const Infodiv = styled.div`
    display: flex;
    justify-content: space-between;
    width: 100%;
`
const loadingAnimation = keyframes`
  0% {
    background-position: -100px;
  }
  100% {
    background-position: 100px;
  }
`;
const SkeletonTitle = styled.div`
    height: 22.5px;
    width: 40%;
    background: linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%);
    animation: ${loadingAnimation} 1s infinite;
`

const SkeletonInfodiv = styled.div`
    height: 15px;
    background: linear-gradient(90deg, #D4D2E3 20%, #f2f2f2 50%, #D4D2E3 80%);
    
    width: 356px;
    animation: ${loadingAnimation} 2s infinite;
`

const SkeletonChip = styled.div`
    border-radius: 50px;
    background-color: ${colors.BORDER_LIGHT};
    width: 74px;
    height: 21px;
`
const SkeletonName = styled.div`
    background-color: ${colors.BORDER_LIGHT};
    width: 90px;
    height: 19px;
`

const SkeletonContent = styled.div`
    height: 18px;
    background-color: ${colors.BORDER_LIGHT};
    width: 80%;

`

const StyledSkeletonBoardCard = styled.div`
    position: relative;
    border-bottom: 1px solid ${colors.BORDER_LIGHT};
    min-width: 600px;
    width: 100%;
    max-width: 1040px;
    height: 138px;
    .position1px {
        position: absolute;
        top: 10px;
    }

    .position40px {
        position: absolute;
        top: 45px;
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




export default SkeletonBoardCard;