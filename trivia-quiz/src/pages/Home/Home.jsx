import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Input, Kbd } from '@chakra-ui/react';
import {
  StyledContainer,
  StyledHeader,
  StyledFooter,
  StyledInputContainer,
  ErrorText,
  PlayButton,
  LevelsContainer
} from './Home.styles';
import { useQuizStore } from '../../store/useQuizStore';

const Home = () => {
  const [name, setName] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { level, setLevel } = useQuizStore();

  const handleNameChange = (e) => {
    setName(e.target.value);
    setError('');
  };

  const handlePlay = () => {
    if (name.trim() === '') {
      setError('Please enter your name');
    } else if (!level) {
      setError('Please select a level');
    } else {
      navigate('/question-category');
    }
  };

  const handleLevelSelect = (selectedLevel) => {
    setLevel(selectedLevel);
  };

  useEffect(() => {
    const handleKeyDown = (event) => {
      switch (event.key) {
        case 'ArrowUp':
          console.log('Up arrow key pressed');
          break;
        case 'ArrowDown':
          console.log('Down arrow key pressed');
          break;
        case 'ArrowLeft':
          console.log('Left arrow key pressed');
          break;
        case 'ArrowRight':
          console.log('Right arrow key pressed');
          break;
        case 'e':
        case 'E':
          handleLevelSelect('easy');
          break;
        case 'm':
        case 'M':
          handleLevelSelect('medium');
          break;
        case 'h':
        case 'H':
          handleLevelSelect('hard');
          break;
        default:
          break;
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [handleLevelSelect]);

  return (
    <StyledContainer>
      <StyledHeader>Trivia Quiz</StyledHeader>
      <StyledInputContainer>
        <Input
          value={name}
          onChange={handleNameChange}
          placeholder="Enter your name"
          size="lg"
        />
        {error && <ErrorText>{error}</ErrorText>}
      </StyledInputContainer>
      <LevelsContainer>
        <Button colorScheme="blue" variant="solid" size="lg" m={2} onClick={() => handleLevelSelect('easy')}>
          Easy
        </Button>
        <Button colorScheme="yellow" variant="solid" size="lg" m={2} onClick={() => handleLevelSelect('medium')}>
          Medium
        </Button>
        <Button colorScheme="red" variant="solid" size="lg" m={2} onClick={() => handleLevelSelect('hard')}>
          Hard
        </Button>
      </LevelsContainer>
      <PlayButton onClick={handlePlay}>PLAY</PlayButton>
      <StyledFooter>
        <div>
          <Kbd>&uarr;</Kbd>
          <Kbd>&darr;</Kbd>
          <Kbd>&larr;</Kbd>
          <Kbd>&rarr;</Kbd> Move Around
        </div>
        <div>
          <Kbd>E</Kbd> asy
        </div>
        <div>
          <Kbd>M</Kbd> edium
        </div>
        <div>
          <Kbd>H</Kbd> ard
        </div>
      </StyledFooter>
    </StyledContainer>
  );
};

export default Home;
