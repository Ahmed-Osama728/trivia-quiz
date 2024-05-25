import React, { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Box, Button } from "@chakra-ui/react";
import useFetchQuestions from "../../hooks/useFetchQuestions";
import {
  StyledContainer,
  StyledHeader,
  StyledButton,
} from "./Quesitons.styles";
import QuestionCard from "../../components/QuestionCard/QuestionCard";
import Timer from "../../components/Timer";
import useQuizStore from "../../store/useQuizStore";
import useCountdownTimer from "../../hooks/useCountdownTimer";

const LEVELS_TIME = {
  easy: 30,
  medium: 60,
  hard: 90,
};

const CATEGORIES_LENGTH = 3;
const QUESTIONS_AMOUNT = 10;

const Question = () => {
  const { state } = useLocation();
  const { category } = state;
  const navigate = useNavigate();

  const {
    currentQuestionIndex,
    selectedAnswer,
    questions,
    incrementScore,
    nextQuestion,
    setSelectedAnswer,
    level,
    resetCategory,
    currentCategoryIndex,
  } = useQuizStore();

  const { data, error, isLoading, refetch } = useFetchQuestions(
    10,
    category.id,
    level
  );

  useEffect(() => {
    if (category || level) {
      refetch();
    }
  }, [category, level]);

  useEffect(() => {
    if (currentQuestionIndex >= QUESTIONS_AMOUNT) {
      resetCategory();
      handleTimeUp();
    };
  }, [currentQuestionIndex, currentCategoryIndex]);

  const handleNextQuestion = (isSkipped = false) => {
    if (
      !isSkipped &&
      selectedAnswer === questions[currentQuestionIndex].correct_answer
    ) {
      incrementScore();
    }
    setSelectedAnswer("");
    nextQuestion();
  };

  const handleTimeUp = () => {
    if (currentCategoryIndex >= CATEGORIES_LENGTH) {
      navigate("/score");
    } else {
      navigate("/categories", {
        state: {
          categoryTime: LEVELS_TIME[level] - time + 1,
        },
      });
    }
  };

  const time = useCountdownTimer(LEVELS_TIME[level], handleTimeUp);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    questions?.length > 0 && (
      <StyledContainer>
        <StyledHeader>Question {currentQuestionIndex + 1}</StyledHeader>
        <Timer time={time} />
        {questions[currentQuestionIndex] && (
          <QuestionCard
            question={questions[currentQuestionIndex]}
            selectedAnswer={selectedAnswer}
            setSelectedAnswer={setSelectedAnswer}
          />
        )}
        <Box display="flex" justifyContent="center" mt={4}>
          <Button
            onClick={() => handleNextQuestion()}
            w={{ base: "100%", sm: "calc(50% - 5px)" }}
            transition="background 0.3s ease"
            _hover={{ background: "blue.600", color: "white" }}
            _active={{ background: "blue.700" }}
            _disabled={{ opacity: 0.5, cursor: "not-allowed" }}
            isDisabled={!selectedAnswer}
          >
            Next
          </Button>
          <Button
            onClick={() => handleNextQuestion(true)}
            ml={4}
            w={{ base: "100%", sm: "calc(50% - 5px)" }}
            transition="background 0.3s ease"
            _hover={{ background: "blue.600", color: "white" }}
            _active={{ background: "blue.700" }}
          >
            Skip
          </Button>
        </Box>
      </StyledContainer>
    )
  );
};

export default Question;
