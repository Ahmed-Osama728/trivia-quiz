import styled from 'styled-components';

const StyledContainer = styled.div`
  width: 100%;
  height: 135vh;
  display: flex;
  flex-direction: column;
  background: linear-gradient(163.34deg, #131339 11.49%, #00ac97 125.44%);
`;

const BaseLayout = ({ children }) => {
  return <StyledContainer>{children}</StyledContainer>;
};

export default BaseLayout;
