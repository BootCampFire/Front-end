import axios from 'axios';
import ManageCard from 'components/Manager/ManageCard';

import { useEffect, useState } from 'react';

import styled from 'styled-components';


interface registBootCamp {
  img: string;
  id: number;
  nickname: string;
}
export default function Regist() {
  const [rows, setRows] = useState<registBootCamp[]>([]);

  useEffect(() => {
    axios.get(`http://localhost:8080/users/admin/permission/list`).then((res) => {
      setRows(res.data.data);
    });
  }, []);

  return (

    <WrapperManageCardContainer className='Wrapper'>
      <ManageCardContainer className='Container'>
         {rows.map((row) => (
          <ManageCard id={row.id} img={row.img} nickname={row.nickname}></ManageCard>
        ))}
      </ManageCardContainer>
    </WrapperManageCardContainer>
  );
}
const WrapperManageCardContainer = styled.div`
  width: 100%;
  position: relative;
`
const ManageCardContainer = styled.div`
  gap: 65px;
  width: 100%;
  top: 50px;
  display: flex;
  flex-wrap: wrap;
  position: absolute;
  align-items: center;
`