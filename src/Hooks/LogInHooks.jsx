import { useState } from "react";

export const LoggedIn = () => {
    const [userName, setUserName] = useState('');
    return { userName, setUserName };
};

export const Password = () => {
    const [password,setPassword] = useState('');
    return { password, setPassword };
}


export const Token = () => {
  const userDataToken = sessionStorage.getItem('user');
  let initialToken = '';
  if (userDataToken !== null) {
    const userData = JSON.parse(userDataToken);
    if (userData && userData.data && userData.data.token) {
      initialToken = userData.data.token;
    }
  }
  const [token, setToken] = useState(initialToken);
  return { token, setToken };
}


