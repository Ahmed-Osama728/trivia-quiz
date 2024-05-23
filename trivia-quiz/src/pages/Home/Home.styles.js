import styled from 'styled-components';
import { Button } from '@chakra-ui/react';

export const StyledContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 500px;
  width: 400px;
  margin: auto;
  border-radius: 20px;
  background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
`;

export const StyledHeader = styled.h1`
  font-size: 2em;
  color: #333;
  margin-bottom: 20px;
`;

export const StyledFooter = styled.div`
  display: flex;
  justify-content: space-around;
  width: 50%;
  padding: 10px;
  position: absolute;
  bottom: 0;
  left: 0;
`;

export const StyledInputContainer = styled.div`
  width: 80%;
  margin-bottom: 20px;
`;

export const ErrorText = styled.div`
  color: red;
  font-size: 0.8em;
  margin-top: 5px;
`;

export const LevelsContainer = styled.div`
display: flex;
justify: space-between
`
export const PlayButton = styled(Button)`
  margin-top: 20px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  &:hover {
    background: linear-gradient(135deg, #764ba2 0%, #667eea 100%);
  }
`;