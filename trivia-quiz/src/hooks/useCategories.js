import { useQuery } from 'react-query';
import { fetchCategories } from '../api/CategoriesAPI';
import useQuizStore from '../store/useQuizStore';

const useCategories = () => {
  const { categories, setCategories } = useQuizStore();

  const { data, error, isLoading } = useQuery('categories', fetchCategories, {
    enabled: categories.length === 0,
    onSuccess: (data) => {
      setCategories(data);
    }
  });

  return { categories, error, isLoading };
};

export default useCategories;
