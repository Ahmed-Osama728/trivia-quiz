import axios from 'axios';

const fetchQuestions = async (amount, category, difficulty, token) => {
  const response = await axios.get('https://opentdb.com/api.php', {
    params: {
      amount,
      category,
      difficulty,
      token,
    },
  });
  return response.data;
};

export default fetchQuestions;
