import environment from "../environment/environment";

const getAll = function() {
  return fetch(`${environment.apiUrl}/puzzles`, {
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

const getOne = function(id) {
  return fetch(`${environment.apiUrl}/puzzles/${id}`, {
    method: "get",
    headers: {
      "X-Requested-With": "XMLHttpRequest",
      "Content-Type": "application/json"
    } /*,
    credentials: "include"*/ // TODO : UNCOMMENT
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

const upload = function(data) {
  return fetch(`${environment.apiUrl}/puzzles`, {
    method: "post",
    body: JSON.stringify(data),
    headers: {
      "X-Requested-With": "XMLHttpRequest",
      "Content-Type": "application/json"
    } /*,
    credentials: "include"*/ // TODO : UNCOMMENT
  })
    .then(rta => {
      if (!rta.ok) {
        throw Error(rta.statusText);
      }
      return rta;
    })
    .then(rta => rta.ok)
    .catch(err => {
      return false;
    });
};

/**
 * Servicio de autenticación.
 * @type {{getOne: (function(*=): Promise<Response | never>), getAll: (function(*=): Promise<Response | never>), upload: (function(*=): Promise<Response | never>)}}
 */
const PuzzleService = {
  getOne: getOne,
  getAll: getAll,
  upload: upload
};

export default PuzzleService;
