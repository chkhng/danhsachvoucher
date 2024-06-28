import axios from 'axios';

const verifyAccessToken = async () => {
  const accessToken = localStorage.getItem('accessToken') || ''; // Ensure accessToken is always a string\
  try {
    await axios.post(
      'http://150.95.104.20:9997/auth/verify-access-token',
      {
        token: accessToken,
      },
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      },
    );
    return accessToken;
  } catch (error) {
    if (error.response && error.response.status === 401) {
      // Access token is expired, refresh it
      return await refreshAccessToken();
    } else {
      throw new Error('Failed to verify access token');
    }
  }
};

const refreshAccessToken = async () => {
  const refreshToken = localStorage.getItem('refreshToken') || ''; // Ensure refreshToken is always a string
  try {
    const response = await axios.post(
      'http://150.95.104.20:9997/auth/refresh-access-token',
      {
        refreshToken,
      },
    );
    const newAccessToken = response.data.data.accessToken;
    localStorage.setItem('accessToken', newAccessToken.toString()); // Store the new token as a string
    return newAccessToken.toString(); // Return the new token as a string
  } catch (error) {
    console.error('Failed to refresh access token', error);
    throw new Error('Failed to refresh access token');
  }
};

export { verifyAccessToken, refreshAccessToken };
