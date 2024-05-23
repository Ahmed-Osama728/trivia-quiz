import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { ChakraProvider } from '@chakra-ui/react';
import Home from './pages/Home/Home';
import { StyledContainer } from './pages/Home/Home.styles';
import BaseLayout from './components/layouts/BaseLayout';

function App() {
  return (
    <ChakraProvider>
    <Router>
      <BaseLayout>
        <Routes>
          <Route path="/" element={<Home />} />
          {/* <Route path="/question-category" element={<QuestionCategory />} />
          <Route path="/question" element={<Question />} />
          <Route path="/difficulty-selection" element={<DifficultySelection />} />
          <Route path="/result" element={<Result />} /> */}
        </Routes>
      </BaseLayout>
    </Router>
    </ChakraProvider>
  );
}

export default App;
