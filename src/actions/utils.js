import { jwtVerify } from 'jose';

// Function to decode a JWT token
export const parseJwt = (token) => {
  if (!token || token.split('.').length < 2) {
    console.warn('Invalid or undefined token');
    return null;
  }

  try {
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace('-', '+').replace('_', '/');
    const decodedData = JSON.parse(atob(base64)); // Use `atob` to decode Base64
    console.log('Decoded JWT:', decodedData);
    return decodedData;
  } catch (error) {
    console.error('Failed to parse JWT:', error);
    return null;
  }
};

// Function to validate a JWT token
export const validateToken = async (token) => {
  if (!token) {
    console.warn('Token is undefined or null');
    return null;
  }
  

  try {
    const secretKeyBytes = new TextEncoder().encode(process.env.SECRET_KEY);
    const { payload } = await jwtVerify(token, secretKeyBytes);
    console.log('JWT validation successful:', payload);
    return payload;
  } catch (error) {
    console.error('Token verification failed:', error);
    return null;
  }
};
