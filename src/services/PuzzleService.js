import environment from "../environment/environment";

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

/**
 * Servicio de autenticación.
 * @type {{getOne: (function(*=): Promise<Response | never>)}}
 */
const PuzzleService = {
  getOne: getOne
};

export default PuzzleService;
