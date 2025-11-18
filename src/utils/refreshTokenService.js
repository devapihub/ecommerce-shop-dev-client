import axios from 'axios';

export const refreshTokenService = async () => {
  const userId = localStorage.getItem('userId');
  const refreshTokenValue = localStorage.getItem('refreshToken');

  if (!userId || !refreshTokenValue) {
    throw new Error('No refresh token');
  }

  const response = await axios.post(
    `${import.meta.env.VITE_API_URL}/shop/refresh-token`,
    {},
    {
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': import.meta.env.VITE_API_KEY,
        'x-client-id': userId,
        'x-rtoken-id': refreshTokenValue
      }
    }
  );

  const data = response.data;

  if (data.status === 200 && data.metadata?.tokens) {
    localStorage.setItem('accessToken', data.metadata.tokens.accessToken);
    localStorage.setItem('refreshToken', data.metadata.tokens.refreshToken);
    
    return {
      accessToken: data.metadata.tokens.accessToken,
      refreshToken: data.metadata.tokens.refreshToken
    };
  }

  throw new Error('Refresh token failed');
};

