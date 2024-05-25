import axios from 'axios';

export const fetchCategories = async () => {
  const { data } = await axios.get('https://opentdb.com/api_category.php');
  return data.trivia_categories;
};
