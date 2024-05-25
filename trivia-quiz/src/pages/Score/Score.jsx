import React, { useEffect } from "react";
import { useQuizStore } from "../../store/useQuizStore";
import PieChart from "../../components/charts/PieChart";
import {
  Container,
  Card,
  CardTitle,
  CardContent,
  Button,
  PlayerName,
  CardContainer,
} from "./Score.styles";
import { useLocation, useNavigate } from "react-router-dom";

const Score = () => {
  const { playerName, resetCategory, categoriesTimes, score, wrongAnswers, addCategoryTime, questions, setQuestions, incrementCategoryIndex } =
    useQuizStore();
    const location = useLocation();
    const navigate = useNavigate();

  useEffect(() => {
    if (questions?.length > 0) {
      setQuestions([]);
    }
    incrementCategoryIndex();
    resetCategory();
    const categoryTime = location.state?.categoryTime || 0;
    addCategoryTime(categoryTime);
  }, []);

  const totalTime = categoriesTimes.reduce((acc, time) => acc + time, 0);
  const minutes = Math.floor(totalTime / 60);
  const seconds = totalTime % 60;
  const formattedTime = minutes > 0 ? `${minutes} min ${seconds} sec` : `${seconds} sec`;

  const handleNewGameClick = () => {
    navigate("/");
  };
  return (
    <Container>
      <PlayerName>{playerName}</PlayerName>
      <CardContainer>
        <Card>
          <CardTitle>Time</CardTitle>
          <CardContent>{formattedTime}</CardContent>
        </Card>
        <Card>
          <PieChart score={score} wrongAnswers={wrongAnswers}/>
        </Card>
      </CardContainer>
      <Button onClick={handleNewGameClick}>New Game</Button>
    </Container>
  );
};

export default Score;
