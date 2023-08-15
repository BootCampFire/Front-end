import { SetStateAction, useState } from 'react';
import { Link, To, useNavigate } from 'react-router-dom';
import { Normal13px } from 'components/Board/styled';
const MoreBtn = (props: any) => {
  const navigate = useNavigate();
  const moreView = () => {
    navigate('/Board', { state: props.index });
  };
  return (
    <Normal13px style={{ textDecorationLine: 'none', color: '#000000' }} onClick={moreView}>
      더보기
    </Normal13px>
  );
};

export default MoreBtn;
