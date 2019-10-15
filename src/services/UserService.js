import environment from "../environment/environment"

const getData = function (userId) {
  return fetch(`${environment.apiUrl}/users/${userId}`, {
    method: "get",
    headers: {
      "X-Requested-With": "XMLHttpRequest",
      "Content-Type": "application/json"
    }/*,
    credentials: "include"*/ // TODO : UNCOMMENT
  })
    .then(rta => rta.json())
    .then(rta => {
      if (rta.success) {
        return rta.data;
      } else {
        return false;
      }
    }).catch(err => {
      return false;
    });
};

const incrementPlays = function (userId) {
  return fetch(`${environment.apiUrl}/users/${userId}/play`, {
    method: "put",
    headers: {
      "X-Requested-With": "XMLHttpRequest",
      "Content-Type": "application/json"
    }/*,
    credentials: "include"*/ // TODO : UNCOMMENT
  })
    .then(rta => rta.json())
    .then(rta => {
      return rta.success;
    })
    .catch(err => {
      return false;
    });
};

const register = function (data) {
  return fetch(`${environment.apiUrl}/users/register`, {
    method: "post",
    body: JSON.stringify(data),
    headers: {
      "X-Requested-With": "XMLHttpRequest",
      "Content-Type": "application/json"
    }/*,
    credentials: "include"*/ // TODO : UNCOMMENT
  })
    .then(rta => rta.json())
    .then(rta => {
      return rta.success;
    })
    .catch(err => {
      return false;
    });
};

/**
 * Servicio de autenticación.
 * @type {{getData: (function(*=): Promise<Response | never>), incrementPlays: (function(*=): Promise<Response | never>), register: (function(*=): Promise<Response | never>)}}
 */
const UserService = {
  getData: getData,
  incrementPlays: incrementPlays,
  register: register
};

export default UserService;
