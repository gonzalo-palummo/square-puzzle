import environment from "./../environment/environment";

let userData = {
  email: null,
  id: null,
  user_name: null
};

const login = function(credentials) {
  return fetch(`${environment.apiUrl}/login`, {
    method: "post",
    body: JSON.stringify(credentials),
    headers: {
      "X-Requested-With": "XMLHttpRequest",
      "Content-Type": "application/json"
    },
    credentials: "include"
  })
    .then(rta => rta.json())
    .then(rta => {
      if (rta.success) {
        userData = {
          email: credentials.email,
          id: rta.data.id,
          user_name: rta.data.user_name
        };
        return userData;
      } else {
        return false;
      }
    });
};
const logout = function() {
  return fetch(`${environment.apiUrl}/logout`, {
    method: "post",
    headers: {
      "X-Requested-With": "XMLHttpRequest",
      "Content-Type": "application/json"
    },
    credentials: "include"
  })
    .then(rta => rta.json())
    .then(rta => {
      return rta.success;
    });
};
const isAuthenticated = function() {
  return userData.id !== null;
};
const getUserData = function() {
  return { ...userData };
};

/**
 * Servicio de autenticación.
 * @type {{login: (function(*=): Promise<Response | never>), logout: (function(): Promise<boolean | never>), isAuthenticated: (function(): boolean), getUserData: (function(): {email: null, id: null, user_name: null})}}
 */
const AuthService = {
  login: login,

  logout: logout,

  isAuthenticated: isAuthenticated,

  getUserData: getUserData
};

export default AuthService;
export { login, logout, isAuthenticated, getUserData };
