import environment from '../environment/environment';
import AuthService from './AuthService';

const get = function(id, size) {
  return fetch(`${environment.apiUrl}/puzzles/records/${id}/${size}`, {
    method: 'get',
    headers: {
      'X-Requested-With': 'XMLHttpRequest',
      'Content-Type': 'application/json'
    },
    credentials: 'include'
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

const create = function(data) {
  return fetch(`${environment.apiUrl}/puzzles/records`, {
    method: 'post',
    body: JSON.stringify(data),
    headers: {
      'X-Requested-With': 'XMLHttpRequest',
      'Content-Type': 'application/json'
    },
    credentials: 'include'
  })
    .then(rta => {
      return rta.ok;
    })
    .catch(err => {
      return false;
    });
};

const getMostWon = function() {
  return fetch(`${environment.apiUrl}/puzzles/records/mostwon`, {
    method: 'get',
    headers: {
      'X-Requested-With': 'XMLHttpRequest',
      'Content-Type': 'application/json'
    },
    credentials: 'include'
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

const getMostLost = function() {
  return fetch(`${environment.apiUrl}/puzzles/records/mostlost`, {
    method: 'get',
    headers: {
      'X-Requested-With': 'XMLHttpRequest',
      'Content-Type': 'application/json'
    },
    credentials: 'include'
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

/**
 * @type {{create: (function(*=): Promise<Response | never>), get: (function(*=): Promise<Response | never>), getMostWon: (function(*=): Promise<Response | never>), getMostLost: (function(*=): Promise<Response | never>)}}
 */
const RecordService = {
  create: create,
  get: get,
  getMostWon: getMostWon,
  getMostLost: getMostLost
};

export default RecordService;
