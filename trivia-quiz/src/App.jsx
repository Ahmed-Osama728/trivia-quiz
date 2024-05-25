import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { ChakraProvider } from '@chakra-ui/react';
import Home from './pages/Home/Home';
import BaseLayout from './components/layouts/BaseLayout';
import QuestionsCategories from './pages/QuestionsCategories/QuestionsCategories';
import Question from './pages/Questions/Questions';
import Score from './pages/Score/Score';

function App() {
  return (
    <ChakraProvider>
    <Router>
      <BaseLayout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/categories" element={<QuestionsCategories />} />
          <Route path="/question" element={<Question />} />
          <Route path="/score" element={<Score />} />
        </Routes>
      </BaseLayout>
    </Router>
    </ChakraProvider>
  );
}

export default App;
