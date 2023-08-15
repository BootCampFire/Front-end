import { Link, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../store';
import authSlice, { login, logout } from '../store/authSlice';
import LoginModal from './Login/LoginModal';
import React, { useEffect } from 'react';
import { Bold21px } from './Board/styled';
import CreateOutlinedIcon from '@mui/icons-material/CreateOutlined';
// import BoardCreateHeader from './Board/BoardCreate/BoardCreateHeader';
import { colors } from 'constant/constant';
import axios from 'axios';
import { StrongBtn } from './Board/styled';
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
`;

const LogoLink = styled(Link)`
  img {
    margin-left: 5%;
    height: 50px;
    width: auto;
  }
`;

const NavLink = styled(Link)`
  /* margin-right: 5%;
  margin-left: 5%; */
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
  /* margin-left: 3%; */
  /* margin-right: 3%; */
  padding: 8px 16px;
  border: none;
  border-radius: 4px;
  background-color: #ff603d;
  color: #fff;
  font-size: 16px;
  text-decoration: none;
  cursor: pointer;
  width: 74px;
  @media (max-width: 900px) {
    display: none;
  }
`;
const StyledStrongBtn = styled(StrongBtn)`
  padding: 2px 10px;
  @media (min-width: 900px) {
    display: none;
  }
`
const HeaderContentContainer = styled.div`
  display: flex;
  align-items: center;
`;

export const LoginContentContainer = styled.div`
  display: flex;
  align-items: center;
  margin-left: auto;
  @media (max-width: 900px) {
    display: none;
  }
`;
export default function Header() {
  const dispatch = useDispatch();
  const isLoggedIn = useSelector((state: RootState) => state.auth.isLoggedIn);
  const nickname = useSelector((state: RootState) => state.auth.nickname); // nickname 정보를 가져옴
  const isAdmin = useSelector((state: RootState) => state.auth.isAdmin);
  const bootcampId = useSelector((state: RootState) => state.auth.bootcampId);
  const navigate = useNavigate();
  const [isModalOpen, setModalOpen] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(true);

  useEffect(() => {
    const accessToken = localStorage.getItem('Authorization');
    if (!isLoggedIn && accessToken) {
      axios.get(`${process.env.REACT_APP_API_URL}/users`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          withCredentials: true,
        }
      }).then((res) => {
        if (res.status === 200) {
          axios.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`;
          dispatch(
            login({
              userId: res.data.data.id,
              nickname: res.data.data.nickname,
              email: res.data.data.email,
              isAdmin: true,
              bootcampId: res.data.data.bootcampId,
            })
          );
          setIsLoading(false);
      }})
    } else {
      setIsLoading(false);
    }
  },[])

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
    localStorage.removeItem("Authorization");
    localStorage.removeItem("refreshToken");
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
            <img src="/logo.png" alt="Home" style={{ width: 67, height: 74 }} />
          </LogoLink>
          <NavLink to="/Board">
            <Bold21px as="span">게시판</Bold21px>
          </NavLink>
          <NavLink to="/BootCamp">
            <Bold21px as="span">부캠정부</Bold21px>
          </NavLink>
          <NavLink to="/VS">
            <Bold21px as="span">VS</Bold21px>
          </NavLink>
          <NavLink to="/CampArticle">
            <Bold21px as="span">내 부트캠프</Bold21px>
          </NavLink>
          <div style={{display: 'flex', gap: '15px'}}>

          <WritePrimaryBtn onClick={handleWriteButtonClick}>글쓰기</WritePrimaryBtn>
          <StyledStrongBtn type="first" onClick={handleWriteButtonClick}>
            <CreateOutlinedIcon/>
          </StyledStrongBtn>
          {isLoading && <ActionButton onClick={handleLogin} style={{visibility:"hidden"}}>로그인</ActionButton>}
          {!isLoading && isLoggedIn && (
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
          )}
          {!isLoading && !isLoggedIn &&
            <ActionButton onClick={handleLogin}>로그인</ActionButton>
          }
          </div>
        </HeaderContentContainer>
        {/* 모달 컴포넌트 */}
        <LoginModal isModalOpen={isModalOpen} onClose={handleCloseModal} />
      </HeaderContents>
    </NavContainer>
  );
}
