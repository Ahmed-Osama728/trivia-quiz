import React, { useMemo } from "react";
import { Button, Text } from "@chakra-ui/react";
import { shuffleArray } from "../../utils/ShuffleArray";
import { QuestionContainer, AnswerButtonRow } from "./QuestionsCard.styles";

const QuestionCard = ({ question, selectedAnswer, setSelectedAnswer }) => {
  const isMultipleChoice = question.type === "multiple";

  const answers = useMemo(() => {
    const answerOptions = isMultipleChoice
      ? shuffleArray([...question.incorrect_answers, question.correct_answer])
      : ["True", "False"];
    return answerOptions;
  }, [question]);

  return (
    <QuestionContainer>
      <Text mb={4}>
        {question.question.includes("&quot;")
          ? question.question.replace(/&quot;/g, '"')
          : question.question}
      </Text>
      <AnswerButtonRow>
        {answers.map((answer, index) => (
          <Button
            key={index}
            onClick={() => setSelectedAnswer(answer)}
            mr={2}
            mb={2}
            w={{ base: "100%", sm: "calc(50% - 5px)" }}
            transition="background 0.3s ease"
            _hover={{ background: "blue.600", color: "white" }}
            _active={{ background: "blue.700" }}
          >
            {answer}
          </Button>
        ))}
      </AnswerButtonRow>
    </QuestionContainer>
  );
};

export default QuestionCard;
