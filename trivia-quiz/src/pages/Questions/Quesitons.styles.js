import styled from 'styled-components';
import { Button } from '@chakra-ui/react';

export const StyledContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  padding: 20px;
  color: white;
`;

export const StyledHeader = styled.h1`
  font-size: 2.5em;
  margin-bottom: 20px;
`;

export const StyledButton = styled(Button)`
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  &:hover {
    background: linear-gradient(135deg, #764ba2 0%, #667eea 100%);
  }
`;
