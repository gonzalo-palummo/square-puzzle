import environment from "../environment/environment";

const getOne = function(id) {
  return fetch(`${environment.apiUrl}/users/${id}`, {
    method: "get",
    headers: {
      "X-Requested-With": "XMLHttpRequest",
      "Content-Type": "application/json"
    } /*
    credentials: "include"*/ // TODO: CHECK THIS
  })
    .then(rta => {
      if (!rta.ok) {
        throw Error(rta.statusText);
      }
      return rta;
    })
    .then(rta => rta.json())
    .catch(err => {
      return false;
    });
};

const incrementPlays = function(userId) {
  return fetch(`${environment.apiUrl}/users/${userId}/play`, {
    method: "put",
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

const register = function(data) {
  return fetch(`${environment.apiUrl}/users/register`, {
    method: "post",
    body: JSON.stringify(data),
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

/**
 * Servicio de autenticación.
 * @type {{getOne: (function(*=): Promise<Response | never>), incrementPlays: (function(*=): Promise<Response | never>), register: (function(*=): Promise<Response | never>)}}
 */
const UserService = {
  getOne: getOne,
  incrementPlays: incrementPlays,
  register: register
};

export default UserService;
