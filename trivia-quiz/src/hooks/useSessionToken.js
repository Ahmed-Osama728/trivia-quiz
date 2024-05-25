import { useEffect } from 'react';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import { fetchSessionToken, resetSessionToken } from '../api/SessionAPI';
import useQuizStore from '../store/useQuizStore';

const EXPIRATION_TIME = 6 * 60 * 60 * 1000;

const useSessionToken = () => {
  const { token, setToken } = useQuizStore();
  const queryClient = useQueryClient();

  const { data, error, isLoading } = useQuery(
    'sessionToken',
    fetchSessionToken,
    {
      enabled: !token,
      staleTime: EXPIRATION_TIME,
      onSuccess: (token) => {
        setToken(token);
      },
    }
  );

  const mutation = useMutation(resetSessionToken, {
    onSuccess: (newToken) => {
      setToken(newToken);
      queryClient.setQueryData('sessionToken', { token: newToken });
    },
  });

  const resetToken = () => mutation.mutate(token);

  return { token, error, isLoading, resetToken };
};

export default useSessionToken;
