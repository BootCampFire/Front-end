import styled from 'styled-components';
import { StyledBtn } from 'components/Board/styled';
import { colors } from '../../constant/constant';

import DetailTab from 'components/BootCamp/DetailTab';
import ReviewTab from 'components/BootCamp/ReviewTab';
import ReviewCreate from 'components/BootCamp/ReviewCreate';

import { useParams } from 'react-router-dom';
import { useState } from 'react';
import { StyledPage } from 'pages/BoardPage/styledPage';

import { Bold18px } from 'components/Board/styled';

import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../store';

import { useEffect } from 'react';
import axios from 'axios';

const BootCampListDetailPage: React.FC = () => {
  const { bootcampid } = useParams();

  const bootcampIdNumber = bootcampid ? parseInt(bootcampid) : undefined;
  const [isDetailTabSelected, setIsDetailTabSelected] = useState(0);
  const handleTabClick = (isDetailTab: number) => {
    setIsDetailTabSelected(isDetailTab);
  };
  const { isLoggedIn, bootcampId, nickname } = useSelector((state: RootState) => state.auth);

  const [bootdetail, setBootdetail] = useState<BootcampItem | null>(null);
  const [bootreview, setbootreview] = useState<ReviewItem[]>([]);
  const [myreview, setMyReview] = useState<ReviewItem>({} as ReviewItem);

  useEffect(() => {
    if (bootcampid) {
      const bootcampIdNumber = parseInt(bootcampid);
      Promise.all([
        axios.get(`http://localhost:8080/bootcamps/${bootcampIdNumber}`),
        axios.get(`http://localhost:8080/reviews/${bootcampIdNumber}/lists`),
        axios.get(`http://localhost:8080/reviews/${bootcampId}/vaildation`),
      ])
        .then(([bootcampResponse, reviewResponse, myreviewResponse]) => {
          setBootdetail(bootcampResponse.data.data);
          setbootreview(reviewResponse.data.data);
          setMyReview(myreviewResponse.data.data);
        })
        .catch((error) => {});
    }
  }, []);

  if (!bootdetail) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <BootCampDetailMain>
        <Tab>
          <LogoContainer>
            <LogoImage src={bootdetail.imgUrl?.replace('.', '')} alt="BootCamp Logo" />
          </LogoContainer>
          <VerticalDivs>
            <HorizontalDivs>
              <Mtext>{bootdetail.name}</Mtext>
              <StyledBtn type="first" as="a" href={bootdetail.siteUrl}>
                사이트로 가기
              </StyledBtn>
            </HorizontalDivs>
            <HorizontalDivs>
              <Mtext2>({Math.round(bootdetail.score * 10) / 10})</Mtext2>
              <Mtext3 style={{ marginRight: '50px' }}>{bootdetail.reviewCnt} 개의 후기가 작성되었습니다.</Mtext3>
              <Mtext2>
                모집 기간 : {new Date(bootdetail.startDate).toLocaleDateString()} ~{' '}
                {new Date(bootdetail.endDate).toLocaleDateString()}
              </Mtext2>
            </HorizontalDivs>
          </VerticalDivs>
        </Tab>
        <SelectTab>
          <HorizontalDivs>
            <MTab selected={isDetailTabSelected === 0 ? true : false} onClick={() => handleTabClick(0)}>
              기본 정보
            </MTab>
            <MTab selected={isDetailTabSelected === 1} onClick={() => handleTabClick(1)}>
              후기
            </MTab>
          </HorizontalDivs>
          <HorizontalDivs>
            {!isLoggedIn ? (
              <Mtext2>로그인하시면 후기 이용이 가능합니다.</Mtext2>
            ) : bootcampIdNumber != bootcampId ? null : !myreview.id ? (
              <StyledBtn2 onClick={() => handleTabClick(2)}>후기 작성하기</StyledBtn2>
            ) : (
              <StyledBtn2 onClick={() => handleTabClick(2)}>후기 수정하기</StyledBtn2>
            )}
          </HorizontalDivs>
        </SelectTab>
        {isDetailTabSelected === 0 ? (
          <DetailTab bootcamp={bootdetail} />
        ) : isDetailTabSelected === 1 ? (
          <ReviewTab reviewlist={bootreview} />
        ) : isDetailTabSelected === 2 ? (
          <ReviewCreate review={myreview} />
        ) : null}
      </BootCampDetailMain>
    </>
  );
};

