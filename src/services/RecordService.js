import environment from "../environment/environment"

const create = function (data) {
    return fetch(`${environment.apiUrl}/records`, {
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
 * @type {{create: (function(*=): Promise<Response | never>)}}
 */
const RecordService = {
    create: create
};

export default RecordService;
