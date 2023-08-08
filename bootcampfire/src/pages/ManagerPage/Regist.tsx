import ManageCard from 'components/Manager/ManageCard';
import styled from 'styled-components';

function createData(img: string, name: string, bootcamp: string) {
  return { img, name, bootcamp };
}
export default function Regist() {
  // const userList = [
  //   createData('/logo512', '김민범', 'SSAFY'),
  //   createData('/logo512', '김봉준', 'SSAFY'),
  //   createData('/logo512', '박지환', 'SSAFY'),
  //   createData('/logo512', '안나', 'SSAFY'),
  //   createData('/logo512', '이연희', 'SSAFY'),
  //   createData('/logo512', '임수형', 'SSAFY'),
  //   createData('/logo512', '김민범', 'SOMA'),
  //   createData('/logo512', '김민범', '우테코'),
  // ];
  const userList = [
    { email: 'beom0109@naver.com', img: '/logo512.png', nickname: '김민범', bootcamp: 'SSAFY' },
    { email: 'beom0109@naver.com', img: '/logo512.png', nickname: '김봉준', bootcamp: 'SSAFY' },
    { email: 'beom0109@naver.com', img: '/logo512.png', nickname: '박지환', bootcamp: 'SSAFY' },
    { email: 'beom0109@naver.com', img: '/logo512.png', nickname: '안나', bootcamp: 'SSAFY' },
    { email: 'beom0109@naver.com', img: '/logo512.png', nickname: '이연희', bootcamp: 'SSAFY' },
    { email: 'beom0109@naver.com', img: '/logo512.png', nickname: '임수형', bootcamp: 'SSAFY' },
    { email: 'beom0109@naver.com', img: '/logo512.png', nickname: '김민범', bootcamp: 'SOMA' },
    { email: 'beom0109@naver.com', img: '/logo512.png', nickname: '김민범', bootcamp: '우테코' },
  ];
  return (
    <WrapperManageCardContainer className='Wrapper'>
      <ManageCardContainer className='Container'>
        {userList.map((row) => (
          <ManageCard email={row.email} img={row.img} nickname={row.nickname} bootcamp={row.bootcamp}></ManageCard>
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