export default BootCampListDetailPage;

const BootCampDetailMain = styled(StyledPage)`
  display: flex;
  justify-content: center;
  flex-direction: column;
  margin: 20px 0;
`;
const SelectTab = styled.div`
  display: flex;
  height: 90px;
  width: 100%;
  justify-content: space-between;
`;

const Tab = styled.div`
  display: flex;
  height: 120px;
  margin: 10px 0;
  // background-color: #66ffcc;
`;

const LogoContainer = styled.div`
  width: 300px;
  height: 160px;
  margin: 10px;
  border-radius: 10px;
  overflow: hidden;
`;

const LogoImage = styled.img`
  width: 80%;
  object-fit: cover;
`;

const VerticalDivs = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

const VerticalCenter = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  align-items: center; /* 수직 가운데 정렬 */
`;

const HorizontalDivs = styled.div`
  display: flex;
  flex-direction: column;
  flex-direction: row;
`;

const Mtext = styled.div`
  font-family: 'DM Sans';
  font-style: normal;
  font-weight: 700;
  font-size: 24px;
  line-height: 31px;
  display: flex;
  align-items: center;
  color: #0e0301;
  margin: 0px 20px;
`;

const Mtext2 = styled.div`
  font-family: 'DM Sans';
  font-style: normal;
  font-weight: 700;
  font-size: 18px;
  line-height: 31px;
  display: flex;
  align-items: center;
  color: #0e0301;
  margin: 20px 3px;
`;

const Mtext3 = styled.div`
  font-family: 'DM Sans';
  font-style: normal;
  font-weight: 400;
  font-size: 15px;
  display: flex;
  align-items: center;
  color: #5d5a88;
  margin: 20px 2px;
`;

const MTab = styled.div<{ selected: boolean }>`
font-family: 'DM Sans'; font-style: normal; font-weight: 700; font-size: 22px;
display: flex; align-items: center; color: #0E0301; margin : 0 40px;
cursor: pointer;
  padding-bottom: 5px; /* Add padding for the orange bar */
  border-bottom: ${(props) => (props.selected ? '5px solid #FF603D' : 'none')};
  &:hover { color: #FF603D; solid #FF603D;}`;

const StyledBtn2 = styled(Bold18px)`
  background-color: ${colors.PRIMARY};
  color: ${colors.WHITE};
  display: inline-flex;
  padding: 5px 15px;
  justify-content: center;
  align-items: center;
  font-size: 22px;
  border-radius: 10px;
  gap: 10px;
  height: 38px;
`;

interface BootcampItem {
  id: number;
  name: string;
  siteUrl: string;
  process: string;
  schedule: string;
  description: string;
  cost: number;
  card: boolean;
  support: boolean;
  hasCodingtest: boolean;
  onOff: string;
  startDate: Date;
  endDate: Date;
  imgUrl: string;
  reviewCnt: number;
  score: number;
  algoCnt: number | null;
  tracks: { id: number; name: string }[];
  languages: { id: number; name: string }[];
  regions: { id: number; name: string }[];
}

interface BootCampReviewProps {
  reviewlist: ReviewItem[];
}

interface ReviewItem {
  id: number;
  user: string;
  bootcampName: string;
  tip: string;
  good: string;
  bad: string;
  isRecommend: boolean;
  likeCnt: number;
  curriculum: number;
  potential: number;
  backUp: number;
  management: number;
  mood: number;
  score: number;
  createdDate: Date;
  isAlreadyReviewLike: boolean;
}
