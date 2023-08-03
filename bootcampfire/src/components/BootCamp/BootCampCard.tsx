import React from 'react';
import styled from 'styled-components';
import Tag from './Tag';

interface BootcampItem {
  id: number;
  name: string;
  cost: boolean;
  support: boolean;
  hasCodingtest: boolean;
  onOff: string;
  startDate: Date; 
  endDate: Date;   
  imgUrl: string;
  reviewCnt: number;
  score: number;
  tracks: { id: number; name: string }[];
  regions: { id: number; name: string }[];
}


interface BootCampCardProps {
  item: BootcampItem;
  cur: Date;
}

const BootCampCard: React.FC<BootCampCardProps> = ({ item, cur }) => {

  const is_Support = item.support ? "지원금 O" : "지원금 X";
  const is_test = item.support ? "코테 O"   : "코테 X";
  const isDateInRange = new Date(cur) >= new Date(item.startDate) && new Date(cur) <= new Date(item.endDate);
  
  return (
    <CardContainer>
      <div>
      {isDateInRange && <div>모집중</div>}
      </div>
      <LogoImage src={item.imgUrl} alt="BootCamp Logo" />
      <FlexContainer>
        <CardHeading>{item.name}</CardHeading>
        <ScoreText>{Math.round(item.score * 10) / 10} </ScoreText>
      </FlexContainer>
        <TagContainer>
          <Tag text={item.onOff} color='#21C63C' />
          <Tag text={is_Support} color='#4E80FF' />
          <Tag text={is_test} color='#B131DD' /> 
        </TagContainer>
        <TagContainer>
            {item.tracks.map((tag) => (<Tag text={tag.name} />))}
        </TagContainer>
    </CardContainer>
  );
};

export default BootCampCard;



const CardContainer = styled.div`
  position: relative;
  width: 240px; 
  height: 270px;
  border-radius: 24px;
  background-color: #ffffff;
  box-shadow: 1px 4px 4px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
`;

const LogoImage = styled.img`
  height: 90px;
  border-radius: 10px;
`;

const TagContainer = styled.div`
display: flex;
flex-wrap: wrap;
justify-content: center;
padding-top:5px;
  gap: 5px;
`;

const CardHeading = styled.h2`
  font-family: 'DM Sans';
  font-style: normal;
  font-weight: 700;
  line-height: 38px;
  font-size: 18px;
  margin-bottom: 8px; /* 글자 아래에 간격 추가 */
`;

const ScoreText = styled.h2`
font-family: 'DM Sans';
font-style: normal;
font-weight: 700;
font-size: 18px; /* 작은 글자 크기 설정 */
  color: #94969b; /* 기본 글자 색상 설정 */
  margin-bottom: 8px; /* 글자 아래에 간격 추가 */
  line-height: 38px;
`;

const FlexContainer = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
`;