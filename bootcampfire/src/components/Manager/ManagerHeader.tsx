import React, { useState } from 'react';
import { Bold18px, Bold24px } from 'components/Board/styled';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { colors } from 'constant/constant';

function ManagerHeader() {
  const [activeId, setActiveId] = useState(0);

  const handlerTabClick = (id: number) => {
    setActiveId(id);
    console.log(id);
  };

  return (
    <div>
      <StyledBold24px>관리자 페이지</StyledBold24px>
      <StyledDiv>
        <StyledLink to="/ManagerPage">
          <StyledBold21px as="span" onClick={() => handlerTabClick(0)} className={0 === activeId ? 'active' : ''}>
            부트 캠프 인증 승인
          </StyledBold21px>
        </StyledLink>
        <StyledLink to="/ManagerPage/Management">
          <StyledBold21px as="span" onClick={() => handlerTabClick(1)} className={1 === activeId ? 'active' : ''}>
            부트 캠프 관리
          </StyledBold21px>
        </StyledLink>
        <StyledLink to="/ManagerPage/Mission">
          <StyledBold21px as="span" onClick={() => handlerTabClick(2)} className={2 === activeId ? 'active' : ''}>
            미션 등록
          </StyledBold21px>
        </StyledLink>
      </StyledDiv>
    </div>
  );
}

const StyledDiv = styled.div``;

const StyledLink = styled(Link)`
  border-bottom: 1px solid ${colors.PRIMARY};
  text-decoration: none;
  padding: 5px 0 9px 0;
`;
const StyledBold24px = styled(Bold24px)`
  margin: 20px 20px 30px 20px;
`;
const StyledBold21px = styled(Bold18px)`
  padding: 5px 50px 9px 50px;

  &.active {
    border-bottom: 5px solid ${colors.PRIMARY};
    padding: 5px 50px;
  }
`;
export default ManagerHeader;
