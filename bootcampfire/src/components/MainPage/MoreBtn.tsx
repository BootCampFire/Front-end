import { SetStateAction, useState } from 'react';
import { Link, To, useNavigate } from 'react-router-dom';

const MoreBtn = (props: any) => {
  const navigate = useNavigate();
  const moreView = () => {
    navigate('/Board', { state: props.index });
  };
  return (
    <div style={{ textDecorationLine: 'none', color: '#000000' }} onClick={moreView}>
      더보기
    </div>
  );
};

export default MoreBtn;
