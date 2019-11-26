import environment from "./../environment/environment";

let userData = {
  email: null,
  id: null,
  user_name: null,
  token: null
};

const login = function(credentials) {
  return fetch(`${environment.apiUrl}/login`, {
    method: "post",
    body: JSON.stringify(credentials),
    headers: {
      "X-Requested-With": "XMLHttpRequest",
      "Content-Type": "application/json"
    }
  })
    .then(rta => {
      if (!rta.ok) {
        throw Error(rta.statusText);
      }
      return rta;
    })
    .then(rta => rta.json())
    .then(rta => {
      userData = {
        email: credentials.email,
        id: rta.id,
        user_name: rta.user_name,
        token: rta.token
      };
      localStorage.user_data = JSON.stringify(userData);
      return userData;
    })
    .catch(err => {
      return false;
    });
};
const logout = function() {
  localStorage.removeItem("user_data"); // TODO: MOVE THIS TO THE COMPONENT AFTER
  return fetch(`${environment.apiUrl}/logout`, {
    method: "post",
    headers: {
      "X-Requested-With": "XMLHttpRequest",
      "Content-Type": "application/json"
    } /*,
    credentials: "include"*/ // TODO : UNCOMMENT
  })
    .then(rta => {
      return rta.ok;
    })
    .catch(err => {
      return false;
    });
};
const isAuthenticated = function() {
  if (!!localStorage.user_data) {
    return !!localStorage.user_data;
  } else {
    return userData.id !== null;
  }
};
const getUserData = function() {
  if (!(userData.id !== null)) {
    userData = JSON.parse(localStorage.user_data);
    return { ...userData };
  } else {
    return { ...userData };
  }
};

/**
 * Authentication Service.
 * @type {{login: (function(*=): Promise<Response | never>), logout: (function(): Promise<boolean | never>), isAuthenticated: (function(): boolean), getUserData: (function(): {email: null, id: null, user_name: null, token: null})}}
 */
const AuthService = {
  login: login,

  logout: logout,

  isAuthenticated: isAuthenticated,

  getUserData: getUserData
};

export default AuthService;
export { login, logout, isAuthenticated, getUserData };
