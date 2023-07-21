const baseUrl = 'https://api.kozhevnikova.students.nomoredomains.xyz';

function _checkResponse(res) {
    return res.ok
        ? res.json()
        : Promise.reject(`Ошибка ${res.status}`);
}

const registration = (data) => {
    return fetch(`${baseUrl}/signup`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
    })
        .then(_checkResponse)
}

const authorization = (data) => {
    return fetch(`${baseUrl}/signin`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data)
    })
        .then(_checkResponse)
}

const checkToken = (token) => {
    return fetch(`${baseUrl}/users/me`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
        },
    })
        .then(_checkResponse)
}

export {registration, authorization, checkToken}