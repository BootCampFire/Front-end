import { Link, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../store';
import authSlice, { login, logout } from '../store/authSlice';
import LoginModal from './Login/LoginModal';
import React from 'react';
import { Bold21px } from './Board/styled';
// import BoardCreateHeader from './Board/BoardCreate/BoardCreateHeader';
import { colors } from 'constant/constant';
const NavContainer = styled.div`
  background-color: #ffffff;
  border-bottom: 1.5px solid ${colors.BACKGROUND_DEEP};
  margin: 'auto';
  height: 80px;
`;

const HeaderContents = styled.div`
  max-width: 1220px;
  min-width: 800px;
  margin: auto;
  padding: 0 30px;
  // 헤더 미디어 쿼리 작업 해야함
`

const LogoLink = styled(Link)`
  img {
    margin-left: 5%;
    height: 50px;
    width: auto;
  }
`;

const NavLink = styled(Link)`
  margin-right: 5%;
  margin-left: 5%;
  color: #333;
  text-decoration: none;

  &:hover {
    text-decoration: underline;
  }
`;

const ActionButton = styled.button`
  padding: 8px 16px;
  border: 1px solid #ffd0c1;
  border-radius: 4px;
  background-color: #ffffff;
  color: #000000;
  font-size: 16px;
  cursor: pointer;

  &:hover {
    background-color: #0056b3;
  }
`;

const WritePrimaryBtn = styled.button`
  margin-left: 3%;
  margin-right: 3%;
  padding: 8px 16px;
  border: none;
  border-radius: 4px;
  background-color: #ff603d;
  color: #fff;
  font-size: 16px;
  text-decoration: none;
  cursor: pointer;

  &:hover {
    background-color: #1e7e34;
  }
`;

const HeaderContentContainer = styled.div`
  display: flex;
  align-items: center;
`;

export const LoginContentContainer = styled.div`
  display: flex;
  align-items: center;
  margin-left: auto;
`;
export default function Header() {
  const dispatch = useDispatch();
  const isLoggedIn = useSelector((state: RootState) => state.auth.isLoggedIn);
  const nickname = useSelector((state: RootState) => state.auth.nickname); // nickname 정보를 가져옴
  const isAdmin = useSelector((state: RootState) => state.auth.isAdmin);
  const bootcampId = useSelector((state: RootState) => state.auth.bootcampId);
  const navigate = useNavigate();
  const [isModalOpen, setModalOpen] = React.useState(false);

  const handleLogin = () => {
    // 모달 열기 함수
    setModalOpen(true);
    // console.log(bootcampId);
  };

  const handleWriteButtonClick = () => {
    isLoggedIn ? navigate('/BoardCreate') : setModalOpen(true);
  };
  const handleLogout = () => {
    dispatch(logout());
    const isMyPage = new RegExp('My');
    const isManagerPage = new RegExp('Manage');
    const thisLocation = window.location.href;
    if (isMyPage.test(thisLocation) || isManagerPage.test(thisLocation)) navigate('/');
  };

  const handleCloseModal = () => {
    // 모달 닫기 함수
    setModalOpen(false);
  };

  return (
    <NavContainer>
      <HeaderContents className="test">
        <HeaderContentContainer>
          <LogoLink to="/">
            <img src="/logo.png" alt="Home" style={{width: 67, height: 74}}/>
          </LogoLink>
          <NavLink to="/Board">
            <Bold21px as="span">Board</Bold21px>
          </NavLink>
          <NavLink to="/BootCamp">
            <Bold21px as="span">BootCamp</Bold21px>
          </NavLink>
          <NavLink to="/CampArticle">
            <Bold21px as="span">CampArticle</Bold21px>
          </NavLink>
          <NavLink to="/VS">
            <Bold21px as="span">VS</Bold21px>
          </NavLink>
          <WritePrimaryBtn onClick={handleWriteButtonClick}>글쓰기</WritePrimaryBtn>
          {isLoggedIn ? (
            <LoginContentContainer>
              <div style={{ display: 'flexBox' }}>
                <div>안녕하세요 {nickname}님</div>
                <div style={{ display: 'flex', gap: '10px' }}>
                  {isAdmin ? (
                    <Link to={'/ManagerPage'} style={{ color: '#94969B', textDecorationLine: 'none' }}>
                      관리자 페이지
                    </Link>
                  ) : (
                    <Link to={'/MyPage'} style={{ color: '#94969B', textDecorationLine: 'none' }}>
                      마이 페이지
                    </Link>
                  )}
                  <div onClick={handleLogout} style={{ color: '#94969B' }}>
                    로그아웃
                  </div>
                </div>
              </div>
            </LoginContentContainer>
          ) : (
            <ActionButton onClick={handleLogin}>로그인</ActionButton>
          )}
        </HeaderContentContainer>
        {/* 모달 컴포넌트 */}
        <LoginModal isModalOpen={isModalOpen} onClose={handleCloseModal} />
      </HeaderContents>
    </NavContainer>
  );
}
