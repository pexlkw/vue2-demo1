const tokenKey = 'authorization';

export function getToken () {
  return localStorage.getItem(tokenKey);
}

export function setToken (parseToken) {
  const tokenValue = `${parseToken.type} ${parseToken.token}`;
  return localStorage.setItem(tokenKey, tokenValue);
}

export function removeToken () {
  return localStorage.removeItem(tokenKey);
}
