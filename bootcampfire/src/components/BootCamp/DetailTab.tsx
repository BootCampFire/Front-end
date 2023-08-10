import styled from 'styled-components';
import Tag from './Tag';

const DetailTab: React.FC<BootCampCardProps> = ({ bootcamp }) => {
  return (
    <>
      <TabBox>
        <VerticalDivs>
          <HorizontalDivs>
            <SubDiv>
              <Mtext>트랙</Mtext>
              <TagContainer>
                {bootcamp.tracks.map((tag) => (
                  <Tag text={tag.name} />
                ))}
              </TagContainer>
            </SubDiv>
            <SubDiv>
              <Mtext>기술 스택</Mtext>
              <TagContainer>
                {bootcamp.languages.map((tag) => (
                  <Tag text={tag.name} />
                ))}
              </TagContainer>
            </SubDiv>
          </HorizontalDivs>
          <HorizontalDivs>
            <SubDiv>
              <Mtext>일정 및 장소</Mtext>
              <ContentContainer width="95%">
                <VerticalDivs>
                  <HorizontalDivs>
                    <Inner1>일정 : </Inner1>
                    <Inner2> {bootcamp.schedule}</Inner2>
                  </HorizontalDivs>
                  <HorizontalDivs>
                    <Inner1>온오프라인 : </Inner1>
                    <Inner2> {bootcamp.onOff}</Inner2>
                  </HorizontalDivs>
                  <HorizontalDivs>
                    <Inner1>학습장소 : </Inner1>
                    <Inner2> {bootcamp.regions.map((tag) => tag.name).join(', ')}</Inner2>
                  </HorizontalDivs>
                </VerticalDivs>
              </ContentContainer>
            </SubDiv>
            <SubDiv>
              <Mtext>지원금 및 수강료</Mtext>
              <ContentContainer width="70%">
                <VerticalDivs>
                  <HorizontalDivs>
                    <Inner1> 수강료 : </Inner1>
                    <Inner2> {bootcamp.cost}</Inner2>
                  </HorizontalDivs>
                  <HorizontalDivs>
                    <Inner1> 지원금 : </Inner1>
                    <Inner2> {bootcamp.support ? 'O' : 'X'} </Inner2>
                  </HorizontalDivs>
                  <HorizontalDivs>
                    <Inner1> 내일배움 카드 : </Inner1>
                    <Inner2> {bootcamp.card ? 'O' : 'X'} </Inner2>
                  </HorizontalDivs>
                  
                </VerticalDivs>
              </ContentContainer>
            </SubDiv>
          </HorizontalDivs>
          <HorizontalDivs>
            <VerticalDivs>
              <SubDiv>
                <Mtext>지원 절차</Mtext>
                <Inner3>{bootcamp.process}</Inner3>
              </SubDiv>
            </VerticalDivs>
          </HorizontalDivs>
          <SubDiv>
            <Mtext>설명</Mtext>
            <ContentContainer width="100%">{bootcamp.description}</ContentContainer>
          </SubDiv>
        </VerticalDivs>
      </TabBox>
    </>
  );
};

export default DetailTab;

const TabBox = styled.div`
  box-sizing: border-box;
  width: 100%;
  height: 900px;
  background: #fff9f9;
  border: 1px solid #ff603d;
  border-radius: 24px;
`;

const VerticalDivs = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  margin: 4px;
`;

const HorizontalDivs = styled.div`
  display: flex;
  flex-direction: row;
  & > div {
    flex-basis: 50%;
  }
`;

const SubDiv = styled.div`
  margin: 40px;
`;

const Mtext = styled.div`
  font-family: 'DM Sans';
  font-style: normal;
  font-weight: 700;
  font-size: 18px;
  align-items: center;
  color: #0e0301;
  margin: 15px 2px;
`;

const Inner1 = styled.span`
  font-family: 'DM Sans';
  font-style: normal;
  font-weight: 700;
  font-size: 15px;
  line-height: 25px;
  display: flex;
  color: #290e08;
  margin: 4px;
`;

const Inner2 = styled.span`
  font-family: 'DM Sans';
  font-style: normal;
  font-weight: 400;
  font-size: 15px;
  line-height: 25px;
  display: flex;
  color: #575757;
  margin: 4px;
`;

const Inner3 = styled.div`
  font-family: 'DM Sans';
  font-style: normal;
  font-weight: 400;
  font-size: 15px;
  line-height: 25px;
  isplay: flex;
  align-items: center;
  color: #290e08;
`;

const TagContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: left;
  padding-top: 5px;
  gap: 5px;
`;

const ContentContainer = styled.div<{ width: string }>`
  width: ${(props) => props.width || '90%'};
  box-sizing: border-box;
  background: #ffffff;
  border: 2px solid #d4d2e3;
  border-radius: 24px;
  padding: 10px;
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

interface BootCampCardProps {
  bootcamp: BootcampItem;
}
