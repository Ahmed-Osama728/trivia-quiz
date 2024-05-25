import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 20px;
`;

export const PlayerName = styled.h1`
  margin-bottom: 20px;
`;

export const CardContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 20px;
`;

export const Card = styled.div`
  background-color: #ffffff;
  border-radius: 10px;
  box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.1);
  padding: 20px;
  margin: 10px;
  width: 300px;
`;

export const CardTitle = styled.h2`
  font-size: 1.5rem;
  color: #333333;
  margin-bottom: 10px;
`;

export const CardContent = styled.p`
  font-size: 1.2rem;
  color: #666666;
`;

export const Button = styled.button`
  padding: 15px 30px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 1.2rem;
  transition: background-color 0.3s ease;
  &:hover {
    background-color: #0056b3;
  }
`;
