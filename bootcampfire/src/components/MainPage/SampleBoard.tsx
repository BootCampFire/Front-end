import styled from 'styled-components';
import HotContent from './HotContent';
import { Bold18px } from 'components/Board/styled';
import MoreBtn from './MoreBtn';
import axios from 'axios';
import { useEffect, useState } from 'react';
import ChatIcon from '@mui/icons-material/Chat';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FitnessCenterIcon from '@mui/icons-material/FitnessCenter';
import SupportAgentIcon from '@mui/icons-material/SupportAgent';
import TerminalIcon from '@mui/icons-material/Terminal';
import Diversity3Icon from '@mui/icons-material/Diversity3';
import QuestionMarkIcon from '@mui/icons-material/QuestionMark';
import ComputerIcon from '@mui/icons-material/Computer';
import HomeIcon from '@mui/icons-material/Home';
import { colors } from 'constant/constant';

const ContentList = styled.div`
  /* Add any styles for the table */
  display: flex;
  flex-direction: column;
  row-gap: 5px;
  height: 116px;
`;

const Container = styled.div`
  width: 40%;
`
const BoardThumbnailTitle = styled.div`
  height: 40px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`

const TitleStart= styled.div`
  display: flex;
  align-items: center;
  gap: 5px;
`

interface createDataProps {
  text: string;
  img: string;
  index: number;
}

interface boardData {
  id: number;
  title: string;
}

const SampleBoard: React.FC<createDataProps> = (props) => {
  const [rows, setRows] = useState<boardData[]>([]);

  useEffect(() => {
    axios.get(`${process.env.REACT_APP_API_URL}/categories/${props.index}/main`).then((res) => {

      setRows(res.data.data);
    });
    
  }, []);


  return (
      <Container>
        <BoardThumbnailTitle>
          <TitleStart>
        {props.index === 1 && <ChatIcon sx={{color: `${colors.PRIMARY}`, fontSize: '18px'}}/>}
        {props.index === 2 && <FavoriteIcon sx={{color: `${colors.PRIMARY}`, fontSize: '18px'}}/>}
        {props.index === 3 && <FitnessCenterIcon sx={{color: `${colors.PRIMARY}`, fontSize: '18px'}}/>}
        {props.index === 4 && <SupportAgentIcon sx={{color: `${colors.PRIMARY}`, fontSize: '18px'}}/>}
        {props.index === 5 && <TerminalIcon sx={{color: `${colors.PRIMARY}`, fontSize: '18px'}}/>}
        {props.index === 6 && <Diversity3Icon sx={{color: `${colors.PRIMARY}`, fontSize: '18px'}}/>}
        {props.index === 7 && <QuestionMarkIcon sx={{color: `${colors.PRIMARY}`, fontSize: '18px'}}/>}
        {props.index === 8 && <ComputerIcon sx={{color: `${colors.PRIMARY}`, fontSize: '18px'}}/>}
        {props.index === 9 && <HomeIcon sx={{color: `${colors.PRIMARY}`, fontSize: '18px'}}/>}
          <Bold18px as="span">{props.text}</Bold18px>
          </TitleStart>
          <MoreBtn index={props.index}></MoreBtn>
        </BoardThumbnailTitle>
        <div style={{ borderTop: `solid 1px ${colors.TEXT_LIGHT}`, marginBottom: '5px' }} />
        <ContentList>
            {rows.map((row) => (
              <HotContent link={`/BoardDetail/${row.id}`} key={row.id} text={row.title}></HotContent>
            ))}
        </ContentList>
      </Container>
  );
};

export default SampleBoard;
