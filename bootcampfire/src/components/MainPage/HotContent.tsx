import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { Normal15px } from 'components/Board/styled';

const HotContentContainer = styled(Link)`
  color: #333;
  width: 100%;
  text-decoration: none;
  display: inline-block;
  &:hover {
    text-decoration: underline;
  }
`;

const StyledNormal15px = styled(Normal15px)`
`

interface ContentProps {
  text: string;
  link: string;
}

const HotContent: React.FC<ContentProps> = ({ text, link }) => {
  return (
      <HotContentContainer to={link}>
        <StyledNormal15px>
          {text}
        </StyledNormal15px>
      </HotContentContainer>
  );
};

export default HotContent;
