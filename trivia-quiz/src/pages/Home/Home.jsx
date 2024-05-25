import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Input, Kbd, Spinner } from '@chakra-ui/react';
import {
  StyledContainer,
  StyledHeader,
  StyledFooter,
  StyledInputContainer,
  ErrorText,
  PlayButton,
  LevelsContainer,
  LevelButton
} from './Home.styles';
import { useQuizStore } from '../../store/useQuizStore';
import useSessionToken from '../../hooks/useSessionToken';

export const TOKEN_REFETCH_CODES = [3, 4];

const Home = () => {
  const [name, setName] = useState('');
  const [error, setError] = useState('');
  const [selectedLevel, setSelectedLevel] = useState('');
  const navigate = useNavigate();
  const { setLevel, setPlayerName, resetGame } = useQuizStore();
  const { token, error: tokenError, isLoading: isLoadingToken } = useSessionToken();

  const inputRef = useRef();
  const easyRef = useRef();
  const mediumRef = useRef();
  const hardRef = useRef();
  const playRef = useRef();

  useEffect(() => {
    resetGame();
  }, []);

  const handleKeyDown = (event) => {
    if (document.activeElement === inputRef.current) {
      return;
    }
    if (document.activeElement === inputRef.current) {
      if (event.key === 'ArrowDown') easyRef.current.focus();
    } else if (document.activeElement === easyRef.current) {
      if (event.key === 'ArrowDown') playRef.current.focus();
      if (event.key === 'ArrowRight') mediumRef.current.focus();
      if (event.key === 'ArrowUp') inputRef.current.focus();
    } else if (document.activeElement === mediumRef.current) {
      if (event.key === 'ArrowDown') playRef.current.focus();
      if (event.key === 'ArrowLeft') easyRef.current.focus();
      if (event.key === 'ArrowRight') hardRef.current.focus();
      if (event.key === 'ArrowUp') inputRef.current.focus();
    } else if (document.activeElement === hardRef.current) {
      if (event.key === 'ArrowDown') playRef.current.focus();
      if (event.key === 'ArrowLeft') mediumRef.current.focus();
      if (event.key === 'ArrowUp') inputRef.current.focus();
    } else if (document.activeElement === playRef.current) {
      if (event.key === 'ArrowUp') {
        if (selectedLevel === 'easy') easyRef.current.focus();
        if (selectedLevel === 'medium') mediumRef.current.focus();
        if (selectedLevel === 'hard') hardRef.current.focus();
      }
    }

    switch (event.key) {
      case 'e':
      case 'E':
        handleLevelSelect('easy');
        easyRef.current.focus();
        break;
      case 'm':
      case 'M':
        handleLevelSelect('medium');
        mediumRef.current.focus();
        break;
      case 'h':
      case 'H':
        handleLevelSelect('hard');
        hardRef.current.focus();
        break;
      default:
        break;
    }
  };

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [selectedLevel]);

  const handleNameChange = (e) => {
    setName(e.target.value);
    setError('');
  };

  const handlePlay = () => {
    if (name.trim() === '') {
      setError('Please enter your name');
    } else if (!selectedLevel) {
      setError('Please select a level');
    } else {
      setPlayerName(name);
      setLevel(selectedLevel);
      navigate('/categories');
    }
  };

  const handleLevelSelect = (selectedLevel) => {
    setSelectedLevel(selectedLevel);
  };

  if (isLoadingToken) {
    return (
      <StyledContainer>
        <Spinner size="xl" />
      </StyledContainer>
    );
  }

  if (tokenError) {
    return (
      <div>
        Error loading data.
      </div>
    );
  }

  return (
    <StyledContainer>
      <StyledHeader>Trivia Quiz</StyledHeader>
      <StyledInputContainer>
        <Input
          ref={inputRef}
          value={name}
          onChange={handleNameChange}
          placeholder="Enter your name"
          size="lg"
          tabIndex="1"
        />
        {error && <ErrorText>{error}</ErrorText>}
      </StyledInputContainer>
      <LevelsContainer>
        <LevelButton
          ref={easyRef}
          isselected={selectedLevel === 'easy' ? 'true' : undefined}
          colorScheme="blue"
          size="lg"
          m={2}
          onClick={() => handleLevelSelect('easy')}
          tabIndex="2"
        >
          Easy
        </LevelButton>
        <LevelButton
          ref={mediumRef}
          isselected={selectedLevel === 'medium' ? 'true' : undefined}
          colorScheme="yellow"
          size="lg"
          m={2}
          onClick={() => handleLevelSelect('medium')}
          tabIndex="3"
        >
          Medium
        </LevelButton>
        <LevelButton
          ref={hardRef}
          isselected={selectedLevel === 'hard' ? 'true' : undefined}
          colorScheme="red"
          size="lg"
          m={2}
          onClick={() => handleLevelSelect('hard')}
          tabIndex="4"
        >
          Hard
        </LevelButton>
      </LevelsContainer>
      <PlayButton ref={playRef} onClick={handlePlay} tabIndex="5">PLAY</PlayButton>
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
