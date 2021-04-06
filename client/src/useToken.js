import { useState } from 'react';

export default function useToken() 
{
  function getToken() {
    const tokenString = sessionStorage.getItem('token');
    console.log(tokenString);
    if (tokenString == null)
      return null;
    else return tokenString;
    const userToken = JSON.parse(tokenString);
    return userToken?.token
  }

  const [token, setToken] = useState(getToken());

  const saveToken = userToken => {
    localStorage.setItem('token', userToken);
    setToken(userToken.token);
  };

  return {
    setToken: saveToken,
    token
  }
}