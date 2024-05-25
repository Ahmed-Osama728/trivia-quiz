import axios from 'axios';

export const fetchSessionToken = async () => {
  const { data } = await axios.get('https://opentdb.com/api_token.php?command=request');
  return data.token;
};

export const resetSessionToken = async (token) => {
  const { data } = await axios.get(`https://opentdb.com/api_token.php?command=reset&token=${token}`);
  return data.token;
};
