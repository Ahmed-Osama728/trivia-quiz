import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, Text } from '@chakra-ui/react';
import {
  StyledContainer,
  StyledHeader,
  StartButton,
  CategoriesGrid,
} from './QuestionsCategories.styles';
import useCategories from '../../hooks/useCategories';
import { ErrorText } from '../Home/Home.styles';
import useQuizStore from '../../store/useQuizStore';

const QuestionsCategories = () => {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { categories, error: categoriesError, isLoading: isLoadingCategories } = useCategories();

  const {
    questions,
    setQuestions,
    playedCategories,
    currentCategoryIndex,
    addPlayedCategory,
    incrementCategoryIndex
  } = useQuizStore();

  useEffect(() => {
    if(questions?.length > 0) {
      setQuestions([]);
    }
  },[]);

  const handleCategoryClick = (category) => {
    setSelectedCategory(category);
    setError('');
  };

  const handleStartGame = () => {
    if (selectedCategory) {
      addPlayedCategory(selectedCategory);
      navigate('/question', { state: { category: selectedCategory } });
    } else {
      setError('Please select a category');
    }
  };

  if (isLoadingCategories) {
    return <div>Loading...</div>;
  }

  if (categoriesError ) {
    return (
      <div>
        Error loading data.
      </div>
    );
  }

  const availableCategories = categories?.filter(
    (category) => !playedCategories.includes(category)
  );

  return (
    <StyledContainer>
      <StyledHeader>Pick a Category</StyledHeader>
      <CategoriesGrid>
        {availableCategories?.map((category) => (
          <Box
            key={category.id}
            p={5}
            shadow="md"
            borderWidth="1px"
            borderRadius="md"
            bg={selectedCategory === category ? 'blue.500' : 'gray.200'}
            color={selectedCategory === category ? 'white' : 'black'}
            onClick={() => handleCategoryClick(category)}
            cursor="pointer"
          >
            <Text>{category.name}</Text>
          </Box>
        ))}
        <Box
          p={5}
          shadow="md"
          borderWidth="1px"
          borderRadius="md"
          bg={selectedCategory === 'random' ? 'blue.500' : 'gray.200'}
          color={selectedCategory === 'random' ? 'white' : 'black'}
          onClick={() => handleCategoryClick('random')}
          cursor="pointer"
        >
          <Text>Random</Text>
        </Box>
      </CategoriesGrid>
      <StartButton onClick={handleStartGame}>Start</StartButton>
      {error && <ErrorText>{error}</ErrorText>}
    </StyledContainer>
  );
};

export default QuestionsCategories;
