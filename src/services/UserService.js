import environment from "../environment/environment";
import AuthService from "./AuthService";

const getOne = function(id) {
  return fetch(`${environment.apiUrl}/users/${id}`, {
    method: "get",
    headers: {
      "X-Requested-With": "XMLHttpRequest",
      "Content-Type": "application/json"
    },
    credentials: "include"
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
    },
    credentials: "include"
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
    }
  })
    .then(rta => (rta.status !== 400 && rta.status !== 201 ? rta : rta.json()))
    .then(rta => {
      if (rta[Object.keys(rta)[0]].length >= 0) {
        return { success: false, errors: rta };
      } else {
        return { success: true };
      }
    })
    .catch(err => {
      return {
        success: false
      };
    });
};

/**
 * User Service.
 * @type {{getOne: (function(*=): Promise<Response | never>), incrementPlays: (function(*=): Promise<Response | never>), register: (function(*=): Promise<Response | never>)}}
 */
const UserService = {
  getOne: getOne,
  incrementPlays: incrementPlays,
  register: register
};

export default UserService;
