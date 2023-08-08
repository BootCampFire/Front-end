import React from 'react';
import styled from "styled-components";
import SeletedTag from 'components/BootCamp/SeletedTag';

import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../store';
// import {onoff_num, onoff_text, category_onoff} from '../../store/selectSlice';
import { initTrack, initRegion, 

          onoff_track, 
          onoff_region, onoff_etc,
          category_onoff } from 'store/selectSlice';

import axios from 'axios';

import { useEffect } from 'react';

// /bootcamps/regions

// /bootcamps/tracks

const SelectBox: React.FC = () =>  {

  // const { sel_lst, item_lst, category, tmp_lst } = useSelector((state: RootState) => state.select);

  const { trackList, regionList, etcList, category, tmp_lst, 
          } = useSelector((state: RootState) => state.select);

  const dispatch = useDispatch();

  const handleCategoryToggle = (value: number) => {dispatch(category_onoff(value));};

  useEffect(() => {
    axios.get(`http://localhost:8080/bootcamps/tracks`) 
      .then((response) => dispatch(initTrack(response.data.data)))
      .catch((error) => console.log(error.message));
    axios.get(`http://localhost:8080/bootcamps/regions`) 
      .then((response) => dispatch(initRegion(response.data.data)))
      .catch((error) => console.log(error.message));
  }, []);


  const handleSeletedTagClick = (categoryIndex: number, itemIndex: number) => {
    if (categoryIndex === 0) {
      dispatch(onoff_track(itemIndex));
    }
     else if (categoryIndex === 1) {
      dispatch(onoff_region(itemIndex));
    } else if (categoryIndex === 2) {
      dispatch(onoff_etc(itemIndex));
    }
  };  
  // console.log(trackList);
  // console.log(regionList);

  const filteredTrackList = trackList.filter((item) => item.isOn);
  const filteredRegionList = regionList.filter((item) => item.isOn);
  const filteredEtcList = etcList.filter((item) => item.isOn);



  return (
    <>
      <Container>
        <div>
          <NavItem onClick={() => handleCategoryToggle(0)}>
            <span>트랙</span>
            <span style={{ textAlign: "center" }}>{category[0] ? "△" : "▽"}</span>
          </NavItem>
          {category[0] && (
            <ItemBox>
              {trackList.map((item, idx) => (

                <SeletedTag text={item.name}
                  isOn={item.isOn}  
                  onClick={() => handleSeletedTagClick(0, idx)}
                />
              ))}
            </ItemBox>
          )}
        </div>

        <div>
          <NavItem onClick={() => handleCategoryToggle(1)}>
            <span>지역</span>
            <span style={{ textAlign: "center" }}>{category[1] ? "△" : "▽"}</span>
          </NavItem>
          {category[1] && (
            <ItemBox>
              {regionList.map((item, idx) => (
                <SeletedTag text={item.name}
                  isOn={item.isOn}  
                  onClick={() => handleSeletedTagClick(1, idx)}
                />
              ))}
            </ItemBox>
          )}
        </div>

        <div>
          <NavItem onClick={() => handleCategoryToggle(2)}>
            <span>온/오프</span>
            <span style={{ textAlign: "center" }}>{category[2] ? "△" : "▽"}</span>
          </NavItem>
          {category[2] && (
            <ItemBox>
              {etcList.slice(0, 3).map((item, idx) => (
                <SeletedTag text={item.name}
                  isOn={item.isOn}  
                  onClick={() => handleSeletedTagClick(2, idx)}

                />
              ))}
            </ItemBox>
          )}
        </div>

        <div>
          <NavItem onClick={() => handleCategoryToggle(3)}>
            <span>비용 및 기타</span>
            <span style={{ textAlign: "center" }}>{category[3] ? "△" : "▽"}</span>
          </NavItem>
          {category[3] && (
            <ItemBox>
              {etcList.slice(3).map((item, idx) => (
                <SeletedTag text={item.name}
                  isOn={item.isOn}  
                  onClick={() => handleSeletedTagClick(2, idx+3)}
                />
              ))}
            </ItemBox>
          )}
        </div>
        <NavItem>선택 항목</NavItem>
        <ItemBox>

              {filteredTrackList.map((item, idx) => (
                <SeletedTag text={item.name}
                  isOn={true}  
                />
              ))}
              {filteredRegionList.map((item, idx) => (
                <SeletedTag text={item.name}
                  isOn={true}  
                />
              ))}
              {filteredEtcList.map((item, idx) => (
                <SeletedTag text={item.name}
                  isOn={true}  
                />
              ))}        

        </ItemBox>
      </Container>
    </>
  );
};

// const filteredTrackList = trackList.filter((item, idx) => trackBoolean[idx]);
// const filteredRegionList = regionList.filter((item, idx) => regionBoolean[idx]);
// const filteredEtcList = etcList.filter((item, idx) => etcBoolean[idx]);


const Container = styled.div`
  display: flex;
  flex-direction: column;
  border: 2px solid #FF603D;
  border-radius: 20px;
  padding: 10px;
`;

const NavItem = styled.div`
  display: flex;
  align-items: center;
  font-weight: bold;
  font-size: 14pt;
  position: relative;
  height: 50px;
  z-index: 1; /* Add this line to set z-index */

  ::before {
    content: "";
    position: absolute;
    width: 100%;
    height: 1px;
    background-color: red;
    bottom: 0;
    left: 0;
    visibility: visible;
    transform: scaleX(1);
    transition: transform 0.2s ease-in-out;
  }

  &:hover::before {
    visibility: visible;
    transform: scaleX(1);
  }
`;

const ItemBox = styled.div`
    flex-wrap: wrap;
    display: flex;
    padding : 10px;
    gap : 10px;
    min-height: 70px;
`;

export default SelectBox;
