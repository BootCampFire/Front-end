import React from 'react';
import styled from "styled-components";
import BootCampCard from "../../components/BootCamp/BootCampCard";
import SelectBox from '../../components/BootCamp/SelectBox'; 
import { StyledPage } from 'pages/BoardPage/styledPage';
import {Link, useNavigate} from 'react-router-dom';

import { RootState } from 'store';
import { useEffect, useState } from 'react';
import axios, { AxiosResponse } from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { fetchBootcampStart, fetchBootcampSuccess, fetchBootcampFailure } from 'store/bootcampListSlice';

const BootCampListPage: React.FC = () => { 
  const currentDate = new Date(); 
  const navigate = useNavigate(); 
  const CardClick = (bootcampId: number) => { navigate(`/bootcampdetail/${bootcampId}`); }; 

  const dispatch = useDispatch(); 
  const {bootcamp, loading, error, dropBoxidx, bootSearch} = useSelector((state: RootState) => state.bootcamp); 

  const {trackList, regionList, etcList,} = useSelector((state: RootState) => state.select); 
  
  const { tmp_lst } = useSelector((state: RootState) => state.select); 
  
  const [bootcampSearchResult, setBootcampSearchResult] = useState<BootcampItem[]>([]); 

  useEffect(() => {
    const filteredBootcamp = bootSearch
      ? bootcamp.filter((item) => item.name.toLowerCase().includes(bootSearch.toLowerCase()))
      : bootcamp;
  
      const selectedTracks = trackList.filter((track) => track.isOn).map((track) => track.name);
      const selectedRegions = regionList.filter((region) => region.isOn).map((region) => region.name);
      
      const restructuredBootcamp = filteredBootcamp.filter((camp) =>
        selectedTracks.every((trackName) => camp.tracks.some((track) => track.name === trackName)) &&
        selectedRegions.every((regionName) => camp.regions.some((region) => region.name === regionName))
      );

      const selectedEtc = etcList.filter((etc) => etc.isOn).map((etc) => etc.name);
      const hasSelectedEtc = selectedEtc.includes('온라인') || selectedEtc.includes('오프라인') || selectedEtc.includes('온오프라인');

      const restructuredBootcamp2 = restructuredBootcamp.filter((item) => {
      const { onOff, cost, support, hasCodingtest } = item;
      const isOnOffMatched = !hasSelectedEtc || selectedEtc.includes(onOff);

      const isCostMatched = !selectedEtc.includes('비용') || cost;
      const isSupportMatched = !selectedEtc.includes('지원금') || support;
      const isCodingTestMatched = !selectedEtc.includes('코딩 테스트') || hasCodingtest;

      return isOnOffMatched && isCostMatched && isSupportMatched && isCodingTestMatched;
    });  
    setBootcampSearchResult(restructuredBootcamp2);
  }, [etcList, regionList, trackList, bootcamp, bootSearch]);

  useEffect(() => { 
    dispatch(fetchBootcampStart()); 
    const api_url = dropBoxidx === 0 ? "names" : 
                    dropBoxidx === 1 ? "scores" : 
                    dropBoxidx === 2 ? "reviews" : "names" 
    axios.get(`http://localhost:8080/bootcamps/lists/${api_url}`) 
    // .then((response) => console.log(response.data))
    .then((response) => dispatch(fetchBootcampSuccess(response.data.data)))
    .catch((error) => dispatch(fetchBootcampFailure(error.message)));
  }, [dropBoxidx]);

  // console.log(bootcampSearchResult)
  // console.log(bootcamp)


  if (loading) {return <div>Now Loading...</div>}
  else if (!bootcamp || bootcamp.length === 0) {return <div>No data available.</div>;}
  return (
    <>
    <Container>
      {tmp_lst}
      <TopSection><SelectBox /></TopSection>
      <CardSection>        
        <CardContainer>
          {bootcampSearchResult.map((item) => (
            <BootCampCardWrapper key={item.id} onClick={() => CardClick(item.id)}>
              <BootCampCard item={item} key={item.id} cur={currentDate} />
            </BootCampCardWrapper>))}
        </CardContainer>      
      </CardSection>
    </Container>
    </>
  );
};

export default BootCampListPage;

const Container = styled(StyledPage)`
display: flex;
flex-direction: row;`;

const TopSection = styled.div`
  flex: 1;
  padding: 20px;
  text-align: center;
`;

const CardSection = styled.div`
  flex: 4;
  padding: 20px;
  background-color: #ffffff;
`;


const CardContainer = styled.div`
display: flex;
flex-wrap: wrap;
justify-content: center;
margin:-10px;
`;


const BootCampCardWrapper = styled.div`
  margin: 15px;
  position: relative;
  cursor: pointer;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(0, 0, 0, 0.2); /* 검은색 투명도 20% 덮개 색상 */
    border-radius: 4px;
    z-index: 1; /* 다른 컨텐츠보다 위로 배치 */
    visibility: hidden;
    opacity: 0;
    transition: opacity 0.2s, visibility 0.2s;
  }

  &:hover::before {
    visibility: visible;
    opacity: 1;
  }
`;


interface BootcampItem {
  id: number;
  name: string;
  cost: boolean;            // 비용 value : true, false
  support: boolean;         // 지원금 value : true, false
  hasCodingtest: boolean;   // 코딩 테스트 value : true, false
  onOff: string;            // value : 온라인, 온/오프라인, 오프라인
  startDate: Date; 
  endDate: Date;   
  imgUrl: string;
  reviewCnt: number;
  score: number;
  tracks: { id: number; name: string }[];
  regions: { id: number; name: string }[];
}    

interface BootcampTaged {
  id : number;
  tag : string[];

}

