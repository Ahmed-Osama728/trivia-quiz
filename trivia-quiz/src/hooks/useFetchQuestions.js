import { useQuery } from 'react-query';
import fetchQuestions from '../api/QuestionsAPI';
import useQuizStore from '../store/useQuizStore';
import useSessionToken from './useSessionToken'; 
import { TOKEN_REFETCH_CODES } from '../pages/Home/Home';

const useFetchQuestions = (initialAmount, category, difficulty) => {
  const { questions, setQuestions, token } = useQuizStore();
  const { resetToken } = useSessionToken(); 

  const fetchQuestionsWithRetry = async (amount) => {
    const data = await fetchQuestions(amount, category, difficulty, token);
    if (TOKEN_REFETCH_CODES.includes(data.response_code)) {
      resetToken();
    } else if (data.response_code === 1 && amount > 1) {
      return fetchQuestionsWithRetry(amount - 1);
    } else if (data.results) {
      setQuestions(data.results);
    }
    return data;
  };

  const { data, error, isLoading, refetch } = useQuery(
    ['questions', initialAmount, category, difficulty, token],
    () => fetchQuestionsWithRetry(initialAmount),
    {
      enabled: false,
      refetchOnWindowFocus: false,
      onSuccess: (data) => {
        if (TOKEN_REFETCH_CODES.includes(data.response_code)) {
          resetToken();
        } else if (data.results) {
          setQuestions(data.results);
        }
      }
    }
  );

  return { data, error, isLoading, refetch };
};

export default useFetchQuestions;
